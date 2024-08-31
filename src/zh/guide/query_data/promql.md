---
title: PromQL查询
order: 2
---

自openGemini v1.3.0开始支持PromQL，通过HTTP API接口方式对外提供能力，主要包括表达式查询，元数据查询和远程数据读写。

**表达式查询**

- Instant Query
- Range Query

**元数据查询**

- Query Lable Names
- Query Lable Values
- Query Series

**远程读写**

- Remote Read and Write

与此同时，openGemini兼容了Prometheus功能函数，点击查看[兼容列表]()

## HTTP API概述

总体上，openGemini对外提供两类API：`/api/v1/xxx` 和 `/promethues/{metric_store}/api/v1/xxx`。**前者根据查询或者写入的指标来确定数据库表名。后者主要用于平台多用户场景，可通过用户ID代替`{metric_store}`，使得该用户的数据全部存放在一个表中，起到用户数据隔离的目的。**

响应为JSON对象，以下是HTTP 响应的状态码：

- `200 success` 请求响应成功

- `400 Bad Request` 当参数缺失或不正确时
- `403 Request Access Denied` 请求拒绝访问时
- `422 Unprocessable Entity` 当表达式无法执行时（[RFC4918](https://tools.ietf.org/html/rfc4918#page-78)）
- `503 Service Unavailable` 当查询超时或中止时

除上述错误码之外的其他非`2xx`的错误码表示请求未到达服务端之前出现问题

请求响应的数据格式如下：

```json
{
  "status": "success" | "error",
  "data": <data>,

  // Only set if status is "error". The data field may still hold
  // additional data.
  "errorType": "<string>",
  "error": "<string>",

  // Only set if there were warnings while executing the request.
  // There will still be data in the data field.
  "warnings": ["<string>"],
  // Only set if there were info-level annnotations while executing the request.
  "infos": ["<string>"]
}
```

**特别说明**

- 请使用同类API操作数据库，比如 使用 `/api/v1/prom/write` 写数据，则需要使用`/api/v1/prom/read` 或者 `/api/v1/query`做查询，不能换`/prometheus/{metric_store}/api/v1/query `进行查询
- 高基数引擎不支持使用PromQL进行查询

## 模拟Prometheus样例数据

```sql
> create database prom
> use prom
> insert up,__name__=up,instance=localhost:8086,job=prometheus value=2   1709258312000000000
> insert up,__name__=up,instance=localhost:8086,job=prometheus value=3   1709258327000000000
> insert up,__name__=up,instance=localhost:8086,job=prometheus value=5   1709258342000000000
> insert up,__name__=up,instance=localhost:8086,job=prometheus value=9   1709258357000000000
> insert up,__name__=up,instance=localhost:8086,job=prometheus value=10  1709258372000000000
> insert up,__name__=up,instance=localhost:8086,job=prometheus value=11  1709258387000000000
> insert up,__name__=up,instance=localhost:8086,job=prometheus value=15  1709258402000000000
> insert up,__name__=up,instance=localhost:8080,job=container value=2       1709258312000000000
> insert up,__name__=up,instance=localhost:7070,job=container value=15      1709258402000000000
> insert down,__name__=down,instance=localhost:8086,job=prometheus value=2   1709258312000000000
> insert down,__name__=down,instance=localhost:8086,job=prometheus value=3   1709258327000000000
> insert down,__name__=down,instance=localhost:8086,job=prometheus value=5   1709258342000000000
> insert down,__name__=down,instance=localhost:8086,job=prometheus value=9   1709258357000000000
> insert down,__name__=down,instance=localhost:8086,job=prometheus value=10  1709258372000000000
> insert down,__name__=down,instance=localhost:8086,job=prometheus value=11  1709258387000000000
> insert down,__name__=down,instance=localhost:8086,job=prometheus value=15  1709258402000000000
> insert down,__name__=down,instance=localhost:8080,job=container value=2       1709258312000000000
> insert down,__name__=down,instance=localhost:7070,job=container value=15      1709258402000000000
> show measurements
name: measurements
name
----
down
up
```



## Instant Queries (瞬时数据查询)

#### 功能介绍

该接口用于PromQL(Prometheus Query Language)查询在特定时间点下的数据集

#### URL

```
GET/POST /prometheus/{metric_store}/api/v1/query
GET/POST /api/v1/query
```

查询参数

| 参数           | 是否必选 | 参数类型 | 描述                                                         |
| :------------- | :------- | :------- | :----------------------------------------------------------- |
| query          | 是       | String   | PromQL表达式(参考https://prometheus.io/docs/prometheus/latest/querying/basics/)。 |
| time           | 否       | String   | 指定用于计算 PromQL 的时间戳，(Unix时间戳格式，单位：秒）。  |
| timeout        | 否       | String   | 执行查询的超时时间，单位：秒。同时支持1s、2m、3h、4d等用法。 |
| lookback-delta | 否       | String   | 可用于自定义设置query.lookback-delta参数值，仅对当次Query有效,请参见[Time Durations](https://prometheus.io/docs/prometheus/latest/querying/basics/#time-durations)。此参数表示PromQL计算中寻点过程的最大回溯区间，该值默认为"5m"。 |
| db             | 否       | String   | [数据库](https://docs.opengemini.org/zh/guide/schema/database.html)，默认为prom |
| rp             | 否       | String   | [数据保留策略](https://docs.opengemini.org/zh/guide/schema/retention_policy.html)，默认为autogen |

####  **请求示例 1**

查询表达式`up`在时间点1709258312的全部数据，注意查询时间单位必须为秒

```shell
curl -i -XPOST 'http://127.0.0.1:8086/api/v1/query?query=up&time=1709258312'
```

#### 响应示例 1

状态码：200，success 请求响应成功

```json
{
	"status": "success",
	"data": {
		"resultType": "vector",
		"result": [{
			"metric": {
				"__name__": "up",
				"instance": "localhost:8080",
				"job": "container"
			},
			"value": [1709258312, "2"]
		}, {
			"metric": {
				"__name__": "up",
				"instance": "localhost:8086",
				"job": "prometheus"
			},
			"value": [1709258312, "2"]
		}]
	}
}
```

#### **请求示例 2**

给定条件`instance="localhost:8080"`，查询表达式`up{instance="localhost:8080"}`在时间点1709258312的全部数据

```shell
curl -i -XPOST 'http://127.0.0.1:8086/api/v1/query?query=up%7Binstance="localhost:8080"%7D&time=1709258312'
```

#### 响应示例 2

状态码：200，success 请求响应成功

```
{
	"status": "success",
	"data": {
		"resultType": "vector",
		"result": [{
			"metric": {
				"__name__": "up",
				"instance": "localhost:8080",
				"job": "container"
			},
			"value": [1709258312, "2"]
		}]
	}
}
```

## Range Queries(区间数据查询)

#### 功能介绍

该接口用于PromQL(Prometheus Query Language)查询在一段时间的全部数据

#### URL

```toml
GET/POST /prometheus/{metric_store}/api/v1/query_range
GET/POST /api/v1/query_range
```

查询参数

| 参数           | 是否必选 | 参数类型 | 描述                                                         |
| :------------- | :------- | :------- | :----------------------------------------------------------- |
| query          | 是       | String   | PromQL表达式(参考https://prometheus.io/docs/prometheus/latest/querying/basics/)。 |
| start          | 是       | String   | 起始时间戳(Unix时间戳格式，单位：秒）。                      |
| end            | 是       | String   | 结束时间戳(Unix时间戳格式，单位：秒）。                      |
| step           | 是       | String   | 查询时间步长，时间区内每step秒执行一次。                     |
| timeout        | 否       | String   | 执行查询的超时时间，单位：秒。同时支持1s、2m、3h、4d等用法。 |
| lookback-delta | 否       | String   | 可用于自定义设置query.lookback-delta参数值，仅对当次Query有效,请参见[Time Durations](https://prometheus.io/docs/prometheus/latest/querying/basics/#time-durations)。此参数表示PromQL计算中寻点过程的最大回溯区间，该值默认为"5m"。 |
| db             | 否       | String   | [数据库](https://docs.opengemini.org/zh/guide/schema/database.html)，默认为prom |
| rp             | 否       | String   | [数据保留策略](https://docs.opengemini.org/zh/guide/schema/retention_policy.html)，默认为autogen |

#### 请求示例

给定时间范围 [1709258312,1709258402] 内以15秒为间隔计算表达式`up`的结果

```shell
curl -i -XPOST 'http://127.0.0.1:8086/api/v1/query_range?query=up&start=1709258312&end=1709258402&step=15s'
```

#### 响应示例

状态码：200，success 请求响应成功

```json
{
	"status": "success",
	"data": {
		"resultType": "matrix",
		"result": [{
			"metric": {
				"__name__": "up",
				"instance": "localhost:7070",
				"job": "container"
			},
			"values": [
				[1709258402, "15"]
			]
		}, {
			"metric": {
				"__name__": "up",
				"instance": "localhost:8080",
				"job": "container"
			},
			"values": [
				[1709258312, "2"],
				[1709258327, "2"],
				[1709258342, "2"],
				[1709258357, "2"],
				[1709258372, "2"],
				[1709258387, "2"],
				[1709258402, "2"]
			]
		}, {
			"metric": {
				"__name__": "up",
				"instance": "localhost:8086",
				"job": "prometheus"
			},
			"values": [
				[1709258312, "2"],
				[1709258327, "3"],
				[1709258342, "5"],
				[1709258357, "9"],
				[1709258372, "10"],
				[1709258387, "11"],
				[1709258402, "15"]
			]
		}]
	}
}
```

## Query Label Names(查询标签名)

#### 功能介绍

该接口用于获取标签名列表

#### URL

```
GET/POST /prometheus/{metric_store}/api/v1/labels
GET/POST /api/v1/labels
```

查询参数

| 参数    | 是否必选 | 参数类型 | 描述                                                         |
| :------ | :------- | :------- | :----------------------------------------------------------- |
| match[] | 否       | String   | 时间线筛选条件，可以设置零个或多个值。                       |
| start   | 否       | String   | 起始时间戳(Unix时间戳格式，单位：秒）。                      |
| end     | 否       | String   | 结束时间戳(Unix时间戳格式，单位：秒）。                      |
| db      | 否       | String   | [数据库](https://docs.opengemini.org/zh/guide/schema/database.html)，默认为prom |
| rp      | 否       | String   | [数据保留策略](https://docs.opengemini.org/zh/guide/schema/retention_policy.html)，默认为autogen |

#### 请求示例 1

返回标签列表

```shell
curl -i -XPOST 'http://127.0.0.1:8086/api/v1/labels'
```

#### 响应示例 1

状态码：200，success 请求响应成功

```
{
	"status": "success",
	"data": ["__name__", "instance", "job"]
}
```

#### 请求示例 2

给定条件`match[]=up`，返回标签列表

```shell
curl -i -XPOST 'http://127.0.0.1:8086/api/v1/labels?' --data-urlencode 'match[]=up{instance="localhost:8086"}'
```

#### 响应示例 2

状态码：200，success 请求响应成功

```
{
	"status": "success",
	"data": ["__name__", "instance", "job"]
}
```

## Query Lable Values(查询标签值)

#### 功能介绍

该接口用于查询带有指定标签的时间序列列表

#### URL

```
GET /prometheus/{metric_store}/api/v1/label/{label_name}/values
GET /api/v1/label/{label_name}/values
```

路径参数

| 参数         | 是否必选 | 参数类型 | 描述         |
| :----------- | :------- | :------- | :----------- |
| metric_store | 是       | String   | 指标名       |
| label_name   | 是       | String   | 查询标签名称 |

查询参数

| 参数    | 是否必选 | 参数类型 | 描述                                                         |
| :------ | :------- | :------- | :----------------------------------------------------------- |
| match[] | 否       | String   | 时间线筛选条件，可以设置零个或多个值。                       |
| start   | 否       | String   | 起始时间戳(Unix时间戳格式，单位：秒）。                      |
| end     | 否       | String   | 结束时间戳(Unix时间戳格式，单位：秒）。                      |
| db      | 否       | String   | [数据库](https://docs.opengemini.org/zh/guide/schema/database.html)，默认为prometheus |
| rp      | 否       | String   | [数据保留策略](https://docs.opengemini.org/zh/guide/schema/retention_policy.html)，默认为autogen |

#### 请求示例

查询标签`job`的所有标签值

```shell
curl -g 'http://127.0.0.1:8086/api/v1/label/job/values?start=1709258312&end=1709258402'
```

#### 响应示例

状态码：200，success 请求响应成功

```json
{
	"status": "success",
	"data": ["container", "prometheus"]
}
```

## Query Series(查询时间线)

#### 功能介绍

该接口用于获取时间线列表

#### URL

```
GET/POST /prometheus/{metric_store}/api/v1/series
GET/POST /api/v1/series
```

查询参数

| 参数    | 是否必选 | 参数类型 | 描述                                                         |
| :------ | :------- | :------- | :----------------------------------------------------------- |
| match[] | 是       | String   | 时间线筛选条件，可以设置一个或多个值。                       |
| start   | 否       | String   | 起始时间戳(Unix时间戳格式，单位：秒）。                      |
| end     | 否       | String   | 结束时间戳(Unix时间戳格式，单位：秒）。                      |
| db      | 否       | String   | [数据库](https://docs.opengemini.org/zh/guide/schema/database.html)，默认为prom |
| rp      | 否       | String   | [数据保留策略](https://docs.opengemini.org/zh/guide/schema/retention_policy.html)，默认为autogen |

#### 请求示例 1

返回时间线列表

```shell
curl -g 'http://127.0.0.1:8086/api/v1/series?match[]=up'
```

#### 响应示例 1

状态码：200，success 请求响应成功

```json
{
	"status": "success",
	"data": [{
		"__name__": "up",
		"instance": "localhost:7070",
		"job": "container"
	}, {
		"__name__": "up",
		"instance": "localhost:8080",
		"job": "container"
	}, {
		"__name__": "up",
		"instance": "localhost:8086",
		"job": "prometheus"
	}]
}
```

#### 请求示例 2

返回时间线列表

```shell
curl -g 'http://127.0.0.1:8086/api/v1/series?' --data-urlencode 'match[]=up{instance="localhost:7070"}'
```

#### 响应示例 2

状态码：200，success 请求响应成功

```json
{
	"status": "success",
	"data": [{
		"__name__": "up",
		"instance": "localhost:7070",
		"job": "container"
	}]
}
```

## Query Metric MetaData(查询指标信息)

#### 功能介绍

该接口用于获取指标元数据信息

#### URL

```
GET/POST /prometheus/{metric_store}/api/v1/metadata
GET/POST /api/v1/metadata
```

查询参数

| 参数             | 是否必选 | 参数类型 | 描述                                                         |
| :--------------- | :------- | :------- | :----------------------------------------------------------- |
| limit            | 是       | String   | 要返回的指标最大数量。                                       |
| limit_per_metric | 否       | String   | 每个指标要返回的最大元数据数量                               |
| metric           | 否       | String   | 用于筛选元数据的指标名称。如果为空，则检索所有指标元数据。   |
| db               | 否       | String   | [数据库](https://docs.opengemini.org/zh/guide/schema/database.html)，默认为prom |
| rp               | 否       | String   | [数据保留策略](https://docs.opengemini.org/zh/guide/schema/retention_policy.html)，默认为autogen |

#### 请求示例

返回标签名列表

```
curl -i -XPOST 'http://127.0.0.1:8086/api/v1/metadata'
```

#### 响应示例

当前样例数据无值

状态码：200，success 请求响应成功

```json
{
  "status" : "success",
  "data" : {
    "up" : [ {
      "type" : "",
      "help" : "",
      "unit" : ""
    } ]
  }
}
```

## Remote Read/Write(数据查询)

参考[prometheus 远程读写](../write_data/prometheus.md)
