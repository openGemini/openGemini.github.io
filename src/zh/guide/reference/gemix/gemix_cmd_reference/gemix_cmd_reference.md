---
title: gemix 命令概览
order: 1
---

# gemix 命令概览

gemix 在 openGemini 生态中承担包管理器的功能，管理着 openGemini 生态下众多的组件，如 openGemini、grafana、ts-monitor 等。

## 语法

```shell
gemix [flags] <command> [args...]        # 执行命令
```

使用 `--help` 命令可以获取特定命令的信息，每个命令的摘要都显示了其参数及其用法。必须参数显示在尖括号中，可选参数显示在方括号中。

`<command>` 代表命令名字，支持的命令列表请参考下方[命令清单](#命令清单)。

## 选项

### -v, --version

打印 gemix 的版本

### -h, --help

打印帮助信息

## 命令清单 (Many TODOs)

gemix 包含众多的命令，这些命令又包含了许多子命令，具体命令及其子命令的说明请参考对应的链接：

- [install](/gemix/gemix-command-install.md)：安装组件
- [list](/gemix/gemix-command-list.md)：查看组件列表
- [uninstall](/gemix/gemix-command-uninstall.md)：卸载组件
- [update](/gemix/gemix-command-update.md)：升级已安装的组件
- [status](/gemix/gemix-command-status.md)：查看组件运行状态
- [clean](/gemix/gemix-command-clean.md)：清理组件数据目录
- [completion](/gemix/gemix-command-completion.md)：gemix 命令补全
- [env](/gemix/gemix-command-env.md)：查看 gemix 相关环境变量
- [help](/gemix/gemix-command-help.md)：查看特定命令或组件的帮助文档
- [cluster](./gemix_cluster/)：生产环境 openGemini 集群管理