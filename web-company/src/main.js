import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import router from './router'
import '@/utils/axios.config.js'

createApp(App)
    .use(router)
    .use(ElementPlus,{ locale: zhCn })
    .mount('#app')
