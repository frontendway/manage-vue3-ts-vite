import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/svg'
  },
  {
    path: '/svg',
    meta: {
      title: 'svg-icon'
    },
    component: () => import('@/views/svg/index.vue')
  },
  {
    path: '/theme',
    meta: {
      title: '主题跟随系统自动切换'
    },
    component: () => import('@/views/theme/index.vue')
  },
  {
    path: '/waterfall',
    meta: {
      title: '瀑布流'
    },
    component: () => import('@/views/waterfall/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
