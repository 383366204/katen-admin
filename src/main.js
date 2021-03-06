// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store';
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import config from './config/config';

Vue.config.productionTip = false;
Vue.use(ElementUI);

//设置api路径
axios.defaults.baseURL = config.baseURL;
axios.defaults.withCredentials=true;
Vue.prototype.$ajax = axios;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
