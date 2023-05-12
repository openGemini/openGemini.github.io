---
order: 1
---

# CREATE USER

启用HTTP身份验证后，openGemini 要求至少创建一个管理员用户，然后才能与系统交互。

## 语法

```sql
CREATE USER <username> WITH PASSWORD '<password>' WITH [ALL | PARTITION] PRIVILEGES
```

::: danger

由于安全原因，openGemini 仅支持创建一个管理员用户，且创建之后不允许修改删除。创建用户前，请斟酌考虑`<username>`。

:::

## 示例

### 创建管理员用户

```sql
CREATE USER admin WITH PASSWORD 'your_pwd' WITH ALL PRIVILEGES
```

::: tip

由于安全原因，openGemini 强制密码复杂度要求：必须同时有大小写字母，特殊字符，数字 4种组成，且长度不小于8。

密码字符串必须用单引号引起来，验证请求时，请包含单引号

建议避免在密码中使用单引号（‘）和反斜杠（\）字符，对于包含这些字符\’的密码，在创建密码和提交身份验证请求时，请使用反斜杠对特殊字符进行转义，（例如（））

:::

### 创建普通管理员用户

```sql
CREATE USER rwuser WITH PASSWORD 'your_pwd' WITH PARTITION PRIVILEGES
```