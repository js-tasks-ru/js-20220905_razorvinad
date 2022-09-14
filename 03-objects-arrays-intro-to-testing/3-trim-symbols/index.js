/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  let str = '';
  let lastSmb = '';
  let count = 1;
  let copiString = string.split('');

  if (size !== 0) {
    for (let smb of copiString) {
      if (smb === lastSmb) {
        if (count < size) {
          str = str.concat(smb);
          count++;
        }
      } else {
        count = 1;
        str = str.concat(smb);
      }
      lastSmb = smb;
    }
  }
  //если размер не указан
  if (size === undefined) {
    str = string;
  }

  return str;
}
