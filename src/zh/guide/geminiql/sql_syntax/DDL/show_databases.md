---
order: 11
---

# SHOW DATABASES (查看已创建的所有数据库)

返回实例上所有数据库的列表。

## 语法

```sql
SHOW DATABASES
```

## 示例

### 运行 `SHOW DATABASES` 查询语句

```sql
>>> SHOW DATABASES
name: databases
+---------------------+
| name                |
+---------------------+
| NOAA_water_database |
+---------------------+
1 columns, 1 rows in set
```

该查询以表格格式返回数据库名称，这个实例有一个数据库：`NOAA_water_database`。
