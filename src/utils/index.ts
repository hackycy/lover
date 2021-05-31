import { calendar } from './calendar';
// eslint-disable-next-line import/prefer-default-export
/**
 * 判断是否为整数
 * @param {*} num
 */
export function isInt(num: any) {
  return Math.floor(num) === num;
}

/**
 * 判断字符串长度，该方法中中文字符长度为2
 * @param {String} str
 */
export function strLength(str: string) {
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
export function lunar2solar(target: any) {
  return calendar.lunar2solar(target.get('year'), target.get('month') + 1, target.get('date'));
}

/**
 * 公历转农历，需要传入Moment对象
 * @param {Moment} target
 */
export function solar2lunar(target: any) {
  return calendar.solar2lunar(target.get('year'), target.get('month') + 1, target.get('date'));
}

/**
 * 添加requestAnimationFrame兼容做法
 */
export function requestAnimationFrameFunc() {
  return window.requestAnimationFrame
    || (window as any).mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || (window as any).msRequestAnimationFrame
    // eslint-disable-next-line func-names
    || function (callback) { window.setTimeout(callback, 1000 / 60); };
}