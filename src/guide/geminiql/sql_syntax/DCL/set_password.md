---
order: 6
---

# SET PASSWORD
重置密码

## 语法

```sql
SET PASSWORD FOR <username> = '<password>'
```

## 示例

```sql
SET PASSWORD FOR "todd" = 'your_pwd'
```

::: tip

密码字符串必须用单引号引起来，验证请求时，请包含单引号

建议避免在密码中使用单引号（‘）和反斜杠（\）字符，对于包含这些字符\’的密码，在创建密码和提交身份验证请求时，请使用反斜杠对特殊字符进行转义，（例如（））

:::