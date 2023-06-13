---
order: 5
---

# SHOW TAG KEYS

Returns the tag key of the specified database.

## Syntax

```sql
SHOW TAG KEYS [ON <database_name>] [FROM_CLAUSE] [LIMIT_CLAUSE] [OFFSET_CLAUSE]
```

## Syntax Description

`ON <database_name>` is optional. If the query does not contain `ON <database_name>`, you must specify the database in the CLI using `USE <database_name>` or in the openGemini API request using the parameter `db`.

The `FROM` clause is optional.

## Examples

### Run a `SHOW TAG KEYS` query with the `ON` clause

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

This query returns the tag key in the database `NOAA_water_database`. The query results are grouped by the name of the measurement; it shows that each measurement has a tag key named `location` and that the measurement `h2o_quality` also has an additional tag key `randtag`.

### Run a `SHOW TAG KEYS` query without the `ON` clause

::: tabs

@tab CLI

Use `USE <database_name>` to specify the database:

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

Use the parameter `db` to specify the database

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

### Run a `SHOW TAG KEYS` query with multiple clauses

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

This query returns the tag key of the measurement named `h2o_quality` in the database `NOAA_water_database`. The `LIMIT` clause limits the number of tag keys returned to 1, and the `OFFSET` clause offsets the output by one.