---
title: gemix cluster template
order: 10
---

# gemix cluster template

部署集群之前，需要准备一份集群的[拓扑文件](../../gemix_cluster_topology_reference)。gemix 内置了拓扑文件的模版，用户可以通过修改该模版来生成最终的拓扑文件。使用 `gemix cluster template` 命令可以输出 gemix 内置的模版内容。
## 语法

```shell
gemix cluster template [flags]
```

如果不指定该选项，输出的默认模版包含以下实例：

- 3 个 ts-meta 实例
- 3 个 ts-store 实例
- 3 个 ts-sql 实例
- 3 个 ts-monitor 实例
- 1 个 Grafana 实例

## 选项

### --full

- 输出详细的拓扑模版，该模版会以注释的形式带上可配置的参数。在命令中添加该选项，可开启该选项。
- 如果不指定该选项，默认输出最简单的拓扑模版。

### -h, --help

输出帮助信息。

### 更多选项 (Maybe TODO)

```
lags:

   --arch string        Supported values: "amd64", "arm64". (default "amd64")

   --data-dir string      openGemini Cluster data storage directory. (default "/var/lib/openGemini/data")

   --deploy-dir string     Storage directory for cluster deployment files, startup scripts, and configuration files. (default "/var/lib/openGemini/deploy")

   --full            Print the full topology template for openGemini cluster.

   --grafana-servers strings  List of grafana servers (default [127.0.0.1])

   --group string        group is used to specify the group name the user belong to if it's not the same as user.

 -h, --help            help for template

   --local           Print and render template for deploying a simple cluster locally.

   --log-dir string       Log directory for cluster components. (default "/var/lib/openGemini/logs")

   --ssh-port int        SSH port of servers in the managed cluster. (default 22)

   --ts-meta-servers strings  List of ts-meta servers (default [127.0.0.1])

   --ts-sql-servers strings   List of ts-sql servers (default [127.0.0.1])

   --ts-store-servers strings  List of ts-store servers (default [127.0.0.1])

   --user string        The user who runs the openGemini cluster. (default "gemini")
```

## 输出

根据指定选项输出拓扑模版，可重定向到拓扑文件中用于部署。
