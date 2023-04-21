---
order: 9
---

# DROP DATABASE

`DROP DATABASE`查询从指定数据库中删除所有数据，measurement，series，连续查询和保留策略。

查询采语法如下：

```sql
DROP DATABASE <database_name>
```

删除数据库`NOAA_water_database`：
```bash
> DROP DATABASE "NOAA_water_database"
>
```

成功的`DROP DATABASE`命令不返回任何结果。如果删除不存在的数据库，InfluxDB也不会返回错误。