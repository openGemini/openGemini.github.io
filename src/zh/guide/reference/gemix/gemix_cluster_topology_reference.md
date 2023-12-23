---
title: openGemini集群拓扑文件配置
order: 4
---

# openGemini集群拓扑文件配置

通过 gemix 部署或扩容 openGemini 集群时，需要提供一份拓扑文件（[示例](https://github.com/openGemini/gemix/blob/master/embed/examples/cluster/topology.example.yaml)）来描述集群拓扑。

同样，修改集群配置也是通过编辑拓扑文件来实现的，区别在于修改配置时仅允许修改部分字段。本文档介绍拓扑文件的各个区块以各区块中的各字段。

## 文件结构

一个通过 gemix 部署的 openGemini 集群拓扑文件可能包含以下区块：

- [global](/gemix/gemix-cluster-topology-reference.md#global)：集群全局配置，其中一些是集群的默认值，可以在实例里面单独配置
- [monitored](/gemix/gemix-cluster-topology-reference.md#monitored)：监控服务配置，即 ts-monitor，每台机器上都会部署一个 ts-monitor
- [server_configs](/gemix/gemix-cluster-topology-reference.md#server_configs)：组件全局配置，可单独针对每个组件配置，若在实例中存在同名配置项，那么以实例中配置的为准
- [ts_meta_servers](/gemix/gemix-cluster-topology-reference.md#ts_meta_servers)：ts-meta 实例的配置，用来指定 ts-meta 组件部署到哪些机器上
- [ts_sql_servers](/gemix/gemix-cluster-topology-reference.md#ts_sql_servers)：openGemini 实例的配置，用来指定 openGemini 组件部署到哪些机器上
- [ts_store_servers](/gemix/gemix-cluster-topology-reference.md#ts_store_servers)：ts-store 实例的配置，用来指定 ts-store 组件部署到哪些机器上
- [grafana_servers](/gemix/gemix-cluster-topology-reference.md#grafana_servers)：Grafana 实例的配置，用来指定 Grafana 部署在哪台机器上

### global

`global` 区块为集群的全局配置，包含以下字段：

- `user`：以什么用户来启动部署的集群，默认值："openGemini"，如果 `<user>` 字段指定的用户在目标机器上不存在，会自动尝试创建
- `group`：自动创建用户时指定用户所属的用户组，默认和 `<user>` 字段值相同，若指定的组不存在，则自动创建
- `ssh_port`：指定连接目标机器进行操作的时候使用的 SSH 端口，默认值：22
- `enable_tls`：是否对集群启用 TLS。启用之后，组件之间、客户端与组件之间都必须使用生成的 TLS 证书进行连接，默认值：false
- `listen_host`：默认使用的监听 IP。如果为空，每个实例会根据其 `host` 字段是否包含 `:` 来自动设置为 `::` 或 `0.0.0.0`。gemix-cluster v1.14.0 引入该配置
- `deploy_dir`：每个组件的部署目录，默认值："deploy"。其应用规则如下：
    - 如果在实例级别配置了绝对路径的 `deploy_dir`，那么实际部署目录为该实例设定的 `deploy_dir`
    - 对于每个实例，如果用户未配置 `deploy_dir`，其默认值为相对路径 `<component-name>-<component-port>`
    - 如果 `global.deploy_dir` 为绝对路径，那么组件会部署到 `<global.deploy_dir>/<instance.deploy_dir>` 目录
    - 如果 `global.deploy_dir` 为相对路径，那么组件会部署到 `/home/<global.user>/<global.deploy_dir>/<instance.deploy_dir>` 目录
- `data_dir`：数据目录，默认值："data"。其应用规则如下：
    - 如果在实例级别配置了绝对路径的 `data_dir`，那么实际数据目录为该实例设定的 `data_dir`
    - 对于每个实例，如果用户未配置 `data_dir`，其默认值为 `<global.data_dir>`
    - 如果 `data_dir` 为相对路径，那么组件数据将放到 `<deploy_dir>/<data_dir>` 中，其中 `<deploy_dir>` 的计算规则请参考 `deploy_dir` 字段的应用规则
- `log_dir`：日志目录，默认值："log"。其应用规则如下：
    - 如果在实例级别配置了绝对路径的 `log_dir`，那么实际日志目录为该实例设定的 `log_dir`
    - 对于每个实例，如果用户未配置 `log_dir`，其默认值为 `<global.log_dir>`
    - 如果 `log_dir` 为相对路径，那么组件日志将放到 `<deploy_dir>/<log_dir>` 中，其中 `<deploy_dir>` 的计算规则请参考 `deploy_dir` 字段的应用规则
- `os`：目标机器的操作系统，该字段决定了向目标机器推送适配哪个操作系统的组件，默认值：linux
- `arch`：目标机器的 CPU 架构，该字段决定了向目标机器推送哪个平台的二进制包，支持 amd64 和 arm64，默认值：amd64
- `resource_control`：运行时资源控制，该字段下所有配置都将写入 systemd 的 service 文件中，默认无限制。支持控制的资源如下：
    - `memory_limit`: 限制运行时最大内存，例如 "2G" 表示最多使用 2GB 内存
    - `cpu_quota`：限制运行时最大 CPU 占用率，例如 "200%"
    - `io_read_bandwidth_max`：读磁盘 I/O 的最大带宽，例如："/dev/disk/by-path/pci-0000:00:1f.2-scsi-0:0:0:0 100M"
    - `io_write_bandwidth_max`：写磁盘 I/O 的最大带宽，例如："/dev/disk/by-path/pci-0000:00:1f.2-scsi-0:0:0:0 100M"
    - `limit_core`：控制 core dump 的大小

`global` 配置示例：

```yaml
global:
  user: "gemini"
  resource_control:
    memory_limit: "2G"
```

上述配置指定使用 `openGemini` 用户启动集群，同时限制每个组件运行时最多只能使用 2GB 内存。

### `monitored`

`monitored` 用于配置目标机上的监控服务 ts-monitor。包含以下字段：

- `ts_monitor_enabled`：是否开启ts-monitor监控，如果设置为true, 则内核的配置中需要开启monitor的文件写功能。

- `deploy_dir`：指定部署目录，若不指定，或指定为相对目录，则按照 `global` 中配置的 `deploy_dir` 生成
- `log_dir`：指定日志目录，若不指定，或指定为相对目录，则按照 `global` 中配置的 `log_dir` 生成

### server_configs

`server_configs` 用于配置服务，生成各组件的配置文件，类似 `global` 区块，该区块内的配置可以在具体的实例中被覆盖。主要包含以下字段：

- `ts-sql`：ts-sql 服务的相关配置，支持的完整配置请参考 [ts-sql配置文件描述](/ts-sql-configuration-file.md)
- `ts-store`：ts-store 服务的相关配置，支持的完整配置请参考 [ts-store 配置文件描述](/ts-store-configuration-file.md)
- `ts-meta`：ts-meta 服务的相关配置，支持的完整配置请参考 [ts-meta 配置文件描述](/ts-meta-configuration-file.md)
- `ts-monitor`：ts-monitor 服务的相关配置，支持的完整配置请参考 [ts-monitor 配置文件描述](/ts-monitor-configuration-file.md)

`server_configs` 配置示例：

```yaml
server_configs:
  openGemini:
    lease: "45s"
    split-table: true
    token-limit: 1000
    instance.openGemini_enable_ddl: true
  ts-store:
    log-level: "info"
    readpool.unified.min-thread-count: 1
```

上述配置指定了 openGemini 和 ts-store 的全局配置。

### ts_meta_servers

`ts_meta_servers` 指定了将 ts-meta 的服务部署到哪些机器上，同时可以指定每台机器上的服务配置。`ts_meta_servers` 是一个数组，每个数组的元素包含以下字段：

- `host`：指定部署到哪台机器，字段值填 IP 地址，不可省略
- `listen_host`：当机器上有多个 IP 时，可以指定服务的监听 IP，默认为 `0.0.0.0`
- `ssh_port`：指定连接目标机器进行操作的时候使用的 SSH 端口，若不指定，则使用 `global` 区块中的 `ssh_port`
- `name`：指定该 ts-meta 实例的名字，不同实例的名字必须唯一，否则无法部署
- `client_port`：指定 ts-meta 的客户端连接端口，默认值：2379
- `peer_port`：指定 ts-meta 之间互相通信的端口，默认值：2380
- `deploy_dir`：指定部署目录，若不指定，或指定为相对目录，则按照 `global` 中配置的 `deploy_dir` 生成
- `data_dir`：指定数据目录，若不指定，或指定为相对目录，则按照 `global` 中配置的 `data_dir` 生成
- `log_dir`：指定日志目录，若不指定，或指定为相对目录，则按照 `global` 中配置的 `log_dir` 生成
- `config`：该字段配置规则和 `server_configs` 里的 `ts-meta` 配置规则相同，若配置了该字段，会将该字段内容和 `server_configs` 里的 `ts-meta` 内容合并（若字段重叠，以本字段内容为准），然后生成配置文件并下发到 `host` 指定的机器
- `os`：`host` 字段所指定的机器的操作系统，若不指定该字段，则默认为 `global` 中的 `os`
- `arch`：`host` 字段所指定的机器的架构，若不指定该字段，则默认为 `global` 中的 `arch`
- `resource_control`：针对该服务的资源控制。如果配置了该字段，会将该字段和 `global` 中的 `resource_control` 内容合并（若字段重叠，以本字段内容为准），然后生成 systemd 配置文件并下发到 `host` 指定机器。`resource_control` 的配置规则同 `global` 中的 `resource_control`

以上所有字段中，部分字段部署完成之后不能再修改。如下所示：

- `host`
- `listen_host`
- `name`
- `client_port`
- `peer_port`
- `deploy_dir`
- `data_dir`
- `log_dir`
- `arch`
- `os`

`ts_meta_servers` 配置示例：

```yaml
ts_meta_servers:
  - host: 10.0.1.11
    config:
      schedule.max-merge-region-size: 20
      schedule.max-merge-region-keys: 200000
  - host: 10.0.1.12
```

上述配置指定了将 ts-meta 部署到 `10.0.1.11` 和 `10.0.1.12`，并针对 `10.0.1.11` 的 ts-meta 进行一些特殊配置。

### ts_sql_servers

`ts_sql_servers` 指定了将 openGemini 服务部署到哪些机器上，同时可以指定每台机器上的服务配置。`openGemini_servers` 是一个数组，每个数组的元素包含以下字段：

- `host`：指定部署到哪台机器，字段值填 IP 地址，不可省略
- `listen_host`：当机器上有多个 IP 时，可以指定服务的监听 IP，默认为 `0.0.0.0`
- `ssh_port`：指定连接目标机器进行操作的时候使用的 SSH 端口，若不指定，则使用 `global` 区块中的 `ssh_port`
- `port`：ts_sql服务的监听端口，用于提供给 MySQL 客户端连接，默认值：4000
- `deploy_dir`：指定部署目录，若不指定，或指定为相对目录，则按照 `global` 中配置的 `deploy_dir` 生成
- `log_dir`：指定日志目录，若不指定，或指定为相对目录，则按照 `global` 中配置的 `log_dir` 生成
- `config`：该字段配置规则和 `server_configs` 里的 `openGemini` 配置规则相同，若配置了该字段，会将该字段内容和 `server_configs` 里的 `openGemini` 内容合并（若字段重叠，以本字段内容为准），然后生成配置文件并下发到 `host` 指定的机器
- `os`：host 字段所指定的机器的操作系统，若不指定该字段，则默认为 `global` 中的 `os`
- `arch`：host 字段所指定的机器的架构，若不指定该字段，则默认为 `global` 中的 `arch`
- `resource_control`：针对该服务的资源控制，如果配置了该字段，会将该字段和 `global` 中的 `resource_control` 内容合并（若字段重叠，以本字段内容为准），然后生成 systemd 配置文件并下发到 `host` 指定机器。`resource_control` 的配置规则同 `global` 中的 `resource_control`

以上所有字段中，部分字段部署完成之后不能再修改。如下所示：

- `host`
- `listen_host`
- `port`
- `status_port`
- `deploy_dir`
- `log_dir`
- `arch`
- `os`

`ts_sql_servers` 配置示例：

```yaml
ts_sql_servers:
  - host: 10.0.1.14
    config:
      logging.level: debug
      http.auth-enabled: true
  - host: 10.0.1.15
```

### ts_store_servers

`ts_store_servers` 约定了将 ts-store 服务部署到哪些机器上，同时可以指定每台机器上的服务配置。`ts_store_servers` 是一个数组，每个数组元素包含以下字段：

- `host`：指定部署到哪台机器，字段值填 IP 地址，不可省略
- `listen_host`：当机器上有多个 IP 时，可以指定服务的监听 IP，默认为 `0.0.0.0`
- `ssh_port`：指定连接目标机器进行操作的时候使用的 SSH 端口，若不指定，则使用 `global` 区块中的 `ssh_port`
- `port`：ts-store 服务的监听端口，默认值：20160
- `deploy_dir`：指定部署目录，若不指定，或指定为相对目录，则按照 `global` 中配置的 `deploy_dir` 生成
- `data_dir`：指定数据目录，若不指定，或指定为相对目录，则按照 `global` 中配置的 `data_dir` 生成
- `log_dir`：指定日志目录，若不指定，或指定为相对目录，则按照 `global` 中配置的 `log_dir` 生成
- `config`：该字段配置规则和 server_configs 里的 ts-store 配置规则相同，若配置了该字段，会将该字段内容和 `server_configs` 里的 `ts-store` 内容合并（若字段重叠，以本字段内容为准），然后生成配置文件并下发到 `host` 指定的机器
- `os`：host 字段所指定的机器的操作系统，若不指定该字段，则默认为 `global` 中的 `os`
- `arch`：host 字段所指定的机器的架构，若不指定该字段，则默认为 `global` 中的 `arch`
- `resource_control`：针对该服务的资源控制，如果配置了该字段，会将该字段和 `global` 中的 `resource_control` 内容合并（若字段重叠，以本字段内容为准），然后生成 systemd 配置文件并下发到 `host` 指定机器。`resource_control` 的配置规则同 `global` 中的 `resource_control`

以上所有字段中，部分字段部署完成之后不能再修改。如下所示：

- `host`
- `listen_host`
- `port`
- `deploy_dir`
- `data_dir`
- `log_dir`
- `arch`
- `os`

`ts_store_servers` 配置示例：

```yaml
ts_store_servers:
  - host: 10.0.1.14
    config:
      logging.level: "debug"
  - host: 10.0.1.15
    config:
      logging.level: "debug"
```

### grafana_servers

`grafana_servers` 约定了将 Grafana 服务部署到哪台机器上，同时可以指定这台机器上的服务配置，`grafana_servers` 是一个数组，每个数组元素包含以下字段：

- `host`：指定部署到哪台机器，字段值填 IP 地址，不可省略
- `ssh_port`：指定连接目标机器进行操作的时候使用的 SSH 端口，若不指定，则使用 `global` 区块中的 `ssh_port`
- `port`：指定 Grafana 提供服务的端口，默认值：3000
- `deploy_dir`：指定部署目录，若不指定，或指定为相对目录，则按照 `global` 中配置的 `deploy_dir` 生成
- `os`：`host` 字段所指定的机器的操作系统，若不指定该字段，则默认为 `global` 中的 `os`
- `arch`：`host` 字段所指定的机器的架构，若不指定该字段，则默认为 `global` 中的 `arch`
- `username`：Grafana 登录界面的用户名
- `password`：Grafana 对应的密码
- `dashboard_dir`：该字段指定一个本地目录，该目录中应当含有完整的 `dashboard(*.json)` 文件，这些文件会在集群配置初始化阶段被传输到目标机器上，作为 Grafana 的 dashboards
- `resource_control`：针对该服务的资源控制，如果配置了该字段，会将该字段和 `global` 中的 `resource_control` 内容合并（若字段重叠，以本字段内容为准），然后生成 systemd 配置文件并下发到 `host` 指定机器。`resource_control` 的配置规则同 `global` 中的 `resource_control`

::: info 注意

如果配置了 `grafana_servers` 的 `dashboard_dir` 字段，在执行 `gemix cluster rename` 命令进行集群重命名后，需要完成以下操作：

1. 对于本地的 dashboards 目录中的 `*.json` 文件，将 `datasource` 字段的值更新为新的集群名（这是因为 `datasource` 是以集群名命名的）
2. 执行 `gemix cluster reload -R grafana` 命令
:::

以上所有字段中，部分字段部署完成之后不能再修改。如下所示：

- `host`
- `port`
- `deploy_dir`
- `arch`
- `os`

`grafana_servers` 配置示例：

```yaml
grafana_servers:
  - host: 10.0.1.11
    dashboard_dir: /local/dashboard/dir
```

