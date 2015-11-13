/*!
 * @license routeur
 * (c) sugarshin
 * License: MIT
 */

import globToRegexp from 'glob-to-regexp';
import extRegex from 'ext-regex';

import objectForEach from './utils/objectForEach';
import objectFilter from './utils/objectFilter';
import indexRegex from './utils/indexRegex';
import isString from './utils/isString';

export default class Routeur {

  /**
   * constructor
   *
   * @param  {Object} routes = {}
   * @param  {Object} config
   */
  constructor(routes = {}, config) {
    this.routes = routes;
    this.config = { rootPath: '', ...config };
  }

  /**
   * run
   *
   * @param   {String} currentPathName = location.pathname || ''
   * @returns {void}
   */
  run(currentPathName = location.pathname || '') {
    objectForEach(this.routes, (actionOrActions, pathName) => {
      const globPath = this._getGlobPath(pathName);
      const regexp = globToRegexp(globPath, { extended: true });
      const finalActions = Array.isArray(actionOrActions) ?
        actionOrActions : [actionOrActions];

      if (regexp.test(currentPathName)) {
        finalActions.forEach(action => action());
      }
    });
  }

  /**
   * configure
   *
   * @param   {Object} config
   * @returns {void}
   */
  configure(config) {
    this.config = { ...this.config, ...config };
  }

  /**
   * addRoute
   *
   * @param   {String or Object} pathName or routes
   * @param   {Function or Functions Array} actionOrActions
   * @returns {void}
   */
  addRoute(pathName, actionOrActions) {
    if (isString(pathName)) {
      this.routes[pathName] = actionOrActions;
    } else {
      const route = pathName;
      this.routes = { ...this.routes, ...route };
    }
  }

  /**
   * removeRoute
   *
   * @param   {String} pathName
   * @returns {void}
   */
  removeRoute(pathName) {
    this.routes = objectFilter(this.routes, (val, key) => key !== pathName);
  }

  /**
   * _getGlobPath
   *
   * @param   {String} pathName
   * @returns {String} glob
   */
  _getGlobPath(pathName) {
    if (extRegex().test(pathName)) {
      return `${this.config.rootPath}${pathName}`;
    }

    if (indexRegex().test(pathName)) {
      return `${this.config.rootPath}${pathName}{,index.html}`;
    }

    return `${this.config.rootPath}${pathName}{/,/index.html}`;
  }

}
