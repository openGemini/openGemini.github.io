---
title: Use PromQL
order: 2
---

openGemini has supported PromQL at v1.3.0 and provided HTTP API such as expression query, metadata query, and remote data reading and writing

**Expression query**

- Instant Query

- Range Query

**Metadata query**

- Query Lable Names

- Query Lable Values

- Query Series

**Remote Reading and Writing**

- Remote Read and Write

At the same time, openGemini is compatible with Prometheus functions. Click to view the [compatible list]().

## HTTP API Overview

In general, openGemini provides two types of APIs: `/api/v1/xxx` and `/promethues/{metric_store}/api/v1/xxx`. The former determines the measurement name based on the read or written metrics. The latter is mainly used in multi-user scenarios on the platform. The user ID can be used instead of `{metric_store}` so that all the user's data is stored in one measurement, which serves the purpose of user data isolation.

The response is a JSON object. The following is the status code of the HTTP response:

- `200 success` when request response successful

- `400 Bad Request` when the parameter is missing or incorrect

- `403 Request Access Denied` when the request is denied access

- `422 Unprocessable Entity` when the expression cannot be executed (RFC4918)

- `503 Service Unavailable` when the query times out or is aborted

Other non-`2xx` codes may be returned for errors occurring before the API endpoint is reached.

The JSON response envelope format is as follows:

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

Please use the same API to operate the database. For example, if you use `/api/v1/prom/write` to write data, you need to use `/api/v1/prom/read` or`/api/v1/query` to query. You cannot use `/prometheus/{metric_store}/api/v1/query` to query.

## Simulating Prometheus sample data

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

## Instant Queries

The following endpoint evaluates an instant query at a single point in time:

**URL**

```
GET/POST /prometheus/{metric_store}/api/v1/query
GET/POST /api/v1/query
```

**Query Parameters**

| Parameter      | Must | Type   | Description                                                  |
| :------------- | :--- | :----- | :----------------------------------------------------------- |
| query          | Yes  | String | Prometheus expression query string. ref [PromQL expression](https://prometheus.io/docs/prometheus/latest/querying/basics) |
| time           | No   | String | Unix timestamp, unit: seconds                                |
| timeout        | No   | String | Executing query timeout, unit: seconds. Like 1s, 2m, 3h, 4d and etc. |
| lookback-delta | No   | String | see [Time Durations](https://prometheus.io/docs/prometheus/latest/querying/basics/#time-durations). The maximum backtracking interval of the point-finding process in PromQL calculation. The default value is "5m". |
| db             | No   | String | [database](https://docs.opengemini.org/guide/schema/database.html), prom default |
| rp             | No   | String | [retention policy](https://docs.opengemini.org/guide/schema/retention_policy.html), autogen default |

####  **Example-1**

Query all the data at the timestamp `1709258312` with the expression `up`. **Note** : the timestamp must be seconds.

```shell
curl -i -XPOST 'http://127.0.0.1:8086/api/v1/query?query=up&time=1709258312'
```

#### Response-1

Status Code: 200, The request response is successful

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

#### **Example-2**

Given the condition `instance="localhost:8080"`, query all the data at the timestamp 1709258312 with the expression `up{instance="localhost:8080"}`

```shell
curl -i -XPOST 'http://127.0.0.1:8086/api/v1/query?query=up%7Binstance="localhost:8080"%7D&time=1709258312'
```

#### Response 2

Status Code: 200, The request response is successful

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

## Range Queries

Evaluates an expression query over a range of time

#### URL

```toml
GET/POST /prometheus/{metric_store}/api/v1/query_range
GET/POST /api/v1/query_range
```

**Query Parameters**

| Parameter      | Must | Type   | Description                                                  |
| :------------- | :--- | :----- | :----------------------------------------------------------- |
| query          | Yes  | String | Prometheus expression query string. ref [PromQL expression](https://prometheus.io/docs/prometheus/latest/querying/basics) |
| start          | Yes  | String | Start timestamp (unix timestamp, unit: seconds)              |
| end            | Yes  | String | End timestamp (Unix timestamp, unit: seconds)                |
| step           | Yes  | String | Query resolution step width in `duration` format or float number of seconds. |
| timeout        | No   | String | Evaluation timeout. Like 1s, 2m, 3h, 4d and etc.             |
| lookback-delta | No   | String | see [Time Durations](https://prometheus.io/docs/prometheus/latest/querying/basics/#time-durations). The maximum backtracking interval of the point-finding process in PromQL calculation. The default value is "5m". |
| db             | No   | String | [database](https://docs.opengemini.org/guide/schema/database.html), prom default |
| rp             | No   | String | [retention policy](https://docs.opengemini.org/guide/schema/retention_policy.html), autogen default |

#### Example

给定时间范围 [1709258312,1709258402] 内以15秒为间隔计算表达式`up`的结果

```shell
curl -i -XPOST 'http://127.0.0.1:8086/api/v1/query_range?query=up&start=1709258312&end=1709258402&step=15s'
```

#### Response

Status Code: 200, The request response is successful

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

## Query Label Names

Returns a list of label names

**URL**

```
GET/POST /prometheus/{metric_store}/api/v1/labels
GET/POST /api/v1/labels
```

**Query Parameters**

| Parameter | Must | Type   | Description                                                  |
| :-------- | :--- | :----- | :----------------------------------------------------------- |
| match[]   | No   | String | Repeated series selector argument that selects the series from which to read the label names |
| start     | No   | String | Start timestamp (unix timestamp, unit: seconds)              |
| end       | No   | String | End timestamp (Unix timestamp, unit: seconds)                |
| db        | No   | String | [database](https://docs.opengemini.org/guide/schema/database.html), prom default |
| rp        | No   | String | [retention policy](https://docs.opengemini.org/guide/schema/retention_policy.html), autogen default |

#### Example-1

Returns a list of label names

```shell
curl -i -XPOST 'http://127.0.0.1:8086/api/v1/labels'
```

#### Response-1

Status Code: 200, The request response is successful

```
{
	"status": "success",
	"data": ["__name__", "instance", "job"]
}
```

#### Example-2

Return a list of label names which match the expression  `up{instance="localhost:8086"}`

```shell
curl -i -XPOST 'http://127.0.0.1:8086/api/v1/labels?' --data-urlencode 'match[]=up{instance="localhost:8086"}'
```

#### Response-2

Status Code: 200, The request response is successful

```
{
	"status": "success",
	"data": ["__name__", "instance", "job"]
}
```

## Query Lable Values

Returns a list of label values for a provided label name

#### URL

```
GET /prometheus/{metric_store}/api/v1/label/{label_name}/values
GET /api/v1/label/{label_name}/values
```

**Query Parameters**

| Parameter | Must | Type   | Description                                                  |
| :-------- | :--- | :----- | :----------------------------------------------------------- |
| match[]   | No   | String | Repeated series selector argument that selects the series from which to read the label values |
| start     | No   | String | Start timestamp (unix timestamp, unit: seconds)              |
| end       | No   | String | End timestamp (Unix timestamp, unit: seconds)                |
| db        | No   | String | [database](https://docs.opengemini.org/guide/schema/database.html), prom default |
| rp        | No   | String | [retention policy](https://docs.opengemini.org/guide/schema/retention_policy.html), autogen default |

#### Example

Returns a list of label values for a provided label name `job` and a provided time range

```shell
curl -g 'http://127.0.0.1:8086/api/v1/label/job/values?start=1709258312&end=1709258402'
```

#### Response

Status Code: 200, The request response is successful

```json
{
	"status": "success",
	"data": ["container", "prometheus"]
}
```

## Query Series

Returns the list of time series that match a certain label set

#### URL

```
GET/POST /prometheus/{metric_store}/api/v1/series
GET/POST /api/v1/series
```

**Query Parameters**

| Parameter | Must | Type   | Description                                                  |
| :-------- | :--- | :----- | :----------------------------------------------------------- |
| match[]   | Yes  | String | Repeated series selector argument that selects the series to return. At least one `match[]` argument must be provided. |
| start     | No   | String | Start timestamp (unix timestamp, unit: seconds)              |
| end       | No   | String | End timestamp (Unix timestamp, unit: seconds)                |
| db        | No   | String | [database](https://docs.opengemini.org/guide/schema/database.html), prom default |
| rp        | No   | String | [retention policy](https://docs.opengemini.org/guide/schema/retention_policy.html), autogen default |

#### Example-1

Returns the list of time series that match the expression `match[]=up`

```shell
curl -g 'http://127.0.0.1:8086/api/v1/series?match[]=up'
```

#### Response-1

Status Code: 200, The request response is successful

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

#### Example-2

Returns the list of time series that match the expression `match[]=up{instance="localhost:7070"}`

```shell
curl -g 'http://127.0.0.1:8086/api/v1/series?' --data-urlencode 'match[]=up{instance="localhost:7070"}'
```

#### Response-2

Status Code: 200, The request response is successful

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

## Query Metric MetaData

It returns metadata about metrics currently scraped from targets. However, it does not provide any target information.

#### URL

```
GET/POST /prometheus/{metric_store}/api/v1/metadata
GET/POST /api/v1/metadata
```

**Query Parameters**

| Parameter        | Must | Type   | Description                                                  |
| :--------------- | :--- | :----- | :----------------------------------------------------------- |
| limit            | 是   | String | Maximum number of metrics to return.                         |
| limit_per_metric | 否   | String | Maximum number of metadata to return per metric.             |
| metric           | 否   | String | A metric name to filter metadata for. All metric metadata is retrieved if left empty. |
| db               | 否   | String | [database](https://docs.opengemini.org/guide/schema/database.html), prom default |
| rp               | 否   | String | [retention policy](https://docs.opengemini.org/guide/schema/retention_policy.html), autogen default |

#### Example

Returns metadata about metrics currently

```
curl -i -XPOST 'http://127.0.0.1:8086/api/v1/metadata?limit=1'
```

#### Response

there has no value with current sample data.

Status Code: 200, The request response is successful

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

## Remote Read/Write 

ref [prometheus read/write](../write_data/prometheus.md)