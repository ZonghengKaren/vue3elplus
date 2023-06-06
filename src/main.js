import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {test} from './utils/directive'
import installElementPlus from './plugins/element'
import { vOnClickOutside } from '@vueuse/components'

const app = createApp(App);
installElementPlus(app);

// onClickOutside
app.directive('onClickOutside', vOnClickOutside);
app.directive('test', test);
app.use(store).use(router).mount('#app')
