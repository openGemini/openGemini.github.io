---
order: 6
---

# TIMEZONE

The `tz()` clause returns the UTC offset of the specified time zone.

## Syntax

```sql
SELECT COLUMN_CLAUSES FROM_CLAUSE [WHERE_CLAUSE] [GROUP_BY_CLAUSE] [LIMIT_CLAUSE] [OFFSET_CLAUSE] tz('<time_zone>')
```

openGemini stores and returns timestamps in UTC format by default.

## Examples

### Return the UTC offset of the Chicago time zone

```sql
>>> SELECT "water_level" FROM "h2o_feet" WHERE "location" = 'santa_monica' AND time >= '2019-08-18T00:00:00Z' AND time <= '2019-08-18T00:18:00Z' tz('America/Chicago')
name: h2o_feet
+---------------------+-------------+
| time                | water_level |
+---------------------+-------------+
| 1566086400000000000 | 2.352       |
| 1566086760000000000 | 2.379       |
| 1566087120000000000 | 2.343       |
| 1566087480000000000 | 2.329       |
+---------------------+-------------+
2 columns, 4 rows in set
```

The timestamp of this query contains the UTC offset (`-05:00`) from the USA/Chicago (`America/Chicago`) time zone.