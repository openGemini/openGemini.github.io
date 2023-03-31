<template><div><h1 id="安装-单机版" tabindex="-1"><a class="header-anchor" href="#安装-单机版" aria-hidden="true">#</a> 安装（单机版）</h1>
<h2 id="快速上手" tabindex="-1"><a class="header-anchor" href="#快速上手" aria-hidden="true">#</a> 快速上手</h2>
<p>本指南介绍如何快速上手体验 openGemini时序数据库。对于非生产环境，你可以选择以下任意一种方式部署openGemini时序数据库：</p>
<ul>
<li>
<p>openEuler操作系统安装</p>
</li>
<li>
<p>下载二进制版本安装部署（支持Linux操作系统和x86、ARM64架构）</p>
<blockquote>
<p>本指南以单机版部署为例，如需了解集群部署，点击<a href="">openGemini集群部署操作步骤</a></p>
</blockquote>
</li>
<li>
<p>源码编译安装部署（支持Linux操作系统和x86、ARM64架构）</p>
<blockquote>
<p>本指南以单机部署为例，如需了解集群部署，点击<a href="">openGemini集群部署操作步骤</a></p>
</blockquote>
</li>
</ul>
<h2 id="openeuler操作系统安装" tabindex="-1"><a class="header-anchor" href="#openeuler操作系统安装" aria-hidden="true">#</a> openEuler操作系统安装</h2>
<p>当前，openGemini 安装包仅添加到openEuler镜像源中，其他Linux操作系统正在进一步完善中</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token operator">></span> yum <span class="token function">install</span> openGemini
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>自动安装成功后，openGemini全部二进制存放位置为/usr/bin，配置文件存放位置为 /etc/openGemini</p>
</blockquote>
<h2 id="下载二进制版本安装步骤" tabindex="-1"><a class="header-anchor" href="#下载二进制版本安装步骤" aria-hidden="true">#</a> 下载二进制版本安装步骤</h2>
<p><strong>下载二进制</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">wget</span> https://github.com/openGemini/openGemini/releases/download/v1.0.0/openGemini-1.0.0-linux-amd64.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>解压二进制压缩包</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token operator">></span> <span class="token function">mkdir</span> openGemini
<span class="token operator">></span> <span class="token function">tar</span> <span class="token parameter variable">-xvf</span> openGemini-1.0.0-linux-amd64.tar.gz <span class="token parameter variable">-C</span> openGemini
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>运行（单机版）</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token operator">></span> <span class="token builtin class-name">cd</span> openGemini
<span class="token operator">></span> ./usr/bin/ts-server <span class="token parameter variable">--config</span> ./etc/openGemini.singlenode.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如需后台运行，执行如下命令</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token operator">></span> <span class="token builtin class-name">cd</span> openGemini
<span class="token operator">></span> ./usr/bin/ts-server <span class="token parameter variable">--config</span> ./etc/openGemini.singlenode.conf <span class="token operator">></span> out.log <span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">&amp;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>运行效果</strong></p>
<figure><img src="@source/zh/guide/1.getting_started/images/image-20230305203415074.png" alt="image-20230305203415074" tabindex="0" loading="lazy"><figcaption>image-20230305203415074</figcaption></figure>
<figure><img src="@source/zh/guide/1.getting_started/images/image-20230305203803221.png" alt="image-20230305203803221" tabindex="0" loading="lazy"><figcaption>image-20230305203803221</figcaption></figure>
<h2 id="源码编译安装步骤" tabindex="-1"><a class="header-anchor" href="#源码编译安装步骤" aria-hidden="true">#</a> 源码编译安装步骤</h2>
<p><strong>编译环境信息</strong></p>
<ul>
<li><a href="https://golang.org/dl/" target="_blank" rel="noopener noreferrer">GO<ExternalLinkIcon/></a> version v1.16+</li>
<li><a href="https://www.python.org/downloads/" target="_blank" rel="noopener noreferrer">Python<ExternalLinkIcon/></a> version v3.7+</li>
</ul>
<p><strong>GO环境变量设置</strong></p>
<p>打开 ~/.profile配置文件，在文件末尾添加如下配置：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 设置GOPATH(需自定义目录)</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">GOPATH</span><span class="token operator">=</span>/path/to/dir
<span class="token comment"># 设置国内代理</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">GOPROXY</span><span class="token operator">=</span>https://goproxy.cn,direct
<span class="token comment"># 开启go mod模式</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">GO111MODULE</span><span class="token operator">=</span>on
<span class="token builtin class-name">export</span> <span class="token assign-left variable">GONOSUMDB</span><span class="token operator">=</span>*
<span class="token builtin class-name">export</span> <span class="token assign-left variable">GOSUMDB</span><span class="token operator">=</span>off
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>下载源码</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token operator">></span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> openGemini-src <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> openGemini-src
<span class="token operator">></span> <span class="token function">git</span> clone https://github.com/openGemini/openGemini.git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>进入主目录</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token operator">></span> <span class="token builtin class-name">cd</span> openGemini
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>编译</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>> python3 build.py
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>运行</strong></p>
<p>编译成功后，二进制保存在主目录下的build目录中</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token operator">></span> <span class="token function">ls</span> build/
ts-cli ts-meta ts-monitor ts-server ts-sql ts-store
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>运行单机版</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token operator">></span> <span class="token function">bash</span> ./scripts/install.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>单机运行效果（参考前面章节中二进制安装运行效果）</p>
</blockquote>
<p>运行集群（本地单机环境模拟生产环境集群部署）</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token operator">></span> <span class="token function">bash</span> ./scripts/install.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>运行效果</p>
<figure><img src="@source/zh/guide/1.getting_started/images/image-20230305211833236.png" alt="image-20230305211833236" tabindex="0" loading="lazy"><figcaption>image-20230305211833236</figcaption></figure>
<h2 id="连接opengemini" tabindex="-1"><a class="header-anchor" href="#连接opengemini" aria-hidden="true">#</a> 连接openGemini</h2>
<p>CLI连接</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>> ./build/ts-cli
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>默认连接127.0.0.1:8086</p>
</blockquote>
<h2 id="基本操作" tabindex="-1"><a class="header-anchor" href="#基本操作" aria-hidden="true">#</a> 基本操作</h2>
<p><strong>创建数据库</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>> create database db0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>查看数据库</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>> show databases
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="@source/zh/guide/1.getting_started/images/image-20230305212840383.png" alt="image-20230305212840383" tabindex="0" loading="lazy"><figcaption>image-20230305212840383</figcaption></figure>
<p><strong>写数据</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>> insert cpu_load,host="server-01",region="west_cn" value=75.3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>查看表</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>> show measurements
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>查询数据</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>> select * from cpu_load
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>运行效果</strong></p>
<figure><img src="@source/zh/guide/1.getting_started/images/image-20230305213443733.png" alt="image-20230305213443733" tabindex="0" loading="lazy"><figcaption>image-20230305213443733</figcaption></figure>
</div></template>


