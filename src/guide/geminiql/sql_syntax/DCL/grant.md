---
order: 2
---

# GRANT

grant `READ`, `WRITE` or `ALL` database privileges for existing users

## Syntax

```sql
GRANT [READ,WRITE,ALL] ON <database_name> TO <username>
```

## Examples

Grant `todd` read access to the `NOAA_water_database` database:

```sql
GRANT READ ON "NOAA_water_database" TO "todd"
```

Grant `todd` all permissions to the `NOAA_water_database` database:

```sql
GRANT ALL ON "NOAA_water_database" TO "todd"
```