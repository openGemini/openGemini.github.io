# 文档架构

## 关于 openGemini

### openGemini 介绍

### 动机

## 快速开始

### 安装（单机版）

### 快速上手

已有文章（重写其中的图片）

### 集群部署

### 关键概念

### 术语表

## GeminiQL

### 示例数据

```
https://s3.amazonaws.com/noaa.water-database/NOAA_data.txt
```

### SQL 语法

#### DDL

#### DML

- select
- create
- drop

.........................

#### 权限

- grant

### 聚合算子

### 数学表达式

### 数据类型

### 子查询

### GeminiQL  参考

#### 文法介绍

--- 龙玉祥

#### 关键字(Keywords)

```
ALL           ALTER         ANY           AS            ASC           BEGIN
BY            CREATE        CONTINUOUS    DATABASE      DATABASES     DEFAULT
DELETE        DESC          DESTINATIONS  DIAGNOSTICS   DISTINCT      DROP
DURATION      END           EVERY         EXPLAIN       FIELD         FOR
FROM          GRANT         GRANTS        GROUP         GROUPS        IN
INF           INSERT        INTO          KEY           KEYS          KILL
LIMIT         SHOW          MEASUREMENT   MEASUREMENTS  NAME          OFFSET
ON            ORDER         PASSWORD      POLICY        POLICIES      PRIVILEGES
QUERIES       QUERY         READ          REPLICATION   RESAMPLE      RETENTION
REVOKE        SELECT        SERIES        SET           SHARD         SHARDS
SLIMIT        SOFFSET       STATS         SUBSCRIPTION  SUBSCRIPTIONS TAG
TO            USER          USERS         VALUES        WHERE         WITH
WRITE
```

如果您使用InfluxQL关键字作为[标识符](https://influxdb-v1-docs-cn.cnosdb.com/influxdb/v1.8/concepts/glossary/#identifier)，您需要将每个查询中的标识符用双引号括起来。

关键字`time`是一个特例。`time`可以是一个[连续查询](https://influxdb-v1-docs-cn.cnosdb.com/influxdb/v1.8/concepts/glossary/#continuous-query-cq)名字、数据库名字、[measurement](https://influxdb-v1-docs-cn.cnosdb.com/influxdb/v1.8/concepts/glossary/#measurement)的名字、[保留策略](https://influxdb-v1-docs-cn.cnosdb.com/influxdb/v1.8/concepts/glossary/#retention-policy-rp)名字、[subscription](https://influxdb-v1-docs-cn.cnosdb.com/influxdb/v1.8/concepts/glossary/#subscription)的名字和[用户](https://influxdb-v1-docs-cn.cnosdb.com/influxdb/v1.8/concepts/glossary/#user)名。在这些情况下，不需要在查询中用双引号将`time`括起来。`time`不能是field key或tag key；InfluxDB拒绝写入将`time`作为[field key](https://influxdb-v1-docs-cn.cnosdb.com/influxdb/v1.8/concepts/glossary/#field-key)或[tag key](https://influxdb-v1-docs-cn.cnosdb.com/influxdb/v1.8/concepts/glossary/#tag-key)的数据，对于这种数据写入，InfluxDB会返回错误。请查阅[FAQ](https://influxdb-v1-docs-cn.cnosdb.com/influxdb/v1.8/troubleshooting/frequently-asked-questions/#time)获得更多相关信息。

## 数据接入

### 常规行协议定义

### tag数组行协议定义

### 行协议写入教程

### 普罗米修斯远程读写

### openTelemetry OTLP

## 管理

### 配置项

### 身份认证和授权

### 启用HTTPS

### 端口矩阵

### 监控

## 平台融合

### Docker

### K8S

## 参考指南

### 架构

#### 概述

#### 查询引擎

#### 存储引擎

### 遥测

### 如何将数据从 influxdb 迁移到 openGemini

## 版本发布历史

### 发布版本汇总

### 版本规则

## Troubleshoot

### 常见问题（FAQs）



### 常见错误信息及解决方案