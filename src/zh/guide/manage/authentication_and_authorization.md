---
title: 身份认证和授权
order: 2
---


# 身份认证和授权

## 认证方式
openGemini API和openGemini CLI包含身份验证功能，启用身份验证后，openGemini仅执行验证通过的HTTP请求。

1. 创建至少一个管理员用户，有关如何创建管理员用户，请参见授权部分admin user。
2. 默认情况下，配置文件中禁用身份验证，通过在配置文件中将`auth-enabled`选项设为`true`来开启身份验证。
    > [http]  
    auth-enabled = true
3. 重新启动过程，openGemini将检查每个请求的用户信息，并将仅处理通过验证的用户请求

### 使用API进行验证
如果同时使用基本身份验证和URL查询参数进行身份验证，则查询参数中指定的用户凭据优先，以下示例中查询假定该用户是admin用户，有关不同用户类型，其特权以及有关用户管理的更多信息，请参见授权的部分。
* 基本身份验证
    ```
    curl -G http://localhost:8086/query -u todd:openGemini4ever --data-urlencode "q=SHOW DATABASES"
    ```
* 在URL中使用查询参数
    ```
    curl -G "http://localhost:8086/query?u=todd&p=openGemini4ever" --data-urlencode "q=SHOW DATABASES"
    ```
* 在URL中使用请求正文
    ```
    curl -G http://localhost:8086/query --data-urlencode "u=todd" --data-urlencode "p=openGemini4ever" --data-urlencode "q=SHOW DATABASES"
    ```
### 使用CLI进行验证
* 在启动CLI时通过username和password进行身份验证
    ```
    ts-cli -username xiaoming -password Xiaoming@123
    ```
* 启动CLI后使用auth命令进行验证
    ```
    >>> auth
    username: xiaoming  
    password:  
    Elapesd: 11.7365s  
    >>>
    ```