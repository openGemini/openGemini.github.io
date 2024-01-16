import{_ as t,X as a,Y as s,$ as e,a1 as n,Z as d,a3 as r,C as l}from"./framework-1e2d737a.js";const o={},c=e("h2",{id:"仓库地址",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#仓库地址","aria-hidden":"true"},"#"),n(" 仓库地址")],-1),u={href:"https://github.com/openGemini/data-migration-tools",target:"_blank",rel:"noopener noreferrer"},v=r(`<p>工具名称是 dataMigrate。 它用于将 InfluxDB 数据迁移到 openGemini。 dataMigrate直接从InfluxDB的TSM文件中读取数据写入openGemini。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>如果源数据库的表存在上千字段时，该工具需要更大的内容，因为在内部要把所有列读取后再组装成行再写入openGemini，这部分比较耗内存资源</p></div><h2 id="快速开始" tabindex="-1"><a class="header-anchor" href="#快速开始" aria-hidden="true">#</a> 快速开始</h2><ul><li><strong>环境信息</strong> Go version &gt;1.16</li></ul><p>Setting Environment Variables</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&gt; export GOPATH=/path/to/dir
&gt; export GO111MODULE=on
&gt; export GONOSUMDB=*
&gt; export GOSUMDB=off
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>编译</strong></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&gt; bash build.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><strong>数据迁移命令</strong></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&gt; dataMigrate --from path/to/tsm-file --to ip:port --database dbname
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Usage: dataMigrate [flags]

-database string
Optional: the database to read
-end string
Optional: the end time to read (RFC3339 format)
-from string
Data storage path (default &quot;/var/lib/Influxdb/data&quot;)
-retention string
Optional: the retention policy to read (requires -database)
-start string
Optional: the start time to read (RFC3339 format)
-to string
Destination host to write data to (default &quot;127.0.0.1:8086&quot;,which is the openGemini service default address)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11);function m(g,p){const i=l("ExternalLinkIcon");return a(),s("div",null,[c,e("p",null,[e("a",u,[n("data-migration-tools"),d(i)])]),v])}const h=t(o,[["render",m],["__file","influxdb2openGemini.html.vue"]]);export{h as default};
