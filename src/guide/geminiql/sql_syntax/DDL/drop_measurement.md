---
order: 10
---

# DROP MEASUREMENT

使用`DROP MEASUREMENT`删除measurement

`DROP MEASUREMENT`从指定的measurement中删除所有数据和series，并删除measurement。

查询语法如下：
```sql
DROP MEASUREMENT <measurement_name>
```

Delete the measurement `h2o_feet`:

删除名称为`h2o_feet`的measurement

```sql
> DROP MEASUREMENT "h2o_feet"
```

::: warning

`DROP MEASUREMENT`会删除measurement中的所有数据点和series。

:::

成功的`DROP MEASUREMENT`查询不返回任何结果。
