import {sidebar} from "vuepress-theme-hope";

export const zhSidebar = sidebar({
    '/zh/': [
        {
            text: "用户指南",
            prefix: "guide/",
            children: [
                "introduction/",
                "quick_start/",
                "geminiql/",
                "write/",
                "manage/",
                "platforms/",
                "reference/",
                "versions/",
                "troubleshoot/",
            ],
        },
        {
            text: "开发指南",
            prefix: "dev-guide/",
            children: [
                "get_started/",
                "contribute/",
            ],
        },
    ],

    // separate file directory
    "/zh/guide/": "structure",
    "/zh/dev-guide/": "structure",

//  "/zh/config/": "structure",

//  "/zh/cookbook/": "structure",

});
