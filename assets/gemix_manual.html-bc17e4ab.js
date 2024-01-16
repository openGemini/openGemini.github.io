import{_ as l,X as d,Y as c,$ as s,a1 as e,Z as n,a0 as t,a3 as i,C as r}from"./framework-1e2d737a.js";const p="/assets/topology-4c18ae7d.png",u="/assets/share_dir-ceafb323.png",m={},v=s("p",null,"本文主要介绍Gemix如何使用，欢迎大家试用和反馈。",-1),g={href:"https://github.com/openGemini/gemix",target:"_blank",rel:"noopener noreferrer"},b={href:"https://github.com/openGemini/gemix/issues",target:"_blank",rel:"noopener noreferrer"},h=i(`<h2 id="gemix-概览" tabindex="-1"><a class="header-anchor" href="#gemix-概览" aria-hidden="true">#</a> Gemix 概览</h2><p>在各种系统软件和应用软件的安装管理中，包管理器有着广泛的应用，包管理工具的出现大大简化了软件的安装和升级维护工作。例如，几乎所有使用 RPM 的 Linux 都会使用 yum 来进行包管理，而 Anaconda 则可以非常方便地管理 Python 的环境和相关软件包。</p><p>在早期的 openGemini 生态中，没有专门的包管理工具，使用者只能通过相应的配置文件和文件夹命名来手动管理，由于openGemini组件多，配置参数多，配置问题是社区收到反馈最多的问题，为此我们希望开发一款工具，帮助大家更容易安装和运维openGemini。</p><p>在业界，我们看到Tiup工具做的非常好，参考之下，社区开发了Gemix，它是一款openGemini 运维工具，第一阶段主要完成了openGemini集群安装、集群启停、集群卸载、集群监控（自带Grafana的监控模板）等功能，您只需规划好集群的各组件分布，无需再配置繁杂的集群配置文件，就可以实现一键安装部署。</p><h2 id="安装-gemix" tabindex="-1"><a class="header-anchor" href="#安装-gemix" aria-hidden="true">#</a> 安装 Gemix</h2><p>执行如下命令安装 gemix 工具</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span> go <span class="token function">install</span> github.com/openGemini/gemix@latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>安装成功后，gemix二进制保存在$GOPATH/bin目录。如果是国内用户，安装失败，建议配置GOPROXY</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span> <span class="token builtin class-name">export</span> <span class="token assign-left variable">GOPROXY</span><span class="token operator">=</span>https://goproxy.cn
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="使用gemix部署opengemini集群" tabindex="-1"><a class="header-anchor" href="#使用gemix部署opengemini集群" aria-hidden="true">#</a> 使用Gemix部署openGemini集群</h2><p>安装好gemix后，就可以使用gemix部署openGemini集群了</p><h3 id="_1-初始化集群拓扑文件" tabindex="-1"><a class="header-anchor" href="#_1-初始化集群拓扑文件" aria-hidden="true">#</a> 1. 初始化集群拓扑文件</h3><p>执行如下命令，生成集群初始化配置文件：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span> gemix cluster template <span class="token operator">&gt;</span> topology.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-配置集群拓扑文件" tabindex="-1"><a class="header-anchor" href="#_2-配置集群拓扑文件" aria-hidden="true">#</a> 2. 配置集群拓扑文件</h3><p>打开配置文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&gt; vim topology.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>配置文件topology.yaml分为如下7个部分，主要是为了告诉gemix工具，在哪些机器部署哪些组件，每个组件需要安装到目标机器什么位置，各组件的数据和日志存放到机器什么位置，是否需要部署集群监控和监控面板等。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>global:
	...
monitored:
	...
ts_meta_servers:
	...
ts_sql_servers:
	...
ts_store_servers:
	...
grafana_servers:
	...
server_configs:
	...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="global" tabindex="-1"><a class="header-anchor" href="#global" aria-hidden="true">#</a> <strong>global</strong></h4><p>global主要配置项如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  ### The user who runs the openGemini cluster.
  user: &quot;root&quot;
  ### group is used to specify the group name the user belong to if it&#39;s not the same as user.
  # group: &quot;root&quot;
  ### Storage directory for cluster deployment files, startup scripts, and configuration files.
  deploy_dir: &quot;/var/lib/openGemini/deploy&quot;
  ### openGemini Cluster log file storage directory.
  log_dir: &quot;/var/lib/openGemini/logs&quot;
  ### openGemini Cluster data storage directory
  data_dir: &quot;/gemini-data/meta&quot;
  # operating system, linux/darwin.
  os: &quot;linux&quot;
  # Supported values: &quot;amd64&quot;, &quot;arm64&quot; (default: &quot;amd64&quot;).
  arch: &quot;amd64&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>user</code> 和<code> group</code> 指定部署openGemini的机器的用户名和用户组，如果不存在该用户，gemix会自动创建该用户，并加入用户组。默认为<code>root</code></p><p><code>deploy_dir</code>指定openGemini组件，如ts-sql，ts-store等二进制的安装目录。<strong>这里配置了，后面可不再配置</strong></p><p><code>log_dir</code>指定openGemini各组件对应日志文件的存放目录。<strong>这里配置了，后面可不再配置</strong></p><p><code>data_dir</code> 指定openGemini组件（ts-store、ts-meta）的数据存放目录。<strong>这里配置了，后面可不再配置</strong>，但一般来说，ts-store会存储业务数据、WAL数据等，ts-meta会存储集群元数据、快照数据等，建议后面单独配置，使用不同目录进行区分，比如ts-store的数据目录为 /gemini-data/data, ts-meta的数据目录为/gemini-data/meta</p><p><code>os</code>和<code>arch</code>分别指定部署机器的操作系统类型和对应CPU架构，用于下载对应的版本。目前暂不支持Windows。</p><h4 id="monitored" tabindex="-1"><a class="header-anchor" href="#monitored" aria-hidden="true">#</a> monitored</h4>`,28),_=i(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  ### Enable ts-monitor instance for all the machines
  ts_monitor_enabled: true
  ### Storage directory for deployment files, startup scripts, and configuration files of monitoring components.
  # deploy_dir: &quot;/var/lib/openGemini/deploy&quot;
  ### Log storage directory of the ts-monitor component.
  # log_dir: &quot;/var/lib/openGemini/logs&quot;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>ts_monitor_enabled</code>为<code>true</code>表示需要为openGemini部署集群监控，<code>false</code>则不会安装</p><p><code>deploy_dir</code>和<code>log_dir</code>表示采集集群监控指标的组件被部署的目录和产生的日志存储目录。在前面的<code>global</code>中若有配置deploy_dir，则这里可不用配置。</p><h4 id="ts-meta-servers" tabindex="-1"><a class="header-anchor" href="#ts-meta-servers" aria-hidden="true">#</a> ts_meta_servers</h4><p>ts_meta_servers主要配置部署openGemini的ts-meta组件的机器信息。主要配置项如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>	### The ip address of the ts-meta Server.
  - host: 10.0.1.11
    ### SSH port of the server.
    # ssh_port: 22
    ### Access the ts-meta cluster port. (for devops)
    client_port: 8091
    ### communication port among ts-meta Server nodes.
    # peer_port: 8092
    ### communication raft port among ts-meta Server nodes.
    # raft_port: 8088
    ### communication gossip port among ts-meta and ts-store Server nodes.
    # gossip_port: 8010
    ### ts-meta Server deployment file, startup script, configuration file storage directory.
    deploy_dir: &quot;/var/lib/openGemini/deploy&quot;
    ### ts-meta Server logs storage directory.
    log_dir: &quot;/var/lib/openGemini/logs&quot;
    ### ts-meta Server meta data storage directory.
    data_dir: &quot;/var/lib/openGemini/meta&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),k=s("p",null,"这里以ts-meta部署在三台不同虚拟机为例",-1),f=s("p",null,[s("code",null,"host"),e("指定部署ts-meta的其中第一台机器IP地址")],-1),x=s("code",null,"client_port",-1),y=s("code",null,"peer_port",-1),q=s("code",null,"raft_port",-1),G=s("code",null,"gossip_port",-1),S=i(`<p><code>deploy_dir</code>指定ts-meta二进制的存放目录，<strong>在前面的<code>global</code>中若有配置deploy_dir，则这里可不用配置。</strong></p><p><code>log_dir</code>指定ts-meta的日志存放目录，<strong>在前面的<code>global</code>中若有配置log_dir，则这里可不用配置。</strong></p><p><code>data_dir</code>指定ts-meta存放数据的目录，建议配置</p><p>上述为一个节点的配置，其余两个节点的配置可参考上述配置。总结起来，绝大多数情况下，只需配置<code>host</code>和<code>data_dir</code>即可。</p><h4 id="ts-sql-servers" tabindex="-1"><a class="header-anchor" href="#ts-sql-servers" aria-hidden="true">#</a> ts_sql_servers</h4><p>ts_sql_servers主要配置部署openGemini的ts-sql组件的机器信息。主要配置项如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>	### The ip address of the ts-sql Server.
  - host: 10.0.1.14
    ### Access the openGemini cluster port.
    # port: 8086
    ### ts-sql Server deployment file, startup script, configuration file storage directory.
    deploy_dir: &quot;/var/lib/openGemini/deploy&quot;
    ### ts-sql Server logs storage directory.
    log_dir: &quot;/var/lib/openGemini/logs&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>host</code>指定部署ts-sql的机器IP地址</p>`,8),R=s("code",null,"port",-1),P=i(`<p><code>deploy_dir</code>指定ts-sql二进制的存放目录，<strong>在前面的<code>global</code>中若有配置deploy_dir，则这里可不用配置。</strong></p><p><code>log_dir</code>指定ts-sql的日志存放目录，<strong>在前面的<code>global</code>中若有配置log_dir，则这里可不用配置。</strong></p><p>若需要部署多个ts-sql，可参考上述配置多台机器信息。</p><h4 id="ts-store-servers" tabindex="-1"><a class="header-anchor" href="#ts-store-servers" aria-hidden="true">#</a> ts_store_servers</h4><p>ts_sql_servers主要配置部署openGemini的ts-store组件的机器信息。主要配置项如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>	### The ip address of the ts-store Server.
	- host: 10.0.1.14
    ### ingest data port
    # ingest_port: 8400
    ### select data port
    # select_port: 8401
    ### communication gossip port among ts-meta and ts-store Server nodes.
    # gossip_port: 8011
    ### ts-store Server deployment file, startup script, configuration file storage directory.
    deploy_dir: &quot;/var/lib/openGemini/deploy&quot;
    ### ts-store Server logs storage directory.
    log_dir: &quot;/var/lib/openGemini/logs&quot;
    ### ts-store Server meta data storage directory.
    data_dir: &quot;/var/lib/openGemini/data&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>host</code>指定部署ts-store的机器IP地址</p>`,7),z=s("code",null,"ingest_port",-1),I=s("code",null,"select_port",-1),O=s("code",null,"gossip_port",-1),w=i(`<p><code>deploy_dir</code>指定ts-store二进制的存放目录，<strong>在前面的<code>global</code>中若有配置deploy_dir，则这里可不用配置。</strong></p><p><code>log_dir</code>指定ts-store的日志存放目录，<strong>在前面的<code>global</code>中若有配置log_dir，则这里可不用配置。</strong></p><p><code>data_dir</code>指定ts-store存放数据的目录，建议配置</p><p>若需要部署多个ts-store，可参考上述配置多台机器信息。</p><h4 id="grafana-servers" tabindex="-1"><a class="header-anchor" href="#grafana-servers" aria-hidden="true">#</a> grafana_servers</h4><p>grafana_servers主要配置部署Grafana的机器信息。主要配置项如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>	### The ip address of the Grafana Server.
  - host: 10.0.1.17
    ### Grafana Web monitoring service client (browser) access port
    # port: 3000
    ### Grafana deployment file, startup script, configuration file storage directory.
    # deploy_dir: /var/lib/openGemini/deploy/grafana-3000
    ### grafana dashboard dir on gemix machine
    # dashboard_dir: /home/gemini/dashboards
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>host</code>指定部署Grafana的机器IP地址</p><p><code>port</code>可以保持默认。除非要修改Grafana服务的监听端口</p><p><code>deploy_dir</code>指定Grafana的安装目录，<strong>在前面的<code>global</code>中若有配置deploy_dir，则这里可不用配置。</strong></p><p><code>dashboard_dir</code>指定存放openGemini监控面板模板的目录，<strong>建议配置。</strong></p><h4 id="server-configs" tabindex="-1"><a class="header-anchor" href="#server-configs" aria-hidden="true">#</a> server_configs</h4><p>server_configs 用于配置具体的openGemini内核组件，生成各组件的配置文件，主要配置项如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  # server_configs:
  # ts-meta:
  # ts-sql:
  # ts-store:
  # ts-monitor:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14),E=s("code",null,"ts-sql",-1),T=s("code",null,"ts-store",-1),L=s("code",null,"ts-meta",-1),C=i(`<p><code>ts-monitor</code>：ts-monitor 服务的相关配置，完整配置请参考 <a href="">ts-monitor 配置文件描述</a></p><h3 id="_3-部署集群" tabindex="-1"><a class="header-anchor" href="#_3-部署集群" aria-hidden="true">#</a> 3. 部署集群</h3><p>上述配置文件准备好之后，就可以执行如下命令开始部署openGemini集群</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span> gemix cluster <span class="token function">install</span> gemini_test v1.1.1 ./topology.yaml <span class="token parameter variable">--user</span> root <span class="token parameter variable">-p</span> --skip-create-user
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这条命令会部署一个名为<code>gemini_test</code>的openGemini集群，部署的openGemini版本为<code>v1.1.1</code>，集群部署的拓扑文件是<code>topology.yaml</code>，部署时访问机器的方式是用户名+密码，用户名为<code>root</code>，<code>--skip-create-user</code>跳过对root用户的创建。</p><p><strong>国内用户如果访问github存在网络问题，可以执行如下命令进行安装</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span> <span class="token assign-left variable">GEMIX_MIRRORS_REPO</span><span class="token operator">=</span>gitee.com gemix cluster <span class="token function">install</span> gemini_test v1.1.1 ./topology.yaml <span class="token parameter variable">--user</span> root <span class="token parameter variable">-p</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>GEMIX_MIRRORS_REPO=gitee.com</code>环境变量将指定从国内Gitee上下载openGemini的二进制版本。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>⚠️ 值得注意的是，选择从Gitee下载版本，只能安装v1.1.1及以上版本。</p></div><p>如果使用密钥方式</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span> gemix cluster <span class="token function">install</span> gemini_test v1.1.1 ./topology.yaml <span class="token parameter variable">--user</span> root <span class="token parameter variable">-k</span> /home/root/.ssh/id_rsa
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果配置了免密登录</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&gt; gemix cluster install gemini_test v1.1.1 ./topology.yaml --user root
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>一般情况下 gemix 会在目标机器上创建 topology.yaml 中约定的用户和组，以下情况例外：</p><ul><li><code>topology.yaml</code> 中设置的用户名在目标机器上已存在。</li><li>在命令行上使用了参数 <code>--skip-create-user</code> 明确指定跳过创建用户的步骤。</li></ul></div><h3 id="_4-集群启动" tabindex="-1"><a class="header-anchor" href="#_4-集群启动" aria-hidden="true">#</a> 4. 集群启动</h3><p>使用以下命令会将所有实例节点的相关进程启动。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span> gemix cluster start gemini-test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>预期结果输出 <code>Started cluster gemini-test successfully</code>，表示启动成功。</p><h3 id="_5-集群下线" tabindex="-1"><a class="header-anchor" href="#_5-集群下线" aria-hidden="true">#</a> 5.集群下线</h3><p>使用以下命令会将所有实例节点的相关进程退出。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span> gemix cluster stop gemini-test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>预期结果输出 <code>Stop cluster gemini-test successfully</code>，表示下线成功。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>集群部署好之后，如果重新修改了ts-sql或者ts-store的配置文件，则需要将集群重启，具体操作方式为先将集群下线，再重新启动。</p><p>若是修改了topology.yaml，则需要重新安装</p></div><h3 id="_6-集群卸载" tabindex="-1"><a class="header-anchor" href="#_6-集群卸载" aria-hidden="true">#</a> 6.集群卸载</h3><p>当业务下线之后，如果想将集群占有的机器释放出来让给其他业务使用，执行如下命令将销毁集群</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span> gemix cluster uninstall
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>执行该命令需要谨慎：</p><ul><li>停止集群</li><li>对于每个服务，删除其日志目录，部署目录，数据目录</li><li>如果各个服务的数据目录/部署目录的父目录是由 gemix-cluster 创建的，也一并删除</li></ul><h2 id="配置示例" tabindex="-1"><a class="header-anchor" href="#配置示例" aria-hidden="true">#</a> 配置示例</h2><figure><img src="`+p+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>以三台虚拟机部署openGemini集群为例, 额外一台机器作为运行gemix的执行机器，再一台机器用于部署Grafana，拓扑配置文件示例如下：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">global</span><span class="token punctuation">:</span>
  <span class="token key atrule">user</span><span class="token punctuation">:</span> <span class="token string">&quot;root&quot;</span>
  <span class="token key atrule">deploy_dir</span><span class="token punctuation">:</span> <span class="token string">&quot;/usr/local/openGemini&quot;</span>
  <span class="token key atrule">log_dir</span><span class="token punctuation">:</span> <span class="token string">&quot;/var/openGemini/logs&quot;</span>
  <span class="token key atrule">os</span><span class="token punctuation">:</span> <span class="token string">&quot;linux&quot;</span>
  <span class="token key atrule">arch</span><span class="token punctuation">:</span> <span class="token string">&quot;amd64&quot;</span>
<span class="token key atrule">monitored</span><span class="token punctuation">:</span>
	<span class="token key atrule">ts_monitor_enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">ts_meta_servers</span><span class="token punctuation">:</span>
	<span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> 10.0.1.11
		<span class="token key atrule">data_dir</span><span class="token punctuation">:</span> <span class="token string">&quot;/var/openGemini/data/meta&quot;</span>
	<span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> 10.0.1.12
		<span class="token key atrule">data_dir</span><span class="token punctuation">:</span> <span class="token string">&quot;/var/openGemini/data/meta&quot;</span>
	<span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> 10.0.1.13
		<span class="token key atrule">data_dir</span><span class="token punctuation">:</span> <span class="token string">&quot;/var/openGemini/data/meta&quot;</span>
<span class="token key atrule">ts_sql_servers</span><span class="token punctuation">:</span>
	<span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> 10.0.1.11
	<span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> 10.0.1.12
<span class="token key atrule">ts_store_servers</span><span class="token punctuation">:</span>
	<span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> 10.0.1.11
		<span class="token key atrule">data_dir</span><span class="token punctuation">:</span> <span class="token string">&quot;/var/openGemini/data/data&quot;</span>
	<span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> 10.0.1.12
		<span class="token key atrule">data_dir</span><span class="token punctuation">:</span> <span class="token string">&quot;/var/openGemini/data/data&quot;</span>
	<span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> 10.0.1.13
		<span class="token key atrule">data_dir</span><span class="token punctuation">:</span> <span class="token string">&quot;/var/openGemini/data/data&quot;</span>
<span class="token key atrule">grafana_servers</span><span class="token punctuation">:</span>
	<span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> 10.0.1.14
<span class="token key atrule">server_configs</span><span class="token punctuation">:</span>
	<span class="token key atrule">ts-sql</span><span class="token punctuation">:</span>
	  <span class="token comment"># 修改鉴权配置</span>
		<span class="token key atrule">http.auth-enabled</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
	<span class="token key atrule">ts-store</span><span class="token punctuation">:</span>
	  <span class="token comment"># 修改ts-store的wal文件目录</span>
		<span class="token key atrule">data.store-wal-dir</span><span class="token punctuation">:</span> <span class="token string">&quot;/var/openGemini/data/wal&quot;</span>
	<span class="token key atrule">ts-monitor</span><span class="token punctuation">:</span>
	  <span class="token comment"># 修改存储监控数据的库名，默认为集群名</span>
		<span class="token key atrule">report.database</span><span class="token punctuation">:</span> <span class="token string">&quot;_internal&quot;</span>
    <span class="token comment"># 监控数据默认被写入当前集群的目标数据库中，如果需要将监控数据写入单独节点上的openGemini，可修改地址</span>
    <span class="token key atrule">report.address</span><span class="token punctuation">:</span> <span class="token string">&quot;11.0.1.14:8086&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改ts-sql、ts-store等其他组件启动的配置文件，可以参考示例中的server_configs的文件格式进行配置。</p><div class="hint-container danger"><p class="hint-container-title">警告</p><p>deploy_dir, data_dir, log_dir <strong>不支持使用共享目录</strong>，否则会出现不可预料的问题。</p><img src="`+u+'" style="zoom:50%;"></div>',34);function A(M,X){const o=r("ExternalLinkIcon"),a=r("RouterLink");return d(),c("div",null,[v,s("p",null,[e("仓库地址："),s("a",g,[e("https://github.com/openGemini/gemix"),n(o)])]),s("p",null,[e("问题反馈："),s("a",b,[e("https://github.com/openGemini/gemix/issues"),n(o)])]),h,s("p",null,[e("monitored是配置是否需要为openGemini部署集群监控（参考"),n(a,{to:"/zh/maintenance/monitor.html"},{default:t(()=>[e("集群监控")]),_:1}),e("），其主要配置项如下")]),_,s("p",null,[e("部署ts-meta组件，openGemini要求ts-meta要部署三个节点，以确保元数据的可靠性。一般建议部署在三台不同的虚拟机或物理机上，ts-meta可以与ts-store，ts-sql合部在一台机器上。如果希望两个及以上ts-meta要部署在同一台机器上，需要参考"),n(a,{to:"/zh/guide/reference/ports.html"},{default:t(()=>[e("openGemini端口矩阵")]),_:1}),e("对ts-meta的相关端口进行调整，避免出现端口冲突。")]),k,f,s("p",null,[x,e(", "),y,e(", "),q,e(", "),G,e("等保持默认。除非要修改对应端口号，参考"),n(a,{to:"/zh/guide/reference/ports.html"},{default:t(()=>[e("openGemini端口矩阵")]),_:1})]),S,s("p",null,[R,e("可以保持默认。除非要修改对应端口号，参考"),n(a,{to:"/zh/guide/reference/ports.html"},{default:t(()=>[e("openGemini端口矩阵")]),_:1})]),P,s("p",null,[z,e(", "),I,e(", "),O,e("可以保持默认。除非要修改对应端口号，参考"),n(a,{to:"/zh/guide/reference/ports.html"},{default:t(()=>[e("openGemini端口矩阵")]),_:1})]),w,s("p",null,[E,e("：ts-sql 服务的相关配置，完整配置请参考 "),n(a,{to:"/zh/guide/reference/configurations.html#http"},{default:t(()=>[e("ts-sql配置文件描述")]),_:1})]),s("p",null,[T,e("：ts-store 服务的相关配置，完整配置请参考 "),n(a,{to:"/zh/guide/reference/configurations.html#data"},{default:t(()=>[e("ts-store 配置文件描述")]),_:1})]),s("p",null,[L,e("：ts-meta 服务的相关配置，完整配置请参考 "),n(a,{to:"/zh/guide/reference/configurations.html#meta"},{default:t(()=>[e("ts-meta 配置文件描述")]),_:1})]),C])}const V=l(m,[["render",A],["__file","gemix_manual.html.vue"]]);export{V as default};
