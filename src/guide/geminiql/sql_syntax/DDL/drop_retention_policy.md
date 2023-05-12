---
order: 13
---

# DROP RETENTION POLICY
## 语法

删除保留策略中的所有measurement和数据：


> **警告：**  删除保留策略将永久删除保留在保留策略中的所有measurement和数据。


```sql
DROP RETENTION POLICY <retention_policy_name> ON <database_name>
```

在`NOAA_water_database`数据库中删除保留策略`what_is_time`：

```sql
> DROP RETENTION POLICY "what_is_time" ON "NOAA_water_database"
```

成功的`DROP RETENTION POLICY`查询不返回任何结果。
如果尝试删除不存在的保留策略，则openGemini不会返回错误。