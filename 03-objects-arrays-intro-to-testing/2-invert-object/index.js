/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
  const newObj = {...obj};
  //проверка на валидность
  if (obj === undefined) {
    return obj;
  }
  //перебор объекта и замена свойств на ключи
  for (let [key, value] of Object.entries(obj)) {
    newObj[value] = key;
    delete newObj[key];
  }
  return newObj;
}
