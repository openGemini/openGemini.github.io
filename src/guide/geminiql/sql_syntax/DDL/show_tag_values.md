---
order: 6
---

# SHOW TAG VALUES

Returns the tag value of the specified tag key in the database.

## Syntax

```sql
SHOW TAG VALUES [ON <database_name>] [FROM_CLAUSE] WITH KEY [ [<operator> "<tag_key>" | <regular_expression>] | [IN ("<tag_key1>","<tag_key2")]] [WHERE <tag_key> <operator> ['<tag_value>' | <regular_expression>]] [LIMIT_CLAUSE] [OFFSET_CLAUSE]
```

## Syntax Description

`ON <database_name>` is optional. If the query does not contain `ON <database_name>`, you must specify the database in the CLI using `USE <database_name>` or in the HTTP API request using the parameter `db`.

The `WITH` clause is mandatory and it supports specifying a tag key, a regular expression or multiple tag keys.

The `FROM` clause, `WHERE` clause, `LIMIT` clause and `OFFSET` clause are optional. The `WHERE` clause supports tag comparisons; field comparisons are disabled in `SHOW TAG VALUES` queries.

Operators supported in the `WITH` clause and the `WHERE` clause:

| Operators | Meaning   |
| ------ | ------ |
| `=`    | equal to   |
| `<>`   | not equal to |
| `!=`   | not equal to |
| `=~`   | match   |
| `!~`   | no match |

Please consult the DML section for information on the [`FROM` clause](../DML/select.md#Fromclause), [`LIMIT, OFFSET` clause](../DML/limit_offset.md), and the introduction of regular expressions.

## Examples

### Run a `SHOW TAG VALUES` query with the `ON` clause

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

### Run a `SHOW TAG KEYS` query without the `ON` clause

::: tabs

@tab CLI

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

@tab API

Use the parameter `db` to specify the database

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

### Run a `SHOW TAG VALUES` query with multiple clauses

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