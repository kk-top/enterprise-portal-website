import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import Particles from "particles.vue3"
import '@/util/axios.config.js'

createApp(App)
    .use(Particles)
    .use(router)
    .use(store)
    .use(ElementPlus, { locale: zhCn })
    .mount('#app')
