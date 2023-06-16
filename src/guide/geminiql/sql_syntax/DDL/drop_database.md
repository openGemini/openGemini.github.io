---
order: 9
---

# DROP DATABASE

The `DROP DATABASE` query removes all data from the specified database, measurement, series, continuous queries and retention policies.

The query syntax is as follows:

```sql
DROP DATABASE <database_name>
```

Delete the database `NOAA_water_database`:
```sql
> DROP DATABASE "NOAA_water_database"
```

A successful `DROP DATABASE` command does not return any results. Nor does openGemini return an error if you delete a database that does not exist.