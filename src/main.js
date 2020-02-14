import Vue from 'vue';
import moment from 'moment';
import Hammer from 'hammerjs';

import App from '@/App.vue';

import router from '@/router';

import 'normalize.css/normalize.css';

import '@/common/common.css';

import '@/common/vant';

moment.locale('zh-CN');

Vue.config.productionTip = false;

// hammer封装一些Vue指令
Vue.directive('tap', {
  bind: (el, binding) => {
    const manager = new Hammer.Manager(el);
    // Create a recognizer
    const Tap = new Hammer.Tap({
      taps: 1,
    });
    manager.add(Tap);
    // Add the recognizer to the manager
    manager.add(Tap);
    // Subscribe to the desired event
    manager.on('tap', binding.value);
  },
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
