<template>
  <div
    v-lazy:background-image="img"
    class="container">
    <div class="card-wrap">
      <div class="card">
        <div class="head">
          在一起已经
        </div>
        <div
          ref="content"
          class="content"
          @touchstart="changeContent"
        >
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
      showContent: '',
      contentSize: 0,
      // 0为显示天数，1为显示年月日，2为显示月日，3为显示周日
      currentShowStatus: -1,
      img: bg,
    };
  },
  watch: {
    /**
     * 点击事件处理后会改变showContent值，监听showContent属性改变Content大小
     */
    showContent(newContent) {
      this.changeSize(newContent.length);
    },
    currentShowStatus(newStatus) {
      switch (newStatus) {
        case 0: {
          this.showContent = this.getDay();
          break;
        }
        case 1: {
          const year = this.getYear();
          if (year) {
            this.showContent = year;
          } else {
            this.currentShowStatus += 1;
          }
          break;
        }
        case 2: {
          const month = this.getMonth();
          if (month) {
            this.showContent = month;
          } else {
            this.currentShowStatus += 1;
          }
          break;
        }
        case 3: {
          const week = this.getWeek();
          if (week) {
            this.showContent = week;
          } else {
            this.currentShowStatus = 0;
          }
          break;
        }
        default:
          this.showContent = this.getDay();
      }
    },
  },
  mounted() {
    this.showContent = this.getDay();
    this.currentShowStatus = 0;
  },
  methods: {
    getMomentNow() {
      return moment();
    },
    getMomentTarget() {
      return moment(this.targetDate, 'YYYY-MM-DD');
    },
    formatTarget() {
      return this.getMomentTarget().format('YYYY-MM-DD dddd');
    },
    getDay() {
      const time = this.getMomentNow().diff(this.getMomentTarget(), 'days');
      return `${time}`;
    },
    getYear() {
      const years = this.getMomentNow().diff(this.getMomentTarget(), 'years');
      if (years > 0) {
        // 获取与target相隔了time年的那天
        const momentAddYear = this.getMomentTarget().add(years, 'years');
        // 判断月份差值
        const months = this.getMomentNow().diff(momentAddYear, 'months');
        // 判断是否大于当前时间所在月份
        if (months > 0) {
          const momentSubMonth = momentAddYear.add(months, 'months');
          const days = this.getMomentNow().diff(momentSubMonth, 'days');
          if (days > 0) {
            return `${years}年${months}个月${days}天`;
          }
          return `${years}年${months}个月`;
        }
        const days = this.getMomentNow().diff(momentAddYear, 'days');
        if (days > 0) {
          return `${years}年${days}天`;
        }
        return `${years}年`;
      }
      return '';
    },
    getMonth() {
      const months = this.getMomentNow().diff(this.getMomentTarget(), 'months');
      if (months > 0) {
        const momentAddMonth = this.getMomentTarget().add(months, 'months');
        const days = this.getMomentNow().diff(momentAddMonth, 'days');
        if (days > 0) {
          return `${months}个月${days}天`;
        }
        return `${months}个月`;
      }
      return '';
    },
    getWeek() {
      const weeks = this.getMomentNow().diff(this.getMomentTarget(), 'weeks');
      if (weeks > 0) {
        const momentAddWeek = this.getMomentTarget().add(weeks, 'weeks');
        const days = this.getMomentNow().diff(momentAddWeek, 'days');
        if (days > 0) {
          return `${weeks}周${days}天`;
        }
        return `${weeks}周`;
      }
      return '';
    },
    /**
     * 改变日历中字体的大小
     */
    changeSize(contentLength) {
      this.$nextTick(() => {
        let scale;
        if (contentLength === 1) {
          scale = 2;
        } else if (contentLength > 1 && contentLength <= 3) {
          scale = 4;
        } else {
          scale = 6;
        }
        const contentWidth = this.$refs.content.offsetWidth;
        this.contentSize = contentWidth / contentLength * scale;
      });
    },
    changeContent() {
      if (this.currentShowStatus === 3) {
        this.currentShowStatus = 0;
      } else {
        this.currentShowStatus += 1;
      }
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

    // span {
    //   transition: 0.1s;
    //   -webkit-transition: 0.1s; /* Safari */
    // }
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
