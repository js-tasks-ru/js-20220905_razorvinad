/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const passes = path.split(".");
  let n = 0;

  return function newGetter(object) {
    //проверка на валидность
    if (object === undefined) {
      return object;
    }
    let key = passes[n];
    n++;
    if (key === passes[passes.length - 1]) {//проврка на последнее свойство
      return object[key];
    } else {
      return newGetter(object[key]);
    }
  };
}
