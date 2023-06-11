---
order: 1
---

# SELECT

The `SELECT` query performs data retrieval. By default, the requested data is returned to the client and in combination with [SELECT INTO]() can be forwarded to a different table.

## Sample data

Before we start exploring the data, to better demonstrate the syntax below, let's import publicly available data from the National Oceanic and Atmospheric Administration's (NOAA) Center for Operational Oceanic Products and Services, first follow the [Sample data](../../sample_data.md) document input data.

The example queries in the following sections operate on the sample data described above.

## Clients

To facilitate exploration of the data, please log in with ts-cli first:

```shell
$ ts-cli -database NOAA_water_database
openGemini CLI 0.1.0 (rev-revision)
Please use `quit`, `exit` or `Ctrl-D` to exit this program.
> 
```

## Syntax

```sql
SELECT COLUMN_CLAUSES FROM_CLAUSE
```

## SELECT clause

The `SELECT` clause supports the following formats:

| Format                                         | Meaning                                                                                          |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `SELECT *`                                     | Return all tags and fields                                                                       |
| `SELECT "<field_key>"`                         | Returns the specified field                                                                      |
| `SELECT "<field_key>","<field_key>"`           | Returns multiple specified fields                                                                |
| `SELECT "<field_key>","<tag_key>"`             | Returns the specified field and tag. If a tag is specified, at least one field must be specified |
| `SELECT "<field_key>"::field,"<tag_key>"::tag` | Returns a specific field and tag. The ::[field \| tag] syntax specifies the identifier type. Use this syntax to distinguish between a field and a tag with the same name |

Other supported functions: [Mathematical expressions](../../math.md)、 [Aggregate Arithmetic](../../functions.md)、 [Regular expressions]()

::: tip

The SELECT statement cannot contain both ==aggregates== **and** ==non-aggregate functions, field_key or tag_key==.

:::

## FROM clause

The `FROM` clause specifies to read data from the following data sources:

- Table
- Subquery

Supported formats:

| Format                                                       | Meaning                                                                                            |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| `FROM <measurement_name>`                                    | Retrieving data from a single table                                                                |
| `FROM <measurement_name>,<measurement_name>`                 | Retrieving data from multiple tables                                                               |
| `FROM <database_name>.<retention_policy_name>.<measurement_name>` | Get data from the specified database, the specified retention_policy, and the specified table |
| `FROM <database_name>..<measurement_name>`                   | Get data from the specified database, default retention_policy, specified table                    |
| `FROM /<regular_expression_measurement>/`                    | Match the corresponding table with a regular expression and get the data                           |

## Examples

All fields and tags queried from a table.

```sql
> select * from "h2o_feet"
name: h2o_feet
time                 level description         location     water_level
----                 -----------------         --------     -----------
2019-08-17T00:00:00Z below 3 feet              santa_monica 2.064
2019-08-17T00:00:00Z between 6 and 9 feet      coyote_creek 8.12
2019-08-17T00:06:00Z below 3 feet              santa_monica 2.116
[......]
2019-09-17T21:30:00Z between 3 and 6 feet      santa_monica 5.01
2019-09-17T21:36:00Z between 3 and 6 feet      santa_monica 5.066
2019-09-17T21:42:00Z between 3 and 6 feet      santa_monica 4.938
```

Query the top 5 data of a specified field from a table.

```sql
> SELECT top("water_level", 5) FROM "h2o_feet"
name: h2o_feet
time                 top
----                 ---
2019-08-28T07:12:00Z 9.938
2019-08-28T07:18:00Z 9.957
2019-08-28T07:24:00Z 9.964
2019-08-28T07:30:00Z 9.954
2019-08-28T07:36:00Z 9.941
```

Query the latest row from a table and query the corresponding tag.

```sql
> SELECT last("water_level"), location FROM "h2o_feet"
name: h2o_feet
time                 last  location
----                 ----  --------
2019-09-17T21:42:00Z 4.938 santa_monica
```

Query all data from a table and do some basic operations.

```sql
> SELECT ("water_level" * 4) + 2 FROM "h2o_feet" limit 10
name: h2o_feet
time                 water_level
----                 -----------
2019-08-17T00:00:00Z 10.256
2019-08-17T00:00:00Z 34.48
[......]
2019-09-17T21:36:00Z 22.264
2019-09-17T21:42:00Z 21.752
```

