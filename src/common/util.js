import { calendar } from '@/common/calendar';

/**
 * 判断是否为整数
 * @param {*} num
 */
// eslint-disable-next-line import/prefer-default-export
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
 * 农历转公历
 * @param {Moment} target
 */
export function lunar2solar(target) {
  return calendar.lunar2solar(target.get('year'), target.get('month') + 1, target.get('date'));
}
