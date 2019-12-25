import { calendar } from '@/common/calendar';
// eslint-disable-next-line import/prefer-default-export
/**
 * 判断是否为整数
 * @param {*} num
 */
export function isInt(num) {
  return Math.floor(num) === num;
}

/**
 * 判断字符串长度，该方法中中文字符长度为2
 * @param {String} str
 */
export function strLength(str) {
  let len = 0;
  for (let i = 0; i < str.length; i += 1) {
    if (str.charCodeAt(i) >= 0 && str.charCodeAt(i) <= 127) {
      len += 1;
    } else {
      len += 2;
    }
  }
  return len;
}

/**
 * 农历转公历，需要传入Moment对象
 * @param {Moment} target
 */
export function lunar2solar(target) {
  return calendar.lunar2solar(target.get('year'), target.get('month') + 1, target.get('date'));
}

/**
 * 公历转农历，需要传入Moment对象
 * @param {Moment} target
 */
export function solar2lunar(target) {
  return calendar.solar2lunar(target.get('year'), target.get('month') + 1, target.get('date'));
}

/**
 * 添加requestAnimationFrame兼容做法
 */
function requestAnimationFrameFunc() {
  return window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame
    // eslint-disable-next-line func-names
    || function (callback) { window.setTimeout(callback, 1000 / 60); };
}

export const requestAnimationFrame = requestAnimationFrameFunc();
