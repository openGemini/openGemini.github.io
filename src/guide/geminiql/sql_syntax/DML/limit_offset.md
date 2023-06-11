---
order: 5
---

# LIMIT OFFSET

The `LIMIT <N>` clause is a limit on the number of data points returned per query.

The `OFFSET <N>` clause indicates that the return starts from the `N`th data point in the query result.

## Syntax

```sql
SELECT COLUMN_CLAUSES FROM_CLAUSE [WHERE_CLAUSE] [GROUP_BY_CLAUSE] [ORDER_BY_CLAUSE] LIMIT <N1> OFFSET <N2>
```

`N2` means return from the `N2`th data point, returning the first `N1` data points of the specified measurement, and will not return data for all timelines.

## Examples

#### Also specify the location and amount of data to be returned for the data point	

```sql
>>> SELECT "water_level","location" FROM "h2o_feet" LIMIT 3 OFFSET 3
name: h2o_feet
+---------------------+-------------+--------------+
| time                | water_level | location     |
+---------------------+-------------+--------------+
| 1566000360000000000 | 2.116       | santa_monica |
| 1566000720000000000 | 7.887       | coyote_creek |
| 1566000720000000000 | 2.028       | santa_monica |
+---------------------+-------------+--------------+
3 columns, 3 rows in set
```

This query returns the fourth, fifth, and sixth data points from measurement `h2o_feet`. If `OFFSET 3` is not used in the above query statement, then the query will return the first, second and third data points of that measurement.