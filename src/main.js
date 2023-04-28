import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import directive from './utils/directive'
import installElementPlus from './plugins/element'

const app = createApp(App);
installElementPlus(app);

/**
 * 全局注册指令
 * @description 使用方式： name => v-name
 */

// onClickOutside
app.directive('onClickOutside', directive.onClickOutside);

app.use(store).use(router).mount('#app')
