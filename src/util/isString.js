/**
 * isString
 *
 * @return  {Boolean}
 */

'use strict';

const toString = Object.prototype.toString;

export default function isString(value) {
  return toString.call(value) === '[object String]';
}
