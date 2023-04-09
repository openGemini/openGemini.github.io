---
title: openGemini配置项
order: 1
---


# openGemini配置项

openGemini 配置项解释

## [common]

**common**是ts-sql、ts-store、ts-meta公共的配置项。

### meta-join <Badge text="必填" type="danger" />

- 类型: `[]string`
- 默认值: `无`

- SQL / STOR和META的RPC通信地址。

### ha-enable

- 类型: `bool`
- 默认值: `false`

- 基于共享存储的HA开关，目前仅支持共享存储可设置为true。
- 生产环境不建议开启。

### executor-memory-size-limit

- 类型: `string | toml.Size`
- 默认值: `0`

- 执行内存大小限制，比如 `256GB`，`0`表示不限制。

### executor-memory-wait-time

- 类型: `string | toml.Duration`
- 默认值: `0s`

- 执行内存等待时间，比如 `120s`，`0s`表示不限制。

### pprof-enabled

- 类型: `bool`
- 默认值: `false`

- 是否开启go pprof服务，监控内存、CPU、goroutine等信息。

### cpu-num <Badge text="建议" type="tip" />

- 类型: `int`
- 默认值: `0`

- 可使用的cpu核心数，`0`表示自动获取，docker环境中建议手动设置。

### memory-size

- 类型: `string | toml.Size`
- 默认值: `0`

- 可使用的内存大小，比如：`256GB`，`0`表示不限制。

### ignore-empty-tag

- 类型: ` bool`
- 默认值: `false`

- 是否忽略空tag。

### report-enable

- 类型: ` bool`
- 默认值: `true`

- 是否上报遥测数据到openGemini服务器。

### enable-tag-array

- 类型: ` bool`
- 默认值: `false`

- 写入是否支持tag数组。

## [meta]

**meta**是ts-meta专属配置。

### bind-address <Badge text="必填" type="danger" />

- 类型: `string`
- 默认值: `无`

- meta提供服务的地址，比如：`127.0.0.1:8088`。

### http-bind-address <Badge text="必填" type="danger" />

- 类型: `string`
- 默认值: `无`

- meta提供HTTP服务的地址，比如：`127.0.0.1:8091`。可外部访问。

### rpc-bind-address <Badge text="必填" type="danger" />

- 类型: `string`
- 默认值: `无`

- meta提供RPC服务的地址，比如：`127.0.0.1:8092`。仅内部通信使用。

### dir <Badge text="必填" type="danger" />

- 类型: `string`
- 默认值: `无`

- meta数据保存目录。

### expand-shards-enable

- 类型: `bool`
- 默认值: `false`

- 是否扩大shards。

  ### retention-autocreate

- 类型: `bool`
- 默认值: `true`

- 是否自动创建retention policy。

  ### election-timeout

- 类型: `string | toml.Duration`

- 默认值: `1s`
- 选主超时时间。

### heartbeat-timeout

- 类型: `string | toml.Duration`
- 默认值: `1s`
- 心跳超时时间。

### leader-lease-timeout

- 类型: `string | toml.Duration`
- 默认值: 60s`
- leader租赁超时时间。

### commit-timeout

- 类型: `string | toml.Duration`
- 默认值: `50ms`
- 事件提交超时时间。

### cluster-tracing

- 类型: ` bool`
- 默认值: `true`

- 是否记录trace日志。

### logging-enabled

- deprecated

### lease-duration

- 类型: `string | toml.Duration`
- 默认值: `1m`
- 租赁期限。

### meta-version

- 类型: `int`
- 默认值: `2`
- meta版本。

### split-row-threshold

- 类型: `int`
- 默认值: `10000`
- row最大行数分裂阈值。

### imbalance-factor = 0.3

- 类型: `float`
- 默认值: `0.3`
- 不平衡因子。

### auth-enabled

- 类型: ` bool`
- 默认值: `false`

- 是否开启鉴权。

### https-enabled

- 类型: ` bool`
- 默认值: `false`

- 是否开启HTTPS。

### https-certificate

- 类型: ` string`
- 默认值: ``

- 开启HTTPS后，证书路径。

### https-private-key

- 类型: ` string`
- 默认值: ``

- 开启HTTPS后，私钥路径。

### ptnum-pernode

- 类型: ` int`
- 默认值: `1`

- 每个store节点的PT的数量。 

## [coordinator]

ts-sql的配置，用于和ts-store通信相关。

### write-timeout

- 类型: `string | toml.Duration`
- 默认值: `120s`
- 数据写入超时时间。

### shard-writer-timeout

- 类型: `string | toml.Duration`
- 默认值: `30s`
- 数据写入shard内超时时间。

### shard-mapper-timeout = "10s"




### max-remote-write-connections = 100

### max-remote-read-connections = 100

### shard-tier = "warm"

### rp-limit = 100

### force-broadcast-query = false

### time-range-limit = ["72h", "24h"]


## [http]

### bind-address = "{{addr}}:8086"

  ### auth-enabled = false
  ### weakpwd-path = "/tmp/openGemini/weakpasswd.properties"
  ### pprof-enabled = false
  ### max-connection-limit = 0
  ### max-concurrent-write-limit = 0
  ### max-enqueued-write-limit = 0
  ### enqueued-write-timeout = "30s"
  ### max-concurrent-query-limit = 0
  ### max-enqueued-query-limit = 0
  ### enqueued-query-timeout = "5m"
  ### chunk-reader-parallel = 0
  ### max-body-size = 0
  ### https-enabled = false
  ### https-certificate = ""
  ### https-private-key = ""

## [data]

### store-ingest-addr = "{{addr}}:8400"

### store-select-addr = "{{addr}}:8401"

### store-data-dir = "/tmp/openGemini/data"

### store-wal-dir = "/tmp/openGemini/data"

### store-meta-dir = "/tmp/openGemini/data/meta/{{id}}"

  ### wal-enabled = true
  ### wal-sync-interval = "100ms"
  ### wal-replay-parallel = false
  ### wal-replay-async = false
  ### imm-table-max-memory-percentage = 10
  ### write-cold-duration = "5s"
  ### shard-mutable-size-limit = "60m"
  ### node-mutable-size-limit = "200m"
  ### max-write-hang-time = "15s"
  ### max-concurrent-compactions = 4
  ### compact-full-write-cold-duration = "1h"
  ### max-full-compactions = 1
  ### compact-throughput = "80m"
  ### compact-throughput-burst = "90m"
  ### compact-recovery = false
  ### snapshot-throughput = "64m"
  ### snapshot-throughput-burst = "70m"
### cache-table-data-block = false

### cache-table-meta-block = false

  ### enable-mmap-read = false
### read-cache-limit = 0

  ### write-concurrent-limit = 0
  ### open-shard-limit = 0
  ### readonly = false
  ### downsample-write-drop = true
  ### max-wait-resource-time = "0s"
  ### max-series-parallelism-num = 0
  ### max-shards-parallelism-num = 0
  ### chunk-reader-threshold = 0
  ### min-chunk-reader-concurrency = 0
  ### min-shards-concurrency = 0
  ### max-downsample-task-concurrency = 0

## [data.ops-monitor]
  ### store-http-addr = "{{addr}}:8402"
  ### auth-enabled = false
  ### store-https-enabled = false
  ### store-https-certificate = ""

## [retention]
  ### enabled = true
  ### check-interval = "30m"

## [downsample]
  ### enable = true
  ### check-interval = "30m"

## [logging]

  ### format = "auto"
  ### level = "info"
### path = "/tmp/openGemini/logs/{{id}}"

  ### max-size = "64m"
  ### max-num = 16
  ### max-age = 7
  ### compress-enabled = true

## [tls]
  ### min-version = "TLS1.2"
  ### ciphers = [
     "TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256",
     "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384",
     "TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256",
     "TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384",
   ]

## [monitor]
  ### pushers = ""
  ### store-enabled = false
  ### store-database = "_internal"
  ### store-interval = "10s"
  ### store-path = "metric/{{id}}/metric.data"
  ### compress = false
  ### http-endpoint = "127.0.0.1:8086"
  ### username = ""
  ### password = ""

## [gossip]

  ### enabled = true
  ### log-enabled = true
### bind-address = "{{addr}}"

### store-bind-port = 8011

### meta-bind-port = 8010

  ### prob-interval = '1s'
  ### suspicion-mult = 4
### members = ["{{meta_addr_1}}:8010", "{{meta_addr_2}}:8010", "{{meta_addr_3}}:8010"]

## [spdy]
  ### recv-window-size = 8
  ### concurrent-accept-session = 4096
  ### open-session-timeout = "5m"
  ### session-select-timeout = "5m"
  ### data-ack-timeout = "10s"
  ### tcp-dial-timeout = "5s"
  ### tls-enable = false
  ### tls-insecure-skip-verify = false
  ### tls-client-auth = false
  ### tls-certificate = ""
  ### tls-private-key = ""
  ### tls-server-name = ""
  ### conn-pool-size = 4
  ### tls-client-certificate = ""
  ### tls-client-private-key = ""
  ### tls-ca-root = ""

## [castor]
  ### enabled = false
  ### pyworker-addr = ["127.0.0.1:6666"]  # format: ip:port
  ### connect-pool-size = 30  # connection pool to pyworker
  ### result-wait-timeout = 10  # unit: second
## [castor.detect]
  ### algorithm = ['BatchDIFFERENTIATEAD','DIFFERENTIATEAD','IncrementalAD','ThresholdAD','ValueChangeAD']
  ### config_filename = ['detect_base']
## [castor.fit_detect]
  ### algorithm = ['BatchDIFFERENTIATEAD','DIFFERENTIATEAD','IncrementalAD','ThresholdAD','ValueChangeAD']
  ### config_filename = ['detect_base']

## [sherlock]
  ### sherlock-enable = false
  ### collect-interval = "10s"
  ### cpu-max-limit = 95
  ### dump-path = "/tmp"
## [sherlock.cpu]
  ### enable = false
  ### min = 30
  ### diff = 25
  ### abs = 70
  ### cool-down = "10m"
## [sherlock.memory]
  ### enable = false
  ### min = 25
  ### diff = 25
  ### abs = 80
  ### cool-down = "10m"
## [sherlock.goroutine]
  ### enable = false
  ### min = 10000
  ### diff = 20
  ### abs = 20000
  ### max = 100000
  ### cool-down = "30m"
