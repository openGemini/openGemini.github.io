---
order: 6
---

# TIMEZONE

`tz()`子句返回指定时区的UTC偏移量。

## 语法

```sql
SELECT COLUMN_CLAUSES FROM_CLAUSE [WHERE_CLAUSE] [GROUP_BY_CLAUSE] [LIMIT_CLAUSE] [OFFSET_CLAUSE] tz('<time_zone>')
```

openGemini 默认以UTC格式存储和返回时间戳。

## 例子

### 返回芝加哥时区的UTC偏移量

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

该查询结果中，时间戳包含了美国/芝加哥（`America/Chicago`）的时区的UTC偏移量（`-05:00`）。