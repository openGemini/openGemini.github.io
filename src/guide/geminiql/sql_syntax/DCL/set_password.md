---
order: 6
---

# SET PASSWORD
Reset Password

## Syntax

```sql
SET PASSWORD FOR <username> = '<password>'
```

## Examples

```sql
SET PASSWORD FOR "todd" = 'your_pwd'
```

::: tip

The password string must be enclosed in single quotes to validate the request

It is recommended to avoid using single quotes (') and backslash (\\) characters in passwords, and for passwords containing these characters \\', use a backslash to escape special characters when creating passwords and submitting authentication requests, (e.g. ())

:::