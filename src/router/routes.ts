export type RouteComponentKey = 'DocShell'

export type RouteConfigItem =
  | {
      path: string
      type: 'redirect'
      to: string
      replace?: boolean
    }
  | {
      path: string
      type: 'view'
      component: RouteComponentKey
    }

/**
 * 路由 JSON 配置（后续新增页面优先在这里维护）
 * - :defaultDocId 会在运行时注入为 docs 默认文档 id
 */
export const routeConfig: RouteConfigItem[] = [
  { path: '/', type: 'redirect', to: '/:defaultDocId', replace: true },
  { path: '/:docId', type: 'view', component: 'DocShell' },
  { path: '*', type: 'redirect', to: '/:defaultDocId', replace: true },
]
