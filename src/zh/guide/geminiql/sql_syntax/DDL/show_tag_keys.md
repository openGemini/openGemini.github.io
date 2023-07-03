---
order: 15
---

# SHOW TAG KEYS (查看表中所有TAG字段)

返回指定数据库的tag key。

## 语法

```sql
SHOW TAG KEYS [ON <database_name>] [FROM_CLAUSE] [LIMIT_CLAUSE] [OFFSET_CLAUSE]
```

## 语法描述

`ON <database_name>`是可选项。如果查询中没有包含`ON <database_name>`，您必须在CLI中使用`USE <database_name>`指定数据库，或者在openGemini API请求中使用参数`db`指定数据库。

`FROM`子句是可选的。

## 示例

### 运行带有`ON`子句的`SHOW TAG KEYS`查询

```sql
>>> SHOW TAG KEYS ON "NOAA_water_database"
name: average_temperature
+----------+
| tagKey   |
+----------+
| location |
+----------+
1 columns, 1 rows in set

name: h2o_feet
+----------+
| tagKey   |
+----------+
| location |
+----------+
1 columns, 1 rows in set

name: h2o_pH
+----------+
| tagKey   |
+----------+
| location |
+----------+
1 columns, 1 rows in set

name: h2o_quality
+----------+
| tagKey   |
+----------+
| location |
| randtag  |
+----------+
1 columns, 2 rows in set

name: h2o_temperature
+----------+
| tagKey   |
+----------+
| location |
+----------+
1 columns, 1 rows in set

```

该查询返回数据库`NOAA_water_database`中的tag key。查询结果按measurement的名字进行分组；它展示了每个measurement都有一个名为`location`的tag key，并且，measurement `h2o_quality`还具有另外一个tag key `randtag`。

### 运行不带有`ON`子句的`SHOW TAG KEYS`查询

::: tabs

@tab CLI

使用`USE <database_name>`指定数据库：

```sql
>>> use NOAA_water_database
Elapsed: 452ns
>>> SHOW TAG KEYS
name: average_temperature
+----------+
| tagKey   |
+----------+
| location |
+----------+
1 columns, 1 rows in set

name: h2o_feet
+----------+
| tagKey   |
+----------+
| location |
+----------+
1 columns, 1 rows in set

name: h2o_pH
+----------+
| tagKey   |
+----------+
| location |
+----------+
1 columns, 1 rows in set

name: h2o_quality
+----------+
| tagKey   |
+----------+
| location |
| randtag  |
+----------+
1 columns, 2 rows in set

name: h2o_temperature
+----------+
| tagKey   |
+----------+
| location |
+----------+
1 columns, 1 rows in set
```

@tab API

使用参数`db`指定数据库

```bash
~# curl -G "http://localhost:8086/query?db=NOAA_water_database&pretty=true" --data-urlencode "q=SHOW TAG KEYS"
{
    "results": [
        {
            "statement_id": 0,
            "series": [
                {
                    "name": "average_temperature",
                    "columns": [
                        "tagKey"
                    ],
                    "values": [
                        [
                            "location"
                        ]
                    ]
                },
                {
                    "name": "h2o_feet",
                    "columns": [
                        "tagKey"
                    ],
                    "values": [
                        [
                            "location"
                        ]
                    ]
                },
                {
                    "name": "h2o_pH",
                    "columns": [
                        "tagKey"
                    ],
                    "values": [
                        [
                            "location"
                        ]
                    ]
                },
                {
                    "name": "h2o_quality",
                    "columns": [
                        "tagKey"
                    ],
                    "values": [
                        [
                            "location"
                        ],
                        [
                            "randtag"
                        ]
                    ]
                },
                {
                    "name": "h2o_temperature",
                    "columns": [
                        "tagKey"
                    ],
                    "values": [
                        [
                            "location"
                        ]
                    ]
                }
            ]
        }
    ]
}
```

:::

### 运行带有多个子句的`SHOW TAG KEYS`查询

```sql
>>> SHOW TAG KEYS ON "NOAA_water_database" FROM "h2o_quality" LIMIT 1 OFFSET 1
name: h2o_quality
+---------+
| tagKey  |
+---------+
| randtag |
+---------+
1 columns, 1 rows in set
```

该查询返回数据库`NOAA_water_database`中名为`h2o_quality`的measurement里的tag key。`LIMIT`子句将返回的tag key的个数限制为1，`OFFSET`子句将输出结果偏移一个。

### 查看TAG的统计数量
在某些场景下，仅需要了解TAG数量，不关心具体的TAG，可以使用SHOW TAG KEY CARDINALITY命令，使用方式如下：
``` 
SHOW TAG KEY CARDINALITY [ON <database_name>] [FROM_CLAUSE]
```
例如：
```sql
>>> SHOW TAG KEY CARDINALITY
#TODO
```
