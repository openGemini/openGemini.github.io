---
title: Install & Deployment
order: 1
---

This section introduces how to quickly get started with the openGemini temporal database. For non-production environments, you can choose to deploy the openGemini temporal database by one of the following ways.

This guide takes standalone deployment as an example. To learn about cluster deployment, please click on [deploy_cluster](./deploy_cluster.md) to view the details.

## Installation

::: tabs

@tab Linux-x86

1. Go to [GitHub Release](https://github.com/openGemini/openGemini/releases) to copy the link of the latest version.

    > Please replace **`<version>`** with the version of downloaded installation package.

    ```bash
    > wget https://github.com/openGemini/openGemini/releases/download/v<version>/openGemini-<version>-linux-amd64.tar.gz
    ```

     Manually downloading the corresponding installation package is also OK.

2. Move to the directory of the installation package, use `tar` to unzip.

   ```shell
   > mkdir openGemini
   > tar -zxvf openGemini-<version>-linux-amd64.tar.gz -C openGemini
   ```

   `ts-server` is the the standalone version of binary system. 
   `openGemini.singlenode.conf` is the configuration file which adapts to `ts-server`.

@tab Linux-arm

1. Go to [GitHub Release](https://github.com/openGemini/openGemini/releases) to copy the link of the latest version.

   > Please replace **`<version>`** with the version of downloaded installation package.

   ```bash
   > wget https://github.com/openGemini/openGemini/releases/download/v<version>/openGemini-<version>-linux-arm64.tar.gz
   ```

    Manually downloading the corresponding installation package is also OK.

2. Move to the directory of the installation package, use `tar` to unzip.

   ```shell
   > mkdir openGemini
   > tar -zxvf openGemini-<version>-linux-arm64.tar.gz -C openGemini
   ```

   `ts-server` is the the standalone version of binary system. 
   `openGemini.singlenode.conf` is the configuration file which adapts to `ts-server`.

@tab openEuler
Currently, the openGemini installation package is only added to the openEuler image source. Other Linux operating systems are further improving.

```bash
> yum install openGemini
```

After the automatic installation is successful, all binary files of openGemini are stored in /usr/bin, and configuration files are stored in /etc/openGemini

@tab Source code compilation

**Information of compiling environments**

- [GO](https://go.dev/dl/) version v1.18+
- [Python](https://www.python.org/downloads/) version v3.7+
- [Git](https://git-scm.com/downloads)

**GO environmental variable settings**

Open `~/.profile` configuration file, add the following configuration at the end of the file:

```shell
# Set GOPATH (Need to customize directory)
export GOPATH=/path/to/dir
# Set domestic proxy
export GOPROXY=https://goproxy.cn,direct
# Open go mod mode
export GO111MODULE=on
export GONOSUMDB=*
export GOSUMDB=off
```

**Download source code**

```shell
> git clone https://github.com/openGemini/openGemini.git
```

**Move to the main directory**

```shell
> cd openGemini
```

**Compile**

```shell
> python3 build.py --clean
```

After successfully compiled, binary files are saved in the `build` directory。

**Run a standalone version**

```shell
> bash ./scripts/install.sh
```

:::

## Run

**Move to the directory where ts-server is saved, run**

```shell
./ts-server
```

::: warning

If `v1.0.1` and version before, running `ts-server` equires specifying a configuration file to start:

```shell
./ts-server -config /path/to/openGemini.singlenode.conf
```

To start in the background:

```shell
nohup ./ts-server > server_extra.log 2>&1 &
```

:::

## Command Line (ts-cli)

To facilitate the execution of various queries in the database, openGemini provides a command-line application (hereinafter referred to as openGemini CLI) ts cli. To enter the openGemini command line, simply enter the directory where `ts-cli` is located and execute `ts-cli` in the terminal.

```sh
> ./ts-cli
```

::: tip

Connect to 127.0.0.1:8086 in default. Connect to other host by the following command:

```shell
> ./ts-cli -host 192.168.0.1 -port 8086
```

For more usage, please use the following command to explore on your own:

```shell
> ./ts-cli -h
```

:::

## Basic Operations

**Create a database**

```sql
> create database db0
```

**Look up the database**

```sql
> show databases
```

Effects

```sql
> create database db0
Elapsed: 1.446074ms
> show databases
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

**Use the database**

```sql
> use db0
```

**Write in data**

```sql
> insert cpu_load,host="server-01",region="west_cn" value=75.3
```

**Look up table**

```sql
> show measurements
```

**Look up data**

```sql
> select * from cpu_load
```

Effects

```sql
> use db0
Elapsed: 251ns
> insert cpu_load,host="server-01",region="west_cn" value=75.3
Elapsed: 162.328339ms
> show measurements
name: measurements
+----------+
| name     |
+----------+
| cpu_load |
| mst      |
+----------+
1 columns, 2 rows in set

Elapsed: 13.374945ms
> select * from cpu_load
name: cpu_load
+---------------------+-------------+-----------+-------+
| time                | host        | region    | value |
+---------------------+-------------+-----------+-------+
| 1681483835745490423 | "server-01" | "west_cn" | 75.3  |
+---------------------+-------------+-----------+-------+
4 columns, 1 rows in set

Elapsed: 3.259995ms
```

## Attention

`ts-server` is a standalone binary file of OpenGemini, which can be simply understood as `ts-server` consisted of a`ts-sql`,a`ts-meta` and a `ts-store`. Attention:

1. If the default configuration cannot meet the requirements, configuration file `openGemini.singlenode.conf` is needed to start. For the complete configuration items and meanings, please refer to [Management - Configuration Items](../reference/configurations.md).
2. The data and logs in the default configuration file are saved in `/tmp/openGemini` by default. It is recommended to replace them with another directory to ensure sufficient storage space. If you use `scripts/install.sh` to start, you also need to modify `/tmp/` in the script accordingly.
3. If the port is found to be occupied during startup, the default port in the configuration file can be modified. Please refer to [Management Port Matrix ](../reference/ports.md)for all port purposes.
