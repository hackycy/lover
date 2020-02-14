import Vue from 'vue';
import {
  Swipe, SwipeItem, Toast, Lazyload,
} from 'vant';

import bg from '@/assets/bg.jpeg';

Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Toast);
Vue.use(Lazyload, {
  loading: bg,
  error: bg,
});
