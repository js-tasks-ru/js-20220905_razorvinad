/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
  //создаём новый объект и копируем в него исходный
  let newObj = {};
  Object.assign(newObj, obj);
  //удаляем ненужные свойства из скопированного объекта
  for (let fil of fields){
    if (obj.hasOwnProperty(fil)){
      delete newObj[fil];
    }
  }
  return newObj;
};
