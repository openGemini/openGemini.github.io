---
order: 1
---

# SELECT

`SELECT` 查询执行数据检索。 默认情况下，请求的数据将返回给客户端，同时结合 [SELECT INTO]() 可以被转发到不同的表。

## 样本数据

开始探索数据之前，为了更好地演示下面的语法，我们先导入美国国家海洋和大气管理局 (NOAA) 业务海洋产品和服务中心的公开可用数据，请先按照[样本数据](../../sample_data.md)文档录入数据。

以下部分中的示例查询均按照上述样本数据进行操作。

## 客户端

为了方便探索数据，请先用ts-cli登录：

```shell
$ ts-cli -database NOAA_water_database
openGemini CLI 0.1.0 (rev-revision)
Please use `quit`, `exit` or `Ctrl-D` to exit this program.
> 
```

## 语法

```sql
SELECT COLUMN_CLAUSES FROM_CLAUSE
```

## SELECT子句

 `SELECT` 子句支持下面的格式:

| 格式                                           | 含义                                                         |
| ---------------------------------------------- | ------------------------------------------------------------ |
| `SELECT *`                                     | 返回所有的tag和field                                         |
| `SELECT "<field_key>"`                         | 返回指定的field                                              |
| `SELECT "<field_key>","<field_key>"`           | 返回多个指定的field                                          |
| `SELECT "<field_key>","<tag_key>"`             | 返回指定的field和tag。如果指定了tag，则必须指定至少一个field |
| `SELECT "<field_key>"::field,"<tag_key>"::tag` | 返回特定field和tag。 ::[field \| tag] 语法指定标识符类型。使用此语法区分具有相同名称的field和tag |

其他支持的功能： [数学表达式]()、 [聚合算子]()、 [正则表达式]()

::: tip

SELECT 语句不能同时包含==聚合函数==**和**==非聚合函数、field_key或tag_key==。

:::

## FROM子句

`FROM` 子句指定从以下数据源中读取数据:

- 表
- 子查询

支持的格式：

| 格式                                                         | 含义                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `FROM <measurement_name>`                                    | 从单个表中获取数据                                           |
| `FROM <measurement_name>,<measurement_name>`                 | 从多个表中获取数据                                           |
| `FROM <database_name>.<retention_policy_name>.<measurement_name>` | 从指定的database，指定的retention_policy，指定的表中获取数据 |
| `FROM <database_name>..<measurement_name>`                   | 从指定的database，默认的retention_policy，指定的表中获取数据 |
| `FROM /<regular_expression_measurement>/`                    | 用正则表达式匹配对应的表，获取数据                           |

## 例子

从一个表中查询的所有的field和tags。

```sql
> select * from "h2o_feet"
name: h2o_feet
time                 level description         location     water_level
----                 -----------------         --------     -----------
2019-08-17T00:00:00Z below 3 feet              santa_monica 2.064
2019-08-17T00:00:00Z between 6 and 9 feet      coyote_creek 8.12
2019-08-17T00:06:00Z below 3 feet              santa_monica 2.116
[......]
2019-09-17T21:30:00Z between 3 and 6 feet      santa_monica 5.01
2019-09-17T21:36:00Z between 3 and 6 feet      santa_monica 5.066
2019-09-17T21:42:00Z between 3 and 6 feet      santa_monica 4.938
```

从一个表查询指定field的top 5数据

```sql
> SELECT top("water_level", 5) FROM "h2o_feet"
name: h2o_feet
time                 top
----                 ---
2019-08-28T07:12:00Z 9.938
2019-08-28T07:18:00Z 9.957
2019-08-28T07:24:00Z 9.964
2019-08-28T07:30:00Z 9.954
2019-08-28T07:36:00Z 9.941
```

从一个表中查询最新的一条记录并查询对应tag。

```sql
> SELECT last("water_level"), location FROM "h2o_feet"
name: h2o_feet
time                 last  location
----                 ----  --------
2019-09-17T21:42:00Z 4.938 santa_monica
```

从一个表中查询所有数据并做一些基础运算。

```sql
> SELECT ("water_level" * 4) + 2 FROM "h2o_feet" limit 10
name: h2o_feet
time                 water_level
----                 -----------
2019-08-17T00:00:00Z 10.256
2019-08-17T00:00:00Z 34.48
[......]
2019-09-17T21:36:00Z 22.264
2019-09-17T21:42:00Z 21.752
```

