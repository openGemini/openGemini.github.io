import {navbar} from "vuepress-theme-hope";

export const zhNavbar = navbar([
    {text: "用户指南", icon: "creative", link: "/zh/guide/quick_start/get_started"},
    {text: "开发指南", icon: "code", link: "/zh/dev-guide/get_started/build_source_code"},
    {text: "在k8s中部署", icon: "app", link: "/zh/deploy-on-k8s/about/introduction"},
//  { text: "案例", icon: "discover", link: "/zh/demo/" },
//  {
//    text: "指南",
//    icon: "creative",
//    prefix: "/zh/guide/",
//    children: [
//      {
//        text: "Bar",
//        icon: "creative",
//        prefix: "bar/",
//        children: ["baz", { text: "...", icon: "more", link: "" }],
//      },
//      {
//        text: "Foo",
//        icon: "config",
//        prefix: "foo/",
//        children: ["ray", { text: "...", icon: "more", link: "" }],
//      },
//    ],
//  },
//  {
//    text: "V2 文档",
//    icon: "note",
//    link: "https://theme-hope.vuejs.press/zh/",
//  },
]);
