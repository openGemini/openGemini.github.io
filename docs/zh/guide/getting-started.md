# 快速上手

本指南介绍如何快速上手体验 openGemini时序数据库。对于非生产环境，你可以选择以下任意一种方式部署openGemini时序数据库：

- openEuler操作系统安装

- 下载二进制版本安装部署（支持Linux操作系统和x86、ARM64架构）

  > 本指南以单机版部署为例，如需了解集群部署，点击[openGemini集群部署操作步骤]()

- 源码编译安装部署（支持Linux操作系统和x86、ARM64架构）

  > 本指南以单机部署为例，如需了解集群部署，点击[openGemini集群部署操作步骤]()

## openEuler操作系统安装

当前，openGemini 安装包仅添加到openEuler镜像源中，其他Linux操作系统正在进一步完善中

```shell
> yum install openGemini
```

> 自动安装成功后，openGemini全部二进制存放位置为/usr/bin，配置文件存放位置为 /etc/openGemini

## 下载二进制版本安装步骤

**下载二进制**

```shell
wget https://github.com/openGemini/openGemini/releases/download/v1.0.0/openGemini-1.0.0-linux-amd64.tar.gz
```

**解压二进制压缩包**

```shell
> mkdir openGemini
> tar -xvf openGemini-1.0.0-linux-amd64.tar.gz -C openGemini
```

**运行（单机版）**

```shell
> cd openGemini
> ./usr/bin/ts-server --config ./etc/openGemini.singlenode.conf
```

如需后台运行，执行如下命令

```shell
> cd openGemini
> ./usr/bin/ts-server --config ./etc/openGemini.singlenode.conf > out.log 2>&1 &
```

**运行效果**

![image-20230305203415074](./images/image-20230305203415074.png)

![image-20230305203803221](./images/image-20230305203803221.png)

## 源码编译安装步骤

**编译环境信息**

- [GO](https://golang.org/dl/) version v1.16+
- [Python](https://www.python.org/downloads/) version v3.7+

**GO环境变量设置**

打开 ~/.profile配置文件，在文件末尾添加如下配置：

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
> mkdir -p openGemini-src && cd openGemini-src
> git clone https://github.com/openGemini/openGemini.git
```

**进入主目录**

```shell
> cd openGemini
```

**编译**

```
> python3 build.py
```

**运行**

编译成功后，二进制保存在主目录下的build目录中

```shell
> ls build/
ts-cli ts-meta ts-monitor ts-server ts-sql ts-store
```

运行单机版

```shell
> bash ./scripts/install.sh
```

> 单机运行效果（参考前面章节中二进制安装运行效果）

运行集群（本地单机环境模拟生产环境集群部署）

```bash
> bash ./scripts/install.sh
```

运行效果

![image-20230305211833236](./images/image-20230305211833236.png)

## 连接openGemini

CLI连接

```
> ./build/ts-cli
```

> 默认连接127.0.0.1:8086

## 基本操作

**创建数据库**

```
> create database db0
```

**查看数据库**

```
> show databases
```

![image-20230305212840383](./images/image-20230305212840383.png)

**写数据**

```
> insert cpu_load,host="server-01",region="west_cn" value=75.3
```

**查看表**

```
> show measurements
```

**查询数据**

```
> select * from cpu_load
```

**运行效果**

![image-20230305213443733](./images/image-20230305213443733.png)

