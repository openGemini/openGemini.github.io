---
title: Drivers
order: 1
---

## 兼容SDK

openemini兼容InfluxDB，因此可以使用InfluxDB的SDK开发openGemini相关应用，安装和用法Demo可以点击下方连接，在对应github仓库中可以找到。  
- [C/C++](https://github.com/openGemini/openGemini/blob/main)
- [Java](https://github.com/influxdata/influxdb-java)
- [Java(支持集群负载均衡)](https://github.com/xiangyu5632/influxdb-java)
- [JavaScript](https://github.com/node-influx/node-influx)
- [Python](https://github.com/influxdata/influxdb-python)
- [GO](https://github.com/influxdata/influxdb1-client)
- [Ruby](https://github.com/influxdata/influxdb-ruby)
- [PHP](https://github.com/influxdata/influxdb-php)

## 自研SDK

openGemini自研SDK正在开发中，会优先推出Python、Java、Go三种，计划在8月-9月完成
自研SDK的特点
- 负载均衡  
支持连接多个ts-sql，并自动负载均衡
- 客户端缓存  
支持客户端缓存部分查询结果，提升查询效率
- 失败重试  
客户端在遇到网络问题或其他故障时，导致查询或在写入失败，尝试重新建立连接
- 支持Arrow  
客户端支持Arrow协议写入，写入性能在现有基础上再提升300%
- 其他优化  
例如batchsize自动调整
:::tip
以上为规划功能，可能在多个版本中提供
:::
