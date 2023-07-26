---
order: 6
---

# References


## Introduction to grammar

go-yacc

## Keywords

```
ALL          ALTER         ANY          AS           ASC         BEGIN
BY           CREATE        CONTINUOUS   DATABASE     DATABASES   DOWNSAMPLE
DOWNSAMPLES  DEFAULT       DELETE       DELAY        DESC        DESTINATIONS
DIAGNOSTICS  DISTINCT      DROP         DURATION     END         EVERY
EXPLAIN      FIELD         FOR          FROM         GRANT       GRANTS
GROUP        GROUPS        IN           INF          INSERT      INTO
KEY           KEYS         KILL         LIMIT        SHOW        MEASUREMENT
MEASUREMENTS  NAME         OFFSET       ON           ORDER       PASSWORD
POLICY        POLICIES     PRIVILEGES   QUERIES      QUERY       READ
REPLICATION   RESAMPLE     RETENTION    REVOKE       SAMPLEINTERVAL
SELECT        SERIES       SET          SHARD        SHARDS      SLIMIT
SOFFSET       STATS        STREAM       STREAMS      SUBSCRIPTION
SUBSCRIPTIONS TAG          TIMEINTERVAL TO           USER        USERS
VALUES        WHERE        WITH         WRITE
```


If you are using the GeminiQL keyword as an identifier, you need to enclose the identifier in double quotes in each query.

The keyword `time` is a special case. `time` can be a continuous query name, a database name, the name of a measurement, the name of a retention policy, and a user name. In these cases, it is not necessary to enclose `time` in double quotes in the query.
`time` cannot be a field key or tag key; openGemini refuses to write data with `time` as a field key or tag key, for which openGemini returns an error.
