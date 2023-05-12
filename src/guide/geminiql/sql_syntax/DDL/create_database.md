---
order: 8
---

# CREATE DATABASE

## 语法

```sql
CREATE DATABASE <database_name> [WITH [DURATION <duration>] [REPLICATION <n>] [SHARD DURATION <duration>] [NAME <retention-policy-name>]]
```

## 语法描述

`CREATE DATABASE`需要数据库名称。

`WITH` ，`DURATION`，`REPLICATION`，`SHARD DURATION`，`NAME` 子句以及创建与数据库相关联的单个保留策略是可选项。
如果未在`WITH`之后指定子句，则会默认创建名称为`autogen`的保留策略。

成功的`CREATE DATABASE`查询不返回任何结果。

如果创建一个已经存在的数据库，openGemini 不执行任何操作，但也不会返回错误。

## 示例

### 创建数据库

```sql
> CREATE DATABASE "NOAA_water_database"
```

该查询创建一个名为 `NOAA_water_database`的数据库。

默认情况下，openGemini还会创建默认的保留策略`autogen`并与数据库`NOAA_water_database`进行关联。

## 创建具有特定保留策略的数据库

```sql
> CREATE DATABASE "NOAA_water_database" WITH DURATION 3d REPLICATION 1 SHARD DURATION 1h NAME "liquid"
```

该操作创建一个名称为`NOAA_water_database`的数据库。还为`NOAA_water_database`创建一个默认的保留策略，名称为`liquid`，其`DURATION`为3d，复制因子为1，分片组持续时间为1h。