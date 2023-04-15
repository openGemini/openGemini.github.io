---
order: 1
---

# 手动安装

本指南介绍如何快速上手体验 openGemini时序数据库。对于非生产环境，你可以选择以下任意一种方式部署openGemini时序数据库。

本指南以单机部署为例，如需了解集群部署，点击[openGemini集群部署操作步骤]()

## 安装

::: tabs

@tab Linux-x86

1. 可以到[GitHub Release](https://github.com/openGemini/openGemini/releases)页面复制最新版本链接

    > 请将 **`<version>`** 替换为下载的安装包版本

    ```bash
    wget https://github.com/openGemini/openGemini/releases/download/v<version>/openGemini-<version>-linux-amd64.tar.gz
    ```

     也可以通过手动下载对应的安装包。

2. 进入到安装包所在目录，使用 `tar` 解压安装包；

   ```shell
   mkdir openGemini
   tar -zxvf openGemini-<version>-linux-amd64.tar.gz -C openGemini
   ```

   `ts-server`就是单机版本的二进制，`openGemini.singlenode.conf`是适用于`ts-server`的配置文件。

@tab Linux-arm

1. 可以到[GitHub Release](https://github.com/openGemini/openGemini/releases)页面复制最新版本链接

   > 请将 **`<version>`** 替换为下载的安装包版本

   ```bash
   wget https://github.com/openGemini/openGemini/releases/download/v<version>/openGemini-<version>-linux-arm64.tar.gz
   ```

    也可以通过手动下载对应的安装包。

2. 进入到安装包所在目录，使用 `tar` 解压安装包；

   ```shell
   mkdir openGemini
   tar -zxvf openGemini-<version>-linux-arm64.tar.gz -C openGemini
   ```

   `ts-server`就是单机版本的二进制，`openGemini.singlenode.conf`是适用于`ts-server`的配置文件。

@tab openEuler

当前，openGemini 安装包仅添加到openEuler镜像源中，其他Linux操作系统正在进一步完善中

```bash
yum install openGemini
```

自动安装成功后，openGemini全部二进制存放位置为/usr/bin，配置文件存放位置为 /etc/openGemini

@tab 源码编译

**编译环境信息**

- [GO](https://go.dev/dl/) version v1.18+
- [Python](https://www.python.org/downloads/) version v3.7+
- [Git](https://git-scm.com/downloads)

**GO环境变量设置**

打开 `~/.profile`配置文件，在文件末尾添加如下配置：

```shell
# 设置GOPATH(需自定义目录)
export GOPATH=/path/to/dir
# 设置国内代理
export GOPROXY=https://goproxy.cn,direct
# 开启go mod模式
export GO111MODULE=on
export GONOSUMDB=*
export GOSUMDB=off
```

**下载源码**

```shell
git clone https://github.com/openGemini/openGemini.git
```

**进入主目录**

```shell
cd openGemini
```

**编译**

```shell
python3 build.py --clean
```

编译成功后，二进制保存在`build`目录中。

**运行单机版**

```shell
bash ./scripts/install.sh
```

:::

## 启动

**进入 ts-server 所在文件夹后，执行**

```shell
./ts-server
```

::: warning

`v1.0.1`及以前版本，运行`ts-server`需要指定配置文件启动：

```shell
./ts-server -config /path/to/openGemini.singlenode.conf
```

如需后台启动：

```shell
nohup ./ts-server > server_extra.log 2>&1 &
```

:::

## openGemini 命令行（ts-cli）

为便于执行数据库（Database）的各种查询，openGemini 提供一命令行应用程序（以下简称为 openGemini CLI）ts-cli。要进入 openGemini 命令行，您只要进入`ts-cli`所在目录，在终端执行`ts-cli` 即可。

```sh
./ts-cli
```

::: tip

默认连接127.0.0.1:8086，可通过以下命令连接其他主机：

```shell
./ts-cli -host 192.168.0.1 -port 8086
```

更多用法请使用如下命令，自行探索：

```shell
./ts-cli -h
```

:::

## 基本操作

**创建数据库**

```sql
> create database db0
```

**查看数据库**

```sql
> show databases
```

运行效果

```sql
>>> create database db0
Elapsed: 1.446074ms
>>> show databases
name: databases
+------+
| name |
+------+
| db0  |
+------+
1 columns, 1 rows in set

Elapsed: 2.178147ms
>>>
```

**使用数据库**

```sql
> use db0
```

**写数据**

```sql
> insert cpu_load,host="server-01",region="west_cn" value=75.3
```

**查看表**

```sql
> show measurements
```

**查询数据**

```sql
> select * from cpu_load
```

运行效果

```sql
>>> use db0
Elapsed: 251ns
>>> insert cpu_load,host="server-01",region="west_cn" value=75.3
Elapsed: 162.328339ms
>>> show measurements
name: measurements
+----------+
| name     |
+----------+
| cpu_load |
| mst      |
+----------+
1 columns, 2 rows in set

Elapsed: 13.374945ms
>>> select * from cpu_load
name: cpu_load
+---------------------+-------------+-----------+-------+
| time                | host        | region    | value |
+---------------------+-------------+-----------+-------+
| 1681483835745490423 | "server-01" | "west_cn" | 75.3  |
+---------------------+-------------+-----------+-------+
4 columns, 1 rows in set

Elapsed: 3.259995ms
```

## 注意事项

`ts-server`为openGemini的单机版二进制文件，可简单理解为`ts-server`由一个`ts-sql`、一个`ts-meta`和一个`ts-store`组成。 注意事项：

1. 如果默认配置不能满足需求，需要使用配置文件`openGemini.singlenode.conf`启动，完整的配置项和含义参考[管理-配置项](../manage/configurations.md)章节。
2. 默认配置文件中数据、日志等默认保存在`/tmp/openGemini`目录下，建议替换为其他目录，确保有足够的存储空间。如果使用的`scripts/install.sh`脚本启动，还需要对应修改脚本中的`/tmp/`目录。
3. 如果启动过程中发现端口已占用，可以修改配置文件中的默认端口。所有端口用途请参考[管理-端口矩阵](../manage/ports.md)章节。
