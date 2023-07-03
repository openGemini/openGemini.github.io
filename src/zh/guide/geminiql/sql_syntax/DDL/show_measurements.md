---
order: 12
---

# SHOW MEASUREMENTS (查看数据库中所有表名称)

返回指定数据库的measurement。

## 语法

```sql
SHOW MEASUREMENTS [ON <database_name>] [WITH MEASUREMENT <operator> ['<measurement_name>' | <regular_expression>]]
```

## 语法描述

`ON <database_name>`是可选项。如果查询中没有包含`ON <database_name>`，您必须在CLI中使用`USE <database_name>`指定数据库，或者在openGemini API请求中使用参数`db`指定数据库。

`WITH`子句，`WHERE`子句，`LIMIT`子句和`OFFSET`子句是可选的。`WHERE`子句支持tag比较；在`SHOW MEASUREMENTS`查询中，field比较是无效的。

`WHERE`子句中支持的操作符：

| 操作符 | 含义   |
| ------ | ------ |
| `=`    | 等于   |
| `<>`   | 不等于 |
| `!=`   | 不等于 |
| `=~`   | 匹配   |
| `!~`   | 不匹配 |

请查阅DML章节获得关于[`FROM`子句](../DML/select.md#from子句)、[`LIMIT、OFFSET`子句](../DML/limit_offset.md)、和正则表达式的介绍。

## 示例

### 运行带有`ON`子句的`SHOW MEASUREMENTS`查询

```sql
>>> SHOW MEASUREMENTS ON NOAA_water_database
name: measurements
+---------------------+
| name                |
+---------------------+
| average_temperature |
| h2o_feet            |
| h2o_pH              |
| h2o_quality         |
| h2o_temperature     |
+---------------------+
1 columns, 5 rows in set
```

该查询返回数据库`NOAA_water_database`中的measurement。数据库`NOAA_water_database`有五个measurement：`average_temperature`、`h2o_feet`、`h2o_pH`、`h2o_quality`和`h2o_temperature`。

### 运行不带有`ON`子句的`SHOW MEASUREMENTS`查询

::: tabs

@tab CLI

使用`USE <database_name>`指定数据库：

```bash
>>> USE NOAA_water_database
Elapsed: 781ns
>>> SHOW MEASUREMENTS
name: measurements
+---------------------+
| name                |
+---------------------+
| average_temperature |
| h2o_feet            |
| h2o_pH              |
| h2o_quality         |
| h2o_temperature     |
+---------------------+
1 columns, 5 rows in set
```

@tab API

使用参数`db`指定数据库

```bash
~$ curl -G "http://localhost:8086/query?db=NOAA_water_database&pretty=true" --data-urlencode "q=SHOW MEASUREMENTS"
{
    "results": [
        {
            "statement_id": 0,
            "series": [
                {
                    "name": "measurements",
                    "columns": [
                        "name"
                    ],
                    "values": [
                        [
                            "average_temperature"
                        ],
                        [
                            "h2o_feet"
                        ],
                        [
                            "h2o_pH"
                        ],
                        [
                            "h2o_quality"
                        ],
                        [
                            "h2o_temperature"
                        ]
                    ]
                }
            ]
        }
    ]
}
```

:::

### 运行带有多个子句的`SHOW MEASUREMENTS`查询

```sql
>>> SHOW MEASUREMENTS ON NOAA_water_database WITH MEASUREMENT =~ /h2o.*/
name: measurements
+-----------------+
| name            |
+-----------------+
| h2o_feet        |
| h2o_pH          |
| h2o_quality     |
| h2o_temperature |
+-----------------+
1 columns, 4 rows in set
```

该查询返回数据库`NOAA_water_database`中名字以`h2o`开头的measurement。

### 查看表数量
```sql
>>> SHOW MEASUREMENT CARDINALITY
TODO

>>> SHOW MEASUREMENT CARDINALITY ON NOAA_water_database
TODO
```
