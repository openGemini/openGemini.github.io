import type { NavbarConfig } from '@vuepress/theme-default'
import { version } from '../meta.js'

export const navbarEn: NavbarConfig = [
  {
    text: `v${version}`,
    children: [
      {
        text: 'Changelog',
        link: 'https://github.com/openGemini/openGemini/releases/tag/v1.0.0',
      },
      {
        text: 'v0.2.0',
        link: 'https://github.com/openGemini/openGemini/releases/tag/v0.2.0',
      },
    ],
  },
]
