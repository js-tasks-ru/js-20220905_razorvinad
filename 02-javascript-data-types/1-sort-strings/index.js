/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  //копируем данные в новый массив
  const newArr = [...arr];
  //выбор параметра для сортировки - прямой или обратный
  switch (param) {
  case 'asc':
    newArr.sort((a, b) => a.localeCompare(b));
    return newArr.sort((a, b) => {
      if ((a < b) && (a.charAt(0) === b.charAt(0).toUpperCase())) {
        return -1;
      }
    });
  case 'desc':
    newArr.sort((a, b) => b.localeCompare(a));
    return newArr.sort((a, b) => {
      if ((a > b) && (b.charAt(0) === a.charAt(0).toUpperCase())) {
        return -1;
      }
    });
  }
  return newArr;
}
