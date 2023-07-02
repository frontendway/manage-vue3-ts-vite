import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import installComponent from './components/index'
import installDirectives from './directives'
import 'virtual:svg-icons-register'

createApp(App)
.use(router)
.use(installComponent)
.use(installDirectives)
.mount('#app')
