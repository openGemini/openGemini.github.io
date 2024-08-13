---
title: Client Design
order: 2
---

# 背景

由于Influxdb 1.X的客户端已经基本处于维护状态，同时openGemini仍在不断发展中，为了能够更好地支持openGemini，如支持对接多个服务端地址、支持对接Apache
Arrow Flight协议等，社区决定开发属于openGemini自己的客户端SDK。

# 客户端SDK规划功能

- 支持对接多个服务端地址
- 支持对接Apache Arrow Flight协议
- 支持Sql查询、结构化查询、写入、批量写入等，详见下文UML图
- 默认超时，连接超时10秒，读写超时30秒

本文的方法假定编程语言不支持重载，如编程语言支持重载，可以对方法名进行一些优化调整。

# 客户端构造参数设计

```mermaid
classDiagram
    class OpenGeminiClient {
        + List~Address~ addresses
        + AuthConfig authConfig // nullable, if null, means no auth
        + BatchConfig batchConfig // nullable, if null, means batch is disabled
        + timeout
        + connectTimeout
        + bool gzipEnabled
        + bool tlsEnabled
        + TlsConfig tlsConfig // language specific
        + void close()
    }

    class Address {
        + String host
        + int Port // in rust, it is u16
    }

    class AuthConfig {
        + AuthType authType // enum Password, Token. The server currently does not support the Token type, and the SDK implementation for Token is incomplete.
        + String username
        + String password
        + String token
    }

    class BatchConfig {
        + Duration batchInterval // must be greater than 0
        + int batchSize // must be greater than 0
    }

    OpenGeminiClient "1" *-- "many" Address: contains
    OpenGeminiClient *-- AuthConfig: contains
    OpenGeminiClient *-- BatchConfig: contains
```

# Database & RetentionPolicy管理设计

```mermaid
classDiagram
    class OpenGeminiClient {
        + void CreateDatabase(String database)
        + void CreateDatabaseWithRp(String database, rpConfig RpConfig)
        + String[] ShowDatabases()
        + void DropDatabase(String database)
        + void CreateRetentionPolicy(String database, RpConfig rpConfig, bool isDefault)
        + RetentionPolicy[] ShowRetentionPolicies(String database)
        + void DropRetentionPolicy(String database, String retentionPolicy)
        + RetentionPolicy[] ShowRetentionPolicies(String database)
        + String[] ShowMeasurements(String database, String retentionPolicy)
        + void DropMeasurement(String database, String retentionPolicy, String measurement)
    }
    class RpConfig {
        + String Name
        + String Duration
        + String ShardGroupDuration
        + String IndexDuration
    }
```

# Write point design

```mermaid
classDiagram
    class OpenGeminiClient {
        + WritePoint(String database, Point point)
        + WritePointWithRp(String database, String rp, Point point)
        + WriteBatchPoints(String database, BatchPoints batchPoints)
        + WriteBatchPointsWithRp(String database, String rp, BatchPoints batchPoints)
    }
    class BatchPoints {
        + List~Point~ points
        + AddPoint(Point)
    }

    class Point {
        + String measurement
        + Precision precision // enum, second, millisecond, microsecond, nanosecond, default is nanosecond
        + Time time // language specific
        + Map~String, String~ tags
        + Map~String, Object~ fields
        + AddTag(string, string) // init container if null
        + AddField(string, int) // init container if null
        + AddField(string, string) // init container if null
        + AddField(string, float) // init container if null
        + AddField(string, bool) // init container if null
        + SetTime(timestamp)
        + SetPrecision(type)
        + SetMeasurement(name)
    }

    BatchPoints "1" *-- "many" Point: contains
```

# 查询设计

```mermaid
classDiagram
    class Query {
        + String database
        + String retentionPolicy
        + String command
    }
```

```mermaid
classDiagram
    class QueryResult {
        + List~SeriesResult~ results
        + String error
    }
    class SeriesResult {
        + List~Series~ series // Series is an uncountable noun.
        + String error
    }
    class Series {
        + String name
        + Map~String, String~ tags
        + List~String~ columns
        + List~List~ values
    }
    QueryResult "1" *-- "0..*" SeriesResult: contains
    SeriesResult "1" *-- "0..*" Series: contains
```

# Ping设计

```mermaid
classDiagram
    class OpenGeminiClient {
        + Pong ping(int index) // index selects one from multiple servers
    }
    class Pong {
        + String version
    }
```

# Inner Http client 设计

使用类似InnerHttpClient的设计，将鉴权、负载均衡、重试等逻辑封装在内部，对client提供简单的接口。增强模块化和代码清晰度。

```mermaid
classDiagram
    class InnerHttpClient {
        + void executeHttpGetByIdx(int idx, ...) // specify server index
        + void executeHttpRequestByIdx(int idx, String method, ...) // specify server index
        + void executeHttpGet(String method, ...) // load balance
        + void executeHttpRequest(String method, ...) // load balance
        - void executeHttpRequestInner(String url, String method, ...) // inner method
    }
```

```mermaid
graph TD
    executeHttpGetByIdx --> executeHttpRequestByIdx
    executeHttpRequestByIdx --> executeHttpRequestInner
    executeHttpGet --> executeHttpRequest
    executeHttpRequest --> executeHttpRequestInner
```

# 错误处理

## 错误信息

### 场景1 http请求失败

```
$operation request failed, error: $error_details
```

### 场景2 http响应码不符合预期

```
$operation error resp, code: $code, body: $body
```

### 场景3 其他异常

```
$operation failed, error: $error_details
# example:
writePoint failed, unmarshall response body error: json: cannot unmarshal number ...
```
