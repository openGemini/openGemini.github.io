---
order: 2
---

# CREATE RETENTION POLICY (创建数据保留策略)


## 语法
```sql
CREATE RETENTION POLICY <retention_policy_name> ON <database_name> DURATION <duration> REPLICATION <n> [SHARD DURATION <duration>] [DEFAULT]
```

## 语法描述

### `DURATION`

- `DURATION`子句确定openGemini将数据保留多长时间。 保留策略的最短持续时间为一小时，最长持续时间为`INF`（无限）。

### `REPLICATION`

- `REPLICATION`子句确定每个数据点在集群中存储了多少个独立副本，目前仅支持`1`副本。

### `SHARD DURATION`

- 可选项， `SHARD DURATION` 子句确定分片组的时间范围。
- 默认情况下，分片组的持续时间由保留策略的`DURATION`确定：

| 保留策略期限 | 分片组持续时间 |
|---|---|
| < 2 days  | 1 hour  |
| >= 2 days and <= 6 months  | 1 day  |
| > 6 months  | 7 days  |

最小允许的 `SHARD GROUP DURATION` 为`1h`.
如果 `创建保留策略` 查询试图将 `SHARD GROUP DURATION` 设置为小于 `1h` 且大于 `0s`, openGemini 会自动的讲 `SHARD GROUP DURATION` 设置为 `1h`.
如果 `CREATE RETENTION POLICY` 查询试图讲 `SHARD GROUP DURATION` 设置为你 `0s`, openGemini 会根据上面列出的默认自动设置`SHARD GROUP DURATION` 

### `DEFAULT`

将新的保留策略设置为数据库的默认保留策略。此设置是可选项。

## 示例

### 创建保留策略

```sql
> CREATE RETENTION POLICY "one_day_only" ON "NOAA_water_database" DURATION 1d REPLICATION 1
```
该查询为数据库`NOAA_water_database`创建了一个名为`one_day_only`的保留策略，该策略的期限为`1d`，复制因子为`1`。

### 创建默认保留策略

```sql
> CREATE RETENTION POLICY "one_day_only" ON "NOAA_water_database" DURATION 23h60m REPLICATION 1 DEFAULT
```

该查询创建与上例相同的保留策略，但是将其设置为数据库的默认保留策略。

成功的`CREATE RETENTION POLICY`查询不返回任何结果。

如果尝试创建与现有策略相同的保留策略，则openGemini不会返回错误。
如果尝试创建与现有保留策略相同名称的保留策略，但属性不同，则openGemini将返回错误。

::: tip

您也可以在`CREATE DATABASE`查询中指定新的保留策略。
请参阅 [使用`CREATE DATABASE`创建数据库](./create_database.md)。

:::
