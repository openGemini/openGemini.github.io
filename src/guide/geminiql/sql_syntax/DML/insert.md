---
order: -1
---

# INSERT

`insert` means write data, data schema is [line protocol](../../../write/line_protocol.md).

## Syntax

```sql
INSERT <line_protocol>
```

## Examples

### Write a data

```sql
INSERT mst,location=China value=1.0
```

### View Schema

```sql
>>> SHOW TAG KEYS FROM "mst"
name: mst
+----------+
| tagKey   |
+----------+
| location |
+----------+
1 columns, 1 rows in set


>>> SHOW FIELD KEYS FROM "mst"
name: mst
+----------+-----------+
| fieldKey | fieldType |
+----------+-----------+
| value    | float     |
+----------+-----------+
2 columns, 1 rows in set
```



