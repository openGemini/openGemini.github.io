---
order: 11
---

# CREATE RETENTION POLICY


## Syntax
```sql
CREATE RETENTION POLICY <retention_policy_name> ON <database_name> DURATION <duration> REPLICATION <n> [SHARD DURATION <duration>] [DEFAULT]
```

## Syntax Description

### `DURATION`

- The `DURATION` clause determines how long openGemini will retain the data. The minimum duration of the retention policy is one hour and the maximum duration is `INF` (infinite).

### `REPLICATION`

- The `REPLICATION` clause determines how many independent copies of each data point are stored in the cluster, currently only `1` copies are supported.

### `SHARD DURATION`

- Optionally, the `SHARD DURATION` clause determines the time range of the slice group.
- By default, the duration of the slice group is determined by the `DURATION` of the retention policy:

| Retention strategy duration | Slice group duration |
|---|---|
| < 2 days  | 1 hour  |
| >= 2 days and <= 6 months  | 1 day  |
| > 6 months  | 7 days  |

The minimum allowed `SHARD GROUP DURATION` is `1h`.
If the `Create retention policy` query tries to set `SHARD GROUP DURATION` to be less than `1h` and greater than `0s`, openGemini will automatically set `SHARD GROUP DURATION` to `1h`.
If the `CREATE RETENTION POLICY` query tries to set `SHARD GROUP DURATION` to your `0s`, openGemini will automatically set `SHARD GROUP DURATION` according to the defaults listed above.

### `DEFAULT`

Set the new retention policy as the default retention policy for the database. This setting is optional.

## Examples

### Creating a retention policy

```sql
> CREATE RETENTION POLICY "one_day_only" ON "NOAA_water_database" DURATION 1d REPLICATION 1
```
This query creates a retention policy named `one_day_only` for the database `NOAA_water_database` with a duration of `1d` and a replication factor of `1`.

### Creating a default retention policy

```sql
> CREATE RETENTION POLICY "one_day_only" ON "NOAA_water_database" DURATION 23h60m REPLICATION 1 DEFAULT
```

This query creates the same retention policy as the above example, but sets it as the default retention policy for the database.

A successful `CREATE RETENTION POLICY` query does not return any results.

If an attempt is made to create a retention policy with the same name as an existing policy, openGemini will not return an error.
If an attempt is made to create a retention policy with the same name as an existing retention policy, but with different attributes, openGemini will return an error.

::: tip

You can also specify a new retention policy in the `CREATE DATABASE` query.
See [Creating a database with `CREATE DATABASE`](./create_database.md).

:::