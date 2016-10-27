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

},{"./../../views/Room.jsx":55}],43:[function(require,module,exports){
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

},{"react":41}],44:[function(require,module,exports){
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

},{"../flux/actions/actions":1,"../flux/stores/store":4,"./MediaEntry.jsx":48,"react":41}],45:[function(require,module,exports){
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

},{"react":41}],46:[function(require,module,exports){
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

},{"react":41}],47:[function(require,module,exports){
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

},{"react":41}],48:[function(require,module,exports){
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

},{"../flux/actions/actions":1,"./ModalCreatePlaylist.jsx":50,"react":41}],49:[function(require,module,exports){
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
var StatusBar = require('./StatusBar.jsx');

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

},{"./StatusBar.jsx":57,"react":41}],50:[function(require,module,exports){
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

},{"../flux/actions/actions":1,"react":41}],51:[function(require,module,exports){
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

},{"./PlaylistEntry.jsx":52,"react":41}],52:[function(require,module,exports){
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

},{"../flux/actions/actions":1,"react":41}],53:[function(require,module,exports){
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

},{"react":41}],54:[function(require,module,exports){
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
var MediaEntry = require('./MediaEntry.jsx');

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
    var playPillClassName = "pill";
    if (this.props.playlistLength <= 0) {
      playPillClassName += " display-none";
    }
    return React.createElement(
      'div',
      { className: playPillClassName, 'data-toggle': 'tooltip', title: 'Items in Playlist' },
      this.props.playlistLength
    );
  }
});

var AddedMediaLength = React.createClass({
  displayName: 'AddedMediaLength',

  render: function render() {
    var addedPillClassName = "pill pill-blue";
    if (this.props.addedMediaLength <= 0) {
      addedPillClassName += " display-none";
    }
    return React.createElement(
      'div',
      { className: addedPillClassName, 'data-toggle': 'tooltip', title: 'Items Added' },
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

},{"./MediaEntry.jsx":48,"react":41}],55:[function(require,module,exports){
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
var Header = require('./Header.jsx');
var MediaPlayer = require('./MediaPlayer.jsx');
var Chatbox = require('./Chatbox.jsx');
var StatusBar = require('./StatusBar.jsx');
var Queue = require('./Queue.jsx');
var Explore = require('./Explore.jsx');
var MyPlaylists = require('./MyPlaylists.jsx');
var PlaylistTab = require('./PlaylistTab.jsx');
var EditOpenedPlaylist = require('./EditOpenedPlaylist.jsx');
var ViewOpenedPlaylist = require('./ViewOpenedPlaylist.jsx');
var ModalCreatePlaylist = require('./ModalCreatePlaylist.jsx');
var Search = require('./Search.jsx');
var Footer = require('./Footer.jsx');

// Flux, used to check for deleted playlists
var playlistStore = require('../flux/stores/store');

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
    // Sets up the Flux event listeners for the playlists
    playlistStore.addDeletePlaylistListener(this.onDeleteSpecifiedPlaylist);
    playlistStore.addUpdatePlaylistListener(this.onUpdateSpecifiedPlaylist);
    playlistStore.addCreatePlaylistListener(this.updateAllPlaylistEntries);

    // socket.on('From Server: Initialize room by pinging client first', this.initializeRoomInServerWithData);
    // socket.on("From Server: Update MyPlaylist with new playlists" , this.updateAllPlaylistEntries);
    socket.on("From Server: Update selected playlist", this.updateOnePlaylistEntry);

    socket.emit("From Client: Initialize room", {
      user: this.props.user,
      room: this.props.room
    });
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

    // TODO: Do search in a faster way
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

  // EVENT HANDLER: Initialize room for server
  initializeRoomInServerWithData: function initializeRoomInServerWithData() {
    socket.emit("From Client: Initialize room", {
      user: this.props.user,
      room: this.props.room
    });
  },

  // EVENT HANDLER: Update the playlist entry
  updateAllPlaylistEntries: function updateAllPlaylistEntries(newPlaylist) {
    console.log("Update with new playlist entry");
    var newPlaylist = playlistStore.getCreatedPlaylist();
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
                ),
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
                  React.createElement(MyPlaylists, { myPlaylists: this.state.myPlaylists })
                ),
                React.createElement(
                  'div',
                  { id: 'search', className: 'tab-pane fade' },
                  React.createElement(Search, { user: this.props.user, myPlaylists: this.state.myPlaylists })
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

module.exports = Room;

},{"../flux/stores/store":4,"./Chatbox.jsx":43,"./EditOpenedPlaylist.jsx":44,"./Explore.jsx":45,"./Footer.jsx":46,"./Header.jsx":47,"./MediaPlayer.jsx":49,"./ModalCreatePlaylist.jsx":50,"./MyPlaylists.jsx":51,"./PlaylistTab.jsx":53,"./Queue.jsx":54,"./Search.jsx":56,"./StatusBar.jsx":57,"./ViewOpenedPlaylist.jsx":58,"react":41}],56:[function(require,module,exports){
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
var MediaEntry = require('./MediaEntry.jsx');

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

},{"./MediaEntry.jsx":48,"react":41}],57:[function(require,module,exports){
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

},{"react":41}],58:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJmbHV4L2FjdGlvbnMvYWN0aW9ucy5qcyIsImZsdXgvY29uc3RhbnRzLmpzIiwiZmx1eC9kaXNwYXRjaGVyL0FwcERpc3BhdGNoZXIuanMiLCJmbHV4L3N0b3Jlcy9zdG9yZS5qcyIsIm5vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwibm9kZV9tb2R1bGVzL2ZianMvbGliL2VtcHR5RnVuY3Rpb24uanMiLCJub2RlX21vZHVsZXMvZmJqcy9saWIvZW1wdHlPYmplY3QuanMiLCJub2RlX21vZHVsZXMvZmJqcy9saWIvaW52YXJpYW50LmpzIiwibm9kZV9tb2R1bGVzL2ZianMvbGliL2tleU1pcnJvci5qcyIsIm5vZGVfbW9kdWxlcy9mYmpzL2xpYi9rZXlPZi5qcyIsIm5vZGVfbW9kdWxlcy9mYmpzL2xpYi93YXJuaW5nLmpzIiwibm9kZV9tb2R1bGVzL2ZsdXgvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZmx1eC9saWIvRGlzcGF0Y2hlci5qcyIsIm5vZGVfbW9kdWxlcy9mbHV4L25vZGVfbW9kdWxlcy9mYmpzL2xpYi9pbnZhcmlhbnQuanMiLCJub2RlX21vZHVsZXMvb2JqZWN0LWFzc2lnbi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL0tleUVzY2FwZVV0aWxzLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9Qb29sZWRDbGFzcy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvUmVhY3QuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1JlYWN0Q2hpbGRyZW4uanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1JlYWN0Q2xhc3MuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1JlYWN0Q29tcG9uZW50LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9SZWFjdENvbXBvbmVudFRyZWVIb29rLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9SZWFjdEN1cnJlbnRPd25lci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvUmVhY3RET01GYWN0b3JpZXMuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1JlYWN0RWxlbWVudC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvUmVhY3RFbGVtZW50VmFsaWRhdG9yLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9SZWFjdE5vb3BVcGRhdGVRdWV1ZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1JlYWN0UHJvcFR5cGVMb2NhdGlvbnMuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1JlYWN0UHJvcFR5cGVzLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvUmVhY3RQdXJlQ29tcG9uZW50LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9SZWFjdFZlcnNpb24uanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL2NhbkRlZmluZVByb3BlcnR5LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9jaGVja1JlYWN0VHlwZVNwZWMuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL2dldEl0ZXJhdG9yRm4uanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL29ubHlDaGlsZC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvcmVhY3RQcm9kSW52YXJpYW50LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi90cmF2ZXJzZUFsbENoaWxkcmVuLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L3JlYWN0LmpzIiwicHVibGljL2Jyb3dzZXJpZnkvcm9vbS5qcyIsInZpZXdzL0NoYXRib3guanN4Iiwidmlld3MvRWRpdE9wZW5lZFBsYXlsaXN0LmpzeCIsInZpZXdzL0V4cGxvcmUuanN4Iiwidmlld3MvRm9vdGVyLmpzeCIsInZpZXdzL0hlYWRlci5qc3giLCJ2aWV3cy9NZWRpYUVudHJ5LmpzeCIsInZpZXdzL01lZGlhUGxheWVyLmpzeCIsInZpZXdzL01vZGFsQ3JlYXRlUGxheWxpc3QuanN4Iiwidmlld3MvTXlQbGF5bGlzdHMuanN4Iiwidmlld3MvUGxheWxpc3RFbnRyeS5qc3giLCJ2aWV3cy9QbGF5bGlzdFRhYi5qc3giLCJ2aWV3cy9RdWV1ZS5qc3giLCJ2aWV3cy9Sb29tLmpzeCIsInZpZXdzL1NlYXJjaC5qc3giLCJ2aWV3cy9TdGF0dXNCYXIuanN4Iiwidmlld3MvVmlld09wZW5lZFBsYXlsaXN0LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBSSxnQkFBZ0IsUUFBUSw2QkFBUixDQUFwQjtBQUNBLElBQUksWUFBWSxRQUFRLGNBQVIsQ0FBaEI7O0FBRUEsSUFBSSxzQkFBc0I7QUFDeEIsbUJBQWlCLHlCQUFTLEdBQVQsRUFBYyxLQUFkLEVBQXFCLFlBQXJCLEVBQW1DO0FBQ2xELGtCQUFjLFlBQWQsQ0FBMkI7QUFDekIsa0JBQVksVUFBVSxZQURHO0FBRXpCLFdBQUssR0FGb0I7QUFHekIsYUFBTyxLQUhrQjtBQUl6QixlQUFTO0FBSmdCLEtBQTNCO0FBTUQsR0FSdUI7O0FBVXhCLGtCQUFnQix3QkFBUyxRQUFULEVBQW1CO0FBQ2pDLGtCQUFjLFlBQWQsQ0FBMkI7QUFDekIsa0JBQVksVUFBVSxjQURHO0FBRXpCLHVCQUFpQjtBQUZRLEtBQTNCO0FBSUQsR0FmdUI7O0FBaUJ4QixrQkFBZ0Isd0JBQVMsUUFBVCxFQUFtQjtBQUNqQyxrQkFBYyxZQUFkLENBQTJCO0FBQ3pCLGtCQUFZLFVBQVUsY0FERztBQUV6Qix1QkFBaUI7QUFGUSxLQUEzQjtBQUlELEdBdEJ1Qjs7QUF3QnhCLGtCQUFnQix3QkFBUyxRQUFULEVBQW1CO0FBQ2pDLGtCQUFjLFlBQWQsQ0FBMkI7QUFDekIsa0JBQVksVUFBVSxjQURH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LEdBQWlCLFFBQWpCOzs7QUMvR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUN0T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ3hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDeEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzlMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDM3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNySEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDclZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUN6S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQzNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDbk9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUMvRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzlhQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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VSwwQkFBZjtBQUNFO0FBQUE7QUFBQSxnQkFBSyxXQUFVLHlCQUFmO0FBQ0U7QUFBQTtBQUFBLGtCQUFLLFdBQVUsTUFBZjtBQUF1QixxQkFBSyxLQUFMLENBQVcsSUFBbEM7QUFBQTtBQUFBO0FBREY7QUFERjtBQVJGLFNBRkY7QUFpQkU7QUFBQTtBQUFBLFlBQUssV0FBVSxrQkFBZjtBQUNFO0FBQUE7QUFBQSxjQUFNLFdBQVUsY0FBaEI7QUFDRSwyQ0FBTyxNQUFLLE1BQVosRUFBbUIsTUFBSyxFQUF4QixFQUEyQixhQUFZLHVCQUF2QztBQURGO0FBREY7QUFqQkY7QUFGRixLQURGO0FBNkJEO0FBL0J3QyxDQUFsQixDQUF6Qjs7QUFrQ0EsT0FBTyxPQUFQLEdBQWlCLGtCQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgQXBwRGlzcGF0Y2hlciA9IHJlcXVpcmUoJy4uL2Rpc3BhdGNoZXIvQXBwRGlzcGF0Y2hlcicpO1xudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2NvbnN0YW50cycpO1xuXG52YXIgRWRpdFBsYXlsaXN0QWN0aW9ucyA9IHtcbiAgZGlzcGxheVBsYXlsaXN0OiBmdW5jdGlvbihfaWQsIGluZGV4LCBtZWRpYUVudHJpZXMpIHtcbiAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZUFjdGlvbih7XG4gICAgICBhY3Rpb25UeXBlOiBjb25zdGFudHMuRURJVFBMQVlMSVNULFxuICAgICAgX2lkOiBfaWQsXG4gICAgICBpbmRleDogaW5kZXgsXG4gICAgICBlbnRyaWVzOiBtZWRpYUVudHJpZXNcbiAgICB9KTtcbiAgfSxcblxuICBkZWxldGVQbGF5bGlzdDogZnVuY3Rpb24ocGxheWxpc3QpIHtcbiAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZUFjdGlvbih7XG4gICAgICBhY3Rpb25UeXBlOiBjb25zdGFudHMuREVMRVRFUExBWUxJU1QsXG4gICAgICBwbGF5bGlzdERlbGV0ZWQ6IHBsYXlsaXN0XG4gICAgfSk7XG4gIH0sXG5cbiAgdXBkYXRlUGxheWxpc3Q6IGZ1bmN0aW9uKHBsYXlsaXN0KSB7XG4gICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVBY3Rpb24oe1xuICAgICAgYWN0aW9uVHlwZTogY29uc3RhbnRzLlVQREFURVBMQVlMSVNULFxuICAgICAgdXBkYXRlZFBsYXlsaXN0OiBwbGF5bGlzdFxuICAgIH0pO1xuICB9LFxuXG4gIGNyZWF0ZVBsYXlsaXN0OiBmdW5jdGlvbihwbGF5bGlzdCkge1xuICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlQWN0aW9uKHtcbiAgICAgIGFjdGlvblR5cGU6IGNvbnN0YW50cy5DUkVBVEVQTEFZTElTVCxcbiAgICAgIGNyZWF0ZWROZXdQbGF5bGlzdDogcGxheWxpc3RcbiAgICB9KTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBFZGl0UGxheWxpc3RBY3Rpb25zOyIsInZhciBjb25zdGFudHMgPSB7XG4gIEVESVRQTEFZTElTVDogXCJFRElUUExBWUxJU1RcIixcbiAgREVMRVRFUExBWUxJU1Q6IFwiREVMRVRFUExBWUxJU1RcIixcbiAgVVBEQVRFUExBWUxJU1Q6IFwiVVBEQVRFUExBWUxJU1RcIixcbiAgQ1JFQVRFUExBWUxJU1Q6IFwiQ1JFQVRFUExBWUxJU1RcIlxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnN0YW50czsiLCJ2YXIgRGlzcGF0Y2hlciA9IHJlcXVpcmUoJ2ZsdXgnKS5EaXNwYXRjaGVyO1xudmFyIEFwcERpc3BhdGNoZXIgPSBuZXcgRGlzcGF0Y2hlcigpO1xuXG5BcHBEaXNwYXRjaGVyLmhhbmRsZUFjdGlvbiA9IGZ1bmN0aW9uKGFjdGlvbikge1xuICB0aGlzLmRpc3BhdGNoKHtcbiAgICBzb3VyY2U6ICdWSUVXX0FDVElPTicsXG4gICAgYWN0aW9uOiBhY3Rpb25cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFwcERpc3BhdGNoZXI7IiwidmFyIEFwcERpc3BhdGNoZXIgPSByZXF1aXJlKCcuLi9kaXNwYXRjaGVyL0FwcERpc3BhdGNoZXInKTtcbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuLi9jb25zdGFudHMnKTtcbnZhciBvYmplY3RBc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG52YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyO1xuXG52YXIgQ0hBTkdFX0VWRU5UID0gJ2NoYW5nZSc7XG52YXIgRVZFTlRfREVMRVRFX1BMQVlMSVNUID0gJ0VWRU5UX0RFTEVURV9QTEFZTElTVCc7XG52YXIgRVZFTlRfVVBEQVRFX1BMQVlMSVNUID0gJ0VWRU5UX1VQREFURV9QTEFZTElTVCc7XG52YXIgRVZFTlRfQ1JFQVRFX1BMQVlMSVNUID0gJ0VWRU5UX0NSRUFURV9QTEFZTElTVCc7XG5cblxudmFyIHN0b3JlID0ge1xuICBfaWQ6IG51bGwsXG5cdGluZGV4OiBudWxsLFxuICBlbnRyaWVzOiBudWxsLFxuICBwbGF5bGlzdERlbGV0ZWQ6IG51bGwsXG4gIHVwZGF0ZWRQbGF5bGlzdDogbnVsbCxcbiAgY3JlYXRlZE5ld1BsYXlsaXN0OiBudWxsXG59O1xuXG52YXIgZGlzcGxheUluZGV4ID0gZnVuY3Rpb24oX2lkLCBuZXdQb3MsIG1lZGlhRW50cmllcykge1xuICBzdG9yZS5faWQgPSBfaWQ7XG4gIHN0b3JlLmluZGV4ID0gbmV3UG9zO1xuICBzdG9yZS5lbnRyaWVzID0gbWVkaWFFbnRyaWVzO1xufTtcblxudmFyIGRlbGV0ZVBsYXlsaXN0ID0gZnVuY3Rpb24ocGxheWxpc3QpIHtcbiAgc3RvcmUucGxheWxpc3REZWxldGVkID0gcGxheWxpc3Q7XG59O1xuXG52YXIgdXBkYXRlUGxheWxpc3QgPSBmdW5jdGlvbihwbGF5bGlzdCkge1xuICBzdG9yZS51cGRhdGVkUGxheWxpc3QgPSBwbGF5bGlzdDtcbn07XG5cbnZhciBjcmVhdGVQbGF5bGlzdCA9IGZ1bmN0aW9uKHBsYXlsaXN0KSB7XG4gIHN0b3JlLmNyZWF0ZWROZXdQbGF5bGlzdCA9IHBsYXlsaXN0O1xufVxuXG52YXIgQXBwU3RvcmUgPSBvYmplY3RBc3NpZ24oe30sIEV2ZW50RW1pdHRlci5wcm90b3R5cGUsIHsgXG4gIGFkZENoYW5nZUxpc3RlbmVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgIHRoaXMub24oQ0hBTkdFX0VWRU5ULCBjYWxsYmFjayk7XG4gIH0sXG4gIGFkZERlbGV0ZVBsYXlsaXN0TGlzdGVuZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5vbihFVkVOVF9ERUxFVEVfUExBWUxJU1QsIGNhbGxiYWNrKTtcbiAgfSxcbiAgYWRkVXBkYXRlUGxheWxpc3RMaXN0ZW5lcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICB0aGlzLm9uKEVWRU5UX1VQREFURV9QTEFZTElTVCwgY2FsbGJhY2spO1xuICB9LFxuICBhZGRDcmVhdGVQbGF5bGlzdExpc3RlbmVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgIHRoaXMub24oRVZFTlRfQ1JFQVRFX1BMQVlMSVNULCBjYWxsYmFjayk7XG4gIH0sXG5cbiAgcmVtb3ZlQ2hhbmdlTGlzdGVuZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcihDSEFOR0VfRVZFTlQsIGNhbGxiYWNrKTtcbiAgfSxcbiAgcmVtb3ZlRGVsZXRlUGxheWxpc3RMaXN0ZW5lcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKEVWRU5UX0RFTEVURV9QTEFZTElTVCwgY2FsbGJhY2spO1xuICB9LFxuICByZW1vdmVVcGRhdGVQbGF5bGlzdExpc3RlbmVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoRVZFTlRfVVBEQVRFX1BMQVlMSVNULCBjYWxsYmFjayk7XG4gIH0sXG4gIHJlbW92ZUNyZWF0ZVBsYXlsaXN0TGlzdGVuZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcihFVkVOVF9DUkVBVEVfUExBWUxJU1QsIGNhbGxiYWNrKTtcbiAgfSxcblxuICBnZXRJZDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHN0b3JlLl9pZDtcbiAgfSxcbiAgZ2V0SW5kZXg6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBzdG9yZS5pbmRleDtcbiAgfSxcbiAgZ2V0RW50cmllczogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHN0b3JlLmVudHJpZXM7XG4gIH0sXG4gIGdldFBsYXlsaXN0RGVsZXRlZDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHN0b3JlLnBsYXlsaXN0RGVsZXRlZDtcbiAgfSxcbiAgZ2V0VXBkYXRlZFBsYXlsaXN0OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gc3RvcmUudXBkYXRlZFBsYXlsaXN0O1xuICB9LFxuICBnZXRDcmVhdGVkUGxheWxpc3Q6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBzdG9yZS5jcmVhdGVkTmV3UGxheWxpc3Q7XG4gIH1cbn0pO1xuXG5BcHBEaXNwYXRjaGVyLnJlZ2lzdGVyKGZ1bmN0aW9uKHBheWxvYWQpIHtcbiAgdmFyIGFjdGlvbiA9IHBheWxvYWQuYWN0aW9uO1xuICBzd2l0Y2goYWN0aW9uLmFjdGlvblR5cGUpIHtcbiAgICBjYXNlIGNvbnN0YW50cy5FRElUUExBWUxJU1Q6XG4gICAgICBkaXNwbGF5SW5kZXgoYWN0aW9uLl9pZCwgYWN0aW9uLmluZGV4LCBhY3Rpb24uZW50cmllcyk7XG4gICAgICBBcHBTdG9yZS5lbWl0KENIQU5HRV9FVkVOVCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIGNvbnN0YW50cy5ERUxFVEVQTEFZTElTVDpcbiAgICAgIGRlbGV0ZVBsYXlsaXN0KGFjdGlvbi5wbGF5bGlzdERlbGV0ZWQpO1xuICAgICAgQXBwU3RvcmUuZW1pdChFVkVOVF9ERUxFVEVfUExBWUxJU1QpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBjb25zdGFudHMuVVBEQVRFUExBWUxJU1Q6XG4gICAgICB1cGRhdGVQbGF5bGlzdChhY3Rpb24udXBkYXRlZFBsYXlsaXN0KTtcbiAgICAgIEFwcFN0b3JlLmVtaXQoRVZFTlRfVVBEQVRFX1BMQVlMSVNUKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgY29uc3RhbnRzLkNSRUFURVBMQVlMSVNUOlxuICAgICAgY3JlYXRlUGxheWxpc3QoYWN0aW9uLmNyZWF0ZWROZXdQbGF5bGlzdCk7XG4gICAgICBBcHBTdG9yZS5lbWl0KEVWRU5UX0NSRUFURV9QTEFZTElTVCk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgY29uc29sZS5sb2coXCJGbHV4L3N0b3JlLmpzOiBOT1QgU1VQUE9TRSBUTyBCRSBIRVJFXCIpO1xuICAgICAgY29uc29sZS5sb2coYWN0aW9uKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBcHBTdG9yZTsiLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICB0aGlzLl9ldmVudHMgPSB0aGlzLl9ldmVudHMgfHwge307XG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbkV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uKG4pIHtcbiAgaWYgKCFpc051bWJlcihuKSB8fCBuIDwgMCB8fCBpc05hTihuKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ24gbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlcicpO1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGVyLCBoYW5kbGVyLCBsZW4sIGFyZ3MsIGksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmICh0eXBlID09PSAnZXJyb3InKSB7XG4gICAgaWYgKCF0aGlzLl9ldmVudHMuZXJyb3IgfHxcbiAgICAgICAgKGlzT2JqZWN0KHRoaXMuX2V2ZW50cy5lcnJvcikgJiYgIXRoaXMuX2V2ZW50cy5lcnJvci5sZW5ndGgpKSB7XG4gICAgICBlciA9IGFyZ3VtZW50c1sxXTtcbiAgICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmNhdWdodCwgdW5zcGVjaWZpZWQgXCJlcnJvclwiIGV2ZW50LiAoJyArIGVyICsgJyknKTtcbiAgICAgICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzVW5kZWZpbmVkKGhhbmRsZXIpKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAoaXNGdW5jdGlvbihoYW5kbGVyKSkge1xuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgLy8gZmFzdCBjYXNlc1xuICAgICAgY2FzZSAxOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gc2xvd2VyXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgaGFuZGxlci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNPYmplY3QoaGFuZGxlcikpIHtcbiAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICBsaXN0ZW5lcnMgPSBoYW5kbGVyLnNsaWNlKCk7XG4gICAgbGVuID0gbGlzdGVuZXJzLmxlbmd0aDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspXG4gICAgICBsaXN0ZW5lcnNbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICBpZiAodGhpcy5fZXZlbnRzLm5ld0xpc3RlbmVyKVxuICAgIHRoaXMuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICBpc0Z1bmN0aW9uKGxpc3RlbmVyLmxpc3RlbmVyKSA/XG4gICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICBlbHNlIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG4gIGVsc2VcbiAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBbdGhpcy5fZXZlbnRzW3R5cGVdLCBsaXN0ZW5lcl07XG5cbiAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkgJiYgIXRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQpIHtcbiAgICBpZiAoIWlzVW5kZWZpbmVkKHRoaXMuX21heExpc3RlbmVycykpIHtcbiAgICAgIG0gPSB0aGlzLl9tYXhMaXN0ZW5lcnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgICB9XG5cbiAgICBpZiAobSAmJiBtID4gMCAmJiB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoID4gbSkge1xuICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCA9IHRydWU7XG4gICAgICBjb25zb2xlLmVycm9yKCcobm9kZSkgd2FybmluZzogcG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2xlYWsgZGV0ZWN0ZWQuICVkIGxpc3RlbmVycyBhZGRlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICdVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byBpbmNyZWFzZSBsaW1pdC4nLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoKTtcbiAgICAgIGlmICh0eXBlb2YgY29uc29sZS50cmFjZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBub3Qgc3VwcG9ydGVkIGluIElFIDEwXG4gICAgICAgIGNvbnNvbGUudHJhY2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgdmFyIGZpcmVkID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gZygpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGcpO1xuXG4gICAgaWYgKCFmaXJlZCkge1xuICAgICAgZmlyZWQgPSB0cnVlO1xuICAgICAgbGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cblxuICBnLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHRoaXMub24odHlwZSwgZyk7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBlbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWZmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZFxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBsaXN0LCBwb3NpdGlvbiwgbGVuZ3RoLCBpO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIGxpc3QgPSB0aGlzLl9ldmVudHNbdHlwZV07XG4gIGxlbmd0aCA9IGxpc3QubGVuZ3RoO1xuICBwb3NpdGlvbiA9IC0xO1xuXG4gIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fFxuICAgICAgKGlzRnVuY3Rpb24obGlzdC5saXN0ZW5lcikgJiYgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcblxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGxpc3QpKSB7XG4gICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gPiAwOykge1xuICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8XG4gICAgICAgICAgKGxpc3RbaV0ubGlzdGVuZXIgJiYgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgICBsaXN0Lmxlbmd0aCA9IDA7XG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0LnNwbGljZShwb3NpdGlvbiwgMSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIga2V5LCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICBpZiAoIXRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgZWxzZSBpZiAodGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIGZvciAoa2V5IGluIHRoaXMuX2V2ZW50cykge1xuICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgIH1cbiAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNGdW5jdGlvbihsaXN0ZW5lcnMpKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICB9IGVsc2UgaWYgKGxpc3RlbmVycykge1xuICAgIC8vIExJRk8gb3JkZXJcbiAgICB3aGlsZSAobGlzdGVuZXJzLmxlbmd0aClcbiAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2xpc3RlbmVycy5sZW5ndGggLSAxXSk7XG4gIH1cbiAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgcmV0O1xuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldCA9IFtdO1xuICBlbHNlIGlmIChpc0Z1bmN0aW9uKHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgcmV0ID0gW3RoaXMuX2V2ZW50c1t0eXBlXV07XG4gIGVsc2VcbiAgICByZXQgPSB0aGlzLl9ldmVudHNbdHlwZV0uc2xpY2UoKTtcbiAgcmV0dXJuIHJldDtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgaWYgKHRoaXMuX2V2ZW50cykge1xuICAgIHZhciBldmxpc3RlbmVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKGlzRnVuY3Rpb24oZXZsaXN0ZW5lcikpXG4gICAgICByZXR1cm4gMTtcbiAgICBlbHNlIGlmIChldmxpc3RlbmVyKVxuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICB9XG4gIHJldHVybiAwO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG59O1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09PSB2b2lkIDA7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIFxuICovXG5cbmZ1bmN0aW9uIG1ha2VFbXB0eUZ1bmN0aW9uKGFyZykge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBhcmc7XG4gIH07XG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBhY2NlcHRzIGFuZCBkaXNjYXJkcyBpbnB1dHM7IGl0IGhhcyBubyBzaWRlIGVmZmVjdHMuIFRoaXMgaXNcbiAqIHByaW1hcmlseSB1c2VmdWwgaWRpb21hdGljYWxseSBmb3Igb3ZlcnJpZGFibGUgZnVuY3Rpb24gZW5kcG9pbnRzIHdoaWNoXG4gKiBhbHdheXMgbmVlZCB0byBiZSBjYWxsYWJsZSwgc2luY2UgSlMgbGFja3MgYSBudWxsLWNhbGwgaWRpb20gYWxhIENvY29hLlxuICovXG52YXIgZW1wdHlGdW5jdGlvbiA9IGZ1bmN0aW9uIGVtcHR5RnVuY3Rpb24oKSB7fTtcblxuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJucyA9IG1ha2VFbXB0eUZ1bmN0aW9uO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc0ZhbHNlID0gbWFrZUVtcHR5RnVuY3Rpb24oZmFsc2UpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc1RydWUgPSBtYWtlRW1wdHlGdW5jdGlvbih0cnVlKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsID0gbWFrZUVtcHR5RnVuY3Rpb24obnVsbCk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zVGhpcyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXM7XG59O1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc0FyZ3VtZW50ID0gZnVuY3Rpb24gKGFyZykge1xuICByZXR1cm4gYXJnO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBlbXB0eUZ1bmN0aW9uOyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW1wdHlPYmplY3QgPSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgT2JqZWN0LmZyZWV6ZShlbXB0eU9iamVjdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZW1wdHlPYmplY3Q7IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXNlIGludmFyaWFudCgpIHRvIGFzc2VydCBzdGF0ZSB3aGljaCB5b3VyIHByb2dyYW0gYXNzdW1lcyB0byBiZSB0cnVlLlxuICpcbiAqIFByb3ZpZGUgc3ByaW50Zi1zdHlsZSBmb3JtYXQgKG9ubHkgJXMgaXMgc3VwcG9ydGVkKSBhbmQgYXJndW1lbnRzXG4gKiB0byBwcm92aWRlIGluZm9ybWF0aW9uIGFib3V0IHdoYXQgYnJva2UgYW5kIHdoYXQgeW91IHdlcmVcbiAqIGV4cGVjdGluZy5cbiAqXG4gKiBUaGUgaW52YXJpYW50IG1lc3NhZ2Ugd2lsbCBiZSBzdHJpcHBlZCBpbiBwcm9kdWN0aW9uLCBidXQgdGhlIGludmFyaWFudFxuICogd2lsbCByZW1haW4gdG8gZW5zdXJlIGxvZ2ljIGRvZXMgbm90IGRpZmZlciBpbiBwcm9kdWN0aW9uLlxuICovXG5cbmZ1bmN0aW9uIGludmFyaWFudChjb25kaXRpb24sIGZvcm1hdCwgYSwgYiwgYywgZCwgZSwgZikge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhcmlhbnQgcmVxdWlyZXMgYW4gZXJyb3IgbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdmFyIGVycm9yO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgKyAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ3MgPSBbYSwgYiwgYywgZCwgZSwgZl07XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgICB9KSk7XG4gICAgICBlcnJvci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGludmFyaWFudDsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHR5cGVjaGVja3Mgc3RhdGljLW9ubHlcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCcuL2ludmFyaWFudCcpO1xuXG4vKipcbiAqIENvbnN0cnVjdHMgYW4gZW51bWVyYXRpb24gd2l0aCBrZXlzIGVxdWFsIHRvIHRoZWlyIHZhbHVlLlxuICpcbiAqIEZvciBleGFtcGxlOlxuICpcbiAqICAgdmFyIENPTE9SUyA9IGtleU1pcnJvcih7Ymx1ZTogbnVsbCwgcmVkOiBudWxsfSk7XG4gKiAgIHZhciBteUNvbG9yID0gQ09MT1JTLmJsdWU7XG4gKiAgIHZhciBpc0NvbG9yVmFsaWQgPSAhIUNPTE9SU1tteUNvbG9yXTtcbiAqXG4gKiBUaGUgbGFzdCBsaW5lIGNvdWxkIG5vdCBiZSBwZXJmb3JtZWQgaWYgdGhlIHZhbHVlcyBvZiB0aGUgZ2VuZXJhdGVkIGVudW0gd2VyZVxuICogbm90IGVxdWFsIHRvIHRoZWlyIGtleXMuXG4gKlxuICogICBJbnB1dDogIHtrZXkxOiB2YWwxLCBrZXkyOiB2YWwyfVxuICogICBPdXRwdXQ6IHtrZXkxOiBrZXkxLCBrZXkyOiBrZXkyfVxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge29iamVjdH1cbiAqL1xudmFyIGtleU1pcnJvciA9IGZ1bmN0aW9uIGtleU1pcnJvcihvYmopIHtcbiAgdmFyIHJldCA9IHt9O1xuICB2YXIga2V5O1xuICAhKG9iaiBpbnN0YW5jZW9mIE9iamVjdCAmJiAhQXJyYXkuaXNBcnJheShvYmopKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdrZXlNaXJyb3IoLi4uKTogQXJndW1lbnQgbXVzdCBiZSBhbiBvYmplY3QuJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICBmb3IgKGtleSBpbiBvYmopIHtcbiAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgcmV0W2tleV0gPSBrZXk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ga2V5TWlycm9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbi8qKlxuICogQWxsb3dzIGV4dHJhY3Rpb24gb2YgYSBtaW5pZmllZCBrZXkuIExldCdzIHRoZSBidWlsZCBzeXN0ZW0gbWluaWZ5IGtleXNcbiAqIHdpdGhvdXQgbG9zaW5nIHRoZSBhYmlsaXR5IHRvIGR5bmFtaWNhbGx5IHVzZSBrZXkgc3RyaW5ncyBhcyB2YWx1ZXNcbiAqIHRoZW1zZWx2ZXMuIFBhc3MgaW4gYW4gb2JqZWN0IHdpdGggYSBzaW5nbGUga2V5L3ZhbCBwYWlyIGFuZCBpdCB3aWxsIHJldHVyblxuICogeW91IHRoZSBzdHJpbmcga2V5IG9mIHRoYXQgc2luZ2xlIHJlY29yZC4gU3VwcG9zZSB5b3Ugd2FudCB0byBncmFiIHRoZVxuICogdmFsdWUgZm9yIGEga2V5ICdjbGFzc05hbWUnIGluc2lkZSBvZiBhbiBvYmplY3QuIEtleS92YWwgbWluaWZpY2F0aW9uIG1heVxuICogaGF2ZSBhbGlhc2VkIHRoYXQga2V5IHRvIGJlICd4YTEyJy4ga2V5T2Yoe2NsYXNzTmFtZTogbnVsbH0pIHdpbGwgcmV0dXJuXG4gKiAneGExMicgaW4gdGhhdCBjYXNlLiBSZXNvbHZlIGtleXMgeW91IHdhbnQgdG8gdXNlIG9uY2UgYXQgc3RhcnR1cCB0aW1lLCB0aGVuXG4gKiByZXVzZSB0aG9zZSByZXNvbHV0aW9ucy5cbiAqL1xudmFyIGtleU9mID0gZnVuY3Rpb24ga2V5T2Yob25lS2V5T2JqKSB7XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIG9uZUtleU9iaikge1xuICAgIGlmICghb25lS2V5T2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICByZXR1cm4ga2V5O1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBrZXlPZjsiLCIvKipcbiAqIENvcHlyaWdodCAyMDE0LTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJy4vZW1wdHlGdW5jdGlvbicpO1xuXG4vKipcbiAqIFNpbWlsYXIgdG8gaW52YXJpYW50IGJ1dCBvbmx5IGxvZ3MgYSB3YXJuaW5nIGlmIHRoZSBjb25kaXRpb24gaXMgbm90IG1ldC5cbiAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gbG9nIGlzc3VlcyBpbiBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMgaW4gY3JpdGljYWxcbiAqIHBhdGhzLiBSZW1vdmluZyB0aGUgbG9nZ2luZyBjb2RlIGZvciBwcm9kdWN0aW9uIGVudmlyb25tZW50cyB3aWxsIGtlZXAgdGhlXG4gKiBzYW1lIGxvZ2ljIGFuZCBmb2xsb3cgdGhlIHNhbWUgY29kZSBwYXRocy5cbiAqL1xuXG52YXIgd2FybmluZyA9IGVtcHR5RnVuY3Rpb247XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHByaW50V2FybmluZyA9IGZ1bmN0aW9uIHByaW50V2FybmluZyhmb3JtYXQpIHtcbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgIH0pO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAgIH0gY2F0Y2ggKHgpIHt9XG4gICAgfTtcblxuICAgIHdhcm5pbmcgPSBmdW5jdGlvbiB3YXJuaW5nKGNvbmRpdGlvbiwgZm9ybWF0KSB7XG4gICAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdgd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICsgJ21lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZvcm1hdC5pbmRleE9mKCdGYWlsZWQgQ29tcG9zaXRlIHByb3BUeXBlOiAnKSA9PT0gMCkge1xuICAgICAgICByZXR1cm47IC8vIElnbm9yZSBDb21wb3NpdGVDb21wb25lbnQgcHJvcHR5cGUgY2hlY2suXG4gICAgICB9XG5cbiAgICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4yID4gMiA/IF9sZW4yIC0gMiA6IDApLCBfa2V5MiA9IDI7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgICBhcmdzW19rZXkyIC0gMl0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpbnRXYXJuaW5nLmFwcGx5KHVuZGVmaW5lZCwgW2Zvcm1hdF0uY29uY2F0KGFyZ3MpKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KSgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdhcm5pbmc7IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cbm1vZHVsZS5leHBvcnRzLkRpc3BhdGNoZXIgPSByZXF1aXJlKCcuL2xpYi9EaXNwYXRjaGVyJyk7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIERpc3BhdGNoZXJcbiAqIFxuICogQHByZXZlbnRNdW5nZVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcblxudmFyIF9wcmVmaXggPSAnSURfJztcblxuLyoqXG4gKiBEaXNwYXRjaGVyIGlzIHVzZWQgdG8gYnJvYWRjYXN0IHBheWxvYWRzIHRvIHJlZ2lzdGVyZWQgY2FsbGJhY2tzLiBUaGlzIGlzXG4gKiBkaWZmZXJlbnQgZnJvbSBnZW5lcmljIHB1Yi1zdWIgc3lzdGVtcyBpbiB0d28gd2F5czpcbiAqXG4gKiAgIDEpIENhbGxiYWNrcyBhcmUgbm90IHN1YnNjcmliZWQgdG8gcGFydGljdWxhciBldmVudHMuIEV2ZXJ5IHBheWxvYWQgaXNcbiAqICAgICAgZGlzcGF0Y2hlZCB0byBldmVyeSByZWdpc3RlcmVkIGNhbGxiYWNrLlxuICogICAyKSBDYWxsYmFja3MgY2FuIGJlIGRlZmVycmVkIGluIHdob2xlIG9yIHBhcnQgdW50aWwgb3RoZXIgY2FsbGJhY2tzIGhhdmVcbiAqICAgICAgYmVlbiBleGVjdXRlZC5cbiAqXG4gKiBGb3IgZXhhbXBsZSwgY29uc2lkZXIgdGhpcyBoeXBvdGhldGljYWwgZmxpZ2h0IGRlc3RpbmF0aW9uIGZvcm0sIHdoaWNoXG4gKiBzZWxlY3RzIGEgZGVmYXVsdCBjaXR5IHdoZW4gYSBjb3VudHJ5IGlzIHNlbGVjdGVkOlxuICpcbiAqICAgdmFyIGZsaWdodERpc3BhdGNoZXIgPSBuZXcgRGlzcGF0Y2hlcigpO1xuICpcbiAqICAgLy8gS2VlcHMgdHJhY2sgb2Ygd2hpY2ggY291bnRyeSBpcyBzZWxlY3RlZFxuICogICB2YXIgQ291bnRyeVN0b3JlID0ge2NvdW50cnk6IG51bGx9O1xuICpcbiAqICAgLy8gS2VlcHMgdHJhY2sgb2Ygd2hpY2ggY2l0eSBpcyBzZWxlY3RlZFxuICogICB2YXIgQ2l0eVN0b3JlID0ge2NpdHk6IG51bGx9O1xuICpcbiAqICAgLy8gS2VlcHMgdHJhY2sgb2YgdGhlIGJhc2UgZmxpZ2h0IHByaWNlIG9mIHRoZSBzZWxlY3RlZCBjaXR5XG4gKiAgIHZhciBGbGlnaHRQcmljZVN0b3JlID0ge3ByaWNlOiBudWxsfVxuICpcbiAqIFdoZW4gYSB1c2VyIGNoYW5nZXMgdGhlIHNlbGVjdGVkIGNpdHksIHdlIGRpc3BhdGNoIHRoZSBwYXlsb2FkOlxuICpcbiAqICAgZmxpZ2h0RGlzcGF0Y2hlci5kaXNwYXRjaCh7XG4gKiAgICAgYWN0aW9uVHlwZTogJ2NpdHktdXBkYXRlJyxcbiAqICAgICBzZWxlY3RlZENpdHk6ICdwYXJpcydcbiAqICAgfSk7XG4gKlxuICogVGhpcyBwYXlsb2FkIGlzIGRpZ2VzdGVkIGJ5IGBDaXR5U3RvcmVgOlxuICpcbiAqICAgZmxpZ2h0RGlzcGF0Y2hlci5yZWdpc3RlcihmdW5jdGlvbihwYXlsb2FkKSB7XG4gKiAgICAgaWYgKHBheWxvYWQuYWN0aW9uVHlwZSA9PT0gJ2NpdHktdXBkYXRlJykge1xuICogICAgICAgQ2l0eVN0b3JlLmNpdHkgPSBwYXlsb2FkLnNlbGVjdGVkQ2l0eTtcbiAqICAgICB9XG4gKiAgIH0pO1xuICpcbiAqIFdoZW4gdGhlIHVzZXIgc2VsZWN0cyBhIGNvdW50cnksIHdlIGRpc3BhdGNoIHRoZSBwYXlsb2FkOlxuICpcbiAqICAgZmxpZ2h0RGlzcGF0Y2hlci5kaXNwYXRjaCh7XG4gKiAgICAgYWN0aW9uVHlwZTogJ2NvdW50cnktdXBkYXRlJyxcbiAqICAgICBzZWxlY3RlZENvdW50cnk6ICdhdXN0cmFsaWEnXG4gKiAgIH0pO1xuICpcbiAqIFRoaXMgcGF5bG9hZCBpcyBkaWdlc3RlZCBieSBib3RoIHN0b3JlczpcbiAqXG4gKiAgIENvdW50cnlTdG9yZS5kaXNwYXRjaFRva2VuID0gZmxpZ2h0RGlzcGF0Y2hlci5yZWdpc3RlcihmdW5jdGlvbihwYXlsb2FkKSB7XG4gKiAgICAgaWYgKHBheWxvYWQuYWN0aW9uVHlwZSA9PT0gJ2NvdW50cnktdXBkYXRlJykge1xuICogICAgICAgQ291bnRyeVN0b3JlLmNvdW50cnkgPSBwYXlsb2FkLnNlbGVjdGVkQ291bnRyeTtcbiAqICAgICB9XG4gKiAgIH0pO1xuICpcbiAqIFdoZW4gdGhlIGNhbGxiYWNrIHRvIHVwZGF0ZSBgQ291bnRyeVN0b3JlYCBpcyByZWdpc3RlcmVkLCB3ZSBzYXZlIGEgcmVmZXJlbmNlXG4gKiB0byB0aGUgcmV0dXJuZWQgdG9rZW4uIFVzaW5nIHRoaXMgdG9rZW4gd2l0aCBgd2FpdEZvcigpYCwgd2UgY2FuIGd1YXJhbnRlZVxuICogdGhhdCBgQ291bnRyeVN0b3JlYCBpcyB1cGRhdGVkIGJlZm9yZSB0aGUgY2FsbGJhY2sgdGhhdCB1cGRhdGVzIGBDaXR5U3RvcmVgXG4gKiBuZWVkcyB0byBxdWVyeSBpdHMgZGF0YS5cbiAqXG4gKiAgIENpdHlTdG9yZS5kaXNwYXRjaFRva2VuID0gZmxpZ2h0RGlzcGF0Y2hlci5yZWdpc3RlcihmdW5jdGlvbihwYXlsb2FkKSB7XG4gKiAgICAgaWYgKHBheWxvYWQuYWN0aW9uVHlwZSA9PT0gJ2NvdW50cnktdXBkYXRlJykge1xuICogICAgICAgLy8gYENvdW50cnlTdG9yZS5jb3VudHJ5YCBtYXkgbm90IGJlIHVwZGF0ZWQuXG4gKiAgICAgICBmbGlnaHREaXNwYXRjaGVyLndhaXRGb3IoW0NvdW50cnlTdG9yZS5kaXNwYXRjaFRva2VuXSk7XG4gKiAgICAgICAvLyBgQ291bnRyeVN0b3JlLmNvdW50cnlgIGlzIG5vdyBndWFyYW50ZWVkIHRvIGJlIHVwZGF0ZWQuXG4gKlxuICogICAgICAgLy8gU2VsZWN0IHRoZSBkZWZhdWx0IGNpdHkgZm9yIHRoZSBuZXcgY291bnRyeVxuICogICAgICAgQ2l0eVN0b3JlLmNpdHkgPSBnZXREZWZhdWx0Q2l0eUZvckNvdW50cnkoQ291bnRyeVN0b3JlLmNvdW50cnkpO1xuICogICAgIH1cbiAqICAgfSk7XG4gKlxuICogVGhlIHVzYWdlIG9mIGB3YWl0Rm9yKClgIGNhbiBiZSBjaGFpbmVkLCBmb3IgZXhhbXBsZTpcbiAqXG4gKiAgIEZsaWdodFByaWNlU3RvcmUuZGlzcGF0Y2hUb2tlbiA9XG4gKiAgICAgZmxpZ2h0RGlzcGF0Y2hlci5yZWdpc3RlcihmdW5jdGlvbihwYXlsb2FkKSB7XG4gKiAgICAgICBzd2l0Y2ggKHBheWxvYWQuYWN0aW9uVHlwZSkge1xuICogICAgICAgICBjYXNlICdjb3VudHJ5LXVwZGF0ZSc6XG4gKiAgICAgICAgIGNhc2UgJ2NpdHktdXBkYXRlJzpcbiAqICAgICAgICAgICBmbGlnaHREaXNwYXRjaGVyLndhaXRGb3IoW0NpdHlTdG9yZS5kaXNwYXRjaFRva2VuXSk7XG4gKiAgICAgICAgICAgRmxpZ2h0UHJpY2VTdG9yZS5wcmljZSA9XG4gKiAgICAgICAgICAgICBnZXRGbGlnaHRQcmljZVN0b3JlKENvdW50cnlTdG9yZS5jb3VudHJ5LCBDaXR5U3RvcmUuY2l0eSk7XG4gKiAgICAgICAgICAgYnJlYWs7XG4gKiAgICAgfVxuICogICB9KTtcbiAqXG4gKiBUaGUgYGNvdW50cnktdXBkYXRlYCBwYXlsb2FkIHdpbGwgYmUgZ3VhcmFudGVlZCB0byBpbnZva2UgdGhlIHN0b3JlcydcbiAqIHJlZ2lzdGVyZWQgY2FsbGJhY2tzIGluIG9yZGVyOiBgQ291bnRyeVN0b3JlYCwgYENpdHlTdG9yZWAsIHRoZW5cbiAqIGBGbGlnaHRQcmljZVN0b3JlYC5cbiAqL1xuXG52YXIgRGlzcGF0Y2hlciA9IChmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIERpc3BhdGNoZXIoKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIERpc3BhdGNoZXIpO1xuXG4gICAgdGhpcy5fY2FsbGJhY2tzID0ge307XG4gICAgdGhpcy5faXNEaXNwYXRjaGluZyA9IGZhbHNlO1xuICAgIHRoaXMuX2lzSGFuZGxlZCA9IHt9O1xuICAgIHRoaXMuX2lzUGVuZGluZyA9IHt9O1xuICAgIHRoaXMuX2xhc3RJRCA9IDE7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGEgY2FsbGJhY2sgdG8gYmUgaW52b2tlZCB3aXRoIGV2ZXJ5IGRpc3BhdGNoZWQgcGF5bG9hZC4gUmV0dXJuc1xuICAgKiBhIHRva2VuIHRoYXQgY2FuIGJlIHVzZWQgd2l0aCBgd2FpdEZvcigpYC5cbiAgICovXG5cbiAgRGlzcGF0Y2hlci5wcm90b3R5cGUucmVnaXN0ZXIgPSBmdW5jdGlvbiByZWdpc3RlcihjYWxsYmFjaykge1xuICAgIHZhciBpZCA9IF9wcmVmaXggKyB0aGlzLl9sYXN0SUQrKztcbiAgICB0aGlzLl9jYWxsYmFja3NbaWRdID0gY2FsbGJhY2s7XG4gICAgcmV0dXJuIGlkO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgY2FsbGJhY2sgYmFzZWQgb24gaXRzIHRva2VuLlxuICAgKi9cblxuICBEaXNwYXRjaGVyLnByb3RvdHlwZS51bnJlZ2lzdGVyID0gZnVuY3Rpb24gdW5yZWdpc3RlcihpZCkge1xuICAgICF0aGlzLl9jYWxsYmFja3NbaWRdID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0Rpc3BhdGNoZXIudW5yZWdpc3RlciguLi4pOiBgJXNgIGRvZXMgbm90IG1hcCB0byBhIHJlZ2lzdGVyZWQgY2FsbGJhY2suJywgaWQpIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgICBkZWxldGUgdGhpcy5fY2FsbGJhY2tzW2lkXTtcbiAgfTtcblxuICAvKipcbiAgICogV2FpdHMgZm9yIHRoZSBjYWxsYmFja3Mgc3BlY2lmaWVkIHRvIGJlIGludm9rZWQgYmVmb3JlIGNvbnRpbnVpbmcgZXhlY3V0aW9uXG4gICAqIG9mIHRoZSBjdXJyZW50IGNhbGxiYWNrLiBUaGlzIG1ldGhvZCBzaG91bGQgb25seSBiZSB1c2VkIGJ5IGEgY2FsbGJhY2sgaW5cbiAgICogcmVzcG9uc2UgdG8gYSBkaXNwYXRjaGVkIHBheWxvYWQuXG4gICAqL1xuXG4gIERpc3BhdGNoZXIucHJvdG90eXBlLndhaXRGb3IgPSBmdW5jdGlvbiB3YWl0Rm9yKGlkcykge1xuICAgICF0aGlzLl9pc0Rpc3BhdGNoaW5nID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0Rpc3BhdGNoZXIud2FpdEZvciguLi4pOiBNdXN0IGJlIGludm9rZWQgd2hpbGUgZGlzcGF0Y2hpbmcuJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuICAgIGZvciAodmFyIGlpID0gMDsgaWkgPCBpZHMubGVuZ3RoOyBpaSsrKSB7XG4gICAgICB2YXIgaWQgPSBpZHNbaWldO1xuICAgICAgaWYgKHRoaXMuX2lzUGVuZGluZ1tpZF0pIHtcbiAgICAgICAgIXRoaXMuX2lzSGFuZGxlZFtpZF0gPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnRGlzcGF0Y2hlci53YWl0Rm9yKC4uLik6IENpcmN1bGFyIGRlcGVuZGVuY3kgZGV0ZWN0ZWQgd2hpbGUgJyArICd3YWl0aW5nIGZvciBgJXNgLicsIGlkKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgIXRoaXMuX2NhbGxiYWNrc1tpZF0gPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnRGlzcGF0Y2hlci53YWl0Rm9yKC4uLik6IGAlc2AgZG9lcyBub3QgbWFwIHRvIGEgcmVnaXN0ZXJlZCBjYWxsYmFjay4nLCBpZCkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuICAgICAgdGhpcy5faW52b2tlQ2FsbGJhY2soaWQpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogRGlzcGF0Y2hlcyBhIHBheWxvYWQgdG8gYWxsIHJlZ2lzdGVyZWQgY2FsbGJhY2tzLlxuICAgKi9cblxuICBEaXNwYXRjaGVyLnByb3RvdHlwZS5kaXNwYXRjaCA9IGZ1bmN0aW9uIGRpc3BhdGNoKHBheWxvYWQpIHtcbiAgICAhIXRoaXMuX2lzRGlzcGF0Y2hpbmcgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnRGlzcGF0Y2guZGlzcGF0Y2goLi4uKTogQ2Fubm90IGRpc3BhdGNoIGluIHRoZSBtaWRkbGUgb2YgYSBkaXNwYXRjaC4nKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG4gICAgdGhpcy5fc3RhcnREaXNwYXRjaGluZyhwYXlsb2FkKTtcbiAgICB0cnkge1xuICAgICAgZm9yICh2YXIgaWQgaW4gdGhpcy5fY2FsbGJhY2tzKSB7XG4gICAgICAgIGlmICh0aGlzLl9pc1BlbmRpbmdbaWRdKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faW52b2tlQ2FsbGJhY2soaWQpO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLl9zdG9wRGlzcGF0Y2hpbmcoKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIElzIHRoaXMgRGlzcGF0Y2hlciBjdXJyZW50bHkgZGlzcGF0Y2hpbmcuXG4gICAqL1xuXG4gIERpc3BhdGNoZXIucHJvdG90eXBlLmlzRGlzcGF0Y2hpbmcgPSBmdW5jdGlvbiBpc0Rpc3BhdGNoaW5nKCkge1xuICAgIHJldHVybiB0aGlzLl9pc0Rpc3BhdGNoaW5nO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDYWxsIHRoZSBjYWxsYmFjayBzdG9yZWQgd2l0aCB0aGUgZ2l2ZW4gaWQuIEFsc28gZG8gc29tZSBpbnRlcm5hbFxuICAgKiBib29ra2VlcGluZy5cbiAgICpcbiAgICogQGludGVybmFsXG4gICAqL1xuXG4gIERpc3BhdGNoZXIucHJvdG90eXBlLl9pbnZva2VDYWxsYmFjayA9IGZ1bmN0aW9uIF9pbnZva2VDYWxsYmFjayhpZCkge1xuICAgIHRoaXMuX2lzUGVuZGluZ1tpZF0gPSB0cnVlO1xuICAgIHRoaXMuX2NhbGxiYWNrc1tpZF0odGhpcy5fcGVuZGluZ1BheWxvYWQpO1xuICAgIHRoaXMuX2lzSGFuZGxlZFtpZF0gPSB0cnVlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTZXQgdXAgYm9va2tlZXBpbmcgbmVlZGVkIHdoZW4gZGlzcGF0Y2hpbmcuXG4gICAqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cblxuICBEaXNwYXRjaGVyLnByb3RvdHlwZS5fc3RhcnREaXNwYXRjaGluZyA9IGZ1bmN0aW9uIF9zdGFydERpc3BhdGNoaW5nKHBheWxvYWQpIHtcbiAgICBmb3IgKHZhciBpZCBpbiB0aGlzLl9jYWxsYmFja3MpIHtcbiAgICAgIHRoaXMuX2lzUGVuZGluZ1tpZF0gPSBmYWxzZTtcbiAgICAgIHRoaXMuX2lzSGFuZGxlZFtpZF0gPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5fcGVuZGluZ1BheWxvYWQgPSBwYXlsb2FkO1xuICAgIHRoaXMuX2lzRGlzcGF0Y2hpbmcgPSB0cnVlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDbGVhciBib29ra2VlcGluZyB1c2VkIGZvciBkaXNwYXRjaGluZy5cbiAgICpcbiAgICogQGludGVybmFsXG4gICAqL1xuXG4gIERpc3BhdGNoZXIucHJvdG90eXBlLl9zdG9wRGlzcGF0Y2hpbmcgPSBmdW5jdGlvbiBfc3RvcERpc3BhdGNoaW5nKCkge1xuICAgIGRlbGV0ZSB0aGlzLl9wZW5kaW5nUGF5bG9hZDtcbiAgICB0aGlzLl9pc0Rpc3BhdGNoaW5nID0gZmFsc2U7XG4gIH07XG5cbiAgcmV0dXJuIERpc3BhdGNoZXI7XG59KSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERpc3BhdGNoZXI7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIGludmFyaWFudFxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIFVzZSBpbnZhcmlhbnQoKSB0byBhc3NlcnQgc3RhdGUgd2hpY2ggeW91ciBwcm9ncmFtIGFzc3VtZXMgdG8gYmUgdHJ1ZS5cbiAqXG4gKiBQcm92aWRlIHNwcmludGYtc3R5bGUgZm9ybWF0IChvbmx5ICVzIGlzIHN1cHBvcnRlZCkgYW5kIGFyZ3VtZW50c1xuICogdG8gcHJvdmlkZSBpbmZvcm1hdGlvbiBhYm91dCB3aGF0IGJyb2tlIGFuZCB3aGF0IHlvdSB3ZXJlXG4gKiBleHBlY3RpbmcuXG4gKlxuICogVGhlIGludmFyaWFudCBtZXNzYWdlIHdpbGwgYmUgc3RyaXBwZWQgaW4gcHJvZHVjdGlvbiwgYnV0IHRoZSBpbnZhcmlhbnRcbiAqIHdpbGwgcmVtYWluIHRvIGVuc3VyZSBsb2dpYyBkb2VzIG5vdCBkaWZmZXIgaW4gcHJvZHVjdGlvbi5cbiAqL1xuXG52YXIgaW52YXJpYW50ID0gZnVuY3Rpb24gKGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgZXJyb3I7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcignTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgJyArICdmb3IgdGhlIGZ1bGwgZXJyb3IgbWVzc2FnZSBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcignSW52YXJpYW50IFZpb2xhdGlvbjogJyArIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgfSkpO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7IiwiJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuXHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxuZnVuY3Rpb24gc2hvdWxkVXNlTmF0aXZlKCkge1xuXHR0cnkge1xuXHRcdGlmICghT2JqZWN0LmFzc2lnbikge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIERldGVjdCBidWdneSBwcm9wZXJ0eSBlbnVtZXJhdGlvbiBvcmRlciBpbiBvbGRlciBWOCB2ZXJzaW9ucy5cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTQxMThcblx0XHR2YXIgdGVzdDEgPSBuZXcgU3RyaW5nKCdhYmMnKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblx0XHR0ZXN0MVs1XSA9ICdkZSc7XG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QxKVswXSA9PT0gJzUnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MiA9IHt9O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0dGVzdDJbJ18nICsgU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpO1xuXHRcdH1cblx0XHR2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuXHRcdFx0cmV0dXJuIHRlc3QyW25dO1xuXHRcdH0pO1xuXHRcdGlmIChvcmRlcjIuam9pbignJykgIT09ICcwMTIzNDU2Nzg5Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDMgPSB7fTtcblx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRcdHRlc3QzW2xldHRlcl0gPSBsZXR0ZXI7XG5cdFx0fSk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG5cdFx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdC8vIFdlIGRvbid0IGV4cGVjdCBhbnkgb2YgdGhlIGFib3ZlIHRvIHRocm93LCBidXQgYmV0dGVyIHRvIGJlIHNhZmUuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hvdWxkVXNlTmF0aXZlKCkgPyBPYmplY3QuYXNzaWduIDogZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdHZhciBmcm9tO1xuXHR2YXIgdG8gPSB0b09iamVjdCh0YXJnZXQpO1xuXHR2YXIgc3ltYm9scztcblxuXHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuXHRcdGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG5cdFx0XHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG5cdFx0XHRcdHRvW2tleV0gPSBmcm9tW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBLZXlFc2NhcGVVdGlsc1xuICogXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEVzY2FwZSBhbmQgd3JhcCBrZXkgc28gaXQgaXMgc2FmZSB0byB1c2UgYXMgYSByZWFjdGlkXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSB0byBiZSBlc2NhcGVkLlxuICogQHJldHVybiB7c3RyaW5nfSB0aGUgZXNjYXBlZCBrZXkuXG4gKi9cblxuZnVuY3Rpb24gZXNjYXBlKGtleSkge1xuICB2YXIgZXNjYXBlUmVnZXggPSAvWz06XS9nO1xuICB2YXIgZXNjYXBlckxvb2t1cCA9IHtcbiAgICAnPSc6ICc9MCcsXG4gICAgJzonOiAnPTInXG4gIH07XG4gIHZhciBlc2NhcGVkU3RyaW5nID0gKCcnICsga2V5KS5yZXBsYWNlKGVzY2FwZVJlZ2V4LCBmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICByZXR1cm4gZXNjYXBlckxvb2t1cFttYXRjaF07XG4gIH0pO1xuXG4gIHJldHVybiAnJCcgKyBlc2NhcGVkU3RyaW5nO1xufVxuXG4vKipcbiAqIFVuZXNjYXBlIGFuZCB1bndyYXAga2V5IGZvciBodW1hbi1yZWFkYWJsZSBkaXNwbGF5XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSB0byB1bmVzY2FwZS5cbiAqIEByZXR1cm4ge3N0cmluZ30gdGhlIHVuZXNjYXBlZCBrZXkuXG4gKi9cbmZ1bmN0aW9uIHVuZXNjYXBlKGtleSkge1xuICB2YXIgdW5lc2NhcGVSZWdleCA9IC8oPTB8PTIpL2c7XG4gIHZhciB1bmVzY2FwZXJMb29rdXAgPSB7XG4gICAgJz0wJzogJz0nLFxuICAgICc9Mic6ICc6J1xuICB9O1xuICB2YXIga2V5U3Vic3RyaW5nID0ga2V5WzBdID09PSAnLicgJiYga2V5WzFdID09PSAnJCcgPyBrZXkuc3Vic3RyaW5nKDIpIDoga2V5LnN1YnN0cmluZygxKTtcblxuICByZXR1cm4gKCcnICsga2V5U3Vic3RyaW5nKS5yZXBsYWNlKHVuZXNjYXBlUmVnZXgsIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgIHJldHVybiB1bmVzY2FwZXJMb29rdXBbbWF0Y2hdO1xuICB9KTtcbn1cblxudmFyIEtleUVzY2FwZVV0aWxzID0ge1xuICBlc2NhcGU6IGVzY2FwZSxcbiAgdW5lc2NhcGU6IHVuZXNjYXBlXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEtleUVzY2FwZVV0aWxzOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBQb29sZWRDbGFzc1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9wcm9kSW52YXJpYW50ID0gcmVxdWlyZSgnLi9yZWFjdFByb2RJbnZhcmlhbnQnKTtcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xuXG4vKipcbiAqIFN0YXRpYyBwb29sZXJzLiBTZXZlcmFsIGN1c3RvbSB2ZXJzaW9ucyBmb3IgZWFjaCBwb3RlbnRpYWwgbnVtYmVyIG9mXG4gKiBhcmd1bWVudHMuIEEgY29tcGxldGVseSBnZW5lcmljIHBvb2xlciBpcyBlYXN5IHRvIGltcGxlbWVudCwgYnV0IHdvdWxkXG4gKiByZXF1aXJlIGFjY2Vzc2luZyB0aGUgYGFyZ3VtZW50c2Agb2JqZWN0LiBJbiBlYWNoIG9mIHRoZXNlLCBgdGhpc2AgcmVmZXJzIHRvXG4gKiB0aGUgQ2xhc3MgaXRzZWxmLCBub3QgYW4gaW5zdGFuY2UuIElmIGFueSBvdGhlcnMgYXJlIG5lZWRlZCwgc2ltcGx5IGFkZCB0aGVtXG4gKiBoZXJlLCBvciBpbiB0aGVpciBvd24gZmlsZXMuXG4gKi9cbnZhciBvbmVBcmd1bWVudFBvb2xlciA9IGZ1bmN0aW9uIChjb3B5RmllbGRzRnJvbSkge1xuICB2YXIgS2xhc3MgPSB0aGlzO1xuICBpZiAoS2xhc3MuaW5zdGFuY2VQb29sLmxlbmd0aCkge1xuICAgIHZhciBpbnN0YW5jZSA9IEtsYXNzLmluc3RhbmNlUG9vbC5wb3AoKTtcbiAgICBLbGFzcy5jYWxsKGluc3RhbmNlLCBjb3B5RmllbGRzRnJvbSk7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgS2xhc3MoY29weUZpZWxkc0Zyb20pO1xuICB9XG59O1xuXG52YXIgdHdvQXJndW1lbnRQb29sZXIgPSBmdW5jdGlvbiAoYTEsIGEyKSB7XG4gIHZhciBLbGFzcyA9IHRoaXM7XG4gIGlmIChLbGFzcy5pbnN0YW5jZVBvb2wubGVuZ3RoKSB7XG4gICAgdmFyIGluc3RhbmNlID0gS2xhc3MuaW5zdGFuY2VQb29sLnBvcCgpO1xuICAgIEtsYXNzLmNhbGwoaW5zdGFuY2UsIGExLCBhMik7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgS2xhc3MoYTEsIGEyKTtcbiAgfVxufTtcblxudmFyIHRocmVlQXJndW1lbnRQb29sZXIgPSBmdW5jdGlvbiAoYTEsIGEyLCBhMykge1xuICB2YXIgS2xhc3MgPSB0aGlzO1xuICBpZiAoS2xhc3MuaW5zdGFuY2VQb29sLmxlbmd0aCkge1xuICAgIHZhciBpbnN0YW5jZSA9IEtsYXNzLmluc3RhbmNlUG9vbC5wb3AoKTtcbiAgICBLbGFzcy5jYWxsKGluc3RhbmNlLCBhMSwgYTIsIGEzKTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBLbGFzcyhhMSwgYTIsIGEzKTtcbiAgfVxufTtcblxudmFyIGZvdXJBcmd1bWVudFBvb2xlciA9IGZ1bmN0aW9uIChhMSwgYTIsIGEzLCBhNCkge1xuICB2YXIgS2xhc3MgPSB0aGlzO1xuICBpZiAoS2xhc3MuaW5zdGFuY2VQb29sLmxlbmd0aCkge1xuICAgIHZhciBpbnN0YW5jZSA9IEtsYXNzLmluc3RhbmNlUG9vbC5wb3AoKTtcbiAgICBLbGFzcy5jYWxsKGluc3RhbmNlLCBhMSwgYTIsIGEzLCBhNCk7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgS2xhc3MoYTEsIGEyLCBhMywgYTQpO1xuICB9XG59O1xuXG52YXIgZml2ZUFyZ3VtZW50UG9vbGVyID0gZnVuY3Rpb24gKGExLCBhMiwgYTMsIGE0LCBhNSkge1xuICB2YXIgS2xhc3MgPSB0aGlzO1xuICBpZiAoS2xhc3MuaW5zdGFuY2VQb29sLmxlbmd0aCkge1xuICAgIHZhciBpbnN0YW5jZSA9IEtsYXNzLmluc3RhbmNlUG9vbC5wb3AoKTtcbiAgICBLbGFzcy5jYWxsKGluc3RhbmNlLCBhMSwgYTIsIGEzLCBhNCwgYTUpO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IEtsYXNzKGExLCBhMiwgYTMsIGE0LCBhNSk7XG4gIH1cbn07XG5cbnZhciBzdGFuZGFyZFJlbGVhc2VyID0gZnVuY3Rpb24gKGluc3RhbmNlKSB7XG4gIHZhciBLbGFzcyA9IHRoaXM7XG4gICEoaW5zdGFuY2UgaW5zdGFuY2VvZiBLbGFzcykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnVHJ5aW5nIHRvIHJlbGVhc2UgYW4gaW5zdGFuY2UgaW50byBhIHBvb2wgb2YgYSBkaWZmZXJlbnQgdHlwZS4nKSA6IF9wcm9kSW52YXJpYW50KCcyNScpIDogdm9pZCAwO1xuICBpbnN0YW5jZS5kZXN0cnVjdG9yKCk7XG4gIGlmIChLbGFzcy5pbnN0YW5jZVBvb2wubGVuZ3RoIDwgS2xhc3MucG9vbFNpemUpIHtcbiAgICBLbGFzcy5pbnN0YW5jZVBvb2wucHVzaChpbnN0YW5jZSk7XG4gIH1cbn07XG5cbnZhciBERUZBVUxUX1BPT0xfU0laRSA9IDEwO1xudmFyIERFRkFVTFRfUE9PTEVSID0gb25lQXJndW1lbnRQb29sZXI7XG5cbi8qKlxuICogQXVnbWVudHMgYENvcHlDb25zdHJ1Y3RvcmAgdG8gYmUgYSBwb29sYWJsZSBjbGFzcywgYXVnbWVudGluZyBvbmx5IHRoZSBjbGFzc1xuICogaXRzZWxmIChzdGF0aWNhbGx5KSBub3QgYWRkaW5nIGFueSBwcm90b3R5cGljYWwgZmllbGRzLiBBbnkgQ29weUNvbnN0cnVjdG9yXG4gKiB5b3UgZ2l2ZSB0aGlzIG1heSBoYXZlIGEgYHBvb2xTaXplYCBwcm9wZXJ0eSwgYW5kIHdpbGwgbG9vayBmb3IgYVxuICogcHJvdG90eXBpY2FsIGBkZXN0cnVjdG9yYCBvbiBpbnN0YW5jZXMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gQ29weUNvbnN0cnVjdG9yIENvbnN0cnVjdG9yIHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVzZXQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwb29sZXIgQ3VzdG9taXphYmxlIHBvb2xlci5cbiAqL1xudmFyIGFkZFBvb2xpbmdUbyA9IGZ1bmN0aW9uIChDb3B5Q29uc3RydWN0b3IsIHBvb2xlcikge1xuICB2YXIgTmV3S2xhc3MgPSBDb3B5Q29uc3RydWN0b3I7XG4gIE5ld0tsYXNzLmluc3RhbmNlUG9vbCA9IFtdO1xuICBOZXdLbGFzcy5nZXRQb29sZWQgPSBwb29sZXIgfHwgREVGQVVMVF9QT09MRVI7XG4gIGlmICghTmV3S2xhc3MucG9vbFNpemUpIHtcbiAgICBOZXdLbGFzcy5wb29sU2l6ZSA9IERFRkFVTFRfUE9PTF9TSVpFO1xuICB9XG4gIE5ld0tsYXNzLnJlbGVhc2UgPSBzdGFuZGFyZFJlbGVhc2VyO1xuICByZXR1cm4gTmV3S2xhc3M7XG59O1xuXG52YXIgUG9vbGVkQ2xhc3MgPSB7XG4gIGFkZFBvb2xpbmdUbzogYWRkUG9vbGluZ1RvLFxuICBvbmVBcmd1bWVudFBvb2xlcjogb25lQXJndW1lbnRQb29sZXIsXG4gIHR3b0FyZ3VtZW50UG9vbGVyOiB0d29Bcmd1bWVudFBvb2xlcixcbiAgdGhyZWVBcmd1bWVudFBvb2xlcjogdGhyZWVBcmd1bWVudFBvb2xlcixcbiAgZm91ckFyZ3VtZW50UG9vbGVyOiBmb3VyQXJndW1lbnRQb29sZXIsXG4gIGZpdmVBcmd1bWVudFBvb2xlcjogZml2ZUFyZ3VtZW50UG9vbGVyXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBvb2xlZENsYXNzOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9hc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBSZWFjdENoaWxkcmVuID0gcmVxdWlyZSgnLi9SZWFjdENoaWxkcmVuJyk7XG52YXIgUmVhY3RDb21wb25lbnQgPSByZXF1aXJlKCcuL1JlYWN0Q29tcG9uZW50Jyk7XG52YXIgUmVhY3RQdXJlQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9SZWFjdFB1cmVDb21wb25lbnQnKTtcbnZhciBSZWFjdENsYXNzID0gcmVxdWlyZSgnLi9SZWFjdENsYXNzJyk7XG52YXIgUmVhY3RET01GYWN0b3JpZXMgPSByZXF1aXJlKCcuL1JlYWN0RE9NRmFjdG9yaWVzJyk7XG52YXIgUmVhY3RFbGVtZW50ID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnQnKTtcbnZhciBSZWFjdFByb3BUeXBlcyA9IHJlcXVpcmUoJy4vUmVhY3RQcm9wVHlwZXMnKTtcbnZhciBSZWFjdFZlcnNpb24gPSByZXF1aXJlKCcuL1JlYWN0VmVyc2lvbicpO1xuXG52YXIgb25seUNoaWxkID0gcmVxdWlyZSgnLi9vbmx5Q2hpbGQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG52YXIgY3JlYXRlRWxlbWVudCA9IFJlYWN0RWxlbWVudC5jcmVhdGVFbGVtZW50O1xudmFyIGNyZWF0ZUZhY3RvcnkgPSBSZWFjdEVsZW1lbnQuY3JlYXRlRmFjdG9yeTtcbnZhciBjbG9uZUVsZW1lbnQgPSBSZWFjdEVsZW1lbnQuY2xvbmVFbGVtZW50O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgUmVhY3RFbGVtZW50VmFsaWRhdG9yID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnRWYWxpZGF0b3InKTtcbiAgY3JlYXRlRWxlbWVudCA9IFJlYWN0RWxlbWVudFZhbGlkYXRvci5jcmVhdGVFbGVtZW50O1xuICBjcmVhdGVGYWN0b3J5ID0gUmVhY3RFbGVtZW50VmFsaWRhdG9yLmNyZWF0ZUZhY3Rvcnk7XG4gIGNsb25lRWxlbWVudCA9IFJlYWN0RWxlbWVudFZhbGlkYXRvci5jbG9uZUVsZW1lbnQ7XG59XG5cbnZhciBfX3NwcmVhZCA9IF9hc3NpZ247XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciB3YXJuZWQgPSBmYWxzZTtcbiAgX19zcHJlYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcod2FybmVkLCAnUmVhY3QuX19zcHJlYWQgaXMgZGVwcmVjYXRlZCBhbmQgc2hvdWxkIG5vdCBiZSB1c2VkLiBVc2UgJyArICdPYmplY3QuYXNzaWduIGRpcmVjdGx5IG9yIGFub3RoZXIgaGVscGVyIGZ1bmN0aW9uIHdpdGggc2ltaWxhciAnICsgJ3NlbWFudGljcy4gWW91IG1heSBiZSBzZWVpbmcgdGhpcyB3YXJuaW5nIGR1ZSB0byB5b3VyIGNvbXBpbGVyLiAnICsgJ1NlZSBodHRwczovL2ZiLm1lL3JlYWN0LXNwcmVhZC1kZXByZWNhdGlvbiBmb3IgbW9yZSBkZXRhaWxzLicpIDogdm9pZCAwO1xuICAgIHdhcm5lZCA9IHRydWU7XG4gICAgcmV0dXJuIF9hc3NpZ24uYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxudmFyIFJlYWN0ID0ge1xuXG4gIC8vIE1vZGVyblxuXG4gIENoaWxkcmVuOiB7XG4gICAgbWFwOiBSZWFjdENoaWxkcmVuLm1hcCxcbiAgICBmb3JFYWNoOiBSZWFjdENoaWxkcmVuLmZvckVhY2gsXG4gICAgY291bnQ6IFJlYWN0Q2hpbGRyZW4uY291bnQsXG4gICAgdG9BcnJheTogUmVhY3RDaGlsZHJlbi50b0FycmF5LFxuICAgIG9ubHk6IG9ubHlDaGlsZFxuICB9LFxuXG4gIENvbXBvbmVudDogUmVhY3RDb21wb25lbnQsXG4gIFB1cmVDb21wb25lbnQ6IFJlYWN0UHVyZUNvbXBvbmVudCxcblxuICBjcmVhdGVFbGVtZW50OiBjcmVhdGVFbGVtZW50LFxuICBjbG9uZUVsZW1lbnQ6IGNsb25lRWxlbWVudCxcbiAgaXNWYWxpZEVsZW1lbnQ6IFJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudCxcblxuICAvLyBDbGFzc2ljXG5cbiAgUHJvcFR5cGVzOiBSZWFjdFByb3BUeXBlcyxcbiAgY3JlYXRlQ2xhc3M6IFJlYWN0Q2xhc3MuY3JlYXRlQ2xhc3MsXG4gIGNyZWF0ZUZhY3Rvcnk6IGNyZWF0ZUZhY3RvcnksXG4gIGNyZWF0ZU1peGluOiBmdW5jdGlvbiAobWl4aW4pIHtcbiAgICAvLyBDdXJyZW50bHkgYSBub29wLiBXaWxsIGJlIHVzZWQgdG8gdmFsaWRhdGUgYW5kIHRyYWNlIG1peGlucy5cbiAgICByZXR1cm4gbWl4aW47XG4gIH0sXG5cbiAgLy8gVGhpcyBsb29rcyBET00gc3BlY2lmaWMgYnV0IHRoZXNlIGFyZSBhY3R1YWxseSBpc29tb3JwaGljIGhlbHBlcnNcbiAgLy8gc2luY2UgdGhleSBhcmUganVzdCBnZW5lcmF0aW5nIERPTSBzdHJpbmdzLlxuICBET006IFJlYWN0RE9NRmFjdG9yaWVzLFxuXG4gIHZlcnNpb246IFJlYWN0VmVyc2lvbixcblxuICAvLyBEZXByZWNhdGVkIGhvb2sgZm9yIEpTWCBzcHJlYWQsIGRvbid0IHVzZSB0aGlzIGZvciBhbnl0aGluZy5cbiAgX19zcHJlYWQ6IF9fc3ByZWFkXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0OyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdENoaWxkcmVuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUG9vbGVkQ2xhc3MgPSByZXF1aXJlKCcuL1Bvb2xlZENsYXNzJyk7XG52YXIgUmVhY3RFbGVtZW50ID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnQnKTtcblxudmFyIGVtcHR5RnVuY3Rpb24gPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eUZ1bmN0aW9uJyk7XG52YXIgdHJhdmVyc2VBbGxDaGlsZHJlbiA9IHJlcXVpcmUoJy4vdHJhdmVyc2VBbGxDaGlsZHJlbicpO1xuXG52YXIgdHdvQXJndW1lbnRQb29sZXIgPSBQb29sZWRDbGFzcy50d29Bcmd1bWVudFBvb2xlcjtcbnZhciBmb3VyQXJndW1lbnRQb29sZXIgPSBQb29sZWRDbGFzcy5mb3VyQXJndW1lbnRQb29sZXI7XG5cbnZhciB1c2VyUHJvdmlkZWRLZXlFc2NhcGVSZWdleCA9IC9cXC8rL2c7XG5mdW5jdGlvbiBlc2NhcGVVc2VyUHJvdmlkZWRLZXkodGV4dCkge1xuICByZXR1cm4gKCcnICsgdGV4dCkucmVwbGFjZSh1c2VyUHJvdmlkZWRLZXlFc2NhcGVSZWdleCwgJyQmLycpO1xufVxuXG4vKipcbiAqIFBvb2xlZENsYXNzIHJlcHJlc2VudGluZyB0aGUgYm9va2tlZXBpbmcgYXNzb2NpYXRlZCB3aXRoIHBlcmZvcm1pbmcgYSBjaGlsZFxuICogdHJhdmVyc2FsLiBBbGxvd3MgYXZvaWRpbmcgYmluZGluZyBjYWxsYmFja3MuXG4gKlxuICogQGNvbnN0cnVjdG9yIEZvckVhY2hCb29rS2VlcGluZ1xuICogQHBhcmFtIHshZnVuY3Rpb259IGZvckVhY2hGdW5jdGlvbiBGdW5jdGlvbiB0byBwZXJmb3JtIHRyYXZlcnNhbCB3aXRoLlxuICogQHBhcmFtIHs/Kn0gZm9yRWFjaENvbnRleHQgQ29udGV4dCB0byBwZXJmb3JtIGNvbnRleHQgd2l0aC5cbiAqL1xuZnVuY3Rpb24gRm9yRWFjaEJvb2tLZWVwaW5nKGZvckVhY2hGdW5jdGlvbiwgZm9yRWFjaENvbnRleHQpIHtcbiAgdGhpcy5mdW5jID0gZm9yRWFjaEZ1bmN0aW9uO1xuICB0aGlzLmNvbnRleHQgPSBmb3JFYWNoQ29udGV4dDtcbiAgdGhpcy5jb3VudCA9IDA7XG59XG5Gb3JFYWNoQm9va0tlZXBpbmcucHJvdG90eXBlLmRlc3RydWN0b3IgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZnVuYyA9IG51bGw7XG4gIHRoaXMuY29udGV4dCA9IG51bGw7XG4gIHRoaXMuY291bnQgPSAwO1xufTtcblBvb2xlZENsYXNzLmFkZFBvb2xpbmdUbyhGb3JFYWNoQm9va0tlZXBpbmcsIHR3b0FyZ3VtZW50UG9vbGVyKTtcblxuZnVuY3Rpb24gZm9yRWFjaFNpbmdsZUNoaWxkKGJvb2tLZWVwaW5nLCBjaGlsZCwgbmFtZSkge1xuICB2YXIgZnVuYyA9IGJvb2tLZWVwaW5nLmZ1bmM7XG4gIHZhciBjb250ZXh0ID0gYm9va0tlZXBpbmcuY29udGV4dDtcblxuICBmdW5jLmNhbGwoY29udGV4dCwgY2hpbGQsIGJvb2tLZWVwaW5nLmNvdW50KyspO1xufVxuXG4vKipcbiAqIEl0ZXJhdGVzIHRocm91Z2ggY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gLlxuICpcbiAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RvcC1sZXZlbC1hcGkuaHRtbCNyZWFjdC5jaGlsZHJlbi5mb3JlYWNoXG4gKlxuICogVGhlIHByb3ZpZGVkIGZvckVhY2hGdW5jKGNoaWxkLCBpbmRleCkgd2lsbCBiZSBjYWxsZWQgZm9yIGVhY2hcbiAqIGxlYWYgY2hpbGQuXG4gKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBjb250YWluZXIuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKCosIGludCl9IGZvckVhY2hGdW5jXG4gKiBAcGFyYW0geyp9IGZvckVhY2hDb250ZXh0IENvbnRleHQgZm9yIGZvckVhY2hDb250ZXh0LlxuICovXG5mdW5jdGlvbiBmb3JFYWNoQ2hpbGRyZW4oY2hpbGRyZW4sIGZvckVhY2hGdW5jLCBmb3JFYWNoQ29udGV4dCkge1xuICBpZiAoY2hpbGRyZW4gPT0gbnVsbCkge1xuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfVxuICB2YXIgdHJhdmVyc2VDb250ZXh0ID0gRm9yRWFjaEJvb2tLZWVwaW5nLmdldFBvb2xlZChmb3JFYWNoRnVuYywgZm9yRWFjaENvbnRleHQpO1xuICB0cmF2ZXJzZUFsbENoaWxkcmVuKGNoaWxkcmVuLCBmb3JFYWNoU2luZ2xlQ2hpbGQsIHRyYXZlcnNlQ29udGV4dCk7XG4gIEZvckVhY2hCb29rS2VlcGluZy5yZWxlYXNlKHRyYXZlcnNlQ29udGV4dCk7XG59XG5cbi8qKlxuICogUG9vbGVkQ2xhc3MgcmVwcmVzZW50aW5nIHRoZSBib29ra2VlcGluZyBhc3NvY2lhdGVkIHdpdGggcGVyZm9ybWluZyBhIGNoaWxkXG4gKiBtYXBwaW5nLiBBbGxvd3MgYXZvaWRpbmcgYmluZGluZyBjYWxsYmFja3MuXG4gKlxuICogQGNvbnN0cnVjdG9yIE1hcEJvb2tLZWVwaW5nXG4gKiBAcGFyYW0geyEqfSBtYXBSZXN1bHQgT2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9yZGVyZWQgbWFwIG9mIHJlc3VsdHMuXG4gKiBAcGFyYW0geyFmdW5jdGlvbn0gbWFwRnVuY3Rpb24gRnVuY3Rpb24gdG8gcGVyZm9ybSBtYXBwaW5nIHdpdGguXG4gKiBAcGFyYW0gez8qfSBtYXBDb250ZXh0IENvbnRleHQgdG8gcGVyZm9ybSBtYXBwaW5nIHdpdGguXG4gKi9cbmZ1bmN0aW9uIE1hcEJvb2tLZWVwaW5nKG1hcFJlc3VsdCwga2V5UHJlZml4LCBtYXBGdW5jdGlvbiwgbWFwQ29udGV4dCkge1xuICB0aGlzLnJlc3VsdCA9IG1hcFJlc3VsdDtcbiAgdGhpcy5rZXlQcmVmaXggPSBrZXlQcmVmaXg7XG4gIHRoaXMuZnVuYyA9IG1hcEZ1bmN0aW9uO1xuICB0aGlzLmNvbnRleHQgPSBtYXBDb250ZXh0O1xuICB0aGlzLmNvdW50ID0gMDtcbn1cbk1hcEJvb2tLZWVwaW5nLnByb3RvdHlwZS5kZXN0cnVjdG9yID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnJlc3VsdCA9IG51bGw7XG4gIHRoaXMua2V5UHJlZml4ID0gbnVsbDtcbiAgdGhpcy5mdW5jID0gbnVsbDtcbiAgdGhpcy5jb250ZXh0ID0gbnVsbDtcbiAgdGhpcy5jb3VudCA9IDA7XG59O1xuUG9vbGVkQ2xhc3MuYWRkUG9vbGluZ1RvKE1hcEJvb2tLZWVwaW5nLCBmb3VyQXJndW1lbnRQb29sZXIpO1xuXG5mdW5jdGlvbiBtYXBTaW5nbGVDaGlsZEludG9Db250ZXh0KGJvb2tLZWVwaW5nLCBjaGlsZCwgY2hpbGRLZXkpIHtcbiAgdmFyIHJlc3VsdCA9IGJvb2tLZWVwaW5nLnJlc3VsdDtcbiAgdmFyIGtleVByZWZpeCA9IGJvb2tLZWVwaW5nLmtleVByZWZpeDtcbiAgdmFyIGZ1bmMgPSBib29rS2VlcGluZy5mdW5jO1xuICB2YXIgY29udGV4dCA9IGJvb2tLZWVwaW5nLmNvbnRleHQ7XG5cblxuICB2YXIgbWFwcGVkQ2hpbGQgPSBmdW5jLmNhbGwoY29udGV4dCwgY2hpbGQsIGJvb2tLZWVwaW5nLmNvdW50KyspO1xuICBpZiAoQXJyYXkuaXNBcnJheShtYXBwZWRDaGlsZCkpIHtcbiAgICBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKG1hcHBlZENoaWxkLCByZXN1bHQsIGNoaWxkS2V5LCBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zQXJndW1lbnQpO1xuICB9IGVsc2UgaWYgKG1hcHBlZENoaWxkICE9IG51bGwpIHtcbiAgICBpZiAoUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KG1hcHBlZENoaWxkKSkge1xuICAgICAgbWFwcGVkQ2hpbGQgPSBSZWFjdEVsZW1lbnQuY2xvbmVBbmRSZXBsYWNlS2V5KG1hcHBlZENoaWxkLFxuICAgICAgLy8gS2VlcCBib3RoIHRoZSAobWFwcGVkKSBhbmQgb2xkIGtleXMgaWYgdGhleSBkaWZmZXIsIGp1c3QgYXNcbiAgICAgIC8vIHRyYXZlcnNlQWxsQ2hpbGRyZW4gdXNlZCB0byBkbyBmb3Igb2JqZWN0cyBhcyBjaGlsZHJlblxuICAgICAga2V5UHJlZml4ICsgKG1hcHBlZENoaWxkLmtleSAmJiAoIWNoaWxkIHx8IGNoaWxkLmtleSAhPT0gbWFwcGVkQ2hpbGQua2V5KSA/IGVzY2FwZVVzZXJQcm92aWRlZEtleShtYXBwZWRDaGlsZC5rZXkpICsgJy8nIDogJycpICsgY2hpbGRLZXkpO1xuICAgIH1cbiAgICByZXN1bHQucHVzaChtYXBwZWRDaGlsZCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbChjaGlsZHJlbiwgYXJyYXksIHByZWZpeCwgZnVuYywgY29udGV4dCkge1xuICB2YXIgZXNjYXBlZFByZWZpeCA9ICcnO1xuICBpZiAocHJlZml4ICE9IG51bGwpIHtcbiAgICBlc2NhcGVkUHJlZml4ID0gZXNjYXBlVXNlclByb3ZpZGVkS2V5KHByZWZpeCkgKyAnLyc7XG4gIH1cbiAgdmFyIHRyYXZlcnNlQ29udGV4dCA9IE1hcEJvb2tLZWVwaW5nLmdldFBvb2xlZChhcnJheSwgZXNjYXBlZFByZWZpeCwgZnVuYywgY29udGV4dCk7XG4gIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIG1hcFNpbmdsZUNoaWxkSW50b0NvbnRleHQsIHRyYXZlcnNlQ29udGV4dCk7XG4gIE1hcEJvb2tLZWVwaW5nLnJlbGVhc2UodHJhdmVyc2VDb250ZXh0KTtcbn1cblxuLyoqXG4gKiBNYXBzIGNoaWxkcmVuIHRoYXQgYXJlIHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYC5cbiAqXG4gKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90b3AtbGV2ZWwtYXBpLmh0bWwjcmVhY3QuY2hpbGRyZW4ubWFwXG4gKlxuICogVGhlIHByb3ZpZGVkIG1hcEZ1bmN0aW9uKGNoaWxkLCBrZXksIGluZGV4KSB3aWxsIGJlIGNhbGxlZCBmb3IgZWFjaFxuICogbGVhZiBjaGlsZC5cbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKiwgaW50KX0gZnVuYyBUaGUgbWFwIGZ1bmN0aW9uLlxuICogQHBhcmFtIHsqfSBjb250ZXh0IENvbnRleHQgZm9yIG1hcEZ1bmN0aW9uLlxuICogQHJldHVybiB7b2JqZWN0fSBPYmplY3QgY29udGFpbmluZyB0aGUgb3JkZXJlZCBtYXAgb2YgcmVzdWx0cy5cbiAqL1xuZnVuY3Rpb24gbWFwQ2hpbGRyZW4oY2hpbGRyZW4sIGZ1bmMsIGNvbnRleHQpIHtcbiAgaWYgKGNoaWxkcmVuID09IG51bGwpIHtcbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKGNoaWxkcmVuLCByZXN1bHQsIG51bGwsIGZ1bmMsIGNvbnRleHQpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBmb3JFYWNoU2luZ2xlQ2hpbGREdW1teSh0cmF2ZXJzZUNvbnRleHQsIGNoaWxkLCBuYW1lKSB7XG4gIHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqIENvdW50IHRoZSBudW1iZXIgb2YgY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhc1xuICogYHByb3BzLmNoaWxkcmVuYC5cbiAqXG4gKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90b3AtbGV2ZWwtYXBpLmh0bWwjcmVhY3QuY2hpbGRyZW4uY291bnRcbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIG51bWJlciBvZiBjaGlsZHJlbi5cbiAqL1xuZnVuY3Rpb24gY291bnRDaGlsZHJlbihjaGlsZHJlbiwgY29udGV4dCkge1xuICByZXR1cm4gdHJhdmVyc2VBbGxDaGlsZHJlbihjaGlsZHJlbiwgZm9yRWFjaFNpbmdsZUNoaWxkRHVtbXksIG51bGwpO1xufVxuXG4vKipcbiAqIEZsYXR0ZW4gYSBjaGlsZHJlbiBvYmplY3QgKHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYCkgYW5kXG4gKiByZXR1cm4gYW4gYXJyYXkgd2l0aCBhcHByb3ByaWF0ZWx5IHJlLWtleWVkIGNoaWxkcmVuLlxuICpcbiAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RvcC1sZXZlbC1hcGkuaHRtbCNyZWFjdC5jaGlsZHJlbi50b2FycmF5XG4gKi9cbmZ1bmN0aW9uIHRvQXJyYXkoY2hpbGRyZW4pIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKGNoaWxkcmVuLCByZXN1bHQsIG51bGwsIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNBcmd1bWVudCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbnZhciBSZWFjdENoaWxkcmVuID0ge1xuICBmb3JFYWNoOiBmb3JFYWNoQ2hpbGRyZW4sXG4gIG1hcDogbWFwQ2hpbGRyZW4sXG4gIG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWw6IG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWwsXG4gIGNvdW50OiBjb3VudENoaWxkcmVuLFxuICB0b0FycmF5OiB0b0FycmF5XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q2hpbGRyZW47IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0Q2xhc3NcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfcHJvZEludmFyaWFudCA9IHJlcXVpcmUoJy4vcmVhY3RQcm9kSW52YXJpYW50JyksXG4gICAgX2Fzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIFJlYWN0Q29tcG9uZW50ID0gcmVxdWlyZSgnLi9SZWFjdENvbXBvbmVudCcpO1xudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG52YXIgUmVhY3RQcm9wVHlwZUxvY2F0aW9ucyA9IHJlcXVpcmUoJy4vUmVhY3RQcm9wVHlwZUxvY2F0aW9ucycpO1xudmFyIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzID0gcmVxdWlyZSgnLi9SZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcycpO1xudmFyIFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlID0gcmVxdWlyZSgnLi9SZWFjdE5vb3BVcGRhdGVRdWV1ZScpO1xuXG52YXIgZW1wdHlPYmplY3QgPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eU9iamVjdCcpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIGtleU1pcnJvciA9IHJlcXVpcmUoJ2ZianMvbGliL2tleU1pcnJvcicpO1xudmFyIGtleU9mID0gcmVxdWlyZSgnZmJqcy9saWIva2V5T2YnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG52YXIgTUlYSU5TX0tFWSA9IGtleU9mKHsgbWl4aW5zOiBudWxsIH0pO1xuXG4vKipcbiAqIFBvbGljaWVzIHRoYXQgZGVzY3JpYmUgbWV0aG9kcyBpbiBgUmVhY3RDbGFzc0ludGVyZmFjZWAuXG4gKi9cbnZhciBTcGVjUG9saWN5ID0ga2V5TWlycm9yKHtcbiAgLyoqXG4gICAqIFRoZXNlIG1ldGhvZHMgbWF5IGJlIGRlZmluZWQgb25seSBvbmNlIGJ5IHRoZSBjbGFzcyBzcGVjaWZpY2F0aW9uIG9yIG1peGluLlxuICAgKi9cbiAgREVGSU5FX09OQ0U6IG51bGwsXG4gIC8qKlxuICAgKiBUaGVzZSBtZXRob2RzIG1heSBiZSBkZWZpbmVkIGJ5IGJvdGggdGhlIGNsYXNzIHNwZWNpZmljYXRpb24gYW5kIG1peGlucy5cbiAgICogU3Vic2VxdWVudCBkZWZpbml0aW9ucyB3aWxsIGJlIGNoYWluZWQuIFRoZXNlIG1ldGhvZHMgbXVzdCByZXR1cm4gdm9pZC5cbiAgICovXG4gIERFRklORV9NQU5ZOiBudWxsLFxuICAvKipcbiAgICogVGhlc2UgbWV0aG9kcyBhcmUgb3ZlcnJpZGluZyB0aGUgYmFzZSBjbGFzcy5cbiAgICovXG4gIE9WRVJSSURFX0JBU0U6IG51bGwsXG4gIC8qKlxuICAgKiBUaGVzZSBtZXRob2RzIGFyZSBzaW1pbGFyIHRvIERFRklORV9NQU5ZLCBleGNlcHQgd2UgYXNzdW1lIHRoZXkgcmV0dXJuXG4gICAqIG9iamVjdHMuIFdlIHRyeSB0byBtZXJnZSB0aGUga2V5cyBvZiB0aGUgcmV0dXJuIHZhbHVlcyBvZiBhbGwgdGhlIG1peGVkIGluXG4gICAqIGZ1bmN0aW9ucy4gSWYgdGhlcmUgaXMgYSBrZXkgY29uZmxpY3Qgd2UgdGhyb3cuXG4gICAqL1xuICBERUZJTkVfTUFOWV9NRVJHRUQ6IG51bGxcbn0pO1xuXG52YXIgaW5qZWN0ZWRNaXhpbnMgPSBbXTtcblxuLyoqXG4gKiBDb21wb3NpdGUgY29tcG9uZW50cyBhcmUgaGlnaGVyLWxldmVsIGNvbXBvbmVudHMgdGhhdCBjb21wb3NlIG90aGVyIGNvbXBvc2l0ZVxuICogb3IgaG9zdCBjb21wb25lbnRzLlxuICpcbiAqIFRvIGNyZWF0ZSBhIG5ldyB0eXBlIG9mIGBSZWFjdENsYXNzYCwgcGFzcyBhIHNwZWNpZmljYXRpb24gb2ZcbiAqIHlvdXIgbmV3IGNsYXNzIHRvIGBSZWFjdC5jcmVhdGVDbGFzc2AuIFRoZSBvbmx5IHJlcXVpcmVtZW50IG9mIHlvdXIgY2xhc3NcbiAqIHNwZWNpZmljYXRpb24gaXMgdGhhdCB5b3UgaW1wbGVtZW50IGEgYHJlbmRlcmAgbWV0aG9kLlxuICpcbiAqICAgdmFyIE15Q29tcG9uZW50ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICogICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gKiAgICAgICByZXR1cm4gPGRpdj5IZWxsbyBXb3JsZDwvZGl2PjtcbiAqICAgICB9XG4gKiAgIH0pO1xuICpcbiAqIFRoZSBjbGFzcyBzcGVjaWZpY2F0aW9uIHN1cHBvcnRzIGEgc3BlY2lmaWMgcHJvdG9jb2wgb2YgbWV0aG9kcyB0aGF0IGhhdmVcbiAqIHNwZWNpYWwgbWVhbmluZyAoZS5nLiBgcmVuZGVyYCkuIFNlZSBgUmVhY3RDbGFzc0ludGVyZmFjZWAgZm9yXG4gKiBtb3JlIHRoZSBjb21wcmVoZW5zaXZlIHByb3RvY29sLiBBbnkgb3RoZXIgcHJvcGVydGllcyBhbmQgbWV0aG9kcyBpbiB0aGVcbiAqIGNsYXNzIHNwZWNpZmljYXRpb24gd2lsbCBiZSBhdmFpbGFibGUgb24gdGhlIHByb3RvdHlwZS5cbiAqXG4gKiBAaW50ZXJmYWNlIFJlYWN0Q2xhc3NJbnRlcmZhY2VcbiAqIEBpbnRlcm5hbFxuICovXG52YXIgUmVhY3RDbGFzc0ludGVyZmFjZSA9IHtcblxuICAvKipcbiAgICogQW4gYXJyYXkgb2YgTWl4aW4gb2JqZWN0cyB0byBpbmNsdWRlIHdoZW4gZGVmaW5pbmcgeW91ciBjb21wb25lbnQuXG4gICAqXG4gICAqIEB0eXBlIHthcnJheX1cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBtaXhpbnM6IFNwZWNQb2xpY3kuREVGSU5FX01BTlksXG5cbiAgLyoqXG4gICAqIEFuIG9iamVjdCBjb250YWluaW5nIHByb3BlcnRpZXMgYW5kIG1ldGhvZHMgdGhhdCBzaG91bGQgYmUgZGVmaW5lZCBvblxuICAgKiB0aGUgY29tcG9uZW50J3MgY29uc3RydWN0b3IgaW5zdGVhZCBvZiBpdHMgcHJvdG90eXBlIChzdGF0aWMgbWV0aG9kcykuXG4gICAqXG4gICAqIEB0eXBlIHtvYmplY3R9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgc3RhdGljczogU3BlY1BvbGljeS5ERUZJTkVfTUFOWSxcblxuICAvKipcbiAgICogRGVmaW5pdGlvbiBvZiBwcm9wIHR5cGVzIGZvciB0aGlzIGNvbXBvbmVudC5cbiAgICpcbiAgICogQHR5cGUge29iamVjdH1cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBwcm9wVHlwZXM6IFNwZWNQb2xpY3kuREVGSU5FX01BTlksXG5cbiAgLyoqXG4gICAqIERlZmluaXRpb24gb2YgY29udGV4dCB0eXBlcyBmb3IgdGhpcyBjb21wb25lbnQuXG4gICAqXG4gICAqIEB0eXBlIHtvYmplY3R9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY29udGV4dFR5cGVzOiBTcGVjUG9saWN5LkRFRklORV9NQU5ZLFxuXG4gIC8qKlxuICAgKiBEZWZpbml0aW9uIG9mIGNvbnRleHQgdHlwZXMgdGhpcyBjb21wb25lbnQgc2V0cyBmb3IgaXRzIGNoaWxkcmVuLlxuICAgKlxuICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNoaWxkQ29udGV4dFR5cGVzOiBTcGVjUG9saWN5LkRFRklORV9NQU5ZLFxuXG4gIC8vID09PT0gRGVmaW5pdGlvbiBtZXRob2RzID09PT1cblxuICAvKipcbiAgICogSW52b2tlZCB3aGVuIHRoZSBjb21wb25lbnQgaXMgbW91bnRlZC4gVmFsdWVzIGluIHRoZSBtYXBwaW5nIHdpbGwgYmUgc2V0IG9uXG4gICAqIGB0aGlzLnByb3BzYCBpZiB0aGF0IHByb3AgaXMgbm90IHNwZWNpZmllZCAoaS5lLiB1c2luZyBhbiBgaW5gIGNoZWNrKS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgaW52b2tlZCBiZWZvcmUgYGdldEluaXRpYWxTdGF0ZWAgYW5kIHRoZXJlZm9yZSBjYW5ub3QgcmVseVxuICAgKiBvbiBgdGhpcy5zdGF0ZWAgb3IgdXNlIGB0aGlzLnNldFN0YXRlYC5cbiAgICpcbiAgICogQHJldHVybiB7b2JqZWN0fVxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGdldERlZmF1bHRQcm9wczogU3BlY1BvbGljeS5ERUZJTkVfTUFOWV9NRVJHRUQsXG5cbiAgLyoqXG4gICAqIEludm9rZWQgb25jZSBiZWZvcmUgdGhlIGNvbXBvbmVudCBpcyBtb3VudGVkLiBUaGUgcmV0dXJuIHZhbHVlIHdpbGwgYmUgdXNlZFxuICAgKiBhcyB0aGUgaW5pdGlhbCB2YWx1ZSBvZiBgdGhpcy5zdGF0ZWAuXG4gICAqXG4gICAqICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICogICAgIHJldHVybiB7XG4gICAqICAgICAgIGlzT246IGZhbHNlLFxuICAgKiAgICAgICBmb29CYXo6IG5ldyBCYXpGb28oKVxuICAgKiAgICAgfVxuICAgKiAgIH1cbiAgICpcbiAgICogQHJldHVybiB7b2JqZWN0fVxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGdldEluaXRpYWxTdGF0ZTogU3BlY1BvbGljeS5ERUZJTkVfTUFOWV9NRVJHRUQsXG5cbiAgLyoqXG4gICAqIEByZXR1cm4ge29iamVjdH1cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBnZXRDaGlsZENvbnRleHQ6IFNwZWNQb2xpY3kuREVGSU5FX01BTllfTUVSR0VELFxuXG4gIC8qKlxuICAgKiBVc2VzIHByb3BzIGZyb20gYHRoaXMucHJvcHNgIGFuZCBzdGF0ZSBmcm9tIGB0aGlzLnN0YXRlYCB0byByZW5kZXIgdGhlXG4gICAqIHN0cnVjdHVyZSBvZiB0aGUgY29tcG9uZW50LlxuICAgKlxuICAgKiBObyBndWFyYW50ZWVzIGFyZSBtYWRlIGFib3V0IHdoZW4gb3IgaG93IG9mdGVuIHRoaXMgbWV0aG9kIGlzIGludm9rZWQsIHNvXG4gICAqIGl0IG11c3Qgbm90IGhhdmUgc2lkZSBlZmZlY3RzLlxuICAgKlxuICAgKiAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAqICAgICB2YXIgbmFtZSA9IHRoaXMucHJvcHMubmFtZTtcbiAgICogICAgIHJldHVybiA8ZGl2PkhlbGxvLCB7bmFtZX0hPC9kaXY+O1xuICAgKiAgIH1cbiAgICpcbiAgICogQHJldHVybiB7UmVhY3RDb21wb25lbnR9XG4gICAqIEBub3NpZGVlZmZlY3RzXG4gICAqIEByZXF1aXJlZFxuICAgKi9cbiAgcmVuZGVyOiBTcGVjUG9saWN5LkRFRklORV9PTkNFLFxuXG4gIC8vID09PT0gRGVsZWdhdGUgbWV0aG9kcyA9PT09XG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIGluaXRpYWxseSBjcmVhdGVkIGFuZCBhYm91dCB0byBiZSBtb3VudGVkLlxuICAgKiBUaGlzIG1heSBoYXZlIHNpZGUgZWZmZWN0cywgYnV0IGFueSBleHRlcm5hbCBzdWJzY3JpcHRpb25zIG9yIGRhdGEgY3JlYXRlZFxuICAgKiBieSB0aGlzIG1ldGhvZCBtdXN0IGJlIGNsZWFuZWQgdXAgaW4gYGNvbXBvbmVudFdpbGxVbm1vdW50YC5cbiAgICpcbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBjb21wb25lbnRXaWxsTW91bnQ6IFNwZWNQb2xpY3kuREVGSU5FX01BTlksXG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hlbiB0aGUgY29tcG9uZW50IGhhcyBiZWVuIG1vdW50ZWQgYW5kIGhhcyBhIERPTSByZXByZXNlbnRhdGlvbi5cbiAgICogSG93ZXZlciwgdGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgdGhlIERPTSBub2RlIGlzIGluIHRoZSBkb2N1bWVudC5cbiAgICpcbiAgICogVXNlIHRoaXMgYXMgYW4gb3Bwb3J0dW5pdHkgdG8gb3BlcmF0ZSBvbiB0aGUgRE9NIHdoZW4gdGhlIGNvbXBvbmVudCBoYXNcbiAgICogYmVlbiBtb3VudGVkIChpbml0aWFsaXplZCBhbmQgcmVuZGVyZWQpIGZvciB0aGUgZmlyc3QgdGltZS5cbiAgICpcbiAgICogQHBhcmFtIHtET01FbGVtZW50fSByb290Tm9kZSBET00gZWxlbWVudCByZXByZXNlbnRpbmcgdGhlIGNvbXBvbmVudC5cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBjb21wb25lbnREaWRNb3VudDogU3BlY1BvbGljeS5ERUZJTkVfTUFOWSxcblxuICAvKipcbiAgICogSW52b2tlZCBiZWZvcmUgdGhlIGNvbXBvbmVudCByZWNlaXZlcyBuZXcgcHJvcHMuXG4gICAqXG4gICAqIFVzZSB0aGlzIGFzIGFuIG9wcG9ydHVuaXR5IHRvIHJlYWN0IHRvIGEgcHJvcCB0cmFuc2l0aW9uIGJ5IHVwZGF0aW5nIHRoZVxuICAgKiBzdGF0ZSB1c2luZyBgdGhpcy5zZXRTdGF0ZWAuIEN1cnJlbnQgcHJvcHMgYXJlIGFjY2Vzc2VkIHZpYSBgdGhpcy5wcm9wc2AuXG4gICAqXG4gICAqICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24obmV4dFByb3BzLCBuZXh0Q29udGV4dCkge1xuICAgKiAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAqICAgICAgIGxpa2VzSW5jcmVhc2luZzogbmV4dFByb3BzLmxpa2VDb3VudCA+IHRoaXMucHJvcHMubGlrZUNvdW50XG4gICAqICAgICB9KTtcbiAgICogICB9XG4gICAqXG4gICAqIE5PVEU6IFRoZXJlIGlzIG5vIGVxdWl2YWxlbnQgYGNvbXBvbmVudFdpbGxSZWNlaXZlU3RhdGVgLiBBbiBpbmNvbWluZyBwcm9wXG4gICAqIHRyYW5zaXRpb24gbWF5IGNhdXNlIGEgc3RhdGUgY2hhbmdlLCBidXQgdGhlIG9wcG9zaXRlIGlzIG5vdCB0cnVlLiBJZiB5b3VcbiAgICogbmVlZCBpdCwgeW91IGFyZSBwcm9iYWJseSBsb29raW5nIGZvciBgY29tcG9uZW50V2lsbFVwZGF0ZWAuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBuZXh0UHJvcHNcbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBTcGVjUG9saWN5LkRFRklORV9NQU5ZLFxuXG4gIC8qKlxuICAgKiBJbnZva2VkIHdoaWxlIGRlY2lkaW5nIGlmIHRoZSBjb21wb25lbnQgc2hvdWxkIGJlIHVwZGF0ZWQgYXMgYSByZXN1bHQgb2ZcbiAgICogcmVjZWl2aW5nIG5ldyBwcm9wcywgc3RhdGUgYW5kL29yIGNvbnRleHQuXG4gICAqXG4gICAqIFVzZSB0aGlzIGFzIGFuIG9wcG9ydHVuaXR5IHRvIGByZXR1cm4gZmFsc2VgIHdoZW4geW91J3JlIGNlcnRhaW4gdGhhdCB0aGVcbiAgICogdHJhbnNpdGlvbiB0byB0aGUgbmV3IHByb3BzL3N0YXRlL2NvbnRleHQgd2lsbCBub3QgcmVxdWlyZSBhIGNvbXBvbmVudFxuICAgKiB1cGRhdGUuXG4gICAqXG4gICAqICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlOiBmdW5jdGlvbihuZXh0UHJvcHMsIG5leHRTdGF0ZSwgbmV4dENvbnRleHQpIHtcbiAgICogICAgIHJldHVybiAhZXF1YWwobmV4dFByb3BzLCB0aGlzLnByb3BzKSB8fFxuICAgKiAgICAgICAhZXF1YWwobmV4dFN0YXRlLCB0aGlzLnN0YXRlKSB8fFxuICAgKiAgICAgICAhZXF1YWwobmV4dENvbnRleHQsIHRoaXMuY29udGV4dCk7XG4gICAqICAgfVxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gbmV4dFByb3BzXG4gICAqIEBwYXJhbSB7P29iamVjdH0gbmV4dFN0YXRlXG4gICAqIEBwYXJhbSB7P29iamVjdH0gbmV4dENvbnRleHRcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgY29tcG9uZW50IHNob3VsZCB1cGRhdGUuXG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlOiBTcGVjUG9saWN5LkRFRklORV9PTkNFLFxuXG4gIC8qKlxuICAgKiBJbnZva2VkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBhYm91dCB0byB1cGRhdGUgZHVlIHRvIGEgdHJhbnNpdGlvbiBmcm9tXG4gICAqIGB0aGlzLnByb3BzYCwgYHRoaXMuc3RhdGVgIGFuZCBgdGhpcy5jb250ZXh0YCB0byBgbmV4dFByb3BzYCwgYG5leHRTdGF0ZWBcbiAgICogYW5kIGBuZXh0Q29udGV4dGAuXG4gICAqXG4gICAqIFVzZSB0aGlzIGFzIGFuIG9wcG9ydHVuaXR5IHRvIHBlcmZvcm0gcHJlcGFyYXRpb24gYmVmb3JlIGFuIHVwZGF0ZSBvY2N1cnMuXG4gICAqXG4gICAqIE5PVEU6IFlvdSAqKmNhbm5vdCoqIHVzZSBgdGhpcy5zZXRTdGF0ZSgpYCBpbiB0aGlzIG1ldGhvZC5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IG5leHRQcm9wc1xuICAgKiBAcGFyYW0gez9vYmplY3R9IG5leHRTdGF0ZVxuICAgKiBAcGFyYW0gez9vYmplY3R9IG5leHRDb250ZXh0XG4gICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbn0gdHJhbnNhY3Rpb25cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBjb21wb25lbnRXaWxsVXBkYXRlOiBTcGVjUG9saWN5LkRFRklORV9NQU5ZLFxuXG4gIC8qKlxuICAgKiBJbnZva2VkIHdoZW4gdGhlIGNvbXBvbmVudCdzIERPTSByZXByZXNlbnRhdGlvbiBoYXMgYmVlbiB1cGRhdGVkLlxuICAgKlxuICAgKiBVc2UgdGhpcyBhcyBhbiBvcHBvcnR1bml0eSB0byBvcGVyYXRlIG9uIHRoZSBET00gd2hlbiB0aGUgY29tcG9uZW50IGhhc1xuICAgKiBiZWVuIHVwZGF0ZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwcmV2UHJvcHNcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBwcmV2U3RhdGVcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBwcmV2Q29udGV4dFxuICAgKiBAcGFyYW0ge0RPTUVsZW1lbnR9IHJvb3ROb2RlIERPTSBlbGVtZW50IHJlcHJlc2VudGluZyB0aGUgY29tcG9uZW50LlxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNvbXBvbmVudERpZFVwZGF0ZTogU3BlY1BvbGljeS5ERUZJTkVfTUFOWSxcblxuICAvKipcbiAgICogSW52b2tlZCB3aGVuIHRoZSBjb21wb25lbnQgaXMgYWJvdXQgdG8gYmUgcmVtb3ZlZCBmcm9tIGl0cyBwYXJlbnQgYW5kIGhhdmVcbiAgICogaXRzIERPTSByZXByZXNlbnRhdGlvbiBkZXN0cm95ZWQuXG4gICAqXG4gICAqIFVzZSB0aGlzIGFzIGFuIG9wcG9ydHVuaXR5IHRvIGRlYWxsb2NhdGUgYW55IGV4dGVybmFsIHJlc291cmNlcy5cbiAgICpcbiAgICogTk9URTogVGhlcmUgaXMgbm8gYGNvbXBvbmVudERpZFVubW91bnRgIHNpbmNlIHlvdXIgY29tcG9uZW50IHdpbGwgaGF2ZSBiZWVuXG4gICAqIGRlc3Ryb3llZCBieSB0aGF0IHBvaW50LlxuICAgKlxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50OiBTcGVjUG9saWN5LkRFRklORV9NQU5ZLFxuXG4gIC8vID09PT0gQWR2YW5jZWQgbWV0aG9kcyA9PT09XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIGNvbXBvbmVudCdzIGN1cnJlbnRseSBtb3VudGVkIERPTSByZXByZXNlbnRhdGlvbi5cbiAgICpcbiAgICogQnkgZGVmYXVsdCwgdGhpcyBpbXBsZW1lbnRzIFJlYWN0J3MgcmVuZGVyaW5nIGFuZCByZWNvbmNpbGlhdGlvbiBhbGdvcml0aG0uXG4gICAqIFNvcGhpc3RpY2F0ZWQgY2xpZW50cyBtYXkgd2lzaCB0byBvdmVycmlkZSB0aGlzLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb259IHRyYW5zYWN0aW9uXG4gICAqIEBpbnRlcm5hbFxuICAgKiBAb3ZlcnJpZGFibGVcbiAgICovXG4gIHVwZGF0ZUNvbXBvbmVudDogU3BlY1BvbGljeS5PVkVSUklERV9CQVNFXG5cbn07XG5cbi8qKlxuICogTWFwcGluZyBmcm9tIGNsYXNzIHNwZWNpZmljYXRpb24ga2V5cyB0byBzcGVjaWFsIHByb2Nlc3NpbmcgZnVuY3Rpb25zLlxuICpcbiAqIEFsdGhvdWdoIHRoZXNlIGFyZSBkZWNsYXJlZCBsaWtlIGluc3RhbmNlIHByb3BlcnRpZXMgaW4gdGhlIHNwZWNpZmljYXRpb25cbiAqIHdoZW4gZGVmaW5pbmcgY2xhc3NlcyB1c2luZyBgUmVhY3QuY3JlYXRlQ2xhc3NgLCB0aGV5IGFyZSBhY3R1YWxseSBzdGF0aWNcbiAqIGFuZCBhcmUgYWNjZXNzaWJsZSBvbiB0aGUgY29uc3RydWN0b3IgaW5zdGVhZCBvZiB0aGUgcHJvdG90eXBlLiBEZXNwaXRlXG4gKiBiZWluZyBzdGF0aWMsIHRoZXkgbXVzdCBiZSBkZWZpbmVkIG91dHNpZGUgb2YgdGhlIFwic3RhdGljc1wiIGtleSB1bmRlclxuICogd2hpY2ggYWxsIG90aGVyIHN0YXRpYyBtZXRob2RzIGFyZSBkZWZpbmVkLlxuICovXG52YXIgUkVTRVJWRURfU1BFQ19LRVlTID0ge1xuICBkaXNwbGF5TmFtZTogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBkaXNwbGF5TmFtZSkge1xuICAgIENvbnN0cnVjdG9yLmRpc3BsYXlOYW1lID0gZGlzcGxheU5hbWU7XG4gIH0sXG4gIG1peGluczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBtaXhpbnMpIHtcbiAgICBpZiAobWl4aW5zKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1peGlucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBtaXhTcGVjSW50b0NvbXBvbmVudChDb25zdHJ1Y3RvciwgbWl4aW5zW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGNoaWxkQ29udGV4dFR5cGVzOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIGNoaWxkQ29udGV4dFR5cGVzKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhbGlkYXRlVHlwZURlZihDb25zdHJ1Y3RvciwgY2hpbGRDb250ZXh0VHlwZXMsIFJlYWN0UHJvcFR5cGVMb2NhdGlvbnMuY2hpbGRDb250ZXh0KTtcbiAgICB9XG4gICAgQ29uc3RydWN0b3IuY2hpbGRDb250ZXh0VHlwZXMgPSBfYXNzaWduKHt9LCBDb25zdHJ1Y3Rvci5jaGlsZENvbnRleHRUeXBlcywgY2hpbGRDb250ZXh0VHlwZXMpO1xuICB9LFxuICBjb250ZXh0VHlwZXM6IGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgY29udGV4dFR5cGVzKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhbGlkYXRlVHlwZURlZihDb25zdHJ1Y3RvciwgY29udGV4dFR5cGVzLCBSZWFjdFByb3BUeXBlTG9jYXRpb25zLmNvbnRleHQpO1xuICAgIH1cbiAgICBDb25zdHJ1Y3Rvci5jb250ZXh0VHlwZXMgPSBfYXNzaWduKHt9LCBDb25zdHJ1Y3Rvci5jb250ZXh0VHlwZXMsIGNvbnRleHRUeXBlcyk7XG4gIH0sXG4gIC8qKlxuICAgKiBTcGVjaWFsIGNhc2UgZ2V0RGVmYXVsdFByb3BzIHdoaWNoIHNob3VsZCBtb3ZlIGludG8gc3RhdGljcyBidXQgcmVxdWlyZXNcbiAgICogYXV0b21hdGljIG1lcmdpbmcuXG4gICAqL1xuICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgZ2V0RGVmYXVsdFByb3BzKSB7XG4gICAgaWYgKENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcykge1xuICAgICAgQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzID0gY3JlYXRlTWVyZ2VkUmVzdWx0RnVuY3Rpb24oQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzLCBnZXREZWZhdWx0UHJvcHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMgPSBnZXREZWZhdWx0UHJvcHM7XG4gICAgfVxuICB9LFxuICBwcm9wVHlwZXM6IGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvcFR5cGVzKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhbGlkYXRlVHlwZURlZihDb25zdHJ1Y3RvciwgcHJvcFR5cGVzLCBSZWFjdFByb3BUeXBlTG9jYXRpb25zLnByb3ApO1xuICAgIH1cbiAgICBDb25zdHJ1Y3Rvci5wcm9wVHlwZXMgPSBfYXNzaWduKHt9LCBDb25zdHJ1Y3Rvci5wcm9wVHlwZXMsIHByb3BUeXBlcyk7XG4gIH0sXG4gIHN0YXRpY3M6IGZ1bmN0aW9uIChDb25zdHJ1Y3Rvciwgc3RhdGljcykge1xuICAgIG1peFN0YXRpY1NwZWNJbnRvQ29tcG9uZW50KENvbnN0cnVjdG9yLCBzdGF0aWNzKTtcbiAgfSxcbiAgYXV0b2JpbmQ6IGZ1bmN0aW9uICgpIHt9IH07XG5cbi8vIG5vb3BcbmZ1bmN0aW9uIHZhbGlkYXRlVHlwZURlZihDb25zdHJ1Y3RvciwgdHlwZURlZiwgbG9jYXRpb24pIHtcbiAgZm9yICh2YXIgcHJvcE5hbWUgaW4gdHlwZURlZikge1xuICAgIGlmICh0eXBlRGVmLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xuICAgICAgLy8gdXNlIGEgd2FybmluZyBpbnN0ZWFkIG9mIGFuIGludmFyaWFudCBzbyBjb21wb25lbnRzXG4gICAgICAvLyBkb24ndCBzaG93IHVwIGluIHByb2QgYnV0IG9ubHkgaW4gX19ERVZfX1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcodHlwZW9mIHR5cGVEZWZbcHJvcE5hbWVdID09PSAnZnVuY3Rpb24nLCAnJXM6ICVzIHR5cGUgYCVzYCBpcyBpbnZhbGlkOyBpdCBtdXN0IGJlIGEgZnVuY3Rpb24sIHVzdWFsbHkgZnJvbSAnICsgJ1JlYWN0LlByb3BUeXBlcy4nLCBDb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSB8fCAnUmVhY3RDbGFzcycsIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXSwgcHJvcE5hbWUpIDogdm9pZCAwO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZU1ldGhvZE92ZXJyaWRlKGlzQWxyZWFkeURlZmluZWQsIG5hbWUpIHtcbiAgdmFyIHNwZWNQb2xpY3kgPSBSZWFjdENsYXNzSW50ZXJmYWNlLmhhc093blByb3BlcnR5KG5hbWUpID8gUmVhY3RDbGFzc0ludGVyZmFjZVtuYW1lXSA6IG51bGw7XG5cbiAgLy8gRGlzYWxsb3cgb3ZlcnJpZGluZyBvZiBiYXNlIGNsYXNzIG1ldGhvZHMgdW5sZXNzIGV4cGxpY2l0bHkgYWxsb3dlZC5cbiAgaWYgKFJlYWN0Q2xhc3NNaXhpbi5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICEoc3BlY1BvbGljeSA9PT0gU3BlY1BvbGljeS5PVkVSUklERV9CQVNFKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdENsYXNzSW50ZXJmYWNlOiBZb3UgYXJlIGF0dGVtcHRpbmcgdG8gb3ZlcnJpZGUgYCVzYCBmcm9tIHlvdXIgY2xhc3Mgc3BlY2lmaWNhdGlvbi4gRW5zdXJlIHRoYXQgeW91ciBtZXRob2QgbmFtZXMgZG8gbm90IG92ZXJsYXAgd2l0aCBSZWFjdCBtZXRob2RzLicsIG5hbWUpIDogX3Byb2RJbnZhcmlhbnQoJzczJywgbmFtZSkgOiB2b2lkIDA7XG4gIH1cblxuICAvLyBEaXNhbGxvdyBkZWZpbmluZyBtZXRob2RzIG1vcmUgdGhhbiBvbmNlIHVubGVzcyBleHBsaWNpdGx5IGFsbG93ZWQuXG4gIGlmIChpc0FscmVhZHlEZWZpbmVkKSB7XG4gICAgIShzcGVjUG9saWN5ID09PSBTcGVjUG9saWN5LkRFRklORV9NQU5ZIHx8IHNwZWNQb2xpY3kgPT09IFNwZWNQb2xpY3kuREVGSU5FX01BTllfTUVSR0VEKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdENsYXNzSW50ZXJmYWNlOiBZb3UgYXJlIGF0dGVtcHRpbmcgdG8gZGVmaW5lIGAlc2Agb24geW91ciBjb21wb25lbnQgbW9yZSB0aGFuIG9uY2UuIFRoaXMgY29uZmxpY3QgbWF5IGJlIGR1ZSB0byBhIG1peGluLicsIG5hbWUpIDogX3Byb2RJbnZhcmlhbnQoJzc0JywgbmFtZSkgOiB2b2lkIDA7XG4gIH1cbn1cblxuLyoqXG4gKiBNaXhpbiBoZWxwZXIgd2hpY2ggaGFuZGxlcyBwb2xpY3kgdmFsaWRhdGlvbiBhbmQgcmVzZXJ2ZWRcbiAqIHNwZWNpZmljYXRpb24ga2V5cyB3aGVuIGJ1aWxkaW5nIFJlYWN0IGNsYXNzZXMuXG4gKi9cbmZ1bmN0aW9uIG1peFNwZWNJbnRvQ29tcG9uZW50KENvbnN0cnVjdG9yLCBzcGVjKSB7XG4gIGlmICghc3BlYykge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YXIgdHlwZW9mU3BlYyA9IHR5cGVvZiBzcGVjO1xuICAgICAgdmFyIGlzTWl4aW5WYWxpZCA9IHR5cGVvZlNwZWMgPT09ICdvYmplY3QnICYmIHNwZWMgIT09IG51bGw7XG5cbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGlzTWl4aW5WYWxpZCwgJyVzOiBZb3VcXCdyZSBhdHRlbXB0aW5nIHRvIGluY2x1ZGUgYSBtaXhpbiB0aGF0IGlzIGVpdGhlciBudWxsICcgKyAnb3Igbm90IGFuIG9iamVjdC4gQ2hlY2sgdGhlIG1peGlucyBpbmNsdWRlZCBieSB0aGUgY29tcG9uZW50LCAnICsgJ2FzIHdlbGwgYXMgYW55IG1peGlucyB0aGV5IGluY2x1ZGUgdGhlbXNlbHZlcy4gJyArICdFeHBlY3RlZCBvYmplY3QgYnV0IGdvdCAlcy4nLCBDb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSB8fCAnUmVhY3RDbGFzcycsIHNwZWMgPT09IG51bGwgPyBudWxsIDogdHlwZW9mU3BlYykgOiB2b2lkIDA7XG4gICAgfVxuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgISh0eXBlb2Ygc3BlYyAhPT0gJ2Z1bmN0aW9uJykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RDbGFzczogWW91XFwncmUgYXR0ZW1wdGluZyB0byB1c2UgYSBjb21wb25lbnQgY2xhc3Mgb3IgZnVuY3Rpb24gYXMgYSBtaXhpbi4gSW5zdGVhZCwganVzdCB1c2UgYSByZWd1bGFyIG9iamVjdC4nKSA6IF9wcm9kSW52YXJpYW50KCc3NScpIDogdm9pZCAwO1xuICAhIVJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChzcGVjKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdENsYXNzOiBZb3VcXCdyZSBhdHRlbXB0aW5nIHRvIHVzZSBhIGNvbXBvbmVudCBhcyBhIG1peGluLiBJbnN0ZWFkLCBqdXN0IHVzZSBhIHJlZ3VsYXIgb2JqZWN0LicpIDogX3Byb2RJbnZhcmlhbnQoJzc2JykgOiB2b2lkIDA7XG5cbiAgdmFyIHByb3RvID0gQ29uc3RydWN0b3IucHJvdG90eXBlO1xuICB2YXIgYXV0b0JpbmRQYWlycyA9IHByb3RvLl9fcmVhY3RBdXRvQmluZFBhaXJzO1xuXG4gIC8vIEJ5IGhhbmRsaW5nIG1peGlucyBiZWZvcmUgYW55IG90aGVyIHByb3BlcnRpZXMsIHdlIGVuc3VyZSB0aGUgc2FtZVxuICAvLyBjaGFpbmluZyBvcmRlciBpcyBhcHBsaWVkIHRvIG1ldGhvZHMgd2l0aCBERUZJTkVfTUFOWSBwb2xpY3ksIHdoZXRoZXJcbiAgLy8gbWl4aW5zIGFyZSBsaXN0ZWQgYmVmb3JlIG9yIGFmdGVyIHRoZXNlIG1ldGhvZHMgaW4gdGhlIHNwZWMuXG4gIGlmIChzcGVjLmhhc093blByb3BlcnR5KE1JWElOU19LRVkpKSB7XG4gICAgUkVTRVJWRURfU1BFQ19LRVlTLm1peGlucyhDb25zdHJ1Y3Rvciwgc3BlYy5taXhpbnMpO1xuICB9XG5cbiAgZm9yICh2YXIgbmFtZSBpbiBzcGVjKSB7XG4gICAgaWYgKCFzcGVjLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAobmFtZSA9PT0gTUlYSU5TX0tFWSkge1xuICAgICAgLy8gV2UgaGF2ZSBhbHJlYWR5IGhhbmRsZWQgbWl4aW5zIGluIGEgc3BlY2lhbCBjYXNlIGFib3ZlLlxuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgdmFyIHByb3BlcnR5ID0gc3BlY1tuYW1lXTtcbiAgICB2YXIgaXNBbHJlYWR5RGVmaW5lZCA9IHByb3RvLmhhc093blByb3BlcnR5KG5hbWUpO1xuICAgIHZhbGlkYXRlTWV0aG9kT3ZlcnJpZGUoaXNBbHJlYWR5RGVmaW5lZCwgbmFtZSk7XG5cbiAgICBpZiAoUkVTRVJWRURfU1BFQ19LRVlTLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICBSRVNFUlZFRF9TUEVDX0tFWVNbbmFtZV0oQ29uc3RydWN0b3IsIHByb3BlcnR5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU2V0dXAgbWV0aG9kcyBvbiBwcm90b3R5cGU6XG4gICAgICAvLyBUaGUgZm9sbG93aW5nIG1lbWJlciBtZXRob2RzIHNob3VsZCBub3QgYmUgYXV0b21hdGljYWxseSBib3VuZDpcbiAgICAgIC8vIDEuIEV4cGVjdGVkIFJlYWN0Q2xhc3MgbWV0aG9kcyAoaW4gdGhlIFwiaW50ZXJmYWNlXCIpLlxuICAgICAgLy8gMi4gT3ZlcnJpZGRlbiBtZXRob2RzICh0aGF0IHdlcmUgbWl4ZWQgaW4pLlxuICAgICAgdmFyIGlzUmVhY3RDbGFzc01ldGhvZCA9IFJlYWN0Q2xhc3NJbnRlcmZhY2UuaGFzT3duUHJvcGVydHkobmFtZSk7XG4gICAgICB2YXIgaXNGdW5jdGlvbiA9IHR5cGVvZiBwcm9wZXJ0eSA9PT0gJ2Z1bmN0aW9uJztcbiAgICAgIHZhciBzaG91bGRBdXRvQmluZCA9IGlzRnVuY3Rpb24gJiYgIWlzUmVhY3RDbGFzc01ldGhvZCAmJiAhaXNBbHJlYWR5RGVmaW5lZCAmJiBzcGVjLmF1dG9iaW5kICE9PSBmYWxzZTtcblxuICAgICAgaWYgKHNob3VsZEF1dG9CaW5kKSB7XG4gICAgICAgIGF1dG9CaW5kUGFpcnMucHVzaChuYW1lLCBwcm9wZXJ0eSk7XG4gICAgICAgIHByb3RvW25hbWVdID0gcHJvcGVydHk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoaXNBbHJlYWR5RGVmaW5lZCkge1xuICAgICAgICAgIHZhciBzcGVjUG9saWN5ID0gUmVhY3RDbGFzc0ludGVyZmFjZVtuYW1lXTtcblxuICAgICAgICAgIC8vIFRoZXNlIGNhc2VzIHNob3VsZCBhbHJlYWR5IGJlIGNhdWdodCBieSB2YWxpZGF0ZU1ldGhvZE92ZXJyaWRlLlxuICAgICAgICAgICEoaXNSZWFjdENsYXNzTWV0aG9kICYmIChzcGVjUG9saWN5ID09PSBTcGVjUG9saWN5LkRFRklORV9NQU5ZX01FUkdFRCB8fCBzcGVjUG9saWN5ID09PSBTcGVjUG9saWN5LkRFRklORV9NQU5ZKSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RDbGFzczogVW5leHBlY3RlZCBzcGVjIHBvbGljeSAlcyBmb3Iga2V5ICVzIHdoZW4gbWl4aW5nIGluIGNvbXBvbmVudCBzcGVjcy4nLCBzcGVjUG9saWN5LCBuYW1lKSA6IF9wcm9kSW52YXJpYW50KCc3NycsIHNwZWNQb2xpY3ksIG5hbWUpIDogdm9pZCAwO1xuXG4gICAgICAgICAgLy8gRm9yIG1ldGhvZHMgd2hpY2ggYXJlIGRlZmluZWQgbW9yZSB0aGFuIG9uY2UsIGNhbGwgdGhlIGV4aXN0aW5nXG4gICAgICAgICAgLy8gbWV0aG9kcyBiZWZvcmUgY2FsbGluZyB0aGUgbmV3IHByb3BlcnR5LCBtZXJnaW5nIGlmIGFwcHJvcHJpYXRlLlxuICAgICAgICAgIGlmIChzcGVjUG9saWN5ID09PSBTcGVjUG9saWN5LkRFRklORV9NQU5ZX01FUkdFRCkge1xuICAgICAgICAgICAgcHJvdG9bbmFtZV0gPSBjcmVhdGVNZXJnZWRSZXN1bHRGdW5jdGlvbihwcm90b1tuYW1lXSwgcHJvcGVydHkpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc3BlY1BvbGljeSA9PT0gU3BlY1BvbGljeS5ERUZJTkVfTUFOWSkge1xuICAgICAgICAgICAgcHJvdG9bbmFtZV0gPSBjcmVhdGVDaGFpbmVkRnVuY3Rpb24ocHJvdG9bbmFtZV0sIHByb3BlcnR5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJvdG9bbmFtZV0gPSBwcm9wZXJ0eTtcbiAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgLy8gQWRkIHZlcmJvc2UgZGlzcGxheU5hbWUgdG8gdGhlIGZ1bmN0aW9uLCB3aGljaCBoZWxwcyB3aGVuIGxvb2tpbmdcbiAgICAgICAgICAgIC8vIGF0IHByb2ZpbGluZyB0b29scy5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgcHJvcGVydHkgPT09ICdmdW5jdGlvbicgJiYgc3BlYy5kaXNwbGF5TmFtZSkge1xuICAgICAgICAgICAgICBwcm90b1tuYW1lXS5kaXNwbGF5TmFtZSA9IHNwZWMuZGlzcGxheU5hbWUgKyAnXycgKyBuYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBtaXhTdGF0aWNTcGVjSW50b0NvbXBvbmVudChDb25zdHJ1Y3Rvciwgc3RhdGljcykge1xuICBpZiAoIXN0YXRpY3MpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgZm9yICh2YXIgbmFtZSBpbiBzdGF0aWNzKSB7XG4gICAgdmFyIHByb3BlcnR5ID0gc3RhdGljc1tuYW1lXTtcbiAgICBpZiAoIXN0YXRpY3MuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciBpc1Jlc2VydmVkID0gbmFtZSBpbiBSRVNFUlZFRF9TUEVDX0tFWVM7XG4gICAgISFpc1Jlc2VydmVkID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0Q2xhc3M6IFlvdSBhcmUgYXR0ZW1wdGluZyB0byBkZWZpbmUgYSByZXNlcnZlZCBwcm9wZXJ0eSwgYCVzYCwgdGhhdCBzaG91bGRuXFwndCBiZSBvbiB0aGUgXCJzdGF0aWNzXCIga2V5LiBEZWZpbmUgaXQgYXMgYW4gaW5zdGFuY2UgcHJvcGVydHkgaW5zdGVhZDsgaXQgd2lsbCBzdGlsbCBiZSBhY2Nlc3NpYmxlIG9uIHRoZSBjb25zdHJ1Y3Rvci4nLCBuYW1lKSA6IF9wcm9kSW52YXJpYW50KCc3OCcsIG5hbWUpIDogdm9pZCAwO1xuXG4gICAgdmFyIGlzSW5oZXJpdGVkID0gbmFtZSBpbiBDb25zdHJ1Y3RvcjtcbiAgICAhIWlzSW5oZXJpdGVkID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0Q2xhc3M6IFlvdSBhcmUgYXR0ZW1wdGluZyB0byBkZWZpbmUgYCVzYCBvbiB5b3VyIGNvbXBvbmVudCBtb3JlIHRoYW4gb25jZS4gVGhpcyBjb25mbGljdCBtYXkgYmUgZHVlIHRvIGEgbWl4aW4uJywgbmFtZSkgOiBfcHJvZEludmFyaWFudCgnNzknLCBuYW1lKSA6IHZvaWQgMDtcbiAgICBDb25zdHJ1Y3RvcltuYW1lXSA9IHByb3BlcnR5O1xuICB9XG59XG5cbi8qKlxuICogTWVyZ2UgdHdvIG9iamVjdHMsIGJ1dCB0aHJvdyBpZiBib3RoIGNvbnRhaW4gdGhlIHNhbWUga2V5LlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBvbmUgVGhlIGZpcnN0IG9iamVjdCwgd2hpY2ggaXMgbXV0YXRlZC5cbiAqIEBwYXJhbSB7b2JqZWN0fSB0d28gVGhlIHNlY29uZCBvYmplY3RcbiAqIEByZXR1cm4ge29iamVjdH0gb25lIGFmdGVyIGl0IGhhcyBiZWVuIG11dGF0ZWQgdG8gY29udGFpbiBldmVyeXRoaW5nIGluIHR3by5cbiAqL1xuZnVuY3Rpb24gbWVyZ2VJbnRvV2l0aE5vRHVwbGljYXRlS2V5cyhvbmUsIHR3bykge1xuICAhKG9uZSAmJiB0d28gJiYgdHlwZW9mIG9uZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHR3byA9PT0gJ29iamVjdCcpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ21lcmdlSW50b1dpdGhOb0R1cGxpY2F0ZUtleXMoKTogQ2Fubm90IG1lcmdlIG5vbi1vYmplY3RzLicpIDogX3Byb2RJbnZhcmlhbnQoJzgwJykgOiB2b2lkIDA7XG5cbiAgZm9yICh2YXIga2V5IGluIHR3bykge1xuICAgIGlmICh0d28uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgIShvbmVba2V5XSA9PT0gdW5kZWZpbmVkKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdtZXJnZUludG9XaXRoTm9EdXBsaWNhdGVLZXlzKCk6IFRyaWVkIHRvIG1lcmdlIHR3byBvYmplY3RzIHdpdGggdGhlIHNhbWUga2V5OiBgJXNgLiBUaGlzIGNvbmZsaWN0IG1heSBiZSBkdWUgdG8gYSBtaXhpbjsgaW4gcGFydGljdWxhciwgdGhpcyBtYXkgYmUgY2F1c2VkIGJ5IHR3byBnZXRJbml0aWFsU3RhdGUoKSBvciBnZXREZWZhdWx0UHJvcHMoKSBtZXRob2RzIHJldHVybmluZyBvYmplY3RzIHdpdGggY2xhc2hpbmcga2V5cy4nLCBrZXkpIDogX3Byb2RJbnZhcmlhbnQoJzgxJywga2V5KSA6IHZvaWQgMDtcbiAgICAgIG9uZVtrZXldID0gdHdvW2tleV07XG4gICAgfVxuICB9XG4gIHJldHVybiBvbmU7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgaW52b2tlcyB0d28gZnVuY3Rpb25zIGFuZCBtZXJnZXMgdGhlaXIgcmV0dXJuIHZhbHVlcy5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBvbmUgRnVuY3Rpb24gdG8gaW52b2tlIGZpcnN0LlxuICogQHBhcmFtIHtmdW5jdGlvbn0gdHdvIEZ1bmN0aW9uIHRvIGludm9rZSBzZWNvbmQuXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn0gRnVuY3Rpb24gdGhhdCBpbnZva2VzIHRoZSB0d28gYXJndW1lbnQgZnVuY3Rpb25zLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY3JlYXRlTWVyZ2VkUmVzdWx0RnVuY3Rpb24ob25lLCB0d28pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIG1lcmdlZFJlc3VsdCgpIHtcbiAgICB2YXIgYSA9IG9uZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHZhciBiID0gdHdvLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKGEgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGI7XG4gICAgfSBlbHNlIGlmIChiID09IG51bGwpIHtcbiAgICAgIHJldHVybiBhO1xuICAgIH1cbiAgICB2YXIgYyA9IHt9O1xuICAgIG1lcmdlSW50b1dpdGhOb0R1cGxpY2F0ZUtleXMoYywgYSk7XG4gICAgbWVyZ2VJbnRvV2l0aE5vRHVwbGljYXRlS2V5cyhjLCBiKTtcbiAgICByZXR1cm4gYztcbiAgfTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBpbnZva2VzIHR3byBmdW5jdGlvbnMgYW5kIGlnbm9yZXMgdGhlaXIgcmV0dXJuIHZhbGVzLlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IG9uZSBGdW5jdGlvbiB0byBpbnZva2UgZmlyc3QuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSB0d28gRnVuY3Rpb24gdG8gaW52b2tlIHNlY29uZC5cbiAqIEByZXR1cm4ge2Z1bmN0aW9ufSBGdW5jdGlvbiB0aGF0IGludm9rZXMgdGhlIHR3byBhcmd1bWVudCBmdW5jdGlvbnMuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjcmVhdGVDaGFpbmVkRnVuY3Rpb24ob25lLCB0d28pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGNoYWluZWRGdW5jdGlvbigpIHtcbiAgICBvbmUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB0d28uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBCaW5kcyBhIG1ldGhvZCB0byB0aGUgY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb21wb25lbnQgQ29tcG9uZW50IHdob3NlIG1ldGhvZCBpcyBnb2luZyB0byBiZSBib3VuZC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IG1ldGhvZCBNZXRob2QgdG8gYmUgYm91bmQuXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn0gVGhlIGJvdW5kIG1ldGhvZC5cbiAqL1xuZnVuY3Rpb24gYmluZEF1dG9CaW5kTWV0aG9kKGNvbXBvbmVudCwgbWV0aG9kKSB7XG4gIHZhciBib3VuZE1ldGhvZCA9IG1ldGhvZC5iaW5kKGNvbXBvbmVudCk7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgYm91bmRNZXRob2QuX19yZWFjdEJvdW5kQ29udGV4dCA9IGNvbXBvbmVudDtcbiAgICBib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRNZXRob2QgPSBtZXRob2Q7XG4gICAgYm91bmRNZXRob2QuX19yZWFjdEJvdW5kQXJndW1lbnRzID0gbnVsbDtcbiAgICB2YXIgY29tcG9uZW50TmFtZSA9IGNvbXBvbmVudC5jb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZTtcbiAgICB2YXIgX2JpbmQgPSBib3VuZE1ldGhvZC5iaW5kO1xuICAgIGJvdW5kTWV0aG9kLmJpbmQgPSBmdW5jdGlvbiAobmV3VGhpcykge1xuICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuXG4gICAgICAvLyBVc2VyIGlzIHRyeWluZyB0byBiaW5kKCkgYW4gYXV0b2JvdW5kIG1ldGhvZDsgd2UgZWZmZWN0aXZlbHkgd2lsbFxuICAgICAgLy8gaWdub3JlIHRoZSB2YWx1ZSBvZiBcInRoaXNcIiB0aGF0IHRoZSB1c2VyIGlzIHRyeWluZyB0byB1c2UsIHNvXG4gICAgICAvLyBsZXQncyB3YXJuLlxuICAgICAgaWYgKG5ld1RoaXMgIT09IGNvbXBvbmVudCAmJiBuZXdUaGlzICE9PSBudWxsKSB7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnYmluZCgpOiBSZWFjdCBjb21wb25lbnQgbWV0aG9kcyBtYXkgb25seSBiZSBib3VuZCB0byB0aGUgJyArICdjb21wb25lbnQgaW5zdGFuY2UuIFNlZSAlcycsIGNvbXBvbmVudE5hbWUpIDogdm9pZCAwO1xuICAgICAgfSBlbHNlIGlmICghYXJncy5sZW5ndGgpIHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdiaW5kKCk6IFlvdSBhcmUgYmluZGluZyBhIGNvbXBvbmVudCBtZXRob2QgdG8gdGhlIGNvbXBvbmVudC4gJyArICdSZWFjdCBkb2VzIHRoaXMgZm9yIHlvdSBhdXRvbWF0aWNhbGx5IGluIGEgaGlnaC1wZXJmb3JtYW5jZSAnICsgJ3dheSwgc28geW91IGNhbiBzYWZlbHkgcmVtb3ZlIHRoaXMgY2FsbC4gU2VlICVzJywgY29tcG9uZW50TmFtZSkgOiB2b2lkIDA7XG4gICAgICAgIHJldHVybiBib3VuZE1ldGhvZDtcbiAgICAgIH1cbiAgICAgIHZhciByZWJvdW5kTWV0aG9kID0gX2JpbmQuYXBwbHkoYm91bmRNZXRob2QsIGFyZ3VtZW50cyk7XG4gICAgICByZWJvdW5kTWV0aG9kLl9fcmVhY3RCb3VuZENvbnRleHQgPSBjb21wb25lbnQ7XG4gICAgICByZWJvdW5kTWV0aG9kLl9fcmVhY3RCb3VuZE1ldGhvZCA9IG1ldGhvZDtcbiAgICAgIHJlYm91bmRNZXRob2QuX19yZWFjdEJvdW5kQXJndW1lbnRzID0gYXJncztcbiAgICAgIHJldHVybiByZWJvdW5kTWV0aG9kO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGJvdW5kTWV0aG9kO1xufVxuXG4vKipcbiAqIEJpbmRzIGFsbCBhdXRvLWJvdW5kIG1ldGhvZHMgaW4gYSBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbXBvbmVudCBDb21wb25lbnQgd2hvc2UgbWV0aG9kIGlzIGdvaW5nIHRvIGJlIGJvdW5kLlxuICovXG5mdW5jdGlvbiBiaW5kQXV0b0JpbmRNZXRob2RzKGNvbXBvbmVudCkge1xuICB2YXIgcGFpcnMgPSBjb21wb25lbnQuX19yZWFjdEF1dG9CaW5kUGFpcnM7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcGFpcnMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICB2YXIgYXV0b0JpbmRLZXkgPSBwYWlyc1tpXTtcbiAgICB2YXIgbWV0aG9kID0gcGFpcnNbaSArIDFdO1xuICAgIGNvbXBvbmVudFthdXRvQmluZEtleV0gPSBiaW5kQXV0b0JpbmRNZXRob2QoY29tcG9uZW50LCBtZXRob2QpO1xuICB9XG59XG5cbi8qKlxuICogQWRkIG1vcmUgdG8gdGhlIFJlYWN0Q2xhc3MgYmFzZSBjbGFzcy4gVGhlc2UgYXJlIGFsbCBsZWdhY3kgZmVhdHVyZXMgYW5kXG4gKiB0aGVyZWZvcmUgbm90IGFscmVhZHkgcGFydCBvZiB0aGUgbW9kZXJuIFJlYWN0Q29tcG9uZW50LlxuICovXG52YXIgUmVhY3RDbGFzc01peGluID0ge1xuXG4gIC8qKlxuICAgKiBUT0RPOiBUaGlzIHdpbGwgYmUgZGVwcmVjYXRlZCBiZWNhdXNlIHN0YXRlIHNob3VsZCBhbHdheXMga2VlcCBhIGNvbnNpc3RlbnRcbiAgICogdHlwZSBzaWduYXR1cmUgYW5kIHRoZSBvbmx5IHVzZSBjYXNlIGZvciB0aGlzLCBpcyB0byBhdm9pZCB0aGF0LlxuICAgKi9cbiAgcmVwbGFjZVN0YXRlOiBmdW5jdGlvbiAobmV3U3RhdGUsIGNhbGxiYWNrKSB7XG4gICAgdGhpcy51cGRhdGVyLmVucXVldWVSZXBsYWNlU3RhdGUodGhpcywgbmV3U3RhdGUpO1xuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgdGhpcy51cGRhdGVyLmVucXVldWVDYWxsYmFjayh0aGlzLCBjYWxsYmFjaywgJ3JlcGxhY2VTdGF0ZScpO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogQ2hlY2tzIHdoZXRoZXIgb3Igbm90IHRoaXMgY29tcG9zaXRlIGNvbXBvbmVudCBpcyBtb3VudGVkLlxuICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIG1vdW50ZWQsIGZhbHNlIG90aGVyd2lzZS5cbiAgICogQHByb3RlY3RlZFxuICAgKiBAZmluYWxcbiAgICovXG4gIGlzTW91bnRlZDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnVwZGF0ZXIuaXNNb3VudGVkKHRoaXMpO1xuICB9XG59O1xuXG52YXIgUmVhY3RDbGFzc0NvbXBvbmVudCA9IGZ1bmN0aW9uICgpIHt9O1xuX2Fzc2lnbihSZWFjdENsYXNzQ29tcG9uZW50LnByb3RvdHlwZSwgUmVhY3RDb21wb25lbnQucHJvdG90eXBlLCBSZWFjdENsYXNzTWl4aW4pO1xuXG4vKipcbiAqIE1vZHVsZSBmb3IgY3JlYXRpbmcgY29tcG9zaXRlIGNvbXBvbmVudHMuXG4gKlxuICogQGNsYXNzIFJlYWN0Q2xhc3NcbiAqL1xudmFyIFJlYWN0Q2xhc3MgPSB7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBjb21wb3NpdGUgY29tcG9uZW50IGNsYXNzIGdpdmVuIGEgY2xhc3Mgc3BlY2lmaWNhdGlvbi5cbiAgICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvdG9wLWxldmVsLWFwaS5odG1sI3JlYWN0LmNyZWF0ZWNsYXNzXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBzcGVjIENsYXNzIHNwZWNpZmljYXRpb24gKHdoaWNoIG11c3QgZGVmaW5lIGByZW5kZXJgKS5cbiAgICogQHJldHVybiB7ZnVuY3Rpb259IENvbXBvbmVudCBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgY3JlYXRlQ2xhc3M6IGZ1bmN0aW9uIChzcGVjKSB7XG4gICAgdmFyIENvbnN0cnVjdG9yID0gZnVuY3Rpb24gKHByb3BzLCBjb250ZXh0LCB1cGRhdGVyKSB7XG4gICAgICAvLyBUaGlzIGNvbnN0cnVjdG9yIGdldHMgb3ZlcnJpZGRlbiBieSBtb2Nrcy4gVGhlIGFyZ3VtZW50IGlzIHVzZWRcbiAgICAgIC8vIGJ5IG1vY2tzIHRvIGFzc2VydCBvbiB3aGF0IGdldHMgbW91bnRlZC5cblxuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcodGhpcyBpbnN0YW5jZW9mIENvbnN0cnVjdG9yLCAnU29tZXRoaW5nIGlzIGNhbGxpbmcgYSBSZWFjdCBjb21wb25lbnQgZGlyZWN0bHkuIFVzZSBhIGZhY3Rvcnkgb3IgJyArICdKU1ggaW5zdGVhZC4gU2VlOiBodHRwczovL2ZiLm1lL3JlYWN0LWxlZ2FjeWZhY3RvcnknKSA6IHZvaWQgMDtcbiAgICAgIH1cblxuICAgICAgLy8gV2lyZSB1cCBhdXRvLWJpbmRpbmdcbiAgICAgIGlmICh0aGlzLl9fcmVhY3RBdXRvQmluZFBhaXJzLmxlbmd0aCkge1xuICAgICAgICBiaW5kQXV0b0JpbmRNZXRob2RzKHRoaXMpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgdGhpcy5yZWZzID0gZW1wdHlPYmplY3Q7XG4gICAgICB0aGlzLnVwZGF0ZXIgPSB1cGRhdGVyIHx8IFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlO1xuXG4gICAgICB0aGlzLnN0YXRlID0gbnVsbDtcblxuICAgICAgLy8gUmVhY3RDbGFzc2VzIGRvZXNuJ3QgaGF2ZSBjb25zdHJ1Y3RvcnMuIEluc3RlYWQsIHRoZXkgdXNlIHRoZVxuICAgICAgLy8gZ2V0SW5pdGlhbFN0YXRlIGFuZCBjb21wb25lbnRXaWxsTW91bnQgbWV0aG9kcyBmb3IgaW5pdGlhbGl6YXRpb24uXG5cbiAgICAgIHZhciBpbml0aWFsU3RhdGUgPSB0aGlzLmdldEluaXRpYWxTdGF0ZSA/IHRoaXMuZ2V0SW5pdGlhbFN0YXRlKCkgOiBudWxsO1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgLy8gV2UgYWxsb3cgYXV0by1tb2NrcyB0byBwcm9jZWVkIGFzIGlmIHRoZXkncmUgcmV0dXJuaW5nIG51bGwuXG4gICAgICAgIGlmIChpbml0aWFsU3RhdGUgPT09IHVuZGVmaW5lZCAmJiB0aGlzLmdldEluaXRpYWxTdGF0ZS5faXNNb2NrRnVuY3Rpb24pIHtcbiAgICAgICAgICAvLyBUaGlzIGlzIHByb2JhYmx5IGJhZCBwcmFjdGljZS4gQ29uc2lkZXIgd2FybmluZyBoZXJlIGFuZFxuICAgICAgICAgIC8vIGRlcHJlY2F0aW5nIHRoaXMgY29udmVuaWVuY2UuXG4gICAgICAgICAgaW5pdGlhbFN0YXRlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgISh0eXBlb2YgaW5pdGlhbFN0YXRlID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheShpbml0aWFsU3RhdGUpKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICclcy5nZXRJbml0aWFsU3RhdGUoKTogbXVzdCByZXR1cm4gYW4gb2JqZWN0IG9yIG51bGwnLCBDb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSB8fCAnUmVhY3RDb21wb3NpdGVDb21wb25lbnQnKSA6IF9wcm9kSW52YXJpYW50KCc4MicsIENvbnN0cnVjdG9yLmRpc3BsYXlOYW1lIHx8ICdSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCcpIDogdm9pZCAwO1xuXG4gICAgICB0aGlzLnN0YXRlID0gaW5pdGlhbFN0YXRlO1xuICAgIH07XG4gICAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gbmV3IFJlYWN0Q2xhc3NDb21wb25lbnQoKTtcbiAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDb25zdHJ1Y3RvcjtcbiAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUuX19yZWFjdEF1dG9CaW5kUGFpcnMgPSBbXTtcblxuICAgIGluamVjdGVkTWl4aW5zLmZvckVhY2gobWl4U3BlY0ludG9Db21wb25lbnQuYmluZChudWxsLCBDb25zdHJ1Y3RvcikpO1xuXG4gICAgbWl4U3BlY0ludG9Db21wb25lbnQoQ29uc3RydWN0b3IsIHNwZWMpO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSB0aGUgZGVmYXVsdFByb3BzIHByb3BlcnR5IGFmdGVyIGFsbCBtaXhpbnMgaGF2ZSBiZWVuIG1lcmdlZC5cbiAgICBpZiAoQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzKSB7XG4gICAgICBDb25zdHJ1Y3Rvci5kZWZhdWx0UHJvcHMgPSBDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMoKTtcbiAgICB9XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgLy8gVGhpcyBpcyBhIHRhZyB0byBpbmRpY2F0ZSB0aGF0IHRoZSB1c2Ugb2YgdGhlc2UgbWV0aG9kIG5hbWVzIGlzIG9rLFxuICAgICAgLy8gc2luY2UgaXQncyB1c2VkIHdpdGggY3JlYXRlQ2xhc3MuIElmIGl0J3Mgbm90LCB0aGVuIGl0J3MgbGlrZWx5IGFcbiAgICAgIC8vIG1pc3Rha2Ugc28gd2UnbGwgd2FybiB5b3UgdG8gdXNlIHRoZSBzdGF0aWMgcHJvcGVydHksIHByb3BlcnR5XG4gICAgICAvLyBpbml0aWFsaXplciBvciBjb25zdHJ1Y3RvciByZXNwZWN0aXZlbHkuXG4gICAgICBpZiAoQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzKSB7XG4gICAgICAgIENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcy5pc1JlYWN0Q2xhc3NBcHByb3ZlZCA9IHt9O1xuICAgICAgfVxuICAgICAgaWYgKENvbnN0cnVjdG9yLnByb3RvdHlwZS5nZXRJbml0aWFsU3RhdGUpIHtcbiAgICAgICAgQ29uc3RydWN0b3IucHJvdG90eXBlLmdldEluaXRpYWxTdGF0ZS5pc1JlYWN0Q2xhc3NBcHByb3ZlZCA9IHt9O1xuICAgICAgfVxuICAgIH1cblxuICAgICFDb25zdHJ1Y3Rvci5wcm90b3R5cGUucmVuZGVyID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ2NyZWF0ZUNsYXNzKC4uLik6IENsYXNzIHNwZWNpZmljYXRpb24gbXVzdCBpbXBsZW1lbnQgYSBgcmVuZGVyYCBtZXRob2QuJykgOiBfcHJvZEludmFyaWFudCgnODMnKSA6IHZvaWQgMDtcblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyghQ29uc3RydWN0b3IucHJvdG90eXBlLmNvbXBvbmVudFNob3VsZFVwZGF0ZSwgJyVzIGhhcyBhIG1ldGhvZCBjYWxsZWQgJyArICdjb21wb25lbnRTaG91bGRVcGRhdGUoKS4gRGlkIHlvdSBtZWFuIHNob3VsZENvbXBvbmVudFVwZGF0ZSgpPyAnICsgJ1RoZSBuYW1lIGlzIHBocmFzZWQgYXMgYSBxdWVzdGlvbiBiZWNhdXNlIHRoZSBmdW5jdGlvbiBpcyAnICsgJ2V4cGVjdGVkIHRvIHJldHVybiBhIHZhbHVlLicsIHNwZWMuZGlzcGxheU5hbWUgfHwgJ0EgY29tcG9uZW50JykgOiB2b2lkIDA7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyghQ29uc3RydWN0b3IucHJvdG90eXBlLmNvbXBvbmVudFdpbGxSZWNpZXZlUHJvcHMsICclcyBoYXMgYSBtZXRob2QgY2FsbGVkICcgKyAnY29tcG9uZW50V2lsbFJlY2lldmVQcm9wcygpLiBEaWQgeW91IG1lYW4gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcygpPycsIHNwZWMuZGlzcGxheU5hbWUgfHwgJ0EgY29tcG9uZW50JykgOiB2b2lkIDA7XG4gICAgfVxuXG4gICAgLy8gUmVkdWNlIHRpbWUgc3BlbnQgZG9pbmcgbG9va3VwcyBieSBzZXR0aW5nIHRoZXNlIG9uIHRoZSBwcm90b3R5cGUuXG4gICAgZm9yICh2YXIgbWV0aG9kTmFtZSBpbiBSZWFjdENsYXNzSW50ZXJmYWNlKSB7XG4gICAgICBpZiAoIUNvbnN0cnVjdG9yLnByb3RvdHlwZVttZXRob2ROYW1lXSkge1xuICAgICAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGVbbWV0aG9kTmFtZV0gPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfSxcblxuICBpbmplY3Rpb246IHtcbiAgICBpbmplY3RNaXhpbjogZnVuY3Rpb24gKG1peGluKSB7XG4gICAgICBpbmplY3RlZE1peGlucy5wdXNoKG1peGluKTtcbiAgICB9XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdENsYXNzOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdENvbXBvbmVudFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9wcm9kSW52YXJpYW50ID0gcmVxdWlyZSgnLi9yZWFjdFByb2RJbnZhcmlhbnQnKTtcblxudmFyIFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlID0gcmVxdWlyZSgnLi9SZWFjdE5vb3BVcGRhdGVRdWV1ZScpO1xuXG52YXIgY2FuRGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL2NhbkRlZmluZVByb3BlcnR5Jyk7XG52YXIgZW1wdHlPYmplY3QgPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eU9iamVjdCcpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbi8qKlxuICogQmFzZSBjbGFzcyBoZWxwZXJzIGZvciB0aGUgdXBkYXRpbmcgc3RhdGUgb2YgYSBjb21wb25lbnQuXG4gKi9cbmZ1bmN0aW9uIFJlYWN0Q29tcG9uZW50KHByb3BzLCBjb250ZXh0LCB1cGRhdGVyKSB7XG4gIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgdGhpcy5yZWZzID0gZW1wdHlPYmplY3Q7XG4gIC8vIFdlIGluaXRpYWxpemUgdGhlIGRlZmF1bHQgdXBkYXRlciBidXQgdGhlIHJlYWwgb25lIGdldHMgaW5qZWN0ZWQgYnkgdGhlXG4gIC8vIHJlbmRlcmVyLlxuICB0aGlzLnVwZGF0ZXIgPSB1cGRhdGVyIHx8IFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlO1xufVxuXG5SZWFjdENvbXBvbmVudC5wcm90b3R5cGUuaXNSZWFjdENvbXBvbmVudCA9IHt9O1xuXG4vKipcbiAqIFNldHMgYSBzdWJzZXQgb2YgdGhlIHN0YXRlLiBBbHdheXMgdXNlIHRoaXMgdG8gbXV0YXRlXG4gKiBzdGF0ZS4gWW91IHNob3VsZCB0cmVhdCBgdGhpcy5zdGF0ZWAgYXMgaW1tdXRhYmxlLlxuICpcbiAqIFRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IGB0aGlzLnN0YXRlYCB3aWxsIGJlIGltbWVkaWF0ZWx5IHVwZGF0ZWQsIHNvXG4gKiBhY2Nlc3NpbmcgYHRoaXMuc3RhdGVgIGFmdGVyIGNhbGxpbmcgdGhpcyBtZXRob2QgbWF5IHJldHVybiB0aGUgb2xkIHZhbHVlLlxuICpcbiAqIFRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IGNhbGxzIHRvIGBzZXRTdGF0ZWAgd2lsbCBydW4gc3luY2hyb25vdXNseSxcbiAqIGFzIHRoZXkgbWF5IGV2ZW50dWFsbHkgYmUgYmF0Y2hlZCB0b2dldGhlci4gIFlvdSBjYW4gcHJvdmlkZSBhbiBvcHRpb25hbFxuICogY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGV4ZWN1dGVkIHdoZW4gdGhlIGNhbGwgdG8gc2V0U3RhdGUgaXMgYWN0dWFsbHlcbiAqIGNvbXBsZXRlZC5cbiAqXG4gKiBXaGVuIGEgZnVuY3Rpb24gaXMgcHJvdmlkZWQgdG8gc2V0U3RhdGUsIGl0IHdpbGwgYmUgY2FsbGVkIGF0IHNvbWUgcG9pbnQgaW5cbiAqIHRoZSBmdXR1cmUgKG5vdCBzeW5jaHJvbm91c2x5KS4gSXQgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGUgdXAgdG8gZGF0ZVxuICogY29tcG9uZW50IGFyZ3VtZW50cyAoc3RhdGUsIHByb3BzLCBjb250ZXh0KS4gVGhlc2UgdmFsdWVzIGNhbiBiZSBkaWZmZXJlbnRcbiAqIGZyb20gdGhpcy4qIGJlY2F1c2UgeW91ciBmdW5jdGlvbiBtYXkgYmUgY2FsbGVkIGFmdGVyIHJlY2VpdmVQcm9wcyBidXQgYmVmb3JlXG4gKiBzaG91bGRDb21wb25lbnRVcGRhdGUsIGFuZCB0aGlzIG5ldyBzdGF0ZSwgcHJvcHMsIGFuZCBjb250ZXh0IHdpbGwgbm90IHlldCBiZVxuICogYXNzaWduZWQgdG8gdGhpcy5cbiAqXG4gKiBAcGFyYW0ge29iamVjdHxmdW5jdGlvbn0gcGFydGlhbFN0YXRlIE5leHQgcGFydGlhbCBzdGF0ZSBvciBmdW5jdGlvbiB0b1xuICogICAgICAgIHByb2R1Y2UgbmV4dCBwYXJ0aWFsIHN0YXRlIHRvIGJlIG1lcmdlZCB3aXRoIGN1cnJlbnQgc3RhdGUuXG4gKiBAcGFyYW0gez9mdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIHN0YXRlIGlzIHVwZGF0ZWQuXG4gKiBAZmluYWxcbiAqIEBwcm90ZWN0ZWRcbiAqL1xuUmVhY3RDb21wb25lbnQucHJvdG90eXBlLnNldFN0YXRlID0gZnVuY3Rpb24gKHBhcnRpYWxTdGF0ZSwgY2FsbGJhY2spIHtcbiAgISh0eXBlb2YgcGFydGlhbFN0YXRlID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgcGFydGlhbFN0YXRlID09PSAnZnVuY3Rpb24nIHx8IHBhcnRpYWxTdGF0ZSA9PSBudWxsKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdzZXRTdGF0ZSguLi4pOiB0YWtlcyBhbiBvYmplY3Qgb2Ygc3RhdGUgdmFyaWFibGVzIHRvIHVwZGF0ZSBvciBhIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYW4gb2JqZWN0IG9mIHN0YXRlIHZhcmlhYmxlcy4nKSA6IF9wcm9kSW52YXJpYW50KCc4NScpIDogdm9pZCAwO1xuICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZVNldFN0YXRlKHRoaXMsIHBhcnRpYWxTdGF0ZSk7XG4gIGlmIChjYWxsYmFjaykge1xuICAgIHRoaXMudXBkYXRlci5lbnF1ZXVlQ2FsbGJhY2sodGhpcywgY2FsbGJhY2ssICdzZXRTdGF0ZScpO1xuICB9XG59O1xuXG4vKipcbiAqIEZvcmNlcyBhbiB1cGRhdGUuIFRoaXMgc2hvdWxkIG9ubHkgYmUgaW52b2tlZCB3aGVuIGl0IGlzIGtub3duIHdpdGhcbiAqIGNlcnRhaW50eSB0aGF0IHdlIGFyZSAqKm5vdCoqIGluIGEgRE9NIHRyYW5zYWN0aW9uLlxuICpcbiAqIFlvdSBtYXkgd2FudCB0byBjYWxsIHRoaXMgd2hlbiB5b3Uga25vdyB0aGF0IHNvbWUgZGVlcGVyIGFzcGVjdCBvZiB0aGVcbiAqIGNvbXBvbmVudCdzIHN0YXRlIGhhcyBjaGFuZ2VkIGJ1dCBgc2V0U3RhdGVgIHdhcyBub3QgY2FsbGVkLlxuICpcbiAqIFRoaXMgd2lsbCBub3QgaW52b2tlIGBzaG91bGRDb21wb25lbnRVcGRhdGVgLCBidXQgaXQgd2lsbCBpbnZva2VcbiAqIGBjb21wb25lbnRXaWxsVXBkYXRlYCBhbmQgYGNvbXBvbmVudERpZFVwZGF0ZWAuXG4gKlxuICogQHBhcmFtIHs/ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxlZCBhZnRlciB1cGRhdGUgaXMgY29tcGxldGUuXG4gKiBAZmluYWxcbiAqIEBwcm90ZWN0ZWRcbiAqL1xuUmVhY3RDb21wb25lbnQucHJvdG90eXBlLmZvcmNlVXBkYXRlID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIHRoaXMudXBkYXRlci5lbnF1ZXVlRm9yY2VVcGRhdGUodGhpcyk7XG4gIGlmIChjYWxsYmFjaykge1xuICAgIHRoaXMudXBkYXRlci5lbnF1ZXVlQ2FsbGJhY2sodGhpcywgY2FsbGJhY2ssICdmb3JjZVVwZGF0ZScpO1xuICB9XG59O1xuXG4vKipcbiAqIERlcHJlY2F0ZWQgQVBJcy4gVGhlc2UgQVBJcyB1c2VkIHRvIGV4aXN0IG9uIGNsYXNzaWMgUmVhY3QgY2xhc3NlcyBidXQgc2luY2VcbiAqIHdlIHdvdWxkIGxpa2UgdG8gZGVwcmVjYXRlIHRoZW0sIHdlJ3JlIG5vdCBnb2luZyB0byBtb3ZlIHRoZW0gb3ZlciB0byB0aGlzXG4gKiBtb2Rlcm4gYmFzZSBjbGFzcy4gSW5zdGVhZCwgd2UgZGVmaW5lIGEgZ2V0dGVyIHRoYXQgd2FybnMgaWYgaXQncyBhY2Nlc3NlZC5cbiAqL1xuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIGRlcHJlY2F0ZWRBUElzID0ge1xuICAgIGlzTW91bnRlZDogWydpc01vdW50ZWQnLCAnSW5zdGVhZCwgbWFrZSBzdXJlIHRvIGNsZWFuIHVwIHN1YnNjcmlwdGlvbnMgYW5kIHBlbmRpbmcgcmVxdWVzdHMgaW4gJyArICdjb21wb25lbnRXaWxsVW5tb3VudCB0byBwcmV2ZW50IG1lbW9yeSBsZWFrcy4nXSxcbiAgICByZXBsYWNlU3RhdGU6IFsncmVwbGFjZVN0YXRlJywgJ1JlZmFjdG9yIHlvdXIgY29kZSB0byB1c2Ugc2V0U3RhdGUgaW5zdGVhZCAoc2VlICcgKyAnaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2lzc3Vlcy8zMjM2KS4nXVxuICB9O1xuICB2YXIgZGVmaW5lRGVwcmVjYXRpb25XYXJuaW5nID0gZnVuY3Rpb24gKG1ldGhvZE5hbWUsIGluZm8pIHtcbiAgICBpZiAoY2FuRGVmaW5lUHJvcGVydHkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWFjdENvbXBvbmVudC5wcm90b3R5cGUsIG1ldGhvZE5hbWUsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICclcyguLi4pIGlzIGRlcHJlY2F0ZWQgaW4gcGxhaW4gSmF2YVNjcmlwdCBSZWFjdCBjbGFzc2VzLiAlcycsIGluZm9bMF0sIGluZm9bMV0pIDogdm9pZCAwO1xuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbiAgZm9yICh2YXIgZm5OYW1lIGluIGRlcHJlY2F0ZWRBUElzKSB7XG4gICAgaWYgKGRlcHJlY2F0ZWRBUElzLmhhc093blByb3BlcnR5KGZuTmFtZSkpIHtcbiAgICAgIGRlZmluZURlcHJlY2F0aW9uV2FybmluZyhmbk5hbWUsIGRlcHJlY2F0ZWRBUElzW2ZuTmFtZV0pO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q29tcG9uZW50OyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTYtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdENvbXBvbmVudFRyZWVIb29rXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3Byb2RJbnZhcmlhbnQgPSByZXF1aXJlKCcuL3JlYWN0UHJvZEludmFyaWFudCcpO1xuXG52YXIgUmVhY3RDdXJyZW50T3duZXIgPSByZXF1aXJlKCcuL1JlYWN0Q3VycmVudE93bmVyJyk7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG5mdW5jdGlvbiBpc05hdGl2ZShmbikge1xuICAvLyBCYXNlZCBvbiBpc05hdGl2ZSgpIGZyb20gTG9kYXNoXG4gIHZhciBmdW5jVG9TdHJpbmcgPSBGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmc7XG4gIHZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG4gIHZhciByZUlzTmF0aXZlID0gUmVnRXhwKCdeJyArIGZ1bmNUb1N0cmluZ1xuICAvLyBUYWtlIGFuIGV4YW1wbGUgbmF0aXZlIGZ1bmN0aW9uIHNvdXJjZSBmb3IgY29tcGFyaXNvblxuICAuY2FsbChoYXNPd25Qcm9wZXJ0eSlcbiAgLy8gU3RyaXAgcmVnZXggY2hhcmFjdGVycyBzbyB3ZSBjYW4gdXNlIGl0IGZvciByZWdleFxuICAucmVwbGFjZSgvW1xcXFxeJC4qKz8oKVtcXF17fXxdL2csICdcXFxcJCYnKVxuICAvLyBSZW1vdmUgaGFzT3duUHJvcGVydHkgZnJvbSB0aGUgdGVtcGxhdGUgdG8gbWFrZSBpdCBnZW5lcmljXG4gIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJyk7XG4gIHRyeSB7XG4gICAgdmFyIHNvdXJjZSA9IGZ1bmNUb1N0cmluZy5jYWxsKGZuKTtcbiAgICByZXR1cm4gcmVJc05hdGl2ZS50ZXN0KHNvdXJjZSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG52YXIgY2FuVXNlQ29sbGVjdGlvbnMgPVxuLy8gQXJyYXkuZnJvbVxudHlwZW9mIEFycmF5LmZyb20gPT09ICdmdW5jdGlvbicgJiZcbi8vIE1hcFxudHlwZW9mIE1hcCA9PT0gJ2Z1bmN0aW9uJyAmJiBpc05hdGl2ZShNYXApICYmXG4vLyBNYXAucHJvdG90eXBlLmtleXNcbk1hcC5wcm90b3R5cGUgIT0gbnVsbCAmJiB0eXBlb2YgTWFwLnByb3RvdHlwZS5rZXlzID09PSAnZnVuY3Rpb24nICYmIGlzTmF0aXZlKE1hcC5wcm90b3R5cGUua2V5cykgJiZcbi8vIFNldFxudHlwZW9mIFNldCA9PT0gJ2Z1bmN0aW9uJyAmJiBpc05hdGl2ZShTZXQpICYmXG4vLyBTZXQucHJvdG90eXBlLmtleXNcblNldC5wcm90b3R5cGUgIT0gbnVsbCAmJiB0eXBlb2YgU2V0LnByb3RvdHlwZS5rZXlzID09PSAnZnVuY3Rpb24nICYmIGlzTmF0aXZlKFNldC5wcm90b3R5cGUua2V5cyk7XG5cbnZhciBpdGVtTWFwO1xudmFyIHJvb3RJRFNldDtcblxudmFyIGl0ZW1CeUtleTtcbnZhciByb290QnlLZXk7XG5cbmlmIChjYW5Vc2VDb2xsZWN0aW9ucykge1xuICBpdGVtTWFwID0gbmV3IE1hcCgpO1xuICByb290SURTZXQgPSBuZXcgU2V0KCk7XG59IGVsc2Uge1xuICBpdGVtQnlLZXkgPSB7fTtcbiAgcm9vdEJ5S2V5ID0ge307XG59XG5cbnZhciB1bm1vdW50ZWRJRHMgPSBbXTtcblxuLy8gVXNlIG5vbi1udW1lcmljIGtleXMgdG8gcHJldmVudCBWOCBwZXJmb3JtYW5jZSBpc3N1ZXM6XG4vLyBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvcHVsbC83MjMyXG5mdW5jdGlvbiBnZXRLZXlGcm9tSUQoaWQpIHtcbiAgcmV0dXJuICcuJyArIGlkO1xufVxuZnVuY3Rpb24gZ2V0SURGcm9tS2V5KGtleSkge1xuICByZXR1cm4gcGFyc2VJbnQoa2V5LnN1YnN0cigxKSwgMTApO1xufVxuXG5mdW5jdGlvbiBnZXQoaWQpIHtcbiAgaWYgKGNhblVzZUNvbGxlY3Rpb25zKSB7XG4gICAgcmV0dXJuIGl0ZW1NYXAuZ2V0KGlkKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIga2V5ID0gZ2V0S2V5RnJvbUlEKGlkKTtcbiAgICByZXR1cm4gaXRlbUJ5S2V5W2tleV07XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlKGlkKSB7XG4gIGlmIChjYW5Vc2VDb2xsZWN0aW9ucykge1xuICAgIGl0ZW1NYXBbJ2RlbGV0ZSddKGlkKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIga2V5ID0gZ2V0S2V5RnJvbUlEKGlkKTtcbiAgICBkZWxldGUgaXRlbUJ5S2V5W2tleV07XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlKGlkLCBlbGVtZW50LCBwYXJlbnRJRCkge1xuICB2YXIgaXRlbSA9IHtcbiAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgIHBhcmVudElEOiBwYXJlbnRJRCxcbiAgICB0ZXh0OiBudWxsLFxuICAgIGNoaWxkSURzOiBbXSxcbiAgICBpc01vdW50ZWQ6IGZhbHNlLFxuICAgIHVwZGF0ZUNvdW50OiAwXG4gIH07XG5cbiAgaWYgKGNhblVzZUNvbGxlY3Rpb25zKSB7XG4gICAgaXRlbU1hcC5zZXQoaWQsIGl0ZW0pO1xuICB9IGVsc2Uge1xuICAgIHZhciBrZXkgPSBnZXRLZXlGcm9tSUQoaWQpO1xuICAgIGl0ZW1CeUtleVtrZXldID0gaXRlbTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhZGRSb290KGlkKSB7XG4gIGlmIChjYW5Vc2VDb2xsZWN0aW9ucykge1xuICAgIHJvb3RJRFNldC5hZGQoaWQpO1xuICB9IGVsc2Uge1xuICAgIHZhciBrZXkgPSBnZXRLZXlGcm9tSUQoaWQpO1xuICAgIHJvb3RCeUtleVtrZXldID0gdHJ1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmVSb290KGlkKSB7XG4gIGlmIChjYW5Vc2VDb2xsZWN0aW9ucykge1xuICAgIHJvb3RJRFNldFsnZGVsZXRlJ10oaWQpO1xuICB9IGVsc2Uge1xuICAgIHZhciBrZXkgPSBnZXRLZXlGcm9tSUQoaWQpO1xuICAgIGRlbGV0ZSByb290QnlLZXlba2V5XTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRSZWdpc3RlcmVkSURzKCkge1xuICBpZiAoY2FuVXNlQ29sbGVjdGlvbnMpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShpdGVtTWFwLmtleXMoKSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGl0ZW1CeUtleSkubWFwKGdldElERnJvbUtleSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0Um9vdElEcygpIHtcbiAgaWYgKGNhblVzZUNvbGxlY3Rpb25zKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20ocm9vdElEU2V0LmtleXMoKSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHJvb3RCeUtleSkubWFwKGdldElERnJvbUtleSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcHVyZ2VEZWVwKGlkKSB7XG4gIHZhciBpdGVtID0gZ2V0KGlkKTtcbiAgaWYgKGl0ZW0pIHtcbiAgICB2YXIgY2hpbGRJRHMgPSBpdGVtLmNoaWxkSURzO1xuXG4gICAgcmVtb3ZlKGlkKTtcbiAgICBjaGlsZElEcy5mb3JFYWNoKHB1cmdlRGVlcCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZGVzY3JpYmVDb21wb25lbnRGcmFtZShuYW1lLCBzb3VyY2UsIG93bmVyTmFtZSkge1xuICByZXR1cm4gJ1xcbiAgICBpbiAnICsgbmFtZSArIChzb3VyY2UgPyAnIChhdCAnICsgc291cmNlLmZpbGVOYW1lLnJlcGxhY2UoL14uKltcXFxcXFwvXS8sICcnKSArICc6JyArIHNvdXJjZS5saW5lTnVtYmVyICsgJyknIDogb3duZXJOYW1lID8gJyAoY3JlYXRlZCBieSAnICsgb3duZXJOYW1lICsgJyknIDogJycpO1xufVxuXG5mdW5jdGlvbiBnZXREaXNwbGF5TmFtZShlbGVtZW50KSB7XG4gIGlmIChlbGVtZW50ID09IG51bGwpIHtcbiAgICByZXR1cm4gJyNlbXB0eSc7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBlbGVtZW50ID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiAnI3RleHQnO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBlbGVtZW50LnR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQudHlwZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZWxlbWVudC50eXBlLmRpc3BsYXlOYW1lIHx8IGVsZW1lbnQudHlwZS5uYW1lIHx8ICdVbmtub3duJztcbiAgfVxufVxuXG5mdW5jdGlvbiBkZXNjcmliZUlEKGlkKSB7XG4gIHZhciBuYW1lID0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXREaXNwbGF5TmFtZShpZCk7XG4gIHZhciBlbGVtZW50ID0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRFbGVtZW50KGlkKTtcbiAgdmFyIG93bmVySUQgPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldE93bmVySUQoaWQpO1xuICB2YXIgb3duZXJOYW1lO1xuICBpZiAob3duZXJJRCkge1xuICAgIG93bmVyTmFtZSA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2suZ2V0RGlzcGxheU5hbWUob3duZXJJRCk7XG4gIH1cbiAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZWxlbWVudCwgJ1JlYWN0Q29tcG9uZW50VHJlZUhvb2s6IE1pc3NpbmcgUmVhY3QgZWxlbWVudCBmb3IgZGVidWdJRCAlcyB3aGVuICcgKyAnYnVpbGRpbmcgc3RhY2snLCBpZCkgOiB2b2lkIDA7XG4gIHJldHVybiBkZXNjcmliZUNvbXBvbmVudEZyYW1lKG5hbWUsIGVsZW1lbnQgJiYgZWxlbWVudC5fc291cmNlLCBvd25lck5hbWUpO1xufVxuXG52YXIgUmVhY3RDb21wb25lbnRUcmVlSG9vayA9IHtcbiAgb25TZXRDaGlsZHJlbjogZnVuY3Rpb24gKGlkLCBuZXh0Q2hpbGRJRHMpIHtcbiAgICB2YXIgaXRlbSA9IGdldChpZCk7XG4gICAgaXRlbS5jaGlsZElEcyA9IG5leHRDaGlsZElEcztcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmV4dENoaWxkSURzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbmV4dENoaWxkSUQgPSBuZXh0Q2hpbGRJRHNbaV07XG4gICAgICB2YXIgbmV4dENoaWxkID0gZ2V0KG5leHRDaGlsZElEKTtcbiAgICAgICFuZXh0Q2hpbGQgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnRXhwZWN0ZWQgaG9vayBldmVudHMgdG8gZmlyZSBmb3IgdGhlIGNoaWxkIGJlZm9yZSBpdHMgcGFyZW50IGluY2x1ZGVzIGl0IGluIG9uU2V0Q2hpbGRyZW4oKS4nKSA6IF9wcm9kSW52YXJpYW50KCcxNDAnKSA6IHZvaWQgMDtcbiAgICAgICEobmV4dENoaWxkLmNoaWxkSURzICE9IG51bGwgfHwgdHlwZW9mIG5leHRDaGlsZC5lbGVtZW50ICE9PSAnb2JqZWN0JyB8fCBuZXh0Q2hpbGQuZWxlbWVudCA9PSBudWxsKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdFeHBlY3RlZCBvblNldENoaWxkcmVuKCkgdG8gZmlyZSBmb3IgYSBjb250YWluZXIgY2hpbGQgYmVmb3JlIGl0cyBwYXJlbnQgaW5jbHVkZXMgaXQgaW4gb25TZXRDaGlsZHJlbigpLicpIDogX3Byb2RJbnZhcmlhbnQoJzE0MScpIDogdm9pZCAwO1xuICAgICAgIW5leHRDaGlsZC5pc01vdW50ZWQgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnRXhwZWN0ZWQgb25Nb3VudENvbXBvbmVudCgpIHRvIGZpcmUgZm9yIHRoZSBjaGlsZCBiZWZvcmUgaXRzIHBhcmVudCBpbmNsdWRlcyBpdCBpbiBvblNldENoaWxkcmVuKCkuJykgOiBfcHJvZEludmFyaWFudCgnNzEnKSA6IHZvaWQgMDtcbiAgICAgIGlmIChuZXh0Q2hpbGQucGFyZW50SUQgPT0gbnVsbCkge1xuICAgICAgICBuZXh0Q2hpbGQucGFyZW50SUQgPSBpZDtcbiAgICAgICAgLy8gVE9ETzogVGhpcyBzaG91bGRuJ3QgYmUgbmVjZXNzYXJ5IGJ1dCBtb3VudGluZyBhIG5ldyByb290IGR1cmluZyBpblxuICAgICAgICAvLyBjb21wb25lbnRXaWxsTW91bnQgY3VycmVudGx5IGNhdXNlcyBub3QteWV0LW1vdW50ZWQgY29tcG9uZW50cyB0b1xuICAgICAgICAvLyBiZSBwdXJnZWQgZnJvbSBvdXIgdHJlZSBkYXRhIHNvIHRoZWlyIHBhcmVudCBJRCBpcyBtaXNzaW5nLlxuICAgICAgfVxuICAgICAgIShuZXh0Q2hpbGQucGFyZW50SUQgPT09IGlkKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdFeHBlY3RlZCBvbkJlZm9yZU1vdW50Q29tcG9uZW50KCkgcGFyZW50IGFuZCBvblNldENoaWxkcmVuKCkgdG8gYmUgY29uc2lzdGVudCAoJXMgaGFzIHBhcmVudHMgJXMgYW5kICVzKS4nLCBuZXh0Q2hpbGRJRCwgbmV4dENoaWxkLnBhcmVudElELCBpZCkgOiBfcHJvZEludmFyaWFudCgnMTQyJywgbmV4dENoaWxkSUQsIG5leHRDaGlsZC5wYXJlbnRJRCwgaWQpIDogdm9pZCAwO1xuICAgIH1cbiAgfSxcbiAgb25CZWZvcmVNb3VudENvbXBvbmVudDogZnVuY3Rpb24gKGlkLCBlbGVtZW50LCBwYXJlbnRJRCkge1xuICAgIGNyZWF0ZShpZCwgZWxlbWVudCwgcGFyZW50SUQpO1xuICB9LFxuICBvbkJlZm9yZVVwZGF0ZUNvbXBvbmVudDogZnVuY3Rpb24gKGlkLCBlbGVtZW50KSB7XG4gICAgdmFyIGl0ZW0gPSBnZXQoaWQpO1xuICAgIGlmICghaXRlbSB8fCAhaXRlbS5pc01vdW50ZWQpIHtcbiAgICAgIC8vIFdlIG1heSBlbmQgdXAgaGVyZSBhcyBhIHJlc3VsdCBvZiBzZXRTdGF0ZSgpIGluIGNvbXBvbmVudFdpbGxVbm1vdW50KCkuXG4gICAgICAvLyBJbiB0aGlzIGNhc2UsIGlnbm9yZSB0aGUgZWxlbWVudC5cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaXRlbS5lbGVtZW50ID0gZWxlbWVudDtcbiAgfSxcbiAgb25Nb3VudENvbXBvbmVudDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGl0ZW0gPSBnZXQoaWQpO1xuICAgIGl0ZW0uaXNNb3VudGVkID0gdHJ1ZTtcbiAgICB2YXIgaXNSb290ID0gaXRlbS5wYXJlbnRJRCA9PT0gMDtcbiAgICBpZiAoaXNSb290KSB7XG4gICAgICBhZGRSb290KGlkKTtcbiAgICB9XG4gIH0sXG4gIG9uVXBkYXRlQ29tcG9uZW50OiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgaXRlbSA9IGdldChpZCk7XG4gICAgaWYgKCFpdGVtIHx8ICFpdGVtLmlzTW91bnRlZCkge1xuICAgICAgLy8gV2UgbWF5IGVuZCB1cCBoZXJlIGFzIGEgcmVzdWx0IG9mIHNldFN0YXRlKCkgaW4gY29tcG9uZW50V2lsbFVubW91bnQoKS5cbiAgICAgIC8vIEluIHRoaXMgY2FzZSwgaWdub3JlIHRoZSBlbGVtZW50LlxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpdGVtLnVwZGF0ZUNvdW50Kys7XG4gIH0sXG4gIG9uVW5tb3VudENvbXBvbmVudDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGl0ZW0gPSBnZXQoaWQpO1xuICAgIGlmIChpdGVtKSB7XG4gICAgICAvLyBXZSBuZWVkIHRvIGNoZWNrIGlmIGl0IGV4aXN0cy5cbiAgICAgIC8vIGBpdGVtYCBtaWdodCBub3QgZXhpc3QgaWYgaXQgaXMgaW5zaWRlIGFuIGVycm9yIGJvdW5kYXJ5LCBhbmQgYSBzaWJsaW5nXG4gICAgICAvLyBlcnJvciBib3VuZGFyeSBjaGlsZCB0aHJldyB3aGlsZSBtb3VudGluZy4gVGhlbiB0aGlzIGluc3RhbmNlIG5ldmVyXG4gICAgICAvLyBnb3QgYSBjaGFuY2UgdG8gbW91bnQsIGJ1dCBpdCBzdGlsbCBnZXRzIGFuIHVubW91bnRpbmcgZXZlbnQgZHVyaW5nXG4gICAgICAvLyB0aGUgZXJyb3IgYm91bmRhcnkgY2xlYW51cC5cbiAgICAgIGl0ZW0uaXNNb3VudGVkID0gZmFsc2U7XG4gICAgICB2YXIgaXNSb290ID0gaXRlbS5wYXJlbnRJRCA9PT0gMDtcbiAgICAgIGlmIChpc1Jvb3QpIHtcbiAgICAgICAgcmVtb3ZlUm9vdChpZCk7XG4gICAgICB9XG4gICAgfVxuICAgIHVubW91bnRlZElEcy5wdXNoKGlkKTtcbiAgfSxcbiAgcHVyZ2VVbm1vdW50ZWRDb21wb25lbnRzOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKFJlYWN0Q29tcG9uZW50VHJlZUhvb2suX3ByZXZlbnRQdXJnaW5nKSB7XG4gICAgICAvLyBTaG91bGQgb25seSBiZSB1c2VkIGZvciB0ZXN0aW5nLlxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdW5tb3VudGVkSURzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWQgPSB1bm1vdW50ZWRJRHNbaV07XG4gICAgICBwdXJnZURlZXAoaWQpO1xuICAgIH1cbiAgICB1bm1vdW50ZWRJRHMubGVuZ3RoID0gMDtcbiAgfSxcbiAgaXNNb3VudGVkOiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgaXRlbSA9IGdldChpZCk7XG4gICAgcmV0dXJuIGl0ZW0gPyBpdGVtLmlzTW91bnRlZCA6IGZhbHNlO1xuICB9LFxuICBnZXRDdXJyZW50U3RhY2tBZGRlbmR1bTogZnVuY3Rpb24gKHRvcEVsZW1lbnQpIHtcbiAgICB2YXIgaW5mbyA9ICcnO1xuICAgIGlmICh0b3BFbGVtZW50KSB7XG4gICAgICB2YXIgdHlwZSA9IHRvcEVsZW1lbnQudHlwZTtcbiAgICAgIHZhciBuYW1lID0gdHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicgPyB0eXBlLmRpc3BsYXlOYW1lIHx8IHR5cGUubmFtZSA6IHR5cGU7XG4gICAgICB2YXIgb3duZXIgPSB0b3BFbGVtZW50Ll9vd25lcjtcbiAgICAgIGluZm8gKz0gZGVzY3JpYmVDb21wb25lbnRGcmFtZShuYW1lIHx8ICdVbmtub3duJywgdG9wRWxlbWVudC5fc291cmNlLCBvd25lciAmJiBvd25lci5nZXROYW1lKCkpO1xuICAgIH1cblxuICAgIHZhciBjdXJyZW50T3duZXIgPSBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50O1xuICAgIHZhciBpZCA9IGN1cnJlbnRPd25lciAmJiBjdXJyZW50T3duZXIuX2RlYnVnSUQ7XG5cbiAgICBpbmZvICs9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2suZ2V0U3RhY2tBZGRlbmR1bUJ5SUQoaWQpO1xuICAgIHJldHVybiBpbmZvO1xuICB9LFxuICBnZXRTdGFja0FkZGVuZHVtQnlJRDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGluZm8gPSAnJztcbiAgICB3aGlsZSAoaWQpIHtcbiAgICAgIGluZm8gKz0gZGVzY3JpYmVJRChpZCk7XG4gICAgICBpZCA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2suZ2V0UGFyZW50SUQoaWQpO1xuICAgIH1cbiAgICByZXR1cm4gaW5mbztcbiAgfSxcbiAgZ2V0Q2hpbGRJRHM6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBpdGVtID0gZ2V0KGlkKTtcbiAgICByZXR1cm4gaXRlbSA/IGl0ZW0uY2hpbGRJRHMgOiBbXTtcbiAgfSxcbiAgZ2V0RGlzcGxheU5hbWU6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBlbGVtZW50ID0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRFbGVtZW50KGlkKTtcbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gZ2V0RGlzcGxheU5hbWUoZWxlbWVudCk7XG4gIH0sXG4gIGdldEVsZW1lbnQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBpdGVtID0gZ2V0KGlkKTtcbiAgICByZXR1cm4gaXRlbSA/IGl0ZW0uZWxlbWVudCA6IG51bGw7XG4gIH0sXG4gIGdldE93bmVySUQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBlbGVtZW50ID0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRFbGVtZW50KGlkKTtcbiAgICBpZiAoIWVsZW1lbnQgfHwgIWVsZW1lbnQuX293bmVyKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnQuX293bmVyLl9kZWJ1Z0lEO1xuICB9LFxuICBnZXRQYXJlbnRJRDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGl0ZW0gPSBnZXQoaWQpO1xuICAgIHJldHVybiBpdGVtID8gaXRlbS5wYXJlbnRJRCA6IG51bGw7XG4gIH0sXG4gIGdldFNvdXJjZTogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGl0ZW0gPSBnZXQoaWQpO1xuICAgIHZhciBlbGVtZW50ID0gaXRlbSA/IGl0ZW0uZWxlbWVudCA6IG51bGw7XG4gICAgdmFyIHNvdXJjZSA9IGVsZW1lbnQgIT0gbnVsbCA/IGVsZW1lbnQuX3NvdXJjZSA6IG51bGw7XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfSxcbiAgZ2V0VGV4dDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldEVsZW1lbnQoaWQpO1xuICAgIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gJycgKyBlbGVtZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH0sXG4gIGdldFVwZGF0ZUNvdW50OiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgaXRlbSA9IGdldChpZCk7XG4gICAgcmV0dXJuIGl0ZW0gPyBpdGVtLnVwZGF0ZUNvdW50IDogMDtcbiAgfSxcblxuXG4gIGdldFJlZ2lzdGVyZWRJRHM6IGdldFJlZ2lzdGVyZWRJRHMsXG5cbiAgZ2V0Um9vdElEczogZ2V0Um9vdElEc1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdENvbXBvbmVudFRyZWVIb29rOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdEN1cnJlbnRPd25lclxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBLZWVwcyB0cmFjayBvZiB0aGUgY3VycmVudCBvd25lci5cbiAqXG4gKiBUaGUgY3VycmVudCBvd25lciBpcyB0aGUgY29tcG9uZW50IHdobyBzaG91bGQgb3duIGFueSBjb21wb25lbnRzIHRoYXQgYXJlXG4gKiBjdXJyZW50bHkgYmVpbmcgY29uc3RydWN0ZWQuXG4gKi9cblxudmFyIFJlYWN0Q3VycmVudE93bmVyID0ge1xuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICogQHR5cGUge1JlYWN0Q29tcG9uZW50fVxuICAgKi9cbiAgY3VycmVudDogbnVsbFxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q3VycmVudE93bmVyOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdERPTUZhY3Rvcmllc1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG5cbi8qKlxuICogQ3JlYXRlIGEgZmFjdG9yeSB0aGF0IGNyZWF0ZXMgSFRNTCB0YWcgZWxlbWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqL1xudmFyIGNyZWF0ZURPTUZhY3RvcnkgPSBSZWFjdEVsZW1lbnQuY3JlYXRlRmFjdG9yeTtcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBSZWFjdEVsZW1lbnRWYWxpZGF0b3IgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudFZhbGlkYXRvcicpO1xuICBjcmVhdGVET01GYWN0b3J5ID0gUmVhY3RFbGVtZW50VmFsaWRhdG9yLmNyZWF0ZUZhY3Rvcnk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG1hcHBpbmcgZnJvbSBzdXBwb3J0ZWQgSFRNTCB0YWdzIHRvIGBSZWFjdERPTUNvbXBvbmVudGAgY2xhc3Nlcy5cbiAqIFRoaXMgaXMgYWxzbyBhY2Nlc3NpYmxlIHZpYSBgUmVhY3QuRE9NYC5cbiAqXG4gKiBAcHVibGljXG4gKi9cbnZhciBSZWFjdERPTUZhY3RvcmllcyA9IHtcbiAgYTogY3JlYXRlRE9NRmFjdG9yeSgnYScpLFxuICBhYmJyOiBjcmVhdGVET01GYWN0b3J5KCdhYmJyJyksXG4gIGFkZHJlc3M6IGNyZWF0ZURPTUZhY3RvcnkoJ2FkZHJlc3MnKSxcbiAgYXJlYTogY3JlYXRlRE9NRmFjdG9yeSgnYXJlYScpLFxuICBhcnRpY2xlOiBjcmVhdGVET01GYWN0b3J5KCdhcnRpY2xlJyksXG4gIGFzaWRlOiBjcmVhdGVET01GYWN0b3J5KCdhc2lkZScpLFxuICBhdWRpbzogY3JlYXRlRE9NRmFjdG9yeSgnYXVkaW8nKSxcbiAgYjogY3JlYXRlRE9NRmFjdG9yeSgnYicpLFxuICBiYXNlOiBjcmVhdGVET01GYWN0b3J5KCdiYXNlJyksXG4gIGJkaTogY3JlYXRlRE9NRmFjdG9yeSgnYmRpJyksXG4gIGJkbzogY3JlYXRlRE9NRmFjdG9yeSgnYmRvJyksXG4gIGJpZzogY3JlYXRlRE9NRmFjdG9yeSgnYmlnJyksXG4gIGJsb2NrcXVvdGU6IGNyZWF0ZURPTUZhY3RvcnkoJ2Jsb2NrcXVvdGUnKSxcbiAgYm9keTogY3JlYXRlRE9NRmFjdG9yeSgnYm9keScpLFxuICBicjogY3JlYXRlRE9NRmFjdG9yeSgnYnInKSxcbiAgYnV0dG9uOiBjcmVhdGVET01GYWN0b3J5KCdidXR0b24nKSxcbiAgY2FudmFzOiBjcmVhdGVET01GYWN0b3J5KCdjYW52YXMnKSxcbiAgY2FwdGlvbjogY3JlYXRlRE9NRmFjdG9yeSgnY2FwdGlvbicpLFxuICBjaXRlOiBjcmVhdGVET01GYWN0b3J5KCdjaXRlJyksXG4gIGNvZGU6IGNyZWF0ZURPTUZhY3RvcnkoJ2NvZGUnKSxcbiAgY29sOiBjcmVhdGVET01GYWN0b3J5KCdjb2wnKSxcbiAgY29sZ3JvdXA6IGNyZWF0ZURPTUZhY3RvcnkoJ2NvbGdyb3VwJyksXG4gIGRhdGE6IGNyZWF0ZURPTUZhY3RvcnkoJ2RhdGEnKSxcbiAgZGF0YWxpc3Q6IGNyZWF0ZURPTUZhY3RvcnkoJ2RhdGFsaXN0JyksXG4gIGRkOiBjcmVhdGVET01GYWN0b3J5KCdkZCcpLFxuICBkZWw6IGNyZWF0ZURPTUZhY3RvcnkoJ2RlbCcpLFxuICBkZXRhaWxzOiBjcmVhdGVET01GYWN0b3J5KCdkZXRhaWxzJyksXG4gIGRmbjogY3JlYXRlRE9NRmFjdG9yeSgnZGZuJyksXG4gIGRpYWxvZzogY3JlYXRlRE9NRmFjdG9yeSgnZGlhbG9nJyksXG4gIGRpdjogY3JlYXRlRE9NRmFjdG9yeSgnZGl2JyksXG4gIGRsOiBjcmVhdGVET01GYWN0b3J5KCdkbCcpLFxuICBkdDogY3JlYXRlRE9NRmFjdG9yeSgnZHQnKSxcbiAgZW06IGNyZWF0ZURPTUZhY3RvcnkoJ2VtJyksXG4gIGVtYmVkOiBjcmVhdGVET01GYWN0b3J5KCdlbWJlZCcpLFxuICBmaWVsZHNldDogY3JlYXRlRE9NRmFjdG9yeSgnZmllbGRzZXQnKSxcbiAgZmlnY2FwdGlvbjogY3JlYXRlRE9NRmFjdG9yeSgnZmlnY2FwdGlvbicpLFxuICBmaWd1cmU6IGNyZWF0ZURPTUZhY3RvcnkoJ2ZpZ3VyZScpLFxuICBmb290ZXI6IGNyZWF0ZURPTUZhY3RvcnkoJ2Zvb3RlcicpLFxuICBmb3JtOiBjcmVhdGVET01GYWN0b3J5KCdmb3JtJyksXG4gIGgxOiBjcmVhdGVET01GYWN0b3J5KCdoMScpLFxuICBoMjogY3JlYXRlRE9NRmFjdG9yeSgnaDInKSxcbiAgaDM6IGNyZWF0ZURPTUZhY3RvcnkoJ2gzJyksXG4gIGg0OiBjcmVhdGVET01GYWN0b3J5KCdoNCcpLFxuICBoNTogY3JlYXRlRE9NRmFjdG9yeSgnaDUnKSxcbiAgaDY6IGNyZWF0ZURPTUZhY3RvcnkoJ2g2JyksXG4gIGhlYWQ6IGNyZWF0ZURPTUZhY3RvcnkoJ2hlYWQnKSxcbiAgaGVhZGVyOiBjcmVhdGVET01GYWN0b3J5KCdoZWFkZXInKSxcbiAgaGdyb3VwOiBjcmVhdGVET01GYWN0b3J5KCdoZ3JvdXAnKSxcbiAgaHI6IGNyZWF0ZURPTUZhY3RvcnkoJ2hyJyksXG4gIGh0bWw6IGNyZWF0ZURPTUZhY3RvcnkoJ2h0bWwnKSxcbiAgaTogY3JlYXRlRE9NRmFjdG9yeSgnaScpLFxuICBpZnJhbWU6IGNyZWF0ZURPTUZhY3RvcnkoJ2lmcmFtZScpLFxuICBpbWc6IGNyZWF0ZURPTUZhY3RvcnkoJ2ltZycpLFxuICBpbnB1dDogY3JlYXRlRE9NRmFjdG9yeSgnaW5wdXQnKSxcbiAgaW5zOiBjcmVhdGVET01GYWN0b3J5KCdpbnMnKSxcbiAga2JkOiBjcmVhdGVET01GYWN0b3J5KCdrYmQnKSxcbiAga2V5Z2VuOiBjcmVhdGVET01GYWN0b3J5KCdrZXlnZW4nKSxcbiAgbGFiZWw6IGNyZWF0ZURPTUZhY3RvcnkoJ2xhYmVsJyksXG4gIGxlZ2VuZDogY3JlYXRlRE9NRmFjdG9yeSgnbGVnZW5kJyksXG4gIGxpOiBjcmVhdGVET01GYWN0b3J5KCdsaScpLFxuICBsaW5rOiBjcmVhdGVET01GYWN0b3J5KCdsaW5rJyksXG4gIG1haW46IGNyZWF0ZURPTUZhY3RvcnkoJ21haW4nKSxcbiAgbWFwOiBjcmVhdGVET01GYWN0b3J5KCdtYXAnKSxcbiAgbWFyazogY3JlYXRlRE9NRmFjdG9yeSgnbWFyaycpLFxuICBtZW51OiBjcmVhdGVET01GYWN0b3J5KCdtZW51JyksXG4gIG1lbnVpdGVtOiBjcmVhdGVET01GYWN0b3J5KCdtZW51aXRlbScpLFxuICBtZXRhOiBjcmVhdGVET01GYWN0b3J5KCdtZXRhJyksXG4gIG1ldGVyOiBjcmVhdGVET01GYWN0b3J5KCdtZXRlcicpLFxuICBuYXY6IGNyZWF0ZURPTUZhY3RvcnkoJ25hdicpLFxuICBub3NjcmlwdDogY3JlYXRlRE9NRmFjdG9yeSgnbm9zY3JpcHQnKSxcbiAgb2JqZWN0OiBjcmVhdGVET01GYWN0b3J5KCdvYmplY3QnKSxcbiAgb2w6IGNyZWF0ZURPTUZhY3RvcnkoJ29sJyksXG4gIG9wdGdyb3VwOiBjcmVhdGVET01GYWN0b3J5KCdvcHRncm91cCcpLFxuICBvcHRpb246IGNyZWF0ZURPTUZhY3RvcnkoJ29wdGlvbicpLFxuICBvdXRwdXQ6IGNyZWF0ZURPTUZhY3RvcnkoJ291dHB1dCcpLFxuICBwOiBjcmVhdGVET01GYWN0b3J5KCdwJyksXG4gIHBhcmFtOiBjcmVhdGVET01GYWN0b3J5KCdwYXJhbScpLFxuICBwaWN0dXJlOiBjcmVhdGVET01GYWN0b3J5KCdwaWN0dXJlJyksXG4gIHByZTogY3JlYXRlRE9NRmFjdG9yeSgncHJlJyksXG4gIHByb2dyZXNzOiBjcmVhdGVET01GYWN0b3J5KCdwcm9ncmVzcycpLFxuICBxOiBjcmVhdGVET01GYWN0b3J5KCdxJyksXG4gIHJwOiBjcmVhdGVET01GYWN0b3J5KCdycCcpLFxuICBydDogY3JlYXRlRE9NRmFjdG9yeSgncnQnKSxcbiAgcnVieTogY3JlYXRlRE9NRmFjdG9yeSgncnVieScpLFxuICBzOiBjcmVhdGVET01GYWN0b3J5KCdzJyksXG4gIHNhbXA6IGNyZWF0ZURPTUZhY3RvcnkoJ3NhbXAnKSxcbiAgc2NyaXB0OiBjcmVhdGVET01GYWN0b3J5KCdzY3JpcHQnKSxcbiAgc2VjdGlvbjogY3JlYXRlRE9NRmFjdG9yeSgnc2VjdGlvbicpLFxuICBzZWxlY3Q6IGNyZWF0ZURPTUZhY3RvcnkoJ3NlbGVjdCcpLFxuICBzbWFsbDogY3JlYXRlRE9NRmFjdG9yeSgnc21hbGwnKSxcbiAgc291cmNlOiBjcmVhdGVET01GYWN0b3J5KCdzb3VyY2UnKSxcbiAgc3BhbjogY3JlYXRlRE9NRmFjdG9yeSgnc3BhbicpLFxuICBzdHJvbmc6IGNyZWF0ZURPTUZhY3RvcnkoJ3N0cm9uZycpLFxuICBzdHlsZTogY3JlYXRlRE9NRmFjdG9yeSgnc3R5bGUnKSxcbiAgc3ViOiBjcmVhdGVET01GYWN0b3J5KCdzdWInKSxcbiAgc3VtbWFyeTogY3JlYXRlRE9NRmFjdG9yeSgnc3VtbWFyeScpLFxuICBzdXA6IGNyZWF0ZURPTUZhY3RvcnkoJ3N1cCcpLFxuICB0YWJsZTogY3JlYXRlRE9NRmFjdG9yeSgndGFibGUnKSxcbiAgdGJvZHk6IGNyZWF0ZURPTUZhY3RvcnkoJ3Rib2R5JyksXG4gIHRkOiBjcmVhdGVET01GYWN0b3J5KCd0ZCcpLFxuICB0ZXh0YXJlYTogY3JlYXRlRE9NRmFjdG9yeSgndGV4dGFyZWEnKSxcbiAgdGZvb3Q6IGNyZWF0ZURPTUZhY3RvcnkoJ3Rmb290JyksXG4gIHRoOiBjcmVhdGVET01GYWN0b3J5KCd0aCcpLFxuICB0aGVhZDogY3JlYXRlRE9NRmFjdG9yeSgndGhlYWQnKSxcbiAgdGltZTogY3JlYXRlRE9NRmFjdG9yeSgndGltZScpLFxuICB0aXRsZTogY3JlYXRlRE9NRmFjdG9yeSgndGl0bGUnKSxcbiAgdHI6IGNyZWF0ZURPTUZhY3RvcnkoJ3RyJyksXG4gIHRyYWNrOiBjcmVhdGVET01GYWN0b3J5KCd0cmFjaycpLFxuICB1OiBjcmVhdGVET01GYWN0b3J5KCd1JyksXG4gIHVsOiBjcmVhdGVET01GYWN0b3J5KCd1bCcpLFxuICAndmFyJzogY3JlYXRlRE9NRmFjdG9yeSgndmFyJyksXG4gIHZpZGVvOiBjcmVhdGVET01GYWN0b3J5KCd2aWRlbycpLFxuICB3YnI6IGNyZWF0ZURPTUZhY3RvcnkoJ3dicicpLFxuXG4gIC8vIFNWR1xuICBjaXJjbGU6IGNyZWF0ZURPTUZhY3RvcnkoJ2NpcmNsZScpLFxuICBjbGlwUGF0aDogY3JlYXRlRE9NRmFjdG9yeSgnY2xpcFBhdGgnKSxcbiAgZGVmczogY3JlYXRlRE9NRmFjdG9yeSgnZGVmcycpLFxuICBlbGxpcHNlOiBjcmVhdGVET01GYWN0b3J5KCdlbGxpcHNlJyksXG4gIGc6IGNyZWF0ZURPTUZhY3RvcnkoJ2cnKSxcbiAgaW1hZ2U6IGNyZWF0ZURPTUZhY3RvcnkoJ2ltYWdlJyksXG4gIGxpbmU6IGNyZWF0ZURPTUZhY3RvcnkoJ2xpbmUnKSxcbiAgbGluZWFyR3JhZGllbnQ6IGNyZWF0ZURPTUZhY3RvcnkoJ2xpbmVhckdyYWRpZW50JyksXG4gIG1hc2s6IGNyZWF0ZURPTUZhY3RvcnkoJ21hc2snKSxcbiAgcGF0aDogY3JlYXRlRE9NRmFjdG9yeSgncGF0aCcpLFxuICBwYXR0ZXJuOiBjcmVhdGVET01GYWN0b3J5KCdwYXR0ZXJuJyksXG4gIHBvbHlnb246IGNyZWF0ZURPTUZhY3RvcnkoJ3BvbHlnb24nKSxcbiAgcG9seWxpbmU6IGNyZWF0ZURPTUZhY3RvcnkoJ3BvbHlsaW5lJyksXG4gIHJhZGlhbEdyYWRpZW50OiBjcmVhdGVET01GYWN0b3J5KCdyYWRpYWxHcmFkaWVudCcpLFxuICByZWN0OiBjcmVhdGVET01GYWN0b3J5KCdyZWN0JyksXG4gIHN0b3A6IGNyZWF0ZURPTUZhY3RvcnkoJ3N0b3AnKSxcbiAgc3ZnOiBjcmVhdGVET01GYWN0b3J5KCdzdmcnKSxcbiAgdGV4dDogY3JlYXRlRE9NRmFjdG9yeSgndGV4dCcpLFxuICB0c3BhbjogY3JlYXRlRE9NRmFjdG9yeSgndHNwYW4nKVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdERPTUZhY3RvcmllczsiLCIvKipcbiAqIENvcHlyaWdodCAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RFbGVtZW50XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIFJlYWN0Q3VycmVudE93bmVyID0gcmVxdWlyZSgnLi9SZWFjdEN1cnJlbnRPd25lcicpO1xuXG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcbnZhciBjYW5EZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vY2FuRGVmaW5lUHJvcGVydHknKTtcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbi8vIFRoZSBTeW1ib2wgdXNlZCB0byB0YWcgdGhlIFJlYWN0RWxlbWVudCB0eXBlLiBJZiB0aGVyZSBpcyBubyBuYXRpdmUgU3ltYm9sXG4vLyBub3IgcG9seWZpbGwsIHRoZW4gYSBwbGFpbiBudW1iZXIgaXMgdXNlZCBmb3IgcGVyZm9ybWFuY2UuXG52YXIgUkVBQ1RfRUxFTUVOVF9UWVBFID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2xbJ2ZvciddICYmIFN5bWJvbFsnZm9yJ10oJ3JlYWN0LmVsZW1lbnQnKSB8fCAweGVhYzc7XG5cbnZhciBSRVNFUlZFRF9QUk9QUyA9IHtcbiAga2V5OiB0cnVlLFxuICByZWY6IHRydWUsXG4gIF9fc2VsZjogdHJ1ZSxcbiAgX19zb3VyY2U6IHRydWVcbn07XG5cbnZhciBzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93biwgc3BlY2lhbFByb3BSZWZXYXJuaW5nU2hvd247XG5cbmZ1bmN0aW9uIGhhc1ZhbGlkUmVmKGNvbmZpZykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbmZpZywgJ3JlZicpKSB7XG4gICAgICB2YXIgZ2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihjb25maWcsICdyZWYnKS5nZXQ7XG4gICAgICBpZiAoZ2V0dGVyICYmIGdldHRlci5pc1JlYWN0V2FybmluZykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBjb25maWcucmVmICE9PSB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGhhc1ZhbGlkS2V5KGNvbmZpZykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbmZpZywgJ2tleScpKSB7XG4gICAgICB2YXIgZ2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihjb25maWcsICdrZXknKS5nZXQ7XG4gICAgICBpZiAoZ2V0dGVyICYmIGdldHRlci5pc1JlYWN0V2FybmluZykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBjb25maWcua2V5ICE9PSB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGRlZmluZUtleVByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSkge1xuICB2YXIgd2FybkFib3V0QWNjZXNzaW5nS2V5ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghc3BlY2lhbFByb3BLZXlXYXJuaW5nU2hvd24pIHtcbiAgICAgIHNwZWNpYWxQcm9wS2V5V2FybmluZ1Nob3duID0gdHJ1ZTtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnJXM6IGBrZXlgIGlzIG5vdCBhIHByb3AuIFRyeWluZyB0byBhY2Nlc3MgaXQgd2lsbCByZXN1bHQgJyArICdpbiBgdW5kZWZpbmVkYCBiZWluZyByZXR1cm5lZC4gSWYgeW91IG5lZWQgdG8gYWNjZXNzIHRoZSBzYW1lICcgKyAndmFsdWUgd2l0aGluIHRoZSBjaGlsZCBjb21wb25lbnQsIHlvdSBzaG91bGQgcGFzcyBpdCBhcyBhIGRpZmZlcmVudCAnICsgJ3Byb3AuIChodHRwczovL2ZiLm1lL3JlYWN0LXNwZWNpYWwtcHJvcHMpJywgZGlzcGxheU5hbWUpIDogdm9pZCAwO1xuICAgIH1cbiAgfTtcbiAgd2FybkFib3V0QWNjZXNzaW5nS2V5LmlzUmVhY3RXYXJuaW5nID0gdHJ1ZTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3BzLCAna2V5Jywge1xuICAgIGdldDogd2FybkFib3V0QWNjZXNzaW5nS2V5LFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbn1cblxuZnVuY3Rpb24gZGVmaW5lUmVmUHJvcFdhcm5pbmdHZXR0ZXIocHJvcHMsIGRpc3BsYXlOYW1lKSB7XG4gIHZhciB3YXJuQWJvdXRBY2Nlc3NpbmdSZWYgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFzcGVjaWFsUHJvcFJlZldhcm5pbmdTaG93bikge1xuICAgICAgc3BlY2lhbFByb3BSZWZXYXJuaW5nU2hvd24gPSB0cnVlO1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICclczogYHJlZmAgaXMgbm90IGEgcHJvcC4gVHJ5aW5nIHRvIGFjY2VzcyBpdCB3aWxsIHJlc3VsdCAnICsgJ2luIGB1bmRlZmluZWRgIGJlaW5nIHJldHVybmVkLiBJZiB5b3UgbmVlZCB0byBhY2Nlc3MgdGhlIHNhbWUgJyArICd2YWx1ZSB3aXRoaW4gdGhlIGNoaWxkIGNvbXBvbmVudCwgeW91IHNob3VsZCBwYXNzIGl0IGFzIGEgZGlmZmVyZW50ICcgKyAncHJvcC4gKGh0dHBzOi8vZmIubWUvcmVhY3Qtc3BlY2lhbC1wcm9wcyknLCBkaXNwbGF5TmFtZSkgOiB2b2lkIDA7XG4gICAgfVxuICB9O1xuICB3YXJuQWJvdXRBY2Nlc3NpbmdSZWYuaXNSZWFjdFdhcm5pbmcgPSB0cnVlO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvcHMsICdyZWYnLCB7XG4gICAgZ2V0OiB3YXJuQWJvdXRBY2Nlc3NpbmdSZWYsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufVxuXG4vKipcbiAqIEZhY3RvcnkgbWV0aG9kIHRvIGNyZWF0ZSBhIG5ldyBSZWFjdCBlbGVtZW50LiBUaGlzIG5vIGxvbmdlciBhZGhlcmVzIHRvXG4gKiB0aGUgY2xhc3MgcGF0dGVybiwgc28gZG8gbm90IHVzZSBuZXcgdG8gY2FsbCBpdC4gQWxzbywgbm8gaW5zdGFuY2VvZiBjaGVja1xuICogd2lsbCB3b3JrLiBJbnN0ZWFkIHRlc3QgJCR0eXBlb2YgZmllbGQgYWdhaW5zdCBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykgdG8gY2hlY2tcbiAqIGlmIHNvbWV0aGluZyBpcyBhIFJlYWN0IEVsZW1lbnQuXG4gKlxuICogQHBhcmFtIHsqfSB0eXBlXG4gKiBAcGFyYW0geyp9IGtleVxuICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fSByZWZcbiAqIEBwYXJhbSB7Kn0gc2VsZiBBICp0ZW1wb3JhcnkqIGhlbHBlciB0byBkZXRlY3QgcGxhY2VzIHdoZXJlIGB0aGlzYCBpc1xuICogZGlmZmVyZW50IGZyb20gdGhlIGBvd25lcmAgd2hlbiBSZWFjdC5jcmVhdGVFbGVtZW50IGlzIGNhbGxlZCwgc28gdGhhdCB3ZVxuICogY2FuIHdhcm4uIFdlIHdhbnQgdG8gZ2V0IHJpZCBvZiBvd25lciBhbmQgcmVwbGFjZSBzdHJpbmcgYHJlZmBzIHdpdGggYXJyb3dcbiAqIGZ1bmN0aW9ucywgYW5kIGFzIGxvbmcgYXMgYHRoaXNgIGFuZCBvd25lciBhcmUgdGhlIHNhbWUsIHRoZXJlIHdpbGwgYmUgbm9cbiAqIGNoYW5nZSBpbiBiZWhhdmlvci5cbiAqIEBwYXJhbSB7Kn0gc291cmNlIEFuIGFubm90YXRpb24gb2JqZWN0IChhZGRlZCBieSBhIHRyYW5zcGlsZXIgb3Igb3RoZXJ3aXNlKVxuICogaW5kaWNhdGluZyBmaWxlbmFtZSwgbGluZSBudW1iZXIsIGFuZC9vciBvdGhlciBpbmZvcm1hdGlvbi5cbiAqIEBwYXJhbSB7Kn0gb3duZXJcbiAqIEBwYXJhbSB7Kn0gcHJvcHNcbiAqIEBpbnRlcm5hbFxuICovXG52YXIgUmVhY3RFbGVtZW50ID0gZnVuY3Rpb24gKHR5cGUsIGtleSwgcmVmLCBzZWxmLCBzb3VyY2UsIG93bmVyLCBwcm9wcykge1xuICB2YXIgZWxlbWVudCA9IHtcbiAgICAvLyBUaGlzIHRhZyBhbGxvdyB1cyB0byB1bmlxdWVseSBpZGVudGlmeSB0aGlzIGFzIGEgUmVhY3QgRWxlbWVudFxuICAgICQkdHlwZW9mOiBSRUFDVF9FTEVNRU5UX1RZUEUsXG5cbiAgICAvLyBCdWlsdC1pbiBwcm9wZXJ0aWVzIHRoYXQgYmVsb25nIG9uIHRoZSBlbGVtZW50XG4gICAgdHlwZTogdHlwZSxcbiAgICBrZXk6IGtleSxcbiAgICByZWY6IHJlZixcbiAgICBwcm9wczogcHJvcHMsXG5cbiAgICAvLyBSZWNvcmQgdGhlIGNvbXBvbmVudCByZXNwb25zaWJsZSBmb3IgY3JlYXRpbmcgdGhpcyBlbGVtZW50LlxuICAgIF9vd25lcjogb3duZXJcbiAgfTtcblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIC8vIFRoZSB2YWxpZGF0aW9uIGZsYWcgaXMgY3VycmVudGx5IG11dGF0aXZlLiBXZSBwdXQgaXQgb25cbiAgICAvLyBhbiBleHRlcm5hbCBiYWNraW5nIHN0b3JlIHNvIHRoYXQgd2UgY2FuIGZyZWV6ZSB0aGUgd2hvbGUgb2JqZWN0LlxuICAgIC8vIFRoaXMgY2FuIGJlIHJlcGxhY2VkIHdpdGggYSBXZWFrTWFwIG9uY2UgdGhleSBhcmUgaW1wbGVtZW50ZWQgaW5cbiAgICAvLyBjb21tb25seSB1c2VkIGRldmVsb3BtZW50IGVudmlyb25tZW50cy5cbiAgICBlbGVtZW50Ll9zdG9yZSA9IHt9O1xuICAgIHZhciBzaGFkb3dDaGlsZHJlbiA9IEFycmF5LmlzQXJyYXkocHJvcHMuY2hpbGRyZW4pID8gcHJvcHMuY2hpbGRyZW4uc2xpY2UoMCkgOiBwcm9wcy5jaGlsZHJlbjtcblxuICAgIC8vIFRvIG1ha2UgY29tcGFyaW5nIFJlYWN0RWxlbWVudHMgZWFzaWVyIGZvciB0ZXN0aW5nIHB1cnBvc2VzLCB3ZSBtYWtlXG4gICAgLy8gdGhlIHZhbGlkYXRpb24gZmxhZyBub24tZW51bWVyYWJsZSAod2hlcmUgcG9zc2libGUsIHdoaWNoIHNob3VsZFxuICAgIC8vIGluY2x1ZGUgZXZlcnkgZW52aXJvbm1lbnQgd2UgcnVuIHRlc3RzIGluKSwgc28gdGhlIHRlc3QgZnJhbWV3b3JrXG4gICAgLy8gaWdub3JlcyBpdC5cbiAgICBpZiAoY2FuRGVmaW5lUHJvcGVydHkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtZW50Ll9zdG9yZSwgJ3ZhbGlkYXRlZCcsIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogZmFsc2VcbiAgICAgIH0pO1xuICAgICAgLy8gc2VsZiBhbmQgc291cmNlIGFyZSBERVYgb25seSBwcm9wZXJ0aWVzLlxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsZW1lbnQsICdfc2VsZicsIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgdmFsdWU6IHNlbGZcbiAgICAgIH0pO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsZW1lbnQsICdfc2hhZG93Q2hpbGRyZW4nLCB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgIHZhbHVlOiBzaGFkb3dDaGlsZHJlblxuICAgICAgfSk7XG4gICAgICAvLyBUd28gZWxlbWVudHMgY3JlYXRlZCBpbiB0d28gZGlmZmVyZW50IHBsYWNlcyBzaG91bGQgYmUgY29uc2lkZXJlZFxuICAgICAgLy8gZXF1YWwgZm9yIHRlc3RpbmcgcHVycG9zZXMgYW5kIHRoZXJlZm9yZSB3ZSBoaWRlIGl0IGZyb20gZW51bWVyYXRpb24uXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxlbWVudCwgJ19zb3VyY2UnLCB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgIHZhbHVlOiBzb3VyY2VcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50Ll9zdG9yZS52YWxpZGF0ZWQgPSBmYWxzZTtcbiAgICAgIGVsZW1lbnQuX3NlbGYgPSBzZWxmO1xuICAgICAgZWxlbWVudC5fc2hhZG93Q2hpbGRyZW4gPSBzaGFkb3dDaGlsZHJlbjtcbiAgICAgIGVsZW1lbnQuX3NvdXJjZSA9IHNvdXJjZTtcbiAgICB9XG4gICAgaWYgKE9iamVjdC5mcmVlemUpIHtcbiAgICAgIE9iamVjdC5mcmVlemUoZWxlbWVudC5wcm9wcyk7XG4gICAgICBPYmplY3QuZnJlZXplKGVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBlbGVtZW50O1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYW5kIHJldHVybiBhIG5ldyBSZWFjdEVsZW1lbnQgb2YgdGhlIGdpdmVuIHR5cGUuXG4gKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90b3AtbGV2ZWwtYXBpLmh0bWwjcmVhY3QuY3JlYXRlZWxlbWVudFxuICovXG5SZWFjdEVsZW1lbnQuY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uICh0eXBlLCBjb25maWcsIGNoaWxkcmVuKSB7XG4gIHZhciBwcm9wTmFtZTtcblxuICAvLyBSZXNlcnZlZCBuYW1lcyBhcmUgZXh0cmFjdGVkXG4gIHZhciBwcm9wcyA9IHt9O1xuXG4gIHZhciBrZXkgPSBudWxsO1xuICB2YXIgcmVmID0gbnVsbDtcbiAgdmFyIHNlbGYgPSBudWxsO1xuICB2YXIgc291cmNlID0gbnVsbDtcblxuICBpZiAoY29uZmlnICE9IG51bGwpIHtcbiAgICBpZiAoaGFzVmFsaWRSZWYoY29uZmlnKSkge1xuICAgICAgcmVmID0gY29uZmlnLnJlZjtcbiAgICB9XG4gICAgaWYgKGhhc1ZhbGlkS2V5KGNvbmZpZykpIHtcbiAgICAgIGtleSA9ICcnICsgY29uZmlnLmtleTtcbiAgICB9XG5cbiAgICBzZWxmID0gY29uZmlnLl9fc2VsZiA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGNvbmZpZy5fX3NlbGY7XG4gICAgc291cmNlID0gY29uZmlnLl9fc291cmNlID09PSB1bmRlZmluZWQgPyBudWxsIDogY29uZmlnLl9fc291cmNlO1xuICAgIC8vIFJlbWFpbmluZyBwcm9wZXJ0aWVzIGFyZSBhZGRlZCB0byBhIG5ldyBwcm9wcyBvYmplY3RcbiAgICBmb3IgKHByb3BOYW1lIGluIGNvbmZpZykge1xuICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoY29uZmlnLCBwcm9wTmFtZSkgJiYgIVJFU0VSVkVEX1BST1BTLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xuICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBjb25maWdbcHJvcE5hbWVdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIENoaWxkcmVuIGNhbiBiZSBtb3JlIHRoYW4gb25lIGFyZ3VtZW50LCBhbmQgdGhvc2UgYXJlIHRyYW5zZmVycmVkIG9udG9cbiAgLy8gdGhlIG5ld2x5IGFsbG9jYXRlZCBwcm9wcyBvYmplY3QuXG4gIHZhciBjaGlsZHJlbkxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGggLSAyO1xuICBpZiAoY2hpbGRyZW5MZW5ndGggPT09IDEpIHtcbiAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICB9IGVsc2UgaWYgKGNoaWxkcmVuTGVuZ3RoID4gMSkge1xuICAgIHZhciBjaGlsZEFycmF5ID0gQXJyYXkoY2hpbGRyZW5MZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW5MZW5ndGg7IGkrKykge1xuICAgICAgY2hpbGRBcnJheVtpXSA9IGFyZ3VtZW50c1tpICsgMl07XG4gICAgfVxuICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRBcnJheTtcbiAgfVxuXG4gIC8vIFJlc29sdmUgZGVmYXVsdCBwcm9wc1xuICBpZiAodHlwZSAmJiB0eXBlLmRlZmF1bHRQcm9wcykge1xuICAgIHZhciBkZWZhdWx0UHJvcHMgPSB0eXBlLmRlZmF1bHRQcm9wcztcbiAgICBmb3IgKHByb3BOYW1lIGluIGRlZmF1bHRQcm9wcykge1xuICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGRlZmF1bHRQcm9wc1twcm9wTmFtZV07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKGtleSB8fCByZWYpIHtcbiAgICAgIGlmICh0eXBlb2YgcHJvcHMuJCR0eXBlb2YgPT09ICd1bmRlZmluZWQnIHx8IHByb3BzLiQkdHlwZW9mICE9PSBSRUFDVF9FTEVNRU5UX1RZUEUpIHtcbiAgICAgICAgdmFyIGRpc3BsYXlOYW1lID0gdHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicgPyB0eXBlLmRpc3BsYXlOYW1lIHx8IHR5cGUubmFtZSB8fCAnVW5rbm93bicgOiB0eXBlO1xuICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgZGVmaW5lS2V5UHJvcFdhcm5pbmdHZXR0ZXIocHJvcHMsIGRpc3BsYXlOYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVmKSB7XG4gICAgICAgICAgZGVmaW5lUmVmUHJvcFdhcm5pbmdHZXR0ZXIocHJvcHMsIGRpc3BsYXlOYW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gUmVhY3RFbGVtZW50KHR5cGUsIGtleSwgcmVmLCBzZWxmLCBzb3VyY2UsIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQsIHByb3BzKTtcbn07XG5cbi8qKlxuICogUmV0dXJuIGEgZnVuY3Rpb24gdGhhdCBwcm9kdWNlcyBSZWFjdEVsZW1lbnRzIG9mIGEgZ2l2ZW4gdHlwZS5cbiAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RvcC1sZXZlbC1hcGkuaHRtbCNyZWFjdC5jcmVhdGVmYWN0b3J5XG4gKi9cblJlYWN0RWxlbWVudC5jcmVhdGVGYWN0b3J5ID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgdmFyIGZhY3RvcnkgPSBSZWFjdEVsZW1lbnQuY3JlYXRlRWxlbWVudC5iaW5kKG51bGwsIHR5cGUpO1xuICAvLyBFeHBvc2UgdGhlIHR5cGUgb24gdGhlIGZhY3RvcnkgYW5kIHRoZSBwcm90b3R5cGUgc28gdGhhdCBpdCBjYW4gYmVcbiAgLy8gZWFzaWx5IGFjY2Vzc2VkIG9uIGVsZW1lbnRzLiBFLmcuIGA8Rm9vIC8+LnR5cGUgPT09IEZvb2AuXG4gIC8vIFRoaXMgc2hvdWxkIG5vdCBiZSBuYW1lZCBgY29uc3RydWN0b3JgIHNpbmNlIHRoaXMgbWF5IG5vdCBiZSB0aGUgZnVuY3Rpb25cbiAgLy8gdGhhdCBjcmVhdGVkIHRoZSBlbGVtZW50LCBhbmQgaXQgbWF5IG5vdCBldmVuIGJlIGEgY29uc3RydWN0b3IuXG4gIC8vIExlZ2FjeSBob29rIFRPRE86IFdhcm4gaWYgdGhpcyBpcyBhY2Nlc3NlZFxuICBmYWN0b3J5LnR5cGUgPSB0eXBlO1xuICByZXR1cm4gZmFjdG9yeTtcbn07XG5cblJlYWN0RWxlbWVudC5jbG9uZUFuZFJlcGxhY2VLZXkgPSBmdW5jdGlvbiAob2xkRWxlbWVudCwgbmV3S2V5KSB7XG4gIHZhciBuZXdFbGVtZW50ID0gUmVhY3RFbGVtZW50KG9sZEVsZW1lbnQudHlwZSwgbmV3S2V5LCBvbGRFbGVtZW50LnJlZiwgb2xkRWxlbWVudC5fc2VsZiwgb2xkRWxlbWVudC5fc291cmNlLCBvbGRFbGVtZW50Ll9vd25lciwgb2xkRWxlbWVudC5wcm9wcyk7XG5cbiAgcmV0dXJuIG5ld0VsZW1lbnQ7XG59O1xuXG4vKipcbiAqIENsb25lIGFuZCByZXR1cm4gYSBuZXcgUmVhY3RFbGVtZW50IHVzaW5nIGVsZW1lbnQgYXMgdGhlIHN0YXJ0aW5nIHBvaW50LlxuICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvdG9wLWxldmVsLWFwaS5odG1sI3JlYWN0LmNsb25lZWxlbWVudFxuICovXG5SZWFjdEVsZW1lbnQuY2xvbmVFbGVtZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQsIGNvbmZpZywgY2hpbGRyZW4pIHtcbiAgdmFyIHByb3BOYW1lO1xuXG4gIC8vIE9yaWdpbmFsIHByb3BzIGFyZSBjb3BpZWRcbiAgdmFyIHByb3BzID0gX2Fzc2lnbih7fSwgZWxlbWVudC5wcm9wcyk7XG5cbiAgLy8gUmVzZXJ2ZWQgbmFtZXMgYXJlIGV4dHJhY3RlZFxuICB2YXIga2V5ID0gZWxlbWVudC5rZXk7XG4gIHZhciByZWYgPSBlbGVtZW50LnJlZjtcbiAgLy8gU2VsZiBpcyBwcmVzZXJ2ZWQgc2luY2UgdGhlIG93bmVyIGlzIHByZXNlcnZlZC5cbiAgdmFyIHNlbGYgPSBlbGVtZW50Ll9zZWxmO1xuICAvLyBTb3VyY2UgaXMgcHJlc2VydmVkIHNpbmNlIGNsb25lRWxlbWVudCBpcyB1bmxpa2VseSB0byBiZSB0YXJnZXRlZCBieSBhXG4gIC8vIHRyYW5zcGlsZXIsIGFuZCB0aGUgb3JpZ2luYWwgc291cmNlIGlzIHByb2JhYmx5IGEgYmV0dGVyIGluZGljYXRvciBvZiB0aGVcbiAgLy8gdHJ1ZSBvd25lci5cbiAgdmFyIHNvdXJjZSA9IGVsZW1lbnQuX3NvdXJjZTtcblxuICAvLyBPd25lciB3aWxsIGJlIHByZXNlcnZlZCwgdW5sZXNzIHJlZiBpcyBvdmVycmlkZGVuXG4gIHZhciBvd25lciA9IGVsZW1lbnQuX293bmVyO1xuXG4gIGlmIChjb25maWcgIT0gbnVsbCkge1xuICAgIGlmIChoYXNWYWxpZFJlZihjb25maWcpKSB7XG4gICAgICAvLyBTaWxlbnRseSBzdGVhbCB0aGUgcmVmIGZyb20gdGhlIHBhcmVudC5cbiAgICAgIHJlZiA9IGNvbmZpZy5yZWY7XG4gICAgICBvd25lciA9IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQ7XG4gICAgfVxuICAgIGlmIChoYXNWYWxpZEtleShjb25maWcpKSB7XG4gICAgICBrZXkgPSAnJyArIGNvbmZpZy5rZXk7XG4gICAgfVxuXG4gICAgLy8gUmVtYWluaW5nIHByb3BlcnRpZXMgb3ZlcnJpZGUgZXhpc3RpbmcgcHJvcHNcbiAgICB2YXIgZGVmYXVsdFByb3BzO1xuICAgIGlmIChlbGVtZW50LnR5cGUgJiYgZWxlbWVudC50eXBlLmRlZmF1bHRQcm9wcykge1xuICAgICAgZGVmYXVsdFByb3BzID0gZWxlbWVudC50eXBlLmRlZmF1bHRQcm9wcztcbiAgICB9XG4gICAgZm9yIChwcm9wTmFtZSBpbiBjb25maWcpIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbmZpZywgcHJvcE5hbWUpICYmICFSRVNFUlZFRF9QUk9QUy5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcbiAgICAgICAgaWYgKGNvbmZpZ1twcm9wTmFtZV0gPT09IHVuZGVmaW5lZCAmJiBkZWZhdWx0UHJvcHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIC8vIFJlc29sdmUgZGVmYXVsdCBwcm9wc1xuICAgICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGRlZmF1bHRQcm9wc1twcm9wTmFtZV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gY29uZmlnW3Byb3BOYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIENoaWxkcmVuIGNhbiBiZSBtb3JlIHRoYW4gb25lIGFyZ3VtZW50LCBhbmQgdGhvc2UgYXJlIHRyYW5zZmVycmVkIG9udG9cbiAgLy8gdGhlIG5ld2x5IGFsbG9jYXRlZCBwcm9wcyBvYmplY3QuXG4gIHZhciBjaGlsZHJlbkxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGggLSAyO1xuICBpZiAoY2hpbGRyZW5MZW5ndGggPT09IDEpIHtcbiAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICB9IGVsc2UgaWYgKGNoaWxkcmVuTGVuZ3RoID4gMSkge1xuICAgIHZhciBjaGlsZEFycmF5ID0gQXJyYXkoY2hpbGRyZW5MZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW5MZW5ndGg7IGkrKykge1xuICAgICAgY2hpbGRBcnJheVtpXSA9IGFyZ3VtZW50c1tpICsgMl07XG4gICAgfVxuICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRBcnJheTtcbiAgfVxuXG4gIHJldHVybiBSZWFjdEVsZW1lbnQoZWxlbWVudC50eXBlLCBrZXksIHJlZiwgc2VsZiwgc291cmNlLCBvd25lciwgcHJvcHMpO1xufTtcblxuLyoqXG4gKiBWZXJpZmllcyB0aGUgb2JqZWN0IGlzIGEgUmVhY3RFbGVtZW50LlxuICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvdG9wLWxldmVsLWFwaS5odG1sI3JlYWN0LmlzdmFsaWRlbGVtZW50XG4gKiBAcGFyYW0gez9vYmplY3R9IG9iamVjdFxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBgb2JqZWN0YCBpcyBhIHZhbGlkIGNvbXBvbmVudC5cbiAqIEBmaW5hbFxuICovXG5SZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgIT09IG51bGwgJiYgb2JqZWN0LiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEU7XG59O1xuXG5SZWFjdEVsZW1lbnQuUkVBQ1RfRUxFTUVOVF9UWVBFID0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0RWxlbWVudDsiLCIvKipcbiAqIENvcHlyaWdodCAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RFbGVtZW50VmFsaWRhdG9yXG4gKi9cblxuLyoqXG4gKiBSZWFjdEVsZW1lbnRWYWxpZGF0b3IgcHJvdmlkZXMgYSB3cmFwcGVyIGFyb3VuZCBhIGVsZW1lbnQgZmFjdG9yeVxuICogd2hpY2ggdmFsaWRhdGVzIHRoZSBwcm9wcyBwYXNzZWQgdG8gdGhlIGVsZW1lbnQuIFRoaXMgaXMgaW50ZW5kZWQgdG8gYmVcbiAqIHVzZWQgb25seSBpbiBERVYgYW5kIGNvdWxkIGJlIHJlcGxhY2VkIGJ5IGEgc3RhdGljIHR5cGUgY2hlY2tlciBmb3IgbGFuZ3VhZ2VzXG4gKiB0aGF0IHN1cHBvcnQgaXQuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RDdXJyZW50T3duZXIgPSByZXF1aXJlKCcuL1JlYWN0Q3VycmVudE93bmVyJyk7XG52YXIgUmVhY3RDb21wb25lbnRUcmVlSG9vayA9IHJlcXVpcmUoJy4vUmVhY3RDb21wb25lbnRUcmVlSG9vaycpO1xudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG52YXIgUmVhY3RQcm9wVHlwZUxvY2F0aW9ucyA9IHJlcXVpcmUoJy4vUmVhY3RQcm9wVHlwZUxvY2F0aW9ucycpO1xuXG52YXIgY2hlY2tSZWFjdFR5cGVTcGVjID0gcmVxdWlyZSgnLi9jaGVja1JlYWN0VHlwZVNwZWMnKTtcblxudmFyIGNhbkRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9jYW5EZWZpbmVQcm9wZXJ0eScpO1xudmFyIGdldEl0ZXJhdG9yRm4gPSByZXF1aXJlKCcuL2dldEl0ZXJhdG9yRm4nKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG5mdW5jdGlvbiBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oKSB7XG4gIGlmIChSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50KSB7XG4gICAgdmFyIG5hbWUgPSBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50LmdldE5hbWUoKTtcbiAgICBpZiAobmFtZSkge1xuICAgICAgcmV0dXJuICcgQ2hlY2sgdGhlIHJlbmRlciBtZXRob2Qgb2YgYCcgKyBuYW1lICsgJ2AuJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuICcnO1xufVxuXG4vKipcbiAqIFdhcm4gaWYgdGhlcmUncyBubyBrZXkgZXhwbGljaXRseSBzZXQgb24gZHluYW1pYyBhcnJheXMgb2YgY2hpbGRyZW4gb3JcbiAqIG9iamVjdCBrZXlzIGFyZSBub3QgdmFsaWQuIFRoaXMgYWxsb3dzIHVzIHRvIGtlZXAgdHJhY2sgb2YgY2hpbGRyZW4gYmV0d2VlblxuICogdXBkYXRlcy5cbiAqL1xudmFyIG93bmVySGFzS2V5VXNlV2FybmluZyA9IHt9O1xuXG5mdW5jdGlvbiBnZXRDdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvKHBhcmVudFR5cGUpIHtcbiAgdmFyIGluZm8gPSBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oKTtcblxuICBpZiAoIWluZm8pIHtcbiAgICB2YXIgcGFyZW50TmFtZSA9IHR5cGVvZiBwYXJlbnRUeXBlID09PSAnc3RyaW5nJyA/IHBhcmVudFR5cGUgOiBwYXJlbnRUeXBlLmRpc3BsYXlOYW1lIHx8IHBhcmVudFR5cGUubmFtZTtcbiAgICBpZiAocGFyZW50TmFtZSkge1xuICAgICAgaW5mbyA9ICcgQ2hlY2sgdGhlIHRvcC1sZXZlbCByZW5kZXIgY2FsbCB1c2luZyA8JyArIHBhcmVudE5hbWUgKyAnPi4nO1xuICAgIH1cbiAgfVxuICByZXR1cm4gaW5mbztcbn1cblxuLyoqXG4gKiBXYXJuIGlmIHRoZSBlbGVtZW50IGRvZXNuJ3QgaGF2ZSBhbiBleHBsaWNpdCBrZXkgYXNzaWduZWQgdG8gaXQuXG4gKiBUaGlzIGVsZW1lbnQgaXMgaW4gYW4gYXJyYXkuIFRoZSBhcnJheSBjb3VsZCBncm93IGFuZCBzaHJpbmsgb3IgYmVcbiAqIHJlb3JkZXJlZC4gQWxsIGNoaWxkcmVuIHRoYXQgaGF2ZW4ndCBhbHJlYWR5IGJlZW4gdmFsaWRhdGVkIGFyZSByZXF1aXJlZCB0b1xuICogaGF2ZSBhIFwia2V5XCIgcHJvcGVydHkgYXNzaWduZWQgdG8gaXQuIEVycm9yIHN0YXR1c2VzIGFyZSBjYWNoZWQgc28gYSB3YXJuaW5nXG4gKiB3aWxsIG9ubHkgYmUgc2hvd24gb25jZS5cbiAqXG4gKiBAaW50ZXJuYWxcbiAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBlbGVtZW50IEVsZW1lbnQgdGhhdCByZXF1aXJlcyBhIGtleS5cbiAqIEBwYXJhbSB7Kn0gcGFyZW50VHlwZSBlbGVtZW50J3MgcGFyZW50J3MgdHlwZS5cbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVFeHBsaWNpdEtleShlbGVtZW50LCBwYXJlbnRUeXBlKSB7XG4gIGlmICghZWxlbWVudC5fc3RvcmUgfHwgZWxlbWVudC5fc3RvcmUudmFsaWRhdGVkIHx8IGVsZW1lbnQua2V5ICE9IG51bGwpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgZWxlbWVudC5fc3RvcmUudmFsaWRhdGVkID0gdHJ1ZTtcblxuICB2YXIgbWVtb2l6ZXIgPSBvd25lckhhc0tleVVzZVdhcm5pbmcudW5pcXVlS2V5IHx8IChvd25lckhhc0tleVVzZVdhcm5pbmcudW5pcXVlS2V5ID0ge30pO1xuXG4gIHZhciBjdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvID0gZ2V0Q3VycmVudENvbXBvbmVudEVycm9ySW5mbyhwYXJlbnRUeXBlKTtcbiAgaWYgKG1lbW9pemVyW2N1cnJlbnRDb21wb25lbnRFcnJvckluZm9dKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIG1lbW9pemVyW2N1cnJlbnRDb21wb25lbnRFcnJvckluZm9dID0gdHJ1ZTtcblxuICAvLyBVc3VhbGx5IHRoZSBjdXJyZW50IG93bmVyIGlzIHRoZSBvZmZlbmRlciwgYnV0IGlmIGl0IGFjY2VwdHMgY2hpbGRyZW4gYXMgYVxuICAvLyBwcm9wZXJ0eSwgaXQgbWF5IGJlIHRoZSBjcmVhdG9yIG9mIHRoZSBjaGlsZCB0aGF0J3MgcmVzcG9uc2libGUgZm9yXG4gIC8vIGFzc2lnbmluZyBpdCBhIGtleS5cbiAgdmFyIGNoaWxkT3duZXIgPSAnJztcbiAgaWYgKGVsZW1lbnQgJiYgZWxlbWVudC5fb3duZXIgJiYgZWxlbWVudC5fb3duZXIgIT09IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQpIHtcbiAgICAvLyBHaXZlIHRoZSBjb21wb25lbnQgdGhhdCBvcmlnaW5hbGx5IGNyZWF0ZWQgdGhpcyBjaGlsZC5cbiAgICBjaGlsZE93bmVyID0gJyBJdCB3YXMgcGFzc2VkIGEgY2hpbGQgZnJvbSAnICsgZWxlbWVudC5fb3duZXIuZ2V0TmFtZSgpICsgJy4nO1xuICB9XG5cbiAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdFYWNoIGNoaWxkIGluIGFuIGFycmF5IG9yIGl0ZXJhdG9yIHNob3VsZCBoYXZlIGEgdW5pcXVlIFwia2V5XCIgcHJvcC4nICsgJyVzJXMgU2VlIGh0dHBzOi8vZmIubWUvcmVhY3Qtd2FybmluZy1rZXlzIGZvciBtb3JlIGluZm9ybWF0aW9uLiVzJywgY3VycmVudENvbXBvbmVudEVycm9ySW5mbywgY2hpbGRPd25lciwgUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRDdXJyZW50U3RhY2tBZGRlbmR1bShlbGVtZW50KSkgOiB2b2lkIDA7XG59XG5cbi8qKlxuICogRW5zdXJlIHRoYXQgZXZlcnkgZWxlbWVudCBlaXRoZXIgaXMgcGFzc2VkIGluIGEgc3RhdGljIGxvY2F0aW9uLCBpbiBhblxuICogYXJyYXkgd2l0aCBhbiBleHBsaWNpdCBrZXlzIHByb3BlcnR5IGRlZmluZWQsIG9yIGluIGFuIG9iamVjdCBsaXRlcmFsXG4gKiB3aXRoIHZhbGlkIGtleSBwcm9wZXJ0eS5cbiAqXG4gKiBAaW50ZXJuYWxcbiAqIEBwYXJhbSB7UmVhY3ROb2RlfSBub2RlIFN0YXRpY2FsbHkgcGFzc2VkIGNoaWxkIG9mIGFueSB0eXBlLlxuICogQHBhcmFtIHsqfSBwYXJlbnRUeXBlIG5vZGUncyBwYXJlbnQncyB0eXBlLlxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZUNoaWxkS2V5cyhub2RlLCBwYXJlbnRUeXBlKSB7XG4gIGlmICh0eXBlb2Ygbm9kZSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKEFycmF5LmlzQXJyYXkobm9kZSkpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjaGlsZCA9IG5vZGVbaV07XG4gICAgICBpZiAoUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KGNoaWxkKSkge1xuICAgICAgICB2YWxpZGF0ZUV4cGxpY2l0S2V5KGNoaWxkLCBwYXJlbnRUeXBlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KG5vZGUpKSB7XG4gICAgLy8gVGhpcyBlbGVtZW50IHdhcyBwYXNzZWQgaW4gYSB2YWxpZCBsb2NhdGlvbi5cbiAgICBpZiAobm9kZS5fc3RvcmUpIHtcbiAgICAgIG5vZGUuX3N0b3JlLnZhbGlkYXRlZCA9IHRydWU7XG4gICAgfVxuICB9IGVsc2UgaWYgKG5vZGUpIHtcbiAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4obm9kZSk7XG4gICAgLy8gRW50cnkgaXRlcmF0b3JzIHByb3ZpZGUgaW1wbGljaXQga2V5cy5cbiAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgICAgaWYgKGl0ZXJhdG9yRm4gIT09IG5vZGUuZW50cmllcykge1xuICAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwobm9kZSk7XG4gICAgICAgIHZhciBzdGVwO1xuICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgaWYgKFJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChzdGVwLnZhbHVlKSkge1xuICAgICAgICAgICAgdmFsaWRhdGVFeHBsaWNpdEtleShzdGVwLnZhbHVlLCBwYXJlbnRUeXBlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBHaXZlbiBhbiBlbGVtZW50LCB2YWxpZGF0ZSB0aGF0IGl0cyBwcm9wcyBmb2xsb3cgdGhlIHByb3BUeXBlcyBkZWZpbml0aW9uLFxuICogcHJvdmlkZWQgYnkgdGhlIHR5cGUuXG4gKlxuICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVQcm9wVHlwZXMoZWxlbWVudCkge1xuICB2YXIgY29tcG9uZW50Q2xhc3MgPSBlbGVtZW50LnR5cGU7XG4gIGlmICh0eXBlb2YgY29tcG9uZW50Q2xhc3MgIT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG5hbWUgPSBjb21wb25lbnRDbGFzcy5kaXNwbGF5TmFtZSB8fCBjb21wb25lbnRDbGFzcy5uYW1lO1xuICBpZiAoY29tcG9uZW50Q2xhc3MucHJvcFR5cGVzKSB7XG4gICAgY2hlY2tSZWFjdFR5cGVTcGVjKGNvbXBvbmVudENsYXNzLnByb3BUeXBlcywgZWxlbWVudC5wcm9wcywgUmVhY3RQcm9wVHlwZUxvY2F0aW9ucy5wcm9wLCBuYW1lLCBlbGVtZW50LCBudWxsKTtcbiAgfVxuICBpZiAodHlwZW9mIGNvbXBvbmVudENsYXNzLmdldERlZmF1bHRQcm9wcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGNvbXBvbmVudENsYXNzLmdldERlZmF1bHRQcm9wcy5pc1JlYWN0Q2xhc3NBcHByb3ZlZCwgJ2dldERlZmF1bHRQcm9wcyBpcyBvbmx5IHVzZWQgb24gY2xhc3NpYyBSZWFjdC5jcmVhdGVDbGFzcyAnICsgJ2RlZmluaXRpb25zLiBVc2UgYSBzdGF0aWMgcHJvcGVydHkgbmFtZWQgYGRlZmF1bHRQcm9wc2AgaW5zdGVhZC4nKSA6IHZvaWQgMDtcbiAgfVxufVxuXG52YXIgUmVhY3RFbGVtZW50VmFsaWRhdG9yID0ge1xuXG4gIGNyZWF0ZUVsZW1lbnQ6IGZ1bmN0aW9uICh0eXBlLCBwcm9wcywgY2hpbGRyZW4pIHtcbiAgICB2YXIgdmFsaWRUeXBlID0gdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nO1xuICAgIC8vIFdlIHdhcm4gaW4gdGhpcyBjYXNlIGJ1dCBkb24ndCB0aHJvdy4gV2UgZXhwZWN0IHRoZSBlbGVtZW50IGNyZWF0aW9uIHRvXG4gICAgLy8gc3VjY2VlZCBhbmQgdGhlcmUgd2lsbCBsaWtlbHkgYmUgZXJyb3JzIGluIHJlbmRlci5cbiAgICBpZiAoIXZhbGlkVHlwZSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdSZWFjdC5jcmVhdGVFbGVtZW50OiB0eXBlIHNob3VsZCBub3QgYmUgbnVsbCwgdW5kZWZpbmVkLCBib29sZWFuLCBvciAnICsgJ251bWJlci4gSXQgc2hvdWxkIGJlIGEgc3RyaW5nIChmb3IgRE9NIGVsZW1lbnRzKSBvciBhIFJlYWN0Q2xhc3MgJyArICcoZm9yIGNvbXBvc2l0ZSBjb21wb25lbnRzKS4lcycsIGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bSgpKSA6IHZvaWQgMDtcbiAgICB9XG5cbiAgICB2YXIgZWxlbWVudCA9IFJlYWN0RWxlbWVudC5jcmVhdGVFbGVtZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICAvLyBUaGUgcmVzdWx0IGNhbiBiZSBudWxsaXNoIGlmIGEgbW9jayBvciBhIGN1c3RvbSBmdW5jdGlvbiBpcyB1c2VkLlxuICAgIC8vIFRPRE86IERyb3AgdGhpcyB3aGVuIHRoZXNlIGFyZSBubyBsb25nZXIgYWxsb3dlZCBhcyB0aGUgdHlwZSBhcmd1bWVudC5cbiAgICBpZiAoZWxlbWVudCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG5cbiAgICAvLyBTa2lwIGtleSB3YXJuaW5nIGlmIHRoZSB0eXBlIGlzbid0IHZhbGlkIHNpbmNlIG91ciBrZXkgdmFsaWRhdGlvbiBsb2dpY1xuICAgIC8vIGRvZXNuJ3QgZXhwZWN0IGEgbm9uLXN0cmluZy9mdW5jdGlvbiB0eXBlIGFuZCBjYW4gdGhyb3cgY29uZnVzaW5nIGVycm9ycy5cbiAgICAvLyBXZSBkb24ndCB3YW50IGV4Y2VwdGlvbiBiZWhhdmlvciB0byBkaWZmZXIgYmV0d2VlbiBkZXYgYW5kIHByb2QuXG4gICAgLy8gKFJlbmRlcmluZyB3aWxsIHRocm93IHdpdGggYSBoZWxwZnVsIG1lc3NhZ2UgYW5kIGFzIHNvb24gYXMgdGhlIHR5cGUgaXNcbiAgICAvLyBmaXhlZCwgdGhlIGtleSB3YXJuaW5ncyB3aWxsIGFwcGVhci4pXG4gICAgaWYgKHZhbGlkVHlwZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDI7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFsaWRhdGVDaGlsZEtleXMoYXJndW1lbnRzW2ldLCB0eXBlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YWxpZGF0ZVByb3BUeXBlcyhlbGVtZW50KTtcblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9LFxuXG4gIGNyZWF0ZUZhY3Rvcnk6IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgdmFyIHZhbGlkYXRlZEZhY3RvcnkgPSBSZWFjdEVsZW1lbnRWYWxpZGF0b3IuY3JlYXRlRWxlbWVudC5iaW5kKG51bGwsIHR5cGUpO1xuICAgIC8vIExlZ2FjeSBob29rIFRPRE86IFdhcm4gaWYgdGhpcyBpcyBhY2Nlc3NlZFxuICAgIHZhbGlkYXRlZEZhY3RvcnkudHlwZSA9IHR5cGU7XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKGNhbkRlZmluZVByb3BlcnR5KSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh2YWxpZGF0ZWRGYWN0b3J5LCAndHlwZScsIHtcbiAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnRmFjdG9yeS50eXBlIGlzIGRlcHJlY2F0ZWQuIEFjY2VzcyB0aGUgY2xhc3MgZGlyZWN0bHkgJyArICdiZWZvcmUgcGFzc2luZyBpdCB0byBjcmVhdGVGYWN0b3J5LicpIDogdm9pZCAwO1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICd0eXBlJywge1xuICAgICAgICAgICAgICB2YWx1ZTogdHlwZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdHlwZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB2YWxpZGF0ZWRGYWN0b3J5O1xuICB9LFxuXG4gIGNsb25lRWxlbWVudDogZnVuY3Rpb24gKGVsZW1lbnQsIHByb3BzLCBjaGlsZHJlbikge1xuICAgIHZhciBuZXdFbGVtZW50ID0gUmVhY3RFbGVtZW50LmNsb25lRWxlbWVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGZvciAodmFyIGkgPSAyOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YWxpZGF0ZUNoaWxkS2V5cyhhcmd1bWVudHNbaV0sIG5ld0VsZW1lbnQudHlwZSk7XG4gICAgfVxuICAgIHZhbGlkYXRlUHJvcFR5cGVzKG5ld0VsZW1lbnQpO1xuICAgIHJldHVybiBuZXdFbGVtZW50O1xuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RFbGVtZW50VmFsaWRhdG9yOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTUtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdE5vb3BVcGRhdGVRdWV1ZVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbmZ1bmN0aW9uIHdhcm5Ob29wKHB1YmxpY0luc3RhbmNlLCBjYWxsZXJOYW1lKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgdmFyIGNvbnN0cnVjdG9yID0gcHVibGljSW5zdGFuY2UuY29uc3RydWN0b3I7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICclcyguLi4pOiBDYW4gb25seSB1cGRhdGUgYSBtb3VudGVkIG9yIG1vdW50aW5nIGNvbXBvbmVudC4gJyArICdUaGlzIHVzdWFsbHkgbWVhbnMgeW91IGNhbGxlZCAlcygpIG9uIGFuIHVubW91bnRlZCBjb21wb25lbnQuICcgKyAnVGhpcyBpcyBhIG5vLW9wLiBQbGVhc2UgY2hlY2sgdGhlIGNvZGUgZm9yIHRoZSAlcyBjb21wb25lbnQuJywgY2FsbGVyTmFtZSwgY2FsbGVyTmFtZSwgY29uc3RydWN0b3IgJiYgKGNvbnN0cnVjdG9yLmRpc3BsYXlOYW1lIHx8IGNvbnN0cnVjdG9yLm5hbWUpIHx8ICdSZWFjdENsYXNzJykgOiB2b2lkIDA7XG4gIH1cbn1cblxuLyoqXG4gKiBUaGlzIGlzIHRoZSBhYnN0cmFjdCBBUEkgZm9yIGFuIHVwZGF0ZSBxdWV1ZS5cbiAqL1xudmFyIFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlID0ge1xuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2hldGhlciBvciBub3QgdGhpcyBjb21wb3NpdGUgY29tcG9uZW50IGlzIG1vdW50ZWQuXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHdlIHdhbnQgdG8gdGVzdC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBtb3VudGVkLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqIEBwcm90ZWN0ZWRcbiAgICogQGZpbmFsXG4gICAqL1xuICBpc01vdW50ZWQ6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcblxuICAvKipcbiAgICogRW5xdWV1ZSBhIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBleGVjdXRlZCBhZnRlciBhbGwgdGhlIHBlbmRpbmcgdXBkYXRlc1xuICAgKiBoYXZlIHByb2Nlc3NlZC5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdG8gdXNlIGFzIGB0aGlzYCBjb250ZXh0LlxuICAgKiBAcGFyYW0gez9mdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIHN0YXRlIGlzIHVwZGF0ZWQuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZUNhbGxiYWNrOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UsIGNhbGxiYWNrKSB7fSxcblxuICAvKipcbiAgICogRm9yY2VzIGFuIHVwZGF0ZS4gVGhpcyBzaG91bGQgb25seSBiZSBpbnZva2VkIHdoZW4gaXQgaXMga25vd24gd2l0aFxuICAgKiBjZXJ0YWludHkgdGhhdCB3ZSBhcmUgKipub3QqKiBpbiBhIERPTSB0cmFuc2FjdGlvbi5cbiAgICpcbiAgICogWW91IG1heSB3YW50IHRvIGNhbGwgdGhpcyB3aGVuIHlvdSBrbm93IHRoYXQgc29tZSBkZWVwZXIgYXNwZWN0IG9mIHRoZVxuICAgKiBjb21wb25lbnQncyBzdGF0ZSBoYXMgY2hhbmdlZCBidXQgYHNldFN0YXRlYCB3YXMgbm90IGNhbGxlZC5cbiAgICpcbiAgICogVGhpcyB3aWxsIG5vdCBpbnZva2UgYHNob3VsZENvbXBvbmVudFVwZGF0ZWAsIGJ1dCBpdCB3aWxsIGludm9rZVxuICAgKiBgY29tcG9uZW50V2lsbFVwZGF0ZWAgYW5kIGBjb21wb25lbnREaWRVcGRhdGVgLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB0aGF0IHNob3VsZCByZXJlbmRlci5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBlbnF1ZXVlRm9yY2VVcGRhdGU6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSkge1xuICAgIHdhcm5Ob29wKHB1YmxpY0luc3RhbmNlLCAnZm9yY2VVcGRhdGUnKTtcbiAgfSxcblxuICAvKipcbiAgICogUmVwbGFjZXMgYWxsIG9mIHRoZSBzdGF0ZS4gQWx3YXlzIHVzZSB0aGlzIG9yIGBzZXRTdGF0ZWAgdG8gbXV0YXRlIHN0YXRlLlxuICAgKiBZb3Ugc2hvdWxkIHRyZWF0IGB0aGlzLnN0YXRlYCBhcyBpbW11dGFibGUuXG4gICAqXG4gICAqIFRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IGB0aGlzLnN0YXRlYCB3aWxsIGJlIGltbWVkaWF0ZWx5IHVwZGF0ZWQsIHNvXG4gICAqIGFjY2Vzc2luZyBgdGhpcy5zdGF0ZWAgYWZ0ZXIgY2FsbGluZyB0aGlzIG1ldGhvZCBtYXkgcmV0dXJuIHRoZSBvbGQgdmFsdWUuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHRoYXQgc2hvdWxkIHJlcmVuZGVyLlxuICAgKiBAcGFyYW0ge29iamVjdH0gY29tcGxldGVTdGF0ZSBOZXh0IHN0YXRlLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWVSZXBsYWNlU3RhdGU6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSwgY29tcGxldGVTdGF0ZSkge1xuICAgIHdhcm5Ob29wKHB1YmxpY0luc3RhbmNlLCAncmVwbGFjZVN0YXRlJyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFNldHMgYSBzdWJzZXQgb2YgdGhlIHN0YXRlLiBUaGlzIG9ubHkgZXhpc3RzIGJlY2F1c2UgX3BlbmRpbmdTdGF0ZSBpc1xuICAgKiBpbnRlcm5hbC4gVGhpcyBwcm92aWRlcyBhIG1lcmdpbmcgc3RyYXRlZ3kgdGhhdCBpcyBub3QgYXZhaWxhYmxlIHRvIGRlZXBcbiAgICogcHJvcGVydGllcyB3aGljaCBpcyBjb25mdXNpbmcuIFRPRE86IEV4cG9zZSBwZW5kaW5nU3RhdGUgb3IgZG9uJ3QgdXNlIGl0XG4gICAqIGR1cmluZyB0aGUgbWVyZ2UuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHRoYXQgc2hvdWxkIHJlcmVuZGVyLlxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFydGlhbFN0YXRlIE5leHQgcGFydGlhbCBzdGF0ZSB0byBiZSBtZXJnZWQgd2l0aCBzdGF0ZS5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBlbnF1ZXVlU2V0U3RhdGU6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSwgcGFydGlhbFN0YXRlKSB7XG4gICAgd2Fybk5vb3AocHVibGljSW5zdGFuY2UsICdzZXRTdGF0ZScpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzID0ge307XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzID0ge1xuICAgIHByb3A6ICdwcm9wJyxcbiAgICBjb250ZXh0OiAnY29udGV4dCcsXG4gICAgY2hpbGRDb250ZXh0OiAnY2hpbGQgY29udGV4dCdcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lczsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RQcm9wVHlwZUxvY2F0aW9uc1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGtleU1pcnJvciA9IHJlcXVpcmUoJ2ZianMvbGliL2tleU1pcnJvcicpO1xuXG52YXIgUmVhY3RQcm9wVHlwZUxvY2F0aW9ucyA9IGtleU1pcnJvcih7XG4gIHByb3A6IG51bGwsXG4gIGNvbnRleHQ6IG51bGwsXG4gIGNoaWxkQ29udGV4dDogbnVsbFxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uczsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RQcm9wVHlwZXNcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdEVsZW1lbnQgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudCcpO1xudmFyIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzID0gcmVxdWlyZSgnLi9SZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcycpO1xudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9SZWFjdFByb3BUeXBlc1NlY3JldCcpO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5RnVuY3Rpb24nKTtcbnZhciBnZXRJdGVyYXRvckZuID0gcmVxdWlyZSgnLi9nZXRJdGVyYXRvckZuJyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxuLyoqXG4gKiBDb2xsZWN0aW9uIG9mIG1ldGhvZHMgdGhhdCBhbGxvdyBkZWNsYXJhdGlvbiBhbmQgdmFsaWRhdGlvbiBvZiBwcm9wcyB0aGF0IGFyZVxuICogc3VwcGxpZWQgdG8gUmVhY3QgY29tcG9uZW50cy4gRXhhbXBsZSB1c2FnZTpcbiAqXG4gKiAgIHZhciBQcm9wcyA9IHJlcXVpcmUoJ1JlYWN0UHJvcFR5cGVzJyk7XG4gKiAgIHZhciBNeUFydGljbGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gKiAgICAgcHJvcFR5cGVzOiB7XG4gKiAgICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgcHJvcCBuYW1lZCBcImRlc2NyaXB0aW9uXCIuXG4gKiAgICAgICBkZXNjcmlwdGlvbjogUHJvcHMuc3RyaW5nLFxuICpcbiAqICAgICAgIC8vIEEgcmVxdWlyZWQgZW51bSBwcm9wIG5hbWVkIFwiY2F0ZWdvcnlcIi5cbiAqICAgICAgIGNhdGVnb3J5OiBQcm9wcy5vbmVPZihbJ05ld3MnLCdQaG90b3MnXSkuaXNSZXF1aXJlZCxcbiAqXG4gKiAgICAgICAvLyBBIHByb3AgbmFtZWQgXCJkaWFsb2dcIiB0aGF0IHJlcXVpcmVzIGFuIGluc3RhbmNlIG9mIERpYWxvZy5cbiAqICAgICAgIGRpYWxvZzogUHJvcHMuaW5zdGFuY2VPZihEaWFsb2cpLmlzUmVxdWlyZWRcbiAqICAgICB9LFxuICogICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7IC4uLiB9XG4gKiAgIH0pO1xuICpcbiAqIEEgbW9yZSBmb3JtYWwgc3BlY2lmaWNhdGlvbiBvZiBob3cgdGhlc2UgbWV0aG9kcyBhcmUgdXNlZDpcbiAqXG4gKiAgIHR5cGUgOj0gYXJyYXl8Ym9vbHxmdW5jfG9iamVjdHxudW1iZXJ8c3RyaW5nfG9uZU9mKFsuLi5dKXxpbnN0YW5jZU9mKC4uLilcbiAqICAgZGVjbCA6PSBSZWFjdFByb3BUeXBlcy57dHlwZX0oLmlzUmVxdWlyZWQpP1xuICpcbiAqIEVhY2ggYW5kIGV2ZXJ5IGRlY2xhcmF0aW9uIHByb2R1Y2VzIGEgZnVuY3Rpb24gd2l0aCB0aGUgc2FtZSBzaWduYXR1cmUuIFRoaXNcbiAqIGFsbG93cyB0aGUgY3JlYXRpb24gb2YgY3VzdG9tIHZhbGlkYXRpb24gZnVuY3Rpb25zLiBGb3IgZXhhbXBsZTpcbiAqXG4gKiAgdmFyIE15TGluayA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAqICAgIHByb3BUeXBlczoge1xuICogICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgb3IgVVJJIHByb3AgbmFtZWQgXCJocmVmXCIuXG4gKiAgICAgIGhyZWY6IGZ1bmN0aW9uKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSkge1xuICogICAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gKiAgICAgICAgaWYgKHByb3BWYWx1ZSAhPSBudWxsICYmIHR5cGVvZiBwcm9wVmFsdWUgIT09ICdzdHJpbmcnICYmXG4gKiAgICAgICAgICAgICEocHJvcFZhbHVlIGluc3RhbmNlb2YgVVJJKSkge1xuICogICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcbiAqICAgICAgICAgICAgJ0V4cGVjdGVkIGEgc3RyaW5nIG9yIGFuIFVSSSBmb3IgJyArIHByb3BOYW1lICsgJyBpbiAnICtcbiAqICAgICAgICAgICAgY29tcG9uZW50TmFtZVxuICogICAgICAgICAgKTtcbiAqICAgICAgICB9XG4gKiAgICAgIH1cbiAqICAgIH0sXG4gKiAgICByZW5kZXI6IGZ1bmN0aW9uKCkgey4uLn1cbiAqICB9KTtcbiAqXG4gKiBAaW50ZXJuYWxcbiAqL1xuXG52YXIgQU5PTllNT1VTID0gJzw8YW5vbnltb3VzPj4nO1xuXG52YXIgUmVhY3RQcm9wVHlwZXMgPSB7XG4gIGFycmF5OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYXJyYXknKSxcbiAgYm9vbDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2Jvb2xlYW4nKSxcbiAgZnVuYzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2Z1bmN0aW9uJyksXG4gIG51bWJlcjogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ251bWJlcicpLFxuICBvYmplY3Q6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdvYmplY3QnKSxcbiAgc3RyaW5nOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3RyaW5nJyksXG4gIHN5bWJvbDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ3N5bWJvbCcpLFxuXG4gIGFueTogY3JlYXRlQW55VHlwZUNoZWNrZXIoKSxcbiAgYXJyYXlPZjogY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyLFxuICBlbGVtZW50OiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSxcbiAgaW5zdGFuY2VPZjogY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcixcbiAgbm9kZTogY3JlYXRlTm9kZUNoZWNrZXIoKSxcbiAgb2JqZWN0T2Y6IGNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIsXG4gIG9uZU9mOiBjcmVhdGVFbnVtVHlwZUNoZWNrZXIsXG4gIG9uZU9mVHlwZTogY3JlYXRlVW5pb25UeXBlQ2hlY2tlcixcbiAgc2hhcGU6IGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXJcbn07XG5cbi8qKlxuICogaW5saW5lZCBPYmplY3QuaXMgcG9seWZpbGwgdG8gYXZvaWQgcmVxdWlyaW5nIGNvbnN1bWVycyBzaGlwIHRoZWlyIG93blxuICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2lzXG4gKi9cbi8qZXNsaW50LWRpc2FibGUgbm8tc2VsZi1jb21wYXJlKi9cbmZ1bmN0aW9uIGlzKHgsIHkpIHtcbiAgLy8gU2FtZVZhbHVlIGFsZ29yaXRobVxuICBpZiAoeCA9PT0geSkge1xuICAgIC8vIFN0ZXBzIDEtNSwgNy0xMFxuICAgIC8vIFN0ZXBzIDYuYi02LmU6ICswICE9IC0wXG4gICAgcmV0dXJuIHggIT09IDAgfHwgMSAvIHggPT09IDEgLyB5O1xuICB9IGVsc2Uge1xuICAgIC8vIFN0ZXAgNi5hOiBOYU4gPT0gTmFOXG4gICAgcmV0dXJuIHggIT09IHggJiYgeSAhPT0geTtcbiAgfVxufVxuLyplc2xpbnQtZW5hYmxlIG5vLXNlbGYtY29tcGFyZSovXG5cbi8qKlxuICogV2UgdXNlIGFuIEVycm9yLWxpa2Ugb2JqZWN0IGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IGFzIHBlb3BsZSBtYXkgY2FsbFxuICogUHJvcFR5cGVzIGRpcmVjdGx5IGFuZCBpbnNwZWN0IHRoZWlyIG91dHB1dC4gSG93ZXZlciB3ZSBkb24ndCB1c2UgcmVhbFxuICogRXJyb3JzIGFueW1vcmUuIFdlIGRvbid0IGluc3BlY3QgdGhlaXIgc3RhY2sgYW55d2F5LCBhbmQgY3JlYXRpbmcgdGhlbVxuICogaXMgcHJvaGliaXRpdmVseSBleHBlbnNpdmUgaWYgdGhleSBhcmUgY3JlYXRlZCB0b28gb2Z0ZW4sIHN1Y2ggYXMgd2hhdFxuICogaGFwcGVucyBpbiBvbmVPZlR5cGUoKSBmb3IgYW55IHR5cGUgYmVmb3JlIHRoZSBvbmUgdGhhdCBtYXRjaGVkLlxuICovXG5mdW5jdGlvbiBQcm9wVHlwZUVycm9yKG1lc3NhZ2UpIHtcbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgdGhpcy5zdGFjayA9ICcnO1xufVxuLy8gTWFrZSBgaW5zdGFuY2VvZiBFcnJvcmAgc3RpbGwgd29yayBmb3IgcmV0dXJuZWQgZXJyb3JzLlxuUHJvcFR5cGVFcnJvci5wcm90b3R5cGUgPSBFcnJvci5wcm90b3R5cGU7XG5cbmZ1bmN0aW9uIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgdmFyIG1hbnVhbFByb3BUeXBlQ2FsbENhY2hlID0ge307XG4gIH1cbiAgZnVuY3Rpb24gY2hlY2tUeXBlKGlzUmVxdWlyZWQsIHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgY29tcG9uZW50TmFtZSA9IGNvbXBvbmVudE5hbWUgfHwgQU5PTllNT1VTO1xuICAgIHByb3BGdWxsTmFtZSA9IHByb3BGdWxsTmFtZSB8fCBwcm9wTmFtZTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKHNlY3JldCAhPT0gUmVhY3RQcm9wVHlwZXNTZWNyZXQgJiYgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhciBjYWNoZUtleSA9IGNvbXBvbmVudE5hbWUgKyAnOicgKyBwcm9wTmFtZTtcbiAgICAgICAgaWYgKCFtYW51YWxQcm9wVHlwZUNhbGxDYWNoZVtjYWNoZUtleV0pIHtcbiAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ1lvdSBhcmUgbWFudWFsbHkgY2FsbGluZyBhIFJlYWN0LlByb3BUeXBlcyB2YWxpZGF0aW9uICcgKyAnZnVuY3Rpb24gZm9yIHRoZSBgJXNgIHByb3Agb24gYCVzYC4gVGhpcyBpcyBkZXByZWNhdGVkICcgKyAnYW5kIHdpbGwgbm90IHdvcmsgaW4gdGhlIG5leHQgbWFqb3IgdmVyc2lvbi4gWW91IG1heSBiZSAnICsgJ3NlZWluZyB0aGlzIHdhcm5pbmcgZHVlIHRvIGEgdGhpcmQtcGFydHkgUHJvcFR5cGVzIGxpYnJhcnkuICcgKyAnU2VlIGh0dHBzOi8vZmIubWUvcmVhY3Qtd2FybmluZy1kb250LWNhbGwtcHJvcHR5cGVzIGZvciBkZXRhaWxzLicsIHByb3BGdWxsTmFtZSwgY29tcG9uZW50TmFtZSkgOiB2b2lkIDA7XG4gICAgICAgICAgbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGVbY2FjaGVLZXldID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09IG51bGwpIHtcbiAgICAgIHZhciBsb2NhdGlvbk5hbWUgPSBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl07XG4gICAgICBpZiAoaXNSZXF1aXJlZCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1JlcXVpcmVkICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agd2FzIG5vdCBzcGVjaWZpZWQgaW4gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjaGFpbmVkQ2hlY2tUeXBlID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgZmFsc2UpO1xuICBjaGFpbmVkQ2hlY2tUeXBlLmlzUmVxdWlyZWQgPSBjaGVja1R5cGUuYmluZChudWxsLCB0cnVlKTtcblxuICByZXR1cm4gY2hhaW5lZENoZWNrVHlwZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoZXhwZWN0ZWRUeXBlKSB7XG4gIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgIGlmIChwcm9wVHlwZSAhPT0gZXhwZWN0ZWRUeXBlKSB7XG4gICAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgICAgLy8gYHByb3BWYWx1ZWAgYmVpbmcgaW5zdGFuY2Ugb2YsIHNheSwgZGF0ZS9yZWdleHAsIHBhc3MgdGhlICdvYmplY3QnXG4gICAgICAvLyBjaGVjaywgYnV0IHdlIGNhbiBvZmZlciBhIG1vcmUgcHJlY2lzZSBlcnJvciBtZXNzYWdlIGhlcmUgcmF0aGVyIHRoYW5cbiAgICAgIC8vICdvZiB0eXBlIGBvYmplY3RgJy5cbiAgICAgIHZhciBwcmVjaXNlVHlwZSA9IGdldFByZWNpc2VUeXBlKHByb3BWYWx1ZSk7XG5cbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcmVjaXNlVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCAnKSArICgnYCcgKyBleHBlY3RlZFR5cGUgKyAnYC4nKSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUFueVR5cGVDaGVja2VyKCkge1xuICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIoZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJucyhudWxsKSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICBpZiAodHlwZW9mIHR5cGVDaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBhcnJheU9mLicpO1xuICAgIH1cbiAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhbiBhcnJheS4nKSk7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcFZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZXJyb3IgPSB0eXBlQ2hlY2tlcihwcm9wVmFsdWUsIGksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnWycgKyBpICsgJ10nLCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlcigpIHtcbiAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICBpZiAoIVJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChwcm9wVmFsdWUpKSB7XG4gICAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIHNpbmdsZSBSZWFjdEVsZW1lbnQuJykpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyKGV4cGVjdGVkQ2xhc3MpIHtcbiAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgaWYgKCEocHJvcHNbcHJvcE5hbWVdIGluc3RhbmNlb2YgZXhwZWN0ZWRDbGFzcykpIHtcbiAgICAgIHZhciBsb2NhdGlvbk5hbWUgPSBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl07XG4gICAgICB2YXIgZXhwZWN0ZWRDbGFzc05hbWUgPSBleHBlY3RlZENsYXNzLm5hbWUgfHwgQU5PTllNT1VTO1xuICAgICAgdmFyIGFjdHVhbENsYXNzTmFtZSA9IGdldENsYXNzTmFtZShwcm9wc1twcm9wTmFtZV0pO1xuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIGFjdHVhbENsYXNzTmFtZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCAnKSArICgnaW5zdGFuY2Ugb2YgYCcgKyBleHBlY3RlZENsYXNzTmFtZSArICdgLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRW51bVR5cGVDaGVja2VyKGV4cGVjdGVkVmFsdWVzKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShleHBlY3RlZFZhbHVlcykpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2YsIGV4cGVjdGVkIGFuIGluc3RhbmNlIG9mIGFycmF5LicpIDogdm9pZCAwO1xuICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHBlY3RlZFZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGlzKHByb3BWYWx1ZSwgZXhwZWN0ZWRWYWx1ZXNbaV0pKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBsb2NhdGlvbk5hbWUgPSBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl07XG4gICAgdmFyIHZhbHVlc1N0cmluZyA9IEpTT04uc3RyaW5naWZ5KGV4cGVjdGVkVmFsdWVzKTtcbiAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB2YWx1ZSBgJyArIHByb3BWYWx1ZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBvbmUgb2YgJyArIHZhbHVlc1N0cmluZyArICcuJykpO1xuICB9XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIodHlwZUNoZWNrZXIpIHtcbiAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdQcm9wZXJ0eSBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIGNvbXBvbmVudCBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCBoYXMgaW52YWxpZCBQcm9wVHlwZSBub3RhdGlvbiBpbnNpZGUgb2JqZWN0T2YuJyk7XG4gICAgfVxuICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGFuIG9iamVjdC4nKSk7XG4gICAgfVxuICAgIGZvciAodmFyIGtleSBpbiBwcm9wVmFsdWUpIHtcbiAgICAgIGlmIChwcm9wVmFsdWUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICB2YXIgZXJyb3IgPSB0eXBlQ2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVVbmlvblR5cGVDaGVja2VyKGFycmF5T2ZUeXBlQ2hlY2tlcnMpIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGFycmF5T2ZUeXBlQ2hlY2tlcnMpKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mVHlwZSwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgcmV0dXJuIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheU9mVHlwZUNoZWNrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICBpZiAoY2hlY2tlcihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBsb2NhdGlvbk5hbWUgPSBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl07XG4gICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agc3VwcGxpZWQgdG8gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AuJykpO1xuICB9XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU5vZGVDaGVja2VyKCkge1xuICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICBpZiAoIWlzTm9kZShwcm9wc1twcm9wTmFtZV0pKSB7XG4gICAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agc3VwcGxpZWQgdG8gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgUmVhY3ROb2RlLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlU2hhcGVUeXBlQ2hlY2tlcihzaGFwZVR5cGVzKSB7XG4gIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSBgJyArIHByb3BUeXBlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGBvYmplY3RgLicpKTtcbiAgICB9XG4gICAgZm9yICh2YXIga2V5IGluIHNoYXBlVHlwZXMpIHtcbiAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgaWYgKCFjaGVja2VyKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgdmFyIGVycm9yID0gY2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbn1cblxuZnVuY3Rpb24gaXNOb2RlKHByb3BWYWx1ZSkge1xuICBzd2l0Y2ggKHR5cGVvZiBwcm9wVmFsdWUpIHtcbiAgICBjYXNlICdudW1iZXInOlxuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgcmV0dXJuICFwcm9wVmFsdWU7XG4gICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIHByb3BWYWx1ZS5ldmVyeShpc05vZGUpO1xuICAgICAgfVxuICAgICAgaWYgKHByb3BWYWx1ZSA9PT0gbnVsbCB8fCBSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKHByb3BWYWx1ZSk7XG4gICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwocHJvcFZhbHVlKTtcbiAgICAgICAgdmFyIHN0ZXA7XG4gICAgICAgIGlmIChpdGVyYXRvckZuICE9PSBwcm9wVmFsdWUuZW50cmllcykge1xuICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgIGlmICghaXNOb2RlKHN0ZXAudmFsdWUpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gSXRlcmF0b3Igd2lsbCBwcm92aWRlIGVudHJ5IFtrLHZdIHR1cGxlcyByYXRoZXIgdGhhbiB2YWx1ZXMuXG4gICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgdmFyIGVudHJ5ID0gc3RlcC52YWx1ZTtcbiAgICAgICAgICAgIGlmIChlbnRyeSkge1xuICAgICAgICAgICAgICBpZiAoIWlzTm9kZShlbnRyeVsxXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc1N5bWJvbChwcm9wVHlwZSwgcHJvcFZhbHVlKSB7XG4gIC8vIE5hdGl2ZSBTeW1ib2wuXG4gIGlmIChwcm9wVHlwZSA9PT0gJ3N5bWJvbCcpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ10gPT09ICdTeW1ib2wnXG4gIGlmIChwcm9wVmFsdWVbJ0BAdG9TdHJpbmdUYWcnXSA9PT0gJ1N5bWJvbCcpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIEZhbGxiYWNrIGZvciBub24tc3BlYyBjb21wbGlhbnQgU3ltYm9scyB3aGljaCBhcmUgcG9seWZpbGxlZC5cbiAgaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgcHJvcFZhbHVlIGluc3RhbmNlb2YgU3ltYm9sKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8vIEVxdWl2YWxlbnQgb2YgYHR5cGVvZmAgYnV0IHdpdGggc3BlY2lhbCBoYW5kbGluZyBmb3IgYXJyYXkgYW5kIHJlZ2V4cC5cbmZ1bmN0aW9uIGdldFByb3BUeXBlKHByb3BWYWx1ZSkge1xuICB2YXIgcHJvcFR5cGUgPSB0eXBlb2YgcHJvcFZhbHVlO1xuICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgcmV0dXJuICdhcnJheSc7XG4gIH1cbiAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgIC8vIE9sZCB3ZWJraXRzIChhdCBsZWFzdCB1bnRpbCBBbmRyb2lkIDQuMCkgcmV0dXJuICdmdW5jdGlvbicgcmF0aGVyIHRoYW5cbiAgICAvLyAnb2JqZWN0JyBmb3IgdHlwZW9mIGEgUmVnRXhwLiBXZSdsbCBub3JtYWxpemUgdGhpcyBoZXJlIHNvIHRoYXQgL2JsYS9cbiAgICAvLyBwYXNzZXMgUHJvcFR5cGVzLm9iamVjdC5cbiAgICByZXR1cm4gJ29iamVjdCc7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHByb3BUeXBlLCBwcm9wVmFsdWUpKSB7XG4gICAgcmV0dXJuICdzeW1ib2wnO1xuICB9XG4gIHJldHVybiBwcm9wVHlwZTtcbn1cblxuLy8gVGhpcyBoYW5kbGVzIG1vcmUgdHlwZXMgdGhhbiBgZ2V0UHJvcFR5cGVgLiBPbmx5IHVzZWQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuLy8gU2VlIGBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcmAuXG5mdW5jdGlvbiBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpIHtcbiAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgaWYgKHByb3BUeXBlID09PSAnb2JqZWN0Jykge1xuICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICByZXR1cm4gJ2RhdGUnO1xuICAgIH0gZWxzZSBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICByZXR1cm4gJ3JlZ2V4cCc7XG4gICAgfVxuICB9XG4gIHJldHVybiBwcm9wVHlwZTtcbn1cblxuLy8gUmV0dXJucyBjbGFzcyBuYW1lIG9mIHRoZSBvYmplY3QsIGlmIGFueS5cbmZ1bmN0aW9uIGdldENsYXNzTmFtZShwcm9wVmFsdWUpIHtcbiAgaWYgKCFwcm9wVmFsdWUuY29uc3RydWN0b3IgfHwgIXByb3BWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lKSB7XG4gICAgcmV0dXJuIEFOT05ZTU9VUztcbiAgfVxuICByZXR1cm4gcHJvcFZhbHVlLmNvbnN0cnVjdG9yLm5hbWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RQcm9wVHlwZXM7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0UHJvcFR5cGVzU2VjcmV0XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSAnU0VDUkVUX0RPX05PVF9QQVNTX1RISVNfT1JfWU9VX1dJTExfQkVfRklSRUQnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UHJvcFR5cGVzU2VjcmV0OyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdFB1cmVDb21wb25lbnRcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgUmVhY3RDb21wb25lbnQgPSByZXF1aXJlKCcuL1JlYWN0Q29tcG9uZW50Jyk7XG52YXIgUmVhY3ROb29wVXBkYXRlUXVldWUgPSByZXF1aXJlKCcuL1JlYWN0Tm9vcFVwZGF0ZVF1ZXVlJyk7XG5cbnZhciBlbXB0eU9iamVjdCA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5T2JqZWN0Jyk7XG5cbi8qKlxuICogQmFzZSBjbGFzcyBoZWxwZXJzIGZvciB0aGUgdXBkYXRpbmcgc3RhdGUgb2YgYSBjb21wb25lbnQuXG4gKi9cbmZ1bmN0aW9uIFJlYWN0UHVyZUNvbXBvbmVudChwcm9wcywgY29udGV4dCwgdXBkYXRlcikge1xuICAvLyBEdXBsaWNhdGVkIGZyb20gUmVhY3RDb21wb25lbnQuXG4gIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgdGhpcy5yZWZzID0gZW1wdHlPYmplY3Q7XG4gIC8vIFdlIGluaXRpYWxpemUgdGhlIGRlZmF1bHQgdXBkYXRlciBidXQgdGhlIHJlYWwgb25lIGdldHMgaW5qZWN0ZWQgYnkgdGhlXG4gIC8vIHJlbmRlcmVyLlxuICB0aGlzLnVwZGF0ZXIgPSB1cGRhdGVyIHx8IFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlO1xufVxuXG5mdW5jdGlvbiBDb21wb25lbnREdW1teSgpIHt9XG5Db21wb25lbnREdW1teS5wcm90b3R5cGUgPSBSZWFjdENvbXBvbmVudC5wcm90b3R5cGU7XG5SZWFjdFB1cmVDb21wb25lbnQucHJvdG90eXBlID0gbmV3IENvbXBvbmVudER1bW15KCk7XG5SZWFjdFB1cmVDb21wb25lbnQucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmVhY3RQdXJlQ29tcG9uZW50O1xuLy8gQXZvaWQgYW4gZXh0cmEgcHJvdG90eXBlIGp1bXAgZm9yIHRoZXNlIG1ldGhvZHMuXG5fYXNzaWduKFJlYWN0UHVyZUNvbXBvbmVudC5wcm90b3R5cGUsIFJlYWN0Q29tcG9uZW50LnByb3RvdHlwZSk7XG5SZWFjdFB1cmVDb21wb25lbnQucHJvdG90eXBlLmlzUHVyZVJlYWN0Q29tcG9uZW50ID0gdHJ1ZTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFB1cmVDb21wb25lbnQ7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0VmVyc2lvblxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSAnMTUuMy4yJzsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgY2FuRGVmaW5lUHJvcGVydHlcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBjYW5EZWZpbmVQcm9wZXJ0eSA9IGZhbHNlO1xuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdHJ5IHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICd4JywgeyBnZXQ6IGZ1bmN0aW9uICgpIHt9IH0pO1xuICAgIGNhbkRlZmluZVByb3BlcnR5ID0gdHJ1ZTtcbiAgfSBjYXRjaCAoeCkge1xuICAgIC8vIElFIHdpbGwgZmFpbCBvbiBkZWZpbmVQcm9wZXJ0eVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2FuRGVmaW5lUHJvcGVydHk7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIGNoZWNrUmVhY3RUeXBlU3BlY1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9wcm9kSW52YXJpYW50ID0gcmVxdWlyZSgnLi9yZWFjdFByb2RJbnZhcmlhbnQnKTtcblxudmFyIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzID0gcmVxdWlyZSgnLi9SZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcycpO1xudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9SZWFjdFByb3BUeXBlc1NlY3JldCcpO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxudmFyIFJlYWN0Q29tcG9uZW50VHJlZUhvb2s7XG5cbmlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy5lbnYgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICd0ZXN0Jykge1xuICAvLyBUZW1wb3JhcnkgaGFjay5cbiAgLy8gSW5saW5lIHJlcXVpcmVzIGRvbid0IHdvcmsgd2VsbCB3aXRoIEplc3Q6XG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9pc3N1ZXMvNzI0MFxuICAvLyBSZW1vdmUgdGhlIGlubGluZSByZXF1aXJlcyB3aGVuIHdlIGRvbid0IG5lZWQgdGhlbSBhbnltb3JlOlxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvcHVsbC83MTc4XG4gIFJlYWN0Q29tcG9uZW50VHJlZUhvb2sgPSByZXF1aXJlKCcuL1JlYWN0Q29tcG9uZW50VHJlZUhvb2snKTtcbn1cblxudmFyIGxvZ2dlZFR5cGVGYWlsdXJlcyA9IHt9O1xuXG4vKipcbiAqIEFzc2VydCB0aGF0IHRoZSB2YWx1ZXMgbWF0Y2ggd2l0aCB0aGUgdHlwZSBzcGVjcy5cbiAqIEVycm9yIG1lc3NhZ2VzIGFyZSBtZW1vcml6ZWQgYW5kIHdpbGwgb25seSBiZSBzaG93biBvbmNlLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSB0eXBlU3BlY3MgTWFwIG9mIG5hbWUgdG8gYSBSZWFjdFByb3BUeXBlXG4gKiBAcGFyYW0ge29iamVjdH0gdmFsdWVzIFJ1bnRpbWUgdmFsdWVzIHRoYXQgbmVlZCB0byBiZSB0eXBlLWNoZWNrZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhdGlvbiBlLmcuIFwicHJvcFwiLCBcImNvbnRleHRcIiwgXCJjaGlsZCBjb250ZXh0XCJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnROYW1lIE5hbWUgb2YgdGhlIGNvbXBvbmVudCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4gKiBAcGFyYW0gez9vYmplY3R9IGVsZW1lbnQgVGhlIFJlYWN0IGVsZW1lbnQgdGhhdCBpcyBiZWluZyB0eXBlLWNoZWNrZWRcbiAqIEBwYXJhbSB7P251bWJlcn0gZGVidWdJRCBUaGUgUmVhY3QgY29tcG9uZW50IGluc3RhbmNlIHRoYXQgaXMgYmVpbmcgdHlwZS1jaGVja2VkXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjaGVja1JlYWN0VHlwZVNwZWModHlwZVNwZWNzLCB2YWx1ZXMsIGxvY2F0aW9uLCBjb21wb25lbnROYW1lLCBlbGVtZW50LCBkZWJ1Z0lEKSB7XG4gIGZvciAodmFyIHR5cGVTcGVjTmFtZSBpbiB0eXBlU3BlY3MpIHtcbiAgICBpZiAodHlwZVNwZWNzLmhhc093blByb3BlcnR5KHR5cGVTcGVjTmFtZSkpIHtcbiAgICAgIHZhciBlcnJvcjtcbiAgICAgIC8vIFByb3AgdHlwZSB2YWxpZGF0aW9uIG1heSB0aHJvdy4gSW4gY2FzZSB0aGV5IGRvLCB3ZSBkb24ndCB3YW50IHRvXG4gICAgICAvLyBmYWlsIHRoZSByZW5kZXIgcGhhc2Ugd2hlcmUgaXQgZGlkbid0IGZhaWwgYmVmb3JlLiBTbyB3ZSBsb2cgaXQuXG4gICAgICAvLyBBZnRlciB0aGVzZSBoYXZlIGJlZW4gY2xlYW5lZCB1cCwgd2UnbGwgbGV0IHRoZW0gdGhyb3cuXG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIGlzIGludGVudGlvbmFsbHkgYW4gaW52YXJpYW50IHRoYXQgZ2V0cyBjYXVnaHQuIEl0J3MgdGhlIHNhbWVcbiAgICAgICAgLy8gYmVoYXZpb3IgYXMgd2l0aG91dCB0aGlzIHN0YXRlbWVudCBleGNlcHQgd2l0aCBhIGJldHRlciBtZXNzYWdlLlxuICAgICAgICAhKHR5cGVvZiB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSA9PT0gJ2Z1bmN0aW9uJykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnJXM6ICVzIHR5cGUgYCVzYCBpcyBpbnZhbGlkOyBpdCBtdXN0IGJlIGEgZnVuY3Rpb24sIHVzdWFsbHkgZnJvbSBSZWFjdC5Qcm9wVHlwZXMuJywgY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnLCBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl0sIHR5cGVTcGVjTmFtZSkgOiBfcHJvZEludmFyaWFudCgnODQnLCBjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycsIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXSwgdHlwZVNwZWNOYW1lKSA6IHZvaWQgMDtcbiAgICAgICAgZXJyb3IgPSB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSh2YWx1ZXMsIHR5cGVTcGVjTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIG51bGwsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgIGVycm9yID0gZXg7XG4gICAgICB9XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyghZXJyb3IgfHwgZXJyb3IgaW5zdGFuY2VvZiBFcnJvciwgJyVzOiB0eXBlIHNwZWNpZmljYXRpb24gb2YgJXMgYCVzYCBpcyBpbnZhbGlkOyB0aGUgdHlwZSBjaGVja2VyICcgKyAnZnVuY3Rpb24gbXVzdCByZXR1cm4gYG51bGxgIG9yIGFuIGBFcnJvcmAgYnV0IHJldHVybmVkIGEgJXMuICcgKyAnWW91IG1heSBoYXZlIGZvcmdvdHRlbiB0byBwYXNzIGFuIGFyZ3VtZW50IHRvIHRoZSB0eXBlIGNoZWNrZXIgJyArICdjcmVhdG9yIChhcnJheU9mLCBpbnN0YW5jZU9mLCBvYmplY3RPZiwgb25lT2YsIG9uZU9mVHlwZSwgYW5kICcgKyAnc2hhcGUgYWxsIHJlcXVpcmUgYW4gYXJndW1lbnQpLicsIGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJywgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dLCB0eXBlU3BlY05hbWUsIHR5cGVvZiBlcnJvcikgOiB2b2lkIDA7XG4gICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiAhKGVycm9yLm1lc3NhZ2UgaW4gbG9nZ2VkVHlwZUZhaWx1cmVzKSkge1xuICAgICAgICAvLyBPbmx5IG1vbml0b3IgdGhpcyBmYWlsdXJlIG9uY2UgYmVjYXVzZSB0aGVyZSB0ZW5kcyB0byBiZSBhIGxvdCBvZiB0aGVcbiAgICAgICAgLy8gc2FtZSBlcnJvci5cbiAgICAgICAgbG9nZ2VkVHlwZUZhaWx1cmVzW2Vycm9yLm1lc3NhZ2VdID0gdHJ1ZTtcblxuICAgICAgICB2YXIgY29tcG9uZW50U3RhY2tJbmZvID0gJyc7XG5cbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICBpZiAoIVJlYWN0Q29tcG9uZW50VHJlZUhvb2spIHtcbiAgICAgICAgICAgIFJlYWN0Q29tcG9uZW50VHJlZUhvb2sgPSByZXF1aXJlKCcuL1JlYWN0Q29tcG9uZW50VHJlZUhvb2snKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGRlYnVnSUQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudFN0YWNrSW5mbyA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2suZ2V0U3RhY2tBZGRlbmR1bUJ5SUQoZGVidWdJRCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjb21wb25lbnRTdGFja0luZm8gPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldEN1cnJlbnRTdGFja0FkZGVuZHVtKGVsZW1lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnRmFpbGVkICVzIHR5cGU6ICVzJXMnLCBsb2NhdGlvbiwgZXJyb3IubWVzc2FnZSwgY29tcG9uZW50U3RhY2tJbmZvKSA6IHZvaWQgMDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjaGVja1JlYWN0VHlwZVNwZWM7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIGdldEl0ZXJhdG9yRm5cbiAqIFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyogZ2xvYmFsIFN5bWJvbCAqL1xuXG52YXIgSVRFUkFUT1JfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuaXRlcmF0b3I7XG52YXIgRkFVWF9JVEVSQVRPUl9TWU1CT0wgPSAnQEBpdGVyYXRvcic7IC8vIEJlZm9yZSBTeW1ib2wgc3BlYy5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBpdGVyYXRvciBtZXRob2QgZnVuY3Rpb24gY29udGFpbmVkIG9uIHRoZSBpdGVyYWJsZSBvYmplY3QuXG4gKlxuICogQmUgc3VyZSB0byBpbnZva2UgdGhlIGZ1bmN0aW9uIHdpdGggdGhlIGl0ZXJhYmxlIGFzIGNvbnRleHQ6XG4gKlxuICogICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihteUl0ZXJhYmxlKTtcbiAqICAgICBpZiAoaXRlcmF0b3JGbikge1xuICogICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKG15SXRlcmFibGUpO1xuICogICAgICAgLi4uXG4gKiAgICAgfVxuICpcbiAqIEBwYXJhbSB7P29iamVjdH0gbWF5YmVJdGVyYWJsZVxuICogQHJldHVybiB7P2Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBnZXRJdGVyYXRvckZuKG1heWJlSXRlcmFibGUpIHtcbiAgdmFyIGl0ZXJhdG9yRm4gPSBtYXliZUl0ZXJhYmxlICYmIChJVEVSQVRPUl9TWU1CT0wgJiYgbWF5YmVJdGVyYWJsZVtJVEVSQVRPUl9TWU1CT0xdIHx8IG1heWJlSXRlcmFibGVbRkFVWF9JVEVSQVRPUl9TWU1CT0xdKTtcbiAgaWYgKHR5cGVvZiBpdGVyYXRvckZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGl0ZXJhdG9yRm47XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRJdGVyYXRvckZuOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBvbmx5Q2hpbGRcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3Byb2RJbnZhcmlhbnQgPSByZXF1aXJlKCcuL3JlYWN0UHJvZEludmFyaWFudCcpO1xuXG52YXIgUmVhY3RFbGVtZW50ID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnQnKTtcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGZpcnN0IGNoaWxkIGluIGEgY29sbGVjdGlvbiBvZiBjaGlsZHJlbiBhbmQgdmVyaWZpZXMgdGhhdCB0aGVyZVxuICogaXMgb25seSBvbmUgY2hpbGQgaW4gdGhlIGNvbGxlY3Rpb24uXG4gKlxuICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvdG9wLWxldmVsLWFwaS5odG1sI3JlYWN0LmNoaWxkcmVuLm9ubHlcbiAqXG4gKiBUaGUgY3VycmVudCBpbXBsZW1lbnRhdGlvbiBvZiB0aGlzIGZ1bmN0aW9uIGFzc3VtZXMgdGhhdCBhIHNpbmdsZSBjaGlsZCBnZXRzXG4gKiBwYXNzZWQgd2l0aG91dCBhIHdyYXBwZXIsIGJ1dCB0aGUgcHVycG9zZSBvZiB0aGlzIGhlbHBlciBmdW5jdGlvbiBpcyB0b1xuICogYWJzdHJhY3QgYXdheSB0aGUgcGFydGljdWxhciBzdHJ1Y3R1cmUgb2YgY2hpbGRyZW4uXG4gKlxuICogQHBhcmFtIHs/b2JqZWN0fSBjaGlsZHJlbiBDaGlsZCBjb2xsZWN0aW9uIHN0cnVjdHVyZS5cbiAqIEByZXR1cm4ge1JlYWN0RWxlbWVudH0gVGhlIGZpcnN0IGFuZCBvbmx5IGBSZWFjdEVsZW1lbnRgIGNvbnRhaW5lZCBpbiB0aGVcbiAqIHN0cnVjdHVyZS5cbiAqL1xuZnVuY3Rpb24gb25seUNoaWxkKGNoaWxkcmVuKSB7XG4gICFSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQoY2hpbGRyZW4pID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0LkNoaWxkcmVuLm9ubHkgZXhwZWN0ZWQgdG8gcmVjZWl2ZSBhIHNpbmdsZSBSZWFjdCBlbGVtZW50IGNoaWxkLicpIDogX3Byb2RJbnZhcmlhbnQoJzE0MycpIDogdm9pZCAwO1xuICByZXR1cm4gY2hpbGRyZW47XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb25seUNoaWxkOyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgcmVhY3RQcm9kSW52YXJpYW50XG4gKiBcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFdBUk5JTkc6IERPIE5PVCBtYW51YWxseSByZXF1aXJlIHRoaXMgbW9kdWxlLlxuICogVGhpcyBpcyBhIHJlcGxhY2VtZW50IGZvciBgaW52YXJpYW50KC4uLilgIHVzZWQgYnkgdGhlIGVycm9yIGNvZGUgc3lzdGVtXG4gKiBhbmQgd2lsbCBfb25seV8gYmUgcmVxdWlyZWQgYnkgdGhlIGNvcnJlc3BvbmRpbmcgYmFiZWwgcGFzcy5cbiAqIEl0IGFsd2F5cyB0aHJvd3MuXG4gKi9cblxuZnVuY3Rpb24gcmVhY3RQcm9kSW52YXJpYW50KGNvZGUpIHtcbiAgdmFyIGFyZ0NvdW50ID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7XG5cbiAgdmFyIG1lc3NhZ2UgPSAnTWluaWZpZWQgUmVhY3QgZXJyb3IgIycgKyBjb2RlICsgJzsgdmlzaXQgJyArICdodHRwOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvZXJyb3ItZGVjb2Rlci5odG1sP2ludmFyaWFudD0nICsgY29kZTtcblxuICBmb3IgKHZhciBhcmdJZHggPSAwOyBhcmdJZHggPCBhcmdDb3VudDsgYXJnSWR4KyspIHtcbiAgICBtZXNzYWdlICs9ICcmYXJnc1tdPScgKyBlbmNvZGVVUklDb21wb25lbnQoYXJndW1lbnRzW2FyZ0lkeCArIDFdKTtcbiAgfVxuXG4gIG1lc3NhZ2UgKz0gJyBmb3IgdGhlIGZ1bGwgbWVzc2FnZSBvciB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQnICsgJyBmb3IgZnVsbCBlcnJvcnMgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nO1xuXG4gIHZhciBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgZXJyb3IubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IHJlYWN0UHJvZEludmFyaWFudCdzIG93biBmcmFtZVxuXG4gIHRocm93IGVycm9yO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlYWN0UHJvZEludmFyaWFudDsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgdHJhdmVyc2VBbGxDaGlsZHJlblxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9wcm9kSW52YXJpYW50ID0gcmVxdWlyZSgnLi9yZWFjdFByb2RJbnZhcmlhbnQnKTtcblxudmFyIFJlYWN0Q3VycmVudE93bmVyID0gcmVxdWlyZSgnLi9SZWFjdEN1cnJlbnRPd25lcicpO1xudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG5cbnZhciBnZXRJdGVyYXRvckZuID0gcmVxdWlyZSgnLi9nZXRJdGVyYXRvckZuJyk7XG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIgS2V5RXNjYXBlVXRpbHMgPSByZXF1aXJlKCcuL0tleUVzY2FwZVV0aWxzJyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxudmFyIFNFUEFSQVRPUiA9ICcuJztcbnZhciBTVUJTRVBBUkFUT1IgPSAnOic7XG5cbi8qKlxuICogVE9ETzogVGVzdCB0aGF0IGEgc2luZ2xlIGNoaWxkIGFuZCBhbiBhcnJheSB3aXRoIG9uZSBpdGVtIGhhdmUgdGhlIHNhbWUga2V5XG4gKiBwYXR0ZXJuLlxuICovXG5cbnZhciBkaWRXYXJuQWJvdXRNYXBzID0gZmFsc2U7XG5cbi8qKlxuICogR2VuZXJhdGUgYSBrZXkgc3RyaW5nIHRoYXQgaWRlbnRpZmllcyBhIGNvbXBvbmVudCB3aXRoaW4gYSBzZXQuXG4gKlxuICogQHBhcmFtIHsqfSBjb21wb25lbnQgQSBjb21wb25lbnQgdGhhdCBjb3VsZCBjb250YWluIGEgbWFudWFsIGtleS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBJbmRleCB0aGF0IGlzIHVzZWQgaWYgYSBtYW51YWwga2V5IGlzIG5vdCBwcm92aWRlZC5cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0Q29tcG9uZW50S2V5KGNvbXBvbmVudCwgaW5kZXgpIHtcbiAgLy8gRG8gc29tZSB0eXBlY2hlY2tpbmcgaGVyZSBzaW5jZSB3ZSBjYWxsIHRoaXMgYmxpbmRseS4gV2Ugd2FudCB0byBlbnN1cmVcbiAgLy8gdGhhdCB3ZSBkb24ndCBibG9jayBwb3RlbnRpYWwgZnV0dXJlIEVTIEFQSXMuXG4gIGlmIChjb21wb25lbnQgJiYgdHlwZW9mIGNvbXBvbmVudCA9PT0gJ29iamVjdCcgJiYgY29tcG9uZW50LmtleSAhPSBudWxsKSB7XG4gICAgLy8gRXhwbGljaXQga2V5XG4gICAgcmV0dXJuIEtleUVzY2FwZVV0aWxzLmVzY2FwZShjb21wb25lbnQua2V5KTtcbiAgfVxuICAvLyBJbXBsaWNpdCBrZXkgZGV0ZXJtaW5lZCBieSB0aGUgaW5kZXggaW4gdGhlIHNldFxuICByZXR1cm4gaW5kZXgudG9TdHJpbmcoMzYpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7Pyp9IGNoaWxkcmVuIENoaWxkcmVuIHRyZWUgY29udGFpbmVyLlxuICogQHBhcmFtIHshc3RyaW5nfSBuYW1lU29GYXIgTmFtZSBvZiB0aGUga2V5IHBhdGggc28gZmFyLlxuICogQHBhcmFtIHshZnVuY3Rpb259IGNhbGxiYWNrIENhbGxiYWNrIHRvIGludm9rZSB3aXRoIGVhY2ggY2hpbGQgZm91bmQuXG4gKiBAcGFyYW0gez8qfSB0cmF2ZXJzZUNvbnRleHQgVXNlZCB0byBwYXNzIGluZm9ybWF0aW9uIHRocm91Z2hvdXQgdGhlIHRyYXZlcnNhbFxuICogcHJvY2Vzcy5cbiAqIEByZXR1cm4geyFudW1iZXJ9IFRoZSBudW1iZXIgb2YgY2hpbGRyZW4gaW4gdGhpcyBzdWJ0cmVlLlxuICovXG5mdW5jdGlvbiB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZHJlbiwgbmFtZVNvRmFyLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIGNoaWxkcmVuO1xuXG4gIGlmICh0eXBlID09PSAndW5kZWZpbmVkJyB8fCB0eXBlID09PSAnYm9vbGVhbicpIHtcbiAgICAvLyBBbGwgb2YgdGhlIGFib3ZlIGFyZSBwZXJjZWl2ZWQgYXMgbnVsbC5cbiAgICBjaGlsZHJlbiA9IG51bGw7XG4gIH1cblxuICBpZiAoY2hpbGRyZW4gPT09IG51bGwgfHwgdHlwZSA9PT0gJ3N0cmluZycgfHwgdHlwZSA9PT0gJ251bWJlcicgfHwgUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KGNoaWxkcmVuKSkge1xuICAgIGNhbGxiYWNrKHRyYXZlcnNlQ29udGV4dCwgY2hpbGRyZW4sXG4gICAgLy8gSWYgaXQncyB0aGUgb25seSBjaGlsZCwgdHJlYXQgdGhlIG5hbWUgYXMgaWYgaXQgd2FzIHdyYXBwZWQgaW4gYW4gYXJyYXlcbiAgICAvLyBzbyB0aGF0IGl0J3MgY29uc2lzdGVudCBpZiB0aGUgbnVtYmVyIG9mIGNoaWxkcmVuIGdyb3dzLlxuICAgIG5hbWVTb0ZhciA9PT0gJycgPyBTRVBBUkFUT1IgKyBnZXRDb21wb25lbnRLZXkoY2hpbGRyZW4sIDApIDogbmFtZVNvRmFyKTtcbiAgICByZXR1cm4gMTtcbiAgfVxuXG4gIHZhciBjaGlsZDtcbiAgdmFyIG5leHROYW1lO1xuICB2YXIgc3VidHJlZUNvdW50ID0gMDsgLy8gQ291bnQgb2YgY2hpbGRyZW4gZm91bmQgaW4gdGhlIGN1cnJlbnQgc3VidHJlZS5cbiAgdmFyIG5leHROYW1lUHJlZml4ID0gbmFtZVNvRmFyID09PSAnJyA/IFNFUEFSQVRPUiA6IG5hbWVTb0ZhciArIFNVQlNFUEFSQVRPUjtcblxuICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZHJlbikpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGlsZCA9IGNoaWxkcmVuW2ldO1xuICAgICAgbmV4dE5hbWUgPSBuZXh0TmFtZVByZWZpeCArIGdldENvbXBvbmVudEtleShjaGlsZCwgaSk7XG4gICAgICBzdWJ0cmVlQ291bnQgKz0gdHJhdmVyc2VBbGxDaGlsZHJlbkltcGwoY2hpbGQsIG5leHROYW1lLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKGNoaWxkcmVuKTtcbiAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKGNoaWxkcmVuKTtcbiAgICAgIHZhciBzdGVwO1xuICAgICAgaWYgKGl0ZXJhdG9yRm4gIT09IGNoaWxkcmVuLmVudHJpZXMpIHtcbiAgICAgICAgdmFyIGlpID0gMDtcbiAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgIGNoaWxkID0gc3RlcC52YWx1ZTtcbiAgICAgICAgICBuZXh0TmFtZSA9IG5leHROYW1lUHJlZml4ICsgZ2V0Q29tcG9uZW50S2V5KGNoaWxkLCBpaSsrKTtcbiAgICAgICAgICBzdWJ0cmVlQ291bnQgKz0gdHJhdmVyc2VBbGxDaGlsZHJlbkltcGwoY2hpbGQsIG5leHROYW1lLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICB2YXIgbWFwc0FzQ2hpbGRyZW5BZGRlbmR1bSA9ICcnO1xuICAgICAgICAgIGlmIChSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50KSB7XG4gICAgICAgICAgICB2YXIgbWFwc0FzQ2hpbGRyZW5Pd25lck5hbWUgPSBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50LmdldE5hbWUoKTtcbiAgICAgICAgICAgIGlmIChtYXBzQXNDaGlsZHJlbk93bmVyTmFtZSkge1xuICAgICAgICAgICAgICBtYXBzQXNDaGlsZHJlbkFkZGVuZHVtID0gJyBDaGVjayB0aGUgcmVuZGVyIG1ldGhvZCBvZiBgJyArIG1hcHNBc0NoaWxkcmVuT3duZXJOYW1lICsgJ2AuJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZGlkV2FybkFib3V0TWFwcywgJ1VzaW5nIE1hcHMgYXMgY2hpbGRyZW4gaXMgbm90IHlldCBmdWxseSBzdXBwb3J0ZWQuIEl0IGlzIGFuICcgKyAnZXhwZXJpbWVudGFsIGZlYXR1cmUgdGhhdCBtaWdodCBiZSByZW1vdmVkLiBDb252ZXJ0IGl0IHRvIGEgJyArICdzZXF1ZW5jZSAvIGl0ZXJhYmxlIG9mIGtleWVkIFJlYWN0RWxlbWVudHMgaW5zdGVhZC4lcycsIG1hcHNBc0NoaWxkcmVuQWRkZW5kdW0pIDogdm9pZCAwO1xuICAgICAgICAgIGRpZFdhcm5BYm91dE1hcHMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vIEl0ZXJhdG9yIHdpbGwgcHJvdmlkZSBlbnRyeSBbayx2XSB0dXBsZXMgcmF0aGVyIHRoYW4gdmFsdWVzLlxuICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgdmFyIGVudHJ5ID0gc3RlcC52YWx1ZTtcbiAgICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgIGNoaWxkID0gZW50cnlbMV07XG4gICAgICAgICAgICBuZXh0TmFtZSA9IG5leHROYW1lUHJlZml4ICsgS2V5RXNjYXBlVXRpbHMuZXNjYXBlKGVudHJ5WzBdKSArIFNVQlNFUEFSQVRPUiArIGdldENvbXBvbmVudEtleShjaGlsZCwgMCk7XG4gICAgICAgICAgICBzdWJ0cmVlQ291bnQgKz0gdHJhdmVyc2VBbGxDaGlsZHJlbkltcGwoY2hpbGQsIG5leHROYW1lLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICB2YXIgYWRkZW5kdW0gPSAnJztcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGFkZGVuZHVtID0gJyBJZiB5b3UgbWVhbnQgdG8gcmVuZGVyIGEgY29sbGVjdGlvbiBvZiBjaGlsZHJlbiwgdXNlIGFuIGFycmF5ICcgKyAnaW5zdGVhZCBvciB3cmFwIHRoZSBvYmplY3QgdXNpbmcgY3JlYXRlRnJhZ21lbnQob2JqZWN0KSBmcm9tIHRoZSAnICsgJ1JlYWN0IGFkZC1vbnMuJztcbiAgICAgICAgaWYgKGNoaWxkcmVuLl9pc1JlYWN0RWxlbWVudCkge1xuICAgICAgICAgIGFkZGVuZHVtID0gJyBJdCBsb29rcyBsaWtlIHlvdVxcJ3JlIHVzaW5nIGFuIGVsZW1lbnQgY3JlYXRlZCBieSBhIGRpZmZlcmVudCAnICsgJ3ZlcnNpb24gb2YgUmVhY3QuIE1ha2Ugc3VyZSB0byB1c2Ugb25seSBvbmUgY29weSBvZiBSZWFjdC4nO1xuICAgICAgICB9XG4gICAgICAgIGlmIChSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50KSB7XG4gICAgICAgICAgdmFyIG5hbWUgPSBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50LmdldE5hbWUoKTtcbiAgICAgICAgICBpZiAobmFtZSkge1xuICAgICAgICAgICAgYWRkZW5kdW0gKz0gJyBDaGVjayB0aGUgcmVuZGVyIG1ldGhvZCBvZiBgJyArIG5hbWUgKyAnYC4nO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIGNoaWxkcmVuU3RyaW5nID0gU3RyaW5nKGNoaWxkcmVuKTtcbiAgICAgICFmYWxzZSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdPYmplY3RzIGFyZSBub3QgdmFsaWQgYXMgYSBSZWFjdCBjaGlsZCAoZm91bmQ6ICVzKS4lcycsIGNoaWxkcmVuU3RyaW5nID09PSAnW29iamVjdCBPYmplY3RdJyA/ICdvYmplY3Qgd2l0aCBrZXlzIHsnICsgT2JqZWN0LmtleXMoY2hpbGRyZW4pLmpvaW4oJywgJykgKyAnfScgOiBjaGlsZHJlblN0cmluZywgYWRkZW5kdW0pIDogX3Byb2RJbnZhcmlhbnQoJzMxJywgY2hpbGRyZW5TdHJpbmcgPT09ICdbb2JqZWN0IE9iamVjdF0nID8gJ29iamVjdCB3aXRoIGtleXMgeycgKyBPYmplY3Qua2V5cyhjaGlsZHJlbikuam9pbignLCAnKSArICd9JyA6IGNoaWxkcmVuU3RyaW5nLCBhZGRlbmR1bSkgOiB2b2lkIDA7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHN1YnRyZWVDb3VudDtcbn1cblxuLyoqXG4gKiBUcmF2ZXJzZXMgY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gLCBidXRcbiAqIG1pZ2h0IGFsc28gYmUgc3BlY2lmaWVkIHRocm91Z2ggYXR0cmlidXRlczpcbiAqXG4gKiAtIGB0cmF2ZXJzZUFsbENoaWxkcmVuKHRoaXMucHJvcHMuY2hpbGRyZW4sIC4uLilgXG4gKiAtIGB0cmF2ZXJzZUFsbENoaWxkcmVuKHRoaXMucHJvcHMubGVmdFBhbmVsQ2hpbGRyZW4sIC4uLilgXG4gKlxuICogVGhlIGB0cmF2ZXJzZUNvbnRleHRgIGlzIGFuIG9wdGlvbmFsIGFyZ3VtZW50IHRoYXQgaXMgcGFzc2VkIHRocm91Z2ggdGhlXG4gKiBlbnRpcmUgdHJhdmVyc2FsLiBJdCBjYW4gYmUgdXNlZCB0byBzdG9yZSBhY2N1bXVsYXRpb25zIG9yIGFueXRoaW5nIGVsc2UgdGhhdFxuICogdGhlIGNhbGxiYWNrIG1pZ2h0IGZpbmQgcmVsZXZhbnQuXG4gKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBvYmplY3QuXG4gKiBAcGFyYW0geyFmdW5jdGlvbn0gY2FsbGJhY2sgVG8gaW52b2tlIHVwb24gdHJhdmVyc2luZyBlYWNoIGNoaWxkLlxuICogQHBhcmFtIHs/Kn0gdHJhdmVyc2VDb250ZXh0IENvbnRleHQgZm9yIHRyYXZlcnNhbC5cbiAqIEByZXR1cm4geyFudW1iZXJ9IFRoZSBudW1iZXIgb2YgY2hpbGRyZW4gaW4gdGhpcyBzdWJ0cmVlLlxuICovXG5mdW5jdGlvbiB0cmF2ZXJzZUFsbENoaWxkcmVuKGNoaWxkcmVuLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KSB7XG4gIGlmIChjaGlsZHJlbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICByZXR1cm4gdHJhdmVyc2VBbGxDaGlsZHJlbkltcGwoY2hpbGRyZW4sICcnLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0cmF2ZXJzZUFsbENoaWxkcmVuOyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9SZWFjdCcpO1xuIiwiLyogID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgcm9vbS5qc1xuXG4gICAgQ29udmVydHMgYWxsIHRoZSBjb21wb25lbnRzIGluIHRoaXMgZmlsZSBpbnRvIEphdmFzY3JpcHRcbiAgICBBbGwgdGhlIC5qc3ggZmlsZXMgYXJlIGdpdmVuIGluIHZpZXdzIGRpcmVjdG9yeVxuICAgIFxuICAgIEJyb3dzZXJpZnkvV2F0Y2hpZnkgYWxsb3dzIHRoZSAncmVxdWlyZScgZnVuY3Rpb24gdG8gYmUgdXNlZCBvbiB0aGUgQ2xpZW50IFNpZGUuXG4gICAgXG5cdHdhdGNoaWZ5IC4vcHVibGljL2Jyb3dzZXJpZnkvcm9vbS5qcyAtbyAuL3B1YmxpYy9idW5kbGVzL3Jvb21CdW5kbGUuanMgLXQgWyBiYWJlbGlmeSAtLXByZXNldHMgWyBlczIwMTUgcmVhY3QgXSBdIC0tZXh0ZW5zaW9uPS5qc3ggLXZcblx0YnJvd3NlcmlmeSAuL3B1YmxpYy9icm93c2VyaWZ5L3Jvb20uanMgLW8gLi9wdWJsaWMvYnVuZGxlcy9yb29tQnVuZGxlLmpzIC10IFsgYmFiZWxpZnkgLS1wcmVzZXRzIFsgZXMyMDE1IHJlYWN0IF0gXSAtLWV4dGVuc2lvbj0uanN4IC12XG5cbiAgICBQdXQgdGhpcyBhdCB0aGUgYm90dG9tIG9mIHRoZSBIVE1MIGZpbGUuIEF0IHRoZSBiZWdpbm5pbmcgb2YgYWxsIHRoZSBzY3JpcHRzIGluIHJvb21JbmRleC5qc3hcbiAgICA8c2NyaXB0IHNyYz1cIi9idW5kbGVzL3Jvb21CdW5kbGUuanNcIj48L3NjcmlwdD5cbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xudmFyIFJvb21Db21wb25lbnQgPSByZXF1aXJlKCcuLy4uLy4uL3ZpZXdzL1Jvb20uanN4Jyk7XG5cbi8vIFJlYWRzIHRoZSBodG1sIG9mIHRoZSByb29tLXByb3BzIHNjcmlwdCwgd2hpY2ggd2FzIGluamVjdGVkIGRhdGEgZnJvbSB0aGUgc2VydmVyIHNpZGVcbnZhciBwcm9wU3RyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb29tLXByb3BzXCIpLmlubmVySFRNTDtcbmNvbnNvbGUubG9nKFwiUHJvcHMgc2VudCBmcm9tIFNlcnZlciBpbiBTdHJpbmcgZm9ybVwiKTtcbmNvbnNvbGUubG9nKHByb3BTdHIpO1xubGV0IHByb3BzID0gSlNPTi5wYXJzZShwcm9wU3RyKTtcbmNvbnNvbGUubG9nKFwiUHJvcHMgY29udmVydGVkIGludG8gSlNPTjpcIik7XG5jb25zb2xlLmxvZyhwcm9wcyk7XG5SZWFjdERPTS5yZW5kZXIoPFJvb21Db21wb25lbnQgcm9vbT17cHJvcHMucm9vbX0gdXNlcj17cHJvcHMudXNlcn0gZXhwbG9yZT17cHJvcHMuZXhwbG9yZX0gbXlQbGF5bGlzdHM9e3Byb3BzLm15UGxheWxpc3RzfSAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb20nKSk7ICBcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBVc2VyTGlzdEVudHJ5ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBvbmxpbmU6IHRoaXMucHJvcHMub25saW5lLFxuICAgICAgbW9kZXJhdG9yOiB0aGlzLnByb3BzLm1vZGVyYXRvcixcbiAgICAgIHN5bmNpbmc6IHRoaXMucHJvcHMuc3luY2luZ1xuICAgIH1cbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgbmFtZSA9IHRoaXMucHJvcHMudXNlck5hbWU7XG4gICAgdmFyIG9ubGluZSA9IHRoaXMuc3RhdGUub25saW5lO1xuICAgIHZhciBtb2RlcmF0b3IgPSB0aGlzLnN0YXRlLm1vZGVyYXRvcjtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8bGk+XG4gICAgICAgICAge1xuICAgICAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICAgICAgaWYob25saW5lKSByZXR1cm4gPGkgY2xhc3NOYW1lPVwiZmEgZmEtY2lyY2xlIHN0YXR1cyBzdGF0dXMtb25saW5lXCI+PC9pPlxuICAgICAgICAgICAgICBlbHNlIHJldHVybiA8aSBjbGFzc05hbWU9XCJmYSBmYS1jaXJjbGUgc3RhdHVzIHN0YXR1cy1vZmZsaW5lXCI+PC9pPlxuICAgICAgICAgICAgfSkoKVxuICAgICAgICAgIH1cbiAgICAgICAgICA8YSBjbGFzc05hbWU9XCJ1c2VyLW5hbWVcIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+e25hbWV9PC9hPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidXNlcnMtbGlzdC1lZGl0XCI+PGEgY2xhc3NOYW1lPVwiaWNvbi1idG5cIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtc3RhciBmYS1mdyBtb2QtdG9nZ2xlXCI+PC9pPjwvYT48YSBjbGFzc05hbWU9XCJpY29uLWJ0blwiIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXRhcmdldD1cIiNraWNrLWNvbmZpcm1cIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtcmVtb3ZlIGZhLWZ3XCI+PC9pPjwvYT48L2Rpdj5cbiAgICAgICAgICB7LyogPGRpdiBjbGFzc05hbWU9XCJ1c2Vycy1saXN0LWljb25zXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtcmVmcmVzaCBmYS1zcGluIGZhLWZ3XCIgZGF0YS10b2dnbGU9XCJ0b29sdGlwXCIgdGl0bGU9XCJTeW5jaW5nXCI+PC9pPjxpIGNsYXNzTmFtZT1cImZhIGZhLXN0YXIgZmEtZndcIiBkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIiB0aXRsZT1cIk1vZGVyYXRvclwiPjwvaT48L2Rpdj4gKi99XG4gICAgICAgIDwvbGk+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn0pO1xuXG52YXIgVXNlckxpc3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cbiAgICAvLyB2YXIgb25saW5lVXNlcnMgPSBbXG4gICAgLy8gICBcIkdlcmFyZCBMaXVcIixcbiAgICAvLyAgIFwiUmFuZHkgVHJ1b25nXCIsXG4gICAgLy8gICBcIktldmluIENoaWFvXCIsXG4gICAgLy8gICBcIkhhcnJpc29uIEZvcmRcIlxuICAgIC8vIF07XG5cbiAgICAvLyB2YXIgb2ZmbGluZVVzZXJzID0gW1xuICAgIC8vICAgXCJNaW5uYWwgS3VubmFuXCIsXG4gICAgLy8gICBcIkphc29uIE1hcnluZVwiLFxuICAgIC8vICAgXCJFcmljIERpZXVcIixcbiAgICAvLyAgIFwiS2V2aW4gVG9uXCIsXG4gICAgLy8gICBcIktyaXMgTHVvbmdcIixcbiAgICAvLyAgIFwiRnJhbmt5IE5ndXllblwiLFxuICAgIC8vICAgXCJBZHJpYW4gTWFuZGVlXCIsXG4gICAgLy8gICBcIkpheSBZZWVcIixcbiAgICAvLyAgIFwiR2VvcmdlIEh1YW5nXCIsXG4gICAgLy8gICBcIkplbGx5IEtpZFwiLFxuICAgIC8vICAgXCJGaW5uIEh1bWFuXCJcbiAgICAvLyBdO1xuXG4gICAgdmFyIG9ubGluZVVzZXJFbnRyaWVzID0gW11cbiAgICB2YXIgb2ZmbGluZVVzZXJFbnRyaWVzID0gW11cblxuICAgIGZvciAodmFyIGkgaW4gdGhpcy5wcm9wcy51c2VyTGlzdCkge1xuICAgICAgb25saW5lVXNlckVudHJpZXMucHVzaCg8VXNlckxpc3RFbnRyeSBrZXk9e2l9IHVzZXJOYW1lPXt0aGlzLnByb3BzLnVzZXJMaXN0W2ldfSBvbmxpbmU9e3RydWV9Lz4pXG4gICAgfVxuXG4gICAgLy8gZm9yKHZhciBpID0gMDsgaSA8IHRoaXMuc3RhdGUudXNlckxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAvLyAgIG9ubGluZVVzZXJFbnRyaWVzLnB1c2goPFVzZXJMaXN0RW50cnkga2V5PXtpfSB1c2VyTmFtZT17b25saW5lVXNlcnNbaV19IG9ubGluZT17dHJ1ZX0vPilcbiAgICAvLyB9XG4gICAgLy8gZm9yKHZhciBpID0gMDsgaSA8IG9mZmxpbmVVc2Vycy5sZW5ndGg7IGkrKykge1xuICAgIC8vICAgb2ZmbGluZVVzZXJFbnRyaWVzLnB1c2goPFVzZXJMaXN0RW50cnkga2V5PXtpfSB1c2VyTmFtZT17b2ZmbGluZVVzZXJzW2ldfSBvbmxpbmU9e2ZhbHNlfS8+KVxuICAgIC8vIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8ZGl2IGlkPVwidXNlcnMtbGlzdC1jb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInVzZXJzLWxpc3QtY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInVzZXJzLWxpc3QtaGVhZGVyIHVzZXJzLW9ubGluZS1zZWN0aW9uXCI+XG4gICAgICAgICAgICAgIE1lbWJlcnNcbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1zbSBidG4tc2Vjb25kYXJ5IHVzZXJzLWxpc3QtZWRpdC1idG5cIj48aSBjbGFzc05hbWU9XCJmYSBmYS1nZWFyXCIgaWQ9XCJ1c2Vycy1saXN0LWdlYXItaWNvblwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ1c2Vycy1saXN0LXNjcm9sbC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cInVzZXJzLWxpc3RcIj5cbiAgICAgICAgICAgICAgICB7b25saW5lVXNlckVudHJpZXN9XG4gICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJ1c2Vycy1saXN0IHVzZXJzLWxpc3Qtc2VjdGlvbiB1c2Vycy1vZmZsaW5lLXNlY3Rpb25cIj5cbiAgICAgICAgICAgICAgICB7b2ZmbGluZVVzZXJFbnRyaWVzfVxuICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInVzZXJzLWxpc3QgdXNlcnMtbGlzdC1zZWN0aW9uIHVzZXJzLWxpc3QtYWRkXCI+PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1zbSBidG4tc2Vjb25kYXJ5XCIgZGF0YS10b2dnbGU9XCJtb2RhbFwiIGRhdGEtdGFyZ2V0PVwiI2FkZC11c2VyXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtcGx1cyBmYS1md1wiPjwvaT5BZGQgUGVvcGxlPC9idXR0b24+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59KTtcblxudmFyIENoYXRIZWFkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVzZXJMaXN0OiB7fVxuICAgIH07XG4gIH0sXG5cbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgIHNvY2tldC5vbihcIkZyb20gU2VydmVyOiBFZGl0IFVzZXIgbGlzdFwiLCB0aGlzLmVkaXRVc2VyTGlzdCk7XG4gIH0sXG5cbiAgZWRpdFVzZXJMaXN0OiBmdW5jdGlvbihuZXdVc2VyTGlzdCkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyB1c2VyTGlzdDogbmV3VXNlckxpc3QgfSk7XG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgcm9vbU5hbWUgPSBcIlwiO1xuICAgIGlmICh0aGlzLnByb3BzLnJvb20gIT09IHVuZGVmaW5lZCAmJiB0aGlzLnByb3BzLnJvb20gIT09IG51bGwpIHtcbiAgICAgIHJvb21OYW1lID0gdGhpcy5wcm9wcy5yb29tLm5hbWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm9vbS1oZWFkZXJcIj5cbiAgICAgICAgey8qXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm9vbS1uYW1lIG9uY2xpY2stZWRpdFwiPlxuICAgICAgICAgIFxuICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImljb24tYnRuLWRhcmtcIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtZWRpdFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT48L2E+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICAqL31cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvb20tbmFtZVwiPlxuICAgICAgICAgIHtyb29tTmFtZX1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ1c2Vycy1idG5cIj5cbiAgICAgICAgICB7T2JqZWN0LmtleXModGhpcy5zdGF0ZS51c2VyTGlzdCkubGVuZ3RofVxuICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLXVzZXJzIHVzZXJzLWJ0bi1pY29uXCI+PC9pPlxuICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWNpcmNsZSBzdGF0dXMgc3RhdHVzLW9ubGluZVwiPjwvaT5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPFVzZXJMaXN0IHVzZXJMaXN0PXt0aGlzLnN0YXRlLnVzZXJMaXN0fSAvPlxuXG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn0pO1xuXG52YXIgQ2hhdE1lc3NhZ2UgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG93bmVyOiB0aGlzLnByb3BzLm93bmVyLFxuICAgICAgbWVzc2FnZTogdGhpcy5wcm9wcy5tZXNzYWdlLFxuICAgICAgdXNlcm5hbWU6IHRoaXMucHJvcHMudXNlcm5hbWVcbiAgICB9XG4gIH0sXG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgJCh0aGlzLm1zZykudG9vbHRpcCgpO1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIHtcbiAgICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgICAgaWYodGhpcy5zdGF0ZS5vd25lcikge1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2hhdC1tc2ctdXNlclwiPlxuICAgICAgICAgICAgICAgICAgey8qIFRPRE86IHRpbWVzdGFtcCBtdXN0IGJlIGltcGxlbWVudGVkIGludG8gdGl0bGUgKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1zZ1wiIHJlZj17KHJlZikgPT4gdGhpcy5tc2cgPSByZWZ9IGRhdGEtdG9nZ2xlPVwidG9vbHRpcFwiIGRhdGEtcGxhY2VtZW50PVwibGVmdFwiIHRpdGxlPVwiNDoyMHBtXCI+e3RoaXMuc3RhdGUubWVzc2FnZX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2hhdC1tc2dcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmFtZVwiPnt0aGlzLnN0YXRlLnVzZXJuYW1lfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgey8qIFRPRE86IHRpbWVzdGFtcCBtdXN0IGJlIGltcGxlbWVudGVkIGludG8gdGl0bGUgKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1zZ1wiIHJlZj17KHJlZikgPT4gdGhpcy5tc2cgPSByZWZ9IGRhdGEtdG9nZ2xlPVwidG9vbHRpcFwiIGRhdGEtcGxhY2VtZW50PVwicmlnaHRcIiB0aXRsZT1cIjQ6MjBwbVwiPnt0aGlzLnN0YXRlLm1lc3NhZ2V9PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzTmFtZT1cInByb2ZpbGUtcGljXCIgc3JjPVwiaW1hZ2VzL3Byb2ZpbGUtcGljLnBuZ1wiLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pKClcbiAgICAgICAgfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbnZhciBDaGF0VXNlckFjdGl2aXR5TWVzc2FnZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAge1xuICAgICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2godGhpcy5wcm9wcy5hY3Rpdml0eSkge1xuICAgICAgICAgICAgICBjYXNlIFwiam9pbmVkXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiY2hhdC1ub3RpZlwiPnt0aGlzLnByb3BzLnVzZXJuYW1lfSBoYXMgam9pbmVkIHRoZSBjaGF0LjwvZGl2PlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIFwiZGlzY29ubmVjdGVkXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiY2hhdC1ub3RpZlwiPnt0aGlzLnByb3BzLnVzZXJuYW1lfSBoYXMgbGVmdCB0aGUgY2hhdC48L2Rpdj5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgKSgpXG4gICAgICAgIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG52YXIgQ2hhdERpc3BsYXkgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1lc3NhZ2VzOiBbXVxuICAgIH1cbiAgfSxcbiAgYXV0b3Njcm9sbDogdHJ1ZSxcbiAgc2Nyb2xsVG9Cb3R0b206IGZ1bmN0aW9uKCkge1xuICAgIC8vIHRoaXMuY2hhdC5zY3JvbGxUb3AgPSB0aGlzLmNoYXQuc2Nyb2xsSGVpZ2h0O1xuICAgICQuZ2V0U2NyaXB0KFwianMvanF1ZXJ5Lm1DdXN0b21TY3JvbGxiYXIuY29uY2F0Lm1pbi5qc1wiLCBmdW5jdGlvbigpe1xuICAgICAgJCgnLmNoYXQnKS5tQ3VzdG9tU2Nyb2xsYmFyKCdzY3JvbGxUbycsJ2JvdHRvbScse3Njcm9sbEluZXJ0aWE6MjAwfSk7XG4gICAgfSk7XG4gIH0sXG4gIHVzZXJIYXNKb2luZWQ6IGZ1bmN0aW9uKHVzZXIpIHtcbiAgICAgIHZhciBtZXNzYWdlcyA9IHRoaXMuc3RhdGUubWVzc2FnZXNcbiAgICAgIG1lc3NhZ2VzLnB1c2goPENoYXRVc2VyQWN0aXZpdHlNZXNzYWdlIGtleT17dGhpcy5zdGF0ZS5tZXNzYWdlcy5sZW5ndGh9IHVzZXJuYW1lPXt1c2VyLnVzZXJuYW1lfSBhY3Rpdml0eT17XCJqb2luZWRcIn0gLz4pXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbWVzc2FnZXM6IG1lc3NhZ2VzXG4gICAgICB9KTtcbiAgfSxcbiAgdXNlckhhc0Rpc2Nvbm5lY3RlZDogZnVuY3Rpb24odXNlcikge1xuICAgICAgdmFyIG1lc3NhZ2VzID0gdGhpcy5zdGF0ZS5tZXNzYWdlc1xuICAgICAgbWVzc2FnZXMucHVzaCg8Q2hhdFVzZXJBY3Rpdml0eU1lc3NhZ2Uga2V5PXt0aGlzLnN0YXRlLm1lc3NhZ2VzLmxlbmd0aH0gdXNlcm5hbWU9e3VzZXIudXNlcm5hbWV9IGFjdGl2aXR5PXtcImRpc2Nvbm5lY3RlZFwifSAvPilcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBtZXNzYWdlczogbWVzc2FnZXNcbiAgICAgIH0pO1xuICB9LFxuICBuZXdNZXNzYWdlOiBmdW5jdGlvbihtc2cpIHtcbiAgICAgIHZhciBpc093bmVyID0gdGhpcy5wcm9wcy51c2VybmFtZSA9PT0gbXNnLnVzZXJuYW1lO1xuICAgICAgdmFyIG1lc3NhZ2VzID0gdGhpcy5zdGF0ZS5tZXNzYWdlc1xuICAgICAgbWVzc2FnZXMucHVzaCg8Q2hhdE1lc3NhZ2Uga2V5PXt0aGlzLnN0YXRlLm1lc3NhZ2VzLmxlbmd0aH0gdXNlcm5hbWU9e21zZy51c2VybmFtZX0gb3duZXI9e2lzT3duZXJ9IG1lc3NhZ2U9e21zZy5tZXNzYWdlfSAvPilcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBtZXNzYWdlczogbWVzc2FnZXNcbiAgICAgIH0pO1xuICB9LFxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgc29ja2V0Lm9uKFwiRnJvbSBTZXJ2ZXI6IFVzZXIgam9pbmVkXCIsIHRoaXMudXNlckhhc0pvaW5lZCk7XG4gICAgc29ja2V0Lm9uKCdGcm9tIFNlcnZlcjogVXNlciBkaXNjb25uZWN0ZWQnLCB0aGlzLnVzZXJIYXNEaXNjb25uZWN0ZWQpO1xuICAgIHNvY2tldC5vbignRnJvbSBTZXJ2ZXI6IENoYXQgbWVzc2FnZScsIHRoaXMubmV3TWVzc2FnZSk7XG5cbiAgICB0aGlzLnNjcm9sbFRvQm90dG9tKCk7XG4gIH0sXG4gIGNvbXBvbmVudFdpbGxVcGRhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpc0F0UmVjZW50TWVzc2FnZXMgPSB0aGlzLmNoYXQuc2Nyb2xsVG9wID09ICh0aGlzLmNoYXQuc2Nyb2xsSGVpZ2h0IC0gdGhpcy5jaGF0LmNsaWVudEhlaWdodClcbiAgICBpZihpc0F0UmVjZW50TWVzc2FnZXMpIHtcbiAgICAgIHRoaXMuYXV0b3Njcm9sbCA9IHRydWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5hdXRvc2Nyb2xsID0gZmFsc2U7XG4gICAgfVxuICB9LFxuICBjb21wb25lbnREaWRVcGRhdGU6IGZ1bmN0aW9uKCkge1xuICAgIGlmKHRoaXMuYXV0b3Njcm9sbCkge1xuICAgICAgdGhpcy5zY3JvbGxUb0JvdHRvbSgpO1xuICAgIH1cbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaGF0XCIgcmVmPXsocmVmKSA9PiB0aGlzLmNoYXQgPSByZWZ9PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUubWVzc2FnZXNcbiAgICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbnZhciBDaGF0SW5wdXQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1lc3NhZ2U6IFwiXCJcbiAgICB9XG4gIH0sXG4gIGlmVXNlcm5hbWVFeGlzdHM6IGZ1bmN0aW9uKCkge1xuICAgIGlmICghdGhpcy5wcm9wcy51c2VybmFtZSB8fCAoMCA9PT0gdGhpcy5zdGF0ZS51c2VybmFtZS5sZW5ndGgpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICB1cGRhdGVNZXNzYWdlOiBmdW5jdGlvbihlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBtZXNzYWdlOiBlLnRhcmdldC52YWx1ZVxuICAgIH0pO1xuICB9LFxuICBjbGVhck1lc3NhZ2U6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgbWVzc2FnZTogXCJcIlxuICAgIH0pXG4gIH0sXG4gIHNlbmRNZXNzYWdlOiBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgLy8gVE9ETyBEbyBtZXNzYWdlIGlucHV0IHN0cmluZyBjaGVja3NcbiAgICAvLyBObyBlbXB0eSBzdHJpbmcsIG5vIHdoaXRlIHNwYWNlcywgVmFsaWQgY2hhcmFjdGVycyBhLXosIEEtWiwgMC05XG4gICAgLy8gQ2xpZW50IGVtaXRzIHRvIHNlcnZlciB3aXRoIENoYXQgTWVzc2FnZVxuICAgIHNvY2tldC5lbWl0KCdGcm9tIENsaWVudDogQ2hhdCBtZXNzYWdlJywgdGhpcy5zdGF0ZS5tZXNzYWdlKTtcbiAgICB0aGlzLmNsZWFyTWVzc2FnZSgpO1xuICB9LFxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoYXQtaW5wdXQtY29udGFpbmVyXCI+XG4gICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cImNoYXQtaW5wdXRcIiBpZD0nY2hhdC1mb3JtJyBhY3Rpb249XCJcIiBvblN1Ym1pdD17dGhpcy5zZW5kTWVzc2FnZX0+XG4gICAgICAgICAgPGlucHV0IGlkPVwibVwiIHZhbHVlPXt0aGlzLnN0YXRlLm1lc3NhZ2V9IG9uQ2hhbmdlPXt0aGlzLnVwZGF0ZU1lc3NhZ2V9IGF1dG9Db21wbGV0ZT1cIm9mZlwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwiY2hhdC10ZXh0Ym94XCIgbmFtZT1cIlwiIHBsYWNlaG9sZGVyPVwiVHlwZSBhIG1lc3NhZ2UuLi5cIiAvPlxuICAgICAgICA8L2Zvcm0+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxudmFyIEd1ZXN0VXNlckZvcm0gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVzZXJuYW1lOiBcIlwiXG4gICAgfVxuICB9LFxuICB1cGRhdGVVc2VybmFtZTogZnVuY3Rpb24oZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgdXNlcm5hbWU6IGUudGFyZ2V0LnZhbHVlXG4gICAgfSk7XG4gIH0sXG4gIHN1Ym1pdFVzZXJuYW1lOiBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMucHJvcHMuc2V0VXNlcm5hbWVDYWxsYmFjayh0aGlzLnN0YXRlLnVzZXJuYW1lKTtcblxuICAgIC8vIFRPRE8gRG8gdXNlcm5hbWUgaW5wdXQgc3RyaW5nIGNoZWNrc1xuICAgIC8vIE5vIGVtcHR5IHN0cmluZywgbm8gd2hpdGUgc3BhY2VzLCBWYWxpZCBjaGFyYWN0ZXJzIGEteiwgQS1aLCAwLTlcbiAgICAvLyBDbGllbnQgZW1pdHMgdG8gc2VydmVyIHdpdGggQWRkIHVzZXJcbiAgICBzb2NrZXQuZW1pdCgnRnJvbSBDbGllbnQ6IEFkZCB1c2VyJywgdGhpcy5zdGF0ZS51c2VybmFtZSk7XG4gIH0sXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwgZmFkZVwiIGlkPVwiZW50ZXItbmFtZVwiIHRhYkluZGV4PVwiLTFcIiByb2xlPVwiZGlhbG9nXCIgYXJpYS1sYWJlbGxlZGJ5PVwibXlNb2RhbExhYmVsXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZGlhbG9nIG1vZGFsLXNtXCIgcm9sZT1cImRvY3VtZW50XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1jb250ZW50XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWJvZHlcIj5cbiAgICAgICAgICAgICAgPGZvcm0gY2xhc3NOYW1lPVwic2VhcmNoLWlucHV0XCIgaWQ9J3VzZXJuYW1lLWZvcm0nIGFjdGlvbj1cIlwiIG9uU3VibWl0PXt0aGlzLnN1Ym1pdFVzZXJuYW1lfT5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUudXNlcm5hbWV9IG9uQ2hhbmdlPXt0aGlzLnVwZGF0ZVVzZXJuYW1lfSBhdXRvQ29tcGxldGU9XCJvZmZcIiB0eXBlPVwidGV4dFwiIGNsYXNzTmFtZT1cImNoYXQtdGV4dGJveFwiIG5hbWU9XCJcIiBwbGFjZWhvbGRlcj1cIkVudGVyIFlvdXIgTmFtZVwiIGF1dG9Gb2N1cz17dHJ1ZX0gLz5cbiAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59KTtcblxuLyogQ2hhdGJveCAqL1xudmFyIENoYXRib3ggPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMucHJvcHMudXNlciA9PT0gdW5kZWZpbmVkIHx8IHRoaXMucHJvcHMudXNlciA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdXNlcm5hbWU6IFwiXCJcbiAgICAgIH07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdXNlcm5hbWU6IHRoaXMucHJvcHMudXNlci5sb2NhbC5maXJzdE5hbWUgKyBcIiBcIiArIHRoaXMucHJvcHMudXNlci5sb2NhbC5sYXN0TmFtZVxuICAgICAgfTtcbiAgICB9XG4gIH0sXG4gIHNldFVzZXJuYW1lOiBmdW5jdGlvbih1c2VybmFtZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lXG4gICAgfSk7XG4gIH0sXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxDaGF0SGVhZGVyIHJvb209e3RoaXMucHJvcHMucm9vbX0gLz5cbiAgICAgICAgPENoYXREaXNwbGF5IHVzZXJuYW1lPXt0aGlzLnN0YXRlLnVzZXJuYW1lfSAvPlxuICAgICAgICA8Q2hhdElucHV0IHVzZXJuYW1lPXt0aGlzLnN0YXRlLnVzZXJuYW1lfSAvPlxuICAgICAgIHsvKiA8R3Vlc3RVc2VyRm9ybSBzZXRVc2VybmFtZUNhbGxiYWNrPXt0aGlzLnNldFVzZXJuYW1lfSAvPiAqL31cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENoYXRib3g7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIE1lZGlhRW50cnkgPSByZXF1aXJlKCcuL01lZGlhRW50cnkuanN4Jyk7XG5cbnZhciBwbGF5bGlzdEFjdGlvbnMgPSByZXF1aXJlKCcuLi9mbHV4L2FjdGlvbnMvYWN0aW9ucycpO1xudmFyIHBsYXlsaXN0U3RvcmUgPSByZXF1aXJlKCcuLi9mbHV4L3N0b3Jlcy9zdG9yZScpO1xuXG52YXIgU2F2ZUNhbmNlbEJ1dHRvbnMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHNhdmVVcGRhdGVkUGxheWxpc3Q6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMucHJvcHMub25TYXZlQ2xpY2soKTtcbiAgfSxcblxuICBjYW5jZWxTYXZpbmdQbGF5bGlzdDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5wcm9wcy5vbkNhbmNlbENsaWNrKCk7XG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4oXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInNhdmUtY2FuY2VsXCI+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIG9uQ2xpY2s9e3RoaXMuc2F2ZVVwZGF0ZWRQbGF5bGlzdH0+U2F2ZTwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXNlY29uZGFyeVwiIG9uQ2xpY2s9e3RoaXMuY2FuY2VsU2F2aW5nUGxheWxpc3R9PkNhbmNlbDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbnZhciBQcml2YXRlUHVibGljRHJvcGRvd24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgLy8gVE9ETzogSWYgdGhlIHBsYXlsaXN0IGlzIGluaXRpYWxpemVkIGFzIHByaXZhdGUsIHRoZW4gdGhlIGRyb3Bkb3duIGV4aXN0c1xuICAgIC8vIGlmICghdGhpcy5wcm9wcy5pc1B1YmxpYykge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcml2YXRlLXB1YmxpY1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJvcGRvd25cIj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tc2Vjb25kYXJ5IGRyb3Bkb3duLXRvZ2dsZVwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPlxuICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1sb2NrIGljb24tcGFkZGluZ1wiPjwvaT5cbiAgICAgICAgICAgICAgUHJpdmF0ZSBQbGF5bGlzdFxuICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1hbmdsZS1kb3duIGRyb3Bkb3duLWFycm93XCI+PC9pPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiZHJvcGRvd24tbWVudVwiPlxuICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiPjxpIGNsYXNzTmFtZT1cImZhIGZhLWxvY2tcIj48L2k+UHJpdmF0ZSBQbGF5bGlzdDwvYT48L2xpPlxuICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiPjxpIGNsYXNzTmFtZT1cImZhIGZhLWdsb2JlXCI+PC9pPlB1YmxpYyBQbGF5bGlzdDwvYT48L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIC8vIH1cblxuICAgIC8vIElmIHRoZSBwbGF5bGlzdCBpcyBpbml0aWFsaXplZCBhcyBwdWJsaWMsIGl0IHdpbGwgc3RheSBwdWJsaWNcbiAgICAvLyBlbHNlIHtcbiAgICAvLyAgIHJldHVybiAoXG4gICAgLy8gICAgIDxkaXYgY2xhc3NOYW1lPVwicHVibGljLW5vdGVcIj48aSBjbGFzc05hbWU9XCJmYSBmYS1nbG9iZSBpY29uLXBhZGRpbmdcIj48L2k+UHVibGljIFBsYXlsaXN0PC9kaXY+XG4gICAgLy8gICApOyAgXG4gICAgLy8gfVxuICB9XG59KTtcblxudmFyIERlbGV0ZVBsYXlsaXN0QnV0dG9uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXRyYXNoIHRyYXNoLXBsYXlsaXN0LWJ0blwiIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXRhcmdldD1cIiN0cmFzaC1jb25maXJtXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtdHJhc2hcIj48L2k+PC9idXR0b24+XG4gICAgKTtcbiAgfVxufSk7XG5cbnZhciBQbGF5bGlzdEhlYWRlckJ1dHRvbnNUb0NoYW5nZVN0YXRlcyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWN0aW9uXCI+XG4gICAgICAgIDxTYXZlQ2FuY2VsQnV0dG9ucyBvbkNhbmNlbENsaWNrPXt0aGlzLnByb3BzLm9uQ2FuY2VsQ2xpY2t9IG9uU2F2ZUNsaWNrPXt0aGlzLnByb3BzLm9uU2F2ZUNsaWNrfSAvPlxuICAgICAgICA8UHJpdmF0ZVB1YmxpY0Ryb3Bkb3duIGlzUHVibGljPXt0aGlzLnByb3BzLmlzUHVibGljfSAvPlxuICAgICAgICA8RGVsZXRlUGxheWxpc3RCdXR0b24gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG52YXIgTW9kYWxEZWxldGVQbGF5bGlzdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgLy8gRXZlbnQgaGFuZGxlciBidXR0b24gY2xpY2tcbiAgZGVsZXRlUGxheWxpc3Q6IGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKFwiRGVsZXRpbmcgUGxheWxpc3RcIiArIHRoaXMucHJvcHMucGxheWxpc3RLZXkpO1xuICAgICQuYWpheCh7XG4gICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgIHVybDogXCIvcGxheWxpc3QvZGVsZXRlXCIsXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgZGF0YToge19pZDogdGhpcy5wcm9wcy5wbGF5bGlzdEtleX0sXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICBwbGF5bGlzdEFjdGlvbnMuZGVsZXRlUGxheWxpc3QoZGF0YS5kZWxldGVkUGxheWxpc3QpOyBcbiAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgIGVycm9yOiBmdW5jdGlvbih4aHIsIHN0YXR1cywgZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFUlJPUjogRGVsZXRlIFBsYXlsaXN0IGVycm9yZWQgb3V0XCIsIHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpO1xuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgfSk7XG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbCBmYWRlXCIgaWQ9XCJ0cmFzaC1jb25maXJtXCIgdGFiSW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIiBhcmlhLWxhYmVsbGVkYnk9XCJteU1vZGFsTGFiZWxcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1kaWFsb2cgbW9kYWwtc21cIiByb2xlPVwiZG9jdW1lbnRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtYm9keVwiPlxuICAgICAgICAgICAgICBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gcGVybWFuZW50bHkgZGVsZXRlIHRoaXMgcGxheWxpc3Q/XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZm9vdGVyXCI+XG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tc2Vjb25kYXJ5XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DYW5jZWw8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1yZWRcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIG9uQ2xpY2s9e3RoaXMuZGVsZXRlUGxheWxpc3R9PkRlbGV0ZSBQbGF5bGlzdDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbnZhciBQbGF5bGlzdERlc2NyaXB0aW9uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYi1wYWdlLWhlYWRlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYi1wYWdlLXRleHQtY29udGFpbmVyXCI+XG4gICAgICAgICAgPGEgY2xhc3NOYW1lPVwiaWNvbi1idG5cIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+PGRpdiBjbGFzc05hbWU9XCJ0YWItcGFnZS1iYWNrLWJ0blwiPjxpIGNsYXNzTmFtZT1cImZhIGZhLWxnIGZhLWNoZXZyb24tY2lyY2xlLWxlZnRcIj48L2k+PC9kaXY+PC9hPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFiLXBhZ2UtdGl0bGUgb25jbGljay1lZGl0XCI+XG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5uYW1lfVxuICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiaWNvbi1idG4tYmx1ZVwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIj48aSBjbGFzc05hbWU9XCJmYSBmYS1lZGl0XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPjwvYT5cblxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFiLXBhZ2UtY3VyYXRvclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGF5bGlzdC11c2VyLWljb25cIj48aSBjbGFzc05hbWU9XCJmYSBmYS11c2VyIGZhLWZ3XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPjwvZGl2PlxuICAgICAgICAgICAgWW91ciBQbGF5bGlzdFxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWItcGFnZS1yaWdodC1jb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYi1wYWdlLWljb24tY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBpbGxcIj57dGhpcy5wcm9wcy5zaXplfSBJdGVtczwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG52YXIgU2VhcmNoUGxheWxpc3RFbnRyaWVzSW5QbGF5bGlzdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2gtY29udGFpbmVyXCI+XG4gICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cInNlYXJjaC1pbnB1dFwiPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaCBpbiBQbGF5bGlzdC4uLlwiLz5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbi8vIFNVQiBDT01QT05FTlQ6IEVkaXRQbGF5bGlzdEhlYWRlclxudmFyIEVkaXRQbGF5bGlzdEhlYWRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4oXG4gICAgICA8ZGl2PlxuICAgICAgICA8UGxheWxpc3RIZWFkZXJCdXR0b25zVG9DaGFuZ2VTdGF0ZXMgaXNQdWJsaWM9e3RoaXMucHJvcHMuaXNQdWJsaWN9IG9uQ2FuY2VsQ2xpY2s9e3RoaXMucHJvcHMub25DYW5jZWxDbGlja30gb25TYXZlQ2xpY2s9e3RoaXMucHJvcHMub25TYXZlQ2xpY2t9IC8+XG4gICAgICAgIDxNb2RhbERlbGV0ZVBsYXlsaXN0IHBsYXlsaXN0S2V5PXt0aGlzLnByb3BzLnBsYXlsaXN0S2V5fSAvPlxuICAgICAgICA8UGxheWxpc3REZXNjcmlwdGlvbiBuYW1lPXt0aGlzLnByb3BzLm5hbWV9IHNpemU9e3RoaXMucHJvcHMuc2l6ZX0gLz5cbiAgICAgICAgPFNlYXJjaFBsYXlsaXN0RW50cmllc0luUGxheWxpc3QgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG4vLyBNQUlOIENPTVBPTkVOVDogVXNlcnNPcGVuZWRQbGF5bGlzdFxudmFyIFVzZXJzT3BlbmVkUGxheWxpc3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIF9pZDogcGxheWxpc3RTdG9yZS5nZXRJZCgpLFxuICAgICAgaW5kZXg6IHBsYXlsaXN0U3RvcmUuZ2V0SW5kZXgoKSxcbiAgICAgIGVudHJpZXM6IHBsYXlsaXN0U3RvcmUuZ2V0RW50cmllcygpXG4gICAgfTtcbiAgfSxcblxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coXCJFRElUIFBMQVlMSVNUIE1PVU5USU5HXCIpO1xuICAgIHBsYXlsaXN0U3RvcmUuYWRkQ2hhbmdlTGlzdGVuZXIodGhpcy5vbkRpc3BsYXlQbGF5bGlzdCk7XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgIHBsYXlsaXN0U3RvcmUucmVtb3ZlQ2hhbmdlTGlzdGVuZXIodGhpcy5vbkRpc3BsYXlQbGF5bGlzdCk7XG4gIH0sXG5cbiAgb25EaXNwbGF5UGxheWxpc3Q6IGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKFwiQ2hhbmdpbmcgZGlzcGxheSB0byBzZWxlY3RlZCBwbGF5bGlzdFwiKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnByb3BzLm15UGxheWxpc3RzW3BsYXlsaXN0U3RvcmUuZ2V0SW5kZXgoKV0ubWVkaWFFbnRyaWVzKTtcbiAgICB0aGlzLnNldFN0YXRlKHsgXG4gICAgICBfaWQ6IHBsYXlsaXN0U3RvcmUuZ2V0SWQoKSwgXG4gICAgICBpbmRleDogcGxheWxpc3RTdG9yZS5nZXRJbmRleCgpLFxuICAgICAgZW50cmllczogcGxheWxpc3RTdG9yZS5nZXRFbnRyaWVzKClcbiAgICB9KTtcbiAgICAvLyB0aGlzLnNldFN0YXRlKHsgaW5kZXg6IHBsYXlsaXN0U3RvcmUuZ2V0SW5kZXgoKSB9KTtcbiAgICAvLyB0aGlzLnNldFN0YXRlKHsgZW50cmllczogcGxheWxpc3RTdG9yZS5nZXRFbnRyaWVzKCkgfSk7XG4gIH0sXG5cbiAgc2F2ZUNoYW5nZXM6IGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKFwiU2F2aW5nIFBsYXlsaXN0XCIpO1xuICAgIHZhciBzYXZlZFBsYXlsaXN0ID0gW107XG4gICAgdmFyIGVhY2hQbGF5bGlzdDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc3RhdGUuZW50cmllcy5sZW5ndGg7ICsraSkge1xuICAgICAgZWFjaFBsYXlsaXN0ID0gdGhpcy5zdGF0ZS5lbnRyaWVzW2ldO1xuICAgICAgaWYgKGVhY2hQbGF5bGlzdC5pZkRlbGV0ZUluZGljYXRvciA9PT0gdW5kZWZpbmVkIHx8IGVhY2hQbGF5bGlzdC5pZkRlbGV0ZUluZGljYXRvciA9PT0gZmFsc2UpIHtcbiAgICAgICAgZGVsZXRlIGVhY2hQbGF5bGlzdC5pZkRlbGV0ZUluZGljYXRvcjtcbiAgICAgICAgc2F2ZWRQbGF5bGlzdC5wdXNoKGVhY2hQbGF5bGlzdCk7XG4gICAgICB9XG4gICAgfSAgXG4gICAgLy8gRG9uJ3QgbWFrZSBhbiBhamF4IHJlcXVlc3Qgd2hlbiB0aGluZ3MgaGF2ZW4ndCBjaGFuZ2VkXG4gICAgaWYgKHNhdmVkUGxheWxpc3QubGVuZ3RoID09IHRoaXMuc3RhdGUuZW50cmllcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9ICBcblxuICAgICQuYWpheCh7XG4gICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgIHVybDogXCIvcGxheWxpc3QvdXBkYXRlXCIsXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgZGF0YToge19pZDogdGhpcy5wcm9wcy5teVBsYXlsaXN0c1t0aGlzLnN0YXRlLmluZGV4XS5faWQsIG1lZGlhRW50cmllczogSlNPTi5zdHJpbmdpZnkoc2F2ZWRQbGF5bGlzdCl9LFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZW50cmllczogZGF0YS51cGRhdGVkUGxheWxpc3QubWVkaWFFbnRyaWVzfSk7XG4gICAgICAgIHBsYXlsaXN0QWN0aW9ucy51cGRhdGVQbGF5bGlzdChkYXRhLnVwZGF0ZWRQbGF5bGlzdCk7XG5cbiAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgIGVycm9yOiBmdW5jdGlvbih4aHIsIHN0YXR1cywgZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFUlJPUjogVXBkYXRlIFBsYXlsaXN0IGVycm9yZWQgb3V0XCIsIHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpO1xuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgfSk7XG4gIH0sXG5cbiAgY2FuY2VsQ2hhbmdlczogZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coXCJDYW5jZWxpbmcgY2hhbmdlc1wiKTtcbiAgICB2YXIgc2F2ZWRQbGF5bGlzdCA9IFtdO1xuICAgIHZhciBlYWNoUGxheWxpc3Q7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnN0YXRlLmVudHJpZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIGVhY2hQbGF5bGlzdCA9IHRoaXMuc3RhdGUuZW50cmllc1tpXTsgICAgICBcbiAgICAgIGlmIChlYWNoUGxheWxpc3QuaWZEZWxldGVJbmRpY2F0b3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBkZWxldGUgZWFjaFBsYXlsaXN0LmlmRGVsZXRlSW5kaWNhdG9yO1xuICAgICAgfVxuICAgICAgc2F2ZWRQbGF5bGlzdC5wdXNoKGVhY2hQbGF5bGlzdCk7XG4gICAgfSAgXG5cbiAgICB0aGlzLnNldFN0YXRlKHtlbnRyaWVzIDogc2F2ZWRQbGF5bGlzdH0sIGZ1bmN0aW9uKCkge1xuICAgICAgY29uc29sZS5sb2codGhpcy5zdGF0ZS5lbnRyaWVzKTsgIFxuICAgIH0pO1xuICB9LFxuXG4gIGRlbGV0ZU1lZGlhRW50cnlJblBsYXlsaXN0OiBmdW5jdGlvbihwb3NJblBsYXlsaXN0KSB7XG4gICAgY29uc29sZS5sb2codGhpcy5zdGF0ZS5lbnRyaWVzKTtcbiAgICB2YXIgdXBkYXRlZFBsYXlsaXN0ID0gdGhpcy5zdGF0ZS5lbnRyaWVzO1xuICAgIGlmICh1cGRhdGVkUGxheWxpc3RbcG9zSW5QbGF5bGlzdF0uaWZEZWxldGVJbmRpY2F0b3IgPT09IHRydWUpXG4gICAgICB1cGRhdGVkUGxheWxpc3RbcG9zSW5QbGF5bGlzdF0uaWZEZWxldGVJbmRpY2F0b3IgPSBmYWxzZTtcbiAgICBlbHNlIHtcbiAgICAgIHVwZGF0ZWRQbGF5bGlzdFtwb3NJblBsYXlsaXN0XS5pZkRlbGV0ZUluZGljYXRvciA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoe2VudHJpZXMgOiB1cGRhdGVkUGxheWxpc3R9KTtcblxuICAgIC8vIGNvbnNvbGUubG9nKFwiRGVsZXRpbmcgbWVkaWEgZW50cnkgaW4gUGxheWxpc3Q6IFwiICsgcG9zSW5QbGF5bGlzdCk7XG4gICAgLy8gdmFyIHVwZGF0ZWRFbnRyaWVzID0gdGhpcy5zdGF0ZS5lbnRyaWVzO1xuICAgIC8vIHVwZGF0ZWRFbnRyaWVzLnNwbGljZShwb3NJblBsYXlsaXN0LCAxKTtcbiAgICAvLyBpZiAocG9zSW5QbGF5bGlzdCA+IC0xKSB7XG4gICAgLy8gICB0aGlzLnNldFN0YXRlKHsgZW50cmllczogdXBkYXRlZEVudHJpZXMgfSk7XG4gICAgLy8gfVxuXG4gICAgLy8gdGhpcy5zZXRTdGF0ZSh7ZGVsZXRlZExpc3QgOiB0aGlzLnN0YXRlLmRlbGV0ZWRMaXN0LnB1c2gocG9zSW5QbGF5bGlzdCl9KVxuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIG1lZGlhRW50cmllc0luUGxheWxpc3QgPSBbXTtcbiAgICB2YXIgcHJvcE5hbWUgPSBcIlwiO1xuICAgIHZhciBwcm9wU2l6ZSA9IDA7XG4gICAgdmFyIHByb3BMaWtlcyA9IFwiXCI7XG4gICAgdmFyIHByb3BJc1B1YmxpYyA9IHRydWU7XG4gICAgdmFyIHByb3BLZXkgPSBcIlwiO1xuXG4gICAgLy8gVE9ETzogU2hvdWxkIGZpeCB0aGlzIGlmIHN0YXRlbWVudCwgd2hlbiBkZWxldGluZyB0aGUgZGlzcGxheWVkIHBsYXlsaXN0LCBzaG91bGQgcmVpbml0aWFsaXplIHRoZSBzdGF0ZXMgYWxsIHRvIG51bGxcbiAgICAvLyBOb3Qga2VlcCB0aGUgc3RhdGUgYXMgdGhlIHByZXZpb3VzIGRlbGV0ZWQgcGxheWxpc3RcbiAgICBpZiAodGhpcy5zdGF0ZS5pbmRleCAhPT0gbnVsbCAmJiB0aGlzLnByb3BzLm15UGxheWxpc3RzW3RoaXMuc3RhdGUuaW5kZXhdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHZhciBzZWxlY3RlZFBsYXlsaXN0ID0gdGhpcy5wcm9wcy5teVBsYXlsaXN0c1t0aGlzLnN0YXRlLmluZGV4XTtcblxuICAgICAgLy8gdmFyIG1lZGlhRW50cmllcyA9IHNlbGVjdGVkUGxheWxpc3QubWVkaWFFbnRyaWVzO1xuICAgICAgdmFyIG1lZGlhRW50cmllcyA9IHRoaXMuc3RhdGUuZW50cmllcztcblxuICAgICAgLy8gWW91IGRvIHRoaXMgYmVjYXVzZSB0aGUgYXJyYXkgaXRzZWxmIGhhcyBhbiBfaWQuIFRoZSBhcnJheSB0ZWNobmljYWxseSBpc24ndCBlbXB0eSB3aGVuIGVtcHR5LiAoRG9uJ3Qga25vdyBpZiB0aGlzIGNvbmNlcHQgYXBwbGllcyB0byBoZXJlIHRob3VnaClcbiAgICAgIHZhciBtZWRpYUVudHJ5ID0gbWVkaWFFbnRyaWVzWzBdO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1lZGlhRW50cmllcy5sZW5ndGg7ICsraSkge1xuICAgICAgICBtZWRpYUVudHJ5ID0gbWVkaWFFbnRyaWVzW2ldO1xuICAgICAgICBpZiAobWVkaWFFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICAgIHZhciBkZWxldGVJbmRpY2F0b3IgPSBtZWRpYUVudHJ5LmlmRGVsZXRlSW5kaWNhdG9yID09PSB1bmRlZmluZWQgPyBkZWxldGVJbmRpY2F0b3IgPSBmYWxzZSA6IGRlbGV0ZUluZGljYXRvciA9IG1lZGlhRW50cnkuaWZEZWxldGVJbmRpY2F0b3I7IFxuICAgICAgICAgIG1lZGlhRW50cmllc0luUGxheWxpc3QucHVzaChcbiAgICAgICAgICAgIDxNZWRpYUVudHJ5IFxuICAgICAgICAgICAgICBrZXk9e1wibWVkaWFFbnRyeVwiICsgbWVkaWFFbnRyeS5tZWRpYUlkICsgaX1cbiAgICAgICAgICAgICAgcG9zPXtpfSBcbiAgICAgICAgICAgICAgbWVkaWFJZD17bWVkaWFFbnRyeS5tZWRpYUlkfSBcbiAgICAgICAgICAgICAgY2F0ZWdvcnlUeXBlPXsnUExBWUxJU1QnfVxuICAgICAgICAgICAgICBtZWRpYVR5cGU9eydZT1VUVUJFJ31cbiAgICAgICAgICAgICAgdGh1bWJuYWlsPXttZWRpYUVudHJ5LnRodW1ibmFpbH0gXG4gICAgICAgICAgICAgIHRpdGxlPXttZWRpYUVudHJ5LnRpdGxlfVxuICAgICAgICAgICAgICBhcnRpc3Q9e21lZGlhRW50cnkuYXJ0aXN0fSBcbiAgICAgICAgICAgICAgaWZNZWRpYUNhcmRBZGRlZD17ZmFsc2V9IFxuICAgICAgICAgICAgICB1c2VyPXt0aGlzLnByb3BzLnVzZXJ9XG4gICAgICAgICAgICAgIG15UGxheWxpc3RzPXt0aGlzLnByb3BzLm15UGxheWxpc3RzfSBcbiAgICAgICAgICAgICAgZGVsZXRlRW50cnk9e3RoaXMuZGVsZXRlTWVkaWFFbnRyeUluUGxheWxpc3R9XG4gICAgICAgICAgICAgIGRlbGV0ZUluZGljYXRvcj17ZGVsZXRlSW5kaWNhdG9yfSAvPlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcHJvcE5hbWUgPSBzZWxlY3RlZFBsYXlsaXN0Lm5hbWU7XG4gICAgICBwcm9wU2l6ZSA9IG1lZGlhRW50cnkgIT09IG51bGwgPyBzZWxlY3RlZFBsYXlsaXN0Lm1lZGlhRW50cmllcy5sZW5ndGggOiAwO1xuICAgICAgcHJvcExpa2VzID0gc2VsZWN0ZWRQbGF5bGlzdC5saWtlcztcbiAgICAgIHByb3BJc1B1YmxpYyA9IHNlbGVjdGVkUGxheWxpc3QuaXNQdWJsaWM7XG4gICAgICBwcm9wS2V5ID0gc2VsZWN0ZWRQbGF5bGlzdC5faWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZWRpdC1wbGF5bGlzdC1jb250YWluZXJcIj5cbiAgICAgICAgICA8RWRpdFBsYXlsaXN0SGVhZGVyIG5hbWU9e3Byb3BOYW1lfSBzaXplPXtwcm9wU2l6ZX0gaXNQdWJsaWM9e3Byb3BJc1B1YmxpY30gcGxheWxpc3RLZXk9e3Byb3BLZXl9IG9uQ2FuY2VsQ2xpY2s9e3RoaXMuY2FuY2VsQ2hhbmdlc30gb25TYXZlQ2xpY2s9e3RoaXMuc2F2ZUNoYW5nZXN9IC8+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAge21lZGlhRW50cmllc0luUGxheWxpc3R9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVXNlcnNPcGVuZWRQbGF5bGlzdDsiLCIvKiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBDb3B5cmlnaHQgwqkgXG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyogID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgVklFVzogRXhwbG9yZS5qc3hcblxuICAgIFNob3djYXNlcyBkaWZmZXJlbnQgcHVibGljIHBsYXlsaXN0cyB0aGF0IGFyZSBjdXJyZW50bHkgdHJlbmRpbmdcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBDb21wb25lbnRzXG5cbiAgICBFeHBsb3JlIC0gVGhlIEV4cGxvcmUgdGFiXG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBFeHBsb3JlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1wYWRkaW5nXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGFjZWhvbGRlclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGFjZWhvbGRlci1jb250ZW50XCI+XG4gICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLXJvY2tldCBwbGFjZWhvbGRlci1pY29uXCI+PC9pPjxici8+XG4gICAgICAgICAgICAgIDxzcGFuPlRoaXMgcGFnZSBpcyBzdGlsbCBiZWluZyBtYWRlPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaC1jb250YWluZXJcIj5cbiAgICAgICAgICA8Zm9ybSBjbGFzc05hbWU9XCJzZWFyY2gtaW5wdXRcIj5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzTmFtZT1cImNoYXQtdGV4dGJveFwiIG5hbWU9XCJcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaCBQdWJsaWMgUGxheWxpc3RzLi4uXCIvPlxuICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgICovfVxuXG4gICAgICAgIHsvKiBUT0RPOiBFeHBsb3JlICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImV4cGxvcmUtY29udGFpbmVyXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBFeHBsb3JlOyIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBGb290ZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxmb290ZXIgY2xhc3NOYW1lPVwiZm9vdGVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9vdGVyLWNvbnRlbnRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tNyBjb2wteHMtNVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvcHlyaWdodFwiPkFwcGxlIFRlYSAmY29weTsgMjAxNjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS01IGNvbC14cy03XCI+XG4gICAgICAgICAgICAgIDxwPjxiPkFwcGxlIFRlYTwvYj4gaXMgb25lIG9mIG1hbnkgZXhjaXRpbmcgcHJvamVjdHMgd2UncmUgd29ya2luZyBvbi4gSWYgeW91IHdhbnQgdG8gc3VwcG9ydCBvdXIgZGV2ZWxvcG1lbnQgYW5kIGhlbHAga2VlcCBBcHBsZSBUZWEgc2VydmVycyBydW5uaW5nLCB5b3UgY2FuIHNlbmQgdXMgYSBkb25hdGlvbi4gV2UnbGwgbG92ZSB5b3UgZm9yIGl0LiA8aSBjbGFzc05hbWU9XCJmYSBmYS1oZWFydFwiPjwvaT48L3A+XG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tdGVhbC1ob3ZlclwiPkRvbmF0ZTwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9mb290ZXI+XG4gICAgKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRm9vdGVyOyIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbi8qIFVzZXIgUHJvZmlsZSBQaWN0dXJlIEljb24gKi9cbnZhciBIZWFkZXJQcm9maWxlSWNvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGEgY2xhc3NOYW1lPVwiZHJvcGRvd24tdG9nZ2xlXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiPlxuICAgICAgICAgIDxpbWcgY2xhc3NOYW1lPVwicHJvZmlsZS1waWNcIiBzcmM9XCJpbWFnZXMvcHJvZmlsZS1waWMucG5nXCIgLz5cbiAgICAgICAgPC9hPlxuICAgICAgICA8dWwgY2xhc3NOYW1lPVwiZHJvcGRvd24tbWVudSBkcm9wZG93bi1tZW51LXJpZ2h0XCI+XG4gICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImRyb3Bkb3duLWhlYWRlclwiPnt0aGlzLnByb3BzLnVzZXIubG9jYWwuZmlyc3ROYW1lfSB7dGhpcy5wcm9wcy51c2VyLmxvY2FsLmxhc3ROYW1lfSAoe3RoaXMucHJvcHMudXNlci5sb2NhbC5lbWFpbH0pPC9saT5cbiAgICAgICAgICA8bGk+PGEgaHJlZj1cIi91c2VyXCI+UHJvZmlsZTwvYT48L2xpPlxuICAgICAgICAgIDxsaSByb2xlPVwic2VwYXJhdG9yXCIgY2xhc3NOYW1lPVwiZGl2aWRlclwiPjwvbGk+XG4gICAgICAgICAgPGxpPjxhIGhyZWY9XCIvbG9nb3V0XCI+U2lnbiBPdXQ8L2E+PC9saT5cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG4vKiBTaWduIFVwIGFuZCBTaWduIEluIEJ1dHRvbnMgKi9cbnZhciBTaWduVXBTaWduSW5CdXR0b25zID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlci1idG4tZ3JvdXBcIj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgYnRuLW1hcmdpblwiIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXRhcmdldD1cIiNzaWdudXBcIj5cbiAgICAgICAgICBTaWduIFVwXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8U2lnblVwTW9kYWwgLz5cbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXNlY29uZGFyeSBidG4tbWFyZ2luIGRyb3Bkb3duLXRvZ2dsZVwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPlxuICAgICAgICAgIFNpZ24gSW5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxTaWduSW5Ecm9wZG93biAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbi8qIFNpZ24gVXAgTW9kYWwgUG9wdXAgKi9cbnZhciBTaWduVXBNb2RhbCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgLy8gVE9ETzogSW1wbGVtZW50IG9uU3VibWl0IChDaGVjayBpZiB2YWxpZCBpbnB1dHMgaWYgdmFsaWQgZW1haWwpXG4gIG9uU3VibWl0OiBmdW5jdGlvbihlKSB7XG4gICAgY29uc29sZS5sb2coXCJTdWJtaXR0aW5nIHNpZ24gdXBcIik7XG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbCBmYWRlXCIgaWQ9XCJzaWdudXBcIiB0YWJJbmRleD1cIi0xXCIgcm9sZT1cImRpYWxvZ1wiIGFyaWEtbGFiZWxsZWRieT1cIm15TW9kYWxMYWJlbFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWRpYWxvZyBtb2RhbC1zbVwiIHJvbGU9XCJkb2N1bWVudFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93IHJvdy1zbVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTEyIGNvbC1wYWRkaW5nLXNtXCI+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tZmFjZWJvb2sgYnRuLWZ1bGwtd2lkdGhcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1mYWNlYm9vayBpY29uLXBhZGRpbmcgaWNvbi1wb3NpdGlvbi1sZWZ0XCI+PC9pPlNpZ24gSW4gd2l0aCBGYWNlYm9va1xuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMTIgY29sLXBhZGRpbmctc21cIj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi10d2l0dGVyIGJ0bi1mdWxsLXdpZHRoXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtdHdpdHRlciBpY29uLXBhZGRpbmcgaWNvbi1wb3NpdGlvbi1sZWZ0XCI+PC9pPlNpZ24gSW4gd2l0aCBUd2l0dGVyXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0xMiBjb2wtcGFkZGluZy1zbVwiPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWdvb2dsZSBidG4tZnVsbC13aWR0aFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWdvb2dsZS1wbHVzIGljb24tcGFkZGluZyBpY29uLXBvc2l0aW9uLWxlZnRcIj48L2k+U2lnbiBpbiB3aXRoIEdvb2dsZVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWJvZHkgc2VjdGlvbi1ib3JkZXIgc2lnbnVwLWZvcm0tY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3ItZGl2aWRlclwiPjxzcGFuPk9SIFNJR04gVVA8L3NwYW4+PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gPGZvcm0gY2xhc3NOYW1lPVwic2VhcmNoLWlucHV0XCIgYWN0aW9uPVwiL3NpZ251cFwiIG1ldGhvZD1cInBvc3RcIj5cbiAgICAgICAgICAgICAgICAvLyAgIDxkaXYgY2xhc3NOYW1lPVwicm93IHJvdy1zbVwiPlxuICAgICAgICAgICAgICAgIC8vICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS02IGNvbC1wYWRkaW5nLXNtXCI+XG4gICAgICAgICAgICAgICAgLy8gICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJGaXJzdCBOYW1lXCIgbmFtZT1cImZpcnN0TmFtZVwiLz5cbiAgICAgICAgICAgICAgICAvLyAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgLy8gICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTYgY29sLXBhZGRpbmctc21cIj5cbiAgICAgICAgICAgICAgICAvLyAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIkxhc3QgTmFtZVwiIG5hbWU9XCJsYXN0TmFtZVwiLz5cbiAgICAgICAgICAgICAgICAvLyAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgLy8gICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTEyIGNvbC1wYWRkaW5nLXNtXCI+XG4gICAgICAgICAgICAgICAgLy8gICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJFbWFpbFwiIG5hbWU9XCJlbWFpbFwiLz5cbiAgICAgICAgICAgICAgICAvLyAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgLy8gICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTEyIGNvbC1wYWRkaW5nLXNtXCI+XG4gICAgICAgICAgICAgICAgLy8gICAgICAgPGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIHBsYWNlaG9sZGVyPVwiUGFzc3dvcmRcIiBuYW1lPVwicGFzc3dvcmRcIi8+XG4gICAgICAgICAgICAgICAgLy8gICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIC8vICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS0xMiBjb2wtcGFkZGluZy1zbVwiPlxuICAgICAgICAgICAgICAgIC8vICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IGJ0bi1mdWxsLXdpZHRoXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiB0eXBlPVwic3VibWl0XCI+U2lnbiBVcDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIC8vICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAvLyAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIC8vIDwvZm9ybT5cbiAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgPGZvcm0gY2xhc3NOYW1lPVwic2VhcmNoLWlucHV0IHNlYXJjaC1pbnB1dC1zbVwiIGFjdGlvbj1cIi9zaWdudXBcIiBtZXRob2Q9XCJwb3N0XCIgb25TdWJtaXQ9e3RoaXMub25TdWJtaXR9PiBcbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cInNpZ24tdXAtZmlyc3QtbmFtZVwiIGNsYXNzTmFtZT1cImlucHV0LXBhZGRpbmctc21cIiBwbGFjZWhvbGRlcj1cIkZpcnN0IE5hbWVcIiBuYW1lPVwiZmlyc3ROYW1lXCIvPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwic2lnbi11cC1sYXN0LW5hbWVcIiBjbGFzc05hbWU9XCJpbnB1dC1wYWRkaW5nLXNtXCIgcGxhY2Vob2xkZXI9XCJMYXN0IE5hbWVcIiBuYW1lPVwibGFzdE5hbWVcIi8+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwiaW5wdXQtcGFkZGluZy1zbVwiIHBsYWNlaG9sZGVyPVwiRW1haWxcIiBuYW1lPVwiZW1haWxcIi8+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIGNsYXNzTmFtZT1cImlucHV0LXBhZGRpbmctc21cIiBwbGFjZWhvbGRlcj1cIlBhc3N3b3JkXCIgbmFtZT1cInBhc3N3b3JkXCIvPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IGJ0bi1mdWxsLXdpZHRoXCIgdHlwZT1cInN1Ym1pdFwiPlNpZ24gVXA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICBcbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxuLyogU2lnbiBJbiBEcm9wZG93biAqL1xudmFyIFNpZ25JbkRyb3Bkb3duID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAvLyBUT0RPOiBJbXBsZW1lbnQgb25TdWJtaXQgKENoZWNrIGlmIHZhbGlkIGlucHV0cyBpZiB2YWxpZCBlbWFpbClcbiAgb25TdWJtaXQ6IGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKFwiU3VibWl0dGluZyBzaWduIHVwXCIpO1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDx1bCBjbGFzc05hbWU9XCJkcm9wZG93bi1tZW51IGRyb3Bkb3duLW1lbnUtcmlnaHQgc2lnbmluLWNvbnRhaW5lclwiIGlkPVwic2lnbmluLWZvcm1cIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaWduaW4tY29udGVudFwiPlxuICAgICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cInNlYXJjaC1pbnB1dCBzZWFyY2gtaW5wdXQtc21cIiBhY3Rpb249XCIvc2lnbmluXCIgbWV0aG9kPVwicG9zdFwiIG9uU3VibWl0PXt0aGlzLm9uU3VibWl0fT5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzTmFtZT1cImlucHV0LXBhZGRpbmctc21cIiBwbGFjZWhvbGRlcj1cIkVtYWlsXCIgbmFtZT1cImVtYWlsXCIvPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIGNsYXNzTmFtZT1cImlucHV0LXBhZGRpbmctc21cIiBwbGFjZWhvbGRlcj1cIlBhc3N3b3JkXCIgbmFtZT1cInBhc3N3b3JkXCIvPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgYnRuLWZ1bGwtd2lkdGhcIiB0eXBlPVwic3VibWl0XCI+U2lnbiBJbjwvYnV0dG9uPlxuICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICA8YSBjbGFzc05hbWU9XCJmb3Jnb3QtcHcgbGluay1ncmV5LWxpdGVcIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+Rm9yZ290IHBhc3N3b3JkPzwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2lnbmluLWNvbnRlbnQgc2VjdGlvbi1ib3JkZXIgc2lnbmluLWljb25zLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3ItZGl2aWRlclwiPjxzcGFuPk9SIFNJR04gSU4gV0lUSDwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdyByb3cteHNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTQgY29sLXBhZGRpbmcteHNcIj48YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tZmFjZWJvb2sgYnRuLWZ1bGwtd2lkdGhcIj48aSBjbGFzc05hbWU9XCJmYSBmYS1mYWNlYm9va1wiPjwvaT48L2J1dHRvbj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTQgY29sLXBhZGRpbmcteHNcIj48YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tdHdpdHRlciBidG4tZnVsbC13aWR0aFwiPjxpIGNsYXNzTmFtZT1cImZhIGZhLXR3aXR0ZXJcIj48L2k+PC9idXR0b24+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy00IGNvbC1wYWRkaW5nLXhzXCI+PGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWdvb2dsZSBidG4tZnVsbC13aWR0aFwiPjxpIGNsYXNzTmFtZT1cImZhIGZhLWdvb2dsZS1wbHVzXCI+PC9pPjwvYnV0dG9uPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvdWw+XG4gICAgKTtcbiAgfVxufSk7XG5cbnZhciBIZWFkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGhlYWRlckljb25zID0gW107XG5cbiAgICAvLyBUT0RPOiBJZiB1c2VycyBhcmUgbG9nZ2VkIGluLCBzd2l0Y2ggaWNvbnNcbiAgICAvLyBpZiAodGhpcy5wcm9wcy51c2VyID09PSB1bmRlZmluZWQgfHwgdGhpcy5wcm9wcy51c2VyID09PSBudWxsKSB7XG4gICAgaWYgKHRoaXMucHJvcHMudXNlciAhPT0gdW5kZWZpbmVkICYmIHRoaXMucHJvcHMudXNlciAhPT0gbnVsbCkge1xuICAgICAgaGVhZGVySWNvbnMucHVzaChcbiAgICAgICAgPEhlYWRlclByb2ZpbGVJY29uIGtleT17J0hlYWRlclByb2ZpbGVJY29uJ30gdXNlcj17dGhpcy5wcm9wcy51c2VyfSAvPlxuICAgICAgKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBoZWFkZXJJY29ucy5wdXNoKFxuICAgICAgICA8U2lnblVwU2lnbkluQnV0dG9ucyBrZXk9eydTaWduVXBTaWduSW5CdXR0b25zJ30gLz5cbiAgICAgICk7XG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlci1jb250ZW50LWNvbnRhaW5lciByb3dcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS02XCI+XG4gICAgICAgICAgICA8YSBocmVmPVwiL1wiPjxpbWcgY2xhc3NOYW1lPVwiaGVhZGVyLWxvZ29cIiBzcmM9XCJpbWFnZXMvbG9nby5wbmdcIi8+PC9hPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTYgaGVhZGVyLXNlY3Rpb25cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLWljb24tY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgIHtoZWFkZXJJY29uc31cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlcjsiLCIvKiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBDb3B5cmlnaHQgwqkgXG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyogID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgTWFpbi1Db21wb25lbnQgTWVkaWFFbnRyeVxuXG4gICAgQSBjb21wb25lbnQgZm9yIGVhY2ggaW5kaXZpZGFsIG1lZGlhIGVudHJ5LiBFYWNoIG1lZGlhIGVudHJ5IGhhcyBhIHRodW1ibmFpbCBhbmQgdGl0bGUuXG4gICAgRWFjaCBFbnRyeSBoYXMgYSBjYXRlZ29yeSB0eXBlIHRvIHNlZSB3aGVyZSB0aGUgbWVkaWEgZW50cnkgd291bGQgYmVsb25nIGFzIHdlbGwgYXMgYVxuICAgIG1lZGlhIHR5cGUgd2hpY2ggaXMgZWl0aGVyIFlvdXR1YmUsIFNvdW5kY2xvdWQsIG9yIFZpbWVvLiBFYWNoIGNvbXBvbmVudFxuICAgIGRldGVybWluZXMgdGhlIGNsYXNzIG5hbWUgZm9yIHRoZSBkaXZzIGJ5IGNoZWNraW5nIHRoZSBjYXRlZ29yeSB0eXBlcyBmcm9tIHRoZSBnaXZlbiBwcm9wZXJ0aWVzXG4gICAgb2YgdGhlIHBhcmVudCBjb21wb25lbnRzIChFaXRoZXIgZnJvbSBTZWFyY2ggb3IgUXVldWUpLlxuXG4gICAgQENvbXBvbmVudHM6ICBUaHVtYm5haWxcbiAgICAgICAgICAgICAgICAgIFRpdGxlXG4gICAgICAgICAgICAgICAgICBEdXJhdGlvblxuICAgICAgICAgICAgICAgICAgTWVkaWFFbnRyeVxuXG4gICAgQEV4cG9ydHM6ICAgICBNZWRpYUVudHJ5XG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgTW9kYWxDcmVhdGVQbGF5bGlzdCA9IHJlcXVpcmUoJy4vTW9kYWxDcmVhdGVQbGF5bGlzdC5qc3gnKTtcblxuLy8gRmx1eCBBY3Rpb25zXG52YXIgcGxheWxpc3RBY3Rpb25zID0gcmVxdWlyZSgnLi4vZmx1eC9hY3Rpb25zL2FjdGlvbnMnKTtcblxuLy8gVGh1bWJuYWlsIG9mIHRoZSBtZWRpYVxudmFyIFRodW1ibmFpbCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY2F0ZWdvcnlEaXZOYW1lO1xuICAgIHZhciBjYXRlZ29yeUNsYXNzTmFtZTtcbiAgICBzd2l0Y2godGhpcy5wcm9wcy5jYXRlZ29yeVR5cGUpIHtcbiAgICAgIGNhc2UgQ0FURUdPUllPRk1FRElBLlFVRVVFOlxuICAgICAgICBjYXRlZ29yeUNsYXNzTmFtZSA9ICdtZWRpYS1pbWcnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ0FURUdPUllPRk1FRElBLlBMQVlMSVNUOlxuICAgICAgICBjYXRlZ29yeUNsYXNzTmFtZSA9ICdtZWRpYS1pbWcnO1xuICAgICAgICBicmVhazsgIFxuICAgICAgY2FzZSBDQVRFR09SWU9GTUVESUEuU0VBUkNIOlxuICAgICAgICBjYXRlZ29yeUNsYXNzTmFtZSA9ICdzZWFyY2gtbWVkaWEtaW1nJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBFUlJPUiwgTm8gQ2F0ZWdvcnkgdHlwZVxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGltZyBjbGFzc05hbWU9e2NhdGVnb3J5Q2xhc3NOYW1lfSBzcmM9e3RoaXMucHJvcHMudGh1bWJuYWlsfSAvPlxuICAgICk7XG4gIH1cbn0pO1xuXG4vLyBNZWRpYSdzIHRpdGxlIGNvbXBvbmVudFxudmFyIFRpdGxlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjYXRlZ29yeURpdk5hbWU7XG4gICAgdmFyIGNhdGVnb3J5Q2xhc3NOYW1lO1xuICAgIHN3aXRjaCh0aGlzLnByb3BzLmNhdGVnb3J5VHlwZSkge1xuICAgICAgY2FzZSBDQVRFR09SWU9GTUVESUEuUVVFVUU6XG4gICAgICAgIGNhdGVnb3J5Q2xhc3NOYW1lID0gJ21lZGlhLXRpdGxlIGVsbGlwc2VzJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIENBVEVHT1JZT0ZNRURJQS5QTEFZTElTVDpcbiAgICAgICAgY2F0ZWdvcnlDbGFzc05hbWUgPSAnbWVkaWEtdGl0bGUgZWxsaXBzZXMnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ0FURUdPUllPRk1FRElBLlNFQVJDSDpcbiAgICAgICAgY2F0ZWdvcnlDbGFzc05hbWUgPSAnc2VhcmNoLW1lZGlhLXRpdGxlIGVsbGlwc2VzJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBFUlJPUiwgTm8gQ2F0ZWdvcnkgdHlwZVxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NhdGVnb3J5Q2xhc3NOYW1lfT5cbiAgICAgICAge3RoaXMucHJvcHMudGl0bGV9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxuLy8gTWVkaWEncyBhcnRpc3QgY29tcG9uZW50XG52YXIgQXJ0aXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjYXRlZ29yeURpdk5hbWU7XG4gICAgdmFyIGNhdGVnb3J5Q2xhc3NOYW1lO1xuICAgIHN3aXRjaCh0aGlzLnByb3BzLmNhdGVnb3J5VHlwZSkge1xuICAgICAgY2FzZSBDQVRFR09SWU9GTUVESUEuUVVFVUU6XG4gICAgICAgIGNhdGVnb3J5Q2xhc3NOYW1lID0gJ21lZGlhLWFydGlzdCBlbGxpcHNlcyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBDQVRFR09SWU9GTUVESUEuUExBWUxJU1Q6XG4gICAgICAgIGNhdGVnb3J5Q2xhc3NOYW1lID0gJ21lZGlhLWFydGlzdCBlbGxpcHNlcyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBDQVRFR09SWU9GTUVESUEuU0VBUkNIOlxuICAgICAgICBjYXRlZ29yeUNsYXNzTmFtZSA9ICdzZWFyY2gtbWVkaWEtYXJ0aXN0IGVsbGlwc2VzJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBFUlJPUiwgTm8gQ2F0ZWdvcnkgdHlwZVxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NhdGVnb3J5Q2xhc3NOYW1lfT5cbiAgICAgICAge3RoaXMucHJvcHMuYXJ0aXN0fVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSlcblxuLy8gTWVkaWEncyB0eXBlIGNvbXBvbmVudFxudmFyIFR5cGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNhdGVnb3J5Q2xhc3NOYW1lO1xuICAgIHZhciBtZWRpYVR5cGVJY29uO1xuICAgIHN3aXRjaCh0aGlzLnByb3BzLmNhdGVnb3J5VHlwZSkge1xuICAgICAgY2FzZSBDQVRFR09SWU9GTUVESUEuUVVFVUU6XG4gICAgICAgIGNhdGVnb3J5Q2xhc3NOYW1lID0gJ21lZGlhLXR5cGUnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ0FURUdPUllPRk1FRElBLlBMQVlMSVNUOlxuICAgICAgICBjYXRlZ29yeUNsYXNzTmFtZSA9ICdtZWRpYS10eXBlJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIENBVEVHT1JZT0ZNRURJQS5TRUFSQ0g6XG4gICAgICAgIGNhdGVnb3J5Q2xhc3NOYW1lID0gJ3NlYXJjaC1tZWRpYS10eXBlJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBFUlJPUiwgTm8gQ2F0ZWdvcnkgdHlwZVxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBzd2l0Y2godGhpcy5wcm9wcy50eXBlKSB7XG4gICAgICBjYXNlIE1FRElBVFlQRVMuWU9VVFVCRTpcbiAgICAgICAgbWVkaWFUeXBlSWNvbiA9ICdmYSBmYS15b3V0dWJlLXBsYXknO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgTUVESUFUWVBFUy5TT1VORENMT1VEOlxuICAgICAgICBtZWRpYVR5cGVJY29uID0gJ2ZhIGZhLXNvdW5kY2xvdWQnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgTUVESUFUWVBFUy5WSU1FTzpcbiAgICAgICAgbWVkaWFUeXBlSWNvbiA9ICdmYSBmYS12aW1lbyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgLy8gRVJST1IsIE5vIG1lZGlhIHR5cGVcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NhdGVnb3J5Q2xhc3NOYW1lfT48aSBjbGFzc05hbWU9e21lZGlhVHlwZUljb259PjwvaT48L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxuLy8gVE9ETzogVEJEIGlmIGR1cmF0aW9ucyBuZWVkIHRvIGJlIGltcGxlbWVudGVkIG9yIG5vdFxuLy8gTWVkaWEncyBEdXJhdGlvbiBjb21wb25lbnRcbnZhciBEdXJhdGlvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J21lZGlhLWR1cmF0aW9uJz5cbiAgICAgICAge3RoaXMucHJvcHMuZHVyYXRpb259XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxuLy8gRWFjaCBpbmRpdmlkdWFsIHBsYXlsaXN0IGVudHJ5IGluIHRoZSBkcm9wZG93biBsaXN0XG52YXIgUGxheWxpc3RFbnRyeSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgYWRkVG9QbGF5bGlzdDogZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coXCJBZGRpbmcgdG8gZXhpc3RpbmcgcGxheWxpc3RcIik7XG4gICAgY29uc29sZS5sb2codGhpcy5wcm9wcy5wbGF5bGlzdC5faWQpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMucHJvcHMuZGF0YSk7XG4gICAgJC5hamF4KHtcbiAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgdXJsOiBcIi9wbGF5bGlzdC9wdXNoL21lZGlhRW50cnlcIixcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICBjYWNoZTogZmFsc2UsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBtZWRpYURhdGE6IHRoaXMucHJvcHMuZGF0YSxcbiAgICAgICAgICBpZDogdGhpcy5wcm9wcy5wbGF5bGlzdC5faWQsXG4gICAgICAgICAgZmlyc3RFbnRyeTogdGhpcy5wcm9wcy5wbGF5bGlzdC5tZWRpYUVudHJpZXNbMF0gIFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJTdWNjZXNzOiBVcGRhdGluZyBwbGF5bGlzdFwiKTtcbiAgICAgICAgcGxheWxpc3RBY3Rpb25zLnVwZGF0ZVBsYXlsaXN0KGRhdGEudXBkYXRlZFBsYXlsaXN0KTtcbiAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgIGVycm9yOiBmdW5jdGlvbih4aHIsIHN0YXR1cywgZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFUlJPUjogQWRkIHRvIHBsYXlsaXN0IGVycm9yZWQgb3V0XCIsIHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpO1xuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgfSk7XG5cbiAgICAvLyBzb2NrZXQuZW1pdCgnRnJvbSBDbGllbnQ6IEFkZCB0byBleGlzdGluZyBwbGF5bGlzdCcsIHtcbiAgICAvLyAgIG1lZGlhRGF0YTogdGhpcy5wcm9wcy5kYXRhLFxuICAgIC8vICAgaWQ6IHRoaXMucHJvcHMucGxheWxpc3QuX2lkLFxuICAgIC8vICAgZmlyc3RFbnRyeTogdGhpcy5wcm9wcy5wbGF5bGlzdC5tZWRpYUVudHJpZXNbMF1cbiAgICAvLyB9KTtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybihcbiAgICAgIDxsaT48YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgb25DbGljaz17dGhpcy5hZGRUb1BsYXlsaXN0fT57dGhpcy5wcm9wcy5wbGF5bGlzdC5uYW1lfTwvYT48L2xpPiAgICAgIFxuICAgIClcbiAgfVxufSk7XG5cbi8vIEVhY2ggZHJvcGRvd24gZm9yIGV2ZXJ5IG1lZGlhIGVudHJ5XG52YXIgUGxheWxpc3REcm9wZG93biA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgYWRkVG9OZXdQbGF5bGlzdDogZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coXCJDcmVhdGluZyBuZXcgcGxheWxpc3Qgd2l0aCBtZWRpYVwiKTtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBwbGF5bGlzdEVudHJpZXMgPSBbXTtcbiAgICB2YXIgbW9kYWxJZCA9IFwiI2NyZWF0ZS1wbGF5bGlzdC1cIiArIHRoaXMucHJvcHMucG9zO1xuXG4gICAgaWYgKHRoaXMucHJvcHMubXlQbGF5bGlzdHMgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnByb3BzLm15UGxheWxpc3RzICE9PSBudWxsKSB7XG4gICAgICAvLyBTZXRzIHRoZSBwbGF5bGlzdHMgaW4gdGhlIGRyb3Bkb3duXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucHJvcHMubXlQbGF5bGlzdHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgcGxheWxpc3RFbnRyaWVzLnB1c2goXG4gICAgICAgICAgPFBsYXlsaXN0RW50cnkga2V5PXtpfSBkYXRhPXt0aGlzLnByb3BzLmRhdGF9IHBsYXlsaXN0PXt0aGlzLnByb3BzLm15UGxheWxpc3RzW2ldfSAvPlxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8dWwgY2xhc3NOYW1lPVwiZHJvcGRvd24tbWVudSBkcm9wZG93bi1tZW51LXJpZ2h0XCI+XG4gICAgICAgIDxsaSBjbGFzc05hbWU9XCJkcm9wZG93bi1oZWFkZXJcIj5BZGQgVG88L2xpPlxuICAgICAgICB7cGxheWxpc3RFbnRyaWVzfVxuICAgICAgICA8bGkgcm9sZT1cInNlcGFyYXRvclwiIGNsYXNzTmFtZT1cImRpdmlkZXJcIj48L2xpPlxuICAgICAgICA8bGk+PGEgZGF0YS10b2dnbGU9XCJtb2RhbFwiIGRhdGEtdGFyZ2V0PXttb2RhbElkfSBvbkNsaWNrPXt0aGlzLmFkZFRvTmV3UGxheWxpc3R9PkFkZCB0byBOZXcgUGxheWxpc3Q8L2E+PC9saT5cbiAgICAgIDwvdWw+XG4gICAgKTtcbiAgfVxufSk7XG5cbi8vIE1BSU4gQ09NUE9ORU5UOiBFYWNoIGluZGl2aWR1YWwgbWVkaWEgZW50cnkgaW4gdGhlIGxpc3RcbnZhciBNZWRpYUVudHJ5ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAvLyBFVkVOVCBIQU5ETEVSOiBXaGVuIHRoZSBhZGQgdG8gcXVldWUgYnV0dG9uIGlzIGNsaWNrZWQsIGFkZHMgdGhlIG1lZGlhIHRvIHRoZSBxdWV1ZS5cbiAgYWRkVG9RdWV1ZTogZnVuY3Rpb24oKSB7XG4gICAgdmFyIG1lZGlhRW50cnkgPSB7XG4gICAgICBtZWRpYUlkOiB0aGlzLnByb3BzLm1lZGlhSWQsXG4gICAgICBtZWRpYVR5cGU6IHRoaXMucHJvcHMubWVkaWFUeXBlLFxuICAgICAgdGh1bWJuYWlsOiB0aGlzLnByb3BzLnRodW1ibmFpbCxcbiAgICAgIHRpdGxlOiB0aGlzLnByb3BzLnRpdGxlLFxuICAgICAgYXJ0aXN0OiB0aGlzLnByb3BzLmFydGlzdCxcbiAgICAgIGlmTWVkaWFDYXJkQWRkZWQ6IHRydWVcbiAgICB9XG4gICAgc29ja2V0LmVtaXQoJ0Zyb20gQ2xpZW50OiBQdXNoIGludG8gcXVldWUnLCBtZWRpYUVudHJ5KTtcbiAgfSxcblxuICAvLyBFVkVOVCBIQU5ETEVSOiBXaGVuIHRoZSBwbGF5IGJ1dHRvbiBpcyBjbGlja2VkLCBwbGF5cyB0aGUgbWVkaWEgZW50cnkgb250byB0aGUgbWVkaWEgcGxheWVyXG4gIHBsYXlNZWRpYUVudHJ5OiBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5jYXRlZ29yeVR5cGUgPT0gQ0FURUdPUllPRk1FRElBLlNFQVJDSCB8fCB0aGlzLnByb3BzLmNhdGVnb3J5VHlwZSA9PSBDQVRFR09SWU9GTUVESUEuUExBWUxJU1QpIHtcbiAgICAgIHZhciBtZWRpYUVudHJ5ID0ge1xuICAgICAgICBtZWRpYUlkOiB0aGlzLnByb3BzLm1lZGlhSWQsXG4gICAgICAgIG1lZGlhVHlwZTogdGhpcy5wcm9wcy5tZWRpYVR5cGUsXG4gICAgICAgIHRodW1ibmFpbDogdGhpcy5wcm9wcy50aHVtYm5haWwsXG4gICAgICAgIHRpdGxlOiB0aGlzLnByb3BzLnRpdGxlLFxuICAgICAgICBhcnRpc3Q6IHRoaXMucHJvcHMuYXJ0aXN0LFxuICAgICAgICBpZk1lZGlhQ2FyZEFkZGVkOiB0cnVlXG4gICAgICB9XG4gICAgICBzb2NrZXQuZW1pdCgnRnJvbSBDbGllbnQ6IFBsYXkgbmV3IG1lZGlhIGVudHJ5JywgbWVkaWFFbnRyeSk7ICBcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy5wcm9wcy5jYXRlZ29yeVR5cGUgPT0gQ0FURUdPUllPRk1FRElBLlFVRVVFKSB7XG4gICAgICB2YXIgcXVldWVFbnRyeSA9IHtcbiAgICAgICAgbWVkaWFJZDogdGhpcy5wcm9wcy5tZWRpYUlkLFxuICAgICAgICBtZWRpYVR5cGU6IHRoaXMucHJvcHMubWVkaWFUeXBlLFxuICAgICAgICB0aHVtYm5haWw6IHRoaXMucHJvcHMudGh1bWJuYWlsLFxuICAgICAgICB0aXRsZTogdGhpcy5wcm9wcy50aXRsZSxcbiAgICAgICAgYXJ0aXN0OiB0aGlzLnByb3BzLmFydGlzdCxcbiAgICAgICAgaWZNZWRpYUNhcmRBZGRlZDogdHJ1ZSxcbiAgICAgICAgcG9zSW5RdWV1ZTogdGhpcy5wcm9wcy5wb3NcbiAgICAgIH1cbiAgICAgIHNvY2tldC5lbWl0KCdGcm9tIENsaWVudDogUGxheSBuZXcgbWVkaWEgZW50cnkgZnJvbSBxdWV1ZScsIHF1ZXVlRW50cnkpOyAgIFxuICAgIH1cbiAgfSxcblxuICAvLyBFVkVOVCBIQU5ETEVSOiBXaGVuIHRoZSBkZWxldGUgYnV0dG9uIGlzIGNsaWNrZWQsIHJlbW92ZXMgdGhlIG1lZGlhIGVudHJ5IGZyb20gcXVldWVcbiAgZGVsZXRlTWVkaWFFbnRyeTogZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coXCJEZWxldGUgTWVkaWEgRW50cnkgZnJvbSBRdWV1ZVwiKTtcbiAgICB2YXIgbWVkaWFFbnRyeSA9IHtcbiAgICAgIG1lZGlhSWQ6IHRoaXMucHJvcHMubWVkaWFJZCxcbiAgICAgIG1lZGlhVHlwZTogdGhpcy5wcm9wcy5tZWRpYVR5cGUsXG4gICAgICB0aHVtYm5haWw6IHRoaXMucHJvcHMudGh1bWJuYWlsLFxuICAgICAgdGl0bGU6IHRoaXMucHJvcHMudGl0bGUsXG4gICAgICBhcnRpc3Q6IHRoaXMucHJvcHMuYXJ0aXN0LFxuICAgICAgaWZNZWRpYUNhcmRBZGRlZDogdHJ1ZSxcbiAgICAgIHBvc0luUXVldWU6IHRoaXMucHJvcHMucG9zXG4gICAgfVxuICAgIHNvY2tldC5lbWl0KCdGcm9tIENsaWVudDogRGVsZXRlIG1lZGlhIGVudHJ5IGZyb20gcXVldWUnLCBtZWRpYUVudHJ5KTtcbiAgfSxcblxuICAvLyBFVkVOVCBIQU5ETEVSOiBNb3ZlcyBtZWRpYSBlbnRyeSB0byB0aGUgZnJvbnQgb2YgdGhlIHF1ZXVlIGFzIGEgcGxheSBuZXh0IG1lZGlhXG4gIG1vdmVUb0Zyb250T2ZUaGVRdWV1ZTogZnVuY3Rpb24oKSB7XG4gICAgdmFyIG1lZGlhRW50cnkgPSB7XG4gICAgICBtZWRpYUlkOiB0aGlzLnByb3BzLm1lZGlhSWQsXG4gICAgICBtZWRpYVR5cGU6IHRoaXMucHJvcHMubWVkaWFUeXBlLFxuICAgICAgdGh1bWJuYWlsOiB0aGlzLnByb3BzLnRodW1ibmFpbCxcbiAgICAgIHRpdGxlOiB0aGlzLnByb3BzLnRpdGxlLFxuICAgICAgYXJ0aXN0OiB0aGlzLnByb3BzLmFydGlzdCxcbiAgICAgIGlmTWVkaWFDYXJkQWRkZWQ6IHRydWUsXG4gICAgICBwb3NJblF1ZXVlOiB0aGlzLnByb3BzLnBvc1xuICAgIH1cbiAgICBzb2NrZXQuZW1pdCgnRnJvbSBDbGllbnQ6IE1vdmUgbWVkaWEgZW50cnkgdG8gZnJvbnQgb2YgcXVldWUnLCBtZWRpYUVudHJ5KTtcbiAgfSxcblxuICAvLyBFVkVOVCBIQU5ETEVSOiBEZWxldGVzIHBsYXlsaXN0IGVudHJ5IGluIHRoZSBvcGVuZWQgZWRpdCBwbGF5bGlzdFxuICBkZWxldGVQbGF5bGlzdEVudHJ5OiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnByb3BzLmRlbGV0ZUVudHJ5KHRoaXMucHJvcHMucG9zKTtcbiAgfSxcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAvLyBUaGlzIG5lZWRzIHRvIGJlIHJldG9vbHRpcHBlZCBiZWNhdXNlIHRoZSBtZWRpYSBlbnRyaWVzIGFyZSBub3QgcmVuZGVyZWQgd2hlbiB0aGUgc2l0ZSBsb2Fkcy5cbiAgICAkKHRoaXMuaWNvbjEpLnRvb2x0aXAoKTtcbiAgICAkKHRoaXMuaWNvbjIpLnRvb2x0aXAoKTtcbiAgICAkKHRoaXMuaWNvbjMpLnRvb2x0aXAoKTtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjYXRlZ29yeURpdk5hbWU7XG4gICAgdmFyIGNhdGVnb3J5Q2xhc3NOYW1lO1xuXG4gICAgLy8gUmVuZGVycyB0aGUgTWVkaWEgZW50cnkgdG8gdGhlIGNvcnJlY3QgY2F0ZWdvcnkuXG4gICAgc3dpdGNoKHRoaXMucHJvcHMuY2F0ZWdvcnlUeXBlKSB7XG4gICAgICAvLyBNZWRpYSBFbnRyeSB0aGF0IGlzIGluIHRoZSBRdWV1ZSBjb21wb25lbnRcbiAgICAgIGNhc2UgQ0FURUdPUllPRk1FRElBLlFVRVVFOlxuICAgICAgICB2YXIgcXVldWVNZWRpYUVudHJ5SWQgPSBcIi1xdWV1ZS1tZWRpYS1lbnRyeS1pZFwiO1xuICAgICAgICB2YXIgcXVldWVNZWRpYUNhcmRDbGFzc05hbWUgPSBcIm1lZGlhLWNhcmQgZ3JhYmJhYmxlXCI7XG4gICAgICAgIHZhciBpY29uQ2xhc3NOYW1lID0gXCJpY29uLWJ0blwiO1xuICAgICAgICB2YXIgZGVsZXRlQnV0dG9uID0gW107XG5cbiAgICAgICAgLy8gQWRkcyB0aGUgbWVkaWEtY2FyZC1hZGRlZCBjbGFzcyBpZiB0aGUgbWVkaWEgZW50cnkgd2FzIGFkZGVkIGluZGl2aWR1YWxseVxuICAgICAgICBpZiAodGhpcy5wcm9wcy5pZk1lZGlhQ2FyZEFkZGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgcXVldWVNZWRpYUNhcmRDbGFzc05hbWUgKz0gXCIgbWVkaWEtY2FyZC1hZGRlZFwiO1xuICAgICAgICAgIGljb25DbGFzc05hbWUgKz0gXCItYmx1ZS1saXRlXCI7XG4gICAgICAgICAgZGVsZXRlQnV0dG9uLnB1c2ggKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZWRpYS1jYXJkLWFkZGVkLWNvcm5lci1jb250YWluZXJcIj48ZGl2IGNsYXNzTmFtZT1cIm1lZGlhLWNhcmQtYWRkZWQtY29ybmVyXCI+PC9kaXY+PC9kaXY+XG4gICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cIm1lZGlhLWNhcmQtYWRkZWQtcGx1cyBpY29uLWJ0bi13aGl0ZVwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBvbkNsaWNrPXt0aGlzLmRlbGV0ZU1lZGlhRW50cnl9Pis8L2E+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgaW4gdGhlIGZyb250IG9mIHRoZSBxdWV1ZSwgcmVuZGVycyBhIG1lZGlhIGVudHJ5IHRoYXQgd291bGQgcGxheSBuZXh0XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnBvcyA9PT0gUExBWU5FWFRNRURJQUVOVFJZUE9TKSB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgaWQ9e3RoaXMucHJvcHMucG9zICsgcXVldWVNZWRpYUVudHJ5SWR9IGNsYXNzTmFtZT17cXVldWVNZWRpYUNhcmRDbGFzc05hbWV9PlxuICAgICAgICAgICAgICB7ZGVsZXRlQnV0dG9ufVxuICAgICAgICAgICAgICA8VGh1bWJuYWlsIHRodW1ibmFpbD17dGhpcy5wcm9wcy50aHVtYm5haWx9IGNhdGVnb3J5VHlwZT17dGhpcy5wcm9wcy5jYXRlZ29yeVR5cGV9IC8+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVkaWEtbmV4dFwiPlBMQVlJTkcgTkVYVDo8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJudW1iZXJcIj57dGhpcy5wcm9wcy5wb3MgKyAxfTwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVkaWEtdGV4dC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8VGl0bGUgdGl0bGU9e3RoaXMucHJvcHMudGl0bGV9IGNhdGVnb3J5VHlwZT17dGhpcy5wcm9wcy5jYXRlZ29yeVR5cGV9IC8+XG4gICAgICAgICAgICAgICAgPEFydGlzdCBhcnRpc3Q9e3RoaXMucHJvcHMuYXJ0aXN0fSBjYXRlZ29yeVR5cGU9e3RoaXMucHJvcHMuY2F0ZWdvcnlUeXBlfSAvPlxuICAgICAgICAgICAgICAgIDxUeXBlIHR5cGU9e3RoaXMucHJvcHMubWVkaWFUeXBlfSBjYXRlZ29yeVR5cGU9e3RoaXMucHJvcHMuY2F0ZWdvcnlUeXBlfSAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVkaWEtaWNvbi1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVkaWEtaWNvblwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPXtpY29uQ2xhc3NOYW1lfSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgb25DbGljaz17dGhpcy5wbGF5TWVkaWFFbnRyeX0+PGRpdiBjbGFzc05hbWU9XCJtZWRpYS1pY29uXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtcGxheVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT48L2Rpdj48L2E+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEV2ZXJ5IG90aGVyIG1lZGlhIGVudHJ5IGluIHRoZSBxdWV1ZVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxkaXYgaWQ9e3RoaXMucHJvcHMucG9zICsgcXVldWVNZWRpYUVudHJ5SWR9IGNsYXNzTmFtZT17cXVldWVNZWRpYUNhcmRDbGFzc05hbWV9PlxuICAgICAgICAgICAge2RlbGV0ZUJ1dHRvbn1cbiAgICAgICAgICAgIDxUaHVtYm5haWwgdGh1bWJuYWlsPXt0aGlzLnByb3BzLnRodW1ibmFpbH0gY2F0ZWdvcnlUeXBlPXt0aGlzLnByb3BzLmNhdGVnb3J5VHlwZX0gLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibnVtYmVyXCI+e3RoaXMucHJvcHMucG9zICsgMX08L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZWRpYS10ZXh0LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICA8VGl0bGUgdGl0bGU9e3RoaXMucHJvcHMudGl0bGV9IGNhdGVnb3J5VHlwZT17dGhpcy5wcm9wcy5jYXRlZ29yeVR5cGV9IC8+XG4gICAgICAgICAgICAgIDxBcnRpc3QgYXJ0aXN0PXt0aGlzLnByb3BzLmFydGlzdH0gY2F0ZWdvcnlUeXBlPXt0aGlzLnByb3BzLmNhdGVnb3J5VHlwZX0gLz5cbiAgICAgICAgICAgICAgPFR5cGUgdHlwZT17dGhpcy5wcm9wcy5tZWRpYVR5cGV9IGNhdGVnb3J5VHlwZT17dGhpcy5wcm9wcy5jYXRlZ29yeVR5cGV9IC8+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVkaWEtaWNvbi1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1lZGlhLWljb25cIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e2ljb25DbGFzc05hbWV9IGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBvbkNsaWNrPXt0aGlzLm1vdmVUb0Zyb250T2ZUaGVRdWV1ZX0+PGRpdiBjbGFzc05hbWU9XCJtZWRpYS1pY29uXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtY2hldnJvbi11cFwiIGRhdGEtdG9nZ2xlPVwidG9vbHRpcFwiIHRpdGxlPVwiTW92ZSB0byBUb3BcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+PC9kaXY+PC9hPlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT17aWNvbkNsYXNzTmFtZX0gaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIG9uQ2xpY2s9e3RoaXMucGxheU1lZGlhRW50cnl9PjxkaXYgY2xhc3NOYW1lPVwibWVkaWEtaWNvblwiPjxpIGNsYXNzTmFtZT1cImZhIGZhLXBsYXlcIiBkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIiB0aXRsZT1cIlBsYXkgTm93XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPjwvZGl2PjwvYT5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTsgXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvLyBNZWRpYSBFbnRyeSB0aGF0IGlzIGluIHRoZSBwbGF5bGlzdCBlbnRyeSBjb21wb25lbnRcbiAgICAgIGNhc2UgQ0FURUdPUllPRk1FRElBLlBMQVlMSVNUOlxuICAgICAgICB2YXIgZHJvcGRvd24gPSBbXTtcbiAgICAgICAgdmFyIG1lZGlhRGF0YSA9IHtcbiAgICAgICAgICBhcnRpc3Q6IHRoaXMucHJvcHMuYXJ0aXN0LFxuICAgICAgICAgIG1lZGlhSWQ6IHRoaXMucHJvcHMubWVkaWFJZCxcbiAgICAgICAgICBtZWRpYVR5cGU6IHRoaXMucHJvcHMubWVkaWFUeXBlLFxuICAgICAgICAgIHRodW1ibmFpbDogdGhpcy5wcm9wcy50aHVtYm5haWwsXG4gICAgICAgICAgdGl0bGU6IHRoaXMucHJvcHMudGl0bGVcbiAgICAgICAgICAvLyBUT0RPOiBUaGUgc2VhcmNoIGVudHJ5IGRvZXMgbm90IGhhdmUgdGhlIHNhbWUgZGIgX2lkLiBOZWVkIHRvIGZpbmQgYSB3YXkgdG8gYWRkIG1lZGlhIGVudHJpZXMgd2l0aG91dCBkdXBsaWNhdGVzXG4gICAgICAgICAgLy8gX2lkOiB0aGlzLnByb3BzLl9pZFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIElmIGEgdXNlciBpcyBsb2dnZWQgaW4sIHRoZSBkcm9wZG93biBhcHBlYXJzICAgICAgICBcbiAgICAgICAgZHJvcGRvd24ucHVzaChcbiAgICAgICAgICA8ZGl2IGtleT17dGhpcy5wcm9wcy5wb3N9IGNsYXNzTmFtZT1cIm1lZGlhLWljb25cIj5cbiAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImljb24tYnRuLWJsdWUtbGl0ZSBkcm9wZG93bi10b2dnbGVcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCIgYXJpYS1oYXNwb3B1cD1cInRydWVcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtbGlzdC11bFwiIHJlZj17KHJlZikgPT4gdGhpcy5pY29uMyA9IHJlZn0gZGF0YS10b2dnbGU9XCJ0b29sdGlwXCIgdGl0bGU9XCJBZGQgdG8gUGxheWxpc3RcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+PC9hPlxuICAgICAgICAgICAgPFBsYXlsaXN0RHJvcGRvd24gbXlQbGF5bGlzdHM9e3RoaXMucHJvcHMubXlQbGF5bGlzdHN9IGRhdGE9e21lZGlhRGF0YX0gcG9zPXt0aGlzLnByb3BzLnBvc30gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcblxuICAgICAgICAvLyBJZiB0aGUgcGxheWxpc3QgaXMgYSBsaWtlZCBvbmVcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub3duZXIgPT09IGZhbHNlKSB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTYgY29sLXNtLTEyIGNvbC1wYWRkaW5nXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxheWxpc3QtbWVkaWEtY2FyZFwiPlxuICAgICAgICAgICAgICAgIDxUaHVtYm5haWwgdGh1bWJuYWlsPXt0aGlzLnByb3BzLnRodW1ibmFpbH0gY2F0ZWdvcnlUeXBlPXt0aGlzLnByb3BzLmNhdGVnb3J5VHlwZX0gLz5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVkaWEtdGV4dC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgIDxUaXRsZSB0aXRsZT17dGhpcy5wcm9wcy50aXRsZX0gY2F0ZWdvcnlUeXBlPXt0aGlzLnByb3BzLmNhdGVnb3J5VHlwZX0gLz5cbiAgICAgICAgICAgICAgICAgIDxBcnRpc3QgYXJ0aXN0PXt0aGlzLnByb3BzLmFydGlzdH0gY2F0ZWdvcnlUeXBlPXt0aGlzLnByb3BzLmNhdGVnb3J5VHlwZX0gLz5cbiAgICAgICAgICAgICAgICAgIDxUeXBlIHR5cGU9e3RoaXMucHJvcHMubWVkaWFUeXBlfSBjYXRlZ29yeVR5cGU9e3RoaXMucHJvcHMuY2F0ZWdvcnlUeXBlfSAvPlxuXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1lZGlhLWljb24tY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVkaWEtaWNvblwiPjxhIGNsYXNzTmFtZT1cImljb24tYnRuXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIG9uQ2xpY2s9e3RoaXMuYWRkVG9RdWV1ZX0+PGkgY2xhc3NOYW1lPVwiZmEgZmEtcGx1c1wiIHJlZj17KHJlZikgPT4gdGhpcy5pY29uMSA9IHJlZn0gZGF0YS10b2dnbGU9XCJ0b29sdGlwXCIgdGl0bGU9XCJBZGQgdG8gUXVldWVcIj48L2k+PC9hPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1lZGlhLWljb25cIj48YSBjbGFzc05hbWU9XCJpY29uLWJ0blwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBvbkNsaWNrPXt0aGlzLnBsYXlNZWRpYUVudHJ5fT48aSBjbGFzc05hbWU9XCJmYSBmYS1wbGF5XCIgcmVmPXsocmVmKSA9PiB0aGlzLmljb24yID0gcmVmfSBkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIiB0aXRsZT1cIlBsYXkgTm93XCI+PC9pPjwvYT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAge2Ryb3Bkb3dufVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8TW9kYWxDcmVhdGVQbGF5bGlzdCBcbiAgICAgICAgICAgICAgICAgIGtleT17dGhpcy5wcm9wcy5wb3N9IFxuICAgICAgICAgICAgICAgICAgdXNlcj17dGhpcy5wcm9wcy51c2VyfVxuICAgICAgICAgICAgICAgICAgZGF0YT17bWVkaWFEYXRhfSBcbiAgICAgICAgICAgICAgICAgIHBvcz17dGhpcy5wcm9wcy5wb3N9IC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkZWxldGVJbmRpY2F0b3JDbGFzcyA9IFwiIFwiO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5kZWxldGVJbmRpY2F0b3IgPT09IGZhbHNlKSB7XG4gICAgICAgICAgZGVsZXRlSW5kaWNhdG9yQ2xhc3MgPSBcIiBtZWRpYS1jYXJkLWFkZGVkIFwiO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgdGhlIHBsYXlsaXN0IHdhcyBtYWRlIGJ5IHRoZSBjdXJyZW50IHVzZXJcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJjb2wtbWQtNiBjb2wtc20tMTIgY29sLXBhZGRpbmcgZWRpdC1wbGF5bGlzdC1jYXJkXCJ9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wicGxheWxpc3QtbWVkaWEtY2FyZFwiICsgZGVsZXRlSW5kaWNhdG9yQ2xhc3MgKyBcImdyYWJiYWJsZVwifT5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZWRpYS1jYXJkLWFkZGVkLWNvcm5lci1jb250YWluZXJcIj48ZGl2IGNsYXNzTmFtZT1cIm1lZGlhLWNhcmQtYWRkZWQtY29ybmVyXCI+PC9kaXY+PC9kaXY+XG4gICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cIm1lZGlhLWNhcmQtYWRkZWQtcGx1cyBpY29uLWJ0bi13aGl0ZVwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBvbkNsaWNrPXt0aGlzLmRlbGV0ZVBsYXlsaXN0RW50cnl9Pis8L2E+XG4gICAgICAgICAgICAgIDxUaHVtYm5haWwgdGh1bWJuYWlsPXt0aGlzLnByb3BzLnRodW1ibmFpbH0gY2F0ZWdvcnlUeXBlPXt0aGlzLnByb3BzLmNhdGVnb3J5VHlwZX0gLz5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1lZGlhLXRleHQtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgPFRpdGxlIHRpdGxlPXt0aGlzLnByb3BzLnRpdGxlfSBjYXRlZ29yeVR5cGU9e3RoaXMucHJvcHMuY2F0ZWdvcnlUeXBlfSAvPlxuICAgICAgICAgICAgICAgIDxBcnRpc3QgYXJ0aXN0PXt0aGlzLnByb3BzLmFydGlzdH0gY2F0ZWdvcnlUeXBlPXt0aGlzLnByb3BzLmNhdGVnb3J5VHlwZX0gLz5cbiAgICAgICAgICAgICAgICA8VHlwZSB0eXBlPXt0aGlzLnByb3BzLm1lZGlhVHlwZX0gY2F0ZWdvcnlUeXBlPXt0aGlzLnByb3BzLmNhdGVnb3J5VHlwZX0gLz5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVkaWEtaWNvbi1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVkaWEtaWNvblwiPjxhIGNsYXNzTmFtZT1cImljb24tYnRuLWJsdWUtbGl0ZVwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBvbkNsaWNrPXt0aGlzLmFkZFRvUXVldWV9PjxpIGNsYXNzTmFtZT1cImZhIGZhLXBsdXNcIiByZWY9eyhyZWYpID0+IHRoaXMuaWNvbjEgPSByZWZ9IGRhdGEtdG9nZ2xlPVwidG9vbHRpcFwiIHRpdGxlPVwiQWRkIHRvIFF1ZXVlXCI+PC9pPjwvYT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVkaWEtaWNvblwiPjxhIGNsYXNzTmFtZT1cImljb24tYnRuLWJsdWUtbGl0ZVwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBvbkNsaWNrPXt0aGlzLnBsYXlNZWRpYUVudHJ5fT48aSBjbGFzc05hbWU9XCJmYSBmYS1wbGF5XCIgcmVmPXsocmVmKSA9PiB0aGlzLmljb24yID0gcmVmfSBkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIiB0aXRsZT1cIlBsYXkgTm93XCI+PC9pPjwvYT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgIHtkcm9wZG93bn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPE1vZGFsQ3JlYXRlUGxheWxpc3QgXG4gICAgICAgICAgICAgICAga2V5PXt0aGlzLnByb3BzLnBvc30gXG4gICAgICAgICAgICAgICAgdXNlcj17dGhpcy5wcm9wcy51c2VyfVxuICAgICAgICAgICAgICAgIGRhdGE9e21lZGlhRGF0YX0gXG4gICAgICAgICAgICAgICAgcG9zPXt0aGlzLnByb3BzLnBvc30gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvLyBNZWRpYSBFbnRyeSBpbiB0aGUgU2VhcmNoIGNvbXBvbmVudCwgYWxzbyBoYXMgYSBidXR0b24gdGhhdCBhZGRzIHRoZSBtZWRpYSBlbnRyeSBpbnRvIHRoZSBxdWV1ZVxuICAgICAgY2FzZSBDQVRFR09SWU9GTUVESUEuU0VBUkNIOlxuICAgICAgICB2YXIgZHJvcGRvd24gPSBbXTtcbiAgICAgICAgdmFyIHNlYXJjaE1lZGlhRW50cnlJZCA9IFwiLXNlYXJjaC1tZWRpYS1lbnRyeS1pZFwiO1xuICAgICAgICB2YXIgbWVkaWFEYXRhID0ge1xuICAgICAgICAgIGFydGlzdDogdGhpcy5wcm9wcy5hcnRpc3QsXG4gICAgICAgICAgbWVkaWFJZDogdGhpcy5wcm9wcy5tZWRpYUlkLFxuICAgICAgICAgIG1lZGlhVHlwZTogdGhpcy5wcm9wcy5tZWRpYVR5cGUsXG4gICAgICAgICAgdGh1bWJuYWlsOiB0aGlzLnByb3BzLnRodW1ibmFpbCxcbiAgICAgICAgICB0aXRsZTogdGhpcy5wcm9wcy50aXRsZVxuICAgICAgICAgIC8vIFRPRE86IFRoZSBzZWFyY2ggZW50cnkgZG9lcyBub3QgaGF2ZSB0aGUgc2FtZSBkYiBfaWQuIE5lZWQgdG8gZmluZCBhIHdheSB0byBhZGQgbWVkaWEgZW50cmllcyB3aXRob3V0IGR1cGxpY2F0ZXNcbiAgICAgICAgICAvLyBfaWQ6IHRoaXMucHJvcHMuX2lkXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gV2hlbiB0aGUgdXNlciBpcyBub3QgbG9nZ2VkIGluLCB0aGVyZSBpcyBubyBkcm9wZG93blxuICAgICAgICBpZiAodGhpcy5wcm9wcy51c2VyID09PSB1bmRlZmluZWQgfHwgdGhpcy5wcm9wcy51c2VyID09PSBudWxsKSB7XG4gICAgICAgICAgZHJvcGRvd24gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiBhIHVzZXIgaXMgbG9nZ2VkIGluLCB0aGUgZHJvcGRvd24gYXBwZWFyc1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkcm9wZG93bi5wdXNoKFxuICAgICAgICAgICAgPGRpdiBrZXk9e3RoaXMucHJvcHMucG9zfSBjbGFzc05hbWU9XCJzZWFyY2gtbWVkaWEtaWNvblwiPlxuICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJpY29uLWJ0biBkcm9wZG93bi10b2dnbGVcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCIgYXJpYS1oYXNwb3B1cD1cInRydWVcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtbGlzdC11bFwiIHJlZj17KHJlZikgPT4gdGhpcy5pY29uMyA9IHJlZn0gZGF0YS10b2dnbGU9XCJ0b29sdGlwXCIgdGl0bGU9XCJBZGQgdG8gUGxheWxpc3RcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+PC9hPlxuICAgICAgICAgICAgICA8UGxheWxpc3REcm9wZG93biBteVBsYXlsaXN0cz17dGhpcy5wcm9wcy5teVBsYXlsaXN0c30gZGF0YT17bWVkaWFEYXRhfSBwb3M9e3RoaXMucHJvcHMucG9zfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGRpdiBpZD17dGhpcy5wcm9wcy5wb3MgKyBzZWFyY2hNZWRpYUVudHJ5SWR9IGNsYXNzTmFtZT17XCJzZWFyY2gtY2FyZC1wYWRkaW5nXCJ9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2gtbWVkaWEtY2FyZFwiPlxuICAgICAgICAgICAgICA8VGh1bWJuYWlsIHRodW1ibmFpbD17dGhpcy5wcm9wcy50aHVtYm5haWx9IGNhdGVnb3J5VHlwZT17dGhpcy5wcm9wcy5jYXRlZ29yeVR5cGV9IC8+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2gtbWVkaWEtdGV4dC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8VGl0bGUgdGl0bGU9e3RoaXMucHJvcHMudGl0bGV9IGNhdGVnb3J5VHlwZT17dGhpcy5wcm9wcy5jYXRlZ29yeVR5cGV9IC8+XG4gICAgICAgICAgICAgICAgPEFydGlzdCBhcnRpc3Q9e3RoaXMucHJvcHMuYXJ0aXN0fSBjYXRlZ29yeVR5cGU9e3RoaXMucHJvcHMuY2F0ZWdvcnlUeXBlfSAvPlxuICAgICAgICAgICAgICAgIDxUeXBlIHR5cGU9e3RoaXMucHJvcHMubWVkaWFUeXBlfSBjYXRlZ29yeVR5cGU9e3RoaXMucHJvcHMuY2F0ZWdvcnlUeXBlfSAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogVE9ETyBtYWtlIHRvb2x0aXBzIHdvcmsgYW5kIG1ha2UgZHJvcGRvd24gd29yayAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2gtbWVkaWEtaWNvbi1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaC1tZWRpYS1pY29uXCI+PGEgaWQ9e1wibWVkaWEtZW50cnktYnV0dG9uLVwiICsgdGhpcy5wcm9wcy5wb3N9IGNsYXNzTmFtZT1cImljb24tYnRuXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIG9uQ2xpY2s9e3RoaXMuYWRkVG9RdWV1ZX0+PGkgY2xhc3NOYW1lPVwiZmEgZmEtcGx1cyBmYS1sZ1wiIHJlZj17KHJlZikgPT4gdGhpcy5pY29uMSA9IHJlZn0gZGF0YS10b2dnbGU9XCJ0b29sdGlwXCIgdGl0bGU9XCJBZGQgdG8gUXVldWVcIj48L2k+PC9hPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoLW1lZGlhLWljb25cIj48YSBjbGFzc05hbWU9XCJpY29uLWJ0blwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBvbkNsaWNrPXt0aGlzLnBsYXlNZWRpYUVudHJ5fT48aSBjbGFzc05hbWU9XCJmYSBmYS1wbGF5XCIgcmVmPXsocmVmKSA9PiB0aGlzLmljb24yID0gcmVmfSBkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIiB0aXRsZT1cIlBsYXkgTm93XCI+PC9pPjwvYT48L2Rpdj5cbiAgICAgICAgICAgICAgICB7ZHJvcGRvd259XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxNb2RhbENyZWF0ZVBsYXlsaXN0IFxuICAgICAgICAgICAgICBrZXk9e3RoaXMucHJvcHMucG9zfSBcbiAgICAgICAgICAgICAgdXNlcj17dGhpcy5wcm9wcy51c2VyfVxuICAgICAgICAgICAgICBkYXRhPXttZWRpYURhdGF9IFxuICAgICAgICAgICAgICBwb3M9e3RoaXMucHJvcHMucG9zfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgICAgICBicmVhaztcblxuICAgICAgLy8gRVJST1IsIE5vIENhdGVnb3J5IHR5cGVcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnNvbGUubG9nKCdNZWRpYSBDYXRlZ29yeSBFcnJvcjogTk8gVFlQRScpO1xuICAgICAgICByZXR1cm47XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTWVkaWFFbnRyeTsiLCIvKiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBDb3B5cmlnaHQgwqkgXG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyogID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgTWVkaWFQbGF5ZXIuanN4XG5cbiAgICBDb21wb25lbnQgb2YgdGhlIG1lZGlhIHBsYXllci4gQ29udGFpbnMgdGhlIHN0YXR1cyBiYXIgYW5kIHRoZSBtZWRpYSBwbGF5ZXJcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBNYWluIENvbXBvbmVudCBNZWRpYVBsYXllclxuXG4gICAgQENvbXBvbmVudDogXG4gICAgICBTdGF0dXNCYXIgLVxuXG4gICAgICBNZWRpYVBsYXllciAtIFRoZSBlbnRpcmUgbWVkaWEgcGxheWVyIGNvbnRhaW5pbmcgc3ViY29tcG9uZW50cyBvZiB0aGUgcGxheSxcbiAgICAgICAgICAgICAgICAgICAgcGF1c2UsIGFuZCBzdGF0dXMgYmFyLlxuXG4gICAgQEV4cG9ydDogTWVkaWFQbGF5ZXJcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBTdGF0dXNCYXIgPSByZXF1aXJlKCcuL1N0YXR1c0Jhci5qc3gnKTtcblxuY29uc3QgTUVESUFQTEFDRUhPTERFUlNUQVRFUyA9IHtcbiAgQUNUSVZFOiAnQUNUSVZFJyxcbiAgTk9ORTogJ05PTkUnLFxuICBSRUFEWTogJ1JFQURZJyxcbiAgTE9BRElORzogJ0xPQURJTkcnLFxuICBTWU5DSU5HOiAnU1lOQ0lORydcbn07XG5cbi8qICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIEZ1bmN0aW9uIGluaXRpYWxpemVZb3V0dWJlSUZyYW1lXG5cbiAgICBQbGF5cyB0aGUgbWVkaWEgd2l0aCB0aGUgZ2l2ZW4gbWVkaWEgdHlwZVxuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5mdW5jdGlvbiBwbGF5TWVkaWFCeU1lZGlhVHlwZShtZWRpYURhdGEpIHtcbiAgc3dpdGNoKG1lZGlhRGF0YS5tZWRpYVR5cGUpIHtcbiAgICBjYXNlIE1FRElBVFlQRVMuWU9VVFVCRTpcbiAgICAgIHlvdXR1YmVQbGF5VmlkZW8obWVkaWFEYXRhKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgTUVESUFUWVBFUy5TT1VORENMT1VEOlxuICAgICAgLy8gVE9ETzogUGxheSBTb3VuZGNsb3VkXG4gICAgICBicmVhaztcbiAgICBjYXNlIE1FRElBVFlQRVMuVklNRU86XG4gICAgICAvLyBUT0RPOiBQbGF5IFZpbWVvXG4gICAgICBicmVhaztcbiAgICBjYXNlIE1FRElBVFlQRVMuTk9ORTpcbiAgICAgIC8vIFJlbW92ZSB0aGUgcGxheWVyc1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIC8vIEVSUk9SXG4gICAgICBjb25zb2xlLmxvZyhcIkVSUk9SOiBObyBtZWRpYSB0eXBlXCIpO1xuICAgICAgYnJlYWs7XG4gIH1cbn1cblxuLyogID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgRnVuY3Rpb24gcGF1c2VNZWRpYUJ5TWVkaWFUeXBlXG5cbiAgICBQYXVzZXMgdGhlIG1lZGlhIHdpdGggdGhlIGdpdmVuIG1lZGlhIHR5cGVcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuZnVuY3Rpb24gcGF1c2VNZWRpYUJ5TWVkaWFUeXBlKG1lZGlhRGF0YSkge1xuICBzd2l0Y2gobWVkaWFEYXRhLm1lZGlhVHlwZSkge1xuICAgIGNhc2UgTUVESUFUWVBFUy5ZT1VUVUJFOlxuICAgICAgeW91dHViZVBhdXNlVmlkZW8obWVkaWFEYXRhKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgTUVESUFUWVBFUy5TT1VORENMT1VEOlxuICAgICAgLy8gVE9ETzogUGF1c2UgU291bmRjbG91ZFxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBNRURJQVRZUEVTLlZJTUVPOlxuICAgICAgLy8gVE9ETzogUGF1c2UgVmltZW9cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgTUVESUFUWVBFUy5OT05FOlxuICAgICAgLy8gUmVtb3ZlIHRoZSBwbGF5ZXJzXG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgLy8gRVJST1JcbiAgICAgIGNvbnNvbGUubG9nKFwiRVJST1I6IE5vIG1lZGlhIHR5cGVcIik7ICAgICAgXG4gICAgICBicmVhaztcbiAgfVxufVxuXG4vKiBQbGFjZWhvbGRlciBmb3Igd2hlbiBubyBtZWRpYSBpcyBsb2FkZWQgKi9cbnZhciBWaWRlb1BsYWNlaG9sZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYWNlaG9sZGVyIHBsYWNlaG9sZGVyLXZpZGVvXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxhY2Vob2xkZXItY29udGVudFwiPlxuICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLW1vb24tbyBwbGFjZWhvbGRlci1pY29uXCI+PC9pPjxici8+XG4gICAgICAgICAgPHNwYW4+WW91IGRvbiZyc3F1bzt0IGhhdmUgYW55IHZpZGVvczwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxuLyogUGxhY2Vob2xkZXIgZm9yIHdoZW4gbWVkaWEgaXMgbG9hZGVkIGludG8gcXVldWUgYnV0IG5vdCBwbGF5ZWQgKi9cbnZhciBWaWRlb1JlYWR5ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYWNlaG9sZGVyIHBsYWNlaG9sZGVyLXZpZGVvXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxhY2Vob2xkZXItY29udGVudFwiPlxuICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLXBsYXkgcGxhY2Vob2xkZXItaWNvblwiPjwvaT48YnIvPlxuICAgICAgICAgIDxzcGFuPlBsYXkgeW91ciBxdWV1ZTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxuLyogUGxhY2Vob2xkZXIgZm9yIHdoZW4gdmlkZW8gaXMgbG9hZGluZyAqL1xudmFyIFZpZGVvTG9hZGluZyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGFjZWhvbGRlciBwbGFjZWhvbGRlci12aWRlb1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYWNlaG9sZGVyLWNvbnRlbnRcIj5cbiAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1jaXJjbGUtby1ub3RjaCBmYS1zcGluIHBsYWNlaG9sZGVyLWljb25cIj48L2k+PGJyLz5cbiAgICAgICAgICA8c3Bhbj5Mb2FkaW5nPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG4vKiBQbGFjZWhvbGRlciBmb3Igd2hlbiB2aWRlbyBpcyBzeW5jaW5nICovXG52YXIgVmlkZW9TeW5jaW5nID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYWNlaG9sZGVyIHBsYWNlaG9sZGVyLXZpZGVvXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxhY2Vob2xkZXItY29udGVudFwiPlxuICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLXJlZnJlc2ggZmEtc3BpbiBwbGFjZWhvbGRlci1pY29uXCI+PC9pPjxici8+XG4gICAgICAgICAgPHNwYW4+U3luY2luZzwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxuLyogTWVkaWEgcGxheWVyICovXG52YXIgTWVkaWFQbGF5ZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1lZGlhU3RhdGU6ICdOT05FJyxcbiAgICAgIG1lZGlhVHlwZTogJ05PTkUnLFxuICAgICAgbG9jYWxTdGF0ZTogJ05PTkUnXG4gICAgfTtcbiAgfSxcblxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgLy8gU2V0cyB1cCBldmVudCBoYW5kbGVycyBmb3Igd2hlbiBzb2NrZXQgc2VuZHMgZnJvbSBzZXJ2ZXIgdG8gY2xpZW50XG4gICAgc29ja2V0Lm9uKCdGcm9tIFNlcnZlcjogSW5pdGlhbGl6ZSBtZWRpYSBwbGF5ZXInLCB0aGlzLmluaXRpYWxpemVNZWRpYSk7XG4gICAgc29ja2V0Lm9uKCdGcm9tIFNlcnZlcjogU2VuZCBtZWRpYSBwbGF5ZXIgc3RhdGVzJywgdGhpcy5zZW5kTWVkaWFQbGF5ZXJTdGF0ZXMpO1xuICAgIHNvY2tldC5vbignRnJvbSBTZXJ2ZXI6IEdldCBlbGFwc2VkIHRpbWUgZm9yIHNwZWNpZmljIGNsaWVudCcsIHRoaXMuZ2V0RWxhcHNlZFRpbWVGb3JTcGVjaWZpY0NsaWVudCk7XG4gICAgc29ja2V0Lm9uKCdGcm9tIFNlcnZlcjogTG9hZCBtZWRpYSBlbnRyeScsIHRoaXMubG9hZE1lZGlhKTtcbiAgICBzb2NrZXQub24oJ0Zyb20gU2VydmVyOiBQbGF5IG1lZGlhJywgdGhpcy5wbGF5TWVkaWEpO1xuICAgIHNvY2tldC5vbignRnJvbSBTZXJ2ZXI6IFBhdXNlIG1lZGlhJywgdGhpcy5wYXVzZU1lZGlhKTtcbiAgICBzb2NrZXQub24oJ0Zyb20gU2VydmVyOiBDaGFuZ2UgbWVkaWEgcGxheWVyIHRvIG5vbmUnLCB0aGlzLmNoYW5nZU1lZGlhUGxheWVyVG9Ob25lKTtcbiAgfSxcblxuICAvLyBFVkVOVCBIQU5ETEVSOiBJbml0aWFsaXplcyB0aGUgbWVkaWEgd2l0aCB3aXRoIHRoZSBkYXRhIHNlbnQgZnJvbSB0aGUgc2VydmVyXG4gIGluaXRpYWxpemVNZWRpYTogZnVuY3Rpb24obWVkaWFEYXRhKSB7XG4gICAgY29uc29sZS5sb2coXCJJbml0aWFsaXppbmcgTWVkaWFcIik7XG5cbiAgICB0aGlzLnNldFN0YXRlKHttZWRpYVR5cGU6IG1lZGlhRGF0YS5tZWRpYVR5cGV9LCBmdW5jdGlvbigpIHtcbiAgICAgIGluaXRpYWxpemVZb3V0dWJlSUZyYW1lKG1lZGlhRGF0YSk7XG4gICAgICBcbiAgICAgIC8vIFRPRE86IEluaXRpYWxpemUgU291bmRjbG91ZFxuICAgICAgLy8gaW5pdGlhbGl6ZVNvdW5kY2xvdWRQbGF5ZXIobWVkaWFEYXRhKTsgIFxuXG4gICAgICAvLyBUT0RPOiBJbml0aWFsaXplIFZpbWVvXG4gICAgICAvLyBpbml0aWFsaXplVmltZW9QbGF5ZXIobWVkaWFEYXRhKTsgIFxuICAgIH0pO1xuICB9LFxuXG4gIC8vIEVWRU5UIEhBTkRMRVI6IFNlbmRzIHRoZSBzdGF0ZSBvZiB0aGUgbWVkaWEgcGxheWVyc1xuICBzZW5kTWVkaWFQbGF5ZXJTdGF0ZXM6IGZ1bmN0aW9uKG1lZGlhRGF0YSkge1xuICAgIGNvbnNvbGUubG9nKFwic2VuZE1lZGlhUGxheWVyU3RhdGVcIik7XG4gICAgdGhpcy5zZXRTdGF0ZSh7bG9jYWxTdGF0ZTogTUVESUFQTEFDRUhPTERFUlNUQVRFUy5BQ1RJVkV9KTtcbiAgICB0aGlzLnNldFN0YXRlKHttZWRpYVN0YXRlOiBtZWRpYURhdGEuc3RhdGV9LCBmdW5jdGlvbigpIHtcbiAgICAgIHN3aXRjaCh0aGlzLnN0YXRlLm1lZGlhU3RhdGUpIHtcbiAgICAgICAgY2FzZSBNRURJQVBMQVlFUlNUQVRFUy5QTEFZSU5HOlxuICAgICAgICAgIHBsYXlNZWRpYUJ5TWVkaWFUeXBlKG1lZGlhRGF0YSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgTUVESUFQTEFZRVJTVEFURVMuUEFVU0VEOlxuICAgICAgICAgIHBhdXNlTWVkaWFCeU1lZGlhVHlwZShtZWRpYURhdGEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIE1FRElBUExBWUVSU1RBVEVTLk5PTkU6XG4gICAgICAgICAgLy8gRU1QVFlcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAvLyBFUlJPUlxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiRVJST1I6IE5vIG1lZGlhIHN0YXRlXCIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIC8vIEVWRU5UIEhBTkRMRVI6IFdoZW4gYSBjbGllbnQgcmVxdWVzdHMgdGhlIHRpbWUsIGdldHMgYWxsIHRoZSBlbGFwc2VkIHRpbWVzIG9mIGV2ZXJ5IG90aGVyIGNsaWVudCBhbmQgc2VuZHMgaXQgYmFjayB0byB0aGUgb3JpZ2luYWwgY2xpZW50LlxuICBnZXRFbGFwc2VkVGltZUZvclNwZWNpZmljQ2xpZW50OiBmdW5jdGlvbihjbGllbnRJZCkge1xuICAgIHZhciBtZWRpYUN1cnJlbnRUaW1lRWxhcHNlZCA9IHlvdXR1YmVHZXRDdXJyZW50VGltZSgpO1xuXG4gICAgc29ja2V0LmVtaXQoJ0Zyb20gQ2xpZW50OiBTZW5kIGVsYXBzZWQgdGltZSB0byBzcGVjaWZpYyBjbGllbnQnLCB7XG4gICAgICBjbGllbnRJZDogY2xpZW50SWQsXG4gICAgICBjbGllbnRDdXJyZW50VGltZTogbWVkaWFDdXJyZW50VGltZUVsYXBzZWQsXG4gICAgfSk7XG4gIH0sXG5cbiAgLy8gRVZFTlQgSEFORExFUjogTG9hZHMgdGhlIHNwZWNpZmllZCBtZWRpYSBwbGF5ZXJcbiAgbG9hZE1lZGlhOiBmdW5jdGlvbihtZWRpYURhdGEpIHtcbiAgICB0aGlzLnNldFN0YXRlKHttZWRpYVR5cGU6IG1lZGlhRGF0YS5tZWRpYVR5cGV9LCBmdW5jdGlvbigpIHtcbiAgICAgIHN3aXRjaCh0aGlzLnN0YXRlLm1lZGlhVHlwZSkge1xuICAgICAgICBjYXNlIE1FRElBVFlQRVMuWU9VVFVCRTpcbiAgICAgICAgICB5b3V0dWJlTG9hZFZpZGVvKG1lZGlhRGF0YSk7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bG9jYWxTdGF0ZTogTUVESUFQTEFDRUhPTERFUlNUQVRFUy5BQ1RJVkV9KTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIllvdXR1YmUgUGxheWVyIHN1Y2Nlc3NmdWx5IGxvYWRlZDogbG9hZE1lZGlhOlwiKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBNRURJQVRZUEVTLlNPVU5EQ0xPVUQ6XG4gICAgICAgICAgLy8gVE9ETzogTG9hZCBTb3VuZGNsb3VkXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgTUVESUFUWVBFUy5WSU1FTzpcbiAgICAgICAgICAvLyBUT0RPOiBMb2FkIFZpbWVvXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgTUVESUFUWVBFUy5OT05FOlxuICAgICAgICAgIC8vIFRPRE86IFJlbW92ZSB0aGUgcGxheWVyc1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIC8vIEVSUk9SXG4gICAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUjogTm8gbWVkaWEgdHlwZVwiKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcblxuICAvLyBFVkVOVCBIQU5ETEVSOiBQbGF5cyBtZWRpYSB3aXRoIGdpdmVuIHR5cGVcbiAgcGxheU1lZGlhOiBmdW5jdGlvbihtZWRpYURhdGEpIHtcbiAgICB0aGlzLnNldFN0YXRlKHttZWRpYVN0YXRlOiBNRURJQVBMQVlFUlNUQVRFUy5QTEFZSU5HfSwgZnVuY3Rpb24oKSB7XG4gICAgICBwbGF5TWVkaWFCeU1lZGlhVHlwZShtZWRpYURhdGEpO1xuICAgICAgY29uc29sZS5sb2coJ01lZGlhIGlzIE5vdyBQbGF5aW5nJyk7XG4gICAgfSk7XG4gIH0sXG5cbiAgLy8gRVZFTlQgSEFORExFUjogUGF1c2VzIG1lZGlhIHdpdGggZ2l2ZW4gdHlwZVxuICBwYXVzZU1lZGlhOiBmdW5jdGlvbihtZWRpYURhdGEpIHtcbiAgICB0aGlzLnNldFN0YXRlKHttZWRpYVN0YXRlOiBNRURJQVBMQVlFUlNUQVRFUy5QQVVTRUR9LCBmdW5jdGlvbigpIHtcbiAgICAgIHBhdXNlTWVkaWFCeU1lZGlhVHlwZShtZWRpYURhdGEpO1xuICAgICAgY29uc29sZS5sb2coJ01lZGlhIGlzIE5vdyBQYXVzZWQnKTtcbiAgICB9KTtcbiAgfSxcblxuICAvLyBFVkVOVCBIQU5ETEVSOiBXaGVuIG1lZGlhIHBsYXllciBoYXMgZW5kZWRcbiAgY2hhbmdlTWVkaWFQbGF5ZXJUb05vbmU6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe2xvY2FsU3RhdGU6IE1FRElBUExBQ0VIT0xERVJTVEFURVMuTk9ORX0pO1xuICAgIHRoaXMuc2V0U3RhdGUoe21lZGlhU3RhdGU6IE1FRElBUExBWUVSU1RBVEVTLk5PTkV9LCBmdW5jdGlvbigpIHtcbiAgICAgIHJlc2V0WW91dHViZU9iaigpO1xuICAgICAgY29uc29sZS5sb2coXCJFTkRJTkc6IE1lZGlhIHBsYXllclwiKTtcbiAgICB9KTtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIC8vIE1lZGlhIHBsYXllciBpcyBsb2FkZWQgb250byB0aGUgbWVkaWEtcGxheWVyIGRpdlxuICAgIHZhciB2aWRlb1BsYWNlaG9sZGVyID0gW107XG5cbiAgICAvLyBEaXNwbGF5cyByZXNwZWN0aXZlIHBsYWNlaG9sZGVyIElGIHRoZSBsb2NhbCBzdGF0ZSBpcyBub3QgJ2FjdGl2ZSdcbiAgICAvLyBUT0RPOiBDb25zaWRlciB1c2luZyBNRURJQVBMQVlFUlNUQVRFUyBpbnN0ZWFkXG4gICAgc3dpdGNoICh0aGlzLnN0YXRlLmxvY2FsU3RhdGUpIHtcbiAgICAgIGNhc2UgTUVESUFQTEFDRUhPTERFUlNUQVRFUy5BQ1RJVkU6XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBNRURJQVBMQUNFSE9MREVSU1RBVEVTLk5PTkU6XG4gICAgICAgIHZpZGVvUGxhY2Vob2xkZXIucHVzaChcbiAgICAgICAgICA8VmlkZW9QbGFjZWhvbGRlciBrZXk9eydWaWRlb1BsYWNlaG9sZGVyJ30gLz5cbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIE1FRElBUExBQ0VIT0xERVJTVEFURVMuUkVBRFk6XG4gICAgICAgIHZpZGVvUGxhY2Vob2xkZXIucHVzaChcbiAgICAgICAgICA8VmlkZW9SZWFkeSBrZXk9eydWaWRlb1JlYWR5J30gLz5cbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIE1FRElBUExBQ0VIT0xERVJTVEFURVMuTE9BRElORzpcbiAgICAgICAgdmlkZW9QbGFjZWhvbGRlci5wdXNoKFxuICAgICAgICAgIDxWaWRlb0xvYWRpbmcga2V5PXsnVmlkZW9Mb2FkaW5nJ30gLz5cbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIE1FRElBUExBQ0VIT0xERVJTVEFURVMuU1lOQ0lORzpcbiAgICAgICAgdmlkZW9QbGFjZWhvbGRlci5wdXNoKFxuICAgICAgICAgIDxWaWRlb1N5bmNpbmcga2V5PXsnVmlkZW9TeW5jaW5nJ30gLz5cbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBFUlJPUlxuICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SOiBObyBNRURJQVBMQUNFSE9MREVSU1RBVEVTIGRlZmluZWRcIik7XG4gICAgICAgIGJyZWFrO1xuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGF5ZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYXllci12aWRlby1lbWJlZFwiPlxuICAgICAgICAgICAge3ZpZGVvUGxhY2Vob2xkZXJ9XG4gICAgICAgICAgICA8ZGl2IGlkPSdtZWRpYS1wbGF5ZXInIGNsYXNzTmFtZT0nanMtcGx5cicgZGF0YS10eXBlPVwieW91dHViZVwiPjwvZGl2PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAvLyBUT0RPOiBHZXQgdGhlIFN0YXR1cyBiYXIgd29ya2luZ1xuXG4gICAgICAgICAgICAgIC8vIDxkaXYgaWQ9J3N0YXR1cy1iYXInPlxuICAgICAgICAgICAgICAvLyAgIDxTdGF0dXNCYXIgLz5cbiAgICAgICAgICAgICAgLy8gPC9kaXY+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTWVkaWFQbGF5ZXI7IiwiLyogID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgQ29weXJpZ2h0IMKpIFxuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIFZJRVc6IE1vZGFsQ3JlYXRlUGxheWxpc3QuanN4XG5cbiAgICBUaGUgY29tcG9uZW50IGZvciB3aGVuIHRoZSBNb2RhbCBwb3BzIHVwIGZvciBjcmVhdGluZyBhIG5ldyBwbGF5bGlzdFxuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIEBDb21wb25lbnRzOiAgICBUb2dnbGVJY29uXG4gICAgICAgICAgICAgICAgICAgIE1vZGFsQ3JlYXRlUGxheWxpc3RcblxuICAgIEBFeHBvcnRzOiAgICAgICBNb2RhbENyZWF0ZVBsYXlsaXN0XG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbi8vIEZsdXggQWN0aW9uXG52YXIgcGxheWxpc3RBY3Rpb25zID0gcmVxdWlyZSgnLi4vZmx1eC9hY3Rpb25zL2FjdGlvbnMnKTtcblxuLy8gVGhlIGljb24gd2hpY2ggdGVsbHMgdGhlIHVzZXIgaWYgdGhlIG5ldyBwbGF5bGlzdCB3b3VsZCBiZSBlaXRoZXIgcHVibGljIG9yIHByaXZhdGVcbnZhciBUb2dnbGVJY29uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIC8vIFRvZ2dsZXMgdGhlIGljb24gdG8gdGhlIGdsb2JlIG9yIGxvY2sgZGVwZW5kaW5nIG9uIGlmIHRoZSBuZXcgcGxheWxpc3Qgd291bGQgYmUgcHVibGljIG9yIHByaXZhdGVcbiAgICB2YXIgdG9nZ2xlQ2xhc3M7XG4gICAgaWYgKHRoaXMucHJvcHMuaXNQdWJsaWMgPT09IHRydWUpIHtcbiAgICAgIHRvZ2dsZUNsYXNzID0gXCJmYSBmYS1nbG9iZVwiO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRvZ2dsZUNsYXNzID0gXCJmYSBmYS1sb2NrXCI7XG4gICAgfSBcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvZ2dsZS1zbGlkZXItc2VjdGlvblwiPlxuICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwic3dpdGNoXCI+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiY3JlYXRlLXBsYXlsaXN0LXRvZ2dsZVwiIG9uQ2hhbmdlPXt0aGlzLnByb3BzLm9uQ2hhbmdlfSAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2xpZGVyXCI+PC9kaXY+XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDxpIGNsYXNzTmFtZT17dG9nZ2xlQ2xhc3N9IGlkPVwiY3JlYXRlLXBsYXlsaXN0LXRvZ2dsZS1pY29uXCI+PC9pPlxuICAgICAgPC9kaXY+IFxuICAgICk7XG4gIH1cbn0pO1xuXG4vLyBNQUlOIENPTVBPTkVOVDogQ3JlYXRlIE5ldyBQbGF5bGlzdCBNb2RhbCBQb3B1cFxudmFyIE1vZGFsQ3JlYXRlUGxheWxpc3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBsYXlsaXN0TmFtZUlucHV0OiBcIlwiLFxuICAgICAgaXNQdWJsaWM6IHRydWVcbiAgICB9XG4gIH0sXG5cbiAgb25DaGFuZ2VQbGF5bGlzdE5hbWU6IGZ1bmN0aW9uKGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgcGxheWxpc3ROYW1lSW5wdXQ6IGUudGFyZ2V0LnZhbHVlIH0pO1xuICB9LFxuXG4gIG9uQ2hhbmdlSXNQdWJsaWM6IGZ1bmN0aW9uKGUpIHtcbiAgICAvLyBUaGUgcGxheWxpc3QgaXMgcHVibGljIHdoZW4gdGhlIHRhcmdldCBpcyBub3QgY2hlY2tlZFxuICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUuaXNQdWJsaWMpO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBpc1B1YmxpYzogIWUudGFyZ2V0LmNoZWNrZWQgfSk7XG4gIH0sXG5cbiAgb25TdWJtaXQ6IGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH0sXG5cbiAgYWRkVG9QbGF5bGlzdDogZnVuY3Rpb24oZSkge1xuICAgIGNvbnNvbGUubG9nKFwiTW9kYWw6IEFkZCB0byBuZXcgUGxheWxpc3RcIik7XG4gICAgdmFyIGRhdGE7XG4gICAgaWYgKHRoaXMucHJvcHMuZGF0YSA9PT0gbnVsbCB8fCB0aGlzLnByb3BzLmRhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZGF0YSA9IHtcbiAgICAgICAgbmFtZTogdGhpcy5zdGF0ZS5wbGF5bGlzdE5hbWVJbnB1dCxcbiAgICAgICAgb3duZXI6IHRoaXMucHJvcHMudXNlci5sb2NhbC5lbWFpbCxcbiAgICAgICAgaXNQdWJsaWM6IHRoaXMuc3RhdGUuaXNQdWJsaWMsXG4gICAgICAgIG1lZGlhRW50cnk6IG51bGxcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBkYXRhID0ge1xuICAgICAgICBuYW1lOiB0aGlzLnN0YXRlLnBsYXlsaXN0TmFtZUlucHV0LFxuICAgICAgICBvd25lcjogdGhpcy5wcm9wcy51c2VyLmxvY2FsLmVtYWlsLFxuICAgICAgICBpc1B1YmxpYzogdGhpcy5zdGF0ZS5pc1B1YmxpYyxcbiAgICAgICAgbWVkaWFFbnRyeToge1xuICAgICAgICAgIGFydGlzdDogdGhpcy5wcm9wcy5kYXRhLmFydGlzdCxcbiAgICAgICAgICBtZWRpYUlkOiB0aGlzLnByb3BzLmRhdGEubWVkaWFJZCxcbiAgICAgICAgICBtZWRpYVR5cGU6IHRoaXMucHJvcHMuZGF0YS5tZWRpYVR5cGUsXG4gICAgICAgICAgdGh1bWJuYWlsOiB0aGlzLnByb3BzLmRhdGEudGh1bWJuYWlsLFxuICAgICAgICAgIHRpdGxlOiB0aGlzLnByb3BzLmRhdGEudGl0bGUsXG4gICAgICAgICAgLy8gVE9ETzogVGhlIHNlYXJjaCBlbnRyeSBkb2VzIG5vdCBoYXZlIHRoZSBzYW1lIGRiIF9pZC4gTmVlZCB0byBmaW5kIGEgd2F5IHRvIGFkZCBtZWRpYSBlbnRyaWVzIHdpdGhvdXQgZHVwbGljYXRlc1xuICAgICAgICAgIC8vIF9pZDogdGhpcy5wcm9wcy5kYXRhLl9pZFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBcblxuICAgICQuYWpheCh7XG4gICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgIHVybDogXCIvcGxheWxpc3QvY3JlYXRlXCIsXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgZGF0YToge2RhdGE6IEpTT04uc3RyaW5naWZ5KGRhdGEpfSxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKG5ld1BsYXlsaXN0KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKG5ld1BsYXlsaXN0KTtcbiAgICAgICAgcGxheWxpc3RBY3Rpb25zLmNyZWF0ZVBsYXlsaXN0KG5ld1BsYXlsaXN0LmNyZWF0ZWRQbGF5bGlzdCk7IFxuICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgZXJyb3I6IGZ1bmN0aW9uKHhociwgc3RhdHVzLCBlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVSUk9SOiBDcmVhdGUgUGxheWxpc3QgZXJyb3JlZCBvdXRcIiwgc3RhdHVzLCBlcnIudG9TdHJpbmcoKSk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICB9KTtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBtb2RhbElkO1xuICAgIHZhciB0b2dnbGVJY29uR2xvYmVPckxvY2sgPSBbXTtcblxuICAgIC8vIElmIHRoZSBtb2RhbCBpcyBjbGlja2VkIGZyb20gdGhlIGNyZWF0ZSBuZXcgcGxheWxpc3QgYnV0dG9uIHVuZGVyIG15UGxheWxpc3RcbiAgICBpZiAodGhpcy5wcm9wcy5wb3MgPT09IG51bGwgfHwgdGhpcy5wcm9wcy5wb3MgPT09IHVuZGVmaW5lZCkge1xuICAgICAgbW9kYWxJZCA9IFwiY3JlYXRlLXBsYXlsaXN0XCI7XG4gICAgfVxuICAgIC8vIFdIZW4gdGhlIG1vZGFsIGlzIGNsaWNrZWQgZnJvbSBhIG1lZGlhIGVudHJ5XG4gICAgZWxzZSB7XG4gICAgICBtb2RhbElkID0gXCJjcmVhdGUtcGxheWxpc3QtXCIgKyB0aGlzLnByb3BzLnBvczsgIFxuICAgIH1cbiAgICBcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbCBmYWRlXCIgaWQ9e21vZGFsSWR9IHRhYkluZGV4PVwiLTFcIiByb2xlPVwiZGlhbG9nXCIgYXJpYS1sYWJlbGxlZGJ5PVwibXlNb2RhbExhYmVsXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZGlhbG9nIG1vZGFsLXNtXCIgcm9sZT1cImRvY3VtZW50XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1jb250ZW50XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWhlYWRlclwiPlxuICAgICAgICAgICAgICBDcmVhdGUgYSBOZXcgUGxheWxpc3RcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cInNlYXJjaC1pbnB1dFwiIGlkPVwiY3JlYXRlLXBsYXlsaXN0LWlucHV0XCIgb25TdWJtaXQ9e3RoaXMub25TdWJtaXR9PlxuICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cImlucHV0LXBhZGRpbmdcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiUGxheWxpc3QgTmFtZVwiIG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlUGxheWxpc3ROYW1lfSAvPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1sYWJlbFwiPklzIHRoaXMgYSBwcml2YXRlIHBsYXlsaXN0PzwvZGl2PlxuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIHsvKiBUb2dnbGUgSWNvbiBjb21wb25lbnQgKi99IFxuICAgICAgICAgICAgICAgICAgPFRvZ2dsZUljb24gaXNQdWJsaWM9e3RoaXMuc3RhdGUuaXNQdWJsaWN9IG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlSXNQdWJsaWN9IC8+XG4gICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1mb290ZXJcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIG9uQ2xpY2s9e3RoaXMuYWRkVG9QbGF5bGlzdH0+Q3JlYXRlIFBsYXlsaXN0PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxuLy8gUmVxdWlyZWQgdG8gY2FsbCBtb2RhbCBmcm9tIG90aGVyIGNvbXBvbmVudHNcbm1vZHVsZS5leHBvcnRzID0gTW9kYWxDcmVhdGVQbGF5bGlzdDsiLCIvKiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBDb3B5cmlnaHQgwqkgXG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyogID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgVklFVzogTXlQbGF5bGlzdHMuanN4XG5cbiAgICBDb250YWlucyBhbGwgb2YgdGhlIGN1cnJlbnQgdXNlcidzIHByaXZhdGUgYW5kIHB1YmxpYyBwbGF5bGlzdHMuIEFsc28gY29udGFpbnMgXG4gICAgYWxsIHRoZSBwbGF5bGlzdHMgdGhhdCB0aGUgdXNlciBsaWtlZC5cbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBAQ29tcG9uZW50czogICAgTXlQbGF5bGlzdFBsYWNlaG9sZGVyXG4gICAgICAgICAgICAgICAgICAgIFNlYXJjaE15UGxheWxpc3RcbiAgICAgICAgICAgICAgICAgICAgTXlQbGF5bGlzdHNcblxuICAgIEBFeHBvcnRzOiAgICAgICBNeVBsYXlsaXN0c1xuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFBsYXlsaXN0RW50cnkgPSByZXF1aXJlKCcuL1BsYXlsaXN0RW50cnkuanN4Jyk7XG5cbi8vIFBsYWNlaG9sZGVyIGlmIHRoZXJlIGFyZSBubyBwbGF5bGlzdHMgY3JlYXRlZCBvciBsaWtlZFxudmFyIE15UGxheWxpc3RQbGFjZWhvbGRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtcGFkZGluZ1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYWNlaG9sZGVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGFjZWhvbGRlci1jb250ZW50XCI+XG4gICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1ib29rIHBsYWNlaG9sZGVyLWljb25cIj48L2k+PGJyLz5cbiAgICAgICAgICAgIDxzcGFuPllvdSBoYXZlIG5vIHNhdmVkIHBsYXlsaXN0czwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxuLy8gU2VhcmNoIEJhciB0byBzZWFyY2ggTXkgUGxheWxpc3RzXG52YXIgU2VhcmNoTXlQbGF5bGlzdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2gtY29udGFpbmVyXCI+XG4gICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cInNlYXJjaC1pbnB1dFwiPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzTmFtZT1cImNoYXQtdGV4dGJveFwiIG5hbWU9XCJcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaCBQcml2YXRlIFBsYXlsaXN0cy4uLlwiLz5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbi8vIENyZWF0ZSBOZXcgUGxheWxpc3QgQnV0dG9uXG52YXIgTmV3UGxheWxpc3RCdXR0b24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoLWNvbnRhaW5lciBidG4tYWxpZ24tcmlnaHRcIj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBkYXRhLXRvZ2dsZT1cIm1vZGFsXCIgZGF0YS10YXJnZXQ9XCIjY3JlYXRlLXBsYXlsaXN0XCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtcGx1cyBpY29uLXBhZGRpbmdcIj48L2k+Q3JlYXRlIE5ldyBQbGF5bGlzdDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbi8vIE1BSU4gQ09NUE9ORU5UOiBNeSBQbGF5bGlzdCBUYWJcbnZhciBNeVBsYXlsaXN0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgcGxheWxpc3RFbnRyaWVzID0gW107XG5cbiAgICAvLyBJZiB0aGVyZSBhcmUgbm8gcGxheWxpc3RzLCB0aGUgcGxhY2Vob2xkZXIgaXMgZGlzcGxheWVkXG4gICAgaWYgKHRoaXMucHJvcHMubXlQbGF5bGlzdHMgPT09IHVuZGVmaW5lZCB8fCB0aGlzLnByb3BzLm15UGxheWxpc3RzID09PSBudWxsIHx8IHRoaXMucHJvcHMubXlQbGF5bGlzdHMubGVuZ3RoIDw9IDApIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPE15UGxheWxpc3RQbGFjZWhvbGRlciAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlcmUgYXJlIHBsYXlsaXN0cywgcHVzaGVzIGV2ZXJ5IHBsYXlsaXN0IGludG8gdGhlIHRhYlxuICAgIGVsc2Uge1xuICAgICAgLy8gQWRkcyB0aGUgc2VhcmNoIGJhciBmb3IgdGhlIHBsYXlsaXN0XG4gICAgICBwbGF5bGlzdEVudHJpZXMucHVzaChcbiAgICAgICAgPFNlYXJjaE15UGxheWxpc3Qga2V5PXsnU2VhcmNoTXlQbGF5bGlzdCd9IC8+XG4gICAgICApXG5cbiAgICAgIC8vIEV2ZXJ5IHBsYXlsaXN0IGVudHJ5IGluIE15UGxheWxpc3RcbiAgICAgIHZhciBwbGF5bGlzdEVudHJ5O1xuICAgICAgdmFyIHBsYXlsaXN0VGh1bWJuYWlsO1xuICAgICAgdmFyIHBsYXlsaXN0U2l6ZTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wcm9wcy5teVBsYXlsaXN0cy5sZW5ndGg7ICsraSkge1xuICAgICAgICBwbGF5bGlzdEVudHJ5ID0gdGhpcy5wcm9wcy5teVBsYXlsaXN0c1tpXTtcbiAgICAgICAgLy8gSWYgdGhlIHBsYXlsaXN0IGVudHJ5IGhhcyBubyBtZWRpYSBlbnRyaWVzXG4gICAgICAgIC8vIFRPRE86IEFkZCBhIHRodW1ibmlhbCBwbGFjZWhvbGRlciBmb3IgcGxheWxpc3QgZW50cmllcyB0aGF0IGhhdmUgbm8gbWVkaWEgZW50cmllc1xuICAgICAgICBpZiAocGxheWxpc3RFbnRyeS5tZWRpYUVudHJpZXNbMF0gPT09IG51bGwgfHwgcGxheWxpc3RFbnRyeS5tZWRpYUVudHJpZXNbMF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHBsYXlsaXN0VGh1bWJuYWlsID0gXCJcIjtcbiAgICAgICAgICBwbGF5bGlzdFNpemUgPSAwO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRoZXJlIGFyZSBtZWRpYSBlbnRyaWVzIGluIHRoZSBwbGF5bGlzdCBlbnRyeVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBwbGF5bGlzdFRodW1ibmFpbCA9IHBsYXlsaXN0RW50cnkubWVkaWFFbnRyaWVzWzBdLnRodW1ibmFpbDtcbiAgICAgICAgICBwbGF5bGlzdFNpemUgPSBwbGF5bGlzdEVudHJ5Lm1lZGlhRW50cmllcy5sZW5ndGg7ICBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcGxheWxpc3RFbnRyaWVzLnB1c2ggKFxuICAgICAgICAgIC8vIFRPRE86IG93bmVyLCBsaWtlZFxuICAgICAgICAgIDxQbGF5bGlzdEVudHJ5XG4gICAgICAgICAgICBrZXk9e3BsYXlsaXN0RW50cnkuX2lkfVxuICAgICAgICAgICAgX2lkPXtwbGF5bGlzdEVudHJ5Ll9pZH1cbiAgICAgICAgICAgIHBvcz17aX1cbiAgICAgICAgICAgIG93bmVyPXt0cnVlfVxuICAgICAgICAgICAgdGl0bGU9e3BsYXlsaXN0RW50cnkubmFtZX1cbiAgICAgICAgICAgIHRodW1ibmFpbD17cGxheWxpc3RUaHVtYm5haWx9XG4gICAgICAgICAgICBjdXJhdG9yPXtwbGF5bGlzdEVudHJ5Lm93bmVyfVxuICAgICAgICAgICAgc2l6ZT17cGxheWxpc3RTaXplfVxuICAgICAgICAgICAgdHlwZT17cGxheWxpc3RFbnRyeS5pc1B1YmxpY31cbiAgICAgICAgICAgIGxpa2VzPXtwbGF5bGlzdEVudHJ5Lmxpa2VzfVxuICAgICAgICAgICAgbGlrZWQ9e251bGx9IFxuICAgICAgICAgICAgbWVkaWFFbnRyaWVzPXtwbGF5bGlzdEVudHJ5Lm1lZGlhRW50cmllc30gXG4gICAgICAgICAgICBob21lPXt0aGlzLnByb3BzLmhvbWV9IC8+XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxOZXdQbGF5bGlzdEJ1dHRvbiAvPlxuICAgICAgICB7cGxheWxpc3RFbnRyaWVzfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTXlQbGF5bGlzdHM7IiwiLyogID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgQ29weXJpZ2h0IMKpIFxuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIFZJRVc6IFBsYXlsaXN0RW50cnkuanN4XG5cbiAgICBUaGUgaW5kaXZpZHVhbCBlbnRyeSBvZiBhIHBsYXlsaXN0XG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyogID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgQENvbXBvbmVudHM6ICAgIFBsYXlsaXN0SWNvblxuICAgICAgICAgICAgICAgICAgICBQbGF5bGlzdEVudHJ5XG5cbiAgICBARXhwb3J0czogICAgICAgUGxheWxpc3RFbnRyeVxuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgcGxheWxpc3RBY3Rpb25zID0gcmVxdWlyZSgnLi4vZmx1eC9hY3Rpb25zL2FjdGlvbnMnKTtcblxuLy8gSWNvbiBkaXNwbGF5ZWQgZGVwZW5kcyBvbiB3aGV0aGVyIHBsYXlsaXN0IGlzIHB1YmxpYywgcHJpdmF0ZSwgb3Igbm90IG93bmVyXG52YXIgUGxheWxpc3RJY29uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vd25lciA9PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGF5bGlzdC1pY29uXCI+XG4gICAgICAgICAgPGEgY2xhc3NOYW1lPVwiaWNvbi1idG4gbGlrZS1idG5cIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+XG4gICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1oZWFydC1vXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLnByb3BzLm93bmVyID09IHRydWUgJiYgdGhpcy5wcm9wcy50eXBlID09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYXlsaXN0LWljb25cIj5cbiAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1sb2NrXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGF5bGlzdC1pY29uXCI+XG4gICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtZ2xvYmVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9O1xuICB9XG59KTtcblxuLy8gTUFJTiBDT01QT05FTlQ6IEVhY2ggaW5kaXZpZHVhbCBwbGF5bGlzdCBjYXJkXG52YXIgUGxheWxpc3RFbnRyeSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICAvLyBFVkVOVCBIQU5ETEVSOiBBZGRzIHRoZSBwbGF5bGlzdCBpbnRvIHRoZSBxdWV1ZVxuICBwbGF5UGxheWxpc3Q6IGZ1bmN0aW9uKCkge1xuICAgIC8vIERvIG5vdCBhbGxvdyB0aGUgdXNlciB0byBjbGljayBvbiB0aGUgcGxheWxpc3RcbiAgICBpZiAodGhpcy5wcm9wcy5ob21lID09PSB0cnVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKFwiUGxheWluZyBwbGF5bGlzdDogXCIgKyB0aGlzLnByb3BzLnRpdGxlICsgXCIgYnkgXCIgKyB0aGlzLnByb3BzLmN1cmF0b3IpO1xuICAgIC8vIElmIHRoZXJlIGFyZSBubyBtZWRpYSBlbnRyaWVzLCBkbyBub3RoaW5nXG4gICAgaWYgKHRoaXMucHJvcHMuc2l6ZSA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzb2NrZXQuZW1pdCgnRnJvbSBDbGllbnQ6IFVwZGF0ZSBxdWV1ZSB3aXRoIG5ldyBsaXN0JywgdGhpcy5wcm9wcy5tZWRpYUVudHJpZXMpO1xuICB9LFxuXG4gIC8vIEVWRU5UIEhBTkRMRVI6IE9wZW5zIHRoZSBwbGF5bGlzdCdzIHBhZ2VcbiAgZ29Ub1BsYXlsaXN0UGFnZTogZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2codGhpcy5wcm9wcy5tZWRpYUVudHJpZXMpO1xuICAgIGNvbnNvbGUubG9nKFwiR29pbmcgdG8gcGxheWxpc3QgcGFnZTogXCIgKyB0aGlzLnByb3BzLnRpdGxlICsgXCIgSW5kZXg6IFwiICsgdGhpcy5wcm9wcy5wb3MpO1xuICAgIHBsYXlsaXN0QWN0aW9ucy5kaXNwbGF5UGxheWxpc3QodGhpcy5wcm9wcy5faWQsIHRoaXMucHJvcHMucG9zLCB0aGlzLnByb3BzLm1lZGlhRW50cmllcyk7IFxuXG4gICAgLy8gVE9ETzogSWYgY3VycmVudGx5IG1vYmlsZSwgc2hvdyB0aGUgbW9iaWxlIHRhYiBpbnN0ZWFkXG4gICAgLy8gT3BlbiBzZWxlY3RlZCBwbGF5bGlzdCBvd25lZCBieSBjdXJyZW50IHVzZXJcbiAgICBpZiAodGhpcy5wcm9wcy5vd25lcikge1xuICAgICAgJCgnI3RhYi1lZGl0LXBsYXlsaXN0JykudGFiKCdzaG93Jyk7XG4gICAgfVxuICAgIC8vIE9wZW4gc2VsZWN0ZWQgbGlrZWQgcGxheWxpc3RcbiAgICBlbHNlIHtcbiAgICAgICQoJyN0YWItdmlldy1wbGF5bGlzdCcpLnRhYignc2hvdycpOyBcbiAgICB9ICAgXG4gICAgLy8gVE9ETzogRm9yIHRoZSBCYWNrIGJ1dHRvbiAgICAgIFxuICAgIC8vIFRoZSBiYWNrIGJ1dHRvbiBzaG91bGQgaGF2ZSBhIHN0YWNrIGxpa2UgaW1wbGVtZW50YXRpb24sIGVhY2ggZWxlbWVudCBiZWluZyB3aGVyZSB0aGUgcHJldmlvdXMgd2FzIGZyb21cbiAgICAvLyB2YXIgcGxheWxpc3REYXRhID0ge1xuICAgIC8vICAgcG9zOiB0aGlzLnByb3BzLnBvcyxcbiAgICAvLyAgIGNsaWNrZWRGcm9tOiBcIk1ZUExBWUxJU1RcIlxuICAgIC8vIH1cbiAgICAvLyBwbGF5bGlzdEFjdGlvbnMuZGlzcGxheVBsYXlsaXN0KHBsYXlsaXN0RGF0YSk7XG4gIH0sXG5cbiAgLy8gRVZFTlQgSEFORExFUjogT3BlbnMgdGhlIGN1cmF0b3IncyBwYWdlXG4gIGdvVG9DdXJhdG9yUGFnZTogZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coXCJHb2luZyB0byBjdXJhdG9yIHBhZ2U6IFwiICsgdGhpcy5wcm9wcy5jdXJhdG9yKTtcblxuICAgIC8vIFRPRE86IEZvciB0aGUgQmFjayBidXR0b25cbiAgICAvLyBUaGUgYmFjayBidXR0b24gc2hvdWxkIGhhdmUgYSBzdGFjayBsaWtlIGltcGxlbWVudGF0aW9uLCBlYWNoIGVsZW1lbnQgYmVpbmcgd2hlcmUgdGhlIHByZXZpb3VzIHdhcyBmcm9tXG4gICAgLy8gdmFyIGN1cmF0b3JEYXRhID0ge1xuICAgIC8vICAgcG9zOiB0aGlzLnByb3BzLnBvcyxcbiAgICAvLyAgIGNsaWNrZWRGcm9tOiBcIk1ZUExBWUxJU1RcIlxuICAgIC8vIH1cbiAgICAvLyBwbGF5bGlzdEFjdGlvbnMuQ3VyYXRvcihjdXJhdG9yRGF0YSk7XG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAvLyBJZiBvd25lciwgYXBwZW5kIHVzZXItcGxheWxpc3QgdG8gY2xhc3NuYW1lXG4gICAgdmFyIHBsYXlsaXN0Q2FyZENsYXNzTmFtZSA9IFwicGxheWxpc3QtY2FyZFwiO1xuICAgIGlmICh0aGlzLnByb3BzLm93bmVyID09IHRydWUpIHtcbiAgICAgIHBsYXlsaXN0Q2FyZENsYXNzTmFtZSArPSBcIiB1c2VyLXBsYXlsaXN0XCI7XG4gICAgfTtcblxuICAgIC8vIFRPRE86IFVwZGF0ZSBwbGFjZWhvbGRlciBmb3IgZW1wdHkgdGh1bWJuYWlsc1xuICAgIC8vIEZvciBlbXB0eSBUaHVtYm5haWxzXG4gICAgdmFyIHRodW1ibmFpbCA9IHRoaXMucHJvcHMudGh1bWJuYWlsO1xuICAgIGlmICh0aHVtYm5haWwgPT09IFwiXCIgfHwgdGh1bWJuYWlsID09PSBudWxsIHx8IHRodW1ibmFpbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHVtYm5haWwgPSBcIi9pbWFnZXMvbWVkaWEtaWNvbi5wbmdcIjtcbiAgICB9XG5cbiAgICAvLyBEbyBub3QgYWxsb3cgdGhlIHVzZXIgdG8gY2xpY2sgb24gdGhlIHBsYXlsaXN0XG4gICAgaWYgKHRoaXMucHJvcHMuaG9tZSA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtMyBjb2wtc20tNCBjb2wtcGFkZGluZ1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3BsYXlsaXN0Q2FyZENsYXNzTmFtZX0+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxheWxpc3QtaW1nLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxpbWcgY2xhc3NOYW1lPVwicGxheWxpc3QtaW1nXCIgc3JjPXt0aHVtYm5haWx9IC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYXlsaXN0LXRleHQtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGF5bGlzdC10aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwicGxheWxpc3QtbGluayBwbGF5bGlzdC10aXRsZS10ZXh0IGVsbGlwc2VzXCIgZGF0YS10b2dnbGU9XCJ0YWJcIiBocmVmPVwiI29wZW4tcGxheWxpc3RcIiBvbkNsaWNrPXt0aGlzLmdvVG9QbGF5bGlzdFBhZ2V9Pnt0aGlzLnByb3BzLnRpdGxlfTwvYT5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGlsbFwiIGRhdGEtdG9nZ2xlPVwidG9vbHRpcFwiIHRpdGxlPVwiSXRlbXMgaW4gUGxheWxpc3RcIj57dGhpcy5wcm9wcy5zaXplfTwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxheWxpc3QtY3VyYXRvclwiPjxhIGNsYXNzTmFtZT1cImN1cmF0b3ItbGlua1wiIGRhdGEtdG9nZ2xlPVwidGFiXCIgaHJlZj1cIiNjdXJhdG9yLXBhZ2VcIiBvbkNsaWNrPXt0aGlzLmdvVG9DdXJhdG9yUGFnZX0+e3RoaXMucHJvcHMuY3VyYXRvcn08L2E+PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYXlsaXN0LWljb24tY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgPFBsYXlsaXN0SWNvbiBvd25lcj17dGhpcy5wcm9wcy5vd25lcn0gdHlwZT17dGhpcy5wcm9wcy50eXBlfSBsaWtlZD17dGhpcy5wcm9wcy5saWtlZH0vPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTMgY29sLXNtLTQgY29sLXBhZGRpbmdcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17cGxheWxpc3RDYXJkQ2xhc3NOYW1lfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxheWxpc3QtaW1nLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgb25DbGljaz17dGhpcy5wbGF5UGxheWxpc3R9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxheWxpc3Qtb3ZlcmxheVwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGF5bGlzdC1vdmVybGF5LWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGF5bGlzdC1wbGF5LWljb25cIj48aSBjbGFzc05hbWU9XCJmYSBmYS1wbGF5XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICBQTEFZIEFMTFxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJwbGF5bGlzdC1pbWdcIiBzcmM9e3RodW1ibmFpbH0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGF5bGlzdC10ZXh0LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYXlsaXN0LXRpdGxlXCI+XG4gICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwicGxheWxpc3QtbGluayBwbGF5bGlzdC10aXRsZS10ZXh0IGVsbGlwc2VzXCIgZGF0YS10b2dnbGU9XCJ0YWJcIiBocmVmPVwiI29wZW4tcGxheWxpc3RcIiBvbkNsaWNrPXt0aGlzLmdvVG9QbGF5bGlzdFBhZ2V9Pnt0aGlzLnByb3BzLnRpdGxlfTwvYT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBpbGxcIiBkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIiB0aXRsZT1cIkl0ZW1zIGluIFBsYXlsaXN0XCI+e3RoaXMucHJvcHMuc2l6ZX08L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxheWxpc3QtY3VyYXRvclwiPjxhIGNsYXNzTmFtZT1cImN1cmF0b3ItbGlua1wiIGRhdGEtdG9nZ2xlPVwidGFiXCIgaHJlZj1cIiNjdXJhdG9yLXBhZ2VcIiBvbkNsaWNrPXt0aGlzLmdvVG9DdXJhdG9yUGFnZX0+e3RoaXMucHJvcHMuY3VyYXRvcn08L2E+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxheWxpc3QtaWNvbi1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgPFBsYXlsaXN0SWNvbiBvd25lcj17dGhpcy5wcm9wcy5vd25lcn0gdHlwZT17dGhpcy5wcm9wcy50eXBlfSBsaWtlZD17dGhpcy5wcm9wcy5saWtlZH0vPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBQbGF5bGlzdEVudHJ5OyIsIi8qICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIENvcHlyaWdodCDCqSBcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBQbGF5bGlzdFRhYi5qc3hcblxuICAgIFBsYXlsaXN0IFRhYi4gVGhpcyBjb21wb25lbmV0IGlzIHVzZWQgdG8gZGlzcGxheSB0aGUgTXkgUGxheWxpc3QgdGFiLlxuICAgIFRoaXMgY29tcG9uZW50IHdpbGwgbm90IGFwcGVhciBpZiB0aGVyZSBpcyBubyB1c2VyIGxvZ2dlZCBpbiBkbyB0byBhIG5vblxuICAgIGxvZ2dlZCBpbiB1c2VyIG5vdCBoYXZpbmcgYW55IHBsYXlsaXN0cy4gT25seSBzaG93cyB0aGUgdGFiIGlmIHRoZSB1c2VyIGlzIGxvZ2dlZFxuICAgIGluXG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyogID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgQ29tcG9uZW50c1xuXG4gICAgUGxheWxpc3RUYWIgLSBFbnRpcmUgaHRtbCBmb3IgdGhlIEhvbWUgY29tcG9uZW50LlxuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgUGxheWxpc3RUYWIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgLy8gV2hlbiB0aGUgdXNlciBpcyBub3QgbG9nZ2VkIGluLCBkbyBub3QgZGlzcGxheSB0aGUgUGxheWxpc3QgdGFiXG4gICAgaWYgKHRoaXMucHJvcHMudXNlciA9PT0gdW5kZWZpbmVkIHx8IHRoaXMucHJvcHMudXNlciA9PT0gbnVsbCApIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIElmIHRoZXJlIGlzIGEgdXNlciBsb2dnZWQgaW4sIGNob29zZXMgdGhlIGNvcnJlY3QgdGFiIHR5cGVcbiAgICBzd2l0Y2godGhpcy5wcm9wcy50eXBlKSB7XG4gICAgICBjYXNlIFwiTXlQbGF5bGlzdC1tb2JpbGVcIjpcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8bGk+XG4gICAgICAgICAgICA8YSBkYXRhLXRvZ2dsZT1cInRhYlwiIGhyZWY9XCIjbXlwbGF5bGlzdHNcIiBpZD1cIm1vYmlsZS10YWItbXlwbGF5bGlzdHNcIj5cbiAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtYm9vayBpY29uLXBhZGRpbmdcIj48L2k+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFiLXRleHRcIj5NeSBQbGF5bGlzdHM8L2Rpdj5cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJNeVBsYXlsaXN0XCI6XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGxpPlxuICAgICAgICAgICAgPGEgZGF0YS10b2dnbGU9XCJ0YWJcIiBocmVmPVwiI215cGxheWxpc3RzXCIgaWQ9XCJ0YWItbXlwbGF5bGlzdHNcIj5cbiAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtYm9vayBpY29uLXBhZGRpbmdcIj48L2k+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFiLXRleHRcIj5NeSBQbGF5bGlzdHM8L2Rpdj5cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXlsaXN0VGFiOyIsIi8qICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIENvcHlyaWdodCDCqSBcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBNYWluLUNvbXBvbmVudCBRdWV1ZVxuXG4gICAgVGhlIGVudGlyZSBRdWV1ZSBjb21wb25lbnQuIENvbnRhaW5zIGEgbGlzdCBvZiBtZWRpYSBlbnRyaWVzIHRoYXQgYXJlIGluIHRoZSBxdWV1ZS5cbiAgICBBbHNvIGhhcyBzdWIgY29tcG9uZW50cyBvZiB0aGUgcXVldWUncyB0aXRsZSwgbGVuZ3RoLCBhbmQgYWRkZWQgbWVkaWEgbGVuZ3Rocywgd2l0aCB0aGUgYnV0dG9uc1xuICAgIHRoYXQgY29udHJvbHMgdGhlIGZ1bmN0aW9uYWxpdGllcyBvZiBzaHVmZmxlIGFuZCBsaWtlcy5cblxuICAgIEBDb21wb25lbnRzOiAgUXVldWVUaXRsZVxuICAgICAgICAgICAgICAgICAgUGxheWxpc3RMZW5ndGhcbiAgICAgICAgICAgICAgICAgIEFkZGVkTWVkaWFMZW5ndGhcbiAgICAgICAgICAgICAgICAgIFNodWZmbGVCdXR0b25cbiAgICAgICAgICAgICAgICAgIExpa2VCdXR0b25cbiAgICAgICAgICAgICAgICAgIENsZWFyQnV0dG9uXG4gICAgICAgICAgICAgICAgICBRdWV1ZVBsYWNlSG9sZGVyXG4gICAgICAgICAgICAgICAgICBRdWV1ZVxuXG4gICAgQEV4cG9ydHM6ICAgICBRdWV1ZVxuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIE1lZGlhRW50cnkgPSByZXF1aXJlKCcuL01lZGlhRW50cnkuanN4Jyk7XG5cbi8qICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIEZ1bmN0aW9uIHJlaW5pdGlhbGl6ZURyYWdnYWJsZVxuXG4gICAgV2hlbmV2ZXIgdGhlIHF1ZXVlIGlzIGNoYW5nZWQgb3IgdXBkYXRlZCwgcmVpbml0aWFsaXplcyB0aGUgZHJhZ2dhYmxlIGluIG9yZGVyXG4gICAgZm9yIHRoZSBkcmFnZ2luZyB0byB3b3JrIHdpdGggdGhlIG5ld2x5IHVwZGF0ZWQgbGlzdC4gVGhlIGRlc3Ryb3kgcGFyYW1ldGVyXG4gICAgcmVzZXRzIHRoZSBlbnRpcmUgZHJhZ2dhYmxlIG9iamVjdC4gQWZ0ZXIgdGhlIGVudGlyZSBwcm9jZXNzIGlzIGZpbmlzaGVkLCB0aGUgZnVuY3Rpb24gY2FsbGJhY2tcbiAgICBpcyBjYWxsZWQsIHdoaWNoIGlzIHVzdWFsbHkgYSBjYWxsYmFjayB0byByZXNldHRpbmcgdGhlIGRyYWdnYWJsZSB3aXRoIHRoZSBuZXcgcXVldWUuXG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbmZ1bmN0aW9uIHJlaW5pdGlhbGl6ZURyYWdnYWJsZShjYWxsYmFjaykge1xuICAkKCcubWVkaWEtY2FyZCcpLmFycmFuZ2VhYmxlKCdkZXN0cm95Jyk7XG4gIGNhbGxiYWNrKCk7XG59XG5cbnZhciBRdWV1ZVRpdGxlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybihcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicXVldWUtdGl0bGVcIj57dGhpcy5wcm9wcy5xdWV1ZVRpdGxlfTwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG52YXIgUGxheWxpc3RMZW5ndGggPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHBsYXlQaWxsQ2xhc3NOYW1lID0gXCJwaWxsXCI7XG4gICAgaWYgKHRoaXMucHJvcHMucGxheWxpc3RMZW5ndGggPD0gMCkge1xuICAgICAgcGxheVBpbGxDbGFzc05hbWUgKz0gXCIgZGlzcGxheS1ub25lXCJcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtwbGF5UGlsbENsYXNzTmFtZX0gZGF0YS10b2dnbGU9XCJ0b29sdGlwXCIgdGl0bGU9XCJJdGVtcyBpbiBQbGF5bGlzdFwiPnt0aGlzLnByb3BzLnBsYXlsaXN0TGVuZ3RofTwvZGl2PlxuICAgIClcbiAgfVxufSk7XG5cbnZhciBBZGRlZE1lZGlhTGVuZ3RoID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhZGRlZFBpbGxDbGFzc05hbWUgPSBcInBpbGwgcGlsbC1ibHVlXCI7XG4gICAgaWYgKHRoaXMucHJvcHMuYWRkZWRNZWRpYUxlbmd0aCA8PSAwKSB7XG4gICAgICBhZGRlZFBpbGxDbGFzc05hbWUgKz0gXCIgZGlzcGxheS1ub25lXCJcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXthZGRlZFBpbGxDbGFzc05hbWV9IGRhdGEtdG9nZ2xlPVwidG9vbHRpcFwiIHRpdGxlPVwiSXRlbXMgQWRkZWRcIj4re3RoaXMucHJvcHMuYWRkZWRNZWRpYUxlbmd0aH08L2Rpdj5cbiAgICApXG4gIH1cbn0pO1xuXG52YXIgRWRpdEJ1dHRvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgYWRkVG9QbGF5bGlzdDogZnVuY3Rpb24oKSB7XG5cbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInF1ZXVlLWljb25cIj48YSBjbGFzc05hbWU9XCJpY29uLWJ0blwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQ2xpY2t9PjxpIGNsYXNzTmFtZT1cImZhIGZhLWVkaXRcIiBkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIiB0aXRsZT1cIkVkaXRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+PC9hPjwvZGl2PiAgXG4gICAgKTtcbiAgfVxufSk7XG5cbnZhciBTaHVmZmxlQnV0dG9uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInF1ZXVlLWljb24gc2hmbC1idG5cIj48YSBjbGFzc05hbWU9XCJpY29uLWJ0blwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIj48aSBjbGFzc05hbWU9XCJmYSBmYS1yYW5kb21cIiBkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIiB0aXRsZT1cIlNodWZmbGVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+PC9hPjwvZGl2PlxuICAgIClcbiAgfVxufSk7XG5cbnZhciBMaWtlQnV0dG9uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybihcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicXVldWUtaWNvbiBsaWtlLWJ0blwiPjxhIGNsYXNzTmFtZT1cImljb24tYnRuXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiPjxpIGNsYXNzTmFtZT1cImZhIGZhLWhlYXJ0LW9cIiBkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIiB0aXRsZT1cIkxpa2UgUGxheWxpc3RcIiBhcmlhLWhjbGFzc2Rlbj1cInRydWVcIj48L2k+PC9hPjwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG52YXIgQ2xlYXJCdXR0b24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicXVldWUtaWNvblwiPjxhIGNsYXNzTmFtZT1cImljb24tYnRuXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIG9uQ2xpY2s9e3RoaXMucHJvcHMub25DbGlja30+PGkgY2xhc3NOYW1lPVwiZmEgZmEtc3F1YXJlLW9cIiBkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIiB0aXRsZT1cIkNsZWFyXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPjwvYT48L2Rpdj4gIFxuICAgICk7XG4gIH1cbn0pO1xuICAgXG4vLyBUT0RPOiBNYXliZSBpbXBsZW1lbnQgTG9vcFxudmFyIExvb3BCdXR0b24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufSk7XG5cbi8vIFBsYWNlaG9sZGVyIGZvciBhbiBlbXB0eSBsaXN0IG9mIG1lZGlhIGVudHJpZXMgaW4gcXVldWVcbnZhciBRdWV1ZVBsYWNlSG9sZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYWNlaG9sZGVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxhY2Vob2xkZXItY29udGVudFwiPlxuICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLXNxdWFyZS1vIHBsYWNlaG9sZGVyLWljb25cIj48L2k+PGJyLz5cbiAgICAgICAgICA8c3Bhbj5Zb3VyIHF1ZXVlIGlzIGVtcHR5PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG4vLyBNQUlOIENPTVBPTkVOVDogVGhlIGVudGlyZSBxdWV1ZVxudmFyIFF1ZXVlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBxdWV1ZUxpc3Q6IFtdXG4gICAgfTtcbiAgfSxcblxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgLy8gRXZlbnQgaGFuZGxlcnMgc2VudCBmcm9tIHNlcnZlciB3aGVuIG1lZGlhcyBhcmUgYWRkZWQgdG8gdGhlIHF1ZXVlXG4gICAgc29ja2V0Lm9uKCdGcm9tIFNlcnZlcjogSW5pdGlhbGl6ZSBRdWV1ZScsIHRoaXMuaW5pdGlhbGl6ZVF1ZXVlKTtcbiAgICBzb2NrZXQub24oJ0Zyb20gU2VydmVyOiBQdXNoIGludG8gcXVldWUnLCB0aGlzLnB1c2hJbnRvUXVldWUpO1xuICAgIHNvY2tldC5vbignRnJvbSBTZXJ2ZXI6IFVwZGF0ZSBxdWV1ZSB3aXRoIG5ldyBxdWV1ZScsIHRoaXMudXBkYXRlUXVldWVXaXRoTmV3UXVldWUpO1xuICB9LFxuXG4gIC8vIEVWRU5UIEhBTkRMRVI6IEluaXRpYWxpemVzIHRoZSBxdWV1ZSB3aXRoIHRoZSBzZXJ2ZXIncyBjdXJyZW50IHF1ZXVlXG4gIGluaXRpYWxpemVRdWV1ZTogZnVuY3Rpb24obWVkaWFFbnRyaWVzKSB7XG4gICAgdmFyIHF1ZXVlTGlzdFdpdGhOZXdNZWRpYUVudHJ5ID0gdGhpcy5zdGF0ZS5xdWV1ZUxpc3QuY29uY2F0KG1lZGlhRW50cmllcyk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7cXVldWVMaXN0OiBxdWV1ZUxpc3RXaXRoTmV3TWVkaWFFbnRyeX0sIGZ1bmN0aW9uKCkge1xuICAgICAgcmVpbml0aWFsaXplRHJhZ2dhYmxlKGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkRyYWdnYWJsZSByZWluaXRpYWxpemVkIHdpdGggUXVldWUgY2hhbmdlcyA6IGluaXRpYWxpemVRdWV1ZVwiKTsgICAgICAgIFxuICAgICAgICAkKCcubWVkaWEtY2FyZCcpLmFycmFuZ2VhYmxlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSxcblxuICAvLyBFVkVOVCBIQU5ETEVSOiBQdXNoZXMgYSBtZWRpYSBlbnRyeSBpbnRvIHRoZSBxdWV1ZVxuICBwdXNoSW50b1F1ZXVlOiBmdW5jdGlvbihtZWRpYUVudHJ5KSB7XG4gICAgdmFyIHF1ZXVlTGlzdFdpdGhOZXdNZWRpYUVudHJ5ID0gdGhpcy5zdGF0ZS5xdWV1ZUxpc3QuY29uY2F0KG1lZGlhRW50cnkpO1xuICAgIHRoaXMuc2V0U3RhdGUoe3F1ZXVlTGlzdDogcXVldWVMaXN0V2l0aE5ld01lZGlhRW50cnl9LCBmdW5jdGlvbigpIHtcbiAgICAgIHJlaW5pdGlhbGl6ZURyYWdnYWJsZShmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJEcmFnZ2FibGUgcmVpbml0aWFsaXplZCB3aXRoIFF1ZXVlIGNoYW5nZXMgOiBwdXNoSW50b1F1ZXVlXCIpO1xuICAgICAgICAkKCcubWVkaWEtY2FyZCcpLmFycmFuZ2VhYmxlKCk7ICBcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuXG4gIC8vIEVWRU5UIEhBTkRMRVI6IFVwZGF0ZXMgdGhlIHF1ZXVlIHdpdGggdGhlIHNlcnZlcidzIHF1ZXVlXG4gIHVwZGF0ZVF1ZXVlV2l0aE5ld1F1ZXVlOiBmdW5jdGlvbihuZXdRdWV1ZUxpc3QpIHtcbiAgICBjb25zb2xlLmxvZyhuZXdRdWV1ZUxpc3QpO1xuICAgIHRoaXMuc2V0U3RhdGUoe3F1ZXVlTGlzdDogbmV3UXVldWVMaXN0fSwgZnVuY3Rpb24oKSB7XG4gICAgICByZWluaXRpYWxpemVEcmFnZ2FibGUoZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRHJhZ2dhYmxlIHJlaW5pdGlhbGl6ZWQgd2l0aCBRdWV1ZSBjaGFuZ2VzIDogdXBkYXRlUXVldWVXaXRoTmV3UXVldWVcIik7XG4gICAgICAgICQoJy5tZWRpYS1jYXJkJykuYXJyYW5nZWFibGUoKTsgIFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG5cbiAgLy8gRVZFTlQgSEFORExFUjogQ2xlYXJzIHRoZSBlbnRpcmUgcXVldWVcbiAgY2xlYXJRdWV1ZTogZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coXCJDbGVhcmluZyB0aGUgcXVldWVcIik7XG4gICAgc29ja2V0LmVtaXQoJ0Zyb20gQ2xpZW50OiBVcGRhdGUgcXVldWUgd2l0aCBuZXcgbGlzdCcsIFtdKTtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIC8vIFByZXBhcmVzIGVhY2ggbWVkaWEgZW50cnkuIFdoZW5ldmVyIGEgbWVkaWEgaXMgYWRkZWQsIHBvcHVsYXRlcyB0aGUgcXVldWUgbGlzdCB3aXRoIHRoZSBuZXcgbWVkaWEgZW50cnlcbiAgICB2YXIgcXVldWVFbnRyaWVzID0gW107XG4gICAgdmFyIHF1ZXVlRW50cnk7XG4gICAgdmFyIHF1ZXVlTWVkaWFFbnRyeUlkID0gJ3F1ZXVlLW1lZGlhLWVudHJ5LSc7XG4gICAgdmFyIHBsYXlsaXN0TGVuZ3RoID0gMDtcbiAgICB2YXIgYWRkZWRNZWRpYUxlbmd0aCA9IDA7XG5cbiAgICAvLyBBZGRlZCBJZiBzdGF0ZW1lbnQgdGhhdCBwdXNoZXMgdGhlIHBsYWNlaG9sZGVyIGRpdiBpbnRvIHF1ZXVlRW50cmllcyB3aGVuZXZlciBxdWV1ZUxpc3QgaXMgZW1wdHlcbiAgICBpZiAodGhpcy5zdGF0ZS5xdWV1ZUxpc3QubGVuZ3RoIDw9IDApIHtcbiAgICAgIHF1ZXVlRW50cmllcy5wdXNoKFxuICAgICAgICA8UXVldWVQbGFjZUhvbGRlciBrZXk9eydRdWV1ZVBsYWNlSG9sZGVyJ30gLz5cbiAgICAgIClcbiAgICB9XG5cbiAgICAvLyBJZiB0aGVyZSBhcmUgbWVkaWEgZW50cmllcywgcHVzaGVzIGV2ZXJ5IG1lZGlhIGVudHJ5IHRoZSBxdWV1ZUVudHJpZXMgaW5zdGVhZFxuICAgIGVsc2Uge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnN0YXRlLnF1ZXVlTGlzdC5sZW5ndGg7ICsraSkge1xuICAgICAgICBxdWV1ZUVudHJ5ID0gdGhpcy5zdGF0ZS5xdWV1ZUxpc3RbaV07XG5cbiAgICAgICAgaWYgKHF1ZXVlRW50cnkuaWZNZWRpYUNhcmRBZGRlZCkge1xuICAgICAgICAgICsrYWRkZWRNZWRpYUxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICArK3BsYXlsaXN0TGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgcXVldWVFbnRyaWVzLnB1c2ggKFxuICAgICAgICAgIDxNZWRpYUVudHJ5IFxuICAgICAgICAgICAgLy8gRk9SIFBSRVZFTlRJTkcgRFVQTElDQVRFU1xuICAgICAgICAgICAgLy8ga2V5PXtxdWV1ZUVudHJ5Lm1lZGlhSWR9IFxuICAgICAgICAgICAga2V5PXtxdWV1ZUVudHJ5Lm1lZGlhSWQgKyBpfVxuICAgICAgICAgICAgcG9zPXtpfSBcbiAgICAgICAgICAgIG1lZGlhSWQ9e3F1ZXVlRW50cnkubWVkaWFJZH0gXG4gICAgICAgICAgICBjYXRlZ29yeVR5cGU9eydRVUVVRSd9XG4gICAgICAgICAgICBtZWRpYVR5cGU9eydZT1VUVUJFJ31cbiAgICAgICAgICAgIHRodW1ibmFpbD17cXVldWVFbnRyeS50aHVtYm5haWx9IFxuICAgICAgICAgICAgdGl0bGU9e3F1ZXVlRW50cnkudGl0bGV9XG4gICAgICAgICAgICBhcnRpc3Q9e3F1ZXVlRW50cnkuYXJ0aXN0fSBcbiAgICAgICAgICAgIGlmTWVkaWFDYXJkQWRkZWQ9e3F1ZXVlRW50cnkuaWZNZWRpYUNhcmRBZGRlZH0gLz5cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJxdWV1ZS1oZWFkZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInF1ZXVlLXRpdGxlLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgey8qIFRPRE86IENoYW5nZSBxdWV1ZSB0aXRsZXMgYW5kIHBpbGwgbnVtYmVycyBkZXBlbmRpbmcgb24gd2hhdCB3YXMgYWRkZWQgKi99XG4gICAgICAgICAgICA8UXVldWVUaXRsZSBxdWV1ZVRpdGxlPXtcIlF1ZXVlXCJ9IC8+XG4gICAgICAgICAgICA8UGxheWxpc3RMZW5ndGggcGxheWxpc3RMZW5ndGg9e3BsYXlsaXN0TGVuZ3RofSAvPlxuICAgICAgICAgICAgPEFkZGVkTWVkaWFMZW5ndGggYWRkZWRNZWRpYUxlbmd0aD17YWRkZWRNZWRpYUxlbmd0aH0gLz5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicXVldWUtaWNvbi1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxDbGVhckJ1dHRvbiBvbkNsaWNrPXt0aGlzLmNsZWFyUXVldWV9IC8+XG4gICAgICAgICAgICA8TGlrZUJ1dHRvbiAvPlxuICAgICAgICAgICAgPFNodWZmbGVCdXR0b24gLz5cbiAgICAgICAgICAgIDxFZGl0QnV0dG9uIG9uQ2xpY2s9e3RoaXMuYWRkVG9QbGF5bGlzdH0gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJxdWV1ZS1ib2R5IGNvbC1wYWRkaW5nXCI+XG4gICAgICAgICAge3F1ZXVlRW50cmllc31cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPG5hdiBhcmlhLWxhYmVsPVwicGFnZSBuYXZpZ2F0aW9uXCI+XG4gICAgICAgICAgPHVsIGNsYXNzTmFtZT1cInBhZ2luYXRpb25cIj5cbiAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJkaXNhYmxlZFwiPjxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBhcmlhLWxhYmVsPVwiUHJldmlvdXNcIj48aSBjbGFzc05hbWU9XCJmYSBmYS1hbmdsZS1sZWZ0XCI+PC9pPjwvYT48L2xpPlxuICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImFjdGl2ZVwiPjxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIj4xPC9hPjwvbGk+XG4gICAgICAgICAgICA8bGk+PGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiPjI8L2E+PC9saT5cbiAgICAgICAgICAgIDxsaT48YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+MzwvYT48L2xpPlxuICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBhcmlhLWxhYmVsPVwiTmV4dFwiPjxpIGNsYXNzTmFtZT1cImZhIGZhLWFuZ2xlLXJpZ2h0XCI+PC9pPjwvYT48L2xpPlxuICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvbmF2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUXVldWU7IiwiLyogID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgQ29weXJpZ2h0IMKpIFxuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIFJvb20uanN4XG5cbiAgICBFdmVyeSB2aWV3IG9mIGVhY2ggaW5kaXZpZHVhbCByb29tLlxuICAgIFRoZSB2aWV3IG9mIHRoZSBlbnRpcmUgaW5kZXggcGFnZS4gTWFpbiB3ZWJwYWdlXG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyogID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgQ29tcG9uZW50c1xuXG4gICAgUm9vbSAtIEVudGlyZSBodG1sIGZvciB0aGUgUm9vbSBjb21wb25lbnQuIFNcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuLy8gU3ViLWNvbXBvbmVudHMgaW4gUm9vbVxudmFyIEhlYWRlciA9IHJlcXVpcmUoJy4vSGVhZGVyLmpzeCcpO1xudmFyIE1lZGlhUGxheWVyID0gcmVxdWlyZSgnLi9NZWRpYVBsYXllci5qc3gnKTtcbnZhciBDaGF0Ym94ID0gcmVxdWlyZSgnLi9DaGF0Ym94LmpzeCcpO1xudmFyIFN0YXR1c0JhciA9IHJlcXVpcmUoJy4vU3RhdHVzQmFyLmpzeCcpO1xudmFyIFF1ZXVlID0gcmVxdWlyZSgnLi9RdWV1ZS5qc3gnKTtcbnZhciBFeHBsb3JlID0gcmVxdWlyZSgnLi9FeHBsb3JlLmpzeCcpO1xudmFyIE15UGxheWxpc3RzID0gcmVxdWlyZSgnLi9NeVBsYXlsaXN0cy5qc3gnKTtcbnZhciBQbGF5bGlzdFRhYiA9IHJlcXVpcmUoJy4vUGxheWxpc3RUYWIuanN4Jyk7XG52YXIgRWRpdE9wZW5lZFBsYXlsaXN0ID0gcmVxdWlyZSgnLi9FZGl0T3BlbmVkUGxheWxpc3QuanN4Jyk7XG52YXIgVmlld09wZW5lZFBsYXlsaXN0ID0gcmVxdWlyZSgnLi9WaWV3T3BlbmVkUGxheWxpc3QuanN4Jyk7XG52YXIgTW9kYWxDcmVhdGVQbGF5bGlzdCA9IHJlcXVpcmUoJy4vTW9kYWxDcmVhdGVQbGF5bGlzdC5qc3gnKTtcbnZhciBTZWFyY2ggPSByZXF1aXJlKCcuL1NlYXJjaC5qc3gnKTtcbnZhciBGb290ZXIgPSByZXF1aXJlKCcuL0Zvb3Rlci5qc3gnKTtcblxuLy8gRmx1eCwgdXNlZCB0byBjaGVjayBmb3IgZGVsZXRlZCBwbGF5bGlzdHNcbnZhciBwbGF5bGlzdFN0b3JlID0gcmVxdWlyZSgnLi4vZmx1eC9zdG9yZXMvc3RvcmUnKTtcblxuLy8gTUFJTiBDT01QT05FTlQ6IFJvb21cbnZhciBSb29tID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLnByb3BzLm15UGxheWxpc3RzICA9PT0gdW5kZWZpbmVkIHx8IHRoaXMucHJvcHMubXlQbGF5bGlzdHMgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG15UGxheWxpc3RzOiBbXVxuICAgICAgfTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBteVBsYXlsaXN0czogdGhpcy5wcm9wcy5teVBsYXlsaXN0c1xuICAgICAgfTsgIFxuICAgIH1cbiAgfSxcblxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgLy8gU2V0cyB1cCB0aGUgRmx1eCBldmVudCBsaXN0ZW5lcnMgZm9yIHRoZSBwbGF5bGlzdHNcbiAgICBwbGF5bGlzdFN0b3JlLmFkZERlbGV0ZVBsYXlsaXN0TGlzdGVuZXIodGhpcy5vbkRlbGV0ZVNwZWNpZmllZFBsYXlsaXN0KTtcbiAgICBwbGF5bGlzdFN0b3JlLmFkZFVwZGF0ZVBsYXlsaXN0TGlzdGVuZXIodGhpcy5vblVwZGF0ZVNwZWNpZmllZFBsYXlsaXN0KTtcbiAgICBwbGF5bGlzdFN0b3JlLmFkZENyZWF0ZVBsYXlsaXN0TGlzdGVuZXIodGhpcy51cGRhdGVBbGxQbGF5bGlzdEVudHJpZXMpO1xuXG4gICAgLy8gc29ja2V0Lm9uKCdGcm9tIFNlcnZlcjogSW5pdGlhbGl6ZSByb29tIGJ5IHBpbmdpbmcgY2xpZW50IGZpcnN0JywgdGhpcy5pbml0aWFsaXplUm9vbUluU2VydmVyV2l0aERhdGEpO1xuICAgIC8vIHNvY2tldC5vbihcIkZyb20gU2VydmVyOiBVcGRhdGUgTXlQbGF5bGlzdCB3aXRoIG5ldyBwbGF5bGlzdHNcIiAsIHRoaXMudXBkYXRlQWxsUGxheWxpc3RFbnRyaWVzKTtcbiAgICBzb2NrZXQub24oXCJGcm9tIFNlcnZlcjogVXBkYXRlIHNlbGVjdGVkIHBsYXlsaXN0XCIsIHRoaXMudXBkYXRlT25lUGxheWxpc3RFbnRyeSk7XG4gICAgXG4gICAgc29ja2V0LmVtaXQoXCJGcm9tIENsaWVudDogSW5pdGlhbGl6ZSByb29tXCIsIHtcbiAgICAgIHVzZXI6IHRoaXMucHJvcHMudXNlcixcbiAgICAgIHJvb206IHRoaXMucHJvcHMucm9vbVxuICAgIH0pO1xuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbigpIHtcbiAgICAvLyBVbm1vdW50cyB0aGUgZXZlbnQgbGlzdGVuZXJcbiAgICBwbGF5bGlzdFN0b3JlLnJlbW92ZURlbGV0ZVBsYXlsaXN0TGlzdGVuZXIodGhpcy5vbkRlbGV0ZVNwZWNpZmllZFBsYXlsaXN0KTtcbiAgICBwbGF5bGlzdFN0b3JlLnJlbW92ZVVwZGF0ZVBsYXlsaXN0TGlzdGVuZXIodGhpcy5vblVwZGF0ZVNwZWNpZmllZFBsYXlsaXN0KTtcbiAgICBwbGF5bGlzdFN0b3JlLnJlbW92ZUNyZWF0ZVBsYXlsaXN0TGlzdGVuZXIodGhpcy51cGRhdGVBbGxQbGF5bGlzdEVudHJpZXMpO1xuICB9LFxuXG4gIC8vIEZMVVggRVZFTlQgSEFORExFUjogRGVsZXRlcyBhIHBsYXlsaXN0IGVudHJ5IGZyb20gbXlQbGF5bGlzdFxuICBvbkRlbGV0ZVNwZWNpZmllZFBsYXlsaXN0OiBmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZyhcIlJvb20uanN4OiBvbkRlbGV0ZVNwZWNpZmllZFBsYXlsaXN0XCIpO1xuICAgIHZhciBwbGF5bGlzdCA9IHBsYXlsaXN0U3RvcmUuZ2V0UGxheWxpc3REZWxldGVkKCk7XG4gICAgaWYgKHBsYXlsaXN0ID09PSBudWxsIHx8IHBsYXlsaXN0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBEbyBzZWFyY2ggaW4gYSBmYXN0ZXIgd2F5XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnN0YXRlLm15UGxheWxpc3RzLmxlbmd0aDsgKytpKSB7XG4gICAgICBpZiAodGhpcy5zdGF0ZS5teVBsYXlsaXN0c1tpXS5faWQgPT09IHBsYXlsaXN0Ll9pZCkge1xuICAgICAgICAvLyBTaG93IHRoZSBwbGF5bGlzdCB0YWJcbiAgICAgICAgJCgnI3RhYi1teXBsYXlsaXN0cycpLnRhYignc2hvdycpO1xuXG4gICAgICAgIHZhciBwbGF5bGlzdHNXaXRoRGVsZXRlZEVudHJ5ID0gdGhpcy5zdGF0ZS5teVBsYXlsaXN0cztcbiAgICAgICAgcGxheWxpc3RzV2l0aERlbGV0ZWRFbnRyeS5zcGxpY2UoaSwgMSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe215UGxheWxpc3RzIDogcGxheWxpc3RzV2l0aERlbGV0ZWRFbnRyeX0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIG9uVXBkYXRlU3BlY2lmaWVkUGxheWxpc3Q6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBwbGF5bGlzdCA9IHBsYXlsaXN0U3RvcmUuZ2V0VXBkYXRlZFBsYXlsaXN0KCk7XG4gICAgaWYgKHBsYXlsaXN0ID09PSBudWxsIHx8IHBsYXlsaXN0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBEbyBzZWFyY2ggaW4gYSBmYXN0ZXIgd2F5XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnN0YXRlLm15UGxheWxpc3RzLmxlbmd0aDsgKytpKSB7XG4gICAgICBpZiAodGhpcy5zdGF0ZS5teVBsYXlsaXN0c1tpXS5faWQgPT09IHBsYXlsaXN0Ll9pZCkge1xuICAgICAgICB2YXIgcGxheWxpc3RzV2l0aFVwZGF0ZWRFbnRyeSA9IHRoaXMuc3RhdGUubXlQbGF5bGlzdHM7XG4gICAgICAgIHBsYXlsaXN0c1dpdGhVcGRhdGVkRW50cnlbaV0gPSBwbGF5bGlzdDsgXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe215UGxheWxpc3RzIDogcGxheWxpc3RzV2l0aFVwZGF0ZWRFbnRyeX0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8vIEVWRU5UIEhBTkRMRVI6IEluaXRpYWxpemUgcm9vbSBmb3Igc2VydmVyXG4gIGluaXRpYWxpemVSb29tSW5TZXJ2ZXJXaXRoRGF0YTogZnVuY3Rpb24oKSB7XG4gICAgc29ja2V0LmVtaXQoXCJGcm9tIENsaWVudDogSW5pdGlhbGl6ZSByb29tXCIsIHtcbiAgICAgIHVzZXI6IHRoaXMucHJvcHMudXNlcixcbiAgICAgIHJvb206IHRoaXMucHJvcHMucm9vbVxuICAgIH0pO1xuICB9LFxuXG4gIC8vIEVWRU5UIEhBTkRMRVI6IFVwZGF0ZSB0aGUgcGxheWxpc3QgZW50cnlcbiAgdXBkYXRlQWxsUGxheWxpc3RFbnRyaWVzOiBmdW5jdGlvbihuZXdQbGF5bGlzdCkge1xuICAgIGNvbnNvbGUubG9nKFwiVXBkYXRlIHdpdGggbmV3IHBsYXlsaXN0IGVudHJ5XCIpXG4gICAgdmFyIG5ld1BsYXlsaXN0ID0gcGxheWxpc3RTdG9yZS5nZXRDcmVhdGVkUGxheWxpc3QoKTtcbiAgICB2YXIgcGxheWxpc3RzV2l0aE5ld0VudHJ5ID0gdGhpcy5zdGF0ZS5teVBsYXlsaXN0cy5jb25jYXQobmV3UGxheWxpc3QpO1xuICAgIHRoaXMuc2V0U3RhdGUoe215UGxheWxpc3RzIDogcGxheWxpc3RzV2l0aE5ld0VudHJ5fSk7IFxuICB9LFxuXG4gIC8vIEVWRU5UIEhBTkRMRVI6IFVwZGF0ZXMgdGhlIGNsaWVudCdzIHBsYXlsaXN0IGVudHJ5IHdoZW4gYSBtZWRpYSBpcyBwdXNoZWQgaW5cbiAgdXBkYXRlT25lUGxheWxpc3RFbnRyeTogZnVuY3Rpb24obmV3UGxheWxpc3QpIHtcbiAgICAvLyBUT0RPOiBGaW5kIGEgYmV0dGVyIG1ldGhvZCBpbnN0ZWFkIG9mIHRoaXMsIG9yIG1heWJlIG5vdFxuICAgIHZhciB1cGRhdGVkTXlQbGF5bGlzdHMgPSB0aGlzLnN0YXRlLm15UGxheWxpc3RzO1xuICAgIHZhciBwbGF5bGlzdEVudHJ5O1xuICAgIC8vIEluY3JlbWVudHMgdGhyb3VnaCBldmVyeSBwbGF5bGlzdCBlbnRyeSB0byBmaW5kIHRoZSBleGlzdGluZyBwbGF5bGlzdC5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc3RhdGUubXlQbGF5bGlzdHMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHBsYXlsaXN0RW50cnkgPSB0aGlzLnN0YXRlLm15UGxheWxpc3RzW2ldO1xuICAgICAgaWYgKHBsYXlsaXN0RW50cnkuX2lkID09PSBuZXdQbGF5bGlzdC5faWQpIHtcbiAgICAgICAgdXBkYXRlZE15UGxheWxpc3RzW2ldID0gbmV3UGxheWxpc3Q7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe215UGxheWxpc3RzIDogdXBkYXRlZE15UGxheWxpc3RzfSk7ICAgICBcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIFxuICAgIHJldHVybihcbiAgICAgIDxkaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC1jb250YWluZXJcIj5cblxuICAgICAgICAgIHsvKiBQYWdlIE92ZXJsYXkgLy8gdG8gZnJlZXplIHNjcmVlbiB3aGVuIG1vZGFsL3BvcHVwIGlzIGFjdGl2ZSAqL31cbiAgICAgICAgICA8ZGl2IGlkPVwicGFnZS1vdmVybGF5XCI+PC9kaXY+XG5cbiAgICAgICAgICB7LyogSGVhZGVyICovfVxuICAgICAgICAgIDxIZWFkZXIgdXNlcj17dGhpcy5wcm9wcy51c2VyfSAvPlxuXG4gICAgICAgICAgey8qIFZpZGVvIGFuZCBDaGF0IEJhbm5lciAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhbm5lci1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFubmVyLWNvbnRlbnQtY29udGFpbmVyXCI+XG5cbiAgICAgICAgICAgICAgey8qIFZpZGVvICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZpZGVvLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxNZWRpYVBsYXllciAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogTW9iaWxlIFRhYiBOYXZpZ2F0aW9uIC8vIHJlcGxhY2VzIHJlZ3VsYXIgdGFicyBpbiBtb2JpbGUgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9iaWxlLXRhYmJlZC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibmF2IG5hdi10YWJzIG5hdi1jZW50ZXJlZFwiPlxuICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImFjdGl2ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8YSBkYXRhLXRvZ2dsZT1cInRhYlwiIGhyZWY9XCIjY2hhdFwiIGlkPVwibW9iaWxlLXRhYi1jaGF0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtY29tbWVudHMgaWNvbi1wYWRkaW5nXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFiLXRleHRcIj5DaGF0PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgIDxhIGRhdGEtdG9nZ2xlPVwidGFiXCIgaHJlZj1cIiNxdWV1ZVwiIGlkPVwibW9iaWxlLXRhYi1xdWV1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWxpc3QtdWwgaWNvbi1wYWRkaW5nXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFiLXRleHRcIj5RdWV1ZTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICA8YSBkYXRhLXRvZ2dsZT1cInRhYlwiIGhyZWY9XCIjZXhwbG9yZVwiIGlkPVwibW9iaWxlLXRhYi1leHBsb3JlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtcm9ja2V0IGljb24tcGFkZGluZ1wiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYi10ZXh0XCI+RXhwbG9yZTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuXG4gICAgICAgICAgICAgICAgICA8UGxheWxpc3RUYWIgdHlwZT17XCJNeVBsYXlsaXN0LW1vYmlsZVwifSB1c2VyPXt0aGlzLnByb3BzLnVzZXJ9IC8+XG5cbiAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgPGEgZGF0YS10b2dnbGU9XCJ0YWJcIiBocmVmPVwiI3NlYXJjaFwiIGNsYXNzTmFtZT0nZm9jdXMtc2VhcmNoJyBpZD1cIm1vYmlsZS10YWItc2VhcmNoXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtc2VhcmNoIGljb24tcGFkZGluZ1wiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYi10ZXh0XCI+U2VhcmNoPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBDaGF0ICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaGF0Ym94LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgIDxDaGF0Ym94IHJvb209e3RoaXMucHJvcHMucm9vbX0gdXNlcj17dGhpcy5wcm9wcy51c2VyfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIE1haW4gQ29udGFpbmVyIC8vIHF1ZXVlIGFuZCB0YWJiZWQgY29udGFpbmVycyovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFpbi1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG5cbiAgICAgICAgICAgICAgey8qIFF1ZXVlICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC00IGNvbC1zbS01IHF1ZXVlLWNvbnRhaW5lclwiIGlkPVwicXVldWVcIj5cbiAgICAgICAgICAgICAgICA8UXVldWUgdXNlcj17dGhpcy5wcm9wcy51c2VyfSAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogRGVza3RvcCBUYWIgTmF2aWdhdGlvbiAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtOCBjb2wtc20tNyB0YWJiZWQtY29udGFpbmVyIHRhYmJlZC1jb250YWluZXItbW9iaWxlLWNvbGxhcHNlXCI+XG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cIm5hdiBuYXYtdGFicyBuYXYtdGFicy1tb2JpbGUtY29sbGFwc2VcIj5cbiAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJhY3RpdmVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGEgZGF0YS10b2dnbGU9XCJ0YWJcIiBocmVmPVwiI2V4cGxvcmVcIiBpZD1cInRhYi1leHBsb3JlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtcm9ja2V0IGljb24tcGFkZGluZ1wiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYi10ZXh0XCI+RXhwbG9yZTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICA8UGxheWxpc3RUYWIgdHlwZT17XCJNeVBsYXlsaXN0XCJ9IHVzZXI9e3RoaXMucHJvcHMudXNlcn0gLz5cblxuICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICA8YSBkYXRhLXRvZ2dsZT1cInRhYlwiIGhyZWY9XCIjc2VhcmNoXCIgY2xhc3NOYW1lPSdmb2N1cy1zZWFyY2gnIGlkPVwidGFiLXNlYXJjaFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLXNlYXJjaCBpY29uLXBhZGRpbmdcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWItdGV4dFwiPlNlYXJjaDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuXG4gICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImhpZGRlblwiIGRhdGEtdG9nZ2xlPVwidGFiXCIgaHJlZj1cIiNlZGl0LXBsYXlsaXN0XCIgaWQ9XCJ0YWItZWRpdC1wbGF5bGlzdFwiPjwvYT5cbiAgICAgICAgICAgICAgICAgIDwvbGk+XG5cbiAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiaGlkZGVuXCIgZGF0YS10b2dnbGU9XCJ0YWJcIiBocmVmPVwiI3ZpZXctcGxheWxpc3RcIiBpZD1cInRhYi12aWV3LXBsYXlsaXN0XCI+PC9hPlxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDwvdWw+XG5cbiAgICAgICAgICAgICAgICB7LyogRGVza3RvcCBUYWJiZWQgQ29udGFpbmVycyAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYi1jb250ZW50XCI+XG5cbiAgICAgICAgICAgICAgICAgIHsvKiBFeHBsb3JlICovfVxuICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cImV4cGxvcmVcIiBjbGFzc05hbWU9XCJ0YWItcGFuZSBmYWRlIGluIGFjdGl2ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8RXhwbG9yZSBleHBsb3JlPXt0aGlzLnByb3BzLmV4cGxvcmV9IC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgey8qIE15IFBsYXlsaXN0cyAqL31cbiAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJteXBsYXlsaXN0c1wiIGNsYXNzTmFtZT1cInRhYi1wYW5lIGZhZGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPE15UGxheWxpc3RzIG15UGxheWxpc3RzPXt0aGlzLnN0YXRlLm15UGxheWxpc3RzfSAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIHsvKiBTZWFyY2ggKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwic2VhcmNoXCIgY2xhc3NOYW1lPVwidGFiLXBhbmUgZmFkZVwiPlxuICAgICAgICAgICAgICAgICAgICA8U2VhcmNoIHVzZXI9e3RoaXMucHJvcHMudXNlcn0gbXlQbGF5bGlzdHM9e3RoaXMuc3RhdGUubXlQbGF5bGlzdHN9IC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgey8qIFVzZXIncyBvcGVuZWQgcGxheWxpc3QgKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiZWRpdC1wbGF5bGlzdFwiIGNsYXNzTmFtZT1cInRhYi1wYW5lIGZhZGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPEVkaXRPcGVuZWRQbGF5bGlzdCBteVBsYXlsaXN0cz17dGhpcy5zdGF0ZS5teVBsYXlsaXN0c30gdXNlcj17dGhpcy5wcm9wcy51c2VyfSAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIHsvKiBPcGVuZWQgcGxheWxpc3QgKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwidmlldy1wbGF5bGlzdFwiIGNsYXNzTmFtZT1cInRhYi1wYW5lIGZhZGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPFZpZXdPcGVuZWRQbGF5bGlzdCBteVBsYXlsaXN0cz17dGhpcy5zdGF0ZS5teVBsYXlsaXN0c30gdXNlcj17dGhpcy5wcm9wcy51c2VyfSAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIHsvKiBNb2RhbCBmb3IgY3JlYXRlIG5ldyBwbGF5bGlzdCBidXR0b24sIHRoZXJlIGlzIG5vIG1lZGlhIGVudHJ5IHdoZW4gdGhpcyBidXR0b24gaXMgY2xpY2tlZCAqL31cbiAgICAgICAgICAgICAgICAgIDxNb2RhbENyZWF0ZVBsYXlsaXN0IGtleT17XCJuZXdQbGF5bGlzdFwifSB1c2VyPXt0aGlzLnByb3BzLnVzZXJ9IGRhdGE9e251bGx9IHBvcz17bnVsbH0gLz5cblxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogRm9vdGVyIFB1c2ggKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdXNoXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBGb290ZXIgKi99XG4gICAgICAgIDxGb290ZXIgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJvb207IiwiLyogID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgQ29weXJpZ2h0IMKpIFxuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG4gICAgXG4vKiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBNYWluLUNvbXBvbmVudCBTZWFyY2hcblxuICAgIFRoZSBlbnRpcmUgU2VhcmNoIGNvbXBvbmVudC4gQ29udGFpbnMgYW4gSW5wdXQgYmFyIGZvciBTZWFyY2gsIGFzIHdlbGwgYXMgdGhlXG4gICAgZW50aXJlIGxpc3Qgb2YgbWVkaWEgZW50cmllcy4gRWFjaCBtZWRpYSBlbnRyeSBjb250YWlucyB0aGUgdGh1bWJuYWlsLFxuICAgIHRpdGxlLCBhbmQgZHVyYXRpb24gY29tcG9uZW50c1xuXG4gICAgQENvbXBvbmVudHM6ICBTZWFyY2hQbGFjZUhvbGRlclxuICAgICAgICAgICAgICAgICAgU2VhcmNoXG5cbiAgICBARXhwb3J0czogICAgIFNlYXJjaFxuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuLy8gTWVkaWEgRW50cnkgY29tcG9uZW50XG52YXIgTWVkaWFFbnRyeSA9IHJlcXVpcmUoJy4vTWVkaWFFbnRyeS5qc3gnKTtcblxuLy8gRGVmYXVsdCBQbGFjZWhvbGRlciB3aGVuIHF1ZXJ5IGhhcyBubyBlbnRyeVxudmFyIFNlYXJjaFBsYWNlSG9sZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybihcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXBhZGRpbmdcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGFjZWhvbGRlciBwbGFjZWhvbGRlci1zZWFyY2hcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYWNlaG9sZGVyLWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLXNlYXJjaCBwbGFjZWhvbGRlci1pY29uXCI+PC9pPjxici8+XG4gICAgICAgICAgICA8c3Bhbj5UeXBlIHRvIHNlYXJjaDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxuLy8gUGxhY2Vob2xkZXIgZm9yIGFuIGVtcHR5IGxpc3Qgb2YgbWVkaWEgZW50cmllcyBpbiBzZWFyY2hcbnZhciBTZWFyY2hFbXB0eSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4oXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1wYWRkaW5nXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxhY2Vob2xkZXIgcGxhY2Vob2xkZXItc2VhcmNoXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGFjZWhvbGRlci1jb250ZW50XCI+XG4gICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1yZW1vdmUgcGxhY2Vob2xkZXItaWNvblwiPjwvaT48YnIvPlxuICAgICAgICAgICAgPHNwYW4+Tm8gbWF0Y2hpbmcgc2VhcmNoIHJlc3VsdHM8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbi8vIFNlYXJjaGluZyBMb2FkIEljb24gZm9yIHdoZW4gc2VhcmNoIHJlc3VsdHMgYXJlIGxvYWRpbmdcbnZhciBTZWFyY2hMb2FkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybihcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXBhZGRpbmdcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGFjZWhvbGRlciBwbGFjZWhvbGRlci1zZWFyY2hcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYWNlaG9sZGVyLWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWNpcmNsZS1vLW5vdGNoIGZhLXNwaW4gcGxhY2Vob2xkZXItaWNvblwiPjwvaT48YnIvPlxuICAgICAgICAgICAgPHNwYW4+U2VhcmNoaW5nPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG4vLyBTZWFyY2ggQ29tcG9uZW50XG52YXIgU2VhcmNoID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzZWFyY2hRdWVyeTogXCJcIixcbiAgICAgIGpzb25SZXNwb25zZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgfSxcblxuICBzZWFyY2hNZWRpYTogZnVuY3Rpb24oZSkge1xuICAgIC8vIENsZWFycyB0aGUgdGltZXIgdG8gcHJldmVudCBhbm90aGVyIHVubmVjZXNzYXJ5IHNlYXJjaE1lZGlhIGZyb20gZ2V0aW5nIGNhbGxlZFxuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gICAgdmFyIHF1ZXJ5ID0gdGhpcy5zdGF0ZS5zZWFyY2hRdWVyeTtcblxuICAgIC8vIGFmdGVyIHNlYXJjaE1lZGlhIGlzIHJ1biwgZGlzcGxheSBsb2FkaW5nIGljb24gZmlyc3QgdW50aWwganNvbiBpcyBsb2FkZWRcbiAgICB0aGlzLnNldFN0YXRlKHtqc29uUmVzcG9uc2U6ICdsb2FkaW5nJ30pO1xuXG4gICAgLy8gRG8gbm90IHNlYXJjaCBmb3IgYW4gZW1wdHkgcXVlcnlcbiAgICBpZiAocXVlcnkgPT09ICcnIHx8IHF1ZXJ5ID09PSB1bmRlZmluZWQgfHwgcXVlcnkgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBDYWxscyB0aGUgWW91dHViZSBBUEkgZm9yIFNlYXJjaGluZyBhIGxpc3Qgd2l0aCBhIGdpdmVuIHF1ZXJ5XG4gICAgLy8gVE9ETzogTWFrZSBBUElLZXkgc2VjcmV0XG4gICAgdmFyIGFwaUtleSA9ICdBSXphU3lEWThXZVlDUldxSEVka1NMYVBmbjJoclhwbHBwSXQwYVUnO1xuICAgIGdhcGkuY2xpZW50LnNldEFwaUtleShhcGlLZXkpO1xuICAgIGdhcGkuY2xpZW50LmxvYWQoJ3lvdXR1YmUnLCAndjMnLCBmdW5jdGlvbigpIHtcbiAgICAgIHZhciByZXF1ZXN0ID0gZ2FwaS5jbGllbnQueW91dHViZS5zZWFyY2gubGlzdCh7XG4gICAgICAgIHE6IHF1ZXJ5LFxuICAgICAgICBwYXJ0OiAnaWQsIHNuaXBwZXQnLFxuICAgICAgICB0eXBlOiAndmlkZW8nLFxuICAgICAgICBtYXhSZXN1bHRzOiBNQVhfU0VBUkNIX1JFU1VMVFNcbiAgICAgIH0pO1xuXG4gICAgICAvLyBUaGUgYmluZHMgYXJlIG5lZWRlZCAoU3RpbGwgbmVlZCBtb3JlIG9mIGFuIGV4cGxhbmF0aW9uIG9uIHRoaXMpXG4gICAgICByZXF1ZXN0LmV4ZWN1dGUoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgLy8gVGhpcyBjYWxsYmFjayByZXR1cm5zIHRoZSByZXNwb25zZSBmcm9tIHRoZSBBUEksIGdpdmluZyBhIGxpc3Qgb2YgYWxsIHRoZSB2aWRlb3MgZnJvbSB0aGUgc2VhcmNoUXVlcnlcbiAgICAgICAgLy8gU2V0cyB0aGUgc3RhdGUganNvblJlc3BvbnNlIHRvIHRoZSByZXR1cm5lZCByZXNwb25zZSBmcm9tIHRoZSBBUElcbiAgICAgICAgaWYgKHJlc3BvbnNlLml0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtqc29uUmVzcG9uc2U6IHJlc3BvbnNlfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUmVzZXQganNvblJlc3BvbnNlIHRvIHVuZGVmaW5lZCBpZiBubyBtYXRjaGluZyByZXN1bHRzIGZvciByZXNwZWN0aXZlIHBsYWNlaG9sZGVyXG4gICAgICAgIGVsc2UgaWYgKHJlc3BvbnNlLml0ZW1zLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7anNvblJlc3BvbnNlOiAnZW1wdHknfSk7XG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKSlcbiAgICB9LmJpbmQodGhpcykpO1xuICB9LFxuXG4gIGhhbmRsZVN1Ym1pdDogZnVuY3Rpb24oZSkge1xuICAgIC8vIFJlbW92ZXMgdGhlIGZvcm0ncyBkZWZhdWx0J3MgcHJvcGVydHkgb2YgdXJsIHJlZGlyZWN0aW9uXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKHRoaXMuc2VhcmNoTWVkaWEsIDApO1xuICB9LFxuXG4gIGhhbmRsZUNoYW5nZTogZnVuY3Rpb24oZSkge1xuICAgIC8vIFNldHMgdGhlIHN0YXRlIG9mIGpzb24gdG8gc2VhcmNoaW5nICh3aWxsIGJlIG92ZXJyaWRlbiB3aXRoIHNlYXJjaE1lZGlhIGluIDIwMG1zKVxuICAgIHRoaXMuc2V0U3RhdGUoe2pzb25SZXNwb25zZTogJ2xvYWRpbmcnfSk7XG5cbiAgICAvLyBTZXRzIHRoZSBzdGF0ZSBvZiB0aGUgU2VhcmNoIFF1ZXJ5XG4gICAgdGhpcy5zZXRTdGF0ZSh7c2VhcmNoUXVlcnk6IGUudGFyZ2V0LnZhbHVlfSwgZnVuY3Rpb24oKSB7XG4gICAgICAvLyBSZWNsZWFycyB0aGUgdGltZXIgdG8gcmVzdGFydCBhdCAwIGFnYWluIHVudGlsIDIwMCBtaWxsaXNlY29uZHMsIHRoZW4gc2VhcmNoTWVkaWEgZ2V0cyBjYWxsZWRcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gICAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwodGhpcy5zZWFyY2hNZWRpYSwgNTAwKTtcbiAgICB9KTtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIC8vIFByZXBhcmVzIGVhY2ggbWVkaWEgZW50cnkuIFdoZW5ldmVyIGEgU3RhdGUgY2hhbmdlcywgcG9wdWxhdGVzIHRoZSB2YWx1ZXMgaW4gZWFjaCBNZWRpYSBFbnRyeSBmcm9tIHRoZSBqc29uUmVzcG9uc2UgZ2l2ZW4gZnJvbSB0aGUgWW91dHViZUFQSVxuICAgIHZhciBzZWFyY2hFbnRyaWVzID0gW107XG4gICAgdmFyIGpzb24gPSB0aGlzLnN0YXRlLmpzb25SZXNwb25zZTtcbiAgICB2YXIgcXVlcnkgPSB0aGlzLnN0YXRlLnNlYXJjaFF1ZXJ5O1xuXG4gICAgLy8gcHVzaGVzIHBsYWNlaG9sZGVyIGRpdiBpbnRvIHNlYXJjaEVudHJpZXMgaWYgbGlzdCBpcyBlbXB0eVxuICAgIGlmIChxdWVyeSA9PT0gJycgfHwgcXVlcnkgPT09IHVuZGVmaW5lZCB8fCBxdWVyeSA9PT0gbnVsbCkge1xuICAgICAgc2VhcmNoRW50cmllcy5wdXNoKFxuICAgICAgICA8U2VhcmNoUGxhY2VIb2xkZXIga2V5PXsnU2VhcmNoUGxhY2VIb2xkZXInfSAvPlxuICAgICAgKVxuICAgIH1cblxuICAgIC8vIHdoZW5ldmVyIHRoZXJlIGlzIGEgY2hhbmdlIGluIHF1ZXJ5LCBwdXNoIGxvYWRpbmcgaWNvblxuICAgIGVsc2UgaWYgKGpzb24gPT0gJ2xvYWRpbmcnKSB7XG4gICAgICBzZWFyY2hFbnRyaWVzLnB1c2goXG4gICAgICAgIDxTZWFyY2hMb2FkIGtleT17J1NlYXJjaExvYWQnfSAvPlxuICAgICAgKVxuICAgIH1cblxuICAgIC8vIGlmIHNlYXJjaCByZXR1cm5zIG5vIHJlc3VsdHMsIHB1c2hlcyBlbXB0eSBzZWFyY2ggcGxhY2Vob2xkZXJcbiAgICBlbHNlIGlmIChqc29uID09ICdlbXB0eScpIHtcbiAgICAgIHNlYXJjaEVudHJpZXMucHVzaChcbiAgICAgICAgPFNlYXJjaEVtcHR5IGtleT17J1NlYXJjaEVtcHR5J30gLz5cbiAgICAgIClcbiAgICB9XG5cbiAgICAvLyBpZiBnZW5lcmF0ZWQgbGlzdCBoYXMgZWxlbWVudHMsIGRpc3BsYXkgdGhlbVxuICAgIGVsc2UgaWYgKGpzb24gIT09IFwiXCIgJiYganNvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YXIganNvbkl0ZW07XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwganNvbi5pdGVtcy5sZW5ndGg7ICsraSkge1xuICAgICAgICBqc29uSXRlbSA9IGpzb24uaXRlbXNbaV07XG4gICAgICAgIHNlYXJjaEVudHJpZXMucHVzaChcbiAgICAgICAgICA8TWVkaWFFbnRyeSBcbiAgICAgICAgICAgIGtleT17anNvbkl0ZW0uaWQudmlkZW9JZH0gXG4gICAgICAgICAgICBwb3M9e2l9IFxuICAgICAgICAgICAgbWVkaWFJZD17anNvbkl0ZW0uaWQudmlkZW9JZH0gXG4gICAgICAgICAgICBjYXRlZ29yeVR5cGU9eydTRUFSQ0gnfVxuICAgICAgICAgICAgbWVkaWFUeXBlPXsnWU9VVFVCRSd9XG4gICAgICAgICAgICB0aHVtYm5haWw9e2pzb25JdGVtLnNuaXBwZXQudGh1bWJuYWlscy5tZWRpdW0udXJsfSBcbiAgICAgICAgICAgIHRpdGxlPXtqc29uSXRlbS5zbmlwcGV0LnRpdGxlfVxuICAgICAgICAgICAgYXJ0aXN0PXtqc29uSXRlbS5zbmlwcGV0LmNoYW5uZWxUaXRsZX0gXG4gICAgICAgICAgICBpZk1lZGlhQ2FyZEFkZGVkPXtmYWxzZX0gXG4gICAgICAgICAgICB1c2VyPXt0aGlzLnByb3BzLnVzZXJ9XG4gICAgICAgICAgICBteVBsYXlsaXN0cz17dGhpcy5wcm9wcy5teVBsYXlsaXN0c30gLz4gXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxmb3JtIGlkPSdzZWFyY2gtZm9ybScgY2xhc3NOYW1lPVwic2VhcmNoLWlucHV0IHNlYXJjaC1pbnB1dC1kcm9wZG93blwiIG9uU3VibWl0PXt0aGlzLmhhbmRsZVN1Ym1pdH0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWdyb3VwXCI+XG4gICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJjaGF0LXRleHRib3hcIiBpZD0nc2VhcmNoLW1lZGlhLWlucHV0JyBuYW1lPVwiXCIgcGxhY2Vob2xkZXI9XCJTZWFyY2ggWW91dHViZS4uLlwiIHR5cGU9XCJ0ZXh0XCIgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfSAvPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWdyb3VwLWJ0blwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdCBkcm9wZG93bi10b2dnbGVcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCIgYXJpYS1oYXNwb3B1cD1cInRydWVcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj5cbiAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLXlvdXR1YmUtcGxheSBkcm9wZG93bi1pY29uXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgWW91dHViZVxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtYW5nbGUtZG93biBkcm9wZG93bi1hcnJvd1wiPjwvaT5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiZHJvcGRvd24tbWVudSBkcm9wZG93bi1tZW51LXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiPjxpIGNsYXNzTmFtZT1cImZhIGZhLXlvdXR1YmUtcGxheVwiPjwvaT5Zb3V0dWJlPC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiPjxpIGNsYXNzTmFtZT1cImZhIGZhLXZpbWVvXCI+PC9pPlZpbWVvPC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiPjxpIGNsYXNzTmFtZT1cImZhIGZhLXNvdW5kY2xvdWRcIj48L2k+U291bmRDbG91ZDwvYT48L2xpPlxuICAgICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIj48aSBjbGFzc05hbWU9XCJmYSBmYS1zcG90aWZ5XCI+PC9pPlNwb3RpZnk8L2E+PC9saT5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3NlYXJjaC1tZWRpYS1jb250YWluZXInPlxuICAgICAgICAgIHtzZWFyY2hFbnRyaWVzfVxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8bmF2IGFyaWEtbGFiZWw9XCJwYWdlIG5hdmlnYXRpb25cIj5cbiAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwicGFnaW5hdGlvblwiPlxuICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImRpc2FibGVkXCI+PGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIGFyaWEtbGFiZWw9XCJQcmV2aW91c1wiPjxpIGNsYXNzTmFtZT1cImZhIGZhLWFuZ2xlLWxlZnRcIj48L2k+PC9hPjwvbGk+XG4gICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiYWN0aXZlXCI+PGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiPjE8L2E+PC9saT5cbiAgICAgICAgICAgIDxsaT48YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+MjwvYT48L2xpPlxuICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIj4zPC9hPjwvbGk+XG4gICAgICAgICAgICA8bGk+PGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIGFyaWEtbGFiZWw9XCJOZXh0XCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtYW5nbGUtcmlnaHRcIj48L2k+PC9hPjwvbGk+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9uYXY+XG5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNlYXJjaDsiLCIvKiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBDb3B5cmlnaHQgwqkgXG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyogID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgU3RhdHVzQmFyLmpzeFxuXG4gICAgQ29tcG9uZW50IG9mIHRoZSBzdGF0dXMgYmFyLlxuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgUGxheVBhdXNlQnV0dG9uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybihcbiAgICAgIDxkaXYgaWQ9J3BsYXktcGF1c2UtYnV0dG9uJz5cbiAgICAgICAgPGJ1dHRvbj5QbGF5PC9idXR0b24+XG4gICAgICAgIDxidXR0b24+UGF1c2U8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG52YXIgRWxhcHNlZFRpbWVCYXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGVsYXBzZWRUaW1lOiAwXG4gICAgfTtcbiAgfSxcblxuICBvbkVsYXBzZWRUaW1lQmFyQ2hhbmdlOiBmdW5jdGlvbigpIHtcbiAgICAvLyBUT0RPOiBDaGFuZ2UgdG8gYWxsIG1lZGlhIHR5cGVzXG4gICAgdGhpcy5zZXRTdGF0ZSh7ZWxhcHNlZFRpbWU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZWRpYS1lbGFwc2VkLXRpbWUtc2xpZGVyJykudmFsdWV9LCBmdW5jdGlvbigpIHtcbiAgICAgIG9uRWxhcHNlZFRpbWVCYXJDaGFuZ2UodGhpcy5zdGF0ZS5lbGFwc2VkVGltZSk7ICBcbiAgICB9KTtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybihcbiAgICAgIDxkaXY+XG4gICAgICAgIEVsYXBzZWRcbiAgICAgICAgPGlucHV0IGlkPSdtZWRpYS1lbGFwc2VkLXRpbWUtc2xpZGVyJyB0eXBlPSdyYW5nZScgbWluPScwJyBtYXg9JzEwMCcgdmFsdWU9e3RoaXMuc3RhdGUuZWxhcHNlZFRpbWV9IHN0ZXA9JzEnIG9uQ2hhbmdlPXt0aGlzLm9uRWxhcHNlZFRpbWVCYXJDaGFuZ2V9Lz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG52YXIgVm9sdW1lU2xpZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICB2b2x1bWU6IDEwMFxuICAgIH07XG4gIH0sXG5cbiAgb25Wb2x1bWVCYXJDaGFuZ2U6IGZ1bmN0aW9uKCkge1xuICAgIC8vIFRPRE86IENoYW5nZSB0byBhbGwgbWVkaWEgdHlwZXNcbiAgICB0aGlzLnNldFN0YXRlKHt2b2x1bWU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZWRpYS12b2x1bWUtc2xpZGVyJykudmFsdWV9LCBmdW5jdGlvbigpIHtcbiAgICAgIHlvdXR1YmVWb2x1bWVDaGFuZ2UodGhpcy5zdGF0ZS52b2x1bWUpO1xuICAgIH0pO1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybihcbiAgICAgIDxkaXY+XG4gICAgICAgIFZvbHVtZVxuICAgICAgICA8aW5wdXQgaWQ9J21lZGlhLXZvbHVtZS1zbGlkZXInIHR5cGU9J3JhbmdlJyBtaW49JzAnIG1heD0nMTAwJyB2YWx1ZT17dGhpcy5zdGF0ZS52b2x1bWV9IHN0ZXA9JzEnIG9uQ2hhbmdlPXt0aGlzLm9uVm9sdW1lQmFyQ2hhbmdlfS8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxudmFyIFN0YXR1c0JhciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBpZD0nc3RhdHVzLWJhcic+XG4gICAgICAgIFN0YXR1c0JhclxuICAgICAgICA8UGxheVBhdXNlQnV0dG9uIC8+XG4gICAgICAgIDxFbGFwc2VkVGltZUJhciAvPlxuICAgICAgICA8Vm9sdW1lU2xpZGVyIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBTdGF0dXNCYXI7IiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIFZpZXdPcGVuZWRQbGF5bGlzdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4oXG4gICAgICA8ZGl2IGlkPVwib3Blbi1wbGF5bGlzdFwiIGNsYXNzTmFtZT1cInRhYi1wYW5lIGZhZGVcIj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9wZW4tcGxheWxpc3QtY29udGFpbmVyXCI+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYi1wYWdlLWhlYWRlclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWItcGFnZS10ZXh0LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJpY29uLWJ0blwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIj48ZGl2IGNsYXNzTmFtZT1cInRhYi1wYWdlLWJhY2stYnRuXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtbGcgZmEtY2hldnJvbi1jaXJjbGUtbGVmdFwiPjwvaT48L2Rpdj48L2E+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFiLXBhZ2UtdGl0bGVcIj57dGhpcy5wcm9wcy5uYW1lfTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYi1wYWdlLWN1cmF0b3JcIj5cbiAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJjdXJhdG9yLWxpbmtcIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+e3RoaXMucHJvcHMub3duZXJ9PC9hPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWItcGFnZS1yaWdodC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWItcGFnZS1pY29uLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGlsbFwiPnt0aGlzLnByb3BzLnNpemV9IEl0ZW1zPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaC1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cInNlYXJjaC1pbnB1dFwiPlxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiXCIgcGxhY2Vob2xkZXI9XCJTZWFyY2ggaW4gUGxheWxpc3QuLi5cIi8+XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBWaWV3T3BlbmVkUGxheWxpc3Q7Il19
