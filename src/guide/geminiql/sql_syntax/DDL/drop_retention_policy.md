---
order: 13
---

# DROP RETENTION POLICY
## Syntax

Delete all measurement and data from the retention policy:


> **Warning:** Deleting a retention policy will permanently delete all measurements and data retained in the retention policy.


```sql
DROP RETENTION POLICY <retention_policy_name> ON <database_name>
```

Delete the retention policy `what_is_time` in the `NOAA_water_database` database:

```sql
> DROP RETENTION POLICY "what_is_time" ON "NOAA_water_database"
```

A successful `DROP RETENTION POLICY` query does not return any results.
If an attempt is made to delete a non-existent retention policy, openGemini will not return an error.