(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;
},{}],2:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var emptyObject = {};

if (process.env.NODE_ENV !== 'production') {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;
}).call(this,require('_process'))
},{"_process":47}],3:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

function invariant(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
}).call(this,require('_process'))
},{"_process":47}],4:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks static-only
 */

'use strict';

var invariant = require('./invariant');

/**
 * Constructs an enumeration with keys equal to their value.
 *
 * For example:
 *
 *   var COLORS = keyMirror({blue: null, red: null});
 *   var myColor = COLORS.blue;
 *   var isColorValid = !!COLORS[myColor];
 *
 * The last line could not be performed if the values of the generated enum were
 * not equal to their keys.
 *
 *   Input:  {key1: val1, key2: val2}
 *   Output: {key1: key1, key2: key2}
 *
 * @param {object} obj
 * @return {object}
 */
var keyMirror = function keyMirror(obj) {
  var ret = {};
  var key;
  !(obj instanceof Object && !Array.isArray(obj)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'keyMirror(...): Argument must be an object.') : invariant(false) : void 0;
  for (key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }
    ret[key] = key;
  }
  return ret;
};

module.exports = keyMirror;
}).call(this,require('_process'))
},{"./invariant":3,"_process":47}],5:[function(require,module,exports){
"use strict";

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

/**
 * Allows extraction of a minified key. Let's the build system minify keys
 * without losing the ability to dynamically use key strings as values
 * themselves. Pass in an object with a single key/val pair and it will return
 * you the string key of that single record. Suppose you want to grab the
 * value for a key 'className' inside of an object. Key/val minification may
 * have aliased that key to be 'xa12'. keyOf({className: null}) will return
 * 'xa12' in that case. Resolve keys you want to use once at startup time, then
 * reuse those resolutions.
 */
var keyOf = function keyOf(oneKeyObj) {
  var key;
  for (key in oneKeyObj) {
    if (!oneKeyObj.hasOwnProperty(key)) {
      continue;
    }
    return key;
  }
  return null;
};

module.exports = keyOf;
},{}],6:[function(require,module,exports){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Executes the provided `callback` once for each enumerable own property in the
 * object and constructs a new object from the results. The `callback` is
 * invoked with three arguments:
 *
 *  - the property value
 *  - the property name
 *  - the object being traversed
 *
 * Properties that are added after the call to `mapObject` will not be visited
 * by `callback`. If the values of existing properties are changed, the value
 * passed to `callback` will be the value at the time `mapObject` visits them.
 * Properties that are deleted before being visited are not visited.
 *
 * @grep function objectMap()
 * @grep function objMap()
 *
 * @param {?object} object
 * @param {function} callback
 * @param {*} context
 * @return {?object}
 */
function mapObject(object, callback, context) {
  if (!object) {
    return null;
  }
  var result = {};
  for (var name in object) {
    if (hasOwnProperty.call(object, name)) {
      result[name] = callback.call(context, object[name], name, object);
    }
  }
  return result;
}

module.exports = mapObject;
},{}],7:[function(require,module,exports){
(function (process){
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var emptyFunction = require('./emptyFunction');

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  warning = function warning(condition, format) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    }
  };
}

module.exports = warning;
}).call(this,require('_process'))
},{"./emptyFunction":1,"_process":47}],8:[function(require,module,exports){
'use strict';
/* eslint-disable no-unused-vars */
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (e) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
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

},{}],9:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule KeyEscapeUtils
 * 
 */

'use strict';

/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */

function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });

  return '$' + escapedString;
}

/**
 * Unescape and unwrap key for human-readable display
 *
 * @param {string} key to unescape.
 * @return {string} the unescaped key.
 */
function unescape(key) {
  var unescapeRegex = /(=0|=2)/g;
  var unescaperLookup = {
    '=0': '=',
    '=2': ':'
  };
  var keySubstring = key[0] === '.' && key[1] === '$' ? key.substring(2) : key.substring(1);

  return ('' + keySubstring).replace(unescapeRegex, function (match) {
    return unescaperLookup[match];
  });
}

var KeyEscapeUtils = {
  escape: escape,
  unescape: unescape
};

module.exports = KeyEscapeUtils;
},{}],10:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule PooledClass
 */

'use strict';

var _prodInvariant = require('./reactProdInvariant');

var invariant = require('fbjs/lib/invariant');

/**
 * Static poolers. Several custom versions for each potential number of
 * arguments. A completely generic pooler is easy to implement, but would
 * require accessing the `arguments` object. In each of these, `this` refers to
 * the Class itself, not an instance. If any others are needed, simply add them
 * here, or in their own files.
 */
var oneArgumentPooler = function (copyFieldsFrom) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, copyFieldsFrom);
    return instance;
  } else {
    return new Klass(copyFieldsFrom);
  }
};

var twoArgumentPooler = function (a1, a2) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2);
    return instance;
  } else {
    return new Klass(a1, a2);
  }
};

var threeArgumentPooler = function (a1, a2, a3) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3);
    return instance;
  } else {
    return new Klass(a1, a2, a3);
  }
};

var fourArgumentPooler = function (a1, a2, a3, a4) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3, a4);
    return instance;
  } else {
    return new Klass(a1, a2, a3, a4);
  }
};

var fiveArgumentPooler = function (a1, a2, a3, a4, a5) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3, a4, a5);
    return instance;
  } else {
    return new Klass(a1, a2, a3, a4, a5);
  }
};

var standardReleaser = function (instance) {
  var Klass = this;
  !(instance instanceof Klass) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Trying to release an instance into a pool of a different type.') : _prodInvariant('25') : void 0;
  instance.destructor();
  if (Klass.instancePool.length < Klass.poolSize) {
    Klass.instancePool.push(instance);
  }
};

var DEFAULT_POOL_SIZE = 10;
var DEFAULT_POOLER = oneArgumentPooler;

/**
 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
 * itself (statically) not adding any prototypical fields. Any CopyConstructor
 * you give this may have a `poolSize` property, and will look for a
 * prototypical `destructor` on instances.
 *
 * @param {Function} CopyConstructor Constructor that can be used to reset.
 * @param {Function} pooler Customizable pooler.
 */
var addPoolingTo = function (CopyConstructor, pooler) {
  var NewKlass = CopyConstructor;
  NewKlass.instancePool = [];
  NewKlass.getPooled = pooler || DEFAULT_POOLER;
  if (!NewKlass.poolSize) {
    NewKlass.poolSize = DEFAULT_POOL_SIZE;
  }
  NewKlass.release = standardReleaser;
  return NewKlass;
};

var PooledClass = {
  addPoolingTo: addPoolingTo,
  oneArgumentPooler: oneArgumentPooler,
  twoArgumentPooler: twoArgumentPooler,
  threeArgumentPooler: threeArgumentPooler,
  fourArgumentPooler: fourArgumentPooler,
  fiveArgumentPooler: fiveArgumentPooler
};

module.exports = PooledClass;
}).call(this,require('_process'))
},{"./reactProdInvariant":29,"_process":47,"fbjs/lib/invariant":3}],11:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule React
 */

'use strict';

var _assign = require('object-assign');

var ReactChildren = require('./ReactChildren');
var ReactComponent = require('./ReactComponent');
var ReactClass = require('./ReactClass');
var ReactDOMFactories = require('./ReactDOMFactories');
var ReactElement = require('./ReactElement');
var ReactPropTypes = require('./ReactPropTypes');
var ReactVersion = require('./ReactVersion');

var onlyChild = require('./onlyChild');
var warning = require('fbjs/lib/warning');

var createElement = ReactElement.createElement;
var createFactory = ReactElement.createFactory;
var cloneElement = ReactElement.cloneElement;

if (process.env.NODE_ENV !== 'production') {
  var ReactElementValidator = require('./ReactElementValidator');
  createElement = ReactElementValidator.createElement;
  createFactory = ReactElementValidator.createFactory;
  cloneElement = ReactElementValidator.cloneElement;
}

var __spread = _assign;

if (process.env.NODE_ENV !== 'production') {
  var warned = false;
  __spread = function () {
    process.env.NODE_ENV !== 'production' ? warning(warned, 'React.__spread is deprecated and should not be used. Use ' + 'Object.assign directly or another helper function with similar ' + 'semantics. You may be seeing this warning due to your compiler. ' + 'See https://fb.me/react-spread-deprecation for more details.') : void 0;
    warned = true;
    return _assign.apply(null, arguments);
  };
}

var React = {

  // Modern

  Children: {
    map: ReactChildren.map,
    forEach: ReactChildren.forEach,
    count: ReactChildren.count,
    toArray: ReactChildren.toArray,
    only: onlyChild
  },

  Component: ReactComponent,

  createElement: createElement,
  cloneElement: cloneElement,
  isValidElement: ReactElement.isValidElement,

  // Classic

  PropTypes: ReactPropTypes,
  createClass: ReactClass.createClass,
  createFactory: createFactory,
  createMixin: function (mixin) {
    // Currently a noop. Will be used to validate and trace mixins.
    return mixin;
  },

  // This looks DOM specific but these are actually isomorphic helpers
  // since they are just generating DOM strings.
  DOM: ReactDOMFactories,

  version: ReactVersion,

  // Deprecated hook for JSX spread, don't use this for anything.
  __spread: __spread
};

module.exports = React;
}).call(this,require('_process'))
},{"./ReactChildren":12,"./ReactClass":13,"./ReactComponent":14,"./ReactDOMFactories":17,"./ReactElement":18,"./ReactElementValidator":19,"./ReactPropTypes":23,"./ReactVersion":24,"./onlyChild":28,"_process":47,"fbjs/lib/warning":7,"object-assign":8}],12:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactChildren
 */

'use strict';

var PooledClass = require('./PooledClass');
var ReactElement = require('./ReactElement');

var emptyFunction = require('fbjs/lib/emptyFunction');
var traverseAllChildren = require('./traverseAllChildren');

var twoArgumentPooler = PooledClass.twoArgumentPooler;
var fourArgumentPooler = PooledClass.fourArgumentPooler;

var userProvidedKeyEscapeRegex = /\/+/g;
function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * traversal. Allows avoiding binding callbacks.
 *
 * @constructor ForEachBookKeeping
 * @param {!function} forEachFunction Function to perform traversal with.
 * @param {?*} forEachContext Context to perform context with.
 */
function ForEachBookKeeping(forEachFunction, forEachContext) {
  this.func = forEachFunction;
  this.context = forEachContext;
  this.count = 0;
}
ForEachBookKeeping.prototype.destructor = function () {
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func;
  var context = bookKeeping.context;

  func.call(context, child, bookKeeping.count++);
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.foreach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  ForEachBookKeeping.release(traverseContext);
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * mapping. Allows avoiding binding callbacks.
 *
 * @constructor MapBookKeeping
 * @param {!*} mapResult Object containing the ordered map of results.
 * @param {!function} mapFunction Function to perform mapping with.
 * @param {?*} mapContext Context to perform mapping with.
 */
function MapBookKeeping(mapResult, keyPrefix, mapFunction, mapContext) {
  this.result = mapResult;
  this.keyPrefix = keyPrefix;
  this.func = mapFunction;
  this.context = mapContext;
  this.count = 0;
}
MapBookKeeping.prototype.destructor = function () {
  this.result = null;
  this.keyPrefix = null;
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass.addPoolingTo(MapBookKeeping, fourArgumentPooler);

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result;
  var keyPrefix = bookKeeping.keyPrefix;
  var func = bookKeeping.func;
  var context = bookKeeping.context;


  var mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
  } else if (mappedChild != null) {
    if (ReactElement.isValidElement(mappedChild)) {
      mappedChild = ReactElement.cloneAndReplaceKey(mappedChild,
      // Keep both the (mapped) and old keys if they differ, just as
      // traverseAllChildren used to do for objects as children
      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
    }
    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }
  var traverseContext = MapBookKeeping.getPooled(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  MapBookKeeping.release(traverseContext);
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.map
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}

function forEachSingleChildDummy(traverseContext, child, name) {
  return null;
}

/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.count
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */
function countChildren(children, context) {
  return traverseAllChildren(children, forEachSingleChildDummy, null);
}

/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.toarray
 */
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
  return result;
}

var ReactChildren = {
  forEach: forEachChildren,
  map: mapChildren,
  mapIntoWithKeyPrefixInternal: mapIntoWithKeyPrefixInternal,
  count: countChildren,
  toArray: toArray
};

module.exports = ReactChildren;
},{"./PooledClass":10,"./ReactElement":18,"./traverseAllChildren":30,"fbjs/lib/emptyFunction":1}],13:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactClass
 */

'use strict';

var _prodInvariant = require('./reactProdInvariant'),
    _assign = require('object-assign');

var ReactComponent = require('./ReactComponent');
var ReactElement = require('./ReactElement');
var ReactPropTypeLocations = require('./ReactPropTypeLocations');
var ReactPropTypeLocationNames = require('./ReactPropTypeLocationNames');
var ReactNoopUpdateQueue = require('./ReactNoopUpdateQueue');

var emptyObject = require('fbjs/lib/emptyObject');
var invariant = require('fbjs/lib/invariant');
var keyMirror = require('fbjs/lib/keyMirror');
var keyOf = require('fbjs/lib/keyOf');
var warning = require('fbjs/lib/warning');

var MIXINS_KEY = keyOf({ mixins: null });

/**
 * Policies that describe methods in `ReactClassInterface`.
 */
var SpecPolicy = keyMirror({
  /**
   * These methods may be defined only once by the class specification or mixin.
   */
  DEFINE_ONCE: null,
  /**
   * These methods may be defined by both the class specification and mixins.
   * Subsequent definitions will be chained. These methods must return void.
   */
  DEFINE_MANY: null,
  /**
   * These methods are overriding the base class.
   */
  OVERRIDE_BASE: null,
  /**
   * These methods are similar to DEFINE_MANY, except we assume they return
   * objects. We try to merge the keys of the return values of all the mixed in
   * functions. If there is a key conflict we throw.
   */
  DEFINE_MANY_MERGED: null
});

var injectedMixins = [];

/**
 * Composite components are higher-level components that compose other composite
 * or host components.
 *
 * To create a new type of `ReactClass`, pass a specification of
 * your new class to `React.createClass`. The only requirement of your class
 * specification is that you implement a `render` method.
 *
 *   var MyComponent = React.createClass({
 *     render: function() {
 *       return <div>Hello World</div>;
 *     }
 *   });
 *
 * The class specification supports a specific protocol of methods that have
 * special meaning (e.g. `render`). See `ReactClassInterface` for
 * more the comprehensive protocol. Any other properties and methods in the
 * class specification will be available on the prototype.
 *
 * @interface ReactClassInterface
 * @internal
 */
var ReactClassInterface = {

  /**
   * An array of Mixin objects to include when defining your component.
   *
   * @type {array}
   * @optional
   */
  mixins: SpecPolicy.DEFINE_MANY,

  /**
   * An object containing properties and methods that should be defined on
   * the component's constructor instead of its prototype (static methods).
   *
   * @type {object}
   * @optional
   */
  statics: SpecPolicy.DEFINE_MANY,

  /**
   * Definition of prop types for this component.
   *
   * @type {object}
   * @optional
   */
  propTypes: SpecPolicy.DEFINE_MANY,

  /**
   * Definition of context types for this component.
   *
   * @type {object}
   * @optional
   */
  contextTypes: SpecPolicy.DEFINE_MANY,

  /**
   * Definition of context types this component sets for its children.
   *
   * @type {object}
   * @optional
   */
  childContextTypes: SpecPolicy.DEFINE_MANY,

  // ==== Definition methods ====

  /**
   * Invoked when the component is mounted. Values in the mapping will be set on
   * `this.props` if that prop is not specified (i.e. using an `in` check).
   *
   * This method is invoked before `getInitialState` and therefore cannot rely
   * on `this.state` or use `this.setState`.
   *
   * @return {object}
   * @optional
   */
  getDefaultProps: SpecPolicy.DEFINE_MANY_MERGED,

  /**
   * Invoked once before the component is mounted. The return value will be used
   * as the initial value of `this.state`.
   *
   *   getInitialState: function() {
   *     return {
   *       isOn: false,
   *       fooBaz: new BazFoo()
   *     }
   *   }
   *
   * @return {object}
   * @optional
   */
  getInitialState: SpecPolicy.DEFINE_MANY_MERGED,

  /**
   * @return {object}
   * @optional
   */
  getChildContext: SpecPolicy.DEFINE_MANY_MERGED,

  /**
   * Uses props from `this.props` and state from `this.state` to render the
   * structure of the component.
   *
   * No guarantees are made about when or how often this method is invoked, so
   * it must not have side effects.
   *
   *   render: function() {
   *     var name = this.props.name;
   *     return <div>Hello, {name}!</div>;
   *   }
   *
   * @return {ReactComponent}
   * @nosideeffects
   * @required
   */
  render: SpecPolicy.DEFINE_ONCE,

  // ==== Delegate methods ====

  /**
   * Invoked when the component is initially created and about to be mounted.
   * This may have side effects, but any external subscriptions or data created
   * by this method must be cleaned up in `componentWillUnmount`.
   *
   * @optional
   */
  componentWillMount: SpecPolicy.DEFINE_MANY,

  /**
   * Invoked when the component has been mounted and has a DOM representation.
   * However, there is no guarantee that the DOM node is in the document.
   *
   * Use this as an opportunity to operate on the DOM when the component has
   * been mounted (initialized and rendered) for the first time.
   *
   * @param {DOMElement} rootNode DOM element representing the component.
   * @optional
   */
  componentDidMount: SpecPolicy.DEFINE_MANY,

  /**
   * Invoked before the component receives new props.
   *
   * Use this as an opportunity to react to a prop transition by updating the
   * state using `this.setState`. Current props are accessed via `this.props`.
   *
   *   componentWillReceiveProps: function(nextProps, nextContext) {
   *     this.setState({
   *       likesIncreasing: nextProps.likeCount > this.props.likeCount
   *     });
   *   }
   *
   * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
   * transition may cause a state change, but the opposite is not true. If you
   * need it, you are probably looking for `componentWillUpdate`.
   *
   * @param {object} nextProps
   * @optional
   */
  componentWillReceiveProps: SpecPolicy.DEFINE_MANY,

  /**
   * Invoked while deciding if the component should be updated as a result of
   * receiving new props, state and/or context.
   *
   * Use this as an opportunity to `return false` when you're certain that the
   * transition to the new props/state/context will not require a component
   * update.
   *
   *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
   *     return !equal(nextProps, this.props) ||
   *       !equal(nextState, this.state) ||
   *       !equal(nextContext, this.context);
   *   }
   *
   * @param {object} nextProps
   * @param {?object} nextState
   * @param {?object} nextContext
   * @return {boolean} True if the component should update.
   * @optional
   */
  shouldComponentUpdate: SpecPolicy.DEFINE_ONCE,

  /**
   * Invoked when the component is about to update due to a transition from
   * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
   * and `nextContext`.
   *
   * Use this as an opportunity to perform preparation before an update occurs.
   *
   * NOTE: You **cannot** use `this.setState()` in this method.
   *
   * @param {object} nextProps
   * @param {?object} nextState
   * @param {?object} nextContext
   * @param {ReactReconcileTransaction} transaction
   * @optional
   */
  componentWillUpdate: SpecPolicy.DEFINE_MANY,

  /**
   * Invoked when the component's DOM representation has been updated.
   *
   * Use this as an opportunity to operate on the DOM when the component has
   * been updated.
   *
   * @param {object} prevProps
   * @param {?object} prevState
   * @param {?object} prevContext
   * @param {DOMElement} rootNode DOM element representing the component.
   * @optional
   */
  componentDidUpdate: SpecPolicy.DEFINE_MANY,

  /**
   * Invoked when the component is about to be removed from its parent and have
   * its DOM representation destroyed.
   *
   * Use this as an opportunity to deallocate any external resources.
   *
   * NOTE: There is no `componentDidUnmount` since your component will have been
   * destroyed by that point.
   *
   * @optional
   */
  componentWillUnmount: SpecPolicy.DEFINE_MANY,

  // ==== Advanced methods ====

  /**
   * Updates the component's currently mounted DOM representation.
   *
   * By default, this implements React's rendering and reconciliation algorithm.
   * Sophisticated clients may wish to override this.
   *
   * @param {ReactReconcileTransaction} transaction
   * @internal
   * @overridable
   */
  updateComponent: SpecPolicy.OVERRIDE_BASE

};

/**
 * Mapping from class specification keys to special processing functions.
 *
 * Although these are declared like instance properties in the specification
 * when defining classes using `React.createClass`, they are actually static
 * and are accessible on the constructor instead of the prototype. Despite
 * being static, they must be defined outside of the "statics" key under
 * which all other static methods are defined.
 */
var RESERVED_SPEC_KEYS = {
  displayName: function (Constructor, displayName) {
    Constructor.displayName = displayName;
  },
  mixins: function (Constructor, mixins) {
    if (mixins) {
      for (var i = 0; i < mixins.length; i++) {
        mixSpecIntoComponent(Constructor, mixins[i]);
      }
    }
  },
  childContextTypes: function (Constructor, childContextTypes) {
    if (process.env.NODE_ENV !== 'production') {
      validateTypeDef(Constructor, childContextTypes, ReactPropTypeLocations.childContext);
    }
    Constructor.childContextTypes = _assign({}, Constructor.childContextTypes, childContextTypes);
  },
  contextTypes: function (Constructor, contextTypes) {
    if (process.env.NODE_ENV !== 'production') {
      validateTypeDef(Constructor, contextTypes, ReactPropTypeLocations.context);
    }
    Constructor.contextTypes = _assign({}, Constructor.contextTypes, contextTypes);
  },
  /**
   * Special case getDefaultProps which should move into statics but requires
   * automatic merging.
   */
  getDefaultProps: function (Constructor, getDefaultProps) {
    if (Constructor.getDefaultProps) {
      Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, getDefaultProps);
    } else {
      Constructor.getDefaultProps = getDefaultProps;
    }
  },
  propTypes: function (Constructor, propTypes) {
    if (process.env.NODE_ENV !== 'production') {
      validateTypeDef(Constructor, propTypes, ReactPropTypeLocations.prop);
    }
    Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
  },
  statics: function (Constructor, statics) {
    mixStaticSpecIntoComponent(Constructor, statics);
  },
  autobind: function () {} };

// noop
function validateTypeDef(Constructor, typeDef, location) {
  for (var propName in typeDef) {
    if (typeDef.hasOwnProperty(propName)) {
      // use a warning instead of an invariant so components
      // don't show up in prod but only in __DEV__
      process.env.NODE_ENV !== 'production' ? warning(typeof typeDef[propName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', Constructor.displayName || 'ReactClass', ReactPropTypeLocationNames[location], propName) : void 0;
    }
  }
}

function validateMethodOverride(isAlreadyDefined, name) {
  var specPolicy = ReactClassInterface.hasOwnProperty(name) ? ReactClassInterface[name] : null;

  // Disallow overriding of base class methods unless explicitly allowed.
  if (ReactClassMixin.hasOwnProperty(name)) {
    !(specPolicy === SpecPolicy.OVERRIDE_BASE) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to override `%s` from your class specification. Ensure that your method names do not overlap with React methods.', name) : _prodInvariant('73', name) : void 0;
  }

  // Disallow defining methods more than once unless explicitly allowed.
  if (isAlreadyDefined) {
    !(specPolicy === SpecPolicy.DEFINE_MANY || specPolicy === SpecPolicy.DEFINE_MANY_MERGED) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.', name) : _prodInvariant('74', name) : void 0;
  }
}

/**
 * Mixin helper which handles policy validation and reserved
 * specification keys when building React classes.
 */
function mixSpecIntoComponent(Constructor, spec) {
  if (!spec) {
    return;
  }

  !(typeof spec !== 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to use a component class or function as a mixin. Instead, just use a regular object.') : _prodInvariant('75') : void 0;
  !!ReactElement.isValidElement(spec) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to use a component as a mixin. Instead, just use a regular object.') : _prodInvariant('76') : void 0;

  var proto = Constructor.prototype;
  var autoBindPairs = proto.__reactAutoBindPairs;

  // By handling mixins before any other properties, we ensure the same
  // chaining order is applied to methods with DEFINE_MANY policy, whether
  // mixins are listed before or after these methods in the spec.
  if (spec.hasOwnProperty(MIXINS_KEY)) {
    RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
  }

  for (var name in spec) {
    if (!spec.hasOwnProperty(name)) {
      continue;
    }

    if (name === MIXINS_KEY) {
      // We have already handled mixins in a special case above.
      continue;
    }

    var property = spec[name];
    var isAlreadyDefined = proto.hasOwnProperty(name);
    validateMethodOverride(isAlreadyDefined, name);

    if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
      RESERVED_SPEC_KEYS[name](Constructor, property);
    } else {
      // Setup methods on prototype:
      // The following member methods should not be automatically bound:
      // 1. Expected ReactClass methods (in the "interface").
      // 2. Overridden methods (that were mixed in).
      var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
      var isFunction = typeof property === 'function';
      var shouldAutoBind = isFunction && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;

      if (shouldAutoBind) {
        autoBindPairs.push(name, property);
        proto[name] = property;
      } else {
        if (isAlreadyDefined) {
          var specPolicy = ReactClassInterface[name];

          // These cases should already be caught by validateMethodOverride.
          !(isReactClassMethod && (specPolicy === SpecPolicy.DEFINE_MANY_MERGED || specPolicy === SpecPolicy.DEFINE_MANY)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: Unexpected spec policy %s for key %s when mixing in component specs.', specPolicy, name) : _prodInvariant('77', specPolicy, name) : void 0;

          // For methods which are defined more than once, call the existing
          // methods before calling the new property, merging if appropriate.
          if (specPolicy === SpecPolicy.DEFINE_MANY_MERGED) {
            proto[name] = createMergedResultFunction(proto[name], property);
          } else if (specPolicy === SpecPolicy.DEFINE_MANY) {
            proto[name] = createChainedFunction(proto[name], property);
          }
        } else {
          proto[name] = property;
          if (process.env.NODE_ENV !== 'production') {
            // Add verbose displayName to the function, which helps when looking
            // at profiling tools.
            if (typeof property === 'function' && spec.displayName) {
              proto[name].displayName = spec.displayName + '_' + name;
            }
          }
        }
      }
    }
  }
}

function mixStaticSpecIntoComponent(Constructor, statics) {
  if (!statics) {
    return;
  }
  for (var name in statics) {
    var property = statics[name];
    if (!statics.hasOwnProperty(name)) {
      continue;
    }

    var isReserved = name in RESERVED_SPEC_KEYS;
    !!isReserved ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You are attempting to define a reserved property, `%s`, that shouldn\'t be on the "statics" key. Define it as an instance property instead; it will still be accessible on the constructor.', name) : _prodInvariant('78', name) : void 0;

    var isInherited = name in Constructor;
    !!isInherited ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.', name) : _prodInvariant('79', name) : void 0;
    Constructor[name] = property;
  }
}

/**
 * Merge two objects, but throw if both contain the same key.
 *
 * @param {object} one The first object, which is mutated.
 * @param {object} two The second object
 * @return {object} one after it has been mutated to contain everything in two.
 */
function mergeIntoWithNoDuplicateKeys(one, two) {
  !(one && two && typeof one === 'object' && typeof two === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.') : _prodInvariant('80') : void 0;

  for (var key in two) {
    if (two.hasOwnProperty(key)) {
      !(one[key] === undefined) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): Tried to merge two objects with the same key: `%s`. This conflict may be due to a mixin; in particular, this may be caused by two getInitialState() or getDefaultProps() methods returning objects with clashing keys.', key) : _prodInvariant('81', key) : void 0;
      one[key] = two[key];
    }
  }
  return one;
}

/**
 * Creates a function that invokes two functions and merges their return values.
 *
 * @param {function} one Function to invoke first.
 * @param {function} two Function to invoke second.
 * @return {function} Function that invokes the two argument functions.
 * @private
 */
function createMergedResultFunction(one, two) {
  return function mergedResult() {
    var a = one.apply(this, arguments);
    var b = two.apply(this, arguments);
    if (a == null) {
      return b;
    } else if (b == null) {
      return a;
    }
    var c = {};
    mergeIntoWithNoDuplicateKeys(c, a);
    mergeIntoWithNoDuplicateKeys(c, b);
    return c;
  };
}

/**
 * Creates a function that invokes two functions and ignores their return vales.
 *
 * @param {function} one Function to invoke first.
 * @param {function} two Function to invoke second.
 * @return {function} Function that invokes the two argument functions.
 * @private
 */
function createChainedFunction(one, two) {
  return function chainedFunction() {
    one.apply(this, arguments);
    two.apply(this, arguments);
  };
}

/**
 * Binds a method to the component.
 *
 * @param {object} component Component whose method is going to be bound.
 * @param {function} method Method to be bound.
 * @return {function} The bound method.
 */
function bindAutoBindMethod(component, method) {
  var boundMethod = method.bind(component);
  if (process.env.NODE_ENV !== 'production') {
    boundMethod.__reactBoundContext = component;
    boundMethod.__reactBoundMethod = method;
    boundMethod.__reactBoundArguments = null;
    var componentName = component.constructor.displayName;
    var _bind = boundMethod.bind;
    boundMethod.bind = function (newThis) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      // User is trying to bind() an autobound method; we effectively will
      // ignore the value of "this" that the user is trying to use, so
      // let's warn.
      if (newThis !== component && newThis !== null) {
        process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): React component methods may only be bound to the ' + 'component instance. See %s', componentName) : void 0;
      } else if (!args.length) {
        process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): You are binding a component method to the component. ' + 'React does this for you automatically in a high-performance ' + 'way, so you can safely remove this call. See %s', componentName) : void 0;
        return boundMethod;
      }
      var reboundMethod = _bind.apply(boundMethod, arguments);
      reboundMethod.__reactBoundContext = component;
      reboundMethod.__reactBoundMethod = method;
      reboundMethod.__reactBoundArguments = args;
      return reboundMethod;
    };
  }
  return boundMethod;
}

/**
 * Binds all auto-bound methods in a component.
 *
 * @param {object} component Component whose method is going to be bound.
 */
function bindAutoBindMethods(component) {
  var pairs = component.__reactAutoBindPairs;
  for (var i = 0; i < pairs.length; i += 2) {
    var autoBindKey = pairs[i];
    var method = pairs[i + 1];
    component[autoBindKey] = bindAutoBindMethod(component, method);
  }
}

/**
 * Add more to the ReactClass base class. These are all legacy features and
 * therefore not already part of the modern ReactComponent.
 */
var ReactClassMixin = {

  /**
   * TODO: This will be deprecated because state should always keep a consistent
   * type signature and the only use case for this, is to avoid that.
   */
  replaceState: function (newState, callback) {
    this.updater.enqueueReplaceState(this, newState);
    if (callback) {
      this.updater.enqueueCallback(this, callback, 'replaceState');
    }
  },

  /**
   * Checks whether or not this composite component is mounted.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function () {
    return this.updater.isMounted(this);
  }
};

var ReactClassComponent = function () {};
_assign(ReactClassComponent.prototype, ReactComponent.prototype, ReactClassMixin);

/**
 * Module for creating composite components.
 *
 * @class ReactClass
 */
var ReactClass = {

  /**
   * Creates a composite component class given a class specification.
   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
   *
   * @param {object} spec Class specification (which must define `render`).
   * @return {function} Component constructor function.
   * @public
   */
  createClass: function (spec) {
    var Constructor = function (props, context, updater) {
      // This constructor gets overridden by mocks. The argument is used
      // by mocks to assert on what gets mounted.

      if (process.env.NODE_ENV !== 'production') {
        process.env.NODE_ENV !== 'production' ? warning(this instanceof Constructor, 'Something is calling a React component directly. Use a factory or ' + 'JSX instead. See: https://fb.me/react-legacyfactory') : void 0;
      }

      // Wire up auto-binding
      if (this.__reactAutoBindPairs.length) {
        bindAutoBindMethods(this);
      }

      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;

      this.state = null;

      // ReactClasses doesn't have constructors. Instead, they use the
      // getInitialState and componentWillMount methods for initialization.

      var initialState = this.getInitialState ? this.getInitialState() : null;
      if (process.env.NODE_ENV !== 'production') {
        // We allow auto-mocks to proceed as if they're returning null.
        if (initialState === undefined && this.getInitialState._isMockFunction) {
          // This is probably bad practice. Consider warning here and
          // deprecating this convenience.
          initialState = null;
        }
      }
      !(typeof initialState === 'object' && !Array.isArray(initialState)) ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s.getInitialState(): must return an object or null', Constructor.displayName || 'ReactCompositeComponent') : _prodInvariant('82', Constructor.displayName || 'ReactCompositeComponent') : void 0;

      this.state = initialState;
    };
    Constructor.prototype = new ReactClassComponent();
    Constructor.prototype.constructor = Constructor;
    Constructor.prototype.__reactAutoBindPairs = [];

    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

    mixSpecIntoComponent(Constructor, spec);

    // Initialize the defaultProps property after all mixins have been merged.
    if (Constructor.getDefaultProps) {
      Constructor.defaultProps = Constructor.getDefaultProps();
    }

    if (process.env.NODE_ENV !== 'production') {
      // This is a tag to indicate that the use of these method names is ok,
      // since it's used with createClass. If it's not, then it's likely a
      // mistake so we'll warn you to use the static property, property
      // initializer or constructor respectively.
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps.isReactClassApproved = {};
      }
      if (Constructor.prototype.getInitialState) {
        Constructor.prototype.getInitialState.isReactClassApproved = {};
      }
    }

    !Constructor.prototype.render ? process.env.NODE_ENV !== 'production' ? invariant(false, 'createClass(...): Class specification must implement a `render` method.') : _prodInvariant('83') : void 0;

    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentShouldUpdate, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', spec.displayName || 'A component') : void 0;
      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentWillRecieveProps, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', spec.displayName || 'A component') : void 0;
    }

    // Reduce time spent doing lookups by setting these on the prototype.
    for (var methodName in ReactClassInterface) {
      if (!Constructor.prototype[methodName]) {
        Constructor.prototype[methodName] = null;
      }
    }

    return Constructor;
  },

  injection: {
    injectMixin: function (mixin) {
      injectedMixins.push(mixin);
    }
  }

};

module.exports = ReactClass;
}).call(this,require('_process'))
},{"./ReactComponent":14,"./ReactElement":18,"./ReactNoopUpdateQueue":20,"./ReactPropTypeLocationNames":21,"./ReactPropTypeLocations":22,"./reactProdInvariant":29,"_process":47,"fbjs/lib/emptyObject":2,"fbjs/lib/invariant":3,"fbjs/lib/keyMirror":4,"fbjs/lib/keyOf":5,"fbjs/lib/warning":7,"object-assign":8}],14:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactComponent
 */

'use strict';

var _prodInvariant = require('./reactProdInvariant');

var ReactNoopUpdateQueue = require('./ReactNoopUpdateQueue');

var canDefineProperty = require('./canDefineProperty');
var emptyObject = require('fbjs/lib/emptyObject');
var invariant = require('fbjs/lib/invariant');
var warning = require('fbjs/lib/warning');

/**
 * Base class helpers for the updating state of a component.
 */
function ReactComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

ReactComponent.prototype.isReactComponent = {};

/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */
ReactComponent.prototype.setState = function (partialState, callback) {
  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : _prodInvariant('85') : void 0;
  this.updater.enqueueSetState(this, partialState);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'setState');
  }
};

/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */
ReactComponent.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'forceUpdate');
  }
};

/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */
if (process.env.NODE_ENV !== 'production') {
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  };
  var defineDeprecationWarning = function (methodName, info) {
    if (canDefineProperty) {
      Object.defineProperty(ReactComponent.prototype, methodName, {
        get: function () {
          process.env.NODE_ENV !== 'production' ? warning(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]) : void 0;
          return undefined;
        }
      });
    }
  };
  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

module.exports = ReactComponent;
}).call(this,require('_process'))
},{"./ReactNoopUpdateQueue":20,"./canDefineProperty":25,"./reactProdInvariant":29,"_process":47,"fbjs/lib/emptyObject":2,"fbjs/lib/invariant":3,"fbjs/lib/warning":7}],15:[function(require,module,exports){
(function (process){
/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactComponentTreeDevtool
 */

'use strict';

var _prodInvariant = require('./reactProdInvariant');

var ReactCurrentOwner = require('./ReactCurrentOwner');

var invariant = require('fbjs/lib/invariant');
var warning = require('fbjs/lib/warning');

var tree = {};
var unmountedIDs = {};
var rootIDs = {};

function updateTree(id, update) {
  if (!tree[id]) {
    tree[id] = {
      element: null,
      parentID: null,
      ownerID: null,
      text: null,
      childIDs: [],
      displayName: 'Unknown',
      isMounted: false,
      updateCount: 0
    };
  }
  update(tree[id]);
}

function purgeDeep(id) {
  var item = tree[id];
  if (item) {
    var childIDs = item.childIDs;

    delete tree[id];
    childIDs.forEach(purgeDeep);
  }
}

function describeComponentFrame(name, source, ownerName) {
  return '\n    in ' + name + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
}

function describeID(id) {
  var name = ReactComponentTreeDevtool.getDisplayName(id);
  var element = ReactComponentTreeDevtool.getElement(id);
  var ownerID = ReactComponentTreeDevtool.getOwnerID(id);
  var ownerName;
  if (ownerID) {
    ownerName = ReactComponentTreeDevtool.getDisplayName(ownerID);
  }
  process.env.NODE_ENV !== 'production' ? warning(element, 'ReactComponentTreeDevtool: Missing React element for debugID %s when ' + 'building stack', id) : void 0;
  return describeComponentFrame(name, element && element._source, ownerName);
}

var ReactComponentTreeDevtool = {
  onSetDisplayName: function (id, displayName) {
    updateTree(id, function (item) {
      return item.displayName = displayName;
    });
  },
  onSetChildren: function (id, nextChildIDs) {
    updateTree(id, function (item) {
      item.childIDs = nextChildIDs;

      nextChildIDs.forEach(function (nextChildID) {
        var nextChild = tree[nextChildID];
        !nextChild ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected devtool events to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('68') : void 0;
        !(nextChild.displayName != null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onSetDisplayName() to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('69') : void 0;
        !(nextChild.childIDs != null || nextChild.text != null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onSetChildren() or onSetText() to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('70') : void 0;
        !nextChild.isMounted ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onMountComponent() to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('71') : void 0;
        if (nextChild.parentID == null) {
          nextChild.parentID = id;
          // TODO: This shouldn't be necessary but mounting a new root during in
          // componentWillMount currently causes not-yet-mounted components to
          // be purged from our tree data so their parent ID is missing.
        }
        !(nextChild.parentID === id) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onSetParent() and onSetChildren() to be consistent (%s has parents %s and %s).', nextChildID, nextChild.parentID, id) : _prodInvariant('72', nextChildID, nextChild.parentID, id) : void 0;
      });
    });
  },
  onSetOwner: function (id, ownerID) {
    updateTree(id, function (item) {
      return item.ownerID = ownerID;
    });
  },
  onSetParent: function (id, parentID) {
    updateTree(id, function (item) {
      return item.parentID = parentID;
    });
  },
  onSetText: function (id, text) {
    updateTree(id, function (item) {
      return item.text = text;
    });
  },
  onBeforeMountComponent: function (id, element) {
    updateTree(id, function (item) {
      return item.element = element;
    });
  },
  onBeforeUpdateComponent: function (id, element) {
    updateTree(id, function (item) {
      return item.element = element;
    });
  },
  onMountComponent: function (id) {
    updateTree(id, function (item) {
      return item.isMounted = true;
    });
  },
  onMountRootComponent: function (id) {
    rootIDs[id] = true;
  },
  onUpdateComponent: function (id) {
    updateTree(id, function (item) {
      return item.updateCount++;
    });
  },
  onUnmountComponent: function (id) {
    updateTree(id, function (item) {
      return item.isMounted = false;
    });
    unmountedIDs[id] = true;
    delete rootIDs[id];
  },
  purgeUnmountedComponents: function () {
    if (ReactComponentTreeDevtool._preventPurging) {
      // Should only be used for testing.
      return;
    }

    for (var id in unmountedIDs) {
      purgeDeep(id);
    }
    unmountedIDs = {};
  },
  isMounted: function (id) {
    var item = tree[id];
    return item ? item.isMounted : false;
  },
  getCurrentStackAddendum: function (topElement) {
    var info = '';
    if (topElement) {
      var type = topElement.type;
      var name = typeof type === 'function' ? type.displayName || type.name : type;
      var owner = topElement._owner;
      info += describeComponentFrame(name || 'Unknown', topElement._source, owner && owner.getName());
    }

    var currentOwner = ReactCurrentOwner.current;
    var id = currentOwner && currentOwner._debugID;

    info += ReactComponentTreeDevtool.getStackAddendumByID(id);
    return info;
  },
  getStackAddendumByID: function (id) {
    var info = '';
    while (id) {
      info += describeID(id);
      id = ReactComponentTreeDevtool.getParentID(id);
    }
    return info;
  },
  getChildIDs: function (id) {
    var item = tree[id];
    return item ? item.childIDs : [];
  },
  getDisplayName: function (id) {
    var item = tree[id];
    return item ? item.displayName : 'Unknown';
  },
  getElement: function (id) {
    var item = tree[id];
    return item ? item.element : null;
  },
  getOwnerID: function (id) {
    var item = tree[id];
    return item ? item.ownerID : null;
  },
  getParentID: function (id) {
    var item = tree[id];
    return item ? item.parentID : null;
  },
  getSource: function (id) {
    var item = tree[id];
    var element = item ? item.element : null;
    var source = element != null ? element._source : null;
    return source;
  },
  getText: function (id) {
    var item = tree[id];
    return item ? item.text : null;
  },
  getUpdateCount: function (id) {
    var item = tree[id];
    return item ? item.updateCount : 0;
  },
  getRootIDs: function () {
    return Object.keys(rootIDs);
  },
  getRegisteredIDs: function () {
    return Object.keys(tree);
  }
};

module.exports = ReactComponentTreeDevtool;
}).call(this,require('_process'))
},{"./ReactCurrentOwner":16,"./reactProdInvariant":29,"_process":47,"fbjs/lib/invariant":3,"fbjs/lib/warning":7}],16:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactCurrentOwner
 */

'use strict';

/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */

var ReactCurrentOwner = {

  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null

};

module.exports = ReactCurrentOwner;
},{}],17:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDOMFactories
 */

'use strict';

var ReactElement = require('./ReactElement');

var mapObject = require('fbjs/lib/mapObject');

/**
 * Create a factory that creates HTML tag elements.
 *
 * @param {string} tag Tag name (e.g. `div`).
 * @private
 */
function createDOMFactory(tag) {
  if (process.env.NODE_ENV !== 'production') {
    var ReactElementValidator = require('./ReactElementValidator');
    return ReactElementValidator.createFactory(tag);
  }
  return ReactElement.createFactory(tag);
}

/**
 * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
 * This is also accessible via `React.DOM`.
 *
 * @public
 */
var ReactDOMFactories = mapObject({
  a: 'a',
  abbr: 'abbr',
  address: 'address',
  area: 'area',
  article: 'article',
  aside: 'aside',
  audio: 'audio',
  b: 'b',
  base: 'base',
  bdi: 'bdi',
  bdo: 'bdo',
  big: 'big',
  blockquote: 'blockquote',
  body: 'body',
  br: 'br',
  button: 'button',
  canvas: 'canvas',
  caption: 'caption',
  cite: 'cite',
  code: 'code',
  col: 'col',
  colgroup: 'colgroup',
  data: 'data',
  datalist: 'datalist',
  dd: 'dd',
  del: 'del',
  details: 'details',
  dfn: 'dfn',
  dialog: 'dialog',
  div: 'div',
  dl: 'dl',
  dt: 'dt',
  em: 'em',
  embed: 'embed',
  fieldset: 'fieldset',
  figcaption: 'figcaption',
  figure: 'figure',
  footer: 'footer',
  form: 'form',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  head: 'head',
  header: 'header',
  hgroup: 'hgroup',
  hr: 'hr',
  html: 'html',
  i: 'i',
  iframe: 'iframe',
  img: 'img',
  input: 'input',
  ins: 'ins',
  kbd: 'kbd',
  keygen: 'keygen',
  label: 'label',
  legend: 'legend',
  li: 'li',
  link: 'link',
  main: 'main',
  map: 'map',
  mark: 'mark',
  menu: 'menu',
  menuitem: 'menuitem',
  meta: 'meta',
  meter: 'meter',
  nav: 'nav',
  noscript: 'noscript',
  object: 'object',
  ol: 'ol',
  optgroup: 'optgroup',
  option: 'option',
  output: 'output',
  p: 'p',
  param: 'param',
  picture: 'picture',
  pre: 'pre',
  progress: 'progress',
  q: 'q',
  rp: 'rp',
  rt: 'rt',
  ruby: 'ruby',
  s: 's',
  samp: 'samp',
  script: 'script',
  section: 'section',
  select: 'select',
  small: 'small',
  source: 'source',
  span: 'span',
  strong: 'strong',
  style: 'style',
  sub: 'sub',
  summary: 'summary',
  sup: 'sup',
  table: 'table',
  tbody: 'tbody',
  td: 'td',
  textarea: 'textarea',
  tfoot: 'tfoot',
  th: 'th',
  thead: 'thead',
  time: 'time',
  title: 'title',
  tr: 'tr',
  track: 'track',
  u: 'u',
  ul: 'ul',
  'var': 'var',
  video: 'video',
  wbr: 'wbr',

  // SVG
  circle: 'circle',
  clipPath: 'clipPath',
  defs: 'defs',
  ellipse: 'ellipse',
  g: 'g',
  image: 'image',
  line: 'line',
  linearGradient: 'linearGradient',
  mask: 'mask',
  path: 'path',
  pattern: 'pattern',
  polygon: 'polygon',
  polyline: 'polyline',
  radialGradient: 'radialGradient',
  rect: 'rect',
  stop: 'stop',
  svg: 'svg',
  text: 'text',
  tspan: 'tspan'

}, createDOMFactory);

module.exports = ReactDOMFactories;
}).call(this,require('_process'))
},{"./ReactElement":18,"./ReactElementValidator":19,"_process":47,"fbjs/lib/mapObject":6}],18:[function(require,module,exports){
(function (process){
/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactElement
 */

'use strict';

var _assign = require('object-assign');

var ReactCurrentOwner = require('./ReactCurrentOwner');

var warning = require('fbjs/lib/warning');
var canDefineProperty = require('./canDefineProperty');
var hasOwnProperty = Object.prototype.hasOwnProperty;

// The Symbol used to tag the ReactElement type. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

var specialPropKeyWarningShown, specialPropRefWarningShown;

function hasValidRef(config) {
  if (process.env.NODE_ENV !== 'production') {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}

function hasValidKey(config) {
  if (process.env.NODE_ENV !== 'production') {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.key !== undefined;
}

/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, no instanceof check
 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @param {*} owner
 * @param {*} props
 * @internal
 */
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allow us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner
  };

  if (process.env.NODE_ENV !== 'production') {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {};

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    if (canDefineProperty) {
      Object.defineProperty(element._store, 'validated', {
        configurable: false,
        enumerable: false,
        writable: true,
        value: false
      });
      // self and source are DEV only properties.
      Object.defineProperty(element, '_self', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: self
      });
      // Two elements created in two different places should be considered
      // equal for testing purposes and therefore we hide it from enumeration.
      Object.defineProperty(element, '_source', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: source
      });
    } else {
      element._store.validated = false;
      element._self = self;
      element._source = source;
    }
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};

/**
 * Create and return a new ReactElement of the given type.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.createelement
 */
ReactElement.createElement = function (type, config, children) {
  var propName;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== 'production' ? warning(
      /* eslint-disable no-proto */
      config.__proto__ == null || config.__proto__ === Object.prototype,
      /* eslint-enable no-proto */
      'React.createElement(...): Expected props argument to be a plain object. ' + 'Properties defined in its prototype chain will be ignored.') : void 0;
    }

    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  if (process.env.NODE_ENV !== 'production') {
    var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

    // Create dummy `key` and `ref` property to `props` to warn users against its use
    var warnAboutAccessingKey = function () {
      if (!specialPropKeyWarningShown) {
        specialPropKeyWarningShown = true;
        process.env.NODE_ENV !== 'production' ? warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
      }
      return undefined;
    };
    warnAboutAccessingKey.isReactWarning = true;

    var warnAboutAccessingRef = function () {
      if (!specialPropRefWarningShown) {
        specialPropRefWarningShown = true;
        process.env.NODE_ENV !== 'production' ? warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
      }
      return undefined;
    };
    warnAboutAccessingRef.isReactWarning = true;

    if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
      if (!props.hasOwnProperty('key')) {
        Object.defineProperty(props, 'key', {
          get: warnAboutAccessingKey,
          configurable: true
        });
      }
      if (!props.hasOwnProperty('ref')) {
        Object.defineProperty(props, 'ref', {
          get: warnAboutAccessingRef,
          configurable: true
        });
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
};

/**
 * Return a function that produces ReactElements of a given type.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.createfactory
 */
ReactElement.createFactory = function (type) {
  var factory = ReactElement.createElement.bind(null, type);
  // Expose the type on the factory and the prototype so that it can be
  // easily accessed on elements. E.g. `<Foo />.type === Foo`.
  // This should not be named `constructor` since this may not be the function
  // that created the element, and it may not even be a constructor.
  // Legacy hook TODO: Warn if this is accessed
  factory.type = type;
  return factory;
};

ReactElement.cloneAndReplaceKey = function (oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

  return newElement;
};

/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.cloneelement
 */
ReactElement.cloneElement = function (element, config, children) {
  var propName;

  // Original props are copied
  var props = _assign({}, element.props);

  // Reserved names are extracted
  var key = element.key;
  var ref = element.ref;
  // Self is preserved since the owner is preserved.
  var self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  var source = element._source;

  // Owner will be preserved, unless ref is overridden
  var owner = element._owner;

  if (config != null) {
    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== 'production' ? warning(
      /* eslint-disable no-proto */
      config.__proto__ == null || config.__proto__ === Object.prototype,
      /* eslint-enable no-proto */
      'React.cloneElement(...): Expected props argument to be a plain object. ' + 'Properties defined in its prototype chain will be ignored.') : void 0;
    }

    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    // Remaining properties override existing props
    var defaultProps;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
};

/**
 * Verifies the object is a ReactElement.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a valid component.
 * @final
 */
ReactElement.isValidElement = function (object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
};

ReactElement.REACT_ELEMENT_TYPE = REACT_ELEMENT_TYPE;

module.exports = ReactElement;
}).call(this,require('_process'))
},{"./ReactCurrentOwner":16,"./canDefineProperty":25,"_process":47,"fbjs/lib/warning":7,"object-assign":8}],19:[function(require,module,exports){
(function (process){
/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactElementValidator
 */

/**
 * ReactElementValidator provides a wrapper around a element factory
 * which validates the props passed to the element. This is intended to be
 * used only in DEV and could be replaced by a static type checker for languages
 * that support it.
 */

'use strict';

var ReactCurrentOwner = require('./ReactCurrentOwner');
var ReactComponentTreeDevtool = require('./ReactComponentTreeDevtool');
var ReactElement = require('./ReactElement');
var ReactPropTypeLocations = require('./ReactPropTypeLocations');

var checkReactTypeSpec = require('./checkReactTypeSpec');

var canDefineProperty = require('./canDefineProperty');
var getIteratorFn = require('./getIteratorFn');
var warning = require('fbjs/lib/warning');

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner.current) {
    var name = ReactCurrentOwner.current.getName();
    if (name) {
      return ' Check the render method of `' + name + '`.';
    }
  }
  return '';
}

/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */
var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  var info = getDeclarationErrorAddendum();

  if (!info) {
    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
    if (parentName) {
      info = ' Check the top-level render call using <' + parentName + '>.';
    }
  }
  return info;
}

/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */
function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }
  element._store.validated = true;

  var memoizer = ownerHasKeyUseWarning.uniqueKey || (ownerHasKeyUseWarning.uniqueKey = {});

  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
  if (memoizer[currentComponentErrorInfo]) {
    return;
  }
  memoizer[currentComponentErrorInfo] = true;

  // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.
  var childOwner = '';
  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
    // Give the component that originally created this child.
    childOwner = ' It was passed a child from ' + element._owner.getName() + '.';
  }

  process.env.NODE_ENV !== 'production' ? warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, ReactComponentTreeDevtool.getCurrentStackAddendum(element)) : void 0;
}

/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */
function validateChildKeys(node, parentType) {
  if (typeof node !== 'object') {
    return;
  }
  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];
      if (ReactElement.isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (ReactElement.isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = getIteratorFn(node);
    // Entry iterators provide implicit keys.
    if (iteratorFn) {
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step;
        while (!(step = iterator.next()).done) {
          if (ReactElement.isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}

/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */
function validatePropTypes(element) {
  var componentClass = element.type;
  if (typeof componentClass !== 'function') {
    return;
  }
  var name = componentClass.displayName || componentClass.name;
  if (componentClass.propTypes) {
    checkReactTypeSpec(componentClass.propTypes, element.props, ReactPropTypeLocations.prop, name, element, null);
  }
  if (typeof componentClass.getDefaultProps === 'function') {
    process.env.NODE_ENV !== 'production' ? warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
  }
}

var ReactElementValidator = {

  createElement: function (type, props, children) {
    var validType = typeof type === 'string' || typeof type === 'function';
    // We warn in this case but don't throw. We expect the element creation to
    // succeed and there will likely be errors in render.
    process.env.NODE_ENV !== 'production' ? warning(validType, 'React.createElement: type should not be null, undefined, boolean, or ' + 'number. It should be a string (for DOM elements) or a ReactClass ' + '(for composite components).%s', getDeclarationErrorAddendum()) : void 0;

    var element = ReactElement.createElement.apply(this, arguments);

    // The result can be nullish if a mock or a custom function is used.
    // TODO: Drop this when these are no longer allowed as the type argument.
    if (element == null) {
      return element;
    }

    // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing errors.
    // We don't want exception behavior to differ between dev and prod.
    // (Rendering will throw with a helpful message and as soon as the type is
    // fixed, the key warnings will appear.)
    if (validType) {
      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], type);
      }
    }

    validatePropTypes(element);

    return element;
  },

  createFactory: function (type) {
    var validatedFactory = ReactElementValidator.createElement.bind(null, type);
    // Legacy hook TODO: Warn if this is accessed
    validatedFactory.type = type;

    if (process.env.NODE_ENV !== 'production') {
      if (canDefineProperty) {
        Object.defineProperty(validatedFactory, 'type', {
          enumerable: false,
          get: function () {
            process.env.NODE_ENV !== 'production' ? warning(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.') : void 0;
            Object.defineProperty(this, 'type', {
              value: type
            });
            return type;
          }
        });
      }
    }

    return validatedFactory;
  },

  cloneElement: function (element, props, children) {
    var newElement = ReactElement.cloneElement.apply(this, arguments);
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], newElement.type);
    }
    validatePropTypes(newElement);
    return newElement;
  }

};

module.exports = ReactElementValidator;
}).call(this,require('_process'))
},{"./ReactComponentTreeDevtool":15,"./ReactCurrentOwner":16,"./ReactElement":18,"./ReactPropTypeLocations":22,"./canDefineProperty":25,"./checkReactTypeSpec":26,"./getIteratorFn":27,"_process":47,"fbjs/lib/warning":7}],20:[function(require,module,exports){
(function (process){
/**
 * Copyright 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactNoopUpdateQueue
 */

'use strict';

var warning = require('fbjs/lib/warning');

function warnNoop(publicInstance, callerName) {
  if (process.env.NODE_ENV !== 'production') {
    var constructor = publicInstance.constructor;
    process.env.NODE_ENV !== 'production' ? warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op. Please check the code for the %s component.', callerName, callerName, constructor && (constructor.displayName || constructor.name) || 'ReactClass') : void 0;
  }
}

/**
 * This is the abstract API for an update queue.
 */
var ReactNoopUpdateQueue = {

  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Enqueue a callback that will be executed after all the pending updates
   * have processed.
   *
   * @param {ReactClass} publicInstance The instance to use as `this` context.
   * @param {?function} callback Called after state is updated.
   * @internal
   */
  enqueueCallback: function (publicInstance, callback) {},

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState) {
    warnNoop(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState) {
    warnNoop(publicInstance, 'setState');
  }
};

module.exports = ReactNoopUpdateQueue;
}).call(this,require('_process'))
},{"_process":47,"fbjs/lib/warning":7}],21:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactPropTypeLocationNames
 */

'use strict';

var ReactPropTypeLocationNames = {};

if (process.env.NODE_ENV !== 'production') {
  ReactPropTypeLocationNames = {
    prop: 'prop',
    context: 'context',
    childContext: 'child context'
  };
}

module.exports = ReactPropTypeLocationNames;
}).call(this,require('_process'))
},{"_process":47}],22:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactPropTypeLocations
 */

'use strict';

var keyMirror = require('fbjs/lib/keyMirror');

var ReactPropTypeLocations = keyMirror({
  prop: null,
  context: null,
  childContext: null
});

module.exports = ReactPropTypeLocations;
},{"fbjs/lib/keyMirror":4}],23:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactPropTypes
 */

'use strict';

var ReactElement = require('./ReactElement');
var ReactPropTypeLocationNames = require('./ReactPropTypeLocationNames');

var emptyFunction = require('fbjs/lib/emptyFunction');
var getIteratorFn = require('./getIteratorFn');

/**
 * Collection of methods that allow declaration and validation of props that are
 * supplied to React components. Example usage:
 *
 *   var Props = require('ReactPropTypes');
 *   var MyArticle = React.createClass({
 *     propTypes: {
 *       // An optional string prop named "description".
 *       description: Props.string,
 *
 *       // A required enum prop named "category".
 *       category: Props.oneOf(['News','Photos']).isRequired,
 *
 *       // A prop named "dialog" that requires an instance of Dialog.
 *       dialog: Props.instanceOf(Dialog).isRequired
 *     },
 *     render: function() { ... }
 *   });
 *
 * A more formal specification of how these methods are used:
 *
 *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
 *   decl := ReactPropTypes.{type}(.isRequired)?
 *
 * Each and every declaration produces a function with the same signature. This
 * allows the creation of custom validation functions. For example:
 *
 *  var MyLink = React.createClass({
 *    propTypes: {
 *      // An optional string or URI prop named "href".
 *      href: function(props, propName, componentName) {
 *        var propValue = props[propName];
 *        if (propValue != null && typeof propValue !== 'string' &&
 *            !(propValue instanceof URI)) {
 *          return new Error(
 *            'Expected a string or an URI for ' + propName + ' in ' +
 *            componentName
 *          );
 *        }
 *      }
 *    },
 *    render: function() {...}
 *  });
 *
 * @internal
 */

var ANONYMOUS = '<<anonymous>>';

var ReactPropTypes = {
  array: createPrimitiveTypeChecker('array'),
  bool: createPrimitiveTypeChecker('boolean'),
  func: createPrimitiveTypeChecker('function'),
  number: createPrimitiveTypeChecker('number'),
  object: createPrimitiveTypeChecker('object'),
  string: createPrimitiveTypeChecker('string'),
  symbol: createPrimitiveTypeChecker('symbol'),

  any: createAnyTypeChecker(),
  arrayOf: createArrayOfTypeChecker,
  element: createElementTypeChecker(),
  instanceOf: createInstanceTypeChecker,
  node: createNodeChecker(),
  objectOf: createObjectOfTypeChecker,
  oneOf: createEnumTypeChecker,
  oneOfType: createUnionTypeChecker,
  shape: createShapeTypeChecker
};

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
/*eslint-disable no-self-compare*/
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    return x !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}
/*eslint-enable no-self-compare*/

function createChainableTypeChecker(validate) {
  function checkType(isRequired, props, propName, componentName, location, propFullName) {
    componentName = componentName || ANONYMOUS;
    propFullName = propFullName || propName;
    if (props[propName] == null) {
      var locationName = ReactPropTypeLocationNames[location];
      if (isRequired) {
        return new Error('Required ' + locationName + ' `' + propFullName + '` was not specified in ' + ('`' + componentName + '`.'));
      }
      return null;
    } else {
      return validate(props, propName, componentName, location, propFullName);
    }
  }

  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}

function createPrimitiveTypeChecker(expectedType) {
  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];
    var propType = getPropType(propValue);
    if (propType !== expectedType) {
      var locationName = ReactPropTypeLocationNames[location];
      // `propValue` being instance of, say, date/regexp, pass the 'object'
      // check, but we can offer a more precise error message here rather than
      // 'of type `object`'.
      var preciseType = getPreciseType(propValue);

      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createAnyTypeChecker() {
  return createChainableTypeChecker(emptyFunction.thatReturns(null));
}

function createArrayOfTypeChecker(typeChecker) {
  function validate(props, propName, componentName, location, propFullName) {
    if (typeof typeChecker !== 'function') {
      return new Error('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
    }
    var propValue = props[propName];
    if (!Array.isArray(propValue)) {
      var locationName = ReactPropTypeLocationNames[location];
      var propType = getPropType(propValue);
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
    }
    for (var i = 0; i < propValue.length; i++) {
      var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']');
      if (error instanceof Error) {
        return error;
      }
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createElementTypeChecker() {
  function validate(props, propName, componentName, location, propFullName) {
    if (!ReactElement.isValidElement(props[propName])) {
      var locationName = ReactPropTypeLocationNames[location];
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a single ReactElement.'));
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createInstanceTypeChecker(expectedClass) {
  function validate(props, propName, componentName, location, propFullName) {
    if (!(props[propName] instanceof expectedClass)) {
      var locationName = ReactPropTypeLocationNames[location];
      var expectedClassName = expectedClass.name || ANONYMOUS;
      var actualClassName = getClassName(props[propName]);
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createEnumTypeChecker(expectedValues) {
  if (!Array.isArray(expectedValues)) {
    return createChainableTypeChecker(function () {
      return new Error('Invalid argument supplied to oneOf, expected an instance of array.');
    });
  }

  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];
    for (var i = 0; i < expectedValues.length; i++) {
      if (is(propValue, expectedValues[i])) {
        return null;
      }
    }

    var locationName = ReactPropTypeLocationNames[location];
    var valuesString = JSON.stringify(expectedValues);
    return new Error('Invalid ' + locationName + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
  }
  return createChainableTypeChecker(validate);
}

function createObjectOfTypeChecker(typeChecker) {
  function validate(props, propName, componentName, location, propFullName) {
    if (typeof typeChecker !== 'function') {
      return new Error('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
    }
    var propValue = props[propName];
    var propType = getPropType(propValue);
    if (propType !== 'object') {
      var locationName = ReactPropTypeLocationNames[location];
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
    }
    for (var key in propValue) {
      if (propValue.hasOwnProperty(key)) {
        var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key);
        if (error instanceof Error) {
          return error;
        }
      }
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createUnionTypeChecker(arrayOfTypeCheckers) {
  if (!Array.isArray(arrayOfTypeCheckers)) {
    return createChainableTypeChecker(function () {
      return new Error('Invalid argument supplied to oneOfType, expected an instance of array.');
    });
  }

  function validate(props, propName, componentName, location, propFullName) {
    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (checker(props, propName, componentName, location, propFullName) == null) {
        return null;
      }
    }

    var locationName = ReactPropTypeLocationNames[location];
    return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
  }
  return createChainableTypeChecker(validate);
}

function createNodeChecker() {
  function validate(props, propName, componentName, location, propFullName) {
    if (!isNode(props[propName])) {
      var locationName = ReactPropTypeLocationNames[location];
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createShapeTypeChecker(shapeTypes) {
  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];
    var propType = getPropType(propValue);
    if (propType !== 'object') {
      var locationName = ReactPropTypeLocationNames[location];
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
    }
    for (var key in shapeTypes) {
      var checker = shapeTypes[key];
      if (!checker) {
        continue;
      }
      var error = checker(propValue, key, componentName, location, propFullName + '.' + key);
      if (error) {
        return error;
      }
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function isNode(propValue) {
  switch (typeof propValue) {
    case 'number':
    case 'string':
    case 'undefined':
      return true;
    case 'boolean':
      return !propValue;
    case 'object':
      if (Array.isArray(propValue)) {
        return propValue.every(isNode);
      }
      if (propValue === null || ReactElement.isValidElement(propValue)) {
        return true;
      }

      var iteratorFn = getIteratorFn(propValue);
      if (iteratorFn) {
        var iterator = iteratorFn.call(propValue);
        var step;
        if (iteratorFn !== propValue.entries) {
          while (!(step = iterator.next()).done) {
            if (!isNode(step.value)) {
              return false;
            }
          }
        } else {
          // Iterator will provide entry [k,v] tuples rather than values.
          while (!(step = iterator.next()).done) {
            var entry = step.value;
            if (entry) {
              if (!isNode(entry[1])) {
                return false;
              }
            }
          }
        }
      } else {
        return false;
      }

      return true;
    default:
      return false;
  }
}

function isSymbol(propType, propValue) {
  // Native Symbol.
  if (propType === 'symbol') {
    return true;
  }

  // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
  if (propValue['@@toStringTag'] === 'Symbol') {
    return true;
  }

  // Fallback for non-spec compliant Symbols which are polyfilled.
  if (typeof Symbol === 'function' && propValue instanceof Symbol) {
    return true;
  }

  return false;
}

// Equivalent of `typeof` but with special handling for array and regexp.
function getPropType(propValue) {
  var propType = typeof propValue;
  if (Array.isArray(propValue)) {
    return 'array';
  }
  if (propValue instanceof RegExp) {
    // Old webkits (at least until Android 4.0) return 'function' rather than
    // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
    // passes PropTypes.object.
    return 'object';
  }
  if (isSymbol(propType, propValue)) {
    return 'symbol';
  }
  return propType;
}

// This handles more types than `getPropType`. Only used for error messages.
// See `createPrimitiveTypeChecker`.
function getPreciseType(propValue) {
  var propType = getPropType(propValue);
  if (propType === 'object') {
    if (propValue instanceof Date) {
      return 'date';
    } else if (propValue instanceof RegExp) {
      return 'regexp';
    }
  }
  return propType;
}

// Returns class name of the object, if any.
function getClassName(propValue) {
  if (!propValue.constructor || !propValue.constructor.name) {
    return ANONYMOUS;
  }
  return propValue.constructor.name;
}

module.exports = ReactPropTypes;
},{"./ReactElement":18,"./ReactPropTypeLocationNames":21,"./getIteratorFn":27,"fbjs/lib/emptyFunction":1}],24:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactVersion
 */

'use strict';

module.exports = '15.2.1';
},{}],25:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule canDefineProperty
 */

'use strict';

var canDefineProperty = false;
if (process.env.NODE_ENV !== 'production') {
  try {
    Object.defineProperty({}, 'x', { get: function () {} });
    canDefineProperty = true;
  } catch (x) {
    // IE will fail on defineProperty
  }
}

module.exports = canDefineProperty;
}).call(this,require('_process'))
},{"_process":47}],26:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule checkReactTypeSpec
 */

'use strict';

var _prodInvariant = require('./reactProdInvariant');

var ReactPropTypeLocationNames = require('./ReactPropTypeLocationNames');

var invariant = require('fbjs/lib/invariant');
var warning = require('fbjs/lib/warning');

var loggedTypeFailures = {};

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?object} element The React element that is being type-checked
 * @param {?number} debugID The React component instance that is being type-checked
 * @private
 */
function checkReactTypeSpec(typeSpecs, values, location, componentName, element, debugID) {
  for (var typeSpecName in typeSpecs) {
    if (typeSpecs.hasOwnProperty(typeSpecName)) {
      var error;
      // Prop type validation may throw. In case they do, we don't want to
      // fail the render phase where it didn't fail before. So we log it.
      // After these have been cleaned up, we'll let them throw.
      try {
        // This is intentionally an invariant that gets caught. It's the same
        // behavior as without this statement except with a better message.
        !(typeof typeSpecs[typeSpecName] === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : _prodInvariant('84', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : void 0;
        error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location);
      } catch (ex) {
        error = ex;
      }
      process.env.NODE_ENV !== 'production' ? warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName, typeof error) : void 0;
      if (error instanceof Error && !(error.message in loggedTypeFailures)) {
        // Only monitor this failure once because there tends to be a lot of the
        // same error.
        loggedTypeFailures[error.message] = true;

        var componentStackInfo = '';

        if (process.env.NODE_ENV !== 'production') {
          var ReactComponentTreeDevtool = require('./ReactComponentTreeDevtool');
          if (debugID !== null) {
            componentStackInfo = ReactComponentTreeDevtool.getStackAddendumByID(debugID);
          } else if (element !== null) {
            componentStackInfo = ReactComponentTreeDevtool.getCurrentStackAddendum(element);
          }
        }

        process.env.NODE_ENV !== 'production' ? warning(false, 'Failed %s type: %s%s', location, error.message, componentStackInfo) : void 0;
      }
    }
  }
}

module.exports = checkReactTypeSpec;
}).call(this,require('_process'))
},{"./ReactComponentTreeDevtool":15,"./ReactPropTypeLocationNames":21,"./reactProdInvariant":29,"_process":47,"fbjs/lib/invariant":3,"fbjs/lib/warning":7}],27:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getIteratorFn
 * 
 */

'use strict';

/* global Symbol */

var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

/**
 * Returns the iterator method function contained on the iterable object.
 *
 * Be sure to invoke the function with the iterable as context:
 *
 *     var iteratorFn = getIteratorFn(myIterable);
 *     if (iteratorFn) {
 *       var iterator = iteratorFn.call(myIterable);
 *       ...
 *     }
 *
 * @param {?object} maybeIterable
 * @return {?function}
 */
function getIteratorFn(maybeIterable) {
  var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
  if (typeof iteratorFn === 'function') {
    return iteratorFn;
  }
}

module.exports = getIteratorFn;
},{}],28:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule onlyChild
 */
'use strict';

var _prodInvariant = require('./reactProdInvariant');

var ReactElement = require('./ReactElement');

var invariant = require('fbjs/lib/invariant');

/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.only
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */
function onlyChild(children) {
  !ReactElement.isValidElement(children) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'onlyChild must be passed a children with exactly one child.') : _prodInvariant('23') : void 0;
  return children;
}

module.exports = onlyChild;
}).call(this,require('_process'))
},{"./ReactElement":18,"./reactProdInvariant":29,"_process":47,"fbjs/lib/invariant":3}],29:[function(require,module,exports){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule reactProdInvariant
 * 
 */
'use strict';

/**
 * WARNING: DO NOT manually require this module.
 * This is a replacement for `invariant(...)` used by the error code system
 * and will _only_ be required by the corresponding babel pass.
 * It always throws.
 */

function reactProdInvariant(code) {
  var argCount = arguments.length - 1;

  var message = 'Minified React error #' + code + '; visit ' + 'http://facebook.github.io/react/docs/error-decoder.html?invariant=' + code;

  for (var argIdx = 0; argIdx < argCount; argIdx++) {
    message += '&args[]=' + encodeURIComponent(arguments[argIdx + 1]);
  }

  message += ' for the full message or use the non-minified dev environment' + ' for full errors and additional helpful warnings.';

  var error = new Error(message);
  error.name = 'Invariant Violation';
  error.framesToPop = 1; // we don't care about reactProdInvariant's own frame

  throw error;
}

module.exports = reactProdInvariant;
},{}],30:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule traverseAllChildren
 */

'use strict';

var _prodInvariant = require('./reactProdInvariant');

var ReactCurrentOwner = require('./ReactCurrentOwner');
var ReactElement = require('./ReactElement');

var getIteratorFn = require('./getIteratorFn');
var invariant = require('fbjs/lib/invariant');
var KeyEscapeUtils = require('./KeyEscapeUtils');
var warning = require('fbjs/lib/warning');

var SEPARATOR = '.';
var SUBSEPARATOR = ':';

/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */

var didWarnAboutMaps = false;

/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */
function getComponentKey(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (component && typeof component === 'object' && component.key != null) {
    // Explicit key
    return KeyEscapeUtils.escape(component.key);
  }
  // Implicit key determined by the index in the set
  return index.toString(36);
}

/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  if (children === null || type === 'string' || type === 'number' || ReactElement.isValidElement(children)) {
    callback(traverseContext, children,
    // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }

  var child;
  var nextName;
  var subtreeCount = 0; // Count of children found in the current subtree.
  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = getIteratorFn(children);
    if (iteratorFn) {
      var iterator = iteratorFn.call(children);
      var step;
      if (iteratorFn !== children.entries) {
        var ii = 0;
        while (!(step = iterator.next()).done) {
          child = step.value;
          nextName = nextNamePrefix + getComponentKey(child, ii++);
          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
        }
      } else {
        if (process.env.NODE_ENV !== 'production') {
          process.env.NODE_ENV !== 'production' ? warning(didWarnAboutMaps, 'Using Maps as children is not yet fully supported. It is an ' + 'experimental feature that might be removed. Convert it to a ' + 'sequence / iterable of keyed ReactElements instead.') : void 0;
          didWarnAboutMaps = true;
        }
        // Iterator will provide entry [k,v] tuples rather than values.
        while (!(step = iterator.next()).done) {
          var entry = step.value;
          if (entry) {
            child = entry[1];
            nextName = nextNamePrefix + KeyEscapeUtils.escape(entry[0]) + SUBSEPARATOR + getComponentKey(child, 0);
            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
          }
        }
      }
    } else if (type === 'object') {
      var addendum = '';
      if (process.env.NODE_ENV !== 'production') {
        addendum = ' If you meant to render a collection of children, use an array ' + 'instead or wrap the object using createFragment(object) from the ' + 'React add-ons.';
        if (children._isReactElement) {
          addendum = ' It looks like you\'re using an element created by a different ' + 'version of React. Make sure to use only one copy of React.';
        }
        if (ReactCurrentOwner.current) {
          var name = ReactCurrentOwner.current.getName();
          if (name) {
            addendum += ' Check the render method of `' + name + '`.';
          }
        }
      }
      var childrenString = String(children);
      !false ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : _prodInvariant('31', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : void 0;
    }
  }

  return subtreeCount;
}

/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

module.exports = traverseAllChildren;
}).call(this,require('_process'))
},{"./KeyEscapeUtils":9,"./ReactCurrentOwner":16,"./ReactElement":18,"./getIteratorFn":27,"./reactProdInvariant":29,"_process":47,"fbjs/lib/invariant":3,"fbjs/lib/warning":7}],31:[function(require,module,exports){
'use strict';

module.exports = require('./lib/React');

},{"./lib/React":11}],32:[function(require,module,exports){
"use strict";

/*  =============================================================================
    room.js

    Converts all the components in this file into Javascript
    All the .jsx files are given in views directory
    
    Browserify/Watchify allows the 'require' function to be used on the Client Side.
    
	watchify ./public/browserify/room.js -o ./public/bundles/roomBundle.js -t [ babelify --presets [ es2015 react ] ] --extension=.jsx -v
	browserify ./public/browserify/room.js -o ./public/bundles/roomBundle.js -t [ babelify --presets [ es2015 react ] ] --extension=.jsx -v

    Put this at the bottom of the HTML file. At the beginning of all the scripts in roomIndex.jsx
    <script src="/bundles/roomBundle.js"></script>
    ========================================================================== */
var RoomComponent = require('./../../views/Room.jsx');

// Reads the html of the room-props script, which was injected data from the server side
var propStr = document.getElementById("room-props").innerHTML;
console.log("Props sent from Server in String form");
console.log(propStr);
var props = JSON.parse(propStr);
console.log("Props converted into JSON:");
console.log(props);
ReactDOM.render(React.createElement(RoomComponent, { room: props.room, user: props.user, explore: props.explore, myPlaylists: props.myPlaylists }), document.getElementById('room'));

},{"./../../views/Room.jsx":44}],33:[function(require,module,exports){
"use strict";

var React = require('react');

var UserListEntry = React.createClass({
  displayName: "UserListEntry",

  getInitialState: function getInitialState() {
    return {
      online: this.props.online,
      moderator: this.props.moderator,
      syncing: this.props.syncing
    };
  },
  render: function render() {
    var name = this.props.userName;
    var online = this.state.online;
    var moderator = this.state.moderator;

    return React.createElement(
      "div",
      null,
      React.createElement(
        "li",
        null,
        function () {
          if (online) return React.createElement("i", { className: "fa fa-circle status status-online" });else return React.createElement("i", { className: "fa fa-circle status status-offline" });
        }(),
        React.createElement(
          "a",
          { className: "user-name", href: "javascript:void(0)" },
          name
        ),
        React.createElement(
          "div",
          { className: "users-list-edit" },
          React.createElement(
            "a",
            { className: "icon-btn", href: "javascript:void(0)" },
            React.createElement("i", { className: "fa fa-star fa-fw mod-toggle" })
          ),
          React.createElement(
            "a",
            { className: "icon-btn", "data-toggle": "modal", "data-target": "#kick-confirm", href: "javascript:void(0)" },
            React.createElement("i", { className: "fa fa-remove fa-fw" })
          )
        )
      )
    );
  }
});

var UserList = React.createClass({
  displayName: "UserList",

  render: function render() {

    // var onlineUsers = [
    //   "Gerard Liu",
    //   "Randy Truong",
    //   "Kevin Chiao",
    //   "Harrison Ford"
    // ];

    // var offlineUsers = [
    //   "Minnal Kunnan",
    //   "Jason Maryne",
    //   "Eric Dieu",
    //   "Kevin Ton",
    //   "Kris Luong",
    //   "Franky Nguyen",
    //   "Adrian Mandee",
    //   "Jay Yee",
    //   "George Huang",
    //   "Jelly Kid",
    //   "Finn Human"
    // ];

    var onlineUserEntries = [];
    var offlineUserEntries = [];

    for (var i in this.props.userList) {
      onlineUserEntries.push(React.createElement(UserListEntry, { key: i, userName: this.props.userList[i], online: true }));
    }

    // for(var i = 0; i < this.state.userList.length; i++) {
    //   onlineUserEntries.push(<UserListEntry key={i} userName={onlineUsers[i]} online={true}/>)
    // }
    // for(var i = 0; i < offlineUsers.length; i++) {
    //   offlineUserEntries.push(<UserListEntry key={i} userName={offlineUsers[i]} online={false}/>)
    // }

    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { id: "users-list-container" },
        React.createElement(
          "div",
          { className: "users-list-container" },
          React.createElement(
            "div",
            { className: "users-list-header users-online-section" },
            "Members",
            React.createElement(
              "button",
              { type: "button", className: "btn btn-sm btn-secondary users-list-edit-btn" },
              React.createElement("i", { className: "fa fa-gear", id: "users-list-gear-icon" })
            )
          ),
          React.createElement(
            "div",
            { className: "users-list-scroll-container" },
            React.createElement(
              "ul",
              { className: "users-list" },
              onlineUserEntries
            ),
            React.createElement(
              "ul",
              { className: "users-list users-list-section users-offline-section" },
              offlineUserEntries
            )
          ),
          React.createElement(
            "div",
            { className: "users-list users-list-section users-list-add" },
            React.createElement(
              "button",
              { type: "button", className: "btn btn-sm btn-secondary", "data-toggle": "modal", "data-target": "#add-user" },
              React.createElement("i", { className: "fa fa-plus fa-fw" }),
              "Add People"
            )
          )
        )
      )
    );
  }
});

var ChatHeader = React.createClass({
  displayName: "ChatHeader",

  getInitialState: function getInitialState() {
    return {
      userList: {}
    };
  },

  componentDidMount: function componentDidMount() {
    socket.on("From Server: Edit User list", this.editUserList);
  },

  editUserList: function editUserList(newUserList) {
    this.setState({ userList: newUserList });
  },

  render: function render() {
    var roomName = "";
    if (this.props.room !== undefined && this.props.room !== null) {
      roomName = this.props.room.name;
    }

    return React.createElement(
      "div",
      { className: "room-header" },
      React.createElement(
        "div",
        { className: "room-name" },
        roomName
      ),
      React.createElement(
        "div",
        { className: "users-btn" },
        Object.keys(this.state.userList).length,
        React.createElement("i", { className: "fa fa-users users-btn-icon" }),
        React.createElement("i", { className: "fa fa-circle status status-online" })
      ),
      React.createElement(UserList, { userList: this.state.userList })
    );
  }
});

var ChatMessage = React.createClass({
  displayName: "ChatMessage",

  getInitialState: function getInitialState() {
    return {
      owner: this.props.owner,
      message: this.props.message,
      username: this.props.username
    };
  },

  componentDidMount: function componentDidMount() {
    $(this.msg).tooltip();
  },


  render: function render() {
    var _this = this;

    return React.createElement(
      "div",
      null,
      function () {
        if (_this.state.owner) {
          return React.createElement(
            "div",
            { className: "chat-msg-user" },
            React.createElement(
              "div",
              { className: "msg", ref: function ref(_ref) {
                  return _this.msg = _ref;
                }, "data-toggle": "tooltip", "data-placement": "left", title: "4:20pm" },
              _this.state.message
            )
          );
        } else {
          return React.createElement(
            "div",
            { className: "chat-msg" },
            React.createElement(
              "div",
              { className: "name" },
              _this.state.username
            ),
            React.createElement(
              "div",
              { className: "msg", ref: function ref(_ref2) {
                  return _this.msg = _ref2;
                }, "data-toggle": "tooltip", "data-placement": "right", title: "4:20pm" },
              _this.state.message
            ),
            React.createElement("img", { className: "profile-pic", src: "images/profile-pic.png" })
          );
        }
      }()
    );
  }
});

var ChatUserActivityMessage = React.createClass({
  displayName: "ChatUserActivityMessage",

  render: function render() {
    var _this2 = this;

    return React.createElement(
      "div",
      null,
      function () {
        switch (_this2.props.activity) {
          case "joined":
            return React.createElement(
              "div",
              { className: "chat-notif" },
              _this2.props.username,
              " has joined the chat."
            );
            break;
          case "disconnected":
            return React.createElement(
              "div",
              { className: "chat-notif" },
              _this2.props.username,
              " has left the chat."
            );
            break;
        }
      }()
    );
  }
});

var ChatDisplay = React.createClass({
  displayName: "ChatDisplay",

  getInitialState: function getInitialState() {
    return {
      messages: []
    };
  },
  autoscroll: true,
  scrollToBottom: function scrollToBottom() {
    // this.chat.scrollTop = this.chat.scrollHeight;
    $.getScript("js/jquery.mCustomScrollbar.concat.min.js", function () {
      $('.chat').mCustomScrollbar('scrollTo', 'bottom', { scrollInertia: 200 });
    });
  },
  userHasJoined: function userHasJoined(user) {
    var messages = this.state.messages;
    messages.push(React.createElement(ChatUserActivityMessage, { key: this.state.messages.length, username: user.username, activity: "joined" }));
    this.setState({
      messages: messages
    });
  },
  userHasDisconnected: function userHasDisconnected(user) {
    var messages = this.state.messages;
    messages.push(React.createElement(ChatUserActivityMessage, { key: this.state.messages.length, username: user.username, activity: "disconnected" }));
    this.setState({
      messages: messages
    });
  },
  newMessage: function newMessage(msg) {
    var isOwner = this.props.username === msg.username;
    var messages = this.state.messages;
    messages.push(React.createElement(ChatMessage, { key: this.state.messages.length, username: msg.username, owner: isOwner, message: msg.message }));
    this.setState({
      messages: messages
    });
  },
  componentDidMount: function componentDidMount() {
    socket.on("From Server: User joined", this.userHasJoined);
    socket.on('From Server: User disconnected', this.userHasDisconnected);
    socket.on('From Server: Chat message', this.newMessage);

    this.scrollToBottom();
  },
  componentWillUpdate: function componentWillUpdate() {
    var isAtRecentMessages = this.chat.scrollTop == this.chat.scrollHeight - this.chat.clientHeight;
    if (isAtRecentMessages) {
      this.autoscroll = true;
    } else {
      this.autoscroll = false;
    }
  },
  componentDidUpdate: function componentDidUpdate() {
    if (this.autoscroll) {
      this.scrollToBottom();
    }
  },
  render: function render() {
    var _this3 = this;

    return React.createElement(
      "div",
      { className: "chat", ref: function ref(_ref3) {
          return _this3.chat = _ref3;
        } },
      React.createElement(
        "div",
        null,
        this.state.messages
      )
    );
  }
});

var ChatInput = React.createClass({
  displayName: "ChatInput",

  getInitialState: function getInitialState() {
    return {
      message: ""
    };
  },
  ifUsernameExists: function ifUsernameExists() {
    if (!this.props.username || 0 === this.state.username.length) {
      return false;
    }
    return true;
  },
  updateMessage: function updateMessage(e) {
    this.setState({
      message: e.target.value
    });
  },
  clearMessage: function clearMessage() {
    this.setState({
      message: ""
    });
  },
  sendMessage: function sendMessage(e) {
    e.preventDefault();

    // TODO Do message input string checks
    // No empty string, no white spaces, Valid characters a-z, A-Z, 0-9
    // Client emits to server with Chat Message
    socket.emit('From Client: Chat message', this.state.message);
    this.clearMessage();
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "chat-input-container" },
      React.createElement(
        "form",
        { className: "chat-input", id: "chat-form", action: "", onSubmit: this.sendMessage },
        React.createElement("input", { id: "m", value: this.state.message, onChange: this.updateMessage, autoComplete: "off", type: "text", className: "chat-textbox", name: "", placeholder: "Type a message..." })
      )
    );
  }
});

var GuestUserForm = React.createClass({
  displayName: "GuestUserForm",

  getInitialState: function getInitialState() {
    return {
      username: ""
    };
  },
  updateUsername: function updateUsername(e) {
    this.setState({
      username: e.target.value
    });
  },
  submitUsername: function submitUsername(e) {
    e.preventDefault();
    this.props.setUsernameCallback(this.state.username);

    // TODO Do username input string checks
    // No empty string, no white spaces, Valid characters a-z, A-Z, 0-9
    // Client emits to server with Add user
    socket.emit('From Client: Add user', this.state.username);
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "modal fade", id: "enter-name", tabIndex: "-1", role: "dialog", "aria-labelledby": "myModalLabel" },
      React.createElement(
        "div",
        { className: "modal-dialog modal-sm", role: "document" },
        React.createElement(
          "div",
          { className: "modal-content" },
          React.createElement(
            "div",
            { className: "modal-body" },
            React.createElement(
              "form",
              { className: "search-input", id: "username-form", action: "", onSubmit: this.submitUsername },
              React.createElement("input", { value: this.state.username, onChange: this.updateUsername, autoComplete: "off", type: "text", className: "chat-textbox", name: "", placeholder: "Enter Your Name", autoFocus: true })
            )
          )
        )
      )
    );
  }
});

/* Chatbox */
var Chatbox = React.createClass({
  displayName: "Chatbox",

  getInitialState: function getInitialState() {
    if (this.props.user === undefined || this.props.user === null) {
      return {
        username: ""
      };
    } else {
      return {
        username: this.props.user.local.firstName + " " + this.props.user.local.lastName
      };
    }
  },
  setUsername: function setUsername(username) {
    this.setState({
      username: username
    });
  },
  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(ChatHeader, { room: this.props.room }),
      React.createElement(ChatDisplay, { username: this.state.username }),
      React.createElement(ChatInput, { username: this.state.username })
    );
  }
});

module.exports = Chatbox;

},{"react":31}],34:[function(require,module,exports){
"use strict";

/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    VIEW: Explore.jsx

    Showcases different public playlists that are currently trending
    ========================================================================== */

/*  =============================================================================
    Components

    Explore - The Explore tab
    ========================================================================== */
var React = require('react');

var Explore = React.createClass({
  displayName: "Explore",

  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "col-padding" },
        React.createElement(
          "div",
          { className: "placeholder" },
          React.createElement(
            "div",
            { className: "placeholder-content" },
            React.createElement("i", { className: "fa fa-rocket placeholder-icon" }),
            React.createElement("br", null),
            React.createElement(
              "span",
              null,
              "This page is still being made"
            )
          )
        )
      ),
      React.createElement("div", { className: "explore-container" })
    );
  }
});

module.exports = Explore;

},{"react":31}],35:[function(require,module,exports){
"use strict";

var React = require('react');

var Footer = React.createClass({
  displayName: "Footer",

  render: function render() {
    return React.createElement(
      "footer",
      { className: "footer" },
      React.createElement(
        "div",
        { className: "footer-content" },
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-sm-7 col-xs-5" },
            React.createElement(
              "div",
              { className: "copyright" },
              "Apple Tea © 2016"
            )
          ),
          React.createElement(
            "div",
            { className: "col-sm-5 col-xs-7" },
            React.createElement(
              "p",
              null,
              React.createElement(
                "b",
                null,
                "Apple Tea"
              ),
              " is one of many exciting projects we're working on. If you want to support our development and help keep Apple Tea servers running, you can send us a donation. We'll love you for it. ",
              React.createElement("i", { className: "fa fa-heart" })
            ),
            React.createElement(
              "button",
              { type: "button", className: "btn btn-teal-hover" },
              "Donate"
            )
          )
        )
      )
    );
  }
});

module.exports = Footer;

},{"react":31}],36:[function(require,module,exports){
"use strict";

var React = require('react');

/* User Profile Picture Icon */
var HeaderProfileIcon = React.createClass({
  displayName: "HeaderProfileIcon",

  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "a",
        { className: "dropdown-toggle", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false", href: "javascript:void(0)" },
        React.createElement("img", { className: "profile-pic", src: "images/profile-pic.png" })
      ),
      React.createElement(
        "ul",
        { className: "dropdown-menu dropdown-menu-right" },
        React.createElement(
          "li",
          { className: "dropdown-header" },
          this.props.user.local.firstName,
          " ",
          this.props.user.local.lastName,
          " (",
          this.props.user.local.email,
          ")"
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { href: "javascript:void(0)" },
            "Profile"
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { href: "javascript:void(0)" },
            "My Rooms"
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { href: "javascript:void(0)" },
            "My Playlists"
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { href: "javascript:void(0)" },
            "Account Settings"
          )
        ),
        React.createElement("li", { role: "separator", className: "divider" }),
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { href: "/logout" },
            "Sign Out"
          )
        )
      )
    );
  }
});

/* Sign Up and Sign In Buttons */
var SignUpSignInButtons = React.createClass({
  displayName: "SignUpSignInButtons",

  render: function render() {
    return React.createElement(
      "div",
      { className: "header-btn-group" },
      React.createElement(
        "button",
        { className: "btn btn-primary btn-margin", "data-toggle": "modal", "data-target": "#signup" },
        "Sign Up"
      ),
      React.createElement(SignUpModal, null),
      React.createElement(
        "button",
        { className: "btn btn-secondary btn-margin dropdown-toggle", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false" },
        "Sign In"
      ),
      React.createElement(SignInDropdown, null)
    );
  }
});

/* Sign Up Modal Popup */
var SignUpModal = React.createClass({
  displayName: "SignUpModal",

  // TODO: Implement onSubmit (Check if valid inputs if valid email)
  onSubmit: function onSubmit(e) {
    console.log("Submitting sign up");
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "modal fade", id: "signup", tabIndex: "-1", role: "dialog", "aria-labelledby": "myModalLabel" },
      React.createElement(
        "div",
        { className: "modal-dialog modal-sm", role: "document" },
        React.createElement(
          "div",
          { className: "modal-content" },
          React.createElement(
            "div",
            { className: "modal-body" },
            React.createElement(
              "div",
              { className: "row row-sm" },
              React.createElement(
                "div",
                { className: "col-xs-12 col-padding-sm" },
                React.createElement(
                  "button",
                  { className: "btn btn-facebook btn-full-width", "data-dismiss": "modal" },
                  React.createElement("i", { className: "fa fa-facebook icon-padding icon-position-left" }),
                  "Sign In with Facebook"
                )
              ),
              React.createElement(
                "div",
                { className: "col-xs-12 col-padding-sm" },
                React.createElement(
                  "button",
                  { className: "btn btn-twitter btn-full-width", "data-dismiss": "modal" },
                  React.createElement("i", { className: "fa fa-twitter icon-padding icon-position-left" }),
                  "Sign In with Twitter"
                )
              ),
              React.createElement(
                "div",
                { className: "col-xs-12 col-padding-sm" },
                React.createElement(
                  "button",
                  { className: "btn btn-google btn-full-width", "data-dismiss": "modal" },
                  React.createElement("i", { className: "fa fa-google-plus icon-padding icon-position-left" }),
                  "Sign in with Google"
                )
              )
            )
          ),
          React.createElement(
            "div",
            { className: "modal-body section-border signup-form-container" },
            React.createElement(
              "div",
              { className: "or-divider" },
              React.createElement(
                "span",
                null,
                "OR SIGN UP"
              )
            ),
            React.createElement(
              "div",
              { className: "search-container" },
              React.createElement(
                "form",
                { className: "search-input search-input-sm", action: "/signup", method: "post", onSubmit: this.onSubmit },
                React.createElement("input", { type: "text", id: "sign-up-first-name", className: "input-padding-sm", placeholder: "First Name", name: "firstName" }),
                React.createElement("input", { type: "text", id: "sign-up-last-name", className: "input-padding-sm", placeholder: "Last Name", name: "lastName" }),
                React.createElement("input", { type: "text", className: "input-padding-sm", placeholder: "Email", name: "email" }),
                React.createElement("input", { type: "password", className: "input-padding-sm", placeholder: "Password", name: "password" }),
                React.createElement(
                  "button",
                  { className: "btn btn-primary btn-full-width", type: "submit" },
                  "Sign Up"
                )
              )
            )
          )
        )
      )
    );
  }
});

/* Sign In Dropdown */
var SignInDropdown = React.createClass({
  displayName: "SignInDropdown",

  // TODO: Implement onSubmit (Check if valid inputs if valid email)
  onSubmit: function onSubmit() {
    console.log("Submitting sign up");
  },

  render: function render() {
    return React.createElement(
      "ul",
      { className: "dropdown-menu dropdown-menu-right signin-container", id: "signin-form" },
      React.createElement(
        "div",
        { className: "signin-content" },
        React.createElement(
          "form",
          { className: "search-input search-input-sm", action: "/signin", method: "post", onSubmit: this.onSubmit },
          React.createElement("input", { type: "text", className: "input-padding-sm", placeholder: "Email", name: "email" }),
          React.createElement("input", { type: "password", className: "input-padding-sm", placeholder: "Password", name: "password" }),
          React.createElement(
            "button",
            { className: "btn btn-primary btn-full-width", type: "submit" },
            "Sign In"
          )
        ),
        React.createElement(
          "a",
          { className: "forgot-pw link-grey-lite", href: "javascript:void(0)" },
          "Forgot password?"
        )
      ),
      React.createElement(
        "div",
        { className: "signin-content section-border signin-icons-container" },
        React.createElement(
          "div",
          { className: "or-divider" },
          React.createElement(
            "span",
            null,
            "OR SIGN IN WITH"
          )
        ),
        React.createElement(
          "div",
          { className: "row row-xs" },
          React.createElement(
            "div",
            { className: "col-xs-4 col-padding-xs" },
            React.createElement(
              "button",
              { className: "btn btn-facebook btn-full-width" },
              React.createElement("i", { className: "fa fa-facebook" })
            )
          ),
          React.createElement(
            "div",
            { className: "col-xs-4 col-padding-xs" },
            React.createElement(
              "button",
              { className: "btn btn-twitter btn-full-width" },
              React.createElement("i", { className: "fa fa-twitter" })
            )
          ),
          React.createElement(
            "div",
            { className: "col-xs-4 col-padding-xs" },
            React.createElement(
              "button",
              { className: "btn btn-google btn-full-width" },
              React.createElement("i", { className: "fa fa-google-plus" })
            )
          )
        )
      )
    );
  }
});

var Header = React.createClass({
  displayName: "Header",

  render: function render() {
    var headerIcons = [];

    // TODO: If users are logged in, switch icons
    // if (this.props.user === undefined || this.props.user === null) {
    if (this.props.user !== undefined && this.props.user !== null) {
      headerIcons.push(React.createElement(HeaderProfileIcon, { key: 'HeaderProfileIcon', user: this.props.user }));
    } else {
      headerIcons.push(React.createElement(SignUpSignInButtons, { key: 'SignUpSignInButtons' }));
    };

    return React.createElement(
      "div",
      { className: "header" },
      React.createElement(
        "div",
        { className: "header-content-container row" },
        React.createElement(
          "div",
          { className: "col-sm-6" },
          React.createElement(
            "a",
            { href: "/" },
            React.createElement("img", { className: "header-logo", src: "images/logo.png" })
          )
        ),
        React.createElement(
          "div",
          { className: "col-sm-6 header-section" },
          React.createElement(
            "div",
            { className: "header-icon-container" },
            headerIcons
          )
        )
      )
    );
  }
});

module.exports = Header;

},{"react":31}],37:[function(require,module,exports){
'use strict';

/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    Main-Component MediaEntry

    A component for each individal media entry. Each media entry has a thumbnail and title.
    Each Entry has a category type to see where the media entry would belong as well as a
    media type which is either Youtube, Soundcloud, or Vimeo. Each component
    determines the class name for the divs by checking the category types from the given properties
    of the parent components (Either from Search or Queue).

    @Components:  Thumbnail
                  Title
                  Duration
                  MediaEntry

    @Exports:     MediaEntry
    ========================================================================== */
var React = require('react');
var ModalCreatePlaylist = require('./ModalCreatePlaylist');

// Thumbnail of the media
var Thumbnail = React.createClass({
  displayName: 'Thumbnail',

  render: function render() {
    var categoryDivName;
    var categoryClassName;
    switch (this.props.categoryType) {
      case CATEGORYOFMEDIA.QUEUE:
        categoryClassName = 'media-img';
        break;
      case CATEGORYOFMEDIA.SEARCH:
        categoryClassName = 'search-media-img';
        break;
      default:
        // ERROR, No Category type
        break;
    }

    return React.createElement('img', { className: categoryClassName, src: this.props.thumbnail });
  }
});

// Media's title component
var Title = React.createClass({
  displayName: 'Title',

  render: function render() {
    var categoryDivName;
    var categoryClassName;
    switch (this.props.categoryType) {
      case CATEGORYOFMEDIA.QUEUE:
        categoryClassName = 'media-title ellipses';
        break;
      case CATEGORYOFMEDIA.SEARCH:
        categoryClassName = 'search-media-title ellipses';
        break;
      default:
        // ERROR, No Category type
        break;
    }

    return React.createElement(
      'div',
      { className: categoryClassName },
      this.props.title
    );
  }
});

// Media's artist component
var Artist = React.createClass({
  displayName: 'Artist',

  render: function render() {
    var categoryDivName;
    var categoryClassName;
    switch (this.props.categoryType) {
      case CATEGORYOFMEDIA.QUEUE:
        categoryClassName = 'media-artist ellipses';
        break;
      case CATEGORYOFMEDIA.SEARCH:
        categoryClassName = 'search-media-artist ellipses';
        break;
      default:
        // ERROR, No Category type
        break;
    }

    return React.createElement(
      'div',
      { className: categoryClassName },
      this.props.artist
    );
  }
});

// Media's type component
var Type = React.createClass({
  displayName: 'Type',

  render: function render() {
    var categoryClassName;
    var mediaTypeIcon;
    switch (this.props.categoryType) {
      case MEDIATYPES.QUEUE:
        categoryClassName = 'media-type';
        break;
      case CATEGORYOFMEDIA.SEARCH:
        categoryClassName = 'search-media-type';
        break;
      default:
        // ERROR, No Category type
        break;
    }

    switch (this.props.type) {
      case MEDIATYPES.YOUTUBE:
        mediaTypeIcon = 'fa fa-youtube-play';
        break;
      case MEDIATYPES.SOUNDCLOUD:
        mediaTypeIcon = 'fa fa-soundcloud';
        break;
      case MEDIATYPES.VIMEO:
        mediaTypeIcon = 'fa fa-vimeo';
        break;
      default:
        // ERROR, No media type
        break;
    }

    return React.createElement(
      'div',
      { className: categoryClassName },
      React.createElement('i', { className: mediaTypeIcon })
    );
  }
});

// TODO: TBD if durations need to be implemented or not
// Media's Duration component
var Duration = React.createClass({
  displayName: 'Duration',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'media-duration' },
      this.props.duration
    );
  }
});

// Each individual playlist entry in the dropdown list
var PlaylistEntry = React.createClass({
  displayName: 'PlaylistEntry',

  addToPlaylist: function addToPlaylist() {
    console.log("Adding to existing playlist");
    console.log(this.props.playlist._id);
    console.log(this.props.data);
    socket.emit('From Client: Add to existing playlist', {
      mediaData: this.props.data,
      id: this.props.playlist._id,
      firstEntry: this.props.playlist.mediaEntries[0]
    });
  },

  render: function render() {
    return React.createElement(
      'li',
      null,
      React.createElement(
        'a',
        { href: 'javascript:void(0)', onClick: this.addToPlaylist },
        this.props.playlist.name
      )
    );
  }
});

// Each dropdown for every media entry
var PlaylistDropdown = React.createClass({
  displayName: 'PlaylistDropdown',

  addToNewPlaylist: function addToNewPlaylist() {
    console.log("Creating new playlist with media");
  },

  render: function render() {
    var playlistEntries = [];
    var modalId = "#create-playlist-" + this.props.pos;

    if (this.props.myPlaylists !== undefined && this.props.myPlaylists !== null) {
      // Sets the playlists in the dropdown
      for (var i = 0; i < this.props.myPlaylists.length; ++i) {
        playlistEntries.push(React.createElement(PlaylistEntry, { key: i, data: this.props.data, playlist: this.props.myPlaylists[i] }));
      }
    }

    return React.createElement(
      'ul',
      { className: 'dropdown-menu dropdown-menu-right' },
      React.createElement(
        'li',
        { className: 'dropdown-header' },
        'Add To'
      ),
      playlistEntries,
      React.createElement('li', { role: 'separator', className: 'divider' }),
      React.createElement(
        'li',
        null,
        React.createElement(
          'a',
          { 'data-toggle': 'modal', 'data-target': modalId, onClick: this.addToNewPlaylist },
          'Add to New Playlist'
        )
      )
    );
  }
});

// MAIN COMPONENT: Each individual media entry in the list
var MediaEntry = React.createClass({
  displayName: 'MediaEntry',

  // EVENT HANDLER: When the add to queue button is clicked, adds the media to the queue.
  addToQueue: function addToQueue() {
    var mediaEntry = {
      mediaId: this.props.mediaId,
      mediaType: this.props.mediaType,
      thumbnail: this.props.thumbnail,
      title: this.props.title,
      artist: this.props.artist,
      ifMediaCardAdded: true
    };
    socket.emit('From Client: Push into queue', mediaEntry);
  },

  // EVENT HANDLER: When the play button is clicked, plays the media entry onto the media player
  playMediaEntry: function playMediaEntry() {
    if (this.props.categoryType == CATEGORYOFMEDIA.SEARCH) {
      var mediaEntry = {
        mediaId: this.props.mediaId,
        mediaType: this.props.mediaType,
        thumbnail: this.props.thumbnail,
        title: this.props.title,
        artist: this.props.artist,
        ifMediaCardAdded: true
      };
      socket.emit('From Client: Play new media entry', mediaEntry);
    } else if (this.props.categoryType == CATEGORYOFMEDIA.QUEUE) {
      var queueEntry = {
        mediaId: this.props.mediaId,
        mediaType: this.props.mediaType,
        thumbnail: this.props.thumbnail,
        title: this.props.title,
        artist: this.props.artist,
        ifMediaCardAdded: true,
        posInQueue: this.props.pos
      };
      socket.emit('From Client: Play new media entry from queue', queueEntry);
    }
  },

  // EVENT HANDLER: When the delete button is clicked, removes the media entry from queue
  deleteMediaEntry: function deleteMediaEntry() {
    console.log("Delete Media Entry from Queue");
    var mediaEntry = {
      mediaId: this.props.mediaId,
      mediaType: this.props.mediaType,
      thumbnail: this.props.thumbnail,
      title: this.props.title,
      artist: this.props.artist,
      ifMediaCardAdded: true,
      posInQueue: this.props.pos
    };
    socket.emit('From Client: Delete media entry from queue', mediaEntry);
  },

  // EVENT HANDLER: Moves media entry to the front of the queue as a play next media
  moveToFrontOfTheQueue: function moveToFrontOfTheQueue() {
    var mediaEntry = {
      mediaId: this.props.mediaId,
      mediaType: this.props.mediaType,
      thumbnail: this.props.thumbnail,
      title: this.props.title,
      artist: this.props.artist,
      ifMediaCardAdded: true,
      posInQueue: this.props.pos
    };
    socket.emit('From Client: Move media entry to front of queue', mediaEntry);
  },

  componentDidMount: function componentDidMount() {
    $(this.icon1).tooltip();
    $(this.icon2).tooltip();
    $(this.icon3).tooltip();
  },


  render: function render() {
    var _this = this;

    var categoryDivName;
    var categoryClassName;

    // Renders the Media entry to the correct category.
    switch (this.props.categoryType) {
      // Media Entry that is in the Queue component
      case CATEGORYOFMEDIA.QUEUE:
        var queueMediaEntryId = "-queue-media-entry-id";
        var queueMediaCardClassName = "media-card grabbable";
        var iconClassName = "icon-btn";
        var deleteButton = [];

        // Adds the media-card-added class if the media entry was added individually
        if (this.props.ifMediaCardAdded == true) {
          queueMediaCardClassName += " media-card-added";
          iconClassName += "-blue-lite";
          deleteButton.push(React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              { className: 'media-card-added-corner-container' },
              React.createElement('div', { className: 'media-card-added-corner' })
            ),
            React.createElement(
              'a',
              { className: 'media-card-added-plus icon-btn-white', href: 'javascript:void(0)', onClick: this.deleteMediaEntry },
              '+'
            )
          ));
        }

        // If in the front of the queue, renders a media entry that would play next
        if (this.props.pos === PLAYNEXTMEDIAENTRYPOS) {
          return React.createElement(
            'div',
            { id: this.props.pos + queueMediaEntryId, className: queueMediaCardClassName },
            deleteButton,
            React.createElement(Thumbnail, { thumbnail: this.props.thumbnail, categoryType: this.props.categoryType }),
            React.createElement(
              'div',
              { className: 'media-next' },
              'PLAYING NEXT:'
            ),
            React.createElement(
              'div',
              { className: 'number' },
              this.props.pos + 1
            ),
            React.createElement(
              'div',
              { className: 'media-text-container' },
              React.createElement(Title, { title: this.props.title, categoryType: this.props.categoryType }),
              React.createElement(Artist, { artist: this.props.artist, categoryType: this.props.categoryType }),
              React.createElement(
                'div',
                { className: 'media-icon-container' },
                React.createElement('div', { className: 'media-icon' }),
                React.createElement(
                  'a',
                  { className: iconClassName, href: 'javascript:void(0)', onClick: this.playMediaEntry },
                  React.createElement(
                    'div',
                    { className: 'media-icon' },
                    React.createElement('i', { className: 'fa fa-play', 'aria-hidden': 'true' })
                  )
                )
              )
            )
          );
        }

        // Every other media entry in the queue
        return React.createElement(
          'div',
          { id: this.props.pos + queueMediaEntryId, className: queueMediaCardClassName },
          deleteButton,
          React.createElement(Thumbnail, { thumbnail: this.props.thumbnail, categoryType: this.props.categoryType }),
          React.createElement(
            'div',
            { className: 'number' },
            this.props.pos + 1
          ),
          React.createElement(
            'div',
            { className: 'media-text-container' },
            React.createElement(Title, { title: this.props.title, categoryType: this.props.categoryType }),
            React.createElement(Artist, { artist: this.props.artist, categoryType: this.props.categoryType }),
            React.createElement(
              'div',
              { className: 'media-icon-container' },
              React.createElement('div', { className: 'media-icon' }),
              React.createElement(
                'a',
                { className: iconClassName, href: 'javascript:void(0)', onClick: this.moveToFrontOfTheQueue },
                React.createElement(
                  'div',
                  { className: 'media-icon' },
                  React.createElement('i', { className: 'fa fa-chevron-up', 'data-toggle': 'tooltip', title: 'Move to Top', 'aria-hidden': 'true' })
                )
              ),
              React.createElement(
                'a',
                { className: iconClassName, href: 'javascript:void(0)', onClick: this.playMediaEntry },
                React.createElement(
                  'div',
                  { className: 'media-icon' },
                  React.createElement('i', { className: 'fa fa-play', 'data-toggle': 'tooltip', title: 'Play Now', 'aria-hidden': 'true' })
                )
              )
            )
          )
        );
        break;

      // Media Entry in the Search component, also has a button that adds the media entry into the queue
      case CATEGORYOFMEDIA.SEARCH:
        var dropdown = [];
        var searchMediaEntryId = "-search-media-entry-id";
        var mediaData = {
          artist: this.props.artist,
          mediaId: this.props.mediaId,
          mediaType: this.props.mediaType,
          thumbnail: this.props.thumbnail,
          title: this.props.title
          // TODO: The search entry does not have the same db _id. Need to find a way to add media entries without duplicates
          // _id: this.props._id
        };

        // When the user is not logged in, there is no dropdown
        if (this.props.user === undefined || this.props.user === null) {
          dropdown = [];
        }
        // If a user is logged in, the dropdown appears
        else {
            dropdown.push(React.createElement(
              'div',
              { key: this.props.pos, className: 'search-media-icon' },
              React.createElement(
                'a',
                { className: 'icon-btn dropdown-toggle', 'data-toggle': 'dropdown', 'aria-haspopup': 'true', 'aria-expanded': 'false', href: 'javascript:void(0)' },
                React.createElement('i', { className: 'fa fa-list-ul', ref: function ref(_ref) {
                    return _this.icon3 = _ref;
                  }, 'data-toggle': 'tooltip', title: 'Add to Playlist', 'aria-hidden': 'true' })
              ),
              React.createElement(PlaylistDropdown, { myPlaylists: this.props.myPlaylists, data: mediaData, pos: this.props.pos })
            ));
          }

        return React.createElement(
          'div',
          { id: this.props.pos + searchMediaEntryId, className: "search-card-padding" },
          React.createElement(
            'div',
            { className: 'search-media-card' },
            React.createElement(Thumbnail, { thumbnail: this.props.thumbnail, categoryType: this.props.categoryType }),
            React.createElement(
              'div',
              { className: 'search-media-text-container' },
              React.createElement(Title, { title: this.props.title, categoryType: this.props.categoryType }),
              React.createElement(Artist, { artist: this.props.artist, categoryType: this.props.categoryType }),
              React.createElement(Type, { type: this.props.mediaType, categoryType: this.props.categoryType })
            ),
            React.createElement(
              'div',
              { className: 'search-media-icon-container' },
              React.createElement(
                'div',
                { className: 'search-media-icon' },
                React.createElement(
                  'a',
                  { id: "media-entry-button-" + this.props.pos, className: 'icon-btn', href: 'javascript:void(0)', onClick: this.addToQueue },
                  React.createElement('i', { className: 'fa fa-plus fa-lg', ref: function ref(_ref2) {
                      return _this.icon1 = _ref2;
                    }, 'data-toggle': 'tooltip', title: 'Add to Queue' })
                )
              ),
              React.createElement(
                'div',
                { className: 'search-media-icon' },
                React.createElement(
                  'a',
                  { className: 'icon-btn', href: 'javascript:void(0)', onClick: this.playMediaEntry },
                  React.createElement('i', { className: 'fa fa-play', ref: function ref(_ref3) {
                      return _this.icon2 = _ref3;
                    }, 'data-toggle': 'tooltip', title: 'Play Now' })
                )
              ),
              dropdown
            )
          ),
          React.createElement(ModalCreatePlaylist, {
            key: this.props.pos,
            user: this.props.user,
            data: mediaData,
            pos: this.props.pos })
        );
        break;

      // ERROR, No Category type
      default:
        console.log('Media Category Error: NO TYPE');
        return;
        break;
    }
  }
});

module.exports = MediaEntry;

},{"./ModalCreatePlaylist":39,"react":31}],38:[function(require,module,exports){
'use strict';

/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    MediaPlayer.jsx

    Component of the media player. Contains the status bar and the media player
    ========================================================================== */

/*  =============================================================================
    Main Component MediaPlayer

    @Component: 
      StatusBar -

      MediaPlayer - The entire media player containing subcomponents of the play,
                    pause, and status bar.

    @Export: MediaPlayer
    ========================================================================== */
var React = require('react');
var StatusBar = require('./StatusBar');

var MEDIAPLACEHOLDERSTATES = {
  ACTIVE: 'ACTIVE',
  NONE: 'NONE',
  READY: 'READY',
  LOADING: 'LOADING',
  SYNCING: 'SYNCING'
};

/*  =============================================================================
    Function initializeYoutubeIFrame

    Plays the media with the given media type
    ========================================================================== */
function playMediaByMediaType(mediaData) {
  switch (mediaData.mediaType) {
    case MEDIATYPES.YOUTUBE:
      youtubePlayVideo(mediaData);
      break;
    case MEDIATYPES.SOUNDCLOUD:
      // TODO: Play Soundcloud
      break;
    case MEDIATYPES.VIMEO:
      // TODO: Play Vimeo
      break;
    case MEDIATYPES.NONE:
      // Remove the players
      break;
    default:
      // ERROR
      console.log("ERROR: No media type");
      break;
  }
}

/*  =============================================================================
    Function pauseMediaByMediaType

    Pauses the media with the given media type
    ========================================================================== */
function pauseMediaByMediaType(mediaData) {
  switch (mediaData.mediaType) {
    case MEDIATYPES.YOUTUBE:
      youtubePauseVideo(mediaData);
      break;
    case MEDIATYPES.SOUNDCLOUD:
      // TODO: Pause Soundcloud
      break;
    case MEDIATYPES.VIMEO:
      // TODO: Pause Vimeo
      break;
    case MEDIATYPES.NONE:
      // Remove the players
      break;
    default:
      // ERROR
      console.log("ERROR: No media type");
      break;
  }
}

/* Placeholder for when no media is loaded */
var VideoPlaceholder = React.createClass({
  displayName: 'VideoPlaceholder',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'placeholder placeholder-video' },
      React.createElement(
        'div',
        { className: 'placeholder-content' },
        React.createElement('i', { className: 'fa fa-moon-o placeholder-icon' }),
        React.createElement('br', null),
        React.createElement(
          'span',
          null,
          'You don’t have any videos'
        )
      )
    );
  }
});

/* Placeholder for when media is loaded into queue but not played */
var VideoReady = React.createClass({
  displayName: 'VideoReady',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'placeholder placeholder-video' },
      React.createElement(
        'div',
        { className: 'placeholder-content' },
        React.createElement('i', { className: 'fa fa-play placeholder-icon' }),
        React.createElement('br', null),
        React.createElement(
          'span',
          null,
          'Play your queue'
        )
      )
    );
  }
});

/* Placeholder for when video is loading */
var VideoLoading = React.createClass({
  displayName: 'VideoLoading',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'placeholder placeholder-video' },
      React.createElement(
        'div',
        { className: 'placeholder-content' },
        React.createElement('i', { className: 'fa fa-circle-o-notch fa-spin placeholder-icon' }),
        React.createElement('br', null),
        React.createElement(
          'span',
          null,
          'Loading'
        )
      )
    );
  }
});

/* Placeholder for when video is syncing */
var VideoSyncing = React.createClass({
  displayName: 'VideoSyncing',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'placeholder placeholder-video' },
      React.createElement(
        'div',
        { className: 'placeholder-content' },
        React.createElement('i', { className: 'fa fa-refresh fa-spin placeholder-icon' }),
        React.createElement('br', null),
        React.createElement(
          'span',
          null,
          'Syncing'
        )
      )
    );
  }
});

/* Media player */
var MediaPlayer = React.createClass({
  displayName: 'MediaPlayer',

  getInitialState: function getInitialState() {
    return {
      mediaState: 'NONE',
      mediaType: 'NONE',
      localState: 'NONE'
    };
  },

  componentDidMount: function componentDidMount() {
    // Sets up event handlers for when socket sends from server to client
    socket.on('From Server: Initialize media player', this.initializeMedia);
    socket.on('From Server: Send media player states', this.sendMediaPlayerStates);
    socket.on('From Server: Get elapsed time for specific client', this.getElapsedTimeForSpecificClient);
    socket.on('From Server: Load media entry', this.loadMedia);
    socket.on('From Server: Play media', this.playMedia);
    socket.on('From Server: Pause media', this.pauseMedia);
    socket.on('From Server: Change media player to none', this.changeMediaPlayerToNone);
  },

  // EVENT HANDLER: Initializes the media with with the data sent from the server
  initializeMedia: function initializeMedia(mediaData) {
    console.log("Initializing Media");

    this.setState({ mediaType: mediaData.mediaType }, function () {
      initializeYoutubeIFrame(mediaData);

      // TODO: Initialize Soundcloud
      // initializeSoundcloudPlayer(mediaData);  

      // TODO: Initialize Vimeo
      // initializeVimeoPlayer(mediaData);  
    });
  },

  // EVENT HANDLER: Sends the state of the media players
  sendMediaPlayerStates: function sendMediaPlayerStates(mediaData) {
    console.log("sendMediaPlayerState");
    this.setState({ localState: MEDIAPLACEHOLDERSTATES.ACTIVE });
    this.setState({ mediaState: mediaData.state }, function () {
      switch (this.state.mediaState) {
        case MEDIAPLAYERSTATES.PLAYING:
          playMediaByMediaType(mediaData);
          break;
        case MEDIAPLAYERSTATES.PAUSED:
          pauseMediaByMediaType(mediaData);
          break;
        case MEDIAPLAYERSTATES.NONE:
          // EMPTY
          break;
        default:
          // ERROR
          console.log("ERROR: No media state");
          break;
      }
    });
  },

  // EVENT HANDLER: When a client requests the time, gets all the elapsed times of every other client and sends it back to the original client.
  getElapsedTimeForSpecificClient: function getElapsedTimeForSpecificClient(clientId) {
    var mediaCurrentTimeElapsed = youtubeGetCurrentTime();

    socket.emit('From Client: Send elapsed time to specific client', {
      clientId: clientId,
      clientCurrentTime: mediaCurrentTimeElapsed
    });
  },

  // EVENT HANDLER: Loads the specified media player
  loadMedia: function loadMedia(mediaData) {
    this.setState({ mediaType: mediaData.mediaType }, function () {
      switch (this.state.mediaType) {
        case MEDIATYPES.YOUTUBE:
          youtubeLoadVideo(mediaData);
          this.setState({ localState: MEDIAPLACEHOLDERSTATES.ACTIVE });
          console.log("Youtube Player successfuly loaded: loadMedia:");
          break;
        case MEDIATYPES.SOUNDCLOUD:
          // TODO: Load Soundcloud
          break;
        case MEDIATYPES.VIMEO:
          // TODO: Load Vimeo
          break;
        case MEDIATYPES.NONE:
          // TODO: Remove the players
          break;
        default:
          // ERROR
          console.log("ERROR: No media type");
          break;
      }
    });
  },

  // EVENT HANDLER: Plays media with given type
  playMedia: function playMedia(mediaData) {
    this.setState({ mediaState: MEDIAPLAYERSTATES.PLAYING }, function () {
      playMediaByMediaType(mediaData);
      console.log('Media is Now Playing');
    });
  },

  // EVENT HANDLER: Pauses media with given type
  pauseMedia: function pauseMedia(mediaData) {
    this.setState({ mediaState: MEDIAPLAYERSTATES.PAUSED }, function () {
      pauseMediaByMediaType(mediaData);
      console.log('Media is Now Paused');
    });
  },

  // EVENT HANDLER: When media player has ended
  changeMediaPlayerToNone: function changeMediaPlayerToNone() {
    this.setState({ localState: MEDIAPLACEHOLDERSTATES.NONE });
    this.setState({ mediaState: MEDIAPLAYERSTATES.NONE }, function () {
      resetYoutubeObj();
      console.log("ENDING: Media player");
    });
  },

  render: function render() {
    // Media player is loaded onto the media-player div
    var videoPlaceholder = [];

    // Displays respective placeholder IF the local state is not 'active'
    // TODO: Consider using MEDIAPLAYERSTATES instead
    switch (this.state.localState) {
      case MEDIAPLACEHOLDERSTATES.ACTIVE:
        break;
      case MEDIAPLACEHOLDERSTATES.NONE:
        videoPlaceholder.push(React.createElement(VideoPlaceholder, { key: 'VideoPlaceholder' }));
        break;
      case MEDIAPLACEHOLDERSTATES.READY:
        videoPlaceholder.push(React.createElement(VideoReady, { key: 'VideoReady' }));
        break;
      case MEDIAPLACEHOLDERSTATES.LOADING:
        videoPlaceholder.push(React.createElement(VideoLoading, { key: 'VideoLoading' }));
        break;
      case MEDIAPLACEHOLDERSTATES.SYNCING:
        videoPlaceholder.push(React.createElement(VideoSyncing, { key: 'VideoSyncing' }));
        break;
      default:
        // ERROR
        console.log("ERROR: No MEDIAPLACEHOLDERSTATES defined");
        break;
    };

    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'player' },
        React.createElement(
          'div',
          { className: 'player-video-embed' },
          videoPlaceholder,
          React.createElement('div', { id: 'media-player', className: 'js-plyr', 'data-type': 'youtube' })
        )
      )
    );
  }
});

module.exports = MediaPlayer;

},{"./StatusBar":46,"react":31}],39:[function(require,module,exports){
"use strict";

/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    VIEW: ModalCreatePlaylist.jsx

    The component for when the Modal pops up for creating a new playlist
    ========================================================================== */

/*  =============================================================================
    @Components:    ToggleIcon
                    ModalCreatePlaylist

    @Exports:       ModalCreatePlaylist
    ========================================================================== */
var React = require('react');

// The icon which tells the user if the new playlist would be either public or private
var ToggleIcon = React.createClass({
  displayName: "ToggleIcon",

  render: function render() {
    // Toggles the icon to the globe or lock depending on if the new playlist would be public or private
    var toggleClass;
    if (this.props.isPublic === true) {
      toggleClass = "fa fa-globe";
    } else {
      toggleClass = "fa fa-lock";
    }

    return React.createElement(
      "div",
      { className: "toggle-slider-section" },
      React.createElement(
        "label",
        { className: "switch" },
        React.createElement("input", { type: "checkbox", id: "create-playlist-toggle", onChange: this.props.onChange }),
        React.createElement("div", { className: "slider" })
      ),
      React.createElement("i", { className: toggleClass, id: "create-playlist-toggle-icon" })
    );
  }
});

// MAIN COMPONENT: Create New Playlist Modal Popup
var ModalCreatePlaylist = React.createClass({
  displayName: "ModalCreatePlaylist",

  getInitialState: function getInitialState() {
    return {
      playlistNameInput: "",
      isPublic: true
    };
  },

  onChangePlaylistName: function onChangePlaylistName(e) {
    this.setState({ playlistNameInput: e.target.value });
  },

  onChangeIsPublic: function onChangeIsPublic(e) {
    // The playlist is public when the target is not checked
    console.log(this.state.isPublic);
    this.setState({ isPublic: !e.target.checked });
  },

  onSubmit: function onSubmit(e) {
    e.preventDefault();
  },

  addToPlaylist: function addToPlaylist(e) {
    console.log("Modal: Add to new Playlist");
    var data;
    if (this.props.data === null || this.props.data === undefined) {
      data = {
        name: this.state.playlistNameInput,
        owner: this.props.user.local.email,
        isPublic: this.state.isPublic,
        mediaEntry: null
      };
    } else {
      data = {
        name: this.state.playlistNameInput,
        owner: this.props.user.local.email,
        isPublic: this.state.isPublic,
        mediaEntry: {
          artist: this.props.data.artist,
          mediaId: this.props.data.mediaId,
          mediaType: this.props.data.mediaType,
          thumbnail: this.props.data.thumbnail,
          title: this.props.data.title
        }
      };
    }
    socket.emit('From Client: Create new playlist with data', data);
  },

  render: function render() {
    var modalId;
    var toggleIconGlobeOrLock = [];

    // If the modal is clicked from the create new playlist button under myPlaylist
    if (this.props.pos === null || this.props.pos === undefined) {
      modalId = "create-playlist";
    }
    // WHen the modal is clicked from a media entry
    else {
        modalId = "create-playlist-" + this.props.pos;
      }

    return React.createElement(
      "div",
      { className: "modal fade", id: modalId, tabIndex: "-1", role: "dialog", "aria-labelledby": "myModalLabel" },
      React.createElement(
        "div",
        { className: "modal-dialog modal-sm", role: "document" },
        React.createElement(
          "div",
          { className: "modal-content" },
          React.createElement(
            "div",
            { className: "modal-header" },
            "Create a New Playlist"
          ),
          React.createElement(
            "div",
            { className: "modal-body" },
            React.createElement(
              "div",
              { className: "search-container" },
              React.createElement(
                "form",
                { className: "search-input", id: "create-playlist-input", onSubmit: this.onSubmit },
                React.createElement("input", { className: "input-padding", type: "text", placeholder: "Playlist Name", onChange: this.onChangePlaylistName }),
                React.createElement(
                  "div",
                  { className: "modal-label" },
                  "Is this a private playlist?"
                ),
                React.createElement(ToggleIcon, { isPublic: this.state.isPublic, onChange: this.onChangeIsPublic })
              )
            )
          ),
          React.createElement(
            "div",
            { className: "modal-footer" },
            React.createElement(
              "button",
              { type: "button", className: "btn btn-secondary", "data-dismiss": "modal" },
              "Cancel"
            ),
            React.createElement(
              "button",
              { type: "button", className: "btn btn-primary", "data-dismiss": "modal", onClick: this.addToPlaylist },
              "Create Playlist"
            )
          )
        )
      )
    );
  }
});

// Required to call modal from other components
module.exports = ModalCreatePlaylist;

},{"react":31}],40:[function(require,module,exports){
'use strict';

/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    VIEW: MyPlaylists.jsx

    Contains all of the current user's private and public playlists. Also contains 
    all the playlists that the user liked.
    ========================================================================== */

/*  =============================================================================
    @Components:    MyPlaylistPlaceholder
                    SearchMyPlaylist
                    MyPlaylists

    @Exports:       MyPlaylists
    ========================================================================== */
var React = require('react');
var PlaylistEntry = require('./PlaylistEntry');

// Placeholder if there are no playlists created or liked
var MyPlaylistPlaceholder = React.createClass({
  displayName: 'MyPlaylistPlaceholder',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'col-padding' },
      React.createElement(
        'div',
        { className: 'placeholder' },
        React.createElement(
          'div',
          { className: 'placeholder-content' },
          React.createElement('i', { className: 'fa fa-book placeholder-icon' }),
          React.createElement('br', null),
          React.createElement(
            'span',
            null,
            'You have no saved playlists'
          )
        )
      )
    );
  }
});

// Search Bar to search My Playlists
var SearchMyPlaylist = React.createClass({
  displayName: 'SearchMyPlaylist',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'search-container' },
      React.createElement(
        'form',
        { className: 'search-input' },
        React.createElement('input', { type: 'text', className: 'chat-textbox', name: '', placeholder: 'Search Private Playlists...' })
      )
    );
  }
});

// Create New Playlist Button
var NewPlaylistButton = React.createClass({
  displayName: 'NewPlaylistButton',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'search-container btn-align-right' },
      React.createElement(
        'button',
        { className: 'btn btn-primary', 'data-toggle': 'modal', 'data-target': '#create-playlist' },
        React.createElement('i', { className: 'fa fa-plus icon-padding' }),
        'Create New Playlist'
      )
    );
  }
});

// MAIN COMPONENT: My Playlist Tab
var MyPlaylists = React.createClass({
  displayName: 'MyPlaylists',

  render: function render() {
    var playlistEntries = [];

    // If there are no playlists, the placeholder is displayed
    if (this.props.myPlaylists === undefined || this.props.myPlaylists === null || this.props.myPlaylists.length <= 0) {
      return React.createElement(
        'div',
        null,
        React.createElement(MyPlaylistPlaceholder, null)
      );
    }

    // If there are playlists, pushes every playlist into the tab
    else {
        // Adds the search bar for the playlist
        playlistEntries.push(React.createElement(SearchMyPlaylist, { key: 'SearchMyPlaylist' }));

        // Every playlist entry in MyPlaylist
        var playlistEntry;
        var playlistThumbnail;
        var playlistSize;
        for (var i = 0; i < this.props.myPlaylists.length; ++i) {
          playlistEntry = this.props.myPlaylists[i];
          // If the playlist entry has no media entries
          // TODO: Add a thumbnial placeholder for playlist entries that have no media entries
          if (playlistEntry.mediaEntries[0] === null || playlistEntry.mediaEntries[0] === undefined) {
            playlistThumbnail = "";
            playlistSize = 0;
          }
          // there are media entries in the playlist entry
          else {
              playlistThumbnail = playlistEntry.mediaEntries[0].thumbnail;
              playlistSize = playlistEntry.mediaEntries.length;
            }

          playlistEntries.push(
          // TODO: owner, liked
          React.createElement(PlaylistEntry, {
            key: playlistEntry._id,
            owner: true,
            title: playlistEntry.name,
            thumbnail: playlistThumbnail,
            curator: playlistEntry.owner,
            size: playlistSize,
            type: playlistEntry.isPublic,
            likes: playlistEntry.likes,
            liked: null,
            mediaEntries: playlistEntry.mediaEntries,
            home: this.props.home }));
        }
      }

    return React.createElement(
      'div',
      null,
      React.createElement(NewPlaylistButton, null),
      playlistEntries
    );
  }
});

module.exports = MyPlaylists;

},{"./PlaylistEntry":41,"react":31}],41:[function(require,module,exports){
"use strict";

/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    VIEW: PlaylistEntry.jsx

    The individual entry of a playlist
    ========================================================================== */

/*  =============================================================================
    @Components:    PlaylistIcon
                    PlaylistEntry

    @Exports:       PlaylistEntry
    ========================================================================== */
var React = require('react');

// Icon displayed depends on whether playlist is public, private, or not owner
var PlaylistIcon = React.createClass({
  displayName: "PlaylistIcon",

  render: function render() {
    if (this.props.owner == false) {
      return React.createElement(
        "div",
        { className: "playlist-icon" },
        React.createElement(
          "a",
          { className: "icon-btn like-btn", href: "javascript:void(0)" },
          React.createElement("i", { className: "fa fa-heart-o", "aria-hidden": "true" })
        )
      );
    } else if (this.props.owner == true && this.props.type == false) {
      return React.createElement(
        "div",
        { className: "playlist-icon" },
        React.createElement("i", { className: "fa fa-lock", "aria-hidden": "true" })
      );
    } else {
      return React.createElement(
        "div",
        { className: "playlist-icon" },
        React.createElement("i", { className: "fa fa-globe", "aria-hidden": "true" })
      );
    };
  }
});

// MAIN COMPONENT: Each individual playlist card
var PlaylistEntry = React.createClass({
  displayName: "PlaylistEntry",


  // EVENT HANDLER: Adds the playlist into the queue
  playPlaylist: function playPlaylist() {
    // Do not allow the user to click on the playlist
    if (this.props.home === true) {
      return;
    }
    console.log("Playing playlist: " + this.props.title + " by " + this.props.curator);
    // If there are no media entries, do nothing
    if (this.props.size === 0) {
      return;
    }
    socket.emit('From Client: Update queue with new list', this.props.mediaEntries);
  },

  // EVENT HANDLER: Opens the playlist's page
  goToPlaylistPage: function goToPlaylistPage() {
    console.log("Going to playlist page: " + this.props.title);
  },

  // EVENT HANDLER: Opens the curator's page
  goToCuratorPage: function goToCuratorPage() {
    console.log("Going to curator page: " + this.props.curator);
  },

  render: function render() {
    // If owner, append user-playlist to classname
    var playlistCardClassName = "playlist-card";
    if (this.props.owner == true) {
      playlistCardClassName += " user-playlist";
    };

    // TODO: Update placeholder for empty thumbnails
    // For empty Thumbnails
    var thumbnail = this.props.thumbnail;
    if (thumbnail === "" || thumbnail === null || thumbnail === undefined) {
      thumbnail = "/images/media-icon.png";
    }

    // Do not allow the user to click on the playlist
    if (this.props.home === true) {
      return React.createElement(
        "div",
        { className: "col-md-3 col-sm-4 col-padding" },
        React.createElement(
          "div",
          { className: playlistCardClassName },
          React.createElement(
            "div",
            { className: "playlist-img-container" },
            React.createElement("img", { className: "playlist-img", src: thumbnail })
          ),
          React.createElement(
            "div",
            { className: "playlist-text-container" },
            React.createElement(
              "div",
              { className: "playlist-title" },
              React.createElement(
                "a",
                { className: "playlist-link playlist-title-text ellipses", "data-toggle": "tab", href: "#open-playlist", onClick: this.goToPlaylistPage },
                this.props.title
              ),
              React.createElement(
                "div",
                { className: "pill", "data-toggle": "tooltip", title: "Items in Playlist" },
                this.props.size
              )
            ),
            React.createElement(
              "div",
              { className: "playlist-curator" },
              React.createElement(
                "a",
                { className: "curator-link", "data-toggle": "tab", href: "#curator-page", onClick: this.goToCuratorPage },
                this.props.curator
              )
            )
          ),
          React.createElement(
            "div",
            { className: "playlist-icon-container" },
            React.createElement(PlaylistIcon, { owner: this.props.owner, type: this.props.type, liked: this.props.liked })
          )
        )
      );
    }

    return React.createElement(
      "div",
      { className: "col-md-3 col-sm-4 col-padding" },
      React.createElement(
        "div",
        { className: playlistCardClassName },
        React.createElement(
          "div",
          { className: "playlist-img-container" },
          React.createElement(
            "a",
            { href: "javascript:void(0)", onClick: this.playPlaylist },
            React.createElement(
              "div",
              { className: "playlist-overlay" },
              React.createElement(
                "div",
                { className: "playlist-overlay-content" },
                React.createElement(
                  "div",
                  { className: "playlist-play-icon" },
                  React.createElement("i", { className: "fa fa-play", "aria-hidden": "true" })
                ),
                "PLAY ALL"
              )
            )
          ),
          React.createElement("img", { className: "playlist-img", src: thumbnail })
        ),
        React.createElement(
          "div",
          { className: "playlist-text-container" },
          React.createElement(
            "div",
            { className: "playlist-title" },
            React.createElement(
              "a",
              { className: "playlist-link playlist-title-text ellipses", "data-toggle": "tab", href: "#open-playlist", onClick: this.goToPlaylistPage },
              this.props.title
            ),
            React.createElement(
              "div",
              { className: "pill", "data-toggle": "tooltip", title: "Items in Playlist" },
              this.props.size
            )
          ),
          React.createElement(
            "div",
            { className: "playlist-curator" },
            React.createElement(
              "a",
              { className: "curator-link", "data-toggle": "tab", href: "#curator-page", onClick: this.goToCuratorPage },
              this.props.curator
            )
          )
        ),
        React.createElement(
          "div",
          { className: "playlist-icon-container" },
          React.createElement(PlaylistIcon, { owner: this.props.owner, type: this.props.type, liked: this.props.liked })
        )
      )
    );
  }
});

module.exports = PlaylistEntry;

},{"react":31}],42:[function(require,module,exports){
"use strict";

/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    PlaylistTab.jsx

    Playlist Tab. This componenet is used to display the My Playlist tab.
    This component will not appear if there is no user logged in do to a non
    logged in user not having any playlists. Only shows the tab if the user is logged
    in
    ========================================================================== */

/*  =============================================================================
    Components

    PlaylistTab - Entire html for the Home component.
    ========================================================================== */
var React = require('react');

var PlaylistTab = React.createClass({
  displayName: "PlaylistTab",

  render: function render() {
    // When the user is not logged in, do not display the Playlist tab
    if (this.props.user === undefined || this.props.user === null) {
      return null;
    }

    // If there is a user logged in, chooses the correct tab type
    switch (this.props.type) {
      case "MyPlaylist-mobile":
        return React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { "data-toggle": "tab", href: "#myplaylists", id: "mobile-tab-myplaylists" },
            React.createElement("i", { className: "fa fa-book icon-padding" }),
            React.createElement(
              "div",
              { className: "tab-text" },
              "My Playlists"
            )
          )
        );
        break;
      case "MyPlaylist":
        return React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { "data-toggle": "tab", href: "#myplaylists", id: "tab-myplaylists" },
            React.createElement("i", { className: "fa fa-book icon-padding" }),
            React.createElement(
              "div",
              { className: "tab-text" },
              "My Playlists"
            )
          )
        );
        break;
      default:
        return;
    }
  }
});

module.exports = PlaylistTab;

},{"react":31}],43:[function(require,module,exports){
'use strict';

/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    Main-Component Queue

    The entire Queue component. Contains a list of media entries that are in the queue.
    Also has sub components of the queue's title, length, and added media lengths, with the buttons
    that controls the functionalities of shuffle and likes.

    @Components:  QueueTitle
                  PlaylistLength
                  AddedMediaLength
                  ShuffleButton
                  LikeButton
                  ClearButton
                  QueuePlaceHolder
                  Queue

    @Exports:     Queue
    ========================================================================== */
var React = require('react');
var MediaEntry = require('./MediaEntry');

/*  =============================================================================
    Function reinitializeDraggable

    Whenever the queue is changed or updated, reinitializes the draggable in order
    for the dragging to work with the newly updated list. The destroy parameter
    resets the entire draggable object. After the entire process is finished, the function callback
    is called, which is usually a callback to resetting the draggable with the new queue.
    ========================================================================== */
function reinitializeDraggable(callback) {
  $('.media-card').arrangeable('destroy');
  callback();
}

var QueueTitle = React.createClass({
  displayName: 'QueueTitle',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'queue-title' },
      this.props.queueTitle
    );
  }
});

var PlaylistLength = React.createClass({
  displayName: 'PlaylistLength',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'pill', 'data-toggle': 'tooltip', title: 'Items in Playlist' },
      this.props.playlistLength
    );
  }
});

var AddedMediaLength = React.createClass({
  displayName: 'AddedMediaLength',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'pill pill-blue', 'data-toggle': 'tooltip', title: 'Items Added' },
      '+',
      this.props.addedMediaLength
    );
  }
});

var EditButton = React.createClass({
  displayName: 'EditButton',

  addToPlaylist: function addToPlaylist() {},

  render: function render() {
    return React.createElement(
      'div',
      { className: 'queue-icon' },
      React.createElement(
        'a',
        { className: 'icon-btn', href: 'javascript:void(0)', onClick: this.props.onClick },
        React.createElement('i', { className: 'fa fa-edit', 'data-toggle': 'tooltip', title: 'Edit', 'aria-hidden': 'true' })
      )
    );
  }
});

var ShuffleButton = React.createClass({
  displayName: 'ShuffleButton',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'queue-icon shfl-btn' },
      React.createElement(
        'a',
        { className: 'icon-btn', href: 'javascript:void(0)' },
        React.createElement('i', { className: 'fa fa-random', 'data-toggle': 'tooltip', title: 'Shuffle', 'aria-hidden': 'true' })
      )
    );
  }
});

var LikeButton = React.createClass({
  displayName: 'LikeButton',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'queue-icon like-btn' },
      React.createElement(
        'a',
        { className: 'icon-btn', href: 'javascript:void(0)' },
        React.createElement('i', { className: 'fa fa-heart-o', 'data-toggle': 'tooltip', title: 'Like Playlist', 'aria-hclassden': 'true' })
      )
    );
  }
});

var ClearButton = React.createClass({
  displayName: 'ClearButton',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'queue-icon' },
      React.createElement(
        'a',
        { className: 'icon-btn', href: 'javascript:void(0)', onClick: this.props.onClick },
        React.createElement('i', { className: 'fa fa-square-o', 'data-toggle': 'tooltip', title: 'Clear', 'aria-hidden': 'true' })
      )
    );
  }
});

// TODO: Maybe implement Loop
var LoopButton = React.createClass({
  displayName: 'LoopButton',

  render: function render() {
    return React.createElement('div', null);
  }
});

// Placeholder for an empty list of media entries in queue
var QueuePlaceHolder = React.createClass({
  displayName: 'QueuePlaceHolder',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'placeholder' },
      React.createElement(
        'div',
        { className: 'placeholder-content' },
        React.createElement('i', { className: 'fa fa-square-o placeholder-icon' }),
        React.createElement('br', null),
        React.createElement(
          'span',
          null,
          'Your queue is empty'
        )
      )
    );
  }
});

// MAIN COMPONENT: The entire queue
var Queue = React.createClass({
  displayName: 'Queue',

  getInitialState: function getInitialState() {
    return {
      queueList: []
    };
  },

  componentDidMount: function componentDidMount() {
    // Event handlers sent from server when medias are added to the queue
    socket.on('From Server: Initialize Queue', this.initializeQueue);
    socket.on('From Server: Push into queue', this.pushIntoQueue);
    socket.on('From Server: Update queue with new queue', this.updateQueueWithNewQueue);
  },

  // EVENT HANDLER: Initializes the queue with the server's current queue
  initializeQueue: function initializeQueue(mediaEntries) {
    var queueListWithNewMediaEntry = this.state.queueList.concat(mediaEntries);
    this.setState({ queueList: queueListWithNewMediaEntry }, function () {
      reinitializeDraggable(function () {
        console.log("Draggable reinitialized with Queue changes : initializeQueue");
        $('.media-card').arrangeable();
      });
    });
  },

  // EVENT HANDLER: Pushes a media entry into the queue
  pushIntoQueue: function pushIntoQueue(mediaEntry) {
    var queueListWithNewMediaEntry = this.state.queueList.concat(mediaEntry);
    this.setState({ queueList: queueListWithNewMediaEntry }, function () {
      reinitializeDraggable(function () {
        console.log("Draggable reinitialized with Queue changes : pushIntoQueue");
        $('.media-card').arrangeable();
      });
    });
  },

  // EVENT HANDLER: Updates the queue with the server's queue
  updateQueueWithNewQueue: function updateQueueWithNewQueue(newQueueList) {
    console.log(newQueueList);
    this.setState({ queueList: newQueueList }, function () {
      reinitializeDraggable(function () {
        console.log("Draggable reinitialized with Queue changes : updateQueueWithNewQueue");
        $('.media-card').arrangeable();
      });
    });
  },

  // EVENT HANDLER: Clears the entire queue
  clearQueue: function clearQueue() {
    console.log("Clearing the queue");
    socket.emit('From Client: Update queue with new list', []);
  },

  render: function render() {
    // Prepares each media entry. Whenever a media is added, populates the queue list with the new media entry
    var queueEntries = [];
    var queueEntry;
    var queueMediaEntryId = 'queue-media-entry-';
    var playlistLength = 0;
    var addedMediaLength = 0;

    // Added If statement that pushes the placeholder div into queueEntries whenever queueList is empty
    if (this.state.queueList.length <= 0) {
      queueEntries.push(React.createElement(QueuePlaceHolder, { key: 'QueuePlaceHolder' }));
    }

    // If there are media entries, pushes every media entry the queueEntries instead
    else {
        for (var i = 0; i < this.state.queueList.length; ++i) {
          queueEntry = this.state.queueList[i];

          if (queueEntry.ifMediaCardAdded) {
            ++addedMediaLength;
          } else {
            ++playlistLength;
          }

          queueEntries.push(React.createElement(MediaEntry
          // FOR PREVENTING DUPLICATES
          // key={queueEntry.mediaId} 
          , { key: queueEntry.mediaId + i,
            pos: i,
            mediaId: queueEntry.mediaId,
            categoryType: 'QUEUE',
            mediaType: 'YOUTUBE',
            thumbnail: queueEntry.thumbnail,
            title: queueEntry.title,
            artist: queueEntry.artist,
            ifMediaCardAdded: queueEntry.ifMediaCardAdded }));
        }
      }

    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'queue-header' },
        React.createElement(
          'div',
          { className: 'queue-title-container' },
          React.createElement(QueueTitle, { queueTitle: "Queue" }),
          React.createElement(PlaylistLength, { playlistLength: playlistLength }),
          React.createElement(AddedMediaLength, { addedMediaLength: addedMediaLength })
        ),
        React.createElement(
          'div',
          { className: 'queue-icon-container' },
          React.createElement(ClearButton, { onClick: this.clearQueue }),
          React.createElement(LikeButton, null),
          React.createElement(ShuffleButton, null),
          React.createElement(EditButton, { onClick: this.addToPlaylist })
        )
      ),
      React.createElement(
        'div',
        { className: 'queue-body col-padding' },
        queueEntries
      ),
      React.createElement(
        'nav',
        { 'aria-label': 'page navigation' },
        React.createElement(
          'ul',
          { className: 'pagination' },
          React.createElement(
            'li',
            { className: 'disabled' },
            React.createElement(
              'a',
              { href: 'javascript:void(0)', 'aria-label': 'Previous' },
              React.createElement('i', { className: 'fa fa-angle-left' })
            )
          ),
          React.createElement(
            'li',
            { className: 'active' },
            React.createElement(
              'a',
              { href: 'javascript:void(0)' },
              '1'
            )
          ),
          React.createElement(
            'li',
            null,
            React.createElement(
              'a',
              { href: 'javascript:void(0)' },
              '2'
            )
          ),
          React.createElement(
            'li',
            null,
            React.createElement(
              'a',
              { href: 'javascript:void(0)' },
              '3'
            )
          ),
          React.createElement(
            'li',
            null,
            React.createElement(
              'a',
              { href: 'javascript:void(0)', 'aria-label': 'Next' },
              React.createElement('i', { className: 'fa fa-angle-right' })
            )
          )
        )
      )
    );
  }
});

module.exports = Queue;

},{"./MediaEntry":37,"react":31}],44:[function(require,module,exports){
'use strict';

/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    Room.jsx

    Every view of each individual room.
    The view of the entire index page. Main webpage
    ========================================================================== */

/*  =============================================================================
    Components

    Room - Entire html for the Room component. S
    ========================================================================== */
var React = require('react');

// Sub-components in Room
var Header = require('./Header');
var MediaPlayer = require('./MediaPlayer');
var Chatbox = require('./Chatbox');
var StatusBar = require('./StatusBar');
var Queue = require('./Queue');
var Explore = require('./Explore');
var MyPlaylists = require('./MyPlaylists');
var PlaylistTab = require('./PlaylistTab');
var ModalCreatePlaylist = require('./ModalCreatePlaylist');
var Search = require('./Search');
var Footer = require('./Footer');

// MAIN COMPONENT: Room
var Room = React.createClass({
  displayName: 'Room',

  getInitialState: function getInitialState() {
    if (this.props.myPlaylists === undefined || this.props.myPlaylists === null) {
      return {
        myPlaylists: []
      };
    } else {
      return {
        myPlaylists: this.props.myPlaylists
      };
    }
  },

  componentDidMount: function componentDidMount() {
    socket.on("From Server: Update MyPlaylist with new playlists", this.updateAllPlaylistEntries);
    socket.on("From Server: Update selected playlist", this.updateOnePlaylistEntry);

    socket.emit("From Client: Initialize room", {
      user: this.props.user,
      room: this.props.room
    });
  },

  // EVENT HANDLER: Update the playlist entry
  updateAllPlaylistEntries: function updateAllPlaylistEntries(newPlaylist) {
    console.log("Update with new playlist entry");
    var playlistsWithNewEntry = this.state.myPlaylists.concat(newPlaylist);
    this.setState({ myPlaylists: playlistsWithNewEntry });
  },

  // EVENT HANDLER: Updates the client's playlist entry when a media is pushed in
  updateOnePlaylistEntry: function updateOnePlaylistEntry(newPlaylist) {
    // TODO: Find a better method instead of this, or maybe not
    var updatedMyPlaylists = this.state.myPlaylists;
    var playlistEntry;
    // Increments through every playlist entry to find the existing playlist.
    for (var i = 0; i < this.state.myPlaylists.length; ++i) {
      playlistEntry = this.state.myPlaylists[i];
      if (playlistEntry._id === newPlaylist._id) {
        updatedMyPlaylists[i] = newPlaylist;
        this.setState({ myPlaylists: updatedMyPlaylists });
        return;
      }
    }
  },

  render: function render() {

    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'content-container' },
        React.createElement('div', { id: 'page-overlay' }),
        React.createElement(Header, { user: this.props.user }),
        React.createElement(
          'div',
          { className: 'banner-container' },
          React.createElement(
            'div',
            { className: 'banner-content-container' },
            React.createElement(
              'div',
              { className: 'video-container' },
              React.createElement(MediaPlayer, null)
            ),
            React.createElement(
              'div',
              { className: 'mobile-tabbed-container' },
              React.createElement(
                'ul',
                { className: 'nav nav-tabs nav-centered' },
                React.createElement(
                  'li',
                  { className: 'active' },
                  React.createElement(
                    'a',
                    { 'data-toggle': 'tab', href: '#chat', id: 'mobile-tab-chat' },
                    React.createElement('i', { className: 'fa fa-comments icon-padding' }),
                    React.createElement(
                      'div',
                      { className: 'tab-text' },
                      'Chat'
                    )
                  )
                ),
                React.createElement(
                  'li',
                  null,
                  React.createElement(
                    'a',
                    { 'data-toggle': 'tab', href: '#queue', id: 'mobile-tab-queue' },
                    React.createElement('i', { className: 'fa fa-list-ul icon-padding' }),
                    React.createElement(
                      'div',
                      { className: 'tab-text' },
                      'Queue'
                    )
                  )
                ),
                React.createElement(
                  'li',
                  null,
                  React.createElement(
                    'a',
                    { 'data-toggle': 'tab', href: '#explore', id: 'mobile-tab-explore' },
                    React.createElement('i', { className: 'fa fa-rocket icon-padding' }),
                    React.createElement(
                      'div',
                      { className: 'tab-text' },
                      'Explore'
                    )
                  )
                ),
                React.createElement(PlaylistTab, { type: "MyPlaylist-mobile", user: this.props.user }),
                React.createElement(
                  'li',
                  null,
                  React.createElement(
                    'a',
                    { 'data-toggle': 'tab', href: '#search', className: 'focus-search', id: 'mobile-tab-search' },
                    React.createElement('i', { className: 'fa fa-search icon-padding' }),
                    React.createElement(
                      'div',
                      { className: 'tab-text' },
                      'Search'
                    )
                  )
                )
              )
            ),
            React.createElement(
              'div',
              { className: 'chatbox-container' },
              React.createElement(Chatbox, { room: this.props.room, user: this.props.user })
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'main-container' },
          React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
              'div',
              { className: 'col-md-4 col-sm-5 queue-container', id: 'queue' },
              React.createElement(Queue, { user: this.props.user })
            ),
            React.createElement(
              'div',
              { className: 'col-md-8 col-sm-7 tabbed-container tabbed-container-mobile-collapse' },
              React.createElement(
                'ul',
                { className: 'nav nav-tabs nav-tabs-mobile-collapse' },
                React.createElement(
                  'li',
                  { className: 'active' },
                  React.createElement(
                    'a',
                    { 'data-toggle': 'tab', href: '#explore', id: 'tab-explore' },
                    React.createElement('i', { className: 'fa fa-rocket icon-padding' }),
                    React.createElement(
                      'div',
                      { className: 'tab-text' },
                      'Explore'
                    )
                  )
                ),
                React.createElement(PlaylistTab, { type: "MyPlaylist", user: this.props.user }),
                React.createElement(
                  'li',
                  null,
                  React.createElement(
                    'a',
                    { 'data-toggle': 'tab', href: '#search', className: 'focus-search', id: 'tab-search' },
                    React.createElement('i', { className: 'fa fa-search icon-padding' }),
                    React.createElement(
                      'div',
                      { className: 'tab-text' },
                      'Search'
                    )
                  )
                )
              ),
              React.createElement(
                'div',
                { className: 'tab-content' },
                React.createElement(
                  'div',
                  { id: 'explore', className: 'tab-pane fade in active' },
                  React.createElement(Explore, { explore: this.props.explore })
                ),
                React.createElement(
                  'div',
                  { id: 'myplaylists', className: 'tab-pane fade' },
                  React.createElement(MyPlaylists, { myPlaylists: this.state.myPlaylists })
                ),
                React.createElement(
                  'div',
                  { id: 'search', className: 'tab-pane fade' },
                  React.createElement(Search, { user: this.props.user, myPlaylists: this.state.myPlaylists })
                ),
                React.createElement(ModalCreatePlaylist, { key: "newPlaylist", user: this.props.user, data: null, pos: null })
              )
            )
          )
        ),
        React.createElement('div', { className: 'push' })
      ),
      React.createElement(Footer, null)
    );
  }
});

module.exports = Room;

},{"./Chatbox":33,"./Explore":34,"./Footer":35,"./Header":36,"./MediaPlayer":38,"./ModalCreatePlaylist":39,"./MyPlaylists":40,"./PlaylistTab":42,"./Queue":43,"./Search":45,"./StatusBar":46,"react":31}],45:[function(require,module,exports){
'use strict';

/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    Main-Component Search

    The entire Search component. Contains an Input bar for Search, as well as the
    entire list of media entries. Each media entry contains the thumbnail,
    title, and duration components

    @Components:  SearchPlaceHolder
                  Search

    @Exports:     Search
    ========================================================================== */
var React = require('react');
// Media Entry component
var MediaEntry = require('./MediaEntry');

// Default Placeholder when query has no entry
var SearchPlaceHolder = React.createClass({
  displayName: 'SearchPlaceHolder',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'col-padding' },
      React.createElement(
        'div',
        { className: 'placeholder placeholder-search' },
        React.createElement(
          'div',
          { className: 'placeholder-content' },
          React.createElement('i', { className: 'fa fa-search placeholder-icon' }),
          React.createElement('br', null),
          React.createElement(
            'span',
            null,
            'Type to search'
          )
        )
      )
    );
  }
});

// Placeholder for an empty list of media entries in search
var SearchEmpty = React.createClass({
  displayName: 'SearchEmpty',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'col-padding' },
      React.createElement(
        'div',
        { className: 'placeholder placeholder-search' },
        React.createElement(
          'div',
          { className: 'placeholder-content' },
          React.createElement('i', { className: 'fa fa-remove placeholder-icon' }),
          React.createElement('br', null),
          React.createElement(
            'span',
            null,
            'No matching search results'
          )
        )
      )
    );
  }
});

// Searching Load Icon for when search results are loading
var SearchLoad = React.createClass({
  displayName: 'SearchLoad',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'col-padding' },
      React.createElement(
        'div',
        { className: 'placeholder placeholder-search' },
        React.createElement(
          'div',
          { className: 'placeholder-content' },
          React.createElement('i', { className: 'fa fa-circle-o-notch fa-spin placeholder-icon' }),
          React.createElement('br', null),
          React.createElement(
            'span',
            null,
            'Searching'
          )
        )
      )
    );
  }
});

// Search Component
var Search = React.createClass({
  displayName: 'Search',

  getInitialState: function getInitialState() {
    return {
      searchQuery: "",
      jsonResponse: undefined
    };
  },

  searchMedia: function searchMedia(e) {
    // Clears the timer to prevent another unnecessary searchMedia from geting called
    clearInterval(this.interval);
    var query = this.state.searchQuery;

    // after searchMedia is run, display loading icon first until json is loaded
    this.setState({ jsonResponse: 'loading' });

    // Do not search for an empty query
    if (query === '' || query === undefined || query === null) {
      return;
    }

    // Calls the Youtube API for Searching a list with a given query
    // TODO: Make APIKey secret
    var apiKey = 'AIzaSyDY8WeYCRWqHEdkSLaPfn2hrXplppIt0aU';
    gapi.client.setApiKey(apiKey);
    gapi.client.load('youtube', 'v3', function () {
      var request = gapi.client.youtube.search.list({
        q: query,
        part: 'id, snippet',
        type: 'video',
        maxResults: MAX_SEARCH_RESULTS
      });

      // The binds are needed (Still need more of an explanation on this)
      request.execute(function (response) {
        // This callback returns the response from the API, giving a list of all the videos from the searchQuery
        // Sets the state jsonResponse to the returned response from the API
        if (response.items.length > 0) {
          this.setState({ jsonResponse: response });
        }
        // Reset jsonResponse to undefined if no matching results for respective placeholder
        else if (response.items.length == 0) {
            this.setState({ jsonResponse: 'empty' });
          }
      }.bind(this));
    }.bind(this));
  },

  handleSubmit: function handleSubmit(e) {
    // Removes the form's default's property of url redirection
    e.preventDefault();
    clearInterval(this.interval);
    this.interval = setInterval(this.searchMedia, 0);
  },

  handleChange: function handleChange(e) {
    // Sets the state of json to searching (will be overriden with searchMedia in 200ms)
    this.setState({ jsonResponse: 'loading' });

    // Sets the state of the Search Query
    this.setState({ searchQuery: e.target.value }, function () {
      // Reclears the timer to restart at 0 again until 200 milliseconds, then searchMedia gets called
      clearInterval(this.interval);
      this.interval = setInterval(this.searchMedia, 500);
    });
  },

  render: function render() {
    // Prepares each media entry. Whenever a State changes, populates the values in each Media Entry from the jsonResponse given from the YoutubeAPI
    var searchEntries = [];
    var json = this.state.jsonResponse;
    var query = this.state.searchQuery;

    // pushes placeholder div into searchEntries if list is empty
    if (query === '' || query === undefined || query === null) {
      searchEntries.push(React.createElement(SearchPlaceHolder, { key: 'SearchPlaceHolder' }));
    }

    // whenever there is a change in query, push loading icon
    else if (json == 'loading') {
        searchEntries.push(React.createElement(SearchLoad, { key: 'SearchLoad' }));
      }

      // if search returns no results, pushes empty search placeholder
      else if (json == 'empty') {
          searchEntries.push(React.createElement(SearchEmpty, { key: 'SearchEmpty' }));
        }

        // if generated list has elements, display them
        else if (json !== "" && json !== undefined) {
            var jsonItem;

            for (var i = 0; i < json.items.length; ++i) {
              jsonItem = json.items[i];
              searchEntries.push(React.createElement(MediaEntry, {
                key: jsonItem.id.videoId,
                pos: i,
                mediaId: jsonItem.id.videoId,
                categoryType: 'SEARCH',
                mediaType: 'YOUTUBE',
                thumbnail: jsonItem.snippet.thumbnails.medium.url,
                title: jsonItem.snippet.title,
                artist: jsonItem.snippet.channelTitle,
                ifMediaCardAdded: false,
                user: this.props.user,
                myPlaylists: this.props.myPlaylists }));
            }
          }

    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'search-container' },
        React.createElement(
          'form',
          { id: 'search-form', className: 'search-input search-input-dropdown', onSubmit: this.handleSubmit },
          React.createElement(
            'div',
            { className: 'input-group' },
            React.createElement('input', { className: 'chat-textbox', id: 'search-media-input', name: '', placeholder: 'Search Youtube...', type: 'text', onChange: this.handleChange }),
            React.createElement(
              'div',
              { className: 'input-group-btn' },
              React.createElement(
                'button',
                { type: 'button', className: 'btn btn-default dropdown-toggle', 'data-toggle': 'dropdown', 'aria-haspopup': 'true', 'aria-expanded': 'false' },
                React.createElement('i', { className: 'fa fa-youtube-play dropdown-icon' }),
                'Youtube',
                React.createElement('i', { className: 'fa fa-angle-down dropdown-arrow' })
              ),
              React.createElement(
                'ul',
                { className: 'dropdown-menu dropdown-menu-right' },
                React.createElement(
                  'li',
                  null,
                  React.createElement(
                    'a',
                    { href: 'javascript:void(0)' },
                    React.createElement('i', { className: 'fa fa-youtube-play' }),
                    'Youtube'
                  )
                ),
                React.createElement(
                  'li',
                  null,
                  React.createElement(
                    'a',
                    { href: 'javascript:void(0)' },
                    React.createElement('i', { className: 'fa fa-vimeo' }),
                    'Vimeo'
                  )
                ),
                React.createElement(
                  'li',
                  null,
                  React.createElement(
                    'a',
                    { href: 'javascript:void(0)' },
                    React.createElement('i', { className: 'fa fa-soundcloud' }),
                    'SoundCloud'
                  )
                ),
                React.createElement(
                  'li',
                  null,
                  React.createElement(
                    'a',
                    { href: 'javascript:void(0)' },
                    React.createElement('i', { className: 'fa fa-spotify' }),
                    'Spotify'
                  )
                )
              )
            )
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'search-media-container' },
        searchEntries
      ),
      React.createElement(
        'nav',
        { 'aria-label': 'page navigation' },
        React.createElement(
          'ul',
          { className: 'pagination' },
          React.createElement(
            'li',
            { className: 'disabled' },
            React.createElement(
              'a',
              { href: 'javascript:void(0)', 'aria-label': 'Previous' },
              React.createElement('i', { className: 'fa fa-angle-left' })
            )
          ),
          React.createElement(
            'li',
            { className: 'active' },
            React.createElement(
              'a',
              { href: 'javascript:void(0)' },
              '1'
            )
          ),
          React.createElement(
            'li',
            null,
            React.createElement(
              'a',
              { href: 'javascript:void(0)' },
              '2'
            )
          ),
          React.createElement(
            'li',
            null,
            React.createElement(
              'a',
              { href: 'javascript:void(0)' },
              '3'
            )
          ),
          React.createElement(
            'li',
            null,
            React.createElement(
              'a',
              { href: 'javascript:void(0)', 'aria-label': 'Next' },
              React.createElement('i', { className: 'fa fa-angle-right' })
            )
          )
        )
      )
    );
  }
});

module.exports = Search;

},{"./MediaEntry":37,"react":31}],46:[function(require,module,exports){
'use strict';

/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    StatusBar.jsx

    Component of the status bar.
    ========================================================================== */
var React = require('react');

var PlayPauseButton = React.createClass({
  displayName: 'PlayPauseButton',

  render: function render() {
    return React.createElement(
      'div',
      { id: 'play-pause-button' },
      React.createElement(
        'button',
        null,
        'Play'
      ),
      React.createElement(
        'button',
        null,
        'Pause'
      )
    );
  }
});

var ElapsedTimeBar = React.createClass({
  displayName: 'ElapsedTimeBar',

  getInitialState: function getInitialState() {
    return {
      elapsedTime: 0
    };
  },

  onElapsedTimeBarChange: function (_onElapsedTimeBarChange) {
    function onElapsedTimeBarChange() {
      return _onElapsedTimeBarChange.apply(this, arguments);
    }

    onElapsedTimeBarChange.toString = function () {
      return _onElapsedTimeBarChange.toString();
    };

    return onElapsedTimeBarChange;
  }(function () {
    // TODO: Change to all media types
    this.setState({ elapsedTime: document.getElementById('media-elapsed-time-slider').value }, function () {
      onElapsedTimeBarChange(this.state.elapsedTime);
    });
  }),

  render: function render() {
    return React.createElement(
      'div',
      null,
      'Elapsed',
      React.createElement('input', { id: 'media-elapsed-time-slider', type: 'range', min: '0', max: '100', value: this.state.elapsedTime, step: '1', onChange: this.onElapsedTimeBarChange })
    );
  }
});

var VolumeSlider = React.createClass({
  displayName: 'VolumeSlider',

  getInitialState: function getInitialState() {
    return {
      volume: 100
    };
  },

  onVolumeBarChange: function onVolumeBarChange() {
    // TODO: Change to all media types
    this.setState({ volume: document.getElementById('media-volume-slider').value }, function () {
      youtubeVolumeChange(this.state.volume);
    });
  },

  render: function render() {
    return React.createElement(
      'div',
      null,
      'Volume',
      React.createElement('input', { id: 'media-volume-slider', type: 'range', min: '0', max: '100', value: this.state.volume, step: '1', onChange: this.onVolumeBarChange })
    );
  }
});

var StatusBar = React.createClass({
  displayName: 'StatusBar',

  render: function render() {
    return React.createElement(
      'div',
      { id: 'status-bar' },
      'StatusBar',
      React.createElement(PlayPauseButton, null),
      React.createElement(ElapsedTimeBar, null),
      React.createElement(VolumeSlider, null)
    );
  }
});

module.exports = StatusBar;

},{"react":31}],47:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

(function () {
    try {
        cachedSetTimeout = setTimeout;
    } catch (e) {
        cachedSetTimeout = function () {
            throw new Error('setTimeout is not defined');
        }
    }
    try {
        cachedClearTimeout = clearTimeout;
    } catch (e) {
        cachedClearTimeout = function () {
            throw new Error('clearTimeout is not defined');
        }
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        return setTimeout(fun, 0);
    } else {
        return cachedSetTimeout.call(null, fun, 0);
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        clearTimeout(marker);
    } else {
        cachedClearTimeout.call(null, marker);
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[32]);
