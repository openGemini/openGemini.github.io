import{_ as u,X as k,Y as d,Z as e,a0 as a,$ as s,a1 as n,a3 as l,C as i}from"./framework-1e2d737a.js";const m={},b=l(`<p>本章主要包括如下内容</p><ul><li><a href="#show-tag-keys">SHOW TAG KEYS (查看表中所有TAG字段)</a></li><li><a href="#show-tag-values">SHOW TAG VALUES (查看表中所有TAG字段及其对应的值)</a></li><li><a href="#show-field-keys">SHOW FIELD KEYS (查看表中全部Field字段及其数据类型)</a></li><li><a href="#show-series">SHOW SERIES (查看全部时间线)</a></li><li><a href="#show-series-cardinality">SHOW SERIES CARDINALITY (查询时间线统计数量)</a></li><li><a href="#show-shards">SHOW SHARDS (查看数据分片信息)</a></li><li><a href="#show-shard-groups">SHOW SHARD GROUPS(查看分片组信息)</a></li></ul><h2 id="show-tag-keys" tabindex="-1"><a class="header-anchor" href="#show-tag-keys" aria-hidden="true">#</a> SHOW TAG KEYS</h2><p>查看表中所有TAG字段</p><h3 id="语法" tabindex="-1"><a class="header-anchor" href="#语法" aria-hidden="true">#</a> 语法</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SHOW</span> TAG <span class="token keyword">KEYS</span> <span class="token punctuation">[</span><span class="token keyword">ON</span> <span class="token operator">&lt;</span>database_name<span class="token operator">&gt;</span><span class="token punctuation">]</span> <span class="token punctuation">[</span>FROM_clause<span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token keyword">WHERE</span> <span class="token operator">&lt;</span>tag_key<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>operator<span class="token operator">&gt;</span> <span class="token punctuation">[</span><span class="token string">&#39;&lt;tag_value&gt;&#39;</span> <span class="token operator">|</span> <span class="token operator">&lt;</span>regular_expression<span class="token operator">&gt;</span><span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token punctuation">[</span>LIMIT_clause<span class="token punctuation">]</span> <span class="token punctuation">[</span>OFFSET_clause<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果查询中没有包含<code>ON &lt;database_name&gt;</code>，您必须在CLI中使用<code>USE &lt;database_name&gt;</code>指定数据库，或者在openGemini API请求中使用参数<code>db</code>指定数据库。</p><h3 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h3><ul><li><strong>运行带有<code>ON</code>子句的<code>SHOW TAG KEYS</code>查询</strong></li></ul>`,9),v=s("div",{class:"language-sql line-numbers-mode","data-ext":"sql"},[s("pre",{class:"language-sql"},[s("code",null,[s("span",{class:"token operator"},">"),n(),s("span",{class:"token keyword"},"SHOW"),n(" TAG "),s("span",{class:"token keyword"},"KEYS"),n(),s("span",{class:"token keyword"},"ON"),n(),s("span",{class:"token string"},'"NOAA_water_database"'),n(`
name: average_temperature
`),s("span",{class:"token operator"},"+"),s("span",{class:"token comment"},"----------+"),n(`
`),s("span",{class:"token operator"},"|"),n(" tagKey   "),s("span",{class:"token operator"},"|"),n(`
`),s("span",{class:"token operator"},"+"),s("span",{class:"token comment"},"----------+"),n(`
`),s("span",{class:"token operator"},"|"),n(" location "),s("span",{class:"token operator"},"|"),n(`
`),s("span",{class:"token operator"},"+"),s("span",{class:"token comment"},"----------+"),n(`
`),s("span",{class:"token number"},"1"),n(),s("span",{class:"token keyword"},"columns"),s("span",{class:"token punctuation"},","),n(),s("span",{class:"token number"},"1"),n(),s("span",{class:"token keyword"},"rows"),n(),s("span",{class:"token operator"},"in"),n(),s("span",{class:"token keyword"},"set"),n(`

name: h2o_feet
`),s("span",{class:"token operator"},"+"),s("span",{class:"token comment"},"----------+"),n(`
`),s("span",{class:"token operator"},"|"),n(" tagKey   "),s("span",{class:"token operator"},"|"),n(`
`),s("span",{class:"token operator"},"+"),s("span",{class:"token comment"},"----------+"),n(`
`),s("span",{class:"token operator"},"|"),n(" location "),s("span",{class:"token operator"},"|"),n(`
`),s("span",{class:"token operator"},"+"),s("span",{class:"token comment"},"----------+"),n(`
`),s("span",{class:"token number"},"1"),n(),s("span",{class:"token keyword"},"columns"),s("span",{class:"token punctuation"},","),n(),s("span",{class:"token number"},"1"),n(),s("span",{class:"token keyword"},"rows"),n(),s("span",{class:"token operator"},"in"),n(),s("span",{class:"token keyword"},"set"),n(`

name: h2o_pH
`),s("span",{class:"token operator"},"+"),s("span",{class:"token comment"},"----------+"),n(`
`),s("span",{class:"token operator"},"|"),n(" tagKey   "),s("span",{class:"token operator"},"|"),n(`
`),s("span",{class:"token operator"},"+"),s("span",{class:"token comment"},"----------+"),n(`
`),s("span",{class:"token operator"},"|"),n(" location "),s("span",{class:"token operator"},"|"),n(`
`),s("span",{class:"token operator"},"+"),s("span",{class:"token comment"},"----------+"),n(`
`),s("span",{class:"token number"},"1"),n(),s("span",{class:"token keyword"},"columns"),s("span",{class:"token punctuation"},","),n(),s("span",{class:"token number"},"1"),n(),s("span",{class:"token keyword"},"rows"),n(),s("span",{class:"token operator"},"in"),n(),s("span",{class:"token keyword"},"set"),n(`

name: h2o_quality
`),s("span",{class:"token operator"},"+"),s("span",{class:"token comment"},"----------+"),n(`
`),s("span",{class:"token operator"},"|"),n(" tagKey   "),s("span",{class:"token operator"},"|"),n(`
`),s("span",{class:"token operator"},"+"),s("span",{class:"token comment"},"----------+"),n(`
`),s("span",{class:"token operator"},"|"),n(" location "),s("span",{class:"token operator"},"|"),n(`
`),s("span",{class:"token operator"},"|"),n(" randtag  "),s("span",{class:"token operator"},"|"),n(`
`),s("span",{class:"token operator"},"+"),s("span",{class:"token comment"},"----------+"),n(`
`),s("span",{class:"token number"},"1"),n(),s("span",{class:"token keyword"},"columns"),s("span",{class:"token punctuation"},","),n(),s("span",{class:"token number"},"2"),n(),s("span",{class:"token keyword"},"rows"),n(),s("span",{class:"token operator"},"in"),n(),s("span",{class:"token keyword"},"set"),n(`

name: h2o_temperature
`),s("span",{class:"token operator"},"+"),s("span",{class:"token comment"},"----------+"),n(`
`),s("span",{class:"token operator"},"|"),n(" tagKey   "),s("span",{class:"token operator"},"|"),n(`
`),s("span",{class:"token operator"},"+"),s("span",{class:"token comment"},"----------+"),n(`
`),s("span",{class:"token operator"},"|"),n(" location "),s("span",{class:"token operator"},"|"),n(`
`),s("span",{class:"token operator"},"+"),s("span",{class:"token comment"},"----------+"),n(`
`),s("span",{class:"token number"},"1"),n(),s("span",{class:"token keyword"},"columns"),s("span",{class:"token punctuation"},","),n(),s("span",{class:"token number"},"1"),n(),s("span",{class:"token keyword"},"rows"),n(),s("span",{class:"token operator"},"in"),n(),s("span",{class:"token keyword"},"set"),n(`

`)])]),s("div",{class:"line-numbers","aria-hidden":"true"},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1),g=s("p",null,[n("该查询返回数据库"),s("code",null,"NOAA_water_database"),n("中的所有表的tag key。")],-1),_=s("div",{class:"language-sql line-numbers-mode","data-ext":"sql"},[s("pre",{class:"language-sql"},[s("code",null,[s("span",{class:"token operator"},">"),n(" curl "),s("span",{class:"token operator"},"-"),n("G "),s("span",{class:"token string"},'"http://localhost:8086/query?pretty=true"'),n(),s("span",{class:"token comment"},'--data-urlencode "q=SHOW TAG KEYS on NOAA_water_database"'),n(`
{
	`),s("span",{class:"token string"},'"results"'),n(": "),s("span",{class:"token punctuation"},"["),n(`{
		`),s("span",{class:"token string"},'"statement_id"'),n(": "),s("span",{class:"token number"},"0"),s("span",{class:"token punctuation"},","),n(`
		`),s("span",{class:"token string"},'"series"'),n(": "),s("span",{class:"token punctuation"},"["),n(`{
			`),s("span",{class:"token string"},'"name"'),n(": "),s("span",{class:"token string"},'"average_temperature"'),s("span",{class:"token punctuation"},","),n(`
			`),s("span",{class:"token string"},'"columns"'),n(": "),s("span",{class:"token punctuation"},"["),s("span",{class:"token string"},'"tagKey"'),s("span",{class:"token punctuation"},"]"),s("span",{class:"token punctuation"},","),n(`
			`),s("span",{class:"token string"},'"values"'),n(": "),s("span",{class:"token punctuation"},"["),n(`
				`),s("span",{class:"token punctuation"},"["),s("span",{class:"token string"},'"location"'),s("span",{class:"token punctuation"},"]"),n(`
			`),s("span",{class:"token punctuation"},"]"),n(`
		}`),s("span",{class:"token punctuation"},","),n(` {
			`),s("span",{class:"token string"},'"name"'),n(": "),s("span",{class:"token string"},'"h2o_feet"'),s("span",{class:"token punctuation"},","),n(`
			`),s("span",{class:"token string"},'"columns"'),n(": "),s("span",{class:"token punctuation"},"["),s("span",{class:"token string"},'"tagKey"'),s("span",{class:"token punctuation"},"]"),s("span",{class:"token punctuation"},","),n(`
			`),s("span",{class:"token string"},'"values"'),n(": "),s("span",{class:"token punctuation"},"["),n(`
				`),s("span",{class:"token punctuation"},"["),s("span",{class:"token string"},'"location"'),s("span",{class:"token punctuation"},"]"),n(`
			`),s("span",{class:"token punctuation"},"]"),n(`
		}`),s("span",{class:"token punctuation"},","),n(` {
			`),s("span",{class:"token string"},'"name"'),n(": "),s("span",{class:"token string"},'"h2o_pH"'),s("span",{class:"token punctuation"},","),n(`
			`),s("span",{class:"token string"},'"columns"'),n(": "),s("span",{class:"token punctuation"},"["),s("span",{class:"token string"},'"tagKey"'),s("span",{class:"token punctuation"},"]"),s("span",{class:"token punctuation"},","),n(`
			`),s("span",{class:"token string"},'"values"'),n(": "),s("span",{class:"token punctuation"},"["),n(`
				`),s("span",{class:"token punctuation"},"["),s("span",{class:"token string"},'"location"'),s("span",{class:"token punctuation"},"]"),n(`
			`),s("span",{class:"token punctuation"},"]"),n(`
		}`),s("span",{class:"token punctuation"},","),n(` {
			`),s("span",{class:"token string"},'"name"'),n(": "),s("span",{class:"token string"},'"h2o_quality"'),s("span",{class:"token punctuation"},","),n(`
			`),s("span",{class:"token string"},'"columns"'),n(": "),s("span",{class:"token punctuation"},"["),s("span",{class:"token string"},'"tagKey"'),s("span",{class:"token punctuation"},"]"),s("span",{class:"token punctuation"},","),n(`
			`),s("span",{class:"token string"},'"values"'),n(": "),s("span",{class:"token punctuation"},"["),n(`
				`),s("span",{class:"token punctuation"},"["),s("span",{class:"token string"},'"location"'),s("span",{class:"token punctuation"},"]"),s("span",{class:"token punctuation"},","),n(`
				`),s("span",{class:"token punctuation"},"["),s("span",{class:"token string"},'"randtag"'),s("span",{class:"token punctuation"},"]"),n(`
			`),s("span",{class:"token punctuation"},"]"),n(`
		}`),s("span",{class:"token punctuation"},","),n(` {
			`),s("span",{class:"token string"},'"name"'),n(": "),s("span",{class:"token string"},'"h2o_temperature"'),s("span",{class:"token punctuation"},","),n(`
			`),s("span",{class:"token string"},'"columns"'),n(": "),s("span",{class:"token punctuation"},"["),s("span",{class:"token string"},'"tagKey"'),s("span",{class:"token punctuation"},"]"),s("span",{class:"token punctuation"},","),n(`
			`),s("span",{class:"token string"},'"values"'),n(": "),s("span",{class:"token punctuation"},"["),n(`
				`),s("span",{class:"token punctuation"},"["),s("span",{class:"token string"},'"location"'),s("span",{class:"token punctuation"},"]"),n(`
			`),s("span",{class:"token punctuation"},"]"),n(`
		}`),s("span",{class:"token punctuation"},"]"),n(`
	}`),s("span",{class:"token punctuation"},"]"),n(`
}
`)])]),s("div",{class:"line-numbers","aria-hidden":"true"},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1),y=s("ul",null,[s("li",null,[s("strong",null,[n("运行不带有"),s("code",null,"ON"),n("子句的"),s("code",null,"SHOW TAG KEYS"),n("查询")])])],-1),h=s("p",null,[n("使用"),s("code",null,"USE <database_name>"),n("指定数据库：")],-1),w=s("div",{class:"language-sql line-numbers-mode","data-ext":"sql"},[s("pre",{class:"language-sql"},[s("code",null,[s("span",{class:"token operator"},">"),n(),s("span",{class:"token keyword"},"use"),n(` NOAA_water_database
Elapsed: `),s("span",{class:"token number"},"452"),n(`ns
`),s("span",{class:"token operator"},">"),n(),s("span",{class:"token keyword"},"SHOW"),n(" TAG "),s("span",{class:"token keyword"},"KEYS"),n(`
name: average_temperature
`),s("span",{class:"token operator"},"+"),s("span",{class:"token comment"},"----------+"),n(`
`),s("span",{class:"token operator"},"|"),n(" tagKey   "),s("span",{class:"token operator"},"|"),n(`
`),s("span",{class:"token operator"},"+"),s("span",{class:"token comment"},"----------+"),n(`
`),s("span",{class:"token operator"},"|"),n(" location "),s("span",{class:"token operator"},"|"),n(`
`),s("span",{class:"token operator"},"+"),s("span",{class:"token comment"},"----------+"),n(`
`),s("span",{class:"token number"},"1"),n(),s("span",{class:"token keyword"},"columns"),s("span",{class:"token punctuation"},","),n(),s("span",{class:"token number"},"1"),n(),s("span",{class:"token keyword"},"rows"),n(),s("span",{class:"token operator"},"in"),n(),s("span",{class:"token keyword"},"set"),n(`

name: h2o_feet
`),s("span",{class:"token operator"},"+"),s("span",{class:"token comment"},"----------+"),n(`
`),s("span",{class:"token operator"},"|"),n(" tagKey   "),s("span",{class:"token operator"},"|"),n(`
`),s("span",{class:"token operator"},"+"),s("span",{class:"token comment"},"----------+"),n(`
`),s("span",{class:"token operator"},"|"),n(" location "),s("span",{class:"token operator"},"|"),n(`
`),s("span",{class:"token operator"},"+"),s("span",{class:"token comment"},"----------+"),n(`
`),s("span",{class:"token number"},"1"),n(),s("span",{class:"token keyword"},"columns"),s("span",{class:"token punctuation"},","),n(),s("span",{class:"token number"},"1"),n(),s("span",{class:"token keyword"},"rows"),n(),s("span",{class:"token operator"},"in"),n(),s("span",{class:"token keyword"},"set"),n(`

name: h2o_pH
`),s("span",{class:"token operator"},"+"),s("span",{class:"token comment"},"----------+"),n(`
`),s("span",{class:"token operator"},"|"),n(" tagKey   "),s("span",{class:"token operator"},"|"),n(`
`),s("span",{class:"token operator"},"+"),s("span",{class:"token comment"},"----------+"),n(`
`),s("span",{class:"token operator"},"|"),n(" location "),s("span",{class:"token operator"},"|"),n(`
`),s("span",{class:"token operator"},"+"),s("span",{class:"token comment"},"----------+"),n(`
`),s("span",{class:"token number"},"1"),n(),s("span",{class:"token keyword"},"columns"),s("span",{class:"token punctuation"},","),n(),s("span",{class:"token number"},"1"),n(),s("span",{class:"token keyword"},"rows"),n(),s("span",{class:"token operator"},"in"),n(),s("span",{class:"token keyword"},"set"),n(`

name: h2o_quality
`),s("span",{class:"token operator"},"+"),s("span",{class:"token comment"},"----------+"),n(`
`),s("span",{class:"token operator"},"|"),n(" tagKey   "),s("span",{class:"token operator"},"|"),n(`
`),s("span",{class:"token operator"},"+"),s("span",{class:"token comment"},"----------+"),n(`
`),s("span",{class:"token operator"},"|"),n(" location "),s("span",{class:"token operator"},"|"),n(`
`),s("span",{class:"token operator"},"|"),n(" randtag  "),s("span",{class:"token operator"},"|"),n(`
`),s("span",{class:"token operator"},"+"),s("span",{class:"token comment"},"----------+"),n(`
`),s("span",{class:"token number"},"1"),n(),s("span",{class:"token keyword"},"columns"),s("span",{class:"token punctuation"},","),n(),s("span",{class:"token number"},"2"),n(),s("span",{class:"token keyword"},"rows"),n(),s("span",{class:"token operator"},"in"),n(),s("span",{class:"token keyword"},"set"),n(`

name: h2o_temperature
`),s("span",{class:"token operator"},"+"),s("span",{class:"token comment"},"----------+"),n(`
`),s("span",{class:"token operator"},"|"),n(" tagKey   "),s("span",{class:"token operator"},"|"),n(`
`),s("span",{class:"token operator"},"+"),s("span",{class:"token comment"},"----------+"),n(`
`),s("span",{class:"token operator"},"|"),n(" location "),s("span",{class:"token operator"},"|"),n(`
`),s("span",{class:"token operator"},"+"),s("span",{class:"token comment"},"----------+"),n(`
`),s("span",{class:"token number"},"1"),n(),s("span",{class:"token keyword"},"columns"),s("span",{class:"token punctuation"},","),n(),s("span",{class:"token number"},"1"),n(),s("span",{class:"token keyword"},"rows"),n(),s("span",{class:"token operator"},"in"),n(),s("span",{class:"token keyword"},"set"),n(`
`)])]),s("div",{class:"line-numbers","aria-hidden":"true"},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1),T=s("p",null,[n("使用参数"),s("code",null,"db"),n("指定数据库")],-1),A=s("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[s("pre",{class:"language-bash"},[s("code",null,[s("span",{class:"token operator"},">"),n(),s("span",{class:"token function"},"curl"),n(),s("span",{class:"token parameter variable"},"-G"),n(),s("span",{class:"token string"},'"http://localhost:8086/query?db=NOAA_water_database&pretty=true"'),n(" --data-urlencode "),s("span",{class:"token string"},'"q=SHOW TAG KEYS"'),n(`
`),s("span",{class:"token punctuation"},"{"),n(`
	`),s("span",{class:"token string"},'"results"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token punctuation"},"["),s("span",{class:"token punctuation"},"{"),n(`
		`),s("span",{class:"token string"},'"statement_id"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token number"},"0"),n(`,
		`),s("span",{class:"token string"},'"series"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token punctuation"},"["),s("span",{class:"token punctuation"},"{"),n(`
				`),s("span",{class:"token string"},'"name"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token string"},'"average_temperature"'),n(`,
				`),s("span",{class:"token string"},'"columns"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token punctuation"},"["),n(`
					`),s("span",{class:"token string"},'"tagKey"'),n(`
				`),s("span",{class:"token punctuation"},"]"),n(`,
				`),s("span",{class:"token string"},'"values"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token punctuation"},"["),n(`
					`),s("span",{class:"token punctuation"},"["),n(`
						`),s("span",{class:"token string"},'"location"'),n(`
					`),s("span",{class:"token punctuation"},"]"),n(`
				`),s("span",{class:"token punctuation"},"]"),n(`
			`),s("span",{class:"token punctuation"},"}"),n(`,
			`),s("span",{class:"token punctuation"},"{"),n(`
				`),s("span",{class:"token string"},'"name"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token string"},'"h2o_feet"'),n(`,
				`),s("span",{class:"token string"},'"columns"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token punctuation"},"["),n(`
					`),s("span",{class:"token string"},'"tagKey"'),n(`
				`),s("span",{class:"token punctuation"},"]"),n(`,
				`),s("span",{class:"token string"},'"values"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token punctuation"},"["),n(`
					`),s("span",{class:"token punctuation"},"["),n(`
						`),s("span",{class:"token string"},'"location"'),n(`
					`),s("span",{class:"token punctuation"},"]"),n(`
				`),s("span",{class:"token punctuation"},"]"),n(`
			`),s("span",{class:"token punctuation"},"}"),n(`,
			`),s("span",{class:"token punctuation"},"{"),n(`
				`),s("span",{class:"token string"},'"name"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token string"},'"h2o_pH"'),n(`,
				`),s("span",{class:"token string"},'"columns"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token punctuation"},"["),n(`
					`),s("span",{class:"token string"},'"tagKey"'),n(`
				`),s("span",{class:"token punctuation"},"]"),n(`,
				`),s("span",{class:"token string"},'"values"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token punctuation"},"["),n(`
					`),s("span",{class:"token punctuation"},"["),n(`
						`),s("span",{class:"token string"},'"location"'),n(`
					`),s("span",{class:"token punctuation"},"]"),n(`
				`),s("span",{class:"token punctuation"},"]"),n(`
			`),s("span",{class:"token punctuation"},"}"),n(`,
			`),s("span",{class:"token punctuation"},"{"),n(`
				`),s("span",{class:"token string"},'"name"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token string"},'"h2o_quality"'),n(`,
				`),s("span",{class:"token string"},'"columns"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token punctuation"},"["),n(`
					`),s("span",{class:"token string"},'"tagKey"'),n(`
				`),s("span",{class:"token punctuation"},"]"),n(`,
				`),s("span",{class:"token string"},'"values"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token punctuation"},"["),n(`
					`),s("span",{class:"token punctuation"},"["),n(`
						`),s("span",{class:"token string"},'"location"'),n(`
					`),s("span",{class:"token punctuation"},"]"),n(`,
					`),s("span",{class:"token punctuation"},"["),n(`
						`),s("span",{class:"token string"},'"randtag"'),n(`
					`),s("span",{class:"token punctuation"},"]"),n(`
				`),s("span",{class:"token punctuation"},"]"),n(`
			`),s("span",{class:"token punctuation"},"}"),n(`,
			`),s("span",{class:"token punctuation"},"{"),n(`
				`),s("span",{class:"token string"},'"name"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token string"},'"h2o_temperature"'),n(`,
				`),s("span",{class:"token string"},'"columns"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token punctuation"},"["),n(`
					`),s("span",{class:"token string"},'"tagKey"'),n(`
				`),s("span",{class:"token punctuation"},"]"),n(`,
				`),s("span",{class:"token string"},'"values"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token punctuation"},"["),n(`
					`),s("span",{class:"token punctuation"},"["),n(`
						`),s("span",{class:"token string"},'"location"'),n(`
					`),s("span",{class:"token punctuation"},"]"),n(`
				`),s("span",{class:"token punctuation"},"]"),n(`
			`),s("span",{class:"token punctuation"},"}"),n(`
		`),s("span",{class:"token punctuation"},"]"),n(`
	`),s("span",{class:"token punctuation"},"}"),s("span",{class:"token punctuation"},"]"),n(`
`),s("span",{class:"token punctuation"},"}"),n(`
`)])]),s("div",{class:"line-numbers","aria-hidden":"true"},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1),S=l(`<ul><li><strong>运行带有多个子句的<code>SHOW TAG KEYS</code>查询</strong></li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token operator">&gt;</span> <span class="token keyword">SHOW</span> TAG <span class="token keyword">KEYS</span> <span class="token keyword">ON</span> <span class="token string">&quot;NOAA_water_database&quot;</span> <span class="token keyword">FROM</span> <span class="token string">&quot;h2o_quality&quot;</span> <span class="token keyword">LIMIT</span> <span class="token number">1</span> <span class="token keyword">OFFSET</span> <span class="token number">1</span>
name: h2o_quality
<span class="token operator">+</span><span class="token comment">---------+</span>
<span class="token operator">|</span> tagKey  <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">---------+</span>
<span class="token operator">|</span> randtag <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">---------+</span>
<span class="token number">1</span> <span class="token keyword">columns</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token keyword">rows</span> <span class="token operator">in</span> <span class="token keyword">set</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该查询返回数据库<code>NOAA_water_database</code>中名为<code>h2o_quality</code>的measurement里的tag key。<code>LIMIT</code>子句将返回的tag key的个数限制为1，<code>OFFSET</code>子句将输出结果偏移一个。</p><ul><li><strong>查看TAG的统计数量</strong></li></ul><p>在某些场景下，仅需要了解TAG数量，不关心具体的TAG，可以使用SHOW TAG KEY CARDINALITY命令，使用方式如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SHOW TAG KEY CARDINALITY [ON &lt;database_name&gt;] [FROM_CLAUSE]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>例如：</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token operator">&gt;</span> <span class="token keyword">SHOW</span> TAG <span class="token keyword">KEY</span> CARDINALITY
name: average_temperature
<span class="token operator">+</span><span class="token comment">-------+</span>
<span class="token operator">|</span> count <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">-------+</span>
<span class="token operator">|</span> <span class="token number">1</span>     <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">-------+</span>
<span class="token number">1</span> <span class="token keyword">columns</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token keyword">rows</span> <span class="token operator">in</span> <span class="token keyword">set</span>

name: h2o_feet
<span class="token operator">+</span><span class="token comment">-------+</span>
<span class="token operator">|</span> count <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">-------+</span>
<span class="token operator">|</span> <span class="token number">1</span>     <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">-------+</span>
<span class="token number">1</span> <span class="token keyword">columns</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token keyword">rows</span> <span class="token operator">in</span> <span class="token keyword">set</span>

name: h2o_pH
<span class="token operator">+</span><span class="token comment">-------+</span>
<span class="token operator">|</span> count <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">-------+</span>
<span class="token operator">|</span> <span class="token number">1</span>     <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">-------+</span>
<span class="token number">1</span> <span class="token keyword">columns</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token keyword">rows</span> <span class="token operator">in</span> <span class="token keyword">set</span>

name: h2o_quality
<span class="token operator">+</span><span class="token comment">-------+</span>
<span class="token operator">|</span> count <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">-------+</span>
<span class="token operator">|</span> <span class="token number">2</span>     <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">-------+</span>
<span class="token number">1</span> <span class="token keyword">columns</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token keyword">rows</span> <span class="token operator">in</span> <span class="token keyword">set</span>

name: h2o_temperature
<span class="token operator">+</span><span class="token comment">-------+</span>
<span class="token operator">|</span> count <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">-------+</span>
<span class="token operator">|</span> <span class="token number">1</span>     <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">-------+</span>
<span class="token number">1</span> <span class="token keyword">columns</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token keyword">rows</span> <span class="token operator">in</span> <span class="token keyword">set</span>

<span class="token operator">&gt;</span> <span class="token keyword">SHOW</span> TAG <span class="token keyword">KEY</span> CARDINALITY <span class="token keyword">FROM</span> h2o_temperature
name: h2o_temperature
<span class="token operator">+</span><span class="token comment">-------+</span>
<span class="token operator">|</span> count <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">-------+</span>
<span class="token operator">|</span> <span class="token number">1</span>     <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">-------+</span>
<span class="token number">1</span> <span class="token keyword">columns</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token keyword">rows</span> <span class="token operator">in</span> <span class="token keyword">set</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>运行带条件的<code>SHOW TAG KEYS</code>查询</strong></li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token operator">&gt;</span> <span class="token keyword">SHOW</span> TAG <span class="token keyword">KEYS</span> <span class="token keyword">FROM</span> h2o_quality <span class="token keyword">WHERE</span> location<span class="token operator">=</span>coyote_creek
name: h2o_quality
<span class="token operator">+</span><span class="token comment">----------+</span>
<span class="token operator">|</span> tagKey   <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------+</span>
<span class="token operator">|</span> location <span class="token operator">|</span>
<span class="token operator">|</span> randtag  <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------+</span>
<span class="token number">1</span> <span class="token keyword">columns</span><span class="token punctuation">,</span> <span class="token number">2</span> <span class="token keyword">rows</span> <span class="token operator">in</span> <span class="token keyword">set</span>

<span class="token operator">&gt;</span> <span class="token keyword">SHOW</span> TAG <span class="token keyword">KEYS</span> <span class="token keyword">FROM</span> h2o_quality <span class="token keyword">WHERE</span> location<span class="token operator">=</span>coyote_creek <span class="token keyword">LIMIT</span> <span class="token number">1</span>
name: h2o_quality
<span class="token operator">+</span><span class="token comment">----------+</span>
<span class="token operator">|</span> tagKey   <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------+</span>
<span class="token operator">|</span> location <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------+</span>
<span class="token number">1</span> <span class="token keyword">columns</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token keyword">rows</span> <span class="token operator">in</span> <span class="token keyword">set</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="show-tag-values" tabindex="-1"><a class="header-anchor" href="#show-tag-values" aria-hidden="true">#</a> SHOW TAG VALUES</h2><p>返回数据库中指定tag key的tag value。</p><h3 id="语法-1" tabindex="-1"><a class="header-anchor" href="#语法-1" aria-hidden="true">#</a> 语法</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SHOW</span> TAG <span class="token keyword">VALUES</span> <span class="token punctuation">[</span><span class="token keyword">ON</span> <span class="token operator">&lt;</span>database_name<span class="token operator">&gt;</span><span class="token punctuation">]</span> <span class="token punctuation">[</span>FROM_CLAUSE<span class="token punctuation">]</span> <span class="token keyword">WITH</span> <span class="token keyword">KEY</span> <span class="token punctuation">[</span> <span class="token punctuation">[</span><span class="token operator">&lt;</span>operator<span class="token operator">&gt;</span> <span class="token string">&quot;&lt;tag_key&gt;&quot;</span> <span class="token operator">|</span> <span class="token operator">&lt;</span>regular_expression<span class="token operator">&gt;</span><span class="token punctuation">]</span> <span class="token operator">|</span> <span class="token punctuation">[</span><span class="token operator">IN</span> <span class="token punctuation">(</span><span class="token string">&quot;&lt;tag_key1&gt;&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;&lt;tag_key2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token keyword">WHERE</span> <span class="token operator">&lt;</span>tag_key<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>operator<span class="token operator">&gt;</span> <span class="token punctuation">[</span><span class="token string">&#39;&lt;tag_value&gt;&#39;</span> <span class="token operator">|</span> <span class="token operator">&lt;</span>regular_expression<span class="token operator">&gt;</span><span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token punctuation">[</span>LIMIT_CLAUSE<span class="token punctuation">]</span> <span class="token punctuation">[</span>OFFSET_CLAUSE<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>ON &lt;database_name&gt;</code>是可选的。如果查询中没有包含<code>ON &lt;database_name&gt;</code>，您必须在CLI中使用<code>USE &lt;database_name&gt;</code>指定数据库，或者在HTTP API请求中使用参数<code>db</code>指定数据库。</p><p><code>WITH</code>子句是必须要有的，它支持指定一个tag key、一个正则表达式或多个tag key。</p><p><code>FROM</code>子句、<code>WHERE</code>子句、<code>LIMIT</code>子句和<code>OFFSET</code>子句是可选的。<code>WHERE</code>子句支持tag比较；在<code>SHOW TAG VALUES</code>查询中，field比较是无效的。</p><p><code>WITH</code>子句和<code>WHERE</code>子句中支持的操作符：</p><table><thead><tr><th>操作符</th><th>含义</th></tr></thead><tbody><tr><td><code>=</code></td><td>等于</td></tr><tr><td><code>&lt;&gt;</code></td><td>不等于</td></tr><tr><td><code>!=</code></td><td>不等于</td></tr><tr><td><code>=~</code></td><td>匹配</td></tr><tr><td><code>!~</code></td><td>不匹配</td></tr></tbody></table>`,19),O=s("code",null,"FROM",-1),q=s("code",null,"LIMIT、OFFSET",-1),E=l(`<h3 id="示例-1" tabindex="-1"><a class="header-anchor" href="#示例-1" aria-hidden="true">#</a> 示例</h3><ul><li><strong>运行带有<code>ON</code>子句的<code>SHOW TAG VALUES</code>查询</strong></li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token operator">&gt;</span> <span class="token keyword">SHOW</span> TAG <span class="token keyword">VALUES</span> <span class="token keyword">ON</span> <span class="token string">&quot;NOAA_water_database&quot;</span> <span class="token keyword">WITH</span> <span class="token keyword">KEY</span> <span class="token operator">=</span> <span class="token string">&quot;randtag&quot;</span>

name: h2o_quality
<span class="token keyword">key</span>       <span class="token keyword">value</span>
<span class="token comment">---       -----</span>
randtag   <span class="token number">1</span>
randtag   <span class="token number">2</span>
randtag   <span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该查询返回数据库<code>NOAA_water_database</code>中的tag key <code>randtag</code>的所有tag value。<code>SHOW TAG VALUES</code>将查询结果按measurement的名字进行分组。</p><ul><li><strong>运行不带有<code>ON</code>子句的<code>SHOW TAG KEYS</code>查询</strong></li></ul>`,5),f=s("p",null,[n("使用"),s("code",null,"USE <database_name>"),n("指定数据库：")],-1),H=s("div",{class:"language-sql line-numbers-mode","data-ext":"sql"},[s("pre",{class:"language-sql"},[s("code",null,[s("span",{class:"token operator"},">"),n(),s("span",{class:"token keyword"},"USE"),n(` NOAA_water_database
`),s("span",{class:"token keyword"},"Using"),n(),s("span",{class:"token keyword"},"database"),n(` NOAA_water_database

`),s("span",{class:"token operator"},">"),n(),s("span",{class:"token keyword"},"SHOW"),n(" TAG "),s("span",{class:"token keyword"},"VALUES"),n(),s("span",{class:"token keyword"},"WITH"),n(),s("span",{class:"token keyword"},"KEY"),n(),s("span",{class:"token operator"},"="),n(),s("span",{class:"token string"},'"randtag"'),n(`

name: h2o_quality
`),s("span",{class:"token keyword"},"key"),n("       "),s("span",{class:"token keyword"},"value"),n(`
`),s("span",{class:"token comment"},"---       -----"),n(`
randtag   `),s("span",{class:"token number"},"1"),n(`
randtag   `),s("span",{class:"token number"},"2"),n(`
randtag   `),s("span",{class:"token number"},"3"),n(`
`)])]),s("div",{class:"line-numbers","aria-hidden":"true"},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1),I=s("p",null,[n("使用参数"),s("code",null,"db"),n("指定数据库")],-1),N=s("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[s("pre",{class:"language-bash"},[s("code",null,[s("span",{class:"token operator"},">"),n(),s("span",{class:"token function"},"curl"),n(),s("span",{class:"token parameter variable"},"-G"),n(),s("span",{class:"token string"},'"http://localhost:8086/query?db=NOAA_water_database&pretty=true"'),n(" --data-urlencode "),s("span",{class:"token string"},`'q=SHOW TAG VALUES WITH KEY = "randtag"'`),n(`
`),s("span",{class:"token punctuation"},"{"),n(`
	`),s("span",{class:"token string"},'"results"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token punctuation"},"["),s("span",{class:"token punctuation"},"{"),n(`
		`),s("span",{class:"token string"},'"statement_id"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token number"},"0"),n(`,
		`),s("span",{class:"token string"},'"series"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token punctuation"},"["),s("span",{class:"token punctuation"},"{"),n(`
			`),s("span",{class:"token string"},'"name"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token string"},'"h2o_quality"'),n(`,
			`),s("span",{class:"token string"},'"columns"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token punctuation"},"["),n(`
				`),s("span",{class:"token string"},'"key"'),n(`,
				`),s("span",{class:"token string"},'"value"'),n(`
			`),s("span",{class:"token punctuation"},"]"),n(`,
			`),s("span",{class:"token string"},'"values"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token punctuation"},"["),n(`
				`),s("span",{class:"token punctuation"},"["),n(`
					`),s("span",{class:"token string"},'"randtag"'),n(`,
					`),s("span",{class:"token string"},'"1"'),n(`
				`),s("span",{class:"token punctuation"},"]"),n(`,
				`),s("span",{class:"token punctuation"},"["),n(`
					`),s("span",{class:"token string"},'"randtag"'),n(`,
					`),s("span",{class:"token string"},'"2"'),n(`
				`),s("span",{class:"token punctuation"},"]"),n(`,
				`),s("span",{class:"token punctuation"},"["),n(`
					`),s("span",{class:"token string"},'"randtag"'),n(`,
					`),s("span",{class:"token string"},'"3"'),n(`
				`),s("span",{class:"token punctuation"},"]"),n(`
			`),s("span",{class:"token punctuation"},"]"),n(`
		`),s("span",{class:"token punctuation"},"}"),s("span",{class:"token punctuation"},"]"),n(`
	`),s("span",{class:"token punctuation"},"}"),s("span",{class:"token punctuation"},"]"),n(`
`),s("span",{class:"token punctuation"},"}"),n(`
`)])]),s("div",{class:"line-numbers","aria-hidden":"true"},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1),W=l(`<ul><li><strong>运行带有多个子句的<code>SHOW TAG VALUES</code>查询</strong></li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token operator">&gt;</span> <span class="token keyword">SHOW</span> TAG <span class="token keyword">VALUES</span> <span class="token keyword">ON</span> <span class="token string">&quot;NOAA_water_database&quot;</span> <span class="token keyword">WITH</span> <span class="token keyword">KEY</span> <span class="token operator">IN</span> <span class="token punctuation">(</span><span class="token string">&quot;location&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;randtag&quot;</span><span class="token punctuation">)</span> <span class="token keyword">WHERE</span> <span class="token string">&quot;randtag&quot;</span> <span class="token operator">=</span><span class="token operator">~</span> <span class="token operator">/</span><span class="token punctuation">.</span><span class="token operator">/</span> <span class="token keyword">LIMIT</span> <span class="token number">3</span>

name: h2o_quality
<span class="token keyword">key</span>        <span class="token keyword">value</span>
<span class="token comment">---        -----</span>
location   coyote_creek
location   santa_monica
randtag	   <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该查询从数据库<code>NOAA_water_database</code>的所有measurement中返回<code>location</code>或<code>randtag</code>的tag value，并且返回的数据还需满足条件：<code>randtag</code>的tag value不为空。<code>LIMIT</code>子句将返回的tag value的个数限制为3。</p><h2 id="show-field-keys" tabindex="-1"><a class="header-anchor" href="#show-field-keys" aria-hidden="true">#</a> SHOW FIELD KEYS</h2><p>返回field key和field value的数据类型。</p><h3 id="语法-2" tabindex="-1"><a class="header-anchor" href="#语法-2" aria-hidden="true">#</a> 语法</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SHOW</span> FIELD <span class="token keyword">KEYS</span> <span class="token punctuation">[</span><span class="token keyword">ON</span> <span class="token operator">&lt;</span>database_name<span class="token operator">&gt;</span><span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token keyword">FROM</span> <span class="token operator">&lt;</span>measurement_name<span class="token operator">&gt;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,7),R=s("code",null,"ON <database_name>",-1),K=s("br",null,null,-1),x=s("code",null,"FROM",-1),Z=s("code",null,"FROM",-1),L=l(`<p>如果查询中没有包含<code>ON &lt;database_name&gt;</code>，您必须在CLI中使用<code>USE &lt;database_name&gt;</code>指定数据库，或者在openGemini API请求中使用参数<code>db</code>指定数据库。</p><h3 id="示例-2" tabindex="-1"><a class="header-anchor" href="#示例-2" aria-hidden="true">#</a> 示例</h3><ul><li><strong>运行带有<code>ON</code>子句的<code>SHOW FIELD KEYS</code>查询</strong></li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token operator">&gt;</span> <span class="token keyword">SHOW</span> FIELD <span class="token keyword">KEYS</span> <span class="token keyword">ON</span> <span class="token string">&quot;NOAA_water_database&quot;</span>

name: average_temperature
fieldKey            fieldType
<span class="token comment">--------            ---------</span>
degrees             <span class="token keyword">float</span>

name: h2o_feet
fieldKey            fieldType
<span class="token comment">--------            ---------</span>
<span class="token keyword">level</span> description   string
water_level         <span class="token keyword">float</span>

name: h2o_pH
fieldKey            fieldType
<span class="token comment">--------            ---------</span>
pH                  <span class="token keyword">float</span>

name: h2o_quality
fieldKey            fieldType
<span class="token comment">--------            ---------</span>
<span class="token keyword">index</span>               <span class="token keyword">float</span>

name: h2o_temperature
fieldKey            fieldType
<span class="token comment">--------            ---------</span>
degrees             <span class="token keyword">float</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该查询返回数据库<code>NOAA_water_database</code>中每个measurement的field key以及对应的field value的数据类型。</p><ul><li><strong>运行不带有<code>ON</code>子句的<code>SHOW FIELD KEYS</code>查询</strong></li></ul>`,6),G=s("p",null,[n("使用"),s("code",null,"USE <database_name>"),n("指定数据库：")],-1),F=s("div",{class:"language-sql line-numbers-mode","data-ext":"sql"},[s("pre",{class:"language-sql"},[s("code",null,[s("span",{class:"token operator"},">"),n(),s("span",{class:"token keyword"},"USE"),n(` NOAA_water_database
`),s("span",{class:"token keyword"},"Using"),n(),s("span",{class:"token keyword"},"database"),n(` NOAA_water_database

`),s("span",{class:"token operator"},">"),n(),s("span",{class:"token keyword"},"SHOW"),n(" FIELD "),s("span",{class:"token keyword"},"KEYS"),n(`

name: average_temperature
fieldKey            fieldType
`),s("span",{class:"token comment"},"--------            ---------"),n(`
degrees             `),s("span",{class:"token keyword"},"float"),n(`

name: h2o_feet
fieldKey            fieldType
`),s("span",{class:"token comment"},"--------            ---------"),n(`
`),s("span",{class:"token keyword"},"level"),n(` description   string
water_level         `),s("span",{class:"token keyword"},"float"),n(`

name: h2o_pH
fieldKey            fieldType
`),s("span",{class:"token comment"},"--------            ---------"),n(`
pH                  `),s("span",{class:"token keyword"},"float"),n(`

name: h2o_quality
fieldKey            fieldType
`),s("span",{class:"token comment"},"--------            ---------"),n(`
`),s("span",{class:"token keyword"},"index"),n("               "),s("span",{class:"token keyword"},"float"),n(`

name: h2o_temperature
fieldKey            fieldType
`),s("span",{class:"token comment"},"--------            ---------"),n(`
degrees             `),s("span",{class:"token keyword"},"float"),n(`
`)])]),s("div",{class:"line-numbers","aria-hidden":"true"},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1),Y=s("p",null,[n("使用参数"),s("code",null,"db"),n("指定数据库")],-1),U=s("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[s("pre",{class:"language-bash"},[s("code",null,[s("span",{class:"token operator"},">"),n(),s("span",{class:"token function"},"curl"),n(),s("span",{class:"token parameter variable"},"-G"),n(),s("span",{class:"token string"},'"http://localhost:8086/query?db=NOAA_water_database&pretty=true"'),n(" --data-urlencode "),s("span",{class:"token string"},"'q=SHOW FIELD KEYS'"),n(`
`),s("span",{class:"token punctuation"},"{"),n(`
	`),s("span",{class:"token string"},'"results"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token punctuation"},"["),s("span",{class:"token punctuation"},"{"),n(`
		`),s("span",{class:"token string"},'"statement_id"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token number"},"0"),n(`,
		`),s("span",{class:"token string"},'"series"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token punctuation"},"["),s("span",{class:"token punctuation"},"{"),n(`
				`),s("span",{class:"token string"},'"name"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token string"},'"average_temperature"'),n(`,
				`),s("span",{class:"token string"},'"columns"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token punctuation"},"["),n(`
					`),s("span",{class:"token string"},'"fieldKey"'),n(`,
					`),s("span",{class:"token string"},'"fieldType"'),n(`
				`),s("span",{class:"token punctuation"},"]"),n(`,
				`),s("span",{class:"token string"},'"values"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token punctuation"},"["),n(`
					`),s("span",{class:"token punctuation"},"["),n(`
						`),s("span",{class:"token string"},'"degrees"'),n(`,
						`),s("span",{class:"token string"},'"float"'),n(`
					`),s("span",{class:"token punctuation"},"]"),n(`
				`),s("span",{class:"token punctuation"},"]"),n(`
			`),s("span",{class:"token punctuation"},"}"),n(`,
			`),s("span",{class:"token punctuation"},"{"),n(`
				`),s("span",{class:"token string"},'"name"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token string"},'"h2o_feet"'),n(`,
				`),s("span",{class:"token string"},'"columns"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token punctuation"},"["),n(`
					`),s("span",{class:"token string"},'"fieldKey"'),n(`,
					`),s("span",{class:"token string"},'"fieldType"'),n(`
				`),s("span",{class:"token punctuation"},"]"),n(`,
				`),s("span",{class:"token string"},'"values"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token punctuation"},"["),n(`
					`),s("span",{class:"token punctuation"},"["),n(`
						`),s("span",{class:"token string"},'"level description"'),n(`,
						`),s("span",{class:"token string"},'"string"'),n(`
					`),s("span",{class:"token punctuation"},"]"),n(`,
					`),s("span",{class:"token punctuation"},"["),n(`
						`),s("span",{class:"token string"},'"water_level"'),n(`,
						`),s("span",{class:"token string"},'"float"'),n(`
					`),s("span",{class:"token punctuation"},"]"),n(`
				`),s("span",{class:"token punctuation"},"]"),n(`
			`),s("span",{class:"token punctuation"},"}"),n(`,
			`),s("span",{class:"token punctuation"},"{"),n(`
				`),s("span",{class:"token string"},'"name"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token string"},'"h2o_pH"'),n(`,
				`),s("span",{class:"token string"},'"columns"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token punctuation"},"["),n(`
					`),s("span",{class:"token string"},'"fieldKey"'),n(`,
					`),s("span",{class:"token string"},'"fieldType"'),n(`
				`),s("span",{class:"token punctuation"},"]"),n(`,
				`),s("span",{class:"token string"},'"values"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token punctuation"},"["),n(`
					`),s("span",{class:"token punctuation"},"["),n(`
						`),s("span",{class:"token string"},'"pH"'),n(`,
						`),s("span",{class:"token string"},'"float"'),n(`
					`),s("span",{class:"token punctuation"},"]"),n(`
				`),s("span",{class:"token punctuation"},"]"),n(`
			`),s("span",{class:"token punctuation"},"}"),n(`,
			`),s("span",{class:"token punctuation"},"{"),n(`
				`),s("span",{class:"token string"},'"name"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token string"},'"h2o_quality"'),n(`,
				`),s("span",{class:"token string"},'"columns"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token punctuation"},"["),n(`
					`),s("span",{class:"token string"},'"fieldKey"'),n(`,
					`),s("span",{class:"token string"},'"fieldType"'),n(`
				`),s("span",{class:"token punctuation"},"]"),n(`,
				`),s("span",{class:"token string"},'"values"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token punctuation"},"["),n(`
					`),s("span",{class:"token punctuation"},"["),n(`
						`),s("span",{class:"token string"},'"index"'),n(`,
						`),s("span",{class:"token string"},'"float"'),n(`
					`),s("span",{class:"token punctuation"},"]"),n(`
				`),s("span",{class:"token punctuation"},"]"),n(`
			`),s("span",{class:"token punctuation"},"}"),n(`,
			`),s("span",{class:"token punctuation"},"{"),n(`
				`),s("span",{class:"token string"},'"name"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token string"},'"h2o_temperature"'),n(`,
				`),s("span",{class:"token string"},'"columns"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token punctuation"},"["),n(`
					`),s("span",{class:"token string"},'"fieldKey"'),n(`,
					`),s("span",{class:"token string"},'"fieldType"'),n(`
				`),s("span",{class:"token punctuation"},"]"),n(`,
				`),s("span",{class:"token string"},'"values"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token punctuation"},"["),n(`
					`),s("span",{class:"token punctuation"},"["),n(`
						`),s("span",{class:"token string"},'"degrees"'),n(`,
						`),s("span",{class:"token string"},'"float"'),n(`
					`),s("span",{class:"token punctuation"},"]"),n(`
				`),s("span",{class:"token punctuation"},"]"),n(`
			`),s("span",{class:"token punctuation"},"}"),n(`
		`),s("span",{class:"token punctuation"},"]"),n(`
	`),s("span",{class:"token punctuation"},"}"),s("span",{class:"token punctuation"},"]"),n(`
`),s("span",{class:"token punctuation"},"}"),n(`
`)])]),s("div",{class:"line-numbers","aria-hidden":"true"},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1),D=l(`<ul><li><strong>运行带有<code>FROM</code>子句的<code>SHOW FIELD KEYS</code>查询</strong></li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token operator">&gt;</span> <span class="token keyword">SHOW</span> FIELD <span class="token keyword">KEYS</span> <span class="token keyword">ON</span> <span class="token string">&quot;NOAA_water_database&quot;</span> <span class="token keyword">FROM</span> <span class="token string">&quot;h2o_feet&quot;</span>

name: h2o_feet
fieldKey            fieldType
<span class="token comment">--------            ---------</span>
<span class="token keyword">level</span> description   string
water_level         <span class="token keyword">float</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该查询返回数据库<code>NOAA_water_database</code>中measurement <code>h2o_feet</code>里的fields key以及对应的field value的数据类型。</p><h2 id="show-series" tabindex="-1"><a class="header-anchor" href="#show-series" aria-hidden="true">#</a> SHOW SERIES</h2><p>返回指定数据库的时间线。</p><h3 id="语法-3" tabindex="-1"><a class="header-anchor" href="#语法-3" aria-hidden="true">#</a> 语法</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SHOW</span> SERIES <span class="token punctuation">[</span><span class="token keyword">ON</span> <span class="token operator">&lt;</span>database_name<span class="token operator">&gt;</span><span class="token punctuation">]</span> <span class="token punctuation">[</span>FROM_CLAUSE<span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token keyword">WHERE</span> <span class="token operator">&lt;</span>tag_key<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>operator<span class="token operator">&gt;</span> <span class="token punctuation">[</span> <span class="token string">&#39;&lt;tag_value&gt;&#39;</span> <span class="token operator">|</span> <span class="token operator">&lt;</span>regular_expression<span class="token operator">&gt;</span><span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token punctuation">[</span>LIMIT_CLAUSE<span class="token punctuation">]</span> <span class="token punctuation">[</span>OFFSET_CLAUSE<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>ON &lt;database_name&gt;</code>是可选的。如果查询中没有包含<code>ON &lt;database_name&gt;</code>，您必须在CLI中使用<code>USE &lt;database_name&gt;</code>指定数据库，或者在openGemini API请求中使用参数<code>db</code>指定数据库。</p><p><code>WHERE</code>子句支持<code>tag</code>比较；在<code>SHOW SERIES</code>查询中，<code>field</code>比较是无效的。</p><p><code>WHERE</code>子句中支持的操作符：</p><table><thead><tr><th>操作符</th><th>含义</th></tr></thead><tbody><tr><td><code>=</code></td><td>等于</td></tr><tr><td><code>&lt;&gt;</code></td><td>不等于</td></tr><tr><td><code>!=</code></td><td>不等于</td></tr><tr><td><code>=~</code></td><td>匹配</td></tr><tr><td><code>!~</code></td><td>不匹配</td></tr></tbody></table>`,11),M=s("code",null,"FROM",-1),C=s("code",null,"LIMIT、OFFSET",-1),P=l(`<h3 id="示例-3" tabindex="-1"><a class="header-anchor" href="#示例-3" aria-hidden="true">#</a> 示例</h3><ul><li><strong>运行带有<code>ON</code>子句的<code>SHOW SERIES</code>查询</strong></li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> <span class="token keyword">SHOW</span> SERIES <span class="token keyword">ON</span> NOAA_water_database
<span class="token operator">+</span><span class="token comment">---------------------------------------------+</span>
<span class="token operator">|</span> <span class="token keyword">key</span>                                         <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">---------------------------------------------+</span>
<span class="token operator">|</span> average_temperature<span class="token punctuation">,</span>location<span class="token operator">=</span>coyote_creek   <span class="token operator">|</span>
<span class="token operator">|</span> average_temperature<span class="token punctuation">,</span>location<span class="token operator">=</span>santa_monica   <span class="token operator">|</span>
<span class="token operator">|</span> h2o_feet<span class="token punctuation">,</span>location<span class="token operator">=</span>coyote_creek              <span class="token operator">|</span>
<span class="token operator">|</span> h2o_feet<span class="token punctuation">,</span>location<span class="token operator">=</span>santa_monica              <span class="token operator">|</span>
<span class="token operator">|</span> h2o_pH<span class="token punctuation">,</span>location<span class="token operator">=</span>coyote_creek                <span class="token operator">|</span>
<span class="token operator">|</span> h2o_pH<span class="token punctuation">,</span>location<span class="token operator">=</span>santa_monica                <span class="token operator">|</span>
<span class="token operator">|</span> h2o_quality<span class="token punctuation">,</span>location<span class="token operator">=</span>coyote_creek<span class="token punctuation">,</span>randtag<span class="token operator">=</span><span class="token number">1</span> <span class="token operator">|</span>
<span class="token operator">|</span> h2o_quality<span class="token punctuation">,</span>location<span class="token operator">=</span>coyote_creek<span class="token punctuation">,</span>randtag<span class="token operator">=</span><span class="token number">2</span> <span class="token operator">|</span>
<span class="token operator">|</span> h2o_quality<span class="token punctuation">,</span>location<span class="token operator">=</span>coyote_creek<span class="token punctuation">,</span>randtag<span class="token operator">=</span><span class="token number">3</span> <span class="token operator">|</span>
<span class="token operator">|</span> h2o_quality<span class="token punctuation">,</span>location<span class="token operator">=</span>santa_monica<span class="token punctuation">,</span>randtag<span class="token operator">=</span><span class="token number">1</span> <span class="token operator">|</span>
<span class="token operator">|</span> h2o_quality<span class="token punctuation">,</span>location<span class="token operator">=</span>santa_monica<span class="token punctuation">,</span>randtag<span class="token operator">=</span><span class="token number">2</span> <span class="token operator">|</span>
<span class="token operator">|</span> h2o_quality<span class="token punctuation">,</span>location<span class="token operator">=</span>santa_monica<span class="token punctuation">,</span>randtag<span class="token operator">=</span><span class="token number">3</span> <span class="token operator">|</span>
<span class="token operator">|</span> h2o_temperature<span class="token punctuation">,</span>location<span class="token operator">=</span>coyote_creek       <span class="token operator">|</span>
<span class="token operator">|</span> h2o_temperature<span class="token punctuation">,</span>location<span class="token operator">=</span>santa_monica       <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">---------------------------------------------+</span>
<span class="token number">1</span> <span class="token keyword">columns</span><span class="token punctuation">,</span> <span class="token number">14</span> <span class="token keyword">rows</span> <span class="token operator">in</span> <span class="token keyword">set</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该查询的输出类似行协议格式。第一个逗号之前的所有内容是<code>measurement</code>的名字。第一个逗号之后的所有内容都是<code>tag key</code>或者<code>tag value</code>。数据库<code>NOAA_water_database</code>有五个不同的<code>measurement</code>和14个不同的系列。</p><ul><li><strong>运行不带有<code>ON</code>子句的<code>SHOW SERIES</code>查询</strong></li></ul>`,5),V=s("p",null,[n("使用"),s("code",null,"USE <database_name>"),n("指定数据库：")],-1),z=s("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[s("pre",{class:"language-bash"},[s("code",null,[s("span",{class:"token operator"},">"),n(` USE NOAA_water_database
Elapsed: 561ns
`),s("span",{class:"token operator"},">"),n(` SHOW SERIES
+---------------------------------------------+
`),s("span",{class:"token operator"},"|"),n(" key                                         "),s("span",{class:"token operator"},"|"),n(`
+---------------------------------------------+
`),s("span",{class:"token operator"},"|"),n(" average_temperature,location"),s("span",{class:"token operator"},"="),n("coyote_creek   "),s("span",{class:"token operator"},"|"),n(`
`),s("span",{class:"token operator"},"|"),n(" average_temperature,location"),s("span",{class:"token operator"},"="),n("santa_monica   "),s("span",{class:"token operator"},"|"),n(`
`),s("span",{class:"token operator"},"|"),n(" h2o_feet,location"),s("span",{class:"token operator"},"="),n("coyote_creek              "),s("span",{class:"token operator"},"|"),n(`
`),s("span",{class:"token operator"},"|"),n(" h2o_feet,location"),s("span",{class:"token operator"},"="),n("santa_monica              "),s("span",{class:"token operator"},"|"),n(`
`),s("span",{class:"token operator"},"|"),n(" h2o_pH,location"),s("span",{class:"token operator"},"="),n("coyote_creek                "),s("span",{class:"token operator"},"|"),n(`
`),s("span",{class:"token operator"},"|"),n(" h2o_pH,location"),s("span",{class:"token operator"},"="),n("santa_monica                "),s("span",{class:"token operator"},"|"),n(`
`),s("span",{class:"token operator"},"|"),n(" h2o_quality,location"),s("span",{class:"token operator"},"="),n("coyote_creek,randtag"),s("span",{class:"token operator"},"="),s("span",{class:"token number"},"1"),n(),s("span",{class:"token operator"},"|"),n(`
`),s("span",{class:"token operator"},"|"),n(" h2o_quality,location"),s("span",{class:"token operator"},"="),n("coyote_creek,randtag"),s("span",{class:"token operator"},"="),s("span",{class:"token number"},"2"),n(),s("span",{class:"token operator"},"|"),n(`
`),s("span",{class:"token operator"},"|"),n(" h2o_quality,location"),s("span",{class:"token operator"},"="),n("coyote_creek,randtag"),s("span",{class:"token operator"},"="),s("span",{class:"token number"},"3"),n(),s("span",{class:"token operator"},"|"),n(`
`),s("span",{class:"token operator"},"|"),n(" h2o_quality,location"),s("span",{class:"token operator"},"="),n("santa_monica,randtag"),s("span",{class:"token operator"},"="),s("span",{class:"token number"},"1"),n(),s("span",{class:"token operator"},"|"),n(`
`),s("span",{class:"token operator"},"|"),n(" h2o_quality,location"),s("span",{class:"token operator"},"="),n("santa_monica,randtag"),s("span",{class:"token operator"},"="),s("span",{class:"token number"},"2"),n(),s("span",{class:"token operator"},"|"),n(`
`),s("span",{class:"token operator"},"|"),n(" h2o_quality,location"),s("span",{class:"token operator"},"="),n("santa_monica,randtag"),s("span",{class:"token operator"},"="),s("span",{class:"token number"},"3"),n(),s("span",{class:"token operator"},"|"),n(`
`),s("span",{class:"token operator"},"|"),n(" h2o_temperature,location"),s("span",{class:"token operator"},"="),n("coyote_creek       "),s("span",{class:"token operator"},"|"),n(`
`),s("span",{class:"token operator"},"|"),n(" h2o_temperature,location"),s("span",{class:"token operator"},"="),n("santa_monica       "),s("span",{class:"token operator"},"|"),n(`
+---------------------------------------------+
`),s("span",{class:"token number"},"1"),n(" columns, "),s("span",{class:"token number"},"14"),n(" rows "),s("span",{class:"token keyword"},"in"),n(),s("span",{class:"token builtin class-name"},"set"),n(`
`)])]),s("div",{class:"line-numbers","aria-hidden":"true"},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1),B=s("p",null,[n("使用参数"),s("code",null,"db"),n("指定数据库")],-1),X=s("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[s("pre",{class:"language-bash"},[s("code",null,[s("span",{class:"token operator"},">"),n(),s("span",{class:"token function"},"curl"),n(),s("span",{class:"token parameter variable"},"-G"),n(),s("span",{class:"token string"},'"http://localhost:8086/query?db=NOAA_water_database&pretty=true"'),n(" --data-urlencode "),s("span",{class:"token string"},'"q=SHOW SERIES"'),n(`
`),s("span",{class:"token punctuation"},"{"),n(`
	`),s("span",{class:"token string"},'"results"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token punctuation"},"["),s("span",{class:"token punctuation"},"{"),n(`
		`),s("span",{class:"token string"},'"statement_id"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token number"},"0"),n(`,
		`),s("span",{class:"token string"},'"series"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token punctuation"},"["),s("span",{class:"token punctuation"},"{"),n(`
			`),s("span",{class:"token string"},'"columns"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token punctuation"},"["),n(`
				`),s("span",{class:"token string"},'"key"'),n(`
			`),s("span",{class:"token punctuation"},"]"),n(`,
			`),s("span",{class:"token string"},'"values"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token punctuation"},"["),n(`
				`),s("span",{class:"token punctuation"},"["),n(`
					`),s("span",{class:"token string"},'"average_temperature,location=coyote_creek"'),n(`
				`),s("span",{class:"token punctuation"},"]"),n(`,
				`),s("span",{class:"token punctuation"},"["),n(`
					`),s("span",{class:"token string"},'"average_temperature,location=santa_monica"'),n(`
				`),s("span",{class:"token punctuation"},"]"),n(`,
				`),s("span",{class:"token punctuation"},"["),n(`
					`),s("span",{class:"token string"},'"h2o_feet,location=coyote_creek"'),n(`
				`),s("span",{class:"token punctuation"},"]"),n(`,
				`),s("span",{class:"token punctuation"},"["),n(`
					`),s("span",{class:"token string"},'"h2o_feet,location=santa_monica"'),n(`
				`),s("span",{class:"token punctuation"},"]"),n(`,
				`),s("span",{class:"token punctuation"},"["),n(`
					`),s("span",{class:"token string"},'"h2o_pH,location=coyote_creek"'),n(`
				`),s("span",{class:"token punctuation"},"]"),n(`,
				`),s("span",{class:"token punctuation"},"["),n(`
					`),s("span",{class:"token string"},'"h2o_pH,location=santa_monica"'),n(`
				`),s("span",{class:"token punctuation"},"]"),n(`,
				`),s("span",{class:"token punctuation"},"["),n(`
					`),s("span",{class:"token string"},'"h2o_quality,location=coyote_creek,randtag=1"'),n(`
				`),s("span",{class:"token punctuation"},"]"),n(`,
				`),s("span",{class:"token punctuation"},"["),n(`
					`),s("span",{class:"token string"},'"h2o_quality,location=coyote_creek,randtag=2"'),n(`
				`),s("span",{class:"token punctuation"},"]"),n(`,
				`),s("span",{class:"token punctuation"},"["),n(`
					`),s("span",{class:"token string"},'"h2o_quality,location=coyote_creek,randtag=3"'),n(`
				`),s("span",{class:"token punctuation"},"]"),n(`,
				`),s("span",{class:"token punctuation"},"["),n(`
					`),s("span",{class:"token string"},'"h2o_quality,location=santa_monica,randtag=1"'),n(`
				`),s("span",{class:"token punctuation"},"]"),n(`,
				`),s("span",{class:"token punctuation"},"["),n(`
					`),s("span",{class:"token string"},'"h2o_quality,location=santa_monica,randtag=2"'),n(`
				`),s("span",{class:"token punctuation"},"]"),n(`,
				`),s("span",{class:"token punctuation"},"["),n(`
					`),s("span",{class:"token string"},'"h2o_quality,location=santa_monica,randtag=3"'),n(`
				`),s("span",{class:"token punctuation"},"]"),n(`,
				`),s("span",{class:"token punctuation"},"["),n(`
					`),s("span",{class:"token string"},'"h2o_temperature,location=coyote_creek"'),n(`
				`),s("span",{class:"token punctuation"},"]"),n(`,
				`),s("span",{class:"token punctuation"},"["),n(`
					`),s("span",{class:"token string"},'"h2o_temperature,location=santa_monica"'),n(`
				`),s("span",{class:"token punctuation"},"]"),n(`
			`),s("span",{class:"token punctuation"},"]"),n(`
		`),s("span",{class:"token punctuation"},"}"),s("span",{class:"token punctuation"},"]"),n(`
	`),s("span",{class:"token punctuation"},"}"),s("span",{class:"token punctuation"},"]"),n(`
`),s("span",{class:"token punctuation"},"}"),n(`
`)])]),s("div",{class:"line-numbers","aria-hidden":"true"},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1),$=l(`<ul><li><strong>运行带有多个子句的<code>SHOW SERIES</code>查询</strong></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&gt; SHOW SERIES ON NOAA_water_database FROM &quot;h2o_quality&quot; WHERE &quot;location&quot; = &#39;coyote_creek&#39; LIMIT 2
+---------------------------------------------+
| key                                         |
+---------------------------------------------+
| h2o_quality,location=coyote_creek,randtag=1 |
| h2o_quality,location=coyote_creek,randtag=2 |
+---------------------------------------------+
1 columns, 2 rows in set
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该查询返回数据库<code>NOAA_water_database</code>中，与measurement <code>h2o_quality</code>和tag <code>location = coyote_creek</code>相关联的所有系列。<code>LIMIT</code>子句将返回的系列个数限制为2。</p><div class="hint-container danger"><p class="hint-container-title">警告</p><p><code>SHOW SERIES</code>返回表中所有时间线，对内存资源占用较大，慎用！</p><p>如需使用，一定要使用条件过滤</p></div><h2 id="show-series-cardinality" tabindex="-1"><a class="header-anchor" href="#show-series-cardinality" aria-hidden="true">#</a> SHOW SERIES CARDINALITY</h2><p>返回指定数据库的时间线数量，结果按时间分组</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SHOW SERIES CARDINALITY [ON &lt;database_name&gt;] [FROM_clause]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="示例-4" tabindex="-1"><a class="header-anchor" href="#示例-4" aria-hidden="true">#</a> 示例</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token operator">&gt;</span> <span class="token keyword">SHOW</span> SERIES CARDINALITY <span class="token keyword">ON</span> NOAA_water_database
<span class="token operator">+</span><span class="token comment">----------------------+----------------------+-------+</span>
<span class="token operator">|</span> startTime            <span class="token operator">|</span> endTime              <span class="token operator">|</span> count <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------------------+----------------------+-------+</span>
<span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">08</span><span class="token operator">-</span><span class="token number">12</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">08</span><span class="token operator">-</span><span class="token number">19</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">14</span>    <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------------------+----------------------+-------+</span>
<span class="token number">3</span> <span class="token keyword">columns</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token keyword">rows</span> <span class="token operator">in</span> <span class="token keyword">set</span>

<span class="token operator">+</span><span class="token comment">----------------------+----------------------+-------+</span>
<span class="token operator">|</span> startTime            <span class="token operator">|</span> endTime              <span class="token operator">|</span> count <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------------------+----------------------+-------+</span>
<span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">08</span><span class="token operator">-</span><span class="token number">19</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">08</span><span class="token operator">-</span><span class="token number">26</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">14</span>    <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------------------+----------------------+-------+</span>
<span class="token number">3</span> <span class="token keyword">columns</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token keyword">rows</span> <span class="token operator">in</span> <span class="token keyword">set</span>

<span class="token operator">+</span><span class="token comment">----------------------+----------------------+-------+</span>
<span class="token operator">|</span> startTime            <span class="token operator">|</span> endTime              <span class="token operator">|</span> count <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------------------+----------------------+-------+</span>
<span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">08</span><span class="token operator">-</span><span class="token number">26</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">09</span><span class="token operator">-</span><span class="token number">02</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">14</span>    <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------------------+----------------------+-------+</span>
<span class="token number">3</span> <span class="token keyword">columns</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token keyword">rows</span> <span class="token operator">in</span> <span class="token keyword">set</span>

<span class="token operator">+</span><span class="token comment">----------------------+----------------------+-------+</span>
<span class="token operator">|</span> startTime            <span class="token operator">|</span> endTime              <span class="token operator">|</span> count <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------------------+----------------------+-------+</span>
<span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">09</span><span class="token operator">-</span><span class="token number">02</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">09</span><span class="token operator">-</span><span class="token number">09</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">14</span>    <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------------------+----------------------+-------+</span>
<span class="token number">3</span> <span class="token keyword">columns</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token keyword">rows</span> <span class="token operator">in</span> <span class="token keyword">set</span>

<span class="token operator">+</span><span class="token comment">----------------------+----------------------+-------+</span>
<span class="token operator">|</span> startTime            <span class="token operator">|</span> endTime              <span class="token operator">|</span> count <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------------------+----------------------+-------+</span>
<span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">09</span><span class="token operator">-</span><span class="token number">09</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">09</span><span class="token operator">-</span><span class="token number">16</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">14</span>    <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------------------+----------------------+-------+</span>
<span class="token number">3</span> <span class="token keyword">columns</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token keyword">rows</span> <span class="token operator">in</span> <span class="token keyword">set</span>

<span class="token operator">+</span><span class="token comment">----------------------+----------------------+-------+</span>
<span class="token operator">|</span> startTime            <span class="token operator">|</span> endTime              <span class="token operator">|</span> count <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------------------+----------------------+-------+</span>
<span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">09</span><span class="token operator">-</span><span class="token number">16</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">09</span><span class="token operator">-</span><span class="token number">23</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">14</span>    <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------------------+----------------------+-------+</span>
<span class="token number">3</span> <span class="token keyword">columns</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token keyword">rows</span> <span class="token operator">in</span> <span class="token keyword">set</span>

<span class="token operator">&gt;</span> <span class="token keyword">SHOW</span> SERIES CARDINALITY <span class="token keyword">ON</span> NOAA_water_database <span class="token keyword">FROM</span> h2o_quality
<span class="token operator">+</span><span class="token comment">----------------------+----------------------+-------+</span>
<span class="token operator">|</span> startTime            <span class="token operator">|</span> endTime              <span class="token operator">|</span> count <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------------------+----------------------+-------+</span>
<span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">08</span><span class="token operator">-</span><span class="token number">12</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">08</span><span class="token operator">-</span><span class="token number">19</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">6</span>     <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------------------+----------------------+-------+</span>
<span class="token number">3</span> <span class="token keyword">columns</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token keyword">rows</span> <span class="token operator">in</span> <span class="token keyword">set</span>

<span class="token operator">+</span><span class="token comment">----------------------+----------------------+-------+</span>
<span class="token operator">|</span> startTime            <span class="token operator">|</span> endTime              <span class="token operator">|</span> count <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------------------+----------------------+-------+</span>
<span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">08</span><span class="token operator">-</span><span class="token number">19</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">08</span><span class="token operator">-</span><span class="token number">26</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">6</span>     <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------------------+----------------------+-------+</span>
<span class="token number">3</span> <span class="token keyword">columns</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token keyword">rows</span> <span class="token operator">in</span> <span class="token keyword">set</span>

<span class="token operator">+</span><span class="token comment">----------------------+----------------------+-------+</span>
<span class="token operator">|</span> startTime            <span class="token operator">|</span> endTime              <span class="token operator">|</span> count <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------------------+----------------------+-------+</span>
<span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">08</span><span class="token operator">-</span><span class="token number">26</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">09</span><span class="token operator">-</span><span class="token number">02</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">6</span>     <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------------------+----------------------+-------+</span>
<span class="token number">3</span> <span class="token keyword">columns</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token keyword">rows</span> <span class="token operator">in</span> <span class="token keyword">set</span>

<span class="token operator">+</span><span class="token comment">----------------------+----------------------+-------+</span>
<span class="token operator">|</span> startTime            <span class="token operator">|</span> endTime              <span class="token operator">|</span> count <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------------------+----------------------+-------+</span>
<span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">09</span><span class="token operator">-</span><span class="token number">02</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">09</span><span class="token operator">-</span><span class="token number">09</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">6</span>     <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------------------+----------------------+-------+</span>
<span class="token number">3</span> <span class="token keyword">columns</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token keyword">rows</span> <span class="token operator">in</span> <span class="token keyword">set</span>

<span class="token operator">+</span><span class="token comment">----------------------+----------------------+-------+</span>
<span class="token operator">|</span> startTime            <span class="token operator">|</span> endTime              <span class="token operator">|</span> count <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------------------+----------------------+-------+</span>
<span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">09</span><span class="token operator">-</span><span class="token number">09</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">09</span><span class="token operator">-</span><span class="token number">16</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">6</span>     <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------------------+----------------------+-------+</span>
<span class="token number">3</span> <span class="token keyword">columns</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token keyword">rows</span> <span class="token operator">in</span> <span class="token keyword">set</span>

<span class="token operator">+</span><span class="token comment">----------------------+----------------------+-------+</span>
<span class="token operator">|</span> startTime            <span class="token operator">|</span> endTime              <span class="token operator">|</span> count <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------------------+----------------------+-------+</span>
<span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">09</span><span class="token operator">-</span><span class="token number">16</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">09</span><span class="token operator">-</span><span class="token number">23</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">6</span>     <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------------------+----------------------+-------+</span>
<span class="token number">3</span> <span class="token keyword">columns</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token keyword">rows</span> <span class="token operator">in</span> <span class="token keyword">set</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="show-shards" tabindex="-1"><a class="header-anchor" href="#show-shards" aria-hidden="true">#</a> SHOW SHARDS</h2><p>返回指定数据库的分片信息</p><h3 id="示例-5" tabindex="-1"><a class="header-anchor" href="#示例-5" aria-hidden="true">#</a> 示例</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token operator">&gt;</span> <span class="token keyword">SHOW</span> SHARDS
name: NOAA_water_database
<span class="token operator">+</span><span class="token comment">----+---------------------+------------------+-------------+----------------------+----------------------+----------------------+--------+------+------------------+</span>
<span class="token operator">|</span> id <span class="token operator">|</span> <span class="token keyword">database</span>            <span class="token operator">|</span> retention_policy <span class="token operator">|</span> shard_group <span class="token operator">|</span> start_time           <span class="token operator">|</span> end_time             <span class="token operator">|</span> expiry_time          <span class="token operator">|</span> owners <span class="token operator">|</span> tier <span class="token operator">|</span> downSample_level <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----+---------------------+------------------+-------------+----------------------+----------------------+----------------------+--------+------+------------------+</span>
<span class="token operator">|</span> <span class="token number">19</span> <span class="token operator">|</span> NOAA_water_database <span class="token operator">|</span> autogen          <span class="token operator">|</span> <span class="token number">19</span>          <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">08</span><span class="token operator">-</span><span class="token number">12</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">08</span><span class="token operator">-</span><span class="token number">19</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">08</span><span class="token operator">-</span><span class="token number">19</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">2</span>      <span class="token operator">|</span> warm <span class="token operator">|</span> <span class="token number">0</span>                <span class="token operator">|</span>
<span class="token operator">|</span> <span class="token number">20</span> <span class="token operator">|</span> NOAA_water_database <span class="token operator">|</span> autogen          <span class="token operator">|</span> <span class="token number">20</span>          <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">08</span><span class="token operator">-</span><span class="token number">19</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">08</span><span class="token operator">-</span><span class="token number">26</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">08</span><span class="token operator">-</span><span class="token number">26</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">2</span>      <span class="token operator">|</span> warm <span class="token operator">|</span> <span class="token number">0</span>                <span class="token operator">|</span>
<span class="token operator">|</span> <span class="token number">21</span> <span class="token operator">|</span> NOAA_water_database <span class="token operator">|</span> autogen          <span class="token operator">|</span> <span class="token number">21</span>          <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">08</span><span class="token operator">-</span><span class="token number">26</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">09</span><span class="token operator">-</span><span class="token number">02</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">09</span><span class="token operator">-</span><span class="token number">02</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">2</span>      <span class="token operator">|</span> warm <span class="token operator">|</span> <span class="token number">0</span>                <span class="token operator">|</span>
<span class="token operator">|</span> <span class="token number">18</span> <span class="token operator">|</span> NOAA_water_database <span class="token operator">|</span> autogen          <span class="token operator">|</span> <span class="token number">18</span>          <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">09</span><span class="token operator">-</span><span class="token number">02</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">09</span><span class="token operator">-</span><span class="token number">09</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">09</span><span class="token operator">-</span><span class="token number">09</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">2</span>      <span class="token operator">|</span> warm <span class="token operator">|</span> <span class="token number">0</span>                <span class="token operator">|</span>
<span class="token operator">|</span> <span class="token number">22</span> <span class="token operator">|</span> NOAA_water_database <span class="token operator">|</span> autogen          <span class="token operator">|</span> <span class="token number">22</span>          <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">09</span><span class="token operator">-</span><span class="token number">09</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">09</span><span class="token operator">-</span><span class="token number">16</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">09</span><span class="token operator">-</span><span class="token number">16</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">2</span>      <span class="token operator">|</span> warm <span class="token operator">|</span> <span class="token number">0</span>                <span class="token operator">|</span>
<span class="token operator">|</span> <span class="token number">23</span> <span class="token operator">|</span> NOAA_water_database <span class="token operator">|</span> autogen          <span class="token operator">|</span> <span class="token number">23</span>          <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">09</span><span class="token operator">-</span><span class="token number">16</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">09</span><span class="token operator">-</span><span class="token number">23</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">09</span><span class="token operator">-</span><span class="token number">23</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">2</span>      <span class="token operator">|</span> warm <span class="token operator">|</span> <span class="token number">0</span>                <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----+---------------------+------------------+-------------+----------------------+----------------------+----------------------+--------+------+------------------+</span>
<span class="token number">10</span> <span class="token keyword">columns</span><span class="token punctuation">,</span> <span class="token number">6</span> <span class="token keyword">rows</span> <span class="token operator">in</span> <span class="token keyword">set</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13),j=l(`<h2 id="show-shard-groups" tabindex="-1"><a class="header-anchor" href="#show-shard-groups" aria-hidden="true">#</a> SHOW SHARD GROUPS</h2><p>返回指定数据库的分片组信息</p><h3 id="示例-6" tabindex="-1"><a class="header-anchor" href="#示例-6" aria-hidden="true">#</a> 示例</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token operator">&gt;</span> <span class="token keyword">SHOW</span> SHARD GROUPS
name: shard groups
<span class="token operator">+</span><span class="token comment">----+---------------------+------------------+----------------------+----------------------+----------------------+</span>
<span class="token operator">|</span> id <span class="token operator">|</span> <span class="token keyword">database</span>            <span class="token operator">|</span> retention_policy <span class="token operator">|</span> start_time           <span class="token operator">|</span> end_time             <span class="token operator">|</span> expiry_time          <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----+---------------------+------------------+----------------------+----------------------+----------------------+</span>
<span class="token operator">|</span> <span class="token number">19</span> <span class="token operator">|</span> NOAA_water_database <span class="token operator">|</span> autogen          <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">08</span><span class="token operator">-</span><span class="token number">12</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">08</span><span class="token operator">-</span><span class="token number">19</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">08</span><span class="token operator">-</span><span class="token number">19</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span>
<span class="token operator">|</span> <span class="token number">20</span> <span class="token operator">|</span> NOAA_water_database <span class="token operator">|</span> autogen          <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">08</span><span class="token operator">-</span><span class="token number">19</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">08</span><span class="token operator">-</span><span class="token number">26</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">08</span><span class="token operator">-</span><span class="token number">26</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span>
<span class="token operator">|</span> <span class="token number">21</span> <span class="token operator">|</span> NOAA_water_database <span class="token operator">|</span> autogen          <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">08</span><span class="token operator">-</span><span class="token number">26</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">09</span><span class="token operator">-</span><span class="token number">02</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">09</span><span class="token operator">-</span><span class="token number">02</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span>
<span class="token operator">|</span> <span class="token number">18</span> <span class="token operator">|</span> NOAA_water_database <span class="token operator">|</span> autogen          <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">09</span><span class="token operator">-</span><span class="token number">02</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">09</span><span class="token operator">-</span><span class="token number">09</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">09</span><span class="token operator">-</span><span class="token number">09</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span>
<span class="token operator">|</span> <span class="token number">22</span> <span class="token operator">|</span> NOAA_water_database <span class="token operator">|</span> autogen          <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">09</span><span class="token operator">-</span><span class="token number">09</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">09</span><span class="token operator">-</span><span class="token number">16</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">09</span><span class="token operator">-</span><span class="token number">16</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span>
<span class="token operator">|</span> <span class="token number">23</span> <span class="token operator">|</span> NOAA_water_database <span class="token operator">|</span> autogen          <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">09</span><span class="token operator">-</span><span class="token number">16</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">09</span><span class="token operator">-</span><span class="token number">23</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span> <span class="token number">2019</span><span class="token operator">-</span><span class="token number">09</span><span class="token operator">-</span><span class="token number">23</span>T00:<span class="token number">00</span>:<span class="token number">00</span>Z <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----+---------------------+------------------+----------------------+----------------------+----------------------+</span>
<span class="token number">6</span> <span class="token keyword">columns</span><span class="token punctuation">,</span> <span class="token number">6</span> <span class="token keyword">rows</span> <span class="token operator">in</span> <span class="token keyword">set</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),J=s("code",null,"SHOW SHARDS",-1);function Q(ss,ns){const r=i("Tabs"),c=i("RouterLink");return k(),d("div",null,[b,e(r,{id:"63",data:[{title:"ts-cli"},{title:"HTTP API"}]},{tab0:a(({title:t,value:o,isActive:p})=>[v,g]),tab1:a(({title:t,value:o,isActive:p})=>[_]),_:1}),y,e(r,{id:"81",data:[{title:"ts-cli"},{title:"HTTP API"}]},{tab0:a(({title:t,value:o,isActive:p})=>[h,w]),tab1:a(({title:t,value:o,isActive:p})=>[T,A]),_:1}),S,s("p",null,[n("请查阅DML章节获得关于"),e(c,{to:"/zh/guide/query_data/select.html#select"},{default:a(()=>[O,n("子句")]),_:1}),n("、"),e(c,{to:"/zh/guide/query_data/select.html#limit-offset"},{default:a(()=>[q,n("子句")]),_:1}),n("、和正则表达式的介绍。")]),E,e(r,{id:"229",data:[{title:"ts-cli"},{title:"HTTP API"}]},{tab0:a(({title:t,value:o,isActive:p})=>[f,H]),tab1:a(({title:t,value:o,isActive:p})=>[I,N]),_:1}),W,s("p",null,[R,n("是可选的"),K,x,n("子句是可选的。请参考"),e(c,{to:"/zh/guide/query_data/select.html"},{default:a(()=>[Z,n("子句")]),_:1}),n("的介绍。")]),L,e(r,{id:"291",data:[{title:"ts-cli"},{title:"HTTP API"}]},{tab0:a(({title:t,value:o,isActive:p})=>[G,F]),tab1:a(({title:t,value:o,isActive:p})=>[Y,U]),_:1}),D,s("p",null,[n("参考"),e(c,{to:"/zh/guide/query_data/select.html#select"},{default:a(()=>[M,n("子句")]),_:1}),n("、"),e(c,{to:"/zh/guide/query_data/select.html#limit-offset"},{default:a(()=>[C,n("子句")]),_:1}),n("、和正则表达式的介绍。")]),P,e(r,{id:"413",data:[{title:"TS-CLI"},{title:"HTTP API"}]},{tab0:a(({title:t,value:o,isActive:p})=>[V,z]),tab1:a(({title:t,value:o,isActive:p})=>[B,X]),_:1}),$,s("p",null,[n("每一条数据表示一个数据库的分片信息，每个分片包含所使用的数据保留策略、分片起始时间等。相关阅读 "),e(c,{to:"/zh/guide/schema/retention_policy.html"},{default:a(()=>[n("数据保留策略")]),_:1})]),j,s("p",null,[n("这里有6个分片组，结合"),J,n("命令可以看出，每个分片组包含一个分片(SHARD)。openGemini单机默认初始化一个分片(SHARD)，如果是三节点的集群，则初始化为三个分片（每个节点一个）。当一个SHARD GROUP到期后，系统会创建新的SHARD GROUP，并分配新的分片 (SHARD)。相关阅读"),e(c,{to:"/zh/guide/schema/retention_policy.html#shard-duration"},{default:a(()=>[n("SHARD GROUP DURATION")]),_:1})])])}const es=u(m,[["render",Q],["__file","schema.html.vue"]]);export{es as default};
