import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarZh: SidebarConfig = {
  '/zh/guide/': [
    {
      text: '关于 openGemini',
      collapsible: true,
      children: [
        '/zh/guide/introduction.md',
        '/zh/guide/motivation.md',
        ],
    },
    {
      text: '快速开始',
      collapsible: true,
      children: [
        '/zh/guide/install_standalone.md',
        '/zh/guide/getting_started.md',
        '/zh/guide/deploy_cluster.md',
        '/zh/guide/key_concept.md',
        '/zh/guide/glossary.md',
      ],
    },
    {
      text: 'GeminiQL',
      collapsible: true,
      children: [
        '/zh/guide/geminiql/sample_data.md',
        '/zh/guide/geminiql/sql-syntax.md',
        ],
    },
    {
      text: '文档架构',
      collapsible: true,
      children: [
        '/zh/guide/openGemini-docs.md',
        ],
    },
  ],
}
