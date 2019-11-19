/**
 * 生成uuid
 * return {string}
 */
export function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
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
  if (!cb) {
    return res;
  }
  if (!Array.isArray(cb) || !cb.length) {
    return res;
  }
  let next: Function | null = null;
  while (cb.length) {
    next = <Function>cb.shift();
    if (typeof next === 'function') {
      break;
    }
  }
  return pipe((next ? next(res) : res), ...cb);
  // return pipe.apply(null, [(next ? next(res) : res)].concat(cb));
}

