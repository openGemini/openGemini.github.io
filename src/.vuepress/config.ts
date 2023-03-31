import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: '/docs/',

  locales: {
    '/': {
      lang: 'en-US',
      title: 'openGemini',
      description: 'openGemini docs site',
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'openGemini',
      description: 'openGemini 统一文档站点',
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
