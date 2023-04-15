---
order: -1
---

# INSERT

`insert`表示写入数据，数据schema是[行协议](../../../write/line_protocol.md)。

## 语法

```sql
INSERT <line_protocol>
```

## 例子

### 写入一条数据

```sql
INSERT mst,location=China value=1.0
```

### 查看Schema

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



