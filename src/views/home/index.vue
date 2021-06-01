<template>
  <div class="home-container">
    <date-card title="在一起" target="2017-03-22"></date-card>
  </div>
</template>

<script lang="ts">
import DateCard from '@/components/DateCard/index.vue'
import { defineComponent } from "@vue/runtime-core";

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
}
</style>