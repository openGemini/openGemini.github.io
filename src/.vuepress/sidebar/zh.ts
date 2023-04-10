import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  '/zh/': [
    "",
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
 ],


  "/zh/guide/": "structure",

//  "/zh/config/": "structure",

//  "/zh/cookbook/": "structure",

});
