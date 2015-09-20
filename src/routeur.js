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

export default class Routeur {

  /**
   * constructor
   *
   * @param  {Object} routes
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
   * @param  {String} currentPathName
   */
  run(currentPathName = location.pathname || '') {
    objectForEach(this.routes, (actionOrActions, pathName) => {
      const globPath = this._getGlobPath(this.config.rootPath, pathName);
      const regexp = globToRegexp(globPath, {extended: true});

      if (regexp.test(currentPathName)) {
        if (typeof actionOrActions === 'function') {
          actionOrActions();
        } else if (Array.isArray(actionOrActions)) {
          actionOrActions.forEach(action => { action(); });
        }
      }
    });
  }

  /**
   * configure
   *
   * @param  {Object} config
   * @return {Router instance} this
   */
  configure(config) {
    this.config = assign({}, this.config, config);
    return this;
  }

  /**
   * addRoute
   *
   * @param  {Object} route
   * @return {Router instance} this
   */
  addRoute(route) {
    this.routes = assign({}, this.routes, route);
    return this;
  }

  /**
   * removeRoute
   *
   * @param  {String} pathName
   * @return {Router instance} this
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
