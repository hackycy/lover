import { createApp } from 'vue'
import App from './App.vue'
import VantPlugin from '@/plugins/vant'
import Router from '@/router'

const app = createApp(App)
app.use(VantPlugin)
app.use(Router)

app.mount('#app')