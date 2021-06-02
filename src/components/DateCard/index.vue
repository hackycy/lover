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
      <div class="foot">目标日：{{ fotmatFooter }}</div>
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
  addHours,
  isAfter,
  subYears,
  subMonths,
  subWeeks,
  getDate,
  toDate,
  format,
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
    // 当前时间
    const currentDate = readonly(new Date())

    // parse date
    let formatTarget: Date = parse(target.value, TIME_FORMAT, new Date())
    if (repeat.value) {
      // 如果需要重复，那么开始处理
      if (lunar.value) {
        // 处理农历
        let currentYear = getYear(currentDate)
        const sDateTime = parse(target.value, TIME_FORMAT, new Date())
        const sDate = getDate(sDateTime)
        const sMonth = getMonth(sDateTime)
        // 获取今年的农历日
        const nowLunarDatetime = parse(
          (lunar2solar(toDate(new Date(currentYear, sMonth, sDate))) as any)
            .date,
          TIME_FORMAT,
          new Date()
        )
        if (isAfter(nowLunarDatetime, currentDate)) {
          // 今年农历还没过则继续使用今年月份
          formatTarget = nowLunarDatetime
        } else {
          // 已经过了生日则跳到下一年
          formatTarget = parse(
            (
              lunar2solar(
                toDate(new Date(currentYear + 1, sMonth, sDate))
              ) as any
            ).date,
            TIME_FORMAT,
            new Date()
          )
        }
      } else {
        // 处理阳历重复
        let currentYear = getYear(currentDate)
        const tDate = getDate(formatTarget)
        const tMonth = getMonth(formatTarget)
        const cDate = getDate(currentDate)
        const cMonth = getMonth(currentDate)
        if (cMonth > tMonth || cDate > tDate) {
          // 如果当前时间已经过去了，那么将年份换到下一年
          currentYear += 1
        }
        formatTarget = toDate(new Date(currentYear, tMonth, tDate))
      }
    } else {
      if (lunar.value) {
        formatTarget = parse(
          (lunar2solar(formatTarget) as any).date,
          TIME_FORMAT,
          new Date()
        )
      } else {
        formatTarget = parse(target.value, TIME_FORMAT, new Date())
      }
    }

    const targetDate = readonly(formatTarget)

    // 是否为倒数
    const isReciprocal = ref(isAfter(targetDate, currentDate))
    const fotmatFooter = ref(format(targetDate, TIME_FORMAT))
    const formatTitle = isReciprocal.value
      ? `${title.value}还有`
      : `${title.value}已经`
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
        transform.value = `translate3d(-50%, 0, 0) scale(${r * 0.75})`
      } else {
        transform.value = 'translate3d(-50%, 0, 0)'
      }
    }

    // 计算时间
    const parseTime = (date: Date, preDate: Date) => {
      if (mode.value === 1) {
        const years = differenceInYears(date, preDate)
        if (years <= 0) {
          mode.value += 1
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
          mode.value += 1
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
          mode.value += 1
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
        parseTime(addHours(targetDate, 24), currentDate)
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
      fotmatFooter,
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
      font-weight: 400;
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
      overflow: hidden;

      span {
        font-family: monospace,"PingFang SC",miui,system-ui,-apple-system,BlinkMacSystemFont,Helvetica Neue,Helvetica,sans-serif;
        position: absolute;
        left: 50%;
        display: block;
        white-space: nowrap;
        line-height: 30vh;
        color: #282828;
        font-style: bold;
        font-weight: bold;
        font-size: 16vh;
        letter-spacing: 2px;
        transition: transform 0.2s ease;
        -moz-transition: transform 0.2s ease;
        -webkit-transition: transform 0.2s ease;
        -o-transition: transform 0.2s ease;
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
