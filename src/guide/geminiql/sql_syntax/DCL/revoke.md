---
order: 3
---

# REVOKE

REVOKE `READ`, `WRITE`, or `ALL` Database privileges for existing users

## Syntax

```sql
REVOKE [READ,WRITE,ALL] ON <database_name> FROM <username>
```

## Examples

Remove write access to the `NOAA_water_database` database from the `todd` user:

```sql
REVOKE WRITE ON "NOAA_water_database" FROM "todd"
```

Remove all permissions for `NOAA_water_database` from user `todd`:

```sql
REVOKE ALL ON "NOAA_water_database" FROM "todd"
```