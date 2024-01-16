import{_ as d,X as u,Y as k,Z as e,a0 as a,$ as s,a1 as n,a3 as t,C as r}from"./framework-1e2d737a.js";const m={},b=t(`<p>This chapter mainly includes the following contents:</p><ul><li><a href="#show-tag-keys">SHOW TAG KEYS </a></li><li><a href="#show-tag-values">SHOW TAG VALUES</a></li><li><a href="#show-field-keys">SHOW FIELD KEYS </a></li><li><a href="#show-series">SHOW SERIES</a></li><li><a href="#show-series-cardinality">SHOW SERIES CARDINALITY</a></li><li><a href="#show-shards">SHOW SHARDS </a></li><li><a href="#show-shard-groups">SHOW SHARD GROUPS</a></li></ul><h2 id="show-tag-keys" tabindex="-1"><a class="header-anchor" href="#show-tag-keys" aria-hidden="true">#</a> SHOW TAG KEYS</h2><p>View all TAG fields in the measurements</p><h3 id="syntax" tabindex="-1"><a class="header-anchor" href="#syntax" aria-hidden="true">#</a> Syntax</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SHOW</span> TAG <span class="token keyword">KEYS</span> <span class="token punctuation">[</span><span class="token keyword">ON</span> <span class="token operator">&lt;</span>database_name<span class="token operator">&gt;</span><span class="token punctuation">]</span> <span class="token punctuation">[</span>FROM_CLAUSE<span class="token punctuation">]</span> <span class="token punctuation">[</span>LIMIT_CLAUSE<span class="token punctuation">]</span> <span class="token punctuation">[</span>OFFSET_CLAUSE<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>ON &lt;database_name&gt;</code> is optional. If the query does not contain <code>ON &lt;database_name&gt;</code>, you must specify the database in the CLI using <code>USE &lt;database_name&gt;</code> or in the openGemini API request using the parameter <code>db</code>.</p><p><code>FROM</code> is optional.</p><h3 id="examples" tabindex="-1"><a class="header-anchor" href="#examples" aria-hidden="true">#</a> Examples</h3><h4 id="show-tag-keys-with-the-on-clause" tabindex="-1"><a class="header-anchor" href="#show-tag-keys-with-the-on-clause" aria-hidden="true">#</a> <code>SHOW TAG KEYS</code> with the <code>ON</code> clause</h4><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token operator">&gt;</span> <span class="token keyword">SHOW</span> TAG <span class="token keyword">KEYS</span> <span class="token keyword">ON</span> <span class="token string">&quot;NOAA_water_database&quot;</span>
name: average_temperature
<span class="token operator">+</span><span class="token comment">----------+</span>
<span class="token operator">|</span> tagKey   <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------+</span>
<span class="token operator">|</span> location <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------+</span>
<span class="token number">1</span> <span class="token keyword">columns</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token keyword">rows</span> <span class="token operator">in</span> <span class="token keyword">set</span>

name: h2o_feet
<span class="token operator">+</span><span class="token comment">----------+</span>
<span class="token operator">|</span> tagKey   <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------+</span>
<span class="token operator">|</span> location <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------+</span>
<span class="token number">1</span> <span class="token keyword">columns</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token keyword">rows</span> <span class="token operator">in</span> <span class="token keyword">set</span>

name: h2o_pH
<span class="token operator">+</span><span class="token comment">----------+</span>
<span class="token operator">|</span> tagKey   <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------+</span>
<span class="token operator">|</span> location <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------+</span>
<span class="token number">1</span> <span class="token keyword">columns</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token keyword">rows</span> <span class="token operator">in</span> <span class="token keyword">set</span>

name: h2o_quality
<span class="token operator">+</span><span class="token comment">----------+</span>
<span class="token operator">|</span> tagKey   <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------+</span>
<span class="token operator">|</span> location <span class="token operator">|</span>
<span class="token operator">|</span> randtag  <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------+</span>
<span class="token number">1</span> <span class="token keyword">columns</span><span class="token punctuation">,</span> <span class="token number">2</span> <span class="token keyword">rows</span> <span class="token operator">in</span> <span class="token keyword">set</span>

name: h2o_temperature
<span class="token operator">+</span><span class="token comment">----------+</span>
<span class="token operator">|</span> tagKey   <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------+</span>
<span class="token operator">|</span> location <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----------+</span>
<span class="token number">1</span> <span class="token keyword">columns</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token keyword">rows</span> <span class="token operator">in</span> <span class="token keyword">set</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This query returns the tag key in the database <code>NOAA_water_database</code>. The query results are grouped by the name of the measurement; it shows that each measurement has a tag key named <code>location</code> and that the measurement <code>h2o_quality</code> also has an additional tag key <code>randtag</code>.</p><h4 id="show-tag-keys-without-the-on-clause" tabindex="-1"><a class="header-anchor" href="#show-tag-keys-without-the-on-clause" aria-hidden="true">#</a> <code>SHOW TAG KEYS</code> without the <code>ON</code> clause</h4>`,13),v=s("p",null,[n("Use "),s("code",null,"USE <database_name>"),n(" to specify the database:")],-1),h=s("div",{class:"language-sql line-numbers-mode","data-ext":"sql"},[s("pre",{class:"language-sql"},[s("code",null,[s("span",{class:"token operator"},">"),n(),s("span",{class:"token keyword"},"use"),n(` NOAA_water_database
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
`)])]),s("div",{class:"line-numbers","aria-hidden":"true"},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1),g=s("p",null,[n("Use the parameter "),s("code",null,"db"),n(" to specify the database")],-1),y=s("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[s("pre",{class:"language-bash"},[s("code",null,[s("span",{class:"token operator"},">"),n(),s("span",{class:"token function"},"curl"),n(),s("span",{class:"token parameter variable"},"-G"),n(),s("span",{class:"token string"},'"http://localhost:8086/query?db=NOAA_water_database&pretty=true"'),n(" --data-urlencode "),s("span",{class:"token string"},'"q=SHOW TAG KEYS"'),n(`
`),s("span",{class:"token punctuation"},"{"),n(`
    `),s("span",{class:"token string"},'"results"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token punctuation"},"["),n(`
        `),s("span",{class:"token punctuation"},"{"),n(`
            `),s("span",{class:"token string"},'"statement_id"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token number"},"0"),n(`,
            `),s("span",{class:"token string"},'"series"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token punctuation"},"["),n(`
                `),s("span",{class:"token punctuation"},"{"),n(`
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
        `),s("span",{class:"token punctuation"},"}"),n(`
    `),s("span",{class:"token punctuation"},"]"),n(`
`),s("span",{class:"token punctuation"},"}"),n(`
`)])]),s("div",{class:"line-numbers","aria-hidden":"true"},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1),_=t(`<h4 id="show-tag-keys-with-multiple-clauses" tabindex="-1"><a class="header-anchor" href="#show-tag-keys-with-multiple-clauses" aria-hidden="true">#</a> <code>SHOW TAG KEYS</code> with multiple clauses</h4><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token operator">&gt;</span> <span class="token keyword">SHOW</span> TAG <span class="token keyword">KEYS</span> <span class="token keyword">ON</span> <span class="token string">&quot;NOAA_water_database&quot;</span> <span class="token keyword">FROM</span> <span class="token string">&quot;h2o_quality&quot;</span> <span class="token keyword">LIMIT</span> <span class="token number">1</span> <span class="token keyword">OFFSET</span> <span class="token number">1</span>
name: h2o_quality
<span class="token operator">+</span><span class="token comment">---------+</span>
<span class="token operator">|</span> tagKey  <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">---------+</span>
<span class="token operator">|</span> randtag <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">---------+</span>
<span class="token number">1</span> <span class="token keyword">columns</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token keyword">rows</span> <span class="token operator">in</span> <span class="token keyword">set</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This query returns the tag key of the measurement named <code>h2o_quality</code> in the database <code>NOAA_water_database</code>. The <code>LIMIT</code> clause limits the number of tag keys returned to 1, and the <code>OFFSET</code> clause offsets the output by one.</p><h4 id="show-tag-key-cardinality" tabindex="-1"><a class="header-anchor" href="#show-tag-key-cardinality" aria-hidden="true">#</a> SHOW TAG KEY CARDINALITY</h4><p>In some cases, you only need to know the number of TAGs. You can use the &#39;SHOW TAG KEY CARDINALITY&#39; command as follows:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SHOW TAG KEY CARDINALITY [ON &lt;database_name&gt;] [FROM_CLAUSE]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token operator">&gt;</span> <span class="token keyword">SHOW</span> TAG <span class="token keyword">KEY</span> CARDINALITY
<span class="token comment">#TODO</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="show-tag-values" tabindex="-1"><a class="header-anchor" href="#show-tag-values" aria-hidden="true">#</a> SHOW TAG VALUES</h2><p>Returns the tag value of the specified tag key in the database.</p><h3 id="syntax-1" tabindex="-1"><a class="header-anchor" href="#syntax-1" aria-hidden="true">#</a> Syntax</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SHOW</span> TAG <span class="token keyword">VALUES</span> <span class="token punctuation">[</span><span class="token keyword">ON</span> <span class="token operator">&lt;</span>database_name<span class="token operator">&gt;</span><span class="token punctuation">]</span> <span class="token punctuation">[</span>FROM_CLAUSE<span class="token punctuation">]</span> <span class="token keyword">WITH</span> <span class="token keyword">KEY</span> <span class="token punctuation">[</span> <span class="token punctuation">[</span><span class="token operator">&lt;</span>operator<span class="token operator">&gt;</span> <span class="token string">&quot;&lt;tag_key&gt;&quot;</span> <span class="token operator">|</span> <span class="token operator">&lt;</span>regular_expression<span class="token operator">&gt;</span><span class="token punctuation">]</span> <span class="token operator">|</span> <span class="token punctuation">[</span><span class="token operator">IN</span> <span class="token punctuation">(</span><span class="token string">&quot;&lt;tag_key1&gt;&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;&lt;tag_key2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token keyword">WHERE</span> <span class="token operator">&lt;</span>tag_key<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>operator<span class="token operator">&gt;</span> <span class="token punctuation">[</span><span class="token string">&#39;&lt;tag_value&gt;&#39;</span> <span class="token operator">|</span> <span class="token operator">&lt;</span>regular_expression<span class="token operator">&gt;</span><span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token punctuation">[</span>LIMIT_CLAUSE<span class="token punctuation">]</span> <span class="token punctuation">[</span>OFFSET_CLAUSE<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>ON &lt;database_name&gt;</code> is optional. If the query does not contain <code>ON &lt;database_name&gt;</code>, you must specify the database in the CLI using <code>USE &lt;database_name&gt;</code> or in the HTTP API request using the parameter <code>db</code>.</p><p>The <code>WITH</code> clause is mandatory and it supports specifying a tag key, a regular expression or multiple tag keys.</p><p>The <code>FROM</code> clause, <code>WHERE</code> clause, <code>LIMIT</code> clause and <code>OFFSET</code> clause are optional. The <code>WHERE</code> clause supports tag comparisons; field comparisons are disabled in <code>SHOW TAG VALUES</code> queries.</p><p>Operators supported in the <code>WITH</code> clause and the <code>WHERE</code> clause:</p><table><thead><tr><th>Operators</th><th>Description</th></tr></thead><tbody><tr><td><code>=</code></td><td>equal</td></tr><tr><td><code>&lt;&gt;</code></td><td>not equal</td></tr><tr><td><code>!=</code></td><td>not equal</td></tr><tr><td><code>=~</code></td><td>match</td></tr><tr><td><code>!~</code></td><td>not match</td></tr></tbody></table>`,16),w=s("strong",null,"relate entries",-1),f=s("code",null,"FROM",-1),q=s("code",null,"LIMIT、OFFSET",-1),S=t(`<h3 id="examples-1" tabindex="-1"><a class="header-anchor" href="#examples-1" aria-hidden="true">#</a> Examples</h3><h4 id="show-tag-values-with-the-on-clause" tabindex="-1"><a class="header-anchor" href="#show-tag-values-with-the-on-clause" aria-hidden="true">#</a> <code>SHOW TAG VALUES</code> with the <code>ON</code> clause</h4><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token operator">&gt;</span> <span class="token keyword">SHOW</span> TAG <span class="token keyword">VALUES</span> <span class="token keyword">ON</span> <span class="token string">&quot;NOAA_water_database&quot;</span> <span class="token keyword">WITH</span> <span class="token keyword">KEY</span> <span class="token operator">=</span> <span class="token string">&quot;randtag&quot;</span>

name: h2o_quality
<span class="token keyword">key</span>       <span class="token keyword">value</span>
<span class="token comment">---       -----</span>
randtag   <span class="token number">1</span>
randtag   <span class="token number">2</span>
randtag   <span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This query returns all tag values for the tag key <code>randtag</code> in the database <code>NOAA_water_database</code>. <code>SHOW TAG VALUES</code> groups the query results by the name of the measurement.</p><h4 id="show-tag-keys-without-the-on-clause-1" tabindex="-1"><a class="header-anchor" href="#show-tag-keys-without-the-on-clause-1" aria-hidden="true">#</a> <code>SHOW TAG KEYS</code> without the <code>ON</code> clause</h4>`,5),O=s("p",null,[n("Use "),s("code",null,"USE <database_name>"),n(" to specify the database:")],-1),A=s("div",{class:"language-sql line-numbers-mode","data-ext":"sql"},[s("pre",{class:"language-sql"},[s("code",null,[s("span",{class:"token operator"},">"),n(),s("span",{class:"token keyword"},"USE"),n(` NOAA_water_database
`),s("span",{class:"token keyword"},"Using"),n(),s("span",{class:"token keyword"},"database"),n(` NOAA_water_database

`),s("span",{class:"token operator"},">"),n(),s("span",{class:"token keyword"},"SHOW"),n(" TAG "),s("span",{class:"token keyword"},"VALUES"),n(),s("span",{class:"token keyword"},"WITH"),n(),s("span",{class:"token keyword"},"KEY"),n(),s("span",{class:"token operator"},"="),n(),s("span",{class:"token string"},'"randtag"'),n(`

name: h2o_quality
`),s("span",{class:"token keyword"},"key"),n("       "),s("span",{class:"token keyword"},"value"),n(`
`),s("span",{class:"token comment"},"---       -----"),n(`
randtag   `),s("span",{class:"token number"},"1"),n(`
randtag   `),s("span",{class:"token number"},"2"),n(`
randtag   `),s("span",{class:"token number"},"3"),n(`
`)])]),s("div",{class:"line-numbers","aria-hidden":"true"},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1),E=s("p",null,[n("Use the parameter "),s("code",null,"db"),n(" to specify the database")],-1),T=s("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[s("pre",{class:"language-bash"},[s("code",null,[s("span",{class:"token operator"},">"),n(),s("span",{class:"token function"},"curl"),n(),s("span",{class:"token parameter variable"},"-G"),n(),s("span",{class:"token string"},'"http://localhost:8086/query?db=NOAA_water_database&pretty=true"'),n(" --data-urlencode "),s("span",{class:"token string"},`'q=SHOW TAG VALUES WITH KEY = "randtag"'`),n(`

`),s("span",{class:"token punctuation"},"{"),n(`
    `),s("span",{class:"token string"},'"results"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token punctuation"},"["),n(`
        `),s("span",{class:"token punctuation"},"{"),n(`
            `),s("span",{class:"token string"},'"statement_id"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token number"},"0"),n(`,
            `),s("span",{class:"token string"},'"series"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token punctuation"},"["),n(`
                `),s("span",{class:"token punctuation"},"{"),n(`
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
                `),s("span",{class:"token punctuation"},"}"),n(`
            `),s("span",{class:"token punctuation"},"]"),n(`
        `),s("span",{class:"token punctuation"},"}"),n(`
    `),s("span",{class:"token punctuation"},"]"),n(`
`),s("span",{class:"token punctuation"},"}"),n(`
`)])]),s("div",{class:"line-numbers","aria-hidden":"true"},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1),H=t(`<h4 id="show-tag-values-with-multiple-clauses" tabindex="-1"><a class="header-anchor" href="#show-tag-values-with-multiple-clauses" aria-hidden="true">#</a> <code>SHOW TAG VALUES</code> with multiple clauses</h4><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token operator">&gt;</span> <span class="token keyword">SHOW</span> TAG <span class="token keyword">VALUES</span> <span class="token keyword">ON</span> <span class="token string">&quot;NOAA_water_database&quot;</span> <span class="token keyword">WITH</span> <span class="token keyword">KEY</span> <span class="token operator">IN</span> <span class="token punctuation">(</span><span class="token string">&quot;location&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;randtag&quot;</span><span class="token punctuation">)</span> <span class="token keyword">WHERE</span> <span class="token string">&quot;randtag&quot;</span> <span class="token operator">=</span><span class="token operator">~</span> <span class="token operator">/</span><span class="token punctuation">.</span><span class="token operator">/</span> <span class="token keyword">LIMIT</span> <span class="token number">3</span>

name: h2o_quality
<span class="token keyword">key</span>        <span class="token keyword">value</span>
<span class="token comment">---        -----</span>
location   coyote_creek
location   santa_monica
randtag	   <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This query returns the tag value of <code>location</code> or <code>randtag</code> from all measurements of database <code>NOAA_water_database</code>, and the returned data must also satisfy the condition that the tag value of <code>randtag</code> is not null. The <code>LIMIT</code> clause limits the number of returned tag values to 3.</p><h2 id="show-field-keys" tabindex="-1"><a class="header-anchor" href="#show-field-keys" aria-hidden="true">#</a> SHOW FIELD KEYS</h2><p>Returns the data type of field key and field value.</p><h3 id="syntax-2" tabindex="-1"><a class="header-anchor" href="#syntax-2" aria-hidden="true">#</a> Syntax</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SHOW</span> FIELD <span class="token keyword">KEYS</span> <span class="token punctuation">[</span><span class="token keyword">ON</span> <span class="token operator">&lt;</span>database_name<span class="token operator">&gt;</span><span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token keyword">FROM</span> <span class="token operator">&lt;</span>measurement_name<span class="token operator">&gt;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>ON &lt;database_name&gt;</code> is optional. If the query does not contain <code>ON &lt;database_name&gt;</code>, you must specify the database in the CLI using <code>USE &lt;database_name&gt;</code> or in the openGemini API request using the parameter <code>db</code>.</p><p>The <code>FROM</code> clause is also optional.</p>`,9),x=s("strong",null,"relate entries",-1),I=s("code",null,"FROM",-1),W=t(`<h3 id="examples-2" tabindex="-1"><a class="header-anchor" href="#examples-2" aria-hidden="true">#</a> Examples</h3><h4 id="show-field-keys-with-the-on-clause" tabindex="-1"><a class="header-anchor" href="#show-field-keys-with-the-on-clause" aria-hidden="true">#</a> <code>SHOW FIELD KEYS</code> with the <code>ON</code> clause</h4><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token operator">&gt;</span> <span class="token keyword">SHOW</span> FIELD <span class="token keyword">KEYS</span> <span class="token keyword">ON</span> <span class="token string">&quot;NOAA_water_database&quot;</span>

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This query returns the field key of each measurement in the database <code>NOAA_water_database</code> and the data type of the corresponding field value.</p><h4 id="show-field-keys-without-the-on-clause" tabindex="-1"><a class="header-anchor" href="#show-field-keys-without-the-on-clause" aria-hidden="true">#</a> <code>SHOW FIELD KEYS</code> without the <code>ON</code> clause</h4>`,5),N=s("p",null,[n("Use "),s("code",null,"USE <database_name>"),n(" to specify the database:")],-1),K=s("div",{class:"language-sql line-numbers-mode","data-ext":"sql"},[s("pre",{class:"language-sql"},[s("code",null,[s("span",{class:"token operator"},">"),n(),s("span",{class:"token keyword"},"USE"),n(` NOAA_water_database
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
`)])]),s("div",{class:"line-numbers","aria-hidden":"true"},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1),L=s("p",null,[n("Use the parameter "),s("code",null,"db"),n(" to specify the database:")],-1),R=s("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[s("pre",{class:"language-bash"},[s("code",null,[s("span",{class:"token operator"},">"),n(),s("span",{class:"token function"},"curl"),n(),s("span",{class:"token parameter variable"},"-G"),n(),s("span",{class:"token string"},'"http://localhost:8086/query?db=NOAA_water_database&pretty=true"'),n(" --data-urlencode "),s("span",{class:"token string"},"'q=SHOW FIELD KEYS'"),n(`

`),s("span",{class:"token punctuation"},"{"),n(`
    `),s("span",{class:"token string"},'"results"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token punctuation"},"["),n(`
        `),s("span",{class:"token punctuation"},"{"),n(`
            `),s("span",{class:"token string"},'"statement_id"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token number"},"0"),n(`,
            `),s("span",{class:"token string"},'"series"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token punctuation"},"["),n(`
                `),s("span",{class:"token punctuation"},"{"),n(`
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
        `),s("span",{class:"token punctuation"},"}"),n(`
    `),s("span",{class:"token punctuation"},"]"),n(`
`),s("span",{class:"token punctuation"},"}"),n(`
`)])]),s("div",{class:"line-numbers","aria-hidden":"true"},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1),U=t(`<h4 id="show-field-keys-with-a-from-clause" tabindex="-1"><a class="header-anchor" href="#show-field-keys-with-a-from-clause" aria-hidden="true">#</a> <code>SHOW FIELD KEYS</code> with a <code>FROM</code> clause</h4><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token operator">&gt;</span> <span class="token keyword">SHOW</span> FIELD <span class="token keyword">KEYS</span> <span class="token keyword">ON</span> <span class="token string">&quot;NOAA_water_database&quot;</span> <span class="token keyword">FROM</span> <span class="token string">&quot;h2o_feet&quot;</span>

name: h2o_feet
fieldKey            fieldType
<span class="token comment">--------            ---------</span>
<span class="token keyword">level</span> description   string
water_level         <span class="token keyword">float</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This query returns the data type of the fields key and the corresponding field value in the measurement <code>h2o_feet</code> in the database <code>NOAA_water_database</code>.</p><h2 id="show-series" tabindex="-1"><a class="header-anchor" href="#show-series" aria-hidden="true">#</a> SHOW SERIES</h2><p>Returns the time series of the specified database.</p><h3 id="syntax-3" tabindex="-1"><a class="header-anchor" href="#syntax-3" aria-hidden="true">#</a> Syntax</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SHOW</span> SERIES <span class="token punctuation">[</span><span class="token keyword">ON</span> <span class="token operator">&lt;</span>database_name<span class="token operator">&gt;</span><span class="token punctuation">]</span> <span class="token punctuation">[</span>FROM_CLAUSE<span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token keyword">WHERE</span> <span class="token operator">&lt;</span>tag_key<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>operator<span class="token operator">&gt;</span> <span class="token punctuation">[</span> <span class="token string">&#39;&lt;tag_value&gt;&#39;</span> <span class="token operator">|</span> <span class="token operator">&lt;</span>regular_expression<span class="token operator">&gt;</span><span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token punctuation">[</span>LIMIT_CLAUSE<span class="token punctuation">]</span> <span class="token punctuation">[</span>OFFSET_CLAUSE<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>ON &lt;database_name&gt;</code> is optional. If the query does not contain <code>ON &lt;database_name&gt;</code>, you must specify the database in the CLI using <code>USE &lt;database_name&gt;</code> or in the openGemini API request using the parameter <code>db</code>.</p><p>The <code>WHERE</code> clause supports <code>tag</code> comparisons; <code>field</code> comparisons are invalid in <code>SHOW SERIES</code> queries.</p><p>Operators supported in the <code>WHERE</code> clause:</p><table><thead><tr><th>Operators</th><th>Description</th></tr></thead><tbody><tr><td><code>=</code></td><td>equal</td></tr><tr><td><code>&lt;&gt;</code></td><td>not equal</td></tr><tr><td><code>!=</code></td><td>not equal</td></tr><tr><td><code>=~</code></td><td>match</td></tr><tr><td><code>!~</code></td><td>not match</td></tr></tbody></table>`,11),F=s("strong",null,"relate entries",-1),Y=s("code",null,"FROM",-1),G=s("code",null,"LIMIT、OFFSET",-1),M=t(`<h3 id="examples-3" tabindex="-1"><a class="header-anchor" href="#examples-3" aria-hidden="true">#</a> Examples</h3><h4 id="show-series-with-an-on-clause" tabindex="-1"><a class="header-anchor" href="#show-series-with-an-on-clause" aria-hidden="true">#</a> <code>SHOW SERIES</code> with an <code>ON</code> clause</h4><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> <span class="token keyword">SHOW</span> SERIES <span class="token keyword">ON</span> NOAA_water_database
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The output of this query is similar to the line protocol format. Everything before the first comma is the name of <code>measurement</code>. Everything after the first comma is the <code>tag key</code> or <code>tag value</code>. The database <code>NOAA_water_database</code> has five different <code>measurement</code>s and 14 different series.</p><h4 id="show-series-without-the-on-clause" tabindex="-1"><a class="header-anchor" href="#show-series-without-the-on-clause" aria-hidden="true">#</a> <code>SHOW SERIES</code> without the <code>ON</code> clause</h4>`,5),D=s("p",null,[n("Use "),s("code",null,"USE <database_name>"),n(" to specify the database:")],-1),C=s("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[s("pre",{class:"language-bash"},[s("code",null,[s("span",{class:"token operator"},">"),n(` USE NOAA_water_database
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
`)])]),s("div",{class:"line-numbers","aria-hidden":"true"},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1),V=s("p",null,[n("Use the parameter "),s("code",null,"db"),n(" to specify the database")],-1),P=s("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[s("pre",{class:"language-bash"},[s("code",null,[s("span",{class:"token operator"},">"),n(),s("span",{class:"token function"},"curl"),n(),s("span",{class:"token parameter variable"},"-G"),n(),s("span",{class:"token string"},'"http://localhost:8086/query?db=NOAA_water_database&pretty=true"'),n(" --data-urlencode "),s("span",{class:"token string"},'"q=SHOW SERIES"'),n(`
`),s("span",{class:"token punctuation"},"{"),n(`
    `),s("span",{class:"token string"},'"results"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token punctuation"},"["),n(`
        `),s("span",{class:"token punctuation"},"{"),n(`
            `),s("span",{class:"token string"},'"statement_id"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token number"},"0"),n(`,
            `),s("span",{class:"token string"},'"series"'),s("span",{class:"token builtin class-name"},":"),n(),s("span",{class:"token punctuation"},"["),n(`
                `),s("span",{class:"token punctuation"},"{"),n(`
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
                `),s("span",{class:"token punctuation"},"}"),n(`
            `),s("span",{class:"token punctuation"},"]"),n(`
        `),s("span",{class:"token punctuation"},"}"),n(`
    `),s("span",{class:"token punctuation"},"]"),n(`
`),s("span",{class:"token punctuation"},"}"),n(`
`)])]),s("div",{class:"line-numbers","aria-hidden":"true"},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1),B=t(`<h4 id="show-series-with-multiple-clauses" tabindex="-1"><a class="header-anchor" href="#show-series-with-multiple-clauses" aria-hidden="true">#</a> <code>SHOW SERIES</code> with multiple clauses</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&gt; SHOW SERIES ON NOAA_water_database FROM &quot;h2o_quality&quot; WHERE &quot;location&quot; = &#39;coyote_creek&#39; LIMIT 2
+---------------------------------------------+
| key                                         |
+---------------------------------------------+
| h2o_quality,location=coyote_creek,randtag=1 |
| h2o_quality,location=coyote_creek,randtag=2 |
+---------------------------------------------+
1 columns, 2 rows in set
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This query returns all series associated with measurement <code>h2o_quality</code> and tag <code>location = coyote_creek</code> in database <code>NOAA_water_database</code>. The <code>LIMIT</code> clause limits the number of series returned to 2.</p><h2 id="show-series-cardinality" tabindex="-1"><a class="header-anchor" href="#show-series-cardinality" aria-hidden="true">#</a> SHOW SERIES CARDINALITY</h2><p>##TODO</p><h2 id="show-shards" tabindex="-1"><a class="header-anchor" href="#show-shards" aria-hidden="true">#</a> SHOW SHARDS</h2><p>##TODO</p><h2 id="show-shard-groups" tabindex="-1"><a class="header-anchor" href="#show-shard-groups" aria-hidden="true">#</a> SHOW SHARD GROUPS</h2><p>##TODO</p>`,9);function X(Z,$){const p=r("Tabs"),i=r("RouterLink");return u(),k("div",null,[b,e(p,{id:"69",data:[{title:"ts-cli"},{title:"HTTP API"}]},{tab0:a(({title:o,value:l,isActive:c})=>[v,h]),tab1:a(({title:o,value:l,isActive:c})=>[g,y]),_:1}),_,s("p",null,[w,n(),e(i,{to:"/guide/query_data/select.html#select"},{default:a(()=>[f]),_:1}),n("、"),e(i,{to:"/guide/query_data/select.html#limit-offset"},{default:a(()=>[q]),_:1})]),S,e(p,{id:"190",data:[{title:"ts-cli"},{title:"HTTP API"}]},{tab0:a(({title:o,value:l,isActive:c})=>[O,A]),tab1:a(({title:o,value:l,isActive:c})=>[E,T]),_:1}),H,s("p",null,[x,n(),e(i,{to:"/guide/query_data/select.html"},{default:a(()=>[I]),_:1})]),W,e(p,{id:"243",data:[{title:"ts-cli"},{title:"HTTP API"}]},{tab0:a(({title:o,value:l,isActive:c})=>[N,K]),tab1:a(({title:o,value:l,isActive:c})=>[L,R]),_:1}),U,s("p",null,[F,n(),e(i,{to:"/guide/query_data/select.html#select"},{default:a(()=>[Y]),_:1}),n("、"),e(i,{to:"/guide/query_data/select.html#limit-offset"},{default:a(()=>[G]),_:1})]),M,e(p,{id:"353",data:[{title:"TS-CLI"},{title:"HTTP API"}]},{tab0:a(({title:o,value:l,isActive:c})=>[D,C]),tab1:a(({title:o,value:l,isActive:c})=>[V,P]),_:1}),B])}const z=d(m,[["render",X],["__file","schema.html.vue"]]);export{z as default};
