const e=JSON.parse('{"key":"v-f56bc9e0","path":"/zh/guide/schema/measurement.html","title":"表操作","lang":"zh-CN","frontmatter":{"title":"表操作","order":2,"description":"CREATE MEASUREMENT(创建表) openGemini在写数据时支持自动创建表，但如下三种情况，需要提前创建表 指定分区键 openGemini中数据默认按照时间线进行hash分区打散，但某些场景下，业务频繁使用某个或者某几个TAG进行数据检索，采用时间线hash分区的方式让这部分TAG的数据分散到了不同的节点，造成查询扇出度比较大。 如...","head":[["link",{"rel":"alternate","hreflang":"en-us","href":"https://openGemini.github.io/guide/schema/measurement.html"}],["meta",{"property":"og:url","content":"https://openGemini.github.io/zh/guide/schema/measurement.html"}],["meta",{"property":"og:site_name","content":"openGemini"}],["meta",{"property":"og:title","content":"表操作"}],["meta",{"property":"og:description","content":"CREATE MEASUREMENT(创建表) openGemini在写数据时支持自动创建表，但如下三种情况，需要提前创建表 指定分区键 openGemini中数据默认按照时间线进行hash分区打散，但某些场景下，业务频繁使用某个或者某几个TAG进行数据检索，采用时间线hash分区的方式让这部分TAG的数据分散到了不同的节点，造成查询扇出度比较大。 如..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:locale:alternate","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2024-01-05T10:21:56.000Z"}],["meta",{"property":"article:author","content":"openGemini"}],["meta",{"property":"article:modified_time","content":"2024-01-05T10:21:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"表操作\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-01-05T10:21:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"openGemini\\",\\"url\\":\\"https://github.com/openGemini/openGemini\\"}]}"]]},"headers":[{"level":2,"title":"CREATE MEASUREMENT(创建表)","slug":"create-measurement-创建表","link":"#create-measurement-创建表","children":[{"level":3,"title":"指定分区键","slug":"指定分区键","link":"#指定分区键","children":[]},{"level":3,"title":"文本检索","slug":"文本检索","link":"#文本检索","children":[]},{"level":3,"title":"使用高基数存储引擎","slug":"使用高基数存储引擎","link":"#使用高基数存储引擎","children":[]}]},{"level":2,"title":"SHOW MEASUREMENTS(查看表)","slug":"show-measurements-查看表","link":"#show-measurements-查看表","children":[{"level":3,"title":"语法","slug":"语法-1","link":"#语法-1","children":[]},{"level":3,"title":"示例","slug":"示例-1","link":"#示例-1","children":[]}]},{"level":2,"title":"DROP MEASUREMENT(删除表)","slug":"drop-measurement-删除表","link":"#drop-measurement-删除表","children":[{"level":3,"title":"语法","slug":"语法-2","link":"#语法-2","children":[]}]}],"git":{"createdTime":1690990217000,"updatedTime":1704450116000,"contributors":[{"name":"XiangYu","email":"49023462+xiangyu5632@users.noreply.github.com","commits":4}]},"readingTime":{"minutes":6.33,"words":1898},"filePathRelative":"zh/guide/schema/measurement.md","localizedDate":"2023年8月2日","autoDesc":true,"excerpt":""}');export{e as data};