---
title: Software and hardware recommendations
order: 1
---

# Software and hardware recommendations

As an open-source distributed SQL database with high performance, openGemini can be deployed in the Intel architecture server, ARM architecture server, and major virtualization environments and runs well. openGemini supports most of the major hardware networks and Linux operating systems.

## OS and platform requirements

针对不同操作系统和 CPU 架构的组合，openGemini 提供不同级别质量标准的支持。

### 操作系统和CPU架构

在以下操作系统以及对应的 CPU 架构组合上，openGemini 可**满足企业级生产质量的要求**，产品特性经过全面且系统化的验证：

| 操作系统                                       | 支持的 CPU 架构                         |
| :--------------------------------------------- | :-------------------------------------- |
| CentOS 7.3 及以上的 7.x 版本                   | <ul><li>x86_64</li><li>ARM 64</li></ul> |
| openEuler 22.03 LTS SP1                        | <ul><li>x86_64</li><li>ARM 64</li></ul> |
| Red Hat Enterprise Linux 8.4 及以上的 8.x 版本 | <ul><li>x86_64</li><li>ARM 64</li></ul> |
| Red Hat Enterprise Linux 7.3 及以上的 7.x 版本 | <ul><li>x86_64</li><li>ARM 64</li></ul> |

在以下操作系统以及对应的 CPU 架构组合上，你可以编译、构建和部署 openGemini，可使用 OLAP 以及数据工具的基本功能。但是 openGemini **不保障企业级生产质量要求**：

| 操作系统                         | 支持的 CPU 架构                         |
| :------------------------------- | :-------------------------------------- |
| macOS 12 (Monterey) 及以上的版本 | <ul><li>x86_64</li><li>ARM 64</li></ul> |
| Ubuntu LTS 18.04 及以上的版本    | <ul><li>x86_64</li></ul>                |

::: info

- 对于以上两个表格中所列操作系统的 32 位版本，openGemini 在这些 32 位操作系统以及对应的 CPU 架构上**不保障**可编译、可构建以及可部署，或 openGemini 不主动适配这些 32 位的操作系统。

- 以上未提及的操作系统版本**也许可以**运行 openGemini，但尚未得到 openGemini 官方支持。

:::

### 编译和运行所依赖的库

| 编译和构建 openGemini 所需的依赖库 | 版本            |
| :--------------------------------- | :-------------- |
| Golang                             | 1.19 及以上版本 |
| GCC                                | xxx             |
| LLVM                               | xxx             |

### Docker 镜像依赖

支持的 CPU 架构如下：

- x86_64
- ARM 64

## 软件配置要求

### 执行机上软件配置

| 软件    | 版本         |
| :------ | :----------- |
| sshpass | 1.06 及以上  |
| gemix   | 1.0.0 及以上 |

::: info

执行机需要部署 [gemix 软件](../reference/gemix/gemix-documentation-guide)来完成 openGemini 集群运维管理。

:::

### 目标主机建议配置软件

| 软件    | 版本        |
| :------ | :---------- |
| sshpass | 1.06 及以上 |
| tar     | 任意        |

## 服务器建议配置

openGemini 支持部署和运行在 Intel x86-64 架构的 64 位通用硬件服务器平台或者 ARM 架构的硬件服务器平台。对于开发、测试及生产环境的服务器硬件配置（不包含操作系统 OS 本身的占用）有以下要求和建议：

### 开发及测试环境

| **组件** | **CPU** | **内存** | **本地存储** | **网络** | **实例数量(最低要求)**    |
| :------- | :------ | :------- | :----------- | :------- | :------------------------ |
| ts-sql   | 8U+     | 16GB+    | 无特殊要求   | 千兆网卡 | 1（可与 ts-store 同机器） |
| ts-meta  | 2U+     | 8GB+     | SAS, 200 GB+ | 千兆网卡 | 3                         |
| ts-store | 8U+     | 32GB+    | SSD, 200 GB+ | 千兆网卡 | 3（可与 ts-sql 同机器）   |

::: info

- 验证测试环境中的 ts-sql和ts-store 可以部署在同一台服务器上。
- 如进行性能相关的测试，避免采用低性能存储和网络硬件配置，防止对测试结果的正确性产生干扰。
- ts-store 的 SSD 盘推荐使用 NVME 接口以保证读写更快。
- 如果仅验证功能，建议使用 [快速上手](../quick_start/get_started)进行单机功能测试。
- ts-sql 对于磁盘的使用以存放日志为主，因此在测试环境中对于磁盘类型和容量并无特殊要求。

:::

### 生产环境

| **组件** | **CPU** | **内存** | **硬盘类型** | **网络**             | **实例数量(最低要求)**    |
| :------- | :------ | :------- | :----------- | :------------------- | :------------------------ |
| ts-sql   | 16U+    | 48GB+    | SSD          | 万兆网卡（x 块最佳） | 2（可与 ts-store 同机器） |
| ts-meta  | 8U+     | 16GB+    | SSD          | 万兆网卡（x 块最佳） | 3                         |
| ts-store | 16U+    | 64GB+    | SSD          | 万兆网卡（x 块最佳） | 3（可与 ts-store 同机器） |
| 监控     | 8U+     | 16GB+    | SAS          | 千兆网卡             | 1                         |

::: info

- 生产环境中的 ts-sql 和 ts-store 可以部署和运行在同一台服务器上，如对性能和可靠性有更高的要求，应尽可能分开部署。
- 生产环境强烈推荐使用更高的配置。
- ts-store 硬盘大小配置建议 PCI-E SSD 不超过 2 TB，普通 SSD 不超过 1.5 TB。
- ts-store 支持多盘部署, WAL和Data盘分开。
:::