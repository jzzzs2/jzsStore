import { createApp } from 'vue'
import App from './App.vue'
import lazy from "./directive/lazy"
let app = createApp(App)
// app.use(lazy)
app.directive("lazy",lazy)
app.mount('#app')
