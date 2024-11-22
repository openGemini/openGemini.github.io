---
title: Release notes(v1.3.0)
order: 6
---

:::tip

社区版本下载：https://github.com/openGemini/openGemini/releases

:::

openGemini v1.3.0版本是正式发布的社区稳定版本。

openGemini v1.3.0版本在v1.3.0-rc.1版本基础上进一步提升了集群多副本的稳定性和可靠性，并修复了v1.2.0版本中发现的多个Bug。

## Future

1. `SHOW MEASUREMENTS`支持limit 和 offset

2. 新增命令`show measurements detail with measurement = xxx`, 可以查看指定表的Index、Shard key、Engine Type、Tag Keys和Field keys等信息。在之前，查询上述信息至少需要执行3-4条命令。

   ```
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

## Bug

1. v1.2.0版本，ts-meta存在内存泄露，运行一段时间之后，ts-meta的内存占用量会出现明显的异常。

   ---  该问题在v1.3.0中已修复，建议尽快升级。

2. v1.2.0版本，数据订阅（subscribtion）功能会导致写入目标库的数据出现异常，比如新增异常列数据。

   --- 该问题在v1.3.0中已修复

3. v1.2.0版本，查询时带limit=xx & order by desc条件，可能出现查询结果数据不准确。

   --- 该问题在v1.3.0中已修复

4. v1.2.0版本，如下查询场景可能会导致进程Panic。

   场景：`select count(*) from (select field1 where tag1='t1' and field2='f2')`

   --- 该问题在v1.3.0中已修复

5. v1.3.0-rc.1版本，多副本场景下，Kill其中一个ts-store，可能导致写入时延出现较大波动。

   --- 该问题在v1.3.0中已修复

6. v1.3.0-rc.1版本，多副本场景下，三个ts-store节点，其中一个如果掉电或者断网，会导致很长一段时间写入超时的情况。

   --- 该问题在v1.3.0中已修复

7. v1.3.0-rc.1单机版，使用文本索引功能，写入数据可能导致进程Panic

   --- 该问题在v1.3.0中已修复

## 特别说明

1. openGemini v1.3.0版本兼容v1.2.0，在不使用多副本功能的前提下，可以直接从v1.2.0升级到v1.3.0。
2. openGemini v1.3.0版本的集群多副本写入性能不够理想，社区目前正在进一步优化，对于性能要求比较高的项目，不建议使用该功能。
