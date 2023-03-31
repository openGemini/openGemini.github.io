import { defineClientConfig } from "@vuepress/client";

import { HopeIcon, Layout, NotFound, useScrollPromise, injectDarkmode, setupDarkmode, setupSidebarItems } from "/root/gopath/src/github.com/shilinlee/docs/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.200_vuepress@2.0.0-beta.61/node_modules/vuepress-theme-hope/lib/client/export.js";

import { GlobalEncrypt, LocalEncrypt } from "/root/gopath/src/github.com/shilinlee/docs/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.200_vuepress@2.0.0-beta.61/node_modules/vuepress-theme-hope/lib/client/modules/encrypt/export.js";
import Slide from "/root/gopath/src/github.com/shilinlee/docs/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.200_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-md-enhance/lib/client/SlidePage.js";

import "/root/gopath/src/github.com/shilinlee/docs/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.200_vuepress@2.0.0-beta.61/node_modules/vuepress-theme-hope/lib/client/styles/index.scss";

export default defineClientConfig({
  enhance: ({ app, router }) => {
    const { scrollBehavior } = router.options;

    router.options.scrollBehavior = async (...args) => {
      await useScrollPromise().wait();

      return scrollBehavior(...args);
    };

    // inject global properties
    injectDarkmode(app);

    // render icon for auto-catalog
    app.component("HopeIcon", HopeIcon);

    app.component("GlobalEncrypt", GlobalEncrypt);
    app.component("LocalEncrypt", LocalEncrypt);
  },
  setup: () => {
    setupDarkmode();
    setupSidebarItems();

  },
  layouts: {
    Layout,
    NotFound,
    Slide,
  }
});