---
title: 使用 gemix 部署
order: 5
---

# 使用 gemix 部署 openGemini 集群

gemix 是 openGemini  官方开发的集群运维工具，gemix cluster 是 gemix 提供的使用 Golang 编写的集群管理组件，通过 gemix cluster 组件就可以进行日常的运维工作，包括安装、启动、关闭、卸载、升级 openGemini 集群，以及管理 openGemini 集群参数。

目前 gemix 可以支持部署 openGemini cluster 以及监控系统。本文将介绍不同集群拓扑的具体部署步骤。

## 第 1 步：软硬件环境要求及前置检查

[软硬件环境要求](./software_and_hardware_requirements)

[环境与系统配置检查](./check_before_deployment)

## 第 2 步：在执行机上安装 gemix 组件

在执行机上部署 gemix 组件有两种方式：在线部署和离线部署。

### 在线部署

1. 执行如下命令安装 gemix 工具：

   ```bash
   go install github.com/openGemini/gemix@latest
   ```

2. 按如下步骤设置 gemix 环境变量：

   i. 重新声明全局环境变量：

   ```bash
   source .bash_profile
   ```

   ii. 确认 gemix 工具是否安装：

   ```bash
   which gemix
   ```

### 离线部署

在[官方下载页面](https://github.com/openGemini/openGemini-UP/releases)选择对应版本的 gemix 离线镜像包。

解压，将 `gemix` 工具放到 `usr/local/bin`下面。

## 第 3 步：初始化集群拓扑文件

执行如下命令，生成集群初始化配置文件：

```bash
gemix cluster template > topology.yaml
```

执行 vi topology.yaml，查看配置文件的内容：

```yaml
global:
  ssh_port: 22
  user: "gemini"
  deploy_dir: "/gemini-deploy"
  log_dir: "/gemini-deploy/logs"
  data_dir: "/gemini-data/data"
server_configs:
ts-meta:
  - host: 192.168.1.1
  - host: 192.168.1.2
  - host: 192.168.1.3
ts-sql:
  - host: 192.168.1.1
  - host: 192.168.1.2
  - host: 192.168.1.3
ts-store:
  - host: 192.168.1.1
  - host: 192.168.1.2
  - host: 192.168.1.3
```

下表列出了常用的 7 种场景，请根据链接中的拓扑说明以及配置文件模板配置`topology.yaml`。如果有其他组合场景的需求，请根据多个模板自行调整。

| 场景           | 配置任务                                                   | 配置文件模板                                                 | 拓扑说明                                                     |
| :------------- | :--------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| OLAP 业务      | [部署最小拓扑架构](./topology/minimal_deployment_topology) | [简单最小配置模板](./topology/minimal_deployment_topology#拓扑模版) [详细最小配置模板](./topology/minimal_deployment_topology#拓扑模版) | 最小集群拓扑，包括 ts-meta、ts-sql、ts-store。               |
| OLAP 业务+监控 | [部署最小拓扑架构](./topology/minimal_deployment_topology) |                                                              | 最小集群拓扑，包括 ts-meta、ts-sql、ts-store、ts-store、grafana |

## 第 4 步：执行安装命令

::: info

通过 gemix 进行集群部署可以使用密钥或者交互密码方式来进行安全认证：

- 如果是密钥方式，可以通过 `-k` 或者 `--key` 来指定密钥的路径。
- 如果是密码方式，可以通过 `-p` 进入密码交互窗口。
- 如果已经配置免密登录目标机，则不需填写认证。

一般情况下 gemix 会在目标机器上创建 topology.yaml 中约定的用户和组，以下情况例外：

- `topology.yaml` 中设置的用户名在目标机器上已存在。
- 在命令行上使用了参数 `--skip-create-user` 明确指定跳过创建用户的步骤。

:::

执行部署命令前，先使用 `check` 及 `check --apply` 命令检查和自动修复集群存在的潜在风险：

1. 检查集群存在的潜在风险:

   ```sh
   gemix cluster check ./topology.yaml --user root [-p] [-i /home/root/.ssh/gcp_rsa]
   ```

2. 部署 openGemini 集群:

使用以下命令会自动下载openGemini v1.1.1版本包到执行机，然后拷贝到所有的实例节点中，并初始化好启动的配置文件。

```bash
gemix cluster install gemini-test v1.1.1 ./topology.yaml --user root [--password] [--key /home/root/.ssh/id_rsa]
```

以上安装示例中：

- `gemini-test` 为安装的集群名称。
- `v1.1.1` 为安装的集群版本，可以通过 https://github.com/openGemini/openGemini/releases/latest 来查看 gemix 支持的最新可用版本。
- 初始化配置文件为 `topology.yaml`。
- `--user root` 表示通过 root 用户登录到目标主机完成集群部署，该用户需要有 ssh 到目标机器的权限，并且在目标机器有 sudo 权限。也可以用其他有 ssh 和 sudo 权限的用户完成部署。
- [--key] 及 [--password] 为可选项，如果已经配置免密登录目标机，则不需填写。否则选择其一即可，[--key] 为可登录到目标机的 root 用户（或 --user 指定的其他用户）的私钥，也可使用 [--password] 输入该用户的密码。

预期日志结尾输出 Deployed cluster `gemini-test` successfully 关键词，表示部署成功。

## 第 5 步：查看 gemix 管理的集群情况

```sh
gemix cluster list
```

gemix 支持管理多个 openGemioni 集群，该命令会输出当前通过 gemix cluster 管理的所有集群信息，包括集群名称、部署用户、版本、密钥信息等。

## 第 6 步：检查部署的 openGemini 集群情况

例如，执行如下命令检查 `gemini-test` 集群情况：

```sh
gemix cluster display gemini-test
```

预期输出包括 `gemini-test` 集群中实例 ID、角色、主机、监听端口和状态（由于还未启动，所以状态为 Down/inactive）、目录信息。

## 第 7 步：启动集群

使用以下命令会将所有实例节点的相关进程启动。

```bash
gemix cluster start gemini-test
```

预期结果输出 `Started cluster gemini-test successfully`，表示启动成功。

## 第 8 步：验证集群运行状态

```bash
gemix cluster display gemini-test
```

预期结果输出：各节点 Status 状态信息为 `Up` 说明集群状态正常。

## 探索更多

如果你使用kubernetes部署了 openGemini，接下来可参阅以下文档：

- [在 Kubernetes 上部署 openGemini](/zh/deploy-on-k8s/quick_start/get_started)

  