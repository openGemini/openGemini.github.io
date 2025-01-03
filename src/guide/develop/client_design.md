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
        + enum contentType // json, csv, msgpack
        + enum compressMethod // gzip, zstd, br
        + TlsConfig tlsConfig // nullable, language specific
        + void close()
        + GRPCConfig grpcConfig // if null, call WriteByGRPC will nothing to do, otherwise send write request by gRPC
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
        + int batchSize // must be greater than 0, if set too large, may cause client overflow or server-side rejected the request.
    }
    
    class GRPCConfig {
        + List~Address~ addresses
        + AuthConfig authConfig
        + BatchConfig batchConfig
        + enum compressMethod // gzip, zstd, br
        + TlsConfig tlsConfig
        + timeout
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
        + void CreateRetentionPolicy(String database, RpConfig rpConfig, bool isDefault)
        + void UpdateRetentionPolicy(String database, RpConfig rpConfig, bool isDefault)
        + RetentionPolicy[] ShowRetentionPolicies(String database)
        + void DropRetentionPolicy(String database, String retentionPolicy)
        + void CreateMeasurement(CreateMeasurementBuilder builder)
        + String[] ShowMeasurements(ShowMeasurementBuilder builder)
        + void DropMeasurement(String database, String retentionPolicy, String measurement)
        + Map[String]String[] ShowTagKeys(ShowTagKeysBuilder builder)
        + String[] ShowTagValues(ShowTagValuesBuilder builder)
        + Map[String]Map[String]String ShowFieldKeys(String database, Option<String> measurement)
        + String[] ShowSeries(ShowSeriesBuilder builder)
    }
    class RpConfig {
        + String Name // non-null
        + String Duration // non-null
        + String ShardGroupDuration // nullable
        + String IndexDuration // nullable
    }
    class CreateMeasurementBuilder {
        + CreateMeasurementBuilder Tags(String[] tags)
        + CreateMeasurementBuilder FieldMap(map[String]FieldType fields)
        + CreateMeasurementBuilder ShardType(ShardType shardType)
        + CreateMeasurementBuilder ShardKeys(String[] shardKeys)
        + CreateMeasurementBuilder FullTextIndex()
        + CreateMeasurementBuilder IndexList(String[] indexes)
        + CreateMeasurementBuilder EngineType(EngineType engineType)
        + CreateMeasurementBuilder PrimaryKey(String[] primaryKeys)
        + CreateMeasurementBuilder SortKeys(String[] sortKeys)
        + String build()
    }
    class ShowMeasurementBuilder {
        + ShowMeasurementBuilder Filter(ComparisonOperator operator, String regex)
        + String build()
    }
    class FieldType {
        <<enum>>
        Bool  // BOOL
        Int64  // INT64
        Float64 // FLOAT64
        String // STRING
    }
    class ShardType {
        <<enum>>
        Hash // HASH
        Range // RANGE
    }
    class EngineType {
        <<enum>>
        ColumnStore // columnstore
    }
    class ShowTagKeysBuilder {
        ShowTagKeysBuilder Database(String database)
        ShowTagKeysBuilder Measurement(String measurement)
        ShowTagKeysBuilder RetentionPolicy(String rp)
        ShowTagKeysBuilder Limit(int limit)
        ShowTagKeysBuilder Offset(int offset)
    }
    class ShowTagValuesBuilder {
        ShowTagValuesBuilder Database(String database)
        ShowTagValuesBuilder Measurement(String measurement)
        ShowTagValuesBuilder RetentionPolicy(String rp)
        ShowTagValuesBuilder Limit(int limit)
        ShowTagValuesBuilder Offset(int offset)
        ShowTagValuesBuilder With(String[] keys)
        ShowTagValuesBuilder Where(String key, ComparisonOperator operator, String value)
    }
    class ShowSeriesBuilder {
        ShowSeriesBuilder Database(String database)
        ShowSeriesBuilder Measurement(String measurement)
        ShowSeriesBuilder RetentionPolicy(String rp)
        ShowSeriesBuilder Limit(int limit)
        ShowSeriesBuilder Offset(int offset)
        ShowTagValuesBuilder Where(String key, ComparisonOperator operator, String value)
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
        + WriteByGRPC(req WriteRequest) // WriteRequest build from RecordBuilder
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
    
    class RecordBuilder {   // new from NewRecordBuilder with database and retention policy params
        + RecordBuilder Authenticate(String username, String password)
        + RecordBuilder AddRecord(RecordLine line) // RecordLine build from RecordLineBuilder
        + WriteRequest Build()
    }
    
    class RecordLineBuilder {   // new from NewRecordLineBuilder with measurement param
        + RecordLineBuilder AddTag(String key, String value)
        + RecordLineBuilder AddTags(map[String]String)
        + RecordLineBuilder AddField(String key, Any value)
        + RecordLineBuilder AddFields(map[String]Any)
        + RecordLine Build(Time time)
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
        + TimeFormat timeFormat
        + Precision precision
    }
    class Precision {
        <<enum>>
        PRECISIONMICROSECOND("u")
        PRECISIONNANOSECOND("ns")
        PRECISIONMILLISECOND("ms")
        PRECISIONSECOND("s")
        PRECISIONMINUTE("m")
        PRECISIONHOUR("h")
    }
    class TimeFormat {
        <<enum>>
        RFC3339("rfc3339")
        TIMESTAMP("timestamp")
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

# QueryBuilder design

```mermaid
classDiagram
    class QueryBuilder {
        + static Create() QueryBuilder
        + Select(Expression[] selectExprs) QueryBuilder
        + From(String[] from) QueryBuilder
        + Where(Condition where) QueryBuilder
        + GroupBy(Expression[] groupByExpressions) QueryBuilder
        + OrderBy(order: SortOrder) QueryBuilder
        + Limit(limit: int64) QueryBuilder
        + Offset(offset: int64) QueryBuilder
        + Timezone(timezone: *time.Location) QueryBuilder
        + Build() Query
    }

    class Expression {
        <<interface>>
    }

    class ConstantExpression {
        - Object value
    }

    class StarExpression {
    }

    class FunctionExpression {
        - FunctionEnum function
        - Expression[] arguments
    }
    
    class AsExpression {
        - String alias
        - Expression expression
    }

    class ArithmeticExpression {
        - Expression Left
        - Expression Right
        - Operator   ArithmeticOperator
    }

    class Condition {
        <<interface>>
    }

    class ComparisonCondition {
        - String column
        - ComparisonOperator operator
        - Object value
    }

    class CompositeCondition {
        - LogicalOperator logicalOperator
        - Condition[] conditions
    }

    class SortOrder {
        <<enum>>
        Asc
        Desc
    }

    class ComparisonOperator {
        <<enum>>
        Equals
        NotEquals
        GreaterThan
        LessThan
        GreaterThanOrEquals
        LessThanOrEquals
    }

    class LogicalOperator {
        <<enum>>
        And
        Or
    }

    class FunctionEnum {
        <<enum>>
        Mean
        Count
        Sum
        Min
        Max
        Time
    }

    Expression <|-- FieldExpression
    Expression <|-- StarExpression
    Expression <|-- ConstantExpression
    Expression <|-- FunctionExpression
    Expression <|-- AsExpression
    Expression <|-- ArithmeticExpression
    FunctionExpression --> FunctionEnum
    Condition <|-- ComparisonCondition
    Condition <|-- CompositeCondition
    ComparisonCondition --> ComparisonOperator
    CompositeCondition --> LogicalOperator
    QueryBuilder --> Expression
    QueryBuilder --> Condition
    QueryBuilder --> SortOrder
    QueryBuilder --> Query
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
