---
title: Release notes(v1.3.1)
order: 7

---

:::tip

社区版本下载：https://github.com/openGemini/openGemini/releases

:::

openGemini v1.3.1版本是一个补丁版本，主要修复v1.3.0之上的两个问题：

1. 部分场景，备份恢复出现Panic错误

2. 保持与InfluxDB兼容，查询结果数据中的时间（time）默认采用rfc3339格式。

   > 为什么ts-cli返回的数据不是rfc3339格式？
   >
   > 因为ts-cli下发的命令，携带了epoch=ns参数，所以返回的时间是整形的纳秒时间。如果ts-cli需要现实rfc3339格式时间，执行命令`precision rfc3339`即可

3. 取消了单机版本无用的配置项`sqlite-enabled = true`, 该配置项会导致后台打印太多`insertFiles failed`错误日志