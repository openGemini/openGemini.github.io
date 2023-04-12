---
title: 示例数据
order: 1
---


# 示例数据


```
https://s3.amazonaws.com/noaa.water-database/NOAA_data.txt
```

## 导入数据：
```shell
curl -G  https://s3.amazonaws.com/noaa.water-database/NOAA_data.txt > NOAA_data.txt

influx -import -path=NOAA_data.txt -host=127.0.0.1 -port=8086 -precision=s
```

数据自动导入到 database: NOAA_water_database
