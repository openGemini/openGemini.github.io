---
title: Manage databases 
order: 1
---

## CREATE DATABASE

### Syntax

```sql
CREATE DATABASE <database_name> [WITH [DURATION <duration>] [REPLICATION <n>] [SHARD DURATION <duration>] [NAME <retention-policy-name>]]
```
#### \<database_name\>   
represents the db name
#### DURATION \<duration\>
represents how long the data keeps in openGemini, which is one of the attributes of the data retention policy
#### SHARD DURATION \<duration\>
represents the time range of each shard in a shardGroup

There does not return any information when excute the command ```create database``` or repeated execute the command.

### Examples

#### Create database

```sql
> CREATE DATABASE "NOAA_water_database"
```
This query creates a database named `NOAA_water_database`.

By default, openGemini also creates the default retention policy `autogen` and associates it with the database `NOAA_water_database`.

#### Create a database with specific retention policies

```sql
> CREATE DATABASE "NOAA_water_database" WITH DURATION 3d REPLICATION 1 SHARD DURATION 1h NAME "rp3d"
```

This operation creates a database with the name `NOAA_water_database`. It also creates a default retention policy for `NOAA_water_database` with the name `rp3d`, data is kept in the database for 3 days, data replication is 1, and the time range for each shard is 1 hour.

**related entries** [Retention policy](./retention_policy.md)

## SHOW DATABASES

Returns a list of all databases in openGemini.

### Syntax

```sql
SHOW DATABASES
```

### Examples


```sql
> SHOW DATABASES
name: databases
+---------------------+
| name                |
+---------------------+
| NOAA_water_database |
+---------------------+
1 columns, 1 rows in set
```
openGemini has one database: `NOAA_water_database`.

## DROP DATABASE

`DROP DATABASE` will drop a database and removes all database's data include measurements, series, continuous queries, and retention policies.

### Syntax

```sql
DROP DATABASE <database_name>
```
### Examples
delete db 'NOAA_water_database'
```sql
> DROP DATABASE "NOAA_water_database"
```

`DROP DATABASE` returns no results when the command excution successful. openGemini will not return an error if you delete a non-existing database.
