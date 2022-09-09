/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  let rr = arr.concat();
  if (param === 'asc'){
    rr.sort((a, b) => a.localeCompare(b));
    return rr.sort( (a, b) => {
      if ((a < b) && (a.charAt(0) === b.charAt(0).toUpperCase())){
        return -1;
      }
    });
  }

  if (param === 'desc'){
    rr.sort((a, b) => b.localeCompare(a));
    return rr.sort( (a, b) => {
      if ((a > b) && (b.charAt(0) === a.charAt(0).toUpperCase())){
        return -1;
      }
    });
  }

  return rr;
}
