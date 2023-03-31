import { defineClientConfig } from "@vuepress/client";
import ChartJS from "/root/gopath/src/github.com/shilinlee/docs/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.200_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-md-enhance/lib/client/components/ChartJS.js";
import CodeTabs from "/root/gopath/src/github.com/shilinlee/docs/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.200_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-md-enhance/lib/client/components/CodeTabs.js";
import { hasGlobalComponent } from "/root/gopath/src/github.com/shilinlee/docs/node_modules/.pnpm/vuepress-shared@2.0.0-beta.200_vuepress@2.0.0-beta.61/node_modules/vuepress-shared/lib/client/index.js";
import { CodeGroup, CodeGroupItem } from "/root/gopath/src/github.com/shilinlee/docs/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.200_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-md-enhance/lib/client/compact/index.js";
import "/root/gopath/src/github.com/shilinlee/docs/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.200_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-md-enhance/lib/client/styles/container/index.scss";
import CodeDemo from "/root/gopath/src/github.com/shilinlee/docs/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.200_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-md-enhance/lib/client/components/CodeDemo.js";
import ECharts from "/root/gopath/src/github.com/shilinlee/docs/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.200_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-md-enhance/lib/client/components/ECharts.js";
import "/root/gopath/src/github.com/shilinlee/docs/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.200_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-md-enhance/lib/client/styles/figure.scss";
import FlowChart from "/root/gopath/src/github.com/shilinlee/docs/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.200_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-md-enhance/lib/client/components/FlowChart.js";
import "/root/gopath/src/github.com/shilinlee/docs/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.200_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-md-enhance/lib/client/styles/footnote.scss";
import "/root/gopath/src/github.com/shilinlee/docs/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.200_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-md-enhance/lib/client/styles/image-mark.scss"
import Mermaid from "/root/gopath/src/github.com/shilinlee/docs/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.200_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-md-enhance/lib/client/components/Mermaid.js";
import Presentation from "/root/gopath/src/github.com/shilinlee/docs/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.200_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-md-enhance/lib/client/components/Presentation.js";
import Playground from "/root/gopath/src/github.com/shilinlee/docs/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.200_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-md-enhance/lib/client/components/Playground.js";
import Tabs from "/root/gopath/src/github.com/shilinlee/docs/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.200_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-md-enhance/lib/client/components/Tabs.js";
import "/root/gopath/src/github.com/shilinlee/docs/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.200_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-md-enhance/lib/client/styles/tasklist.scss";
import "/root/gopath/src/github.com/shilinlee/docs/node_modules/.pnpm/katex@0.16.4/node_modules/katex/dist/katex.min.css";
import "/root/gopath/src/github.com/shilinlee/docs/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.200_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-md-enhance/lib/client/styles/katex.scss";
import { defineAsyncComponent } from "vue";

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("ChartJS", ChartJS)
    app.component("CodeTabs", CodeTabs);
    if(!hasGlobalComponent("CodeGroup", app)) app.component("CodeGroup", CodeGroup);
    if(!hasGlobalComponent("CodeGroupItem", app)) app.component("CodeGroupItem", CodeGroupItem);
    app.component("CodeDemo", CodeDemo);
    app.component("ECharts", ECharts);
    app.component("FlowChart", FlowChart);
    app.component("Mermaid", Mermaid);
    app.component("Presentation", Presentation);
    app.component("Playground", Playground);
    app.component("Tabs", Tabs);
    app.component("VuePlayground", defineAsyncComponent(() => import("/root/gopath/src/github.com/shilinlee/docs/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.200_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-md-enhance/lib/client/components/VuePlayground.js")));
    
  },
});
