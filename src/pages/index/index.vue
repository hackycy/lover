<template>
  <div
    class="container"
  >
    <fire-work />
    <div class="card-wrap">
      <van-swipe
        :loop="false"
        @change="onChange"
      >
        <van-swipe-item>
          <date-card
            title="我们在一起已经"
            target-date="2017-3-22"
            backdrop-mode="image"
            :backdrop-image="ourImage"
            text-mode="light"
          />
        </van-swipe-item>
        <van-swipe-item>
          <date-card
            title-bg-color="pink"
            title="距离小宝贝生日还有"
            :lunar="true"
            :repeat="true"
            target-date="1995-12-8"
            backdrop-mode="image"
            :backdrop-image="herImage"
            text-mode="light"
          />
        </van-swipe-item>
        <van-swipe-item>
          <date-card
            title-bg-color="orange"
            title="距离小宝贝的男人生日还有"
            :lunar="true"
            :repeat="true"
            target-date="1997-6-26"
            backdrop-mode="image"
            :backdrop-image="meImage"
            text-mode="light"
          />
        </van-swipe-item>
        <van-swipe-item>
          <date-card
            title-bg-color="pink"
            title="距离周年纪念还有"
            :repeat="true"
            target-date="2017-3-22"
          />
        </van-swipe-item>
        <div
          slot="indicator"
          class="custom-indicator"
        >
          {{ currentCard + 1 }}/4
        </div>
      </van-swipe>
    </div>
  </div>
</template>

<script>

import our from '@/assets/our.jpeg';
import me from '@/assets/me.jpeg';
import her from '@/assets/her.jpeg';
import DateCard from '@/components/DateCard/index.vue';
import FireWork from '@/components/firework/index.vue';

export default {
  name: 'Index',
  components: {
    DateCard,
    FireWork,
  },
  data() {
    return {
      ourImage: our,
      meImage: me,
      herImage: her,
      currentCard: 0,
    };
  },
  mounted() {
    this.$toast({
      position: 'bottom',
      message: '卡片可以左右滑动噢~',
    });
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
  opacity: 0.6;
}
.custom-indicator {
  position: absolute;
  padding: 2px;
  bottom: 4vw;
  right: 4vw;
  font-size: 1vh;
  color: #fff;
  background: rgba(0, 0, 0, 0.1);
}
</style>
