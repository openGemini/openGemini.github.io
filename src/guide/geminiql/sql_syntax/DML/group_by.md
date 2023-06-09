---
order: 3
---

# GROUP BY

The `GROUP BY` clause groups query results by a user-specified tag or time interval.

The `GROUP BY` clause groups the query results in the following way:

- One or more specified `tags`
- Specified time interval

::: warning

You cannot use `GROUP BY` to group `fields`

:::

## Syntax

## GROUP BY tags

```sql
SELECT COLUMN_CLAUSES FROM_CLAUSE [WHERE_CLAUSE] GROUP BY [* | <tag_key>[,<tag_key]]
```

## GROUP BY time intervals

`GROUP BY time()` groups query results by user-specified time interval.

```sql
SELECT COLUMN_CLAUSES FROM_CLAUSE [WHERE_CLAUSE] GROUP BY time(<time_interval>),[tag_key] [fill(<fill_option>)]
```

**time(time_interval)**

The `time_interval` in the `GROUP BY time()` clause is a duration that determines by what interval openGemini groups the query results. For example, when `time_interval` is `5m`, then the query results are grouped by 5 minutes within the time range specified in the `WHERE` clause.

**fill()**

`fill(<fill_option>)` is optional, it will change the return value of the interval without data.


## Examples

### Grouping of query results by individual tag

```sql
>>> SELECT MEAN("water_level") FROM "h2o_feet" GROUP BY "location"
name: h2o_feet
tags: location=coyote_creek
+------+--------------------+
| time | mean               |
+------+--------------------+
| 0    | 5.3591424203039155 |
+------+--------------------+
2 columns, 1 rows in set

name: h2o_feet
tags: location=santa_monica
+------+--------------------+
| time | mean               |
+------+--------------------+
| 0    | 3.5307120942458803 |
+------+--------------------+
2 columns, 1 rows in set
```

### Grouping query results by 12-minute intervals

```sql
>>> SELECT COUNT("water_level") FROM "h2o_feet" WHERE time >= '2019-08-18T00:00:00Z' AND time <= '2019-08-18T00:30:00Z' GROUP BY time(12m)
name: h2o_feet
+---------------------+-------+
| time                | count |
+---------------------+-------+
| 1566086400000000000 | 4     |
| 1566087120000000000 | 4     |
| 1566087840000000000 | 4     |
+---------------------+-------+
2 columns, 3 rows in set
```

