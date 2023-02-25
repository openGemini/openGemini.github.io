import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarEn: SidebarConfig = {
  '/guide/': [
    {
      text: 'Guide',
      children: [
          '/guide/README.md',
          '/guide/getting-started.md',
          '/guide/develop.md',
          '/guide/configuration.md',
          '/guide/migration.md',
          '/guide/deployment.md',
          '/guide/sql-syntax.md',
          '/guide/devops.md',
          '/guide/monitor-alarm.md',
          '/guide/release-notes.md',
      ],
    },
  ],
}
