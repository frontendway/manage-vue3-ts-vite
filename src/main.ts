import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import installComponent from './components/index'
import 'virtual:svg-icons-register'

createApp(App)
.use(router)
.use(installComponent)
.mount('#app')
