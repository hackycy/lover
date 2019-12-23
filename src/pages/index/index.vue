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
            title="在一起已经"
            target-date="2017-3-1"
          />
        </swipe-item>
        <swipe-item>
          <date-card
            title="距离小宝贝生日还有"
            target-date="2017-3-22"
          />
        </swipe-item>
        <swipe-item>
          <date-card
            title="距离小宝贝的男人生日还有"
            target-date="2017-3-22"
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
import { Lazyload, Swipe, SwipeItem } from 'vant';

import bg from '@/assets/bg.jpeg';
import DateCard from '@/components/DateCard/index.vue';

Vue.use(Lazyload);

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
  padding: 1px;
  bottom: 4vw;
  right: 4vw;
  font-size: 1vw;
  color: #fff;
  background: rgba(0, 0, 0, 0.1);
}
</style>
