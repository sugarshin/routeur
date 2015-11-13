/**
 * objectForEach
 *
 * @param   {Object} object
 * @param   {Function} func
 * @param   {Any} context = null
 * @returns {void}
 */

export default function objectForEach(object, func, context = null) {
  Object.keys(object).forEach((key, i) => {
    func.call(context, object[key], key, i, object);
  });
}
