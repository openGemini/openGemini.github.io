---
title: 行协议定义
order: 1
---


# 常规行协议定义

line protocol 是一种基于文本的格式，用于将points 写入 openGemini

> 采用InfluxDB相同的line protocol

## line protocol语法

```
<measurement>[,<tag_key>=<tag_value>[,<tag_key>=<tag_value>]] <field_key>=<field_value>[,<field_key>=<field_value>] [<timestamp>]
```

Line protocol 接受换行符`\n `,并且区分空格

::: tip

Line protocol 不支持tag value 或filed value 中的换行符。

:::

### 语法描述

line protocol 将数据的measurement,tag set,field  set和timestamp 通知给openGemini.

| 组件        | 可选/必须                                                    | 描述                                       | 类型<br>(有关更多信息，请参见[数据类型](../geminiql/data_type.md))。 |
| :---------- | :----------------------------------------------------------- | :----------------------------------------- | :----------------------------------------------------------- |
| Measurement | 需要                                                         | 测量名称. 每一个point 接受一次 measurement | 字符串                                                       |
| Tag set     | 可选                                                         | 该point 所有Tags。 key-value 标记键值对。  | Tag keys和 tag values 都是字符串                             |
| Field set   | 需要 Points 点必须至少具有一个字段.                          | 该point 所有 Fields。 key-value 键值对。   | Field keys字段键是字符串. Field values字段值可以是浮点数, 整数,字符串,或者 Booleans. |
| Timestamp   | 可选. 如果时间戳不包含在该point中，openGemini数据库将使用服务器的本地纳秒时间 （UTC时间） | 数据point的时间戳                          | Unix 纳秒时间戳                                              |

::: tip 性能提示

- 在将数据发送到openGemini之前，请按tag keys 排序，以匹配 [Go字节.Compare 函数](http://golang.org/pkg/bytes/#Compare)
- 为了显著提高压缩性能，请尽可能使用最粗略的时间戳。
- 使用网络时间协议(NTP)来同步主机之间的时间。openGemini使用主机的本地时间(以世界协调时表示)为数据分配时间戳。如果主机的时钟与NTP不同步，主机写入openGemini的数据可能会有不准确的时间戳。

:::

## Data types

| 数据类型  | 元素                                                         | 描述                                                         |
| :-------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| Float     | Field values（字段值）                                       | 默认数字类型。IEEE-754 64位浮点数(NaN或+/- Inf除外)。例子:` 1 `，` 1.0`,  `1.e+78 `，` 1`,  `E+78 `。 |
| Integer   | Field values（字段值）                                       | 有符号64位整数(-9223372036854775808至9223372036854775807)。请指定一个在数字后面带有**`i`**的整数。示例:` 2i` |
| String    | Measurements, tag keys, tag values, field keys, field values | 长度限制64KB.                                                |
| Boolean   | Field values                                                 | 存储TRUE或FASE值.<br><br>`true`的写入语法有:`[t, T, true, True, TRUE]`.<br><br>`false`的写语法有:`[f, F, false, False, FALSE]` |
| Timestamp | Timestamps                                                   | Unix 纳秒级时间戳. 使用precision指定替代精度，最小有效时间戳为-9223372036854775806` 或 `1677-09-21T00:12:43.145224194Z`. 最大有效时间戳为  `9223372036854775806` 或 `2262-04-11T23:47:16.854775806Z`. |

**用于写入和查询的boolean语法**

数据写入和数据查询可接受 Boolean 语法不同。查询仅可接受`true` or `false`。

**字段类型冲突**

在measurement中,  field's type 不能相同。

### 例子

#### 将field value `-1.234456e+78`作为浮点数写入 openGemini

```sql
> INSERT mymeas value=-1.234456e+78
```

openGemini 支持科学计数法指定的field value.

#### 将field value 1.0 作为浮点数写入 openGemini

```sql
> INSERT mymeas value=1.0
```

#### 将field value  `1`作为浮点数写入 openGemini

```sql
> INSERT mymeas value=1
```

#### 将field value 1作为浮点数写入 openGemini

```sql
> INSERT mymeas value=1i
```

#### 将filed value `stringing along` 作为字符串写入 openGemini

```sql
> INSERT mymeas value="stringing along"
```

始终用双引号将字符串 field value引起来。

#### 将filed value `true`作为boolean写入openGemini

```sql
> INSERT mymeas value=true
```

不要引用以下语句将`true`字符串field value 写入openGemini：

```sql
> INSERT mymeas value="true"
```

### 引用、特殊字符和其他命名准则

| 元素                                           | 双引号                                                     | 单引号 |
| :--------------------------------------------- | :--------------------------------------------------------- | :----- |
| Timestamp                                      | 从不                                                       | 从不   |
| Measurements, tag keys, tag values, field keys | 从不*                                                      | 从不*  |
| Field values                                   | 双引号字符串字段值，不要用引号引上浮点数，整数或者Booleans | 从不   |

\* openGemini line protocol 允许用户使用双引号和单引号measurement名称，tag keys，tag values和field key。但是，它将假定双引号或单引号是名称，key 或values的一部分。这会使查询语法复杂化（请参见下面的示例）

#### 例子

##### 无效的line protocol-双引号时间戳

```bash
curl -X POST "http://localhost:8086/write?db=NOAA_water_database" --data-binary 'mymeas value=9 "1466625759000000000"'
{"error":"cannot parse timestamp \"\\\"1466625759000000000\\\"\": bad timestamp"}
```

双重引用（或单引号）时间戳会产生bad time stamp错误。

##### 语义错误 - 双引号表示Boolean

```sql
> INSERT mymeas value="true"
> SHOW FIELD KEYS FROM "mymeas"
name: mymeas
------------
fieldKey	 fieldType
value		   string
```

openGemini 假设所有双引号field values都是字符串

##### Semantic error - Double quote a measurement name

```sql
> INSERT "mymeas" value=200
> SHOW MEASUREMENTS
name: measurements
------------------
name
"mymeas"
> SELECT * FROM mymeas
> SELECT * FROM "mymeas"
> SELECT * FROM "\"mymeas\""
name: "mymeas"
--------------
time				                        value
2016-06-14T20:36:21.836131014Z	 200
```

### 特殊字符

您必须使用反斜杠字符\来转义下列特殊字符：

* 在字符串field value中，必须转义:
  * 双引号 
  * 反斜杠字符

例如，\ "转义双引号。

>反斜杠上的注释:
* 如果使用多个反斜杠，它们必须被转义。内流按如下方式解释反斜杠:
  *	`\` 或 `\\` 解释为 `\`
  *	`\\\` 或 `\\\\`解释为 `\\`
  * `\\\\\` 或 `\\\\\\` 解释为 `\\\`, 依次类推

* 在tag key ,tag values和field key中，必须转义
  * 逗号
  * 等号
  * 空格

例如，`\,`转义逗号。

* 在measurement中，您必须转义：
  * commas  
  * spaces

您不需要转义其他特殊字符.

#### 例子

##### 用特殊字符写Point

```sql
> INSERT "measurement\ with\ quo⚡️es\ and\ emoji",tag\ key\ with\ sp🚀ces=tag\,value\,with"commas" field_k\ey="string field value, only \" need be esc🍭ped"
```

系统会写一个point，它的measurement是`"measurement with quo⚡️es and emoji"`，tag key为`tag key with sp🚀ces`，tag values为`tag,value,with"commas"`，field key为`field_k\ey`，field value为`string field value, only " need be esc🍭ped`。

### 附加命名准则

`#`行的开头是line protocol的有效注释字符。openGemini将忽略所有后续字符，直到下一个换行符为止\n。

measurement 名称，tag keys，tag values，field key 和field values区分大小写。

openGemini line protocol接受GeminiQL 关键字和 标识符名称。 我们建议避免使用 GeminiQL 关键字， 因为它可能在查询数据时引起混乱。

::: warning

避免使用保留键`_field`和`_measurement`。如果将这些key作为标记或filed key 包括在内，则关联的point 将被丢弃。

:::

关键字`time`是一种特殊情况。`time`可以是数据库名称，measurement name，retention policy name，和user名称。在这种情况下，`time`查询中不需要双引号。
`time`不能是field key或tag key;  openGemini拒绝使用`time`作为tag key的写入，否则返回错误。使用`time`作为field key写入，openGemini将忽略`time`字段。

## openGemini line protocol 实践

了解如何将line protocol 写入数据库。

### 重复 points

Point由measurement 名称、tag set、filed get和timestamp组成的唯一标识 

如果您将一个point 写入到一个具有与现有point 匹配的时间戳的序列中，则该field set 将成为新旧field get 的集合，而冲突则有保留新field set 。

 有关这种行为以及如何避免这种行为的完整示例，请参见 [openGemini如何处理重复点？](../troubleshoot)

### 重复 keys

不支持measurement 中具有相同名称的tag key和field key 。
