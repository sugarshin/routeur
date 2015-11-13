/**
 * objectFilter
 *
 * @param   {Object} object
 * @param   {Function} func
 * @returns {Object}
 */

export default function objectFilter(object, func) {
  return Object.keys(object).reduce((result, key) => {
    if (func(object[key], key)) {
      result[key] = object[key];
    }
    return result;
  }, {});
}
