---
order: 6
---

# SHOW TAG VALUES

返回数据库中指定tag key的tag value。

## 语法

```sql
SHOW TAG VALUES [ON <database_name>][FROM_clause] WITH KEY [ [<operator> "<tag_key>" | <regular_expression>] | [IN ("<tag_key1>","<tag_key2")]] [WHERE <tag_key> <operator> ['<tag_value>' | <regular_expression>]] [LIMIT_clause] [OFFSET_clause]
```

## 语法描述

`ON <database_name>`是可选的。如果查询中没有包含`ON <database_name>`，您必须在CLI中使用`USE <database_name>`指定数据库，或者在HTTP API请求中使用参数`db`指定数据库。

`WITH`子句是必须要有的，它支持指定一个tag key、一个正则表达式或多个tag key。

`FROM`子句、`WHERE`子句、`LIMIT`子句和`OFFSET`子句是可选的。`WHERE`子句支持tag比较；在`SHOW TAG VALUES`查询中，field比较是无效的。

`WITH`字句和`WHERE`子句中支持的操作符：

| 操作符 | 含义   |
| ------ | ------ |
| `=`    | 等于   |
| `<>`   | 不等于 |
| `!=`   | 不等于 |
| `=~`   | 匹配   |
| `!~`   | 不匹配 |

请查阅DML章节获得关于[`FROM`子句](../DML/select.md#from子句)、[`LIMIT、OFFSET`子句](../DML/limit_offset.md)、和正则表达式的介绍。

## 示例

### 运行带有`ON`子句的`SHOW TAG VALUES`查询

```sql
> SHOW TAG VALUES ON "NOAA_water_database" WITH KEY = "randtag"

name: h2o_quality
key       value
---       -----
randtag   1
randtag   2
randtag   3
```

该查询返回数据库`NOAA_water_database`中的tag key `randtag`的所有tag value。`SHOW TAG VALUES`将查询结果按measurement的名字进行分组。

### 运行不带有`ON`子句的`SHOW TAG KEYS`查询

::: tabs

@tab CLI

使用`USE <database_name>`指定数据库：

```bash
> USE NOAA_water_database
Using database NOAA_water_database

> SHOW TAG VALUES WITH KEY = "randtag"

name: h2o_quality
key       value
---       -----
randtag   1
randtag   2
randtag   3
```

@tab API

使用参数`db`指定数据库

```bash
~# curl -G "http://localhost:8086/query?db=NOAA_water_database&pretty=true" --data-urlencode 'q=SHOW TAG VALUES WITH KEY = "randtag"'

{
    "results": [
        {
            "statement_id": 0,
            "series": [
                {
                    "name": "h2o_quality",
                    "columns": [
                        "key",
                        "value"
                    ],
                    "values": [
                        [
                            "randtag",
                            "1"
                        ],
                        [
                            "randtag",
                            "2"
                        ],
                        [
                            "randtag",
                            "3"
                        ]
                    ]
                }
            ]
        }
    ]
}
```

:::

### 运行带有多个子句的`SHOW TAG VALUES`查询

```sql
> SHOW TAG VALUES ON "NOAA_water_database" WITH KEY IN ("location","randtag") WHERE "randtag" =~ /./ LIMIT 3

name: h2o_quality
key        value
---        -----
location   coyote_creek
location   santa_monica
randtag	   1
```

该查询从数据库`NOAA_water_database`的所有measurement中返回`location`或`randtag`的tag value，并且返回的数据还需满足条件：`randtag`的tag value不为空。`LIMIT`子句将返回的tag value的个数限制为3。