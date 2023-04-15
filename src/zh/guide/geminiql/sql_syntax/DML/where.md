---
order: 2
---

# WHERE

`WHERE`子句根据field、tag、timestamp来过滤数据。

## 语法

```sql
SELECT COLUMN_CLAUSES FROM_CLAUSE WHERE <CONDITION> [(AND|OR) <CONDITION> [...]]
```

### Tags

```sql
tag_key <operator> ['tag_value']
```

在`WHERE`子句中，请对`tag value`用单引号括起来。如果`tag value`没有使用引号或者使用了双引号，那么不会返回任何查询结果，在大多数情况下，也不会返回错误。

支持的 operator 有：

| 操作符 | 含义   |
| :----: | :----- |
|  `=`   | 等于   |
|  `<>`  | 不等于 |
|  `!=`  | 不等于 |

operator还支持：正则表达式。

### Fields

```sql
field_key <operator> ['string' | boolean | float | integer]
```

`WHERE`子句支持对`field value`进行比较，`field value`可以是字符串、布尔值、浮点数或者整数。

在`WHERE`子句中，请对字符串类型的`field value`用单引号括起来。如果字符串类型的field value没有使用引号或者使用了双引号，那么不会返回任何查询结果，在大多数情况下，也不会返回错误。

支持的 operator 有：

| 操作符 | 含义     |
| :----: | :------- |
|  `=`   | 等于     |
|  `<>`  | 不等于   |
|  `!=`  | 不等于   |
|  `>`   | 大于     |
|  `>=`  | 大于等于 |
|  `<`   | 小于     |
|  `<=`  | 小于等于 |

operator还支持：算术运算和正则表达式。

### Timestamp

对于大多数`SELECT`语句，默认的时间范围是全部时间范围。对于带`GROUP BY time()`子句的`SELECT`语句，默认的时间范围是从**时间最小的数据的时间**`到`now()`。

## 例子

### 查询field value满足一定条件的数据

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

该查询返回`h2o_feet`中的数据，这些数据满足条件：field key `water_level`的值大于8。

### 查询field value和tag value都满足一定条件的数据

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

### 查询timestamp满足一定条件的数据

```sql
>>> SELECT * FROM "h2o_feet" WHERE time > now() - 7d
Elapsed: 1.062851ms
```

没有满足过去7天内的数据。