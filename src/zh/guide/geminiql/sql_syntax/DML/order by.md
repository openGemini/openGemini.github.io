---
order: 4
---

# ORDER BY

openGemini 默认按递增的时间顺序返回结果。第一个返回的数据点，其时间戳是最早的，而最后一个返回的数据点，其时间戳是最新的。`ORDER BY time DESC`将默认的时间顺序调转，使得openGemini首先返回有最新时间戳的数据点，也就是说，按递减的时间顺序返回结果。

`ORDER BY` 子句仅支持对time排序。

## 语法

```sql
SELECT COLUMN_CLAUSES FROM_CLAUSE [WHERE_CLAUSE] [GROUP_BY_CLAUSE] ORDER BY time [ASC|DESC]
```

## 例子

### 首先返回最新的点

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

### 首先返回最新的点并且包含`GROUP BY time()`子句

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

