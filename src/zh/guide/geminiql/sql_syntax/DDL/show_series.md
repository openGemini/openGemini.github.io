---
order: 3
---

# SHOW SERIES

返回指定数据库的系列。

## 语法

```sql
SHOW SERIES [ON <database_name>] [FROM_CLAUSE] [WHERE <tag_key> <operator> [ '<tag_value>' | <regular_expression>]] [LIMIT_CLAUSE] [OFFSET_CLAUSE]
```

## 语法描述

`ON <database_name>`是可选的。如果查询中没有包含`ON <database_name>`，您必须在CLI中使用`USE <database_name>`指定数据库，或者在openGemini API请求中使用参数`db`指定数据库。

`WHERE`子句支持`tag`比较；在`SHOW SERIES`查询中，`field`比较是无效的。

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

### 运行带有ON子句的SHOW SERIES查询

```sql
>>> SHOW SERIES ON NOAA_water_database
+---------------------------------------------+
| key                                         |
+---------------------------------------------+
| average_temperature,location=coyote_creek   |
| average_temperature,location=santa_monica   |
| h2o_feet,location=coyote_creek              |
| h2o_feet,location=santa_monica              |
| h2o_pH,location=coyote_creek                |
| h2o_pH,location=santa_monica                |
| h2o_quality,location=coyote_creek,randtag=1 |
| h2o_quality,location=coyote_creek,randtag=2 |
| h2o_quality,location=coyote_creek,randtag=3 |
| h2o_quality,location=santa_monica,randtag=1 |
| h2o_quality,location=santa_monica,randtag=2 |
| h2o_quality,location=santa_monica,randtag=3 |
| h2o_temperature,location=coyote_creek       |
| h2o_temperature,location=santa_monica       |
+---------------------------------------------+
1 columns, 14 rows in set
```

该查询的输出类似行协议格式。第一个逗号之前的所有内容是`measurement`的名字。第一个逗号之后的所有内容都是`tag key`或者`tag value`。数据库`NOAA_water_database`有五个不同的`measurement`和14个不同的系列。

### 运行不带有`ON`子句的`SHOW SERIES`查询

::: tabs

@tab CLI

使用`USE <database_name>`指定数据库：

```bash
>>> USE NOAA_water_database
Elapsed: 561ns
>>> SHOW SERIES
+---------------------------------------------+
| key                                         |
+---------------------------------------------+
| average_temperature,location=coyote_creek   |
| average_temperature,location=santa_monica   |
| h2o_feet,location=coyote_creek              |
| h2o_feet,location=santa_monica              |
| h2o_pH,location=coyote_creek                |
| h2o_pH,location=santa_monica                |
| h2o_quality,location=coyote_creek,randtag=1 |
| h2o_quality,location=coyote_creek,randtag=2 |
| h2o_quality,location=coyote_creek,randtag=3 |
| h2o_quality,location=santa_monica,randtag=1 |
| h2o_quality,location=santa_monica,randtag=2 |
| h2o_quality,location=santa_monica,randtag=3 |
| h2o_temperature,location=coyote_creek       |
| h2o_temperature,location=santa_monica       |
+---------------------------------------------+
1 columns, 14 rows in set
```

@tab API

使用参数`db`指定数据库

```bash
~$ curl -G "http://localhost:8086/query?db=NOAA_water_database&pretty=true" --data-urlencode "q=SHOW SERIES"
{
    "results": [
        {
            "statement_id": 0,
            "series": [
                {
                    "columns": [
                        "key"
                    ],
                    "values": [
                        [
                            "average_temperature,location=coyote_creek"
                        ],
                        [
                            "average_temperature,location=santa_monica"
                        ],
                        [
                            "h2o_feet,location=coyote_creek"
                        ],
                        [
                            "h2o_feet,location=santa_monica"
                        ],
                        [
                            "h2o_pH,location=coyote_creek"
                        ],
                        [
                            "h2o_pH,location=santa_monica"
                        ],
                        [
                            "h2o_quality,location=coyote_creek,randtag=1"
                        ],
                        [
                            "h2o_quality,location=coyote_creek,randtag=2"
                        ],
                        [
                            "h2o_quality,location=coyote_creek,randtag=3"
                        ],
                        [
                            "h2o_quality,location=santa_monica,randtag=1"
                        ],
                        [
                            "h2o_quality,location=santa_monica,randtag=2"
                        ],
                        [
                            "h2o_quality,location=santa_monica,randtag=3"
                        ],
                        [
                            "h2o_temperature,location=coyote_creek"
                        ],
                        [
                            "h2o_temperature,location=santa_monica"
                        ]
                    ]
                }
            ]
        }
    ]
}
```

:::

### 运行带有多个子句的`SHOW SERIES`查询

```
>>> SHOW SERIES ON NOAA_water_database FROM "h2o_quality" WHERE "location" = 'coyote_creek' LIMIT 2
+---------------------------------------------+
| key                                         |
+---------------------------------------------+
| h2o_quality,location=coyote_creek,randtag=1 |
| h2o_quality,location=coyote_creek,randtag=2 |
+---------------------------------------------+
1 columns, 2 rows in set
```

该查询返回数据库`NOAA_water_database`中，与measurement `h2o_quality`和tag `location = coyote_creek`相关联的所有系列。`LIMIT`子句将返回的系列个数限制为2。