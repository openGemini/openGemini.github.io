---
order: 7
---

# SHOW FIELD KEYS
返回field key和field value的数据类型。

## 语法

```sql
SHOW FIELD KEYS [ON <database_name>] [FROM <measurement_name>]
```

## 语法描述

`ON <database_name>`是可选的。如果查询中没有包含`ON <database_name>`，您必须在CLI中使用`USE <database_name>`指定数据库，或者在openGemini API请求中使用参数`db`指定数据库。

`FROM`子句也是可选的。请查阅DML章节获得关于[`FROM`子句](../DML/select.md)的介绍。

> **注意：**在不同的shard，field的数据类型可以不同。如果您的field中有多个数据类型，那么`SHOW FIELD KEYS`按以下顺序返回不同类型的数据：float，integer，string，boolean。

## 示例

### 运行带有`ON`子句的`SHOW FIELD KEYS`查询

```sql
> SHOW FIELD KEYS ON "NOAA_water_database"

name: average_temperature
fieldKey            fieldType
--------            ---------
degrees             float

name: h2o_feet
fieldKey            fieldType
--------            ---------
level description   string
water_level         float

name: h2o_pH
fieldKey            fieldType
--------            ---------
pH                  float

name: h2o_quality
fieldKey            fieldType
--------            ---------
index               float

name: h2o_temperature
fieldKey            fieldType
--------            ---------
degrees             float
```

该查询返回数据库`NOAA_water_database`中每个measurement的field key以及对应的field value的数据类型。

### 运行不带有`ON`子句的`SHOW FIELD KEYS`查询

::: tabs

@tab CLI

使用`USE <database_name>`指定数据库：

```bash
> USE NOAA_water_database
Using database NOAA_water_database

> SHOW FIELD KEYS

name: average_temperature
fieldKey            fieldType
--------            ---------
degrees             float

name: h2o_feet
fieldKey            fieldType
--------            ---------
level description   string
water_level         float

name: h2o_pH
fieldKey            fieldType
--------            ---------
pH                  float

name: h2o_quality
fieldKey            fieldType
--------            ---------
index               float

name: h2o_temperature
fieldKey            fieldType
--------            ---------
degrees             float
```

@tab API

使用参数`db`指定数据库

```bash
~# curl -G "http://localhost:8086/query?db=NOAA_water_database&pretty=true" --data-urlencode 'q=SHOW FIELD KEYS'

{
    "results": [
        {
            "statement_id": 0,
            "series": [
                {
                    "name": "average_temperature",
                    "columns": [
                        "fieldKey",
                        "fieldType"
                    ],
                    "values": [
                        [
                            "degrees",
                            "float"
                        ]
                    ]
                },
                {
                    "name": "h2o_feet",
                    "columns": [
                        "fieldKey",
                        "fieldType"
                    ],
                    "values": [
                        [
                            "level description",
                            "string"
                        ],
                        [
                            "water_level",
                            "float"
                        ]
                    ]
                },
                {
                    "name": "h2o_pH",
                    "columns": [
                        "fieldKey",
                        "fieldType"
                    ],
                    "values": [
                        [
                            "pH",
                            "float"
                        ]
                    ]
                },
                {
                    "name": "h2o_quality",
                    "columns": [
                        "fieldKey",
                        "fieldType"
                    ],
                    "values": [
                        [
                            "index",
                            "float"
                        ]
                    ]
                },
                {
                    "name": "h2o_temperature",
                    "columns": [
                        "fieldKey",
                        "fieldType"
                    ],
                    "values": [
                        [
                            "degrees",
                            "float"
                        ]
                    ]
                }
            ]
        }
    ]
}
```

:::

### 运行带有`FROM`子句的`SHOW FIELD KEYS`查询

```sql
> SHOW FIELD KEYS ON "NOAA_water_database" FROM "h2o_feet"

name: h2o_feet
fieldKey            fieldType
--------            ---------
level description   string
water_level         float
```

该查询返回数据库`NOAA_water_database`中measurement `h2o_feet`里的fields key以及对应的field value的数据类型。

## SHOW FIELD KEYS的常见问题
### SHOW FIELD KEYS和field的类型差异
在同一个shard，field value的数据类型不能发生变化，但是在不同的shard，field的数据类型可以不同。`SHOW FIELD KEYS`遍历每个shard返回与field key相关联的所有数据类型。

**示例**
field `all_the_types`中存储了四个不同的数据类型：
```bash
> SHOW FIELD KEYS

name: mymeas
fieldKey        fieldType
--------        ---------
all_the_types   integer
all_the_types   float
all_the_types   string
all_the_types   boolean
```

**注意**：`SHOW FIELD KEYS`处理field的类型差异与`SELECT`语句不一样。

