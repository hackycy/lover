<template>
  <div class="card">
    
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DateCard',
  props: {
    /**
     * 卡片标题
     */
    title: {
      type: String,
      default: '倒计时卡片'
    },
    /**
     * 日期格式字符串， 格式为 yyyy-MM-dd
     */
    target: {
      type: String,
      default: '2017-03-22'
    },
    /**
     * 是否为农历，默认为false
     */
    lunar: {
      type: Boolean,
      default: false
    },
    /**
     * 标题背景颜色
     */
    titleBgColor: {
      type: String,
      default: '#3385bc'
    },
    /**
     * 整体字体颜色
     */
    textColor: {
      type: String,
      default: 'black'
    }
  },
  setup(props) {

  }
})
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
    transition: 0.5s;
    -moz-transition: 0.5s;
    -webkit-transition: 0.5s;
    -o-transition: 0.5s;
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
