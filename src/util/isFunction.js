/**
 * isFunction
 *
 * @return  {Boolean}
 */

'use strict';

const toString = Object.prototype.toString;

export default function isFunction(value) {
  return toString.call(value) === '[object Function]';
}
