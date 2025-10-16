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
        + enum contentType // json, csv, msgpack
        + enum compressMethod // gzip, zstd, br
        + TlsConfig tlsConfig // nullable, language specific
        + void close()
        + GrpcConfig grpcConfig // if null, call WriteByGrpc will nothing to do, otherwise send write request by gRPC
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

    class GrpcConfig {
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

# Database & RetentionPolicy管理设计

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

# 写入点位设计

```mermaid
classDiagram
    class OpenGeminiClient {
        + WritePoint(String database, Point point)
        + WritePointWithRp(String database, String rp, Point point)
        + WriteBatchPoints(String database, BatchPoints batchPoints)
        + WriteBatchPointsWithRp(String database, String rp, BatchPoints batchPoints)
        + WriteByGrpc(req WriteRequest) // WriteRequest build from RecordBuilder
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

# Execute 接口设计

Execute 接口提供了一个统一的 SQL 执行接口，可以自动将不同类型的语句路由到相应的底层方法。该设计支持类 SQL 语句，包括 INSERT、SELECT、CREATE、DROP 和其他数据库操作，并提供参数支持和类型安全。

```mermaid
classDiagram
    class OpenGeminiClient {
        + ExecuteResult Execute(Statement statement)
        + ExecuteResult ExecuteContext(Context ctx, Statement statement)
    }
    
    class Statement {
        + String database
        + String command
        + Map~String, Object~ params
        + String retentionPolicy
    }
    
    class ExecuteResult {
        + QueryResult queryResult
        + int64 affectedRows
        + StatementType statementType
        + Error error
    }
    
    class StatementType {
        <<enum>>
        StatementTypeUnknown
        StatementTypeQuery    // SELECT, SHOW, EXPLAIN → 路由到 Query()
        StatementTypeCommand  // CREATE, DROP, ALTER → 路由到 Query()
        StatementTypeInsert   // INSERT → 路由到 Write 方法
        + String() String
        + IsQueryLike() bool
        + IsWriteLike() bool
    }
    
    OpenGeminiClient --> Statement : 使用
    OpenGeminiClient --> ExecuteResult : 返回
    ExecuteResult --> StatementType : 包含
    ExecuteResult --> QueryResult : 包含
```

## 语句路由逻辑

```mermaid
flowchart TD
    A[执行语句] --> B{解析语句类型}
    B -->|SELECT, SHOW, EXPLAIN, DESCRIBE, WITH| C[StatementTypeQuery]
    B -->|CREATE, DROP, ALTER, UPDATE, DELETE| D[StatementTypeCommand]  
    B -->|INSERT| E[StatementTypeInsert]
    B -->|其他| F[StatementTypeUnknown]
    
    C --> G[路由到 Query 方法]
    D --> G[路由到 Query 方法]
    E --> H[路由到 Write 方法]
    F --> I[返回错误]
    
    G --> J[返回 QueryResult + AffectedRows=0/1]
    H --> K[返回 AffectedRows=数据点数量]
    I --> L[返回错误结果]
```

## 参数支持

Execute 接口支持参数化语句并自动进行类型转换：

```mermaid
classDiagram
    class ParameterTypes {
        <<enum>>
        String    // "value" → value  
        Integer   // 42 → 42i
        UInteger  // 42 → 42u  
        Float     // 3.14 → 3.14
        Boolean   // true → true
    }
    
    class ParameterProcessor {
        + replaceParams(command String, params Map) String
        + convertParamValue(value Object) String
        + validateParams(command String, params Map) Error
    }
    
    Statement --> ParameterProcessor : 使用
    ParameterProcessor --> ParameterTypes : 转换
```

## 使用示例

### 基本用法
```go
result, err := client.Execute(opengemini.Statement{
    Database: "mydb",
    Command:  "SELECT * FROM weather LIMIT 10",
})
```

### 参数化查询
```go
result, err := client.Execute(opengemini.Statement{
    Database: "mydb", 
    Command:  "SELECT * FROM weather WHERE location=$loc AND temp>$temp",
    Params: map[string]any{
        "loc":  "beijing",
        "temp": 25.0,
    },
})
```

### 参数化插入
```go
result, err := client.Execute(opengemini.Statement{
    Database: "mydb",
    Command:  "INSERT weather,location=$location temperature=$temp,humidity=$hum",
    Params: map[string]any{
        "location": "shanghai", 
        "temp":     30.2,
        "hum":      70,
    },
})
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

# OpenTelemetry 集成设计
为增强 OpenGemini 客户端的可观测性，便于追踪与查询、写入操作相关的性能指标、错误及其他信息，本方案采用拦截器模式集成 OpenTelemetry，实现全链路追踪。该设计支持非侵入式扩展，允许与其他拦截器（如日志、认证拦截器）共存，同时最大限度减少对原有客户端的修改。
## 拦截器设计
拦截器模式定义了标准化接口，用于挂钩客户端操作（查询/写入）并注入遥测逻辑。

```mermaid
Interceptor interface {
	Query(ctx context.Context, query *InterceptorQuery) InterceptorClosure
	Write(ctx context.Context, write *InterceptorWrite) InterceptorClosure
}
```

## 定义基础客户端类，关联拦截器接口
基础 Client 类管理一组拦截器，允许在客户端操作期间动态注册和执行拦截器逻辑。

```mermaid
class Client {
- []Interceptor interceptors
}
```

## 定义集成 OpenTelemetry 的拦截器实现类，实现 Interceptor 接口
OtelClient 类实现 Interceptor 接口，嵌入 OpenTelemetry 逻辑以捕获客户端操作的跟踪、指标和日志。

```mermaid
class OtelClient {
    Interceptor
}
```

## 追踪系统核心模块

```mermaid
    class TraceContext {
        + traceId: String
        + parentTraceId: String
        + operationName: String
        + timestamp: Long
        + attributes: Map~String, Object~
        + createChildContext() : TraceContext
        + addAttribute(key, value) : void
        + getAttribute(key) : Object
    }

    class ContextManager {
        + getCurrentContext() : TraceContext
        + bindContext(context, task) : void
        + unbindContext() : TraceContext
    }

    class OperationInterceptor {
        <<Interface>>
        + preProcess(operationContext) : void
        + postProcess(operationContext, result) : void
        + errorProcess(operationContext, exception) : void
    }

    class QueryInterceptor {
        + preProcess(operationContext) : void
        + postProcess(operationContext, queryResult) : void
        + errorProcess(operationContext, exception) : void
    }

    class WriteInterceptor {
        + preProcess(operationContext) : void
        + postProcess(operationContext, writeResult) : void
        + errorProcess(operationContext, exception) : void
    }

    class InterceptorChain {
        + interceptors: List~OperationInterceptor~
        + addInterceptor(interceptor) : void
        + executePreFlow(operationContext) : void
        + executePostFlow(operationContext, result) : void
        + executeErrorFlow(operationContext, exception) : void
    }

    class OperationContext {
        + traceContext: TraceContext
        + operationType: Enum~Query/Write~
        + operationParams: Map~String, Object~
        + getTraceContext() : TraceContext
        + setOperationResult(result) : void
    }

    class SDKConfigurator {
        + configureExporter(exporter) : SDKConfigurator
        + configurePropagator(propagator) : SDKConfigurator
        + configureTracerProvider(provider) : SDKConfigurator
        + initialize() : OpenTelemetrySDK
    }

    class TraceExporter {
        <<Interface>>
        + exportTraceData(traceDataList) : void
    }

    class ContextPropagator {
        <<Interface>>
        + inject(traceContext, carrier) : void
        + extract(carrier) : TraceContext
    }

    class TracerProvider {
        + getTracer(name) : Tracer
    }

    class Tracer {
        + createTraceContext(operationName) : TraceContext
        + endTraceContext(traceContext) : void
    }

    class OpenTelemetrySDK {
        + getTracerProvider() : TracerProvider
        + getContextPropagator() : ContextPropagator
        + getTraceExporter() : TraceExporter
    }

    QueryInterceptor ..|> OperationInterceptor
    WriteInterceptor ..|> OperationInterceptor
    InterceptorChain o-- OperationInterceptor : contains
    OperationContext o-- TraceContext : holds
    ContextManager o-- TraceContext : manages

    SDKConfigurator ..> TraceExporter : configures
    SDKConfigurator ..> ContextPropagator : configures
    SDKConfigurator ..> TracerProvider : configures
    SDKConfigurator ..> OpenTelemetrySDK : initializes
    OpenTelemetrySDK o-- TracerProvider : contains
    OpenTelemetrySDK o-- ContextPropagator : contains
    OpenTelemetrySDK o-- TraceExporter : contains
    TracerProvider o-- Tracer : provides
    Tracer ..> TraceContext : creates/ends

    InterceptorChain ..> OperationContext : processes
    Tracer ..> ContextManager : binds context
```

## 使用示例(Go language examples)

```mermaid
func main() {
    var ctx = context.Background()
    shutdown, err := setupOtelSDK(ctx)
    if err != nil {
        return
    }
    defer func() {
        err = errors.Join(err, shutdown(ctx))
    }()

    config := &opengemini.Config{
        Addresses: []opengemini.Address{{
            Host: "127.0.0.1",
            Port: 8086,
        }},
    }
    client, err := opengemini.NewClient(config)
    if err != nil {
        fmt.Println(err)
        return
    }

    client.Interceptors(opengemini.NewOtelInterceptor())

    err = client.CreateDatabase("db0")
    if err != nil {
    }
}
```

# 查询构造器设计

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

# Ping 设计

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
