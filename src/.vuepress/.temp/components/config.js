import { defineClientConfig } from "@vuepress/client";
import { hasGlobalComponent } from "/root/gopath/src/github.com/shilinlee/docs/node_modules/.pnpm/vuepress-plugin-components@2.0.0-beta.200_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-components/lib/client/shared.js";
import { h } from "vue";

import { useStyleTag } from "/root/gopath/src/github.com/shilinlee/docs/node_modules/.pnpm/vuepress-plugin-components@2.0.0-beta.200_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-components/lib/client/vueuse.js";
import Badge from "/root/gopath/src/github.com/shilinlee/docs/node_modules/.pnpm/vuepress-plugin-components@2.0.0-beta.200_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-components/lib/client/components/Badge.js";
import FontIcon from "/root/gopath/src/github.com/shilinlee/docs/node_modules/.pnpm/vuepress-plugin-components@2.0.0-beta.200_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-components/lib/client/components/FontIcon.js";
import BackToTop from "/root/gopath/src/github.com/shilinlee/docs/node_modules/.pnpm/vuepress-plugin-components@2.0.0-beta.200_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-components/lib/client/components/BackToTop.js";

import "/root/gopath/src/github.com/shilinlee/docs/node_modules/.pnpm/vuepress-plugin-components@2.0.0-beta.200_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-components/lib/client/styles/sr-only.scss";

export default defineClientConfig({
  enhance: ({ app }) => {
    if(!hasGlobalComponent("Badge")) app.component("Badge", Badge);
    if(!hasGlobalComponent("FontIcon")) app.component("FontIcon", FontIcon);
    
  },
  setup: () => {
      useStyleTag(`\
  @import url("https://at.alicdn.com/t/c/font_2410206_5vb9zlyghj.css");
  `);
  },
  rootComponents: [
    () => h(BackToTop, { threshold: 300 }),
  ],
});
