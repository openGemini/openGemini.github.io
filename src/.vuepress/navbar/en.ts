import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  { text: "Guide", icon: "creative", link: "/guide" },
  { text: "Development", icon: "code", link: "/dev-guide/" },
//  {
//    text: "Guide",
//    icon: "creative",
//    prefix: "/guide/",
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
//    text: "V2 Docs",
//    icon: "note",
//    link: "https://theme-hope.vuejs.press/",
//  },
]);
