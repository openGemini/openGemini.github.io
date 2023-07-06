---
order: 3
---

# CREATE MEASUREMENT (创建表)

openGemini在写数据时支持自动创建表，但如下三种情况，需要提前创建表：

## 指定分区键
openGemini中数据默认按照时间线进行hash分区打散，但某些场景下，业务频繁使用某个或者某几个TAG进行数据检索，采用时间线hash分区的方式让这部分TAG的数据分散到了不同的节点，造成查询扇出度比较大。如果可以按照这部分频繁使用的TAG对数据进行分区，这样相同TAG值的数据会集中存储在同一个节点之上，从而减少查询扇出度，提升数据检索效率。

### 指定一个TAG（如location）对数据进行打散
```sql
CREATE MEASUREMENT mst WITH SHARDKEY location
```
### 指定多个TAG（如location，region）作为SHARDKEY
```sql
CREATE MEASUREMENT mst WITH SHARDKEY location，region
```

## 文本检索
文本检索指根据文本内容，如关键字、短语等对文本集合进行检索、过滤等。openGemini支持文本检索，比如对日志进行关键字检索，可返回包含关键字的所有日志数据。
当你在使用该功能时，需要预先创建表，创建表的目的其实是为了指定要在哪些Field字段上创建全文索引，但有个前提，这些Field字段必须是String数据类型。
```sql
CREATE MEASUREMENT mst WITH INDEXTYPE text INDEXLIST description, error_message
```
创建名为mst的表，并指定在description和error_message两个字段上创建全文索引。

```sql
CREATE MEASUREMENT mst WITH INDEXTYPE text INDEXLIST description, error_message SHARDKEY location
```
创建名为mst的表，并指定在description和error_message两个字段上创建全文索引, 同时设置mst根据location对数据进行分区打散
::: tip

仅会在指定的字段field_name1和field_name2创建全文索引，若在其他Field中检索关键字，可能会比较慢
在字段field_name1和field_name2支持精确匹配，短语匹配和模糊匹配三种，相关语法示例参考SELECT
不支持在TAG上创建文本索引
:::
## 使用高基数存储引擎
openGemini的高基数存储引擎HSCE解决了传统时序数据库因时间线过大导致的索引膨胀问题，我们在使用时，需要在创建表的时候指定存储引擎，openGemini默认的存储引擎并不是HSCE。
```sql
CREATE MEASUREMENT mst (location string field default "", direction string field default "", rtt int field default 0, time int field default 0,) WITH ENGINETYPE = columnstore SHARDKEY location TYPE hash PRIMARYKEY location, direction SORTKEY time
```
该语句说明如下：
- 创建名为mst的表，有location, direction, rtt, time等四个字段，并分别指定了数据类型和默认值，比如location为字符串类型，默认值为空字符串。
- ENGINETYPE关键字必须指定mst的存储引擎类型为columnstore（表示使用HSCE高基数引擎）
- SHARDKEY关键字指定使用location对数据进行分区打散
- TYPE关键字表示打散方式，分为hash和range两种
- PRIMARYKEY表示主键为location和direction，意味着存储引擎会在这两个字段之上创建索引。
- SORTKEY指定存储引擎内部的数据排序方式，time表示按时间排序，也可以换为rtt或者direction，甚至表中其他的字段。

这里创建表同样使用create measurement语句，不同的是：
1. 在创建表的时候指定了表中的全部字段名称、数据类型、是TAG还是普通字段（Field）以及缺失值的情况下的默认值。
2. 创建表时，必须指定ENGINETYPE=columnstore才是使用高基数存储引擎
3. 如果不指定SHARDKEY，数据会全部落在其中一个数据节点上
4. 上述关键字ENGINETYPE、PRIMARYKEY、SORTKEY必须指定

::: tip

传统倒排索引在高基维场景近似稠密索引，索引开销较大，同时对于数据过滤几乎没有效果。openGemini高基数存储引擎使用更合适的数据聚簇和排序方式，并通过构建基数无关的稀疏索引，提升数据过滤效果与查询性能。  

针对高基数这一难题，openGemini从根本上进行了解决，但openGemini在新存储引擎之上的许多数据库功能还尚未完善，不满足生产环境使用，比如不支持聚合算子，再比如创建表的语法还需要进一步精简，以及一些异常情况也还未处理。  

openGemini高基数存储引擎具备非常高读写性能，我们欢迎感兴趣的开发者参与进来，一起完善功能。

:::




