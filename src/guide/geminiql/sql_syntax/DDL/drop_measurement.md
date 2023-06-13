---
order: 10
---

# DROP MEASUREMENT

Use `DROP MEASUREMENT` to delete measurement

`DROP MEASUREMENT` removes all data and series from the specified measurement, and deletes the measurement.

The query syntax is as follows:
```sql
DROP MEASUREMENT <measurement_name>
```

Delete the measurement `h2o_feet`:

Delete the measurement with the name `h2o_feet`

```sql
> DROP MEASUREMENT "h2o_feet"
```

::: warning

`DROP MEASUREMENT` will delete all data points and series in measurement.

:::

A successful `DROP MEASUREMENT` query does not return any results.
