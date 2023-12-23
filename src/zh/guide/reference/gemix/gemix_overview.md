---
title: gemix 概览
order: 2
---

# gemix 概览

在各种系统软件和应用软件的安装管理中，包管理器均有着广泛的应用，包管理工具的出现大大简化了软件的安装和升级维护工作。例如，几乎所有使用 RPM 的 Linux 都会使用 yum 来进行包管理，而 Anaconda 则可以非常方便地管理 Python 的环境和相关软件包。

在早期的 openGemini 生态中，没有专门的包管理工具，使用者只能通过相应的配置文件和文件夹命名来手动管理，如 Prometheus 等第三方监控报表工具甚至需要额外的特殊管理，这样大大提升了运维管理难度。

从 openGemini 1.1.0 版本开始，gemix 作为新的工具，承担着包管理器的角色，管理着 openGemini 生态下众多的组件，如 ts-meta、ts-sql、ts-store 等。用户想要运行 openGemini 生态中任何组件时，只需要执行 gemix 一行命令即可，相比以前，极大地降低了管理难度。

## 安装 gemix

gemix 安装过程十分简洁，无论是 Darwin 还是 Linux 操作系统，执行一行命令即可安装成功：

```bash
go install github.com/openGemini/gemix@latest
```

该命令将 gemix 安装在 `$GOPATH/bin` 文件夹下，gemix安装的其他组件以及组件运行产生的数据也会放在`$HOME/.gemix`文件夹下。请将 `$GOPATH/bin` 加入到 Shell Profile 文件的 PATH 环境变量中，这样你就可以直接使用 gemix 了。

例如，你可以查看 gemix 的版本：

```bash
gemix --version
```

## gemix 生态介绍

gemix 的直接功能是作为 openGemini 生态中的包管理器，但这并不是它的最终使命。gemix 的愿景是将 openGemini 生态中所有工具的使用门槛降到极致，这个仅仅靠包管理功能是做不到的，还需要引入一些额外的包来丰富这个系统，它们一起加入到 gemix 生态中，让 openGemini 的世界变得更简单。

gemix 系列文档的主要内容就是介绍 gemix 及这些包的功能和使用方式。

在 gemix 生态中，你可以通过在任何命令后加上 `--help` 的方式来获得帮助信息，比如通过以下命令获取 gemix 本身的帮助信息:

```bash
gemix --help
```

```
gemix is a command-line component management tool that can help to download and install
        openGemini platform components to the local system. You can run a specific version via
        "gemix install <componet>[:version]". If no version number is specified, the latest version installed
        locally will be used. If the specified component does not have any version installed locally,
        the latest stable version will be downloaded from the repository.

Usage:
  gemix [command]

Available Commands:
  cluster     Deploy an openGemini cluster for production
  completion  Generate the autocompletion script for the specified shell
  help        Help about any command
  install     install database components
  list        list of available components
  version     gemix version

Flags:
  -h, --help   help for gemix

Use "gemix [command] --help" for more information about a command.
```

输出的帮助信息较长，你可以只关注两部分：

- 可用的命令
    - playground：在本机启动集群 (TODO)
    - cluster：部署用于生产环境的集群
    - list: 可用的组件名称和版本

::: info 注意

- 可用的组件会持续增加，以 `gemix list` 输出结果为准。

- 组件的可用版本列表也会持续增加，以 `gemix list <component>` 输出结果为准。

:::