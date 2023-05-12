---
order: 4
---

# SHOW USERS

查看所有现有用户及其管理员状态

## 语法

```sql
SHOW USERS
```

## 示例

```sql
>>> SHOW USERS
+-------+-------+--------+
| user  | admin | rwuser |
+-------+-------+--------+
| admin | admin | false  |
+-------+-------+--------+
3 columns, 1 rows in set
```