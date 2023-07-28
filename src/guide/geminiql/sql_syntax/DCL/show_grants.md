---
order: 5
---

# SHOW GRANTS
View existing permissions for a given user

## Syntax

```sql
SHOW GRANTS FOR <username>
```

## Examples

```sql
>>> SHOW GRANTS FOR "admin"
+----------+-----------+
| database | privilege |
+----------+-----------+
2 columns, 0 rows in set
```