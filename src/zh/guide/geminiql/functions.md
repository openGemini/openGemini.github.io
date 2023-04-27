---
title: 聚合算子
order: 3
---


# 聚合算子

## COUNT()

返回非空值field values数量

### 语法

```sql
SELECT COUNT( [ * | <field_key> | /<regular_expression>/ ] ) [INTO_CLAUSE] FROM_CLAUSE [WHERE_CLAUSE] [GROUP_BY_CLAUSE] [ORDER_BY_CLAUSE] [LIMIT_CLAUSE] [OFFSET_CLAUSE]
```

#### 嵌套语法

```sql
SELECT COUNT(DISTINCT( [ * | <field_key> | /<regular_expression>/ ] )) [...]
```

`COUNT(field_key)`
返回field_key对应的field value的个数。

`COUNT(/regular_expression/)`
返回与正则表达式匹配的每个field key对应的field value的个数。

`COUNT(*)`
返回在measurement中每个field key对应的field value的个数。

`COUNT()` 支持所有数据类型的field value。openGemini支持将`DISTINCT()`函数嵌套在`COUNT()`函数里。

### 示例

#### 计算指定field key的field value的数目

```sql
> SELECT COUNT("water_level") FROM "h2o_feet"
name: h2o_feet
+----------------------+-------+
| time                 | count |
+----------------------+-------+
| 1970-01-01T00:00:00Z | 15258 |
+----------------------+-------+
2 columns, 1 rows in set
```

该查询返回measurement`h2o_feet`中的`water_level`的非空field value的数量。

#### 计数measurement中每个field key关联的field value的数量

```sql
> SELECT COUNT(*) FROM "h2o_feet"
name: h2o_feet
+----------------------+-------------------------+-------------------+
| time                 | count_level description | count_water_level |
+----------------------+-------------------------+-------------------+
| 1970-01-01T00:00:00Z | 15258                   | 15258             |
+----------------------+-------------------------+-------------------+
3 columns, 1 rows in set
```

该查询返回与measurement`h2o_feet`相关联的每个field key的非空field value的数量。`h2o_feet`有两个field keys：`level_description`和`water_level`

#### 计算匹配一个正则表达式的每个field key关联的field value的数目

```sql
> SELECT COUNT(/water/) FROM "h2o_feet"
name: h2o_feet
+----------------------+-------------------+
| time                 | count_water_level |
+----------------------+-------------------+
| 1970-01-01T00:00:00Z | 15258             |
+----------------------+-------------------+
2 columns, 1 rows in set
```

该查询返回measurement`h2o_feet`中包含`water`单词的每个field key的非空字段值的数量。

#### 计数包括多个子句的field key的field value的数目

```sql
> SELECT COUNT("water_level") FROM "h2o_feet" WHERE time >= '2019-08-20T00:12:01Z' AND time <= '2019-08-20T08:00:00Z' GROUP BY time(7m),* fill(1000) LIMIT 4
name: h2o_feet
tags: location=coyote_creek
+----------------------+-------+
| time                 | count |
+----------------------+-------+
| 2019-08-20T00:10:00Z | 1000  |
| 2019-08-20T00:17:00Z | 1     |
| 2019-08-20T00:24:00Z | 2     |
| 2019-08-20T00:31:00Z | 1     |
+----------------------+-------+
2 columns, 4 rows in set
```

该查询返回`water_level`field key中的非空field value的数量。它涵盖`2019-08-20T00:12:01Z`和`2019-08-20T08:00:00Z`之间的`时间段`，并将结果分组为7分钟的时间间隔和每个tag。并用`1000`填充空的时间间隔，并返回4个数据point，表格返回1。

#### 计算一个field key的distinct的field value的数量

```sql
> SELECT COUNT(DISTINCT("level description")) FROM "h2o_feet"
name: h2o_feet
+----------------------+-------+
| time                 | count |
+----------------------+-------+
| 1970-01-01T00:00:00Z | 4     |
+----------------------+-------+
2 columns, 1 rows in set
```

查询返回measurement为`h2o_feet`field key为`level description`的唯一field value的数量。

### `COUNT()`的常见问题

#### `COUNT()`和`fill()`

大多数函数对于没有数据的时间间隔返回`null`值，`fill()`将该`null`值替换为`fill_option`。 `COUNT()`针对没有数据的时间间隔返回`0`，`fill(<fill_option>)`用`fill_option`替换0值。

##### 示例

下面的代码块中的第一个查询不包括`fill()`。有些时间段没有数据，因此该时间间隔的值返回为零。第二个查询包括`fill(800000)`; 它将没有数据的间隔中的零替换为`800000`。

```sql
> SELECT COUNT("water_level") FROM "h2o_feet" WHERE time >= '2019-08-20T00:12:01Z' AND time <= '2019-08-20T08:00:00Z' GROUP BY time(7m),*  LIMIT 4
name: h2o_feet
tags: location=coyote_creek
+----------------------+-------+
| time                 | count |
+----------------------+-------+
| 2019-08-20T00:10:00Z | 0     |
| 2019-08-20T00:17:00Z | 1     |
| 2019-08-20T00:24:00Z | 2     |
| 2019-08-20T00:31:00Z | 1     |
+----------------------+-------+
2 columns, 4 rows in set

> SELECT COUNT("water_level") FROM "h2o_feet" WHERE time >= '2019-08-20T00:12:01Z' AND time <= '2019-08-20T08:00:00Z' GROUP BY time(7m),* fill(800000) LIMIT 4
name: h2o_feet
tags: location=coyote_creek
+----------------------+--------+
| time                 | count  |
+----------------------+--------+
| 2019-08-20T00:10:00Z | 800000 |
| 2019-08-20T00:17:00Z | 1      |
| 2019-08-20T00:24:00Z | 2      |
| 2019-08-20T00:31:00Z | 1      |
+----------------------+--------+
2 columns, 4 rows in set
```

## SUM()

返回field value的总和。

### 语法

```sql
SELECT SUM( [ * | <field_key> | /<regular_expression>/ ] ) [INTO_CLAUSE] FROM_CLAUSE [WHERE_CLAUSE] [GROUP_BY_CLAUSE] [ORDER_BY_CLAUSE] [LIMIT_CLAUSE] [OFFSET_CLAUSE]
```

`SUM(field_key)`
返回field key对应的field value的总和。

`SUM(/regular_expression/)`
返回与正则表达式匹配的每个field key对应的field value的总和。

`SUM(*)`
返回在measurement中每个field key对应的field value的总和。

`SUM()` 支持数据类型为int64和float64的field value。

### 示例

#### 计算指定field key对应的field value的总和

```sql
> SELECT SUM("water_level") FROM "h2o_feet"
name: h2o_feet
+----------------------+-------------------+
| time                 | sum               |
+----------------------+-------------------+
| 1970-01-01T00:00:00Z | 67774.98933334895 |
+----------------------+-------------------+
2 columns, 1 rows in set
```

该查询返回measurement `h2o_feet`中field key `water_level`对应的field value的总和。

#### 计算measurement中每个field key对应的field value的总和

```sql
> SELECT SUM(*) FROM "h2o_feet"
name: h2o_feet
+----------------------+-------------------+
| time                 | sum_water_level   |
+----------------------+-------------------+
| 1970-01-01T00:00:00Z | 67774.98933334895 |
+----------------------+-------------------+
2 columns, 1 rows in set
```

该查询返回measurement `h2o_feet`中每个存储数值的field key对应的field value的总和。measurement `h2o_feet`中只有一个数值类型的field：`water_level`。

#### 计算与正则表达式匹配的每个field key对应的field value的总和

```sql
> SELECT SUM(/water/) FROM "h2o_feet"
name: h2o_feet
+----------------------+-------------------+
| time                 | sum_water_level   |
+----------------------+-------------------+
| 1970-01-01T00:00:00Z | 67774.98933334895 |
+----------------------+-------------------+
2 columns, 1 rows in set
```

该查询返回measurement `h2o_feet`中每个存储数值并包含单词`water`的field key对应的field value的总和。

#### 计算指定field key对应的field value的总和并包含多个子句

```sql
> SELECT SUM("water_level") FROM "h2o_feet" WHERE time >= '2019-08-20T00:12:01Z' AND time <= '2019-08-20T08:00:00Z' GROUP BY time(7m),* fill(1000) LIMIT 4
name: h2o_feet
tags: location=coyote_creek
+----------------------+--------+
| time                 | sum    |
+----------------------+--------+
| 2019-08-20T00:10:00Z | 1000   |
| 2019-08-20T00:17:00Z | 8.684  |
| 2019-08-20T00:24:00Z | 17.316 |
| 2019-08-20T00:31:00Z | 8.619  |
+----------------------+--------+
2 columns, 4 rows in set
```

该查询返回measurement `h2o_feet`中field key `water_level`对应的field value的总和，它涵盖的时间范围在`2019-08-20T00:12:01Z`和`2019-08-20T08:00:00Z`之间，并将查询结果按7分钟的时间间隔和每个tag进行分组，同时，该查询用`1000`填充没有数据的时间间隔，并将返回的数据point个数限制为4。

## FIRST()

返回具有最早时间戳的field value。

### 语法

```sql
SELECT FIRST(<field_key>)[,<tag_key(s)>|<field_key(s)>] [INTO_CLAUSE] FROM_CLAUSE [WHERE_CLAUSE] [GROUP_BY_CLAUSE] [ORDER_BY_CLAUSE] [LIMIT_CLAUSE] [OFFSET_CLAUSE]
```

`FIRST(field_key)`
返回field key对应的具有最早时间戳的field value。

`FIRST(/regular_expression/)`
返回与正则表达式匹配的每个field key对应的具有最早时间戳的field value。

`FIRST(*)`
返回在measurement中每个field key对应的具有最早时间戳的field value。

`FIRST(field_key),tag_key(s),field_key(s)`
返回括号中的field key对应的具有最早时间戳的field value，以及相关的tag或field。

`FIRST()` 支持所有数据类型的field value。

### 示例

#### 选择指定field key对应的具有最早时间戳的field value

```sql
> SELECT FIRST("level description") FROM "h2o_feet"
name: h2o_feet
+----------------------+----------------------+
| time                 | first                |
+----------------------+----------------------+
| 2019-08-17T00:00:00Z | between 6 and 9 feet |
+----------------------+----------------------+
2 columns, 1 rows in set
```

该查询返回measurement `h2o_feet`中field key `level description`对应的具有最早时间戳的field value。

#### 选择measurement中每个field key对应的具有最早时间戳的field value

```sql
> SELECT FIRST(*) FROM "h2o_feet"
name: h2o_feet
+----------------------+-------------------------+-------------------+
| time                 | first_level description | first_water_level |
+----------------------+-------------------------+-------------------+
| 1970-01-01T00:00:00Z | between 6 and 9 feet    | 8.12              |
+----------------------+-------------------------+-------------------+
3 columns, 1 rows in set
```

该查询返回measurement `h2o_feet`中每个field key对应的具有最早时间戳的field value。measurement `h2o_feet`中有两个field key：`level description`和`water_level`。

#### 选择与正则表达式匹配的每个field key对应的具有最早时间戳的field value

```sql
> SELECT FIRST(/level/) FROM "h2o_feet"
name: h2o_feet
+----------------------+-------------------------+-------------------+
| time                 | first_level description | first_water_level |
+----------------------+-------------------------+-------------------+
| 1970-01-01T00:00:00Z | between 6 and 9 feet    | 8.12              |
+----------------------+-------------------------+-------------------+
3 columns, 1 rows in set
```

该查询返回measurement `h2o_feet`中每个包含单词`level`的field key对应的具有最早时间戳的field value。

#### 选择指定field key对应的具有最早时间戳的field value以及相关的tag和field

```sql
> SELECT FIRST("level description"),"location","water_level" FROM "h2o_feet"
name: h2o_feet
+----------------------+----------------------+--------------+-------------+
| time                 | first                | location     | water_level |
+----------------------+----------------------+--------------+-------------+
| 2019-08-17T00:00:00Z | between 6 and 9 feet | coyote_creek | 8.12        |
+----------------------+----------------------+--------------+-------------+
4 columns, 1 rows in set
```

该查询返回measurement `h2o_feet`中field key `level description`对应的具有最早时间戳的field value，以及相关的tag key `location`和field key `water_level`的值。

#### 选择指定field key对应的具有最早时间戳的field value并包含多个子句

```sql
> SELECT FIRST("water_level") FROM "h2o_feet" WHERE time >= '2019-08-20T00:12:01Z' AND time <= '2019-08-20T08:00:00Z' GROUP BY time(7m),* fill(1000) LIMIT 4
name: h2o_feet
tags: location=coyote_creek
+----------------------+-------+
| time                 | first |
+----------------------+-------+
| 2019-08-20T00:10:00Z | 1000  |
| 2019-08-20T00:17:00Z | 8.684 |
| 2019-08-20T00:24:00Z | 8.661 |
| 2019-08-20T00:31:00Z | 8.619 |
+----------------------+-------+
2 columns, 4 rows in set
```

该查询返回measurement `h2o_feet`中field key `water_level`对应的具有最早时间戳的field value，它涵盖的时间范围在`2019-08-20T00:12:01Z`和`2019-08-20T08:00:00Z`之间，并将查询结果按7分钟的时间间隔和每个tag进行分组，同时，该查询用`1000`填充没有数据的时间间隔，并将返回的数据point个数限制为4。

## LAST()

返回具有最新时间戳的field value。

### 语法

```sql
SELECT LAST(<field_key>)[,<tag_key(s)>|<field_keys(s)>] [INTO_CLAUSE] FROM_CLAUSE [WHERE_CLAUSE] [GROUP_BY_CLAUSE] [ORDER_BY_CLAUSE] [LIMIT_CLAUSE] [OFFSET_CLAUSE]
```

`LAST(field_key)`
返回field key对应的具有最新时间戳的field value。

`LAST(/regular_expression/)`
返回与正则表达式匹配的每个field key对应的具有最新时间戳的field value。

`LAST(*)`
返回在measurement中每个field key对应的具有最新时间戳的field value。

`LAST(field_key),tag_key(s),field_key(s)`
返回括号中的field key对应的具有最新时间戳的field value，以及相关的tag或field。

`LAST()` 支持所有数据类型的field value。

### 示例

#### 选择指定field key对应的具有最新时间戳的field value

```sql
> SELECT LAST("level description") FROM "h2o_feet"
name: h2o_feet
+----------------------+----------------------+
| time                 | last                 |
+----------------------+----------------------+
| 2019-09-17T21:42:00Z | between 3 and 6 feet |
+----------------------+----------------------+
2 columns, 1 rows in set
```

该查询返回measurement `h2o_feet`中field key `level description`对应的具有最新时间戳的field value。

#### 选择measurement中每个field key对应的具有最新时间戳的field value

```sql
> SELECT LAST(*) FROM "h2o_feet"
name: h2o_feet
+----------------------+------------------------+------------------+
| time                 | last_level description | last_water_level |
+----------------------+------------------------+------------------+
| 1970-01-01T00:00:00Z | between 3 and 6 feet   | 4.938            |
+----------------------+------------------------+------------------+
3 columns, 1 rows in set
```

该查询返回measurement `h2o_feet`中每个field key对应的具有最新时间戳的field value。measurement `h2o_feet`中有两个field key：`level description`和`water_level`。

#### 选择与正则表达式匹配的每个field key对应的具有最新时间戳的field value

```sql
> SELECT LAST(/level/) FROM "h2o_feet"
name: h2o_feet
+----------------------+------------------------+------------------+
| time                 | last_level description | last_water_level |
+----------------------+------------------------+------------------+
| 1970-01-01T00:00:00Z | between 3 and 6 feet   | 4.938            |
+----------------------+------------------------+------------------+
3 columns, 1 rows in set
```

该查询返回measurement `h2o_feet`中每个包含单词`level`的field key对应的具有最新时间戳的field value。

#### 选择指定field key对应的具有最新时间戳的field value以及相关的tag和field

```sql
> SELECT LAST("level description"),"location","water_level" FROM "h2o_feet"
name: h2o_feet
+----------------------+----------------------+--------------+-------------+
| time                 | last                 | location     | water_level |
+----------------------+----------------------+--------------+-------------+
| 2019-09-17T21:42:00Z | between 3 and 6 feet | santa_monica | 4.938       |
+----------------------+----------------------+--------------+-------------+
4 columns, 1 rows in set
```

该查询返回measurement `h2o_feet`中field key `level description`对应的具有最新时间戳的field value，以及相关的tag key `location`和field key `water_level`的值。

#### 选择指定field key对应的具有最新时间戳的field value并包含多个子句

```sql
> SELECT LAST("water_level") FROM "h2o_feet" WHERE time >= '2019-08-20T00:12:01Z' AND time <= '2019-08-20T08:00:00Z' GROUP BY time(7m),* fill(1000) LIMIT 4
name: h2o_feet
tags: location=coyote_creek
+----------------------+-------+
| time                 | last  |
+----------------------+-------+
| 2019-08-20T00:10:00Z | 1000  |
| 2019-08-20T00:17:00Z | 8.684 |
| 2019-08-20T00:24:00Z | 8.655 |
| 2019-08-20T00:31:00Z | 8.619 |
+----------------------+-------+
2 columns, 4 rows in set
```

该查询返回measurement `h2o_feet`中field key `water_level`对应的具有最新时间戳的field value，它涵盖的时间范围在`2019-08-20T00:12:01Z`和`2019-08-20T08:00:00Z`之间，并将查询结果按7分钟的时间间隔和每个tag进行分组，同时，该查询用`1000`填充没有数据的时间间隔，并将返回的数据point个数限制为4。

## MAX()

返回field value的最大值。

### 语法

```sql
SELECT MAX(<field_key>)[,<tag_key(s)>|<field__key(s)>] [INTO_CLAUSE] FROM_CLAUSE [WHERE_CLAUSE] [GROUP_BY_CLAUSE] [ORDER_BY_CLAUSE] [LIMIT_CLAUSE] [OFFSET_CLAUSE] [SLIMIT_CLAUSE] [SOFFSET_CLAUSE]
```

`MAX(field_key)`
返回field key对应的field value的最大值。

`MAX(/regular_expression/)`
返回与正则表达式匹配的每个field key对应的field value的最大值。

`MAX(*)`
返回在measurement中每个field key对应的field value的最大值。

`MAX(field_key),tag_key(s),field_key(s)`
返回括号中的field key对应的field value的最大值，以及相关的tag或field。

`MAX()` 支持数据类型为int64和float64的field value。

### 示例

#### 选择指定field key对应的field value的最大值

```sql
> SELECT MAX("water_level") FROM "h2o_feet"
name: h2o_feet
+----------------------+-------+
| time                 | max   |
+----------------------+-------+
| 2019-08-28T07:24:00Z | 9.964 |
+----------------------+-------+
2 columns, 1 rows in set
```

该查询返回measurement `h2o_feet`中field key `water_level`对应的field value的最大值。

#### 选择measurement中每个field key对应的field value的最大值

```sql
> SELECT MAX(*) FROM "h2o_feet"
name: h2o_feet
+----------------------+-----------------+
| time                 | max_water_level |
+----------------------+-----------------+
| 2019-08-28T07:24:00Z | 9.964           |
+----------------------+-----------------+
2 columns, 1 rows in set
```

该查询返回measurement `h2o_feet`中每个存储数值的field key对应的field value的最大值。measurement `h2o_feet`中只有一个数值类型的field：`water_level`。

#### 选择与正则表达式匹配的每个field key对应的field value的最大值

```sql
> SELECT MAX(/level/) FROM "h2o_feet"
name: h2o_feet
+----------------------+-----------------+
| time                 | max_water_level |
+----------------------+-----------------+
| 2019-08-28T07:24:00Z | 9.964           |
+----------------------+-----------------+
2 columns, 1 rows in set
```

该查询返回measurement `h2o_feet`中每个存储数值并包含单词`level`的field key对应的field value的最大值。

#### 选择指定field key对应的field value的最大值以及相关的tag和field

```sql
> SELECT MAX("water_level"),"location","level description" FROM "h2o_feet"
name: h2o_feet
+----------------------+-------+--------------+---------------------------+
| time                 | max   | location     | level description         |
+----------------------+-------+--------------+---------------------------+
| 2019-08-28T07:24:00Z | 9.964 | coyote_creek | at or greater than 9 feet |
+----------------------+-------+--------------+---------------------------+
4 columns, 1 rows in set
```

该查询返回measurement `h2o_feet`中field key `water_level`对应的field value的最大值，以及相关的tag key `location`和field key `level description`的值。

#### 选择指定field key对应的field value的最大值并包含多个子句

```sql
> SELECT MAX("water_level") FROM "h2o_feet" WHERE time >= '2019-08-20T00:12:01Z' AND time <= '2019-08-20T08:00:00Z' GROUP BY time(7m),* fill(1000) LIMIT 4
name: h2o_feet
tags: location=coyote_creek
+----------------------+-------+
| time                 | max   |
+----------------------+-------+
| 2019-08-20T00:10:00Z | 1000  |
| 2019-08-20T00:17:00Z | 8.684 |
| 2019-08-20T00:24:00Z | 8.661 |
| 2019-08-20T00:31:00Z | 8.619 |
+----------------------+-------+
2 columns, 4 rows in set
```

该查询返回measurement `h2o_feet`中field key `water_level`对应的field value的最大值，它涵盖的时间范围在`2019-08-20T00:12:01Z`和`2019-08-20T08:00:00Z`之间，并将查询结果按7分钟的时间间隔和每个tag进行分组，同时，该查询用`1000`填充没有数据的时间间隔，并将返回的数据point个数限制为4。

## MIN()

返回field value的最小值。

### 语法

```sql
SELECT MIN(<field_key>)[,<tag_key(s)>|<field_key(s)>] [INTO_CLAUSE] FROM_CLAUSE [WHERE_CLAUSE] [GROUP_BY_CLAUSE] [ORDER_BY_CLAUSE] [LIMIT_CLAUSE] [OFFSET_CLAUSE]
```

`MIN(field_key)` 返回field key对应的field value的最小值。

`MIN(/regular_expression/)` 返回与正则表达式匹配的每个field key对应的field value的最小值。

`MIN(*)` 返回在measurement中每个field key对应的field value的最小值。

`MIN(field_key),tag_key(s),field_key(s)` 返回括号中的field key对应的field value的最小值，以及相关的tag和/或field。

`MIN()`支持数据类型为int64和float64的field value。

### 示例

#### 选择指定field key对应的field value的最小值

```sql
> SELECT MIN("water_level") FROM "h2o_feet"
name: h2o_feet
+----------------------+-------+
| time                 | min   |
+----------------------+-------+
| 2019-08-28T14:30:00Z | -0.61 |
+----------------------+-------+
2 columns, 1 rows in set
```

该查询返回measurement `h2o_feet`中field key `water_level`对应的field value的最小值。

#### 选择measurement中每个field key对应的field value的最小值

```sql
> SELECT MIN(*) FROM "h2o_feet"
name: h2o_feet
+----------------------+-----------------+
| time                 | min_water_level |
+----------------------+-----------------+
| 2019-08-28T14:30:00Z | -0.61           |
+----------------------+-----------------+
2 columns, 1 rows in set
```

该查询返回measurement `h2o_feet`中每个存储数值的field key对应的field value的最小值。measurement `h2o_feet`中只有一个数值类型的field：`water_level`。

#### 选择与正则表达式匹配的每个field key对应的field value的最小值

```sql
> SELECT MIN(/level/) FROM "h2o_feet"
name: h2o_feet
+----------------------+-----------------+
| time                 | min_water_level |
+----------------------+-----------------+
| 2019-08-28T14:30:00Z | -0.61           |
+----------------------+-----------------+
2 columns, 1 rows in set
```

该查询返回measurement `h2o_feet`中每个存储数值并包含单词`level`的field key对应的field value的最小值。

#### 选择指定field key对应的field value的最小值以及相关的tag和field

```sql
> SELECT MIN("water_level"),"location","level description" FROM "h2o_feet"
name: h2o_feet
+----------------------+-------+--------------+-------------------+
| time                 | min   | location     | level description |
+----------------------+-------+--------------+-------------------+
| 2019-08-28T14:30:00Z | -0.61 | coyote_creek | below 3 feet      |
+----------------------+-------+--------------+-------------------+
4 columns, 1 rows in set
```

该查询返回measurement `h2o_feet`中field key `water_level`对应的field value的最小值，以及相关的tag key `location`和field key `level description`的值。

#### 选择指定field key对应的field value的最小值并包含多个子句

```sql
> SELECT MIN("water_level") FROM "h2o_feet" WHERE time >= '2019-08-20T00:12:01Z' AND time <= '2019-08-20T08:00:00Z' GROUP BY time(7m),* fill(1000) LIMIT 4
name: h2o_feet
tags: location=coyote_creek
+----------------------+-------+
| time                 | min   |
+----------------------+-------+
| 2019-08-20T00:10:00Z | 1000  |
| 2019-08-20T00:17:00Z | 8.684 |
| 2019-08-20T00:24:00Z | 8.655 |
| 2019-08-20T00:31:00Z | 8.619 |
+----------------------+-------+
2 columns, 4 rows in set
```

该查询返回measurement `h2o_feet`中field key `water_level`对应的field value的最小值，它涵盖的时间范围在`2019-08-20T00:12:01Z`和`2019-08-20T08:00:00Z`之间，并将查询结果按7分钟的时间间隔和每个tag进行分组，同时，该查询用`1000`填充没有数据的时间间隔，并将返回的数据point个数限制为4。