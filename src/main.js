import Vue from 'vue';
import moment from 'moment';

import App from '@/App.vue';

import router from '@/router';

import 'normalize.css/normalize.css';

import '@/common/common.css';

moment.locale('zh-CN');

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
