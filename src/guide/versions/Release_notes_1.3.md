---
title: Release notes(v1.3.0)
order: 2
---

openGemini v1.3.0 further improves the stability and reliability of cluster data replica based on v1.3.0-rc.1 and fixes multiple bugs found in v1.2.0.

## Future

1. `SHOW MEASUREMENTS` support *`limit`* and *`offset`* clauses

2. A new command, ‘show measurements detail with measurement = xxx’, is added to view the **Index**, **Shard key**, **Engine Type**, **Tag Keys**, and **Field keys** of measurement. Previously, at least 3 or 4 commands were required to query the above information.

   ```sql
   > show measurements detail with measurement = mst
   name: mst
   tags: Retention policy=rp0
   +--------------------------------+
   |             Detail             |
   +--------------------------------+
   | INDEX: <nil>                   |
   | SHARD KEY: <nil>               |
   | ENGINE TYPE: tsstore           |
   | TAG KEYS: country, name        |
   | FIELD KEYS: address(string),   |
   | age(float), alive(boolean),    |
   | height(integer)                |
   +--------------------------------+
   1 columns, 5 rows in set
   ```

## Fix Bug

1. In v1.2.0, ts-meta has a memory leak. After running for a period of time, its memory usage will be obviously abnormal.

   *--- This problem has been fixed in v1.3.0. It is recommended that you upgrade as soon as possible.*

2. In v1.2.0, the data subscription function will cause abnormal data to be written to the target database, such as adding abnormal column data.

   *--- This problem has been fixed in v1.3.0*

3. In v1.2.0, the query result data may be inaccurate when querying with `limit=xx & order by desc` conditions.

   *--- This problem has been fixed in v1.3.0*

4. In v1.2.0, the following query scenarios may cause process panic.

   Scenario: `select count(*) from (select field1 where tag1='t1' and field2='f2')`

   *--- This issue has been fixed in v1.3.0*

5. In v1.3.0-rc.1, in a cluster data replicas scenario, killing one of the ts-stores may cause large fluctuations in write latency.

   *--- This issue has been fixed in v1.3.0*

6. In v1.3.0-rc.1, in a multi-copy scenario, if one of the three ts-store nodes loses power or loses network connection, it will cause write timeouts for a long time.

   *--- This issue has been fixed in v1.3.0*

7. In  v1.3.0-rc.1 stand-alone , writing data may cause process panic when using the text index

   *--- This issue has been fixed in v1.3.0*

## Special Note

1. openGemini v1.3.0 is compatible with v1.2.0 and can be upgraded directly from v1.2.0 to v1.3.0 without data replicas.

2. The cluster data replica write performance of openGemini v1.3.0 is not good enough, and the community is working on optimizing it. We do not recommend using this feature for projects with high-performance requirements.
