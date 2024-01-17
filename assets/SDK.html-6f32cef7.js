import{_ as o,X as l,Y as a,$ as e,a1 as n,Z as r,a3 as i,C as s}from"./framework-1e2d737a.js";const h={},c=e("h2",{id:"兼容sdk",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#兼容sdk","aria-hidden":"true"},"#"),n(" 兼容SDK")],-1),d=e("p",null,"openemini兼容InfluxDB，因此可以使用InfluxDB的SDK开发openGemini相关应用，安装和用法Demo可以点击下方连接，在对应github仓库中可以找到。",-1),u={href:"https://github.com/openGemini/openGemini/blob/main",target:"_blank",rel:"noopener noreferrer"},_={href:"https://github.com/influxdata/influxdb-java",target:"_blank",rel:"noopener noreferrer"},f={href:"https://github.com/xiangyu5632/influxdb-java",target:"_blank",rel:"noopener noreferrer"},p={href:"https://github.com/node-influx/node-influx",target:"_blank",rel:"noopener noreferrer"},b={href:"https://github.com/influxdata/influxdb-python",target:"_blank",rel:"noopener noreferrer"},x={href:"https://github.com/influxdata/influxdb1-client",target:"_blank",rel:"noopener noreferrer"},m={href:"https://github.com/influxdata/influxdb-ruby",target:"_blank",rel:"noopener noreferrer"},g={href:"https://github.com/influxdata/influxdb-php",target:"_blank",rel:"noopener noreferrer"},k=i('<h2 id="自研sdk" tabindex="-1"><a class="header-anchor" href="#自研sdk" aria-hidden="true">#</a> 自研SDK</h2><p>openGemini自研SDK正在开发中，会优先推出Python、Java、Go三种，计划在8月-9月完成 自研SDK的特点</p><ul><li>负载均衡<br> 支持连接多个ts-sql，并自动负载均衡</li><li>客户端缓存<br> 支持客户端缓存部分查询结果，提升查询效率</li><li>失败重试<br> 客户端在遇到网络问题或其他故障时，导致查询或在写入失败，尝试重新建立连接</li><li>支持Arrow<br> 客户端支持Arrow协议写入，写入性能在现有基础上再提升300%</li><li>其他优化<br> 例如batchsize自动调整</li></ul><div class="hint-container tip"><p class="hint-container-title">提示</p><p>以上为规划功能，可能在多个版本中提供</p></div>',4);function v(D,S){const t=s("ExternalLinkIcon");return l(),a("div",null,[c,d,e("ul",null,[e("li",null,[e("a",u,[n("C/C++"),r(t)])]),e("li",null,[e("a",_,[n("Java"),r(t)])]),e("li",null,[e("a",f,[n("Java(支持集群负载均衡)"),r(t)])]),e("li",null,[e("a",p,[n("JavaScript"),r(t)])]),e("li",null,[e("a",b,[n("Python"),r(t)])]),e("li",null,[e("a",x,[n("GO"),r(t)])]),e("li",null,[e("a",m,[n("Ruby"),r(t)])]),e("li",null,[e("a",g,[n("PHP"),r(t)])])]),k])}const y=o(h,[["render",v],["__file","SDK.html.vue"]]);export{y as default};