---
title: 最小拓扑架构
order: 1
---

# 最小拓扑架构

本文档介绍 openGemini 集群最小部署的拓扑架构。

## 拓扑信息

| 实例     | 个数 | 物理机配置                                | IP                                  | 配置                  |
| :------- | :--- | :---------------------------------------- |:------------------------------------| :-------------------- |
| ts-sql   | 3    | 16 VCore 32 GiB 100 GiB 用于存储          | 192.168.1.1 192.168.1.2 192.168.1.3 | 默认端口 全局目录配置 |
| ts-meta  | 3    | 4 VCore 8 GiB 100 GiB 用于存储            | 192.168.1.1 192.168.1.2 192.168.1.3 | 默认端口 全局目录配置 |
| ts-store | 3    | 16 VCore 32 GiB 2 TiB (NVMe SSD) 用于存储 | 192.168.1.1 192.168.1.2 192.168.1.3 | 默认端口 全局目录配置 |


## 拓扑模版

<details> <summary>最小配置模板</summary>

```yaml
global:
  ssh_port: 22
  user: "root"
  log_dir: "/gemini-deploy/logs"
  deploy_dir: "/gemini-deploy"
ts-meta:
  - host: 192.168.1.1
    data_dir: "/gemini-data/meta"
  - host: 192.168.1.2
    data_dir: "/gemini-data/meta"
  - host: 192.168.1.3
    data_dir: "/gemini-data/meta"
ts-sql:
  - host: 192.168.1.1
  - host: 192.168.1.2
  - host: 192.168.1.3
ts-store:
  - host: 192.168.1.1
    data_dir: "/gemini-data/data"
    meta_dir: "/gemini-data/meta"
  - host: 192.168.1.2
    data_dir: "/gemini-data/data"
    meta_dir: "/gemini-data/meta"
  - host: 192.168.1.3
    data_dir: "/gemini-data/data"
    meta_dir: "/gemini-data/meta"
```

</details>

<br/>

<details> <summary>最小配置模板详解</summary>

```yaml
# Global variables are applied to all deployments and used as the default value of
# the deployments if a specific deployment value is missing.
global:
  # SSH port of servers in the managed cluster.
  ssh_port: 22
  # user who started the openGemini process.
  user: "gemini"
  # openGemini Cluster log file storage directory.
  log_dir: "/gemini-deploy/logs"
  # Storage directory for cluster deployment files, startup scripts, and configuration files.
  deploy_dir: "/gemini-deploy"
  # operating system, linux/darwin.
  os: "linux"
  # Supported values: "amd64", "arm64" (default: "amd64").
  arch: "amd64"

# Server configs are used to specify the configuration of ts-meta Servers.
ts-meta:
  # The ip address of the ts-meta Server.
  - host: 192.168.1.1
    # SSH port of the server. (same on same server)
    ssh_port: 22
    # [meta].http-bind-address in openGemini.conf.
    client_port: 8091
    # [meta].rpc-bind-address in openGemini.conf.
    peer_port: 8092
    # [meta].bind-address in openGemini.conf.
    raft_port: 8088
    # [gossip].meta-bind-port in openGemini.conf.
    gossip_port: 8010
    # [meta].dir in openGemini.conf.
    data_dir: "/gemini-data/meta"
    # openGemini Cluster log file storage directory. (same on same server)
    log_dir: "/gemini-deploy/log"
    # Storage directory for cluster deployment files, startup scripts, and configuration files. (same on same server)
    deploy_dir: "/gemini-deploy"
  - host: 192.168.1.2
    ssh_port: 22
    client_port: 8091
    peer_port: 8092
    raft_port: 8088
    gossip_port: 8010
    data_dir: "/gemini-data/meta"
    log_dir: "/gemini-deploy/log"
    deploy_dir: "/gemini-deploy"
  - host: 192.168.1.3
    ssh_port: 22
    client_port: 8091
    peer_port: 8092
    raft_port: 8088
    gossip_port: 8010
    data_dir: "/gemini-data/meta"
    log_dir: "/gemini-deploy/log"
    deploy_dir: "/gemini-deploy"

# Server configs are used to specify the configuration of ts-sql Servers.
ts-sql:
  # The ip address of the ts-sql Server.
  - host: 192.168.1.1
    # SSH port of the server. (same on same server)
    ssh_port: 22
    # [http].bind-address in openGemini.conf.
    port: 8086
    # [http].flight-address in openGemini.conf.
    flight_port: 8087
    # openGemini Cluster log file storage directory. (same on same server)
    log_dir: "/gemini-deploy/log"
    # Storage directory for cluster deployment files, startup scripts, and configuration files. (same on same server)
    deploy_dir: "/gemini-deploy"
  - host: 192.168.1.2
    ssh_port: 22
    port: 8086
    flight_port: 8087
    log_dir: "/gemini-deploy/log"
    deploy_dir: "/gemini-deploy"
  - host: 192.168.1.3
    ssh_port: 22
    port: 8086
    flight_port: 8087
    log_dir: "/gemini-deploy/log"
    deploy_dir: "/gemini-deploy"

# Server configs are used to specify the configuration of ts-store Servers.
ts-store:
  # The ip address of the ts-store Server.
  - host: 192.168.1.1
    # SSH port of the server. (same on same server)
    ssh_port: 22
    # [data].store-ingest-addr in openGemini.conf.
    ingest_port: 8400
    # [data].store-select-addr in openGemini.conf.
    select_port: 8401
    # [gossip].store-bind-port in openGemini.conf.
    gossip_port: 8011
    # [data].store-data-dir & [data].store-wal-dir in openGemini.conf.
    data_dir: "/gemini-data/data"
    # [data].store-meta-dir in openGemini.conf.
    meta_dir: "/gemini-data/data/meta"
    # openGemini Cluster log file storage directory. (same on same server)
    log_dir: "/gemini-deploy/log"
    # Storage directory for cluster deployment files, startup scripts, and configuration files. (same on same server)
    deploy_dir: "/gemini-deploy"
  - host: 192.168.1.2
    ssh_port: 22
    ingest_port: 8400
    select_port: 8401
    gossip_port: 8011
    data_dir: "/gemini-data/data"
    meta_dir: "/gemini-data/data/meta"
    log_dir: "/gemini-deploy/log"
    deploy_dir: "/gemini-deploy"
  - host: 192.168.1.3
    ssh_port: 22
    ingest_port: 8400
    select_port: 8401
    gossip_port: 8011
    data_dir: "/gemini-data/data"
    meta_dir: "/gemini-data/data/meta"
    log_dir: "/gemini-deploy/log"
    deploy_dir: "/gemini-deploy"
```

</details>
