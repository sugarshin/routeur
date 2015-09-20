(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * ext-regex <https://github.com/regexps/ext-regex>
 *
 * Copyright (c) 2014 Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function extRegex() {
  return /(?=\.)(\.([^\\\/.]*))*$/;
};

},{}],2:[function(require,module,exports){
/*!
 * for-in <https://github.com/jonschlinkert/for-in>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

module.exports = function forIn(o, fn, thisArg) {
  for (var key in o) {
    if (fn.call(thisArg, o[key], key, o) === false) {
      break;
    }
  }
};
},{}],3:[function(require,module,exports){
/*!
 * for-own <https://github.com/jonschlinkert/for-own>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var forIn = require('for-in');
var hasOwn = Object.prototype.hasOwnProperty;

module.exports = function forOwn(o, fn, thisArg) {
  forIn(o, function (val, key) {
    if (hasOwn.call(o, key)) {
      return fn.call(thisArg, o[key], key, o);
    }
  });
};

},{"for-in":2}],4:[function(require,module,exports){
module.exports = function (glob, opts) {
  if (glob == null) {
    return null;
  }

  var str = String(glob);

  // The regexp we are building, as a string.
  var reStr = "";

  // Whether we are matching so called "extended" globs (like bash) and should
  // support single character matching, matching ranges of characters, group
  // matching, etc.
  var extended = opts ? !!opts.extended : false;

  // If we are doing extended matching, this boolean is true when we are inside
  // a group (eg {*.html,*.js}), and false otherwise.
  var inGroup = false;
  // RegExp flags (eg "i" ) to pass in to RegExp constructor.
  var flags = opts && typeof( opts.flags ) === "string" ? opts.flags : "";
  var c;
  for (var i = 0, len = str.length; i < len; i++) {
    c = str[i];

    switch (c) {
    case "\\":
    case "/":
    case "$":
    case "^":
    case "+":
    case ".":
    case "(":
    case ")":
    case "=":
    case "!":
    case "|":
      reStr += "\\" + c;
      break;

    case "?":
      if (extended) {
        reStr += ".";
	    break;
      }

    case "[":
    case "]":
      if (extended) {
        reStr += c;
	    break;
      }

    case "{":
      if (extended) {
        inGroup = true;
	    reStr += "(";
	    break;
      }

    case "}":
      if (extended) {
        inGroup = false;
	    reStr += ")";
	    break;
      }

    case ",":
      if (inGroup) {
        reStr += "|";
	    break;
      }
      reStr += "\\" + c;
      break;

    case "*":
      reStr += ".*";
      break;

    default:
      reStr += c;
    }
  }

  // When regexp 'g' flag is specified don't
  // constrain the regular expression with ^ & $
  if (!flags || !~flags.indexOf('g')) {
    reStr = "^" + reStr + "$";
  }

  return new RegExp(reStr, flags);
};

},{}],5:[function(require,module,exports){
/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

module.exports = function isExtendable(val) {
  return typeof val !== 'undefined' && val !== null
    && (typeof val === 'object' || typeof val === 'function');
};

},{}],6:[function(require,module,exports){
/* eslint-disable no-unused-vars */
'use strict';
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

module.exports = Object.assign || function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (Object.getOwnPropertySymbols) {
			symbols = Object.getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],7:[function(require,module,exports){
'use strict';

module.exports = require('./lib/routeur');

},{"./lib/routeur":8}],8:[function(require,module,exports){
/*!
 * @license routeur
 * (c) sugarshin
 * License: MIT
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _globToRegexp = require('glob-to-regexp');

var _globToRegexp2 = _interopRequireDefault(_globToRegexp);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _objectOmit = require('object.omit');

var _objectOmit2 = _interopRequireDefault(_objectOmit);

var _extRegex = require('ext-regex');

var _extRegex2 = _interopRequireDefault(_extRegex);

var _utilObjectForEach = require('./util/objectForEach');

var _utilObjectForEach2 = _interopRequireDefault(_utilObjectForEach);

var _utilIndexRegex = require('./util/indexRegex');

var _utilIndexRegex2 = _interopRequireDefault(_utilIndexRegex);

var Routeur = (function () {

  /**
   * constructor
   *
   * @param  {Object} routes
   */

  function Routeur() {
    var routes = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Routeur);

    this.routes = routes;
    this.config = {
      rootPath: ''
    };
  }

  /**
   * run
   *
   * @param  {String} currentPathName
   */

  _createClass(Routeur, [{
    key: 'run',
    value: function run() {
      var _this = this;

      var currentPathName = arguments.length <= 0 || arguments[0] === undefined ? location.pathname || '' : arguments[0];
      var rootPath = this.config.rootPath;

      (0, _utilObjectForEach2['default'])(this.routes, function (actionOrActions, pathName) {
        var globPath = _this._getGlobPath(rootPath, pathName);
        var regexp = (0, _globToRegexp2['default'])(globPath, { extended: true });

        if (regexp.test(currentPathName)) {
          if (typeof actionOrActions === 'function') {
            actionOrActions();
          } else if (Array.isArray(actionOrActions)) {
            actionOrActions.forEach(function (action) {
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
  }, {
    key: 'configure',
    value: function configure(config) {
      this.config = (0, _objectAssign2['default'])({}, this.config, config);
      return this;
    }

    /**
     * addRoute
     *
     * @param  {Object} route
     * @return {Router instance} this
     */
  }, {
    key: 'addRoute',
    value: function addRoute(route) {
      this.routes = (0, _objectAssign2['default'])({}, this.routes, route);
      return this;
    }

    /**
     * removeRoute
     *
     * @param  {String} pathName
     * @return {Router instance} this
     */
  }, {
    key: 'removeRoute',
    value: function removeRoute(pathName) {
      this.routes = (0, _objectOmit2['default'])(this.routes, pathName);
      return this;
    }

    /**
     * _getGlobPath
     *
     * @param  {String} rootPath
     * @param  {String} pathName
     * @return {String} glob
     */
  }, {
    key: '_getGlobPath',
    value: function _getGlobPath(rootPath, pathName) {
      if ((0, _extRegex2['default'])().test(pathName)) {
        return '' + rootPath + pathName;
      }

      if ((0, _utilIndexRegex2['default'])().test(pathName)) {
        return '' + rootPath + pathName + '{,index.html}';
      }

      return '' + rootPath + pathName + '{/,/index.html}';
    }
  }]);

  return Routeur;
})();

exports['default'] = Routeur;
module.exports = exports['default'];
},{"./util/indexRegex":9,"./util/objectForEach":10,"ext-regex":1,"glob-to-regexp":4,"object-assign":6,"object.omit":11}],9:[function(require,module,exports){
/**
 * indexRegex
 *
 * @return  {Regexp}
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = indexRegex;

function indexRegex() {
  return (/\/$/
  );
}

module.exports = exports['default'];
},{}],10:[function(require,module,exports){
(function (global){
/**
 * objectForEach
 *
 * @param  {Object} object
 * @param  {Function} callback
 * @param  {Any} context
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = objectForEach;

function objectForEach(object, callback) {
  var context = arguments.length <= 2 || arguments[2] === undefined ? global : arguments[2];

  console.log(context);
  Object.keys(object).forEach(function (key, i) {
    callback.call(context, object[key], key, i, object);
  });
}

module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],11:[function(require,module,exports){
/*!
 * object.omit <https://github.com/jonschlinkert/object.omit>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var isObject = require('is-extendable');
var forOwn = require('for-own');

module.exports = function omit(obj, keys) {
  if (!isObject(obj)) return {};

  var keys = [].concat.apply([], [].slice.call(arguments, 1));
  var last = keys[keys.length - 1];
  var res = {}, fn;

  if (typeof last === 'function') {
    fn = keys.pop();
  }

  var isFunction = typeof fn === 'function';
  if (!keys.length && !isFunction) {
    return obj;
  }

  forOwn(obj, function (value, key) {
    if (keys.indexOf(key) === -1) {

      if (!isFunction) {
        res[key] = value;
      } else if (fn(value, key, obj)) {
        res[key] = value;
      }
    }
  });
  return res;
};

},{"for-own":3,"is-extendable":5}],12:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _routeur = require('routeur');

var _routeur2 = _interopRequireDefault(_routeur);

var _indexAction = require('./indexAction');

var _indexAction2 = _interopRequireDefault(_indexAction);

var _pageAction = require('./pageAction');

var _pageAction2 = _interopRequireDefault(_pageAction);

var routes = _defineProperty({
  '/': _indexAction2['default'],
  '/page/': [function () {
    console.log('/page/');
  }, _pageAction2['default']],
  '/page2/index.html': [function () {
    console.log('/page2/index.html');
  }, _pageAction2['default']],
  '/page.html': [function () {
    console.log('/page.html');
  }, _pageAction2['default']]
}, '/page2.html', function page2Html() {
  console.log('/page2.html');
});

var router = new _routeur2['default'](routes);

router.run();

},{"./indexAction":13,"./pageAction":14,"routeur":7}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = indexAction;

function indexAction() {
  console.log('indexAction');
}

module.exports = exports['default'];

},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = pageAction;

function pageAction() {
  console.log('pageAction');
}

module.exports = exports['default'];

},{}]},{},[12])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZXh0LXJlZ2V4L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Zvci1pbi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9mb3Itb3duL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2dsb2ItdG8tcmVnZXhwL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2lzLWV4dGVuZGFibGUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvb2JqZWN0LWFzc2lnbi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yb3V0ZXVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JvdXRldXIvbGliL3JvdXRldXIuanMiLCJub2RlX21vZHVsZXMvcm91dGV1ci9saWIvdXRpbC9pbmRleFJlZ2V4LmpzIiwibm9kZV9tb2R1bGVzL3JvdXRldXIvbGliL3V0aWwvb2JqZWN0Rm9yRWFjaC5qcyIsIm5vZGVfbW9kdWxlcy9yb3V0ZXVyL25vZGVfbW9kdWxlcy9vYmplY3Qub21pdC9pbmRleC5qcyIsIi9Vc2Vycy9zaGluZ29zYXRvL3JlcG8vcm91dGV1ci9leGFtcGxlcy9zcmMvaW5kZXguanMiLCIvVXNlcnMvc2hpbmdvc2F0by9yZXBvL3JvdXRldXIvZXhhbXBsZXMvc3JjL2luZGV4QWN0aW9uLmpzIiwiL1VzZXJzL3NoaW5nb3NhdG8vcmVwby9yb3V0ZXVyL2V4YW1wbGVzL3NyYy9wYWdlQWN0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7dUJDeENtQixTQUFTOzs7OzJCQUVKLGVBQWU7Ozs7MEJBQ2hCLGNBQWM7Ozs7QUFFckMsSUFBTSxNQUFNO0FBQ1YsS0FBRywwQkFBYTtBQUNoQixVQUFRLEVBQUUsQ0FBQyxZQUFNO0FBQUMsV0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtHQUFDLDBCQUFhO0FBQ3JELHFCQUFtQixFQUFFLENBQUMsWUFBTTtBQUFDLFdBQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtHQUFDLDBCQUFhO0FBQzNFLGNBQVksRUFBRSxDQUFDLFlBQU07QUFBQyxXQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFBO0dBQUMsMEJBQWE7R0FDNUQsYUFBYSxFQUFDLHFCQUFHO0FBQ2hCLFNBQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7Q0FDNUIsQ0FDRixDQUFDOztBQUVGLElBQU0sTUFBTSxHQUFHLHlCQUFXLE1BQU0sQ0FBQyxDQUFDOztBQUVsQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7O3FCQ2pCVyxXQUFXOztBQUFwQixTQUFTLFdBQVcsR0FBRztBQUNwQyxTQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0NBQzVCOzs7Ozs7Ozs7O3FCQ0Z1QixVQUFVOztBQUFuQixTQUFTLFVBQVUsR0FBRztBQUNuQyxTQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0NBQzNCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIVxuICogZXh0LXJlZ2V4IDxodHRwczovL2dpdGh1Yi5jb20vcmVnZXhwcy9leHQtcmVnZXg+XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IEpvbiBTY2hsaW5rZXJ0LlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBleHRSZWdleCgpIHtcbiAgcmV0dXJuIC8oPz1cXC4pKFxcLihbXlxcXFxcXC8uXSopKSokLztcbn07XG4iLCIvKiFcbiAqIGZvci1pbiA8aHR0cHM6Ly9naXRodWIuY29tL2pvbnNjaGxpbmtlcnQvZm9yLWluPlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE1LCBKb24gU2NobGlua2VydC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZm9ySW4obywgZm4sIHRoaXNBcmcpIHtcbiAgZm9yICh2YXIga2V5IGluIG8pIHtcbiAgICBpZiAoZm4uY2FsbCh0aGlzQXJnLCBvW2tleV0sIGtleSwgbykgPT09IGZhbHNlKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbn07IiwiLyohXG4gKiBmb3Itb3duIDxodHRwczovL2dpdGh1Yi5jb20vam9uc2NobGlua2VydC9mb3Itb3duPlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE1LCBKb24gU2NobGlua2VydC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBmb3JJbiA9IHJlcXVpcmUoJ2Zvci1pbicpO1xudmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZm9yT3duKG8sIGZuLCB0aGlzQXJnKSB7XG4gIGZvckluKG8sIGZ1bmN0aW9uICh2YWwsIGtleSkge1xuICAgIGlmIChoYXNPd24uY2FsbChvLCBrZXkpKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGlzQXJnLCBvW2tleV0sIGtleSwgbyk7XG4gICAgfVxuICB9KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChnbG9iLCBvcHRzKSB7XG4gIGlmIChnbG9iID09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHZhciBzdHIgPSBTdHJpbmcoZ2xvYik7XG5cbiAgLy8gVGhlIHJlZ2V4cCB3ZSBhcmUgYnVpbGRpbmcsIGFzIGEgc3RyaW5nLlxuICB2YXIgcmVTdHIgPSBcIlwiO1xuXG4gIC8vIFdoZXRoZXIgd2UgYXJlIG1hdGNoaW5nIHNvIGNhbGxlZCBcImV4dGVuZGVkXCIgZ2xvYnMgKGxpa2UgYmFzaCkgYW5kIHNob3VsZFxuICAvLyBzdXBwb3J0IHNpbmdsZSBjaGFyYWN0ZXIgbWF0Y2hpbmcsIG1hdGNoaW5nIHJhbmdlcyBvZiBjaGFyYWN0ZXJzLCBncm91cFxuICAvLyBtYXRjaGluZywgZXRjLlxuICB2YXIgZXh0ZW5kZWQgPSBvcHRzID8gISFvcHRzLmV4dGVuZGVkIDogZmFsc2U7XG5cbiAgLy8gSWYgd2UgYXJlIGRvaW5nIGV4dGVuZGVkIG1hdGNoaW5nLCB0aGlzIGJvb2xlYW4gaXMgdHJ1ZSB3aGVuIHdlIGFyZSBpbnNpZGVcbiAgLy8gYSBncm91cCAoZWcgeyouaHRtbCwqLmpzfSksIGFuZCBmYWxzZSBvdGhlcndpc2UuXG4gIHZhciBpbkdyb3VwID0gZmFsc2U7XG4gIC8vIFJlZ0V4cCBmbGFncyAoZWcgXCJpXCIgKSB0byBwYXNzIGluIHRvIFJlZ0V4cCBjb25zdHJ1Y3Rvci5cbiAgdmFyIGZsYWdzID0gb3B0cyAmJiB0eXBlb2YoIG9wdHMuZmxhZ3MgKSA9PT0gXCJzdHJpbmdcIiA/IG9wdHMuZmxhZ3MgOiBcIlwiO1xuICB2YXIgYztcbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHN0ci5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGMgPSBzdHJbaV07XG5cbiAgICBzd2l0Y2ggKGMpIHtcbiAgICBjYXNlIFwiXFxcXFwiOlxuICAgIGNhc2UgXCIvXCI6XG4gICAgY2FzZSBcIiRcIjpcbiAgICBjYXNlIFwiXlwiOlxuICAgIGNhc2UgXCIrXCI6XG4gICAgY2FzZSBcIi5cIjpcbiAgICBjYXNlIFwiKFwiOlxuICAgIGNhc2UgXCIpXCI6XG4gICAgY2FzZSBcIj1cIjpcbiAgICBjYXNlIFwiIVwiOlxuICAgIGNhc2UgXCJ8XCI6XG4gICAgICByZVN0ciArPSBcIlxcXFxcIiArIGM7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgXCI/XCI6XG4gICAgICBpZiAoZXh0ZW5kZWQpIHtcbiAgICAgICAgcmVTdHIgKz0gXCIuXCI7XG5cdCAgICBicmVhaztcbiAgICAgIH1cblxuICAgIGNhc2UgXCJbXCI6XG4gICAgY2FzZSBcIl1cIjpcbiAgICAgIGlmIChleHRlbmRlZCkge1xuICAgICAgICByZVN0ciArPSBjO1xuXHQgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICBjYXNlIFwie1wiOlxuICAgICAgaWYgKGV4dGVuZGVkKSB7XG4gICAgICAgIGluR3JvdXAgPSB0cnVlO1xuXHQgICAgcmVTdHIgKz0gXCIoXCI7XG5cdCAgICBicmVhaztcbiAgICAgIH1cblxuICAgIGNhc2UgXCJ9XCI6XG4gICAgICBpZiAoZXh0ZW5kZWQpIHtcbiAgICAgICAgaW5Hcm91cCA9IGZhbHNlO1xuXHQgICAgcmVTdHIgKz0gXCIpXCI7XG5cdCAgICBicmVhaztcbiAgICAgIH1cblxuICAgIGNhc2UgXCIsXCI6XG4gICAgICBpZiAoaW5Hcm91cCkge1xuICAgICAgICByZVN0ciArPSBcInxcIjtcblx0ICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgcmVTdHIgKz0gXCJcXFxcXCIgKyBjO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIFwiKlwiOlxuICAgICAgcmVTdHIgKz0gXCIuKlwiO1xuICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmVTdHIgKz0gYztcbiAgICB9XG4gIH1cblxuICAvLyBXaGVuIHJlZ2V4cCAnZycgZmxhZyBpcyBzcGVjaWZpZWQgZG9uJ3RcbiAgLy8gY29uc3RyYWluIHRoZSByZWd1bGFyIGV4cHJlc3Npb24gd2l0aCBeICYgJFxuICBpZiAoIWZsYWdzIHx8ICF+ZmxhZ3MuaW5kZXhPZignZycpKSB7XG4gICAgcmVTdHIgPSBcIl5cIiArIHJlU3RyICsgXCIkXCI7XG4gIH1cblxuICByZXR1cm4gbmV3IFJlZ0V4cChyZVN0ciwgZmxhZ3MpO1xufTtcbiIsIi8qIVxuICogaXMtZXh0ZW5kYWJsZSA8aHR0cHM6Ly9naXRodWIuY29tL2pvbnNjaGxpbmtlcnQvaXMtZXh0ZW5kYWJsZT5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUsIEpvbiBTY2hsaW5rZXJ0LlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0V4dGVuZGFibGUodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJyAmJiB2YWwgIT09IG51bGxcbiAgICAmJiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJyk7XG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbid1c2Ugc3RyaWN0JztcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuXHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHR2YXIgZnJvbTtcblx0dmFyIHRvID0gdG9PYmplY3QodGFyZ2V0KTtcblx0dmFyIHN5bWJvbHM7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRmcm9tID0gT2JqZWN0KGFyZ3VtZW50c1tzXSk7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuXHRcdFx0XHR0b1trZXldID0gZnJvbVtrZXldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRzeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhmcm9tKTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3ltYm9scy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAocHJvcElzRW51bWVyYWJsZS5jYWxsKGZyb20sIHN5bWJvbHNbaV0pKSB7XG5cdFx0XHRcdFx0dG9bc3ltYm9sc1tpXV0gPSBmcm9tW3N5bWJvbHNbaV1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRvO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9yb3V0ZXVyJyk7XG4iLCIvKiFcbiAqIEBsaWNlbnNlIHJvdXRldXJcbiAqIChjKSBzdWdhcnNoaW5cbiAqIExpY2Vuc2U6IE1JVFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbnZhciBfZ2xvYlRvUmVnZXhwID0gcmVxdWlyZSgnZ2xvYi10by1yZWdleHAnKTtcblxudmFyIF9nbG9iVG9SZWdleHAyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2xvYlRvUmVnZXhwKTtcblxudmFyIF9vYmplY3RBc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBfb2JqZWN0QXNzaWduMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX29iamVjdEFzc2lnbik7XG5cbnZhciBfb2JqZWN0T21pdCA9IHJlcXVpcmUoJ29iamVjdC5vbWl0Jyk7XG5cbnZhciBfb2JqZWN0T21pdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9vYmplY3RPbWl0KTtcblxudmFyIF9leHRSZWdleCA9IHJlcXVpcmUoJ2V4dC1yZWdleCcpO1xuXG52YXIgX2V4dFJlZ2V4MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2V4dFJlZ2V4KTtcblxudmFyIF91dGlsT2JqZWN0Rm9yRWFjaCA9IHJlcXVpcmUoJy4vdXRpbC9vYmplY3RGb3JFYWNoJyk7XG5cbnZhciBfdXRpbE9iamVjdEZvckVhY2gyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXRpbE9iamVjdEZvckVhY2gpO1xuXG52YXIgX3V0aWxJbmRleFJlZ2V4ID0gcmVxdWlyZSgnLi91dGlsL2luZGV4UmVnZXgnKTtcblxudmFyIF91dGlsSW5kZXhSZWdleDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91dGlsSW5kZXhSZWdleCk7XG5cbnZhciBSb3V0ZXVyID0gKGZ1bmN0aW9uICgpIHtcblxuICAvKipcbiAgICogY29uc3RydWN0b3JcbiAgICpcbiAgICogQHBhcmFtICB7T2JqZWN0fSByb3V0ZXNcbiAgICovXG5cbiAgZnVuY3Rpb24gUm91dGV1cigpIHtcbiAgICB2YXIgcm91dGVzID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMF07XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUm91dGV1cik7XG5cbiAgICB0aGlzLnJvdXRlcyA9IHJvdXRlcztcbiAgICB0aGlzLmNvbmZpZyA9IHtcbiAgICAgIHJvb3RQYXRoOiAnJ1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogcnVuXG4gICAqXG4gICAqIEBwYXJhbSAge1N0cmluZ30gY3VycmVudFBhdGhOYW1lXG4gICAqL1xuXG4gIF9jcmVhdGVDbGFzcyhSb3V0ZXVyLCBbe1xuICAgIGtleTogJ3J1bicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJ1bigpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHZhciBjdXJyZW50UGF0aE5hbWUgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyBsb2NhdGlvbi5wYXRobmFtZSB8fCAnJyA6IGFyZ3VtZW50c1swXTtcbiAgICAgIHZhciByb290UGF0aCA9IHRoaXMuY29uZmlnLnJvb3RQYXRoO1xuXG4gICAgICAoMCwgX3V0aWxPYmplY3RGb3JFYWNoMlsnZGVmYXVsdCddKSh0aGlzLnJvdXRlcywgZnVuY3Rpb24gKGFjdGlvbk9yQWN0aW9ucywgcGF0aE5hbWUpIHtcbiAgICAgICAgdmFyIGdsb2JQYXRoID0gX3RoaXMuX2dldEdsb2JQYXRoKHJvb3RQYXRoLCBwYXRoTmFtZSk7XG4gICAgICAgIHZhciByZWdleHAgPSAoMCwgX2dsb2JUb1JlZ2V4cDJbJ2RlZmF1bHQnXSkoZ2xvYlBhdGgsIHsgZXh0ZW5kZWQ6IHRydWUgfSk7XG5cbiAgICAgICAgaWYgKHJlZ2V4cC50ZXN0KGN1cnJlbnRQYXRoTmFtZSkpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGFjdGlvbk9yQWN0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgYWN0aW9uT3JBY3Rpb25zKCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFjdGlvbk9yQWN0aW9ucykpIHtcbiAgICAgICAgICAgIGFjdGlvbk9yQWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgICAgICAgICAgYWN0aW9uKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNvbmZpZ3VyZVxuICAgICAqXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBjb25maWdcbiAgICAgKiBAcmV0dXJuIHtSb3V0ZXIgaW5zdGFuY2V9IHRoaXNcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogJ2NvbmZpZ3VyZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbmZpZ3VyZShjb25maWcpIHtcbiAgICAgIHRoaXMuY29uZmlnID0gKDAsIF9vYmplY3RBc3NpZ24yWydkZWZhdWx0J10pKHt9LCB0aGlzLmNvbmZpZywgY29uZmlnKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGFkZFJvdXRlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IHJvdXRlXG4gICAgICogQHJldHVybiB7Um91dGVyIGluc3RhbmNlfSB0aGlzXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6ICdhZGRSb3V0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFkZFJvdXRlKHJvdXRlKSB7XG4gICAgICB0aGlzLnJvdXRlcyA9ICgwLCBfb2JqZWN0QXNzaWduMlsnZGVmYXVsdCddKSh7fSwgdGhpcy5yb3V0ZXMsIHJvdXRlKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlbW92ZVJvdXRlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IHBhdGhOYW1lXG4gICAgICogQHJldHVybiB7Um91dGVyIGluc3RhbmNlfSB0aGlzXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6ICdyZW1vdmVSb3V0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbW92ZVJvdXRlKHBhdGhOYW1lKSB7XG4gICAgICB0aGlzLnJvdXRlcyA9ICgwLCBfb2JqZWN0T21pdDJbJ2RlZmF1bHQnXSkodGhpcy5yb3V0ZXMsIHBhdGhOYW1lKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIF9nZXRHbG9iUGF0aFxuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSByb290UGF0aFxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gcGF0aE5hbWVcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IGdsb2JcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogJ19nZXRHbG9iUGF0aCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9nZXRHbG9iUGF0aChyb290UGF0aCwgcGF0aE5hbWUpIHtcbiAgICAgIGlmICgoMCwgX2V4dFJlZ2V4MlsnZGVmYXVsdCddKSgpLnRlc3QocGF0aE5hbWUpKSB7XG4gICAgICAgIHJldHVybiAnJyArIHJvb3RQYXRoICsgcGF0aE5hbWU7XG4gICAgICB9XG5cbiAgICAgIGlmICgoMCwgX3V0aWxJbmRleFJlZ2V4MlsnZGVmYXVsdCddKSgpLnRlc3QocGF0aE5hbWUpKSB7XG4gICAgICAgIHJldHVybiAnJyArIHJvb3RQYXRoICsgcGF0aE5hbWUgKyAneyxpbmRleC5odG1sfSc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAnJyArIHJvb3RQYXRoICsgcGF0aE5hbWUgKyAney8sL2luZGV4Lmh0bWx9JztcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gUm91dGV1cjtcbn0pKCk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IFJvdXRldXI7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIvKipcbiAqIGluZGV4UmVnZXhcbiAqXG4gKiBAcmV0dXJuICB7UmVnZXhwfVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzWydkZWZhdWx0J10gPSBpbmRleFJlZ2V4O1xuXG5mdW5jdGlvbiBpbmRleFJlZ2V4KCkge1xuICByZXR1cm4gKC9cXC8kL1xuICApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIvKipcbiAqIG9iamVjdEZvckVhY2hcbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IG9iamVjdFxuICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcGFyYW0gIHtBbnl9IGNvbnRleHRcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1snZGVmYXVsdCddID0gb2JqZWN0Rm9yRWFjaDtcblxuZnVuY3Rpb24gb2JqZWN0Rm9yRWFjaChvYmplY3QsIGNhbGxiYWNrKSB7XG4gIHZhciBjb250ZXh0ID0gYXJndW1lbnRzLmxlbmd0aCA8PSAyIHx8IGFyZ3VtZW50c1syXSA9PT0gdW5kZWZpbmVkID8gZ2xvYmFsIDogYXJndW1lbnRzWzJdO1xuXG4gIGNvbnNvbGUubG9nKGNvbnRleHQpO1xuICBPYmplY3Qua2V5cyhvYmplY3QpLmZvckVhY2goZnVuY3Rpb24gKGtleSwgaSkge1xuICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwgb2JqZWN0W2tleV0sIGtleSwgaSwgb2JqZWN0KTtcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIi8qIVxuICogb2JqZWN0Lm9taXQgPGh0dHBzOi8vZ2l0aHViLmNvbS9qb25zY2hsaW5rZXJ0L29iamVjdC5vbWl0PlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE1LCBKb24gU2NobGlua2VydC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJ2lzLWV4dGVuZGFibGUnKTtcbnZhciBmb3JPd24gPSByZXF1aXJlKCdmb3Itb3duJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gb21pdChvYmosIGtleXMpIHtcbiAgaWYgKCFpc09iamVjdChvYmopKSByZXR1cm4ge307XG5cbiAgdmFyIGtleXMgPSBbXS5jb25jYXQuYXBwbHkoW10sIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gIHZhciBsYXN0ID0ga2V5c1trZXlzLmxlbmd0aCAtIDFdO1xuICB2YXIgcmVzID0ge30sIGZuO1xuXG4gIGlmICh0eXBlb2YgbGFzdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGZuID0ga2V5cy5wb3AoKTtcbiAgfVxuXG4gIHZhciBpc0Z1bmN0aW9uID0gdHlwZW9mIGZuID09PSAnZnVuY3Rpb24nO1xuICBpZiAoIWtleXMubGVuZ3RoICYmICFpc0Z1bmN0aW9uKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIGZvck93bihvYmosIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgaWYgKGtleXMuaW5kZXhPZihrZXkpID09PSAtMSkge1xuXG4gICAgICBpZiAoIWlzRnVuY3Rpb24pIHtcbiAgICAgICAgcmVzW2tleV0gPSB2YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoZm4odmFsdWUsIGtleSwgb2JqKSkge1xuICAgICAgICByZXNba2V5XSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIHJldHVybiByZXM7XG59O1xuIiwiaW1wb3J0IFJvdXRlciBmcm9tICdyb3V0ZXVyJztcblxuaW1wb3J0IGluZGV4QWN0aW9uIGZyb20gJy4vaW5kZXhBY3Rpb24nO1xuaW1wb3J0IHBhZ2VBY3Rpb24gZnJvbSAnLi9wYWdlQWN0aW9uJztcblxuY29uc3Qgcm91dGVzID0ge1xuICAnLyc6IGluZGV4QWN0aW9uLFxuICAnL3BhZ2UvJzogWygpID0+IHtjb25zb2xlLmxvZygnL3BhZ2UvJyl9LCBwYWdlQWN0aW9uXSxcbiAgJy9wYWdlMi9pbmRleC5odG1sJzogWygpID0+IHtjb25zb2xlLmxvZygnL3BhZ2UyL2luZGV4Lmh0bWwnKX0sIHBhZ2VBY3Rpb25dLFxuICAnL3BhZ2UuaHRtbCc6IFsoKSA9PiB7Y29uc29sZS5sb2coJy9wYWdlLmh0bWwnKX0sIHBhZ2VBY3Rpb25dLFxuICBbJy9wYWdlMi5odG1sJ10oKSB7XG4gICAgY29uc29sZS5sb2coJy9wYWdlMi5odG1sJyk7XG4gIH1cbn07XG5cbmNvbnN0IHJvdXRlciA9IG5ldyBSb3V0ZXIocm91dGVzKTtcblxucm91dGVyLnJ1bigpO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5kZXhBY3Rpb24oKSB7XG4gIGNvbnNvbGUubG9nKCdpbmRleEFjdGlvbicpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFnZUFjdGlvbigpIHtcbiAgY29uc29sZS5sb2coJ3BhZ2VBY3Rpb24nKTtcbn1cbiJdfQ==
