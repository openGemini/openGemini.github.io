import{_ as t,X as e,Y as s,a3 as r}from"./framework-1e2d737a.js";const i={},n=r('<h2 id="opengemini集群架构" tabindex="-1"><a class="header-anchor" href="#opengemini集群架构" aria-hidden="true">#</a> openGemini集群架构</h2><figure><img src="https://foruda.gitee.com/images/1682675209590994535/58ceef69_1024705.png" alt="structure" tabindex="0" loading="lazy"><figcaption>structure</figcaption></figure><p>如图所示，openGemini整体上由ts-sql、ts-meta、ts-stores三个组件组成</p><ul><li><strong>ts-sql</strong></li></ul><p>对外提供统一的读写接口。在数据写入方面，校验接收到的数据格式，再根据时间线名称进行hash打散，转发数据到对应的ts-store节点进行存储；在数据查询方面，根据请求生成分布式查询计划，分发各子查询计划到每个ts-store节点，最后汇总数据并返回Client。</p><p>ts-sql是无状态的，可以根据业务负载进行横向扩展。</p><ul><li><strong>ts-meta</strong></li></ul><p>管理数据库系统中的数据库、表、数据分区、数据保留策略、集群等元数据信息。</p><ul><li><strong>ts-store</strong></li></ul><p>数据存储和查询。采用类LSM Tree结构，数据追加写入；数据查询时，执行子查询计划，从倒排索引中检索查询涉及的时间线，数据读取后，根据查询条件过滤数据，再返回数据到ts-sql。</p><p>同样可以根据业务负载进行ts-store节点的横向扩展，暂不支持缩容。</p>',11),o=[n];function a(l,c){return e(),s("div",null,o)}const u=t(i,[["render",a],["__file","structure.html.vue"]]);export{u as default};