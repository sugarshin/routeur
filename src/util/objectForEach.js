/**
 * objectForEach
 *
 * @param  {Object} object
 * @param  {Function} callback
 * @param  {Any} context
 */

'use strict';

export default function objectForEach(object, callback, context = global) {
  Object.keys(object).forEach((key, i) => {
    callback.call(context, object[key], key, i, object);
  });
}
