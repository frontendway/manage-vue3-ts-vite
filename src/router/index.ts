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
    component: async () => await import('@/views/svg/index.vue')
  },
  {
    path: '/theme',
    meta: {
      title: '主题跟随系统自动切换'
    },
    component: async () => await import('@/views/theme/index.vue')
  },
  {
    path: '/waterfall',
    meta: {
      title: '瀑布流'
    },
    component: async () => await import('@/views/waterfall/index.vue')
  },
  {
    path: '/infinite',
    meta: {
      title: '长列表'
    },
    component: async () => await import('@/views/infinite/index.vue')
  },
  {
    path: '/imgCropper',
    meta: {
      title: '图片裁剪'
    },
    component: async () => await import('@/views/img-cropper/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
