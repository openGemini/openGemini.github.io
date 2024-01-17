import{_ as e,X as a,Y as s,a3 as n}from"./framework-1e2d737a.js";const i={},t=n(`<h1 id="启用https" tabindex="-1"><a class="header-anchor" href="#启用https" aria-hidden="true">#</a> 启用HTTPS</h1><p>以下是 openGemini 开启 HTTPS 的步骤：</p><h2 id="生成证书和密钥" tabindex="-1"><a class="header-anchor" href="#生成证书和密钥" aria-hidden="true">#</a> 生成证书和密钥</h2><p>首先，您需要生成 SSL 证书和密钥。您可以使用 openssl 命令生成。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>openssl req <span class="token parameter variable">-x509</span> <span class="token parameter variable">-nodes</span> <span class="token parameter variable">-newkey</span> rsa:2048 <span class="token parameter variable">-keyout</span> /etc/ssl/openGemini-selfsigned.key <span class="token parameter variable">-out</span> /etc/ssl/openGemini-selfsigned.crt <span class="token parameter variable">-days</span> <span class="token number">365</span> <span class="token parameter variable">-subj</span> <span class="token string">&quot;/C=US/ST=CA/L=San Francisco/O=openGemini/OU=openGemini/CN=localhost&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>以上命令会生成自签名的证书和密钥，并指定了有效期为 365 天。请根据您的需要修改参数。</p><h2 id="修改-opengemini-配置文件" tabindex="-1"><a class="header-anchor" href="#修改-opengemini-配置文件" aria-hidden="true">#</a> 修改 openGemini 配置文件</h2><p>接下来，您需要修改 openGemini 的配置文件。在配置文件中，找到 <code>[http]</code> 部分，并添加以下内容：</p><div class="language-toml line-numbers-mode" data-ext="toml"><pre class="language-toml"><code><span class="token punctuation">[</span><span class="token table class-name">http</span><span class="token punctuation">]</span>
<span class="token key property">bind-address</span> <span class="token punctuation">=</span> <span class="token string">&quot;127.0.0.1:8086&quot;</span>
<span class="token key property">https-enabled</span> <span class="token punctuation">=</span> <span class="token boolean">true</span>
<span class="token key property">https-certificate</span> <span class="token punctuation">=</span> <span class="token string">&quot;/etc/ssl/openGemini-selfsigned.crt&quot;</span>
<span class="token key property">https-private-key</span> <span class="token punctuation">=</span> <span class="token string">&quot;/etc/ssl/openGemini-selfsigned.key&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上配置会开启 HTTPS，并指定证书和密钥的路径。请根据您的实际情况修改证书和密钥的路径。</p><h2 id="重启-opengemini" tabindex="-1"><a class="header-anchor" href="#重启-opengemini" aria-hidden="true">#</a> 重启 openGemini</h2><p>修改配置文件后，您需要重启<code>ts-sql</code>进程或者<code>ts-server</code>进程以使更改生效。</p><h2 id="验证-https-是否已启用" tabindex="-1"><a class="header-anchor" href="#验证-https-是否已启用" aria-hidden="true">#</a> 验证 HTTPS 是否已启用</h2><p>您可以使用以下命令来验证 openGemini 是否已启用 HTTPS：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">-i</span> <span class="token parameter variable">-k</span> https://localhost:8086/ping
HTTP/1.1 <span class="token number">200</span> Connection established

HTTP/1.1 <span class="token number">204</span> No Content
Content-Type: application/json
Request-Id: 5073446b-e2b7-11ed-8002-72ef6a841b9c
X-Request-Id: 5073446b-e2b7-11ed-8002-72ef6a841b9c
Date: Mon, <span class="token number">24</span> Apr <span class="token number">2023</span> <span class="token number">15</span>:47:27 GMT
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上命令会发送一个 HTTPS 请求到 openGemini，并返回一个 <code>204</code> 响应。如果您得到了响应，则表示 HTTPS 已成功启用。请注意，由于我们使用的是自签名证书，因此您需要使用 <code>-k</code> 参数来跳过证书验证。</p><p><strong>也可通过使用CLI工具连接到openGemini来验证HTTPS是否正常工作</strong>：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ts-cli <span class="token parameter variable">-ssl</span> <span class="token parameter variable">-host</span> <span class="token operator">&lt;</span>domain_name<span class="token operator">&gt;</span>.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>以上就是在 openGemini 上启用 HTTPS 的步骤。如果您遇到任何问题，请随时与我们联系。</p>`,19),p=[t];function l(o,r){return a(),s("div",null,p)}const d=e(i,[["render",l],["__file","https.html.vue"]]);export{d as default};