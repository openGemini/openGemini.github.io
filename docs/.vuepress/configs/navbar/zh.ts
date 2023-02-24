import type { NavbarConfig } from '@vuepress/theme-default'
import { version } from '../meta.js'

export const navbarZh: NavbarConfig = [
  {
    text: `v${version}`,
    children: [
      {
        text: '更新日志',
        link: 'https://github.com/openGemini/openGemini',
      },
      {
        text: 'v0.2.0',
        link: 'https://github.com/openGemini/openGemini',
      },
    ],
  },
]
