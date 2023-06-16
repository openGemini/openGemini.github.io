---
order: 12
---

# ALTER RETENTION POLICY

## Syntax

The `ALTER RETENTION POLICY` query syntax is as follows and must declare at least one reservation policy attribute `DURATION`, `REPLICATION`, `SHARD DURATION` or `DEFAULT`:

```sql
ALTER RETENTION POLICY <retention_policy_name> ON <database_name> DURATION <duration> REPLICATION <n> SHARD DURATION <duration> DEFAULT
```

::: warning

Replication factor `REPLICATION <n>` Supported only 1

:::

## Examples

First, create the retention policy `what_is_time` with the 2d `DURATION`:

```sql
> CREATE RETENTION POLICY "what_is_time" ON "NOAA_water_database" DURATION 2d REPLICATION 1
```

Modify `what_is_time` to have three weeks of `DURATION`, two hours of slice group duration, and make it a `DEFAULT` retention policy for `NOAA_water_database`.

```sql
> ALTER RETENTION POLICY "what_is_time" ON "NOAA_water_database" DURATION 3w SHARD DURATION 2h DEFAULT
```
In the last example, ` what_is_time` retains its original replication factor `1`.

A successful `ALTER RETENTION POLICY` query does not return any results.