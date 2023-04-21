---
order: 12
---

# ALTER RETENTION POLICY

`ALTER RETENTION POLICY`查询语法如下，必须声明至少一个保留策略属性`DURATION`，`REPLICATION`，`SHARD DURATION`或`DEFAULT`：

```sql
ALTER RETENTION POLICY <retention_policy_name> ON <database_name> DURATION <duration> REPLICATION <n> SHARD DURATION <duration> DEFAULT
```

> **警告:** 复制因子不适用于单节点实例。

首先，以2d的`DURATION`创建保留策略`what_is_time`：

```sql
> CREATE RETENTION POLICY "what_is_time" ON "NOAA_water_database" DURATION 2d REPLICATION 1
>
```

修改`what_is_time`以使其具有三周的`DURATION`，两个小时的分片组持续时间，并使其成为`NOAA_water_database`的`DEFAULT`保留策略。

```sql
> ALTER RETENTION POLICY "what_is_time" ON "NOAA_water_database" DURATION 3w SHARD DURATION 2h DEFAULT
>
```
在最后一个示例中，` what_is_time`保留其原始复制因子`1`。

成功的`ALTER RETENTION POLICY`查询不返回任何结果。