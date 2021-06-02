import { createApp } from 'vue'
import App from './App.vue'
import VantPlugin from '@/plugins/vant'
import Router from '@/router'

// date-fns i18n
import { zhCN } from 'date-fns/locale'
window.__localeId__ = 'zhCN'

const app = createApp(App)
app.use(VantPlugin)
app.use(Router)

app.mount('#app')