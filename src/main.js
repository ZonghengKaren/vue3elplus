import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import { createPinia } from 'pinia'
import {test, resize} from './utils/directive'
import {changeTheme} from "@/utils/common";
import installElementPlus from './plugins/element'
import { vOnClickOutside } from '@vueuse/components'
import axios from 'axios';

// const pinia = createPinia();
const app = createApp(App);
installElementPlus(app);

// 设置默认主题
changeTheme(localStorage.getItem('_CURRENT_THEME_') || 'black');

// 自定义指令
app.directive('onClickOutside', vOnClickOutside);
app.directive('test', test);
app.directive('resize', resize);

app.config.errorHandler = (err) => {
    console.log('err:', err);
}
// app.use(store).use(pinia).use(router).mount('#app')
app.use(store).use(router).mount('#app')
