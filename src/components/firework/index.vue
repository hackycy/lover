<template>
  <div class="container">
    <canvas
      ref="canvas"
      class="canvas"
      width="960"
      height="960"
    />
  </div>
</template>

<script>
/* eslint-disable no-param-reassign */
import { getRandom, createRandomFire } from '@/common/fireworks';

export default {
  name: 'FireWork',
  data() {
    return {
      fires: [],
      rmfires: [],
      animation: null,
      height: 0,
      width: 0,
      ctx: null,
    };
  },
  mounted() {
    this.start();
  },
  methods: {
    start() {
      this.$nextTick(() => {
        const { canvas } = this.$refs;
        const ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.ctx = ctx;
        for (let i = 0; i < 6; i += 1) {
          this.fires.push(createRandomFire());
        }
        if (this.fires.length) {
          this.animate();
        }
        window.requestAnimationFrame(this.animate);
      });
    },
    animate() {
      // 产生拖尾效果
      this.ctx.fillStyle = 'rgba(0,0,0,0.05)';
      this.ctx.fillRect(0, 0, this.width, this.height);
      if (this.fires.length) {
        this.fires.forEach((fire, i) => {
          const marginWidthLeft = parseInt(getRandom(0, this.width / 10), 10);
          const marginWidthRight = parseInt(getRandom(900, this.width), 10);
          const marginHeight = parseInt(getRandom(0, 300), 10);
          // console.log(marginWidthLeft, marginWidthRight, marginHeight);
          if (fire.x >= marginWidthRight || fire.x <= marginWidthLeft || fire.y <= marginHeight) {
            fire.disappear = true;
          }
          if (!fire.disappear) {
            fire.draw(this.ctx);
            fire.move();
          } else {
            const removeFire = this.fires.splice(i, 1);
            this.rmfires.push(removeFire);
            if (this.rmfires.length) {
              this.rmfires.forEach((f) => {
                if (f[0].boomJudge) {
                  f[0].boom();
                  f[0].boomJudge = false;
                }
              });
            }
            this.fires.push(createRandomFire());
          }
        });
      }
      if (this.rmfires.length) {
        this.rmfires.forEach((rmfire, i) => {
          rmfire[0].fragArr.forEach((frag) => {
            if (frag.fragDisappear) {
              this.rmfires.splice(i, 1);
            }
            frag.draw(this.ctx);
            frag.move();
          });
        });
      }
      window.requestAnimationFrame(this.animate);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  width: 100%;
  height: 100%;
  max-width: 768px;
  margin: auto;

  .canvas {
    height: 100%;
    width: 100%;
    background:rgba(255,255,255,0);/*关键点*/
  }
}
</style>
