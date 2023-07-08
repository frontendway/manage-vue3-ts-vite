import { defineAsyncComponent } from 'vue'
import type { App, AsyncComponentLoader } from 'vue'

const modules = import.meta.glob('./*/index.vue')

export default {
  install (app: App) {
    for (const [path, fn] of Object.entries(modules)) {
      const name = path.replace('./', '').split('/')[0]
      app.component(name, defineAsyncComponent(fn as AsyncComponentLoader))
    }
  }
}
