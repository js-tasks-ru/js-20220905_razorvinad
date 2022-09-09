/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
  let nw = obj;

  for (let fil in fields){
    if (obj.hasOwnProperty(fields[fil])){
      console.log(fields[fil])
      delete nw[fields[fil]]
    }
  }
  return nw;
};
