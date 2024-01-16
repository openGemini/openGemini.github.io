import{_ as t,X as s,Y as d,$ as e,a1 as i,Z as o,a0 as a,a3 as l,C as r}from"./framework-1e2d737a.js";const u={},c={class:"hint-container tip"},v=e("p",{class:"hint-container-title"},"提示",-1),m=e("li",null,[e("strong",null,"ts-sql"),i("为无状态节点，扩容不涉及数据迁移")],-1),b=e("li",null,[e("strong",null,"ts-meta"),i("无需扩容")],-1),q=e("strong",null,"ts-store",-1),g=e("br",null,null,-1),p=e("strong",null,"举个例子：",-1),h=l(`<p>以扩ts-store组件为例，按部署方式可分为三种情况：</p><ol><li><strong>新增组件ts-store部署在已有节点上，该节点已存在ts-store组件</strong><br> 这种情况下，ts-store的各个端口需要重新分配。<br> 部署方式如图所示：</li></ol><figure><img src="https://user-images.githubusercontent.com/49023462/200800553-73d0bb25-de2c-4cf2-b401-8d8ddb00ded2.png" alt="6" tabindex="0" loading="lazy"><figcaption>6</figcaption></figure><p>为新增节点单独准备配置文件，具体配置如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[common]
# 保持不变
meta-join = [meta-join = [&quot;192.168.0.1:8092&quot;, &quot;192.168.0.2:8092&quot;, &quot;192.168.0.3:8092&quot;]
…
[data]
store-ingest-addr = &quot;192.168.0.3:8402&quot;
store-select-addr = &quot;192.168.0.3:8403&quot;
store-data-dir = &quot;/path/to/openGemini/data/2&quot;
store-wal-dir = &quot;/path/to/openGemini/data/2&quot;
store-meta-dir = &quot;/path/to/openGemini/data/meta/2&quot;
…
[logging]
# 建议修改目录
path = &quot;/path/openGemini/logs&quot;
[gossip]
bind-address = &quot;192.168.0.3&quot;
store-bind-port = 8012
# 保持不变
members = [&quot;192.168.0.1:8010&quot;, &quot;192.168.0.2:8010&quot;, &quot;192.168.0.3:8010&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li><strong>新增组件ts-store部署在已有节点上，该节点无ts-store组件</strong><br> 这种情况下，不需要重新分配端口，除非端口被其他应用程序占用。<br> 部署方式如图所示：</li></ol><figure><img src="https://user-images.githubusercontent.com/49023462/200800580-2d1b0f70-fb89-42bd-864f-29da12cd3336.png" alt="7" tabindex="0" loading="lazy"><figcaption>7</figcaption></figure><p>可以该节点其他组件共用同一个配置文件，只需修改ts-store对应的配置项即可(IP和目录)</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[data]
store-ingest-addr = &quot;192.168.0.2:8400&quot;
store-select-addr = &quot;192.168.0.2:8401&quot;
store-data-dir = &quot;/path/to/openGemini/data/1&quot;
store-wal-dir = &quot;/path/to/openGemini/data/1&quot;
store-meta-dir = &quot;/path/to/openGemini/data/meta/1&quot;
…
[logging]
# 建议修改目录
path = &quot;/path/openGemini/logs&quot;
[gossip]
bind-address = &quot;192.168.0.2&quot;
store-bind-port = 8011
# 保持不变
members = [&quot;192.168.0.1:8010&quot;, &quot;192.168.0.2:8010&quot;, &quot;192.168.0.3:8010&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li><strong>新增组件ts-store部署在新节点上，该节点无ts-store组件</strong><br> 这种情况下，不需要重新分配端口，除非端口被其他应用程序占用。<br> 部署方式如图所示：</li></ol><figure><img src="https://user-images.githubusercontent.com/49023462/200800601-896711db-17ee-45c5-8cee-1b9f4d342e63.png" alt="8" tabindex="0" loading="lazy"><figcaption>8</figcaption></figure><p>配置文件的配置与第二种情况一样</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[common]
# 保持不变
meta-join = [meta-join = [&quot;192.168.0.1:8092&quot;, &quot;192.168.0.2:8092&quot;, &quot;192.168.0.3:8092&quot;]
…
[data]
store-ingest-addr = &quot;192.168.0.4:8400&quot;
store-select-addr = &quot;192.168.0.4:8401&quot;
store-data-dir = &quot;/path/to/openGemini/data/1&quot;
store-wal-dir = &quot;/path/to/openGemini/data/1&quot;
store-meta-dir = &quot;/path/to/openGemini/data/meta/1&quot;
…
[logging]
# 建议修改目录
path = &quot;/path/openGemini/logs&quot;
[gossip]
bind-address = &quot;192.168.0.4&quot;
store-bind-port = 8011
# 保持不变
members = [&quot;192.168.0.1:8010&quot;, &quot;192.168.0.2:8010&quot;, &quot;192.168.0.3:8010&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13);function _(f,x){const n=r("font");return s(),d("div",null,[e("div",c,[v,e("ul",null,[m,b,e("li",null,[q,i("在本地存储数据，扩容后，新写入的数据会写到新加入的节点上，不涉及数据迁移。"),o(n,{color:"red"},{default:a(()=>[i("需要注意的是，ts-store扩容后，并不意味着立刻就能往新的节点写数据，必须要等到新的shardgroup duration开始后才会写入新数据到新节点，默认情况下，数据按时间线打散，新节点的数据只是一部分时间线数据。")]),_:1}),g,p,i(" 假设从2022年8月1日开始计算，shardgroup duration为7天，如果8月3日集群扩容了ts-store节点，那么要等到8月8日，新的shardgroup duration周期开启后才有数据写入新节点。")])])]),h])}const j=t(u,[["render",_],["__file","add_node.html.vue"]]);export{j as default};
