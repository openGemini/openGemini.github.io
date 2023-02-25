import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarZh: SidebarConfig = {
  '/zh/guide/': [
    {
      text: '',
      children: [
        '/zh/guide/README.md',
        '/zh/guide/getting-started.md',
        '/zh/guide/develop.md',
        '/zh/guide/configuration.md',
        '/zh/guide/migration.md',
        '/zh/guide/deployment.md',
        '/zh/guide/sql-syntax.md',
        '/zh/guide/devops.md',
        '/zh/guide/monitor-alarm.md',
        '/zh/guide/release-notes.md',
      ],
    },
  ],
}
