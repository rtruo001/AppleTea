(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var constants = require('../constants');

var EditPlaylistActions = {
  displayPlaylist: function displayPlaylist(_id, index, mediaEntries) {
    AppDispatcher.handleAction({
      actionType: constants.EDITPLAYLIST,
      _id: _id,
      index: index,
      entries: mediaEntries
    });
  },

  deletePlaylist: function deletePlaylist(playlist) {
    AppDispatcher.handleAction({
      actionType: constants.DELETEPLAYLIST,
      playlistDeleted: playlist
    });
  },

  updatePlaylist: function updatePlaylist(playlist) {
    AppDispatcher.handleAction({
      actionType: constants.UPDATEPLAYLIST,
      updatedPlaylist: playlist
    });
  },

  createPlaylist: function createPlaylist(playlist) {
    AppDispatcher.handleAction({
      actionType: constants.CREATEPLAYLIST,
      createdNewPlaylist: playlist
    });
  }
};

module.exports = EditPlaylistActions;

},{"../constants":2,"../dispatcher/AppDispatcher":3}],2:[function(require,module,exports){
"use strict";

var constants = {
  EDITPLAYLIST: "EDITPLAYLIST",
  DELETEPLAYLIST: "DELETEPLAYLIST",
  UPDATEPLAYLIST: "UPDATEPLAYLIST",
  CREATEPLAYLIST: "CREATEPLAYLIST"
};

module.exports = constants;

},{}],3:[function(require,module,exports){
'use strict';

var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();

AppDispatcher.handleAction = function (action) {
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
};

module.exports = AppDispatcher;

},{"flux":12}],4:[function(require,module,exports){
'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var constants = require('../constants');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';
var EVENT_DELETE_PLAYLIST = 'EVENT_DELETE_PLAYLIST';
var EVENT_UPDATE_PLAYLIST = 'EVENT_UPDATE_PLAYLIST';
var EVENT_CREATE_PLAYLIST = 'EVENT_CREATE_PLAYLIST';

var store = {
  _id: null,
  index: null,
  entries: null,
  playlistDeleted: null,
  updatedPlaylist: null,
  createdNewPlaylist: null
};

var displayIndex = function displayIndex(_id, newPos, mediaEntries) {
  store._id = _id;
  store.index = newPos;
  store.entries = mediaEntries;
};

var deletePlaylist = function deletePlaylist(playlist) {
  store.playlistDeleted = playlist;
};

var updatePlaylist = function updatePlaylist(playlist) {
  store.updatedPlaylist = playlist;
};

var createPlaylist = function createPlaylist(playlist) {
  store.createdNewPlaylist = playlist;
};

var AppStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  addDeletePlaylistListener: function addDeletePlaylistListener(callback) {
    this.on(EVENT_DELETE_PLAYLIST, callback);
  },
  addUpdatePlaylistListener: function addUpdatePlaylistListener(callback) {
    this.on(EVENT_UPDATE_PLAYLIST, callback);
  },
  addCreatePlaylistListener: function addCreatePlaylistListener(callback) {
    this.on(EVENT_CREATE_PLAYLIST, callback);
  },

  removeChangeListener: function removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  removeDeletePlaylistListener: function removeDeletePlaylistListener(callback) {
    this.removeListener(EVENT_DELETE_PLAYLIST, callback);
  },
  removeUpdatePlaylistListener: function removeUpdatePlaylistListener(callback) {
    this.removeListener(EVENT_UPDATE_PLAYLIST, callback);
  },
  removeCreatePlaylistListener: function removeCreatePlaylistListener(callback) {
    this.removeListener(EVENT_CREATE_PLAYLIST, callback);
  },

  getId: function getId() {
    return store._id;
  },
  getIndex: function getIndex() {
    return store.index;
  },
  getEntries: function getEntries() {
    return store.entries;
  },
  getPlaylistDeleted: function getPlaylistDeleted() {
    return store.playlistDeleted;
  },
  getUpdatedPlaylist: function getUpdatedPlaylist() {
    return store.updatedPlaylist;
  },
  getCreatedPlaylist: function getCreatedPlaylist() {
    return store.createdNewPlaylist;
  }
});

AppDispatcher.register(function (payload) {
  var action = payload.action;
  switch (action.actionType) {
    case constants.EDITPLAYLIST:
      displayIndex(action._id, action.index, action.entries);
      AppStore.emit(CHANGE_EVENT);
      break;
    case constants.DELETEPLAYLIST:
      deletePlaylist(action.playlistDeleted);
      AppStore.emit(EVENT_DELETE_PLAYLIST);
      break;
    case constants.UPDATEPLAYLIST:
      updatePlaylist(action.updatedPlaylist);
      AppStore.emit(EVENT_UPDATE_PLAYLIST);
      break;
    case constants.CREATEPLAYLIST:
      createPlaylist(action.createdNewPlaylist);
      AppStore.emit(EVENT_CREATE_PLAYLIST);
      break;
    default:
      console.log("Flux/store.js: NOT SUPPOSE TO BE HERE");
      console.log(action);
      return true;
  }
});

module.exports = AppStore;

},{"../constants":2,"../dispatcher/AppDispatcher":3,"events":5,"object-assign":15}],5:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
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

},{"_process":16}],8:[function(require,module,exports){
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

},{"_process":16}],9:[function(require,module,exports){
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

},{"./invariant":8,"_process":16}],10:[function(require,module,exports){
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
},{}],11:[function(require,module,exports){
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
  (function () {
    var printWarning = function printWarning(format) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

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
    };

    warning = function warning(condition, format) {
      if (format === undefined) {
        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
      }

      if (format.indexOf('Failed Composite propType: ') === 0) {
        return; // Ignore CompositeComponent proptype check.
      }

      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  })();
}

module.exports = warning;
}).call(this,require('_process'))

},{"./emptyFunction":6,"_process":16}],12:[function(require,module,exports){
/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports.Dispatcher = require('./lib/Dispatcher');

},{"./lib/Dispatcher":13}],13:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Dispatcher
 * 
 * @preventMunge
 */

'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var invariant = require('fbjs/lib/invariant');

var _prefix = 'ID_';

/**
 * Dispatcher is used to broadcast payloads to registered callbacks. This is
 * different from generic pub-sub systems in two ways:
 *
 *   1) Callbacks are not subscribed to particular events. Every payload is
 *      dispatched to every registered callback.
 *   2) Callbacks can be deferred in whole or part until other callbacks have
 *      been executed.
 *
 * For example, consider this hypothetical flight destination form, which
 * selects a default city when a country is selected:
 *
 *   var flightDispatcher = new Dispatcher();
 *
 *   // Keeps track of which country is selected
 *   var CountryStore = {country: null};
 *
 *   // Keeps track of which city is selected
 *   var CityStore = {city: null};
 *
 *   // Keeps track of the base flight price of the selected city
 *   var FlightPriceStore = {price: null}
 *
 * When a user changes the selected city, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'city-update',
 *     selectedCity: 'paris'
 *   });
 *
 * This payload is digested by `CityStore`:
 *
 *   flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'city-update') {
 *       CityStore.city = payload.selectedCity;
 *     }
 *   });
 *
 * When the user selects a country, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'country-update',
 *     selectedCountry: 'australia'
 *   });
 *
 * This payload is digested by both stores:
 *
 *   CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       CountryStore.country = payload.selectedCountry;
 *     }
 *   });
 *
 * When the callback to update `CountryStore` is registered, we save a reference
 * to the returned token. Using this token with `waitFor()`, we can guarantee
 * that `CountryStore` is updated before the callback that updates `CityStore`
 * needs to query its data.
 *
 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       // `CountryStore.country` may not be updated.
 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
 *       // `CountryStore.country` is now guaranteed to be updated.
 *
 *       // Select the default city for the new country
 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
 *     }
 *   });
 *
 * The usage of `waitFor()` can be chained, for example:
 *
 *   FlightPriceStore.dispatchToken =
 *     flightDispatcher.register(function(payload) {
 *       switch (payload.actionType) {
 *         case 'country-update':
 *         case 'city-update':
 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
 *           FlightPriceStore.price =
 *             getFlightPriceStore(CountryStore.country, CityStore.city);
 *           break;
 *     }
 *   });
 *
 * The `country-update` payload will be guaranteed to invoke the stores'
 * registered callbacks in order: `CountryStore`, `CityStore`, then
 * `FlightPriceStore`.
 */

var Dispatcher = (function () {
  function Dispatcher() {
    _classCallCheck(this, Dispatcher);

    this._callbacks = {};
    this._isDispatching = false;
    this._isHandled = {};
    this._isPending = {};
    this._lastID = 1;
  }

  /**
   * Registers a callback to be invoked with every dispatched payload. Returns
   * a token that can be used with `waitFor()`.
   */

  Dispatcher.prototype.register = function register(callback) {
    var id = _prefix + this._lastID++;
    this._callbacks[id] = callback;
    return id;
  };

  /**
   * Removes a callback based on its token.
   */

  Dispatcher.prototype.unregister = function unregister(id) {
    !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.unregister(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
    delete this._callbacks[id];
  };

  /**
   * Waits for the callbacks specified to be invoked before continuing execution
   * of the current callback. This method should only be used by a callback in
   * response to a dispatched payload.
   */

  Dispatcher.prototype.waitFor = function waitFor(ids) {
    !this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Must be invoked while dispatching.') : invariant(false) : undefined;
    for (var ii = 0; ii < ids.length; ii++) {
      var id = ids[ii];
      if (this._isPending[id]) {
        !this._isHandled[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Circular dependency detected while ' + 'waiting for `%s`.', id) : invariant(false) : undefined;
        continue;
      }
      !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
      this._invokeCallback(id);
    }
  };

  /**
   * Dispatches a payload to all registered callbacks.
   */

  Dispatcher.prototype.dispatch = function dispatch(payload) {
    !!this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.') : invariant(false) : undefined;
    this._startDispatching(payload);
    try {
      for (var id in this._callbacks) {
        if (this._isPending[id]) {
          continue;
        }
        this._invokeCallback(id);
      }
    } finally {
      this._stopDispatching();
    }
  };

  /**
   * Is this Dispatcher currently dispatching.
   */

  Dispatcher.prototype.isDispatching = function isDispatching() {
    return this._isDispatching;
  };

  /**
   * Call the callback stored with the given id. Also do some internal
   * bookkeeping.
   *
   * @internal
   */

  Dispatcher.prototype._invokeCallback = function _invokeCallback(id) {
    this._isPending[id] = true;
    this._callbacks[id](this._pendingPayload);
    this._isHandled[id] = true;
  };

  /**
   * Set up bookkeeping needed when dispatching.
   *
   * @internal
   */

  Dispatcher.prototype._startDispatching = function _startDispatching(payload) {
    for (var id in this._callbacks) {
      this._isPending[id] = false;
      this._isHandled[id] = false;
    }
    this._pendingPayload = payload;
    this._isDispatching = true;
  };

  /**
   * Clear bookkeeping used for dispatching.
   *
   * @internal
   */

  Dispatcher.prototype._stopDispatching = function _stopDispatching() {
    delete this._pendingPayload;
    this._isDispatching = false;
  };

  return Dispatcher;
})();

module.exports = Dispatcher;
}).call(this,require('_process'))

},{"_process":16,"fbjs/lib/invariant":14}],14:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule invariant
 */

"use strict";

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

var invariant = function (condition, format, a, b, c, d, e, f) {
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
      error = new Error('Invariant Violation: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;
}).call(this,require('_process'))

},{"_process":16}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
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

},{}],17:[function(require,module,exports){
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
},{}],18:[function(require,module,exports){
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

},{"./reactProdInvariant":39,"_process":16,"fbjs/lib/invariant":8}],19:[function(require,module,exports){
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
var ReactPureComponent = require('./ReactPureComponent');
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
  PureComponent: ReactPureComponent,

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

},{"./ReactChildren":20,"./ReactClass":21,"./ReactComponent":22,"./ReactDOMFactories":25,"./ReactElement":26,"./ReactElementValidator":27,"./ReactPropTypes":31,"./ReactPureComponent":33,"./ReactVersion":34,"./onlyChild":38,"_process":16,"fbjs/lib/warning":11,"object-assign":15}],20:[function(require,module,exports){
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
},{"./PooledClass":18,"./ReactElement":26,"./traverseAllChildren":40,"fbjs/lib/emptyFunction":6}],21:[function(require,module,exports){
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
    if (process.env.NODE_ENV !== 'production') {
      var typeofSpec = typeof spec;
      var isMixinValid = typeofSpec === 'object' && spec !== null;

      process.env.NODE_ENV !== 'production' ? warning(isMixinValid, '%s: You\'re attempting to include a mixin that is either null ' + 'or not an object. Check the mixins included by the component, ' + 'as well as any mixins they include themselves. ' + 'Expected object but got %s.', Constructor.displayName || 'ReactClass', spec === null ? null : typeofSpec) : void 0;
    }

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

},{"./ReactComponent":22,"./ReactElement":26,"./ReactNoopUpdateQueue":28,"./ReactPropTypeLocationNames":29,"./ReactPropTypeLocations":30,"./reactProdInvariant":39,"_process":16,"fbjs/lib/emptyObject":7,"fbjs/lib/invariant":8,"fbjs/lib/keyMirror":9,"fbjs/lib/keyOf":10,"fbjs/lib/warning":11,"object-assign":15}],22:[function(require,module,exports){
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

},{"./ReactNoopUpdateQueue":28,"./canDefineProperty":35,"./reactProdInvariant":39,"_process":16,"fbjs/lib/emptyObject":7,"fbjs/lib/invariant":8,"fbjs/lib/warning":11}],23:[function(require,module,exports){
(function (process){
/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactComponentTreeHook
 */

'use strict';

var _prodInvariant = require('./reactProdInvariant');

var ReactCurrentOwner = require('./ReactCurrentOwner');

var invariant = require('fbjs/lib/invariant');
var warning = require('fbjs/lib/warning');

function isNative(fn) {
  // Based on isNative() from Lodash
  var funcToString = Function.prototype.toString;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var reIsNative = RegExp('^' + funcToString
  // Take an example native function source for comparison
  .call(hasOwnProperty)
  // Strip regex characters so we can use it for regex
  .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  // Remove hasOwnProperty from the template to make it generic
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
  try {
    var source = funcToString.call(fn);
    return reIsNative.test(source);
  } catch (err) {
    return false;
  }
}

var canUseCollections =
// Array.from
typeof Array.from === 'function' &&
// Map
typeof Map === 'function' && isNative(Map) &&
// Map.prototype.keys
Map.prototype != null && typeof Map.prototype.keys === 'function' && isNative(Map.prototype.keys) &&
// Set
typeof Set === 'function' && isNative(Set) &&
// Set.prototype.keys
Set.prototype != null && typeof Set.prototype.keys === 'function' && isNative(Set.prototype.keys);

var itemMap;
var rootIDSet;

var itemByKey;
var rootByKey;

if (canUseCollections) {
  itemMap = new Map();
  rootIDSet = new Set();
} else {
  itemByKey = {};
  rootByKey = {};
}

var unmountedIDs = [];

// Use non-numeric keys to prevent V8 performance issues:
// https://github.com/facebook/react/pull/7232
function getKeyFromID(id) {
  return '.' + id;
}
function getIDFromKey(key) {
  return parseInt(key.substr(1), 10);
}

function get(id) {
  if (canUseCollections) {
    return itemMap.get(id);
  } else {
    var key = getKeyFromID(id);
    return itemByKey[key];
  }
}

function remove(id) {
  if (canUseCollections) {
    itemMap['delete'](id);
  } else {
    var key = getKeyFromID(id);
    delete itemByKey[key];
  }
}

function create(id, element, parentID) {
  var item = {
    element: element,
    parentID: parentID,
    text: null,
    childIDs: [],
    isMounted: false,
    updateCount: 0
  };

  if (canUseCollections) {
    itemMap.set(id, item);
  } else {
    var key = getKeyFromID(id);
    itemByKey[key] = item;
  }
}

function addRoot(id) {
  if (canUseCollections) {
    rootIDSet.add(id);
  } else {
    var key = getKeyFromID(id);
    rootByKey[key] = true;
  }
}

function removeRoot(id) {
  if (canUseCollections) {
    rootIDSet['delete'](id);
  } else {
    var key = getKeyFromID(id);
    delete rootByKey[key];
  }
}

function getRegisteredIDs() {
  if (canUseCollections) {
    return Array.from(itemMap.keys());
  } else {
    return Object.keys(itemByKey).map(getIDFromKey);
  }
}

function getRootIDs() {
  if (canUseCollections) {
    return Array.from(rootIDSet.keys());
  } else {
    return Object.keys(rootByKey).map(getIDFromKey);
  }
}

function purgeDeep(id) {
  var item = get(id);
  if (item) {
    var childIDs = item.childIDs;

    remove(id);
    childIDs.forEach(purgeDeep);
  }
}

function describeComponentFrame(name, source, ownerName) {
  return '\n    in ' + name + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
}

function getDisplayName(element) {
  if (element == null) {
    return '#empty';
  } else if (typeof element === 'string' || typeof element === 'number') {
    return '#text';
  } else if (typeof element.type === 'string') {
    return element.type;
  } else {
    return element.type.displayName || element.type.name || 'Unknown';
  }
}

function describeID(id) {
  var name = ReactComponentTreeHook.getDisplayName(id);
  var element = ReactComponentTreeHook.getElement(id);
  var ownerID = ReactComponentTreeHook.getOwnerID(id);
  var ownerName;
  if (ownerID) {
    ownerName = ReactComponentTreeHook.getDisplayName(ownerID);
  }
  process.env.NODE_ENV !== 'production' ? warning(element, 'ReactComponentTreeHook: Missing React element for debugID %s when ' + 'building stack', id) : void 0;
  return describeComponentFrame(name, element && element._source, ownerName);
}

var ReactComponentTreeHook = {
  onSetChildren: function (id, nextChildIDs) {
    var item = get(id);
    item.childIDs = nextChildIDs;

    for (var i = 0; i < nextChildIDs.length; i++) {
      var nextChildID = nextChildIDs[i];
      var nextChild = get(nextChildID);
      !nextChild ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected hook events to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('140') : void 0;
      !(nextChild.childIDs != null || typeof nextChild.element !== 'object' || nextChild.element == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onSetChildren() to fire for a container child before its parent includes it in onSetChildren().') : _prodInvariant('141') : void 0;
      !nextChild.isMounted ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onMountComponent() to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('71') : void 0;
      if (nextChild.parentID == null) {
        nextChild.parentID = id;
        // TODO: This shouldn't be necessary but mounting a new root during in
        // componentWillMount currently causes not-yet-mounted components to
        // be purged from our tree data so their parent ID is missing.
      }
      !(nextChild.parentID === id) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onBeforeMountComponent() parent and onSetChildren() to be consistent (%s has parents %s and %s).', nextChildID, nextChild.parentID, id) : _prodInvariant('142', nextChildID, nextChild.parentID, id) : void 0;
    }
  },
  onBeforeMountComponent: function (id, element, parentID) {
    create(id, element, parentID);
  },
  onBeforeUpdateComponent: function (id, element) {
    var item = get(id);
    if (!item || !item.isMounted) {
      // We may end up here as a result of setState() in componentWillUnmount().
      // In this case, ignore the element.
      return;
    }
    item.element = element;
  },
  onMountComponent: function (id) {
    var item = get(id);
    item.isMounted = true;
    var isRoot = item.parentID === 0;
    if (isRoot) {
      addRoot(id);
    }
  },
  onUpdateComponent: function (id) {
    var item = get(id);
    if (!item || !item.isMounted) {
      // We may end up here as a result of setState() in componentWillUnmount().
      // In this case, ignore the element.
      return;
    }
    item.updateCount++;
  },
  onUnmountComponent: function (id) {
    var item = get(id);
    if (item) {
      // We need to check if it exists.
      // `item` might not exist if it is inside an error boundary, and a sibling
      // error boundary child threw while mounting. Then this instance never
      // got a chance to mount, but it still gets an unmounting event during
      // the error boundary cleanup.
      item.isMounted = false;
      var isRoot = item.parentID === 0;
      if (isRoot) {
        removeRoot(id);
      }
    }
    unmountedIDs.push(id);
  },
  purgeUnmountedComponents: function () {
    if (ReactComponentTreeHook._preventPurging) {
      // Should only be used for testing.
      return;
    }

    for (var i = 0; i < unmountedIDs.length; i++) {
      var id = unmountedIDs[i];
      purgeDeep(id);
    }
    unmountedIDs.length = 0;
  },
  isMounted: function (id) {
    var item = get(id);
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

    info += ReactComponentTreeHook.getStackAddendumByID(id);
    return info;
  },
  getStackAddendumByID: function (id) {
    var info = '';
    while (id) {
      info += describeID(id);
      id = ReactComponentTreeHook.getParentID(id);
    }
    return info;
  },
  getChildIDs: function (id) {
    var item = get(id);
    return item ? item.childIDs : [];
  },
  getDisplayName: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (!element) {
      return null;
    }
    return getDisplayName(element);
  },
  getElement: function (id) {
    var item = get(id);
    return item ? item.element : null;
  },
  getOwnerID: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (!element || !element._owner) {
      return null;
    }
    return element._owner._debugID;
  },
  getParentID: function (id) {
    var item = get(id);
    return item ? item.parentID : null;
  },
  getSource: function (id) {
    var item = get(id);
    var element = item ? item.element : null;
    var source = element != null ? element._source : null;
    return source;
  },
  getText: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (typeof element === 'string') {
      return element;
    } else if (typeof element === 'number') {
      return '' + element;
    } else {
      return null;
    }
  },
  getUpdateCount: function (id) {
    var item = get(id);
    return item ? item.updateCount : 0;
  },


  getRegisteredIDs: getRegisteredIDs,

  getRootIDs: getRootIDs
};

module.exports = ReactComponentTreeHook;
}).call(this,require('_process'))

},{"./ReactCurrentOwner":24,"./reactProdInvariant":39,"_process":16,"fbjs/lib/invariant":8,"fbjs/lib/warning":11}],24:[function(require,module,exports){
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
 * @providesModule ReactDOMFactories
 */

'use strict';

var ReactElement = require('./ReactElement');

/**
 * Create a factory that creates HTML tag elements.
 *
 * @private
 */
var createDOMFactory = ReactElement.createFactory;
if (process.env.NODE_ENV !== 'production') {
  var ReactElementValidator = require('./ReactElementValidator');
  createDOMFactory = ReactElementValidator.createFactory;
}

/**
 * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
 * This is also accessible via `React.DOM`.
 *
 * @public
 */
var ReactDOMFactories = {
  a: createDOMFactory('a'),
  abbr: createDOMFactory('abbr'),
  address: createDOMFactory('address'),
  area: createDOMFactory('area'),
  article: createDOMFactory('article'),
  aside: createDOMFactory('aside'),
  audio: createDOMFactory('audio'),
  b: createDOMFactory('b'),
  base: createDOMFactory('base'),
  bdi: createDOMFactory('bdi'),
  bdo: createDOMFactory('bdo'),
  big: createDOMFactory('big'),
  blockquote: createDOMFactory('blockquote'),
  body: createDOMFactory('body'),
  br: createDOMFactory('br'),
  button: createDOMFactory('button'),
  canvas: createDOMFactory('canvas'),
  caption: createDOMFactory('caption'),
  cite: createDOMFactory('cite'),
  code: createDOMFactory('code'),
  col: createDOMFactory('col'),
  colgroup: createDOMFactory('colgroup'),
  data: createDOMFactory('data'),
  datalist: createDOMFactory('datalist'),
  dd: createDOMFactory('dd'),
  del: createDOMFactory('del'),
  details: createDOMFactory('details'),
  dfn: createDOMFactory('dfn'),
  dialog: createDOMFactory('dialog'),
  div: createDOMFactory('div'),
  dl: createDOMFactory('dl'),
  dt: createDOMFactory('dt'),
  em: createDOMFactory('em'),
  embed: createDOMFactory('embed'),
  fieldset: createDOMFactory('fieldset'),
  figcaption: createDOMFactory('figcaption'),
  figure: createDOMFactory('figure'),
  footer: createDOMFactory('footer'),
  form: createDOMFactory('form'),
  h1: createDOMFactory('h1'),
  h2: createDOMFactory('h2'),
  h3: createDOMFactory('h3'),
  h4: createDOMFactory('h4'),
  h5: createDOMFactory('h5'),
  h6: createDOMFactory('h6'),
  head: createDOMFactory('head'),
  header: createDOMFactory('header'),
  hgroup: createDOMFactory('hgroup'),
  hr: createDOMFactory('hr'),
  html: createDOMFactory('html'),
  i: createDOMFactory('i'),
  iframe: createDOMFactory('iframe'),
  img: createDOMFactory('img'),
  input: createDOMFactory('input'),
  ins: createDOMFactory('ins'),
  kbd: createDOMFactory('kbd'),
  keygen: createDOMFactory('keygen'),
  label: createDOMFactory('label'),
  legend: createDOMFactory('legend'),
  li: createDOMFactory('li'),
  link: createDOMFactory('link'),
  main: createDOMFactory('main'),
  map: createDOMFactory('map'),
  mark: createDOMFactory('mark'),
  menu: createDOMFactory('menu'),
  menuitem: createDOMFactory('menuitem'),
  meta: createDOMFactory('meta'),
  meter: createDOMFactory('meter'),
  nav: createDOMFactory('nav'),
  noscript: createDOMFactory('noscript'),
  object: createDOMFactory('object'),
  ol: createDOMFactory('ol'),
  optgroup: createDOMFactory('optgroup'),
  option: createDOMFactory('option'),
  output: createDOMFactory('output'),
  p: createDOMFactory('p'),
  param: createDOMFactory('param'),
  picture: createDOMFactory('picture'),
  pre: createDOMFactory('pre'),
  progress: createDOMFactory('progress'),
  q: createDOMFactory('q'),
  rp: createDOMFactory('rp'),
  rt: createDOMFactory('rt'),
  ruby: createDOMFactory('ruby'),
  s: createDOMFactory('s'),
  samp: createDOMFactory('samp'),
  script: createDOMFactory('script'),
  section: createDOMFactory('section'),
  select: createDOMFactory('select'),
  small: createDOMFactory('small'),
  source: createDOMFactory('source'),
  span: createDOMFactory('span'),
  strong: createDOMFactory('strong'),
  style: createDOMFactory('style'),
  sub: createDOMFactory('sub'),
  summary: createDOMFactory('summary'),
  sup: createDOMFactory('sup'),
  table: createDOMFactory('table'),
  tbody: createDOMFactory('tbody'),
  td: createDOMFactory('td'),
  textarea: createDOMFactory('textarea'),
  tfoot: createDOMFactory('tfoot'),
  th: createDOMFactory('th'),
  thead: createDOMFactory('thead'),
  time: createDOMFactory('time'),
  title: createDOMFactory('title'),
  tr: createDOMFactory('tr'),
  track: createDOMFactory('track'),
  u: createDOMFactory('u'),
  ul: createDOMFactory('ul'),
  'var': createDOMFactory('var'),
  video: createDOMFactory('video'),
  wbr: createDOMFactory('wbr'),

  // SVG
  circle: createDOMFactory('circle'),
  clipPath: createDOMFactory('clipPath'),
  defs: createDOMFactory('defs'),
  ellipse: createDOMFactory('ellipse'),
  g: createDOMFactory('g'),
  image: createDOMFactory('image'),
  line: createDOMFactory('line'),
  linearGradient: createDOMFactory('linearGradient'),
  mask: createDOMFactory('mask'),
  path: createDOMFactory('path'),
  pattern: createDOMFactory('pattern'),
  polygon: createDOMFactory('polygon'),
  polyline: createDOMFactory('polyline'),
  radialGradient: createDOMFactory('radialGradient'),
  rect: createDOMFactory('rect'),
  stop: createDOMFactory('stop'),
  svg: createDOMFactory('svg'),
  text: createDOMFactory('text'),
  tspan: createDOMFactory('tspan')
};

module.exports = ReactDOMFactories;
}).call(this,require('_process'))

},{"./ReactElement":26,"./ReactElementValidator":27,"_process":16}],26:[function(require,module,exports){
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

function defineKeyPropWarningGetter(props, displayName) {
  var warnAboutAccessingKey = function () {
    if (!specialPropKeyWarningShown) {
      specialPropKeyWarningShown = true;
      process.env.NODE_ENV !== 'production' ? warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
    }
  };
  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true
  });
}

function defineRefPropWarningGetter(props, displayName) {
  var warnAboutAccessingRef = function () {
    if (!specialPropRefWarningShown) {
      specialPropRefWarningShown = true;
      process.env.NODE_ENV !== 'production' ? warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
    }
  };
  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true
  });
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
    var shadowChildren = Array.isArray(props.children) ? props.children.slice(0) : props.children;

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
      Object.defineProperty(element, '_shadowChildren', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: shadowChildren
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
      element._shadowChildren = shadowChildren;
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
    if (key || ref) {
      if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
        if (key) {
          defineKeyPropWarningGetter(props, displayName);
        }
        if (ref) {
          defineRefPropWarningGetter(props, displayName);
        }
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

},{"./ReactCurrentOwner":24,"./canDefineProperty":35,"_process":16,"fbjs/lib/warning":11,"object-assign":15}],27:[function(require,module,exports){
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
var ReactComponentTreeHook = require('./ReactComponentTreeHook');
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

  process.env.NODE_ENV !== 'production' ? warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, ReactComponentTreeHook.getCurrentStackAddendum(element)) : void 0;
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
    if (!validType) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'React.createElement: type should not be null, undefined, boolean, or ' + 'number. It should be a string (for DOM elements) or a ReactClass ' + '(for composite components).%s', getDeclarationErrorAddendum()) : void 0;
    }

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

},{"./ReactComponentTreeHook":23,"./ReactCurrentOwner":24,"./ReactElement":26,"./ReactPropTypeLocations":30,"./canDefineProperty":35,"./checkReactTypeSpec":36,"./getIteratorFn":37,"_process":16,"fbjs/lib/warning":11}],28:[function(require,module,exports){
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

},{"_process":16,"fbjs/lib/warning":11}],29:[function(require,module,exports){
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

},{"_process":16}],30:[function(require,module,exports){
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
},{"fbjs/lib/keyMirror":9}],31:[function(require,module,exports){
(function (process){
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
var ReactPropTypesSecret = require('./ReactPropTypesSecret');

var emptyFunction = require('fbjs/lib/emptyFunction');
var getIteratorFn = require('./getIteratorFn');
var warning = require('fbjs/lib/warning');

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

/**
 * We use an Error-like object for backward compatibility as people may call
 * PropTypes directly and inspect their output. However we don't use real
 * Errors anymore. We don't inspect their stack anyway, and creating them
 * is prohibitively expensive if they are created too often, such as what
 * happens in oneOfType() for any type before the one that matched.
 */
function PropTypeError(message) {
  this.message = message;
  this.stack = '';
}
// Make `instanceof Error` still work for returned errors.
PropTypeError.prototype = Error.prototype;

function createChainableTypeChecker(validate) {
  if (process.env.NODE_ENV !== 'production') {
    var manualPropTypeCallCache = {};
  }
  function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
    componentName = componentName || ANONYMOUS;
    propFullName = propFullName || propName;
    if (process.env.NODE_ENV !== 'production') {
      if (secret !== ReactPropTypesSecret && typeof console !== 'undefined') {
        var cacheKey = componentName + ':' + propName;
        if (!manualPropTypeCallCache[cacheKey]) {
          process.env.NODE_ENV !== 'production' ? warning(false, 'You are manually calling a React.PropTypes validation ' + 'function for the `%s` prop on `%s`. This is deprecated ' + 'and will not work in the next major version. You may be ' + 'seeing this warning due to a third-party PropTypes library. ' + 'See https://fb.me/react-warning-dont-call-proptypes for details.', propFullName, componentName) : void 0;
          manualPropTypeCallCache[cacheKey] = true;
        }
      }
    }
    if (props[propName] == null) {
      var locationName = ReactPropTypeLocationNames[location];
      if (isRequired) {
        return new PropTypeError('Required ' + locationName + ' `' + propFullName + '` was not specified in ' + ('`' + componentName + '`.'));
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
  function validate(props, propName, componentName, location, propFullName, secret) {
    var propValue = props[propName];
    var propType = getPropType(propValue);
    if (propType !== expectedType) {
      var locationName = ReactPropTypeLocationNames[location];
      // `propValue` being instance of, say, date/regexp, pass the 'object'
      // check, but we can offer a more precise error message here rather than
      // 'of type `object`'.
      var preciseType = getPreciseType(propValue);

      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
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
      return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
    }
    var propValue = props[propName];
    if (!Array.isArray(propValue)) {
      var locationName = ReactPropTypeLocationNames[location];
      var propType = getPropType(propValue);
      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
    }
    for (var i = 0; i < propValue.length; i++) {
      var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
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
    var propValue = props[propName];
    if (!ReactElement.isValidElement(propValue)) {
      var locationName = ReactPropTypeLocationNames[location];
      var propType = getPropType(propValue);
      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
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
      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createEnumTypeChecker(expectedValues) {
  if (!Array.isArray(expectedValues)) {
    process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
    return emptyFunction.thatReturnsNull;
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
    return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
  }
  return createChainableTypeChecker(validate);
}

function createObjectOfTypeChecker(typeChecker) {
  function validate(props, propName, componentName, location, propFullName) {
    if (typeof typeChecker !== 'function') {
      return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
    }
    var propValue = props[propName];
    var propType = getPropType(propValue);
    if (propType !== 'object') {
      var locationName = ReactPropTypeLocationNames[location];
      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
    }
    for (var key in propValue) {
      if (propValue.hasOwnProperty(key)) {
        var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
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
    process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
    return emptyFunction.thatReturnsNull;
  }

  function validate(props, propName, componentName, location, propFullName) {
    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
        return null;
      }
    }

    var locationName = ReactPropTypeLocationNames[location];
    return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
  }
  return createChainableTypeChecker(validate);
}

function createNodeChecker() {
  function validate(props, propName, componentName, location, propFullName) {
    if (!isNode(props[propName])) {
      var locationName = ReactPropTypeLocationNames[location];
      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
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
      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
    }
    for (var key in shapeTypes) {
      var checker = shapeTypes[key];
      if (!checker) {
        continue;
      }
      var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
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
}).call(this,require('_process'))

},{"./ReactElement":26,"./ReactPropTypeLocationNames":29,"./ReactPropTypesSecret":32,"./getIteratorFn":37,"_process":16,"fbjs/lib/emptyFunction":6,"fbjs/lib/warning":11}],32:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactPropTypesSecret
 */

'use strict';

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;
},{}],33:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactPureComponent
 */

'use strict';

var _assign = require('object-assign');

var ReactComponent = require('./ReactComponent');
var ReactNoopUpdateQueue = require('./ReactNoopUpdateQueue');

var emptyObject = require('fbjs/lib/emptyObject');

/**
 * Base class helpers for the updating state of a component.
 */
function ReactPureComponent(props, context, updater) {
  // Duplicated from ReactComponent.
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

function ComponentDummy() {}
ComponentDummy.prototype = ReactComponent.prototype;
ReactPureComponent.prototype = new ComponentDummy();
ReactPureComponent.prototype.constructor = ReactPureComponent;
// Avoid an extra prototype jump for these methods.
_assign(ReactPureComponent.prototype, ReactComponent.prototype);
ReactPureComponent.prototype.isPureReactComponent = true;

module.exports = ReactPureComponent;
},{"./ReactComponent":22,"./ReactNoopUpdateQueue":28,"fbjs/lib/emptyObject":7,"object-assign":15}],34:[function(require,module,exports){
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

module.exports = '15.3.2';
},{}],35:[function(require,module,exports){
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

},{"_process":16}],36:[function(require,module,exports){
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
var ReactPropTypesSecret = require('./ReactPropTypesSecret');

var invariant = require('fbjs/lib/invariant');
var warning = require('fbjs/lib/warning');

var ReactComponentTreeHook;

if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test') {
  // Temporary hack.
  // Inline requires don't work well with Jest:
  // https://github.com/facebook/react/issues/7240
  // Remove the inline requires when we don't need them anymore:
  // https://github.com/facebook/react/pull/7178
  ReactComponentTreeHook = require('./ReactComponentTreeHook');
}

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
        error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
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
          if (!ReactComponentTreeHook) {
            ReactComponentTreeHook = require('./ReactComponentTreeHook');
          }
          if (debugID !== null) {
            componentStackInfo = ReactComponentTreeHook.getStackAddendumByID(debugID);
          } else if (element !== null) {
            componentStackInfo = ReactComponentTreeHook.getCurrentStackAddendum(element);
          }
        }

        process.env.NODE_ENV !== 'production' ? warning(false, 'Failed %s type: %s%s', location, error.message, componentStackInfo) : void 0;
      }
    }
  }
}

module.exports = checkReactTypeSpec;
}).call(this,require('_process'))

},{"./ReactComponentTreeHook":23,"./ReactPropTypeLocationNames":29,"./ReactPropTypesSecret":32,"./reactProdInvariant":39,"_process":16,"fbjs/lib/invariant":8,"fbjs/lib/warning":11}],37:[function(require,module,exports){
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
},{}],38:[function(require,module,exports){
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
  !ReactElement.isValidElement(children) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'React.Children.only expected to receive a single React element child.') : _prodInvariant('143') : void 0;
  return children;
}

module.exports = onlyChild;
}).call(this,require('_process'))

},{"./ReactElement":26,"./reactProdInvariant":39,"_process":16,"fbjs/lib/invariant":8}],39:[function(require,module,exports){
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
},{}],40:[function(require,module,exports){
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
          var mapsAsChildrenAddendum = '';
          if (ReactCurrentOwner.current) {
            var mapsAsChildrenOwnerName = ReactCurrentOwner.current.getName();
            if (mapsAsChildrenOwnerName) {
              mapsAsChildrenAddendum = ' Check the render method of `' + mapsAsChildrenOwnerName + '`.';
            }
          }
          process.env.NODE_ENV !== 'production' ? warning(didWarnAboutMaps, 'Using Maps as children is not yet fully supported. It is an ' + 'experimental feature that might be removed. Convert it to a ' + 'sequence / iterable of keyed ReactElements instead.%s', mapsAsChildrenAddendum) : void 0;
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

},{"./KeyEscapeUtils":17,"./ReactCurrentOwner":24,"./ReactElement":26,"./getIteratorFn":37,"./reactProdInvariant":39,"_process":16,"fbjs/lib/invariant":8,"fbjs/lib/warning":11}],41:[function(require,module,exports){
'use strict';

module.exports = require('./lib/React');

},{"./lib/React":19}],42:[function(require,module,exports){
"use strict";

/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    home.js

    Converts all the components in this file into Javascript
    All the .jsx files are given in views directory
    
    Browserify/Watchify allows the 'require' function to be used on the Client Side.
    
	watchify ./public/browserify/home.js -o ./public/bundles/homeBundle.js -t [ babelify --presets [ es2015 react ] ] --extension=.jsx -v
	browserify ./public/browserify/home.js -o ./public/bundles/homeBundle.js -t [ babelify --presets [ es2015 react ] ] --extension=.jsx -v

    Put this at the bottom of the HTML file. At the beginning of all the scripts in index.jsx
    <script src="/bundles/homeBundle.js"></script>
    ========================================================================== */
var HomeComponent = require('./../../views/Home.jsx');

// Reads the html of the home-props script, which was injected data from the server side
var propStr = document.getElementById("home-props").innerHTML;
console.log("Props sent from Server in String form");
console.log(propStr);
var props = JSON.parse(propStr);
console.log("Props converted into JSON:");
console.log(props);
ReactDOM.render(React.createElement(HomeComponent, { user: props.user, rooms: props.rooms, explore: props.explore, myPlaylists: props.myPlaylists }), document.getElementById('home'));

},{"./../../views/Home.jsx":47}],43:[function(require,module,exports){
'use strict';

var React = require('react');
var MediaEntry = require('./MediaEntry.jsx');

var playlistActions = require('../flux/actions/actions');
var playlistStore = require('../flux/stores/store');

var SaveCancelButtons = React.createClass({
  displayName: 'SaveCancelButtons',

  saveUpdatedPlaylist: function saveUpdatedPlaylist() {
    this.props.onSaveClick();
  },

  cancelSavingPlaylist: function cancelSavingPlaylist() {
    this.props.onCancelClick();
  },

  render: function render() {
    return React.createElement(
      'div',
      { className: 'save-cancel' },
      React.createElement(
        'button',
        { type: 'button', className: 'btn btn-primary', onClick: this.saveUpdatedPlaylist },
        'Save'
      ),
      React.createElement(
        'button',
        { type: 'button', className: 'btn btn-secondary', onClick: this.cancelSavingPlaylist },
        'Cancel'
      )
    );
  }
});

var PrivatePublicDropdown = React.createClass({
  displayName: 'PrivatePublicDropdown',

  render: function render() {
    // TODO: If the playlist is initialized as private, then the dropdown exists
    // if (!this.props.isPublic) {
    return React.createElement(
      'div',
      { className: 'private-public' },
      React.createElement(
        'div',
        { className: 'dropdown' },
        React.createElement(
          'button',
          { type: 'button', className: 'btn btn-secondary dropdown-toggle', 'data-toggle': 'dropdown', 'aria-haspopup': 'true', 'aria-expanded': 'false' },
          React.createElement('i', { className: 'fa fa-lock icon-padding' }),
          'Private Playlist',
          React.createElement('i', { className: 'fa fa-angle-down dropdown-arrow' })
        ),
        React.createElement(
          'ul',
          { className: 'dropdown-menu' },
          React.createElement(
            'li',
            null,
            React.createElement(
              'a',
              { href: 'javascript:void(0)' },
              React.createElement('i', { className: 'fa fa-lock' }),
              'Private Playlist'
            )
          ),
          React.createElement(
            'li',
            null,
            React.createElement(
              'a',
              { href: 'javascript:void(0)' },
              React.createElement('i', { className: 'fa fa-globe' }),
              'Public Playlist'
            )
          )
        )
      )
    );
    // }

    // If the playlist is initialized as public, it will stay public
    // else {
    //   return (
    //     <div className="public-note"><i className="fa fa-globe icon-padding"></i>Public Playlist</div>
    //   );  
    // }
  }
});

var DeletePlaylistButton = React.createClass({
  displayName: 'DeletePlaylistButton',

  render: function render() {
    return React.createElement(
      'button',
      { type: 'button', className: 'btn btn-trash trash-playlist-btn', 'data-toggle': 'modal', 'data-target': '#trash-confirm' },
      React.createElement('i', { className: 'fa fa-trash' })
    );
  }
});

var PlaylistHeaderButtonsToChangeStates = React.createClass({
  displayName: 'PlaylistHeaderButtonsToChangeStates',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'section' },
      React.createElement(SaveCancelButtons, { onCancelClick: this.props.onCancelClick, onSaveClick: this.props.onSaveClick }),
      React.createElement(PrivatePublicDropdown, { isPublic: this.props.isPublic }),
      React.createElement(DeletePlaylistButton, null)
    );
  }
});

var ModalDeletePlaylist = React.createClass({
  displayName: 'ModalDeletePlaylist',

  // Event handler button click
  deletePlaylist: function deletePlaylist() {
    console.log("Deleting Playlist" + this.props.playlistKey);
    $.ajax({
      type: "POST",
      url: "/playlist/delete",
      dataType: 'json',
      cache: false,
      data: { _id: this.props.playlistKey },
      success: function (data) {
        console.log(data);
        playlistActions.deletePlaylist(data.deletedPlaylist);
      }.bind(this),
      error: function (xhr, status, err) {
        console.error("ERROR: Delete Playlist errored out", status, err.toString());
      }.bind(this)
    });
  },

  render: function render() {
    return React.createElement(
      'div',
      { className: 'modal fade', id: 'trash-confirm', tabIndex: '-1', role: 'dialog', 'aria-labelledby': 'myModalLabel' },
      React.createElement(
        'div',
        { className: 'modal-dialog modal-sm', role: 'document' },
        React.createElement(
          'div',
          { className: 'modal-content' },
          React.createElement(
            'div',
            { className: 'modal-body' },
            'Are you sure you want to permanently delete this playlist?'
          ),
          React.createElement(
            'div',
            { className: 'modal-footer' },
            React.createElement(
              'button',
              { type: 'button', className: 'btn btn-secondary', 'data-dismiss': 'modal' },
              'Cancel'
            ),
            React.createElement(
              'button',
              { type: 'button', className: 'btn btn-red', 'data-dismiss': 'modal', onClick: this.deletePlaylist },
              'Delete Playlist'
            )
          )
        )
      )
    );
  }
});

var PlaylistDescription = React.createClass({
  displayName: 'PlaylistDescription',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'tab-page-header' },
      React.createElement(
        'div',
        { className: 'tab-page-text-container' },
        React.createElement(
          'a',
          { className: 'icon-btn', href: 'javascript:void(0)' },
          React.createElement(
            'div',
            { className: 'tab-page-back-btn' },
            React.createElement('i', { className: 'fa fa-lg fa-chevron-circle-left' })
          )
        ),
        React.createElement(
          'div',
          { className: 'tab-page-title onclick-edit' },
          this.props.name,
          React.createElement(
            'a',
            { className: 'icon-btn-blue', href: 'javascript:void(0)' },
            React.createElement('i', { className: 'fa fa-edit', 'aria-hidden': 'true' })
          )
        ),
        React.createElement(
          'div',
          { className: 'tab-page-curator' },
          React.createElement(
            'div',
            { className: 'playlist-user-icon' },
            React.createElement('i', { className: 'fa fa-user fa-fw', 'aria-hidden': 'true' })
          ),
          'Your Playlist'
        )
      ),
      React.createElement(
        'div',
        { className: 'tab-page-right-container' },
        React.createElement(
          'div',
          { className: 'tab-page-icon-container' },
          React.createElement(
            'div',
            { className: 'pill' },
            this.props.size,
            ' Items'
          )
        )
      )
    );
  }
});

var SearchPlaylistEntriesInPlaylist = React.createClass({
  displayName: 'SearchPlaylistEntriesInPlaylist',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'search-container' },
      React.createElement(
        'form',
        { className: 'search-input' },
        React.createElement('input', { type: 'text', name: '', placeholder: 'Search in Playlist...' })
      )
    );
  }
});

// SUB COMPONENT: EditPlaylistHeader
var EditPlaylistHeader = React.createClass({
  displayName: 'EditPlaylistHeader',

  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(PlaylistHeaderButtonsToChangeStates, { isPublic: this.props.isPublic, onCancelClick: this.props.onCancelClick, onSaveClick: this.props.onSaveClick }),
      React.createElement(ModalDeletePlaylist, { playlistKey: this.props.playlistKey }),
      React.createElement(PlaylistDescription, { name: this.props.name, size: this.props.size }),
      React.createElement(SearchPlaylistEntriesInPlaylist, null)
    );
  }
});

// MAIN COMPONENT: UsersOpenedPlaylist
var UsersOpenedPlaylist = React.createClass({
  displayName: 'UsersOpenedPlaylist',

  getInitialState: function getInitialState() {
    return {
      _id: playlistStore.getId(),
      index: playlistStore.getIndex(),
      entries: playlistStore.getEntries()
    };
  },

  componentDidMount: function componentDidMount() {
    console.log("EDIT PLAYLIST MOUNTING");
    playlistStore.addChangeListener(this.onDisplayPlaylist);
  },

  componentWillUnmount: function componentWillUnmount() {
    playlistStore.removeChangeListener(this.onDisplayPlaylist);
  },

  onDisplayPlaylist: function onDisplayPlaylist() {
    console.log("Changing display to selected playlist");
    console.log(this.props.myPlaylists[playlistStore.getIndex()].mediaEntries);
    this.setState({
      _id: playlistStore.getId(),
      index: playlistStore.getIndex(),
      entries: playlistStore.getEntries()
    });
    // this.setState({ index: playlistStore.getIndex() });
    // this.setState({ entries: playlistStore.getEntries() });
  },

  saveChanges: function saveChanges() {
    console.log("Saving Playlist");
    var savedPlaylist = [];
    var eachPlaylist;
    for (var i = 0; i < this.state.entries.length; ++i) {
      eachPlaylist = this.state.entries[i];
      if (eachPlaylist.ifDeleteIndicator === undefined || eachPlaylist.ifDeleteIndicator === false) {
        delete eachPlaylist.ifDeleteIndicator;
        savedPlaylist.push(eachPlaylist);
      }
    }
    // Don't make an ajax request when things haven't changed
    if (savedPlaylist.length == this.state.entries.length) {
      return;
    }

    $.ajax({
      type: "POST",
      url: "/playlist/update",
      dataType: 'json',
      cache: false,
      data: { _id: this.props.myPlaylists[this.state.index]._id, mediaEntries: JSON.stringify(savedPlaylist) },
      success: function (data) {
        console.log(data);
        this.setState({ entries: data.updatedPlaylist.mediaEntries });
        playlistActions.updatePlaylist(data.updatedPlaylist);
      }.bind(this),
      error: function (xhr, status, err) {
        console.error("ERROR: Update Playlist errored out", status, err.toString());
      }.bind(this)
    });
  },

  cancelChanges: function cancelChanges() {
    console.log("Canceling changes");
    var savedPlaylist = [];
    var eachPlaylist;
    for (var i = 0; i < this.state.entries.length; ++i) {
      eachPlaylist = this.state.entries[i];
      if (eachPlaylist.ifDeleteIndicator !== undefined) {
        delete eachPlaylist.ifDeleteIndicator;
      }
      savedPlaylist.push(eachPlaylist);
    }

    this.setState({ entries: savedPlaylist }, function () {
      console.log(this.state.entries);
    });
  },

  deleteMediaEntryInPlaylist: function deleteMediaEntryInPlaylist(posInPlaylist) {
    console.log(this.state.entries);
    var updatedPlaylist = this.state.entries;
    if (updatedPlaylist[posInPlaylist].ifDeleteIndicator === true) updatedPlaylist[posInPlaylist].ifDeleteIndicator = false;else {
      updatedPlaylist[posInPlaylist].ifDeleteIndicator = true;
    }
    this.setState({ entries: updatedPlaylist });

    // console.log("Deleting media entry in Playlist: " + posInPlaylist);
    // var updatedEntries = this.state.entries;
    // updatedEntries.splice(posInPlaylist, 1);
    // if (posInPlaylist > -1) {
    //   this.setState({ entries: updatedEntries });
    // }

    // this.setState({deletedList : this.state.deletedList.push(posInPlaylist)})
  },

  render: function render() {
    var mediaEntriesInPlaylist = [];
    var propName = "";
    var propSize = 0;
    var propLikes = "";
    var propIsPublic = true;
    var propKey = "";

    // TODO: Should fix this if statement, when deleting the displayed playlist, should reinitialize the states all to null
    // Not keep the state as the previous deleted playlist
    if (this.state.index !== null && this.props.myPlaylists[this.state.index] !== undefined) {
      var selectedPlaylist = this.props.myPlaylists[this.state.index];

      // var mediaEntries = selectedPlaylist.mediaEntries;
      var mediaEntries = this.state.entries;

      // You do this because the array itself has an _id. The array technically isn't empty when empty. (Don't know if this concept applies to here though)
      var mediaEntry = mediaEntries[0];

      for (var i = 0; i < mediaEntries.length; ++i) {
        mediaEntry = mediaEntries[i];
        if (mediaEntry !== null) {
          var deleteIndicator = mediaEntry.ifDeleteIndicator === undefined ? deleteIndicator = false : deleteIndicator = mediaEntry.ifDeleteIndicator;
          mediaEntriesInPlaylist.push(React.createElement(MediaEntry, {
            key: "mediaEntry" + mediaEntry.mediaId + i,
            pos: i,
            mediaId: mediaEntry.mediaId,
            categoryType: 'PLAYLIST',
            mediaType: 'YOUTUBE',
            thumbnail: mediaEntry.thumbnail,
            title: mediaEntry.title,
            artist: mediaEntry.artist,
            ifMediaCardAdded: false,
            user: this.props.user,
            myPlaylists: this.props.myPlaylists,
            deleteEntry: this.deleteMediaEntryInPlaylist,
            deleteIndicator: deleteIndicator }));
        }
      }

      propName = selectedPlaylist.name;
      propSize = mediaEntry !== null ? selectedPlaylist.mediaEntries.length : 0;
      propLikes = selectedPlaylist.likes;
      propIsPublic = selectedPlaylist.isPublic;
      propKey = selectedPlaylist._id;
    }

    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'edit-playlist-container' },
        React.createElement(EditPlaylistHeader, { name: propName, size: propSize, isPublic: propIsPublic, playlistKey: propKey, onCancelClick: this.cancelChanges, onSaveClick: this.saveChanges }),
        React.createElement(
          'div',
          { className: 'row' },
          mediaEntriesInPlaylist
        )
      )
    );
  }
});

module.exports = UsersOpenedPlaylist;

},{"../flux/actions/actions":1,"../flux/stores/store":4,"./MediaEntry.jsx":48,"react":41}],44:[function(require,module,exports){
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

},{"react":41}],45:[function(require,module,exports){
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

},{"react":41}],46:[function(require,module,exports){
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
            { href: "/user" },
            "Profile"
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

},{"react":41}],47:[function(require,module,exports){
'use strict';

/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    Home.jsx

    Home page displayed when logging in.
    Instant option to select room to join, or browse playlists.
    ========================================================================== */

/*  =============================================================================
    Components

    Home - Entire html for the Home component.
    ========================================================================== */
var React = require('react');

// Sub-components in Room
var Header = require('./Header.jsx');
var PublicRooms = require('./PublicRooms.jsx');
var MyRooms = require('./MyRooms.jsx');
var Explore = require('./Explore.jsx');
var MyPlaylists = require('./MyPlaylists.jsx');
var PlaylistTab = require('./PlaylistTab.jsx');
var EditOpenedPlaylist = require('./EditOpenedPlaylist.jsx');
var ViewOpenedPlaylist = require('./ViewOpenedPlaylist.jsx');
var ModalCreatePlaylist = require('./ModalCreatePlaylist.jsx');
var Footer = require('./Footer.jsx');

// Flux, used to check for deleted playlists
var playlistStore = require('../flux/stores/store');

// MAIN COMPONENT: Home
var Home = React.createClass({
  displayName: 'Home',

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
    // Sets up the Flux event listeners for the playlists
    playlistStore.addDeletePlaylistListener(this.onDeleteSpecifiedPlaylist);
    playlistStore.addUpdatePlaylistListener(this.onUpdateSpecifiedPlaylist);
    playlistStore.addCreatePlaylistListener(this.updateAllPlaylistEntries);

    socket.on("From Server: Update MyPlaylist with new playlists", this.updateAllPlaylistEntries);
  },

  componentWillUnmount: function componentWillUnmount() {
    // Unmounts the event listener
    playlistStore.removeDeletePlaylistListener(this.onDeleteSpecifiedPlaylist);
    playlistStore.removeUpdatePlaylistListener(this.onUpdateSpecifiedPlaylist);
    playlistStore.removeCreatePlaylistListener(this.updateAllPlaylistEntries);
  },

  // FLUX EVENT HANDLER: Deletes a playlist entry from myPlaylist
  onDeleteSpecifiedPlaylist: function onDeleteSpecifiedPlaylist() {
    console.log("Room.jsx: onDeleteSpecifiedPlaylist");
    var playlist = playlistStore.getPlaylistDeleted();
    if (playlist === null || playlist === undefined) {
      return;
    }

    // TODO: Do search in a faster way (Probably would have the position of the playlist)
    for (var i = 0; i < this.state.myPlaylists.length; ++i) {
      if (this.state.myPlaylists[i]._id === playlist._id) {
        // Show the playlist tab
        $('#tab-myplaylists').tab('show');

        var playlistsWithDeletedEntry = this.state.myPlaylists;
        playlistsWithDeletedEntry.splice(i, 1);
        this.setState({ myPlaylists: playlistsWithDeletedEntry });
        return;
      }
    }
  },

  // FLUX EVENT HANDLER: Updates a playlist entry from myPlaylist
  onUpdateSpecifiedPlaylist: function onUpdateSpecifiedPlaylist() {
    var playlist = playlistStore.getUpdatedPlaylist();
    if (playlist === null || playlist === undefined) {
      return;
    }

    // TODO: Do search in a faster way
    for (var i = 0; i < this.state.myPlaylists.length; ++i) {
      if (this.state.myPlaylists[i]._id === playlist._id) {
        var playlistsWithUpdatedEntry = this.state.myPlaylists;
        playlistsWithUpdatedEntry[i] = playlist;
        this.setState({ myPlaylists: playlistsWithUpdatedEntry });
        return;
      }
    }
  },

  // FLUX EVENT HANDLER: Appends a new playlist onto myPlaylist
  updateAllPlaylistEntries: function updateAllPlaylistEntries(newPlaylist) {
    console.log("Update with new playlist entry");
    var newPlaylist = playlistStore.getCreatedPlaylist();
    var playlistsWithNewEntry = this.state.myPlaylists.concat(newPlaylist);
    this.setState({ myPlaylists: playlistsWithNewEntry });
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
              { className: 'col-sm-offset-1 col-sm-10 tabbed-container' },
              React.createElement(
                'ul',
                { className: 'nav nav-tabs nav-centered nav-dark' },
                React.createElement(
                  'li',
                  null,
                  React.createElement(
                    'a',
                    { id: 'tab-publicrooms', 'data-toggle': 'tab', href: '#publicrooms' },
                    React.createElement('i', { className: 'fa fa-globe icon-padding' }),
                    'Public Rooms'
                  )
                ),
                React.createElement(
                  'li',
                  { className: 'active' },
                  React.createElement(
                    'a',
                    { id: 'tab-myrooms', 'data-toggle': 'tab', href: '#myrooms' },
                    React.createElement('i', { className: 'fa fa-home icon-padding' }),
                    'My Rooms'
                  )
                )
              ),
              React.createElement(
                'div',
                { className: 'tab-content' },
                React.createElement(
                  'div',
                  { id: 'publicrooms', className: 'tab-pane fade' },
                  React.createElement(PublicRooms, null)
                ),
                React.createElement(
                  'div',
                  { id: 'myrooms', className: 'tab-pane fade in active' },
                  React.createElement(MyRooms, { rooms: this.props.rooms, user: this.props.user })
                )
              )
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
              { className: 'col-padding' },
              React.createElement(
                'div',
                { className: 'placeholder placeholder-message' },
                React.createElement(
                  'div',
                  { className: 'placeholder-content' },
                  React.createElement('i', { className: 'fa fa-chevron-up placeholder-icon' }),
                  React.createElement('br', null),
                  React.createElement(
                    'span',
                    null,
                    'You must enter a room to play a playlist'
                  )
                )
              )
            ),
            React.createElement(
              'div',
              { className: 'col-sm-offset-1 col-sm-10 tabbed-container' },
              React.createElement(
                'ul',
                { className: 'nav nav-tabs nav-centered' },
                React.createElement(
                  'li',
                  { className: 'active' },
                  React.createElement(
                    'a',
                    { id: 'tab-explore', 'data-toggle': 'tab', href: '#explore' },
                    React.createElement('i', { className: 'fa fa-rocket icon-padding' }),
                    'Explore'
                  )
                ),
                React.createElement(PlaylistTab, { type: "MyPlaylist", user: this.props.user }),
                React.createElement(
                  'li',
                  null,
                  React.createElement('a', { className: 'hidden', 'data-toggle': 'tab', href: '#edit-playlist', id: 'tab-edit-playlist' })
                ),
                React.createElement(
                  'li',
                  null,
                  React.createElement('a', { className: 'hidden', 'data-toggle': 'tab', href: '#view-playlist', id: 'tab-view-playlist' })
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
                  React.createElement(MyPlaylists, { myPlaylists: this.state.myPlaylists, home: true })
                ),
                React.createElement(
                  'div',
                  { id: 'edit-playlist', className: 'tab-pane fade' },
                  React.createElement(EditOpenedPlaylist, { myPlaylists: this.state.myPlaylists, user: this.props.user })
                ),
                React.createElement(
                  'div',
                  { id: 'view-playlist', className: 'tab-pane fade' },
                  React.createElement(ViewOpenedPlaylist, { myPlaylists: this.state.myPlaylists, user: this.props.user })
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

module.exports = Home;

},{"../flux/stores/store":4,"./EditOpenedPlaylist.jsx":43,"./Explore.jsx":44,"./Footer.jsx":45,"./Header.jsx":46,"./ModalCreatePlaylist.jsx":49,"./MyPlaylists.jsx":51,"./MyRooms.jsx":52,"./PlaylistTab.jsx":54,"./PublicRooms.jsx":55,"./ViewOpenedPlaylist.jsx":57,"react":41}],48:[function(require,module,exports){
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
var ModalCreatePlaylist = require('./ModalCreatePlaylist.jsx');

// Flux Actions
var playlistActions = require('../flux/actions/actions');

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
      case CATEGORYOFMEDIA.PLAYLIST:
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
      case CATEGORYOFMEDIA.PLAYLIST:
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
      case CATEGORYOFMEDIA.PLAYLIST:
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
      case CATEGORYOFMEDIA.QUEUE:
        categoryClassName = 'media-type';
        break;
      case CATEGORYOFMEDIA.PLAYLIST:
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
    $.ajax({
      type: "POST",
      url: "/playlist/push/mediaEntry",
      dataType: 'json',
      cache: false,
      data: {
        data: JSON.stringify({
          mediaData: this.props.data,
          id: this.props.playlist._id,
          firstEntry: this.props.playlist.mediaEntries[0]
        })
      },
      success: function (data) {
        console.log("Success: Updating playlist");
        playlistActions.updatePlaylist(data.updatedPlaylist);
      }.bind(this),
      error: function (xhr, status, err) {
        console.error("ERROR: Add to playlist errored out", status, err.toString());
      }.bind(this)
    });

    // socket.emit('From Client: Add to existing playlist', {
    //   mediaData: this.props.data,
    //   id: this.props.playlist._id,
    //   firstEntry: this.props.playlist.mediaEntries[0]
    // });
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
    if (this.props.categoryType == CATEGORYOFMEDIA.SEARCH || this.props.categoryType == CATEGORYOFMEDIA.PLAYLIST) {
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

  // EVENT HANDLER: Deletes playlist entry in the opened edit playlist
  deletePlaylistEntry: function deletePlaylistEntry() {
    this.props.deleteEntry(this.props.pos);
  },

  componentDidMount: function componentDidMount() {
    // This needs to be retooltipped because the media entries are not rendered when the site loads.
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
        if (this.props.ifMediaCardAdded === true) {
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
              React.createElement(Type, { type: this.props.mediaType, categoryType: this.props.categoryType }),
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
            React.createElement(Type, { type: this.props.mediaType, categoryType: this.props.categoryType }),
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

      // Media Entry that is in the playlist entry component
      case CATEGORYOFMEDIA.PLAYLIST:
        var dropdown = [];
        var mediaData = {
          artist: this.props.artist,
          mediaId: this.props.mediaId,
          mediaType: this.props.mediaType,
          thumbnail: this.props.thumbnail,
          title: this.props.title
          // TODO: The search entry does not have the same db _id. Need to find a way to add media entries without duplicates
          // _id: this.props._id
        };

        // If a user is logged in, the dropdown appears        
        dropdown.push(React.createElement(
          'div',
          { key: this.props.pos, className: 'media-icon' },
          React.createElement(
            'a',
            { className: 'icon-btn-blue-lite dropdown-toggle', 'data-toggle': 'dropdown', 'aria-haspopup': 'true', 'aria-expanded': 'false', href: 'javascript:void(0)' },
            React.createElement('i', { className: 'fa fa-list-ul', ref: function ref(_ref) {
                return _this.icon3 = _ref;
              }, 'data-toggle': 'tooltip', title: 'Add to Playlist', 'aria-hidden': 'true' })
          ),
          React.createElement(PlaylistDropdown, { myPlaylists: this.props.myPlaylists, data: mediaData, pos: this.props.pos })
        ));

        // If the playlist is a liked one
        if (this.props.owner === false) {
          return React.createElement(
            'div',
            { className: 'col-md-6 col-sm-12 col-padding' },
            React.createElement(
              'div',
              { className: 'playlist-media-card' },
              React.createElement(Thumbnail, { thumbnail: this.props.thumbnail, categoryType: this.props.categoryType }),
              React.createElement(
                'div',
                { className: 'media-text-container' },
                React.createElement(Title, { title: this.props.title, categoryType: this.props.categoryType }),
                React.createElement(Artist, { artist: this.props.artist, categoryType: this.props.categoryType }),
                React.createElement(Type, { type: this.props.mediaType, categoryType: this.props.categoryType }),
                React.createElement(
                  'div',
                  { className: 'media-icon-container' },
                  React.createElement(
                    'div',
                    { className: 'media-icon' },
                    React.createElement(
                      'a',
                      { className: 'icon-btn', href: 'javascript:void(0)', onClick: this.addToQueue },
                      React.createElement('i', { className: 'fa fa-plus', ref: function ref(_ref2) {
                          return _this.icon1 = _ref2;
                        }, 'data-toggle': 'tooltip', title: 'Add to Queue' })
                    )
                  ),
                  React.createElement(
                    'div',
                    { className: 'media-icon' },
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
            )
          );
        }

        var deleteIndicatorClass = " ";
        if (this.props.deleteIndicator === false) {
          deleteIndicatorClass = " media-card-added ";
        }

        // If the playlist was made by the current user
        return React.createElement(
          'div',
          { className: "col-md-6 col-sm-12 col-padding edit-playlist-card" },
          React.createElement(
            'div',
            { className: "playlist-media-card" + deleteIndicatorClass + "grabbable" },
            React.createElement(
              'div',
              { className: 'media-card-added-corner-container' },
              React.createElement('div', { className: 'media-card-added-corner' })
            ),
            React.createElement(
              'a',
              { className: 'media-card-added-plus icon-btn-white', href: 'javascript:void(0)', onClick: this.deletePlaylistEntry },
              '+'
            ),
            React.createElement(Thumbnail, { thumbnail: this.props.thumbnail, categoryType: this.props.categoryType }),
            React.createElement(
              'div',
              { className: 'media-text-container' },
              React.createElement(Title, { title: this.props.title, categoryType: this.props.categoryType }),
              React.createElement(Artist, { artist: this.props.artist, categoryType: this.props.categoryType }),
              React.createElement(Type, { type: this.props.mediaType, categoryType: this.props.categoryType }),
              React.createElement(
                'div',
                { className: 'media-icon-container' },
                React.createElement(
                  'div',
                  { className: 'media-icon' },
                  React.createElement(
                    'a',
                    { className: 'icon-btn-blue-lite', href: 'javascript:void(0)', onClick: this.addToQueue },
                    React.createElement('i', { className: 'fa fa-plus', ref: function ref(_ref4) {
                        return _this.icon1 = _ref4;
                      }, 'data-toggle': 'tooltip', title: 'Add to Queue' })
                  )
                ),
                React.createElement(
                  'div',
                  { className: 'media-icon' },
                  React.createElement(
                    'a',
                    { className: 'icon-btn-blue-lite', href: 'javascript:void(0)', onClick: this.playMediaEntry },
                    React.createElement('i', { className: 'fa fa-play', ref: function ref(_ref5) {
                        return _this.icon2 = _ref5;
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
                React.createElement('i', { className: 'fa fa-list-ul', ref: function ref(_ref6) {
                    return _this.icon3 = _ref6;
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
                  React.createElement('i', { className: 'fa fa-plus fa-lg', ref: function ref(_ref7) {
                      return _this.icon1 = _ref7;
                    }, 'data-toggle': 'tooltip', title: 'Add to Queue' })
                )
              ),
              React.createElement(
                'div',
                { className: 'search-media-icon' },
                React.createElement(
                  'a',
                  { className: 'icon-btn', href: 'javascript:void(0)', onClick: this.playMediaEntry },
                  React.createElement('i', { className: 'fa fa-play', ref: function ref(_ref8) {
                      return _this.icon2 = _ref8;
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

},{"../flux/actions/actions":1,"./ModalCreatePlaylist.jsx":49,"react":41}],49:[function(require,module,exports){
'use strict';

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

// Flux Action
var playlistActions = require('../flux/actions/actions');

// The icon which tells the user if the new playlist would be either public or private
var ToggleIcon = React.createClass({
  displayName: 'ToggleIcon',

  render: function render() {
    // Toggles the icon to the globe or lock depending on if the new playlist would be public or private
    var toggleClass;
    if (this.props.isPublic === true) {
      toggleClass = "fa fa-globe";
    } else {
      toggleClass = "fa fa-lock";
    }

    return React.createElement(
      'div',
      { className: 'toggle-slider-section' },
      React.createElement(
        'label',
        { className: 'switch' },
        React.createElement('input', { type: 'checkbox', id: 'create-playlist-toggle', onChange: this.props.onChange }),
        React.createElement('div', { className: 'slider' })
      ),
      React.createElement('i', { className: toggleClass, id: 'create-playlist-toggle-icon' })
    );
  }
});

// MAIN COMPONENT: Create New Playlist Modal Popup
var ModalCreatePlaylist = React.createClass({
  displayName: 'ModalCreatePlaylist',

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

    $.ajax({
      type: "POST",
      url: "/playlist/create",
      dataType: 'json',
      cache: false,
      data: { data: JSON.stringify(data) },
      success: function (newPlaylist) {
        console.log(newPlaylist);
        playlistActions.createPlaylist(newPlaylist.createdPlaylist);
      }.bind(this),
      error: function (xhr, status, err) {
        console.error("ERROR: Create Playlist errored out", status, err.toString());
      }.bind(this)
    });
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
      'div',
      { className: 'modal fade', id: modalId, tabIndex: '-1', role: 'dialog', 'aria-labelledby': 'myModalLabel' },
      React.createElement(
        'div',
        { className: 'modal-dialog modal-sm', role: 'document' },
        React.createElement(
          'div',
          { className: 'modal-content' },
          React.createElement(
            'div',
            { className: 'modal-header' },
            'Create a New Playlist'
          ),
          React.createElement(
            'div',
            { className: 'modal-body' },
            React.createElement(
              'div',
              { className: 'search-container' },
              React.createElement(
                'form',
                { className: 'search-input', id: 'create-playlist-input', onSubmit: this.onSubmit },
                React.createElement('input', { className: 'input-padding', type: 'text', placeholder: 'Playlist Name', onChange: this.onChangePlaylistName }),
                React.createElement(
                  'div',
                  { className: 'modal-label' },
                  'Is this a private playlist?'
                ),
                React.createElement(ToggleIcon, { isPublic: this.state.isPublic, onChange: this.onChangeIsPublic })
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'modal-footer' },
            React.createElement(
              'button',
              { type: 'button', className: 'btn btn-secondary', 'data-dismiss': 'modal' },
              'Cancel'
            ),
            React.createElement(
              'button',
              { type: 'button', className: 'btn btn-primary', 'data-dismiss': 'modal', onClick: this.addToPlaylist },
              'Create Playlist'
            )
          )
        )
      )
    );
  }
});

// Required to call modal from other components
module.exports = ModalCreatePlaylist;

},{"../flux/actions/actions":1,"react":41}],50:[function(require,module,exports){
"use strict";

/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    VIEW: ModalCreateRoom.jsx

    The component for when the Modal pops up for creating a new room
    ========================================================================== */

/*  =============================================================================
    @Components:    ToggleIcon
                    ModalCreateRoom

    @Exports:       ModalCreateRoom
    ========================================================================== */
var React = require('react');

// The icon which tells the user if the new room would be either public or private
var ToggleIcon = React.createClass({
  displayName: "ToggleIcon",

  render: function render() {
    // Toggles the icon to the globe or lock depending on if the new room would be public or private
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
        React.createElement("input", { type: "checkbox", id: "create-room-toggle", onChange: this.props.onChange }),
        React.createElement("div", { className: "slider" })
      ),
      React.createElement("i", { className: toggleClass, id: "create-room-toggle-icon" })
    );
  }
});

// Modal to create a new room
var ModalCreateRoom = React.createClass({
  displayName: "ModalCreateRoom",

  getInitialState: function getInitialState() {
    return {
      roomNameInput: "",
      isPublic: true
    };
  },

  onChangeRoomName: function onChangeRoomName(e) {
    this.setState({ roomNameInput: e.target.value });
  },

  onChangeIsPublic: function onChangeIsPublic(e) {
    // The playlist is public when the target is not checked
    console.log(this.state.isPublic);
    this.setState({ isPublic: !e.target.checked });
  },

  onSubmit: function onSubmit(e) {
    e.preventDefault();
  },

  addToRooms: function addToRooms(e) {
    // Check room input
    if (this.state.roomNameInput === "") {
      // TODO: Display error message
      return;
    }

    // Checks if user is logged in or not
    var userCreatingRoom = this.props.user;
    var userNameCreatingRoom = "";
    if (this.props.user === undefined) {
      userCreatingRoom = "A USER";
    } else {
      userCreatingRoom = this.props.user.local.email;
    }

    $.ajax({
      type: "POST",
      url: "/room/create",
      dataType: 'json',
      cache: false,
      data: {
        roomName: this.state.roomNameInput,
        owner: userCreatingRoom
      },
      success: function (data) {
        window.location = "/room/" + data.roomId;
      }.bind(this),
      error: function (xhr, status, err) {
        console.error("ERROR: Create room errored out", status, err.toString());
      }.bind(this)
    });
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "modal fade", id: "create-room", tabIndex: "-1", role: "dialog", "aria-labelledby": "myModalLabel" },
      React.createElement(
        "div",
        { className: "modal-dialog modal-sm", role: "document" },
        React.createElement(
          "div",
          { className: "modal-content" },
          React.createElement(
            "div",
            { className: "modal-header" },
            "Create a New Room"
          ),
          React.createElement(
            "div",
            { className: "modal-body" },
            React.createElement(
              "div",
              { className: "search-container" },
              React.createElement(
                "form",
                { className: "search-input", id: "create-room-input", onSubmit: this.onSubmit },
                React.createElement("input", { className: "input-padding", type: "text", placeholder: "Room Name", onChange: this.onChangeRoomName }),
                React.createElement(
                  "div",
                  { className: "modal-label" },
                  "Is this a private room?"
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
              { type: "button", className: "btn btn-primary", "data-dismiss": "modal", onClick: this.addToRooms },
              "Create Room"
            )
          )
        )
      )
    );
  }
});

module.exports = ModalCreateRoom;

},{"react":41}],51:[function(require,module,exports){
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
var PlaylistEntry = require('./PlaylistEntry.jsx');

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
            _id: playlistEntry._id,
            pos: i,
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

},{"./PlaylistEntry.jsx":53,"react":41}],52:[function(require,module,exports){
'use strict';

/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    MyRoom.jsx

    Section containing all of the RoomEntries
    ========================================================================== */

/*  =============================================================================
    @Components:    MyRoomsPlaceholder
                    MyRooms

    @Exports:       MyRooms
    ========================================================================== */
var React = require('react');
var RoomEntry = require('./RoomEntry.jsx');
var ModalCreateRoom = require('./ModalCreateRoom.jsx');

// Placeholder if user is not a part of any room
var MyRoomsPlaceholder = React.createClass({
  displayName: 'MyRoomsPlaceholder',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'col-padding' },
      React.createElement(
        'div',
        { className: 'placeholder placeholder-rooms' },
        React.createElement(
          'div',
          { className: 'placeholder-content' },
          React.createElement('i', { className: 'fa fa-home placeholder-icon' }),
          React.createElement('br', null),
          React.createElement(
            'span',
            null,
            'You have no rooms'
          )
        )
      )
    );
  }
});

// MAIN COMPONENT: My Rooms Tab
var MyRooms = React.createClass({
  displayName: 'MyRooms',

  getInitialState: function getInitialState() {
    return {
      rooms: this.props.rooms
    };
  },

  render: function render() {
    var roomEntries = [];

    // Placeholder if there are no rooms
    if (this.state.rooms === undefined || this.state.rooms === null || this.state.rooms.length <= 0) {
      roomEntries.push(React.createElement(MyRoomsPlaceholder, { key: 'MyRoomsPlaceholder' }));
    }

    // If there are rooms, pushes every room card
    else {
        var roomEntry;
        for (var i = 0; i < this.state.rooms.length; ++i) {
          roomEntry = this.state.rooms[i];

          roomEntries.push(React.createElement(RoomEntry, {
            key: i,
            owner: true,
            moderator: true,
            type: roomEntry.isPublic,
            name: roomEntry.name,
            inroom: roomEntry.inRoom,
            size: '35',
            thumbnail: roomEntry.thumbnail,
            isLite: this.props.isLite,
            linkHash: roomEntry._id }));
        }
      }

    // If isLite prop is true, use primary button, else use dark button
    var buttonClassName = "btn";
    if (this.props.isLite == true) {
      buttonClassName += " btn-primary";
    } else {
      buttonClassName += " btn-dark";
    };

    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'myrooms-container' },
        React.createElement(
          'div',
          { className: 'rooms-section' },
          React.createElement(
            'button',
            { className: buttonClassName, 'data-toggle': 'modal', 'data-target': '#create-room' },
            React.createElement('i', { className: 'fa fa-plus icon-padding' }),
            'Create New Room'
          )
        ),
        React.createElement(
          'div',
          { className: 'row' },
          roomEntries
        ),
        React.createElement(ModalCreateRoom, { user: this.props.user })
      )
    );
  }
});

module.exports = MyRooms;

},{"./ModalCreateRoom.jsx":50,"./RoomEntry.jsx":56,"react":41}],53:[function(require,module,exports){
'use strict';

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

var playlistActions = require('../flux/actions/actions');

// Icon displayed depends on whether playlist is public, private, or not owner
var PlaylistIcon = React.createClass({
  displayName: 'PlaylistIcon',

  render: function render() {
    if (this.props.owner == false) {
      return React.createElement(
        'div',
        { className: 'playlist-icon' },
        React.createElement(
          'a',
          { className: 'icon-btn like-btn', href: 'javascript:void(0)' },
          React.createElement('i', { className: 'fa fa-heart-o', 'aria-hidden': 'true' })
        )
      );
    } else if (this.props.owner == true && this.props.type == false) {
      return React.createElement(
        'div',
        { className: 'playlist-icon' },
        React.createElement('i', { className: 'fa fa-lock', 'aria-hidden': 'true' })
      );
    } else {
      return React.createElement(
        'div',
        { className: 'playlist-icon' },
        React.createElement('i', { className: 'fa fa-globe', 'aria-hidden': 'true' })
      );
    };
  }
});

// MAIN COMPONENT: Each individual playlist card
var PlaylistEntry = React.createClass({
  displayName: 'PlaylistEntry',


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
    console.log(this.props.mediaEntries);
    console.log("Going to playlist page: " + this.props.title + " Index: " + this.props.pos);
    playlistActions.displayPlaylist(this.props._id, this.props.pos, this.props.mediaEntries);

    // TODO: If currently mobile, show the mobile tab instead
    // Open selected playlist owned by current user
    if (this.props.owner) {
      $('#tab-edit-playlist').tab('show');
    }
    // Open selected liked playlist
    else {
        $('#tab-view-playlist').tab('show');
      }
    // TODO: For the Back button      
    // The back button should have a stack like implementation, each element being where the previous was from
    // var playlistData = {
    //   pos: this.props.pos,
    //   clickedFrom: "MYPLAYLIST"
    // }
    // playlistActions.displayPlaylist(playlistData);
  },

  // EVENT HANDLER: Opens the curator's page
  goToCuratorPage: function goToCuratorPage() {
    console.log("Going to curator page: " + this.props.curator);

    // TODO: For the Back button
    // The back button should have a stack like implementation, each element being where the previous was from
    // var curatorData = {
    //   pos: this.props.pos,
    //   clickedFrom: "MYPLAYLIST"
    // }
    // playlistActions.Curator(curatorData);
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
        'div',
        { className: 'col-md-3 col-sm-4 col-padding' },
        React.createElement(
          'div',
          { className: playlistCardClassName },
          React.createElement(
            'div',
            { className: 'playlist-img-container' },
            React.createElement('img', { className: 'playlist-img', src: thumbnail })
          ),
          React.createElement(
            'div',
            { className: 'playlist-text-container' },
            React.createElement(
              'div',
              { className: 'playlist-title' },
              React.createElement(
                'a',
                { className: 'playlist-link playlist-title-text ellipses', 'data-toggle': 'tab', href: '#open-playlist', onClick: this.goToPlaylistPage },
                this.props.title
              ),
              React.createElement(
                'div',
                { className: 'pill', 'data-toggle': 'tooltip', title: 'Items in Playlist' },
                this.props.size
              )
            ),
            React.createElement(
              'div',
              { className: 'playlist-curator' },
              React.createElement(
                'a',
                { className: 'curator-link', 'data-toggle': 'tab', href: '#curator-page', onClick: this.goToCuratorPage },
                this.props.curator
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'playlist-icon-container' },
            React.createElement(PlaylistIcon, { owner: this.props.owner, type: this.props.type, liked: this.props.liked })
          )
        )
      );
    }

    return React.createElement(
      'div',
      { className: 'col-md-3 col-sm-4 col-padding' },
      React.createElement(
        'div',
        { className: playlistCardClassName },
        React.createElement(
          'div',
          { className: 'playlist-img-container' },
          React.createElement(
            'a',
            { href: 'javascript:void(0)', onClick: this.playPlaylist },
            React.createElement(
              'div',
              { className: 'playlist-overlay' },
              React.createElement(
                'div',
                { className: 'playlist-overlay-content' },
                React.createElement(
                  'div',
                  { className: 'playlist-play-icon' },
                  React.createElement('i', { className: 'fa fa-play', 'aria-hidden': 'true' })
                ),
                'PLAY ALL'
              )
            )
          ),
          React.createElement('img', { className: 'playlist-img', src: thumbnail })
        ),
        React.createElement(
          'div',
          { className: 'playlist-text-container' },
          React.createElement(
            'div',
            { className: 'playlist-title' },
            React.createElement(
              'a',
              { className: 'playlist-link playlist-title-text ellipses', 'data-toggle': 'tab', href: '#open-playlist', onClick: this.goToPlaylistPage },
              this.props.title
            ),
            React.createElement(
              'div',
              { className: 'pill', 'data-toggle': 'tooltip', title: 'Items in Playlist' },
              this.props.size
            )
          ),
          React.createElement(
            'div',
            { className: 'playlist-curator' },
            React.createElement(
              'a',
              { className: 'curator-link', 'data-toggle': 'tab', href: '#curator-page', onClick: this.goToCuratorPage },
              this.props.curator
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'playlist-icon-container' },
          React.createElement(PlaylistIcon, { owner: this.props.owner, type: this.props.type, liked: this.props.liked })
        )
      )
    );
  }
});

module.exports = PlaylistEntry;

},{"../flux/actions/actions":1,"react":41}],54:[function(require,module,exports){
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

},{"react":41}],55:[function(require,module,exports){
"use strict";

var React = require('react');

var PublicRooms = React.createClass({
  displayName: "PublicRooms",

  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "search-container" },
        React.createElement(
          "form",
          { className: "search-input search-input-dark" },
          React.createElement("input", { type: "text", placeholder: "Search Public Rooms..." })
        )
      ),
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "div",
          { className: "col-padding" },
          React.createElement(
            "div",
            { className: "placeholder placeholder-rooms" },
            React.createElement(
              "div",
              { className: "placeholder-content" },
              React.createElement("i", { className: "fa fa-globe placeholder-icon" }),
              React.createElement("br", null),
              React.createElement(
                "span",
                null,
                "This page is still being created"
              )
            )
          )
        )
      ),
      React.createElement(
        "div",
        { className: "publicrooms-container" },
        React.createElement("div", { className: "row" })
      )
    );
  }
});

module.exports = PublicRooms;

},{"react":41}],56:[function(require,module,exports){
"use strict";

/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    VIEW: RoomEntry.jsx

    The individual entry of a room
    ========================================================================== */

/*  =============================================================================
    @Components:    RoomUsersPill
                    RoomThumbnail

    @Exports:       RoomEntry
    ========================================================================== */
var React = require('react');

// Online Users Pill, icon displayed dependent on how many users in room
var RoomUsersPill = React.createClass({
  displayName: "RoomUsersPill",

  render: function render() {
    if (this.props.inroom <= 0 || this.props.inroom == null) {
      return React.createElement(
        "div",
        { className: "room-pill" },
        React.createElement(
          "div",
          { className: "room-users" },
          "0",
          React.createElement("i", { className: "fa fa-users users-btn-icon" }),
          React.createElement("i", { className: "fa fa-circle status" })
        )
      );
    } else if (this.props.inroom <= 2) {
      return React.createElement(
        "div",
        { className: "room-pill" },
        React.createElement(
          "div",
          { className: "room-users" },
          this.props.inroom,
          React.createElement("i", { className: "fa fa-user users-btn-icon" }),
          React.createElement("i", { className: "fa fa-circle status" })
        )
      );
    } else {
      return React.createElement(
        "div",
        { className: "room-pill" },
        React.createElement(
          "div",
          { className: "room-users" },
          this.props.inroom,
          React.createElement("i", { className: "fa fa-users users-btn-icon" }),
          React.createElement("i", { className: "fa fa-circle status" })
        )
      );
    };
  }
});

// Room Thumbnail 
var RoomThumbnail = React.createClass({
  displayName: "RoomThumbnail",

  render: function render() {
    if (this.props.thumbnail !== null) {
      return React.createElement(
        "div",
        null,
        React.createElement("img", { className: "room-img", src: this.props.thumbnail })
      );
    } else {
      return React.createElement("div", null);
    }
  }
});

// MAIN COMPONENT: Each individual playlist card
var RoomEntry = React.createClass({
  displayName: "RoomEntry",

  render: function render() {

    var roomCardClassName = "room-card";

    // If room is not playing anything, append room-card-empty to classname
    if (this.props.thumbnail === null) {
      roomCardClassName += " room-card-empty";
    };

    var roomhref = "/room/" + this.props.linkHash;

    // If passed the prop of isLite, generate card with lite theme instead of dark
    if (this.props.isLite == true) {
      roomCardClassName += " room-card-lite";
    };

    return React.createElement(
      "div",
      { className: "col-sm-3 col-padding" },
      React.createElement(
        "a",
        { href: roomhref },
        React.createElement(
          "div",
          { className: roomCardClassName },
          React.createElement(
            "div",
            { className: "room-overlay" },
            React.createElement("div", { className: "room-overlay-fill" })
          ),
          React.createElement(RoomThumbnail, { thumbnail: this.props.thumbnail }),
          React.createElement(
            "div",
            { className: "room-text-container" },
            React.createElement(
              "div",
              { className: "room-title ellipses" },
              this.props.name
            ),
            React.createElement(RoomUsersPill, { inroom: this.props.inroom })
          )
        )
      )
    );
  }
});

module.exports = RoomEntry;

},{"react":41}],57:[function(require,module,exports){
"use strict";

var React = require('react');

var ViewOpenedPlaylist = React.createClass({
  displayName: "ViewOpenedPlaylist",

  render: function render() {
    return React.createElement(
      "div",
      { id: "open-playlist", className: "tab-pane fade" },
      React.createElement(
        "div",
        { className: "open-playlist-container" },
        React.createElement(
          "div",
          { className: "tab-page-header" },
          React.createElement(
            "div",
            { className: "tab-page-text-container" },
            React.createElement(
              "a",
              { className: "icon-btn", href: "javascript:void(0)" },
              React.createElement(
                "div",
                { className: "tab-page-back-btn" },
                React.createElement("i", { className: "fa fa-lg fa-chevron-circle-left" })
              )
            ),
            React.createElement(
              "div",
              { className: "tab-page-title" },
              this.props.name
            ),
            React.createElement(
              "div",
              { className: "tab-page-curator" },
              React.createElement(
                "a",
                { className: "curator-link", href: "javascript:void(0)" },
                this.props.owner
              )
            )
          ),
          React.createElement(
            "div",
            { className: "tab-page-right-container" },
            React.createElement(
              "div",
              { className: "tab-page-icon-container" },
              React.createElement(
                "div",
                { className: "pill" },
                this.props.size,
                " Items"
              )
            )
          )
        ),
        React.createElement(
          "div",
          { className: "search-container" },
          React.createElement(
            "form",
            { className: "search-input" },
            React.createElement("input", { type: "text", name: "", placeholder: "Search in Playlist..." })
          )
        )
      )
    );
  }
});

module.exports = ViewOpenedPlaylist;

},{"react":41}]},{},[42])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJmbHV4L2FjdGlvbnMvYWN0aW9ucy5qcyIsImZsdXgvY29uc3RhbnRzLmpzIiwiZmx1eC9kaXNwYXRjaGVyL0FwcERpc3BhdGNoZXIuanMiLCJmbHV4L3N0b3Jlcy9zdG9yZS5qcyIsIm5vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwibm9kZV9tb2R1bGVzL2ZianMvbGliL2VtcHR5RnVuY3Rpb24uanMiLCJub2RlX21vZHVsZXMvZmJqcy9saWIvZW1wdHlPYmplY3QuanMiLCJub2RlX21vZHVsZXMvZmJqcy9saWIvaW52YXJpYW50LmpzIiwibm9kZV9tb2R1bGVzL2ZianMvbGliL2tleU1pcnJvci5qcyIsIm5vZGVfbW9kdWxlcy9mYmpzL2xpYi9rZXlPZi5qcyIsIm5vZGVfbW9kdWxlcy9mYmpzL2xpYi93YXJuaW5nLmpzIiwibm9kZV9tb2R1bGVzL2ZsdXgvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZmx1eC9saWIvRGlzcGF0Y2hlci5qcyIsIm5vZGVfbW9kdWxlcy9mbHV4L25vZGVfbW9kdWxlcy9mYmpzL2xpYi9pbnZhcmlhbnQuanMiLCJub2RlX21vZHVsZXMvb2JqZWN0LWFzc2lnbi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL0tleUVzY2FwZVV0aWxzLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9Qb29sZWRDbGFzcy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvUmVhY3QuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1JlYWN0Q2hpbGRyZW4uanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1JlYWN0Q2xhc3MuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1JlYWN0Q29tcG9uZW50LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9SZWFjdENvbXBvbmVudFRyZWVIb29rLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9SZWFjdEN1cnJlbnRPd25lci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvUmVhY3RET01GYWN0b3JpZXMuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1JlYWN0RWxlbWVudC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvUmVhY3RFbGVtZW50VmFsaWRhdG9yLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9SZWFjdE5vb3BVcGRhdGVRdWV1ZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1JlYWN0UHJvcFR5cGVMb2NhdGlvbnMuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1JlYWN0UHJvcFR5cGVzLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvUmVhY3RQdXJlQ29tcG9uZW50LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9SZWFjdFZlcnNpb24uanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL2NhbkRlZmluZVByb3BlcnR5LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9jaGVja1JlYWN0VHlwZVNwZWMuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL2dldEl0ZXJhdG9yRm4uanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL29ubHlDaGlsZC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvcmVhY3RQcm9kSW52YXJpYW50LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi90cmF2ZXJzZUFsbENoaWxkcmVuLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L3JlYWN0LmpzIiwicHVibGljL2Jyb3dzZXJpZnkvaG9tZS5qcyIsInZpZXdzL0VkaXRPcGVuZWRQbGF5bGlzdC5qc3giLCJ2aWV3cy9FeHBsb3JlLmpzeCIsInZpZXdzL0Zvb3Rlci5qc3giLCJ2aWV3cy9IZWFkZXIuanN4Iiwidmlld3MvSG9tZS5qc3giLCJ2aWV3cy9NZWRpYUVudHJ5LmpzeCIsInZpZXdzL01vZGFsQ3JlYXRlUGxheWxpc3QuanN4Iiwidmlld3MvTW9kYWxDcmVhdGVSb29tLmpzeCIsInZpZXdzL015UGxheWxpc3RzLmpzeCIsInZpZXdzL015Um9vbXMuanN4Iiwidmlld3MvUGxheWxpc3RFbnRyeS5qc3giLCJ2aWV3cy9QbGF5bGlzdFRhYi5qc3giLCJ2aWV3cy9QdWJsaWNSb29tcy5qc3giLCJ2aWV3cy9Sb29tRW50cnkuanN4Iiwidmlld3MvVmlld09wZW5lZFBsYXlsaXN0LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBSSxnQkFBZ0IsUUFBUSw2QkFBUixDQUFwQjtBQUNBLElBQUksWUFBWSxRQUFRLGNBQVIsQ0FBaEI7O0FBRUEsSUFBSSxzQkFBc0I7QUFDeEIsbUJBQWlCLHlCQUFTLEdBQVQsRUFBYyxLQUFkLEVBQXFCLFlBQXJCLEVBQW1DO0FBQ2xELGtCQUFjLFlBQWQsQ0FBMkI7QUFDekIsa0JBQVksVUFBVSxZQURHO0FBRXpCLFdBQUssR0FGb0I7QUFHekIsYUFBTyxLQUhrQjtBQUl6QixlQUFTO0FBSmdCLEtBQTNCO0FBTUQsR0FSdUI7O0FBVXhCLGtCQUFnQix3QkFBUyxRQUFULEVBQW1CO0FBQ2pDLGtCQUFjLFlBQWQsQ0FBMkI7QUFDekIsa0JBQVksVUFBVSxjQURHO0FBRXpCLHVCQUFpQjtBQUZRLEtBQTNCO0FBSUQsR0FmdUI7O0FBaUJ4QixrQkFBZ0Isd0JBQVMsUUFBVCxFQUFtQjtBQUNqQyxrQkFBYyxZQUFkLENBQTJCO0FBQ3pCLGtCQUFZLFVBQVUsY0FERztBQUV6Qix1QkFBaUI7QUFGUSxLQUEzQjtBQUlELEdBdEJ1Qjs7QUF3QnhCLGtCQUFnQix3QkFBUyxRQUFULEVBQW1CO0FBQ2pDLGtCQUFjLFlBQWQsQ0FBMkI7QUFDekIsa0JBQVksVUFBVSxjQURHO0FBRXpCLDBC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QWpCOzs7QUMvR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUN0T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ3hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDeEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzlMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDM3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNySEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDclZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUN6S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQzNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDbk9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUMvRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzlhQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QXVCLHFCQUFLLEtBQUwsQ0FBVyxJQUFsQztBQUFBO0FBQUE7QUFERjtBQURGO0FBUkYsU0FGRjtBQWlCRTtBQUFBO0FBQUEsWUFBSyxXQUFVLGtCQUFmO0FBQ0U7QUFBQTtBQUFBLGNBQU0sV0FBVSxjQUFoQjtBQUNFLDJDQUFPLE1BQUssTUFBWixFQUFtQixNQUFLLEVBQXhCLEVBQTJCLGFBQVksdUJBQXZDO0FBREY7QUFERjtBQWpCRjtBQUZGLEtBREY7QUE2QkQ7QUEvQndDLENBQWxCLENBQXpCOztBQWtDQSxPQUFPLE9BQVAsR0FBaUIsa0JBQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBBcHBEaXNwYXRjaGVyID0gcmVxdWlyZSgnLi4vZGlzcGF0Y2hlci9BcHBEaXNwYXRjaGVyJyk7XG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vY29uc3RhbnRzJyk7XG5cbnZhciBFZGl0UGxheWxpc3RBY3Rpb25zID0ge1xuICBkaXNwbGF5UGxheWxpc3Q6IGZ1bmN0aW9uKF9pZCwgaW5kZXgsIG1lZGlhRW50cmllcykge1xuICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlQWN0aW9uKHtcbiAgICAgIGFjdGlvblR5cGU6IGNvbnN0YW50cy5FRElUUExBWUxJU1QsXG4gICAgICBfaWQ6IF9pZCxcbiAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgIGVudHJpZXM6IG1lZGlhRW50cmllc1xuICAgIH0pO1xuICB9LFxuXG4gIGRlbGV0ZVBsYXlsaXN0OiBmdW5jdGlvbihwbGF5bGlzdCkge1xuICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlQWN0aW9uKHtcbiAgICAgIGFjdGlvblR5cGU6IGNvbnN0YW50cy5ERUxFVEVQTEFZTElTVCxcbiAgICAgIHBsYXlsaXN0RGVsZXRlZDogcGxheWxpc3RcbiAgICB9KTtcbiAgfSxcblxuICB1cGRhdGVQbGF5bGlzdDogZnVuY3Rpb24ocGxheWxpc3QpIHtcbiAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZUFjdGlvbih7XG4gICAgICBhY3Rpb25UeXBlOiBjb25zdGFudHMuVVBEQVRFUExBWUxJU1QsXG4gICAgICB1cGRhdGVkUGxheWxpc3Q6IHBsYXlsaXN0XG4gICAgfSk7XG4gIH0sXG5cbiAgY3JlYXRlUGxheWxpc3Q6IGZ1bmN0aW9uKHBsYXlsaXN0KSB7XG4gICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVBY3Rpb24oe1xuICAgICAgYWN0aW9uVHlwZTogY29uc3RhbnRzLkNSRUFURVBMQVlMSVNULFxuICAgICAgY3JlYXRlZE5ld1BsYXlsaXN0OiBwbGF5bGlzdFxuICAgIH0pO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVkaXRQbGF5bGlzdEFjdGlvbnM7IiwidmFyIGNvbnN0YW50cyA9IHtcbiAgRURJVFBMQVlMSVNUOiBcIkVESVRQTEFZTElTVFwiLFxuICBERUxFVEVQTEFZTElTVDogXCJERUxFVEVQTEFZTElTVFwiLFxuICBVUERBVEVQTEFZTElTVDogXCJVUERBVEVQTEFZTElTVFwiLFxuICBDUkVBVEVQTEFZTElTVDogXCJDUkVBVEVQTEFZTElTVFwiXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29uc3RhbnRzOyIsInZhciBEaXNwYXRjaGVyID0gcmVxdWlyZSgnZmx1eCcpLkRpc3BhdGNoZXI7XG52YXIgQXBwRGlzcGF0Y2hlciA9IG5ldyBEaXNwYXRjaGVyKCk7XG5cbkFwcERpc3BhdGNoZXIuaGFuZGxlQWN0aW9uID0gZnVuY3Rpb24oYWN0aW9uKSB7XG4gIHRoaXMuZGlzcGF0Y2goe1xuICAgIHNvdXJjZTogJ1ZJRVdfQUNUSU9OJyxcbiAgICBhY3Rpb246IGFjdGlvblxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQXBwRGlzcGF0Y2hlcjsiLCJ2YXIgQXBwRGlzcGF0Y2hlciA9IHJlcXVpcmUoJy4uL2Rpc3BhdGNoZXIvQXBwRGlzcGF0Y2hlcicpO1xudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2NvbnN0YW50cycpO1xudmFyIG9iamVjdEFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcbnZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXI7XG5cbnZhciBDSEFOR0VfRVZFTlQgPSAnY2hhbmdlJztcbnZhciBFVkVOVF9ERUxFVEVfUExBWUxJU1QgPSAnRVZFTlRfREVMRVRFX1BMQVlMSVNUJztcbnZhciBFVkVOVF9VUERBVEVfUExBWUxJU1QgPSAnRVZFTlRfVVBEQVRFX1BMQVlMSVNUJztcbnZhciBFVkVOVF9DUkVBVEVfUExBWUxJU1QgPSAnRVZFTlRfQ1JFQVRFX1BMQVlMSVNUJztcblxuXG52YXIgc3RvcmUgPSB7XG4gIF9pZDogbnVsbCxcblx0aW5kZXg6IG51bGwsXG4gIGVudHJpZXM6IG51bGwsXG4gIHBsYXlsaXN0RGVsZXRlZDogbnVsbCxcbiAgdXBkYXRlZFBsYXlsaXN0OiBudWxsLFxuICBjcmVhdGVkTmV3UGxheWxpc3Q6IG51bGxcbn07XG5cbnZhciBkaXNwbGF5SW5kZXggPSBmdW5jdGlvbihfaWQsIG5ld1BvcywgbWVkaWFFbnRyaWVzKSB7XG4gIHN0b3JlLl9pZCA9IF9pZDtcbiAgc3RvcmUuaW5kZXggPSBuZXdQb3M7XG4gIHN0b3JlLmVudHJpZXMgPSBtZWRpYUVudHJpZXM7XG59O1xuXG52YXIgZGVsZXRlUGxheWxpc3QgPSBmdW5jdGlvbihwbGF5bGlzdCkge1xuICBzdG9yZS5wbGF5bGlzdERlbGV0ZWQgPSBwbGF5bGlzdDtcbn07XG5cbnZhciB1cGRhdGVQbGF5bGlzdCA9IGZ1bmN0aW9uKHBsYXlsaXN0KSB7XG4gIHN0b3JlLnVwZGF0ZWRQbGF5bGlzdCA9IHBsYXlsaXN0O1xufTtcblxudmFyIGNyZWF0ZVBsYXlsaXN0ID0gZnVuY3Rpb24ocGxheWxpc3QpIHtcbiAgc3RvcmUuY3JlYXRlZE5ld1BsYXlsaXN0ID0gcGxheWxpc3Q7XG59XG5cbnZhciBBcHBTdG9yZSA9IG9iamVjdEFzc2lnbih7fSwgRXZlbnRFbWl0dGVyLnByb3RvdHlwZSwgeyBcbiAgYWRkQ2hhbmdlTGlzdGVuZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5vbihDSEFOR0VfRVZFTlQsIGNhbGxiYWNrKTtcbiAgfSxcbiAgYWRkRGVsZXRlUGxheWxpc3RMaXN0ZW5lcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICB0aGlzLm9uKEVWRU5UX0RFTEVURV9QTEFZTElTVCwgY2FsbGJhY2spO1xuICB9LFxuICBhZGRVcGRhdGVQbGF5bGlzdExpc3RlbmVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgIHRoaXMub24oRVZFTlRfVVBEQVRFX1BMQVlMSVNULCBjYWxsYmFjayk7XG4gIH0sXG4gIGFkZENyZWF0ZVBsYXlsaXN0TGlzdGVuZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5vbihFVkVOVF9DUkVBVEVfUExBWUxJU1QsIGNhbGxiYWNrKTtcbiAgfSxcblxuICByZW1vdmVDaGFuZ2VMaXN0ZW5lcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKENIQU5HRV9FVkVOVCwgY2FsbGJhY2spO1xuICB9LFxuICByZW1vdmVEZWxldGVQbGF5bGlzdExpc3RlbmVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoRVZFTlRfREVMRVRFX1BMQVlMSVNULCBjYWxsYmFjayk7XG4gIH0sXG4gIHJlbW92ZVVwZGF0ZVBsYXlsaXN0TGlzdGVuZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcihFVkVOVF9VUERBVEVfUExBWUxJU1QsIGNhbGxiYWNrKTtcbiAgfSxcbiAgcmVtb3ZlQ3JlYXRlUGxheWxpc3RMaXN0ZW5lcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKEVWRU5UX0NSRUFURV9QTEFZTElTVCwgY2FsbGJhY2spO1xuICB9LFxuXG4gIGdldElkOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gc3RvcmUuX2lkO1xuICB9LFxuICBnZXRJbmRleDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHN0b3JlLmluZGV4O1xuICB9LFxuICBnZXRFbnRyaWVzOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gc3RvcmUuZW50cmllcztcbiAgfSxcbiAgZ2V0UGxheWxpc3REZWxldGVkOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gc3RvcmUucGxheWxpc3REZWxldGVkO1xuICB9LFxuICBnZXRVcGRhdGVkUGxheWxpc3Q6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBzdG9yZS51cGRhdGVkUGxheWxpc3Q7XG4gIH0sXG4gIGdldENyZWF0ZWRQbGF5bGlzdDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHN0b3JlLmNyZWF0ZWROZXdQbGF5bGlzdDtcbiAgfVxufSk7XG5cbkFwcERpc3BhdGNoZXIucmVnaXN0ZXIoZnVuY3Rpb24ocGF5bG9hZCkge1xuICB2YXIgYWN0aW9uID0gcGF5bG9hZC5hY3Rpb247XG4gIHN3aXRjaChhY3Rpb24uYWN0aW9uVHlwZSkge1xuICAgIGNhc2UgY29uc3RhbnRzLkVESVRQTEFZTElTVDpcbiAgICAgIGRpc3BsYXlJbmRleChhY3Rpb24uX2lkLCBhY3Rpb24uaW5kZXgsIGFjdGlvbi5lbnRyaWVzKTtcbiAgICAgIEFwcFN0b3JlLmVtaXQoQ0hBTkdFX0VWRU5UKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgY29uc3RhbnRzLkRFTEVURVBMQVlMSVNUOlxuICAgICAgZGVsZXRlUGxheWxpc3QoYWN0aW9uLnBsYXlsaXN0RGVsZXRlZCk7XG4gICAgICBBcHBTdG9yZS5lbWl0KEVWRU5UX0RFTEVURV9QTEFZTElTVCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIGNvbnN0YW50cy5VUERBVEVQTEFZTElTVDpcbiAgICAgIHVwZGF0ZVBsYXlsaXN0KGFjdGlvbi51cGRhdGVkUGxheWxpc3QpO1xuICAgICAgQXBwU3RvcmUuZW1pdChFVkVOVF9VUERBVEVfUExBWUxJU1QpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBjb25zdGFudHMuQ1JFQVRFUExBWUxJU1Q6XG4gICAgICBjcmVhdGVQbGF5bGlzdChhY3Rpb24uY3JlYXRlZE5ld1BsYXlsaXN0KTtcbiAgICAgIEFwcFN0b3JlLmVtaXQoRVZFTlRfQ1JFQVRFX1BMQVlMSVNUKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBjb25zb2xlLmxvZyhcIkZsdXgvc3RvcmUuanM6IE5PVCBTVVBQT1NFIFRPIEJFIEhFUkVcIik7XG4gICAgICBjb25zb2xlLmxvZyhhY3Rpb24pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFwcFN0b3JlOyIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIHRoaXMuX2V2ZW50cyA9IHRoaXMuX2V2ZW50cyB8fCB7fTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxuRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24obikge1xuICBpZiAoIWlzTnVtYmVyKG4pIHx8IG4gPCAwIHx8IGlzTmFOKG4pKVxuICAgIHRocm93IFR5cGVFcnJvcignbiBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyJyk7XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgZXIsIGhhbmRsZXIsIGxlbiwgYXJncywgaSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKHR5cGUgPT09ICdlcnJvcicpIHtcbiAgICBpZiAoIXRoaXMuX2V2ZW50cy5lcnJvciB8fFxuICAgICAgICAoaXNPYmplY3QodGhpcy5fZXZlbnRzLmVycm9yKSAmJiAhdGhpcy5fZXZlbnRzLmVycm9yLmxlbmd0aCkpIHtcbiAgICAgIGVyID0gYXJndW1lbnRzWzFdO1xuICAgICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1VuY2F1Z2h0LCB1bnNwZWNpZmllZCBcImVycm9yXCIgZXZlbnQuICgnICsgZXIgKyAnKScpO1xuICAgICAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNVbmRlZmluZWQoaGFuZGxlcikpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAvLyBmYXN0IGNhc2VzXG4gICAgICBjYXNlIDE6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBzbG93ZXJcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICBoYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc09iamVjdChoYW5kbGVyKSkge1xuICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgIGxpc3RlbmVycyA9IGhhbmRsZXIuc2xpY2UoKTtcbiAgICBsZW4gPSBsaXN0ZW5lcnMubGVuZ3RoO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKylcbiAgICAgIGxpc3RlbmVyc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBtO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gIGlmICh0aGlzLl9ldmVudHMubmV3TGlzdGVuZXIpXG4gICAgdGhpcy5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgIGlzRnVuY3Rpb24obGlzdGVuZXIubGlzdGVuZXIpID9cbiAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gIGVsc2UgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcbiAgZWxzZVxuICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IFt0aGlzLl9ldmVudHNbdHlwZV0sIGxpc3RlbmVyXTtcblxuICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSAmJiAhdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCkge1xuICAgIGlmICghaXNVbmRlZmluZWQodGhpcy5fbWF4TGlzdGVuZXJzKSkge1xuICAgICAgbSA9IHRoaXMuX21heExpc3RlbmVycztcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICAgIH1cblxuICAgIGlmIChtICYmIG0gPiAwICYmIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGggPiBtKSB7XG4gICAgICB0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkID0gdHJ1ZTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJyhub2RlKSB3YXJuaW5nOiBwb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5ICcgK1xuICAgICAgICAgICAgICAgICAgICAnbGVhayBkZXRlY3RlZC4gJWQgbGlzdGVuZXJzIGFkZGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1VzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0LicsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGgpO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLnRyYWNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIG5vdCBzdXBwb3J0ZWQgaW4gSUUgMTBcbiAgICAgICAgY29uc29sZS50cmFjZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICB2YXIgZmlyZWQgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBnKCkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgZyk7XG5cbiAgICBpZiAoIWZpcmVkKSB7XG4gICAgICBmaXJlZCA9IHRydWU7XG4gICAgICBsaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxuXG4gIGcubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgdGhpcy5vbih0eXBlLCBnKTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIGVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZmYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIGxpc3QsIHBvc2l0aW9uLCBsZW5ndGgsIGk7XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgbGlzdCA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgbGVuZ3RoID0gbGlzdC5sZW5ndGg7XG4gIHBvc2l0aW9uID0gLTE7XG5cbiAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8XG4gICAgICAoaXNGdW5jdGlvbihsaXN0Lmxpc3RlbmVyKSAmJiBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuXG4gIH0gZWxzZSBpZiAoaXNPYmplY3QobGlzdCkpIHtcbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSA+IDA7KSB7XG4gICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHxcbiAgICAgICAgICAobGlzdFtpXS5saXN0ZW5lciAmJiBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgIGxpc3QubGVuZ3RoID0gMDtcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3Quc3BsaWNlKHBvc2l0aW9uLCAxKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBrZXksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICByZXR1cm4gdGhpcztcblxuICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gIGlmICghdGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICBlbHNlIGlmICh0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgZm9yIChrZXkgaW4gdGhpcy5fZXZlbnRzKSB7XG4gICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgfVxuICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGxpc3RlbmVycykpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gIH0gZWxzZSBpZiAobGlzdGVuZXJzKSB7XG4gICAgLy8gTElGTyBvcmRlclxuICAgIHdoaWxlIChsaXN0ZW5lcnMubGVuZ3RoKVxuICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbbGlzdGVuZXJzLmxlbmd0aCAtIDFdKTtcbiAgfVxuICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciByZXQ7XG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0ID0gW107XG4gIGVsc2UgaWYgKGlzRnVuY3Rpb24odGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICByZXQgPSBbdGhpcy5fZXZlbnRzW3R5cGVdXTtcbiAgZWxzZVxuICAgIHJldCA9IHRoaXMuX2V2ZW50c1t0eXBlXS5zbGljZSgpO1xuICByZXR1cm4gcmV0O1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24odHlwZSkge1xuICBpZiAodGhpcy5fZXZlbnRzKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgICBpZiAoaXNGdW5jdGlvbihldmxpc3RlbmVyKSlcbiAgICAgIHJldHVybiAxO1xuICAgIGVsc2UgaWYgKGV2bGlzdGVuZXIpXG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gIH1cbiAgcmV0dXJuIDA7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbn07XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IHZvaWQgMDtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogXG4gKi9cblxuZnVuY3Rpb24gbWFrZUVtcHR5RnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGFyZztcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGFjY2VwdHMgYW5kIGRpc2NhcmRzIGlucHV0czsgaXQgaGFzIG5vIHNpZGUgZWZmZWN0cy4gVGhpcyBpc1xuICogcHJpbWFyaWx5IHVzZWZ1bCBpZGlvbWF0aWNhbGx5IGZvciBvdmVycmlkYWJsZSBmdW5jdGlvbiBlbmRwb2ludHMgd2hpY2hcbiAqIGFsd2F5cyBuZWVkIHRvIGJlIGNhbGxhYmxlLCBzaW5jZSBKUyBsYWNrcyBhIG51bGwtY2FsbCBpZGlvbSBhbGEgQ29jb2EuXG4gKi9cbnZhciBlbXB0eUZ1bmN0aW9uID0gZnVuY3Rpb24gZW1wdHlGdW5jdGlvbigpIHt9O1xuXG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zID0gbWFrZUVtcHR5RnVuY3Rpb247XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zRmFsc2UgPSBtYWtlRW1wdHlGdW5jdGlvbihmYWxzZSk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zVHJ1ZSA9IG1ha2VFbXB0eUZ1bmN0aW9uKHRydWUpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGwgPSBtYWtlRW1wdHlGdW5jdGlvbihudWxsKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNUaGlzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcztcbn07XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zQXJndW1lbnQgPSBmdW5jdGlvbiAoYXJnKSB7XG4gIHJldHVybiBhcmc7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGVtcHR5RnVuY3Rpb247IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBlbXB0eU9iamVjdCA9IHt9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBPYmplY3QuZnJlZXplKGVtcHR5T2JqZWN0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlbXB0eU9iamVjdDsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxuZnVuY3Rpb24gaW52YXJpYW50KGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgZXJyb3I7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcignTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgJyArICdmb3IgdGhlIGZ1bGwgZXJyb3IgbWVzc2FnZSBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgIH0pKTtcbiAgICAgIGVycm9yLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgfVxuXG4gICAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IGludmFyaWFudCdzIG93biBmcmFtZVxuICAgIHRocm93IGVycm9yO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW52YXJpYW50OyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAdHlwZWNoZWNrcyBzdGF0aWMtb25seVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJy4vaW52YXJpYW50Jyk7XG5cbi8qKlxuICogQ29uc3RydWN0cyBhbiBlbnVtZXJhdGlvbiB3aXRoIGtleXMgZXF1YWwgdG8gdGhlaXIgdmFsdWUuXG4gKlxuICogRm9yIGV4YW1wbGU6XG4gKlxuICogICB2YXIgQ09MT1JTID0ga2V5TWlycm9yKHtibHVlOiBudWxsLCByZWQ6IG51bGx9KTtcbiAqICAgdmFyIG15Q29sb3IgPSBDT0xPUlMuYmx1ZTtcbiAqICAgdmFyIGlzQ29sb3JWYWxpZCA9ICEhQ09MT1JTW215Q29sb3JdO1xuICpcbiAqIFRoZSBsYXN0IGxpbmUgY291bGQgbm90IGJlIHBlcmZvcm1lZCBpZiB0aGUgdmFsdWVzIG9mIHRoZSBnZW5lcmF0ZWQgZW51bSB3ZXJlXG4gKiBub3QgZXF1YWwgdG8gdGhlaXIga2V5cy5cbiAqXG4gKiAgIElucHV0OiAge2tleTE6IHZhbDEsIGtleTI6IHZhbDJ9XG4gKiAgIE91dHB1dDoge2tleTE6IGtleTEsIGtleTI6IGtleTJ9XG4gKlxuICogQHBhcmFtIHtvYmplY3R9IG9ialxuICogQHJldHVybiB7b2JqZWN0fVxuICovXG52YXIga2V5TWlycm9yID0gZnVuY3Rpb24ga2V5TWlycm9yKG9iaikge1xuICB2YXIgcmV0ID0ge307XG4gIHZhciBrZXk7XG4gICEob2JqIGluc3RhbmNlb2YgT2JqZWN0ICYmICFBcnJheS5pc0FycmF5KG9iaikpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ2tleU1pcnJvciguLi4pOiBBcmd1bWVudCBtdXN0IGJlIGFuIG9iamVjdC4nKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gIGZvciAoa2V5IGluIG9iaikge1xuICAgIGlmICghb2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICByZXRba2V5XSA9IGtleTtcbiAgfVxuICByZXR1cm4gcmV0O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBrZXlNaXJyb3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuLyoqXG4gKiBBbGxvd3MgZXh0cmFjdGlvbiBvZiBhIG1pbmlmaWVkIGtleS4gTGV0J3MgdGhlIGJ1aWxkIHN5c3RlbSBtaW5pZnkga2V5c1xuICogd2l0aG91dCBsb3NpbmcgdGhlIGFiaWxpdHkgdG8gZHluYW1pY2FsbHkgdXNlIGtleSBzdHJpbmdzIGFzIHZhbHVlc1xuICogdGhlbXNlbHZlcy4gUGFzcyBpbiBhbiBvYmplY3Qgd2l0aCBhIHNpbmdsZSBrZXkvdmFsIHBhaXIgYW5kIGl0IHdpbGwgcmV0dXJuXG4gKiB5b3UgdGhlIHN0cmluZyBrZXkgb2YgdGhhdCBzaW5nbGUgcmVjb3JkLiBTdXBwb3NlIHlvdSB3YW50IHRvIGdyYWIgdGhlXG4gKiB2YWx1ZSBmb3IgYSBrZXkgJ2NsYXNzTmFtZScgaW5zaWRlIG9mIGFuIG9iamVjdC4gS2V5L3ZhbCBtaW5pZmljYXRpb24gbWF5XG4gKiBoYXZlIGFsaWFzZWQgdGhhdCBrZXkgdG8gYmUgJ3hhMTInLiBrZXlPZih7Y2xhc3NOYW1lOiBudWxsfSkgd2lsbCByZXR1cm5cbiAqICd4YTEyJyBpbiB0aGF0IGNhc2UuIFJlc29sdmUga2V5cyB5b3Ugd2FudCB0byB1c2Ugb25jZSBhdCBzdGFydHVwIHRpbWUsIHRoZW5cbiAqIHJldXNlIHRob3NlIHJlc29sdXRpb25zLlxuICovXG52YXIga2V5T2YgPSBmdW5jdGlvbiBrZXlPZihvbmVLZXlPYmopIHtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gb25lS2V5T2JqKSB7XG4gICAgaWYgKCFvbmVLZXlPYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIHJldHVybiBrZXk7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGtleU9mOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTQtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9lbXB0eUZ1bmN0aW9uJyk7XG5cbi8qKlxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciB3YXJuaW5nID0gZW1wdHlGdW5jdGlvbjtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24gcHJpbnRXYXJuaW5nKGZvcm1hdCkge1xuICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuXG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgfSk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgICAgfSBjYXRjaCAoeCkge31cbiAgICB9O1xuXG4gICAgd2FybmluZyA9IGZ1bmN0aW9uIHdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQpIHtcbiAgICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2B3YXJuaW5nKGNvbmRpdGlvbiwgZm9ybWF0LCAuLi5hcmdzKWAgcmVxdWlyZXMgYSB3YXJuaW5nICcgKyAnbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZm9ybWF0LmluZGV4T2YoJ0ZhaWxlZCBDb21wb3NpdGUgcHJvcFR5cGU6ICcpID09PSAwKSB7XG4gICAgICAgIHJldHVybjsgLy8gSWdub3JlIENvbXBvc2l0ZUNvbXBvbmVudCBwcm9wdHlwZSBjaGVjay5cbiAgICAgIH1cblxuICAgICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbjIgPiAyID8gX2xlbjIgLSAyIDogMCksIF9rZXkyID0gMjsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICAgIGFyZ3NbX2tleTIgLSAyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICAgIH1cblxuICAgICAgICBwcmludFdhcm5pbmcuYXBwbHkodW5kZWZpbmVkLCBbZm9ybWF0XS5jb25jYXQoYXJncykpO1xuICAgICAgfVxuICAgIH07XG4gIH0pKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2FybmluZzsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMuRGlzcGF0Y2hlciA9IHJlcXVpcmUoJy4vbGliL0Rpc3BhdGNoZXInKTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgRGlzcGF0Y2hlclxuICogXG4gKiBAcHJldmVudE11bmdlXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xuXG52YXIgX3ByZWZpeCA9ICdJRF8nO1xuXG4vKipcbiAqIERpc3BhdGNoZXIgaXMgdXNlZCB0byBicm9hZGNhc3QgcGF5bG9hZHMgdG8gcmVnaXN0ZXJlZCBjYWxsYmFja3MuIFRoaXMgaXNcbiAqIGRpZmZlcmVudCBmcm9tIGdlbmVyaWMgcHViLXN1YiBzeXN0ZW1zIGluIHR3byB3YXlzOlxuICpcbiAqICAgMSkgQ2FsbGJhY2tzIGFyZSBub3Qgc3Vic2NyaWJlZCB0byBwYXJ0aWN1bGFyIGV2ZW50cy4gRXZlcnkgcGF5bG9hZCBpc1xuICogICAgICBkaXNwYXRjaGVkIHRvIGV2ZXJ5IHJlZ2lzdGVyZWQgY2FsbGJhY2suXG4gKiAgIDIpIENhbGxiYWNrcyBjYW4gYmUgZGVmZXJyZWQgaW4gd2hvbGUgb3IgcGFydCB1bnRpbCBvdGhlciBjYWxsYmFja3MgaGF2ZVxuICogICAgICBiZWVuIGV4ZWN1dGVkLlxuICpcbiAqIEZvciBleGFtcGxlLCBjb25zaWRlciB0aGlzIGh5cG90aGV0aWNhbCBmbGlnaHQgZGVzdGluYXRpb24gZm9ybSwgd2hpY2hcbiAqIHNlbGVjdHMgYSBkZWZhdWx0IGNpdHkgd2hlbiBhIGNvdW50cnkgaXMgc2VsZWN0ZWQ6XG4gKlxuICogICB2YXIgZmxpZ2h0RGlzcGF0Y2hlciA9IG5ldyBEaXNwYXRjaGVyKCk7XG4gKlxuICogICAvLyBLZWVwcyB0cmFjayBvZiB3aGljaCBjb3VudHJ5IGlzIHNlbGVjdGVkXG4gKiAgIHZhciBDb3VudHJ5U3RvcmUgPSB7Y291bnRyeTogbnVsbH07XG4gKlxuICogICAvLyBLZWVwcyB0cmFjayBvZiB3aGljaCBjaXR5IGlzIHNlbGVjdGVkXG4gKiAgIHZhciBDaXR5U3RvcmUgPSB7Y2l0eTogbnVsbH07XG4gKlxuICogICAvLyBLZWVwcyB0cmFjayBvZiB0aGUgYmFzZSBmbGlnaHQgcHJpY2Ugb2YgdGhlIHNlbGVjdGVkIGNpdHlcbiAqICAgdmFyIEZsaWdodFByaWNlU3RvcmUgPSB7cHJpY2U6IG51bGx9XG4gKlxuICogV2hlbiBhIHVzZXIgY2hhbmdlcyB0aGUgc2VsZWN0ZWQgY2l0eSwgd2UgZGlzcGF0Y2ggdGhlIHBheWxvYWQ6XG4gKlxuICogICBmbGlnaHREaXNwYXRjaGVyLmRpc3BhdGNoKHtcbiAqICAgICBhY3Rpb25UeXBlOiAnY2l0eS11cGRhdGUnLFxuICogICAgIHNlbGVjdGVkQ2l0eTogJ3BhcmlzJ1xuICogICB9KTtcbiAqXG4gKiBUaGlzIHBheWxvYWQgaXMgZGlnZXN0ZWQgYnkgYENpdHlTdG9yZWA6XG4gKlxuICogICBmbGlnaHREaXNwYXRjaGVyLnJlZ2lzdGVyKGZ1bmN0aW9uKHBheWxvYWQpIHtcbiAqICAgICBpZiAocGF5bG9hZC5hY3Rpb25UeXBlID09PSAnY2l0eS11cGRhdGUnKSB7XG4gKiAgICAgICBDaXR5U3RvcmUuY2l0eSA9IHBheWxvYWQuc2VsZWN0ZWRDaXR5O1xuICogICAgIH1cbiAqICAgfSk7XG4gKlxuICogV2hlbiB0aGUgdXNlciBzZWxlY3RzIGEgY291bnRyeSwgd2UgZGlzcGF0Y2ggdGhlIHBheWxvYWQ6XG4gKlxuICogICBmbGlnaHREaXNwYXRjaGVyLmRpc3BhdGNoKHtcbiAqICAgICBhY3Rpb25UeXBlOiAnY291bnRyeS11cGRhdGUnLFxuICogICAgIHNlbGVjdGVkQ291bnRyeTogJ2F1c3RyYWxpYSdcbiAqICAgfSk7XG4gKlxuICogVGhpcyBwYXlsb2FkIGlzIGRpZ2VzdGVkIGJ5IGJvdGggc3RvcmVzOlxuICpcbiAqICAgQ291bnRyeVN0b3JlLmRpc3BhdGNoVG9rZW4gPSBmbGlnaHREaXNwYXRjaGVyLnJlZ2lzdGVyKGZ1bmN0aW9uKHBheWxvYWQpIHtcbiAqICAgICBpZiAocGF5bG9hZC5hY3Rpb25UeXBlID09PSAnY291bnRyeS11cGRhdGUnKSB7XG4gKiAgICAgICBDb3VudHJ5U3RvcmUuY291bnRyeSA9IHBheWxvYWQuc2VsZWN0ZWRDb3VudHJ5O1xuICogICAgIH1cbiAqICAgfSk7XG4gKlxuICogV2hlbiB0aGUgY2FsbGJhY2sgdG8gdXBkYXRlIGBDb3VudHJ5U3RvcmVgIGlzIHJlZ2lzdGVyZWQsIHdlIHNhdmUgYSByZWZlcmVuY2VcbiAqIHRvIHRoZSByZXR1cm5lZCB0b2tlbi4gVXNpbmcgdGhpcyB0b2tlbiB3aXRoIGB3YWl0Rm9yKClgLCB3ZSBjYW4gZ3VhcmFudGVlXG4gKiB0aGF0IGBDb3VudHJ5U3RvcmVgIGlzIHVwZGF0ZWQgYmVmb3JlIHRoZSBjYWxsYmFjayB0aGF0IHVwZGF0ZXMgYENpdHlTdG9yZWBcbiAqIG5lZWRzIHRvIHF1ZXJ5IGl0cyBkYXRhLlxuICpcbiAqICAgQ2l0eVN0b3JlLmRpc3BhdGNoVG9rZW4gPSBmbGlnaHREaXNwYXRjaGVyLnJlZ2lzdGVyKGZ1bmN0aW9uKHBheWxvYWQpIHtcbiAqICAgICBpZiAocGF5bG9hZC5hY3Rpb25UeXBlID09PSAnY291bnRyeS11cGRhdGUnKSB7XG4gKiAgICAgICAvLyBgQ291bnRyeVN0b3JlLmNvdW50cnlgIG1heSBub3QgYmUgdXBkYXRlZC5cbiAqICAgICAgIGZsaWdodERpc3BhdGNoZXIud2FpdEZvcihbQ291bnRyeVN0b3JlLmRpc3BhdGNoVG9rZW5dKTtcbiAqICAgICAgIC8vIGBDb3VudHJ5U3RvcmUuY291bnRyeWAgaXMgbm93IGd1YXJhbnRlZWQgdG8gYmUgdXBkYXRlZC5cbiAqXG4gKiAgICAgICAvLyBTZWxlY3QgdGhlIGRlZmF1bHQgY2l0eSBmb3IgdGhlIG5ldyBjb3VudHJ5XG4gKiAgICAgICBDaXR5U3RvcmUuY2l0eSA9IGdldERlZmF1bHRDaXR5Rm9yQ291bnRyeShDb3VudHJ5U3RvcmUuY291bnRyeSk7XG4gKiAgICAgfVxuICogICB9KTtcbiAqXG4gKiBUaGUgdXNhZ2Ugb2YgYHdhaXRGb3IoKWAgY2FuIGJlIGNoYWluZWQsIGZvciBleGFtcGxlOlxuICpcbiAqICAgRmxpZ2h0UHJpY2VTdG9yZS5kaXNwYXRjaFRva2VuID1cbiAqICAgICBmbGlnaHREaXNwYXRjaGVyLnJlZ2lzdGVyKGZ1bmN0aW9uKHBheWxvYWQpIHtcbiAqICAgICAgIHN3aXRjaCAocGF5bG9hZC5hY3Rpb25UeXBlKSB7XG4gKiAgICAgICAgIGNhc2UgJ2NvdW50cnktdXBkYXRlJzpcbiAqICAgICAgICAgY2FzZSAnY2l0eS11cGRhdGUnOlxuICogICAgICAgICAgIGZsaWdodERpc3BhdGNoZXIud2FpdEZvcihbQ2l0eVN0b3JlLmRpc3BhdGNoVG9rZW5dKTtcbiAqICAgICAgICAgICBGbGlnaHRQcmljZVN0b3JlLnByaWNlID1cbiAqICAgICAgICAgICAgIGdldEZsaWdodFByaWNlU3RvcmUoQ291bnRyeVN0b3JlLmNvdW50cnksIENpdHlTdG9yZS5jaXR5KTtcbiAqICAgICAgICAgICBicmVhaztcbiAqICAgICB9XG4gKiAgIH0pO1xuICpcbiAqIFRoZSBgY291bnRyeS11cGRhdGVgIHBheWxvYWQgd2lsbCBiZSBndWFyYW50ZWVkIHRvIGludm9rZSB0aGUgc3RvcmVzJ1xuICogcmVnaXN0ZXJlZCBjYWxsYmFja3MgaW4gb3JkZXI6IGBDb3VudHJ5U3RvcmVgLCBgQ2l0eVN0b3JlYCwgdGhlblxuICogYEZsaWdodFByaWNlU3RvcmVgLlxuICovXG5cbnZhciBEaXNwYXRjaGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRGlzcGF0Y2hlcigpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRGlzcGF0Y2hlcik7XG5cbiAgICB0aGlzLl9jYWxsYmFja3MgPSB7fTtcbiAgICB0aGlzLl9pc0Rpc3BhdGNoaW5nID0gZmFsc2U7XG4gICAgdGhpcy5faXNIYW5kbGVkID0ge307XG4gICAgdGhpcy5faXNQZW5kaW5nID0ge307XG4gICAgdGhpcy5fbGFzdElEID0gMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYSBjYWxsYmFjayB0byBiZSBpbnZva2VkIHdpdGggZXZlcnkgZGlzcGF0Y2hlZCBwYXlsb2FkLiBSZXR1cm5zXG4gICAqIGEgdG9rZW4gdGhhdCBjYW4gYmUgdXNlZCB3aXRoIGB3YWl0Rm9yKClgLlxuICAgKi9cblxuICBEaXNwYXRjaGVyLnByb3RvdHlwZS5yZWdpc3RlciA9IGZ1bmN0aW9uIHJlZ2lzdGVyKGNhbGxiYWNrKSB7XG4gICAgdmFyIGlkID0gX3ByZWZpeCArIHRoaXMuX2xhc3RJRCsrO1xuICAgIHRoaXMuX2NhbGxiYWNrc1tpZF0gPSBjYWxsYmFjaztcbiAgICByZXR1cm4gaWQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBjYWxsYmFjayBiYXNlZCBvbiBpdHMgdG9rZW4uXG4gICAqL1xuXG4gIERpc3BhdGNoZXIucHJvdG90eXBlLnVucmVnaXN0ZXIgPSBmdW5jdGlvbiB1bnJlZ2lzdGVyKGlkKSB7XG4gICAgIXRoaXMuX2NhbGxiYWNrc1tpZF0gPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnRGlzcGF0Y2hlci51bnJlZ2lzdGVyKC4uLik6IGAlc2AgZG9lcyBub3QgbWFwIHRvIGEgcmVnaXN0ZXJlZCBjYWxsYmFjay4nLCBpZCkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbaWRdO1xuICB9O1xuXG4gIC8qKlxuICAgKiBXYWl0cyBmb3IgdGhlIGNhbGxiYWNrcyBzcGVjaWZpZWQgdG8gYmUgaW52b2tlZCBiZWZvcmUgY29udGludWluZyBleGVjdXRpb25cbiAgICogb2YgdGhlIGN1cnJlbnQgY2FsbGJhY2suIFRoaXMgbWV0aG9kIHNob3VsZCBvbmx5IGJlIHVzZWQgYnkgYSBjYWxsYmFjayBpblxuICAgKiByZXNwb25zZSB0byBhIGRpc3BhdGNoZWQgcGF5bG9hZC5cbiAgICovXG5cbiAgRGlzcGF0Y2hlci5wcm90b3R5cGUud2FpdEZvciA9IGZ1bmN0aW9uIHdhaXRGb3IoaWRzKSB7XG4gICAgIXRoaXMuX2lzRGlzcGF0Y2hpbmcgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnRGlzcGF0Y2hlci53YWl0Rm9yKC4uLik6IE11c3QgYmUgaW52b2tlZCB3aGlsZSBkaXNwYXRjaGluZy4nKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG4gICAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IGlkcy5sZW5ndGg7IGlpKyspIHtcbiAgICAgIHZhciBpZCA9IGlkc1tpaV07XG4gICAgICBpZiAodGhpcy5faXNQZW5kaW5nW2lkXSkge1xuICAgICAgICAhdGhpcy5faXNIYW5kbGVkW2lkXSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdEaXNwYXRjaGVyLndhaXRGb3IoLi4uKTogQ2lyY3VsYXIgZGVwZW5kZW5jeSBkZXRlY3RlZCB3aGlsZSAnICsgJ3dhaXRpbmcgZm9yIGAlc2AuJywgaWQpIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICAhdGhpcy5fY2FsbGJhY2tzW2lkXSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdEaXNwYXRjaGVyLndhaXRGb3IoLi4uKTogYCVzYCBkb2VzIG5vdCBtYXAgdG8gYSByZWdpc3RlcmVkIGNhbGxiYWNrLicsIGlkKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9pbnZva2VDYWxsYmFjayhpZCk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBEaXNwYXRjaGVzIGEgcGF5bG9hZCB0byBhbGwgcmVnaXN0ZXJlZCBjYWxsYmFja3MuXG4gICAqL1xuXG4gIERpc3BhdGNoZXIucHJvdG90eXBlLmRpc3BhdGNoID0gZnVuY3Rpb24gZGlzcGF0Y2gocGF5bG9hZCkge1xuICAgICEhdGhpcy5faXNEaXNwYXRjaGluZyA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdEaXNwYXRjaC5kaXNwYXRjaCguLi4pOiBDYW5ub3QgZGlzcGF0Y2ggaW4gdGhlIG1pZGRsZSBvZiBhIGRpc3BhdGNoLicpIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9zdGFydERpc3BhdGNoaW5nKHBheWxvYWQpO1xuICAgIHRyeSB7XG4gICAgICBmb3IgKHZhciBpZCBpbiB0aGlzLl9jYWxsYmFja3MpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzUGVuZGluZ1tpZF0pIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pbnZva2VDYWxsYmFjayhpZCk7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRoaXMuX3N0b3BEaXNwYXRjaGluZygpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSXMgdGhpcyBEaXNwYXRjaGVyIGN1cnJlbnRseSBkaXNwYXRjaGluZy5cbiAgICovXG5cbiAgRGlzcGF0Y2hlci5wcm90b3R5cGUuaXNEaXNwYXRjaGluZyA9IGZ1bmN0aW9uIGlzRGlzcGF0Y2hpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzRGlzcGF0Y2hpbmc7XG4gIH07XG5cbiAgLyoqXG4gICAqIENhbGwgdGhlIGNhbGxiYWNrIHN0b3JlZCB3aXRoIHRoZSBnaXZlbiBpZC4gQWxzbyBkbyBzb21lIGludGVybmFsXG4gICAqIGJvb2trZWVwaW5nLlxuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG5cbiAgRGlzcGF0Y2hlci5wcm90b3R5cGUuX2ludm9rZUNhbGxiYWNrID0gZnVuY3Rpb24gX2ludm9rZUNhbGxiYWNrKGlkKSB7XG4gICAgdGhpcy5faXNQZW5kaW5nW2lkXSA9IHRydWU7XG4gICAgdGhpcy5fY2FsbGJhY2tzW2lkXSh0aGlzLl9wZW5kaW5nUGF5bG9hZCk7XG4gICAgdGhpcy5faXNIYW5kbGVkW2lkXSA9IHRydWU7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNldCB1cCBib29ra2VlcGluZyBuZWVkZWQgd2hlbiBkaXNwYXRjaGluZy5cbiAgICpcbiAgICogQGludGVybmFsXG4gICAqL1xuXG4gIERpc3BhdGNoZXIucHJvdG90eXBlLl9zdGFydERpc3BhdGNoaW5nID0gZnVuY3Rpb24gX3N0YXJ0RGlzcGF0Y2hpbmcocGF5bG9hZCkge1xuICAgIGZvciAodmFyIGlkIGluIHRoaXMuX2NhbGxiYWNrcykge1xuICAgICAgdGhpcy5faXNQZW5kaW5nW2lkXSA9IGZhbHNlO1xuICAgICAgdGhpcy5faXNIYW5kbGVkW2lkXSA9IGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLl9wZW5kaW5nUGF5bG9hZCA9IHBheWxvYWQ7XG4gICAgdGhpcy5faXNEaXNwYXRjaGluZyA9IHRydWU7XG4gIH07XG5cbiAgLyoqXG4gICAqIENsZWFyIGJvb2trZWVwaW5nIHVzZWQgZm9yIGRpc3BhdGNoaW5nLlxuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG5cbiAgRGlzcGF0Y2hlci5wcm90b3R5cGUuX3N0b3BEaXNwYXRjaGluZyA9IGZ1bmN0aW9uIF9zdG9wRGlzcGF0Y2hpbmcoKSB7XG4gICAgZGVsZXRlIHRoaXMuX3BlbmRpbmdQYXlsb2FkO1xuICAgIHRoaXMuX2lzRGlzcGF0Y2hpbmcgPSBmYWxzZTtcbiAgfTtcblxuICByZXR1cm4gRGlzcGF0Y2hlcjtcbn0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gRGlzcGF0Y2hlcjsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgaW52YXJpYW50XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogVXNlIGludmFyaWFudCgpIHRvIGFzc2VydCBzdGF0ZSB3aGljaCB5b3VyIHByb2dyYW0gYXNzdW1lcyB0byBiZSB0cnVlLlxuICpcbiAqIFByb3ZpZGUgc3ByaW50Zi1zdHlsZSBmb3JtYXQgKG9ubHkgJXMgaXMgc3VwcG9ydGVkKSBhbmQgYXJndW1lbnRzXG4gKiB0byBwcm92aWRlIGluZm9ybWF0aW9uIGFib3V0IHdoYXQgYnJva2UgYW5kIHdoYXQgeW91IHdlcmVcbiAqIGV4cGVjdGluZy5cbiAqXG4gKiBUaGUgaW52YXJpYW50IG1lc3NhZ2Ugd2lsbCBiZSBzdHJpcHBlZCBpbiBwcm9kdWN0aW9uLCBidXQgdGhlIGludmFyaWFudFxuICogd2lsbCByZW1haW4gdG8gZW5zdXJlIGxvZ2ljIGRvZXMgbm90IGRpZmZlciBpbiBwcm9kdWN0aW9uLlxuICovXG5cbnZhciBpbnZhcmlhbnQgPSBmdW5jdGlvbiAoY29uZGl0aW9uLCBmb3JtYXQsIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YXJpYW50IHJlcXVpcmVzIGFuIGVycm9yIG1lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHZhciBlcnJvcjtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKCdNaW5pZmllZCBleGNlcHRpb24gb2NjdXJyZWQ7IHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCAnICsgJ2ZvciB0aGUgZnVsbCBlcnJvciBtZXNzYWdlIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhcmdzID0gW2EsIGIsIGMsIGQsIGUsIGZdO1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKCdJbnZhcmlhbnQgVmlvbGF0aW9uOiAnICsgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgICB9KSk7XG4gICAgfVxuXG4gICAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IGludmFyaWFudCdzIG93biBmcmFtZVxuICAgIHRocm93IGVycm9yO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGludmFyaWFudDsiLCIndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBzaG91bGRVc2VOYXRpdmUoKSB7XG5cdHRyeSB7XG5cdFx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZWN0IGJ1Z2d5IHByb3BlcnR5IGVudW1lcmF0aW9uIG9yZGVyIGluIG9sZGVyIFY4IHZlcnNpb25zLlxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDExOFxuXHRcdHZhciB0ZXN0MSA9IG5ldyBTdHJpbmcoJ2FiYycpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXHRcdHRlc3QxWzVdID0gJ2RlJztcblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDEpWzBdID09PSAnNScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QyID0ge307XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG5cdFx0XHR0ZXN0MlsnXycgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXSA9IGk7XG5cdFx0fVxuXHRcdHZhciBvcmRlcjIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MikubWFwKGZ1bmN0aW9uIChuKSB7XG5cdFx0XHRyZXR1cm4gdGVzdDJbbl07XG5cdFx0fSk7XG5cdFx0aWYgKG9yZGVyMi5qb2luKCcnKSAhPT0gJzAxMjM0NTY3ODknKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MyA9IHt9O1xuXHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGxldHRlcikge1xuXHRcdFx0dGVzdDNbbGV0dGVyXSA9IGxldHRlcjtcblx0XHR9KTtcblx0XHRpZiAoT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgdGVzdDMpKS5qb2luKCcnKSAhPT1cblx0XHRcdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0Ly8gV2UgZG9uJ3QgZXhwZWN0IGFueSBvZiB0aGUgYWJvdmUgdG8gdGhyb3csIGJ1dCBiZXR0ZXIgdG8gYmUgc2FmZS5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaG91bGRVc2VOYXRpdmUoKSA/IE9iamVjdC5hc3NpZ24gOiBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdFx0c3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIEtleUVzY2FwZVV0aWxzXG4gKiBcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRXNjYXBlIGFuZCB3cmFwIGtleSBzbyBpdCBpcyBzYWZlIHRvIHVzZSBhcyBhIHJlYWN0aWRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IHRvIGJlIGVzY2FwZWQuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSBlc2NhcGVkIGtleS5cbiAqL1xuXG5mdW5jdGlvbiBlc2NhcGUoa2V5KSB7XG4gIHZhciBlc2NhcGVSZWdleCA9IC9bPTpdL2c7XG4gIHZhciBlc2NhcGVyTG9va3VwID0ge1xuICAgICc9JzogJz0wJyxcbiAgICAnOic6ICc9MidcbiAgfTtcbiAgdmFyIGVzY2FwZWRTdHJpbmcgPSAoJycgKyBrZXkpLnJlcGxhY2UoZXNjYXBlUmVnZXgsIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgIHJldHVybiBlc2NhcGVyTG9va3VwW21hdGNoXTtcbiAgfSk7XG5cbiAgcmV0dXJuICckJyArIGVzY2FwZWRTdHJpbmc7XG59XG5cbi8qKlxuICogVW5lc2NhcGUgYW5kIHVud3JhcCBrZXkgZm9yIGh1bWFuLXJlYWRhYmxlIGRpc3BsYXlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IHRvIHVuZXNjYXBlLlxuICogQHJldHVybiB7c3RyaW5nfSB0aGUgdW5lc2NhcGVkIGtleS5cbiAqL1xuZnVuY3Rpb24gdW5lc2NhcGUoa2V5KSB7XG4gIHZhciB1bmVzY2FwZVJlZ2V4ID0gLyg9MHw9MikvZztcbiAgdmFyIHVuZXNjYXBlckxvb2t1cCA9IHtcbiAgICAnPTAnOiAnPScsXG4gICAgJz0yJzogJzonXG4gIH07XG4gIHZhciBrZXlTdWJzdHJpbmcgPSBrZXlbMF0gPT09ICcuJyAmJiBrZXlbMV0gPT09ICckJyA/IGtleS5zdWJzdHJpbmcoMikgOiBrZXkuc3Vic3RyaW5nKDEpO1xuXG4gIHJldHVybiAoJycgKyBrZXlTdWJzdHJpbmcpLnJlcGxhY2UodW5lc2NhcGVSZWdleCwgZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgcmV0dXJuIHVuZXNjYXBlckxvb2t1cFttYXRjaF07XG4gIH0pO1xufVxuXG52YXIgS2V5RXNjYXBlVXRpbHMgPSB7XG4gIGVzY2FwZTogZXNjYXBlLFxuICB1bmVzY2FwZTogdW5lc2NhcGVcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gS2V5RXNjYXBlVXRpbHM7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFBvb2xlZENsYXNzXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3Byb2RJbnZhcmlhbnQgPSByZXF1aXJlKCcuL3JlYWN0UHJvZEludmFyaWFudCcpO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG5cbi8qKlxuICogU3RhdGljIHBvb2xlcnMuIFNldmVyYWwgY3VzdG9tIHZlcnNpb25zIGZvciBlYWNoIHBvdGVudGlhbCBudW1iZXIgb2ZcbiAqIGFyZ3VtZW50cy4gQSBjb21wbGV0ZWx5IGdlbmVyaWMgcG9vbGVyIGlzIGVhc3kgdG8gaW1wbGVtZW50LCBidXQgd291bGRcbiAqIHJlcXVpcmUgYWNjZXNzaW5nIHRoZSBgYXJndW1lbnRzYCBvYmplY3QuIEluIGVhY2ggb2YgdGhlc2UsIGB0aGlzYCByZWZlcnMgdG9cbiAqIHRoZSBDbGFzcyBpdHNlbGYsIG5vdCBhbiBpbnN0YW5jZS4gSWYgYW55IG90aGVycyBhcmUgbmVlZGVkLCBzaW1wbHkgYWRkIHRoZW1cbiAqIGhlcmUsIG9yIGluIHRoZWlyIG93biBmaWxlcy5cbiAqL1xudmFyIG9uZUFyZ3VtZW50UG9vbGVyID0gZnVuY3Rpb24gKGNvcHlGaWVsZHNGcm9tKSB7XG4gIHZhciBLbGFzcyA9IHRoaXM7XG4gIGlmIChLbGFzcy5pbnN0YW5jZVBvb2wubGVuZ3RoKSB7XG4gICAgdmFyIGluc3RhbmNlID0gS2xhc3MuaW5zdGFuY2VQb29sLnBvcCgpO1xuICAgIEtsYXNzLmNhbGwoaW5zdGFuY2UsIGNvcHlGaWVsZHNGcm9tKTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBLbGFzcyhjb3B5RmllbGRzRnJvbSk7XG4gIH1cbn07XG5cbnZhciB0d29Bcmd1bWVudFBvb2xlciA9IGZ1bmN0aW9uIChhMSwgYTIpIHtcbiAgdmFyIEtsYXNzID0gdGhpcztcbiAgaWYgKEtsYXNzLmluc3RhbmNlUG9vbC5sZW5ndGgpIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBLbGFzcy5pbnN0YW5jZVBvb2wucG9wKCk7XG4gICAgS2xhc3MuY2FsbChpbnN0YW5jZSwgYTEsIGEyKTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBLbGFzcyhhMSwgYTIpO1xuICB9XG59O1xuXG52YXIgdGhyZWVBcmd1bWVudFBvb2xlciA9IGZ1bmN0aW9uIChhMSwgYTIsIGEzKSB7XG4gIHZhciBLbGFzcyA9IHRoaXM7XG4gIGlmIChLbGFzcy5pbnN0YW5jZVBvb2wubGVuZ3RoKSB7XG4gICAgdmFyIGluc3RhbmNlID0gS2xhc3MuaW5zdGFuY2VQb29sLnBvcCgpO1xuICAgIEtsYXNzLmNhbGwoaW5zdGFuY2UsIGExLCBhMiwgYTMpO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IEtsYXNzKGExLCBhMiwgYTMpO1xuICB9XG59O1xuXG52YXIgZm91ckFyZ3VtZW50UG9vbGVyID0gZnVuY3Rpb24gKGExLCBhMiwgYTMsIGE0KSB7XG4gIHZhciBLbGFzcyA9IHRoaXM7XG4gIGlmIChLbGFzcy5pbnN0YW5jZVBvb2wubGVuZ3RoKSB7XG4gICAgdmFyIGluc3RhbmNlID0gS2xhc3MuaW5zdGFuY2VQb29sLnBvcCgpO1xuICAgIEtsYXNzLmNhbGwoaW5zdGFuY2UsIGExLCBhMiwgYTMsIGE0KTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBLbGFzcyhhMSwgYTIsIGEzLCBhNCk7XG4gIH1cbn07XG5cbnZhciBmaXZlQXJndW1lbnRQb29sZXIgPSBmdW5jdGlvbiAoYTEsIGEyLCBhMywgYTQsIGE1KSB7XG4gIHZhciBLbGFzcyA9IHRoaXM7XG4gIGlmIChLbGFzcy5pbnN0YW5jZVBvb2wubGVuZ3RoKSB7XG4gICAgdmFyIGluc3RhbmNlID0gS2xhc3MuaW5zdGFuY2VQb29sLnBvcCgpO1xuICAgIEtsYXNzLmNhbGwoaW5zdGFuY2UsIGExLCBhMiwgYTMsIGE0LCBhNSk7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgS2xhc3MoYTEsIGEyLCBhMywgYTQsIGE1KTtcbiAgfVxufTtcblxudmFyIHN0YW5kYXJkUmVsZWFzZXIgPSBmdW5jdGlvbiAoaW5zdGFuY2UpIHtcbiAgdmFyIEtsYXNzID0gdGhpcztcbiAgIShpbnN0YW5jZSBpbnN0YW5jZW9mIEtsYXNzKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdUcnlpbmcgdG8gcmVsZWFzZSBhbiBpbnN0YW5jZSBpbnRvIGEgcG9vbCBvZiBhIGRpZmZlcmVudCB0eXBlLicpIDogX3Byb2RJbnZhcmlhbnQoJzI1JykgOiB2b2lkIDA7XG4gIGluc3RhbmNlLmRlc3RydWN0b3IoKTtcbiAgaWYgKEtsYXNzLmluc3RhbmNlUG9vbC5sZW5ndGggPCBLbGFzcy5wb29sU2l6ZSkge1xuICAgIEtsYXNzLmluc3RhbmNlUG9vbC5wdXNoKGluc3RhbmNlKTtcbiAgfVxufTtcblxudmFyIERFRkFVTFRfUE9PTF9TSVpFID0gMTA7XG52YXIgREVGQVVMVF9QT09MRVIgPSBvbmVBcmd1bWVudFBvb2xlcjtcblxuLyoqXG4gKiBBdWdtZW50cyBgQ29weUNvbnN0cnVjdG9yYCB0byBiZSBhIHBvb2xhYmxlIGNsYXNzLCBhdWdtZW50aW5nIG9ubHkgdGhlIGNsYXNzXG4gKiBpdHNlbGYgKHN0YXRpY2FsbHkpIG5vdCBhZGRpbmcgYW55IHByb3RvdHlwaWNhbCBmaWVsZHMuIEFueSBDb3B5Q29uc3RydWN0b3JcbiAqIHlvdSBnaXZlIHRoaXMgbWF5IGhhdmUgYSBgcG9vbFNpemVgIHByb3BlcnR5LCBhbmQgd2lsbCBsb29rIGZvciBhXG4gKiBwcm90b3R5cGljYWwgYGRlc3RydWN0b3JgIG9uIGluc3RhbmNlcy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBDb3B5Q29uc3RydWN0b3IgQ29uc3RydWN0b3IgdGhhdCBjYW4gYmUgdXNlZCB0byByZXNldC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHBvb2xlciBDdXN0b21pemFibGUgcG9vbGVyLlxuICovXG52YXIgYWRkUG9vbGluZ1RvID0gZnVuY3Rpb24gKENvcHlDb25zdHJ1Y3RvciwgcG9vbGVyKSB7XG4gIHZhciBOZXdLbGFzcyA9IENvcHlDb25zdHJ1Y3RvcjtcbiAgTmV3S2xhc3MuaW5zdGFuY2VQb29sID0gW107XG4gIE5ld0tsYXNzLmdldFBvb2xlZCA9IHBvb2xlciB8fCBERUZBVUxUX1BPT0xFUjtcbiAgaWYgKCFOZXdLbGFzcy5wb29sU2l6ZSkge1xuICAgIE5ld0tsYXNzLnBvb2xTaXplID0gREVGQVVMVF9QT09MX1NJWkU7XG4gIH1cbiAgTmV3S2xhc3MucmVsZWFzZSA9IHN0YW5kYXJkUmVsZWFzZXI7XG4gIHJldHVybiBOZXdLbGFzcztcbn07XG5cbnZhciBQb29sZWRDbGFzcyA9IHtcbiAgYWRkUG9vbGluZ1RvOiBhZGRQb29saW5nVG8sXG4gIG9uZUFyZ3VtZW50UG9vbGVyOiBvbmVBcmd1bWVudFBvb2xlcixcbiAgdHdvQXJndW1lbnRQb29sZXI6IHR3b0FyZ3VtZW50UG9vbGVyLFxuICB0aHJlZUFyZ3VtZW50UG9vbGVyOiB0aHJlZUFyZ3VtZW50UG9vbGVyLFxuICBmb3VyQXJndW1lbnRQb29sZXI6IGZvdXJBcmd1bWVudFBvb2xlcixcbiAgZml2ZUFyZ3VtZW50UG9vbGVyOiBmaXZlQXJndW1lbnRQb29sZXJcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUG9vbGVkQ2xhc3M7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIFJlYWN0Q2hpbGRyZW4gPSByZXF1aXJlKCcuL1JlYWN0Q2hpbGRyZW4nKTtcbnZhciBSZWFjdENvbXBvbmVudCA9IHJlcXVpcmUoJy4vUmVhY3RDb21wb25lbnQnKTtcbnZhciBSZWFjdFB1cmVDb21wb25lbnQgPSByZXF1aXJlKCcuL1JlYWN0UHVyZUNvbXBvbmVudCcpO1xudmFyIFJlYWN0Q2xhc3MgPSByZXF1aXJlKCcuL1JlYWN0Q2xhc3MnKTtcbnZhciBSZWFjdERPTUZhY3RvcmllcyA9IHJlcXVpcmUoJy4vUmVhY3RET01GYWN0b3JpZXMnKTtcbnZhciBSZWFjdEVsZW1lbnQgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudCcpO1xudmFyIFJlYWN0UHJvcFR5cGVzID0gcmVxdWlyZSgnLi9SZWFjdFByb3BUeXBlcycpO1xudmFyIFJlYWN0VmVyc2lvbiA9IHJlcXVpcmUoJy4vUmVhY3RWZXJzaW9uJyk7XG5cbnZhciBvbmx5Q2hpbGQgPSByZXF1aXJlKCcuL29ubHlDaGlsZCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbnZhciBjcmVhdGVFbGVtZW50ID0gUmVhY3RFbGVtZW50LmNyZWF0ZUVsZW1lbnQ7XG52YXIgY3JlYXRlRmFjdG9yeSA9IFJlYWN0RWxlbWVudC5jcmVhdGVGYWN0b3J5O1xudmFyIGNsb25lRWxlbWVudCA9IFJlYWN0RWxlbWVudC5jbG9uZUVsZW1lbnQ7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBSZWFjdEVsZW1lbnRWYWxpZGF0b3IgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudFZhbGlkYXRvcicpO1xuICBjcmVhdGVFbGVtZW50ID0gUmVhY3RFbGVtZW50VmFsaWRhdG9yLmNyZWF0ZUVsZW1lbnQ7XG4gIGNyZWF0ZUZhY3RvcnkgPSBSZWFjdEVsZW1lbnRWYWxpZGF0b3IuY3JlYXRlRmFjdG9yeTtcbiAgY2xvbmVFbGVtZW50ID0gUmVhY3RFbGVtZW50VmFsaWRhdG9yLmNsb25lRWxlbWVudDtcbn1cblxudmFyIF9fc3ByZWFkID0gX2Fzc2lnbjtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIHdhcm5lZCA9IGZhbHNlO1xuICBfX3NwcmVhZCA9IGZ1bmN0aW9uICgpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyh3YXJuZWQsICdSZWFjdC5fX3NwcmVhZCBpcyBkZXByZWNhdGVkIGFuZCBzaG91bGQgbm90IGJlIHVzZWQuIFVzZSAnICsgJ09iamVjdC5hc3NpZ24gZGlyZWN0bHkgb3IgYW5vdGhlciBoZWxwZXIgZnVuY3Rpb24gd2l0aCBzaW1pbGFyICcgKyAnc2VtYW50aWNzLiBZb3UgbWF5IGJlIHNlZWluZyB0aGlzIHdhcm5pbmcgZHVlIHRvIHlvdXIgY29tcGlsZXIuICcgKyAnU2VlIGh0dHBzOi8vZmIubWUvcmVhY3Qtc3ByZWFkLWRlcHJlY2F0aW9uIGZvciBtb3JlIGRldGFpbHMuJykgOiB2b2lkIDA7XG4gICAgd2FybmVkID0gdHJ1ZTtcbiAgICByZXR1cm4gX2Fzc2lnbi5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG52YXIgUmVhY3QgPSB7XG5cbiAgLy8gTW9kZXJuXG5cbiAgQ2hpbGRyZW46IHtcbiAgICBtYXA6IFJlYWN0Q2hpbGRyZW4ubWFwLFxuICAgIGZvckVhY2g6IFJlYWN0Q2hpbGRyZW4uZm9yRWFjaCxcbiAgICBjb3VudDogUmVhY3RDaGlsZHJlbi5jb3VudCxcbiAgICB0b0FycmF5OiBSZWFjdENoaWxkcmVuLnRvQXJyYXksXG4gICAgb25seTogb25seUNoaWxkXG4gIH0sXG5cbiAgQ29tcG9uZW50OiBSZWFjdENvbXBvbmVudCxcbiAgUHVyZUNvbXBvbmVudDogUmVhY3RQdXJlQ29tcG9uZW50LFxuXG4gIGNyZWF0ZUVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnQsXG4gIGNsb25lRWxlbWVudDogY2xvbmVFbGVtZW50LFxuICBpc1ZhbGlkRWxlbWVudDogUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50LFxuXG4gIC8vIENsYXNzaWNcblxuICBQcm9wVHlwZXM6IFJlYWN0UHJvcFR5cGVzLFxuICBjcmVhdGVDbGFzczogUmVhY3RDbGFzcy5jcmVhdGVDbGFzcyxcbiAgY3JlYXRlRmFjdG9yeTogY3JlYXRlRmFjdG9yeSxcbiAgY3JlYXRlTWl4aW46IGZ1bmN0aW9uIChtaXhpbikge1xuICAgIC8vIEN1cnJlbnRseSBhIG5vb3AuIFdpbGwgYmUgdXNlZCB0byB2YWxpZGF0ZSBhbmQgdHJhY2UgbWl4aW5zLlxuICAgIHJldHVybiBtaXhpbjtcbiAgfSxcblxuICAvLyBUaGlzIGxvb2tzIERPTSBzcGVjaWZpYyBidXQgdGhlc2UgYXJlIGFjdHVhbGx5IGlzb21vcnBoaWMgaGVscGVyc1xuICAvLyBzaW5jZSB0aGV5IGFyZSBqdXN0IGdlbmVyYXRpbmcgRE9NIHN0cmluZ3MuXG4gIERPTTogUmVhY3RET01GYWN0b3JpZXMsXG5cbiAgdmVyc2lvbjogUmVhY3RWZXJzaW9uLFxuXG4gIC8vIERlcHJlY2F0ZWQgaG9vayBmb3IgSlNYIHNwcmVhZCwgZG9uJ3QgdXNlIHRoaXMgZm9yIGFueXRoaW5nLlxuICBfX3NwcmVhZDogX19zcHJlYWRcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3Q7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0Q2hpbGRyZW5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBQb29sZWRDbGFzcyA9IHJlcXVpcmUoJy4vUG9vbGVkQ2xhc3MnKTtcbnZhciBSZWFjdEVsZW1lbnQgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudCcpO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5RnVuY3Rpb24nKTtcbnZhciB0cmF2ZXJzZUFsbENoaWxkcmVuID0gcmVxdWlyZSgnLi90cmF2ZXJzZUFsbENoaWxkcmVuJyk7XG5cbnZhciB0d29Bcmd1bWVudFBvb2xlciA9IFBvb2xlZENsYXNzLnR3b0FyZ3VtZW50UG9vbGVyO1xudmFyIGZvdXJBcmd1bWVudFBvb2xlciA9IFBvb2xlZENsYXNzLmZvdXJBcmd1bWVudFBvb2xlcjtcblxudmFyIHVzZXJQcm92aWRlZEtleUVzY2FwZVJlZ2V4ID0gL1xcLysvZztcbmZ1bmN0aW9uIGVzY2FwZVVzZXJQcm92aWRlZEtleSh0ZXh0KSB7XG4gIHJldHVybiAoJycgKyB0ZXh0KS5yZXBsYWNlKHVzZXJQcm92aWRlZEtleUVzY2FwZVJlZ2V4LCAnJCYvJyk7XG59XG5cbi8qKlxuICogUG9vbGVkQ2xhc3MgcmVwcmVzZW50aW5nIHRoZSBib29ra2VlcGluZyBhc3NvY2lhdGVkIHdpdGggcGVyZm9ybWluZyBhIGNoaWxkXG4gKiB0cmF2ZXJzYWwuIEFsbG93cyBhdm9pZGluZyBiaW5kaW5nIGNhbGxiYWNrcy5cbiAqXG4gKiBAY29uc3RydWN0b3IgRm9yRWFjaEJvb2tLZWVwaW5nXG4gKiBAcGFyYW0geyFmdW5jdGlvbn0gZm9yRWFjaEZ1bmN0aW9uIEZ1bmN0aW9uIHRvIHBlcmZvcm0gdHJhdmVyc2FsIHdpdGguXG4gKiBAcGFyYW0gez8qfSBmb3JFYWNoQ29udGV4dCBDb250ZXh0IHRvIHBlcmZvcm0gY29udGV4dCB3aXRoLlxuICovXG5mdW5jdGlvbiBGb3JFYWNoQm9va0tlZXBpbmcoZm9yRWFjaEZ1bmN0aW9uLCBmb3JFYWNoQ29udGV4dCkge1xuICB0aGlzLmZ1bmMgPSBmb3JFYWNoRnVuY3Rpb247XG4gIHRoaXMuY29udGV4dCA9IGZvckVhY2hDb250ZXh0O1xuICB0aGlzLmNvdW50ID0gMDtcbn1cbkZvckVhY2hCb29rS2VlcGluZy5wcm90b3R5cGUuZGVzdHJ1Y3RvciA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5mdW5jID0gbnVsbDtcbiAgdGhpcy5jb250ZXh0ID0gbnVsbDtcbiAgdGhpcy5jb3VudCA9IDA7XG59O1xuUG9vbGVkQ2xhc3MuYWRkUG9vbGluZ1RvKEZvckVhY2hCb29rS2VlcGluZywgdHdvQXJndW1lbnRQb29sZXIpO1xuXG5mdW5jdGlvbiBmb3JFYWNoU2luZ2xlQ2hpbGQoYm9va0tlZXBpbmcsIGNoaWxkLCBuYW1lKSB7XG4gIHZhciBmdW5jID0gYm9va0tlZXBpbmcuZnVuYztcbiAgdmFyIGNvbnRleHQgPSBib29rS2VlcGluZy5jb250ZXh0O1xuXG4gIGZ1bmMuY2FsbChjb250ZXh0LCBjaGlsZCwgYm9va0tlZXBpbmcuY291bnQrKyk7XG59XG5cbi8qKlxuICogSXRlcmF0ZXMgdGhyb3VnaCBjaGlsZHJlbiB0aGF0IGFyZSB0eXBpY2FsbHkgc3BlY2lmaWVkIGFzIGBwcm9wcy5jaGlsZHJlbmAuXG4gKlxuICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvdG9wLWxldmVsLWFwaS5odG1sI3JlYWN0LmNoaWxkcmVuLmZvcmVhY2hcbiAqXG4gKiBUaGUgcHJvdmlkZWQgZm9yRWFjaEZ1bmMoY2hpbGQsIGluZGV4KSB3aWxsIGJlIGNhbGxlZCBmb3IgZWFjaFxuICogbGVhZiBjaGlsZC5cbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKiwgaW50KX0gZm9yRWFjaEZ1bmNcbiAqIEBwYXJhbSB7Kn0gZm9yRWFjaENvbnRleHQgQ29udGV4dCBmb3IgZm9yRWFjaENvbnRleHQuXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2hDaGlsZHJlbihjaGlsZHJlbiwgZm9yRWFjaEZ1bmMsIGZvckVhY2hDb250ZXh0KSB7XG4gIGlmIChjaGlsZHJlbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG4gIHZhciB0cmF2ZXJzZUNvbnRleHQgPSBGb3JFYWNoQm9va0tlZXBpbmcuZ2V0UG9vbGVkKGZvckVhY2hGdW5jLCBmb3JFYWNoQ29udGV4dCk7XG4gIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIGZvckVhY2hTaW5nbGVDaGlsZCwgdHJhdmVyc2VDb250ZXh0KTtcbiAgRm9yRWFjaEJvb2tLZWVwaW5nLnJlbGVhc2UodHJhdmVyc2VDb250ZXh0KTtcbn1cblxuLyoqXG4gKiBQb29sZWRDbGFzcyByZXByZXNlbnRpbmcgdGhlIGJvb2trZWVwaW5nIGFzc29jaWF0ZWQgd2l0aCBwZXJmb3JtaW5nIGEgY2hpbGRcbiAqIG1hcHBpbmcuIEFsbG93cyBhdm9pZGluZyBiaW5kaW5nIGNhbGxiYWNrcy5cbiAqXG4gKiBAY29uc3RydWN0b3IgTWFwQm9va0tlZXBpbmdcbiAqIEBwYXJhbSB7ISp9IG1hcFJlc3VsdCBPYmplY3QgY29udGFpbmluZyB0aGUgb3JkZXJlZCBtYXAgb2YgcmVzdWx0cy5cbiAqIEBwYXJhbSB7IWZ1bmN0aW9ufSBtYXBGdW5jdGlvbiBGdW5jdGlvbiB0byBwZXJmb3JtIG1hcHBpbmcgd2l0aC5cbiAqIEBwYXJhbSB7Pyp9IG1hcENvbnRleHQgQ29udGV4dCB0byBwZXJmb3JtIG1hcHBpbmcgd2l0aC5cbiAqL1xuZnVuY3Rpb24gTWFwQm9va0tlZXBpbmcobWFwUmVzdWx0LCBrZXlQcmVmaXgsIG1hcEZ1bmN0aW9uLCBtYXBDb250ZXh0KSB7XG4gIHRoaXMucmVzdWx0ID0gbWFwUmVzdWx0O1xuICB0aGlzLmtleVByZWZpeCA9IGtleVByZWZpeDtcbiAgdGhpcy5mdW5jID0gbWFwRnVuY3Rpb247XG4gIHRoaXMuY29udGV4dCA9IG1hcENvbnRleHQ7XG4gIHRoaXMuY291bnQgPSAwO1xufVxuTWFwQm9va0tlZXBpbmcucHJvdG90eXBlLmRlc3RydWN0b3IgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMucmVzdWx0ID0gbnVsbDtcbiAgdGhpcy5rZXlQcmVmaXggPSBudWxsO1xuICB0aGlzLmZ1bmMgPSBudWxsO1xuICB0aGlzLmNvbnRleHQgPSBudWxsO1xuICB0aGlzLmNvdW50ID0gMDtcbn07XG5Qb29sZWRDbGFzcy5hZGRQb29saW5nVG8oTWFwQm9va0tlZXBpbmcsIGZvdXJBcmd1bWVudFBvb2xlcik7XG5cbmZ1bmN0aW9uIG1hcFNpbmdsZUNoaWxkSW50b0NvbnRleHQoYm9va0tlZXBpbmcsIGNoaWxkLCBjaGlsZEtleSkge1xuICB2YXIgcmVzdWx0ID0gYm9va0tlZXBpbmcucmVzdWx0O1xuICB2YXIga2V5UHJlZml4ID0gYm9va0tlZXBpbmcua2V5UHJlZml4O1xuICB2YXIgZnVuYyA9IGJvb2tLZWVwaW5nLmZ1bmM7XG4gIHZhciBjb250ZXh0ID0gYm9va0tlZXBpbmcuY29udGV4dDtcblxuXG4gIHZhciBtYXBwZWRDaGlsZCA9IGZ1bmMuY2FsbChjb250ZXh0LCBjaGlsZCwgYm9va0tlZXBpbmcuY291bnQrKyk7XG4gIGlmIChBcnJheS5pc0FycmF5KG1hcHBlZENoaWxkKSkge1xuICAgIG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWwobWFwcGVkQ2hpbGQsIHJlc3VsdCwgY2hpbGRLZXksIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNBcmd1bWVudCk7XG4gIH0gZWxzZSBpZiAobWFwcGVkQ2hpbGQgIT0gbnVsbCkge1xuICAgIGlmIChSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQobWFwcGVkQ2hpbGQpKSB7XG4gICAgICBtYXBwZWRDaGlsZCA9IFJlYWN0RWxlbWVudC5jbG9uZUFuZFJlcGxhY2VLZXkobWFwcGVkQ2hpbGQsXG4gICAgICAvLyBLZWVwIGJvdGggdGhlIChtYXBwZWQpIGFuZCBvbGQga2V5cyBpZiB0aGV5IGRpZmZlciwganVzdCBhc1xuICAgICAgLy8gdHJhdmVyc2VBbGxDaGlsZHJlbiB1c2VkIHRvIGRvIGZvciBvYmplY3RzIGFzIGNoaWxkcmVuXG4gICAgICBrZXlQcmVmaXggKyAobWFwcGVkQ2hpbGQua2V5ICYmICghY2hpbGQgfHwgY2hpbGQua2V5ICE9PSBtYXBwZWRDaGlsZC5rZXkpID8gZXNjYXBlVXNlclByb3ZpZGVkS2V5KG1hcHBlZENoaWxkLmtleSkgKyAnLycgOiAnJykgKyBjaGlsZEtleSk7XG4gICAgfVxuICAgIHJlc3VsdC5wdXNoKG1hcHBlZENoaWxkKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKGNoaWxkcmVuLCBhcnJheSwgcHJlZml4LCBmdW5jLCBjb250ZXh0KSB7XG4gIHZhciBlc2NhcGVkUHJlZml4ID0gJyc7XG4gIGlmIChwcmVmaXggIT0gbnVsbCkge1xuICAgIGVzY2FwZWRQcmVmaXggPSBlc2NhcGVVc2VyUHJvdmlkZWRLZXkocHJlZml4KSArICcvJztcbiAgfVxuICB2YXIgdHJhdmVyc2VDb250ZXh0ID0gTWFwQm9va0tlZXBpbmcuZ2V0UG9vbGVkKGFycmF5LCBlc2NhcGVkUHJlZml4LCBmdW5jLCBjb250ZXh0KTtcbiAgdHJhdmVyc2VBbGxDaGlsZHJlbihjaGlsZHJlbiwgbWFwU2luZ2xlQ2hpbGRJbnRvQ29udGV4dCwgdHJhdmVyc2VDb250ZXh0KTtcbiAgTWFwQm9va0tlZXBpbmcucmVsZWFzZSh0cmF2ZXJzZUNvbnRleHQpO1xufVxuXG4vKipcbiAqIE1hcHMgY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gLlxuICpcbiAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RvcC1sZXZlbC1hcGkuaHRtbCNyZWFjdC5jaGlsZHJlbi5tYXBcbiAqXG4gKiBUaGUgcHJvdmlkZWQgbWFwRnVuY3Rpb24oY2hpbGQsIGtleSwgaW5kZXgpIHdpbGwgYmUgY2FsbGVkIGZvciBlYWNoXG4gKiBsZWFmIGNoaWxkLlxuICpcbiAqIEBwYXJhbSB7Pyp9IGNoaWxkcmVuIENoaWxkcmVuIHRyZWUgY29udGFpbmVyLlxuICogQHBhcmFtIHtmdW5jdGlvbigqLCBpbnQpfSBmdW5jIFRoZSBtYXAgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IGNvbnRleHQgQ29udGV4dCBmb3IgbWFwRnVuY3Rpb24uXG4gKiBAcmV0dXJuIHtvYmplY3R9IE9iamVjdCBjb250YWluaW5nIHRoZSBvcmRlcmVkIG1hcCBvZiByZXN1bHRzLlxuICovXG5mdW5jdGlvbiBtYXBDaGlsZHJlbihjaGlsZHJlbiwgZnVuYywgY29udGV4dCkge1xuICBpZiAoY2hpbGRyZW4gPT0gbnVsbCkge1xuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfVxuICB2YXIgcmVzdWx0ID0gW107XG4gIG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWwoY2hpbGRyZW4sIHJlc3VsdCwgbnVsbCwgZnVuYywgY29udGV4dCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGZvckVhY2hTaW5nbGVDaGlsZER1bW15KHRyYXZlcnNlQ29udGV4dCwgY2hpbGQsIG5hbWUpIHtcbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKlxuICogQ291bnQgdGhlIG51bWJlciBvZiBjaGlsZHJlbiB0aGF0IGFyZSB0eXBpY2FsbHkgc3BlY2lmaWVkIGFzXG4gKiBgcHJvcHMuY2hpbGRyZW5gLlxuICpcbiAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RvcC1sZXZlbC1hcGkuaHRtbCNyZWFjdC5jaGlsZHJlbi5jb3VudFxuICpcbiAqIEBwYXJhbSB7Pyp9IGNoaWxkcmVuIENoaWxkcmVuIHRyZWUgY29udGFpbmVyLlxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIGNoaWxkcmVuLlxuICovXG5mdW5jdGlvbiBjb3VudENoaWxkcmVuKGNoaWxkcmVuLCBjb250ZXh0KSB7XG4gIHJldHVybiB0cmF2ZXJzZUFsbENoaWxkcmVuKGNoaWxkcmVuLCBmb3JFYWNoU2luZ2xlQ2hpbGREdW1teSwgbnVsbCk7XG59XG5cbi8qKlxuICogRmxhdHRlbiBhIGNoaWxkcmVuIG9iamVjdCAodHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gKSBhbmRcbiAqIHJldHVybiBhbiBhcnJheSB3aXRoIGFwcHJvcHJpYXRlbHkgcmUta2V5ZWQgY2hpbGRyZW4uXG4gKlxuICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvdG9wLWxldmVsLWFwaS5odG1sI3JlYWN0LmNoaWxkcmVuLnRvYXJyYXlcbiAqL1xuZnVuY3Rpb24gdG9BcnJheShjaGlsZHJlbikge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWwoY2hpbGRyZW4sIHJlc3VsdCwgbnVsbCwgZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc0FyZ3VtZW50KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxudmFyIFJlYWN0Q2hpbGRyZW4gPSB7XG4gIGZvckVhY2g6IGZvckVhY2hDaGlsZHJlbixcbiAgbWFwOiBtYXBDaGlsZHJlbixcbiAgbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbDogbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbCxcbiAgY291bnQ6IGNvdW50Q2hpbGRyZW4sXG4gIHRvQXJyYXk6IHRvQXJyYXlcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RDaGlsZHJlbjsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RDbGFzc1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9wcm9kSW52YXJpYW50ID0gcmVxdWlyZSgnLi9yZWFjdFByb2RJbnZhcmlhbnQnKSxcbiAgICBfYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgUmVhY3RDb21wb25lbnQgPSByZXF1aXJlKCcuL1JlYWN0Q29tcG9uZW50Jyk7XG52YXIgUmVhY3RFbGVtZW50ID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnQnKTtcbnZhciBSZWFjdFByb3BUeXBlTG9jYXRpb25zID0gcmVxdWlyZSgnLi9SZWFjdFByb3BUeXBlTG9jYXRpb25zJyk7XG52YXIgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMgPSByZXF1aXJlKCcuL1JlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzJyk7XG52YXIgUmVhY3ROb29wVXBkYXRlUXVldWUgPSByZXF1aXJlKCcuL1JlYWN0Tm9vcFVwZGF0ZVF1ZXVlJyk7XG5cbnZhciBlbXB0eU9iamVjdCA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5T2JqZWN0Jyk7XG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIga2V5TWlycm9yID0gcmVxdWlyZSgnZmJqcy9saWIva2V5TWlycm9yJyk7XG52YXIga2V5T2YgPSByZXF1aXJlKCdmYmpzL2xpYi9rZXlPZicpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbnZhciBNSVhJTlNfS0VZID0ga2V5T2YoeyBtaXhpbnM6IG51bGwgfSk7XG5cbi8qKlxuICogUG9saWNpZXMgdGhhdCBkZXNjcmliZSBtZXRob2RzIGluIGBSZWFjdENsYXNzSW50ZXJmYWNlYC5cbiAqL1xudmFyIFNwZWNQb2xpY3kgPSBrZXlNaXJyb3Ioe1xuICAvKipcbiAgICogVGhlc2UgbWV0aG9kcyBtYXkgYmUgZGVmaW5lZCBvbmx5IG9uY2UgYnkgdGhlIGNsYXNzIHNwZWNpZmljYXRpb24gb3IgbWl4aW4uXG4gICAqL1xuICBERUZJTkVfT05DRTogbnVsbCxcbiAgLyoqXG4gICAqIFRoZXNlIG1ldGhvZHMgbWF5IGJlIGRlZmluZWQgYnkgYm90aCB0aGUgY2xhc3Mgc3BlY2lmaWNhdGlvbiBhbmQgbWl4aW5zLlxuICAgKiBTdWJzZXF1ZW50IGRlZmluaXRpb25zIHdpbGwgYmUgY2hhaW5lZC4gVGhlc2UgbWV0aG9kcyBtdXN0IHJldHVybiB2b2lkLlxuICAgKi9cbiAgREVGSU5FX01BTlk6IG51bGwsXG4gIC8qKlxuICAgKiBUaGVzZSBtZXRob2RzIGFyZSBvdmVycmlkaW5nIHRoZSBiYXNlIGNsYXNzLlxuICAgKi9cbiAgT1ZFUlJJREVfQkFTRTogbnVsbCxcbiAgLyoqXG4gICAqIFRoZXNlIG1ldGhvZHMgYXJlIHNpbWlsYXIgdG8gREVGSU5FX01BTlksIGV4Y2VwdCB3ZSBhc3N1bWUgdGhleSByZXR1cm5cbiAgICogb2JqZWN0cy4gV2UgdHJ5IHRvIG1lcmdlIHRoZSBrZXlzIG9mIHRoZSByZXR1cm4gdmFsdWVzIG9mIGFsbCB0aGUgbWl4ZWQgaW5cbiAgICogZnVuY3Rpb25zLiBJZiB0aGVyZSBpcyBhIGtleSBjb25mbGljdCB3ZSB0aHJvdy5cbiAgICovXG4gIERFRklORV9NQU5ZX01FUkdFRDogbnVsbFxufSk7XG5cbnZhciBpbmplY3RlZE1peGlucyA9IFtdO1xuXG4vKipcbiAqIENvbXBvc2l0ZSBjb21wb25lbnRzIGFyZSBoaWdoZXItbGV2ZWwgY29tcG9uZW50cyB0aGF0IGNvbXBvc2Ugb3RoZXIgY29tcG9zaXRlXG4gKiBvciBob3N0IGNvbXBvbmVudHMuXG4gKlxuICogVG8gY3JlYXRlIGEgbmV3IHR5cGUgb2YgYFJlYWN0Q2xhc3NgLCBwYXNzIGEgc3BlY2lmaWNhdGlvbiBvZlxuICogeW91ciBuZXcgY2xhc3MgdG8gYFJlYWN0LmNyZWF0ZUNsYXNzYC4gVGhlIG9ubHkgcmVxdWlyZW1lbnQgb2YgeW91ciBjbGFzc1xuICogc3BlY2lmaWNhdGlvbiBpcyB0aGF0IHlvdSBpbXBsZW1lbnQgYSBgcmVuZGVyYCBtZXRob2QuXG4gKlxuICogICB2YXIgTXlDb21wb25lbnQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gKiAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAqICAgICAgIHJldHVybiA8ZGl2PkhlbGxvIFdvcmxkPC9kaXY+O1xuICogICAgIH1cbiAqICAgfSk7XG4gKlxuICogVGhlIGNsYXNzIHNwZWNpZmljYXRpb24gc3VwcG9ydHMgYSBzcGVjaWZpYyBwcm90b2NvbCBvZiBtZXRob2RzIHRoYXQgaGF2ZVxuICogc3BlY2lhbCBtZWFuaW5nIChlLmcuIGByZW5kZXJgKS4gU2VlIGBSZWFjdENsYXNzSW50ZXJmYWNlYCBmb3JcbiAqIG1vcmUgdGhlIGNvbXByZWhlbnNpdmUgcHJvdG9jb2wuIEFueSBvdGhlciBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzIGluIHRoZVxuICogY2xhc3Mgc3BlY2lmaWNhdGlvbiB3aWxsIGJlIGF2YWlsYWJsZSBvbiB0aGUgcHJvdG90eXBlLlxuICpcbiAqIEBpbnRlcmZhY2UgUmVhY3RDbGFzc0ludGVyZmFjZVxuICogQGludGVybmFsXG4gKi9cbnZhciBSZWFjdENsYXNzSW50ZXJmYWNlID0ge1xuXG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiBNaXhpbiBvYmplY3RzIHRvIGluY2x1ZGUgd2hlbiBkZWZpbmluZyB5b3VyIGNvbXBvbmVudC5cbiAgICpcbiAgICogQHR5cGUge2FycmF5fVxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIG1peGluczogU3BlY1BvbGljeS5ERUZJTkVfTUFOWSxcblxuICAvKipcbiAgICogQW4gb2JqZWN0IGNvbnRhaW5pbmcgcHJvcGVydGllcyBhbmQgbWV0aG9kcyB0aGF0IHNob3VsZCBiZSBkZWZpbmVkIG9uXG4gICAqIHRoZSBjb21wb25lbnQncyBjb25zdHJ1Y3RvciBpbnN0ZWFkIG9mIGl0cyBwcm90b3R5cGUgKHN0YXRpYyBtZXRob2RzKS5cbiAgICpcbiAgICogQHR5cGUge29iamVjdH1cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBzdGF0aWNzOiBTcGVjUG9saWN5LkRFRklORV9NQU5ZLFxuXG4gIC8qKlxuICAgKiBEZWZpbml0aW9uIG9mIHByb3AgdHlwZXMgZm9yIHRoaXMgY29tcG9uZW50LlxuICAgKlxuICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIHByb3BUeXBlczogU3BlY1BvbGljeS5ERUZJTkVfTUFOWSxcblxuICAvKipcbiAgICogRGVmaW5pdGlvbiBvZiBjb250ZXh0IHR5cGVzIGZvciB0aGlzIGNvbXBvbmVudC5cbiAgICpcbiAgICogQHR5cGUge29iamVjdH1cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBjb250ZXh0VHlwZXM6IFNwZWNQb2xpY3kuREVGSU5FX01BTlksXG5cbiAgLyoqXG4gICAqIERlZmluaXRpb24gb2YgY29udGV4dCB0eXBlcyB0aGlzIGNvbXBvbmVudCBzZXRzIGZvciBpdHMgY2hpbGRyZW4uXG4gICAqXG4gICAqIEB0eXBlIHtvYmplY3R9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY2hpbGRDb250ZXh0VHlwZXM6IFNwZWNQb2xpY3kuREVGSU5FX01BTlksXG5cbiAgLy8gPT09PSBEZWZpbml0aW9uIG1ldGhvZHMgPT09PVxuXG4gIC8qKlxuICAgKiBJbnZva2VkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBtb3VudGVkLiBWYWx1ZXMgaW4gdGhlIG1hcHBpbmcgd2lsbCBiZSBzZXQgb25cbiAgICogYHRoaXMucHJvcHNgIGlmIHRoYXQgcHJvcCBpcyBub3Qgc3BlY2lmaWVkIChpLmUuIHVzaW5nIGFuIGBpbmAgY2hlY2spLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBpbnZva2VkIGJlZm9yZSBgZ2V0SW5pdGlhbFN0YXRlYCBhbmQgdGhlcmVmb3JlIGNhbm5vdCByZWx5XG4gICAqIG9uIGB0aGlzLnN0YXRlYCBvciB1c2UgYHRoaXMuc2V0U3RhdGVgLlxuICAgKlxuICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgZ2V0RGVmYXVsdFByb3BzOiBTcGVjUG9saWN5LkRFRklORV9NQU5ZX01FUkdFRCxcblxuICAvKipcbiAgICogSW52b2tlZCBvbmNlIGJlZm9yZSB0aGUgY29tcG9uZW50IGlzIG1vdW50ZWQuIFRoZSByZXR1cm4gdmFsdWUgd2lsbCBiZSB1c2VkXG4gICAqIGFzIHRoZSBpbml0aWFsIHZhbHVlIG9mIGB0aGlzLnN0YXRlYC5cbiAgICpcbiAgICogICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgKiAgICAgcmV0dXJuIHtcbiAgICogICAgICAgaXNPbjogZmFsc2UsXG4gICAqICAgICAgIGZvb0JhejogbmV3IEJhekZvbygpXG4gICAqICAgICB9XG4gICAqICAgfVxuICAgKlxuICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgZ2V0SW5pdGlhbFN0YXRlOiBTcGVjUG9saWN5LkRFRklORV9NQU5ZX01FUkdFRCxcblxuICAvKipcbiAgICogQHJldHVybiB7b2JqZWN0fVxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGdldENoaWxkQ29udGV4dDogU3BlY1BvbGljeS5ERUZJTkVfTUFOWV9NRVJHRUQsXG5cbiAgLyoqXG4gICAqIFVzZXMgcHJvcHMgZnJvbSBgdGhpcy5wcm9wc2AgYW5kIHN0YXRlIGZyb20gYHRoaXMuc3RhdGVgIHRvIHJlbmRlciB0aGVcbiAgICogc3RydWN0dXJlIG9mIHRoZSBjb21wb25lbnQuXG4gICAqXG4gICAqIE5vIGd1YXJhbnRlZXMgYXJlIG1hZGUgYWJvdXQgd2hlbiBvciBob3cgb2Z0ZW4gdGhpcyBtZXRob2QgaXMgaW52b2tlZCwgc29cbiAgICogaXQgbXVzdCBub3QgaGF2ZSBzaWRlIGVmZmVjdHMuXG4gICAqXG4gICAqICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICogICAgIHZhciBuYW1lID0gdGhpcy5wcm9wcy5uYW1lO1xuICAgKiAgICAgcmV0dXJuIDxkaXY+SGVsbG8sIHtuYW1lfSE8L2Rpdj47XG4gICAqICAgfVxuICAgKlxuICAgKiBAcmV0dXJuIHtSZWFjdENvbXBvbmVudH1cbiAgICogQG5vc2lkZWVmZmVjdHNcbiAgICogQHJlcXVpcmVkXG4gICAqL1xuICByZW5kZXI6IFNwZWNQb2xpY3kuREVGSU5FX09OQ0UsXG5cbiAgLy8gPT09PSBEZWxlZ2F0ZSBtZXRob2RzID09PT1cblxuICAvKipcbiAgICogSW52b2tlZCB3aGVuIHRoZSBjb21wb25lbnQgaXMgaW5pdGlhbGx5IGNyZWF0ZWQgYW5kIGFib3V0IHRvIGJlIG1vdW50ZWQuXG4gICAqIFRoaXMgbWF5IGhhdmUgc2lkZSBlZmZlY3RzLCBidXQgYW55IGV4dGVybmFsIHN1YnNjcmlwdGlvbnMgb3IgZGF0YSBjcmVhdGVkXG4gICAqIGJ5IHRoaXMgbWV0aG9kIG11c3QgYmUgY2xlYW5lZCB1cCBpbiBgY29tcG9uZW50V2lsbFVubW91bnRgLlxuICAgKlxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNvbXBvbmVudFdpbGxNb3VudDogU3BlY1BvbGljeS5ERUZJTkVfTUFOWSxcblxuICAvKipcbiAgICogSW52b2tlZCB3aGVuIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gbW91bnRlZCBhbmQgaGFzIGEgRE9NIHJlcHJlc2VudGF0aW9uLlxuICAgKiBIb3dldmVyLCB0aGVyZSBpcyBubyBndWFyYW50ZWUgdGhhdCB0aGUgRE9NIG5vZGUgaXMgaW4gdGhlIGRvY3VtZW50LlxuICAgKlxuICAgKiBVc2UgdGhpcyBhcyBhbiBvcHBvcnR1bml0eSB0byBvcGVyYXRlIG9uIHRoZSBET00gd2hlbiB0aGUgY29tcG9uZW50IGhhc1xuICAgKiBiZWVuIG1vdW50ZWQgKGluaXRpYWxpemVkIGFuZCByZW5kZXJlZCkgZm9yIHRoZSBmaXJzdCB0aW1lLlxuICAgKlxuICAgKiBAcGFyYW0ge0RPTUVsZW1lbnR9IHJvb3ROb2RlIERPTSBlbGVtZW50IHJlcHJlc2VudGluZyB0aGUgY29tcG9uZW50LlxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNvbXBvbmVudERpZE1vdW50OiBTcGVjUG9saWN5LkRFRklORV9NQU5ZLFxuXG4gIC8qKlxuICAgKiBJbnZva2VkIGJlZm9yZSB0aGUgY29tcG9uZW50IHJlY2VpdmVzIG5ldyBwcm9wcy5cbiAgICpcbiAgICogVXNlIHRoaXMgYXMgYW4gb3Bwb3J0dW5pdHkgdG8gcmVhY3QgdG8gYSBwcm9wIHRyYW5zaXRpb24gYnkgdXBkYXRpbmcgdGhlXG4gICAqIHN0YXRlIHVzaW5nIGB0aGlzLnNldFN0YXRlYC4gQ3VycmVudCBwcm9wcyBhcmUgYWNjZXNzZWQgdmlhIGB0aGlzLnByb3BzYC5cbiAgICpcbiAgICogICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbihuZXh0UHJvcHMsIG5leHRDb250ZXh0KSB7XG4gICAqICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICogICAgICAgbGlrZXNJbmNyZWFzaW5nOiBuZXh0UHJvcHMubGlrZUNvdW50ID4gdGhpcy5wcm9wcy5saWtlQ291bnRcbiAgICogICAgIH0pO1xuICAgKiAgIH1cbiAgICpcbiAgICogTk9URTogVGhlcmUgaXMgbm8gZXF1aXZhbGVudCBgY29tcG9uZW50V2lsbFJlY2VpdmVTdGF0ZWAuIEFuIGluY29taW5nIHByb3BcbiAgICogdHJhbnNpdGlvbiBtYXkgY2F1c2UgYSBzdGF0ZSBjaGFuZ2UsIGJ1dCB0aGUgb3Bwb3NpdGUgaXMgbm90IHRydWUuIElmIHlvdVxuICAgKiBuZWVkIGl0LCB5b3UgYXJlIHByb2JhYmx5IGxvb2tpbmcgZm9yIGBjb21wb25lbnRXaWxsVXBkYXRlYC5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IG5leHRQcm9wc1xuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IFNwZWNQb2xpY3kuREVGSU5FX01BTlksXG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hpbGUgZGVjaWRpbmcgaWYgdGhlIGNvbXBvbmVudCBzaG91bGQgYmUgdXBkYXRlZCBhcyBhIHJlc3VsdCBvZlxuICAgKiByZWNlaXZpbmcgbmV3IHByb3BzLCBzdGF0ZSBhbmQvb3IgY29udGV4dC5cbiAgICpcbiAgICogVXNlIHRoaXMgYXMgYW4gb3Bwb3J0dW5pdHkgdG8gYHJldHVybiBmYWxzZWAgd2hlbiB5b3UncmUgY2VydGFpbiB0aGF0IHRoZVxuICAgKiB0cmFuc2l0aW9uIHRvIHRoZSBuZXcgcHJvcHMvc3RhdGUvY29udGV4dCB3aWxsIG5vdCByZXF1aXJlIGEgY29tcG9uZW50XG4gICAqIHVwZGF0ZS5cbiAgICpcbiAgICogICBzaG91bGRDb21wb25lbnRVcGRhdGU6IGZ1bmN0aW9uKG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dCkge1xuICAgKiAgICAgcmV0dXJuICFlcXVhbChuZXh0UHJvcHMsIHRoaXMucHJvcHMpIHx8XG4gICAqICAgICAgICFlcXVhbChuZXh0U3RhdGUsIHRoaXMuc3RhdGUpIHx8XG4gICAqICAgICAgICFlcXVhbChuZXh0Q29udGV4dCwgdGhpcy5jb250ZXh0KTtcbiAgICogICB9XG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBuZXh0UHJvcHNcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBuZXh0U3RhdGVcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBuZXh0Q29udGV4dFxuICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBjb21wb25lbnQgc2hvdWxkIHVwZGF0ZS5cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBzaG91bGRDb21wb25lbnRVcGRhdGU6IFNwZWNQb2xpY3kuREVGSU5FX09OQ0UsXG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIGFib3V0IHRvIHVwZGF0ZSBkdWUgdG8gYSB0cmFuc2l0aW9uIGZyb21cbiAgICogYHRoaXMucHJvcHNgLCBgdGhpcy5zdGF0ZWAgYW5kIGB0aGlzLmNvbnRleHRgIHRvIGBuZXh0UHJvcHNgLCBgbmV4dFN0YXRlYFxuICAgKiBhbmQgYG5leHRDb250ZXh0YC5cbiAgICpcbiAgICogVXNlIHRoaXMgYXMgYW4gb3Bwb3J0dW5pdHkgdG8gcGVyZm9ybSBwcmVwYXJhdGlvbiBiZWZvcmUgYW4gdXBkYXRlIG9jY3Vycy5cbiAgICpcbiAgICogTk9URTogWW91ICoqY2Fubm90KiogdXNlIGB0aGlzLnNldFN0YXRlKClgIGluIHRoaXMgbWV0aG9kLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gbmV4dFByb3BzXG4gICAqIEBwYXJhbSB7P29iamVjdH0gbmV4dFN0YXRlXG4gICAqIEBwYXJhbSB7P29iamVjdH0gbmV4dENvbnRleHRcbiAgICogQHBhcmFtIHtSZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9ufSB0cmFuc2FjdGlvblxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNvbXBvbmVudFdpbGxVcGRhdGU6IFNwZWNQb2xpY3kuREVGSU5FX01BTlksXG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hlbiB0aGUgY29tcG9uZW50J3MgRE9NIHJlcHJlc2VudGF0aW9uIGhhcyBiZWVuIHVwZGF0ZWQuXG4gICAqXG4gICAqIFVzZSB0aGlzIGFzIGFuIG9wcG9ydHVuaXR5IHRvIG9wZXJhdGUgb24gdGhlIERPTSB3aGVuIHRoZSBjb21wb25lbnQgaGFzXG4gICAqIGJlZW4gdXBkYXRlZC5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IHByZXZQcm9wc1xuICAgKiBAcGFyYW0gez9vYmplY3R9IHByZXZTdGF0ZVxuICAgKiBAcGFyYW0gez9vYmplY3R9IHByZXZDb250ZXh0XG4gICAqIEBwYXJhbSB7RE9NRWxlbWVudH0gcm9vdE5vZGUgRE9NIGVsZW1lbnQgcmVwcmVzZW50aW5nIHRoZSBjb21wb25lbnQuXG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY29tcG9uZW50RGlkVXBkYXRlOiBTcGVjUG9saWN5LkRFRklORV9NQU5ZLFxuXG4gIC8qKlxuICAgKiBJbnZva2VkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBhYm91dCB0byBiZSByZW1vdmVkIGZyb20gaXRzIHBhcmVudCBhbmQgaGF2ZVxuICAgKiBpdHMgRE9NIHJlcHJlc2VudGF0aW9uIGRlc3Ryb3llZC5cbiAgICpcbiAgICogVXNlIHRoaXMgYXMgYW4gb3Bwb3J0dW5pdHkgdG8gZGVhbGxvY2F0ZSBhbnkgZXh0ZXJuYWwgcmVzb3VyY2VzLlxuICAgKlxuICAgKiBOT1RFOiBUaGVyZSBpcyBubyBgY29tcG9uZW50RGlkVW5tb3VudGAgc2luY2UgeW91ciBjb21wb25lbnQgd2lsbCBoYXZlIGJlZW5cbiAgICogZGVzdHJveWVkIGJ5IHRoYXQgcG9pbnQuXG4gICAqXG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IFNwZWNQb2xpY3kuREVGSU5FX01BTlksXG5cbiAgLy8gPT09PSBBZHZhbmNlZCBtZXRob2RzID09PT1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgY29tcG9uZW50J3MgY3VycmVudGx5IG1vdW50ZWQgRE9NIHJlcHJlc2VudGF0aW9uLlxuICAgKlxuICAgKiBCeSBkZWZhdWx0LCB0aGlzIGltcGxlbWVudHMgUmVhY3QncyByZW5kZXJpbmcgYW5kIHJlY29uY2lsaWF0aW9uIGFsZ29yaXRobS5cbiAgICogU29waGlzdGljYXRlZCBjbGllbnRzIG1heSB3aXNoIHRvIG92ZXJyaWRlIHRoaXMuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbn0gdHJhbnNhY3Rpb25cbiAgICogQGludGVybmFsXG4gICAqIEBvdmVycmlkYWJsZVxuICAgKi9cbiAgdXBkYXRlQ29tcG9uZW50OiBTcGVjUG9saWN5Lk9WRVJSSURFX0JBU0VcblxufTtcblxuLyoqXG4gKiBNYXBwaW5nIGZyb20gY2xhc3Mgc3BlY2lmaWNhdGlvbiBrZXlzIHRvIHNwZWNpYWwgcHJvY2Vzc2luZyBmdW5jdGlvbnMuXG4gKlxuICogQWx0aG91Z2ggdGhlc2UgYXJlIGRlY2xhcmVkIGxpa2UgaW5zdGFuY2UgcHJvcGVydGllcyBpbiB0aGUgc3BlY2lmaWNhdGlvblxuICogd2hlbiBkZWZpbmluZyBjbGFzc2VzIHVzaW5nIGBSZWFjdC5jcmVhdGVDbGFzc2AsIHRoZXkgYXJlIGFjdHVhbGx5IHN0YXRpY1xuICogYW5kIGFyZSBhY2Nlc3NpYmxlIG9uIHRoZSBjb25zdHJ1Y3RvciBpbnN0ZWFkIG9mIHRoZSBwcm90b3R5cGUuIERlc3BpdGVcbiAqIGJlaW5nIHN0YXRpYywgdGhleSBtdXN0IGJlIGRlZmluZWQgb3V0c2lkZSBvZiB0aGUgXCJzdGF0aWNzXCIga2V5IHVuZGVyXG4gKiB3aGljaCBhbGwgb3RoZXIgc3RhdGljIG1ldGhvZHMgYXJlIGRlZmluZWQuXG4gKi9cbnZhciBSRVNFUlZFRF9TUEVDX0tFWVMgPSB7XG4gIGRpc3BsYXlOYW1lOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIGRpc3BsYXlOYW1lKSB7XG4gICAgQ29uc3RydWN0b3IuZGlzcGxheU5hbWUgPSBkaXNwbGF5TmFtZTtcbiAgfSxcbiAgbWl4aW5zOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIG1peGlucykge1xuICAgIGlmIChtaXhpbnMpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWl4aW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIG1peFNwZWNJbnRvQ29tcG9uZW50KENvbnN0cnVjdG9yLCBtaXhpbnNbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgY2hpbGRDb250ZXh0VHlwZXM6IGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgY2hpbGRDb250ZXh0VHlwZXMpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFsaWRhdGVUeXBlRGVmKENvbnN0cnVjdG9yLCBjaGlsZENvbnRleHRUeXBlcywgUmVhY3RQcm9wVHlwZUxvY2F0aW9ucy5jaGlsZENvbnRleHQpO1xuICAgIH1cbiAgICBDb25zdHJ1Y3Rvci5jaGlsZENvbnRleHRUeXBlcyA9IF9hc3NpZ24oe30sIENvbnN0cnVjdG9yLmNoaWxkQ29udGV4dFR5cGVzLCBjaGlsZENvbnRleHRUeXBlcyk7XG4gIH0sXG4gIGNvbnRleHRUeXBlczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBjb250ZXh0VHlwZXMpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFsaWRhdGVUeXBlRGVmKENvbnN0cnVjdG9yLCBjb250ZXh0VHlwZXMsIFJlYWN0UHJvcFR5cGVMb2NhdGlvbnMuY29udGV4dCk7XG4gICAgfVxuICAgIENvbnN0cnVjdG9yLmNvbnRleHRUeXBlcyA9IF9hc3NpZ24oe30sIENvbnN0cnVjdG9yLmNvbnRleHRUeXBlcywgY29udGV4dFR5cGVzKTtcbiAgfSxcbiAgLyoqXG4gICAqIFNwZWNpYWwgY2FzZSBnZXREZWZhdWx0UHJvcHMgd2hpY2ggc2hvdWxkIG1vdmUgaW50byBzdGF0aWNzIGJ1dCByZXF1aXJlc1xuICAgKiBhdXRvbWF0aWMgbWVyZ2luZy5cbiAgICovXG4gIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBnZXREZWZhdWx0UHJvcHMpIHtcbiAgICBpZiAoQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzKSB7XG4gICAgICBDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMgPSBjcmVhdGVNZXJnZWRSZXN1bHRGdW5jdGlvbihDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMsIGdldERlZmF1bHRQcm9wcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcyA9IGdldERlZmF1bHRQcm9wcztcbiAgICB9XG4gIH0sXG4gIHByb3BUeXBlczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm9wVHlwZXMpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFsaWRhdGVUeXBlRGVmKENvbnN0cnVjdG9yLCBwcm9wVHlwZXMsIFJlYWN0UHJvcFR5cGVMb2NhdGlvbnMucHJvcCk7XG4gICAgfVxuICAgIENvbnN0cnVjdG9yLnByb3BUeXBlcyA9IF9hc3NpZ24oe30sIENvbnN0cnVjdG9yLnByb3BUeXBlcywgcHJvcFR5cGVzKTtcbiAgfSxcbiAgc3RhdGljczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBzdGF0aWNzKSB7XG4gICAgbWl4U3RhdGljU3BlY0ludG9Db21wb25lbnQoQ29uc3RydWN0b3IsIHN0YXRpY3MpO1xuICB9LFxuICBhdXRvYmluZDogZnVuY3Rpb24gKCkge30gfTtcblxuLy8gbm9vcFxuZnVuY3Rpb24gdmFsaWRhdGVUeXBlRGVmKENvbnN0cnVjdG9yLCB0eXBlRGVmLCBsb2NhdGlvbikge1xuICBmb3IgKHZhciBwcm9wTmFtZSBpbiB0eXBlRGVmKSB7XG4gICAgaWYgKHR5cGVEZWYuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICAvLyB1c2UgYSB3YXJuaW5nIGluc3RlYWQgb2YgYW4gaW52YXJpYW50IHNvIGNvbXBvbmVudHNcbiAgICAgIC8vIGRvbid0IHNob3cgdXAgaW4gcHJvZCBidXQgb25seSBpbiBfX0RFVl9fXG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyh0eXBlb2YgdHlwZURlZltwcm9wTmFtZV0gPT09ICdmdW5jdGlvbicsICclczogJXMgdHlwZSBgJXNgIGlzIGludmFsaWQ7IGl0IG11c3QgYmUgYSBmdW5jdGlvbiwgdXN1YWxseSBmcm9tICcgKyAnUmVhY3QuUHJvcFR5cGVzLicsIENvbnN0cnVjdG9yLmRpc3BsYXlOYW1lIHx8ICdSZWFjdENsYXNzJywgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dLCBwcm9wTmFtZSkgOiB2b2lkIDA7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlTWV0aG9kT3ZlcnJpZGUoaXNBbHJlYWR5RGVmaW5lZCwgbmFtZSkge1xuICB2YXIgc3BlY1BvbGljeSA9IFJlYWN0Q2xhc3NJbnRlcmZhY2UuaGFzT3duUHJvcGVydHkobmFtZSkgPyBSZWFjdENsYXNzSW50ZXJmYWNlW25hbWVdIDogbnVsbDtcblxuICAvLyBEaXNhbGxvdyBvdmVycmlkaW5nIG9mIGJhc2UgY2xhc3MgbWV0aG9kcyB1bmxlc3MgZXhwbGljaXRseSBhbGxvd2VkLlxuICBpZiAoUmVhY3RDbGFzc01peGluLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgIShzcGVjUG9saWN5ID09PSBTcGVjUG9saWN5Lk9WRVJSSURFX0JBU0UpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0Q2xhc3NJbnRlcmZhY2U6IFlvdSBhcmUgYXR0ZW1wdGluZyB0byBvdmVycmlkZSBgJXNgIGZyb20geW91ciBjbGFzcyBzcGVjaWZpY2F0aW9uLiBFbnN1cmUgdGhhdCB5b3VyIG1ldGhvZCBuYW1lcyBkbyBub3Qgb3ZlcmxhcCB3aXRoIFJlYWN0IG1ldGhvZHMuJywgbmFtZSkgOiBfcHJvZEludmFyaWFudCgnNzMnLCBuYW1lKSA6IHZvaWQgMDtcbiAgfVxuXG4gIC8vIERpc2FsbG93IGRlZmluaW5nIG1ldGhvZHMgbW9yZSB0aGFuIG9uY2UgdW5sZXNzIGV4cGxpY2l0bHkgYWxsb3dlZC5cbiAgaWYgKGlzQWxyZWFkeURlZmluZWQpIHtcbiAgICAhKHNwZWNQb2xpY3kgPT09IFNwZWNQb2xpY3kuREVGSU5FX01BTlkgfHwgc3BlY1BvbGljeSA9PT0gU3BlY1BvbGljeS5ERUZJTkVfTUFOWV9NRVJHRUQpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0Q2xhc3NJbnRlcmZhY2U6IFlvdSBhcmUgYXR0ZW1wdGluZyB0byBkZWZpbmUgYCVzYCBvbiB5b3VyIGNvbXBvbmVudCBtb3JlIHRoYW4gb25jZS4gVGhpcyBjb25mbGljdCBtYXkgYmUgZHVlIHRvIGEgbWl4aW4uJywgbmFtZSkgOiBfcHJvZEludmFyaWFudCgnNzQnLCBuYW1lKSA6IHZvaWQgMDtcbiAgfVxufVxuXG4vKipcbiAqIE1peGluIGhlbHBlciB3aGljaCBoYW5kbGVzIHBvbGljeSB2YWxpZGF0aW9uIGFuZCByZXNlcnZlZFxuICogc3BlY2lmaWNhdGlvbiBrZXlzIHdoZW4gYnVpbGRpbmcgUmVhY3QgY2xhc3Nlcy5cbiAqL1xuZnVuY3Rpb24gbWl4U3BlY0ludG9Db21wb25lbnQoQ29uc3RydWN0b3IsIHNwZWMpIHtcbiAgaWYgKCFzcGVjKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciB0eXBlb2ZTcGVjID0gdHlwZW9mIHNwZWM7XG4gICAgICB2YXIgaXNNaXhpblZhbGlkID0gdHlwZW9mU3BlYyA9PT0gJ29iamVjdCcgJiYgc3BlYyAhPT0gbnVsbDtcblxuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoaXNNaXhpblZhbGlkLCAnJXM6IFlvdVxcJ3JlIGF0dGVtcHRpbmcgdG8gaW5jbHVkZSBhIG1peGluIHRoYXQgaXMgZWl0aGVyIG51bGwgJyArICdvciBub3QgYW4gb2JqZWN0LiBDaGVjayB0aGUgbWl4aW5zIGluY2x1ZGVkIGJ5IHRoZSBjb21wb25lbnQsICcgKyAnYXMgd2VsbCBhcyBhbnkgbWl4aW5zIHRoZXkgaW5jbHVkZSB0aGVtc2VsdmVzLiAnICsgJ0V4cGVjdGVkIG9iamVjdCBidXQgZ290ICVzLicsIENvbnN0cnVjdG9yLmRpc3BsYXlOYW1lIHx8ICdSZWFjdENsYXNzJywgc3BlYyA9PT0gbnVsbCA/IG51bGwgOiB0eXBlb2ZTcGVjKSA6IHZvaWQgMDtcbiAgICB9XG5cbiAgICByZXR1cm47XG4gIH1cblxuICAhKHR5cGVvZiBzcGVjICE9PSAnZnVuY3Rpb24nKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdENsYXNzOiBZb3VcXCdyZSBhdHRlbXB0aW5nIHRvIHVzZSBhIGNvbXBvbmVudCBjbGFzcyBvciBmdW5jdGlvbiBhcyBhIG1peGluLiBJbnN0ZWFkLCBqdXN0IHVzZSBhIHJlZ3VsYXIgb2JqZWN0LicpIDogX3Byb2RJbnZhcmlhbnQoJzc1JykgOiB2b2lkIDA7XG4gICEhUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KHNwZWMpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0Q2xhc3M6IFlvdVxcJ3JlIGF0dGVtcHRpbmcgdG8gdXNlIGEgY29tcG9uZW50IGFzIGEgbWl4aW4uIEluc3RlYWQsIGp1c3QgdXNlIGEgcmVndWxhciBvYmplY3QuJykgOiBfcHJvZEludmFyaWFudCgnNzYnKSA6IHZvaWQgMDtcblxuICB2YXIgcHJvdG8gPSBDb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gIHZhciBhdXRvQmluZFBhaXJzID0gcHJvdG8uX19yZWFjdEF1dG9CaW5kUGFpcnM7XG5cbiAgLy8gQnkgaGFuZGxpbmcgbWl4aW5zIGJlZm9yZSBhbnkgb3RoZXIgcHJvcGVydGllcywgd2UgZW5zdXJlIHRoZSBzYW1lXG4gIC8vIGNoYWluaW5nIG9yZGVyIGlzIGFwcGxpZWQgdG8gbWV0aG9kcyB3aXRoIERFRklORV9NQU5ZIHBvbGljeSwgd2hldGhlclxuICAvLyBtaXhpbnMgYXJlIGxpc3RlZCBiZWZvcmUgb3IgYWZ0ZXIgdGhlc2UgbWV0aG9kcyBpbiB0aGUgc3BlYy5cbiAgaWYgKHNwZWMuaGFzT3duUHJvcGVydHkoTUlYSU5TX0tFWSkpIHtcbiAgICBSRVNFUlZFRF9TUEVDX0tFWVMubWl4aW5zKENvbnN0cnVjdG9yLCBzcGVjLm1peGlucyk7XG4gIH1cblxuICBmb3IgKHZhciBuYW1lIGluIHNwZWMpIHtcbiAgICBpZiAoIXNwZWMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChuYW1lID09PSBNSVhJTlNfS0VZKSB7XG4gICAgICAvLyBXZSBoYXZlIGFscmVhZHkgaGFuZGxlZCBtaXhpbnMgaW4gYSBzcGVjaWFsIGNhc2UgYWJvdmUuXG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB2YXIgcHJvcGVydHkgPSBzcGVjW25hbWVdO1xuICAgIHZhciBpc0FscmVhZHlEZWZpbmVkID0gcHJvdG8uaGFzT3duUHJvcGVydHkobmFtZSk7XG4gICAgdmFsaWRhdGVNZXRob2RPdmVycmlkZShpc0FscmVhZHlEZWZpbmVkLCBuYW1lKTtcblxuICAgIGlmIChSRVNFUlZFRF9TUEVDX0tFWVMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgIFJFU0VSVkVEX1NQRUNfS0VZU1tuYW1lXShDb25zdHJ1Y3RvciwgcHJvcGVydHkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTZXR1cCBtZXRob2RzIG9uIHByb3RvdHlwZTpcbiAgICAgIC8vIFRoZSBmb2xsb3dpbmcgbWVtYmVyIG1ldGhvZHMgc2hvdWxkIG5vdCBiZSBhdXRvbWF0aWNhbGx5IGJvdW5kOlxuICAgICAgLy8gMS4gRXhwZWN0ZWQgUmVhY3RDbGFzcyBtZXRob2RzIChpbiB0aGUgXCJpbnRlcmZhY2VcIikuXG4gICAgICAvLyAyLiBPdmVycmlkZGVuIG1ldGhvZHMgKHRoYXQgd2VyZSBtaXhlZCBpbikuXG4gICAgICB2YXIgaXNSZWFjdENsYXNzTWV0aG9kID0gUmVhY3RDbGFzc0ludGVyZmFjZS5oYXNPd25Qcm9wZXJ0eShuYW1lKTtcbiAgICAgIHZhciBpc0Z1bmN0aW9uID0gdHlwZW9mIHByb3BlcnR5ID09PSAnZnVuY3Rpb24nO1xuICAgICAgdmFyIHNob3VsZEF1dG9CaW5kID0gaXNGdW5jdGlvbiAmJiAhaXNSZWFjdENsYXNzTWV0aG9kICYmICFpc0FscmVhZHlEZWZpbmVkICYmIHNwZWMuYXV0b2JpbmQgIT09IGZhbHNlO1xuXG4gICAgICBpZiAoc2hvdWxkQXV0b0JpbmQpIHtcbiAgICAgICAgYXV0b0JpbmRQYWlycy5wdXNoKG5hbWUsIHByb3BlcnR5KTtcbiAgICAgICAgcHJvdG9bbmFtZV0gPSBwcm9wZXJ0eTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChpc0FscmVhZHlEZWZpbmVkKSB7XG4gICAgICAgICAgdmFyIHNwZWNQb2xpY3kgPSBSZWFjdENsYXNzSW50ZXJmYWNlW25hbWVdO1xuXG4gICAgICAgICAgLy8gVGhlc2UgY2FzZXMgc2hvdWxkIGFscmVhZHkgYmUgY2F1Z2h0IGJ5IHZhbGlkYXRlTWV0aG9kT3ZlcnJpZGUuXG4gICAgICAgICAgIShpc1JlYWN0Q2xhc3NNZXRob2QgJiYgKHNwZWNQb2xpY3kgPT09IFNwZWNQb2xpY3kuREVGSU5FX01BTllfTUVSR0VEIHx8IHNwZWNQb2xpY3kgPT09IFNwZWNQb2xpY3kuREVGSU5FX01BTlkpKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdENsYXNzOiBVbmV4cGVjdGVkIHNwZWMgcG9saWN5ICVzIGZvciBrZXkgJXMgd2hlbiBtaXhpbmcgaW4gY29tcG9uZW50IHNwZWNzLicsIHNwZWNQb2xpY3ksIG5hbWUpIDogX3Byb2RJbnZhcmlhbnQoJzc3Jywgc3BlY1BvbGljeSwgbmFtZSkgOiB2b2lkIDA7XG5cbiAgICAgICAgICAvLyBGb3IgbWV0aG9kcyB3aGljaCBhcmUgZGVmaW5lZCBtb3JlIHRoYW4gb25jZSwgY2FsbCB0aGUgZXhpc3RpbmdcbiAgICAgICAgICAvLyBtZXRob2RzIGJlZm9yZSBjYWxsaW5nIHRoZSBuZXcgcHJvcGVydHksIG1lcmdpbmcgaWYgYXBwcm9wcmlhdGUuXG4gICAgICAgICAgaWYgKHNwZWNQb2xpY3kgPT09IFNwZWNQb2xpY3kuREVGSU5FX01BTllfTUVSR0VEKSB7XG4gICAgICAgICAgICBwcm90b1tuYW1lXSA9IGNyZWF0ZU1lcmdlZFJlc3VsdEZ1bmN0aW9uKHByb3RvW25hbWVdLCBwcm9wZXJ0eSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChzcGVjUG9saWN5ID09PSBTcGVjUG9saWN5LkRFRklORV9NQU5ZKSB7XG4gICAgICAgICAgICBwcm90b1tuYW1lXSA9IGNyZWF0ZUNoYWluZWRGdW5jdGlvbihwcm90b1tuYW1lXSwgcHJvcGVydHkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcm90b1tuYW1lXSA9IHByb3BlcnR5O1xuICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAvLyBBZGQgdmVyYm9zZSBkaXNwbGF5TmFtZSB0byB0aGUgZnVuY3Rpb24sIHdoaWNoIGhlbHBzIHdoZW4gbG9va2luZ1xuICAgICAgICAgICAgLy8gYXQgcHJvZmlsaW5nIHRvb2xzLlxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwcm9wZXJ0eSA9PT0gJ2Z1bmN0aW9uJyAmJiBzcGVjLmRpc3BsYXlOYW1lKSB7XG4gICAgICAgICAgICAgIHByb3RvW25hbWVdLmRpc3BsYXlOYW1lID0gc3BlYy5kaXNwbGF5TmFtZSArICdfJyArIG5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIG1peFN0YXRpY1NwZWNJbnRvQ29tcG9uZW50KENvbnN0cnVjdG9yLCBzdGF0aWNzKSB7XG4gIGlmICghc3RhdGljcykge1xuICAgIHJldHVybjtcbiAgfVxuICBmb3IgKHZhciBuYW1lIGluIHN0YXRpY3MpIHtcbiAgICB2YXIgcHJvcGVydHkgPSBzdGF0aWNzW25hbWVdO1xuICAgIGlmICghc3RhdGljcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgdmFyIGlzUmVzZXJ2ZWQgPSBuYW1lIGluIFJFU0VSVkVEX1NQRUNfS0VZUztcbiAgICAhIWlzUmVzZXJ2ZWQgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RDbGFzczogWW91IGFyZSBhdHRlbXB0aW5nIHRvIGRlZmluZSBhIHJlc2VydmVkIHByb3BlcnR5LCBgJXNgLCB0aGF0IHNob3VsZG5cXCd0IGJlIG9uIHRoZSBcInN0YXRpY3NcIiBrZXkuIERlZmluZSBpdCBhcyBhbiBpbnN0YW5jZSBwcm9wZXJ0eSBpbnN0ZWFkOyBpdCB3aWxsIHN0aWxsIGJlIGFjY2Vzc2libGUgb24gdGhlIGNvbnN0cnVjdG9yLicsIG5hbWUpIDogX3Byb2RJbnZhcmlhbnQoJzc4JywgbmFtZSkgOiB2b2lkIDA7XG5cbiAgICB2YXIgaXNJbmhlcml0ZWQgPSBuYW1lIGluIENvbnN0cnVjdG9yO1xuICAgICEhaXNJbmhlcml0ZWQgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RDbGFzczogWW91IGFyZSBhdHRlbXB0aW5nIHRvIGRlZmluZSBgJXNgIG9uIHlvdXIgY29tcG9uZW50IG1vcmUgdGhhbiBvbmNlLiBUaGlzIGNvbmZsaWN0IG1heSBiZSBkdWUgdG8gYSBtaXhpbi4nLCBuYW1lKSA6IF9wcm9kSW52YXJpYW50KCc3OScsIG5hbWUpIDogdm9pZCAwO1xuICAgIENvbnN0cnVjdG9yW25hbWVdID0gcHJvcGVydHk7XG4gIH1cbn1cblxuLyoqXG4gKiBNZXJnZSB0d28gb2JqZWN0cywgYnV0IHRocm93IGlmIGJvdGggY29udGFpbiB0aGUgc2FtZSBrZXkuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IG9uZSBUaGUgZmlyc3Qgb2JqZWN0LCB3aGljaCBpcyBtdXRhdGVkLlxuICogQHBhcmFtIHtvYmplY3R9IHR3byBUaGUgc2Vjb25kIG9iamVjdFxuICogQHJldHVybiB7b2JqZWN0fSBvbmUgYWZ0ZXIgaXQgaGFzIGJlZW4gbXV0YXRlZCB0byBjb250YWluIGV2ZXJ5dGhpbmcgaW4gdHdvLlxuICovXG5mdW5jdGlvbiBtZXJnZUludG9XaXRoTm9EdXBsaWNhdGVLZXlzKG9uZSwgdHdvKSB7XG4gICEob25lICYmIHR3byAmJiB0eXBlb2Ygb25lID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdHdvID09PSAnb2JqZWN0JykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnbWVyZ2VJbnRvV2l0aE5vRHVwbGljYXRlS2V5cygpOiBDYW5ub3QgbWVyZ2Ugbm9uLW9iamVjdHMuJykgOiBfcHJvZEludmFyaWFudCgnODAnKSA6IHZvaWQgMDtcblxuICBmb3IgKHZhciBrZXkgaW4gdHdvKSB7XG4gICAgaWYgKHR3by5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAhKG9uZVtrZXldID09PSB1bmRlZmluZWQpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ21lcmdlSW50b1dpdGhOb0R1cGxpY2F0ZUtleXMoKTogVHJpZWQgdG8gbWVyZ2UgdHdvIG9iamVjdHMgd2l0aCB0aGUgc2FtZSBrZXk6IGAlc2AuIFRoaXMgY29uZmxpY3QgbWF5IGJlIGR1ZSB0byBhIG1peGluOyBpbiBwYXJ0aWN1bGFyLCB0aGlzIG1heSBiZSBjYXVzZWQgYnkgdHdvIGdldEluaXRpYWxTdGF0ZSgpIG9yIGdldERlZmF1bHRQcm9wcygpIG1ldGhvZHMgcmV0dXJuaW5nIG9iamVjdHMgd2l0aCBjbGFzaGluZyBrZXlzLicsIGtleSkgOiBfcHJvZEludmFyaWFudCgnODEnLCBrZXkpIDogdm9pZCAwO1xuICAgICAgb25lW2tleV0gPSB0d29ba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG9uZTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBpbnZva2VzIHR3byBmdW5jdGlvbnMgYW5kIG1lcmdlcyB0aGVpciByZXR1cm4gdmFsdWVzLlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IG9uZSBGdW5jdGlvbiB0byBpbnZva2UgZmlyc3QuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSB0d28gRnVuY3Rpb24gdG8gaW52b2tlIHNlY29uZC5cbiAqIEByZXR1cm4ge2Z1bmN0aW9ufSBGdW5jdGlvbiB0aGF0IGludm9rZXMgdGhlIHR3byBhcmd1bWVudCBmdW5jdGlvbnMuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjcmVhdGVNZXJnZWRSZXN1bHRGdW5jdGlvbihvbmUsIHR3bykge1xuICByZXR1cm4gZnVuY3Rpb24gbWVyZ2VkUmVzdWx0KCkge1xuICAgIHZhciBhID0gb25lLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdmFyIGIgPSB0d28uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoYSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gYjtcbiAgICB9IGVsc2UgaWYgKGIgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGE7XG4gICAgfVxuICAgIHZhciBjID0ge307XG4gICAgbWVyZ2VJbnRvV2l0aE5vRHVwbGljYXRlS2V5cyhjLCBhKTtcbiAgICBtZXJnZUludG9XaXRoTm9EdXBsaWNhdGVLZXlzKGMsIGIpO1xuICAgIHJldHVybiBjO1xuICB9O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGludm9rZXMgdHdvIGZ1bmN0aW9ucyBhbmQgaWdub3JlcyB0aGVpciByZXR1cm4gdmFsZXMuXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gb25lIEZ1bmN0aW9uIHRvIGludm9rZSBmaXJzdC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHR3byBGdW5jdGlvbiB0byBpbnZva2Ugc2Vjb25kLlxuICogQHJldHVybiB7ZnVuY3Rpb259IEZ1bmN0aW9uIHRoYXQgaW52b2tlcyB0aGUgdHdvIGFyZ3VtZW50IGZ1bmN0aW9ucy5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUNoYWluZWRGdW5jdGlvbihvbmUsIHR3bykge1xuICByZXR1cm4gZnVuY3Rpb24gY2hhaW5lZEZ1bmN0aW9uKCkge1xuICAgIG9uZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHR3by5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG4vKipcbiAqIEJpbmRzIGEgbWV0aG9kIHRvIHRoZSBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbXBvbmVudCBDb21wb25lbnQgd2hvc2UgbWV0aG9kIGlzIGdvaW5nIHRvIGJlIGJvdW5kLlxuICogQHBhcmFtIHtmdW5jdGlvbn0gbWV0aG9kIE1ldGhvZCB0byBiZSBib3VuZC5cbiAqIEByZXR1cm4ge2Z1bmN0aW9ufSBUaGUgYm91bmQgbWV0aG9kLlxuICovXG5mdW5jdGlvbiBiaW5kQXV0b0JpbmRNZXRob2QoY29tcG9uZW50LCBtZXRob2QpIHtcbiAgdmFyIGJvdW5kTWV0aG9kID0gbWV0aG9kLmJpbmQoY29tcG9uZW50KTtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRDb250ZXh0ID0gY29tcG9uZW50O1xuICAgIGJvdW5kTWV0aG9kLl9fcmVhY3RCb3VuZE1ldGhvZCA9IG1ldGhvZDtcbiAgICBib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRBcmd1bWVudHMgPSBudWxsO1xuICAgIHZhciBjb21wb25lbnROYW1lID0gY29tcG9uZW50LmNvbnN0cnVjdG9yLmRpc3BsYXlOYW1lO1xuICAgIHZhciBfYmluZCA9IGJvdW5kTWV0aG9kLmJpbmQ7XG4gICAgYm91bmRNZXRob2QuYmluZCA9IGZ1bmN0aW9uIChuZXdUaGlzKSB7XG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICB9XG5cbiAgICAgIC8vIFVzZXIgaXMgdHJ5aW5nIHRvIGJpbmQoKSBhbiBhdXRvYm91bmQgbWV0aG9kOyB3ZSBlZmZlY3RpdmVseSB3aWxsXG4gICAgICAvLyBpZ25vcmUgdGhlIHZhbHVlIG9mIFwidGhpc1wiIHRoYXQgdGhlIHVzZXIgaXMgdHJ5aW5nIHRvIHVzZSwgc29cbiAgICAgIC8vIGxldCdzIHdhcm4uXG4gICAgICBpZiAobmV3VGhpcyAhPT0gY29tcG9uZW50ICYmIG5ld1RoaXMgIT09IG51bGwpIHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdiaW5kKCk6IFJlYWN0IGNvbXBvbmVudCBtZXRob2RzIG1heSBvbmx5IGJlIGJvdW5kIHRvIHRoZSAnICsgJ2NvbXBvbmVudCBpbnN0YW5jZS4gU2VlICVzJywgY29tcG9uZW50TmFtZSkgOiB2b2lkIDA7XG4gICAgICB9IGVsc2UgaWYgKCFhcmdzLmxlbmd0aCkge1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ2JpbmQoKTogWW91IGFyZSBiaW5kaW5nIGEgY29tcG9uZW50IG1ldGhvZCB0byB0aGUgY29tcG9uZW50LiAnICsgJ1JlYWN0IGRvZXMgdGhpcyBmb3IgeW91IGF1dG9tYXRpY2FsbHkgaW4gYSBoaWdoLXBlcmZvcm1hbmNlICcgKyAnd2F5LCBzbyB5b3UgY2FuIHNhZmVseSByZW1vdmUgdGhpcyBjYWxsLiBTZWUgJXMnLCBjb21wb25lbnROYW1lKSA6IHZvaWQgMDtcbiAgICAgICAgcmV0dXJuIGJvdW5kTWV0aG9kO1xuICAgICAgfVxuICAgICAgdmFyIHJlYm91bmRNZXRob2QgPSBfYmluZC5hcHBseShib3VuZE1ldGhvZCwgYXJndW1lbnRzKTtcbiAgICAgIHJlYm91bmRNZXRob2QuX19yZWFjdEJvdW5kQ29udGV4dCA9IGNvbXBvbmVudDtcbiAgICAgIHJlYm91bmRNZXRob2QuX19yZWFjdEJvdW5kTWV0aG9kID0gbWV0aG9kO1xuICAgICAgcmVib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRBcmd1bWVudHMgPSBhcmdzO1xuICAgICAgcmV0dXJuIHJlYm91bmRNZXRob2Q7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gYm91bmRNZXRob2Q7XG59XG5cbi8qKlxuICogQmluZHMgYWxsIGF1dG8tYm91bmQgbWV0aG9kcyBpbiBhIGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29tcG9uZW50IENvbXBvbmVudCB3aG9zZSBtZXRob2QgaXMgZ29pbmcgdG8gYmUgYm91bmQuXG4gKi9cbmZ1bmN0aW9uIGJpbmRBdXRvQmluZE1ldGhvZHMoY29tcG9uZW50KSB7XG4gIHZhciBwYWlycyA9IGNvbXBvbmVudC5fX3JlYWN0QXV0b0JpbmRQYWlycztcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYWlycy5sZW5ndGg7IGkgKz0gMikge1xuICAgIHZhciBhdXRvQmluZEtleSA9IHBhaXJzW2ldO1xuICAgIHZhciBtZXRob2QgPSBwYWlyc1tpICsgMV07XG4gICAgY29tcG9uZW50W2F1dG9CaW5kS2V5XSA9IGJpbmRBdXRvQmluZE1ldGhvZChjb21wb25lbnQsIG1ldGhvZCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBZGQgbW9yZSB0byB0aGUgUmVhY3RDbGFzcyBiYXNlIGNsYXNzLiBUaGVzZSBhcmUgYWxsIGxlZ2FjeSBmZWF0dXJlcyBhbmRcbiAqIHRoZXJlZm9yZSBub3QgYWxyZWFkeSBwYXJ0IG9mIHRoZSBtb2Rlcm4gUmVhY3RDb21wb25lbnQuXG4gKi9cbnZhciBSZWFjdENsYXNzTWl4aW4gPSB7XG5cbiAgLyoqXG4gICAqIFRPRE86IFRoaXMgd2lsbCBiZSBkZXByZWNhdGVkIGJlY2F1c2Ugc3RhdGUgc2hvdWxkIGFsd2F5cyBrZWVwIGEgY29uc2lzdGVudFxuICAgKiB0eXBlIHNpZ25hdHVyZSBhbmQgdGhlIG9ubHkgdXNlIGNhc2UgZm9yIHRoaXMsIGlzIHRvIGF2b2lkIHRoYXQuXG4gICAqL1xuICByZXBsYWNlU3RhdGU6IGZ1bmN0aW9uIChuZXdTdGF0ZSwgY2FsbGJhY2spIHtcbiAgICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZVJlcGxhY2VTdGF0ZSh0aGlzLCBuZXdTdGF0ZSk7XG4gICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZUNhbGxiYWNrKHRoaXMsIGNhbGxiYWNrLCAncmVwbGFjZVN0YXRlJyk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2hldGhlciBvciBub3QgdGhpcyBjb21wb3NpdGUgY29tcG9uZW50IGlzIG1vdW50ZWQuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgbW91bnRlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKiBAcHJvdGVjdGVkXG4gICAqIEBmaW5hbFxuICAgKi9cbiAgaXNNb3VudGVkOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudXBkYXRlci5pc01vdW50ZWQodGhpcyk7XG4gIH1cbn07XG5cbnZhciBSZWFjdENsYXNzQ29tcG9uZW50ID0gZnVuY3Rpb24gKCkge307XG5fYXNzaWduKFJlYWN0Q2xhc3NDb21wb25lbnQucHJvdG90eXBlLCBSZWFjdENvbXBvbmVudC5wcm90b3R5cGUsIFJlYWN0Q2xhc3NNaXhpbik7XG5cbi8qKlxuICogTW9kdWxlIGZvciBjcmVhdGluZyBjb21wb3NpdGUgY29tcG9uZW50cy5cbiAqXG4gKiBAY2xhc3MgUmVhY3RDbGFzc1xuICovXG52YXIgUmVhY3RDbGFzcyA9IHtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGNvbXBvc2l0ZSBjb21wb25lbnQgY2xhc3MgZ2l2ZW4gYSBjbGFzcyBzcGVjaWZpY2F0aW9uLlxuICAgKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90b3AtbGV2ZWwtYXBpLmh0bWwjcmVhY3QuY3JlYXRlY2xhc3NcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IHNwZWMgQ2xhc3Mgc3BlY2lmaWNhdGlvbiAod2hpY2ggbXVzdCBkZWZpbmUgYHJlbmRlcmApLlxuICAgKiBAcmV0dXJuIHtmdW5jdGlvbn0gQ29tcG9uZW50IGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICAgKiBAcHVibGljXG4gICAqL1xuICBjcmVhdGVDbGFzczogZnVuY3Rpb24gKHNwZWMpIHtcbiAgICB2YXIgQ29uc3RydWN0b3IgPSBmdW5jdGlvbiAocHJvcHMsIGNvbnRleHQsIHVwZGF0ZXIpIHtcbiAgICAgIC8vIFRoaXMgY29uc3RydWN0b3IgZ2V0cyBvdmVycmlkZGVuIGJ5IG1vY2tzLiBUaGUgYXJndW1lbnQgaXMgdXNlZFxuICAgICAgLy8gYnkgbW9ja3MgdG8gYXNzZXJ0IG9uIHdoYXQgZ2V0cyBtb3VudGVkLlxuXG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyh0aGlzIGluc3RhbmNlb2YgQ29uc3RydWN0b3IsICdTb21ldGhpbmcgaXMgY2FsbGluZyBhIFJlYWN0IGNvbXBvbmVudCBkaXJlY3RseS4gVXNlIGEgZmFjdG9yeSBvciAnICsgJ0pTWCBpbnN0ZWFkLiBTZWU6IGh0dHBzOi8vZmIubWUvcmVhY3QtbGVnYWN5ZmFjdG9yeScpIDogdm9pZCAwO1xuICAgICAgfVxuXG4gICAgICAvLyBXaXJlIHVwIGF1dG8tYmluZGluZ1xuICAgICAgaWYgKHRoaXMuX19yZWFjdEF1dG9CaW5kUGFpcnMubGVuZ3RoKSB7XG4gICAgICAgIGJpbmRBdXRvQmluZE1ldGhvZHModGhpcyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICB0aGlzLnJlZnMgPSBlbXB0eU9iamVjdDtcbiAgICAgIHRoaXMudXBkYXRlciA9IHVwZGF0ZXIgfHwgUmVhY3ROb29wVXBkYXRlUXVldWU7XG5cbiAgICAgIHRoaXMuc3RhdGUgPSBudWxsO1xuXG4gICAgICAvLyBSZWFjdENsYXNzZXMgZG9lc24ndCBoYXZlIGNvbnN0cnVjdG9ycy4gSW5zdGVhZCwgdGhleSB1c2UgdGhlXG4gICAgICAvLyBnZXRJbml0aWFsU3RhdGUgYW5kIGNvbXBvbmVudFdpbGxNb3VudCBtZXRob2RzIGZvciBpbml0aWFsaXphdGlvbi5cblxuICAgICAgdmFyIGluaXRpYWxTdGF0ZSA9IHRoaXMuZ2V0SW5pdGlhbFN0YXRlID8gdGhpcy5nZXRJbml0aWFsU3RhdGUoKSA6IG51bGw7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAvLyBXZSBhbGxvdyBhdXRvLW1vY2tzIHRvIHByb2NlZWQgYXMgaWYgdGhleSdyZSByZXR1cm5pbmcgbnVsbC5cbiAgICAgICAgaWYgKGluaXRpYWxTdGF0ZSA9PT0gdW5kZWZpbmVkICYmIHRoaXMuZ2V0SW5pdGlhbFN0YXRlLl9pc01vY2tGdW5jdGlvbikge1xuICAgICAgICAgIC8vIFRoaXMgaXMgcHJvYmFibHkgYmFkIHByYWN0aWNlLiBDb25zaWRlciB3YXJuaW5nIGhlcmUgYW5kXG4gICAgICAgICAgLy8gZGVwcmVjYXRpbmcgdGhpcyBjb252ZW5pZW5jZS5cbiAgICAgICAgICBpbml0aWFsU3RhdGUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAhKHR5cGVvZiBpbml0aWFsU3RhdGUgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KGluaXRpYWxTdGF0ZSkpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJyVzLmdldEluaXRpYWxTdGF0ZSgpOiBtdXN0IHJldHVybiBhbiBvYmplY3Qgb3IgbnVsbCcsIENvbnN0cnVjdG9yLmRpc3BsYXlOYW1lIHx8ICdSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCcpIDogX3Byb2RJbnZhcmlhbnQoJzgyJywgQ29uc3RydWN0b3IuZGlzcGxheU5hbWUgfHwgJ1JlYWN0Q29tcG9zaXRlQ29tcG9uZW50JykgOiB2b2lkIDA7XG5cbiAgICAgIHRoaXMuc3RhdGUgPSBpbml0aWFsU3RhdGU7XG4gICAgfTtcbiAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBuZXcgUmVhY3RDbGFzc0NvbXBvbmVudCgpO1xuICAgIENvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IENvbnN0cnVjdG9yO1xuICAgIENvbnN0cnVjdG9yLnByb3RvdHlwZS5fX3JlYWN0QXV0b0JpbmRQYWlycyA9IFtdO1xuXG4gICAgaW5qZWN0ZWRNaXhpbnMuZm9yRWFjaChtaXhTcGVjSW50b0NvbXBvbmVudC5iaW5kKG51bGwsIENvbnN0cnVjdG9yKSk7XG5cbiAgICBtaXhTcGVjSW50b0NvbXBvbmVudChDb25zdHJ1Y3Rvciwgc3BlYyk7XG5cbiAgICAvLyBJbml0aWFsaXplIHRoZSBkZWZhdWx0UHJvcHMgcHJvcGVydHkgYWZ0ZXIgYWxsIG1peGlucyBoYXZlIGJlZW4gbWVyZ2VkLlxuICAgIGlmIChDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMpIHtcbiAgICAgIENvbnN0cnVjdG9yLmRlZmF1bHRQcm9wcyA9IENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcygpO1xuICAgIH1cblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAvLyBUaGlzIGlzIGEgdGFnIHRvIGluZGljYXRlIHRoYXQgdGhlIHVzZSBvZiB0aGVzZSBtZXRob2QgbmFtZXMgaXMgb2ssXG4gICAgICAvLyBzaW5jZSBpdCdzIHVzZWQgd2l0aCBjcmVhdGVDbGFzcy4gSWYgaXQncyBub3QsIHRoZW4gaXQncyBsaWtlbHkgYVxuICAgICAgLy8gbWlzdGFrZSBzbyB3ZSdsbCB3YXJuIHlvdSB0byB1c2UgdGhlIHN0YXRpYyBwcm9wZXJ0eSwgcHJvcGVydHlcbiAgICAgIC8vIGluaXRpYWxpemVyIG9yIGNvbnN0cnVjdG9yIHJlc3BlY3RpdmVseS5cbiAgICAgIGlmIChDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMpIHtcbiAgICAgICAgQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzLmlzUmVhY3RDbGFzc0FwcHJvdmVkID0ge307XG4gICAgICB9XG4gICAgICBpZiAoQ29uc3RydWN0b3IucHJvdG90eXBlLmdldEluaXRpYWxTdGF0ZSkge1xuICAgICAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUuZ2V0SW5pdGlhbFN0YXRlLmlzUmVhY3RDbGFzc0FwcHJvdmVkID0ge307XG4gICAgICB9XG4gICAgfVxuXG4gICAgIUNvbnN0cnVjdG9yLnByb3RvdHlwZS5yZW5kZXIgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnY3JlYXRlQ2xhc3MoLi4uKTogQ2xhc3Mgc3BlY2lmaWNhdGlvbiBtdXN0IGltcGxlbWVudCBhIGByZW5kZXJgIG1ldGhvZC4nKSA6IF9wcm9kSW52YXJpYW50KCc4MycpIDogdm9pZCAwO1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKCFDb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29tcG9uZW50U2hvdWxkVXBkYXRlLCAnJXMgaGFzIGEgbWV0aG9kIGNhbGxlZCAnICsgJ2NvbXBvbmVudFNob3VsZFVwZGF0ZSgpLiBEaWQgeW91IG1lYW4gc2hvdWxkQ29tcG9uZW50VXBkYXRlKCk/ICcgKyAnVGhlIG5hbWUgaXMgcGhyYXNlZCBhcyBhIHF1ZXN0aW9uIGJlY2F1c2UgdGhlIGZ1bmN0aW9uIGlzICcgKyAnZXhwZWN0ZWQgdG8gcmV0dXJuIGEgdmFsdWUuJywgc3BlYy5kaXNwbGF5TmFtZSB8fCAnQSBjb21wb25lbnQnKSA6IHZvaWQgMDtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKCFDb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29tcG9uZW50V2lsbFJlY2lldmVQcm9wcywgJyVzIGhhcyBhIG1ldGhvZCBjYWxsZWQgJyArICdjb21wb25lbnRXaWxsUmVjaWV2ZVByb3BzKCkuIERpZCB5b3UgbWVhbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKCk/Jywgc3BlYy5kaXNwbGF5TmFtZSB8fCAnQSBjb21wb25lbnQnKSA6IHZvaWQgMDtcbiAgICB9XG5cbiAgICAvLyBSZWR1Y2UgdGltZSBzcGVudCBkb2luZyBsb29rdXBzIGJ5IHNldHRpbmcgdGhlc2Ugb24gdGhlIHByb3RvdHlwZS5cbiAgICBmb3IgKHZhciBtZXRob2ROYW1lIGluIFJlYWN0Q2xhc3NJbnRlcmZhY2UpIHtcbiAgICAgIGlmICghQ29uc3RydWN0b3IucHJvdG90eXBlW21ldGhvZE5hbWVdKSB7XG4gICAgICAgIENvbnN0cnVjdG9yLnByb3RvdHlwZVttZXRob2ROYW1lXSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9LFxuXG4gIGluamVjdGlvbjoge1xuICAgIGluamVjdE1peGluOiBmdW5jdGlvbiAobWl4aW4pIHtcbiAgICAgIGluamVjdGVkTWl4aW5zLnB1c2gobWl4aW4pO1xuICAgIH1cbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q2xhc3M7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0Q29tcG9uZW50XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3Byb2RJbnZhcmlhbnQgPSByZXF1aXJlKCcuL3JlYWN0UHJvZEludmFyaWFudCcpO1xuXG52YXIgUmVhY3ROb29wVXBkYXRlUXVldWUgPSByZXF1aXJlKCcuL1JlYWN0Tm9vcFVwZGF0ZVF1ZXVlJyk7XG5cbnZhciBjYW5EZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vY2FuRGVmaW5lUHJvcGVydHknKTtcbnZhciBlbXB0eU9iamVjdCA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5T2JqZWN0Jyk7XG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxuLyoqXG4gKiBCYXNlIGNsYXNzIGhlbHBlcnMgZm9yIHRoZSB1cGRhdGluZyBzdGF0ZSBvZiBhIGNvbXBvbmVudC5cbiAqL1xuZnVuY3Rpb24gUmVhY3RDb21wb25lbnQocHJvcHMsIGNvbnRleHQsIHVwZGF0ZXIpIHtcbiAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICB0aGlzLnJlZnMgPSBlbXB0eU9iamVjdDtcbiAgLy8gV2UgaW5pdGlhbGl6ZSB0aGUgZGVmYXVsdCB1cGRhdGVyIGJ1dCB0aGUgcmVhbCBvbmUgZ2V0cyBpbmplY3RlZCBieSB0aGVcbiAgLy8gcmVuZGVyZXIuXG4gIHRoaXMudXBkYXRlciA9IHVwZGF0ZXIgfHwgUmVhY3ROb29wVXBkYXRlUXVldWU7XG59XG5cblJlYWN0Q29tcG9uZW50LnByb3RvdHlwZS5pc1JlYWN0Q29tcG9uZW50ID0ge307XG5cbi8qKlxuICogU2V0cyBhIHN1YnNldCBvZiB0aGUgc3RhdGUuIEFsd2F5cyB1c2UgdGhpcyB0byBtdXRhdGVcbiAqIHN0YXRlLiBZb3Ugc2hvdWxkIHRyZWF0IGB0aGlzLnN0YXRlYCBhcyBpbW11dGFibGUuXG4gKlxuICogVGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgYHRoaXMuc3RhdGVgIHdpbGwgYmUgaW1tZWRpYXRlbHkgdXBkYXRlZCwgc29cbiAqIGFjY2Vzc2luZyBgdGhpcy5zdGF0ZWAgYWZ0ZXIgY2FsbGluZyB0aGlzIG1ldGhvZCBtYXkgcmV0dXJuIHRoZSBvbGQgdmFsdWUuXG4gKlxuICogVGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgY2FsbHMgdG8gYHNldFN0YXRlYCB3aWxsIHJ1biBzeW5jaHJvbm91c2x5LFxuICogYXMgdGhleSBtYXkgZXZlbnR1YWxseSBiZSBiYXRjaGVkIHRvZ2V0aGVyLiAgWW91IGNhbiBwcm92aWRlIGFuIG9wdGlvbmFsXG4gKiBjYWxsYmFjayB0aGF0IHdpbGwgYmUgZXhlY3V0ZWQgd2hlbiB0aGUgY2FsbCB0byBzZXRTdGF0ZSBpcyBhY3R1YWxseVxuICogY29tcGxldGVkLlxuICpcbiAqIFdoZW4gYSBmdW5jdGlvbiBpcyBwcm92aWRlZCB0byBzZXRTdGF0ZSwgaXQgd2lsbCBiZSBjYWxsZWQgYXQgc29tZSBwb2ludCBpblxuICogdGhlIGZ1dHVyZSAobm90IHN5bmNocm9ub3VzbHkpLiBJdCB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSB1cCB0byBkYXRlXG4gKiBjb21wb25lbnQgYXJndW1lbnRzIChzdGF0ZSwgcHJvcHMsIGNvbnRleHQpLiBUaGVzZSB2YWx1ZXMgY2FuIGJlIGRpZmZlcmVudFxuICogZnJvbSB0aGlzLiogYmVjYXVzZSB5b3VyIGZ1bmN0aW9uIG1heSBiZSBjYWxsZWQgYWZ0ZXIgcmVjZWl2ZVByb3BzIGJ1dCBiZWZvcmVcbiAqIHNob3VsZENvbXBvbmVudFVwZGF0ZSwgYW5kIHRoaXMgbmV3IHN0YXRlLCBwcm9wcywgYW5kIGNvbnRleHQgd2lsbCBub3QgeWV0IGJlXG4gKiBhc3NpZ25lZCB0byB0aGlzLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fGZ1bmN0aW9ufSBwYXJ0aWFsU3RhdGUgTmV4dCBwYXJ0aWFsIHN0YXRlIG9yIGZ1bmN0aW9uIHRvXG4gKiAgICAgICAgcHJvZHVjZSBuZXh0IHBhcnRpYWwgc3RhdGUgdG8gYmUgbWVyZ2VkIHdpdGggY3VycmVudCBzdGF0ZS5cbiAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgc3RhdGUgaXMgdXBkYXRlZC5cbiAqIEBmaW5hbFxuICogQHByb3RlY3RlZFxuICovXG5SZWFjdENvbXBvbmVudC5wcm90b3R5cGUuc2V0U3RhdGUgPSBmdW5jdGlvbiAocGFydGlhbFN0YXRlLCBjYWxsYmFjaykge1xuICAhKHR5cGVvZiBwYXJ0aWFsU3RhdGUgPT09ICdvYmplY3QnIHx8IHR5cGVvZiBwYXJ0aWFsU3RhdGUgPT09ICdmdW5jdGlvbicgfHwgcGFydGlhbFN0YXRlID09IG51bGwpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3NldFN0YXRlKC4uLik6IHRha2VzIGFuIG9iamVjdCBvZiBzdGF0ZSB2YXJpYWJsZXMgdG8gdXBkYXRlIG9yIGEgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhbiBvYmplY3Qgb2Ygc3RhdGUgdmFyaWFibGVzLicpIDogX3Byb2RJbnZhcmlhbnQoJzg1JykgOiB2b2lkIDA7XG4gIHRoaXMudXBkYXRlci5lbnF1ZXVlU2V0U3RhdGUodGhpcywgcGFydGlhbFN0YXRlKTtcbiAgaWYgKGNhbGxiYWNrKSB7XG4gICAgdGhpcy51cGRhdGVyLmVucXVldWVDYWxsYmFjayh0aGlzLCBjYWxsYmFjaywgJ3NldFN0YXRlJyk7XG4gIH1cbn07XG5cbi8qKlxuICogRm9yY2VzIGFuIHVwZGF0ZS4gVGhpcyBzaG91bGQgb25seSBiZSBpbnZva2VkIHdoZW4gaXQgaXMga25vd24gd2l0aFxuICogY2VydGFpbnR5IHRoYXQgd2UgYXJlICoqbm90KiogaW4gYSBET00gdHJhbnNhY3Rpb24uXG4gKlxuICogWW91IG1heSB3YW50IHRvIGNhbGwgdGhpcyB3aGVuIHlvdSBrbm93IHRoYXQgc29tZSBkZWVwZXIgYXNwZWN0IG9mIHRoZVxuICogY29tcG9uZW50J3Mgc3RhdGUgaGFzIGNoYW5nZWQgYnV0IGBzZXRTdGF0ZWAgd2FzIG5vdCBjYWxsZWQuXG4gKlxuICogVGhpcyB3aWxsIG5vdCBpbnZva2UgYHNob3VsZENvbXBvbmVudFVwZGF0ZWAsIGJ1dCBpdCB3aWxsIGludm9rZVxuICogYGNvbXBvbmVudFdpbGxVcGRhdGVgIGFuZCBgY29tcG9uZW50RGlkVXBkYXRlYC5cbiAqXG4gKiBAcGFyYW0gez9mdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIHVwZGF0ZSBpcyBjb21wbGV0ZS5cbiAqIEBmaW5hbFxuICogQHByb3RlY3RlZFxuICovXG5SZWFjdENvbXBvbmVudC5wcm90b3R5cGUuZm9yY2VVcGRhdGUgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgdGhpcy51cGRhdGVyLmVucXVldWVGb3JjZVVwZGF0ZSh0aGlzKTtcbiAgaWYgKGNhbGxiYWNrKSB7XG4gICAgdGhpcy51cGRhdGVyLmVucXVldWVDYWxsYmFjayh0aGlzLCBjYWxsYmFjaywgJ2ZvcmNlVXBkYXRlJyk7XG4gIH1cbn07XG5cbi8qKlxuICogRGVwcmVjYXRlZCBBUElzLiBUaGVzZSBBUElzIHVzZWQgdG8gZXhpc3Qgb24gY2xhc3NpYyBSZWFjdCBjbGFzc2VzIGJ1dCBzaW5jZVxuICogd2Ugd291bGQgbGlrZSB0byBkZXByZWNhdGUgdGhlbSwgd2UncmUgbm90IGdvaW5nIHRvIG1vdmUgdGhlbSBvdmVyIHRvIHRoaXNcbiAqIG1vZGVybiBiYXNlIGNsYXNzLiBJbnN0ZWFkLCB3ZSBkZWZpbmUgYSBnZXR0ZXIgdGhhdCB3YXJucyBpZiBpdCdzIGFjY2Vzc2VkLlxuICovXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgZGVwcmVjYXRlZEFQSXMgPSB7XG4gICAgaXNNb3VudGVkOiBbJ2lzTW91bnRlZCcsICdJbnN0ZWFkLCBtYWtlIHN1cmUgdG8gY2xlYW4gdXAgc3Vic2NyaXB0aW9ucyBhbmQgcGVuZGluZyByZXF1ZXN0cyBpbiAnICsgJ2NvbXBvbmVudFdpbGxVbm1vdW50IHRvIHByZXZlbnQgbWVtb3J5IGxlYWtzLiddLFxuICAgIHJlcGxhY2VTdGF0ZTogWydyZXBsYWNlU3RhdGUnLCAnUmVmYWN0b3IgeW91ciBjb2RlIHRvIHVzZSBzZXRTdGF0ZSBpbnN0ZWFkIChzZWUgJyArICdodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvaXNzdWVzLzMyMzYpLiddXG4gIH07XG4gIHZhciBkZWZpbmVEZXByZWNhdGlvbldhcm5pbmcgPSBmdW5jdGlvbiAobWV0aG9kTmFtZSwgaW5mbykge1xuICAgIGlmIChjYW5EZWZpbmVQcm9wZXJ0eSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlYWN0Q29tcG9uZW50LnByb3RvdHlwZSwgbWV0aG9kTmFtZSwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJyVzKC4uLikgaXMgZGVwcmVjYXRlZCBpbiBwbGFpbiBKYXZhU2NyaXB0IFJlYWN0IGNsYXNzZXMuICVzJywgaW5mb1swXSwgaW5mb1sxXSkgOiB2b2lkIDA7XG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuICBmb3IgKHZhciBmbk5hbWUgaW4gZGVwcmVjYXRlZEFQSXMpIHtcbiAgICBpZiAoZGVwcmVjYXRlZEFQSXMuaGFzT3duUHJvcGVydHkoZm5OYW1lKSkge1xuICAgICAgZGVmaW5lRGVwcmVjYXRpb25XYXJuaW5nKGZuTmFtZSwgZGVwcmVjYXRlZEFQSXNbZm5OYW1lXSk7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RDb21wb25lbnQ7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNi1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0Q29tcG9uZW50VHJlZUhvb2tcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfcHJvZEludmFyaWFudCA9IHJlcXVpcmUoJy4vcmVhY3RQcm9kSW52YXJpYW50Jyk7XG5cbnZhciBSZWFjdEN1cnJlbnRPd25lciA9IHJlcXVpcmUoJy4vUmVhY3RDdXJyZW50T3duZXInKTtcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbmZ1bmN0aW9uIGlzTmF0aXZlKGZuKSB7XG4gIC8vIEJhc2VkIG9uIGlzTmF0aXZlKCkgZnJvbSBMb2Rhc2hcbiAgdmFyIGZ1bmNUb1N0cmluZyA9IEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZztcbiAgdmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICsgZnVuY1RvU3RyaW5nXG4gIC8vIFRha2UgYW4gZXhhbXBsZSBuYXRpdmUgZnVuY3Rpb24gc291cmNlIGZvciBjb21wYXJpc29uXG4gIC5jYWxsKGhhc093blByb3BlcnR5KVxuICAvLyBTdHJpcCByZWdleCBjaGFyYWN0ZXJzIHNvIHdlIGNhbiB1c2UgaXQgZm9yIHJlZ2V4XG4gIC5yZXBsYWNlKC9bXFxcXF4kLiorPygpW1xcXXt9fF0vZywgJ1xcXFwkJicpXG4gIC8vIFJlbW92ZSBoYXNPd25Qcm9wZXJ0eSBmcm9tIHRoZSB0ZW1wbGF0ZSB0byBtYWtlIGl0IGdlbmVyaWNcbiAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnKTtcbiAgdHJ5IHtcbiAgICB2YXIgc291cmNlID0gZnVuY1RvU3RyaW5nLmNhbGwoZm4pO1xuICAgIHJldHVybiByZUlzTmF0aXZlLnRlc3Qoc291cmNlKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbnZhciBjYW5Vc2VDb2xsZWN0aW9ucyA9XG4vLyBBcnJheS5mcm9tXG50eXBlb2YgQXJyYXkuZnJvbSA9PT0gJ2Z1bmN0aW9uJyAmJlxuLy8gTWFwXG50eXBlb2YgTWFwID09PSAnZnVuY3Rpb24nICYmIGlzTmF0aXZlKE1hcCkgJiZcbi8vIE1hcC5wcm90b3R5cGUua2V5c1xuTWFwLnByb3RvdHlwZSAhPSBudWxsICYmIHR5cGVvZiBNYXAucHJvdG90eXBlLmtleXMgPT09ICdmdW5jdGlvbicgJiYgaXNOYXRpdmUoTWFwLnByb3RvdHlwZS5rZXlzKSAmJlxuLy8gU2V0XG50eXBlb2YgU2V0ID09PSAnZnVuY3Rpb24nICYmIGlzTmF0aXZlKFNldCkgJiZcbi8vIFNldC5wcm90b3R5cGUua2V5c1xuU2V0LnByb3RvdHlwZSAhPSBudWxsICYmIHR5cGVvZiBTZXQucHJvdG90eXBlLmtleXMgPT09ICdmdW5jdGlvbicgJiYgaXNOYXRpdmUoU2V0LnByb3RvdHlwZS5rZXlzKTtcblxudmFyIGl0ZW1NYXA7XG52YXIgcm9vdElEU2V0O1xuXG52YXIgaXRlbUJ5S2V5O1xudmFyIHJvb3RCeUtleTtcblxuaWYgKGNhblVzZUNvbGxlY3Rpb25zKSB7XG4gIGl0ZW1NYXAgPSBuZXcgTWFwKCk7XG4gIHJvb3RJRFNldCA9IG5ldyBTZXQoKTtcbn0gZWxzZSB7XG4gIGl0ZW1CeUtleSA9IHt9O1xuICByb290QnlLZXkgPSB7fTtcbn1cblxudmFyIHVubW91bnRlZElEcyA9IFtdO1xuXG4vLyBVc2Ugbm9uLW51bWVyaWMga2V5cyB0byBwcmV2ZW50IFY4IHBlcmZvcm1hbmNlIGlzc3Vlczpcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9wdWxsLzcyMzJcbmZ1bmN0aW9uIGdldEtleUZyb21JRChpZCkge1xuICByZXR1cm4gJy4nICsgaWQ7XG59XG5mdW5jdGlvbiBnZXRJREZyb21LZXkoa2V5KSB7XG4gIHJldHVybiBwYXJzZUludChrZXkuc3Vic3RyKDEpLCAxMCk7XG59XG5cbmZ1bmN0aW9uIGdldChpZCkge1xuICBpZiAoY2FuVXNlQ29sbGVjdGlvbnMpIHtcbiAgICByZXR1cm4gaXRlbU1hcC5nZXQoaWQpO1xuICB9IGVsc2Uge1xuICAgIHZhciBrZXkgPSBnZXRLZXlGcm9tSUQoaWQpO1xuICAgIHJldHVybiBpdGVtQnlLZXlba2V5XTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmUoaWQpIHtcbiAgaWYgKGNhblVzZUNvbGxlY3Rpb25zKSB7XG4gICAgaXRlbU1hcFsnZGVsZXRlJ10oaWQpO1xuICB9IGVsc2Uge1xuICAgIHZhciBrZXkgPSBnZXRLZXlGcm9tSUQoaWQpO1xuICAgIGRlbGV0ZSBpdGVtQnlLZXlba2V5XTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGUoaWQsIGVsZW1lbnQsIHBhcmVudElEKSB7XG4gIHZhciBpdGVtID0ge1xuICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgcGFyZW50SUQ6IHBhcmVudElELFxuICAgIHRleHQ6IG51bGwsXG4gICAgY2hpbGRJRHM6IFtdLFxuICAgIGlzTW91bnRlZDogZmFsc2UsXG4gICAgdXBkYXRlQ291bnQ6IDBcbiAgfTtcblxuICBpZiAoY2FuVXNlQ29sbGVjdGlvbnMpIHtcbiAgICBpdGVtTWFwLnNldChpZCwgaXRlbSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGtleSA9IGdldEtleUZyb21JRChpZCk7XG4gICAgaXRlbUJ5S2V5W2tleV0gPSBpdGVtO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFkZFJvb3QoaWQpIHtcbiAgaWYgKGNhblVzZUNvbGxlY3Rpb25zKSB7XG4gICAgcm9vdElEU2V0LmFkZChpZCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGtleSA9IGdldEtleUZyb21JRChpZCk7XG4gICAgcm9vdEJ5S2V5W2tleV0gPSB0cnVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVJvb3QoaWQpIHtcbiAgaWYgKGNhblVzZUNvbGxlY3Rpb25zKSB7XG4gICAgcm9vdElEU2V0WydkZWxldGUnXShpZCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGtleSA9IGdldEtleUZyb21JRChpZCk7XG4gICAgZGVsZXRlIHJvb3RCeUtleVtrZXldO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldFJlZ2lzdGVyZWRJRHMoKSB7XG4gIGlmIChjYW5Vc2VDb2xsZWN0aW9ucykge1xuICAgIHJldHVybiBBcnJheS5mcm9tKGl0ZW1NYXAua2V5cygpKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoaXRlbUJ5S2V5KS5tYXAoZ2V0SURGcm9tS2V5KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRSb290SURzKCkge1xuICBpZiAoY2FuVXNlQ29sbGVjdGlvbnMpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShyb290SURTZXQua2V5cygpKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMocm9vdEJ5S2V5KS5tYXAoZ2V0SURGcm9tS2V5KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwdXJnZURlZXAoaWQpIHtcbiAgdmFyIGl0ZW0gPSBnZXQoaWQpO1xuICBpZiAoaXRlbSkge1xuICAgIHZhciBjaGlsZElEcyA9IGl0ZW0uY2hpbGRJRHM7XG5cbiAgICByZW1vdmUoaWQpO1xuICAgIGNoaWxkSURzLmZvckVhY2gocHVyZ2VEZWVwKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkZXNjcmliZUNvbXBvbmVudEZyYW1lKG5hbWUsIHNvdXJjZSwgb3duZXJOYW1lKSB7XG4gIHJldHVybiAnXFxuICAgIGluICcgKyBuYW1lICsgKHNvdXJjZSA/ICcgKGF0ICcgKyBzb3VyY2UuZmlsZU5hbWUucmVwbGFjZSgvXi4qW1xcXFxcXC9dLywgJycpICsgJzonICsgc291cmNlLmxpbmVOdW1iZXIgKyAnKScgOiBvd25lck5hbWUgPyAnIChjcmVhdGVkIGJ5ICcgKyBvd25lck5hbWUgKyAnKScgOiAnJyk7XG59XG5cbmZ1bmN0aW9uIGdldERpc3BsYXlOYW1lKGVsZW1lbnQpIHtcbiAgaWYgKGVsZW1lbnQgPT0gbnVsbCkge1xuICAgIHJldHVybiAnI2VtcHR5JztcbiAgfSBlbHNlIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIGVsZW1lbnQgPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuICcjdGV4dCc7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGVsZW1lbnQudHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZWxlbWVudC50eXBlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBlbGVtZW50LnR5cGUuZGlzcGxheU5hbWUgfHwgZWxlbWVudC50eXBlLm5hbWUgfHwgJ1Vua25vd24nO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRlc2NyaWJlSUQoaWQpIHtcbiAgdmFyIG5hbWUgPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldERpc3BsYXlOYW1lKGlkKTtcbiAgdmFyIGVsZW1lbnQgPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldEVsZW1lbnQoaWQpO1xuICB2YXIgb3duZXJJRCA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2suZ2V0T3duZXJJRChpZCk7XG4gIHZhciBvd25lck5hbWU7XG4gIGlmIChvd25lcklEKSB7XG4gICAgb3duZXJOYW1lID0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXREaXNwbGF5TmFtZShvd25lcklEKTtcbiAgfVxuICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhlbGVtZW50LCAnUmVhY3RDb21wb25lbnRUcmVlSG9vazogTWlzc2luZyBSZWFjdCBlbGVtZW50IGZvciBkZWJ1Z0lEICVzIHdoZW4gJyArICdidWlsZGluZyBzdGFjaycsIGlkKSA6IHZvaWQgMDtcbiAgcmV0dXJuIGRlc2NyaWJlQ29tcG9uZW50RnJhbWUobmFtZSwgZWxlbWVudCAmJiBlbGVtZW50Ll9zb3VyY2UsIG93bmVyTmFtZSk7XG59XG5cbnZhciBSZWFjdENvbXBvbmVudFRyZWVIb29rID0ge1xuICBvblNldENoaWxkcmVuOiBmdW5jdGlvbiAoaWQsIG5leHRDaGlsZElEcykge1xuICAgIHZhciBpdGVtID0gZ2V0KGlkKTtcbiAgICBpdGVtLmNoaWxkSURzID0gbmV4dENoaWxkSURzO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZXh0Q2hpbGRJRHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBuZXh0Q2hpbGRJRCA9IG5leHRDaGlsZElEc1tpXTtcbiAgICAgIHZhciBuZXh0Q2hpbGQgPSBnZXQobmV4dENoaWxkSUQpO1xuICAgICAgIW5leHRDaGlsZCA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdFeHBlY3RlZCBob29rIGV2ZW50cyB0byBmaXJlIGZvciB0aGUgY2hpbGQgYmVmb3JlIGl0cyBwYXJlbnQgaW5jbHVkZXMgaXQgaW4gb25TZXRDaGlsZHJlbigpLicpIDogX3Byb2RJbnZhcmlhbnQoJzE0MCcpIDogdm9pZCAwO1xuICAgICAgIShuZXh0Q2hpbGQuY2hpbGRJRHMgIT0gbnVsbCB8fCB0eXBlb2YgbmV4dENoaWxkLmVsZW1lbnQgIT09ICdvYmplY3QnIHx8IG5leHRDaGlsZC5lbGVtZW50ID09IG51bGwpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0V4cGVjdGVkIG9uU2V0Q2hpbGRyZW4oKSB0byBmaXJlIGZvciBhIGNvbnRhaW5lciBjaGlsZCBiZWZvcmUgaXRzIHBhcmVudCBpbmNsdWRlcyBpdCBpbiBvblNldENoaWxkcmVuKCkuJykgOiBfcHJvZEludmFyaWFudCgnMTQxJykgOiB2b2lkIDA7XG4gICAgICAhbmV4dENoaWxkLmlzTW91bnRlZCA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdFeHBlY3RlZCBvbk1vdW50Q29tcG9uZW50KCkgdG8gZmlyZSBmb3IgdGhlIGNoaWxkIGJlZm9yZSBpdHMgcGFyZW50IGluY2x1ZGVzIGl0IGluIG9uU2V0Q2hpbGRyZW4oKS4nKSA6IF9wcm9kSW52YXJpYW50KCc3MScpIDogdm9pZCAwO1xuICAgICAgaWYgKG5leHRDaGlsZC5wYXJlbnRJRCA9PSBudWxsKSB7XG4gICAgICAgIG5leHRDaGlsZC5wYXJlbnRJRCA9IGlkO1xuICAgICAgICAvLyBUT0RPOiBUaGlzIHNob3VsZG4ndCBiZSBuZWNlc3NhcnkgYnV0IG1vdW50aW5nIGEgbmV3IHJvb3QgZHVyaW5nIGluXG4gICAgICAgIC8vIGNvbXBvbmVudFdpbGxNb3VudCBjdXJyZW50bHkgY2F1c2VzIG5vdC15ZXQtbW91bnRlZCBjb21wb25lbnRzIHRvXG4gICAgICAgIC8vIGJlIHB1cmdlZCBmcm9tIG91ciB0cmVlIGRhdGEgc28gdGhlaXIgcGFyZW50IElEIGlzIG1pc3NpbmcuXG4gICAgICB9XG4gICAgICAhKG5leHRDaGlsZC5wYXJlbnRJRCA9PT0gaWQpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0V4cGVjdGVkIG9uQmVmb3JlTW91bnRDb21wb25lbnQoKSBwYXJlbnQgYW5kIG9uU2V0Q2hpbGRyZW4oKSB0byBiZSBjb25zaXN0ZW50ICglcyBoYXMgcGFyZW50cyAlcyBhbmQgJXMpLicsIG5leHRDaGlsZElELCBuZXh0Q2hpbGQucGFyZW50SUQsIGlkKSA6IF9wcm9kSW52YXJpYW50KCcxNDInLCBuZXh0Q2hpbGRJRCwgbmV4dENoaWxkLnBhcmVudElELCBpZCkgOiB2b2lkIDA7XG4gICAgfVxuICB9LFxuICBvbkJlZm9yZU1vdW50Q29tcG9uZW50OiBmdW5jdGlvbiAoaWQsIGVsZW1lbnQsIHBhcmVudElEKSB7XG4gICAgY3JlYXRlKGlkLCBlbGVtZW50LCBwYXJlbnRJRCk7XG4gIH0sXG4gIG9uQmVmb3JlVXBkYXRlQ29tcG9uZW50OiBmdW5jdGlvbiAoaWQsIGVsZW1lbnQpIHtcbiAgICB2YXIgaXRlbSA9IGdldChpZCk7XG4gICAgaWYgKCFpdGVtIHx8ICFpdGVtLmlzTW91bnRlZCkge1xuICAgICAgLy8gV2UgbWF5IGVuZCB1cCBoZXJlIGFzIGEgcmVzdWx0IG9mIHNldFN0YXRlKCkgaW4gY29tcG9uZW50V2lsbFVubW91bnQoKS5cbiAgICAgIC8vIEluIHRoaXMgY2FzZSwgaWdub3JlIHRoZSBlbGVtZW50LlxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpdGVtLmVsZW1lbnQgPSBlbGVtZW50O1xuICB9LFxuICBvbk1vdW50Q29tcG9uZW50OiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgaXRlbSA9IGdldChpZCk7XG4gICAgaXRlbS5pc01vdW50ZWQgPSB0cnVlO1xuICAgIHZhciBpc1Jvb3QgPSBpdGVtLnBhcmVudElEID09PSAwO1xuICAgIGlmIChpc1Jvb3QpIHtcbiAgICAgIGFkZFJvb3QoaWQpO1xuICAgIH1cbiAgfSxcbiAgb25VcGRhdGVDb21wb25lbnQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBpdGVtID0gZ2V0KGlkKTtcbiAgICBpZiAoIWl0ZW0gfHwgIWl0ZW0uaXNNb3VudGVkKSB7XG4gICAgICAvLyBXZSBtYXkgZW5kIHVwIGhlcmUgYXMgYSByZXN1bHQgb2Ygc2V0U3RhdGUoKSBpbiBjb21wb25lbnRXaWxsVW5tb3VudCgpLlxuICAgICAgLy8gSW4gdGhpcyBjYXNlLCBpZ25vcmUgdGhlIGVsZW1lbnQuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGl0ZW0udXBkYXRlQ291bnQrKztcbiAgfSxcbiAgb25Vbm1vdW50Q29tcG9uZW50OiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgaXRlbSA9IGdldChpZCk7XG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIC8vIFdlIG5lZWQgdG8gY2hlY2sgaWYgaXQgZXhpc3RzLlxuICAgICAgLy8gYGl0ZW1gIG1pZ2h0IG5vdCBleGlzdCBpZiBpdCBpcyBpbnNpZGUgYW4gZXJyb3IgYm91bmRhcnksIGFuZCBhIHNpYmxpbmdcbiAgICAgIC8vIGVycm9yIGJvdW5kYXJ5IGNoaWxkIHRocmV3IHdoaWxlIG1vdW50aW5nLiBUaGVuIHRoaXMgaW5zdGFuY2UgbmV2ZXJcbiAgICAgIC8vIGdvdCBhIGNoYW5jZSB0byBtb3VudCwgYnV0IGl0IHN0aWxsIGdldHMgYW4gdW5tb3VudGluZyBldmVudCBkdXJpbmdcbiAgICAgIC8vIHRoZSBlcnJvciBib3VuZGFyeSBjbGVhbnVwLlxuICAgICAgaXRlbS5pc01vdW50ZWQgPSBmYWxzZTtcbiAgICAgIHZhciBpc1Jvb3QgPSBpdGVtLnBhcmVudElEID09PSAwO1xuICAgICAgaWYgKGlzUm9vdCkge1xuICAgICAgICByZW1vdmVSb290KGlkKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdW5tb3VudGVkSURzLnB1c2goaWQpO1xuICB9LFxuICBwdXJnZVVubW91bnRlZENvbXBvbmVudHM6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoUmVhY3RDb21wb25lbnRUcmVlSG9vay5fcHJldmVudFB1cmdpbmcpIHtcbiAgICAgIC8vIFNob3VsZCBvbmx5IGJlIHVzZWQgZm9yIHRlc3RpbmcuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB1bm1vdW50ZWRJRHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZCA9IHVubW91bnRlZElEc1tpXTtcbiAgICAgIHB1cmdlRGVlcChpZCk7XG4gICAgfVxuICAgIHVubW91bnRlZElEcy5sZW5ndGggPSAwO1xuICB9LFxuICBpc01vdW50ZWQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBpdGVtID0gZ2V0KGlkKTtcbiAgICByZXR1cm4gaXRlbSA/IGl0ZW0uaXNNb3VudGVkIDogZmFsc2U7XG4gIH0sXG4gIGdldEN1cnJlbnRTdGFja0FkZGVuZHVtOiBmdW5jdGlvbiAodG9wRWxlbWVudCkge1xuICAgIHZhciBpbmZvID0gJyc7XG4gICAgaWYgKHRvcEVsZW1lbnQpIHtcbiAgICAgIHZhciB0eXBlID0gdG9wRWxlbWVudC50eXBlO1xuICAgICAgdmFyIG5hbWUgPSB0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJyA/IHR5cGUuZGlzcGxheU5hbWUgfHwgdHlwZS5uYW1lIDogdHlwZTtcbiAgICAgIHZhciBvd25lciA9IHRvcEVsZW1lbnQuX293bmVyO1xuICAgICAgaW5mbyArPSBkZXNjcmliZUNvbXBvbmVudEZyYW1lKG5hbWUgfHwgJ1Vua25vd24nLCB0b3BFbGVtZW50Ll9zb3VyY2UsIG93bmVyICYmIG93bmVyLmdldE5hbWUoKSk7XG4gICAgfVxuXG4gICAgdmFyIGN1cnJlbnRPd25lciA9IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQ7XG4gICAgdmFyIGlkID0gY3VycmVudE93bmVyICYmIGN1cnJlbnRPd25lci5fZGVidWdJRDtcblxuICAgIGluZm8gKz0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRTdGFja0FkZGVuZHVtQnlJRChpZCk7XG4gICAgcmV0dXJuIGluZm87XG4gIH0sXG4gIGdldFN0YWNrQWRkZW5kdW1CeUlEOiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgaW5mbyA9ICcnO1xuICAgIHdoaWxlIChpZCkge1xuICAgICAgaW5mbyArPSBkZXNjcmliZUlEKGlkKTtcbiAgICAgIGlkID0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRQYXJlbnRJRChpZCk7XG4gICAgfVxuICAgIHJldHVybiBpbmZvO1xuICB9LFxuICBnZXRDaGlsZElEczogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGl0ZW0gPSBnZXQoaWQpO1xuICAgIHJldHVybiBpdGVtID8gaXRlbS5jaGlsZElEcyA6IFtdO1xuICB9LFxuICBnZXREaXNwbGF5TmFtZTogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldEVsZW1lbnQoaWQpO1xuICAgIGlmICghZWxlbWVudCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBnZXREaXNwbGF5TmFtZShlbGVtZW50KTtcbiAgfSxcbiAgZ2V0RWxlbWVudDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGl0ZW0gPSBnZXQoaWQpO1xuICAgIHJldHVybiBpdGVtID8gaXRlbS5lbGVtZW50IDogbnVsbDtcbiAgfSxcbiAgZ2V0T3duZXJJRDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldEVsZW1lbnQoaWQpO1xuICAgIGlmICghZWxlbWVudCB8fCAhZWxlbWVudC5fb3duZXIpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudC5fb3duZXIuX2RlYnVnSUQ7XG4gIH0sXG4gIGdldFBhcmVudElEOiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgaXRlbSA9IGdldChpZCk7XG4gICAgcmV0dXJuIGl0ZW0gPyBpdGVtLnBhcmVudElEIDogbnVsbDtcbiAgfSxcbiAgZ2V0U291cmNlOiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgaXRlbSA9IGdldChpZCk7XG4gICAgdmFyIGVsZW1lbnQgPSBpdGVtID8gaXRlbS5lbGVtZW50IDogbnVsbDtcbiAgICB2YXIgc291cmNlID0gZWxlbWVudCAhPSBudWxsID8gZWxlbWVudC5fc291cmNlIDogbnVsbDtcbiAgICByZXR1cm4gc291cmNlO1xuICB9LFxuICBnZXRUZXh0OiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgZWxlbWVudCA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2suZ2V0RWxlbWVudChpZCk7XG4gICAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiAnJyArIGVsZW1lbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfSxcbiAgZ2V0VXBkYXRlQ291bnQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBpdGVtID0gZ2V0KGlkKTtcbiAgICByZXR1cm4gaXRlbSA/IGl0ZW0udXBkYXRlQ291bnQgOiAwO1xuICB9LFxuXG5cbiAgZ2V0UmVnaXN0ZXJlZElEczogZ2V0UmVnaXN0ZXJlZElEcyxcblxuICBnZXRSb290SURzOiBnZXRSb290SURzXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2s7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0Q3VycmVudE93bmVyXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEtlZXBzIHRyYWNrIG9mIHRoZSBjdXJyZW50IG93bmVyLlxuICpcbiAqIFRoZSBjdXJyZW50IG93bmVyIGlzIHRoZSBjb21wb25lbnQgd2hvIHNob3VsZCBvd24gYW55IGNvbXBvbmVudHMgdGhhdCBhcmVcbiAqIGN1cnJlbnRseSBiZWluZyBjb25zdHJ1Y3RlZC5cbiAqL1xuXG52YXIgUmVhY3RDdXJyZW50T3duZXIgPSB7XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKiBAdHlwZSB7UmVhY3RDb21wb25lbnR9XG4gICAqL1xuICBjdXJyZW50OiBudWxsXG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RDdXJyZW50T3duZXI7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0RE9NRmFjdG9yaWVzXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RFbGVtZW50ID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnQnKTtcblxuLyoqXG4gKiBDcmVhdGUgYSBmYWN0b3J5IHRoYXQgY3JlYXRlcyBIVE1MIHRhZyBlbGVtZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG52YXIgY3JlYXRlRE9NRmFjdG9yeSA9IFJlYWN0RWxlbWVudC5jcmVhdGVGYWN0b3J5O1xuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIFJlYWN0RWxlbWVudFZhbGlkYXRvciA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50VmFsaWRhdG9yJyk7XG4gIGNyZWF0ZURPTUZhY3RvcnkgPSBSZWFjdEVsZW1lbnRWYWxpZGF0b3IuY3JlYXRlRmFjdG9yeTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbWFwcGluZyBmcm9tIHN1cHBvcnRlZCBIVE1MIHRhZ3MgdG8gYFJlYWN0RE9NQ29tcG9uZW50YCBjbGFzc2VzLlxuICogVGhpcyBpcyBhbHNvIGFjY2Vzc2libGUgdmlhIGBSZWFjdC5ET01gLlxuICpcbiAqIEBwdWJsaWNcbiAqL1xudmFyIFJlYWN0RE9NRmFjdG9yaWVzID0ge1xuICBhOiBjcmVhdGVET01GYWN0b3J5KCdhJyksXG4gIGFiYnI6IGNyZWF0ZURPTUZhY3RvcnkoJ2FiYnInKSxcbiAgYWRkcmVzczogY3JlYXRlRE9NRmFjdG9yeSgnYWRkcmVzcycpLFxuICBhcmVhOiBjcmVhdGVET01GYWN0b3J5KCdhcmVhJyksXG4gIGFydGljbGU6IGNyZWF0ZURPTUZhY3RvcnkoJ2FydGljbGUnKSxcbiAgYXNpZGU6IGNyZWF0ZURPTUZhY3RvcnkoJ2FzaWRlJyksXG4gIGF1ZGlvOiBjcmVhdGVET01GYWN0b3J5KCdhdWRpbycpLFxuICBiOiBjcmVhdGVET01GYWN0b3J5KCdiJyksXG4gIGJhc2U6IGNyZWF0ZURPTUZhY3RvcnkoJ2Jhc2UnKSxcbiAgYmRpOiBjcmVhdGVET01GYWN0b3J5KCdiZGknKSxcbiAgYmRvOiBjcmVhdGVET01GYWN0b3J5KCdiZG8nKSxcbiAgYmlnOiBjcmVhdGVET01GYWN0b3J5KCdiaWcnKSxcbiAgYmxvY2txdW90ZTogY3JlYXRlRE9NRmFjdG9yeSgnYmxvY2txdW90ZScpLFxuICBib2R5OiBjcmVhdGVET01GYWN0b3J5KCdib2R5JyksXG4gIGJyOiBjcmVhdGVET01GYWN0b3J5KCdicicpLFxuICBidXR0b246IGNyZWF0ZURPTUZhY3RvcnkoJ2J1dHRvbicpLFxuICBjYW52YXM6IGNyZWF0ZURPTUZhY3RvcnkoJ2NhbnZhcycpLFxuICBjYXB0aW9uOiBjcmVhdGVET01GYWN0b3J5KCdjYXB0aW9uJyksXG4gIGNpdGU6IGNyZWF0ZURPTUZhY3RvcnkoJ2NpdGUnKSxcbiAgY29kZTogY3JlYXRlRE9NRmFjdG9yeSgnY29kZScpLFxuICBjb2w6IGNyZWF0ZURPTUZhY3RvcnkoJ2NvbCcpLFxuICBjb2xncm91cDogY3JlYXRlRE9NRmFjdG9yeSgnY29sZ3JvdXAnKSxcbiAgZGF0YTogY3JlYXRlRE9NRmFjdG9yeSgnZGF0YScpLFxuICBkYXRhbGlzdDogY3JlYXRlRE9NRmFjdG9yeSgnZGF0YWxpc3QnKSxcbiAgZGQ6IGNyZWF0ZURPTUZhY3RvcnkoJ2RkJyksXG4gIGRlbDogY3JlYXRlRE9NRmFjdG9yeSgnZGVsJyksXG4gIGRldGFpbHM6IGNyZWF0ZURPTUZhY3RvcnkoJ2RldGFpbHMnKSxcbiAgZGZuOiBjcmVhdGVET01GYWN0b3J5KCdkZm4nKSxcbiAgZGlhbG9nOiBjcmVhdGVET01GYWN0b3J5KCdkaWFsb2cnKSxcbiAgZGl2OiBjcmVhdGVET01GYWN0b3J5KCdkaXYnKSxcbiAgZGw6IGNyZWF0ZURPTUZhY3RvcnkoJ2RsJyksXG4gIGR0OiBjcmVhdGVET01GYWN0b3J5KCdkdCcpLFxuICBlbTogY3JlYXRlRE9NRmFjdG9yeSgnZW0nKSxcbiAgZW1iZWQ6IGNyZWF0ZURPTUZhY3RvcnkoJ2VtYmVkJyksXG4gIGZpZWxkc2V0OiBjcmVhdGVET01GYWN0b3J5KCdmaWVsZHNldCcpLFxuICBmaWdjYXB0aW9uOiBjcmVhdGVET01GYWN0b3J5KCdmaWdjYXB0aW9uJyksXG4gIGZpZ3VyZTogY3JlYXRlRE9NRmFjdG9yeSgnZmlndXJlJyksXG4gIGZvb3RlcjogY3JlYXRlRE9NRmFjdG9yeSgnZm9vdGVyJyksXG4gIGZvcm06IGNyZWF0ZURPTUZhY3RvcnkoJ2Zvcm0nKSxcbiAgaDE6IGNyZWF0ZURPTUZhY3RvcnkoJ2gxJyksXG4gIGgyOiBjcmVhdGVET01GYWN0b3J5KCdoMicpLFxuICBoMzogY3JlYXRlRE9NRmFjdG9yeSgnaDMnKSxcbiAgaDQ6IGNyZWF0ZURPTUZhY3RvcnkoJ2g0JyksXG4gIGg1OiBjcmVhdGVET01GYWN0b3J5KCdoNScpLFxuICBoNjogY3JlYXRlRE9NRmFjdG9yeSgnaDYnKSxcbiAgaGVhZDogY3JlYXRlRE9NRmFjdG9yeSgnaGVhZCcpLFxuICBoZWFkZXI6IGNyZWF0ZURPTUZhY3RvcnkoJ2hlYWRlcicpLFxuICBoZ3JvdXA6IGNyZWF0ZURPTUZhY3RvcnkoJ2hncm91cCcpLFxuICBocjogY3JlYXRlRE9NRmFjdG9yeSgnaHInKSxcbiAgaHRtbDogY3JlYXRlRE9NRmFjdG9yeSgnaHRtbCcpLFxuICBpOiBjcmVhdGVET01GYWN0b3J5KCdpJyksXG4gIGlmcmFtZTogY3JlYXRlRE9NRmFjdG9yeSgnaWZyYW1lJyksXG4gIGltZzogY3JlYXRlRE9NRmFjdG9yeSgnaW1nJyksXG4gIGlucHV0OiBjcmVhdGVET01GYWN0b3J5KCdpbnB1dCcpLFxuICBpbnM6IGNyZWF0ZURPTUZhY3RvcnkoJ2lucycpLFxuICBrYmQ6IGNyZWF0ZURPTUZhY3RvcnkoJ2tiZCcpLFxuICBrZXlnZW46IGNyZWF0ZURPTUZhY3RvcnkoJ2tleWdlbicpLFxuICBsYWJlbDogY3JlYXRlRE9NRmFjdG9yeSgnbGFiZWwnKSxcbiAgbGVnZW5kOiBjcmVhdGVET01GYWN0b3J5KCdsZWdlbmQnKSxcbiAgbGk6IGNyZWF0ZURPTUZhY3RvcnkoJ2xpJyksXG4gIGxpbms6IGNyZWF0ZURPTUZhY3RvcnkoJ2xpbmsnKSxcbiAgbWFpbjogY3JlYXRlRE9NRmFjdG9yeSgnbWFpbicpLFxuICBtYXA6IGNyZWF0ZURPTUZhY3RvcnkoJ21hcCcpLFxuICBtYXJrOiBjcmVhdGVET01GYWN0b3J5KCdtYXJrJyksXG4gIG1lbnU6IGNyZWF0ZURPTUZhY3RvcnkoJ21lbnUnKSxcbiAgbWVudWl0ZW06IGNyZWF0ZURPTUZhY3RvcnkoJ21lbnVpdGVtJyksXG4gIG1ldGE6IGNyZWF0ZURPTUZhY3RvcnkoJ21ldGEnKSxcbiAgbWV0ZXI6IGNyZWF0ZURPTUZhY3RvcnkoJ21ldGVyJyksXG4gIG5hdjogY3JlYXRlRE9NRmFjdG9yeSgnbmF2JyksXG4gIG5vc2NyaXB0OiBjcmVhdGVET01GYWN0b3J5KCdub3NjcmlwdCcpLFxuICBvYmplY3Q6IGNyZWF0ZURPTUZhY3RvcnkoJ29iamVjdCcpLFxuICBvbDogY3JlYXRlRE9NRmFjdG9yeSgnb2wnKSxcbiAgb3B0Z3JvdXA6IGNyZWF0ZURPTUZhY3RvcnkoJ29wdGdyb3VwJyksXG4gIG9wdGlvbjogY3JlYXRlRE9NRmFjdG9yeSgnb3B0aW9uJyksXG4gIG91dHB1dDogY3JlYXRlRE9NRmFjdG9yeSgnb3V0cHV0JyksXG4gIHA6IGNyZWF0ZURPTUZhY3RvcnkoJ3AnKSxcbiAgcGFyYW06IGNyZWF0ZURPTUZhY3RvcnkoJ3BhcmFtJyksXG4gIHBpY3R1cmU6IGNyZWF0ZURPTUZhY3RvcnkoJ3BpY3R1cmUnKSxcbiAgcHJlOiBjcmVhdGVET01GYWN0b3J5KCdwcmUnKSxcbiAgcHJvZ3Jlc3M6IGNyZWF0ZURPTUZhY3RvcnkoJ3Byb2dyZXNzJyksXG4gIHE6IGNyZWF0ZURPTUZhY3RvcnkoJ3EnKSxcbiAgcnA6IGNyZWF0ZURPTUZhY3RvcnkoJ3JwJyksXG4gIHJ0OiBjcmVhdGVET01GYWN0b3J5KCdydCcpLFxuICBydWJ5OiBjcmVhdGVET01GYWN0b3J5KCdydWJ5JyksXG4gIHM6IGNyZWF0ZURPTUZhY3RvcnkoJ3MnKSxcbiAgc2FtcDogY3JlYXRlRE9NRmFjdG9yeSgnc2FtcCcpLFxuICBzY3JpcHQ6IGNyZWF0ZURPTUZhY3RvcnkoJ3NjcmlwdCcpLFxuICBzZWN0aW9uOiBjcmVhdGVET01GYWN0b3J5KCdzZWN0aW9uJyksXG4gIHNlbGVjdDogY3JlYXRlRE9NRmFjdG9yeSgnc2VsZWN0JyksXG4gIHNtYWxsOiBjcmVhdGVET01GYWN0b3J5KCdzbWFsbCcpLFxuICBzb3VyY2U6IGNyZWF0ZURPTUZhY3RvcnkoJ3NvdXJjZScpLFxuICBzcGFuOiBjcmVhdGVET01GYWN0b3J5KCdzcGFuJyksXG4gIHN0cm9uZzogY3JlYXRlRE9NRmFjdG9yeSgnc3Ryb25nJyksXG4gIHN0eWxlOiBjcmVhdGVET01GYWN0b3J5KCdzdHlsZScpLFxuICBzdWI6IGNyZWF0ZURPTUZhY3RvcnkoJ3N1YicpLFxuICBzdW1tYXJ5OiBjcmVhdGVET01GYWN0b3J5KCdzdW1tYXJ5JyksXG4gIHN1cDogY3JlYXRlRE9NRmFjdG9yeSgnc3VwJyksXG4gIHRhYmxlOiBjcmVhdGVET01GYWN0b3J5KCd0YWJsZScpLFxuICB0Ym9keTogY3JlYXRlRE9NRmFjdG9yeSgndGJvZHknKSxcbiAgdGQ6IGNyZWF0ZURPTUZhY3RvcnkoJ3RkJyksXG4gIHRleHRhcmVhOiBjcmVhdGVET01GYWN0b3J5KCd0ZXh0YXJlYScpLFxuICB0Zm9vdDogY3JlYXRlRE9NRmFjdG9yeSgndGZvb3QnKSxcbiAgdGg6IGNyZWF0ZURPTUZhY3RvcnkoJ3RoJyksXG4gIHRoZWFkOiBjcmVhdGVET01GYWN0b3J5KCd0aGVhZCcpLFxuICB0aW1lOiBjcmVhdGVET01GYWN0b3J5KCd0aW1lJyksXG4gIHRpdGxlOiBjcmVhdGVET01GYWN0b3J5KCd0aXRsZScpLFxuICB0cjogY3JlYXRlRE9NRmFjdG9yeSgndHInKSxcbiAgdHJhY2s6IGNyZWF0ZURPTUZhY3RvcnkoJ3RyYWNrJyksXG4gIHU6IGNyZWF0ZURPTUZhY3RvcnkoJ3UnKSxcbiAgdWw6IGNyZWF0ZURPTUZhY3RvcnkoJ3VsJyksXG4gICd2YXInOiBjcmVhdGVET01GYWN0b3J5KCd2YXInKSxcbiAgdmlkZW86IGNyZWF0ZURPTUZhY3RvcnkoJ3ZpZGVvJyksXG4gIHdicjogY3JlYXRlRE9NRmFjdG9yeSgnd2JyJyksXG5cbiAgLy8gU1ZHXG4gIGNpcmNsZTogY3JlYXRlRE9NRmFjdG9yeSgnY2lyY2xlJyksXG4gIGNsaXBQYXRoOiBjcmVhdGVET01GYWN0b3J5KCdjbGlwUGF0aCcpLFxuICBkZWZzOiBjcmVhdGVET01GYWN0b3J5KCdkZWZzJyksXG4gIGVsbGlwc2U6IGNyZWF0ZURPTUZhY3RvcnkoJ2VsbGlwc2UnKSxcbiAgZzogY3JlYXRlRE9NRmFjdG9yeSgnZycpLFxuICBpbWFnZTogY3JlYXRlRE9NRmFjdG9yeSgnaW1hZ2UnKSxcbiAgbGluZTogY3JlYXRlRE9NRmFjdG9yeSgnbGluZScpLFxuICBsaW5lYXJHcmFkaWVudDogY3JlYXRlRE9NRmFjdG9yeSgnbGluZWFyR3JhZGllbnQnKSxcbiAgbWFzazogY3JlYXRlRE9NRmFjdG9yeSgnbWFzaycpLFxuICBwYXRoOiBjcmVhdGVET01GYWN0b3J5KCdwYXRoJyksXG4gIHBhdHRlcm46IGNyZWF0ZURPTUZhY3RvcnkoJ3BhdHRlcm4nKSxcbiAgcG9seWdvbjogY3JlYXRlRE9NRmFjdG9yeSgncG9seWdvbicpLFxuICBwb2x5bGluZTogY3JlYXRlRE9NRmFjdG9yeSgncG9seWxpbmUnKSxcbiAgcmFkaWFsR3JhZGllbnQ6IGNyZWF0ZURPTUZhY3RvcnkoJ3JhZGlhbEdyYWRpZW50JyksXG4gIHJlY3Q6IGNyZWF0ZURPTUZhY3RvcnkoJ3JlY3QnKSxcbiAgc3RvcDogY3JlYXRlRE9NRmFjdG9yeSgnc3RvcCcpLFxuICBzdmc6IGNyZWF0ZURPTUZhY3RvcnkoJ3N2ZycpLFxuICB0ZXh0OiBjcmVhdGVET01GYWN0b3J5KCd0ZXh0JyksXG4gIHRzcGFuOiBjcmVhdGVET01GYWN0b3J5KCd0c3BhbicpXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0RE9NRmFjdG9yaWVzOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdEVsZW1lbnRcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgUmVhY3RDdXJyZW50T3duZXIgPSByZXF1aXJlKCcuL1JlYWN0Q3VycmVudE93bmVyJyk7XG5cbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xudmFyIGNhbkRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9jYW5EZWZpbmVQcm9wZXJ0eScpO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuLy8gVGhlIFN5bWJvbCB1c2VkIHRvIHRhZyB0aGUgUmVhY3RFbGVtZW50IHR5cGUuIElmIHRoZXJlIGlzIG5vIG5hdGl2ZSBTeW1ib2xcbi8vIG5vciBwb2x5ZmlsbCwgdGhlbiBhIHBsYWluIG51bWJlciBpcyB1c2VkIGZvciBwZXJmb3JtYW5jZS5cbnZhciBSRUFDVF9FTEVNRU5UX1RZUEUgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbFsnZm9yJ10gJiYgU3ltYm9sWydmb3InXSgncmVhY3QuZWxlbWVudCcpIHx8IDB4ZWFjNztcblxudmFyIFJFU0VSVkVEX1BST1BTID0ge1xuICBrZXk6IHRydWUsXG4gIHJlZjogdHJ1ZSxcbiAgX19zZWxmOiB0cnVlLFxuICBfX3NvdXJjZTogdHJ1ZVxufTtcblxudmFyIHNwZWNpYWxQcm9wS2V5V2FybmluZ1Nob3duLCBzcGVjaWFsUHJvcFJlZldhcm5pbmdTaG93bjtcblxuZnVuY3Rpb24gaGFzVmFsaWRSZWYoY29uZmlnKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoY29uZmlnLCAncmVmJykpIHtcbiAgICAgIHZhciBnZXR0ZXIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGNvbmZpZywgJ3JlZicpLmdldDtcbiAgICAgIGlmIChnZXR0ZXIgJiYgZ2V0dGVyLmlzUmVhY3RXYXJuaW5nKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvbmZpZy5yZWYgIT09IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gaGFzVmFsaWRLZXkoY29uZmlnKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoY29uZmlnLCAna2V5JykpIHtcbiAgICAgIHZhciBnZXR0ZXIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGNvbmZpZywgJ2tleScpLmdldDtcbiAgICAgIGlmIChnZXR0ZXIgJiYgZ2V0dGVyLmlzUmVhY3RXYXJuaW5nKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvbmZpZy5rZXkgIT09IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gZGVmaW5lS2V5UHJvcFdhcm5pbmdHZXR0ZXIocHJvcHMsIGRpc3BsYXlOYW1lKSB7XG4gIHZhciB3YXJuQWJvdXRBY2Nlc3NpbmdLZXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93bikge1xuICAgICAgc3BlY2lhbFByb3BLZXlXYXJuaW5nU2hvd24gPSB0cnVlO1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICclczogYGtleWAgaXMgbm90IGEgcHJvcC4gVHJ5aW5nIHRvIGFjY2VzcyBpdCB3aWxsIHJlc3VsdCAnICsgJ2luIGB1bmRlZmluZWRgIGJlaW5nIHJldHVybmVkLiBJZiB5b3UgbmVlZCB0byBhY2Nlc3MgdGhlIHNhbWUgJyArICd2YWx1ZSB3aXRoaW4gdGhlIGNoaWxkIGNvbXBvbmVudCwgeW91IHNob3VsZCBwYXNzIGl0IGFzIGEgZGlmZmVyZW50ICcgKyAncHJvcC4gKGh0dHBzOi8vZmIubWUvcmVhY3Qtc3BlY2lhbC1wcm9wcyknLCBkaXNwbGF5TmFtZSkgOiB2b2lkIDA7XG4gICAgfVxuICB9O1xuICB3YXJuQWJvdXRBY2Nlc3NpbmdLZXkuaXNSZWFjdFdhcm5pbmcgPSB0cnVlO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvcHMsICdrZXknLCB7XG4gICAgZ2V0OiB3YXJuQWJvdXRBY2Nlc3NpbmdLZXksXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBkZWZpbmVSZWZQcm9wV2FybmluZ0dldHRlcihwcm9wcywgZGlzcGxheU5hbWUpIHtcbiAgdmFyIHdhcm5BYm91dEFjY2Vzc2luZ1JlZiA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXNwZWNpYWxQcm9wUmVmV2FybmluZ1Nob3duKSB7XG4gICAgICBzcGVjaWFsUHJvcFJlZldhcm5pbmdTaG93biA9IHRydWU7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJyVzOiBgcmVmYCBpcyBub3QgYSBwcm9wLiBUcnlpbmcgdG8gYWNjZXNzIGl0IHdpbGwgcmVzdWx0ICcgKyAnaW4gYHVuZGVmaW5lZGAgYmVpbmcgcmV0dXJuZWQuIElmIHlvdSBuZWVkIHRvIGFjY2VzcyB0aGUgc2FtZSAnICsgJ3ZhbHVlIHdpdGhpbiB0aGUgY2hpbGQgY29tcG9uZW50LCB5b3Ugc2hvdWxkIHBhc3MgaXQgYXMgYSBkaWZmZXJlbnQgJyArICdwcm9wLiAoaHR0cHM6Ly9mYi5tZS9yZWFjdC1zcGVjaWFsLXByb3BzKScsIGRpc3BsYXlOYW1lKSA6IHZvaWQgMDtcbiAgICB9XG4gIH07XG4gIHdhcm5BYm91dEFjY2Vzc2luZ1JlZi5pc1JlYWN0V2FybmluZyA9IHRydWU7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm9wcywgJ3JlZicsIHtcbiAgICBnZXQ6IHdhcm5BYm91dEFjY2Vzc2luZ1JlZixcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG59XG5cbi8qKlxuICogRmFjdG9yeSBtZXRob2QgdG8gY3JlYXRlIGEgbmV3IFJlYWN0IGVsZW1lbnQuIFRoaXMgbm8gbG9uZ2VyIGFkaGVyZXMgdG9cbiAqIHRoZSBjbGFzcyBwYXR0ZXJuLCBzbyBkbyBub3QgdXNlIG5ldyB0byBjYWxsIGl0LiBBbHNvLCBubyBpbnN0YW5jZW9mIGNoZWNrXG4gKiB3aWxsIHdvcmsuIEluc3RlYWQgdGVzdCAkJHR5cGVvZiBmaWVsZCBhZ2FpbnN0IFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSB0byBjaGVja1xuICogaWYgc29tZXRoaW5nIGlzIGEgUmVhY3QgRWxlbWVudC5cbiAqXG4gKiBAcGFyYW0geyp9IHR5cGVcbiAqIEBwYXJhbSB7Kn0ga2V5XG4gKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R9IHJlZlxuICogQHBhcmFtIHsqfSBzZWxmIEEgKnRlbXBvcmFyeSogaGVscGVyIHRvIGRldGVjdCBwbGFjZXMgd2hlcmUgYHRoaXNgIGlzXG4gKiBkaWZmZXJlbnQgZnJvbSB0aGUgYG93bmVyYCB3aGVuIFJlYWN0LmNyZWF0ZUVsZW1lbnQgaXMgY2FsbGVkLCBzbyB0aGF0IHdlXG4gKiBjYW4gd2Fybi4gV2Ugd2FudCB0byBnZXQgcmlkIG9mIG93bmVyIGFuZCByZXBsYWNlIHN0cmluZyBgcmVmYHMgd2l0aCBhcnJvd1xuICogZnVuY3Rpb25zLCBhbmQgYXMgbG9uZyBhcyBgdGhpc2AgYW5kIG93bmVyIGFyZSB0aGUgc2FtZSwgdGhlcmUgd2lsbCBiZSBub1xuICogY2hhbmdlIGluIGJlaGF2aW9yLlxuICogQHBhcmFtIHsqfSBzb3VyY2UgQW4gYW5ub3RhdGlvbiBvYmplY3QgKGFkZGVkIGJ5IGEgdHJhbnNwaWxlciBvciBvdGhlcndpc2UpXG4gKiBpbmRpY2F0aW5nIGZpbGVuYW1lLCBsaW5lIG51bWJlciwgYW5kL29yIG90aGVyIGluZm9ybWF0aW9uLlxuICogQHBhcmFtIHsqfSBvd25lclxuICogQHBhcmFtIHsqfSBwcm9wc1xuICogQGludGVybmFsXG4gKi9cbnZhciBSZWFjdEVsZW1lbnQgPSBmdW5jdGlvbiAodHlwZSwga2V5LCByZWYsIHNlbGYsIHNvdXJjZSwgb3duZXIsIHByb3BzKSB7XG4gIHZhciBlbGVtZW50ID0ge1xuICAgIC8vIFRoaXMgdGFnIGFsbG93IHVzIHRvIHVuaXF1ZWx5IGlkZW50aWZ5IHRoaXMgYXMgYSBSZWFjdCBFbGVtZW50XG4gICAgJCR0eXBlb2Y6IFJFQUNUX0VMRU1FTlRfVFlQRSxcblxuICAgIC8vIEJ1aWx0LWluIHByb3BlcnRpZXMgdGhhdCBiZWxvbmcgb24gdGhlIGVsZW1lbnRcbiAgICB0eXBlOiB0eXBlLFxuICAgIGtleToga2V5LFxuICAgIHJlZjogcmVmLFxuICAgIHByb3BzOiBwcm9wcyxcblxuICAgIC8vIFJlY29yZCB0aGUgY29tcG9uZW50IHJlc3BvbnNpYmxlIGZvciBjcmVhdGluZyB0aGlzIGVsZW1lbnQuXG4gICAgX293bmVyOiBvd25lclxuICB9O1xuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgLy8gVGhlIHZhbGlkYXRpb24gZmxhZyBpcyBjdXJyZW50bHkgbXV0YXRpdmUuIFdlIHB1dCBpdCBvblxuICAgIC8vIGFuIGV4dGVybmFsIGJhY2tpbmcgc3RvcmUgc28gdGhhdCB3ZSBjYW4gZnJlZXplIHRoZSB3aG9sZSBvYmplY3QuXG4gICAgLy8gVGhpcyBjYW4gYmUgcmVwbGFjZWQgd2l0aCBhIFdlYWtNYXAgb25jZSB0aGV5IGFyZSBpbXBsZW1lbnRlZCBpblxuICAgIC8vIGNvbW1vbmx5IHVzZWQgZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzLlxuICAgIGVsZW1lbnQuX3N0b3JlID0ge307XG4gICAgdmFyIHNoYWRvd0NoaWxkcmVuID0gQXJyYXkuaXNBcnJheShwcm9wcy5jaGlsZHJlbikgPyBwcm9wcy5jaGlsZHJlbi5zbGljZSgwKSA6IHByb3BzLmNoaWxkcmVuO1xuXG4gICAgLy8gVG8gbWFrZSBjb21wYXJpbmcgUmVhY3RFbGVtZW50cyBlYXNpZXIgZm9yIHRlc3RpbmcgcHVycG9zZXMsIHdlIG1ha2VcbiAgICAvLyB0aGUgdmFsaWRhdGlvbiBmbGFnIG5vbi1lbnVtZXJhYmxlICh3aGVyZSBwb3NzaWJsZSwgd2hpY2ggc2hvdWxkXG4gICAgLy8gaW5jbHVkZSBldmVyeSBlbnZpcm9ubWVudCB3ZSBydW4gdGVzdHMgaW4pLCBzbyB0aGUgdGVzdCBmcmFtZXdvcmtcbiAgICAvLyBpZ25vcmVzIGl0LlxuICAgIGlmIChjYW5EZWZpbmVQcm9wZXJ0eSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsZW1lbnQuX3N0b3JlLCAndmFsaWRhdGVkJywge1xuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiBmYWxzZVxuICAgICAgfSk7XG4gICAgICAvLyBzZWxmIGFuZCBzb3VyY2UgYXJlIERFViBvbmx5IHByb3BlcnRpZXMuXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxlbWVudCwgJ19zZWxmJywge1xuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICB2YWx1ZTogc2VsZlxuICAgICAgfSk7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxlbWVudCwgJ19zaGFkb3dDaGlsZHJlbicsIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgdmFsdWU6IHNoYWRvd0NoaWxkcmVuXG4gICAgICB9KTtcbiAgICAgIC8vIFR3byBlbGVtZW50cyBjcmVhdGVkIGluIHR3byBkaWZmZXJlbnQgcGxhY2VzIHNob3VsZCBiZSBjb25zaWRlcmVkXG4gICAgICAvLyBlcXVhbCBmb3IgdGVzdGluZyBwdXJwb3NlcyBhbmQgdGhlcmVmb3JlIHdlIGhpZGUgaXQgZnJvbSBlbnVtZXJhdGlvbi5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtZW50LCAnX3NvdXJjZScsIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgdmFsdWU6IHNvdXJjZVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnQuX3N0b3JlLnZhbGlkYXRlZCA9IGZhbHNlO1xuICAgICAgZWxlbWVudC5fc2VsZiA9IHNlbGY7XG4gICAgICBlbGVtZW50Ll9zaGFkb3dDaGlsZHJlbiA9IHNoYWRvd0NoaWxkcmVuO1xuICAgICAgZWxlbWVudC5fc291cmNlID0gc291cmNlO1xuICAgIH1cbiAgICBpZiAoT2JqZWN0LmZyZWV6ZSkge1xuICAgICAgT2JqZWN0LmZyZWV6ZShlbGVtZW50LnByb3BzKTtcbiAgICAgIE9iamVjdC5mcmVlemUoZWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuXG4vKipcbiAqIENyZWF0ZSBhbmQgcmV0dXJuIGEgbmV3IFJlYWN0RWxlbWVudCBvZiB0aGUgZ2l2ZW4gdHlwZS5cbiAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RvcC1sZXZlbC1hcGkuaHRtbCNyZWFjdC5jcmVhdGVlbGVtZW50XG4gKi9cblJlYWN0RWxlbWVudC5jcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24gKHR5cGUsIGNvbmZpZywgY2hpbGRyZW4pIHtcbiAgdmFyIHByb3BOYW1lO1xuXG4gIC8vIFJlc2VydmVkIG5hbWVzIGFyZSBleHRyYWN0ZWRcbiAgdmFyIHByb3BzID0ge307XG5cbiAgdmFyIGtleSA9IG51bGw7XG4gIHZhciByZWYgPSBudWxsO1xuICB2YXIgc2VsZiA9IG51bGw7XG4gIHZhciBzb3VyY2UgPSBudWxsO1xuXG4gIGlmIChjb25maWcgIT0gbnVsbCkge1xuICAgIGlmIChoYXNWYWxpZFJlZihjb25maWcpKSB7XG4gICAgICByZWYgPSBjb25maWcucmVmO1xuICAgIH1cbiAgICBpZiAoaGFzVmFsaWRLZXkoY29uZmlnKSkge1xuICAgICAga2V5ID0gJycgKyBjb25maWcua2V5O1xuICAgIH1cblxuICAgIHNlbGYgPSBjb25maWcuX19zZWxmID09PSB1bmRlZmluZWQgPyBudWxsIDogY29uZmlnLl9fc2VsZjtcbiAgICBzb3VyY2UgPSBjb25maWcuX19zb3VyY2UgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBjb25maWcuX19zb3VyY2U7XG4gICAgLy8gUmVtYWluaW5nIHByb3BlcnRpZXMgYXJlIGFkZGVkIHRvIGEgbmV3IHByb3BzIG9iamVjdFxuICAgIGZvciAocHJvcE5hbWUgaW4gY29uZmlnKSB7XG4gICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsIHByb3BOYW1lKSAmJiAhUkVTRVJWRURfUFJPUFMuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGNvbmZpZ1twcm9wTmFtZV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gQ2hpbGRyZW4gY2FuIGJlIG1vcmUgdGhhbiBvbmUgYXJndW1lbnQsIGFuZCB0aG9zZSBhcmUgdHJhbnNmZXJyZWQgb250b1xuICAvLyB0aGUgbmV3bHkgYWxsb2NhdGVkIHByb3BzIG9iamVjdC5cbiAgdmFyIGNoaWxkcmVuTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCAtIDI7XG4gIGlmIChjaGlsZHJlbkxlbmd0aCA9PT0gMSkge1xuICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gIH0gZWxzZSBpZiAoY2hpbGRyZW5MZW5ndGggPiAxKSB7XG4gICAgdmFyIGNoaWxkQXJyYXkgPSBBcnJheShjaGlsZHJlbkxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbkxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGlsZEFycmF5W2ldID0gYXJndW1lbnRzW2kgKyAyXTtcbiAgICB9XG4gICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZEFycmF5O1xuICB9XG5cbiAgLy8gUmVzb2x2ZSBkZWZhdWx0IHByb3BzXG4gIGlmICh0eXBlICYmIHR5cGUuZGVmYXVsdFByb3BzKSB7XG4gICAgdmFyIGRlZmF1bHRQcm9wcyA9IHR5cGUuZGVmYXVsdFByb3BzO1xuICAgIGZvciAocHJvcE5hbWUgaW4gZGVmYXVsdFByb3BzKSB7XG4gICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gZGVmYXVsdFByb3BzW3Byb3BOYW1lXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpZiAoa2V5IHx8IHJlZikge1xuICAgICAgaWYgKHR5cGVvZiBwcm9wcy4kJHR5cGVvZiA9PT0gJ3VuZGVmaW5lZCcgfHwgcHJvcHMuJCR0eXBlb2YgIT09IFJFQUNUX0VMRU1FTlRfVFlQRSkge1xuICAgICAgICB2YXIgZGlzcGxheU5hbWUgPSB0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJyA/IHR5cGUuZGlzcGxheU5hbWUgfHwgdHlwZS5uYW1lIHx8ICdVbmtub3duJyA6IHR5cGU7XG4gICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICBkZWZpbmVLZXlQcm9wV2FybmluZ0dldHRlcihwcm9wcywgZGlzcGxheU5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZWYpIHtcbiAgICAgICAgICBkZWZpbmVSZWZQcm9wV2FybmluZ0dldHRlcihwcm9wcywgZGlzcGxheU5hbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBSZWFjdEVsZW1lbnQodHlwZSwga2V5LCByZWYsIHNlbGYsIHNvdXJjZSwgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCwgcHJvcHMpO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYSBmdW5jdGlvbiB0aGF0IHByb2R1Y2VzIFJlYWN0RWxlbWVudHMgb2YgYSBnaXZlbiB0eXBlLlxuICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvdG9wLWxldmVsLWFwaS5odG1sI3JlYWN0LmNyZWF0ZWZhY3RvcnlcbiAqL1xuUmVhY3RFbGVtZW50LmNyZWF0ZUZhY3RvcnkgPSBmdW5jdGlvbiAodHlwZSkge1xuICB2YXIgZmFjdG9yeSA9IFJlYWN0RWxlbWVudC5jcmVhdGVFbGVtZW50LmJpbmQobnVsbCwgdHlwZSk7XG4gIC8vIEV4cG9zZSB0aGUgdHlwZSBvbiB0aGUgZmFjdG9yeSBhbmQgdGhlIHByb3RvdHlwZSBzbyB0aGF0IGl0IGNhbiBiZVxuICAvLyBlYXNpbHkgYWNjZXNzZWQgb24gZWxlbWVudHMuIEUuZy4gYDxGb28gLz4udHlwZSA9PT0gRm9vYC5cbiAgLy8gVGhpcyBzaG91bGQgbm90IGJlIG5hbWVkIGBjb25zdHJ1Y3RvcmAgc2luY2UgdGhpcyBtYXkgbm90IGJlIHRoZSBmdW5jdGlvblxuICAvLyB0aGF0IGNyZWF0ZWQgdGhlIGVsZW1lbnQsIGFuZCBpdCBtYXkgbm90IGV2ZW4gYmUgYSBjb25zdHJ1Y3Rvci5cbiAgLy8gTGVnYWN5IGhvb2sgVE9ETzogV2FybiBpZiB0aGlzIGlzIGFjY2Vzc2VkXG4gIGZhY3RvcnkudHlwZSA9IHR5cGU7XG4gIHJldHVybiBmYWN0b3J5O1xufTtcblxuUmVhY3RFbGVtZW50LmNsb25lQW5kUmVwbGFjZUtleSA9IGZ1bmN0aW9uIChvbGRFbGVtZW50LCBuZXdLZXkpIHtcbiAgdmFyIG5ld0VsZW1lbnQgPSBSZWFjdEVsZW1lbnQob2xkRWxlbWVudC50eXBlLCBuZXdLZXksIG9sZEVsZW1lbnQucmVmLCBvbGRFbGVtZW50Ll9zZWxmLCBvbGRFbGVtZW50Ll9zb3VyY2UsIG9sZEVsZW1lbnQuX293bmVyLCBvbGRFbGVtZW50LnByb3BzKTtcblxuICByZXR1cm4gbmV3RWxlbWVudDtcbn07XG5cbi8qKlxuICogQ2xvbmUgYW5kIHJldHVybiBhIG5ldyBSZWFjdEVsZW1lbnQgdXNpbmcgZWxlbWVudCBhcyB0aGUgc3RhcnRpbmcgcG9pbnQuXG4gKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90b3AtbGV2ZWwtYXBpLmh0bWwjcmVhY3QuY2xvbmVlbGVtZW50XG4gKi9cblJlYWN0RWxlbWVudC5jbG9uZUVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbWVudCwgY29uZmlnLCBjaGlsZHJlbikge1xuICB2YXIgcHJvcE5hbWU7XG5cbiAgLy8gT3JpZ2luYWwgcHJvcHMgYXJlIGNvcGllZFxuICB2YXIgcHJvcHMgPSBfYXNzaWduKHt9LCBlbGVtZW50LnByb3BzKTtcblxuICAvLyBSZXNlcnZlZCBuYW1lcyBhcmUgZXh0cmFjdGVkXG4gIHZhciBrZXkgPSBlbGVtZW50LmtleTtcbiAgdmFyIHJlZiA9IGVsZW1lbnQucmVmO1xuICAvLyBTZWxmIGlzIHByZXNlcnZlZCBzaW5jZSB0aGUgb3duZXIgaXMgcHJlc2VydmVkLlxuICB2YXIgc2VsZiA9IGVsZW1lbnQuX3NlbGY7XG4gIC8vIFNvdXJjZSBpcyBwcmVzZXJ2ZWQgc2luY2UgY2xvbmVFbGVtZW50IGlzIHVubGlrZWx5IHRvIGJlIHRhcmdldGVkIGJ5IGFcbiAgLy8gdHJhbnNwaWxlciwgYW5kIHRoZSBvcmlnaW5hbCBzb3VyY2UgaXMgcHJvYmFibHkgYSBiZXR0ZXIgaW5kaWNhdG9yIG9mIHRoZVxuICAvLyB0cnVlIG93bmVyLlxuICB2YXIgc291cmNlID0gZWxlbWVudC5fc291cmNlO1xuXG4gIC8vIE93bmVyIHdpbGwgYmUgcHJlc2VydmVkLCB1bmxlc3MgcmVmIGlzIG92ZXJyaWRkZW5cbiAgdmFyIG93bmVyID0gZWxlbWVudC5fb3duZXI7XG5cbiAgaWYgKGNvbmZpZyAhPSBudWxsKSB7XG4gICAgaWYgKGhhc1ZhbGlkUmVmKGNvbmZpZykpIHtcbiAgICAgIC8vIFNpbGVudGx5IHN0ZWFsIHRoZSByZWYgZnJvbSB0aGUgcGFyZW50LlxuICAgICAgcmVmID0gY29uZmlnLnJlZjtcbiAgICAgIG93bmVyID0gUmVhY3RDdXJyZW50T3duZXIuY3VycmVudDtcbiAgICB9XG4gICAgaWYgKGhhc1ZhbGlkS2V5KGNvbmZpZykpIHtcbiAgICAgIGtleSA9ICcnICsgY29uZmlnLmtleTtcbiAgICB9XG5cbiAgICAvLyBSZW1haW5pbmcgcHJvcGVydGllcyBvdmVycmlkZSBleGlzdGluZyBwcm9wc1xuICAgIHZhciBkZWZhdWx0UHJvcHM7XG4gICAgaWYgKGVsZW1lbnQudHlwZSAmJiBlbGVtZW50LnR5cGUuZGVmYXVsdFByb3BzKSB7XG4gICAgICBkZWZhdWx0UHJvcHMgPSBlbGVtZW50LnR5cGUuZGVmYXVsdFByb3BzO1xuICAgIH1cbiAgICBmb3IgKHByb3BOYW1lIGluIGNvbmZpZykge1xuICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoY29uZmlnLCBwcm9wTmFtZSkgJiYgIVJFU0VSVkVEX1BST1BTLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xuICAgICAgICBpZiAoY29uZmlnW3Byb3BOYW1lXSA9PT0gdW5kZWZpbmVkICYmIGRlZmF1bHRQcm9wcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgLy8gUmVzb2x2ZSBkZWZhdWx0IHByb3BzXG4gICAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gZGVmYXVsdFByb3BzW3Byb3BOYW1lXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBjb25maWdbcHJvcE5hbWVdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gQ2hpbGRyZW4gY2FuIGJlIG1vcmUgdGhhbiBvbmUgYXJndW1lbnQsIGFuZCB0aG9zZSBhcmUgdHJhbnNmZXJyZWQgb250b1xuICAvLyB0aGUgbmV3bHkgYWxsb2NhdGVkIHByb3BzIG9iamVjdC5cbiAgdmFyIGNoaWxkcmVuTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCAtIDI7XG4gIGlmIChjaGlsZHJlbkxlbmd0aCA9PT0gMSkge1xuICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gIH0gZWxzZSBpZiAoY2hpbGRyZW5MZW5ndGggPiAxKSB7XG4gICAgdmFyIGNoaWxkQXJyYXkgPSBBcnJheShjaGlsZHJlbkxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbkxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGlsZEFycmF5W2ldID0gYXJndW1lbnRzW2kgKyAyXTtcbiAgICB9XG4gICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZEFycmF5O1xuICB9XG5cbiAgcmV0dXJuIFJlYWN0RWxlbWVudChlbGVtZW50LnR5cGUsIGtleSwgcmVmLCBzZWxmLCBzb3VyY2UsIG93bmVyLCBwcm9wcyk7XG59O1xuXG4vKipcbiAqIFZlcmlmaWVzIHRoZSBvYmplY3QgaXMgYSBSZWFjdEVsZW1lbnQuXG4gKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90b3AtbGV2ZWwtYXBpLmh0bWwjcmVhY3QuaXN2YWxpZGVsZW1lbnRcbiAqIEBwYXJhbSB7P29iamVjdH0gb2JqZWN0XG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIGBvYmplY3RgIGlzIGEgdmFsaWQgY29tcG9uZW50LlxuICogQGZpbmFsXG4gKi9cblJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudCA9IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdCAhPT0gbnVsbCAmJiBvYmplY3QuJCR0eXBlb2YgPT09IFJFQUNUX0VMRU1FTlRfVFlQRTtcbn07XG5cblJlYWN0RWxlbWVudC5SRUFDVF9FTEVNRU5UX1RZUEUgPSBSRUFDVF9FTEVNRU5UX1RZUEU7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RFbGVtZW50OyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdEVsZW1lbnRWYWxpZGF0b3JcbiAqL1xuXG4vKipcbiAqIFJlYWN0RWxlbWVudFZhbGlkYXRvciBwcm92aWRlcyBhIHdyYXBwZXIgYXJvdW5kIGEgZWxlbWVudCBmYWN0b3J5XG4gKiB3aGljaCB2YWxpZGF0ZXMgdGhlIHByb3BzIHBhc3NlZCB0byB0aGUgZWxlbWVudC4gVGhpcyBpcyBpbnRlbmRlZCB0byBiZVxuICogdXNlZCBvbmx5IGluIERFViBhbmQgY291bGQgYmUgcmVwbGFjZWQgYnkgYSBzdGF0aWMgdHlwZSBjaGVja2VyIGZvciBsYW5ndWFnZXNcbiAqIHRoYXQgc3VwcG9ydCBpdC5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdEN1cnJlbnRPd25lciA9IHJlcXVpcmUoJy4vUmVhY3RDdXJyZW50T3duZXInKTtcbnZhciBSZWFjdENvbXBvbmVudFRyZWVIb29rID0gcmVxdWlyZSgnLi9SZWFjdENvbXBvbmVudFRyZWVIb29rJyk7XG52YXIgUmVhY3RFbGVtZW50ID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnQnKTtcbnZhciBSZWFjdFByb3BUeXBlTG9jYXRpb25zID0gcmVxdWlyZSgnLi9SZWFjdFByb3BUeXBlTG9jYXRpb25zJyk7XG5cbnZhciBjaGVja1JlYWN0VHlwZVNwZWMgPSByZXF1aXJlKCcuL2NoZWNrUmVhY3RUeXBlU3BlYycpO1xuXG52YXIgY2FuRGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL2NhbkRlZmluZVByb3BlcnR5Jyk7XG52YXIgZ2V0SXRlcmF0b3JGbiA9IHJlcXVpcmUoJy4vZ2V0SXRlcmF0b3JGbicpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbmZ1bmN0aW9uIGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bSgpIHtcbiAgaWYgKFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQpIHtcbiAgICB2YXIgbmFtZSA9IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQuZ2V0TmFtZSgpO1xuICAgIGlmIChuYW1lKSB7XG4gICAgICByZXR1cm4gJyBDaGVjayB0aGUgcmVuZGVyIG1ldGhvZCBvZiBgJyArIG5hbWUgKyAnYC4nO1xuICAgIH1cbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbi8qKlxuICogV2FybiBpZiB0aGVyZSdzIG5vIGtleSBleHBsaWNpdGx5IHNldCBvbiBkeW5hbWljIGFycmF5cyBvZiBjaGlsZHJlbiBvclxuICogb2JqZWN0IGtleXMgYXJlIG5vdCB2YWxpZC4gVGhpcyBhbGxvd3MgdXMgdG8ga2VlcCB0cmFjayBvZiBjaGlsZHJlbiBiZXR3ZWVuXG4gKiB1cGRhdGVzLlxuICovXG52YXIgb3duZXJIYXNLZXlVc2VXYXJuaW5nID0ge307XG5cbmZ1bmN0aW9uIGdldEN1cnJlbnRDb21wb25lbnRFcnJvckluZm8ocGFyZW50VHlwZSkge1xuICB2YXIgaW5mbyA9IGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bSgpO1xuXG4gIGlmICghaW5mbykge1xuICAgIHZhciBwYXJlbnROYW1lID0gdHlwZW9mIHBhcmVudFR5cGUgPT09ICdzdHJpbmcnID8gcGFyZW50VHlwZSA6IHBhcmVudFR5cGUuZGlzcGxheU5hbWUgfHwgcGFyZW50VHlwZS5uYW1lO1xuICAgIGlmIChwYXJlbnROYW1lKSB7XG4gICAgICBpbmZvID0gJyBDaGVjayB0aGUgdG9wLWxldmVsIHJlbmRlciBjYWxsIHVzaW5nIDwnICsgcGFyZW50TmFtZSArICc+Lic7XG4gICAgfVxuICB9XG4gIHJldHVybiBpbmZvO1xufVxuXG4vKipcbiAqIFdhcm4gaWYgdGhlIGVsZW1lbnQgZG9lc24ndCBoYXZlIGFuIGV4cGxpY2l0IGtleSBhc3NpZ25lZCB0byBpdC5cbiAqIFRoaXMgZWxlbWVudCBpcyBpbiBhbiBhcnJheS4gVGhlIGFycmF5IGNvdWxkIGdyb3cgYW5kIHNocmluayBvciBiZVxuICogcmVvcmRlcmVkLiBBbGwgY2hpbGRyZW4gdGhhdCBoYXZlbid0IGFscmVhZHkgYmVlbiB2YWxpZGF0ZWQgYXJlIHJlcXVpcmVkIHRvXG4gKiBoYXZlIGEgXCJrZXlcIiBwcm9wZXJ0eSBhc3NpZ25lZCB0byBpdC4gRXJyb3Igc3RhdHVzZXMgYXJlIGNhY2hlZCBzbyBhIHdhcm5pbmdcbiAqIHdpbGwgb25seSBiZSBzaG93biBvbmNlLlxuICpcbiAqIEBpbnRlcm5hbFxuICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IGVsZW1lbnQgRWxlbWVudCB0aGF0IHJlcXVpcmVzIGEga2V5LlxuICogQHBhcmFtIHsqfSBwYXJlbnRUeXBlIGVsZW1lbnQncyBwYXJlbnQncyB0eXBlLlxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZUV4cGxpY2l0S2V5KGVsZW1lbnQsIHBhcmVudFR5cGUpIHtcbiAgaWYgKCFlbGVtZW50Ll9zdG9yZSB8fCBlbGVtZW50Ll9zdG9yZS52YWxpZGF0ZWQgfHwgZWxlbWVudC5rZXkgIT0gbnVsbCkge1xuICAgIHJldHVybjtcbiAgfVxuICBlbGVtZW50Ll9zdG9yZS52YWxpZGF0ZWQgPSB0cnVlO1xuXG4gIHZhciBtZW1vaXplciA9IG93bmVySGFzS2V5VXNlV2FybmluZy51bmlxdWVLZXkgfHwgKG93bmVySGFzS2V5VXNlV2FybmluZy51bmlxdWVLZXkgPSB7fSk7XG5cbiAgdmFyIGN1cnJlbnRDb21wb25lbnRFcnJvckluZm8gPSBnZXRDdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvKHBhcmVudFR5cGUpO1xuICBpZiAobWVtb2l6ZXJbY3VycmVudENvbXBvbmVudEVycm9ySW5mb10pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgbWVtb2l6ZXJbY3VycmVudENvbXBvbmVudEVycm9ySW5mb10gPSB0cnVlO1xuXG4gIC8vIFVzdWFsbHkgdGhlIGN1cnJlbnQgb3duZXIgaXMgdGhlIG9mZmVuZGVyLCBidXQgaWYgaXQgYWNjZXB0cyBjaGlsZHJlbiBhcyBhXG4gIC8vIHByb3BlcnR5LCBpdCBtYXkgYmUgdGhlIGNyZWF0b3Igb2YgdGhlIGNoaWxkIHRoYXQncyByZXNwb25zaWJsZSBmb3JcbiAgLy8gYXNzaWduaW5nIGl0IGEga2V5LlxuICB2YXIgY2hpbGRPd25lciA9ICcnO1xuICBpZiAoZWxlbWVudCAmJiBlbGVtZW50Ll9vd25lciAmJiBlbGVtZW50Ll9vd25lciAhPT0gUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCkge1xuICAgIC8vIEdpdmUgdGhlIGNvbXBvbmVudCB0aGF0IG9yaWdpbmFsbHkgY3JlYXRlZCB0aGlzIGNoaWxkLlxuICAgIGNoaWxkT3duZXIgPSAnIEl0IHdhcyBwYXNzZWQgYSBjaGlsZCBmcm9tICcgKyBlbGVtZW50Ll9vd25lci5nZXROYW1lKCkgKyAnLic7XG4gIH1cblxuICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ0VhY2ggY2hpbGQgaW4gYW4gYXJyYXkgb3IgaXRlcmF0b3Igc2hvdWxkIGhhdmUgYSB1bmlxdWUgXCJrZXlcIiBwcm9wLicgKyAnJXMlcyBTZWUgaHR0cHM6Ly9mYi5tZS9yZWFjdC13YXJuaW5nLWtleXMgZm9yIG1vcmUgaW5mb3JtYXRpb24uJXMnLCBjdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvLCBjaGlsZE93bmVyLCBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldEN1cnJlbnRTdGFja0FkZGVuZHVtKGVsZW1lbnQpKSA6IHZvaWQgMDtcbn1cblxuLyoqXG4gKiBFbnN1cmUgdGhhdCBldmVyeSBlbGVtZW50IGVpdGhlciBpcyBwYXNzZWQgaW4gYSBzdGF0aWMgbG9jYXRpb24sIGluIGFuXG4gKiBhcnJheSB3aXRoIGFuIGV4cGxpY2l0IGtleXMgcHJvcGVydHkgZGVmaW5lZCwgb3IgaW4gYW4gb2JqZWN0IGxpdGVyYWxcbiAqIHdpdGggdmFsaWQga2V5IHByb3BlcnR5LlxuICpcbiAqIEBpbnRlcm5hbFxuICogQHBhcmFtIHtSZWFjdE5vZGV9IG5vZGUgU3RhdGljYWxseSBwYXNzZWQgY2hpbGQgb2YgYW55IHR5cGUuXG4gKiBAcGFyYW0geyp9IHBhcmVudFR5cGUgbm9kZSdzIHBhcmVudCdzIHR5cGUuXG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlQ2hpbGRLZXlzKG5vZGUsIHBhcmVudFR5cGUpIHtcbiAgaWYgKHR5cGVvZiBub2RlICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoQXJyYXkuaXNBcnJheShub2RlKSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGNoaWxkID0gbm9kZVtpXTtcbiAgICAgIGlmIChSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQoY2hpbGQpKSB7XG4gICAgICAgIHZhbGlkYXRlRXhwbGljaXRLZXkoY2hpbGQsIHBhcmVudFR5cGUpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQobm9kZSkpIHtcbiAgICAvLyBUaGlzIGVsZW1lbnQgd2FzIHBhc3NlZCBpbiBhIHZhbGlkIGxvY2F0aW9uLlxuICAgIGlmIChub2RlLl9zdG9yZSkge1xuICAgICAgbm9kZS5fc3RvcmUudmFsaWRhdGVkID0gdHJ1ZTtcbiAgICB9XG4gIH0gZWxzZSBpZiAobm9kZSkge1xuICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihub2RlKTtcbiAgICAvLyBFbnRyeSBpdGVyYXRvcnMgcHJvdmlkZSBpbXBsaWNpdCBrZXlzLlxuICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAgICBpZiAoaXRlcmF0b3JGbiAhPT0gbm9kZS5lbnRyaWVzKSB7XG4gICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChub2RlKTtcbiAgICAgICAgdmFyIHN0ZXA7XG4gICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICBpZiAoUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KHN0ZXAudmFsdWUpKSB7XG4gICAgICAgICAgICB2YWxpZGF0ZUV4cGxpY2l0S2V5KHN0ZXAudmFsdWUsIHBhcmVudFR5cGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEdpdmVuIGFuIGVsZW1lbnQsIHZhbGlkYXRlIHRoYXQgaXRzIHByb3BzIGZvbGxvdyB0aGUgcHJvcFR5cGVzIGRlZmluaXRpb24sXG4gKiBwcm92aWRlZCBieSB0aGUgdHlwZS5cbiAqXG4gKiBAcGFyYW0ge1JlYWN0RWxlbWVudH0gZWxlbWVudFxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZVByb3BUeXBlcyhlbGVtZW50KSB7XG4gIHZhciBjb21wb25lbnRDbGFzcyA9IGVsZW1lbnQudHlwZTtcbiAgaWYgKHR5cGVvZiBjb21wb25lbnRDbGFzcyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbmFtZSA9IGNvbXBvbmVudENsYXNzLmRpc3BsYXlOYW1lIHx8IGNvbXBvbmVudENsYXNzLm5hbWU7XG4gIGlmIChjb21wb25lbnRDbGFzcy5wcm9wVHlwZXMpIHtcbiAgICBjaGVja1JlYWN0VHlwZVNwZWMoY29tcG9uZW50Q2xhc3MucHJvcFR5cGVzLCBlbGVtZW50LnByb3BzLCBSZWFjdFByb3BUeXBlTG9jYXRpb25zLnByb3AsIG5hbWUsIGVsZW1lbnQsIG51bGwpO1xuICB9XG4gIGlmICh0eXBlb2YgY29tcG9uZW50Q2xhc3MuZ2V0RGVmYXVsdFByb3BzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoY29tcG9uZW50Q2xhc3MuZ2V0RGVmYXVsdFByb3BzLmlzUmVhY3RDbGFzc0FwcHJvdmVkLCAnZ2V0RGVmYXVsdFByb3BzIGlzIG9ubHkgdXNlZCBvbiBjbGFzc2ljIFJlYWN0LmNyZWF0ZUNsYXNzICcgKyAnZGVmaW5pdGlvbnMuIFVzZSBhIHN0YXRpYyBwcm9wZXJ0eSBuYW1lZCBgZGVmYXVsdFByb3BzYCBpbnN0ZWFkLicpIDogdm9pZCAwO1xuICB9XG59XG5cbnZhciBSZWFjdEVsZW1lbnRWYWxpZGF0b3IgPSB7XG5cbiAgY3JlYXRlRWxlbWVudDogZnVuY3Rpb24gKHR5cGUsIHByb3BzLCBjaGlsZHJlbikge1xuICAgIHZhciB2YWxpZFR5cGUgPSB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbic7XG4gICAgLy8gV2Ugd2FybiBpbiB0aGlzIGNhc2UgYnV0IGRvbid0IHRocm93LiBXZSBleHBlY3QgdGhlIGVsZW1lbnQgY3JlYXRpb24gdG9cbiAgICAvLyBzdWNjZWVkIGFuZCB0aGVyZSB3aWxsIGxpa2VseSBiZSBlcnJvcnMgaW4gcmVuZGVyLlxuICAgIGlmICghdmFsaWRUeXBlKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ1JlYWN0LmNyZWF0ZUVsZW1lbnQ6IHR5cGUgc2hvdWxkIG5vdCBiZSBudWxsLCB1bmRlZmluZWQsIGJvb2xlYW4sIG9yICcgKyAnbnVtYmVyLiBJdCBzaG91bGQgYmUgYSBzdHJpbmcgKGZvciBET00gZWxlbWVudHMpIG9yIGEgUmVhY3RDbGFzcyAnICsgJyhmb3IgY29tcG9zaXRlIGNvbXBvbmVudHMpLiVzJywgZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKCkpIDogdm9pZCAwO1xuICAgIH1cblxuICAgIHZhciBlbGVtZW50ID0gUmVhY3RFbGVtZW50LmNyZWF0ZUVsZW1lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIC8vIFRoZSByZXN1bHQgY2FuIGJlIG51bGxpc2ggaWYgYSBtb2NrIG9yIGEgY3VzdG9tIGZ1bmN0aW9uIGlzIHVzZWQuXG4gICAgLy8gVE9ETzogRHJvcCB0aGlzIHdoZW4gdGhlc2UgYXJlIG5vIGxvbmdlciBhbGxvd2VkIGFzIHRoZSB0eXBlIGFyZ3VtZW50LlxuICAgIGlmIChlbGVtZW50ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIC8vIFNraXAga2V5IHdhcm5pbmcgaWYgdGhlIHR5cGUgaXNuJ3QgdmFsaWQgc2luY2Ugb3VyIGtleSB2YWxpZGF0aW9uIGxvZ2ljXG4gICAgLy8gZG9lc24ndCBleHBlY3QgYSBub24tc3RyaW5nL2Z1bmN0aW9uIHR5cGUgYW5kIGNhbiB0aHJvdyBjb25mdXNpbmcgZXJyb3JzLlxuICAgIC8vIFdlIGRvbid0IHdhbnQgZXhjZXB0aW9uIGJlaGF2aW9yIHRvIGRpZmZlciBiZXR3ZWVuIGRldiBhbmQgcHJvZC5cbiAgICAvLyAoUmVuZGVyaW5nIHdpbGwgdGhyb3cgd2l0aCBhIGhlbHBmdWwgbWVzc2FnZSBhbmQgYXMgc29vbiBhcyB0aGUgdHlwZSBpc1xuICAgIC8vIGZpeGVkLCB0aGUga2V5IHdhcm5pbmdzIHdpbGwgYXBwZWFyLilcbiAgICBpZiAodmFsaWRUeXBlKSB7XG4gICAgICBmb3IgKHZhciBpID0gMjsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YWxpZGF0ZUNoaWxkS2V5cyhhcmd1bWVudHNbaV0sIHR5cGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhbGlkYXRlUHJvcFR5cGVzKGVsZW1lbnQpO1xuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH0sXG5cbiAgY3JlYXRlRmFjdG9yeTogZnVuY3Rpb24gKHR5cGUpIHtcbiAgICB2YXIgdmFsaWRhdGVkRmFjdG9yeSA9IFJlYWN0RWxlbWVudFZhbGlkYXRvci5jcmVhdGVFbGVtZW50LmJpbmQobnVsbCwgdHlwZSk7XG4gICAgLy8gTGVnYWN5IGhvb2sgVE9ETzogV2FybiBpZiB0aGlzIGlzIGFjY2Vzc2VkXG4gICAgdmFsaWRhdGVkRmFjdG9yeS50eXBlID0gdHlwZTtcblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAoY2FuRGVmaW5lUHJvcGVydHkpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHZhbGlkYXRlZEZhY3RvcnksICd0eXBlJywge1xuICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdGYWN0b3J5LnR5cGUgaXMgZGVwcmVjYXRlZC4gQWNjZXNzIHRoZSBjbGFzcyBkaXJlY3RseSAnICsgJ2JlZm9yZSBwYXNzaW5nIGl0IHRvIGNyZWF0ZUZhY3RvcnkuJykgOiB2b2lkIDA7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3R5cGUnLCB7XG4gICAgICAgICAgICAgIHZhbHVlOiB0eXBlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0eXBlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbGlkYXRlZEZhY3Rvcnk7XG4gIH0sXG5cbiAgY2xvbmVFbGVtZW50OiBmdW5jdGlvbiAoZWxlbWVudCwgcHJvcHMsIGNoaWxkcmVuKSB7XG4gICAgdmFyIG5ld0VsZW1lbnQgPSBSZWFjdEVsZW1lbnQuY2xvbmVFbGVtZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgZm9yICh2YXIgaSA9IDI7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhbGlkYXRlQ2hpbGRLZXlzKGFyZ3VtZW50c1tpXSwgbmV3RWxlbWVudC50eXBlKTtcbiAgICB9XG4gICAgdmFsaWRhdGVQcm9wVHlwZXMobmV3RWxlbWVudCk7XG4gICAgcmV0dXJuIG5ld0VsZW1lbnQ7XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdEVsZW1lbnRWYWxpZGF0b3I7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNS1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxuZnVuY3Rpb24gd2Fybk5vb3AocHVibGljSW5zdGFuY2UsIGNhbGxlck5hbWUpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICB2YXIgY29uc3RydWN0b3IgPSBwdWJsaWNJbnN0YW5jZS5jb25zdHJ1Y3RvcjtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJyVzKC4uLik6IENhbiBvbmx5IHVwZGF0ZSBhIG1vdW50ZWQgb3IgbW91bnRpbmcgY29tcG9uZW50LiAnICsgJ1RoaXMgdXN1YWxseSBtZWFucyB5b3UgY2FsbGVkICVzKCkgb24gYW4gdW5tb3VudGVkIGNvbXBvbmVudC4gJyArICdUaGlzIGlzIGEgbm8tb3AuIFBsZWFzZSBjaGVjayB0aGUgY29kZSBmb3IgdGhlICVzIGNvbXBvbmVudC4nLCBjYWxsZXJOYW1lLCBjYWxsZXJOYW1lLCBjb25zdHJ1Y3RvciAmJiAoY29uc3RydWN0b3IuZGlzcGxheU5hbWUgfHwgY29uc3RydWN0b3IubmFtZSkgfHwgJ1JlYWN0Q2xhc3MnKSA6IHZvaWQgMDtcbiAgfVxufVxuXG4vKipcbiAqIFRoaXMgaXMgdGhlIGFic3RyYWN0IEFQSSBmb3IgYW4gdXBkYXRlIHF1ZXVlLlxuICovXG52YXIgUmVhY3ROb29wVXBkYXRlUXVldWUgPSB7XG5cbiAgLyoqXG4gICAqIENoZWNrcyB3aGV0aGVyIG9yIG5vdCB0aGlzIGNvbXBvc2l0ZSBjb21wb25lbnQgaXMgbW91bnRlZC5cbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2Ugd2Ugd2FudCB0byB0ZXN0LlxuICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIG1vdW50ZWQsIGZhbHNlIG90aGVyd2lzZS5cbiAgICogQHByb3RlY3RlZFxuICAgKiBAZmluYWxcbiAgICovXG4gIGlzTW91bnRlZDogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBFbnF1ZXVlIGEgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGV4ZWN1dGVkIGFmdGVyIGFsbCB0aGUgcGVuZGluZyB1cGRhdGVzXG4gICAqIGhhdmUgcHJvY2Vzc2VkLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB0byB1c2UgYXMgYHRoaXNgIGNvbnRleHQuXG4gICAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgc3RhdGUgaXMgdXBkYXRlZC5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBlbnF1ZXVlQ2FsbGJhY2s6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSwgY2FsbGJhY2spIHt9LFxuXG4gIC8qKlxuICAgKiBGb3JjZXMgYW4gdXBkYXRlLiBUaGlzIHNob3VsZCBvbmx5IGJlIGludm9rZWQgd2hlbiBpdCBpcyBrbm93biB3aXRoXG4gICAqIGNlcnRhaW50eSB0aGF0IHdlIGFyZSAqKm5vdCoqIGluIGEgRE9NIHRyYW5zYWN0aW9uLlxuICAgKlxuICAgKiBZb3UgbWF5IHdhbnQgdG8gY2FsbCB0aGlzIHdoZW4geW91IGtub3cgdGhhdCBzb21lIGRlZXBlciBhc3BlY3Qgb2YgdGhlXG4gICAqIGNvbXBvbmVudCdzIHN0YXRlIGhhcyBjaGFuZ2VkIGJ1dCBgc2V0U3RhdGVgIHdhcyBub3QgY2FsbGVkLlxuICAgKlxuICAgKiBUaGlzIHdpbGwgbm90IGludm9rZSBgc2hvdWxkQ29tcG9uZW50VXBkYXRlYCwgYnV0IGl0IHdpbGwgaW52b2tlXG4gICAqIGBjb21wb25lbnRXaWxsVXBkYXRlYCBhbmQgYGNvbXBvbmVudERpZFVwZGF0ZWAuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHRoYXQgc2hvdWxkIHJlcmVuZGVyLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWVGb3JjZVVwZGF0ZTogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlKSB7XG4gICAgd2Fybk5vb3AocHVibGljSW5zdGFuY2UsICdmb3JjZVVwZGF0ZScpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZXBsYWNlcyBhbGwgb2YgdGhlIHN0YXRlLiBBbHdheXMgdXNlIHRoaXMgb3IgYHNldFN0YXRlYCB0byBtdXRhdGUgc3RhdGUuXG4gICAqIFlvdSBzaG91bGQgdHJlYXQgYHRoaXMuc3RhdGVgIGFzIGltbXV0YWJsZS5cbiAgICpcbiAgICogVGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgYHRoaXMuc3RhdGVgIHdpbGwgYmUgaW1tZWRpYXRlbHkgdXBkYXRlZCwgc29cbiAgICogYWNjZXNzaW5nIGB0aGlzLnN0YXRlYCBhZnRlciBjYWxsaW5nIHRoaXMgbWV0aG9kIG1heSByZXR1cm4gdGhlIG9sZCB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdGhhdCBzaG91bGQgcmVyZW5kZXIuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBjb21wbGV0ZVN0YXRlIE5leHQgc3RhdGUuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZVJlcGxhY2VTdGF0ZTogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlLCBjb21wbGV0ZVN0YXRlKSB7XG4gICAgd2Fybk5vb3AocHVibGljSW5zdGFuY2UsICdyZXBsYWNlU3RhdGUnKTtcbiAgfSxcblxuICAvKipcbiAgICogU2V0cyBhIHN1YnNldCBvZiB0aGUgc3RhdGUuIFRoaXMgb25seSBleGlzdHMgYmVjYXVzZSBfcGVuZGluZ1N0YXRlIGlzXG4gICAqIGludGVybmFsLiBUaGlzIHByb3ZpZGVzIGEgbWVyZ2luZyBzdHJhdGVneSB0aGF0IGlzIG5vdCBhdmFpbGFibGUgdG8gZGVlcFxuICAgKiBwcm9wZXJ0aWVzIHdoaWNoIGlzIGNvbmZ1c2luZy4gVE9ETzogRXhwb3NlIHBlbmRpbmdTdGF0ZSBvciBkb24ndCB1c2UgaXRcbiAgICogZHVyaW5nIHRoZSBtZXJnZS5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdGhhdCBzaG91bGQgcmVyZW5kZXIuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWFsU3RhdGUgTmV4dCBwYXJ0aWFsIHN0YXRlIHRvIGJlIG1lcmdlZCB3aXRoIHN0YXRlLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWVTZXRTdGF0ZTogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlLCBwYXJ0aWFsU3RhdGUpIHtcbiAgICB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgJ3NldFN0YXRlJyk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3ROb29wVXBkYXRlUXVldWU7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMgPSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMgPSB7XG4gICAgcHJvcDogJ3Byb3AnLFxuICAgIGNvbnRleHQ6ICdjb250ZXh0JyxcbiAgICBjaGlsZENvbnRleHQ6ICdjaGlsZCBjb250ZXh0J1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdFByb3BUeXBlTG9jYXRpb25zXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIga2V5TWlycm9yID0gcmVxdWlyZSgnZmJqcy9saWIva2V5TWlycm9yJyk7XG5cbnZhciBSZWFjdFByb3BUeXBlTG9jYXRpb25zID0ga2V5TWlycm9yKHtcbiAgcHJvcDogbnVsbCxcbiAgY29udGV4dDogbnVsbCxcbiAgY2hpbGRDb250ZXh0OiBudWxsXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFByb3BUeXBlTG9jYXRpb25zOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdFByb3BUeXBlc1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG52YXIgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMgPSByZXF1aXJlKCcuL1JlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzJyk7XG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlGdW5jdGlvbicpO1xudmFyIGdldEl0ZXJhdG9yRm4gPSByZXF1aXJlKCcuL2dldEl0ZXJhdG9yRm4nKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG4vKipcbiAqIENvbGxlY3Rpb24gb2YgbWV0aG9kcyB0aGF0IGFsbG93IGRlY2xhcmF0aW9uIGFuZCB2YWxpZGF0aW9uIG9mIHByb3BzIHRoYXQgYXJlXG4gKiBzdXBwbGllZCB0byBSZWFjdCBjb21wb25lbnRzLiBFeGFtcGxlIHVzYWdlOlxuICpcbiAqICAgdmFyIFByb3BzID0gcmVxdWlyZSgnUmVhY3RQcm9wVHlwZXMnKTtcbiAqICAgdmFyIE15QXJ0aWNsZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAqICAgICBwcm9wVHlwZXM6IHtcbiAqICAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBwcm9wIG5hbWVkIFwiZGVzY3JpcHRpb25cIi5cbiAqICAgICAgIGRlc2NyaXB0aW9uOiBQcm9wcy5zdHJpbmcsXG4gKlxuICogICAgICAgLy8gQSByZXF1aXJlZCBlbnVtIHByb3AgbmFtZWQgXCJjYXRlZ29yeVwiLlxuICogICAgICAgY2F0ZWdvcnk6IFByb3BzLm9uZU9mKFsnTmV3cycsJ1Bob3RvcyddKS5pc1JlcXVpcmVkLFxuICpcbiAqICAgICAgIC8vIEEgcHJvcCBuYW1lZCBcImRpYWxvZ1wiIHRoYXQgcmVxdWlyZXMgYW4gaW5zdGFuY2Ugb2YgRGlhbG9nLlxuICogICAgICAgZGlhbG9nOiBQcm9wcy5pbnN0YW5jZU9mKERpYWxvZykuaXNSZXF1aXJlZFxuICogICAgIH0sXG4gKiAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHsgLi4uIH1cbiAqICAgfSk7XG4gKlxuICogQSBtb3JlIGZvcm1hbCBzcGVjaWZpY2F0aW9uIG9mIGhvdyB0aGVzZSBtZXRob2RzIGFyZSB1c2VkOlxuICpcbiAqICAgdHlwZSA6PSBhcnJheXxib29sfGZ1bmN8b2JqZWN0fG51bWJlcnxzdHJpbmd8b25lT2YoWy4uLl0pfGluc3RhbmNlT2YoLi4uKVxuICogICBkZWNsIDo9IFJlYWN0UHJvcFR5cGVzLnt0eXBlfSguaXNSZXF1aXJlZCk/XG4gKlxuICogRWFjaCBhbmQgZXZlcnkgZGVjbGFyYXRpb24gcHJvZHVjZXMgYSBmdW5jdGlvbiB3aXRoIHRoZSBzYW1lIHNpZ25hdHVyZS4gVGhpc1xuICogYWxsb3dzIHRoZSBjcmVhdGlvbiBvZiBjdXN0b20gdmFsaWRhdGlvbiBmdW5jdGlvbnMuIEZvciBleGFtcGxlOlxuICpcbiAqICB2YXIgTXlMaW5rID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICogICAgcHJvcFR5cGVzOiB7XG4gKiAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBvciBVUkkgcHJvcCBuYW1lZCBcImhyZWZcIi5cbiAqICAgICAgaHJlZjogZnVuY3Rpb24ocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKSB7XG4gKiAgICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAqICAgICAgICBpZiAocHJvcFZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHByb3BWYWx1ZSAhPT0gJ3N0cmluZycgJiZcbiAqICAgICAgICAgICAgIShwcm9wVmFsdWUgaW5zdGFuY2VvZiBVUkkpKSB7XG4gKiAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKFxuICogICAgICAgICAgICAnRXhwZWN0ZWQgYSBzdHJpbmcgb3IgYW4gVVJJIGZvciAnICsgcHJvcE5hbWUgKyAnIGluICcgK1xuICogICAgICAgICAgICBjb21wb25lbnROYW1lXG4gKiAgICAgICAgICApO1xuICogICAgICAgIH1cbiAqICAgICAgfVxuICogICAgfSxcbiAqICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7Li4ufVxuICogIH0pO1xuICpcbiAqIEBpbnRlcm5hbFxuICovXG5cbnZhciBBTk9OWU1PVVMgPSAnPDxhbm9ueW1vdXM+Pic7XG5cbnZhciBSZWFjdFByb3BUeXBlcyA9IHtcbiAgYXJyYXk6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdhcnJheScpLFxuICBib29sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYm9vbGVhbicpLFxuICBmdW5jOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignZnVuY3Rpb24nKSxcbiAgbnVtYmVyOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignbnVtYmVyJyksXG4gIG9iamVjdDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ29iamVjdCcpLFxuICBzdHJpbmc6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdzdHJpbmcnKSxcbiAgc3ltYm9sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3ltYm9sJyksXG5cbiAgYW55OiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpLFxuICBhcnJheU9mOiBjcmVhdGVBcnJheU9mVHlwZUNoZWNrZXIsXG4gIGVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlcigpLFxuICBpbnN0YW5jZU9mOiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyLFxuICBub2RlOiBjcmVhdGVOb2RlQ2hlY2tlcigpLFxuICBvYmplY3RPZjogY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcixcbiAgb25lT2Y6IGNyZWF0ZUVudW1UeXBlQ2hlY2tlcixcbiAgb25lT2ZUeXBlOiBjcmVhdGVVbmlvblR5cGVDaGVja2VyLFxuICBzaGFwZTogY3JlYXRlU2hhcGVUeXBlQ2hlY2tlclxufTtcblxuLyoqXG4gKiBpbmxpbmVkIE9iamVjdC5pcyBwb2x5ZmlsbCB0byBhdm9pZCByZXF1aXJpbmcgY29uc3VtZXJzIHNoaXAgdGhlaXIgb3duXG4gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvaXNcbiAqL1xuLyplc2xpbnQtZGlzYWJsZSBuby1zZWxmLWNvbXBhcmUqL1xuZnVuY3Rpb24gaXMoeCwgeSkge1xuICAvLyBTYW1lVmFsdWUgYWxnb3JpdGhtXG4gIGlmICh4ID09PSB5KSB7XG4gICAgLy8gU3RlcHMgMS01LCA3LTEwXG4gICAgLy8gU3RlcHMgNi5iLTYuZTogKzAgIT0gLTBcbiAgICByZXR1cm4geCAhPT0gMCB8fCAxIC8geCA9PT0gMSAvIHk7XG4gIH0gZWxzZSB7XG4gICAgLy8gU3RlcCA2LmE6IE5hTiA9PSBOYU5cbiAgICByZXR1cm4geCAhPT0geCAmJiB5ICE9PSB5O1xuICB9XG59XG4vKmVzbGludC1lbmFibGUgbm8tc2VsZi1jb21wYXJlKi9cblxuLyoqXG4gKiBXZSB1c2UgYW4gRXJyb3ItbGlrZSBvYmplY3QgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgYXMgcGVvcGxlIG1heSBjYWxsXG4gKiBQcm9wVHlwZXMgZGlyZWN0bHkgYW5kIGluc3BlY3QgdGhlaXIgb3V0cHV0LiBIb3dldmVyIHdlIGRvbid0IHVzZSByZWFsXG4gKiBFcnJvcnMgYW55bW9yZS4gV2UgZG9uJ3QgaW5zcGVjdCB0aGVpciBzdGFjayBhbnl3YXksIGFuZCBjcmVhdGluZyB0aGVtXG4gKiBpcyBwcm9oaWJpdGl2ZWx5IGV4cGVuc2l2ZSBpZiB0aGV5IGFyZSBjcmVhdGVkIHRvbyBvZnRlbiwgc3VjaCBhcyB3aGF0XG4gKiBoYXBwZW5zIGluIG9uZU9mVHlwZSgpIGZvciBhbnkgdHlwZSBiZWZvcmUgdGhlIG9uZSB0aGF0IG1hdGNoZWQuXG4gKi9cbmZ1bmN0aW9uIFByb3BUeXBlRXJyb3IobWVzc2FnZSkge1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICB0aGlzLnN0YWNrID0gJyc7XG59XG4vLyBNYWtlIGBpbnN0YW5jZW9mIEVycm9yYCBzdGlsbCB3b3JrIGZvciByZXR1cm5lZCBlcnJvcnMuXG5Qcm9wVHlwZUVycm9yLnByb3RvdHlwZSA9IEVycm9yLnByb3RvdHlwZTtcblxuZnVuY3Rpb24gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICB2YXIgbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGUgPSB7fTtcbiAgfVxuICBmdW5jdGlvbiBjaGVja1R5cGUoaXNSZXF1aXJlZCwgcHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICBjb21wb25lbnROYW1lID0gY29tcG9uZW50TmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgcHJvcEZ1bGxOYW1lID0gcHJvcEZ1bGxOYW1lIHx8IHByb3BOYW1lO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAoc2VjcmV0ICE9PSBSZWFjdFByb3BUeXBlc1NlY3JldCAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIGNhY2hlS2V5ID0gY29tcG9uZW50TmFtZSArICc6JyArIHByb3BOYW1lO1xuICAgICAgICBpZiAoIW1hbnVhbFByb3BUeXBlQ2FsbENhY2hlW2NhY2hlS2V5XSkge1xuICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnWW91IGFyZSBtYW51YWxseSBjYWxsaW5nIGEgUmVhY3QuUHJvcFR5cGVzIHZhbGlkYXRpb24gJyArICdmdW5jdGlvbiBmb3IgdGhlIGAlc2AgcHJvcCBvbiBgJXNgLiBUaGlzIGlzIGRlcHJlY2F0ZWQgJyArICdhbmQgd2lsbCBub3Qgd29yayBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uLiBZb3UgbWF5IGJlICcgKyAnc2VlaW5nIHRoaXMgd2FybmluZyBkdWUgdG8gYSB0aGlyZC1wYXJ0eSBQcm9wVHlwZXMgbGlicmFyeS4gJyArICdTZWUgaHR0cHM6Ly9mYi5tZS9yZWFjdC13YXJuaW5nLWRvbnQtY2FsbC1wcm9wdHlwZXMgZm9yIGRldGFpbHMuJywgcHJvcEZ1bGxOYW1lLCBjb21wb25lbnROYW1lKSA6IHZvaWQgMDtcbiAgICAgICAgICBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZVtjYWNoZUtleV0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT0gbnVsbCkge1xuICAgICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICAgIGlmIChpc1JlcXVpcmVkKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignUmVxdWlyZWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCB3YXMgbm90IHNwZWNpZmllZCBpbiAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGNoYWluZWRDaGVja1R5cGUgPSBjaGVja1R5cGUuYmluZChudWxsLCBmYWxzZSk7XG4gIGNoYWluZWRDaGVja1R5cGUuaXNSZXF1aXJlZCA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIHRydWUpO1xuXG4gIHJldHVybiBjaGFpbmVkQ2hlY2tUeXBlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcihleHBlY3RlZFR5cGUpIHtcbiAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgaWYgKHByb3BUeXBlICE9PSBleHBlY3RlZFR5cGUpIHtcbiAgICAgIHZhciBsb2NhdGlvbk5hbWUgPSBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl07XG4gICAgICAvLyBgcHJvcFZhbHVlYCBiZWluZyBpbnN0YW5jZSBvZiwgc2F5LCBkYXRlL3JlZ2V4cCwgcGFzcyB0aGUgJ29iamVjdCdcbiAgICAgIC8vIGNoZWNrLCBidXQgd2UgY2FuIG9mZmVyIGEgbW9yZSBwcmVjaXNlIGVycm9yIG1lc3NhZ2UgaGVyZSByYXRoZXIgdGhhblxuICAgICAgLy8gJ29mIHR5cGUgYG9iamVjdGAnLlxuICAgICAgdmFyIHByZWNpc2VUeXBlID0gZ2V0UHJlY2lzZVR5cGUocHJvcFZhbHVlKTtcblxuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByZWNpc2VUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdgJyArIGV4cGVjdGVkVHlwZSArICdgLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQW55VHlwZUNoZWNrZXIoKSB7XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcihlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zKG51bGwpKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgIGlmICh0eXBlb2YgdHlwZUNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIGFycmF5T2YuJyk7XG4gICAgfVxuICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgIHZhciBsb2NhdGlvbk5hbWUgPSBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGFuIGFycmF5LicpKTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wVmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBlcnJvciA9IHR5cGVDaGVja2VyKHByb3BWYWx1ZSwgaSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICdbJyArIGkgKyAnXScsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudFR5cGVDaGVja2VyKCkge1xuICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgIGlmICghUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KHByb3BWYWx1ZSkpIHtcbiAgICAgIHZhciBsb2NhdGlvbk5hbWUgPSBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgc2luZ2xlIFJlYWN0RWxlbWVudC4nKSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIoZXhwZWN0ZWRDbGFzcykge1xuICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICBpZiAoIShwcm9wc1twcm9wTmFtZV0gaW5zdGFuY2VvZiBleHBlY3RlZENsYXNzKSkge1xuICAgICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICAgIHZhciBleHBlY3RlZENsYXNzTmFtZSA9IGV4cGVjdGVkQ2xhc3MubmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgICB2YXIgYWN0dWFsQ2xhc3NOYW1lID0gZ2V0Q2xhc3NOYW1lKHByb3BzW3Byb3BOYW1lXSk7XG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgYWN0dWFsQ2xhc3NOYW1lICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdpbnN0YW5jZSBvZiBgJyArIGV4cGVjdGVkQ2xhc3NOYW1lICsgJ2AuJykpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVFbnVtVHlwZUNoZWNrZXIoZXhwZWN0ZWRWYWx1ZXMpIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGV4cGVjdGVkVmFsdWVzKSkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZiwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgcmV0dXJuIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV4cGVjdGVkVmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoaXMocHJvcFZhbHVlLCBleHBlY3RlZFZhbHVlc1tpXSkpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICB2YXIgdmFsdWVzU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoZXhwZWN0ZWRWYWx1ZXMpO1xuICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHZhbHVlIGAnICsgcHJvcFZhbHVlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIG9uZSBvZiAnICsgdmFsdWVzU3RyaW5nICsgJy4nKSk7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICBpZiAodHlwZW9mIHR5cGVDaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBvYmplY3RPZi4nKTtcbiAgICB9XG4gICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHZhciBsb2NhdGlvbk5hbWUgPSBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl07XG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gb2JqZWN0LicpKTtcbiAgICB9XG4gICAgZm9yICh2YXIga2V5IGluIHByb3BWYWx1ZSkge1xuICAgICAgaWYgKHByb3BWYWx1ZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIHZhciBlcnJvciA9IHR5cGVDaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIoYXJyYXlPZlR5cGVDaGVja2Vycykge1xuICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyYXlPZlR5cGVDaGVja2VycykpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2ZUeXBlLCBleHBlY3RlZCBhbiBpbnN0YW5jZSBvZiBhcnJheS4nKSA6IHZvaWQgMDtcbiAgICByZXR1cm4gZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGw7XG4gIH1cblxuICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5T2ZUeXBlQ2hlY2tlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjaGVja2VyID0gYXJyYXlPZlR5cGVDaGVja2Vyc1tpXTtcbiAgICAgIGlmIChjaGVja2VyKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYC4nKSk7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTm9kZUNoZWNrZXIoKSB7XG4gIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgIGlmICghaXNOb2RlKHByb3BzW3Byb3BOYW1lXSkpIHtcbiAgICAgIHZhciBsb2NhdGlvbk5hbWUgPSBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl07XG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBSZWFjdE5vZGUuJykpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVTaGFwZVR5cGVDaGVja2VyKHNoYXBlVHlwZXMpIHtcbiAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHZhciBsb2NhdGlvbk5hbWUgPSBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl07XG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlIGAnICsgcHJvcFR5cGUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYG9iamVjdGAuJykpO1xuICAgIH1cbiAgICBmb3IgKHZhciBrZXkgaW4gc2hhcGVUeXBlcykge1xuICAgICAgdmFyIGNoZWNrZXIgPSBzaGFwZVR5cGVzW2tleV07XG4gICAgICBpZiAoIWNoZWNrZXIpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xufVxuXG5mdW5jdGlvbiBpc05vZGUocHJvcFZhbHVlKSB7XG4gIHN3aXRjaCAodHlwZW9mIHByb3BWYWx1ZSkge1xuICAgIGNhc2UgJ251bWJlcic6XG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICByZXR1cm4gIXByb3BWYWx1ZTtcbiAgICBjYXNlICdvYmplY3QnOlxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgICByZXR1cm4gcHJvcFZhbHVlLmV2ZXJ5KGlzTm9kZSk7XG4gICAgICB9XG4gICAgICBpZiAocHJvcFZhbHVlID09PSBudWxsIHx8IFJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChwcm9wVmFsdWUpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4ocHJvcFZhbHVlKTtcbiAgICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChwcm9wVmFsdWUpO1xuICAgICAgICB2YXIgc3RlcDtcbiAgICAgICAgaWYgKGl0ZXJhdG9yRm4gIT09IHByb3BWYWx1ZS5lbnRyaWVzKSB7XG4gICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgaWYgKCFpc05vZGUoc3RlcC52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBJdGVyYXRvciB3aWxsIHByb3ZpZGUgZW50cnkgW2ssdl0gdHVwbGVzIHJhdGhlciB0aGFuIHZhbHVlcy5cbiAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICB2YXIgZW50cnkgPSBzdGVwLnZhbHVlO1xuICAgICAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICAgIGlmICghaXNOb2RlKGVudHJ5WzFdKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzU3ltYm9sKHByb3BUeXBlLCBwcm9wVmFsdWUpIHtcbiAgLy8gTmF0aXZlIFN5bWJvbC5cbiAgaWYgKHByb3BUeXBlID09PSAnc3ltYm9sJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gMTkuNC4zLjUgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXSA9PT0gJ1N5bWJvbCdcbiAgaWYgKHByb3BWYWx1ZVsnQEB0b1N0cmluZ1RhZyddID09PSAnU3ltYm9sJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gRmFsbGJhY2sgZm9yIG5vbi1zcGVjIGNvbXBsaWFudCBTeW1ib2xzIHdoaWNoIGFyZSBwb2x5ZmlsbGVkLlxuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBwcm9wVmFsdWUgaW5zdGFuY2VvZiBTeW1ib2wpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuLy8gRXF1aXZhbGVudCBvZiBgdHlwZW9mYCBidXQgd2l0aCBzcGVjaWFsIGhhbmRsaW5nIGZvciBhcnJheSBhbmQgcmVnZXhwLlxuZnVuY3Rpb24gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKSB7XG4gIHZhciBwcm9wVHlwZSA9IHR5cGVvZiBwcm9wVmFsdWU7XG4gIGlmIChBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICByZXR1cm4gJ2FycmF5JztcbiAgfVxuICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgLy8gT2xkIHdlYmtpdHMgKGF0IGxlYXN0IHVudGlsIEFuZHJvaWQgNC4wKSByZXR1cm4gJ2Z1bmN0aW9uJyByYXRoZXIgdGhhblxuICAgIC8vICdvYmplY3QnIGZvciB0eXBlb2YgYSBSZWdFeHAuIFdlJ2xsIG5vcm1hbGl6ZSB0aGlzIGhlcmUgc28gdGhhdCAvYmxhL1xuICAgIC8vIHBhc3NlcyBQcm9wVHlwZXMub2JqZWN0LlxuICAgIHJldHVybiAnb2JqZWN0JztcbiAgfVxuICBpZiAoaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkpIHtcbiAgICByZXR1cm4gJ3N5bWJvbCc7XG4gIH1cbiAgcmV0dXJuIHByb3BUeXBlO1xufVxuXG4vLyBUaGlzIGhhbmRsZXMgbW9yZSB0eXBlcyB0aGFuIGBnZXRQcm9wVHlwZWAuIE9ubHkgdXNlZCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4vLyBTZWUgYGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyYC5cbmZ1bmN0aW9uIGdldFByZWNpc2VUeXBlKHByb3BWYWx1ZSkge1xuICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICBpZiAocHJvcFR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgIHJldHVybiAnZGF0ZSc7XG4gICAgfSBlbHNlIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgIHJldHVybiAncmVnZXhwJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHByb3BUeXBlO1xufVxuXG4vLyBSZXR1cm5zIGNsYXNzIG5hbWUgb2YgdGhlIG9iamVjdCwgaWYgYW55LlxuZnVuY3Rpb24gZ2V0Q2xhc3NOYW1lKHByb3BWYWx1ZSkge1xuICBpZiAoIXByb3BWYWx1ZS5jb25zdHJ1Y3RvciB8fCAhcHJvcFZhbHVlLmNvbnN0cnVjdG9yLm5hbWUpIHtcbiAgICByZXR1cm4gQU5PTllNT1VTO1xuICB9XG4gIHJldHVybiBwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFByb3BUeXBlczsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RQcm9wVHlwZXNTZWNyZXRcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9ICdTRUNSRVRfRE9fTk9UX1BBU1NfVEhJU19PUl9ZT1VfV0lMTF9CRV9GSVJFRCc7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RQcm9wVHlwZXNTZWNyZXQ7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0UHVyZUNvbXBvbmVudFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9hc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBSZWFjdENvbXBvbmVudCA9IHJlcXVpcmUoJy4vUmVhY3RDb21wb25lbnQnKTtcbnZhciBSZWFjdE5vb3BVcGRhdGVRdWV1ZSA9IHJlcXVpcmUoJy4vUmVhY3ROb29wVXBkYXRlUXVldWUnKTtcblxudmFyIGVtcHR5T2JqZWN0ID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlPYmplY3QnKTtcblxuLyoqXG4gKiBCYXNlIGNsYXNzIGhlbHBlcnMgZm9yIHRoZSB1cGRhdGluZyBzdGF0ZSBvZiBhIGNvbXBvbmVudC5cbiAqL1xuZnVuY3Rpb24gUmVhY3RQdXJlQ29tcG9uZW50KHByb3BzLCBjb250ZXh0LCB1cGRhdGVyKSB7XG4gIC8vIER1cGxpY2F0ZWQgZnJvbSBSZWFjdENvbXBvbmVudC5cbiAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICB0aGlzLnJlZnMgPSBlbXB0eU9iamVjdDtcbiAgLy8gV2UgaW5pdGlhbGl6ZSB0aGUgZGVmYXVsdCB1cGRhdGVyIGJ1dCB0aGUgcmVhbCBvbmUgZ2V0cyBpbmplY3RlZCBieSB0aGVcbiAgLy8gcmVuZGVyZXIuXG4gIHRoaXMudXBkYXRlciA9IHVwZGF0ZXIgfHwgUmVhY3ROb29wVXBkYXRlUXVldWU7XG59XG5cbmZ1bmN0aW9uIENvbXBvbmVudER1bW15KCkge31cbkNvbXBvbmVudER1bW15LnByb3RvdHlwZSA9IFJlYWN0Q29tcG9uZW50LnByb3RvdHlwZTtcblJlYWN0UHVyZUNvbXBvbmVudC5wcm90b3R5cGUgPSBuZXcgQ29tcG9uZW50RHVtbXkoKTtcblJlYWN0UHVyZUNvbXBvbmVudC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBSZWFjdFB1cmVDb21wb25lbnQ7XG4vLyBBdm9pZCBhbiBleHRyYSBwcm90b3R5cGUganVtcCBmb3IgdGhlc2UgbWV0aG9kcy5cbl9hc3NpZ24oUmVhY3RQdXJlQ29tcG9uZW50LnByb3RvdHlwZSwgUmVhY3RDb21wb25lbnQucHJvdG90eXBlKTtcblJlYWN0UHVyZUNvbXBvbmVudC5wcm90b3R5cGUuaXNQdXJlUmVhY3RDb21wb25lbnQgPSB0cnVlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UHVyZUNvbXBvbmVudDsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RWZXJzaW9uXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICcxNS4zLjInOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBjYW5EZWZpbmVQcm9wZXJ0eVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGNhbkRlZmluZVByb3BlcnR5ID0gZmFsc2U7XG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB0cnkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ3gnLCB7IGdldDogZnVuY3Rpb24gKCkge30gfSk7XG4gICAgY2FuRGVmaW5lUHJvcGVydHkgPSB0cnVlO1xuICB9IGNhdGNoICh4KSB7XG4gICAgLy8gSUUgd2lsbCBmYWlsIG9uIGRlZmluZVByb3BlcnR5XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjYW5EZWZpbmVQcm9wZXJ0eTsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgY2hlY2tSZWFjdFR5cGVTcGVjXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3Byb2RJbnZhcmlhbnQgPSByZXF1aXJlKCcuL3JlYWN0UHJvZEludmFyaWFudCcpO1xuXG52YXIgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMgPSByZXF1aXJlKCcuL1JlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzJyk7XG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG52YXIgUmVhY3RDb21wb25lbnRUcmVlSG9vaztcblxuaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLmVudiAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Rlc3QnKSB7XG4gIC8vIFRlbXBvcmFyeSBoYWNrLlxuICAvLyBJbmxpbmUgcmVxdWlyZXMgZG9uJ3Qgd29yayB3ZWxsIHdpdGggSmVzdDpcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2lzc3Vlcy83MjQwXG4gIC8vIFJlbW92ZSB0aGUgaW5saW5lIHJlcXVpcmVzIHdoZW4gd2UgZG9uJ3QgbmVlZCB0aGVtIGFueW1vcmU6XG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9wdWxsLzcxNzhcbiAgUmVhY3RDb21wb25lbnRUcmVlSG9vayA9IHJlcXVpcmUoJy4vUmVhY3RDb21wb25lbnRUcmVlSG9vaycpO1xufVxuXG52YXIgbG9nZ2VkVHlwZUZhaWx1cmVzID0ge307XG5cbi8qKlxuICogQXNzZXJ0IHRoYXQgdGhlIHZhbHVlcyBtYXRjaCB3aXRoIHRoZSB0eXBlIHNwZWNzLlxuICogRXJyb3IgbWVzc2FnZXMgYXJlIG1lbW9yaXplZCBhbmQgd2lsbCBvbmx5IGJlIHNob3duIG9uY2UuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHR5cGVTcGVjcyBNYXAgb2YgbmFtZSB0byBhIFJlYWN0UHJvcFR5cGVcbiAqIEBwYXJhbSB7b2JqZWN0fSB2YWx1ZXMgUnVudGltZSB2YWx1ZXMgdGhhdCBuZWVkIHRvIGJlIHR5cGUtY2hlY2tlZFxuICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uIGUuZy4gXCJwcm9wXCIsIFwiY29udGV4dFwiLCBcImNoaWxkIGNvbnRleHRcIlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudE5hbWUgTmFtZSBvZiB0aGUgY29tcG9uZW50IGZvciBlcnJvciBtZXNzYWdlcy5cbiAqIEBwYXJhbSB7P29iamVjdH0gZWxlbWVudCBUaGUgUmVhY3QgZWxlbWVudCB0aGF0IGlzIGJlaW5nIHR5cGUtY2hlY2tlZFxuICogQHBhcmFtIHs/bnVtYmVyfSBkZWJ1Z0lEIFRoZSBSZWFjdCBjb21wb25lbnQgaW5zdGFuY2UgdGhhdCBpcyBiZWluZyB0eXBlLWNoZWNrZWRcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNoZWNrUmVhY3RUeXBlU3BlYyh0eXBlU3BlY3MsIHZhbHVlcywgbG9jYXRpb24sIGNvbXBvbmVudE5hbWUsIGVsZW1lbnQsIGRlYnVnSUQpIHtcbiAgZm9yICh2YXIgdHlwZVNwZWNOYW1lIGluIHR5cGVTcGVjcykge1xuICAgIGlmICh0eXBlU3BlY3MuaGFzT3duUHJvcGVydHkodHlwZVNwZWNOYW1lKSkge1xuICAgICAgdmFyIGVycm9yO1xuICAgICAgLy8gUHJvcCB0eXBlIHZhbGlkYXRpb24gbWF5IHRocm93LiBJbiBjYXNlIHRoZXkgZG8sIHdlIGRvbid0IHdhbnQgdG9cbiAgICAgIC8vIGZhaWwgdGhlIHJlbmRlciBwaGFzZSB3aGVyZSBpdCBkaWRuJ3QgZmFpbCBiZWZvcmUuIFNvIHdlIGxvZyBpdC5cbiAgICAgIC8vIEFmdGVyIHRoZXNlIGhhdmUgYmVlbiBjbGVhbmVkIHVwLCB3ZSdsbCBsZXQgdGhlbSB0aHJvdy5cbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgaXMgaW50ZW50aW9uYWxseSBhbiBpbnZhcmlhbnQgdGhhdCBnZXRzIGNhdWdodC4gSXQncyB0aGUgc2FtZVxuICAgICAgICAvLyBiZWhhdmlvciBhcyB3aXRob3V0IHRoaXMgc3RhdGVtZW50IGV4Y2VwdCB3aXRoIGEgYmV0dGVyIG1lc3NhZ2UuXG4gICAgICAgICEodHlwZW9mIHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdID09PSAnZnVuY3Rpb24nKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICclczogJXMgdHlwZSBgJXNgIGlzIGludmFsaWQ7IGl0IG11c3QgYmUgYSBmdW5jdGlvbiwgdXN1YWxseSBmcm9tIFJlYWN0LlByb3BUeXBlcy4nLCBjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycsIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXSwgdHlwZVNwZWNOYW1lKSA6IF9wcm9kSW52YXJpYW50KCc4NCcsIGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJywgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dLCB0eXBlU3BlY05hbWUpIDogdm9pZCAwO1xuICAgICAgICBlcnJvciA9IHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdKHZhbHVlcywgdHlwZVNwZWNOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgbnVsbCwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgZXJyb3IgPSBleDtcbiAgICAgIH1cbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKCFlcnJvciB8fCBlcnJvciBpbnN0YW5jZW9mIEVycm9yLCAnJXM6IHR5cGUgc3BlY2lmaWNhdGlvbiBvZiAlcyBgJXNgIGlzIGludmFsaWQ7IHRoZSB0eXBlIGNoZWNrZXIgJyArICdmdW5jdGlvbiBtdXN0IHJldHVybiBgbnVsbGAgb3IgYW4gYEVycm9yYCBidXQgcmV0dXJuZWQgYSAlcy4gJyArICdZb3UgbWF5IGhhdmUgZm9yZ290dGVuIHRvIHBhc3MgYW4gYXJndW1lbnQgdG8gdGhlIHR5cGUgY2hlY2tlciAnICsgJ2NyZWF0b3IgKGFycmF5T2YsIGluc3RhbmNlT2YsIG9iamVjdE9mLCBvbmVPZiwgb25lT2ZUeXBlLCBhbmQgJyArICdzaGFwZSBhbGwgcmVxdWlyZSBhbiBhcmd1bWVudCkuJywgY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnLCBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl0sIHR5cGVTcGVjTmFtZSwgdHlwZW9mIGVycm9yKSA6IHZvaWQgMDtcbiAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmICEoZXJyb3IubWVzc2FnZSBpbiBsb2dnZWRUeXBlRmFpbHVyZXMpKSB7XG4gICAgICAgIC8vIE9ubHkgbW9uaXRvciB0aGlzIGZhaWx1cmUgb25jZSBiZWNhdXNlIHRoZXJlIHRlbmRzIHRvIGJlIGEgbG90IG9mIHRoZVxuICAgICAgICAvLyBzYW1lIGVycm9yLlxuICAgICAgICBsb2dnZWRUeXBlRmFpbHVyZXNbZXJyb3IubWVzc2FnZV0gPSB0cnVlO1xuXG4gICAgICAgIHZhciBjb21wb25lbnRTdGFja0luZm8gPSAnJztcblxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgIGlmICghUmVhY3RDb21wb25lbnRUcmVlSG9vaykge1xuICAgICAgICAgICAgUmVhY3RDb21wb25lbnRUcmVlSG9vayA9IHJlcXVpcmUoJy4vUmVhY3RDb21wb25lbnRUcmVlSG9vaycpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZGVidWdJRCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY29tcG9uZW50U3RhY2tJbmZvID0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRTdGFja0FkZGVuZHVtQnlJRChkZWJ1Z0lEKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudFN0YWNrSW5mbyA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2suZ2V0Q3VycmVudFN0YWNrQWRkZW5kdW0oZWxlbWVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdGYWlsZWQgJXMgdHlwZTogJXMlcycsIGxvY2F0aW9uLCBlcnJvci5tZXNzYWdlLCBjb21wb25lbnRTdGFja0luZm8pIDogdm9pZCAwO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNoZWNrUmVhY3RUeXBlU3BlYzsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgZ2V0SXRlcmF0b3JGblxuICogXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKiBnbG9iYWwgU3ltYm9sICovXG5cbnZhciBJVEVSQVRPUl9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5pdGVyYXRvcjtcbnZhciBGQVVYX0lURVJBVE9SX1NZTUJPTCA9ICdAQGl0ZXJhdG9yJzsgLy8gQmVmb3JlIFN5bWJvbCBzcGVjLlxuXG4vKipcbiAqIFJldHVybnMgdGhlIGl0ZXJhdG9yIG1ldGhvZCBmdW5jdGlvbiBjb250YWluZWQgb24gdGhlIGl0ZXJhYmxlIG9iamVjdC5cbiAqXG4gKiBCZSBzdXJlIHRvIGludm9rZSB0aGUgZnVuY3Rpb24gd2l0aCB0aGUgaXRlcmFibGUgYXMgY29udGV4dDpcbiAqXG4gKiAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKG15SXRlcmFibGUpO1xuICogICAgIGlmIChpdGVyYXRvckZuKSB7XG4gKiAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwobXlJdGVyYWJsZSk7XG4gKiAgICAgICAuLi5cbiAqICAgICB9XG4gKlxuICogQHBhcmFtIHs/b2JqZWN0fSBtYXliZUl0ZXJhYmxlXG4gKiBAcmV0dXJuIHs/ZnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIGdldEl0ZXJhdG9yRm4obWF5YmVJdGVyYWJsZSkge1xuICB2YXIgaXRlcmF0b3JGbiA9IG1heWJlSXRlcmFibGUgJiYgKElURVJBVE9SX1NZTUJPTCAmJiBtYXliZUl0ZXJhYmxlW0lURVJBVE9SX1NZTUJPTF0gfHwgbWF5YmVJdGVyYWJsZVtGQVVYX0lURVJBVE9SX1NZTUJPTF0pO1xuICBpZiAodHlwZW9mIGl0ZXJhdG9yRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gaXRlcmF0b3JGbjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEl0ZXJhdG9yRm47IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIG9ubHlDaGlsZFxuICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfcHJvZEludmFyaWFudCA9IHJlcXVpcmUoJy4vcmVhY3RQcm9kSW52YXJpYW50Jyk7XG5cbnZhciBSZWFjdEVsZW1lbnQgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudCcpO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgZmlyc3QgY2hpbGQgaW4gYSBjb2xsZWN0aW9uIG9mIGNoaWxkcmVuIGFuZCB2ZXJpZmllcyB0aGF0IHRoZXJlXG4gKiBpcyBvbmx5IG9uZSBjaGlsZCBpbiB0aGUgY29sbGVjdGlvbi5cbiAqXG4gKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90b3AtbGV2ZWwtYXBpLmh0bWwjcmVhY3QuY2hpbGRyZW4ub25seVxuICpcbiAqIFRoZSBjdXJyZW50IGltcGxlbWVudGF0aW9uIG9mIHRoaXMgZnVuY3Rpb24gYXNzdW1lcyB0aGF0IGEgc2luZ2xlIGNoaWxkIGdldHNcbiAqIHBhc3NlZCB3aXRob3V0IGEgd3JhcHBlciwgYnV0IHRoZSBwdXJwb3NlIG9mIHRoaXMgaGVscGVyIGZ1bmN0aW9uIGlzIHRvXG4gKiBhYnN0cmFjdCBhd2F5IHRoZSBwYXJ0aWN1bGFyIHN0cnVjdHVyZSBvZiBjaGlsZHJlbi5cbiAqXG4gKiBAcGFyYW0gez9vYmplY3R9IGNoaWxkcmVuIENoaWxkIGNvbGxlY3Rpb24gc3RydWN0dXJlLlxuICogQHJldHVybiB7UmVhY3RFbGVtZW50fSBUaGUgZmlyc3QgYW5kIG9ubHkgYFJlYWN0RWxlbWVudGAgY29udGFpbmVkIGluIHRoZVxuICogc3RydWN0dXJlLlxuICovXG5mdW5jdGlvbiBvbmx5Q2hpbGQoY2hpbGRyZW4pIHtcbiAgIVJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChjaGlsZHJlbikgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3QuQ2hpbGRyZW4ub25seSBleHBlY3RlZCB0byByZWNlaXZlIGEgc2luZ2xlIFJlYWN0IGVsZW1lbnQgY2hpbGQuJykgOiBfcHJvZEludmFyaWFudCgnMTQzJykgOiB2b2lkIDA7XG4gIHJldHVybiBjaGlsZHJlbjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBvbmx5Q2hpbGQ7IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSByZWFjdFByb2RJbnZhcmlhbnRcbiAqIFxuICovXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogV0FSTklORzogRE8gTk9UIG1hbnVhbGx5IHJlcXVpcmUgdGhpcyBtb2R1bGUuXG4gKiBUaGlzIGlzIGEgcmVwbGFjZW1lbnQgZm9yIGBpbnZhcmlhbnQoLi4uKWAgdXNlZCBieSB0aGUgZXJyb3IgY29kZSBzeXN0ZW1cbiAqIGFuZCB3aWxsIF9vbmx5XyBiZSByZXF1aXJlZCBieSB0aGUgY29ycmVzcG9uZGluZyBiYWJlbCBwYXNzLlxuICogSXQgYWx3YXlzIHRocm93cy5cbiAqL1xuXG5mdW5jdGlvbiByZWFjdFByb2RJbnZhcmlhbnQoY29kZSkge1xuICB2YXIgYXJnQ291bnQgPSBhcmd1bWVudHMubGVuZ3RoIC0gMTtcblxuICB2YXIgbWVzc2FnZSA9ICdNaW5pZmllZCBSZWFjdCBlcnJvciAjJyArIGNvZGUgKyAnOyB2aXNpdCAnICsgJ2h0dHA6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy9lcnJvci1kZWNvZGVyLmh0bWw/aW52YXJpYW50PScgKyBjb2RlO1xuXG4gIGZvciAodmFyIGFyZ0lkeCA9IDA7IGFyZ0lkeCA8IGFyZ0NvdW50OyBhcmdJZHgrKykge1xuICAgIG1lc3NhZ2UgKz0gJyZhcmdzW109JyArIGVuY29kZVVSSUNvbXBvbmVudChhcmd1bWVudHNbYXJnSWR4ICsgMV0pO1xuICB9XG5cbiAgbWVzc2FnZSArPSAnIGZvciB0aGUgZnVsbCBtZXNzYWdlIG9yIHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCcgKyAnIGZvciBmdWxsIGVycm9ycyBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLic7XG5cbiAgdmFyIGVycm9yID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICBlcnJvci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICBlcnJvci5mcmFtZXNUb1BvcCA9IDE7IC8vIHdlIGRvbid0IGNhcmUgYWJvdXQgcmVhY3RQcm9kSW52YXJpYW50J3Mgb3duIGZyYW1lXG5cbiAgdGhyb3cgZXJyb3I7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVhY3RQcm9kSW52YXJpYW50OyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSB0cmF2ZXJzZUFsbENoaWxkcmVuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3Byb2RJbnZhcmlhbnQgPSByZXF1aXJlKCcuL3JlYWN0UHJvZEludmFyaWFudCcpO1xuXG52YXIgUmVhY3RDdXJyZW50T3duZXIgPSByZXF1aXJlKCcuL1JlYWN0Q3VycmVudE93bmVyJyk7XG52YXIgUmVhY3RFbGVtZW50ID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnQnKTtcblxudmFyIGdldEl0ZXJhdG9yRm4gPSByZXF1aXJlKCcuL2dldEl0ZXJhdG9yRm4nKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciBLZXlFc2NhcGVVdGlscyA9IHJlcXVpcmUoJy4vS2V5RXNjYXBlVXRpbHMnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG52YXIgU0VQQVJBVE9SID0gJy4nO1xudmFyIFNVQlNFUEFSQVRPUiA9ICc6JztcblxuLyoqXG4gKiBUT0RPOiBUZXN0IHRoYXQgYSBzaW5nbGUgY2hpbGQgYW5kIGFuIGFycmF5IHdpdGggb25lIGl0ZW0gaGF2ZSB0aGUgc2FtZSBrZXlcbiAqIHBhdHRlcm4uXG4gKi9cblxudmFyIGRpZFdhcm5BYm91dE1hcHMgPSBmYWxzZTtcblxuLyoqXG4gKiBHZW5lcmF0ZSBhIGtleSBzdHJpbmcgdGhhdCBpZGVudGlmaWVzIGEgY29tcG9uZW50IHdpdGhpbiBhIHNldC5cbiAqXG4gKiBAcGFyYW0geyp9IGNvbXBvbmVudCBBIGNvbXBvbmVudCB0aGF0IGNvdWxkIGNvbnRhaW4gYSBtYW51YWwga2V5LlxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IEluZGV4IHRoYXQgaXMgdXNlZCBpZiBhIG1hbnVhbCBrZXkgaXMgbm90IHByb3ZpZGVkLlxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXRDb21wb25lbnRLZXkoY29tcG9uZW50LCBpbmRleCkge1xuICAvLyBEbyBzb21lIHR5cGVjaGVja2luZyBoZXJlIHNpbmNlIHdlIGNhbGwgdGhpcyBibGluZGx5LiBXZSB3YW50IHRvIGVuc3VyZVxuICAvLyB0aGF0IHdlIGRvbid0IGJsb2NrIHBvdGVudGlhbCBmdXR1cmUgRVMgQVBJcy5cbiAgaWYgKGNvbXBvbmVudCAmJiB0eXBlb2YgY29tcG9uZW50ID09PSAnb2JqZWN0JyAmJiBjb21wb25lbnQua2V5ICE9IG51bGwpIHtcbiAgICAvLyBFeHBsaWNpdCBrZXlcbiAgICByZXR1cm4gS2V5RXNjYXBlVXRpbHMuZXNjYXBlKGNvbXBvbmVudC5rZXkpO1xuICB9XG4gIC8vIEltcGxpY2l0IGtleSBkZXRlcm1pbmVkIGJ5IHRoZSBpbmRleCBpbiB0aGUgc2V0XG4gIHJldHVybiBpbmRleC50b1N0cmluZygzNik7XG59XG5cbi8qKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBjb250YWluZXIuXG4gKiBAcGFyYW0geyFzdHJpbmd9IG5hbWVTb0ZhciBOYW1lIG9mIHRoZSBrZXkgcGF0aCBzbyBmYXIuXG4gKiBAcGFyYW0geyFmdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGJhY2sgdG8gaW52b2tlIHdpdGggZWFjaCBjaGlsZCBmb3VuZC5cbiAqIEBwYXJhbSB7Pyp9IHRyYXZlcnNlQ29udGV4dCBVc2VkIHRvIHBhc3MgaW5mb3JtYXRpb24gdGhyb3VnaG91dCB0aGUgdHJhdmVyc2FsXG4gKiBwcm9jZXNzLlxuICogQHJldHVybiB7IW51bWJlcn0gVGhlIG51bWJlciBvZiBjaGlsZHJlbiBpbiB0aGlzIHN1YnRyZWUuXG4gKi9cbmZ1bmN0aW9uIHRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsKGNoaWxkcmVuLCBuYW1lU29GYXIsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgY2hpbGRyZW47XG5cbiAgaWYgKHR5cGUgPT09ICd1bmRlZmluZWQnIHx8IHR5cGUgPT09ICdib29sZWFuJykge1xuICAgIC8vIEFsbCBvZiB0aGUgYWJvdmUgYXJlIHBlcmNlaXZlZCBhcyBudWxsLlxuICAgIGNoaWxkcmVuID0gbnVsbDtcbiAgfVxuXG4gIGlmIChjaGlsZHJlbiA9PT0gbnVsbCB8fCB0eXBlID09PSAnc3RyaW5nJyB8fCB0eXBlID09PSAnbnVtYmVyJyB8fCBSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQoY2hpbGRyZW4pKSB7XG4gICAgY2FsbGJhY2sodHJhdmVyc2VDb250ZXh0LCBjaGlsZHJlbixcbiAgICAvLyBJZiBpdCdzIHRoZSBvbmx5IGNoaWxkLCB0cmVhdCB0aGUgbmFtZSBhcyBpZiBpdCB3YXMgd3JhcHBlZCBpbiBhbiBhcnJheVxuICAgIC8vIHNvIHRoYXQgaXQncyBjb25zaXN0ZW50IGlmIHRoZSBudW1iZXIgb2YgY2hpbGRyZW4gZ3Jvd3MuXG4gICAgbmFtZVNvRmFyID09PSAnJyA/IFNFUEFSQVRPUiArIGdldENvbXBvbmVudEtleShjaGlsZHJlbiwgMCkgOiBuYW1lU29GYXIpO1xuICAgIHJldHVybiAxO1xuICB9XG5cbiAgdmFyIGNoaWxkO1xuICB2YXIgbmV4dE5hbWU7XG4gIHZhciBzdWJ0cmVlQ291bnQgPSAwOyAvLyBDb3VudCBvZiBjaGlsZHJlbiBmb3VuZCBpbiB0aGUgY3VycmVudCBzdWJ0cmVlLlxuICB2YXIgbmV4dE5hbWVQcmVmaXggPSBuYW1lU29GYXIgPT09ICcnID8gU0VQQVJBVE9SIDogbmFtZVNvRmFyICsgU1VCU0VQQVJBVE9SO1xuXG4gIGlmIChBcnJheS5pc0FycmF5KGNoaWxkcmVuKSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoaWxkID0gY2hpbGRyZW5baV07XG4gICAgICBuZXh0TmFtZSA9IG5leHROYW1lUHJlZml4ICsgZ2V0Q29tcG9uZW50S2V5KGNoaWxkLCBpKTtcbiAgICAgIHN1YnRyZWVDb3VudCArPSB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZCwgbmV4dE5hbWUsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4oY2hpbGRyZW4pO1xuICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwoY2hpbGRyZW4pO1xuICAgICAgdmFyIHN0ZXA7XG4gICAgICBpZiAoaXRlcmF0b3JGbiAhPT0gY2hpbGRyZW4uZW50cmllcykge1xuICAgICAgICB2YXIgaWkgPSAwO1xuICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgY2hpbGQgPSBzdGVwLnZhbHVlO1xuICAgICAgICAgIG5leHROYW1lID0gbmV4dE5hbWVQcmVmaXggKyBnZXRDb21wb25lbnRLZXkoY2hpbGQsIGlpKyspO1xuICAgICAgICAgIHN1YnRyZWVDb3VudCArPSB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZCwgbmV4dE5hbWUsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgIHZhciBtYXBzQXNDaGlsZHJlbkFkZGVuZHVtID0gJyc7XG4gICAgICAgICAgaWYgKFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIHZhciBtYXBzQXNDaGlsZHJlbk93bmVyTmFtZSA9IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQuZ2V0TmFtZSgpO1xuICAgICAgICAgICAgaWYgKG1hcHNBc0NoaWxkcmVuT3duZXJOYW1lKSB7XG4gICAgICAgICAgICAgIG1hcHNBc0NoaWxkcmVuQWRkZW5kdW0gPSAnIENoZWNrIHRoZSByZW5kZXIgbWV0aG9kIG9mIGAnICsgbWFwc0FzQ2hpbGRyZW5Pd25lck5hbWUgKyAnYC4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhkaWRXYXJuQWJvdXRNYXBzLCAnVXNpbmcgTWFwcyBhcyBjaGlsZHJlbiBpcyBub3QgeWV0IGZ1bGx5IHN1cHBvcnRlZC4gSXQgaXMgYW4gJyArICdleHBlcmltZW50YWwgZmVhdHVyZSB0aGF0IG1pZ2h0IGJlIHJlbW92ZWQuIENvbnZlcnQgaXQgdG8gYSAnICsgJ3NlcXVlbmNlIC8gaXRlcmFibGUgb2Yga2V5ZWQgUmVhY3RFbGVtZW50cyBpbnN0ZWFkLiVzJywgbWFwc0FzQ2hpbGRyZW5BZGRlbmR1bSkgOiB2b2lkIDA7XG4gICAgICAgICAgZGlkV2FybkFib3V0TWFwcyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSXRlcmF0b3Igd2lsbCBwcm92aWRlIGVudHJ5IFtrLHZdIHR1cGxlcyByYXRoZXIgdGhhbiB2YWx1ZXMuXG4gICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICB2YXIgZW50cnkgPSBzdGVwLnZhbHVlO1xuICAgICAgICAgIGlmIChlbnRyeSkge1xuICAgICAgICAgICAgY2hpbGQgPSBlbnRyeVsxXTtcbiAgICAgICAgICAgIG5leHROYW1lID0gbmV4dE5hbWVQcmVmaXggKyBLZXlFc2NhcGVVdGlscy5lc2NhcGUoZW50cnlbMF0pICsgU1VCU0VQQVJBVE9SICsgZ2V0Q29tcG9uZW50S2V5KGNoaWxkLCAwKTtcbiAgICAgICAgICAgIHN1YnRyZWVDb3VudCArPSB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZCwgbmV4dE5hbWUsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHZhciBhZGRlbmR1bSA9ICcnO1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgYWRkZW5kdW0gPSAnIElmIHlvdSBtZWFudCB0byByZW5kZXIgYSBjb2xsZWN0aW9uIG9mIGNoaWxkcmVuLCB1c2UgYW4gYXJyYXkgJyArICdpbnN0ZWFkIG9yIHdyYXAgdGhlIG9iamVjdCB1c2luZyBjcmVhdGVGcmFnbWVudChvYmplY3QpIGZyb20gdGhlICcgKyAnUmVhY3QgYWRkLW9ucy4nO1xuICAgICAgICBpZiAoY2hpbGRyZW4uX2lzUmVhY3RFbGVtZW50KSB7XG4gICAgICAgICAgYWRkZW5kdW0gPSAnIEl0IGxvb2tzIGxpa2UgeW91XFwncmUgdXNpbmcgYW4gZWxlbWVudCBjcmVhdGVkIGJ5IGEgZGlmZmVyZW50ICcgKyAndmVyc2lvbiBvZiBSZWFjdC4gTWFrZSBzdXJlIHRvIHVzZSBvbmx5IG9uZSBjb3B5IG9mIFJlYWN0Lic7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQpIHtcbiAgICAgICAgICB2YXIgbmFtZSA9IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQuZ2V0TmFtZSgpO1xuICAgICAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgICAgICBhZGRlbmR1bSArPSAnIENoZWNrIHRoZSByZW5kZXIgbWV0aG9kIG9mIGAnICsgbmFtZSArICdgLic7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YXIgY2hpbGRyZW5TdHJpbmcgPSBTdHJpbmcoY2hpbGRyZW4pO1xuICAgICAgIWZhbHNlID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ09iamVjdHMgYXJlIG5vdCB2YWxpZCBhcyBhIFJlYWN0IGNoaWxkIChmb3VuZDogJXMpLiVzJywgY2hpbGRyZW5TdHJpbmcgPT09ICdbb2JqZWN0IE9iamVjdF0nID8gJ29iamVjdCB3aXRoIGtleXMgeycgKyBPYmplY3Qua2V5cyhjaGlsZHJlbikuam9pbignLCAnKSArICd9JyA6IGNoaWxkcmVuU3RyaW5nLCBhZGRlbmR1bSkgOiBfcHJvZEludmFyaWFudCgnMzEnLCBjaGlsZHJlblN0cmluZyA9PT0gJ1tvYmplY3QgT2JqZWN0XScgPyAnb2JqZWN0IHdpdGgga2V5cyB7JyArIE9iamVjdC5rZXlzKGNoaWxkcmVuKS5qb2luKCcsICcpICsgJ30nIDogY2hpbGRyZW5TdHJpbmcsIGFkZGVuZHVtKSA6IHZvaWQgMDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3VidHJlZUNvdW50O1xufVxuXG4vKipcbiAqIFRyYXZlcnNlcyBjaGlsZHJlbiB0aGF0IGFyZSB0eXBpY2FsbHkgc3BlY2lmaWVkIGFzIGBwcm9wcy5jaGlsZHJlbmAsIGJ1dFxuICogbWlnaHQgYWxzbyBiZSBzcGVjaWZpZWQgdGhyb3VnaCBhdHRyaWJ1dGVzOlxuICpcbiAqIC0gYHRyYXZlcnNlQWxsQ2hpbGRyZW4odGhpcy5wcm9wcy5jaGlsZHJlbiwgLi4uKWBcbiAqIC0gYHRyYXZlcnNlQWxsQ2hpbGRyZW4odGhpcy5wcm9wcy5sZWZ0UGFuZWxDaGlsZHJlbiwgLi4uKWBcbiAqXG4gKiBUaGUgYHRyYXZlcnNlQ29udGV4dGAgaXMgYW4gb3B0aW9uYWwgYXJndW1lbnQgdGhhdCBpcyBwYXNzZWQgdGhyb3VnaCB0aGVcbiAqIGVudGlyZSB0cmF2ZXJzYWwuIEl0IGNhbiBiZSB1c2VkIHRvIHN0b3JlIGFjY3VtdWxhdGlvbnMgb3IgYW55dGhpbmcgZWxzZSB0aGF0XG4gKiB0aGUgY2FsbGJhY2sgbWlnaHQgZmluZCByZWxldmFudC5cbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIG9iamVjdC5cbiAqIEBwYXJhbSB7IWZ1bmN0aW9ufSBjYWxsYmFjayBUbyBpbnZva2UgdXBvbiB0cmF2ZXJzaW5nIGVhY2ggY2hpbGQuXG4gKiBAcGFyYW0gez8qfSB0cmF2ZXJzZUNvbnRleHQgQ29udGV4dCBmb3IgdHJhdmVyc2FsLlxuICogQHJldHVybiB7IW51bWJlcn0gVGhlIG51bWJlciBvZiBjaGlsZHJlbiBpbiB0aGlzIHN1YnRyZWUuXG4gKi9cbmZ1bmN0aW9uIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpIHtcbiAgaWYgKGNoaWxkcmVuID09IG51bGwpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHJldHVybiB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZHJlbiwgJycsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRyYXZlcnNlQWxsQ2hpbGRyZW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL1JlYWN0Jyk7XG4iLCIvKiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBDb3B5cmlnaHQgwqkgXG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyogID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgaG9tZS5qc1xuXG4gICAgQ29udmVydHMgYWxsIHRoZSBjb21wb25lbnRzIGluIHRoaXMgZmlsZSBpbnRvIEphdmFzY3JpcHRcbiAgICBBbGwgdGhlIC5qc3ggZmlsZXMgYXJlIGdpdmVuIGluIHZpZXdzIGRpcmVjdG9yeVxuICAgIFxuICAgIEJyb3dzZXJpZnkvV2F0Y2hpZnkgYWxsb3dzIHRoZSAncmVxdWlyZScgZnVuY3Rpb24gdG8gYmUgdXNlZCBvbiB0aGUgQ2xpZW50IFNpZGUuXG4gICAgXG5cdHdhdGNoaWZ5IC4vcHVibGljL2Jyb3dzZXJpZnkvaG9tZS5qcyAtbyAuL3B1YmxpYy9idW5kbGVzL2hvbWVCdW5kbGUuanMgLXQgWyBiYWJlbGlmeSAtLXByZXNldHMgWyBlczIwMTUgcmVhY3QgXSBdIC0tZXh0ZW5zaW9uPS5qc3ggLXZcblx0YnJvd3NlcmlmeSAuL3B1YmxpYy9icm93c2VyaWZ5L2hvbWUuanMgLW8gLi9wdWJsaWMvYnVuZGxlcy9ob21lQnVuZGxlLmpzIC10IFsgYmFiZWxpZnkgLS1wcmVzZXRzIFsgZXMyMDE1IHJlYWN0IF0gXSAtLWV4dGVuc2lvbj0uanN4IC12XG5cbiAgICBQdXQgdGhpcyBhdCB0aGUgYm90dG9tIG9mIHRoZSBIVE1MIGZpbGUuIEF0IHRoZSBiZWdpbm5pbmcgb2YgYWxsIHRoZSBzY3JpcHRzIGluIGluZGV4LmpzeFxuICAgIDxzY3JpcHQgc3JjPVwiL2J1bmRsZXMvaG9tZUJ1bmRsZS5qc1wiPjwvc2NyaXB0PlxuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG52YXIgSG9tZUNvbXBvbmVudCA9IHJlcXVpcmUoJy4vLi4vLi4vdmlld3MvSG9tZS5qc3gnKTtcblxuLy8gUmVhZHMgdGhlIGh0bWwgb2YgdGhlIGhvbWUtcHJvcHMgc2NyaXB0LCB3aGljaCB3YXMgaW5qZWN0ZWQgZGF0YSBmcm9tIHRoZSBzZXJ2ZXIgc2lkZVxudmFyIHByb3BTdHIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvbWUtcHJvcHNcIikuaW5uZXJIVE1MO1xuY29uc29sZS5sb2coXCJQcm9wcyBzZW50IGZyb20gU2VydmVyIGluIFN0cmluZyBmb3JtXCIpO1xuY29uc29sZS5sb2cocHJvcFN0cik7XG5sZXQgcHJvcHMgPSBKU09OLnBhcnNlKHByb3BTdHIpO1xuY29uc29sZS5sb2coXCJQcm9wcyBjb252ZXJ0ZWQgaW50byBKU09OOlwiKTtcbmNvbnNvbGUubG9nKHByb3BzKTtcblJlYWN0RE9NLnJlbmRlcig8SG9tZUNvbXBvbmVudCB1c2VyPXtwcm9wcy51c2VyfSByb29tcz17cHJvcHMucm9vbXN9IGV4cGxvcmU9e3Byb3BzLmV4cGxvcmV9IG15UGxheWxpc3RzPXtwcm9wcy5teVBsYXlsaXN0c30gLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdob21lJykpOyAgXG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIE1lZGlhRW50cnkgPSByZXF1aXJlKCcuL01lZGlhRW50cnkuanN4Jyk7XG5cbnZhciBwbGF5bGlzdEFjdGlvbnMgPSByZXF1aXJlKCcuLi9mbHV4L2FjdGlvbnMvYWN0aW9ucycpO1xudmFyIHBsYXlsaXN0U3RvcmUgPSByZXF1aXJlKCcuLi9mbHV4L3N0b3Jlcy9zdG9yZScpO1xuXG52YXIgU2F2ZUNhbmNlbEJ1dHRvbnMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHNhdmVVcGRhdGVkUGxheWxpc3Q6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMucHJvcHMub25TYXZlQ2xpY2soKTtcbiAgfSxcblxuICBjYW5jZWxTYXZpbmdQbGF5bGlzdDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5wcm9wcy5vbkNhbmNlbENsaWNrKCk7XG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4oXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInNhdmUtY2FuY2VsXCI+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIG9uQ2xpY2s9e3RoaXMuc2F2ZVVwZGF0ZWRQbGF5bGlzdH0+U2F2ZTwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXNlY29uZGFyeVwiIG9uQ2xpY2s9e3RoaXMuY2FuY2VsU2F2aW5nUGxheWxpc3R9PkNhbmNlbDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbnZhciBQcml2YXRlUHVibGljRHJvcGRvd24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgLy8gVE9ETzogSWYgdGhlIHBsYXlsaXN0IGlzIGluaXRpYWxpemVkIGFzIHByaXZhdGUsIHRoZW4gdGhlIGRyb3Bkb3duIGV4aXN0c1xuICAgIC8vIGlmICghdGhpcy5wcm9wcy5pc1B1YmxpYykge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcml2YXRlLXB1YmxpY1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJvcGRvd25cIj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tc2Vjb25kYXJ5IGRyb3Bkb3duLXRvZ2dsZVwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPlxuICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1sb2NrIGljb24tcGFkZGluZ1wiPjwvaT5cbiAgICAgICAgICAgICAgUHJpdmF0ZSBQbGF5bGlzdFxuICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1hbmdsZS1kb3duIGRyb3Bkb3duLWFycm93XCI+PC9pPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiZHJvcGRvd24tbWVudVwiPlxuICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiPjxpIGNsYXNzTmFtZT1cImZhIGZhLWxvY2tcIj48L2k+UHJpdmF0ZSBQbGF5bGlzdDwvYT48L2xpPlxuICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiPjxpIGNsYXNzTmFtZT1cImZhIGZhLWdsb2JlXCI+PC9pPlB1YmxpYyBQbGF5bGlzdDwvYT48L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIC8vIH1cblxuICAgIC8vIElmIHRoZSBwbGF5bGlzdCBpcyBpbml0aWFsaXplZCBhcyBwdWJsaWMsIGl0IHdpbGwgc3RheSBwdWJsaWNcbiAgICAvLyBlbHNlIHtcbiAgICAvLyAgIHJldHVybiAoXG4gICAgLy8gICAgIDxkaXYgY2xhc3NOYW1lPVwicHVibGljLW5vdGVcIj48aSBjbGFzc05hbWU9XCJmYSBmYS1nbG9iZSBpY29uLXBhZGRpbmdcIj48L2k+UHVibGljIFBsYXlsaXN0PC9kaXY+XG4gICAgLy8gICApOyAgXG4gICAgLy8gfVxuICB9XG59KTtcblxudmFyIERlbGV0ZVBsYXlsaXN0QnV0dG9uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXRyYXNoIHRyYXNoLXBsYXlsaXN0LWJ0blwiIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXRhcmdldD1cIiN0cmFzaC1jb25maXJtXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtdHJhc2hcIj48L2k+PC9idXR0b24+XG4gICAgKTtcbiAgfVxufSk7XG5cbnZhciBQbGF5bGlzdEhlYWRlckJ1dHRvbnNUb0NoYW5nZVN0YXRlcyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWN0aW9uXCI+XG4gICAgICAgIDxTYXZlQ2FuY2VsQnV0dG9ucyBvbkNhbmNlbENsaWNrPXt0aGlzLnByb3BzLm9uQ2FuY2VsQ2xpY2t9IG9uU2F2ZUNsaWNrPXt0aGlzLnByb3BzLm9uU2F2ZUNsaWNrfSAvPlxuICAgICAgICA8UHJpdmF0ZVB1YmxpY0Ryb3Bkb3duIGlzUHVibGljPXt0aGlzLnByb3BzLmlzUHVibGljfSAvPlxuICAgICAgICA8RGVsZXRlUGxheWxpc3RCdXR0b24gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG52YXIgTW9kYWxEZWxldGVQbGF5bGlzdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgLy8gRXZlbnQgaGFuZGxlciBidXR0b24gY2xpY2tcbiAgZGVsZXRlUGxheWxpc3Q6IGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKFwiRGVsZXRpbmcgUGxheWxpc3RcIiArIHRoaXMucHJvcHMucGxheWxpc3RLZXkpO1xuICAgICQuYWpheCh7XG4gICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgIHVybDogXCIvcGxheWxpc3QvZGVsZXRlXCIsXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgZGF0YToge19pZDogdGhpcy5wcm9wcy5wbGF5bGlzdEtleX0sXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICBwbGF5bGlzdEFjdGlvbnMuZGVsZXRlUGxheWxpc3QoZGF0YS5kZWxldGVkUGxheWxpc3QpOyBcbiAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgIGVycm9yOiBmdW5jdGlvbih4aHIsIHN0YXR1cywgZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFUlJPUjogRGVsZXRlIFBsYXlsaXN0IGVycm9yZWQgb3V0XCIsIHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpO1xuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgfSk7XG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbCBmYWRlXCIgaWQ9XCJ0cmFzaC1jb25maXJtXCIgdGFiSW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIiBhcmlhLWxhYmVsbGVkYnk9XCJteU1vZGFsTGFiZWxcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1kaWFsb2cgbW9kYWwtc21cIiByb2xlPVwiZG9jdW1lbnRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtYm9keVwiPlxuICAgICAgICAgICAgICBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gcGVybWFuZW50bHkgZGVsZXRlIHRoaXMgcGxheWxpc3Q/XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZm9vdGVyXCI+XG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tc2Vjb25kYXJ5XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DYW5jZWw8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1yZWRcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIG9uQ2xpY2s9e3RoaXMuZGVsZXRlUGxheWxpc3R9PkRlbGV0ZSBQbGF5bGlzdDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbnZhciBQbGF5bGlzdERlc2NyaXB0aW9uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYi1wYWdlLWhlYWRlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYi1wYWdlLXRleHQtY29udGFpbmVyXCI+XG4gICAgICAgICAgPGEgY2xhc3NOYW1lPVwiaWNvbi1idG5cIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+PGRpdiBjbGFzc05hbWU9XCJ0YWItcGFnZS1iYWNrLWJ0blwiPjxpIGNsYXNzTmFtZT1cImZhIGZhLWxnIGZhLWNoZXZyb24tY2lyY2xlLWxlZnRcIj48L2k+PC9kaXY+PC9hPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFiLXBhZ2UtdGl0bGUgb25jbGljay1lZGl0XCI+XG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5uYW1lfVxuICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiaWNvbi1idG4tYmx1ZVwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIj48aSBjbGFzc05hbWU9XCJmYSBmYS1lZGl0XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPjwvYT5cblxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFiLXBhZ2UtY3VyYXRvclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGF5bGlzdC11c2VyLWljb25cIj48aSBjbGFzc05hbWU9XCJmYSBmYS11c2VyIGZhLWZ3XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPjwvZGl2PlxuICAgICAgICAgICAgWW91ciBQbGF5bGlzdFxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWItcGFnZS1yaWdodC1jb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYi1wYWdlLWljb24tY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBpbGxcIj57dGhpcy5wcm9wcy5zaXplfSBJdGVtczwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG52YXIgU2VhcmNoUGxheWxpc3RFbnRyaWVzSW5QbGF5bGlzdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2gtY29udGFpbmVyXCI+XG4gICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cInNlYXJjaC1pbnB1dFwiPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaCBpbiBQbGF5bGlzdC4uLlwiLz5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbi8vIFNVQiBDT01QT05FTlQ6IEVkaXRQbGF5bGlzdEhlYWRlclxudmFyIEVkaXRQbGF5bGlzdEhlYWRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4oXG4gICAgICA8ZGl2PlxuICAgICAgICA8UGxheWxpc3RIZWFkZXJCdXR0b25zVG9DaGFuZ2VTdGF0ZXMgaXNQdWJsaWM9e3RoaXMucHJvcHMuaXNQdWJsaWN9IG9uQ2FuY2VsQ2xpY2s9e3RoaXMucHJvcHMub25DYW5jZWxDbGlja30gb25TYXZlQ2xpY2s9e3RoaXMucHJvcHMub25TYXZlQ2xpY2t9IC8+XG4gICAgICAgIDxNb2RhbERlbGV0ZVBsYXlsaXN0IHBsYXlsaXN0S2V5PXt0aGlzLnByb3BzLnBsYXlsaXN0S2V5fSAvPlxuICAgICAgICA8UGxheWxpc3REZXNjcmlwdGlvbiBuYW1lPXt0aGlzLnByb3BzLm5hbWV9IHNpemU9e3RoaXMucHJvcHMuc2l6ZX0gLz5cbiAgICAgICAgPFNlYXJjaFBsYXlsaXN0RW50cmllc0luUGxheWxpc3QgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG4vLyBNQUlOIENPTVBPTkVOVDogVXNlcnNPcGVuZWRQbGF5bGlzdFxudmFyIFVzZXJzT3BlbmVkUGxheWxpc3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIF9pZDogcGxheWxpc3RTdG9yZS5nZXRJZCgpLFxuICAgICAgaW5kZXg6IHBsYXlsaXN0U3RvcmUuZ2V0SW5kZXgoKSxcbiAgICAgIGVudHJpZXM6IHBsYXlsaXN0U3RvcmUuZ2V0RW50cmllcygpXG4gICAgfTtcbiAgfSxcblxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coXCJFRElUIFBMQVlMSVNUIE1PVU5USU5HXCIpO1xuICAgIHBsYXlsaXN0U3RvcmUuYWRkQ2hhbmdlTGlzdGVuZXIodGhpcy5vbkRpc3BsYXlQbGF5bGlzdCk7XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgIHBsYXlsaXN0U3RvcmUucmVtb3ZlQ2hhbmdlTGlzdGVuZXIodGhpcy5vbkRpc3BsYXlQbGF5bGlzdCk7XG4gIH0sXG5cbiAgb25EaXNwbGF5UGxheWxpc3Q6IGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKFwiQ2hhbmdpbmcgZGlzcGxheSB0byBzZWxlY3RlZCBwbGF5bGlzdFwiKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnByb3BzLm15UGxheWxpc3RzW3BsYXlsaXN0U3RvcmUuZ2V0SW5kZXgoKV0ubWVkaWFFbnRyaWVzKTtcbiAgICB0aGlzLnNldFN0YXRlKHsgXG4gICAgICBfaWQ6IHBsYXlsaXN0U3RvcmUuZ2V0SWQoKSwgXG4gICAgICBpbmRleDogcGxheWxpc3RTdG9yZS5nZXRJbmRleCgpLFxuICAgICAgZW50cmllczogcGxheWxpc3RTdG9yZS5nZXRFbnRyaWVzKClcbiAgICB9KTtcbiAgICAvLyB0aGlzLnNldFN0YXRlKHsgaW5kZXg6IHBsYXlsaXN0U3RvcmUuZ2V0SW5kZXgoKSB9KTtcbiAgICAvLyB0aGlzLnNldFN0YXRlKHsgZW50cmllczogcGxheWxpc3RTdG9yZS5nZXRFbnRyaWVzKCkgfSk7XG4gIH0sXG5cbiAgc2F2ZUNoYW5nZXM6IGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKFwiU2F2aW5nIFBsYXlsaXN0XCIpO1xuICAgIHZhciBzYXZlZFBsYXlsaXN0ID0gW107XG4gICAgdmFyIGVhY2hQbGF5bGlzdDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc3RhdGUuZW50cmllcy5sZW5ndGg7ICsraSkge1xuICAgICAgZWFjaFBsYXlsaXN0ID0gdGhpcy5zdGF0ZS5lbnRyaWVzW2ldO1xuICAgICAgaWYgKGVhY2hQbGF5bGlzdC5pZkRlbGV0ZUluZGljYXRvciA9PT0gdW5kZWZpbmVkIHx8IGVhY2hQbGF5bGlzdC5pZkRlbGV0ZUluZGljYXRvciA9PT0gZmFsc2UpIHtcbiAgICAgICAgZGVsZXRlIGVhY2hQbGF5bGlzdC5pZkRlbGV0ZUluZGljYXRvcjtcbiAgICAgICAgc2F2ZWRQbGF5bGlzdC5wdXNoKGVhY2hQbGF5bGlzdCk7XG4gICAgICB9XG4gICAgfSAgXG4gICAgLy8gRG9uJ3QgbWFrZSBhbiBhamF4IHJlcXVlc3Qgd2hlbiB0aGluZ3MgaGF2ZW4ndCBjaGFuZ2VkXG4gICAgaWYgKHNhdmVkUGxheWxpc3QubGVuZ3RoID09IHRoaXMuc3RhdGUuZW50cmllcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9ICBcblxuICAgICQuYWpheCh7XG4gICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgIHVybDogXCIvcGxheWxpc3QvdXBkYXRlXCIsXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgZGF0YToge19pZDogdGhpcy5wcm9wcy5teVBsYXlsaXN0c1t0aGlzLnN0YXRlLmluZGV4XS5faWQsIG1lZGlhRW50cmllczogSlNPTi5zdHJpbmdpZnkoc2F2ZWRQbGF5bGlzdCl9LFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZW50cmllczogZGF0YS51cGRhdGVkUGxheWxpc3QubWVkaWFFbnRyaWVzfSk7XG4gICAgICAgIHBsYXlsaXN0QWN0aW9ucy51cGRhdGVQbGF5bGlzdChkYXRhLnVwZGF0ZWRQbGF5bGlzdCk7XG5cbiAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgIGVycm9yOiBmdW5jdGlvbih4aHIsIHN0YXR1cywgZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFUlJPUjogVXBkYXRlIFBsYXlsaXN0IGVycm9yZWQgb3V0XCIsIHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpO1xuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgfSk7XG4gIH0sXG5cbiAgY2FuY2VsQ2hhbmdlczogZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coXCJDYW5jZWxpbmcgY2hhbmdlc1wiKTtcbiAgICB2YXIgc2F2ZWRQbGF5bGlzdCA9IFtdO1xuICAgIHZhciBlYWNoUGxheWxpc3Q7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnN0YXRlLmVudHJpZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIGVhY2hQbGF5bGlzdCA9IHRoaXMuc3RhdGUuZW50cmllc1tpXTsgICAgICBcbiAgICAgIGlmIChlYWNoUGxheWxpc3QuaWZEZWxldGVJbmRpY2F0b3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBkZWxldGUgZWFjaFBsYXlsaXN0LmlmRGVsZXRlSW5kaWNhdG9yO1xuICAgICAgfVxuICAgICAgc2F2ZWRQbGF5bGlzdC5wdXNoKGVhY2hQbGF5bGlzdCk7XG4gICAgfSAgXG5cbiAgICB0aGlzLnNldFN0YXRlKHtlbnRyaWVzIDogc2F2ZWRQbGF5bGlzdH0sIGZ1bmN0aW9uKCkge1xuICAgICAgY29uc29sZS5sb2codGhpcy5zdGF0ZS5lbnRyaWVzKTsgIFxuICAgIH0pO1xuICB9LFxuXG4gIGRlbGV0ZU1lZGlhRW50cnlJblBsYXlsaXN0OiBmdW5jdGlvbihwb3NJblBsYXlsaXN0KSB7XG4gICAgY29uc29sZS5sb2codGhpcy5zdGF0ZS5lbnRyaWVzKTtcbiAgICB2YXIgdXBkYXRlZFBsYXlsaXN0ID0gdGhpcy5zdGF0ZS5lbnRyaWVzO1xuICAgIGlmICh1cGRhdGVkUGxheWxpc3RbcG9zSW5QbGF5bGlzdF0uaWZEZWxldGVJbmRpY2F0b3IgPT09IHRydWUpXG4gICAgICB1cGRhdGVkUGxheWxpc3RbcG9zSW5QbGF5bGlzdF0uaWZEZWxldGVJbmRpY2F0b3IgPSBmYWxzZTtcbiAgICBlbHNlIHtcbiAgICAgIHVwZGF0ZWRQbGF5bGlzdFtwb3NJblBsYXlsaXN0XS5pZkRlbGV0ZUluZGljYXRvciA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoe2VudHJpZXMgOiB1cGRhdGVkUGxheWxpc3R9KTtcblxuICAgIC8vIGNvbnNvbGUubG9nKFwiRGVsZXRpbmcgbWVkaWEgZW50cnkgaW4gUGxheWxpc3Q6IFwiICsgcG9zSW5QbGF5bGlzdCk7XG4gICAgLy8gdmFyIHVwZGF0ZWRFbnRyaWVzID0gdGhpcy5zdGF0ZS5lbnRyaWVzO1xuICAgIC8vIHVwZGF0ZWRFbnRyaWVzLnNwbGljZShwb3NJblBsYXlsaXN0LCAxKTtcbiAgICAvLyBpZiAocG9zSW5QbGF5bGlzdCA+IC0xKSB7XG4gICAgLy8gICB0aGlzLnNldFN0YXRlKHsgZW50cmllczogdXBkYXRlZEVudHJpZXMgfSk7XG4gICAgLy8gfVxuXG4gICAgLy8gdGhpcy5zZXRTdGF0ZSh7ZGVsZXRlZExpc3QgOiB0aGlzLnN0YXRlLmRlbGV0ZWRMaXN0LnB1c2gocG9zSW5QbGF5bGlzdCl9KVxuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIG1lZGlhRW50cmllc0luUGxheWxpc3QgPSBbXTtcbiAgICB2YXIgcHJvcE5hbWUgPSBcIlwiO1xuICAgIHZhciBwcm9wU2l6ZSA9IDA7XG4gICAgdmFyIHByb3BMaWtlcyA9IFwiXCI7XG4gICAgdmFyIHByb3BJc1B1YmxpYyA9IHRydWU7XG4gICAgdmFyIHByb3BLZXkgPSBcIlwiO1xuXG4gICAgLy8gVE9ETzogU2hvdWxkIGZpeCB0aGlzIGlmIHN0YXRlbWVudCwgd2hlbiBkZWxldGluZyB0aGUgZGlzcGxheWVkIHBsYXlsaXN0LCBzaG91bGQgcmVpbml0aWFsaXplIHRoZSBzdGF0ZXMgYWxsIHRvIG51bGxcbiAgICAvLyBOb3Qga2VlcCB0aGUgc3RhdGUgYXMgdGhlIHByZXZpb3VzIGRlbGV0ZWQgcGxheWxpc3RcbiAgICBpZiAodGhpcy5zdGF0ZS5pbmRleCAhPT0gbnVsbCAmJiB0aGlzLnByb3BzLm15UGxheWxpc3RzW3RoaXMuc3RhdGUuaW5kZXhdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHZhciBzZWxlY3RlZFBsYXlsaXN0ID0gdGhpcy5wcm9wcy5teVBsYXlsaXN0c1t0aGlzLnN0YXRlLmluZGV4XTtcblxuICAgICAgLy8gdmFyIG1lZGlhRW50cmllcyA9IHNlbGVjdGVkUGxheWxpc3QubWVkaWFFbnRyaWVzO1xuICAgICAgdmFyIG1lZGlhRW50cmllcyA9IHRoaXMuc3RhdGUuZW50cmllcztcblxuICAgICAgLy8gWW91IGRvIHRoaXMgYmVjYXVzZSB0aGUgYXJyYXkgaXRzZWxmIGhhcyBhbiBfaWQuIFRoZSBhcnJheSB0ZWNobmljYWxseSBpc24ndCBlbXB0eSB3aGVuIGVtcHR5LiAoRG9uJ3Qga25vdyBpZiB0aGlzIGNvbmNlcHQgYXBwbGllcyB0byBoZXJlIHRob3VnaClcbiAgICAgIHZhciBtZWRpYUVudHJ5ID0gbWVkaWFFbnRyaWVzWzBdO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1lZGlhRW50cmllcy5sZW5ndGg7ICsraSkge1xuICAgICAgICBtZWRpYUVudHJ5ID0gbWVkaWFFbnRyaWVzW2ldO1xuICAgICAgICBpZiAobWVkaWFFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICAgIHZhciBkZWxldGVJbmRpY2F0b3IgPSBtZWRpYUVudHJ5LmlmRGVsZXRlSW5kaWNhdG9yID09PSB1bmRlZmluZWQgPyBkZWxldGVJbmRpY2F0b3IgPSBmYWxzZSA6IGRlbGV0ZUluZGljYXRvciA9IG1lZGlhRW50cnkuaWZEZWxldGVJbmRpY2F0b3I7IFxuICAgICAgICAgIG1lZGlhRW50cmllc0luUGxheWxpc3QucHVzaChcbiAgICAgICAgICAgIDxNZWRpYUVudHJ5IFxuICAgICAgICAgICAgICBrZXk9e1wibWVkaWFFbnRyeVwiICsgbWVkaWFFbnRyeS5tZWRpYUlkICsgaX1cbiAgICAgICAgICAgICAgcG9zPXtpfSBcbiAgICAgICAgICAgICAgbWVkaWFJZD17bWVkaWFFbnRyeS5tZWRpYUlkfSBcbiAgICAgICAgICAgICAgY2F0ZWdvcnlUeXBlPXsnUExBWUxJU1QnfVxuICAgICAgICAgICAgICBtZWRpYVR5cGU9eydZT1VUVUJFJ31cbiAgICAgICAgICAgICAgdGh1bWJuYWlsPXttZWRpYUVudHJ5LnRodW1ibmFpbH0gXG4gICAgICAgICAgICAgIHRpdGxlPXttZWRpYUVudHJ5LnRpdGxlfVxuICAgICAgICAgICAgICBhcnRpc3Q9e21lZGlhRW50cnkuYXJ0aXN0fSBcbiAgICAgICAgICAgICAgaWZNZWRpYUNhcmRBZGRlZD17ZmFsc2V9IFxuICAgICAgICAgICAgICB1c2VyPXt0aGlzLnByb3BzLnVzZXJ9XG4gICAgICAgICAgICAgIG15UGxheWxpc3RzPXt0aGlzLnByb3BzLm15UGxheWxpc3RzfSBcbiAgICAgICAgICAgICAgZGVsZXRlRW50cnk9e3RoaXMuZGVsZXRlTWVkaWFFbnRyeUluUGxheWxpc3R9XG4gICAgICAgICAgICAgIGRlbGV0ZUluZGljYXRvcj17ZGVsZXRlSW5kaWNhdG9yfSAvPlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcHJvcE5hbWUgPSBzZWxlY3RlZFBsYXlsaXN0Lm5hbWU7XG4gICAgICBwcm9wU2l6ZSA9IG1lZGlhRW50cnkgIT09IG51bGwgPyBzZWxlY3RlZFBsYXlsaXN0Lm1lZGlhRW50cmllcy5sZW5ndGggOiAwO1xuICAgICAgcHJvcExpa2VzID0gc2VsZWN0ZWRQbGF5bGlzdC5saWtlcztcbiAgICAgIHByb3BJc1B1YmxpYyA9IHNlbGVjdGVkUGxheWxpc3QuaXNQdWJsaWM7XG4gICAgICBwcm9wS2V5ID0gc2VsZWN0ZWRQbGF5bGlzdC5faWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZWRpdC1wbGF5bGlzdC1jb250YWluZXJcIj5cbiAgICAgICAgICA8RWRpdFBsYXlsaXN0SGVhZGVyIG5hbWU9e3Byb3BOYW1lfSBzaXplPXtwcm9wU2l6ZX0gaXNQdWJsaWM9e3Byb3BJc1B1YmxpY30gcGxheWxpc3RLZXk9e3Byb3BLZXl9IG9uQ2FuY2VsQ2xpY2s9e3RoaXMuY2FuY2VsQ2hhbmdlc30gb25TYXZlQ2xpY2s9e3RoaXMuc2F2ZUNoYW5nZXN9IC8+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAge21lZGlhRW50cmllc0luUGxheWxpc3R9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVXNlcnNPcGVuZWRQbGF5bGlzdDsiLCIvKiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBDb3B5cmlnaHQgwqkgXG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyogID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgVklFVzogRXhwbG9yZS5qc3hcblxuICAgIFNob3djYXNlcyBkaWZmZXJlbnQgcHVibGljIHBsYXlsaXN0cyB0aGF0IGFyZSBjdXJyZW50bHkgdHJlbmRpbmdcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBDb21wb25lbnRzXG5cbiAgICBFeHBsb3JlIC0gVGhlIEV4cGxvcmUgdGFiXG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBFeHBsb3JlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1wYWRkaW5nXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGFjZWhvbGRlclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGFjZWhvbGRlci1jb250ZW50XCI+XG4gICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLXJvY2tldCBwbGFjZWhvbGRlci1pY29uXCI+PC9pPjxici8+XG4gICAgICAgICAgICAgIDxzcGFuPlRoaXMgcGFnZSBpcyBzdGlsbCBiZWluZyBtYWRlPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaC1jb250YWluZXJcIj5cbiAgICAgICAgICA8Zm9ybSBjbGFzc05hbWU9XCJzZWFyY2gtaW5wdXRcIj5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzTmFtZT1cImNoYXQtdGV4dGJveFwiIG5hbWU9XCJcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaCBQdWJsaWMgUGxheWxpc3RzLi4uXCIvPlxuICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgICovfVxuXG4gICAgICAgIHsvKiBUT0RPOiBFeHBsb3JlICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImV4cGxvcmUtY29udGFpbmVyXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBFeHBsb3JlOyIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBGb290ZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxmb290ZXIgY2xhc3NOYW1lPVwiZm9vdGVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9vdGVyLWNvbnRlbnRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tNyBjb2wteHMtNVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvcHlyaWdodFwiPkFwcGxlIFRlYSAmY29weTsgMjAxNjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS01IGNvbC14cy03XCI+XG4gICAgICAgICAgICAgIDxwPjxiPkFwcGxlIFRlYTwvYj4gaXMgb25lIG9mIG1hbnkgZXhjaXRpbmcgcHJvamVjdHMgd2UncmUgd29ya2luZyBvbi4gSWYgeW91IHdhbnQgdG8gc3VwcG9ydCBvdXIgZGV2ZWxvcG1lbnQgYW5kIGhlbHAga2VlcCBBcHBsZSBUZWEgc2VydmVycyBydW5uaW5nLCB5b3UgY2FuIHNlbmQgdXMgYSBkb25hdGlvbi4gV2UnbGwgbG92ZSB5b3UgZm9yIGl0LiA8aSBjbGFzc05hbWU9XCJmYSBmYS1oZWFydFwiPjwvaT48L3A+XG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tdGVhbC1ob3ZlclwiPkRvbmF0ZTwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9mb290ZXI+XG4gICAgKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRm9vdGVyOyIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbi8qIFVzZXIgUHJvZmlsZSBQaWN0dXJlIEljb24gKi9cbnZhciBIZWFkZXJQcm9maWxlSWNvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGEgY2xhc3NOYW1lPVwiZHJvcGRvd24tdG9nZ2xlXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiPlxuICAgICAgICAgIDxpbWcgY2xhc3NOYW1lPVwicHJvZmlsZS1waWNcIiBzcmM9XCJpbWFnZXMvcHJvZmlsZS1waWMucG5nXCIgLz5cbiAgICAgICAgPC9hPlxuICAgICAgICA8dWwgY2xhc3NOYW1lPVwiZHJvcGRvd24tbWVudSBkcm9wZG93bi1tZW51LXJpZ2h0XCI+XG4gICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImRyb3Bkb3duLWhlYWRlclwiPnt0aGlzLnByb3BzLnVzZXIubG9jYWwuZmlyc3ROYW1lfSB7dGhpcy5wcm9wcy51c2VyLmxvY2FsLmxhc3ROYW1lfSAoe3RoaXMucHJvcHMudXNlci5sb2NhbC5lbWFpbH0pPC9saT5cbiAgICAgICAgICA8bGk+PGEgaHJlZj1cIi91c2VyXCI+UHJvZmlsZTwvYT48L2xpPlxuICAgICAgICAgIDxsaSByb2xlPVwic2VwYXJhdG9yXCIgY2xhc3NOYW1lPVwiZGl2aWRlclwiPjwvbGk+XG4gICAgICAgICAgPGxpPjxhIGhyZWY9XCIvbG9nb3V0XCI+U2lnbiBPdXQ8L2E+PC9saT5cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG4vKiBTaWduIFVwIGFuZCBTaWduIEluIEJ1dHRvbnMgKi9cbnZhciBTaWduVXBTaWduSW5CdXR0b25zID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlci1idG4tZ3JvdXBcIj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgYnRuLW1hcmdpblwiIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXRhcmdldD1cIiNzaWdudXBcIj5cbiAgICAgICAgICBTaWduIFVwXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8U2lnblVwTW9kYWwgLz5cbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXNlY29uZGFyeSBidG4tbWFyZ2luIGRyb3Bkb3duLXRvZ2dsZVwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPlxuICAgICAgICAgIFNpZ24gSW5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxTaWduSW5Ecm9wZG93biAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbi8qIFNpZ24gVXAgTW9kYWwgUG9wdXAgKi9cbnZhciBTaWduVXBNb2RhbCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgLy8gVE9ETzogSW1wbGVtZW50IG9uU3VibWl0IChDaGVjayBpZiB2YWxpZCBpbnB1dHMgaWYgdmFsaWQgZW1haWwpXG4gIG9uU3VibWl0OiBmdW5jdGlvbihlKSB7XG4gICAgY29uc29sZS5sb2coXCJTdWJtaXR0aW5nIHNpZ24gdXBcIik7XG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbCBmYWRlXCIgaWQ9XCJzaWdudXBcIiB0YWJJbmRleD1cIi0xXCIgcm9sZT1cImRpYWxvZ1wiIGFyaWEtbGFiZWxsZWRieT1cIm15TW9kYWxMYWJlbFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWRpYWxvZyBtb2RhbC1zbVwiIHJvbGU9XCJkb2N1bWVudFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93IHJvdy1zbVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTEyIGNvbC1wYWRkaW5nLXNtXCI+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tZmFjZWJvb2sgYnRuLWZ1bGwtd2lkdGhcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1mYWNlYm9vayBpY29uLXBhZGRpbmcgaWNvbi1wb3NpdGlvbi1sZWZ0XCI+PC9pPlNpZ24gSW4gd2l0aCBGYWNlYm9va1xuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMTIgY29sLXBhZGRpbmctc21cIj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi10d2l0dGVyIGJ0bi1mdWxsLXdpZHRoXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtdHdpdHRlciBpY29uLXBhZGRpbmcgaWNvbi1wb3NpdGlvbi1sZWZ0XCI+PC9pPlNpZ24gSW4gd2l0aCBUd2l0dGVyXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0xMiBjb2wtcGFkZGluZy1zbVwiPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWdvb2dsZSBidG4tZnVsbC13aWR0aFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWdvb2dsZS1wbHVzIGljb24tcGFkZGluZyBpY29uLXBvc2l0aW9uLWxlZnRcIj48L2k+U2lnbiBpbiB3aXRoIEdvb2dsZVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWJvZHkgc2VjdGlvbi1ib3JkZXIgc2lnbnVwLWZvcm0tY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3ItZGl2aWRlclwiPjxzcGFuPk9SIFNJR04gVVA8L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gPGZvcm0gY2xhc3NOYW1lPVwic2VhcmNoLWlucHV0XCIgYWN0aW9uPVwiL3NpZ251cFwiIG1ldGhvZD1cInBvc3RcIj5cbiAgICAgICAgICAgICAgICAvLyAgIDxkaXYgY2xhc3NOYW1lPVwicm93IHJvdy1zbVwiPlxuICAgICAgICAgICAgICAgIC8vICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS02IGNvbC1wYWRkaW5nLXNtXCI+XG4gICAgICAgICAgICAgICAgLy8gICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJGaXJzdCBOYW1lXCIgbmFtZT1cImZpcnN0TmFtZVwiLz5cbiAgICAgICAgICAgICAgICAvLyAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgLy8gICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTYgY29sLXBhZGRpbmctc21cIj5cbiAgICAgICAgICAgICAgICAvLyAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIkxhc3QgTmFtZVwiIG5hbWU9XCJsYXN0TmFtZVwiLz5cbiAgICAgICAgICAgICAgICAvLyAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgLy8gICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTEyIGNvbC1wYWRkaW5nLXNtXCI+XG4gICAgICAgICAgICAgICAgLy8gICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJFbWFpbFwiIG5hbWU9XCJlbWFpbFwiLz5cbiAgICAgICAgICAgICAgICAvLyAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgLy8gICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTEyIGNvbC1wYWRkaW5nLXNtXCI+XG4gICAgICAgICAgICAgICAgLy8gICAgICAgPGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIHBsYWNlaG9sZGVyPVwiUGFzc3dvcmRcIiBuYW1lPVwicGFzc3dvcmRcIi8+XG4gICAgICAgICAgICAgICAgLy8gICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIC8vICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS0xMiBjb2wtcGFkZGluZy1zbVwiPlxuICAgICAgICAgICAgICAgIC8vICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IGJ0bi1mdWxsLXdpZHRoXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiB0eXBlPVwic3VibWl0XCI+U2lnbiBVcDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIC8vICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAvLyAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIC8vIDwvZm9ybT5cbiAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgPGZvcm0gY2xhc3NOYW1lPVwic2VhcmNoLWlucHV0IHNlYXJjaC1pbnB1dC1zbVwiIGFjdGlvbj1cIi9zaWdudXBcIiBtZXRob2Q9XCJwb3N0XCIgb25TdWJtaXQ9e3RoaXMub25TdWJtaXR9PiBcbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cInNpZ24tdXAtZmlyc3QtbmFtZVwiIGNsYXNzTmFtZT1cImlucHV0LXBhZGRpbmctc21cIiBwbGFjZWhvbGRlcj1cIkZpcnN0IE5hbWVcIiBuYW1lPVwiZmlyc3ROYW1lXCIvPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwic2lnbi11cC1sYXN0LW5hbWVcIiBjbGFzc05hbWU9XCJpbnB1dC1wYWRkaW5nLXNtXCIgcGxhY2Vob2xkZXI9XCJMYXN0IE5hbWVcIiBuYW1lPVwibGFzdE5hbWVcIi8+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwiaW5wdXQtcGFkZGluZy1zbVwiIHBsYWNlaG9sZGVyPVwiRW1haWxcIiBuYW1lPVwiZW1haWxcIi8+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIGNsYXNzTmFtZT1cImlucHV0LXBhZGRpbmctc21cIiBwbGFjZWhvbGRlcj1cIlBhc3N3b3JkXCIgbmFtZT1cInBhc3N3b3JkXCIvPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IGJ0bi1mdWxsLXdpZHRoXCIgdHlwZT1cInN1Ym1pdFwiPlNpZ24gVXA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICBcbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxuLyogU2lnbiBJbiBEcm9wZG93biAqL1xudmFyIFNpZ25JbkRyb3Bkb3duID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAvLyBUT0RPOiBJbXBsZW1lbnQgb25TdWJtaXQgKENoZWNrIGlmIHZhbGlkIGlucHV0cyBpZiB2YWxpZCBlbWFpbClcbiAgb25TdWJtaXQ6IGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKFwiU3VibWl0dGluZyBzaWduIHVwXCIpO1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDx1bCBjbGFzc05hbWU9XCJkcm9wZG93bi1tZW51IGRyb3Bkb3duLW1lbnUtcmlnaHQgc2lnbmluLWNvbnRhaW5lclwiIGlkPVwic2lnbmluLWZvcm1cIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaWduaW4tY29udGVudFwiPlxuICAgICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cInNlYXJjaC1pbnB1dCBzZWFyY2gtaW5wdXQtc21cIiBhY3Rpb249XCIvc2lnbmluXCIgbWV0aG9kPVwicG9zdFwiIG9uU3VibWl0PXt0aGlzLm9uU3VibWl0fT5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzTmFtZT1cImlucHV0LXBhZGRpbmctc21cIiBwbGFjZWhvbGRlcj1cIkVtYWlsXCIgbmFtZT1cImVtYWlsXCIvPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIGNsYXNzTmFtZT1cImlucHV0LXBhZGRpbmctc21cIiBwbGFjZWhvbGRlcj1cIlBhc3N3b3JkXCIgbmFtZT1cInBhc3N3b3JkXCIvPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgYnRuLWZ1bGwtd2lkdGhcIiB0eXBlPVwic3VibWl0XCI+U2lnbiBJbjwvYnV0dG9uPlxuICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICA8YSBjbGFzc05hbWU9XCJmb3Jnb3QtcHcgbGluay1ncmV5LWxpdGVcIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+Rm9yZ290IHBhc3N3b3JkPzwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2lnbmluLWNvbnRlbnQgc2VjdGlvbi1ib3JkZXIgc2lnbmluLWljb25zLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3ItZGl2aWRlclwiPjxzcGFuPk9SIFNJR04gSU4gV0lUSDwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdyByb3cteHNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTQgY29sLXBhZGRpbmcteHNcIj48YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tZmFjZWJvb2sgYnRuLWZ1bGwtd2lkdGhcIj48aSBjbGFzc05hbWU9XCJmYSBmYS1mYWNlYm9va1wiPjwvaT48L2J1dHRvbj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTQgY29sLXBhZGRpbmcteHNcIj48YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tdHdpdHRlciBidG4tZnVsbC13aWR0aFwiPjxpIGNsYXNzTmFtZT1cImZhIGZhLXR3aXR0ZXJcIj48L2k+PC9idXR0b24+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy00IGNvbC1wYWRkaW5nLXhzXCI+PGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWdvb2dsZSBidG4tZnVsbC13aWR0aFwiPjxpIGNsYXNzTmFtZT1cImZhIGZhLWdvb2dsZS1wbHVzXCI+PC9pPjwvYnV0dG9uPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvdWw+XG4gICAgKTtcbiAgfVxufSk7XG5cbnZhciBIZWFkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGhlYWRlckljb25zID0gW107XG5cbiAgICAvLyBUT0RPOiBJZiB1c2VycyBhcmUgbG9nZ2VkIGluLCBzd2l0Y2ggaWNvbnNcbiAgICAvLyBpZiAodGhpcy5wcm9wcy51c2VyID09PSB1bmRlZmluZWQgfHwgdGhpcy5wcm9wcy51c2VyID09PSBudWxsKSB7XG4gICAgaWYgKHRoaXMucHJvcHMudXNlciAhPT0gdW5kZWZpbmVkICYmIHRoaXMucHJvcHMudXNlciAhPT0gbnVsbCkge1xuICAgICAgaGVhZGVySWNvbnMucHVzaChcbiAgICAgICAgPEhlYWRlclByb2ZpbGVJY29uIGtleT17J0hlYWRlclByb2ZpbGVJY29uJ30gdXNlcj17dGhpcy5wcm9wcy51c2VyfSAvPlxuICAgICAgKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBoZWFkZXJJY29ucy5wdXNoKFxuICAgICAgICA8U2lnblVwU2lnbkluQnV0dG9ucyBrZXk9eydTaWduVXBTaWduSW5CdXR0b25zJ30gLz5cbiAgICAgICk7XG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlci1jb250ZW50LWNvbnRhaW5lciByb3dcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS02XCI+XG4gICAgICAgICAgICA8YSBocmVmPVwiL1wiPjxpbWcgY2xhc3NOYW1lPVwiaGVhZGVyLWxvZ29cIiBzcmM9XCJpbWFnZXMvbG9nby5wbmdcIi8+PC9hPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTYgaGVhZGVyLXNlY3Rpb25cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLWljb24tY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgIHtoZWFkZXJJY29uc31cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlcjsiLCIvKiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBDb3B5cmlnaHQgwqkgXG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyogID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgSG9tZS5qc3hcblxuICAgIEhvbWUgcGFnZSBkaXNwbGF5ZWQgd2hlbiBsb2dnaW5nIGluLlxuICAgIEluc3RhbnQgb3B0aW9uIHRvIHNlbGVjdCByb29tIHRvIGpvaW4sIG9yIGJyb3dzZSBwbGF5bGlzdHMuXG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyogID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgQ29tcG9uZW50c1xuXG4gICAgSG9tZSAtIEVudGlyZSBodG1sIGZvciB0aGUgSG9tZSBjb21wb25lbnQuXG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbi8vIFN1Yi1jb21wb25lbnRzIGluIFJvb21cbnZhciBIZWFkZXIgPSByZXF1aXJlKCcuL0hlYWRlci5qc3gnKTtcbnZhciBQdWJsaWNSb29tcyA9IHJlcXVpcmUoJy4vUHVibGljUm9vbXMuanN4Jyk7XG52YXIgTXlSb29tcyA9IHJlcXVpcmUoJy4vTXlSb29tcy5qc3gnKTtcbnZhciBFeHBsb3JlID0gcmVxdWlyZSgnLi9FeHBsb3JlLmpzeCcpO1xudmFyIE15UGxheWxpc3RzID0gcmVxdWlyZSgnLi9NeVBsYXlsaXN0cy5qc3gnKTtcbnZhciBQbGF5bGlzdFRhYiA9IHJlcXVpcmUoJy4vUGxheWxpc3RUYWIuanN4Jyk7XG52YXIgRWRpdE9wZW5lZFBsYXlsaXN0ID0gcmVxdWlyZSgnLi9FZGl0T3BlbmVkUGxheWxpc3QuanN4Jyk7XG52YXIgVmlld09wZW5lZFBsYXlsaXN0ID0gcmVxdWlyZSgnLi9WaWV3T3BlbmVkUGxheWxpc3QuanN4Jyk7XG52YXIgTW9kYWxDcmVhdGVQbGF5bGlzdCA9IHJlcXVpcmUoJy4vTW9kYWxDcmVhdGVQbGF5bGlzdC5qc3gnKTtcbnZhciBGb290ZXIgPSByZXF1aXJlKCcuL0Zvb3Rlci5qc3gnKTtcblxuLy8gRmx1eCwgdXNlZCB0byBjaGVjayBmb3IgZGVsZXRlZCBwbGF5bGlzdHNcbnZhciBwbGF5bGlzdFN0b3JlID0gcmVxdWlyZSgnLi4vZmx1eC9zdG9yZXMvc3RvcmUnKTtcblxuLy8gTUFJTiBDT01QT05FTlQ6IEhvbWVcbnZhciBIb21lID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLnByb3BzLm15UGxheWxpc3RzICA9PT0gdW5kZWZpbmVkIHx8IHRoaXMucHJvcHMubXlQbGF5bGlzdHMgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG15UGxheWxpc3RzOiBbXVxuICAgICAgfTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBteVBsYXlsaXN0czogdGhpcy5wcm9wcy5teVBsYXlsaXN0c1xuICAgICAgfTsgIFxuICAgIH1cbiAgfSxcblxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgLy8gU2V0cyB1cCB0aGUgRmx1eCBldmVudCBsaXN0ZW5lcnMgZm9yIHRoZSBwbGF5bGlzdHNcbiAgICBwbGF5bGlzdFN0b3JlLmFkZERlbGV0ZVBsYXlsaXN0TGlzdGVuZXIodGhpcy5vbkRlbGV0ZVNwZWNpZmllZFBsYXlsaXN0KTtcbiAgICBwbGF5bGlzdFN0b3JlLmFkZFVwZGF0ZVBsYXlsaXN0TGlzdGVuZXIodGhpcy5vblVwZGF0ZVNwZWNpZmllZFBsYXlsaXN0KTtcbiAgICBwbGF5bGlzdFN0b3JlLmFkZENyZWF0ZVBsYXlsaXN0TGlzdGVuZXIodGhpcy51cGRhdGVBbGxQbGF5bGlzdEVudHJpZXMpO1xuXG4gICAgc29ja2V0Lm9uKFwiRnJvbSBTZXJ2ZXI6IFVwZGF0ZSBNeVBsYXlsaXN0IHdpdGggbmV3IHBsYXlsaXN0c1wiICwgdGhpcy51cGRhdGVBbGxQbGF5bGlzdEVudHJpZXMpO1xuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbigpIHtcbiAgICAvLyBVbm1vdW50cyB0aGUgZXZlbnQgbGlzdGVuZXJcbiAgICBwbGF5bGlzdFN0b3JlLnJlbW92ZURlbGV0ZVBsYXlsaXN0TGlzdGVuZXIodGhpcy5vbkRlbGV0ZVNwZWNpZmllZFBsYXlsaXN0KTtcbiAgICBwbGF5bGlzdFN0b3JlLnJlbW92ZVVwZGF0ZVBsYXlsaXN0TGlzdGVuZXIodGhpcy5vblVwZGF0ZVNwZWNpZmllZFBsYXlsaXN0KTtcbiAgICBwbGF5bGlzdFN0b3JlLnJlbW92ZUNyZWF0ZVBsYXlsaXN0TGlzdGVuZXIodGhpcy51cGRhdGVBbGxQbGF5bGlzdEVudHJpZXMpO1xuICB9LFxuXG4gIC8vIEZMVVggRVZFTlQgSEFORExFUjogRGVsZXRlcyBhIHBsYXlsaXN0IGVudHJ5IGZyb20gbXlQbGF5bGlzdFxuICBvbkRlbGV0ZVNwZWNpZmllZFBsYXlsaXN0OiBmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZyhcIlJvb20uanN4OiBvbkRlbGV0ZVNwZWNpZmllZFBsYXlsaXN0XCIpO1xuICAgIHZhciBwbGF5bGlzdCA9IHBsYXlsaXN0U3RvcmUuZ2V0UGxheWxpc3REZWxldGVkKCk7XG4gICAgaWYgKHBsYXlsaXN0ID09PSBudWxsIHx8IHBsYXlsaXN0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBEbyBzZWFyY2ggaW4gYSBmYXN0ZXIgd2F5IChQcm9iYWJseSB3b3VsZCBoYXZlIHRoZSBwb3NpdGlvbiBvZiB0aGUgcGxheWxpc3QpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnN0YXRlLm15UGxheWxpc3RzLmxlbmd0aDsgKytpKSB7XG4gICAgICBpZiAodGhpcy5zdGF0ZS5teVBsYXlsaXN0c1tpXS5faWQgPT09IHBsYXlsaXN0Ll9pZCkge1xuICAgICAgICAvLyBTaG93IHRoZSBwbGF5bGlzdCB0YWJcbiAgICAgICAgJCgnI3RhYi1teXBsYXlsaXN0cycpLnRhYignc2hvdycpO1xuXG4gICAgICAgIHZhciBwbGF5bGlzdHNXaXRoRGVsZXRlZEVudHJ5ID0gdGhpcy5zdGF0ZS5teVBsYXlsaXN0cztcbiAgICAgICAgcGxheWxpc3RzV2l0aERlbGV0ZWRFbnRyeS5zcGxpY2UoaSwgMSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe215UGxheWxpc3RzIDogcGxheWxpc3RzV2l0aERlbGV0ZWRFbnRyeX0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8vIEZMVVggRVZFTlQgSEFORExFUjogVXBkYXRlcyBhIHBsYXlsaXN0IGVudHJ5IGZyb20gbXlQbGF5bGlzdFxuICBvblVwZGF0ZVNwZWNpZmllZFBsYXlsaXN0OiBmdW5jdGlvbigpIHtcbiAgICB2YXIgcGxheWxpc3QgPSBwbGF5bGlzdFN0b3JlLmdldFVwZGF0ZWRQbGF5bGlzdCgpO1xuICAgIGlmIChwbGF5bGlzdCA9PT0gbnVsbCB8fCBwbGF5bGlzdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gVE9ETzogRG8gc2VhcmNoIGluIGEgZmFzdGVyIHdheVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zdGF0ZS5teVBsYXlsaXN0cy5sZW5ndGg7ICsraSkge1xuICAgICAgaWYgKHRoaXMuc3RhdGUubXlQbGF5bGlzdHNbaV0uX2lkID09PSBwbGF5bGlzdC5faWQpIHtcbiAgICAgICAgdmFyIHBsYXlsaXN0c1dpdGhVcGRhdGVkRW50cnkgPSB0aGlzLnN0YXRlLm15UGxheWxpc3RzO1xuICAgICAgICBwbGF5bGlzdHNXaXRoVXBkYXRlZEVudHJ5W2ldID0gcGxheWxpc3Q7IFxuICAgICAgICB0aGlzLnNldFN0YXRlKHtteVBsYXlsaXN0cyA6IHBsYXlsaXN0c1dpdGhVcGRhdGVkRW50cnl9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvLyBGTFVYIEVWRU5UIEhBTkRMRVI6IEFwcGVuZHMgYSBuZXcgcGxheWxpc3Qgb250byBteVBsYXlsaXN0XG4gIHVwZGF0ZUFsbFBsYXlsaXN0RW50cmllczogZnVuY3Rpb24obmV3UGxheWxpc3QpIHtcbiAgICBjb25zb2xlLmxvZyhcIlVwZGF0ZSB3aXRoIG5ldyBwbGF5bGlzdCBlbnRyeVwiKVxuICAgIHZhciBuZXdQbGF5bGlzdCA9IHBsYXlsaXN0U3RvcmUuZ2V0Q3JlYXRlZFBsYXlsaXN0KCk7XG4gICAgdmFyIHBsYXlsaXN0c1dpdGhOZXdFbnRyeSA9IHRoaXMuc3RhdGUubXlQbGF5bGlzdHMuY29uY2F0KG5ld1BsYXlsaXN0KTtcbiAgICB0aGlzLnNldFN0YXRlKHtteVBsYXlsaXN0cyA6IHBsYXlsaXN0c1dpdGhOZXdFbnRyeX0pOyBcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybihcbiAgICAgIDxkaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1jb250YWluZXJcIj5cblxuICAgICAgICAgIHsvKiBQYWdlIE92ZXJsYXkgLy8gdG8gZnJlZXplIHNjcmVlbiB3aGVuIG1vZGFsL3BvcHVwIGlzIGFjdGl2ZSAqL31cbiAgICAgICAgICA8ZGl2IGlkPVwicGFnZS1vdmVybGF5XCI+PC9kaXY+XG5cbiAgICAgICAgICB7LyogSGVhZGVyICovfVxuICAgICAgICAgIDxIZWFkZXIgdXNlcj17dGhpcy5wcm9wcy51c2VyfSAvPlxuXG4gICAgICAgICAgey8qIFJvb21zIEJhbm5lciAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhbm5lci1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFubmVyLWNvbnRlbnQtY29udGFpbmVyXCI+XG5cbiAgICAgICAgICAgICAgey8qIEJhbm5lciBUYWJzICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS1vZmZzZXQtMSBjb2wtc20tMTAgdGFiYmVkLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJuYXYgbmF2LXRhYnMgbmF2LWNlbnRlcmVkIG5hdi1kYXJrXCI+XG4gICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgIDxhIGlkPVwidGFiLXB1YmxpY3Jvb21zXCIgZGF0YS10b2dnbGU9XCJ0YWJcIiBocmVmPVwiI3B1YmxpY3Jvb21zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtZ2xvYmUgaWNvbi1wYWRkaW5nXCI+PC9pPlB1YmxpYyBSb29tc1xuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImFjdGl2ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8YSBpZD1cInRhYi1teXJvb21zXCIgZGF0YS10b2dnbGU9XCJ0YWJcIiBocmVmPVwiI215cm9vbXNcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1ob21lIGljb24tcGFkZGluZ1wiPjwvaT5NeSBSb29tc1xuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDwvdWw+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYi1jb250ZW50XCI+XG5cbiAgICAgICAgICAgICAgICAgIHsvKiBQdWJsaWMgUm9vbXMgKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwicHVibGljcm9vbXNcIiBjbGFzc05hbWU9XCJ0YWItcGFuZSBmYWRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxQdWJsaWNSb29tcyAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIHsvKiBNeSBSb29tcyAqL31cbiAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJteXJvb21zXCIgY2xhc3NOYW1lPVwidGFiLXBhbmUgZmFkZSBpbiBhY3RpdmVcIj5cbiAgICAgICAgICAgICAgICAgICA8TXlSb29tcyByb29tcz17dGhpcy5wcm9wcy5yb29tc30gdXNlcj17dGhpcy5wcm9wcy51c2VyfSAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIE1haW4gQ29udGFpbmVyICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFpbi1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG5cbiAgICAgICAgICAgICAgey8qIE1lc3NhZ2UgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXBhZGRpbmdcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYWNlaG9sZGVyIHBsYWNlaG9sZGVyLW1lc3NhZ2VcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxhY2Vob2xkZXItY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1jaGV2cm9uLXVwIHBsYWNlaG9sZGVyLWljb25cIj48L2k+PGJyLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+WW91IG11c3QgZW50ZXIgYSByb29tIHRvIHBsYXkgYSBwbGF5bGlzdDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogUGxheWxpc3QgVGFiIE5hdmlnYXRpb24gKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLW9mZnNldC0xIGNvbC1zbS0xMCB0YWJiZWQtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJuYXYgbmF2LXRhYnMgbmF2LWNlbnRlcmVkXCI+XG4gICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiYWN0aXZlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxhIGlkPVwidGFiLWV4cGxvcmVcIiBkYXRhLXRvZ2dsZT1cInRhYlwiIGhyZWY9XCIjZXhwbG9yZVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLXJvY2tldCBpY29uLXBhZGRpbmdcIj48L2k+RXhwbG9yZVxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICA8UGxheWxpc3RUYWIgdHlwZT17XCJNeVBsYXlsaXN0XCJ9IHVzZXI9e3RoaXMucHJvcHMudXNlcn0gLz5cblxuICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJoaWRkZW5cIiBkYXRhLXRvZ2dsZT1cInRhYlwiIGhyZWY9XCIjZWRpdC1wbGF5bGlzdFwiIGlkPVwidGFiLWVkaXQtcGxheWxpc3RcIj48L2E+XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuXG4gICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImhpZGRlblwiIGRhdGEtdG9nZ2xlPVwidGFiXCIgaHJlZj1cIiN2aWV3LXBsYXlsaXN0XCIgaWQ9XCJ0YWItdmlldy1wbGF5bGlzdFwiPjwvYT5cbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPC91bD5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFiLWNvbnRlbnRcIj5cblxuICAgICAgICAgICAgICAgICAgey8qIEV4cGxvcmUgKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiZXhwbG9yZVwiIGNsYXNzTmFtZT1cInRhYi1wYW5lIGZhZGUgaW4gYWN0aXZlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxFeHBsb3JlIGV4cGxvcmU9e3RoaXMucHJvcHMuZXhwbG9yZX0gLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICB7LyogTXkgUGxheWxpc3RzICovfVxuICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cIm15cGxheWxpc3RzXCIgY2xhc3NOYW1lPVwidGFiLXBhbmUgZmFkZVwiPlxuICAgICAgICAgICAgICAgICAgICA8TXlQbGF5bGlzdHMgbXlQbGF5bGlzdHM9e3RoaXMuc3RhdGUubXlQbGF5bGlzdHN9IGhvbWU9e3RydWV9IC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgey8qIFVzZXIncyBvcGVuZWQgcGxheWxpc3QgKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiZWRpdC1wbGF5bGlzdFwiIGNsYXNzTmFtZT1cInRhYi1wYW5lIGZhZGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPEVkaXRPcGVuZWRQbGF5bGlzdCBteVBsYXlsaXN0cz17dGhpcy5zdGF0ZS5teVBsYXlsaXN0c30gdXNlcj17dGhpcy5wcm9wcy51c2VyfSAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIHsvKiBPcGVuZWQgcGxheWxpc3QgKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwidmlldy1wbGF5bGlzdFwiIGNsYXNzTmFtZT1cInRhYi1wYW5lIGZhZGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPFZpZXdPcGVuZWRQbGF5bGlzdCBteVBsYXlsaXN0cz17dGhpcy5zdGF0ZS5teVBsYXlsaXN0c30gdXNlcj17dGhpcy5wcm9wcy51c2VyfSAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIHsvKiBNb2RhbCBmb3IgY3JlYXRlIG5ldyBwbGF5bGlzdCBidXR0b24sIHRoZXJlIGlzIG5vIG1lZGlhIGVudHJ5IHdoZW4gdGhpcyBidXR0b24gaXMgY2xpY2tlZCAqL31cbiAgICAgICAgICAgICAgICAgIDxNb2RhbENyZWF0ZVBsYXlsaXN0IGtleT17XCJuZXdQbGF5bGlzdFwifSB1c2VyPXt0aGlzLnByb3BzLnVzZXJ9IGRhdGE9e251bGx9IHBvcz17bnVsbH0gLz5cblxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogRm9vdGVyIFB1c2ggKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdXNoXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBGb290ZXIgKi99XG4gICAgICAgIDxGb290ZXIgLz5cbiAgICAgICAgXG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBIb21lOyIsIi8qICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIENvcHlyaWdodCDCqSBcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBNYWluLUNvbXBvbmVudCBNZWRpYUVudHJ5XG5cbiAgICBBIGNvbXBvbmVudCBmb3IgZWFjaCBpbmRpdmlkYWwgbWVkaWEgZW50cnkuIEVhY2ggbWVkaWEgZW50cnkgaGFzIGEgdGh1bWJuYWlsIGFuZCB0aXRsZS5cbiAgICBFYWNoIEVudHJ5IGhhcyBhIGNhdGVnb3J5IHR5cGUgdG8gc2VlIHdoZXJlIHRoZSBtZWRpYSBlbnRyeSB3b3VsZCBiZWxvbmcgYXMgd2VsbCBhcyBhXG4gICAgbWVkaWEgdHlwZSB3aGljaCBpcyBlaXRoZXIgWW91dHViZSwgU291bmRjbG91ZCwgb3IgVmltZW8uIEVhY2ggY29tcG9uZW50XG4gICAgZGV0ZXJtaW5lcyB0aGUgY2xhc3MgbmFtZSBmb3IgdGhlIGRpdnMgYnkgY2hlY2tpbmcgdGhlIGNhdGVnb3J5IHR5cGVzIGZyb20gdGhlIGdpdmVuIHByb3BlcnRpZXNcbiAgICBvZiB0aGUgcGFyZW50IGNvbXBvbmVudHMgKEVpdGhlciBmcm9tIFNlYXJjaCBvciBRdWV1ZSkuXG5cbiAgICBAQ29tcG9uZW50czogIFRodW1ibmFpbFxuICAgICAgICAgICAgICAgICAgVGl0bGVcbiAgICAgICAgICAgICAgICAgIER1cmF0aW9uXG4gICAgICAgICAgICAgICAgICBNZWRpYUVudHJ5XG5cbiAgICBARXhwb3J0czogICAgIE1lZGlhRW50cnlcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBNb2RhbENyZWF0ZVBsYXlsaXN0ID0gcmVxdWlyZSgnLi9Nb2RhbENyZWF0ZVBsYXlsaXN0LmpzeCcpO1xuXG4vLyBGbHV4IEFjdGlvbnNcbnZhciBwbGF5bGlzdEFjdGlvbnMgPSByZXF1aXJlKCcuLi9mbHV4L2FjdGlvbnMvYWN0aW9ucycpO1xuXG4vLyBUaHVtYm5haWwgb2YgdGhlIG1lZGlhXG52YXIgVGh1bWJuYWlsID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjYXRlZ29yeURpdk5hbWU7XG4gICAgdmFyIGNhdGVnb3J5Q2xhc3NOYW1lO1xuICAgIHN3aXRjaCh0aGlzLnByb3BzLmNhdGVnb3J5VHlwZSkge1xuICAgICAgY2FzZSBDQVRFR09SWU9GTUVESUEuUVVFVUU6XG4gICAgICAgIGNhdGVnb3J5Q2xhc3NOYW1lID0gJ21lZGlhLWltZyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBDQVRFR09SWU9GTUVESUEuUExBWUxJU1Q6XG4gICAgICAgIGNhdGVnb3J5Q2xhc3NOYW1lID0gJ21lZGlhLWltZyc7XG4gICAgICAgIGJyZWFrOyAgXG4gICAgICBjYXNlIENBVEVHT1JZT0ZNRURJQS5TRUFSQ0g6XG4gICAgICAgIGNhdGVnb3J5Q2xhc3NOYW1lID0gJ3NlYXJjaC1tZWRpYS1pbWcnO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIEVSUk9SLCBObyBDYXRlZ29yeSB0eXBlXG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8aW1nIGNsYXNzTmFtZT17Y2F0ZWdvcnlDbGFzc05hbWV9IHNyYz17dGhpcy5wcm9wcy50aHVtYm5haWx9IC8+XG4gICAgKTtcbiAgfVxufSk7XG5cbi8vIE1lZGlhJ3MgdGl0bGUgY29tcG9uZW50XG52YXIgVGl0bGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNhdGVnb3J5RGl2TmFtZTtcbiAgICB2YXIgY2F0ZWdvcnlDbGFzc05hbWU7XG4gICAgc3dpdGNoKHRoaXMucHJvcHMuY2F0ZWdvcnlUeXBlKSB7XG4gICAgICBjYXNlIENBVEVHT1JZT0ZNRURJQS5RVUVVRTpcbiAgICAgICAgY2F0ZWdvcnlDbGFzc05hbWUgPSAnbWVkaWEtdGl0bGUgZWxsaXBzZXMnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ0FURUdPUllPRk1FRElBLlBMQVlMSVNUOlxuICAgICAgICBjYXRlZ29yeUNsYXNzTmFtZSA9ICdtZWRpYS10aXRsZSBlbGxpcHNlcyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBDQVRFR09SWU9GTUVESUEuU0VBUkNIOlxuICAgICAgICBjYXRlZ29yeUNsYXNzTmFtZSA9ICdzZWFyY2gtbWVkaWEtdGl0bGUgZWxsaXBzZXMnO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIEVSUk9SLCBObyBDYXRlZ29yeSB0eXBlXG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2F0ZWdvcnlDbGFzc05hbWV9PlxuICAgICAgICB7dGhpcy5wcm9wcy50aXRsZX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG4vLyBNZWRpYSdzIGFydGlzdCBjb21wb25lbnRcbnZhciBBcnRpc3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNhdGVnb3J5RGl2TmFtZTtcbiAgICB2YXIgY2F0ZWdvcnlDbGFzc05hbWU7XG4gICAgc3dpdGNoKHRoaXMucHJvcHMuY2F0ZWdvcnlUeXBlKSB7XG4gICAgICBjYXNlIENBVEVHT1JZT0ZNRURJQS5RVUVVRTpcbiAgICAgICAgY2F0ZWdvcnlDbGFzc05hbWUgPSAnbWVkaWEtYXJ0aXN0IGVsbGlwc2VzJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIENBVEVHT1JZT0ZNRURJQS5QTEFZTElTVDpcbiAgICAgICAgY2F0ZWdvcnlDbGFzc05hbWUgPSAnbWVkaWEtYXJ0aXN0IGVsbGlwc2VzJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIENBVEVHT1JZT0ZNRURJQS5TRUFSQ0g6XG4gICAgICAgIGNhdGVnb3J5Q2xhc3NOYW1lID0gJ3NlYXJjaC1tZWRpYS1hcnRpc3QgZWxsaXBzZXMnO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIEVSUk9SLCBObyBDYXRlZ29yeSB0eXBlXG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2F0ZWdvcnlDbGFzc05hbWV9PlxuICAgICAgICB7dGhpcy5wcm9wcy5hcnRpc3R9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KVxuXG4vLyBNZWRpYSdzIHR5cGUgY29tcG9uZW50XG52YXIgVHlwZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY2F0ZWdvcnlDbGFzc05hbWU7XG4gICAgdmFyIG1lZGlhVHlwZUljb247XG4gICAgc3dpdGNoKHRoaXMucHJvcHMuY2F0ZWdvcnlUeXBlKSB7XG4gICAgICBjYXNlIENBVEVHT1JZT0ZNRURJQS5RVUVVRTpcbiAgICAgICAgY2F0ZWdvcnlDbGFzc05hbWUgPSAnbWVkaWEtdHlwZSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBDQVRFR09SWU9GTUVESUEuUExBWUxJU1Q6XG4gICAgICAgIGNhdGVnb3J5Q2xhc3NOYW1lID0gJ21lZGlhLXR5cGUnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ0FURUdPUllPRk1FRElBLlNFQVJDSDpcbiAgICAgICAgY2F0ZWdvcnlDbGFzc05hbWUgPSAnc2VhcmNoLW1lZGlhLXR5cGUnO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIEVSUk9SLCBObyBDYXRlZ29yeSB0eXBlXG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHN3aXRjaCh0aGlzLnByb3BzLnR5cGUpIHtcbiAgICAgIGNhc2UgTUVESUFUWVBFUy5ZT1VUVUJFOlxuICAgICAgICBtZWRpYVR5cGVJY29uID0gJ2ZhIGZhLXlvdXR1YmUtcGxheSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBNRURJQVRZUEVTLlNPVU5EQ0xPVUQ6XG4gICAgICAgIG1lZGlhVHlwZUljb24gPSAnZmEgZmEtc291bmRjbG91ZCc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBNRURJQVRZUEVTLlZJTUVPOlxuICAgICAgICBtZWRpYVR5cGVJY29uID0gJ2ZhIGZhLXZpbWVvJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBFUlJPUiwgTm8gbWVkaWEgdHlwZVxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4oXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2F0ZWdvcnlDbGFzc05hbWV9PjxpIGNsYXNzTmFtZT17bWVkaWFUeXBlSWNvbn0+PC9pPjwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG4vLyBUT0RPOiBUQkQgaWYgZHVyYXRpb25zIG5lZWQgdG8gYmUgaW1wbGVtZW50ZWQgb3Igbm90XG4vLyBNZWRpYSdzIER1cmF0aW9uIGNvbXBvbmVudFxudmFyIER1cmF0aW9uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nbWVkaWEtZHVyYXRpb24nPlxuICAgICAgICB7dGhpcy5wcm9wcy5kdXJhdGlvbn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG4vLyBFYWNoIGluZGl2aWR1YWwgcGxheWxpc3QgZW50cnkgaW4gdGhlIGRyb3Bkb3duIGxpc3RcbnZhciBQbGF5bGlzdEVudHJ5ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBhZGRUb1BsYXlsaXN0OiBmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZyhcIkFkZGluZyB0byBleGlzdGluZyBwbGF5bGlzdFwiKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnByb3BzLnBsYXlsaXN0Ll9pZCk7XG4gICAgY29uc29sZS5sb2codGhpcy5wcm9wcy5kYXRhKTtcbiAgICAkLmFqYXgoe1xuICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICB1cmw6IFwiL3BsYXlsaXN0L3B1c2gvbWVkaWFFbnRyeVwiLFxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIG1lZGlhRGF0YTogdGhpcy5wcm9wcy5kYXRhLFxuICAgICAgICAgIGlkOiB0aGlzLnByb3BzLnBsYXlsaXN0Ll9pZCxcbiAgICAgICAgICBmaXJzdEVudHJ5OiB0aGlzLnByb3BzLnBsYXlsaXN0Lm1lZGlhRW50cmllc1swXSAgXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlN1Y2Nlc3M6IFVwZGF0aW5nIHBsYXlsaXN0XCIpO1xuICAgICAgICBwbGF5bGlzdEFjdGlvbnMudXBkYXRlUGxheWxpc3QoZGF0YS51cGRhdGVkUGxheWxpc3QpO1xuICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgZXJyb3I6IGZ1bmN0aW9uKHhociwgc3RhdHVzLCBlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVSUk9SOiBBZGQgdG8gcGxheWxpc3QgZXJyb3JlZCBvdXRcIiwgc3RhdHVzLCBlcnIudG9TdHJpbmcoKSk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICB9KTtcblxuICAgIC8vIHNvY2tldC5lbWl0KCdGcm9tIENsaWVudDogQWRkIHRvIGV4aXN0aW5nIHBsYXlsaXN0Jywge1xuICAgIC8vICAgbWVkaWFEYXRhOiB0aGlzLnByb3BzLmRhdGEsXG4gICAgLy8gICBpZDogdGhpcy5wcm9wcy5wbGF5bGlzdC5faWQsXG4gICAgLy8gICBmaXJzdEVudHJ5OiB0aGlzLnByb3BzLnBsYXlsaXN0Lm1lZGlhRW50cmllc1swXVxuICAgIC8vIH0pO1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPGxpPjxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBvbkNsaWNrPXt0aGlzLmFkZFRvUGxheWxpc3R9Pnt0aGlzLnByb3BzLnBsYXlsaXN0Lm5hbWV9PC9hPjwvbGk+ICAgICAgXG4gICAgKVxuICB9XG59KTtcblxuLy8gRWFjaCBkcm9wZG93biBmb3IgZXZlcnkgbWVkaWEgZW50cnlcbnZhciBQbGF5bGlzdERyb3Bkb3duID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBhZGRUb05ld1BsYXlsaXN0OiBmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZyhcIkNyZWF0aW5nIG5ldyBwbGF5bGlzdCB3aXRoIG1lZGlhXCIpO1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHBsYXlsaXN0RW50cmllcyA9IFtdO1xuICAgIHZhciBtb2RhbElkID0gXCIjY3JlYXRlLXBsYXlsaXN0LVwiICsgdGhpcy5wcm9wcy5wb3M7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5teVBsYXlsaXN0cyAhPT0gdW5kZWZpbmVkICYmIHRoaXMucHJvcHMubXlQbGF5bGlzdHMgIT09IG51bGwpIHtcbiAgICAgIC8vIFNldHMgdGhlIHBsYXlsaXN0cyBpbiB0aGUgZHJvcGRvd25cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wcm9wcy5teVBsYXlsaXN0cy5sZW5ndGg7ICsraSkge1xuICAgICAgICBwbGF5bGlzdEVudHJpZXMucHVzaChcbiAgICAgICAgICA8UGxheWxpc3RFbnRyeSBrZXk9e2l9IGRhdGE9e3RoaXMucHJvcHMuZGF0YX0gcGxheWxpc3Q9e3RoaXMucHJvcHMubXlQbGF5bGlzdHNbaV19IC8+XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDx1bCBjbGFzc05hbWU9XCJkcm9wZG93bi1tZW51IGRyb3Bkb3duLW1lbnUtcmlnaHRcIj5cbiAgICAgICAgPGxpIGNsYXNzTmFtZT1cImRyb3Bkb3duLWhlYWRlclwiPkFkZCBUbzwvbGk+XG4gICAgICAgIHtwbGF5bGlzdEVudHJpZXN9XG4gICAgICAgIDxsaSByb2xlPVwic2VwYXJhdG9yXCIgY2xhc3NOYW1lPVwiZGl2aWRlclwiPjwvbGk+XG4gICAgICAgIDxsaT48YSBkYXRhLXRvZ2dsZT1cIm1vZGFsXCIgZGF0YS10YXJnZXQ9e21vZGFsSWR9IG9uQ2xpY2s9e3RoaXMuYWRkVG9OZXdQbGF5bGlzdH0+QWRkIHRvIE5ldyBQbGF5bGlzdDwvYT48L2xpPlxuICAgICAgPC91bD5cbiAgICApO1xuICB9XG59KTtcblxuLy8gTUFJTiBDT01QT05FTlQ6IEVhY2ggaW5kaXZpZHVhbCBtZWRpYSBlbnRyeSBpbiB0aGUgbGlzdFxudmFyIE1lZGlhRW50cnkgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIC8vIEVWRU5UIEhBTkRMRVI6IFdoZW4gdGhlIGFkZCB0byBxdWV1ZSBidXR0b24gaXMgY2xpY2tlZCwgYWRkcyB0aGUgbWVkaWEgdG8gdGhlIHF1ZXVlLlxuICBhZGRUb1F1ZXVlOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgbWVkaWFFbnRyeSA9IHtcbiAgICAgIG1lZGlhSWQ6IHRoaXMucHJvcHMubWVkaWFJZCxcbiAgICAgIG1lZGlhVHlwZTogdGhpcy5wcm9wcy5tZWRpYVR5cGUsXG4gICAgICB0aHVtYm5haWw6IHRoaXMucHJvcHMudGh1bWJuYWlsLFxuICAgICAgdGl0bGU6IHRoaXMucHJvcHMudGl0bGUsXG4gICAgICBhcnRpc3Q6IHRoaXMucHJvcHMuYXJ0aXN0LFxuICAgICAgaWZNZWRpYUNhcmRBZGRlZDogdHJ1ZVxuICAgIH1cbiAgICBzb2NrZXQuZW1pdCgnRnJvbSBDbGllbnQ6IFB1c2ggaW50byBxdWV1ZScsIG1lZGlhRW50cnkpO1xuICB9LFxuXG4gIC8vIEVWRU5UIEhBTkRMRVI6IFdoZW4gdGhlIHBsYXkgYnV0dG9uIGlzIGNsaWNrZWQsIHBsYXlzIHRoZSBtZWRpYSBlbnRyeSBvbnRvIHRoZSBtZWRpYSBwbGF5ZXJcbiAgcGxheU1lZGlhRW50cnk6IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLnByb3BzLmNhdGVnb3J5VHlwZSA9PSBDQVRFR09SWU9GTUVESUEuU0VBUkNIIHx8IHRoaXMucHJvcHMuY2F0ZWdvcnlUeXBlID09IENBVEVHT1JZT0ZNRURJQS5QTEFZTElTVCkge1xuICAgICAgdmFyIG1lZGlhRW50cnkgPSB7XG4gICAgICAgIG1lZGlhSWQ6IHRoaXMucHJvcHMubWVkaWFJZCxcbiAgICAgICAgbWVkaWFUeXBlOiB0aGlzLnByb3BzLm1lZGlhVHlwZSxcbiAgICAgICAgdGh1bWJuYWlsOiB0aGlzLnByb3BzLnRodW1ibmFpbCxcbiAgICAgICAgdGl0bGU6IHRoaXMucHJvcHMudGl0bGUsXG4gICAgICAgIGFydGlzdDogdGhpcy5wcm9wcy5hcnRpc3QsXG4gICAgICAgIGlmTWVkaWFDYXJkQWRkZWQ6IHRydWVcbiAgICAgIH1cbiAgICAgIHNvY2tldC5lbWl0KCdGcm9tIENsaWVudDogUGxheSBuZXcgbWVkaWEgZW50cnknLCBtZWRpYUVudHJ5KTsgIFxuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLnByb3BzLmNhdGVnb3J5VHlwZSA9PSBDQVRFR09SWU9GTUVESUEuUVVFVUUpIHtcbiAgICAgIHZhciBxdWV1ZUVudHJ5ID0ge1xuICAgICAgICBtZWRpYUlkOiB0aGlzLnByb3BzLm1lZGlhSWQsXG4gICAgICAgIG1lZGlhVHlwZTogdGhpcy5wcm9wcy5tZWRpYVR5cGUsXG4gICAgICAgIHRodW1ibmFpbDogdGhpcy5wcm9wcy50aHVtYm5haWwsXG4gICAgICAgIHRpdGxlOiB0aGlzLnByb3BzLnRpdGxlLFxuICAgICAgICBhcnRpc3Q6IHRoaXMucHJvcHMuYXJ0aXN0LFxuICAgICAgICBpZk1lZGlhQ2FyZEFkZGVkOiB0cnVlLFxuICAgICAgICBwb3NJblF1ZXVlOiB0aGlzLnByb3BzLnBvc1xuICAgICAgfVxuICAgICAgc29ja2V0LmVtaXQoJ0Zyb20gQ2xpZW50OiBQbGF5IG5ldyBtZWRpYSBlbnRyeSBmcm9tIHF1ZXVlJywgcXVldWVFbnRyeSk7ICAgXG4gICAgfVxuICB9LFxuXG4gIC8vIEVWRU5UIEhBTkRMRVI6IFdoZW4gdGhlIGRlbGV0ZSBidXR0b24gaXMgY2xpY2tlZCwgcmVtb3ZlcyB0aGUgbWVkaWEgZW50cnkgZnJvbSBxdWV1ZVxuICBkZWxldGVNZWRpYUVudHJ5OiBmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZyhcIkRlbGV0ZSBNZWRpYSBFbnRyeSBmcm9tIFF1ZXVlXCIpO1xuICAgIHZhciBtZWRpYUVudHJ5ID0ge1xuICAgICAgbWVkaWFJZDogdGhpcy5wcm9wcy5tZWRpYUlkLFxuICAgICAgbWVkaWFUeXBlOiB0aGlzLnByb3BzLm1lZGlhVHlwZSxcbiAgICAgIHRodW1ibmFpbDogdGhpcy5wcm9wcy50aHVtYm5haWwsXG4gICAgICB0aXRsZTogdGhpcy5wcm9wcy50aXRsZSxcbiAgICAgIGFydGlzdDogdGhpcy5wcm9wcy5hcnRpc3QsXG4gICAgICBpZk1lZGlhQ2FyZEFkZGVkOiB0cnVlLFxuICAgICAgcG9zSW5RdWV1ZTogdGhpcy5wcm9wcy5wb3NcbiAgICB9XG4gICAgc29ja2V0LmVtaXQoJ0Zyb20gQ2xpZW50OiBEZWxldGUgbWVkaWEgZW50cnkgZnJvbSBxdWV1ZScsIG1lZGlhRW50cnkpO1xuICB9LFxuXG4gIC8vIEVWRU5UIEhBTkRMRVI6IE1vdmVzIG1lZGlhIGVudHJ5IHRvIHRoZSBmcm9udCBvZiB0aGUgcXVldWUgYXMgYSBwbGF5IG5leHQgbWVkaWFcbiAgbW92ZVRvRnJvbnRPZlRoZVF1ZXVlOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgbWVkaWFFbnRyeSA9IHtcbiAgICAgIG1lZGlhSWQ6IHRoaXMucHJvcHMubWVkaWFJZCxcbiAgICAgIG1lZGlhVHlwZTogdGhpcy5wcm9wcy5tZWRpYVR5cGUsXG4gICAgICB0aHVtYm5haWw6IHRoaXMucHJvcHMudGh1bWJuYWlsLFxuICAgICAgdGl0bGU6IHRoaXMucHJvcHMudGl0bGUsXG4gICAgICBhcnRpc3Q6IHRoaXMucHJvcHMuYXJ0aXN0LFxuICAgICAgaWZNZWRpYUNhcmRBZGRlZDogdHJ1ZSxcbiAgICAgIHBvc0luUXVldWU6IHRoaXMucHJvcHMucG9zXG4gICAgfVxuICAgIHNvY2tldC5lbWl0KCdGcm9tIENsaWVudDogTW92ZSBtZWRpYSBlbnRyeSB0byBmcm9udCBvZiBxdWV1ZScsIG1lZGlhRW50cnkpO1xuICB9LFxuXG4gIC8vIEVWRU5UIEhBTkRMRVI6IERlbGV0ZXMgcGxheWxpc3QgZW50cnkgaW4gdGhlIG9wZW5lZCBlZGl0IHBsYXlsaXN0XG4gIGRlbGV0ZVBsYXlsaXN0RW50cnk6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMucHJvcHMuZGVsZXRlRW50cnkodGhpcy5wcm9wcy5wb3MpO1xuICB9LFxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIC8vIFRoaXMgbmVlZHMgdG8gYmUgcmV0b29sdGlwcGVkIGJlY2F1c2UgdGhlIG1lZGlhIGVudHJpZXMgYXJlIG5vdCByZW5kZXJlZCB3aGVuIHRoZSBzaXRlIGxvYWRzLlxuICAgICQodGhpcy5pY29uMSkudG9vbHRpcCgpO1xuICAgICQodGhpcy5pY29uMikudG9vbHRpcCgpO1xuICAgICQodGhpcy5pY29uMykudG9vbHRpcCgpO1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNhdGVnb3J5RGl2TmFtZTtcbiAgICB2YXIgY2F0ZWdvcnlDbGFzc05hbWU7XG5cbiAgICAvLyBSZW5kZXJzIHRoZSBNZWRpYSBlbnRyeSB0byB0aGUgY29ycmVjdCBjYXRlZ29yeS5cbiAgICBzd2l0Y2godGhpcy5wcm9wcy5jYXRlZ29yeVR5cGUpIHtcbiAgICAgIC8vIE1lZGlhIEVudHJ5IHRoYXQgaXMgaW4gdGhlIFF1ZXVlIGNvbXBvbmVudFxuICAgICAgY2FzZSBDQVRFR09SWU9GTUVESUEuUVVFVUU6XG4gICAgICAgIHZhciBxdWV1ZU1lZGlhRW50cnlJZCA9IFwiLXF1ZXVlLW1lZGlhLWVudHJ5LWlkXCI7XG4gICAgICAgIHZhciBxdWV1ZU1lZGlhQ2FyZENsYXNzTmFtZSA9IFwibWVkaWEtY2FyZCBncmFiYmFibGVcIjtcbiAgICAgICAgdmFyIGljb25DbGFzc05hbWUgPSBcImljb24tYnRuXCI7XG4gICAgICAgIHZhciBkZWxldGVCdXR0b24gPSBbXTtcblxuICAgICAgICAvLyBBZGRzIHRoZSBtZWRpYS1jYXJkLWFkZGVkIGNsYXNzIGlmIHRoZSBtZWRpYSBlbnRyeSB3YXMgYWRkZWQgaW5kaXZpZHVhbGx5XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmlmTWVkaWFDYXJkQWRkZWQgPT09IHRydWUpIHtcbiAgICAgICAgICBxdWV1ZU1lZGlhQ2FyZENsYXNzTmFtZSArPSBcIiBtZWRpYS1jYXJkLWFkZGVkXCI7XG4gICAgICAgICAgaWNvbkNsYXNzTmFtZSArPSBcIi1ibHVlLWxpdGVcIjtcbiAgICAgICAgICBkZWxldGVCdXR0b24ucHVzaCAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1lZGlhLWNhcmQtYWRkZWQtY29ybmVyLWNvbnRhaW5lclwiPjxkaXYgY2xhc3NOYW1lPVwibWVkaWEtY2FyZC1hZGRlZC1jb3JuZXJcIj48L2Rpdj48L2Rpdj5cbiAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwibWVkaWEtY2FyZC1hZGRlZC1wbHVzIGljb24tYnRuLXdoaXRlXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIG9uQ2xpY2s9e3RoaXMuZGVsZXRlTWVkaWFFbnRyeX0+KzwvYT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBpbiB0aGUgZnJvbnQgb2YgdGhlIHF1ZXVlLCByZW5kZXJzIGEgbWVkaWEgZW50cnkgdGhhdCB3b3VsZCBwbGF5IG5leHRcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucG9zID09PSBQTEFZTkVYVE1FRElBRU5UUllQT1MpIHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBpZD17dGhpcy5wcm9wcy5wb3MgKyBxdWV1ZU1lZGlhRW50cnlJZH0gY2xhc3NOYW1lPXtxdWV1ZU1lZGlhQ2FyZENsYXNzTmFtZX0+XG4gICAgICAgICAgICAgIHtkZWxldGVCdXR0b259XG4gICAgICAgICAgICAgIDxUaHVtYm5haWwgdGh1bWJuYWlsPXt0aGlzLnByb3BzLnRodW1ibmFpbH0gY2F0ZWdvcnlUeXBlPXt0aGlzLnByb3BzLmNhdGVnb3J5VHlwZX0gLz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZWRpYS1uZXh0XCI+UExBWUlORyBORVhUOjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm51bWJlclwiPnt0aGlzLnByb3BzLnBvcyArIDF9PC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZWRpYS10ZXh0LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxUaXRsZSB0aXRsZT17dGhpcy5wcm9wcy50aXRsZX0gY2F0ZWdvcnlUeXBlPXt0aGlzLnByb3BzLmNhdGVnb3J5VHlwZX0gLz5cbiAgICAgICAgICAgICAgICA8QXJ0aXN0IGFydGlzdD17dGhpcy5wcm9wcy5hcnRpc3R9IGNhdGVnb3J5VHlwZT17dGhpcy5wcm9wcy5jYXRlZ29yeVR5cGV9IC8+XG4gICAgICAgICAgICAgICAgPFR5cGUgdHlwZT17dGhpcy5wcm9wcy5tZWRpYVR5cGV9IGNhdGVnb3J5VHlwZT17dGhpcy5wcm9wcy5jYXRlZ29yeVR5cGV9IC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZWRpYS1pY29uLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZWRpYS1pY29uXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e2ljb25DbGFzc05hbWV9IGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBvbkNsaWNrPXt0aGlzLnBsYXlNZWRpYUVudHJ5fT48ZGl2IGNsYXNzTmFtZT1cIm1lZGlhLWljb25cIj48aSBjbGFzc05hbWU9XCJmYSBmYS1wbGF5XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPjwvZGl2PjwvYT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRXZlcnkgb3RoZXIgbWVkaWEgZW50cnkgaW4gdGhlIHF1ZXVlXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGRpdiBpZD17dGhpcy5wcm9wcy5wb3MgKyBxdWV1ZU1lZGlhRW50cnlJZH0gY2xhc3NOYW1lPXtxdWV1ZU1lZGlhQ2FyZENsYXNzTmFtZX0+XG4gICAgICAgICAgICB7ZGVsZXRlQnV0dG9ufVxuICAgICAgICAgICAgPFRodW1ibmFpbCB0aHVtYm5haWw9e3RoaXMucHJvcHMudGh1bWJuYWlsfSBjYXRlZ29yeVR5cGU9e3RoaXMucHJvcHMuY2F0ZWdvcnlUeXBlfSAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJudW1iZXJcIj57dGhpcy5wcm9wcy5wb3MgKyAxfTwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1lZGlhLXRleHQtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgIDxUaXRsZSB0aXRsZT17dGhpcy5wcm9wcy50aXRsZX0gY2F0ZWdvcnlUeXBlPXt0aGlzLnByb3BzLmNhdGVnb3J5VHlwZX0gLz5cbiAgICAgICAgICAgICAgPEFydGlzdCBhcnRpc3Q9e3RoaXMucHJvcHMuYXJ0aXN0fSBjYXRlZ29yeVR5cGU9e3RoaXMucHJvcHMuY2F0ZWdvcnlUeXBlfSAvPlxuICAgICAgICAgICAgICA8VHlwZSB0eXBlPXt0aGlzLnByb3BzLm1lZGlhVHlwZX0gY2F0ZWdvcnlUeXBlPXt0aGlzLnByb3BzLmNhdGVnb3J5VHlwZX0gLz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZWRpYS1pY29uLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVkaWEtaWNvblwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT17aWNvbkNsYXNzTmFtZX0gaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIG9uQ2xpY2s9e3RoaXMubW92ZVRvRnJvbnRPZlRoZVF1ZXVlfT48ZGl2IGNsYXNzTmFtZT1cIm1lZGlhLWljb25cIj48aSBjbGFzc05hbWU9XCJmYSBmYS1jaGV2cm9uLXVwXCIgZGF0YS10b2dnbGU9XCJ0b29sdGlwXCIgdGl0bGU9XCJNb3ZlIHRvIFRvcFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT48L2Rpdj48L2E+XG4gICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPXtpY29uQ2xhc3NOYW1lfSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgb25DbGljaz17dGhpcy5wbGF5TWVkaWFFbnRyeX0+PGRpdiBjbGFzc05hbWU9XCJtZWRpYS1pY29uXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtcGxheVwiIGRhdGEtdG9nZ2xlPVwidG9vbHRpcFwiIHRpdGxlPVwiUGxheSBOb3dcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+PC9kaXY+PC9hPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApOyBcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIC8vIE1lZGlhIEVudHJ5IHRoYXQgaXMgaW4gdGhlIHBsYXlsaXN0IGVudHJ5IGNvbXBvbmVudFxuICAgICAgY2FzZSBDQVRFR09SWU9GTUVESUEuUExBWUxJU1Q6XG4gICAgICAgIHZhciBkcm9wZG93biA9IFtdO1xuICAgICAgICB2YXIgbWVkaWFEYXRhID0ge1xuICAgICAgICAgIGFydGlzdDogdGhpcy5wcm9wcy5hcnRpc3QsXG4gICAgICAgICAgbWVkaWFJZDogdGhpcy5wcm9wcy5tZWRpYUlkLFxuICAgICAgICAgIG1lZGlhVHlwZTogdGhpcy5wcm9wcy5tZWRpYVR5cGUsXG4gICAgICAgICAgdGh1bWJuYWlsOiB0aGlzLnByb3BzLnRodW1ibmFpbCxcbiAgICAgICAgICB0aXRsZTogdGhpcy5wcm9wcy50aXRsZVxuICAgICAgICAgIC8vIFRPRE86IFRoZSBzZWFyY2ggZW50cnkgZG9lcyBub3QgaGF2ZSB0aGUgc2FtZSBkYiBfaWQuIE5lZWQgdG8gZmluZCBhIHdheSB0byBhZGQgbWVkaWEgZW50cmllcyB3aXRob3V0IGR1cGxpY2F0ZXNcbiAgICAgICAgICAvLyBfaWQ6IHRoaXMucHJvcHMuX2lkXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gSWYgYSB1c2VyIGlzIGxvZ2dlZCBpbiwgdGhlIGRyb3Bkb3duIGFwcGVhcnMgICAgICAgIFxuICAgICAgICBkcm9wZG93bi5wdXNoKFxuICAgICAgICAgIDxkaXYga2V5PXt0aGlzLnByb3BzLnBvc30gY2xhc3NOYW1lPVwibWVkaWEtaWNvblwiPlxuICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiaWNvbi1idG4tYmx1ZS1saXRlIGRyb3Bkb3duLXRvZ2dsZVwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIj48aSBjbGFzc05hbWU9XCJmYSBmYS1saXN0LXVsXCIgcmVmPXsocmVmKSA9PiB0aGlzLmljb24zID0gcmVmfSBkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIiB0aXRsZT1cIkFkZCB0byBQbGF5bGlzdFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT48L2E+XG4gICAgICAgICAgICA8UGxheWxpc3REcm9wZG93biBteVBsYXlsaXN0cz17dGhpcy5wcm9wcy5teVBsYXlsaXN0c30gZGF0YT17bWVkaWFEYXRhfSBwb3M9e3RoaXMucHJvcHMucG9zfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuXG4gICAgICAgIC8vIElmIHRoZSBwbGF5bGlzdCBpcyBhIGxpa2VkIG9uZVxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vd25lciA9PT0gZmFsc2UpIHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNiBjb2wtc20tMTIgY29sLXBhZGRpbmdcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGF5bGlzdC1tZWRpYS1jYXJkXCI+XG4gICAgICAgICAgICAgICAgPFRodW1ibmFpbCB0aHVtYm5haWw9e3RoaXMucHJvcHMudGh1bWJuYWlsfSBjYXRlZ29yeVR5cGU9e3RoaXMucHJvcHMuY2F0ZWdvcnlUeXBlfSAvPlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZWRpYS10ZXh0LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgPFRpdGxlIHRpdGxlPXt0aGlzLnByb3BzLnRpdGxlfSBjYXRlZ29yeVR5cGU9e3RoaXMucHJvcHMuY2F0ZWdvcnlUeXBlfSAvPlxuICAgICAgICAgICAgICAgICAgPEFydGlzdCBhcnRpc3Q9e3RoaXMucHJvcHMuYXJ0aXN0fSBjYXRlZ29yeVR5cGU9e3RoaXMucHJvcHMuY2F0ZWdvcnlUeXBlfSAvPlxuICAgICAgICAgICAgICAgICAgPFR5cGUgdHlwZT17dGhpcy5wcm9wcy5tZWRpYVR5cGV9IGNhdGVnb3J5VHlwZT17dGhpcy5wcm9wcy5jYXRlZ29yeVR5cGV9IC8+XG5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVkaWEtaWNvbi1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZWRpYS1pY29uXCI+PGEgY2xhc3NOYW1lPVwiaWNvbi1idG5cIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgb25DbGljaz17dGhpcy5hZGRUb1F1ZXVlfT48aSBjbGFzc05hbWU9XCJmYSBmYS1wbHVzXCIgcmVmPXsocmVmKSA9PiB0aGlzLmljb24xID0gcmVmfSBkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIiB0aXRsZT1cIkFkZCB0byBRdWV1ZVwiPjwvaT48L2E+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVkaWEtaWNvblwiPjxhIGNsYXNzTmFtZT1cImljb24tYnRuXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIG9uQ2xpY2s9e3RoaXMucGxheU1lZGlhRW50cnl9PjxpIGNsYXNzTmFtZT1cImZhIGZhLXBsYXlcIiByZWY9eyhyZWYpID0+IHRoaXMuaWNvbjIgPSByZWZ9IGRhdGEtdG9nZ2xlPVwidG9vbHRpcFwiIHRpdGxlPVwiUGxheSBOb3dcIj48L2k+PC9hPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7ZHJvcGRvd259XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxNb2RhbENyZWF0ZVBsYXlsaXN0IFxuICAgICAgICAgICAgICAgICAga2V5PXt0aGlzLnByb3BzLnBvc30gXG4gICAgICAgICAgICAgICAgICB1c2VyPXt0aGlzLnByb3BzLnVzZXJ9XG4gICAgICAgICAgICAgICAgICBkYXRhPXttZWRpYURhdGF9IFxuICAgICAgICAgICAgICAgICAgcG9zPXt0aGlzLnByb3BzLnBvc30gLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRlbGV0ZUluZGljYXRvckNsYXNzID0gXCIgXCI7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRlbGV0ZUluZGljYXRvciA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBkZWxldGVJbmRpY2F0b3JDbGFzcyA9IFwiIG1lZGlhLWNhcmQtYWRkZWQgXCI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiB0aGUgcGxheWxpc3Qgd2FzIG1hZGUgYnkgdGhlIGN1cnJlbnQgdXNlclxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImNvbC1tZC02IGNvbC1zbS0xMiBjb2wtcGFkZGluZyBlZGl0LXBsYXlsaXN0LWNhcmRcIn0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJwbGF5bGlzdC1tZWRpYS1jYXJkXCIgKyBkZWxldGVJbmRpY2F0b3JDbGFzcyArIFwiZ3JhYmJhYmxlXCJ9PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1lZGlhLWNhcmQtYWRkZWQtY29ybmVyLWNvbnRhaW5lclwiPjxkaXYgY2xhc3NOYW1lPVwibWVkaWEtY2FyZC1hZGRlZC1jb3JuZXJcIj48L2Rpdj48L2Rpdj5cbiAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwibWVkaWEtY2FyZC1hZGRlZC1wbHVzIGljb24tYnRuLXdoaXRlXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIG9uQ2xpY2s9e3RoaXMuZGVsZXRlUGxheWxpc3RFbnRyeX0+KzwvYT5cbiAgICAgICAgICAgICAgPFRodW1ibmFpbCB0aHVtYm5haWw9e3RoaXMucHJvcHMudGh1bWJuYWlsfSBjYXRlZ29yeVR5cGU9e3RoaXMucHJvcHMuY2F0ZWdvcnlUeXBlfSAvPlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVkaWEtdGV4dC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8VGl0bGUgdGl0bGU9e3RoaXMucHJvcHMudGl0bGV9IGNhdGVnb3J5VHlwZT17dGhpcy5wcm9wcy5jYXRlZ29yeVR5cGV9IC8+XG4gICAgICAgICAgICAgICAgPEFydGlzdCBhcnRpc3Q9e3RoaXMucHJvcHMuYXJ0aXN0fSBjYXRlZ29yeVR5cGU9e3RoaXMucHJvcHMuY2F0ZWdvcnlUeXBlfSAvPlxuICAgICAgICAgICAgICAgIDxUeXBlIHR5cGU9e3RoaXMucHJvcHMubWVkaWFUeXBlfSBjYXRlZ29yeVR5cGU9e3RoaXMucHJvcHMuY2F0ZWdvcnlUeXBlfSAvPlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZWRpYS1pY29uLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZWRpYS1pY29uXCI+PGEgY2xhc3NOYW1lPVwiaWNvbi1idG4tYmx1ZS1saXRlXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIG9uQ2xpY2s9e3RoaXMuYWRkVG9RdWV1ZX0+PGkgY2xhc3NOYW1lPVwiZmEgZmEtcGx1c1wiIHJlZj17KHJlZikgPT4gdGhpcy5pY29uMSA9IHJlZn0gZGF0YS10b2dnbGU9XCJ0b29sdGlwXCIgdGl0bGU9XCJBZGQgdG8gUXVldWVcIj48L2k+PC9hPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZWRpYS1pY29uXCI+PGEgY2xhc3NOYW1lPVwiaWNvbi1idG4tYmx1ZS1saXRlXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIG9uQ2xpY2s9e3RoaXMucGxheU1lZGlhRW50cnl9PjxpIGNsYXNzTmFtZT1cImZhIGZhLXBsYXlcIiByZWY9eyhyZWYpID0+IHRoaXMuaWNvbjIgPSByZWZ9IGRhdGEtdG9nZ2xlPVwidG9vbHRpcFwiIHRpdGxlPVwiUGxheSBOb3dcIj48L2k+PC9hPjwvZGl2PlxuICAgICAgICAgICAgICAgICAge2Ryb3Bkb3dufVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8TW9kYWxDcmVhdGVQbGF5bGlzdCBcbiAgICAgICAgICAgICAgICBrZXk9e3RoaXMucHJvcHMucG9zfSBcbiAgICAgICAgICAgICAgICB1c2VyPXt0aGlzLnByb3BzLnVzZXJ9XG4gICAgICAgICAgICAgICAgZGF0YT17bWVkaWFEYXRhfSBcbiAgICAgICAgICAgICAgICBwb3M9e3RoaXMucHJvcHMucG9zfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIC8vIE1lZGlhIEVudHJ5IGluIHRoZSBTZWFyY2ggY29tcG9uZW50LCBhbHNvIGhhcyBhIGJ1dHRvbiB0aGF0IGFkZHMgdGhlIG1lZGlhIGVudHJ5IGludG8gdGhlIHF1ZXVlXG4gICAgICBjYXNlIENBVEVHT1JZT0ZNRURJQS5TRUFSQ0g6XG4gICAgICAgIHZhciBkcm9wZG93biA9IFtdO1xuICAgICAgICB2YXIgc2VhcmNoTWVkaWFFbnRyeUlkID0gXCItc2VhcmNoLW1lZGlhLWVudHJ5LWlkXCI7XG4gICAgICAgIHZhciBtZWRpYURhdGEgPSB7XG4gICAgICAgICAgYXJ0aXN0OiB0aGlzLnByb3BzLmFydGlzdCxcbiAgICAgICAgICBtZWRpYUlkOiB0aGlzLnByb3BzLm1lZGlhSWQsXG4gICAgICAgICAgbWVkaWFUeXBlOiB0aGlzLnByb3BzLm1lZGlhVHlwZSxcbiAgICAgICAgICB0aHVtYm5haWw6IHRoaXMucHJvcHMudGh1bWJuYWlsLFxuICAgICAgICAgIHRpdGxlOiB0aGlzLnByb3BzLnRpdGxlXG4gICAgICAgICAgLy8gVE9ETzogVGhlIHNlYXJjaCBlbnRyeSBkb2VzIG5vdCBoYXZlIHRoZSBzYW1lIGRiIF9pZC4gTmVlZCB0byBmaW5kIGEgd2F5IHRvIGFkZCBtZWRpYSBlbnRyaWVzIHdpdGhvdXQgZHVwbGljYXRlc1xuICAgICAgICAgIC8vIF9pZDogdGhpcy5wcm9wcy5faWRcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBXaGVuIHRoZSB1c2VyIGlzIG5vdCBsb2dnZWQgaW4sIHRoZXJlIGlzIG5vIGRyb3Bkb3duXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnVzZXIgPT09IHVuZGVmaW5lZCB8fCB0aGlzLnByb3BzLnVzZXIgPT09IG51bGwpIHtcbiAgICAgICAgICBkcm9wZG93biA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIGEgdXNlciBpcyBsb2dnZWQgaW4sIHRoZSBkcm9wZG93biBhcHBlYXJzXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRyb3Bkb3duLnB1c2goXG4gICAgICAgICAgICA8ZGl2IGtleT17dGhpcy5wcm9wcy5wb3N9IGNsYXNzTmFtZT1cInNlYXJjaC1tZWRpYS1pY29uXCI+XG4gICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImljb24tYnRuIGRyb3Bkb3duLXRvZ2dsZVwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIj48aSBjbGFzc05hbWU9XCJmYSBmYS1saXN0LXVsXCIgcmVmPXsocmVmKSA9PiB0aGlzLmljb24zID0gcmVmfSBkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIiB0aXRsZT1cIkFkZCB0byBQbGF5bGlzdFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT48L2E+XG4gICAgICAgICAgICAgIDxQbGF5bGlzdERyb3Bkb3duIG15UGxheWxpc3RzPXt0aGlzLnByb3BzLm15UGxheWxpc3RzfSBkYXRhPXttZWRpYURhdGF9IHBvcz17dGhpcy5wcm9wcy5wb3N9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8ZGl2IGlkPXt0aGlzLnByb3BzLnBvcyArIHNlYXJjaE1lZGlhRW50cnlJZH0gY2xhc3NOYW1lPXtcInNlYXJjaC1jYXJkLXBhZGRpbmdcIn0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaC1tZWRpYS1jYXJkXCI+XG4gICAgICAgICAgICAgIDxUaHVtYm5haWwgdGh1bWJuYWlsPXt0aGlzLnByb3BzLnRodW1ibmFpbH0gY2F0ZWdvcnlUeXBlPXt0aGlzLnByb3BzLmNhdGVnb3J5VHlwZX0gLz5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaC1tZWRpYS10ZXh0LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxUaXRsZSB0aXRsZT17dGhpcy5wcm9wcy50aXRsZX0gY2F0ZWdvcnlUeXBlPXt0aGlzLnByb3BzLmNhdGVnb3J5VHlwZX0gLz5cbiAgICAgICAgICAgICAgICA8QXJ0aXN0IGFydGlzdD17dGhpcy5wcm9wcy5hcnRpc3R9IGNhdGVnb3J5VHlwZT17dGhpcy5wcm9wcy5jYXRlZ29yeVR5cGV9IC8+XG4gICAgICAgICAgICAgICAgPFR5cGUgdHlwZT17dGhpcy5wcm9wcy5tZWRpYVR5cGV9IGNhdGVnb3J5VHlwZT17dGhpcy5wcm9wcy5jYXRlZ29yeVR5cGV9IC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBUT0RPIG1ha2UgdG9vbHRpcHMgd29yayBhbmQgbWFrZSBkcm9wZG93biB3b3JrICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaC1tZWRpYS1pY29uLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoLW1lZGlhLWljb25cIj48YSBpZD17XCJtZWRpYS1lbnRyeS1idXR0b24tXCIgKyB0aGlzLnByb3BzLnBvc30gY2xhc3NOYW1lPVwiaWNvbi1idG5cIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgb25DbGljaz17dGhpcy5hZGRUb1F1ZXVlfT48aSBjbGFzc05hbWU9XCJmYSBmYS1wbHVzIGZhLWxnXCIgcmVmPXsocmVmKSA9PiB0aGlzLmljb24xID0gcmVmfSBkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIiB0aXRsZT1cIkFkZCB0byBRdWV1ZVwiPjwvaT48L2E+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2gtbWVkaWEtaWNvblwiPjxhIGNsYXNzTmFtZT1cImljb24tYnRuXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIG9uQ2xpY2s9e3RoaXMucGxheU1lZGlhRW50cnl9PjxpIGNsYXNzTmFtZT1cImZhIGZhLXBsYXlcIiByZWY9eyhyZWYpID0+IHRoaXMuaWNvbjIgPSByZWZ9IGRhdGEtdG9nZ2xlPVwidG9vbHRpcFwiIHRpdGxlPVwiUGxheSBOb3dcIj48L2k+PC9hPjwvZGl2PlxuICAgICAgICAgICAgICAgIHtkcm9wZG93bn1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPE1vZGFsQ3JlYXRlUGxheWxpc3QgXG4gICAgICAgICAgICAgIGtleT17dGhpcy5wcm9wcy5wb3N9IFxuICAgICAgICAgICAgICB1c2VyPXt0aGlzLnByb3BzLnVzZXJ9XG4gICAgICAgICAgICAgIGRhdGE9e21lZGlhRGF0YX0gXG4gICAgICAgICAgICAgIHBvcz17dGhpcy5wcm9wcy5wb3N9IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvLyBFUlJPUiwgTm8gQ2F0ZWdvcnkgdHlwZVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS5sb2coJ01lZGlhIENhdGVnb3J5IEVycm9yOiBOTyBUWVBFJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBNZWRpYUVudHJ5OyIsIi8qICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIENvcHlyaWdodCDCqSBcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBWSUVXOiBNb2RhbENyZWF0ZVBsYXlsaXN0LmpzeFxuXG4gICAgVGhlIGNvbXBvbmVudCBmb3Igd2hlbiB0aGUgTW9kYWwgcG9wcyB1cCBmb3IgY3JlYXRpbmcgYSBuZXcgcGxheWxpc3RcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBAQ29tcG9uZW50czogICAgVG9nZ2xlSWNvblxuICAgICAgICAgICAgICAgICAgICBNb2RhbENyZWF0ZVBsYXlsaXN0XG5cbiAgICBARXhwb3J0czogICAgICAgTW9kYWxDcmVhdGVQbGF5bGlzdFxuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG4vLyBGbHV4IEFjdGlvblxudmFyIHBsYXlsaXN0QWN0aW9ucyA9IHJlcXVpcmUoJy4uL2ZsdXgvYWN0aW9ucy9hY3Rpb25zJyk7XG5cbi8vIFRoZSBpY29uIHdoaWNoIHRlbGxzIHRoZSB1c2VyIGlmIHRoZSBuZXcgcGxheWxpc3Qgd291bGQgYmUgZWl0aGVyIHB1YmxpYyBvciBwcml2YXRlXG52YXIgVG9nZ2xlSWNvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAvLyBUb2dnbGVzIHRoZSBpY29uIHRvIHRoZSBnbG9iZSBvciBsb2NrIGRlcGVuZGluZyBvbiBpZiB0aGUgbmV3IHBsYXlsaXN0IHdvdWxkIGJlIHB1YmxpYyBvciBwcml2YXRlXG4gICAgdmFyIHRvZ2dsZUNsYXNzO1xuICAgIGlmICh0aGlzLnByb3BzLmlzUHVibGljID09PSB0cnVlKSB7XG4gICAgICB0b2dnbGVDbGFzcyA9IFwiZmEgZmEtZ2xvYmVcIjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0b2dnbGVDbGFzcyA9IFwiZmEgZmEtbG9ja1wiO1xuICAgIH0gXG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b2dnbGUtc2xpZGVyLXNlY3Rpb25cIj5cbiAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInN3aXRjaFwiPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cImNyZWF0ZS1wbGF5bGlzdC10b2dnbGVcIiBvbkNoYW5nZT17dGhpcy5wcm9wcy5vbkNoYW5nZX0gLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNsaWRlclwiPjwvZGl2PlxuICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8aSBjbGFzc05hbWU9e3RvZ2dsZUNsYXNzfSBpZD1cImNyZWF0ZS1wbGF5bGlzdC10b2dnbGUtaWNvblwiPjwvaT5cbiAgICAgIDwvZGl2PiBcbiAgICApO1xuICB9XG59KTtcblxuLy8gTUFJTiBDT01QT05FTlQ6IENyZWF0ZSBOZXcgUGxheWxpc3QgTW9kYWwgUG9wdXBcbnZhciBNb2RhbENyZWF0ZVBsYXlsaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwbGF5bGlzdE5hbWVJbnB1dDogXCJcIixcbiAgICAgIGlzUHVibGljOiB0cnVlXG4gICAgfVxuICB9LFxuXG4gIG9uQ2hhbmdlUGxheWxpc3ROYW1lOiBmdW5jdGlvbihlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHBsYXlsaXN0TmFtZUlucHV0OiBlLnRhcmdldC52YWx1ZSB9KTtcbiAgfSxcblxuICBvbkNoYW5nZUlzUHVibGljOiBmdW5jdGlvbihlKSB7XG4gICAgLy8gVGhlIHBsYXlsaXN0IGlzIHB1YmxpYyB3aGVuIHRoZSB0YXJnZXQgaXMgbm90IGNoZWNrZWRcbiAgICBjb25zb2xlLmxvZyh0aGlzLnN0YXRlLmlzUHVibGljKTtcbiAgICB0aGlzLnNldFN0YXRlKHsgaXNQdWJsaWM6ICFlLnRhcmdldC5jaGVja2VkIH0pO1xuICB9LFxuXG4gIG9uU3VibWl0OiBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9LFxuXG4gIGFkZFRvUGxheWxpc3Q6IGZ1bmN0aW9uKGUpIHtcbiAgICBjb25zb2xlLmxvZyhcIk1vZGFsOiBBZGQgdG8gbmV3IFBsYXlsaXN0XCIpO1xuICAgIHZhciBkYXRhO1xuICAgIGlmICh0aGlzLnByb3BzLmRhdGEgPT09IG51bGwgfHwgdGhpcy5wcm9wcy5kYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGRhdGEgPSB7XG4gICAgICAgIG5hbWU6IHRoaXMuc3RhdGUucGxheWxpc3ROYW1lSW5wdXQsXG4gICAgICAgIG93bmVyOiB0aGlzLnByb3BzLnVzZXIubG9jYWwuZW1haWwsXG4gICAgICAgIGlzUHVibGljOiB0aGlzLnN0YXRlLmlzUHVibGljLFxuICAgICAgICBtZWRpYUVudHJ5OiBudWxsXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZGF0YSA9IHtcbiAgICAgICAgbmFtZTogdGhpcy5zdGF0ZS5wbGF5bGlzdE5hbWVJbnB1dCxcbiAgICAgICAgb3duZXI6IHRoaXMucHJvcHMudXNlci5sb2NhbC5lbWFpbCxcbiAgICAgICAgaXNQdWJsaWM6IHRoaXMuc3RhdGUuaXNQdWJsaWMsXG4gICAgICAgIG1lZGlhRW50cnk6IHtcbiAgICAgICAgICBhcnRpc3Q6IHRoaXMucHJvcHMuZGF0YS5hcnRpc3QsXG4gICAgICAgICAgbWVkaWFJZDogdGhpcy5wcm9wcy5kYXRhLm1lZGlhSWQsXG4gICAgICAgICAgbWVkaWFUeXBlOiB0aGlzLnByb3BzLmRhdGEubWVkaWFUeXBlLFxuICAgICAgICAgIHRodW1ibmFpbDogdGhpcy5wcm9wcy5kYXRhLnRodW1ibmFpbCxcbiAgICAgICAgICB0aXRsZTogdGhpcy5wcm9wcy5kYXRhLnRpdGxlLFxuICAgICAgICAgIC8vIFRPRE86IFRoZSBzZWFyY2ggZW50cnkgZG9lcyBub3QgaGF2ZSB0aGUgc2FtZSBkYiBfaWQuIE5lZWQgdG8gZmluZCBhIHdheSB0byBhZGQgbWVkaWEgZW50cmllcyB3aXRob3V0IGR1cGxpY2F0ZXNcbiAgICAgICAgICAvLyBfaWQ6IHRoaXMucHJvcHMuZGF0YS5faWRcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gXG5cbiAgICAkLmFqYXgoe1xuICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICB1cmw6IFwiL3BsYXlsaXN0L2NyZWF0ZVwiLFxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgIGRhdGE6IHtkYXRhOiBKU09OLnN0cmluZ2lmeShkYXRhKX0sXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihuZXdQbGF5bGlzdCkge1xuICAgICAgICBjb25zb2xlLmxvZyhuZXdQbGF5bGlzdCk7XG4gICAgICAgIHBsYXlsaXN0QWN0aW9ucy5jcmVhdGVQbGF5bGlzdChuZXdQbGF5bGlzdC5jcmVhdGVkUGxheWxpc3QpOyBcbiAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgIGVycm9yOiBmdW5jdGlvbih4aHIsIHN0YXR1cywgZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFUlJPUjogQ3JlYXRlIFBsYXlsaXN0IGVycm9yZWQgb3V0XCIsIHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpO1xuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgfSk7XG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgbW9kYWxJZDtcbiAgICB2YXIgdG9nZ2xlSWNvbkdsb2JlT3JMb2NrID0gW107XG5cbiAgICAvLyBJZiB0aGUgbW9kYWwgaXMgY2xpY2tlZCBmcm9tIHRoZSBjcmVhdGUgbmV3IHBsYXlsaXN0IGJ1dHRvbiB1bmRlciBteVBsYXlsaXN0XG4gICAgaWYgKHRoaXMucHJvcHMucG9zID09PSBudWxsIHx8IHRoaXMucHJvcHMucG9zID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG1vZGFsSWQgPSBcImNyZWF0ZS1wbGF5bGlzdFwiO1xuICAgIH1cbiAgICAvLyBXSGVuIHRoZSBtb2RhbCBpcyBjbGlja2VkIGZyb20gYSBtZWRpYSBlbnRyeVxuICAgIGVsc2Uge1xuICAgICAgbW9kYWxJZCA9IFwiY3JlYXRlLXBsYXlsaXN0LVwiICsgdGhpcy5wcm9wcy5wb3M7ICBcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwgZmFkZVwiIGlkPXttb2RhbElkfSB0YWJJbmRleD1cIi0xXCIgcm9sZT1cImRpYWxvZ1wiIGFyaWEtbGFiZWxsZWRieT1cIm15TW9kYWxMYWJlbFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWRpYWxvZyBtb2RhbC1zbVwiIHJvbGU9XCJkb2N1bWVudFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgQ3JlYXRlIGEgTmV3IFBsYXlsaXN0XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtYm9keVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8Zm9ybSBjbGFzc05hbWU9XCJzZWFyY2gtaW5wdXRcIiBpZD1cImNyZWF0ZS1wbGF5bGlzdC1pbnB1dFwiIG9uU3VibWl0PXt0aGlzLm9uU3VibWl0fT5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJpbnB1dC1wYWRkaW5nXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlBsYXlsaXN0IE5hbWVcIiBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZVBsYXlsaXN0TmFtZX0gLz5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtbGFiZWxcIj5JcyB0aGlzIGEgcHJpdmF0ZSBwbGF5bGlzdD88L2Rpdj5cbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICB7LyogVG9nZ2xlIEljb24gY29tcG9uZW50ICovfSBcbiAgICAgICAgICAgICAgICAgIDxUb2dnbGVJY29uIGlzUHVibGljPXt0aGlzLnN0YXRlLmlzUHVibGljfSBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZUlzUHVibGljfSAvPlxuICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZm9vdGVyXCI+XG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tc2Vjb25kYXJ5XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DYW5jZWw8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBvbkNsaWNrPXt0aGlzLmFkZFRvUGxheWxpc3R9PkNyZWF0ZSBQbGF5bGlzdDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbi8vIFJlcXVpcmVkIHRvIGNhbGwgbW9kYWwgZnJvbSBvdGhlciBjb21wb25lbnRzXG5tb2R1bGUuZXhwb3J0cyA9IE1vZGFsQ3JlYXRlUGxheWxpc3Q7IiwiLyogID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgQ29weXJpZ2h0IMKpIFxuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIFZJRVc6IE1vZGFsQ3JlYXRlUm9vbS5qc3hcblxuICAgIFRoZSBjb21wb25lbnQgZm9yIHdoZW4gdGhlIE1vZGFsIHBvcHMgdXAgZm9yIGNyZWF0aW5nIGEgbmV3IHJvb21cbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBAQ29tcG9uZW50czogICAgVG9nZ2xlSWNvblxuICAgICAgICAgICAgICAgICAgICBNb2RhbENyZWF0ZVJvb21cblxuICAgIEBFeHBvcnRzOiAgICAgICBNb2RhbENyZWF0ZVJvb21cbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuLy8gVGhlIGljb24gd2hpY2ggdGVsbHMgdGhlIHVzZXIgaWYgdGhlIG5ldyByb29tIHdvdWxkIGJlIGVpdGhlciBwdWJsaWMgb3IgcHJpdmF0ZVxudmFyIFRvZ2dsZUljb24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgLy8gVG9nZ2xlcyB0aGUgaWNvbiB0byB0aGUgZ2xvYmUgb3IgbG9jayBkZXBlbmRpbmcgb24gaWYgdGhlIG5ldyByb29tIHdvdWxkIGJlIHB1YmxpYyBvciBwcml2YXRlXG4gICAgdmFyIHRvZ2dsZUNsYXNzO1xuICAgIGlmICh0aGlzLnByb3BzLmlzUHVibGljID09PSB0cnVlKSB7XG4gICAgICB0b2dnbGVDbGFzcyA9IFwiZmEgZmEtZ2xvYmVcIjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0b2dnbGVDbGFzcyA9IFwiZmEgZmEtbG9ja1wiO1xuICAgIH0gXG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b2dnbGUtc2xpZGVyLXNlY3Rpb25cIj5cbiAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInN3aXRjaFwiPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cImNyZWF0ZS1yb29tLXRvZ2dsZVwiIG9uQ2hhbmdlPXt0aGlzLnByb3BzLm9uQ2hhbmdlfSAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbGlkZXJcIj48L2Rpdj5cbiAgICAgICAgPC9sYWJlbD5cblx0ICAgIDxpIGNsYXNzTmFtZT17dG9nZ2xlQ2xhc3N9IGlkPVwiY3JlYXRlLXJvb20tdG9nZ2xlLWljb25cIj48L2k+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxuLy8gTW9kYWwgdG8gY3JlYXRlIGEgbmV3IHJvb21cbnZhciBNb2RhbENyZWF0ZVJvb20gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJvb21OYW1lSW5wdXQ6IFwiXCIsXG4gICAgICBpc1B1YmxpYzogdHJ1ZVxuICAgIH1cbiAgfSxcblxuICBvbkNoYW5nZVJvb21OYW1lOiBmdW5jdGlvbihlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHJvb21OYW1lSW5wdXQ6IGUudGFyZ2V0LnZhbHVlIH0pO1xuICB9LFxuXG4gIG9uQ2hhbmdlSXNQdWJsaWM6IGZ1bmN0aW9uKGUpIHtcbiAgICAvLyBUaGUgcGxheWxpc3QgaXMgcHVibGljIHdoZW4gdGhlIHRhcmdldCBpcyBub3QgY2hlY2tlZFxuICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUuaXNQdWJsaWMpO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBpc1B1YmxpYzogIWUudGFyZ2V0LmNoZWNrZWQgfSk7XG4gIH0sXG5cbiAgb25TdWJtaXQ6IGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH0sXG5cbiAgYWRkVG9Sb29tczogZnVuY3Rpb24oZSkge1xuICAgIC8vIENoZWNrIHJvb20gaW5wdXRcbiAgICBpZiAodGhpcy5zdGF0ZS5yb29tTmFtZUlucHV0ID09PSBcIlwiKSB7XG4gICAgICAvLyBUT0RPOiBEaXNwbGF5IGVycm9yIG1lc3NhZ2VcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBDaGVja3MgaWYgdXNlciBpcyBsb2dnZWQgaW4gb3Igbm90XG4gICAgdmFyIHVzZXJDcmVhdGluZ1Jvb20gPSB0aGlzLnByb3BzLnVzZXI7XG4gICAgdmFyIHVzZXJOYW1lQ3JlYXRpbmdSb29tID0gXCJcIlxuICAgIGlmICh0aGlzLnByb3BzLnVzZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdXNlckNyZWF0aW5nUm9vbSA9IFwiQSBVU0VSXCI7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdXNlckNyZWF0aW5nUm9vbSA9IHRoaXMucHJvcHMudXNlci5sb2NhbC5lbWFpbDtcbiAgICB9XG5cbiAgICAkLmFqYXgoe1xuICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICB1cmw6IFwiL3Jvb20vY3JlYXRlXCIsXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgZGF0YToge1xuICAgICAgICByb29tTmFtZTogdGhpcy5zdGF0ZS5yb29tTmFtZUlucHV0LFxuICAgICAgICBvd25lcjogdXNlckNyZWF0aW5nUm9vbVxuICAgICAgfSxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gXCIvcm9vbS9cIiArIGRhdGEucm9vbUlkO1xuICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgZXJyb3I6IGZ1bmN0aW9uKHhociwgc3RhdHVzLCBlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVSUk9SOiBDcmVhdGUgcm9vbSBlcnJvcmVkIG91dFwiLCBzdGF0dXMsIGVyci50b1N0cmluZygpKTtcbiAgICAgIH0uYmluZCh0aGlzKVxuICAgIH0pO1xuICB9LFxuICBcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbCBmYWRlXCIgaWQ9XCJjcmVhdGUtcm9vbVwiIHRhYkluZGV4PVwiLTFcIiByb2xlPVwiZGlhbG9nXCIgYXJpYS1sYWJlbGxlZGJ5PVwibXlNb2RhbExhYmVsXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZGlhbG9nIG1vZGFsLXNtXCIgcm9sZT1cImRvY3VtZW50XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1jb250ZW50XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWhlYWRlclwiPlxuICAgICAgICAgICAgICBDcmVhdGUgYSBOZXcgUm9vbVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWJvZHlcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2gtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgPGZvcm0gY2xhc3NOYW1lPVwic2VhcmNoLWlucHV0XCIgaWQ9XCJjcmVhdGUtcm9vbS1pbnB1dFwiIG9uU3VibWl0PXt0aGlzLm9uU3VibWl0fT5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJpbnB1dC1wYWRkaW5nXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlJvb20gTmFtZVwiIG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlUm9vbU5hbWV9IC8+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWxhYmVsXCI+SXMgdGhpcyBhIHByaXZhdGUgcm9vbT88L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgey8qIFRvZ2dsZSBJY29uIGNvbXBvbmVudCAqL30gXG4gICAgICAgICAgICAgICAgICA8VG9nZ2xlSWNvbiBpc1B1YmxpYz17dGhpcy5zdGF0ZS5pc1B1YmxpY30gb25DaGFuZ2U9e3RoaXMub25DaGFuZ2VJc1B1YmxpY30gLz5cbiAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWZvb3RlclwiPlxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXNlY29uZGFyeVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+Q2FuY2VsPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgb25DbGljaz17dGhpcy5hZGRUb1Jvb21zfSA+Q3JlYXRlIFJvb208L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1vZGFsQ3JlYXRlUm9vbTsiLCIvKiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBDb3B5cmlnaHQgwqkgXG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyogID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgVklFVzogTXlQbGF5bGlzdHMuanN4XG5cbiAgICBDb250YWlucyBhbGwgb2YgdGhlIGN1cnJlbnQgdXNlcidzIHByaXZhdGUgYW5kIHB1YmxpYyBwbGF5bGlzdHMuIEFsc28gY29udGFpbnMgXG4gICAgYWxsIHRoZSBwbGF5bGlzdHMgdGhhdCB0aGUgdXNlciBsaWtlZC5cbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBAQ29tcG9uZW50czogICAgTXlQbGF5bGlzdFBsYWNlaG9sZGVyXG4gICAgICAgICAgICAgICAgICAgIFNlYXJjaE15UGxheWxpc3RcbiAgICAgICAgICAgICAgICAgICAgTXlQbGF5bGlzdHNcblxuICAgIEBFeHBvcnRzOiAgICAgICBNeVBsYXlsaXN0c1xuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFBsYXlsaXN0RW50cnkgPSByZXF1aXJlKCcuL1BsYXlsaXN0RW50cnkuanN4Jyk7XG5cbi8vIFBsYWNlaG9sZGVyIGlmIHRoZXJlIGFyZSBubyBwbGF5bGlzdHMgY3JlYXRlZCBvciBsaWtlZFxudmFyIE15UGxheWxpc3RQbGFjZWhvbGRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtcGFkZGluZ1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYWNlaG9sZGVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGFjZWhvbGRlci1jb250ZW50XCI+XG4gICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1ib29rIHBsYWNlaG9sZGVyLWljb25cIj48L2k+PGJyLz5cbiAgICAgICAgICAgIDxzcGFuPllvdSBoYXZlIG5vIHNhdmVkIHBsYXlsaXN0czwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxuLy8gU2VhcmNoIEJhciB0byBzZWFyY2ggTXkgUGxheWxpc3RzXG52YXIgU2VhcmNoTXlQbGF5bGlzdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2gtY29udGFpbmVyXCI+XG4gICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cInNlYXJjaC1pbnB1dFwiPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzTmFtZT1cImNoYXQtdGV4dGJveFwiIG5hbWU9XCJcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaCBQcml2YXRlIFBsYXlsaXN0cy4uLlwiLz5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbi8vIENyZWF0ZSBOZXcgUGxheWxpc3QgQnV0dG9uXG52YXIgTmV3UGxheWxpc3RCdXR0b24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoLWNvbnRhaW5lciBidG4tYWxpZ24tcmlnaHRcIj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBkYXRhLXRvZ2dsZT1cIm1vZGFsXCIgZGF0YS10YXJnZXQ9XCIjY3JlYXRlLXBsYXlsaXN0XCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtcGx1cyBpY29uLXBhZGRpbmdcIj48L2k+Q3JlYXRlIE5ldyBQbGF5bGlzdDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbi8vIE1BSU4gQ09NUE9ORU5UOiBNeSBQbGF5bGlzdCBUYWJcbnZhciBNeVBsYXlsaXN0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgcGxheWxpc3RFbnRyaWVzID0gW107XG5cbiAgICAvLyBJZiB0aGVyZSBhcmUgbm8gcGxheWxpc3RzLCB0aGUgcGxhY2Vob2xkZXIgaXMgZGlzcGxheWVkXG4gICAgaWYgKHRoaXMucHJvcHMubXlQbGF5bGlzdHMgPT09IHVuZGVmaW5lZCB8fCB0aGlzLnByb3BzLm15UGxheWxpc3RzID09PSBudWxsIHx8IHRoaXMucHJvcHMubXlQbGF5bGlzdHMubGVuZ3RoIDw9IDApIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPE15UGxheWxpc3RQbGFjZWhvbGRlciAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlcmUgYXJlIHBsYXlsaXN0cywgcHVzaGVzIGV2ZXJ5IHBsYXlsaXN0IGludG8gdGhlIHRhYlxuICAgIGVsc2Uge1xuICAgICAgLy8gQWRkcyB0aGUgc2VhcmNoIGJhciBmb3IgdGhlIHBsYXlsaXN0XG4gICAgICBwbGF5bGlzdEVudHJpZXMucHVzaChcbiAgICAgICAgPFNlYXJjaE15UGxheWxpc3Qga2V5PXsnU2VhcmNoTXlQbGF5bGlzdCd9IC8+XG4gICAgICApXG5cbiAgICAgIC8vIEV2ZXJ5IHBsYXlsaXN0IGVudHJ5IGluIE15UGxheWxpc3RcbiAgICAgIHZhciBwbGF5bGlzdEVudHJ5O1xuICAgICAgdmFyIHBsYXlsaXN0VGh1bWJuYWlsO1xuICAgICAgdmFyIHBsYXlsaXN0U2l6ZTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wcm9wcy5teVBsYXlsaXN0cy5sZW5ndGg7ICsraSkge1xuICAgICAgICBwbGF5bGlzdEVudHJ5ID0gdGhpcy5wcm9wcy5teVBsYXlsaXN0c1tpXTtcbiAgICAgICAgLy8gSWYgdGhlIHBsYXlsaXN0IGVudHJ5IGhhcyBubyBtZWRpYSBlbnRyaWVzXG4gICAgICAgIC8vIFRPRE86IEFkZCBhIHRodW1ibmlhbCBwbGFjZWhvbGRlciBmb3IgcGxheWxpc3QgZW50cmllcyB0aGF0IGhhdmUgbm8gbWVkaWEgZW50cmllc1xuICAgICAgICBpZiAocGxheWxpc3RFbnRyeS5tZWRpYUVudHJpZXNbMF0gPT09IG51bGwgfHwgcGxheWxpc3RFbnRyeS5tZWRpYUVudHJpZXNbMF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHBsYXlsaXN0VGh1bWJuYWlsID0gXCJcIjtcbiAgICAgICAgICBwbGF5bGlzdFNpemUgPSAwO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRoZXJlIGFyZSBtZWRpYSBlbnRyaWVzIGluIHRoZSBwbGF5bGlzdCBlbnRyeVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBwbGF5bGlzdFRodW1ibmFpbCA9IHBsYXlsaXN0RW50cnkubWVkaWFFbnRyaWVzWzBdLnRodW1ibmFpbDtcbiAgICAgICAgICBwbGF5bGlzdFNpemUgPSBwbGF5bGlzdEVudHJ5Lm1lZGlhRW50cmllcy5sZW5ndGg7ICBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcGxheWxpc3RFbnRyaWVzLnB1c2ggKFxuICAgICAgICAgIC8vIFRPRE86IG93bmVyLCBsaWtlZFxuICAgICAgICAgIDxQbGF5bGlzdEVudHJ5XG4gICAgICAgICAgICBrZXk9e3BsYXlsaXN0RW50cnkuX2lkfVxuICAgICAgICAgICAgX2lkPXtwbGF5bGlzdEVudHJ5Ll9pZH1cbiAgICAgICAgICAgIHBvcz17aX1cbiAgICAgICAgICAgIG93bmVyPXt0cnVlfVxuICAgICAgICAgICAgdGl0bGU9e3BsYXlsaXN0RW50cnkubmFtZX1cbiAgICAgICAgICAgIHRodW1ibmFpbD17cGxheWxpc3RUaHVtYm5haWx9XG4gICAgICAgICAgICBjdXJhdG9yPXtwbGF5bGlzdEVudHJ5Lm93bmVyfVxuICAgICAgICAgICAgc2l6ZT17cGxheWxpc3RTaXplfVxuICAgICAgICAgICAgdHlwZT17cGxheWxpc3RFbnRyeS5pc1B1YmxpY31cbiAgICAgICAgICAgIGxpa2VzPXtwbGF5bGlzdEVudHJ5Lmxpa2VzfVxuICAgICAgICAgICAgbGlrZWQ9e251bGx9IFxuICAgICAgICAgICAgbWVkaWFFbnRyaWVzPXtwbGF5bGlzdEVudHJ5Lm1lZGlhRW50cmllc30gXG4gICAgICAgICAgICBob21lPXt0aGlzLnByb3BzLmhvbWV9IC8+XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxOZXdQbGF5bGlzdEJ1dHRvbiAvPlxuICAgICAgICB7cGxheWxpc3RFbnRyaWVzfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTXlQbGF5bGlzdHM7IiwiLyogID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgQ29weXJpZ2h0IMKpIFxuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIE15Um9vbS5qc3hcblxuICAgIFNlY3Rpb24gY29udGFpbmluZyBhbGwgb2YgdGhlIFJvb21FbnRyaWVzXG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyogID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgQENvbXBvbmVudHM6ICAgIE15Um9vbXNQbGFjZWhvbGRlclxuICAgICAgICAgICAgICAgICAgICBNeVJvb21zXG5cbiAgICBARXhwb3J0czogICAgICAgTXlSb29tc1xuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFJvb21FbnRyeSA9IHJlcXVpcmUoJy4vUm9vbUVudHJ5LmpzeCcpO1xudmFyIE1vZGFsQ3JlYXRlUm9vbSA9IHJlcXVpcmUoJy4vTW9kYWxDcmVhdGVSb29tLmpzeCcpO1xuXG4vLyBQbGFjZWhvbGRlciBpZiB1c2VyIGlzIG5vdCBhIHBhcnQgb2YgYW55IHJvb21cbnZhciBNeVJvb21zUGxhY2Vob2xkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXBhZGRpbmdcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGFjZWhvbGRlciBwbGFjZWhvbGRlci1yb29tc1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxhY2Vob2xkZXItY29udGVudFwiPlxuICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtaG9tZSBwbGFjZWhvbGRlci1pY29uXCI+PC9pPjxici8+XG4gICAgICAgICAgICA8c3Bhbj5Zb3UgaGF2ZSBubyByb29tczwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxuLy8gTUFJTiBDT01QT05FTlQ6IE15IFJvb21zIFRhYlxudmFyIE15Um9vbXMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJvb21zOiB0aGlzLnByb3BzLnJvb21zXG4gICAgfTtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciByb29tRW50cmllcyA9IFtdO1xuXG4gICAgLy8gUGxhY2Vob2xkZXIgaWYgdGhlcmUgYXJlIG5vIHJvb21zXG4gICAgaWYgKHRoaXMuc3RhdGUucm9vbXMgPT09IHVuZGVmaW5lZCB8fCB0aGlzLnN0YXRlLnJvb21zID09PSBudWxsIHx8IHRoaXMuc3RhdGUucm9vbXMubGVuZ3RoIDw9IDApIHtcbiAgICAgIHJvb21FbnRyaWVzLnB1c2goXG4gICAgICAgIDxNeVJvb21zUGxhY2Vob2xkZXIga2V5PXsnTXlSb29tc1BsYWNlaG9sZGVyJ30gLz5cbiAgICAgIClcbiAgICB9XG5cbiAgICAvLyBJZiB0aGVyZSBhcmUgcm9vbXMsIHB1c2hlcyBldmVyeSByb29tIGNhcmRcbiAgICBlbHNlIHtcbiAgICAgIHZhciByb29tRW50cnk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc3RhdGUucm9vbXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgcm9vbUVudHJ5ID0gdGhpcy5zdGF0ZS5yb29tc1tpXTtcblxuICAgICAgICByb29tRW50cmllcy5wdXNoKFxuICAgICAgICA8Um9vbUVudHJ5IFxuICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICBvd25lcj17dHJ1ZX1cbiAgICAgICAgICBtb2RlcmF0b3I9e3RydWV9XG4gICAgICAgICAgdHlwZT17cm9vbUVudHJ5LmlzUHVibGljfVxuICAgICAgICAgIG5hbWU9e3Jvb21FbnRyeS5uYW1lfVxuICAgICAgICAgIGlucm9vbT17cm9vbUVudHJ5LmluUm9vbX1cbiAgICAgICAgICBzaXplPXsnMzUnfVxuICAgICAgICAgIHRodW1ibmFpbD17cm9vbUVudHJ5LnRodW1ibmFpbH0gXG4gICAgICAgICAgaXNMaXRlPXt0aGlzLnByb3BzLmlzTGl0ZX1cbiAgICAgICAgICBsaW5rSGFzaD17cm9vbUVudHJ5Ll9pZH0gLz5cbiAgICAgICAgKVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIElmIGlzTGl0ZSBwcm9wIGlzIHRydWUsIHVzZSBwcmltYXJ5IGJ1dHRvbiwgZWxzZSB1c2UgZGFyayBidXR0b25cbiAgICB2YXIgYnV0dG9uQ2xhc3NOYW1lID0gXCJidG5cIjtcbiAgICBpZiAodGhpcy5wcm9wcy5pc0xpdGUgPT0gdHJ1ZSkge1xuICAgICAgYnV0dG9uQ2xhc3NOYW1lICs9IFwiIGJ0bi1wcmltYXJ5XCI7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgYnV0dG9uQ2xhc3NOYW1lICs9IFwiIGJ0bi1kYXJrXCI7XG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm15cm9vbXMtY29udGFpbmVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb29tcy1zZWN0aW9uXCI+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17YnV0dG9uQ2xhc3NOYW1lfSBkYXRhLXRvZ2dsZT1cIm1vZGFsXCIgZGF0YS10YXJnZXQ9XCIjY3JlYXRlLXJvb21cIj48aSBjbGFzc05hbWU9XCJmYSBmYS1wbHVzIGljb24tcGFkZGluZ1wiPjwvaT5DcmVhdGUgTmV3IFJvb208L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICB7cm9vbUVudHJpZXN9XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPE1vZGFsQ3JlYXRlUm9vbSB1c2VyPXt0aGlzLnByb3BzLnVzZXJ9IC8+XG5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBNeVJvb21zOyIsIi8qICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIENvcHlyaWdodCDCqSBcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBWSUVXOiBQbGF5bGlzdEVudHJ5LmpzeFxuXG4gICAgVGhlIGluZGl2aWR1YWwgZW50cnkgb2YgYSBwbGF5bGlzdFxuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIEBDb21wb25lbnRzOiAgICBQbGF5bGlzdEljb25cbiAgICAgICAgICAgICAgICAgICAgUGxheWxpc3RFbnRyeVxuXG4gICAgQEV4cG9ydHM6ICAgICAgIFBsYXlsaXN0RW50cnlcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIHBsYXlsaXN0QWN0aW9ucyA9IHJlcXVpcmUoJy4uL2ZsdXgvYWN0aW9ucy9hY3Rpb25zJyk7XG5cbi8vIEljb24gZGlzcGxheWVkIGRlcGVuZHMgb24gd2hldGhlciBwbGF5bGlzdCBpcyBwdWJsaWMsIHByaXZhdGUsIG9yIG5vdCBvd25lclxudmFyIFBsYXlsaXN0SWNvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMub3duZXIgPT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxheWxpc3QtaWNvblwiPlxuICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImljb24tYnRuIGxpa2UtYnRuXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiPlxuICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtaGVhcnQtb1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICAgICAgICA8L2E+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy5wcm9wcy5vd25lciA9PSB0cnVlICYmIHRoaXMucHJvcHMudHlwZSA9PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGF5bGlzdC1pY29uXCI+XG4gICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtbG9ja1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxheWxpc3QtaWNvblwiPlxuICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWdsb2JlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfTtcbiAgfVxufSk7XG5cbi8vIE1BSU4gQ09NUE9ORU5UOiBFYWNoIGluZGl2aWR1YWwgcGxheWxpc3QgY2FyZFxudmFyIFBsYXlsaXN0RW50cnkgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgLy8gRVZFTlQgSEFORExFUjogQWRkcyB0aGUgcGxheWxpc3QgaW50byB0aGUgcXVldWVcbiAgcGxheVBsYXlsaXN0OiBmdW5jdGlvbigpIHtcbiAgICAvLyBEbyBub3QgYWxsb3cgdGhlIHVzZXIgdG8gY2xpY2sgb24gdGhlIHBsYXlsaXN0XG4gICAgaWYgKHRoaXMucHJvcHMuaG9tZSA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhcIlBsYXlpbmcgcGxheWxpc3Q6IFwiICsgdGhpcy5wcm9wcy50aXRsZSArIFwiIGJ5IFwiICsgdGhpcy5wcm9wcy5jdXJhdG9yKTtcbiAgICAvLyBJZiB0aGVyZSBhcmUgbm8gbWVkaWEgZW50cmllcywgZG8gbm90aGluZ1xuICAgIGlmICh0aGlzLnByb3BzLnNpemUgPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc29ja2V0LmVtaXQoJ0Zyb20gQ2xpZW50OiBVcGRhdGUgcXVldWUgd2l0aCBuZXcgbGlzdCcsIHRoaXMucHJvcHMubWVkaWFFbnRyaWVzKTtcbiAgfSxcblxuICAvLyBFVkVOVCBIQU5ETEVSOiBPcGVucyB0aGUgcGxheWxpc3QncyBwYWdlXG4gIGdvVG9QbGF5bGlzdFBhZ2U6IGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMucHJvcHMubWVkaWFFbnRyaWVzKTtcbiAgICBjb25zb2xlLmxvZyhcIkdvaW5nIHRvIHBsYXlsaXN0IHBhZ2U6IFwiICsgdGhpcy5wcm9wcy50aXRsZSArIFwiIEluZGV4OiBcIiArIHRoaXMucHJvcHMucG9zKTtcbiAgICBwbGF5bGlzdEFjdGlvbnMuZGlzcGxheVBsYXlsaXN0KHRoaXMucHJvcHMuX2lkLCB0aGlzLnByb3BzLnBvcywgdGhpcy5wcm9wcy5tZWRpYUVudHJpZXMpOyBcblxuICAgIC8vIFRPRE86IElmIGN1cnJlbnRseSBtb2JpbGUsIHNob3cgdGhlIG1vYmlsZSB0YWIgaW5zdGVhZFxuICAgIC8vIE9wZW4gc2VsZWN0ZWQgcGxheWxpc3Qgb3duZWQgYnkgY3VycmVudCB1c2VyXG4gICAgaWYgKHRoaXMucHJvcHMub3duZXIpIHtcbiAgICAgICQoJyN0YWItZWRpdC1wbGF5bGlzdCcpLnRhYignc2hvdycpO1xuICAgIH1cbiAgICAvLyBPcGVuIHNlbGVjdGVkIGxpa2VkIHBsYXlsaXN0XG4gICAgZWxzZSB7XG4gICAgICAkKCcjdGFiLXZpZXctcGxheWxpc3QnKS50YWIoJ3Nob3cnKTsgXG4gICAgfSAgIFxuICAgIC8vIFRPRE86IEZvciB0aGUgQmFjayBidXR0b24gICAgICBcbiAgICAvLyBUaGUgYmFjayBidXR0b24gc2hvdWxkIGhhdmUgYSBzdGFjayBsaWtlIGltcGxlbWVudGF0aW9uLCBlYWNoIGVsZW1lbnQgYmVpbmcgd2hlcmUgdGhlIHByZXZpb3VzIHdhcyBmcm9tXG4gICAgLy8gdmFyIHBsYXlsaXN0RGF0YSA9IHtcbiAgICAvLyAgIHBvczogdGhpcy5wcm9wcy5wb3MsXG4gICAgLy8gICBjbGlja2VkRnJvbTogXCJNWVBMQVlMSVNUXCJcbiAgICAvLyB9XG4gICAgLy8gcGxheWxpc3RBY3Rpb25zLmRpc3BsYXlQbGF5bGlzdChwbGF5bGlzdERhdGEpO1xuICB9LFxuXG4gIC8vIEVWRU5UIEhBTkRMRVI6IE9wZW5zIHRoZSBjdXJhdG9yJ3MgcGFnZVxuICBnb1RvQ3VyYXRvclBhZ2U6IGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKFwiR29pbmcgdG8gY3VyYXRvciBwYWdlOiBcIiArIHRoaXMucHJvcHMuY3VyYXRvcik7XG5cbiAgICAvLyBUT0RPOiBGb3IgdGhlIEJhY2sgYnV0dG9uXG4gICAgLy8gVGhlIGJhY2sgYnV0dG9uIHNob3VsZCBoYXZlIGEgc3RhY2sgbGlrZSBpbXBsZW1lbnRhdGlvbiwgZWFjaCBlbGVtZW50IGJlaW5nIHdoZXJlIHRoZSBwcmV2aW91cyB3YXMgZnJvbVxuICAgIC8vIHZhciBjdXJhdG9yRGF0YSA9IHtcbiAgICAvLyAgIHBvczogdGhpcy5wcm9wcy5wb3MsXG4gICAgLy8gICBjbGlja2VkRnJvbTogXCJNWVBMQVlMSVNUXCJcbiAgICAvLyB9XG4gICAgLy8gcGxheWxpc3RBY3Rpb25zLkN1cmF0b3IoY3VyYXRvckRhdGEpO1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgLy8gSWYgb3duZXIsIGFwcGVuZCB1c2VyLXBsYXlsaXN0IHRvIGNsYXNzbmFtZVxuICAgIHZhciBwbGF5bGlzdENhcmRDbGFzc05hbWUgPSBcInBsYXlsaXN0LWNhcmRcIjtcbiAgICBpZiAodGhpcy5wcm9wcy5vd25lciA9PSB0cnVlKSB7XG4gICAgICBwbGF5bGlzdENhcmRDbGFzc05hbWUgKz0gXCIgdXNlci1wbGF5bGlzdFwiO1xuICAgIH07XG5cbiAgICAvLyBUT0RPOiBVcGRhdGUgcGxhY2Vob2xkZXIgZm9yIGVtcHR5IHRodW1ibmFpbHNcbiAgICAvLyBGb3IgZW1wdHkgVGh1bWJuYWlsc1xuICAgIHZhciB0aHVtYm5haWwgPSB0aGlzLnByb3BzLnRodW1ibmFpbDtcbiAgICBpZiAodGh1bWJuYWlsID09PSBcIlwiIHx8IHRodW1ibmFpbCA9PT0gbnVsbCB8fCB0aHVtYm5haWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGh1bWJuYWlsID0gXCIvaW1hZ2VzL21lZGlhLWljb24ucG5nXCI7XG4gICAgfVxuXG4gICAgLy8gRG8gbm90IGFsbG93IHRoZSB1c2VyIHRvIGNsaWNrIG9uIHRoZSBwbGF5bGlzdFxuICAgIGlmICh0aGlzLnByb3BzLmhvbWUgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTMgY29sLXNtLTQgY29sLXBhZGRpbmdcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtwbGF5bGlzdENhcmRDbGFzc05hbWV9PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYXlsaXN0LWltZy1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8aW1nIGNsYXNzTmFtZT1cInBsYXlsaXN0LWltZ1wiIHNyYz17dGh1bWJuYWlsfSAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGF5bGlzdC10ZXh0LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxheWxpc3QtdGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cInBsYXlsaXN0LWxpbmsgcGxheWxpc3QtdGl0bGUtdGV4dCBlbGxpcHNlc1wiIGRhdGEtdG9nZ2xlPVwidGFiXCIgaHJlZj1cIiNvcGVuLXBsYXlsaXN0XCIgb25DbGljaz17dGhpcy5nb1RvUGxheWxpc3RQYWdlfT57dGhpcy5wcm9wcy50aXRsZX08L2E+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBpbGxcIiBkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIiB0aXRsZT1cIkl0ZW1zIGluIFBsYXlsaXN0XCI+e3RoaXMucHJvcHMuc2l6ZX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYXlsaXN0LWN1cmF0b3JcIj48YSBjbGFzc05hbWU9XCJjdXJhdG9yLWxpbmtcIiBkYXRhLXRvZ2dsZT1cInRhYlwiIGhyZWY9XCIjY3VyYXRvci1wYWdlXCIgb25DbGljaz17dGhpcy5nb1RvQ3VyYXRvclBhZ2V9Pnt0aGlzLnByb3BzLmN1cmF0b3J9PC9hPjwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGF5bGlzdC1pY29uLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxQbGF5bGlzdEljb24gb3duZXI9e3RoaXMucHJvcHMub3duZXJ9IHR5cGU9e3RoaXMucHJvcHMudHlwZX0gbGlrZWQ9e3RoaXMucHJvcHMubGlrZWR9Lz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC0zIGNvbC1zbS00IGNvbC1wYWRkaW5nXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3BsYXlsaXN0Q2FyZENsYXNzTmFtZX0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYXlsaXN0LWltZy1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIG9uQ2xpY2s9e3RoaXMucGxheVBsYXlsaXN0fT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYXlsaXN0LW92ZXJsYXlcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxheWxpc3Qtb3ZlcmxheS1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxheWxpc3QtcGxheS1pY29uXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtcGxheVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgUExBWSBBTExcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgIDxpbWcgY2xhc3NOYW1lPVwicGxheWxpc3QtaW1nXCIgc3JjPXt0aHVtYm5haWx9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxheWxpc3QtdGV4dC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGF5bGlzdC10aXRsZVwiPlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cInBsYXlsaXN0LWxpbmsgcGxheWxpc3QtdGl0bGUtdGV4dCBlbGxpcHNlc1wiIGRhdGEtdG9nZ2xlPVwidGFiXCIgaHJlZj1cIiNvcGVuLXBsYXlsaXN0XCIgb25DbGljaz17dGhpcy5nb1RvUGxheWxpc3RQYWdlfT57dGhpcy5wcm9wcy50aXRsZX08L2E+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwaWxsXCIgZGF0YS10b2dnbGU9XCJ0b29sdGlwXCIgdGl0bGU9XCJJdGVtcyBpbiBQbGF5bGlzdFwiPnt0aGlzLnByb3BzLnNpemV9PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYXlsaXN0LWN1cmF0b3JcIj48YSBjbGFzc05hbWU9XCJjdXJhdG9yLWxpbmtcIiBkYXRhLXRvZ2dsZT1cInRhYlwiIGhyZWY9XCIjY3VyYXRvci1wYWdlXCIgb25DbGljaz17dGhpcy5nb1RvQ3VyYXRvclBhZ2V9Pnt0aGlzLnByb3BzLmN1cmF0b3J9PC9hPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYXlsaXN0LWljb24tY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgIDxQbGF5bGlzdEljb24gb3duZXI9e3RoaXMucHJvcHMub3duZXJ9IHR5cGU9e3RoaXMucHJvcHMudHlwZX0gbGlrZWQ9e3RoaXMucHJvcHMubGlrZWR9Lz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUGxheWxpc3RFbnRyeTsiLCIvKiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBDb3B5cmlnaHQgwqkgXG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyogID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgUGxheWxpc3RUYWIuanN4XG5cbiAgICBQbGF5bGlzdCBUYWIuIFRoaXMgY29tcG9uZW5ldCBpcyB1c2VkIHRvIGRpc3BsYXkgdGhlIE15IFBsYXlsaXN0IHRhYi5cbiAgICBUaGlzIGNvbXBvbmVudCB3aWxsIG5vdCBhcHBlYXIgaWYgdGhlcmUgaXMgbm8gdXNlciBsb2dnZWQgaW4gZG8gdG8gYSBub25cbiAgICBsb2dnZWQgaW4gdXNlciBub3QgaGF2aW5nIGFueSBwbGF5bGlzdHMuIE9ubHkgc2hvd3MgdGhlIHRhYiBpZiB0aGUgdXNlciBpcyBsb2dnZWRcbiAgICBpblxuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIENvbXBvbmVudHNcblxuICAgIFBsYXlsaXN0VGFiIC0gRW50aXJlIGh0bWwgZm9yIHRoZSBIb21lIGNvbXBvbmVudC5cbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIFBsYXlsaXN0VGFiID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIC8vIFdoZW4gdGhlIHVzZXIgaXMgbm90IGxvZ2dlZCBpbiwgZG8gbm90IGRpc3BsYXkgdGhlIFBsYXlsaXN0IHRhYlxuICAgIGlmICh0aGlzLnByb3BzLnVzZXIgPT09IHVuZGVmaW5lZCB8fCB0aGlzLnByb3BzLnVzZXIgPT09IG51bGwgKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGVyZSBpcyBhIHVzZXIgbG9nZ2VkIGluLCBjaG9vc2VzIHRoZSBjb3JyZWN0IHRhYiB0eXBlXG4gICAgc3dpdGNoKHRoaXMucHJvcHMudHlwZSkge1xuICAgICAgY2FzZSBcIk15UGxheWxpc3QtbW9iaWxlXCI6XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGxpPlxuICAgICAgICAgICAgPGEgZGF0YS10b2dnbGU9XCJ0YWJcIiBocmVmPVwiI215cGxheWxpc3RzXCIgaWQ9XCJtb2JpbGUtdGFiLW15cGxheWxpc3RzXCI+XG4gICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWJvb2sgaWNvbi1wYWRkaW5nXCI+PC9pPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYi10ZXh0XCI+TXkgUGxheWxpc3RzPC9kaXY+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiTXlQbGF5bGlzdFwiOlxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgIDxhIGRhdGEtdG9nZ2xlPVwidGFiXCIgaHJlZj1cIiNteXBsYXlsaXN0c1wiIGlkPVwidGFiLW15cGxheWxpc3RzXCI+XG4gICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWJvb2sgaWNvbi1wYWRkaW5nXCI+PC9pPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYi10ZXh0XCI+TXkgUGxheWxpc3RzPC9kaXY+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm47XG4gICAgfVxuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBQbGF5bGlzdFRhYjsiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgUHVibGljUm9vbXMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cInNlYXJjaC1pbnB1dCBzZWFyY2gtaW5wdXQtZGFya1wiPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJTZWFyY2ggUHVibGljIFJvb21zLi4uXCIvPlxuICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBUZW1wIFBsYWNlaG9sZGVyICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtcGFkZGluZ1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxhY2Vob2xkZXIgcGxhY2Vob2xkZXItcm9vbXNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxhY2Vob2xkZXItY29udGVudFwiPlxuICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1nbG9iZSBwbGFjZWhvbGRlci1pY29uXCI+PC9pPjxici8+XG4gICAgICAgICAgICAgIDxzcGFuPlRoaXMgcGFnZSBpcyBzdGlsbCBiZWluZyBjcmVhdGVkPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBUT0RPOiBQdWJsaWMgUm9vbXMgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHVibGljcm9vbXMtY29udGFpbmVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFB1YmxpY1Jvb21zOyIsIi8qICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIENvcHlyaWdodCDCqSBcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBWSUVXOiBSb29tRW50cnkuanN4XG5cbiAgICBUaGUgaW5kaXZpZHVhbCBlbnRyeSBvZiBhIHJvb21cbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBAQ29tcG9uZW50czogICAgUm9vbVVzZXJzUGlsbFxuICAgICAgICAgICAgICAgICAgICBSb29tVGh1bWJuYWlsXG5cbiAgICBARXhwb3J0czogICAgICAgUm9vbUVudHJ5XG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbi8vIE9ubGluZSBVc2VycyBQaWxsLCBpY29uIGRpc3BsYXllZCBkZXBlbmRlbnQgb24gaG93IG1hbnkgdXNlcnMgaW4gcm9vbVxudmFyIFJvb21Vc2Vyc1BpbGwgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLnByb3BzLmlucm9vbSA8PSAwIHx8IHRoaXMucHJvcHMuaW5yb29tID09IG51bGwpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm9vbS1waWxsXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb29tLXVzZXJzXCI+XG4gICAgICAgICAgICAwXG4gICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS11c2VycyB1c2Vycy1idG4taWNvblwiPjwvaT5cbiAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWNpcmNsZSBzdGF0dXNcIj48L2k+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy5wcm9wcy5pbnJvb20gPD0gMikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb29tLXBpbGxcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvb20tdXNlcnNcIj5cbiAgICAgICAgICAgIHt0aGlzLnByb3BzLmlucm9vbX1cbiAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLXVzZXIgdXNlcnMtYnRuLWljb25cIj48L2k+XG4gICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1jaXJjbGUgc3RhdHVzXCI+PC9pPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb29tLXBpbGxcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvb20tdXNlcnNcIj5cbiAgICAgICAgICAgIHt0aGlzLnByb3BzLmlucm9vbX1cbiAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLXVzZXJzIHVzZXJzLWJ0bi1pY29uXCI+PC9pPlxuICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtY2lyY2xlIHN0YXR1c1wiPjwvaT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH07XG4gIH1cbn0pO1xuXG4vLyBSb29tIFRodW1ibmFpbCBcbnZhciBSb29tVGh1bWJuYWlsID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy50aHVtYm5haWwgIT09IG51bGwpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJyb29tLWltZ1wiIHNyYz17dGhpcy5wcm9wcy50aHVtYm5haWx9Lz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+PC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgfVxufSk7XG5cbi8vIE1BSU4gQ09NUE9ORU5UOiBFYWNoIGluZGl2aWR1YWwgcGxheWxpc3QgY2FyZFxudmFyIFJvb21FbnRyeSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcblxuICAgIHZhciByb29tQ2FyZENsYXNzTmFtZSA9IFwicm9vbS1jYXJkXCI7XG5cbiAgICAvLyBJZiByb29tIGlzIG5vdCBwbGF5aW5nIGFueXRoaW5nLCBhcHBlbmQgcm9vbS1jYXJkLWVtcHR5IHRvIGNsYXNzbmFtZVxuICAgIGlmICh0aGlzLnByb3BzLnRodW1ibmFpbCA9PT0gbnVsbCkge1xuICAgICAgcm9vbUNhcmRDbGFzc05hbWUgKz0gXCIgcm9vbS1jYXJkLWVtcHR5XCI7XG4gICAgfTtcblxuICAgIHZhciByb29taHJlZiA9IFwiL3Jvb20vXCIgKyB0aGlzLnByb3BzLmxpbmtIYXNoO1xuXG4gICAgLy8gSWYgcGFzc2VkIHRoZSBwcm9wIG9mIGlzTGl0ZSwgZ2VuZXJhdGUgY2FyZCB3aXRoIGxpdGUgdGhlbWUgaW5zdGVhZCBvZiBkYXJrXG4gICAgaWYgKHRoaXMucHJvcHMuaXNMaXRlID09IHRydWUpIHtcbiAgICAgIHJvb21DYXJkQ2xhc3NOYW1lICs9IFwiIHJvb20tY2FyZC1saXRlXCI7XG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS0zIGNvbC1wYWRkaW5nXCI+XG4gICAgICAgIHsvKiBUT0RPOiBtdXN0IGxpbmsgdG8gdGhlIHNwZWNpZmljIHJvb20gKi99XG4gICAgICAgIDxhIGhyZWY9e3Jvb21ocmVmfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17cm9vbUNhcmRDbGFzc05hbWV9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb29tLW92ZXJsYXlcIj48ZGl2IGNsYXNzTmFtZT1cInJvb20tb3ZlcmxheS1maWxsXCI+PC9kaXY+PC9kaXY+XG4gICAgICAgICAgICA8Um9vbVRodW1ibmFpbCB0aHVtYm5haWw9e3RoaXMucHJvcHMudGh1bWJuYWlsfSAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb29tLXRleHQtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm9vbS10aXRsZSBlbGxpcHNlc1wiPnt0aGlzLnByb3BzLm5hbWV9PC9kaXY+XG4gICAgICAgICAgICAgIDxSb29tVXNlcnNQaWxsIGlucm9vbT17dGhpcy5wcm9wcy5pbnJvb219IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9hPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUm9vbUVudHJ5OyIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBWaWV3T3BlbmVkUGxheWxpc3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPGRpdiBpZD1cIm9wZW4tcGxheWxpc3RcIiBjbGFzc05hbWU9XCJ0YWItcGFuZSBmYWRlXCI+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvcGVuLXBsYXlsaXN0LWNvbnRhaW5lclwiPlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWItcGFnZS1oZWFkZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFiLXBhZ2UtdGV4dC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiaWNvbi1idG5cIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+PGRpdiBjbGFzc05hbWU9XCJ0YWItcGFnZS1iYWNrLWJ0blwiPjxpIGNsYXNzTmFtZT1cImZhIGZhLWxnIGZhLWNoZXZyb24tY2lyY2xlLWxlZnRcIj48L2k+PC9kaXY+PC9hPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYi1wYWdlLXRpdGxlXCI+e3RoaXMucHJvcHMubmFtZX08L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWItcGFnZS1jdXJhdG9yXCI+XG4gICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiY3VyYXRvci1saW5rXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiPnt0aGlzLnByb3BzLm93bmVyfTwvYT5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFiLXBhZ2UtcmlnaHQtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFiLXBhZ2UtaWNvbi1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBpbGxcIj57dGhpcy5wcm9wcy5zaXplfSBJdGVtczwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2gtY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8Zm9ybSBjbGFzc05hbWU9XCJzZWFyY2gtaW5wdXRcIj5cbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIlwiIHBsYWNlaG9sZGVyPVwiU2VhcmNoIGluIFBsYXlsaXN0Li4uXCIvPlxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVmlld09wZW5lZFBsYXlsaXN0OyJdfQ==
