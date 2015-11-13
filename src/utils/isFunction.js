/**
 * isFunction
 *
 * @returns {Boolean}
 */

export default function isFunction(value) {
  return Object.prototype.toString.call(value) === '[object Function]';
}
