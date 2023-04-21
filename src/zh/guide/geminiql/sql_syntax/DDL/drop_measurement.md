---
order: 10
---

# DROP MEASUREMENT

使用`DROP MEASUREMENT`删除measurement

`DROP MEASUREMENT`查询从指定的measurement中删除所有数据和series，并删除measurement。

查询语法如下：
```sql
DROP MEASUREMENT <measurement_name>
```

Delete the measurement `h2o_feet`:

删除名称为`h2o_feet`的measurement

```sql
> DROP MEASUREMENT "h2o_feet"
```

> **注意：**`DROP MEASUREMENT`会删除measurement中的所有数据点和series。但不会删除相关联的连续查询。

成功的`DROP MEASUREMENT`查询不返回任何结果。

> **警告：** 当前，openGemini不支持带有DROP MEASUREMENTS的正则表达式。有关更多信息，请参阅GitHub问题[#4275](https://github.com/influxdb/influxdb/issues/4275)。