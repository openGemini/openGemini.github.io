---
order: 5
---

# SHOW GRANTS
查看指定用户现有权限

## 语法

```sql
SHOW GRANTS FOR <username>
```

## 示例

```sql
>>> SHOW GRANTS FOR "admin"
+----------+-----------+
| database | privilege |
+----------+-----------+
2 columns, 0 rows in set
```