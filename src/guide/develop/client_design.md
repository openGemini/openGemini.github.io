---
title: Client Design
order: 2
---

# Background

Due to the InfluxDB 1.X client largely being in maintenance mode, and openGemini continuously evolving, the community has decided to develop its own client SDK for openGemini to better support it. This includes functionalities like supporting multiple server addresses and the Apache Arrow Flight protocol.

# Client SDK Planned Features

- Support for connecting to multiple server addresses
- Support for the Apache Arrow Flight protocol
- Capabilities for SQL queries, structured queries, writing, and batch writing are detailed in the UML diagram below
- Default timeouts, with a connection timeout of 10 seconds and read/write timeout of 30 seconds

The methods described in this document assume that the programming language does not support overloading. If overloading is supported by the programming language, some optimizations and adjustments can be made to the method names.

# Client constructor params design

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
        + AuthType authType // enum None, Password, Token
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

# Database & RetentionPolicy management design

```mermaid
classDiagram
    class OpenGeminiClient {
        + void CreateDatabase(String database)
        + void CreateDatabaseWithRp(String database, rpConfig RpConfig)
        + String[] ShowDatabases()
        + void DropDatabase(String database)
        + void CreateRetentionPolicy(database string, rpConfig RpConfig, isDefault bool)
        + RetentionPolicy[] ShowRetentionPolicies(database string)
        + void DropRetentionPolicy(database, retentionPolicy string)
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

# Query design

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

# Ping design

```mermaid
classDiagram
    class OpenGeminiClient {
        + Pong ping(int index) // index selects one from multiple servers
    }
    class Pong {
        + String version
    }
```

# Inner Http client design

Using a design similar to InnerHttpClient, encapsulate authentication, load balancing, retry logic, and more within the internal structure, providing a simple interface to the client. This enhances modularity and code clarity.

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

# Error handling

## Error message

### Scene1 http request failed

```
$operation request failed, error: $error_details
```

### Scene2 http response code is not 200~300

```
$operation error resp, code: $code, body: $body
```

### Scene3 other error

```
$operation failed, error: $error_details
# example:
writePoint failed, unmarshall response body error: json: cannot unmarshal number ...
```
