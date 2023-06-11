---
order: 4
---

# ORDER BY

openGemini returns results in incremental chronological order by default. The first data point returned has the earliest timestamp, while the last data point returned has the most recent timestamp. `ORDER BY time DESC` reverses the default chronological order so that openGemini returns the data point with the most recent timestamp first, i.e., returns results in decreasing chronological order.

The `ORDER BY` clause only supports sorting on time.

## Syntax

```sql
SELECT COLUMN_CLAUSES FROM_CLAUSE [WHERE_CLAUSE] [GROUP_BY_CLAUSE] ORDER BY time [ASC|DESC]
```

## Examples

### First return the latest point

```sql
>>> SELECT "water_level","location" FROM "h2o_feet" WHERE time >= '2019-08-18T00:00:00Z' AND time <= '2019-08-18T00:30:00Z' ORDER BY time DESC
name: h2o_feet
+---------------------+-------------+--------------+
| time                | water_level | location     |
+---------------------+-------------+--------------+
| 1566088200000000000 | 2.267       | santa_monica |
| 1566088200000000000 | 8.012       | coyote_creek |
| 1566087840000000000 | 2.264       | santa_monica |
| 1566087840000000000 | 8.13        | coyote_creek |
| 1566087480000000000 | 2.329       | santa_monica |
| 1566087480000000000 | 8.225       | coyote_creek |
| 1566087120000000000 | 2.343       | santa_monica |
| 1566087120000000000 | 8.32        | coyote_creek |
| 1566086760000000000 | 2.379       | santa_monica |
| 1566086760000000000 | 8.419       | coyote_creek |
| 1566086400000000000 | 2.352       | santa_monica |
| 1566086400000000000 | 8.504       | coyote_creek |
+---------------------+-------------+--------------+
3 columns, 12 rows in set
```

### First return the latest point and include the `GROUP BY time()` clause

```sql
>>> SELECT COUNT("water_level") FROM "h2o_feet" WHERE time >= '2019-08-18T00:00:00Z' AND time <= '2019-08-18T00:30:00Z' GROUP BY time(12m) ORDER BY time DESC
name: h2o_feet
+---------------------+-------+
| time                | count |
+---------------------+-------+
| 1566087840000000000 | 4     |
| 1566087120000000000 | 4     |
| 1566086400000000000 | 4     |
+---------------------+-------+
2 columns, 3 rows in set
```

