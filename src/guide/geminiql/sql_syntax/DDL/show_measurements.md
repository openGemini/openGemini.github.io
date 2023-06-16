---
order: 4
---

# SHOW MEASUREMENTS

Returns the measurement of the specified database.

## Syntax

```sql
SHOW MEASUREMENTS [ON <database_name>] [WITH MEASUREMENT <operator> ['<measurement_name>' | <regular_expression>]]
```

## Syntax Description

`ON <database_name>` is optional. If the query does not contain `ON <database_name>`, you must specify the database in the CLI using `USE <database_name>` or in the openGemini API request using the parameter `db`.

The `WITH` clause, the `WHERE` clause, the `LIMIT` clause and the `OFFSET` clause are optional. The `WHERE` clause supports tag comparisons; field comparisons are disabled in `SHOW MEASUREMENTS` queries.

Operators supported in the `WHERE` clause:

| Operators | Meaning   |
| ------ | ------ |
| `=`    | equal to   |
| `<>`   | not equal to |
| `!=`   | not equal to |
| `=~`   | match   |
| `!~`   | no match |

Please consult the DML section for information on the [`FROM` clause](../DML/select.md#FROMclause), [`LIMIT, OFFSET` clause](../DML/limit_offset.md), and the introduction of regular expressions.

## Examples

### Run the `SHOW MEASUREMENTS` query with the `ON` clause

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

This query returns measurements from the database `NOAA_water_database`, which has five measurements: `average_temperature`, `h2o_feet`, `h2o_pH`, `h2o_ quality` and `h2o_temperature`.

### Run a `SHOW MEASUREMENTS` query without the `ON` clause

::: tabs

@tab CLI

Use `USE <database_name>` to specify the database:

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

Use the parameter `db` to specify the database

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

### Run a `SHOW MEASUREMENTS` query with multiple clauses

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

This query returns the measurements in the database `NOAA_water_database` whose names start with `h2o`.