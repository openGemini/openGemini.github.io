import { reveal, revealMarkdown, revealHighlight, revealMath, revealSearch, revealNotes, revealZoom } from "/root/gopath/src/github.com/shilinlee/docs/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.200_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-md-enhance/lib/client/reveal/index.js";

export const useReveal = () => [reveal(), revealMarkdown(), revealHighlight(), revealMath(), revealSearch(), revealNotes(), revealZoom()];
