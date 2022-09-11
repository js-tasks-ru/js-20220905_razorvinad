/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  //создаём пустой объект
  let newObj = {};
  //перебираем массив ключей для записи в новый объект пар - ключ-значение
  for (const fil of fields){
    if (obj.hasOwnProperty(fil)){ //метод hasOwn не работает
      newObj[fil] = obj[fil];
    }
  }
  return newObj;
};
