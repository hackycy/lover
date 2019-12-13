<template>
  <div v-lazy:background-image="img" class="container">
    aa
  </div>
</template>

<script>
import Vue from 'vue';
import { Lazyload } from 'vant';

import bg from '@/assets/bg.jpg';

Vue.use(Lazyload);

export default {
  name: 'Index',
  data() {
    return {
      img: bg,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background-attachment: fixed;
  background-size: cover;
}
</style>
