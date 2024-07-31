---
title: High-series cardinality
order: 6
---

Cardinality refers to the number of unique values in databases in a specific column or field. Time series data often includes metadata that describes the data, commonly referred to as "TAGs." Typically, the TAGs are indexed to improve query performance, allowing you to quickly find all values that match.

The cardinality of a time series dataset is usually defined by the cross product of the cardinalities of each individually indexed column. If there are multiple indexed columns, each with a large number of unique values, the cardinality of the cross product can become very large. Developers usually mean this when discussing time series datasets with "high cardinality."

The high cardinality problem manifests as index bloat, high memory resource consumption, and decreased query performance. All time-series databases face this challenge, and the openGemini high cardinality storage engine offers a solution. This article mainly introduces the configuration and use of the high cardinality storage engine.

## CONFIGURATION

The high cardinality storage engine supports the InfluxDB Line Protocol (the line protocol) and the Apache Arrow Flight protocol (the column protocol). Generally, using column protocols have better write performance.

The configuration (openGemini.conf) for writing with the column protocol is as follows:

```toml
[http]
flight-address = "127.0.0.1:8087" // 8087 is the port for column protocol writing
flight-enabled = true // Enable the column protocol, disabled by default in openGemini.conf
flight-auth-enabled = false // authentication, disabled by default
```

In addition, a hidden configuration item is available.

```toml
[data]
snapshot-table-number = 1 // The number of concurrent for data sorting and flushing. The default value is 1, and the maximum is 8.
```

When the write traffic is huge, you can increase the number of `snapshot-table-number` to improve data storage efficiency.

## CRETE MEASUREMENT

To use the high cardinality storage engine, you must first actively create a measurement and specify the high cardinality storage engine when creating the measurement; otherwise, it will not take effect.

How to create a measurement? **Refers :** [create measurement](../schema/measurement.md#use-a-high-series-cardinality-storage-engine-hsce)



## SHOW SHARDKEY

```sql
> CREATE MEASUREMENT rtt (deviceIp STRING, deviceName STRING, campus STRING, rtt INT64) WITH ENGINETYPE = COLUMNSTORE SHARDKEY deviceIp PRIMARYKEY deviceIp,campus SORTKEY deviceIp,campus,time
> SHOW SHARDKEY FROM rtt
+------------+------+-------------+
| SHARD_KEY  | TYPE | SHARD_GROUP |
+------------+------+-------------+
| [deviceIp] | hash |           0 |
+------------+------+-------------+
3 columns, 1 rows in set
```

## SHOW SORTKEY

```sql
> SHOW SORTKEY from rtt
+------------------------+
|        SORT_KEY        |
+------------------------+
| [deviceIp campus time] |
+------------------------+
1 columns, 1 rows in set
```

## SHOW SCHEMA

```sql
> SHOW SCHEMA FROM rtt
+------------+------+-------------+
| SHARD_KEY  | TYPE | SHARD_GROUP |
+------------+------+-------------+
| [deviceIp] | hash |           0 |
+------------+------+-------------+
3 columns, 1 rows in set

+-------------+
| ENGINETYPE  |
+-------------+
| columnstore |
+-------------+
1 columns, 1 rows in set

+---------+
| INDEXES |
+---------+
+---------+
1 columns, 0 rows in set

+-------------------+
|    PRIMARY_KEY    |
+-------------------+
| [deviceIp campus] |
+-------------------+
1 columns, 1 rows in set

+------------------------+
|        SORT_KEY        |
+------------------------+
| [deviceIp campus time] |
+------------------------+
1 columns, 1 rows in set

+-----------------+
| COMPACTION_TYPE |
+-----------------+
| row             |
+-----------------+
1 columns, 1 rows in set

```

## DATA QUERYING

The query syntax is the same as the openGemini default storage engine. For more information, **refer to** : [query data](../query_data/SELECT.md)

:::tip

1. The high cardinality storage engine currently only supports some aggregation operators, including `count`/`sum`/`min`/`max`/`mean`/`first`/`last`/`percentile`.
2. Regular matching and compound expressions are not supported.

:::

The following primarily outlines the distinctions in the syntaxes of the SELECT, GROUP BY, and ORDER BY statements for high-cardinality storage engines:

### sample data

```sql
> CREATE DATABASE db0
> USE db0
> CREATE MEASUREMENT mst0(country tag, "name" tag, age int64,  height float64,  address string, alive bool) WITH  ENGINETYPE=columnstore PRIMARYKEY time,country,"address" SORTKEY time,country,"address",age,height,"name"
# the sample data
> SELECT * FROM mst0
name: mst0
time                address   age alive country    height name
----                -------   --- ----- -------    ------ ----
1629129600000000000 shenzhen  12  true  "china"    70     "azhu"
1629129601000000000 shanghai  20  false "american" 80     "alan"
1629129602000000000 beijin    3   true  "germany"  90     "alang"
1629129603000000000 guangzhou 30  false "japan"    121    "ahui"
1629129604000000000 chengdu   35  true  "canada"   138    "aqiu"
1629129605000000000 wuhan     48  true  "china"    149    "agang"
1629129606000000000 wuhan     52  true  "american" 153    "agan"
1629129607000000000 anhui     28  false "germany"  163    "alin"
1629129608000000000 xian      32  true  "japan"    173    "ali"
1629129609000000000 hangzhou  60  false "canada"   180    "ali"
1629129610000000000 nanjin    102 true  "canada"   191    "ahuang"
1629129611000000000 zhengzhou 123 false "china"    203    "ayin"
```

### SELECT CLAUSE

The distinctions are as follows:

|                                                              | high cardinality storage engine | default storage engine |
| ------------------------------------------------------------ | ------------------------------- | ---------------------- |
| SELECT *country* FROM *mst0*     //the `country` is a TAG key | &#10004;                        | &#10006;               |
| SELECT *age* FROM *mst0*    // the `age` is a FIELD key      | &#10004;                        | &#10004;               |
| SELECT *country*, *age* FROM *mst0*                          | &#10004;                        | &#10004;               |
| SELECT count(*country*) FROM mst0   //*`country`* is a TAG key | &#10004;                        | &#10006;               |
| SELECT count(*age*) FROM mst0                                | &#10004;                        | &#10004;               |

### GROUP BY CLAUSE

The distinctions are as follows:

|                                                              | high cardinality storage engine | default storage engine |
| ------------------------------------------------------------ | ------------------------------- | ---------------------- |
| SELECT "name" FROM mst0 GROUP BY country   //the `name` is a TAG key | &#10004;                        | &#10006;               |
| SELECT mean(height) FROM mst0 GROUP BY country  //the `country` is a TAG key | &#10004;                        | &#10004;               |
| SELECT mean(height) FROM mst0 GROUP BY address   //the `address`is a FIELD key | &#10004;                        | &#10006;               |
| SELECT "name" FROM mst0 GROUP BY address   //the `“name”` is a TAG key , `address` is a FIELD key | &#10004;                        | &#10006;               |

### ORDER BY CLAUSE

The "openGemini" high cardinality engine does not sort the query results by default. If you require the results to be in a specific order, you can use the ORDER BY clause, which supports sorting by TIME, TAG, FIELD, or aggregated results.

By default, ORDER BY sorts in ascending order (ASC), but you can specify ascending (ASC) or descending (DESC) order for each sorting field as needed.

The distinctions are as follows:

|                                                              | high cardinality storage engine | default storage engine |
| :----------------------------------------------------------- | ------------------------------- | ---------------------- |
| SELECT mean(height) as avg_height <br/>FROM mst0 <br/>WHERE time >=1629129600000000000 AND time <=1629129611000000000 <br/>GROUP BY time(5s), country <br/>FILL(none) <br/>ORDER BY country, avg_height, time | &#10004;                        | &#10006;               |
| SELECT mean(height) as avg_height <br/>FROM mst0 <br/>WHERE time >=1629129600000000000 AND time <=1629129611000000000 <br/>GROUP BY time(5s),country <br/>FILL(none) <br/>ORDER BY country DESC, avg_height DESC, time ASC | &#10004;                        | &#10006;               |

## DATA WRITING

### Line protocol

Refers:  [the Line Protocol Writing for openGemini](../write_data/insert_line_protocol.md)

### Column Protocol

Refers: [the Column Protocol Writing for openGemini](../write_data/insert_column_protocol.md)

## FUNCTION SUPPORT

Compared to the default storage engine, the high cardinality storage engine does not yet support some functions and features. We hope to work with developers to implement them.

| Categorization | Items                         | high cardinality storage engine | default storage engine |
| -------------- | ----------------------------- | ------------------------------- | ---------------------- |
| **Writing**    | Prometheus remote read/write  | &#10006;                        | &#10004;               |
|                | InfluxDB Line Protocol        | &#10004;                        | &#10004;               |
|                | Apache Arrow Flight           | &#10004;                        | &#10006;               |
|                | openTelemetry                 | &#10006;                        | &#10004;               |
| **Querying**   | ElasticSearch                 | &#10006;                        | &#10006;               |
|                | PromQL                        | WIP                             | WIP                    |
|                | InfluxQL                      | &#10004;                        | &#10004;               |
| **Functions**  | Count                         | &#10004;                        | &#10004;               |
|                | Sum                           | &#10004;                        | &#10004;               |
|                | Count(time)                   | &#10004;                        | &#10004;               |
|                | Mean                          | &#10004;                        | &#10004;               |
|                | Mode                          | &#10006;                        | &#10004;               |
|                | Stddev                        | &#10006;                        | &#10004;               |
|                | Median                        | &#10006;                        | &#10004;               |
|                | Spread                        | &#10006;                        | &#10004;               |
|                | Distinct                      | &#10006;                        | &#10004;               |
|                | Rate                          | &#10006;                        | &#10004;               |
|                | Irate                         | &#10006;                        | &#10004;               |
|                | Moving_average                | &#10006;                        | &#10004;               |
|                | Holt_winter                   | &#10004;                        | &#10004;               |
|                | Cumulative                    | &#10006;                        | &#10004;               |
|                | Difference                    | &#10006;                        | &#10004;               |
|                | Elapsed                       | &#10006;                        | &#10004;               |
|                | Non_negative_derivative       | &#10006;                        | &#10004;               |
|                | Non_negative_difference       | &#10006;                        | &#10004;               |
|                | Abs                           | &#10004;                        | &#10004;               |
|                | Acos                          | &#10004;                        | &#10004;               |
|                | Asin                          | &#10004;                        | &#10004;               |
|                | Cos                           | &#10004;                        | &#10004;               |
|                | Atan                          | &#10004;                        | &#10004;               |
|                | Atan2                         | &#10004;                        | &#10004;               |
|                | Ceil                          | &#10004;                        | &#10004;               |
|                | Exp                           | &#10004;                        | &#10004;               |
|                | Floor                         | &#10004;                        | &#10004;               |
|                | In                            | &#10004;                        | &#10004;               |
|                | Log                           | &#10004;                        | &#10004;               |
|                | Log2                          | &#10004;                        | &#10004;               |
|                | Log10                         | &#10004;                        | &#10004;               |
|                | Pow                           | &#10004;                        | &#10004;               |
|                | Round                         | &#10004;                        | &#10004;               |
|                | Sqrt                          | &#10004;                        | &#10004;               |
|                | Frist                         | &#10004;                        | &#10004;               |
|                | Last                          | &#10004;                        | &#10004;               |
|                | Max                           | &#10004;                        | &#10004;               |
|                | Min                           | &#10004;                        | &#10004;               |
|                | Top                           | &#10004;                        | &#10004;               |
|                | Bottom                        | &#10004;                        | &#10004;               |
|                | Percentile                    | &#10004;                        | &#10004;               |
|                | Sample                        | &#10004;                        | &#10004;               |
|                | Percentile_ogsketch           | &#10004;                        | &#10004;               |
|                | Str                           | &#10004;                        | &#10004;               |
|                | Strlen                        | &#10004;                        | &#10004;               |
|                | Substr                        | &#10004;                        | &#10004;               |
|                | Castor                        | &#10006;                        | &#10004;               |
| **Features**   | Data subscription             | &#10006;                        | &#10004;               |
|                | Continue query                | &#10006;                        | &#10004;               |
|                | Downsample                    | &#10006;                        | &#10004;               |
|                | Stream_agg                    | &#10004;                        | &#10004;               |
|                | Tag array                     | &#10006;                        | &#10004;               |
|                | Log search                    | &#10006;                        | &#10004;               |
|                | Object storage                | &#10004;                        | &#10004;               |
|                | Data replication              | &#10006;                        |                        |
| **MetaData**   | Create/drop/show database     | &#10004;                        | &#10004;               |
|                | Create/drop/show measurements | &#10004;                        | &#10004;               |
|                | Create/show/alter/drop RP     | &#10004;                        | &#10004;               |
|                | Show tag keys                 | &#10004;                        | &#10004;               |
|                | Show tag values               | &#10006;                        | &#10004;               |
|                | Show field keys               | &#10004;                        | &#10004;               |
|                | Show series                   | &#10006;                        | &#10004;               |
|                | Show shards                   | &#10004;                        | &#10004;               |
|                | Show shard groups             | &#10004;                        | &#10004;               |
|                | Show cluster                  | &#10004;                        | &#10004;               |
|                | Show queries                  | &#10004;                        | &#10004;               |



