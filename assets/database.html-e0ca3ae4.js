import{_ as t,X as o,Y as r,$ as e,a1 as a,Z as d,a0 as i,a3 as s,C as p}from"./framework-1e2d737a.js";const l={},c=s(`<h2 id="create-database" tabindex="-1"><a class="header-anchor" href="#create-database" aria-hidden="true">#</a> CREATE DATABASE</h2><h3 id="syntax" tabindex="-1"><a class="header-anchor" href="#syntax" aria-hidden="true">#</a> Syntax</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">DATABASE</span> <span class="token operator">&lt;</span>database_name<span class="token operator">&gt;</span> <span class="token punctuation">[</span><span class="token keyword">WITH</span> <span class="token punctuation">[</span>DURATION <span class="token operator">&lt;</span>duration<span class="token operator">&gt;</span><span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token keyword">REPLICATION</span> <span class="token operator">&lt;</span>n<span class="token operator">&gt;</span><span class="token punctuation">]</span> <span class="token punctuation">[</span>SHARD DURATION <span class="token operator">&lt;</span>duration<span class="token operator">&gt;</span><span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token keyword">INDEX</span> DURATION <span class="token operator">&lt;</span>duration<span class="token operator">&gt;</span><span class="token punctuation">]</span> <span class="token punctuation">[</span>NAME <span class="token operator">&lt;</span>retention<span class="token operator">-</span>policy<span class="token operator">-</span>name<span class="token operator">&gt;</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="database-name" tabindex="-1"><a class="header-anchor" href="#database-name" aria-hidden="true">#</a> &lt;database_name&gt;</h4><p>represents the db name</p><h4 id="duration-duration" tabindex="-1"><a class="header-anchor" href="#duration-duration" aria-hidden="true">#</a> DURATION &lt;duration&gt;</h4><p>represents how long the data keeps in openGemini, which is one of the attributes of the data retention policy</p><h4 id="shard-duration-duration" tabindex="-1"><a class="header-anchor" href="#shard-duration-duration" aria-hidden="true">#</a> SHARD DURATION &lt;duration&gt;</h4><p>represents the time range of each shard in a shardGroup</p><h4 id="index-duration-duration" tabindex="-1"><a class="header-anchor" href="#index-duration-duration" aria-hidden="true">#</a> INDEX DURATION &lt;duration&gt;</h4><p>represents the time range of indexGroup</p><p>There does not return any information when execute the command <code>create database</code> or repeated execute the command.</p><h3 id="examples" tabindex="-1"><a class="header-anchor" href="#examples" aria-hidden="true">#</a> Examples</h3><h4 id="create-database-1" tabindex="-1"><a class="header-anchor" href="#create-database-1" aria-hidden="true">#</a> Create database</h4><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token operator">&gt;</span> <span class="token keyword">CREATE</span> <span class="token keyword">DATABASE</span> <span class="token string">&quot;NOAA_water_database&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>This query creates a database named <code>NOAA_water_database</code>.</p><p>By default, openGemini also creates the default retention policy <code>autogen</code> and associates it with the database <code>NOAA_water_database</code>.</p><h4 id="create-a-database-with-specific-retention-policies" tabindex="-1"><a class="header-anchor" href="#create-a-database-with-specific-retention-policies" aria-hidden="true">#</a> Create a database with specific retention policies</h4><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token operator">&gt;</span> <span class="token keyword">CREATE</span> <span class="token keyword">DATABASE</span> <span class="token string">&quot;NOAA_water_database&quot;</span> <span class="token keyword">WITH</span> DURATION <span class="token number">3</span>d <span class="token keyword">REPLICATION</span> <span class="token number">1</span> SHARD DURATION <span class="token number">1</span>h <span class="token keyword">INDEX</span> DURATION <span class="token number">7</span>h NAME <span class="token string">&quot;rp3d&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>This operation creates a database with the name <code>NOAA_water_database</code>. It also creates a default retention policy for <code>NOAA_water_database</code> with the name <code>rp3d</code>, data is kept in the database for 3 days, data replication is 1, and the time range for each shard is 1 hour, and the time range for index group is 7 hours.</p>`,20),u=e("strong",null,"related entries",-1),h=s(`<h2 id="show-databases" tabindex="-1"><a class="header-anchor" href="#show-databases" aria-hidden="true">#</a> SHOW DATABASES</h2><p>Returns a list of all databases in openGemini.</p><h3 id="syntax-1" tabindex="-1"><a class="header-anchor" href="#syntax-1" aria-hidden="true">#</a> Syntax</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SHOW</span> <span class="token keyword">DATABASES</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="examples-1" tabindex="-1"><a class="header-anchor" href="#examples-1" aria-hidden="true">#</a> Examples</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token operator">&gt;</span> <span class="token keyword">SHOW</span> <span class="token keyword">DATABASES</span>
name: <span class="token keyword">databases</span>
<span class="token operator">+</span><span class="token comment">---------------------+</span>
<span class="token operator">|</span> name                <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">---------------------+</span>
<span class="token operator">|</span> NOAA_water_database <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">---------------------+</span>
<span class="token number">1</span> <span class="token keyword">columns</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token keyword">rows</span> <span class="token operator">in</span> <span class="token keyword">set</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>openGemini has one database: <code>NOAA_water_database</code>.</p><h2 id="drop-database" tabindex="-1"><a class="header-anchor" href="#drop-database" aria-hidden="true">#</a> DROP DATABASE</h2><p><code>DROP DATABASE</code> will drop a database and removes all database&#39;s data include measurements, series, continuous queries, and retention policies.</p><h3 id="syntax-2" tabindex="-1"><a class="header-anchor" href="#syntax-2" aria-hidden="true">#</a> Syntax</h3><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">DROP</span> <span class="token keyword">DATABASE</span> <span class="token operator">&lt;</span>database_name<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="examples-2" tabindex="-1"><a class="header-anchor" href="#examples-2" aria-hidden="true">#</a> Examples</h3><p>delete db &#39;NOAA_water_database&#39;</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token operator">&gt;</span> <span class="token keyword">DROP</span> <span class="token keyword">DATABASE</span> <span class="token string">&quot;NOAA_water_database&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>DROP DATABASE</code> returns no results when the command excution successful. openGemini will not return an error if you delete a non-existing database.</p>`,15);function k(m,b){const n=p("RouterLink");return o(),r("div",null,[c,e("p",null,[u,a(),d(n,{to:"/guide/schema/retention_policy.html"},{default:i(()=>[a("Retention policy")]),_:1})]),h])}const v=t(l,[["render",k],["__file","database.html.vue"]]);export{v as default};