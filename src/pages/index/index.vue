<template>
  <div v-lazy:background-image="img" class="container">
    <div class="card-wrap">
      <div class="card">
        <div class="head">在一起已经</div>
        <div class="content" ref='content'>
          <span :style="{ fontSize: contentSize + '%' }">{{ showContent }}</span>
        </div>
        <div class="foot">
          目标日: {{ formatTarget() }}
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

export default {
  name: 'Index',
  data() {
    return {
      // 0为显示天数，1为显示年月日，2为显示月日，3为显示周日
      targetDate: '2017-3-22',
      showContent: '3',
      contentSize: 2000,
      currentShowStatus: 0,
      img: bg,
    };
  },
  mounted() {
    this.getday();
  },
  methods: {
    formatTarget() {
      return moment(this.targetDate, 'YYYY-MM-DD').format('YYYY-MM-DD dddd');
    },
    getday() {
      this.$nextTick(() => {
        // const now = moment();
        // const target = moment(this.targetDate, 'YYYY-MM-DD');
        // const time = now.diff(target, 'days');
        this.showContent = '3asdasdasdasdasdsa';
        this.changeSize(this.showContent.length);
      });
    },
    changeSize(contentLength) {
      let scale;
      if (contentLength === 1) {
        scale = 5;
      } else if (contentLength > 1 && contentLength <= 3) {
        scale = 7;
      } else if (contentLength > 3 && contentLength <= 5) {
        scale = 9;
      } else {
        scale = 11;
      }
      console.log(scale);
      const contentWidth = this.$refs.content.offsetWidth;
      this.contentSize = contentWidth / this.showContent.length * scale;
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
  font-family: sans-serif;

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

}

</style>
