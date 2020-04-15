import { MapType } from './interface';


/**
 * 固定长度
 * @param {number} x  输入值
 * @param {number} l 长度
 * @param {string} fillStr 填充字符
 * @returns {string}
 */
export function fixedNum(x: number, l: number, fillStr: string = '0') {
  for (let i = 1; i <= l; i++) {
    const limit = Math.pow(10, i);
    if (x < limit) {
      return fillStr.repeat(l - i) + x;
    }
  }
  return x.toString();
}

/**
 * 生成uuid
 * return {string}
 */
export function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * 获取一个单键值对象
 * @param {string} key
 * @param value
 * @returns {MapType<any>}
 */
export function getPlainObject(key: string, value: any) {
  const o: MapType<any> = {};
  o[key] = value;
  return o;
}

/**
 * 管道处理
 * return {any}
 */
export function pipe(res: any, ...cb: Function[]) {
  const args = [].slice.call(arguments, 0);
  if (!args.length) {
    throw new Error('the first parameter must be pass in!');
  }
  if (!cb.length) {
    return res;
  }
  let next: Function | null = null;
  let isFunc: boolean = false;
  while (cb.length) {
    isFunc = false;
    next = <Function>cb.shift();
    if (typeof next === 'function') {
      isFunc = true;
      break;
    }
  }
  return pipe((isFunc ? (<Function>next)(res) : res), ...cb);
}

