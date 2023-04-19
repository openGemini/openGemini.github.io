---
order: 2
---

# GRANT

grant `READ`, `WRITE` or `ALL` 现有用户的数据库特权

## 语法

```sql
GRANT [READ,WRITE,ALL] ON <database_name> TO <username>
```

## 示例

授权`todd`对 `NOAA_water_database` 数据库读权限:

```sql
GRANT READ ON "NOAA_water_database" TO "todd"
```

授权`todd`对`NOAA_water_database` 数据库所有权限:

```sql
GRANT ALL ON "NOAA_water_database" TO "todd"
```