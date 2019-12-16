<template>
  <div v-lazy:background-image="img" class="container">
    <div class="card-wrap">
      <div class="card">
        <div class="head">在一起已经</div>
        <transition name="van-fade">
          <div class="content day">{{ getday() }}</div>
        </transition>
        <div class="foot">
          目标日: 2017-3-22 星期三
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Lazyload } from 'vant';
import moment from 'moment';

import bg from '@/assets/bg.jpeg';

Vue.use(Lazyload);
// Asia/Shanghai

export default {
  name: 'Index',
  data() {
    return {
      // 0为显示天数，1为显示年月日，2为显示月日，3为显示周日
      targetDate: '2017-3-22',
      currentShowStatus: 0,
      img: bg,
    };
  },
  methods: {
    formatTarget() {

    },
    getday() {
      const now = moment();
      const target = moment(this.targetDate, 'YYYY-MM-DD');
      const time = now.diff(target, 'days');
      return time;
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
  margin: 4vw;
  opacity: 0.9;
}

.card {
  background: #f3f3f3;
  height: 45vh;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  -webkit-flex-direction: column;

  .head {
    background: #3385bc;
    height: 8vh;
    line-height: 8vh;
    text-align: center;
    color: #ffffff;
    font-size: 3vh;
  }

  .content {
    height: 30vh;
    line-height: 30vh;
    text-align: center;
    color: #282828;
    font-style: bold;
    font-weight: bold;
  }

  .foot {
    height: 7vh;
    line-height: 7vh;
    color: #8e8c8d;
    font-size: 2vh;
    text-align: center;
  }

  .day {
    font-size: 20vh;
  }

}

</style>
