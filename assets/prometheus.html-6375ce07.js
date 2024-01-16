import{_ as l,X as r,Y as c,$ as e,a1 as s,Z as n,a0 as p,a3 as t,C as i}from"./framework-1e2d737a.js";const d="/assets/Prometheus-f3d31094.png",u="/assets/prome-2-4eff4db4.png",m="/assets/prome-1-cd3d5b73.png",_={},v=t('<p>Prometheus是一个开源的完整监控解决方案，其对传统监控系统的测试和告警模型进行了彻底的颠覆，形成了基于中央化的规则计算、统一分析和告警的新模型，通过对数据的采集能达到长期趋势分析，对照分析，告警，故障分析与定位，数据可视化等目标。</p><p>Prometheus的本地存储设计可以减少其自身运维和管理的复杂度，同时能够满足一定用户场景的需求。但是本地存储也意味着Prometheus无法长期持久化数据，无法存储大量历史数据，同时也无法灵活扩展和迁移，为保持Prometheus的简单性，Prometheus通过定义两个标准接口(remote_write/remote_read)，让用户可以基于这两个接口对接将数据保存到任意第三方的存储服务中，这种方式在Promthues中称为Remote Storage。</p><p>openGemini+Prometheus的搭配，解决了海量数据存储和长期历史数据存储的问题，与此同时，openGemini具有更加快速的查询效率，更加低成本的数据存储等优点，是Prometheus远端存储数据，数据持久化的一个更优方案。</p><h2 id="方案介绍" tabindex="-1"><a class="header-anchor" href="#方案介绍" aria-hidden="true">#</a> 方案介绍</h2><figure><img src="'+d+'" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure><p>openGemini支持分布式集群部署以及单机部署，可支撑多个Prometheus节点同时写入和查询数据，在本方案中可以额外添加Grafana插件，接入数据源为openGemini或者Prometheus任意节点，尽管在数据可视化方面，Prometheus和Grafana存在一定的功能重叠，但这种解决方案其实是互补的。Prometheus采集的指标更为丰富，并提供强大的查询语言；Grafana作为可视化监控系统，相比Prometheus来说，功能更强大，界面更美观。事实上，DevOps团队在Prometheus之上运行Grafana是非常常见的。</p><h3 id="环境准备" tabindex="-1"><a class="header-anchor" href="#环境准备" aria-hidden="true">#</a> <strong>环境准备</strong></h3>',7),g=e("p",null,"安装Prometheus",-1),h={href:"https://prometheus.io/download/",target:"_blank",rel:"noopener noreferrer"},b=e("p",null,"安装Grafana（可选）",-1),k={href:"https://grafana.com/docs/grafana/latest/setup-grafana/installation/",target:"_blank",rel:"noopener noreferrer"},f=e("h3",{id:"prometheus环境配置",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#prometheus环境配置","aria-hidden":"true"},"#"),s(),e("strong",null,"Prometheus环境配置")],-1),y=e("p",null,"openGemini兼容Prometheus对InfluxDB的远端读写配置，主要使用接口为：/api/v1/prom/read，/api/v1/prom/read/write。",-1),x={href:"https://docs.influxdat",target:"_blank",rel:"noopener noreferrer"},P={href:"http://a.com/influxdb/v1.7/supported_protocols/prometheus/",target:"_blank",rel:"noopener noreferrer"},G=t(`<p>openGemini需要在Prometheus启动之前手动创建对应的数据库。</p><p>修改Prometheus配置文件prometheus.yml：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">&gt;</span> vim prometheus.yml
<span class="token comment"># 在配置文件底部添加：</span>
<span class="token key atrule">remote_write</span><span class="token punctuation">:</span>
<span class="token comment"># ip和端口对应openGemini的节点ip和端口（本地ip可用127.0.0.1，openGemini默认端口为</span>
<span class="token comment"># 8086，db字段表示prometheus数据采集写入的库名）</span>
<span class="token punctuation">-</span> <span class="token key atrule">url</span><span class="token punctuation">:</span> <span class="token string">&quot;http://127.0.0.1:8086/api/v1/prom/write?db=prometheus&quot;</span>
<span class="token key atrule">remote_read</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">url</span><span class="token punctuation">:</span> <span class="token string">&quot;http://127.0.0.1:8086/api/v1/prom/read?db=prometheus&quot;</span>
<span class="token punctuation">&gt;</span> systemctl restart prometheus
<span class="token punctuation">&gt;</span> systemctl status prometheus
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果openGemini开启了鉴权或者启用Https，需要修改对应配置:</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">&gt;</span> vim prometheus.yml
<span class="token comment"># 在配置文件底部添加：</span>
<span class="token key atrule">remote_write</span><span class="token punctuation">:</span>
<span class="token comment"># ip和端口对应openGemini的节点ip和端口（本地ip可用127.0.0.1，openGemini默认端口为</span>
<span class="token comment"># 8086，db字段表示prometheus数据采集写入的库名, username和password为openGemini创建的具体用户名和密码）</span>
<span class="token punctuation">-</span> <span class="token key atrule">url</span><span class="token punctuation">:</span> &quot;https<span class="token punctuation">:</span>//127.0.0.1<span class="token punctuation">:</span>8086/api/v1/prom/write<span class="token punctuation">?</span>
db=prometheus<span class="token important">&amp;u=username&amp;p=password&quot;&quot;</span>
<span class="token key atrule">remote_read</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">url</span><span class="token punctuation">:</span> &quot;https<span class="token punctuation">:</span>//127.0.0.1<span class="token punctuation">:</span>8086/api/v1/prom/read<span class="token punctuation">?</span>
db=prometheus<span class="token important">&amp;u=username&amp;p=password&quot;&quot;</span>
<span class="token punctuation">&gt;</span> systemctl restart prometheus
<span class="token punctuation">&gt;</span> systemctl status prometheus
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="opengemini环境配置" tabindex="-1"><a class="header-anchor" href="#opengemini环境配置" aria-hidden="true">#</a> <strong>openGemini环境配置</strong></h3><p><strong>创建数据库</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&gt;&gt;&gt; create database prometheus
&gt;&gt;&gt; use prometheus
Using database prometheus
### 检查prometheus数据是否正常写入：
&gt;&gt;&gt; show measurements
name: measurements
name
----
go_gc_cycles_automatic_gc_cycles_total
go_gc_cycles_forced_gc_cycles_total
go_gc_cycles_total_gc_cycles_total
go_gc_duration_seconds
go_gc_duration_seconds_count
go_gc_duration_seconds_sum
go_gc_heap_allocs_by_size_bytes_total_bucket
go_gc_heap_allocs_by_size_bytes_total_count
go_gc_heap_allocs_by_size_bytes_total_sum
go_gc_heap_allocs_bytes_total
go_gc_heap_allocs_objects_total
go_gc_heap_frees_by_size_bytes_total_bucket
go_gc_heap_frees_by_size_bytes_total_count
go_gc_heap_frees_by_size_bytes_total_sum
go_gc_heap_frees_bytes_total
go_gc_heap_frees_objects_total
go_gc_heap_goal_bytes
go_gc_heap_objects_objects
go_gc_heap_tiny_allocs_objects_total
go_gc_pauses_seconds_total_bucket
go_gc_pauses_seconds_total_count
go_goroutines
go_info
go_memory_classes_heap_free_bytes
go_memory_classes_heap_objects_bytes
go_memory_classes_heap_released_bytes
go_memory_classes_heap_stacks_bytes
go_memory_classes_heap_unused_bytes
go_memory_classes_metadata_mcache_free_bytes
go_memory_classes_metadata_mcache_inuse_bytes
go_memory_classes_metadata_mspan_free_bytes
up
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="数据可视化" tabindex="-1"><a class="header-anchor" href="#数据可视化" aria-hidden="true">#</a> <strong>数据可视化</strong></h3>`,9),q={href:"http://127.0.0.1:9090",target:"_blank",rel:"noopener noreferrer"},w=t(`<p>执行查询(示例）：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>scrape_duration_seconds{}[1m]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="`+u+`" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure><p>查看Graph示例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查询语句</span>
go_gc_duration_seconds
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+m+'" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure>',6),z={href:"https://grafana.com/docs/grafana/latest/getting-started/get-started-grafana-prometheus/",target:"_blank",rel:"noopener noreferrer"};function j(B,C){const o=i("RouterLink"),a=i("ExternalLinkIcon");return r(),c("div",null,[v,e("p",null,[s("安装openGemini，参考"),n(o,{to:"/zh/guide/quick_start/get_start.html"},{default:p(()=>[s("安装部署")]),_:1})]),g,e("blockquote",null,[e("p",null,[e("a",h,[s("https://prometheus.io/download/"),n(a)])])]),b,e("blockquote",null,[e("p",null,[e("a",k,[s("https://grafana.com/docs/grafana/latest/setup-grafana/installation/"),n(a)])])]),f,y,e("blockquote",null,[e("p",null,[s("参考文档："),e("a",x,[s("https://docs.influxdat"),n(a)])]),e("p",null,[e("a",P,[s("a.com/influxdb/v1.7/supported_protocols/prometheus/"),n(a)])])]),G,e("p",null,[s("进入Prometheus Client界面："),e("a",q,[s("http://127.0.0.1:9090"),n(a)]),s("，实际使用请根据Prometheus节点ip以及进程端口自行切换。")]),w,e("p",null,[s("相关阅读 "),e("a",z,[s("Grafana对接Prometheus "),n(a)])])])}const N=l(_,[["render",j],["__file","prometheus.html.vue"]]);export{N as default};
