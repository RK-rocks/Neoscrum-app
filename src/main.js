import Vuelidate from 'vuelidate';
import axios from 'axios';
import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './antd-components';
import './assets/scss/app.scss';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
Vue.component('pulse-loader', require('vue-spinner/src/PulseLoader.vue'));
import {
  setupInterceptors
} from "./utils/httpInterceptors";

Vue.config.productionTip = false;

Vue.use(Vuelidate);
new Vue({
  router,
  store,
  render: (h) => h(App),
  created() {
    setupInterceptors(store);
  },
}).$mount('#app');
