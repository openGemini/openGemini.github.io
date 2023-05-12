---
order: 3
---

# REVOKE

REVOKE `READ`, `WRITE`, or `ALL` 现有用户的数据库特权

## 语法

```sql
REVOKE [READ,WRITE,ALL] ON <database_name> FROM <username>
```

## 示例

取消 `todd`用户对 `NOAA_water_database` 数据库的写权限:

```sql
REVOKE WRITE ON "NOAA_water_database" FROM "todd"
```

取消 `todd`用户对 `NOAA_water_database` 所有权限：

```sql
REVOKE ALL ON "NOAA_water_database" FROM "todd"
```