---
order: 2
---

# WHERE

The `WHERE` clause filters the data based on field, tag, and timestamp.

## Syntax

```sql
SELECT COLUMN_CLAUSES FROM_CLAUSE WHERE <CONDITION> [(AND|OR) <CONDITION> [...]]
```

### Tags

```sql
tag_key <operator> ['tag_value']
```

In the `WHERE` clause, enclose `tag value` in single quotes. If `tag value` is not enclosed in quotes or if double quotes are used, then no query results will be returned, and in most cases, no errors will be returned.

Supported operators are:

| Operators | Meaning   |
| :----: | :----- |
|  `=`   | equal to   |
|  `<>`  | not equal to |
|  `!=`  | not equal to |

The operator also supports: regular expressions.

### Fields

```sql
field_key <operator> ['string' | boolean | float | integer]
```

The `WHERE` clause supports comparison of `field value`, which can be a string, a boolean, a floating point number or an integer.

In the `WHERE` clause, enclose the string type `field value` in single quotes. If the string type field value is not enclosed in quotes or is enclosed in double quotes, then no query results will be returned, and in most cases, no errors will be returned.

Supported operators are:

| Operators | Meaning     |
| :----: | :------- |
|  `=`   | equal to     |
|  `<>`  | not equal to   |
|  `!=`  | not equal to   |
|  `>`   | greater than     |
|  `>=`  | greater than or equal to |
|  `<`   | less than     |
|  `<=`  | less than or equal to |

The operator also supports: arithmetic operations and regular expressions.

### Timestamp

For most `SELECT` statements, the default time range is the full time range. For `SELECT` statements with the `GROUP BY time()` clause, the default time range is from **the time of the data with the smallest time** to `now()`.

## Examples

### Query the data whose field value meets certain conditions

```sql
>>> SELECT * FROM "h2o_feet" WHERE "water_level" > 8
name: h2o_feet
+---------------------+---------------------------+--------------+-------------+
| time                | level description         | location     | water_level |
+---------------------+---------------------------+--------------+-------------+
| 1566000000000000000 | between 6 and 9 feet      | coyote_creek | 8.12        |
| 1566000360000000000 | between 6 and 9 feet      | coyote_creek | 8.005       |
| [......]                                                                     |
| 1568679120000000000 | between 6 and 9 feet      | coyote_creek | 8.189       |
| 1568679480000000000 | between 6 and 9 feet      | coyote_creek | 8.084       |
+---------------------+---------------------------+--------------+-------------+
4 columns, 1503 rows in set
```

This query returns the data in `h2o_feet` that satisfy the condition: the value of field key `water_level` is greater than 8.

### Query the data whose field value and tag value both meet certain conditions

```sql
>>> SELECT "water_level" FROM "h2o_feet" WHERE "location" <> 'santa_monica' AND (water_level < -0.57 OR water_level > 9.95)
name: h2o_feet
+---------------------+-------------+
| time                | water_level |
+---------------------+-------------+
| 1566976680000000000 | 9.957       |
| 1566977040000000000 | 9.964       |
| 1566977400000000000 | 9.954       |
| 1567002240000000000 | -0.587      |
| 1567002600000000000 | -0.61       |
| 1567002960000000000 | -0.591      |
| 1567091880000000000 | -0.594      |
| 1567092240000000000 | -0.571      |
+---------------------+-------------+
2 columns, 8 rows in set
```

### Query the data whose timestamp meets certain conditions

```sql
>>> SELECT * FROM "h2o_feet" WHERE time > now() - 7d
Elapsed: 1.062851ms
```

No data within the last 7 days was met.