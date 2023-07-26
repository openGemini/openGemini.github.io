import { hopeTheme } from 'vuepress-theme-hope';
import { enNavbar, zhNavbar } from './navbar/index.js';
import { enSidebar, zhSidebar } from './sidebar/index.js';
// import { getDirname, path } from '@vuepress/utils';
import { getFooter } from './utils/getFooter.js';

// 获取当前文件目录
// const __dirname = getDirname(import.meta.url);

export default hopeTheme({
    hostname: 'https://openGemini.github.io',

    author: {
        name: 'openGemini',
        url: 'https://github.com/openGemini/openGemini',
    },

    pageInfo: ['Author', 'Original', 'Date', 'Category', 'Tag', 'ReadingTime', 'Word'],

    iconAssets: '/icon/iconfont.css',

    logo: 'images/logo.png', // 首页左上角

    repo: 'openGemini/openGemini.github.io',

    docsDir: '/src',

    darkmode: 'toggle',

    locales: {
        '/': {
            // navbar
            navbar: enNavbar,

            // sidebar
            sidebar: enSidebar,

            copyright: 'Copyright @2023 OpenGemini-All Rights Reserved.',
            footer: getFooter('en'),

            displayFooter: true,

            metaLocales: {
                editLink: 'Edit this page on GitHub',
            },
        },

        /**
         * Chinese locale config
         */
        '/zh/': {
            // navbar
            navbar: zhNavbar,

            // sidebar
            sidebar: zhSidebar,

            copyright: 'Copyright @2023 OpenGemini-All Rights Reserved.',
            footer: getFooter('zh'),

            displayFooter: true,

            // page meta
            metaLocales: {
                editLink: '在 GitHub 上编辑此页',
            },
        },
    },

    encrypt: {
        config: {
            '/demo/encrypt.html': ['1234'],
            '/zh/demo/encrypt.html': ['1234'],
        },
    },

    plugins: {
        //    comment: {
        //      // @ts-expect-error: You should generate and use your own comment service
        //      provider: "Waline",
        //    },

        //    copyCode: {
        //      fancy: true,
        //      duration: 1000,
        //    },
        copyCode: false,

        // all features are enabled for demo, only preserve features you need here
        mdEnhance: {
            align: true,
            attrs: true,
            chart: true,
            codetabs: true,
            demo: true,
            echarts: true,
            figure: true,
            flowchart: true,
            gfm: true,
            imgLazyload: true,
            imgSize: true,
            include: true,
            katex: true,
            mark: true,
            mermaid: true,
            playground: {
                presets: ['ts', 'vue'],
            },
            presentation: {
                plugins: ['highlight', 'math', 'search', 'notes', 'zoom'],
            },
            stylize: [
                {
                    matcher: 'Recommended',
                    replacer: ({ tag }) => {
                        if (tag === 'em')
                            return {
                                tag: 'Badge',
                                attrs: { type: 'tip' },
                                content: 'Recommended',
                            };
                    },
                },
            ],
            sub: true,
            sup: true,
            tabs: true,
            vPre: true,
            vuePlayground: true,
        },

        // uncomment these if you want a pwa
        // pwa: {
        //   favicon: "/favicon.ico",
        //   cacheHTML: true,
        //   cachePic: true,
        //   appendBase: true,
        //   apple: {
        //     icon: "/assets/icon/apple-icon-152.png",
        //     statusBarColor: "black",
        //   },
        //   msTile: {
        //     image: "/assets/icon/ms-icon-144.png",
        //     color: "#ffffff",
        //   },
        //   manifest: {
        //     icons: [
        //       {
        //         src: "/assets/icon/chrome-mask-512.png",
        //         sizes: "512x512",
        //         purpose: "maskable",
        //         type: "image/png",
        //       },
        //       {
        //         src: "/assets/icon/chrome-mask-192.png",
        //         sizes: "192x192",
        //         purpose: "maskable",
        //         type: "image/png",
        //       },
        //       {
        //         src: "/assets/icon/chrome-512.png",
        //         sizes: "512x512",
        //         type: "image/png",
        //       },
        //       {
        //         src: "/assets/icon/chrome-192.png",
        //         sizes: "192x192",
        //         type: "image/png",
        //       },
        //     ],
        //     shortcuts: [
        //       {
        //         name: "Demo",
        //         short_name: "Demo",
        //         url: "/demo/",
        //         icons: [
        //           {
        //             src: "/assets/icon/guide-maskable.png",
        //             sizes: "192x192",
        //             purpose: "maskable",
        //             type: "image/png",
        //           },
        //         ],
        //       },
        //     ],
        //   },
        // },
    },
});
