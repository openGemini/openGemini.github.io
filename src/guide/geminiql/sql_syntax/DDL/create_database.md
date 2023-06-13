---
order: 8
---

# CREATE DATABASE

## Syntax

```sql
CREATE DATABASE <database_name> [WITH [DURATION <duration>] [REPLICATION <n>] [SHARD DURATION <duration>] [NAME <retention-policy-name>]]
```

## Syntax Description

`CREATE DATABASE` requires the database name.

The `WITH`, `DURATION`, `REPLICATION`, `SHARD DURATION`, `NAME` clauses and the creation of a single retention policy associated with the database are optional.

If no clause is specified after `WITH`, a reservation policy with the name `autogen` will be created by default.

A successful `CREATE DATABASE` query does not return any results.

If you create a database that already exists, openGemini does not perform any operation, but also does not return an error.

## Examples

### Create database

```sql
> CREATE DATABASE "NOAA_water_database"
```

This query creates a database named `NOAA_water_database`.

By default, openGemini also creates the default retention policy `autogen` and associates it with the database `NOAA_water_database`.

## Create a database with specific retention policies

```sql
> CREATE DATABASE "NOAA_water_database" WITH DURATION 3d REPLICATION 1 SHARD DURATION 1h NAME "liquid"
```

This operation creates a database with the name `NOAA_water_database`. It also creates a default retention policy for `NOAA_water_database` with the name `liquid`, a `DURATION` of 3d, a replication factor of 1, and a slice group duration of 1h.