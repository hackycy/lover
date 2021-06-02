import { calendar } from './calendar';
import { getYear, getMonth, getDate } from 'date-fns'

export const TIME_FORMAT = 'yyyy-MM-dd'

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
 * 农历转公历
 * @param {Moment} target
 */
export function lunar2solar(target: Date) {
  return calendar.lunar2solar(getYear(target), getMonth(target) + 1, getDate(target));
}

/**
 * 公历转农历
 * @param {Moment} target
 */
export function solar2lunar(target: Date) {
  return calendar.solar2lunar(getYear(target), getMonth(target) + 1, getDate(target));
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