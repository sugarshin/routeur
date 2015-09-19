/*!
 * routeur
 * (c) sugarshin
 * License: MIT
 */

'use strict';

import pathToRegexp from 'path-to-regexp';
import assign from 'object-assign';
import omit from 'object.omit';

export default class Routeur {

  /**
   * constructor
   *
   * @param  {Object} routes
   */
  constructor(routes = {}) {
    this.routes = routes;
    this.config = {
      rootPath: ''
    };
  }

  /**
   * run
   *
   */
  run() {
    const { rootPath } = this.config;
    const currentPathName = location.pathname;

    Object.keys(this.routes).forEach(pathName => {
      const regexp = pathToRegexp(`${rootPath}${pathName}`);
      if (regexp.test(currentPathName)) {
        if (typeof this.routes[pathName] === 'function') {
          this.routes[pathName]();
        } else if (Array.isArray(this.routes[pathName])) {
          this.routes[pathName].forEach(action => {
            action();
          });
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

}
