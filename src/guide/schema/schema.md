---
title: Manage schema
order: 4
---
This chapter mainly includes the following contents:
- [SHOW TAG KEYS ](#show-tag-keys)
- [SHOW TAG VALUES](#show-tag-values)
- [SHOW FIELD KEYS ](#show-field-keys)
- [SHOW SERIES](#show-series)
- [SHOW SERIES CARDINALITY](#show-series-cardinality)
- [SHOW SHARDS ](#show-shards)
- [SHOW SHARD GROUPS](#show-shard-groups)
- [SHOW CLUSTER](#show-cluster)

## SHOW TAG KEYS

View all TAG fields in the measurements

### Syntax

```sql
SHOW TAG KEYS [ON <database_name>] [FROM_CLAUSE] [LIMIT_CLAUSE] [OFFSET_CLAUSE]
```

`ON <database_name>` is optional. If the query does not contain `ON <database_name>`, you must specify the database in the CLI using `USE <database_name>` or in the openGemini API request using the parameter `db`.

`FROM` is optional.

### Examples

#### `SHOW TAG KEYS` with the `ON` clause

```sql
> SHOW TAG KEYS ON "NOAA_water_database"
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

This query returns the tag key in the database `NOAA_water_database`. The query results are grouped by the name of the measurement; it shows that each measurement has a tag key named `location` and that the measurement `h2o_quality` also has an additional tag key `randtag`.

#### `SHOW TAG KEYS` without the `ON` clause

::: tabs

@tab ts-cli

Use `USE <database_name>` to specify the database:

```sql
> use NOAA_water_database
Elapsed: 452ns
> SHOW TAG KEYS
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

@tab HTTP API

Use the parameter `db` to specify the database

```bash
> curl -G "http://localhost:8086/query?db=NOAA_water_database&pretty=true" --data-urlencode "q=SHOW TAG KEYS"
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

#### `SHOW TAG KEYS` with multiple clauses

```sql
> SHOW TAG KEYS ON "NOAA_water_database" FROM "h2o_quality" LIMIT 1 OFFSET 1
name: h2o_quality
+---------+
| tagKey  |
+---------+
| randtag |
+---------+
1 columns, 1 rows in set
```

This query returns the tag key of the measurement named `h2o_quality` in the database `NOAA_water_database`. The `LIMIT` clause limits the number of tag keys returned to 1, and the `OFFSET` clause offsets the output by one.

#### SHOW TAG KEY CARDINALITY

In some cases, you only need to know the number of TAGs. You can use the 'SHOW TAG KEY CARDINALITY' command as follows:
``` 
SHOW TAG KEY CARDINALITY [ON <database_name>] [FROM_CLAUSE]
```

```sql
> SHOW TAG KEY CARDINALITY
#TODO
```

## SHOW TAG VALUES

Returns the tag value of the specified tag key in the database.

### Syntax

```sql
SHOW TAG VALUES [ON <database_name>] [FROM_CLAUSE] WITH KEY [ [<operator> "<tag_key>" | <regular_expression>] | [IN ("<tag_key1>","<tag_key2")]] [WHERE <tag_key> <operator> ['<tag_value>' | <regular_expression>]] [LIMIT_CLAUSE] [OFFSET_CLAUSE]
```

`ON <database_name>` is optional. If the query does not contain `ON <database_name>`, you must specify the database in the CLI using `USE <database_name>` or in the HTTP API request using the parameter `db`.

The `WITH` clause is mandatory and it supports specifying a tag key, a regular expression or multiple tag keys.

The `FROM` clause, `WHERE` clause, `LIMIT` clause and `OFFSET` clause are optional. The `WHERE` clause supports tag comparisons; field comparisons are disabled in `SHOW TAG VALUES` queries.

Operators supported in the `WITH` clause and the `WHERE` clause:

| Operators | Description   |
| ------ | ------ |
| `=`    | equal   |
| `<>`   | not equal |
| `!=`   | not equal |
| `=~`   | match   |
| `!~`   | not match |

**relate entries** [`FROM`](../query_data/select.md#select)、[`LIMIT、OFFSET`](../query_data/select.md#limit-offset)

### Examples

#### `SHOW TAG VALUES` with the `ON` clause

```sql
> SHOW TAG VALUES ON "NOAA_water_database" WITH KEY = "randtag"

name: h2o_quality
key       value
---       -----
randtag   1
randtag   2
randtag   3
```

This query returns all tag values for the tag key `randtag` in the database `NOAA_water_database`. `SHOW TAG VALUES` groups the query results by the name of the measurement.

#### `SHOW TAG KEYS` without the `ON` clause

::: tabs

@tab ts-cli

Use `USE <database_name>` to specify the database:

```sql
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

@tab HTTP API

Use the parameter `db` to specify the database

```bash
> curl -G "http://localhost:8086/query?db=NOAA_water_database&pretty=true" --data-urlencode 'q=SHOW TAG VALUES WITH KEY = "randtag"'

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

#### `SHOW TAG VALUES` with multiple clauses

```sql
> SHOW TAG VALUES ON "NOAA_water_database" WITH KEY IN ("location","randtag") WHERE "randtag" =~ /./ LIMIT 3

name: h2o_quality
key        value
---        -----
location   coyote_creek
location   santa_monica
randtag	   1
```
This query returns the tag value of `location` or `randtag` from all measurements of database `NOAA_water_database`, and the returned data must also satisfy the condition that the tag value of `randtag` is not null. The `LIMIT` clause limits the number of returned tag values to 3.

## SHOW FIELD KEYS
Returns the data type of field key and field value.

### Syntax

```sql
SHOW FIELD KEYS [ON <database_name>] [FROM <measurement_name>]
```

`ON <database_name>` is optional. If the query does not contain `ON <database_name>`, you must specify the database in the CLI using `USE <database_name>` or in the openGemini API request using the parameter `db`.

The `FROM` clause is also optional.

**relate entries** [`FROM`](../query_data/select.md)

### Examples

#### `SHOW FIELD KEYS` with the `ON` clause

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

This query returns the field key of each measurement in the database `NOAA_water_database` and the data type of the corresponding field value.

#### `SHOW FIELD KEYS` without the `ON` clause

::: tabs

@tab ts-cli

Use `USE <database_name>` to specify the database:

```sql
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

@tab HTTP API

Use the parameter `db` to specify the database:

```bash
> curl -G "http://localhost:8086/query?db=NOAA_water_database&pretty=true" --data-urlencode 'q=SHOW FIELD KEYS'

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

#### `SHOW FIELD KEYS` with a `FROM` clause

```sql
> SHOW FIELD KEYS ON "NOAA_water_database" FROM "h2o_feet"

name: h2o_feet
fieldKey            fieldType
--------            ---------
level description   string
water_level         float
```

This query returns the data type of the fields key and the corresponding field value in the measurement `h2o_feet` in the database `NOAA_water_database`.

## SHOW SERIES

Returns the time series of the specified database.

### Syntax

```sql
SHOW SERIES [ON <database_name>] [FROM_CLAUSE] [WHERE <tag_key> <operator> [ '<tag_value>' | <regular_expression>]] [LIMIT_CLAUSE] [OFFSET_CLAUSE]
```
`ON <database_name>` is optional. If the query does not contain `ON <database_name>`, you must specify the database in the CLI using `USE <database_name>` or in the openGemini API request using the parameter `db`.

The `WHERE` clause supports `tag` comparisons; `field` comparisons are invalid in `SHOW SERIES` queries.

Operators supported in the `WHERE` clause:

| Operators | Description   |
| ------ | ------ |
| `=`    | equal   |
| `<>`   | not equal |
| `!=`   | not equal |
| `=~`   | match   |
| `!~`   | not match |

**relate entries** [`FROM`](../query_data/select.md#select)、[`LIMIT、OFFSET`](../query_data/select.md#limit-offset)

### Examples

#### `SHOW SERIES` with an `ON` clause

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

The output of this query is similar to the line protocol format. Everything before the first comma is the name of `measurement`. Everything after the first comma is the `tag key` or `tag value`. The database `NOAA_water_database` has five different `measurement`s and 14 different series.

#### `SHOW SERIES` without the `ON` clause

::: tabs

@tab TS-CLI

Use `USE <database_name>` to specify the database:

```bash
> USE NOAA_water_database
Elapsed: 561ns
> SHOW SERIES
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

@tab HTTP API

Use the parameter `db` to specify the database

```bash
> curl -G "http://localhost:8086/query?db=NOAA_water_database&pretty=true" --data-urlencode "q=SHOW SERIES"
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

#### `SHOW SERIES` with multiple clauses

```
> SHOW SERIES ON NOAA_water_database FROM "h2o_quality" WHERE "location" = 'coyote_creek' LIMIT 2
+---------------------------------------------+
| key                                         |
+---------------------------------------------+
| h2o_quality,location=coyote_creek,randtag=1 |
| h2o_quality,location=coyote_creek,randtag=2 |
+---------------------------------------------+
1 columns, 2 rows in set
```

This query returns all series associated with measurement `h2o_quality` and tag `location = coyote_creek` in database `NOAA_water_database`. The `LIMIT` clause limits the number of series returned to 2.

## SHOW SERIES CARDINALITY

Return the database time series cardinality

```
SHOW SERIES CARDINALITY [ON <database_name>] [FROM_clause]
```

### Example 

```sql
> SHOW SERIES CARDINALITY ON NOAA_water_database
+----------------------+----------------------+-------+
| startTime            | endTime              | count |
+----------------------+----------------------+-------+
| 2019-08-12T00:00:00Z | 2019-08-19T00:00:00Z | 14    |
+----------------------+----------------------+-------+
3 columns, 1 rows in set

+----------------------+----------------------+-------+
| startTime            | endTime              | count |
+----------------------+----------------------+-------+
| 2019-08-19T00:00:00Z | 2019-08-26T00:00:00Z | 14    |
+----------------------+----------------------+-------+
3 columns, 1 rows in set

+----------------------+----------------------+-------+
| startTime            | endTime              | count |
+----------------------+----------------------+-------+
| 2019-08-26T00:00:00Z | 2019-09-02T00:00:00Z | 14    |
+----------------------+----------------------+-------+
3 columns, 1 rows in set

+----------------------+----------------------+-------+
| startTime            | endTime              | count |
+----------------------+----------------------+-------+
| 2019-09-02T00:00:00Z | 2019-09-09T00:00:00Z | 14    |
+----------------------+----------------------+-------+
3 columns, 1 rows in set

+----------------------+----------------------+-------+
| startTime            | endTime              | count |
+----------------------+----------------------+-------+
| 2019-09-09T00:00:00Z | 2019-09-16T00:00:00Z | 14    |
+----------------------+----------------------+-------+
3 columns, 1 rows in set

+----------------------+----------------------+-------+
| startTime            | endTime              | count |
+----------------------+----------------------+-------+
| 2019-09-16T00:00:00Z | 2019-09-23T00:00:00Z | 14    |
+----------------------+----------------------+-------+
3 columns, 1 rows in set

> SHOW SERIES CARDINALITY ON NOAA_water_database FROM h2o_quality
+----------------------+----------------------+-------+
| startTime            | endTime              | count |
+----------------------+----------------------+-------+
| 2019-08-12T00:00:00Z | 2019-08-19T00:00:00Z | 6     |
+----------------------+----------------------+-------+
3 columns, 1 rows in set

+----------------------+----------------------+-------+
| startTime            | endTime              | count |
+----------------------+----------------------+-------+
| 2019-08-19T00:00:00Z | 2019-08-26T00:00:00Z | 6     |
+----------------------+----------------------+-------+
3 columns, 1 rows in set

+----------------------+----------------------+-------+
| startTime            | endTime              | count |
+----------------------+----------------------+-------+
| 2019-08-26T00:00:00Z | 2019-09-02T00:00:00Z | 6     |
+----------------------+----------------------+-------+
3 columns, 1 rows in set

+----------------------+----------------------+-------+
| startTime            | endTime              | count |
+----------------------+----------------------+-------+
| 2019-09-02T00:00:00Z | 2019-09-09T00:00:00Z | 6     |
+----------------------+----------------------+-------+
3 columns, 1 rows in set

+----------------------+----------------------+-------+
| startTime            | endTime              | count |
+----------------------+----------------------+-------+
| 2019-09-09T00:00:00Z | 2019-09-16T00:00:00Z | 6     |
+----------------------+----------------------+-------+
3 columns, 1 rows in set

+----------------------+----------------------+-------+
| startTime            | endTime              | count |
+----------------------+----------------------+-------+
| 2019-09-16T00:00:00Z | 2019-09-23T00:00:00Z | 6     |
+----------------------+----------------------+-------+
3 columns, 1 rows in set
```

## SHOW SHARDS

Return the shard information of a database

### Example 

```sql
> SHOW SHARDS
name: NOAA_water_database
+----+---------------------+------------------+-------------+----------------------+----------------------+----------------------+--------+------+------------------+
| id | database            | retention_policy | shard_group | start_time           | end_time             | expiry_time          | owners | tier | downSample_level |
+----+---------------------+------------------+-------------+----------------------+----------------------+----------------------+--------+------+------------------+
| 19 | NOAA_water_database | autogen          | 19          | 2019-08-12T00:00:00Z | 2019-08-19T00:00:00Z | 2019-08-19T00:00:00Z | 2      | warm | 0                |
| 20 | NOAA_water_database | autogen          | 20          | 2019-08-19T00:00:00Z | 2019-08-26T00:00:00Z | 2019-08-26T00:00:00Z | 2      | warm | 0                |
| 21 | NOAA_water_database | autogen          | 21          | 2019-08-26T00:00:00Z | 2019-09-02T00:00:00Z | 2019-09-02T00:00:00Z | 2      | warm | 0                |
| 18 | NOAA_water_database | autogen          | 18          | 2019-09-02T00:00:00Z | 2019-09-09T00:00:00Z | 2019-09-09T00:00:00Z | 2      | warm | 0                |
| 22 | NOAA_water_database | autogen          | 22          | 2019-09-09T00:00:00Z | 2019-09-16T00:00:00Z | 2019-09-16T00:00:00Z | 2      | warm | 0                |
| 23 | NOAA_water_database | autogen          | 23          | 2019-09-16T00:00:00Z | 2019-09-23T00:00:00Z | 2019-09-23T00:00:00Z | 2      | warm | 0                |
+----+---------------------+------------------+-------------+----------------------+----------------------+----------------------+--------+------+------------------+
10 columns, 6 rows in set
```

Each shard information includes the retention policy , shard time range, etc.  ref [RETENTION POLICY](./retention_policy.md)

## SHOW SHARD GROUPS

Returns the shard group information of a database

### Example 

```sql
> SHOW SHARD GROUPS
name: shard groups
+----+---------------------+------------------+----------------------+----------------------+----------------------+
| id | database            | retention_policy | start_time           | end_time             | expiry_time          |
+----+---------------------+------------------+----------------------+----------------------+----------------------+
| 19 | NOAA_water_database | autogen          | 2019-08-12T00:00:00Z | 2019-08-19T00:00:00Z | 2019-08-19T00:00:00Z |
| 20 | NOAA_water_database | autogen          | 2019-08-19T00:00:00Z | 2019-08-26T00:00:00Z | 2019-08-26T00:00:00Z |
| 21 | NOAA_water_database | autogen          | 2019-08-26T00:00:00Z | 2019-09-02T00:00:00Z | 2019-09-02T00:00:00Z |
| 18 | NOAA_water_database | autogen          | 2019-09-02T00:00:00Z | 2019-09-09T00:00:00Z | 2019-09-09T00:00:00Z |
| 22 | NOAA_water_database | autogen          | 2019-09-09T00:00:00Z | 2019-09-16T00:00:00Z | 2019-09-16T00:00:00Z |
| 23 | NOAA_water_database | autogen          | 2019-09-16T00:00:00Z | 2019-09-23T00:00:00Z | 2019-09-23T00:00:00Z |
+----+---------------------+------------------+----------------------+----------------------+----------------------+
6 columns, 6 rows in set
```

There are 6 shard groups here. If relate to `SHOW SHARDS` command, we can see that each shard group contains one shard. By default, one shard for openGemini standalone, each node is assigned a shard for a three-node cluster. When a `SHARD GROUP` expires, the system will create a new `SHARD GROUP` and assign a new shard. ref [SHARD GROUP DURATION](./retention_policy.md#shard-duration)

## SHOW CLUSTER

List the status of all nodes in the cluster

```sql
> show cluster
+---------------------+--------+----------------+--------+----------+--------------+
|        time         | status |    hostname    | nodeID | nodeType | availability |
+---------------------+--------+----------------+--------+----------+--------------+
| 1725327597969790000 | none   | 127.0.0.3:8091 |      1 | meta     | available    |
| 1725327597969790000 | none   | 127.0.0.1:8091 |      2 | meta     | available    |
| 1725327597969790000 | none   | 127.0.0.2:8091 |      3 | meta     | available    |
| 1725327597969790000 | alive  | 127.0.0.1:8400 |      4 | data     | available    |
| 1725327597969790000 | alive  | 127.0.0.2:8400 |      5 | data     | available    |
| 1725327597969790000 | alive  | 127.0.0.3:8400 |      6 | data     | available    |
+---------------------+--------+----------------+--------+----------+--------------+
6 columns, 6 rows in set

+------+-----------+----+------+-----------+-----------+-----------+----------+
| opId | eventType | db | ptId | srcNodeId | dstNodeId | currState | preState |
+------+-----------+----+------+-----------+-----------+-----------+----------+
+------+-----------+----+------+-----------+-----------+-----------+----------+
8 columns, 0 rows in set
```

The returned results include: cluster node information and node failover information.
