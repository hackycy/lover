<template>
  <div class="card">
    <div class="container">
      <div class="head">{{ formatTitle }}</div>
      <div ref="counterContainer" class="content" @click="onChangeMode">
        <span ref="counter" :style="{ transform: transform }">{{
          countTime
        }}</span>
      </div>
      <van-divider :style="{ margin: '0 16px' }" />
      <div class="foot">目标日：{{ target }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  differenceInWeeks,
  parse,
  isAfter,
  subYears,
  subMonths,
  subWeeks,
  getDate,
  toDate,
  getMonth,
  getYear
} from 'date-fns'
import { TIME_FORMAT, lunar2solar } from '@/utils'
import {
  defineComponent,
  onMounted,
  onUnmounted,
  readonly,
  ref,
  toRefs,
  watch,
  nextTick
} from 'vue'

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
     * 是否重复
     */
    repeat: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    // 显示的模式 0: 天数模式 1: 年模式 2: 月模式 3: 周模式
    const mode = ref(0)
    const { target, title, lunar, repeat } = toRefs(props)
    // 输出
    const countTime = ref('')
    // parse target
    const parseTarget = parse(target.value, TIME_FORMAT, new Date())
    let formatTarget
    if (lunar.value) {
      const solar: any = lunar2solar(parseTarget)
      formatTarget =  parse(solar.date, TIME_FORMAT, new Date())
    } else {
      formatTarget = parseTarget
    }
    // parse date
    let targetDate = readonly(formatTarget)
    const currentDate = readonly(new Date())

    // 是否为倒数
    const isReciprocal = ref(repeat.value ? true : isAfter(targetDate, currentDate))
    const formatTitle = isReciprocal.value ? `${title.value}还有` : `${title.value}已经`
    // text size auto transform
    const transform = ref('translate3d(-50%, 0, 0)')
    // ref
    const counterContainer = ref<HTMLElement | null>(null)
    const counter = ref<HTMLElement | null>(null)

    // 让文字自适应大小
    const handleTransform = () => {
      const containerWidth = counterContainer.value?.clientWidth || 0
      const counterWidth = counter.value?.clientWidth || 0
      if (counterWidth > containerWidth) {
        let r = containerWidth / counterWidth
        transform.value = `translate3d(-50%, 0, 0) scale(${r * 0.8})`
      } else {
        transform.value = 'translate3d(-50%, 0, 0)'
      }
    }

    // 计算时间
    const parseTime = (date: Date, preDate: Date) => {
      if (mode.value === 1) {
        const years = differenceInYears(date, preDate)
        if (years <= 0) {
          const days = differenceInDays(date, preDate)
          countTime.value = days.toString()
        } else {
          let subDate = subYears(date, years)
          const months = differenceInMonths(subDate, preDate)
          subDate = subMonths(subDate, months)
          const days = differenceInDays(subDate, preDate)
          let format = `${years}年`
          if (months > 0) {
            format += `${months}月`
          }
          if (days > 0) {
            format += `${days}天`
          }
          countTime.value = format
        }
      } else if (mode.value === 2) {
        const months = differenceInMonths(date, preDate)
        if (months <= 0) {
          const days = differenceInDays(date, preDate)
          countTime.value = days.toString()
        } else {
          let subDate = subMonths(date, months)
          const days = differenceInDays(subDate, preDate)
          let format = `${months}月`
          if (days > 0) {
            format += `${days}天`
          }
          countTime.value = format
        }
      } else if (mode.value === 3) {
        const weeks = differenceInWeeks(date, preDate)
        if (weeks <= 0) {
          const days = differenceInDays(date, preDate)
          countTime.value = days.toString()
        } else {
          let subDate = subWeeks(date, weeks)
          const days = differenceInDays(subDate, preDate)
          let format = `${weeks}周`
          if (days > 0) {
            format += `${days}天`
          }
          countTime.value = format
        }
      } else {
        const days = differenceInDays(date, preDate)
        countTime.value = days.toString()
      }
      nextTick(() => {
        handleTransform()
      })
    }

    const calcTime = () => {
      if (isReciprocal.value) {

        // 需要判断是否repeat
        if (repeat.value) {
          // 重复
          let currentYear = getYear(currentDate)
          const tDate = getDate(targetDate)
          const tMonth = getMonth(targetDate)
          const cDate = getDate(currentDate)
          const cMonth = getMonth(currentDate)
          if ((cMonth > tMonth) || (cDate > tDate)) {
            // 如果当前时间已经过去了，那么将年份换到下一年
            currentYear += 1
          } 
          parseTime(toDate(new Date(currentYear, tMonth, tDate)), currentDate)
        } else {
          parseTime(targetDate, currentDate)
        }
      } else {
        parseTime(currentDate, targetDate)
      }
    }

    calcTime()

    // watch mode
    watch(mode, (cMode, pMode) => {
      // reset size
      transform.value = 'translate3d(-50%, 0, 0)'
      nextTick(() => {
        calcTime()
      })
    })

    onMounted(() => {
      handleTransform()
      // add event listener
      window.addEventListener('resize', handleTransform)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', handleTransform)
    })

    const onChangeMode = () => {
      if (mode.value === 3) {
        mode.value = 0
      } else {
        mode.value += 1
      }
    }

    return {
      formatTitle,
      isReciprocal,
      countTime,
      currentDate,
      targetDate,
      transform,
      mode,
      counter,
      counterContainer,
      onChangeMode
    }
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
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    background-color: #ffffff;
    opacity: 0.8;
    background-repeat: no-repeat;
    background-size: cover;
    background-clip: border-box;
    background-position: center;
    border-radius: $border-radius;
    letter-spacing: 1.25px;
    // color: #ffffff;
    transition: 0.5s;
    -moz-transition: 0.5s;
    -webkit-transition: 0.5s;
    -o-transition: 0.5s;
    .head {
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      background: #138bdb;
      color: #ffffff;
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
      width: 100%;
      text-align: center;
      position: relative;
      box-sizing: border-box;

      span {
        position: absolute;
        left: 50%;
        display: block;
        white-space: nowrap;
        line-height: 30vh;
        color: #282828;
        font-style: bold;
        font-weight: bold;
        font-size: 18vh;
        letter-spacing: 12px;
      }
    }
    .foot {
      height: 7vh;
      line-height: 7vh;
      color: #8e8c8d;
      font-size: 1.5vh;
      text-align: center;
      border-bottom-left-radius: $border-radius;
      border-bottom-right-radius: $border-radius;
    }
  }
}
</style>
