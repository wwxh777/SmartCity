import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'
//import store from './store'
import dataV from '@jiaminghi/data-view';
import naive from 'naive-ui'
// 引入全局css
import './assets/scss/style.scss';
// 引入图表（所有图标见 icon 目录下的 demo_index.html）
import './assets/icon/iconfont.css'
// 引入 全局注册组件
//import PublicComponent from '@/components/componentInstall';

const app = createApp(App)
const Mit = mitt()
//app.use(PublicComponent)
app.use(dataV)
//app.use(store)
app.use(router)
app.use(naive)
app.config.globalProperties.$Bus = Mit
app.mount('#app')
