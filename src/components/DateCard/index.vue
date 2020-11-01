<template>
  <div class="card">
    <div
      v-lazy:background-image="showImage"
      class="container"
    >
      <div
        :style="{ background: showTitleBgColor, color: textModeColor }"
        class="head"
      >
        {{ title }}
      </div>
      <div
        ref="content"
        v-tap="changeContent"
        :style="{ background: showBodyBgColor, color: textModeColor }"
        class="content"
      >
        <span
          :style="{ fontSize: contentSize + '%', color: textModeColor }"
        >
          {{ showContent }}
        </span>
      </div>
      <div
        v-tap="changeLorS"
        :style="{ background: showBodyBgColor, color: textModeColor }"
        class="foot"
      >
        {{ footTip() }}: {{ formatTarget() }}
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import bg from '@/assets/bg.jpeg';

import { strLength, lunar2solar, solar2lunar } from '@/common/util';

export default {
  name: 'DateCard',
  props: {
    backdropMode: {
      type: String,
      default: 'color',
      validator(value) {
        // 这个值必须匹配下列字符串中的一个
        return ['color', 'image'].indexOf(value) !== -1;
      },
    },
    textMode: {
      type: String,
      default: 'dark',
      validator(value) {
        // 这个值必须匹配下列字符串中的一个
        return ['dark', 'light', 'auto'].indexOf(value) !== -1;
      },
    },
    backdropImage: {
      type: String,
      default: bg,
    },
    title: {
      type: String,
      default: '安利标题',
    },
    titleBgColor: {
      type: String,
      default: '#3385bc',
    },
    /**
     * 目标日大于现在则为倒数，目标日为过去则为正数
     */
    targetDate: {
      type: String,
      default: '2017-3-22',
    },
    /**
     * 是否为农历
     */
    lunar: {
      type: Boolean,
      default: false,
    },
    /**
     * 如果设置为重复，则无法进行对过去进行正数，只允许对未来进行倒数
     */
    repeat: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 0为显示天数，1为显示年月日，2为显示月日，3为显示周日
      // targetDate: '2017-3-22',
      showContent: '',
      contentSize: 100,
      // 0为显示天数，1为显示年月日，2为显示月日，3为显示周日
      currentShowStatus: -1,
      // 0为显示农历目标日， 1为显示新历目标日
      currentShowLorS: 1,
    };
  },
  computed: {
    textModeColor() {
      if (this.textMode === 'dark') {
        return 'black';
      }
      return '#ffffff';
    },
    showImage() {
      return this.backdropMode === 'image' ? this.backdropImage : '';
    },
    showTitleBgColor() {
      return this.backdropMode === 'image' ? 'transparent' : this.titleBgColor;
    },
    showBodyBgColor() {
      return this.backdropMode === 'image' ? 'transparent' : '#f3f3f3';
    },
  },
  watch: {
    /**
     * 点击事件处理后会改变showContent值，监听showContent属性改变Content大小
     */
    showContent(newContent) {
      this.changeSize(strLength(newContent));
    },
    /**
     * 根据点击事件改变的状态改变字体大小以及显示的格式
     */
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
    // this.showContent = '66年24个月30天';
  },
  methods: {
    getMomentNow() {
      return moment(moment().format('YYYY-MM-DD'));
    },
    getMomentTarget() {
      return moment(this.targetDate, 'YYYY-MM-DD');
    },
    /**
     * 是否为倒数
     */
    isCountDown() {
      if (this.repeat) {
        return true;
      }
      if (this.lunar) {
        const solar = lunar2solar(this.getMomentTarget());
        const solarMoment = moment(solar.date, 'YYYY-MM-DD');
        return this.getMomentNow().isBefore(solarMoment);
      }
      return this.getMomentNow().isBefore(this.getMomentTarget());
    },
    /**
     * 获取过去时间
     */
    getMomentPassCheck() {
      const now = this.getMomentNow();
      const target = this.getMomentTarget();
      if (this.lunar) {
        if (!this.repeat) {
          const solar = lunar2solar(target);
          const solarMoment = moment(solar.date, 'YYYY-MM-DD');
          return moment.min(now, solarMoment);
        }
        // 因为直接获取当年年份会出现一个问题：农历是2019年12月8日，但是还没过，而新历已经是2020年，则下面代码就会提取错误
        // 先提取目标日的月和日转换成今年的月日
        let now2Lunar = moment(`${now.get('year') - 1}-${target.get('month') + 1}-${target.get('date')}`, 'YYYY-MM-DD');
        // 在进行农历转换
        let solar = lunar2solar(now2Lunar);
        let solarMoment = moment(solar.date, 'YYYY-MM-DD');
        if (!solarMoment.isAfter(now) && !solarMoment.isSame(now)) {
          now2Lunar = moment(`${now.get('year')}-${target.get('month') + 1}-${target.get('date')}`, 'YYYY-MM-DD');
          solar = lunar2solar(now2Lunar);
          solarMoment = moment(solar.date, 'YYYY-MM-DD');
        }
        // 判断是否在现在是否已经超过目标日转换后的公历，如果超过则转换成下一年。
        if (!solarMoment.isAfter(now) && !solarMoment.isSame(now)) {
          now2Lunar = moment(`${now.get('year') + 1}-${target.get('month') + 1}-${target.get('date')}`, 'YYYY-MM-DD');
          solar = lunar2solar(now2Lunar);
          solarMoment = moment(solar.date, 'YYYY-MM-DD');
        }
        return moment.min(now, solarMoment);
      }
      if (this.repeat) {
        if (!target.isAfter(now) && !target.isSame(now)) {
          const newTarget = moment(`${now.get('year')}-${target.get('month') + 1}-${target.get('date')}`, 'YYYY-MM-DD');
          return moment.min(now, newTarget);
        }
      }
      return moment.min(now, target);
    },
    getMomentPass() {
      return moment(this.getMomentPassCheck().format('YYYY-MM-DD'));
    },
    /**
     * 获取未来时间
     */
    getMomentFeatureCheck() {
      const now = this.getMomentNow();
      const target = this.getMomentTarget();
      if (this.lunar) {
        if (!this.repeat) {
          const solar = lunar2solar(target);
          const solarMoment = moment(solar.date, 'YYYY-MM-DD');
          return moment.max(now, solarMoment);
        }
        // 因为直接获取当年年份会出现一个问题：农历是2019年12月8日，但是还没过，而新历已经是2020年，则下面代码就会提取错误
        // 先提取目标日的月和日转换成今年的月日
        let now2Lunar = moment(`${now.get('year') - 1}-${target.get('month') + 1}-${target.get('date')}`, 'YYYY-MM-DD');
        // 在进行农历转换
        let solar = lunar2solar(now2Lunar);
        let solarMoment = moment(solar.date, 'YYYY-MM-DD');
        if (!solarMoment.isAfter(now) && !solarMoment.isSame(now)) {
          now2Lunar = moment(`${now.get('year')}-${target.get('month') + 1}-${target.get('date')}`, 'YYYY-MM-DD');
          solar = lunar2solar(now2Lunar);
          solarMoment = moment(solar.date, 'YYYY-MM-DD');
        }
        // 判断是否在现在是否已经超过目标日转换后的公历，如果超过则转换成下一年。
        if (!solarMoment.isAfter(now) && !solarMoment.isSame(now)) {
          now2Lunar = moment(`${now.get('year') + 1}-${target.get('month') + 1}-${target.get('date')}`, 'YYYY-MM-DD');
          solar = lunar2solar(now2Lunar);
          solarMoment = moment(solar.date, 'YYYY-MM-DD');
        }
        return moment.max(now, solarMoment);
      }
      if (this.repeat) {
        if (!target.isAfter(now) && !target.isSame(now)) {
          const newTarget = moment(`${now.get('year')}-${target.get('month') + 1}-${target.get('date')}`, 'YYYY-MM-DD');
          return moment.max(now, newTarget);
        }
      }
      return moment.max(now, target);
    },
    getMomentFeature() {
      return moment(this.getMomentFeatureCheck().format('YYYY-MM-DD'));
    },
    footTip() {
      return this.isCountDown() ? '目标日' : '起始日';
    },
    /**
     * 目标日格式转换
     */
    formatTarget() {
      let target = this.getMomentTarget();
      if (this.lunar) {
        if (this.repeat) {
          target = this.getMomentFeature();
        } else {
          const solar = lunar2solar(this.getMomentTarget());
          target = moment(solar.date, 'YYYY-MM-DD');
        }
      } else if (!this.lunar && this.repeat) {
        target = this.getMomentFeature();
      }
      // 显示农历
      if (this.currentShowLorS === 0) {
        const lunar = solar2lunar(target);
        return `${lunar.gzYear}(${lunar.lYear}) ${lunar.IMonthCn} ${lunar.IDayCn}`;
      }
      // 显示公历
      return target.format('YYYY-MM-DD dddd');
    },
    getDay() {
      const time = this.getMomentFeature().diff(this.getMomentPass(), 'days');
      return `${time}`;
    },
    getYear() {
      const years = this.getMomentFeature().diff(this.getMomentPass(), 'years');
      if (years > 0) {
        // 获取与target相隔了time年的那天
        const momentAddYear = this.getMomentPass().add(years, 'years');
        // 判断月份差值
        const months = this.getMomentFeature().diff(momentAddYear, 'months');
        // 判断是否大于当前时间所在月份
        if (months > 0) {
          const momentSubMonth = momentAddYear.add(months, 'months');
          const days = this.getMomentFeature().diff(momentSubMonth, 'days');
          if (days > 0) {
            return `${years}年${months}个月${days}天`;
          }
          return `${years}年${months}个月`;
        }
        const days = this.getMomentFeature().diff(momentAddYear, 'days');
        if (days > 0) {
          return `${years}年${days}天`;
        }
        return `${years}年`;
      }
      return '';
    },
    getMonth() {
      const months = this.getMomentFeature().diff(this.getMomentPass(), 'months');
      if (months > 0) {
        const momentAddMonth = this.getMomentPass().add(months, 'months');
        const days = this.getMomentFeature().diff(momentAddMonth, 'days');
        if (days > 0) {
          return `${months}个月${days}天`;
        }
        return `${months}个月`;
      }
      return '';
    },
    getWeek() {
      const weeks = this.getMomentFeature().diff(this.getMomentPass(), 'weeks');
      if (weeks > 0) {
        const momentAddWeek = this.getMomentPass().add(weeks, 'weeks');
        const days = this.getMomentFeature().diff(momentAddWeek, 'days');
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
          scale = 4;
        } else if (contentLength > 1 && contentLength <= 5) {
          scale = 8;
        } else {
          scale = 10;
        }
        const contentWidth = this.$refs.content.offsetWidth;
        this.contentSize = contentWidth / contentLength * scale;
      });
    },
    /**
     * 转换显示格式
     */
    changeContent() {
      if (this.currentShowStatus === 3) {
        this.currentShowStatus = 0;
      } else {
        this.currentShowStatus += 1;
      }
    },
    changeLorS() {
      if (this.lunar && this.currentShowLorS === 1) {
        this.currentShowLorS = 0;
      } else if (this.lunar && this.currentShowLorS === 0) {
        this.currentShowLorS = 1;
      } else {
        this.currentShowLorS = 1;
      }
      this.formatTarget();
    },
  },
};
</script>

<style lang="scss" scoped>
$border-radius: 2vw;

.card {
  background: transparent;
  padding: 4vw;
  height: 45vh;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  -webkit-flex-direction: column;
  font-family: sans-serif;
  font-size: 16px;
  transition: 1s;
  -moz-transition: 1s;
  -webkit-transition: 1s;
  -o-transition: 1s;

  .container {
    background: #ffffff;
    background-repeat: no-repeat;
    background-size: cover;
    background-clip: border-box;
    background-position: center;
    border-radius: $border-radius;
    // color: #ffffff;
    transition: .5s;
    -moz-transition: .5s;
    -webkit-transition: .5s;
    -o-transition: .5s;

    .head {
      // background: #3385bc;
      height: 8vh;
      line-height: 8vh;
      text-align: center;
      font-size: 2.5vh;
      border-top-left-radius: $border-radius;
      border-top-right-radius: $border-radius;
      // opacity: 0.2;
    }

    .content {
      height: 30vh;
      line-height: 30vh;
      text-align: center;
      color: #282828;
      font-style: bold;
      font-weight: bold;
      // background: #f3f3f3;
      opacity: 0.7;
    }

    .foot {
      height: 7vh;
      line-height: 7vh;
      color: #8e8c8d;
      font-size: 1.5vh;
      text-align: center;
      background: #f3f3f3;
      border-bottom-left-radius: $border-radius;
      border-bottom-right-radius: $border-radius;
      // background: #f3f3f3;
      // opacity: 0.7;
    }
  }
}
</style>
