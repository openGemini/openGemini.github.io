---
order: 1
---

# CREATE USER

With HTTP authentication enabled, openGemini requires at least one administrator user to be created before you can interact with the system.

## Syntax

```sql
CREATE USER <username> WITH PASSWORD '<password>' WITH [ALL | PARTITION] PRIVILEGES
```

::: danger

For security reasons, openGemini only supports the creation of one administrator user, and does not allow modification or deletion after creation. Before creating a user, please consider `<username>`.

:::

## Examples

### Create administrator user

```sql
CREATE USER admin WITH PASSWORD 'your_pwd' WITH ALL PRIVILEGES
```

::: tip

For security reasons, openGemini imposes a password complexity requirement of 4 types of passwords: upper and lower case letters, special characters, and numbers, with a length of not less than 8.

The password string must be enclosed in single quotes to validate the request

It is recommended to avoid using single quotes (') and backslash (\\) characters in passwords, and for passwords containing these characters \\', use a backslash to escape special characters when creating passwords and submitting authentication requests, (e.g. ())

:::

### Create a general administrator user

```sql
CREATE USER rwuser WITH PASSWORD 'your_pwd' WITH PARTITION PRIVILEGES
```