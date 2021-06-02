<template>
  <div class="home-container">
    <van-swipe indicator-color="#ffffff">
      <van-swipe-item>
        <date-card title="我们在一起" target="2017-03-22"></date-card>
      </van-swipe-item>
      <van-swipe-item>
        <date-card title="小宝贝生日" target="1995-12-08" lunar repeat></date-card>
      </van-swipe-item>
      <van-swipe-item>
        <date-card title="我的生日" target="1997-06-26" lunar repeat></date-card>
      </van-swipe-item>
      <template #indicator="{ active }">
        <div class="custom-indicator">{{ active + 1 }} / 3</div>
      </template>
    </van-swipe>
  </div>
</template>

<script lang="ts">
import DateCard from '@/components/DateCard/index.vue'
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  name: 'Home',
  components: {
    DateCard
  }
})
</script>

<style lang="scss" scoped>
.home-container {
  background-color: antiquewhite;
  height: 100vh;
  max-width: 765px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  justify-content: center;

  .custom-indicator {
    position: fixed;
    right: 2vw;
    bottom: 2vw;
    font-size: 10px;
    transform: scale(0.8);
    color: #ccc;
  }
}
</style>
