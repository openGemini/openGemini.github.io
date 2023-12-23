---
title: gemix cluster install
order: 1
---

# gemix cluster install

命令 `gemix cluster install` 用于部署一个全新的集群。

## 语法

```shell
gemix cluster install <cluster-name> <version> <topology.yaml> [flags]
```

- `<cluster-name>` 表示新集群的名字，不能和现有集群同名
- `<version>` 为要部署的 openGemini集群版本号，如 `v1.1.1`
- `<topology.yaml>` 为事先编写好的[拓扑文件](/gemix/gemix-cluster-topology-reference)

## 选项

### -u, --user（string，默认为当前执行命令的用户）

指定连接目标机器的用户名，该用户在目标机器上需要有免密 sudo root 的权限。

### -k, --key（string，默认 ~/.ssh/id_rsa）

指定连接目标机器的密钥文件。

### -p, --password

- 在连接目标机器时使用密码登录，不可和 `-k/--key` 同时使用。
- 数据类型：`BOOLEAN`
- 该选项默认关闭，默认值为 `false`。在命令中添加该选项，并传入 `true` 值或不传值，均可开启此功能。

### --skip-create-user

- 在部署集群时，gemix-cluster 会先检查拓扑文件中指定的用户名是否存在，如果不存在就会创建一个。指定 `--skip-create-user` 选项后不再检查用户是否存在，直接跳过创建步骤。
- 数据类型：`BOOLEAN`
- 该选项默认关闭，默认值为 `false`。在命令中添加该选项，并传入 `true` 值或不传值，均可开启此功能。

### -h, --help

- 输出帮助信息。
- 数据类型：`BOOLEAN`
- 该选项默认关闭，默认值为 `false`。在命令中添加该选项，并传入 `true` 值或不传值，均可开启此功能。

## 输出

部署日志。
