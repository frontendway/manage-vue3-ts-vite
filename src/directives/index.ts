import type { App } from "vue"

export default {
  install (app: App) {
    const directives = import.meta.glob('./*/index.ts', { eager: true })
    for (const [key, value] of Object.entries(directives)) {
      const name = key.replace('./', '').split('/')[0]
      app.directive(name, (value as any).default)
    }
  }
}
