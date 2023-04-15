---
order: 5
---

# LIMIT OFFSET

`LIMIT <N>` 子句是限制每个查询返回的数据点个数。

`OFFSET <N>`子句表示从查询结果中的第`N`个数据点开始返回。

## 语法

```sql
SELECT COLUMN_CLAUSES FROM_CLAUSE [WHERE_CLAUSE] [GROUP_BY_CLAUSE] [ORDER_BY_CLAUSE] LIMIT <N1> OFFSET <N2>
```

`N2`表示从第`N2`个数据点开始返回，返回指定measurement的前`N1`个数据点，不会返回所有时间线的数据。

## 例子

#### 同时指定数据点返回的位置和数据量	

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

该查询从measurement `h2o_feet`中返回第四、第五和第六个数据点。如果以上查询语句中没有使用`OFFSET 3`，那么查询将返回该measurement的第一、第二和第三个数据点。