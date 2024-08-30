import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/styles/index.scss' // global css

import 'virtual:svg-icons-register'

import SvgIcon from '@/components/SvgIcon/index.vue'

import 'virtual:uno.css'
const app = createApp(App)

app.component('svg-icon', SvgIcon)

app.use(createPinia())

app.use(router)

app.use(ElementPlus)

app.mount('#app')
