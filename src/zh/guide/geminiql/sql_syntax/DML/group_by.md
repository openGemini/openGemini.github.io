---
order: 3
---

# GROUP BY

`GROUP BY`子句按用户指定的tag或者时间区间对查询结果进行分组。

`GROUP BY`子句按以下方式对查询结果进行分组：

- 一个或多个指定的`tags`
- 指定的时间间隔

::: warning

不能使用`GROUP BY`对`fields`进行分组

:::

## 语法

## GROUP BY tags

```sql
SELECT COLUMN_CLAUSES FROM_CLAUSE [WHERE_CLAUSE] GROUP BY [* | <tag_key>[,<tag_key]]
```

## GROUP BY time intervals

`GROUP BY time()`按用户指定的时间间隔对查询结果进行分组。

```sql
SELECT COLUMN_CLAUSES FROM_CLAUSE [WHERE_CLAUSE] GROUP BY time(<time_interval>),[tag_key] [fill(<fill_option>)]
```

**time(time_interval)**

`GROUP BY time()`子句中的`time_interval`（时间间隔）是一个持续时间（duration），决定了openGemini按多大的时间间隔将查询结果进行分组。例如，当`time_interval`为`5m`时，那么在`WHERE`子句中指定的时间范围内，将查询结果按5分钟进行分组。

**fill()**

`fill(<fill_option>)`是可选的，它会改变不含数据的时间间隔的返回值。


## 例子

### 按单个tag对查询结果进行分组

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

### 将查询结果按12分钟的时间间隔进行分组

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

