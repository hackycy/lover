<template>
  <div
    v-lazy:background-image="img"
    class="container"
  >
    <div class="card-wrap">
      <swipe
        :loop="false"
        @change="onChange"
      >
        <swipe-item>
          <date-card
            title="我们在一起"
            target-date="2017-3-22"
          />
        </swipe-item>
        <swipe-item>
          <date-card
            title-bg-color="pink"
            title="距离小宝贝生日"
            :lunar="true"
            :repeat="true"
            target-date="1995-12-8"
          />
        </swipe-item>
        <swipe-item>
          <date-card
            title-bg-color="orange"
            title="距离小宝贝的男人生日"
            :lunar="true"
            :repeat="true"
            target-date="1997-6-26"
          />
        </swipe-item>
        <div
          slot="indicator"
          class="custom-indicator"
        >
          {{ currentCard + 1 }}/3
        </div>
      </swipe>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import {
  Lazyload, Swipe, SwipeItem, Toast,
} from 'vant';

import bg from '@/assets/bg.jpeg';
import DateCard from '@/components/DateCard/index.vue';

Vue.use(Lazyload);
Vue.use(Toast);

export default {
  name: 'Index',
  components: {
    DateCard,
    Swipe,
    SwipeItem,
  },
  data() {
    return {
      img: bg,
      currentCard: 0,
    };
  },
  mounted() {
    this.$toast({
      position: 'bottom',
      message: '卡片可以左右滑动噢~',
    });
  },
  methods: {
    onChange(index) {
      this.currentCard = index;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  background-attachment: fixed;
  background-size: cover;
  display: flex;
  align-items: center;
}

.card-wrap {
  width: 100%;
  opacity: 0.9;
}
.custom-indicator {
  position: absolute;
  padding: 2px;
  bottom: 4vw;
  right: 4vw;
  font-size: 1vh;
  color: #fff;
  background: rgba(0, 0, 0, 0.1);
}
</style>
