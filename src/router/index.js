import Vue from 'vue';
import VueRouter from 'vue-router';

import Page404 from '@/pages/404.vue';
import Index from '@/pages/index/index.vue';
import FireWork from '@/pages/firework/index.vue';

Vue.use(VueRouter);

export const routes = [
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/',
    component: Index,
  },
  {
    path: '/firework',
    component: FireWork,
  },
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
