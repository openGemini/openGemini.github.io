---
order: 3
---

# SHOW SERIES

Returns the series of the specified database.

## Syntax

```sql
SHOW SERIES [ON <database_name>] [FROM_CLAUSE] [WHERE <tag_key> <operator> [ '<tag_value>' | <regular_expression>]] [LIMIT_CLAUSE] [OFFSET_CLAUSE]
```

## Syntax Description

`ON <database_name>` is optional. If the query does not contain `ON <database_name>`, you must specify the database in the CLI using `USE <database_name>` or in the openGemini API request using the parameter `db`.

The `WHERE` clause supports `tag` comparisons; `field` comparisons are invalid in `SHOW SERIES` queries.

Operators supported in the `WHERE` clause:

| Operators | Meaning   |
| ------ | ------ |
| `=`    | equal to   |
| `<>`   | not equal to |
| `!=`   | not equal to |
| `=~`   | match   |
| `!~`   | no match |

Please consult the DML section for information on the [`FROM` clause](../DML/select.md#Fromclause), [`LIMIT, OFFSET` clause](../DML/limit_offset.md), and the introduction of regular expressions.

## Examples

### Run a `SHOW SERIES` query with an `ON` clause

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

### Run a `SHOW SERIES` query without the `ON` clause

::: tabs

@tab CLI

Use `USE <database_name>` to specify the database:

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

Use the parameter `db` to specify the database

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

### Run a `SHOW SERIES` query with multiple clauses

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

This query returns all series associated with measurement `h2o_quality` and tag `location = coyote_creek` in database `NOAA_water_database`. The `LIMIT` clause limits the number of series returned to 2.