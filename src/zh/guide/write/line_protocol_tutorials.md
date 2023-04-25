---
title: 行协议写入教程
order: 3
---


# 行协议写入教程

Line protocol 是一种基于文本的格式，用于将points写入数据库。 points 必须是Line protocol格式，才能成功解析和写point (除非你正在使用 [支持的协议](./prometheus.md)).


这里将描述如何将数据输入到openGemini 数据库以及openGemini如何处理line procotol重复数据。

## 语法

Line protocol 格式的单行文本代表openGemini中的一个point，它将point的measurement、tag set，field set以及timestamp通知给openGemini

以下代码块显示了line procotol示例，并将其分解为各个组件

```
weather,location=us-midwest temperature=82 1465839830100400200
  |    -------------------- --------------  |
  |             |             |             |
  |             |             |             |
+-----------+--------+-+---------+-+---------+
|measurement|,tag_set| |field_set| |timestamp|
+-----------+--------+-+---------+-+---------+
```



遍历图中每个元素:

### Measurement

要写入数据的measurement名称，根据line procotol 生成measurement。

在示例中，measurement的名称weather。

### Tag set

数据point 包含的tag 。 **tag是可选的**。

::: warning

避免使用保留键 `_field`, `_measurement`, 和 `time`。如果保留的关键字作为tag 或者field的键，则相关联的数据点将被丢弃。

:::

请注意，measurement 和 tag set由逗号分隔，没有空格。

用等号`=`分隔 `tag key`-`tag value`，不要有空格，例如：

```
<tag_key>=<tag_value>
```

用逗号分隔多个 `tag key`-`tag value`对，且没有空格:

```
<tag_key>=<tag_value>,<tag_key>=<tag_value>
```

在示例中，**tag set** 由一个标记组成：`location=us-midwest`。如果向示例中添加另一个tag:`season=summer`，如下所示:

```
weather,location=us-midwest,season=summer temperature=82 1465839830100400200
```

为了获得最佳性能，您应该在将**<tag_key>**排序后再发送到数据库。 排序函数参考 [Go bytes.Compare](http://golang.org/pkg/bytes/#Compare).

### 空格 I

将measurement和field set 分开，或者如果要在数据point中包含tag set ，请使用空格将tag set和field set 分开。

没有设置tag 的有效line procotol:

```
weather temperature=82 1465839830100400200
```

### Field set

每个point 都需要在 line protocol中至少有一个field。

用等号`=` 分隔`field key`-`field value`，中间不能有空格，例如：

```
<field_key>=<field_value>
```

用逗号分隔多个 `field key`-`field value`对，中间不能有空格，例如：

```
<field_key>=<field_value>,<field_key>=<field_value>
```

在该示例中，field set由一个field组成: `temperature=82`。如果向示例中添加另一个 field `humidity=71`，如下所示:

```
weather,location=us-midwest temperature=82,humidity=71 1465839830100400200
```

### 空格 II

用空格分割field set和可选的时间戳。如果包含了时间戳，则line procotol 中必须使用空格。

### Timestamp

数据point的时间戳，以ns为单位的Unix时间，时间戳在line protocol 中是可选的，如果没有为数据point 指定时间戳，则openGemini使用服务器的本地纳秒时间戳（以UTC为单位）。

在示例中，时间戳为`1465839830100400200（2016-06-13T17:43:50.1004002Z采用RFC3339格式）`，下面的line procotol是相同的数据point ，但没有时间戳，当openGemini将其写入数据库中，它将使用服务器的本地时间戳而不是`2016-06-13T17:43:50.1004002Z`。

```
weather,location=us-midwest temperature=82
```

使用openGemini API可以以十亿分之一秒（例如微秒，毫秒或秒）以外的精度指定时间戳，建议使用最粗略的精度，因为这可以显著提高压缩率。

::: tip 设定提示

使用网咯时间协议（NTP）主机之间同步时间，openGemini使用UTC中主机的本地时间为数据分配的时间戳。如果主机的时钟与NTP同步，则写入openGemini的数据上的时间戳可能不准确。

:::

## 数据类型

**measurements, tag keys, tag values, 和 field keys**都必须是字符串。

::: tip

因为openGemini将tag values存储为字符串，所以openGemini数据库不能对tag vlaues执行数学运算，此外，openGemini函数也不能接受tag value作为主要参数，在设计架构时考虑这些信息是个好主意。

:::

**timestamp**是UNIX时间戳。最小有效时间戳为`-9223372036854775806`或`1677-09-21T00:12:43.145224194Z`。最大有效时间戳为`9223372036854775806或2262-04-11t 23:47:16.85475806 z`。如上所述，默认情况下，openGemini假设时间戳为纳秒精度。有关如何指定替代精度，请参见[API接口]()。

**field values** 可以是**浮点数**、**整数**、**字符串**或者 **booleans**。

* 浮点数 - 默认，openGemini假设所有数值字段值都是浮点。

    将field value `82`存储为浮点数:

    ```
    weather,location=us-midwest temperature=82 1465839830100400200
    ```

* 整数 - 在field values中添加一个`i`来告诉openGemini存储整数。

  将field value `82` 存储为整数:
  
  ```
  weather,location=us-midwest temperature=82i 1465839830100400200
  ```
  
* 字符串-双引号字符串field value(有关line procotol中引用的更多信息见 [下方](#Quoting))

  将field value  `too warm` 存储为字符串：
  
  ```
  weather,location=us-midwest temperature="too warm" 1465839830100400200
  ```
  
* Booleans - 指定TRUE可以是t，T，true，True，或TRUE。指定FALSE可以是f，F，false，False，或FALSE。

  将 field value `true` 存储为为 Boolean值：
  
  ```
  weather,location=us-midwest too_hot=true 1465839830100400200
  ```
  
  ::: warning
  
  可接受的booleans在数据写入和数据查询方面有所不同。
  
  :::

在一个measurement中，同一个field不能写入不同的数据类型。

## Quoting

本节介绍了在line procotol 中何时不使用双引号和何时将双引号 (`"`) 或单引号 (`'`)引起来。下面将从**不能加引号**到**需要加引号**的顺序分别介绍。

* 不要用双引号或单引号引起时间戳。这不是有效的line procotol。

  例:

  ::: tabs

  @tab CLI

  ```sql
  >>> INSERT weather,location=us-midwest temperature=82 "1465839830100400200"
  ERR: error parsing query: syntax error: unexpected IDENT
  ```

  通过 ts-cli，通不过语法检查，时间戳必须是整数类型。

  @tab API

  ```bash
  ~# curl -X POST "http://localhost:8086/write?db=NOAA_water_database" --data-binary 'weather,location=us-midwest temperature=82 "1465839830100400200"'
  {"error":"cannot parse timestamp \"\\\"1465839830100400200\\\"\": bad timestamp"}
  ```

  通过API，则会报**bad timestamp**错误。

  :::

* 不能使用**单引号**引用字段值（即使它们是字符串)。这也不是有效的line procotol。

  例:

  ```sql
  > >>> INSERT weather,location=us-midwest temperature='toowarm'
  ERR: {"error":"cannot parse field value for \"temperature\": invalid field value"}
  ```

* 不建议对**measurement名字**, tag keys, **tag values**, 和 **field keys**使用单引号或者双引号。
  它是一个有效的line procotol，但是 openGemini 会假设引号也是其中的一部分。

  例:

  ```sql
    > INSERT weather,location=us-midwest temperature=82 1465839830100400200
    > INSERT "weather",location=us-midwest temperature=87 1465839830100400200
    > SHOW MEASUREMENTS
    name: measurements
    ------------------
    name
    "weather"
    weather
  ```

  要查询`"weather"`中数据：

  ```sql
  > SELECT * FROM "\"weather\""
  name: "weather"
  ---------------
  time                            location     temperature
  2016-06-13T17:43:50.1004002Z    us-midwest   87
  ```
  要查询`weather`中数据：

  ```sql
  > SELECT * FROM "weather"
  name: "weather"
  ---------------
  time                            location     temperature
  2016-06-13T17:43:50.1004002Z    us-midwest   82
  ```
* 不要对浮点数，整数或者`booleans`的 field values进行双引号，openGemini将假设这些值是字符串

    例:

    ```sql
    > INSERT weather,location=us-midwest temperature="82"
    > SELECT * FROM weather WHERE temperature >= 70
    >
    ```

* 对字符串field value进行双引号

    例

    ```sql
    > INSERT weather,location=us-midwest temperature="too warm"
    > SELECT * FROM weather
    name: weather
    -------------
    time                            location     temperature
    2016-06-13T19:10:09.995766248Z  us-midwest   too warm
    ```
## 特殊字符和关键字

### 特殊字符

对于 tag keys, tag value, 和 field keys 始终使用反斜杠 `\`转义:

* 逗号 `,`
    ```
    weather,location=us\,midwest temperature=82 1465839830100400200
    ```
    
* 等号 `=`

    ```
    weather,location=us-midwest temp\=rature=82 1465839830100400200
    ```
    
* 空格

    ```
    weather,location\ place=us-midwest temperature=82 1465839830100400200
    ```

对于measurements 请始终使用反斜杠 `\`进行转义:

* 逗号 `,`

    ```
    wea\,ther,location=us-midwest temperature=82 1465839830100400200
    ```

* 空格

    ```
    wea\ ther,location=us-midwest temperature=82 1465839830100400200
    ```

对于字符串 field values 请使用反斜杠 `\` 进行转义:

* 双引号 `"`

    ```
    weather,location=us-midwest temperature="too\"hot\"" 1465839830100400200
    ```
    
    Line procotol 不要求用户转义反斜杠字符，但是如果非要这样做也没问题，例如，插入以下内容

```
weather,location=us-midwest temperature_str="too hot/cold" 1465839830100400201
weather,location=us-midwest temperature_str="too hot\cold" 1465839830100400202
weather,location=us-midwest temperature_str="too hot\\cold" 1465839830100400203
weather,location=us-midwest temperature_str="too hot\\\cold" 1465839830100400204
weather,location=us-midwest temperature_str="too hot\\\\cold" 1465839830100400205
weather,location=us-midwest temperature_str="too hot\\\\\cold" 1465839830100400206
```

将解释如下（请注意，单反斜杠和双反斜杠产生相同的记录）

```sql
> SELECT * FROM "weather"
name: weather
time                location   temperature_str
----                --------   ---------------
1465839830100400201 us-midwest too hot/cold
1465839830100400202 us-midwest too hot\cold
1465839830100400203 us-midwest too hot\cold
1465839830100400204 us-midwest too hot\\cold
1465839830100400205 us-midwest too hot\\cold
1465839830100400206 us-midwest too hot\\\cold
```

所有其它特殊字符也不需要转义，例如，line procotol可以毫无问题的处理表情符号:

```sql
>>> INSERT we⛅️ther,location=us-midwest temper🔥ture=82 1465839830100400200
>>> select * from "we⛅️ther"
name: we⛅️ther
+---------------------+------------+--------------+
| time                | location   | temper🔥ture |
+---------------------+------------+--------------+
| 1465839830100400200 | us-midwest | 82           |
+---------------------+------------+--------------+
3 columns, 1 rows in set
```

### 关键字

Line procotol 接受GeminiQL 关键字作为标识符名称。

通常，我们建议避免在架构中使用GeminiQL关键字，因为它可能在查询数据时引起confusion 。
关键字time是一种特殊情况。time可以是continuous query，数据库名称，measurement名称，retention policy 名称和用户名。

`time`查询中不需要双引号。

`time`不能是field key或tag key;  openGemini拒绝使用`time`作为tag key的写入，否则返回错误。使用`time`作为field key写入，openGemini将忽略`time`字段。·

## 将数据写入openGemini

### 在数据库中获取数据
现在，您已经了解openGemini line procotol的全部知识，实际上如何将line procotol 添加到openGemini，在这里将给出简单的示例。

::: tabs

@tab CLI

使用ts-cli命令将数据写入openGemini数据库，启动命令行界面（CLI）写入相关的数据库，并将Insert放在line procotol前面:

```sql
INSERT weather,location=us-midwest temperature=82 1465839830100400200
```

也可以使用CLI从文件导入Line protocol数据。

参考[ts-cli]()。

@tab API

使用openGemini API将数据写入openGemini，使用`POST`向`/write方法发起请求，并在请求正文中提供您的line protocol：

```bash
curl -i -XPOST "http://localhost:8086/write?db=science_is_cool" --data-binary 'weather,location=us-midwest temperature=82 1465839830100400200'
```

批量写入数据：

```bash
curl -i -XPOST "http://localhost:8086/write?db=db0" --data-binary '
weather,location=us-midwest temperature=82 1465839830100400200
weather,location=us-midwest temperature=83 1465839830100400300
weather,location=us-midwest temperature=84 1465839830100400400
'
```

:::

### 重复points

 point 由measurement名称，tag set，和timestamp唯一标识，如果提交具有相同measurement、tag set和timestamp的line procotol，但是使用不同的**field set**，field set就变成了旧field set和新field set的**并集**，如果存在field_key冲突，仅保留新的field set的数据。
