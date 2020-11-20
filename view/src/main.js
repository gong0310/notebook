import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import SocketService from './uilt/websocket'
SocketService.Instance.connect()
import './uilt/flexible'
const app = createApp(App)
app.use(router).mount('#app')