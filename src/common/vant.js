import Vue from 'vue';
import {
  Swipe, SwipeItem, Toast, Lazyload,
} from 'vant';

import bg from '@/assets/bg.jpeg';

// 适配 桌面端使用 Vant
import '@vant/touch-emulator';

Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Toast);
Vue.use(Lazyload, {
  loading: bg,
  error: bg,
});
