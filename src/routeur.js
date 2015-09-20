/*!
 * @license routeur
 * (c) sugarshin
 * License: MIT
 */

'use strict';

import globToRegexp from 'glob-to-regexp';
import assign from 'object-assign';
import omit from 'object.omit';
import extRegex from 'ext-regex';

import objectForEach from './util/objectForEach';
import indexRegex from './util/indexRegex';
import isString from './util/isString';
import isFunction from './util/isFunction';

export default class Routeur {

  /**
   * constructor
   *
   * @param  {Object} routes = {}
   * @param  {Object} config
   */
  constructor(routes = {}, config) {
    this.routes = routes;
    this.config = assign({
      rootPath: ''
    }, config);
  }

  /**
   * run
   *
   * @param  {String} currentPathName = location.pathname || ''
   */
  run(currentPathName = location.pathname || '') {
    objectForEach(this.routes, (actionOrActions, pathName) => {
      const globPath = this._getGlobPath(this.config.rootPath, pathName);
      const regexp = globToRegexp(globPath, {extended: true});

      if (regexp.test(currentPathName)) {
        if (isFunction(actionOrActions)) {
          actionOrActions();
        } else if (Array.isArray(actionOrActions)) {
          actionOrActions.forEach(action => action());
        }
      }
    });
  }

  /**
   * configure
   *
   * @param  {Object} config
   * @return {Routeur} this
   */
  configure(config) {
    this.config = assign({}, this.config, config);
    return this;
  }

  /**
   * addRoute
   *
   * @param  {String or Object} pathName or route
   * @param  {Function or Functions Array} actionOrActions
   * @return {Routeur} this
   */
  addRoute(pathName /* or route object */, actionOrActions) {
    if (isString(pathName)) {
      this.routes[pathName] = actionOrActions;
    } else {
      const route = pathName;
      this.routes = assign({}, this.routes, route);
    }
    return this;
  }

  /**
   * removeRoute
   *
   * @param  {String} pathName
   * @return {Routeur} this
   */
  removeRoute(pathName) {
    this.routes = omit(this.routes, pathName);
    return this;
  }

  /**
   * _getGlobPath
   *
   * @param  {String} rootPath
   * @param  {String} pathName
   * @return {String} glob
   */
  _getGlobPath(rootPath, pathName) {
    if (extRegex().test(pathName)) {
      return `${rootPath}${pathName}`;
    }

    if (indexRegex().test(pathName)) {
      return `${rootPath}${pathName}{,index.html}`;
    }

    return `${rootPath}${pathName}{/,/index.html}`;
  }

}
