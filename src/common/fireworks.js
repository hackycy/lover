/* eslint-disable no-param-reassign */
/**
 * 烟花
 */

export function getRandom(a, b) {
  return Math.random() * (b - a) + a;
}

/**
 * 爆炸的小烟花
 */
export class Frag {
  constructor(x, y, color, tx, ty) {
    this.x = x;
    this.y = y;
    this.tx = tx;
    this.ty = ty;
    this.color = color;
    this.disappear = false;
  }

  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, 2, 2);
    ctx.restore();
  }

  move() {
    this.ty += 0.5;
    const dx = this.tx - this.x;
    const dy = this.ty - this.y;
    this.x = Math.abs(dx) < 0.1 ? this.tx : this.x + dx * 0.01;
    this.y = Math.abs(dy) < 0.1 ? this.ty : this.y + dy * 0.01;
    if (dx === 0 || dy === 0 || this.y >= 800 || this.x <= 50 || this.x >= 1700) {
      this.fragDisappear = true;
    }
  }
}

/**
 * 大烟花
 */
export class Fire {
  constructor(x, y, color, offsetValueX, offsetValueY) {
    // 爆炸的小烟花
    this.fragArr = [];

    this.initialX = x;
    this.initialY = y;
    this.x = x;
    this.y = y;
    this.vx = 2;
    this.vy = 1;

    this.color = color;

    this.radius = 4;
    this.angel = 180;

    this.offsetValueX = offsetValueX;
    this.offsetValueY = offsetValueY;
    this.disappear = false;
    this.boomJudge = true;
  }

  /**
   *
   * @param {Context2d} ctx
   */
  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  move() {
    this.x += this.vx + this.offsetValueX;
    this.y -= this.vy + this.offsetValueY;
  }

  boom() {
    // this.x = 0;
    const scope = Math.round(getRandom(10, 40));
    for (let i = 0; i < scope; i += 1) {
      const angel = getRandom(0, 2 * Math.PI);
      const range = Math.round(getRandom(50, 300));
      const targetX = this.x + range * Math.cos(angel);
      const targetY = this.y + range * Math.sin(angel);
      // rbg
      const r = Math.round(getRandom(120, 255));
      const g = Math.round(getRandom(120, 255));
      const b = Math.round(getRandom(120, 255));
      const color = `rgb(${r},${g},${b})`;
      const frag = new Frag(this.x, this.y, color, targetX, targetY);
      this.fragArr.push(frag);
    }
  }
}

export function createRandomFire() {
  const r = Math.round(getRandom(120, 255));
  const g = Math.round(getRandom(120, 255));
  const b = Math.round(getRandom(120, 255));
  const color = `rgb(${r},${g},${b})`;
  return new Fire(480 + getRandom(-300, 300), 950, color, getRandom(-5, 5), getRandom(0, 3));
}

// export function animate(ctx, width, height, fires, rmfires) {
//   // 产生拖尾效果
//   ctx.fillStyle = 'rgba(0,0,0,0.05)';
//   ctx.fillRect(0, 0, width, height);
//   if (fires.length) {
//     fires.forEach((fire, i) => {
//       const marginWidthLeft = parseInt(getRandom(0, width / 5), 10);
//       const marginWidthRight = parseInt(getRandom(1500, width), 10);
//       const marginHeight = parseInt(getRandom(0, 300), 10);
//       if (fire.x >= marginWidthRight || fire.x <= marginWidthLeft || fire.y <= marginHeight) {
//         fire.disappear = true;
//       }
//       if (!fire.disappear) {
//         fire.draw(ctx);
//         fire.move();
//       } else {
//         const removeFire = fires.splice(i, 1);
//         rmfires.push(removeFire);
//         if (rmfires.length) {
//           rmfires.forEach((f) => {
//             if (f[0].boomJudge) {
//               f[0].boom();
//               f[0].boomJudge = false;
//             }
//           });
//         }
//         fires.push(createRandomFire());
//       }
//     });
//   }
//   if (rmfires.length) {
//     rmfires.forEach((f, i) => {
//       f[0].fragArr.forEach((frag) => {
//         console.log(frag);
//         if (frag.fragDisappear) {
//           rmfires.splice(i, 1);
//         }
//         frag.draw(ctx);
//         frag.move();
//       });
//     });
//   }
// }
