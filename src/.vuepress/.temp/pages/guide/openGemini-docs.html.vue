<template><div><h1 id="文档架构" tabindex="-1"><a class="header-anchor" href="#文档架构" aria-hidden="true">#</a> 文档架构</h1>
<h2 id="关于-opengemini" tabindex="-1"><a class="header-anchor" href="#关于-opengemini" aria-hidden="true">#</a> 关于 openGemini</h2>
<h3 id="opengemini-介绍" tabindex="-1"><a class="header-anchor" href="#opengemini-介绍" aria-hidden="true">#</a> openGemini 介绍</h3>
<h3 id="动机" tabindex="-1"><a class="header-anchor" href="#动机" aria-hidden="true">#</a> 动机</h3>
<h2 id="快速开始" tabindex="-1"><a class="header-anchor" href="#快速开始" aria-hidden="true">#</a> 快速开始</h2>
<h3 id="安装-单机版" tabindex="-1"><a class="header-anchor" href="#安装-单机版" aria-hidden="true">#</a> 安装（单机版）</h3>
<h3 id="快速上手" tabindex="-1"><a class="header-anchor" href="#快速上手" aria-hidden="true">#</a> 快速上手</h3>
<p>已有文章（重写其中的图片）</p>
<h3 id="集群部署" tabindex="-1"><a class="header-anchor" href="#集群部署" aria-hidden="true">#</a> 集群部署</h3>
<h3 id="关键概念" tabindex="-1"><a class="header-anchor" href="#关键概念" aria-hidden="true">#</a> 关键概念</h3>
<h3 id="术语表" tabindex="-1"><a class="header-anchor" href="#术语表" aria-hidden="true">#</a> 术语表</h3>
<h2 id="geminiql" tabindex="-1"><a class="header-anchor" href="#geminiql" aria-hidden="true">#</a> GeminiQL</h2>
<h3 id="示例数据" tabindex="-1"><a class="header-anchor" href="#示例数据" aria-hidden="true">#</a> 示例数据</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>https://s3.amazonaws.com/noaa.water-database/NOAA_data.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="sql-语法" tabindex="-1"><a class="header-anchor" href="#sql-语法" aria-hidden="true">#</a> SQL 语法</h3>
<h4 id="ddl" tabindex="-1"><a class="header-anchor" href="#ddl" aria-hidden="true">#</a> DDL</h4>
<h4 id="dml" tabindex="-1"><a class="header-anchor" href="#dml" aria-hidden="true">#</a> DML</h4>
<ul>
<li>select</li>
<li>create</li>
<li>drop</li>
</ul>
<p>.........................</p>
<h4 id="权限" tabindex="-1"><a class="header-anchor" href="#权限" aria-hidden="true">#</a> 权限</h4>
<ul>
<li>grant</li>
</ul>
<h3 id="聚合算子" tabindex="-1"><a class="header-anchor" href="#聚合算子" aria-hidden="true">#</a> 聚合算子</h3>
<h3 id="数学表达式" tabindex="-1"><a class="header-anchor" href="#数学表达式" aria-hidden="true">#</a> 数学表达式</h3>
<h3 id="数据类型" tabindex="-1"><a class="header-anchor" href="#数据类型" aria-hidden="true">#</a> 数据类型</h3>
<h3 id="子查询" tabindex="-1"><a class="header-anchor" href="#子查询" aria-hidden="true">#</a> 子查询</h3>
<h3 id="geminiql-参考" tabindex="-1"><a class="header-anchor" href="#geminiql-参考" aria-hidden="true">#</a> GeminiQL  参考</h3>
<h4 id="文法介绍" tabindex="-1"><a class="header-anchor" href="#文法介绍" aria-hidden="true">#</a> 文法介绍</h4>
<p>--- 龙玉祥</p>
<h4 id="关键字-keywords" tabindex="-1"><a class="header-anchor" href="#关键字-keywords" aria-hidden="true">#</a> 关键字(Keywords)</h4>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>ALL           ALTER         ANY           AS            ASC           BEGIN
BY            CREATE        CONTINUOUS    DATABASE      DATABASES     DEFAULT
DELETE        DESC          DESTINATIONS  DIAGNOSTICS   DISTINCT      DROP
DURATION      END           EVERY         EXPLAIN       FIELD         FOR
FROM          GRANT         GRANTS        GROUP         GROUPS        IN
INF           INSERT        INTO          KEY           KEYS          KILL
LIMIT         SHOW          MEASUREMENT   MEASUREMENTS  NAME          OFFSET
ON            ORDER         PASSWORD      POLICY        POLICIES      PRIVILEGES
QUERIES       QUERY         READ          REPLICATION   RESAMPLE      RETENTION
REVOKE        SELECT        SERIES        SET           SHARD         SHARDS
SLIMIT        SOFFSET       STATS         SUBSCRIPTION  SUBSCRIPTIONS TAG
TO            USER          USERS         VALUES        WHERE         WITH
WRITE
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果您使用InfluxQL关键字作为<a href="https://influxdb-v1-docs-cn.cnosdb.com/influxdb/v1.8/concepts/glossary/#identifier" target="_blank" rel="noopener noreferrer">标识符<ExternalLinkIcon/></a>，您需要将每个查询中的标识符用双引号括起来。</p>
<p>关键字<code v-pre>time</code>是一个特例。<code v-pre>time</code>可以是一个<a href="https://influxdb-v1-docs-cn.cnosdb.com/influxdb/v1.8/concepts/glossary/#continuous-query-cq" target="_blank" rel="noopener noreferrer">连续查询<ExternalLinkIcon/></a>名字、数据库名字、<a href="https://influxdb-v1-docs-cn.cnosdb.com/influxdb/v1.8/concepts/glossary/#measurement" target="_blank" rel="noopener noreferrer">measurement<ExternalLinkIcon/></a>的名字、<a href="https://influxdb-v1-docs-cn.cnosdb.com/influxdb/v1.8/concepts/glossary/#retention-policy-rp" target="_blank" rel="noopener noreferrer">保留策略<ExternalLinkIcon/></a>名字、<a href="https://influxdb-v1-docs-cn.cnosdb.com/influxdb/v1.8/concepts/glossary/#subscription" target="_blank" rel="noopener noreferrer">subscription<ExternalLinkIcon/></a>的名字和<a href="https://influxdb-v1-docs-cn.cnosdb.com/influxdb/v1.8/concepts/glossary/#user" target="_blank" rel="noopener noreferrer">用户<ExternalLinkIcon/></a>名。在这些情况下，不需要在查询中用双引号将<code v-pre>time</code>括起来。<code v-pre>time</code>不能是field key或tag key；InfluxDB拒绝写入将<code v-pre>time</code>作为<a href="https://influxdb-v1-docs-cn.cnosdb.com/influxdb/v1.8/concepts/glossary/#field-key" target="_blank" rel="noopener noreferrer">field key<ExternalLinkIcon/></a>或<a href="https://influxdb-v1-docs-cn.cnosdb.com/influxdb/v1.8/concepts/glossary/#tag-key" target="_blank" rel="noopener noreferrer">tag key<ExternalLinkIcon/></a>的数据，对于这种数据写入，InfluxDB会返回错误。请查阅<a href="https://influxdb-v1-docs-cn.cnosdb.com/influxdb/v1.8/troubleshooting/frequently-asked-questions/#time" target="_blank" rel="noopener noreferrer">FAQ<ExternalLinkIcon/></a>获得更多相关信息。</p>
<h2 id="数据接入" tabindex="-1"><a class="header-anchor" href="#数据接入" aria-hidden="true">#</a> 数据接入</h2>
<h3 id="常规行协议定义" tabindex="-1"><a class="header-anchor" href="#常规行协议定义" aria-hidden="true">#</a> 常规行协议定义</h3>
<h3 id="tag数组行协议定义" tabindex="-1"><a class="header-anchor" href="#tag数组行协议定义" aria-hidden="true">#</a> tag数组行协议定义</h3>
<h3 id="行协议写入教程" tabindex="-1"><a class="header-anchor" href="#行协议写入教程" aria-hidden="true">#</a> 行协议写入教程</h3>
<h3 id="普罗米修斯远程读写" tabindex="-1"><a class="header-anchor" href="#普罗米修斯远程读写" aria-hidden="true">#</a> 普罗米修斯远程读写</h3>
<h3 id="opentelemetry-otlp" tabindex="-1"><a class="header-anchor" href="#opentelemetry-otlp" aria-hidden="true">#</a> openTelemetry OTLP</h3>
<h2 id="管理" tabindex="-1"><a class="header-anchor" href="#管理" aria-hidden="true">#</a> 管理</h2>
<h3 id="配置项" tabindex="-1"><a class="header-anchor" href="#配置项" aria-hidden="true">#</a> 配置项</h3>
<h3 id="身份认证和授权" tabindex="-1"><a class="header-anchor" href="#身份认证和授权" aria-hidden="true">#</a> 身份认证和授权</h3>
<h3 id="启用https" tabindex="-1"><a class="header-anchor" href="#启用https" aria-hidden="true">#</a> 启用HTTPS</h3>
<h3 id="端口矩阵" tabindex="-1"><a class="header-anchor" href="#端口矩阵" aria-hidden="true">#</a> 端口矩阵</h3>
<h3 id="监控" tabindex="-1"><a class="header-anchor" href="#监控" aria-hidden="true">#</a> 监控</h3>
<h2 id="平台融合" tabindex="-1"><a class="header-anchor" href="#平台融合" aria-hidden="true">#</a> 平台融合</h2>
<h3 id="docker" tabindex="-1"><a class="header-anchor" href="#docker" aria-hidden="true">#</a> Docker</h3>
<h3 id="k8s" tabindex="-1"><a class="header-anchor" href="#k8s" aria-hidden="true">#</a> K8S</h3>
<h2 id="参考指南" tabindex="-1"><a class="header-anchor" href="#参考指南" aria-hidden="true">#</a> 参考指南</h2>
<h3 id="架构" tabindex="-1"><a class="header-anchor" href="#架构" aria-hidden="true">#</a> 架构</h3>
<h4 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h4>
<h4 id="查询引擎" tabindex="-1"><a class="header-anchor" href="#查询引擎" aria-hidden="true">#</a> 查询引擎</h4>
<h4 id="存储引擎" tabindex="-1"><a class="header-anchor" href="#存储引擎" aria-hidden="true">#</a> 存储引擎</h4>
<h3 id="遥测" tabindex="-1"><a class="header-anchor" href="#遥测" aria-hidden="true">#</a> 遥测</h3>
<h3 id="如何将数据从-influxdb-迁移到-opengemini" tabindex="-1"><a class="header-anchor" href="#如何将数据从-influxdb-迁移到-opengemini" aria-hidden="true">#</a> 如何将数据从 influxdb 迁移到 openGemini</h3>
<h2 id="版本发布历史" tabindex="-1"><a class="header-anchor" href="#版本发布历史" aria-hidden="true">#</a> 版本发布历史</h2>
<h3 id="发布版本汇总" tabindex="-1"><a class="header-anchor" href="#发布版本汇总" aria-hidden="true">#</a> 发布版本汇总</h3>
<h3 id="版本规则" tabindex="-1"><a class="header-anchor" href="#版本规则" aria-hidden="true">#</a> 版本规则</h3>
<h2 id="troubleshoot" tabindex="-1"><a class="header-anchor" href="#troubleshoot" aria-hidden="true">#</a> Troubleshoot</h2>
<h3 id="常见问题-faqs" tabindex="-1"><a class="header-anchor" href="#常见问题-faqs" aria-hidden="true">#</a> 常见问题（FAQs）</h3>
<h3 id="常见错误信息及解决方案" tabindex="-1"><a class="header-anchor" href="#常见错误信息及解决方案" aria-hidden="true">#</a> 常见错误信息及解决方案</h3>
</div></template>


