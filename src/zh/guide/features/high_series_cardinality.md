---
title: 高基数存储引擎
order: 6
---

:::tip

这是一个实验特性，当前技术方案对于解决高基数问题有明显效果，但还存在如下问题暂未解决

1. 高并发、持续写入场景存在性能下降
1. 数据写入后，暂未支持缓存查找，数据必须下盘后才能可见
1. 缺少服务端流控和反压机制

:::

在数据库中，基数是指数据库的特定列或字段中包含的唯一值的数量。时间序列数据往往包含描述该数据的元数据（习惯称为“TAG”）。通常，主要时间序列数据或元数据会被索引，以提高查询性能，以便您可以快速找到与之匹配的所有值。时间序列数据集的基数通常由每个单独索引列的基数的交叉乘积定义。如果有多个索引列，每个列都有大量唯一值，那么交叉乘积的基数可能会变得非常大。这就是软件开发人员在谈论具有“高基数”的时间序列数据集时通常的意思。

高基数问题直接表现为索引膨胀，内存资源占用高，查询性能下降。该问题是所有时序数据库都会面临的一个难题，openGemini高基数存储引擎提供了该问题的一个解决方案。本文主要介绍高基数存储引擎的配置和使用。

## 配置

高基数存储引擎支持InfluxDB Line Protocol协议（简称行协议）和Apache Arrow Flight协议（简称列协议）写入，从实际测试效果来看，列协议写入性能更优。

列协议写入配置如下：

```
[http]
  flight-address = "{{addr}}:8087" // 8087为列协议写入端口
  flight-enabled = false           // 开启列协议，集群配置文件openGemini.conf中默认关闭，单机版中默认开启
  flight-auth-enabled = false      // 列协议鉴权开关，默认关闭
```

此外，增加了一个隐藏配置项

```
[data]
  snapshot-table-number = 1   //数据排序刷盘的并发数，默认值为1，最大为8
```

当写入流量非常大的情形下，可以添加该配置项，将并发数适当调大，提高数据下盘效率。

## 创建表

高基数存储引擎下创建表，参考[创建表文档](../schema/measurement.md)

## 查询分区键

```sql
> CREATE MEASUREMENT rtt (deviceIp STRING, deviceName STRING, campus STRING, rtt INT64) WITH ENGINETYPE = COLUMNSTORE SHARDKEY deviceIp PRIMARYKEY deviceIp,campus SORTKEY deviceIp,campus,time
> SHOW SHARDKEY FROM rtt
+------------+------+-------------+
| SHARD_KEY  | TYPE | SHARD_GROUP |
+------------+------+-------------+
| [deviceIp] | hash |           0 |
+------------+------+-------------+
3 columns, 1 rows in set
```

`SHOW SHARDKEY`仅对使用了高基数存储引擎的表有效

## 查询排序健

```sql
> SHOW SORTKEY from rtt
+------------------------+
|        SORT_KEY        |
+------------------------+
| [deviceIp campus time] |
+------------------------+
1 columns, 1 rows in set
```

`SHOW SORTKEY`仅对使用了高基数存储引擎的表有效

## 查询表结构(Schema)

```sql
> SHOW SCHEMA FROM rtt
+------------+------+-------------+
| SHARD_KEY  | TYPE | SHARD_GROUP |
+------------+------+-------------+
| [deviceIp] | hash |           0 |
+------------+------+-------------+
3 columns, 1 rows in set

+-------------+
| ENGINETYPE  |
+-------------+
| columnstore |
+-------------+
1 columns, 1 rows in set

+---------+
| INDEXES |
+---------+
+---------+
1 columns, 0 rows in set

+-------------------+
|    PRIMARY_KEY    |
+-------------------+
| [deviceIp campus] |
+-------------------+
1 columns, 1 rows in set

+------------------------+
|        SORT_KEY        |
+------------------------+
| [deviceIp campus time] |
+------------------------+
1 columns, 1 rows in set

+-----------------+
| COMPACTION_TYPE |
+-----------------+
| row             |
+-----------------+
1 columns, 1 rows in set
```

## 查询

与openGemini默认存储引擎相比，查询语法基本一致，[参考数据查询文档](../query_data/SELECT.md)

:::tip

1. 当前高基数存储引擎支持的聚合算子：count/sum/min/max/mean/first/last/percentile

2. 表达式过滤不支持正则匹配和复合表达式（如a+b>c)
3. 支持嵌套查询

:::

<font color=red>**下面主要列举高基维引擎的查询语法差异之处，主要为SELECT，GROUP BY，ORDER BY三个方面**</font>

### Sample数据

```sql
# 创建数据库db0
CREATE DATABASE db0

# 创建表mst0
USE db0
CREATE MEASUREMENT mst0 (country tag,  "name" tag, age int64,  height float64,  address string, alive bool) WITH  ENGINETYPE = columnstore  PRIMARYKEY time,country,"address" SORTKEY time,country,"address",age,height,"name"

# 原始数据查询
> SELECT * FROM mst0
name: mst0
time                address   age alive country    height name
----                -------   --- ----- -------    ------ ----
1629129600000000000 shenzhen  12  true  "china"    70     "azhu"
1629129601000000000 shanghai  20  false "american" 80     "alan"
1629129602000000000 beijin    3   true  "germany"  90     "alang"
1629129603000000000 guangzhou 30  false "japan"    121    "ahui"
1629129604000000000 chengdu   35  true  "canada"   138    "aqiu"
1629129605000000000 wuhan     48  true  "china"    149    "agang"
1629129606000000000 wuhan     52  true  "american" 153    "agan"
1629129607000000000 anhui     28  false "germany"  163    "alin"
1629129608000000000 xian      32  true  "japan"    173    "alii"
1629129609000000000 hangzhou  60  false "canada"   180    "alii"
1629129610000000000 nanjin    102 true  "canada"   191    "ahuang"
1629129611000000000 zhengzhou 123 false "china"    203    "ayin"
```

### SELECT

语法

```sql
SELECT COLUMN_CLAUSES FROM_CLAUSE
```

COLUMN_CLAUSES可支持字段TAG或FIELD的明细与聚合查询。

**差异对比**

|                                                      | 高基数存储引擎 | 默认存储引擎 |
| ---------------------------------------------------- | -------------- | ------------ |
| SELECT *country* FROM *mst0*     //*country*为TAG    | 支持           | 不支持       |
| SELECT *age* FROM *mst0*    //age为FIELD             | 支持           | 支持         |
| SELECT *country*, *age* FROM *mst0*                  | 支持           | 支持         |
| SELECT count(*country*) FROM mst0   //*country*为TAG | 支持           | 不支持       |
| SELECT count(*age*) FROM mst0                        | 支持           | 支持         |

### GROUP BY

语法

```sql
SELECT COLUMN_CLAUSES FROM_CLAUSE [WHERE_CLAUSE] GROUP BY [* | <tag_key>[,<field_key]]
```

GROUP BY可支持**字符串**字段TAG或FIELD的明细与聚合查询。

**差异对比**

|                                                              | 高基数存储引擎 | 默认存储引擎 |
| ------------------------------------------------------------ | -------------- | ------------ |
| SELECT "name" FROM mst0 GROUP BY country   //“name”为TAG     | 支持           | 不支持       |
| SELECT mean(height) FROM mst0 GROUP BY country  //country为TAG | 支持           | 支持         |
| SELECT mean(height) FROM mst0 GROUP BY address   //address为FIELD | 支持           | 不支持       |
| SELECT "name" FROM mst0 GROUP BY address   //“name”为TAG，address为FIELD | 支持           | 不支持       |

### ORDER BY

语法

```
SELECT COLUMN_CLAUSES FROM_CLAUSE [WHERE_CLAUSE] [GROUP_BY_CLAUSE] ORDER BY COLUMN_CLAUSES [ASC|DESC]
```

openGemini高基维引擎默认不对查询结果进行排序，若要求返回结果有序，可使用ORDER BY排序，支持对TIME、TAG、FIELD或聚合结果等进行排序。

ORDER BY默认升序ASC，可按照排序字段分别指定升序ASC或降序DESC。

**差异对比**

|                                                              | 高基数存储引擎 | 默认存储引擎 |
| ------------------------------------------------------------ | -------------- | ------------ |
| SELECT mean(height) as avg_height <br/>FROM mst0 <br/>WHERE time >=1629129600000000000 AND time <=1629129611000000000 <br/>GROUP BY time(5s), country <br/>FILL(none) <br/>ORDER BY country, avg_height, time | 支持           | 不支持       |
| SELECT mean(height) as avg_height <br/>FROM mst0 <br/>WHERE time >=1629129600000000000 AND time <=1629129611000000000 <br/>GROUP BY time(5s),country <br/>FILL(none) <br/>ORDER BY country DESC, avg_height DESC, time ASC | 支持           | 不支持       |

## 数据写入

### 行协议

行协议写入参考[openGemini数据行协议写入](../write_data/insert_line_protocol.md)

### 列协议

列协议写入参考[openGemini数据列协议写入](../write_data/insert_column_protocol.md)

## 功能对比

相比默认存储引擎，高基数存储引擎还不支持一些函数和特性，我们希望同社区开发者一起来实现

| 分类             | 明细                          | 高基数存储引擎 | 默认时序引擎 |
| ---------------- | ----------------------------- | -------------- | ------------ |
| **写入数据协议** | Prometheus remote read/write  | &#10006;       | &#10004;     |
|                  | InfluxDB Line Protocol        | &#10004;       | &#10004;     |
|                  | Apache Arrow Flight           | &#10004;       | &#10006;     |
|                  | openTelemetry                 | &#10006;       | &#10004;     |
| **生态兼容**     | ElasticSearch                 | &#10006;       | &#10006;     |
|                  | PromQL                        | WIP            | WIP          |
|                  | InfluxQL                      | &#10004;       | &#10004;     |
| **内置函数支持** | Count                         | &#10004;       | &#10004;     |
|                  | Sum                           | &#10004;       | &#10004;     |
|                  | Count(time)                   | &#10004;       | &#10004;     |
|                  | Mean                          | &#10004;       | &#10004;     |
|                  | Mode                          | &#10006;       | &#10004;     |
|                  | Stddev                        | &#10006;       | &#10004;     |
|                  | Median                        | &#10006;       | &#10004;     |
|                  | Spread                        | &#10006;       | &#10004;     |
|                  | Distinct                      | &#10006;       | &#10004;     |
|                  | Rate                          | &#10006;       | &#10004;     |
|                  | Irate                         | &#10006;       | &#10004;     |
|                  | Moving_average                | &#10006;       | &#10004;     |
|                  | Holt_winter                   | &#10004;       | &#10004;     |
|                  | Cumulative                    | &#10006;       | &#10004;     |
|                  | Difference                    | &#10006;       | &#10004;     |
|                  | Elapsed                       | &#10006;       | &#10004;     |
|                  | Non_negative_derivative       | &#10006;       | &#10004;     |
|                  | Non_negative_difference       | &#10006;       | &#10004;     |
|                  | Abs                           | &#10004;       | &#10004;     |
|                  | Acos                          | &#10004;       | &#10004;     |
|                  | Asin                          | &#10004;       | &#10004;     |
|                  | Cos                           | &#10004;       | &#10004;     |
|                  | Atan                          | &#10004;       | &#10004;     |
|                  | Atan2                         | &#10004;       | &#10004;     |
|                  | Ceil                          | &#10004;       | &#10004;     |
|                  | Exp                           | &#10004;       | &#10004;     |
|                  | Floor                         | &#10004;       | &#10004;     |
|                  | In                            | &#10004;       | &#10004;     |
|                  | Log                           | &#10004;       | &#10004;     |
|                  | Log2                          | &#10004;       | &#10004;     |
|                  | Log10                         | &#10004;       | &#10004;     |
|                  | Pow                           | &#10004;       | &#10004;     |
|                  | Round                         | &#10004;       | &#10004;     |
|                  | Sqrt                          | &#10004;       | &#10004;     |
|                  | Frist                         | &#10004;       | &#10004;     |
|                  | Last                          | &#10004;       | &#10004;     |
|                  | Max                           | &#10004;       | &#10004;     |
|                  | Min                           | &#10004;       | &#10004;     |
|                  | Top                           | &#10004;       | &#10004;     |
|                  | Bottom                        | &#10004;       | &#10004;     |
|                  | Percentile                    | &#10004;       | &#10004;     |
|                  | Sample                        | &#10004;       | &#10004;     |
|                  | Percentile_ogsketch           | &#10004;       | &#10004;     |
|                  | Str                           | &#10004;       | &#10004;     |
|                  | Strlen                        | &#10004;       | &#10004;     |
|                  | Substr                        | &#10004;       | &#10004;     |
|                  | Castor                        | &#10006;       | &#10004;     |
| **特性**         | Data subscription             | &#10006;       | &#10004;     |
|                  | Continue query                | &#10006;       | &#10004;     |
|                  | Downsample                    | &#10006;       | &#10004;     |
|                  | Stream_agg                    | &#10004;       | &#10004;     |
|                  | Tag array                     | &#10006;       | &#10004;     |
|                  | Log search                    | &#10006;       | &#10004;     |
|                  | Object storage                | &#10004;       | &#10004;     |
|                  | Data replication              | &#10006;       |              |
| **元数据相关**   | Create/drop/show database     | &#10004;       | &#10004;     |
|                  | Create/drop/show measurements | &#10004;       | &#10004;     |
|                  | Create/show/alter/drop RP     | &#10004;       | &#10004;     |
|                  | Show tag keys                 | &#10004;       | &#10004;     |
|                  | Show tag values               | &#10006;       | &#10004;     |
|                  | Show field keys               | &#10004;       | &#10004;     |
|                  | Show series                   | &#10006;       | &#10004;     |
|                  | Show shards                   | &#10004;       | &#10004;     |
|                  | Show shard groups             | &#10004;       | &#10004;     |
|                  | Show cluster                  | &#10004;       | &#10004;     |
|                  | Show queries                  | &#10004;       | &#10004;     |