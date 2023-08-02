---
title: 聚合函数
order: 1
---

本章主要介绍如下函数：
| 聚合函数 | 说明 | 
| --- | --- | 
| COUNT() | 统计数据总量 
| **COUNT(time)** | 按时间列统计数据 |
| MEAN() | 平均值 | 
| SUM () | 求和 | 
| MODE()| 最频繁值|
| STDDEV() | 标准差 | 
| MEDIAN() | 中位数 | 
| SPREAD() | 跨度值 | 
| DISTINCT() | 去重 |
| **IRATE()** | ( \|An - An-1\| )/( \|Tn-1 - Tn\| ) | 
| **RATE()**| ( \|A1-A2\| )/( \|T1-T2\|) | 
| MOVING_AVERAGE() | 滑动平均 |
| HOLT_WINTERS() | 预测未来N个值 
| CUMULATIVE_SUM() | 累积求和 | 
| DERIVATIVE() | 后续值的变化率 | 
| DIFFERENCE() | 后续值的差值 |
| ELAPSED()	| 后续值的时间差值 | 
| NON_NEGATIVE_DERIVATIVE()	|后续值的非负变化率 | 
| NON_NEGATIVE_DIFFERENCE()	|后续值的非负差值 | 

::: tip

列表中加粗部分为openGemini特有的方法，除此之外，其余方法均兼容InfluxDB的用法，可参考InfluxDB对应的函数用法。
社区正在快马加鞭补齐相关文档。
:::

## COUNT()

返回非空值field values数量

**语法**

```sql
SELECT COUNT( [ * | <field_key> | /<regular_expression>/ ] ) [INTO_CLAUSE] FROM_CLAUSE [WHERE_CLAUSE] [GROUP_BY_CLAUSE] [ORDER_BY_CLAUSE] [LIMIT_CLAUSE] [OFFSET_CLAUSE]
```
**嵌套语法**

```sql
SELECT COUNT(DISTINCT( [ * | <field_key> | /<regular_expression>/ ] )) [...]
```

`COUNT(field_key)`
返回field_key对应的field value的个数。

`COUNT(/regular_expression/)`
返回与正则表达式匹配的每个field key对应的field value的个数。

`COUNT(*)`
返回在measurement中每个field key对应的field value的个数。

`COUNT()` 支持所有数据类型的field value。openGemini支持将`DISTINCT()`函数嵌套在`COUNT()`函数里。

**示例**

- **计算指定field key的field value的数目**

```sql
> SELECT COUNT("water_level") FROM "h2o_feet"
name: h2o_feet
+----------------------+-------+
| time                 | count |
+----------------------+-------+
| 1970-01-01T00:00:00Z | 15258 |
+----------------------+-------+
2 columns, 1 rows in set
```

该查询返回measurement`h2o_feet`中的`water_level`的非空field value的数量。

- **计数measurement中每个field key关联的field value的数量**

```sql
> SELECT COUNT(*) FROM "h2o_feet"
name: h2o_feet
+----------------------+-------------------------+-------------------+
| time                 | count_level description | count_water_level |
+----------------------+-------------------------+-------------------+
| 1970-01-01T00:00:00Z | 15258                   | 15258             |
+----------------------+-------------------------+-------------------+
3 columns, 1 rows in set
```

该查询返回与measurement`h2o_feet`相关联的每个field key的非空field value的数量。`h2o_feet`有两个field keys：`level_description`和`water_level`

- **计算匹配一个正则表达式的每个field key关联的field value的数目**

```sql
> SELECT COUNT(/water/) FROM "h2o_feet"
name: h2o_feet
+----------------------+-------------------+
| time                 | count_water_level |
+----------------------+-------------------+
| 1970-01-01T00:00:00Z | 15258             |
+----------------------+-------------------+
2 columns, 1 rows in set
```

该查询返回measurement`h2o_feet`中包含`water`单词的每个field key的非空字段值的数量。

- **计数包括多个子句的field key的field value的数目**

```sql
> SELECT COUNT("water_level") FROM "h2o_feet" WHERE time >= '2019-08-20T00:12:01Z' AND time <= '2019-08-20T08:00:00Z' GROUP BY time(7m),* fill(1000) LIMIT 4
name: h2o_feet
tags: location=coyote_creek
+----------------------+-------+
| time                 | count |
+----------------------+-------+
| 2019-08-20T00:10:00Z | 1000  |
| 2019-08-20T00:17:00Z | 1     |
| 2019-08-20T00:24:00Z | 2     |
| 2019-08-20T00:31:00Z | 1     |
+----------------------+-------+
2 columns, 4 rows in set
```

该查询返回`water_level`field key中的非空field value的数量。它涵盖`2019-08-20T00:12:01Z`和`2019-08-20T08:00:00Z`之间的`时间段`，并将结果分组为7分钟的时间间隔和每个tag。并用`1000`填充空的时间间隔，并返回4个数据point，表格返回1。

- **计算一个field key的distinct的field value的数量**

```sql
> SELECT COUNT(DISTINCT("level description")) FROM "h2o_feet"
name: h2o_feet
+----------------------+-------+
| time                 | count |
+----------------------+-------+
| 1970-01-01T00:00:00Z | 4     |
+----------------------+-------+
2 columns, 1 rows in set
```

查询返回measurement为`h2o_feet`field key为`level description`的唯一field value的数量。

**`COUNT()`的常见问题>**

- **`COUNT()`和`fill()`**

大多数函数对于没有数据的时间间隔返回`null`值，`fill()`将该`null`值替换为`fill_option`。 `COUNT()`针对没有数据的时间间隔返回`0`，`fill(<fill_option>)`用`fill_option`替换0值。

**示例**

下面的代码块中的第一个查询不包括`fill()`。有些时间段没有数据，因此该时间间隔的值返回为零。第二个查询包括`fill(800000)`; 它将没有数据的间隔中的零替换为`800000`。

```sql
> SELECT COUNT("water_level") FROM "h2o_feet" WHERE time >= '2019-08-20T00:12:01Z' AND time <= '2019-08-20T08:00:00Z' GROUP BY time(7m),*  LIMIT 4
name: h2o_feet
tags: location=coyote_creek
+----------------------+-------+
| time                 | count |
+----------------------+-------+
| 2019-08-20T00:10:00Z | 0     |
| 2019-08-20T00:17:00Z | 1     |
| 2019-08-20T00:24:00Z | 2     |
| 2019-08-20T00:31:00Z | 1     |
+----------------------+-------+
2 columns, 4 rows in set

> SELECT COUNT("water_level") FROM "h2o_feet" WHERE time >= '2019-08-20T00:12:01Z' AND time <= '2019-08-20T08:00:00Z' GROUP BY time(7m),* fill(800000) LIMIT 4
name: h2o_feet
tags: location=coyote_creek
+----------------------+--------+
| time                 | count  |
+----------------------+--------+
| 2019-08-20T00:10:00Z | 800000 |
| 2019-08-20T00:17:00Z | 1      |
| 2019-08-20T00:24:00Z | 2      |
| 2019-08-20T00:31:00Z | 1      |
+----------------------+--------+
2 columns, 4 rows in set
```

## SUM()

返回field value的总和。

**语法**

```sql
SELECT SUM( [ * | <field_key> | /<regular_expression>/ ] ) [INTO_CLAUSE] FROM_CLAUSE [WHERE_CLAUSE] [GROUP_BY_CLAUSE] [ORDER_BY_CLAUSE] [LIMIT_CLAUSE] [OFFSET_CLAUSE]
```

`SUM(field_key)`
返回field key对应的field value的总和。

`SUM(/regular_expression/)`
返回与正则表达式匹配的每个field key对应的field value的总和。

`SUM(*)`
返回在measurement中每个field key对应的field value的总和。

`SUM()` 支持数据类型为int64和float64的field value。

**>示例**

- **计算指定field key对应的field value的总和**

```sql
> SELECT SUM("water_level") FROM "h2o_feet"
name: h2o_feet
+----------------------+-------------------+
| time                 | sum               |
+----------------------+-------------------+
| 1970-01-01T00:00:00Z | 67774.98933334895 |
+----------------------+-------------------+
2 columns, 1 rows in set
```

该查询返回measurement `h2o_feet`中field key `water_level`对应的field value的总和。

- **计算measurement中每个field key对应的field value的总和**

```sql
> SELECT SUM(*) FROM "h2o_feet"
name: h2o_feet
+----------------------+-------------------+
| time                 | sum_water_level   |
+----------------------+-------------------+
| 1970-01-01T00:00:00Z | 67774.98933334895 |
+----------------------+-------------------+
2 columns, 1 rows in set
```

该查询返回measurement `h2o_feet`中每个存储数值的field key对应的field value的总和。measurement `h2o_feet`中只有一个数值类型的field：`water_level`。

- **计算与正则表达式匹配的每个field key对应的field value的总和**

```sql
> SELECT SUM(/water/) FROM "h2o_feet"
name: h2o_feet
+----------------------+-------------------+
| time                 | sum_water_level   |
+----------------------+-------------------+
| 1970-01-01T00:00:00Z | 67774.98933334895 |
+----------------------+-------------------+
2 columns, 1 rows in set
```

该查询返回measurement `h2o_feet`中每个存储数值并包含单词`water`的field key对应的field value的总和。

- **计算指定field key对应的field value的总和并包含多个子句**

```sql
> SELECT SUM("water_level") FROM "h2o_feet" WHERE time >= '2019-08-20T00:12:01Z' AND time <= '2019-08-20T08:00:00Z' GROUP BY time(7m),* fill(1000) LIMIT 4
name: h2o_feet
tags: location=coyote_creek
+----------------------+--------+
| time                 | sum    |
+----------------------+--------+
| 2019-08-20T00:10:00Z | 1000   |
| 2019-08-20T00:17:00Z | 8.684  |
| 2019-08-20T00:24:00Z | 17.316 |
| 2019-08-20T00:31:00Z | 8.619  |
+----------------------+--------+
2 columns, 4 rows in set
```

该查询返回measurement `h2o_feet`中field key `water_level`对应的field value的总和，它涵盖的时间范围在`2019-08-20T00:12:01Z`和`2019-08-20T08:00:00Z`之间，并将查询结果按7分钟的时间间隔和每个tag进行分组，同时，该查询用`1000`填充没有数据的时间间隔，并将返回的数据point个数限制为4。

