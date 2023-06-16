---
order: 1
---

# SHOW DATABASES

Returns a list of all databases on the instance.

## Syntax

```sql
SHOW DATABASES
```

## Examples

### Run the `SHOW DATABASES` query statement

```sql
>>> SHOW DATABASES
name: databases
+---------------------+
| name                |
+---------------------+
| NOAA_water_database |
+---------------------+
1 columns, 1 rows in set
```

The query returns the database name in tabular format. This instance has a database: `NOAA_water_database`.
