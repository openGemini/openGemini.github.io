---
order: 2
---

# SHOW RETENTION POLICIES

Returns a list of **reservation policies** for the specified database.

## Syntax

```sql
SHOW RETENTION POLICIES [ON <database_name>]
```

## Syntax Description

`ON <database_name>` is optional. If the query does not contain `ON <database_name>`, you must specify the database in the CLI using `USE <database_name>` or in the openGemini API request using the parameter `db`.

## Examples

### Run the `SHOW RETENTION POLICIES` query with the `ON` clause

```sql
>>> SHOW RETENTION POLICIES ON NOAA_water_database
+---------+----------+--------------------+--------------+---------------+----------------+----------+---------+
| name    | duration | shardGroupDuration | hot duration | warm duration | index duration | replicaN | default |
+---------+----------+--------------------+--------------+---------------+----------------+----------+---------+
| autogen | 0s       | 168h0m0s           | 0s           | 0s            | 168h0m0s       | 1        | true    |
+---------+----------+--------------------+--------------+---------------+----------------+----------+---------+
8 columns, 1 rows in set
```

This query returns all the retention policies in the database `NOAA_water_database` in tabular form. This database has a retention policy named `autogen` that has unlimited duration, a shard group duration of 7 days, a replication factor of 1, and it is the default (`DEFAULT`) retention policy for this database.

### Run the `SHOW RETENTION POLICIES` query without the `ON` clause

::: tabs

@tab CLI

Specify the database using `USE <database_name>`

```bash
>>> use NOAA_water_database
Elapsed: 704ns
>>> SHOW RETENTION POLICIES
+---------+----------+--------------------+--------------+---------------+----------------+----------+---------+
| name    | duration | shardGroupDuration | hot duration | warm duration | index duration | replicaN | default |
+---------+----------+--------------------+--------------+---------------+----------------+----------+---------+
| autogen | 0s       | 168h0m0s           | 0s           | 0s            | 168h0m0s       | 1        | true    |
+---------+----------+--------------------+--------------+---------------+----------------+----------+---------+
8 columns, 1 rows in set
```

@tab API

Use the parameter `db` to specify the database

```bash
~$ curl -G "http://localhost:8086/query?db=NOAA_water_database&pretty=true" --data-urlencode "q=SHOW RETENTION POLICIES"

{
    "results": [
        {
            "statement_id": 0,
            "series": [
                {
                    "columns": [
                        "name",
                        "duration",
                        "shardGroupDuration",
                        "hot duration",
                        "warm duration",
                        "index duration",
                        "replicaN",
                        "default"
                    ],
                    "values": [
                        [
                            "autogen",
                            "0s",
                            "168h0m0s",
                            "0s",
                            "0s",
                            "168h0m0s",
                            1,
                            true
                        ]
                    ]
                }
            ]
        }
    ]
}
```

:::