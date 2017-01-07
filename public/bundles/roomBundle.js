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

/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    VIEW: Chatbox.jsx

    The chatbox within each room.
    ========================================================================== */

/*  =============================================================================
    @Components:    UserListEntry
                    UserList
                    ChatHeader
                    ChatMessage
                    ChatUserActivityMessage
                    ChatDisplay
                    ChatInput
                    GuestUserForm

    @Exports:       Chatbox
    ========================================================================== */
var React = require('react');

var getCurrentTimeStamp = function getCurrentTimeStamp() {
  var currentTime = new Date();
  var currentTimeHour = currentTime.getHours();
  var currentTimeMinute = currentTime.getMinutes();
  var eitherAmOrPm = "am";

  if (currentTimeHour == 0) {
    currentTimeHour = 12;
  } else if (currentTimeHour >= 12) {
    eitherAmOrPm = "pm";
    if (currentTimeHour > 12) {
      currentTimeHour -= 12;
    }
  }
  return currentTimeHour + ":" + currentTimeMinute + eitherAmOrPm;
};

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
                }, "data-toggle": "tooltip", "data-placement": "right", title: _this.props.timeStamp },
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
    var currentTime = new Date();
    var currentTimeHour = currentTime.getHours();
    var currentTimeMinute = currentTime.getMinutes();
    var eitherAmOrPm = "am";

    if (currentTimeHour == 0) {
      currentTimeHour = 12;
    } else if (currentTimeHour >= 12) {
      eitherAmOrPm = "pm";
      if (currentTimeHour > 12) {
        currentTimeHour -= 12;
      }
    }
    currentTime = currentTimeHour + ":" + currentTimeMinute + eitherAmOrPm;

    messages.push(React.createElement(ChatMessage, { key: this.state.messages.length, username: msg.username, owner: isOwner, message: msg.message, timeStamp: currentTime }));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJmbHV4L2FjdGlvbnMvYWN0aW9ucy5qcyIsImZsdXgvY29uc3RhbnRzLmpzIiwiZmx1eC9kaXNwYXRjaGVyL0FwcERpc3BhdGNoZXIuanMiLCJmbHV4L3N0b3Jlcy9zdG9yZS5qcyIsIm5vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwibm9kZV9tb2R1bGVzL2ZianMvbGliL2VtcHR5RnVuY3Rpb24uanMiLCJub2RlX21vZHVsZXMvZmJqcy9saWIvZW1wdHlPYmplY3QuanMiLCJub2RlX21vZHVsZXMvZmJqcy9saWIvaW52YXJpYW50LmpzIiwibm9kZV9tb2R1bGVzL2ZianMvbGliL2tleU1pcnJvci5qcyIsIm5vZGVfbW9kdWxlcy9mYmpzL2xpYi9rZXlPZi5qcyIsIm5vZGVfbW9kdWxlcy9mYmpzL2xpYi93YXJuaW5nLmpzIiwibm9kZV9tb2R1bGVzL2ZsdXgvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZmx1eC9saWIvRGlzcGF0Y2hlci5qcyIsIm5vZGVfbW9kdWxlcy9mbHV4L25vZGVfbW9kdWxlcy9mYmpzL2xpYi9pbnZhcmlhbnQuanMiLCJub2RlX21vZHVsZXMvb2JqZWN0LWFzc2lnbi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL0tleUVzY2FwZVV0aWxzLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9Qb29sZWRDbGFzcy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvUmVhY3QuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1JlYWN0Q2hpbGRyZW4uanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1JlYWN0Q2xhc3MuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1JlYWN0Q29tcG9uZW50LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9SZWFjdENvbXBvbmVudFRyZWVIb29rLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9SZWFjdEN1cnJlbnRPd25lci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvUmVhY3RET01GYWN0b3JpZXMuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1JlYWN0RWxlbWVudC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvUmVhY3RFbGVtZW50VmFsaWRhdG9yLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9SZWFjdE5vb3BVcGRhdGVRdWV1ZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1JlYWN0UHJvcFR5cGVMb2NhdGlvbnMuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1JlYWN0UHJvcFR5cGVzLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvUmVhY3RQdXJlQ29tcG9uZW50LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9SZWFjdFZlcnNpb24uanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL2NhbkRlZmluZVByb3BlcnR5LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9jaGVja1JlYWN0VHlwZVNwZWMuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL2dldEl0ZXJhdG9yRm4uanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL29ubHlDaGlsZC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvcmVhY3RQcm9kSW52YXJpYW50LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi90cmF2ZXJzZUFsbENoaWxkcmVuLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L3JlYWN0LmpzIiwicHVibGljL2Jyb3dzZXJpZnkvcm9vbS5qcyIsInZpZXdzL0NoYXRib3guanN4Iiwidmlld3MvRWRpdE9wZW5lZFBsYXlsaXN0LmpzeCIsInZpZXdzL0V4cGxvcmUuanN4Iiwidmlld3MvRm9vdGVyLmpzeCIsInZpZXdzL0hlYWRlci5qc3giLCJ2aWV3cy9NZWRpYUVudHJ5LmpzeCIsInZpZXdzL01lZGlhUGxheWVyLmpzeCIsInZpZXdzL01vZGFsQ3JlYXRlUGxheWxpc3QuanN4Iiwidmlld3MvTXlQbGF5bGlzdHMuanN4Iiwidmlld3MvUGxheWxpc3RFbnRyeS5qc3giLCJ2aWV3cy9QbGF5bGlzdFRhYi5qc3giLCJ2aWV3cy9RdWV1ZS5qc3giLCJ2aWV3cy9Sb29tLmpzeCIsInZpZXdzL1NlYXJjaC5qc3giLCJ2aWV3cy9TdGF0dXNCYXIuanN4Iiwidmlld3MvVmlld09wZW5lZFBsYXlsaXN0LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBSSxnQkFBZ0IsUUFBUSw2QkFBUixDQUFwQjtBQUNBLElBQUksWUFBWSxRQUFRLGNBQVIsQ0FBaEI7O0FBRUEsSUFBSSxzQkFBc0I7QUFDeEIsbUJBQWlCLHlCQUFTLEdBQVQsRUFBYyxLQUFkLEVBQXFCLFlBQXJCLEVBQW1DO0FBQ2xELGtCQUFjLFlBQWQsQ0FBMkI7QUFDekIsa0JBQVksVUFBVSxZQURHO0FBRXpCLFdBQUssR0FGb0I7QUFHekIsYUFBTyxLQUhrQjtBQUl6QixlQUFTO0FBSmdCLEtBQTNCO0FBTUQsR0FSdUI7O0FBVXhCLGtCQUFnQix3QkFBUyxRQUFULEVBQW1CO0FBQ2pDLGtCQUFjLFlBQWQsQ0FBMkI7QUFDekIsa0JBQVksVUFBVSxjQURHO0FBRXpCLHVCQUFpQjtBQUZRLEtBQTNCO0FBSUQsR0FmdUI7O0FBaUJ4QixrQkFBZ0Isd0JBQVMsUUFBVCxFQUFtQjtBQUNqQyxrQkFBYyxZQUFkLENBQTJCO0FBQ3pCLGtCQUFZLFVBQVUsY0FERztBQUV6Qix1QkFBaUI7QUFGUSxLQUEzQjtBQUlELEdBdEJ1Qjs7QUF3QnhCLGtCQUFnQix3QkFBUyxRQUFULEVBQW1CO0FBQ2pDLGtCQUFjLFlBQWQsQ0FBMkI7QUFDekIsa0JBQVksVUFBVSxjQURH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LEdBQWlCLFFBQWpCOzs7QUMvR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUN0T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ3hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDeEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzlMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDM3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNySEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDclZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUN6S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQzNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDbk9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUMvRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzlhQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUZGO0FBaUJFO0FBQUE7QUFBQSxZQUFLLFdBQVUsa0JBQWY7QUFDRTtBQUFBO0FBQUEsY0FBTSxXQUFVLGNBQWhCO0FBQ0UsMkNBQU8sTUFBSyxNQUFaLEVBQW1CLE1BQUssRUFBeEIsRUFBMkIsYUFBWSx1QkFBdkM7QUFERjtBQURGO0FBakJGO0FBRkYsS0FERjtBQTZCRDtBQS9Cd0MsQ0FBbEIsQ0FBekI7O0FBa0NBLE9BQU8sT0FBUCxHQUFpQixrQkFBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIEFwcERpc3BhdGNoZXIgPSByZXF1aXJlKCcuLi9kaXNwYXRjaGVyL0FwcERpc3BhdGNoZXInKTtcbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuLi9jb25zdGFudHMnKTtcblxudmFyIEVkaXRQbGF5bGlzdEFjdGlvbnMgPSB7XG4gIGRpc3BsYXlQbGF5bGlzdDogZnVuY3Rpb24oX2lkLCBpbmRleCwgbWVkaWFFbnRyaWVzKSB7XG4gICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVBY3Rpb24oe1xuICAgICAgYWN0aW9uVHlwZTogY29uc3RhbnRzLkVESVRQTEFZTElTVCxcbiAgICAgIF9pZDogX2lkLFxuICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgZW50cmllczogbWVkaWFFbnRyaWVzXG4gICAgfSk7XG4gIH0sXG5cbiAgZGVsZXRlUGxheWxpc3Q6IGZ1bmN0aW9uKHBsYXlsaXN0KSB7XG4gICAgQXBwRGlzcGF0Y2hlci5oYW5kbGVBY3Rpb24oe1xuICAgICAgYWN0aW9uVHlwZTogY29uc3RhbnRzLkRFTEVURVBMQVlMSVNULFxuICAgICAgcGxheWxpc3REZWxldGVkOiBwbGF5bGlzdFxuICAgIH0pO1xuICB9LFxuXG4gIHVwZGF0ZVBsYXlsaXN0OiBmdW5jdGlvbihwbGF5bGlzdCkge1xuICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlQWN0aW9uKHtcbiAgICAgIGFjdGlvblR5cGU6IGNvbnN0YW50cy5VUERBVEVQTEFZTElTVCxcbiAgICAgIHVwZGF0ZWRQbGF5bGlzdDogcGxheWxpc3RcbiAgICB9KTtcbiAgfSxcblxuICBjcmVhdGVQbGF5bGlzdDogZnVuY3Rpb24ocGxheWxpc3QpIHtcbiAgICBBcHBEaXNwYXRjaGVyLmhhbmRsZUFjdGlvbih7XG4gICAgICBhY3Rpb25UeXBlOiBjb25zdGFudHMuQ1JFQVRFUExBWUxJU1QsXG4gICAgICBjcmVhdGVkTmV3UGxheWxpc3Q6IHBsYXlsaXN0XG4gICAgfSk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRWRpdFBsYXlsaXN0QWN0aW9uczsiLCJ2YXIgY29uc3RhbnRzID0ge1xuICBFRElUUExBWUxJU1Q6IFwiRURJVFBMQVlMSVNUXCIsXG4gIERFTEVURVBMQVlMSVNUOiBcIkRFTEVURVBMQVlMSVNUXCIsXG4gIFVQREFURVBMQVlMSVNUOiBcIlVQREFURVBMQVlMSVNUXCIsXG4gIENSRUFURVBMQVlMSVNUOiBcIkNSRUFURVBMQVlMSVNUXCJcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb25zdGFudHM7IiwidmFyIERpc3BhdGNoZXIgPSByZXF1aXJlKCdmbHV4JykuRGlzcGF0Y2hlcjtcbnZhciBBcHBEaXNwYXRjaGVyID0gbmV3IERpc3BhdGNoZXIoKTtcblxuQXBwRGlzcGF0Y2hlci5oYW5kbGVBY3Rpb24gPSBmdW5jdGlvbihhY3Rpb24pIHtcbiAgdGhpcy5kaXNwYXRjaCh7XG4gICAgc291cmNlOiAnVklFV19BQ1RJT04nLFxuICAgIGFjdGlvbjogYWN0aW9uXG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBBcHBEaXNwYXRjaGVyOyIsInZhciBBcHBEaXNwYXRjaGVyID0gcmVxdWlyZSgnLi4vZGlzcGF0Y2hlci9BcHBEaXNwYXRjaGVyJyk7XG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vY29uc3RhbnRzJyk7XG52YXIgb2JqZWN0QXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xudmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlcjtcblxudmFyIENIQU5HRV9FVkVOVCA9ICdjaGFuZ2UnO1xudmFyIEVWRU5UX0RFTEVURV9QTEFZTElTVCA9ICdFVkVOVF9ERUxFVEVfUExBWUxJU1QnO1xudmFyIEVWRU5UX1VQREFURV9QTEFZTElTVCA9ICdFVkVOVF9VUERBVEVfUExBWUxJU1QnO1xudmFyIEVWRU5UX0NSRUFURV9QTEFZTElTVCA9ICdFVkVOVF9DUkVBVEVfUExBWUxJU1QnO1xuXG5cbnZhciBzdG9yZSA9IHtcbiAgX2lkOiBudWxsLFxuXHRpbmRleDogbnVsbCxcbiAgZW50cmllczogbnVsbCxcbiAgcGxheWxpc3REZWxldGVkOiBudWxsLFxuICB1cGRhdGVkUGxheWxpc3Q6IG51bGwsXG4gIGNyZWF0ZWROZXdQbGF5bGlzdDogbnVsbFxufTtcblxudmFyIGRpc3BsYXlJbmRleCA9IGZ1bmN0aW9uKF9pZCwgbmV3UG9zLCBtZWRpYUVudHJpZXMpIHtcbiAgc3RvcmUuX2lkID0gX2lkO1xuICBzdG9yZS5pbmRleCA9IG5ld1BvcztcbiAgc3RvcmUuZW50cmllcyA9IG1lZGlhRW50cmllcztcbn07XG5cbnZhciBkZWxldGVQbGF5bGlzdCA9IGZ1bmN0aW9uKHBsYXlsaXN0KSB7XG4gIHN0b3JlLnBsYXlsaXN0RGVsZXRlZCA9IHBsYXlsaXN0O1xufTtcblxudmFyIHVwZGF0ZVBsYXlsaXN0ID0gZnVuY3Rpb24ocGxheWxpc3QpIHtcbiAgc3RvcmUudXBkYXRlZFBsYXlsaXN0ID0gcGxheWxpc3Q7XG59O1xuXG52YXIgY3JlYXRlUGxheWxpc3QgPSBmdW5jdGlvbihwbGF5bGlzdCkge1xuICBzdG9yZS5jcmVhdGVkTmV3UGxheWxpc3QgPSBwbGF5bGlzdDtcbn1cblxudmFyIEFwcFN0b3JlID0gb2JqZWN0QXNzaWduKHt9LCBFdmVudEVtaXR0ZXIucHJvdG90eXBlLCB7IFxuICBhZGRDaGFuZ2VMaXN0ZW5lcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICB0aGlzLm9uKENIQU5HRV9FVkVOVCwgY2FsbGJhY2spO1xuICB9LFxuICBhZGREZWxldGVQbGF5bGlzdExpc3RlbmVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgIHRoaXMub24oRVZFTlRfREVMRVRFX1BMQVlMSVNULCBjYWxsYmFjayk7XG4gIH0sXG4gIGFkZFVwZGF0ZVBsYXlsaXN0TGlzdGVuZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5vbihFVkVOVF9VUERBVEVfUExBWUxJU1QsIGNhbGxiYWNrKTtcbiAgfSxcbiAgYWRkQ3JlYXRlUGxheWxpc3RMaXN0ZW5lcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICB0aGlzLm9uKEVWRU5UX0NSRUFURV9QTEFZTElTVCwgY2FsbGJhY2spO1xuICB9LFxuXG4gIHJlbW92ZUNoYW5nZUxpc3RlbmVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoQ0hBTkdFX0VWRU5ULCBjYWxsYmFjayk7XG4gIH0sXG4gIHJlbW92ZURlbGV0ZVBsYXlsaXN0TGlzdGVuZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcihFVkVOVF9ERUxFVEVfUExBWUxJU1QsIGNhbGxiYWNrKTtcbiAgfSxcbiAgcmVtb3ZlVXBkYXRlUGxheWxpc3RMaXN0ZW5lcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKEVWRU5UX1VQREFURV9QTEFZTElTVCwgY2FsbGJhY2spO1xuICB9LFxuICByZW1vdmVDcmVhdGVQbGF5bGlzdExpc3RlbmVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoRVZFTlRfQ1JFQVRFX1BMQVlMSVNULCBjYWxsYmFjayk7XG4gIH0sXG5cbiAgZ2V0SWQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBzdG9yZS5faWQ7XG4gIH0sXG4gIGdldEluZGV4OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gc3RvcmUuaW5kZXg7XG4gIH0sXG4gIGdldEVudHJpZXM6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBzdG9yZS5lbnRyaWVzO1xuICB9LFxuICBnZXRQbGF5bGlzdERlbGV0ZWQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBzdG9yZS5wbGF5bGlzdERlbGV0ZWQ7XG4gIH0sXG4gIGdldFVwZGF0ZWRQbGF5bGlzdDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHN0b3JlLnVwZGF0ZWRQbGF5bGlzdDtcbiAgfSxcbiAgZ2V0Q3JlYXRlZFBsYXlsaXN0OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gc3RvcmUuY3JlYXRlZE5ld1BsYXlsaXN0O1xuICB9XG59KTtcblxuQXBwRGlzcGF0Y2hlci5yZWdpc3RlcihmdW5jdGlvbihwYXlsb2FkKSB7XG4gIHZhciBhY3Rpb24gPSBwYXlsb2FkLmFjdGlvbjtcbiAgc3dpdGNoKGFjdGlvbi5hY3Rpb25UeXBlKSB7XG4gICAgY2FzZSBjb25zdGFudHMuRURJVFBMQVlMSVNUOlxuICAgICAgZGlzcGxheUluZGV4KGFjdGlvbi5faWQsIGFjdGlvbi5pbmRleCwgYWN0aW9uLmVudHJpZXMpO1xuICAgICAgQXBwU3RvcmUuZW1pdChDSEFOR0VfRVZFTlQpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBjb25zdGFudHMuREVMRVRFUExBWUxJU1Q6XG4gICAgICBkZWxldGVQbGF5bGlzdChhY3Rpb24ucGxheWxpc3REZWxldGVkKTtcbiAgICAgIEFwcFN0b3JlLmVtaXQoRVZFTlRfREVMRVRFX1BMQVlMSVNUKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgY29uc3RhbnRzLlVQREFURVBMQVlMSVNUOlxuICAgICAgdXBkYXRlUGxheWxpc3QoYWN0aW9uLnVwZGF0ZWRQbGF5bGlzdCk7XG4gICAgICBBcHBTdG9yZS5lbWl0KEVWRU5UX1VQREFURV9QTEFZTElTVCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIGNvbnN0YW50cy5DUkVBVEVQTEFZTElTVDpcbiAgICAgIGNyZWF0ZVBsYXlsaXN0KGFjdGlvbi5jcmVhdGVkTmV3UGxheWxpc3QpO1xuICAgICAgQXBwU3RvcmUuZW1pdChFVkVOVF9DUkVBVEVfUExBWUxJU1QpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGNvbnNvbGUubG9nKFwiRmx1eC9zdG9yZS5qczogTk9UIFNVUFBPU0UgVE8gQkUgSEVSRVwiKTtcbiAgICAgIGNvbnNvbGUubG9nKGFjdGlvbik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQXBwU3RvcmU7IiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG5FdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbihuKSB7XG4gIGlmICghaXNOdW1iZXIobikgfHwgbiA8IDAgfHwgaXNOYU4obikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCduIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXInKTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBlciwgaGFuZGxlciwgbGVuLCBhcmdzLCBpLCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAodHlwZSA9PT0gJ2Vycm9yJykge1xuICAgIGlmICghdGhpcy5fZXZlbnRzLmVycm9yIHx8XG4gICAgICAgIChpc09iamVjdCh0aGlzLl9ldmVudHMuZXJyb3IpICYmICF0aGlzLl9ldmVudHMuZXJyb3IubGVuZ3RoKSkge1xuICAgICAgZXIgPSBhcmd1bWVudHNbMV07XG4gICAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5jYXVnaHQsIHVuc3BlY2lmaWVkIFwiZXJyb3JcIiBldmVudC4gKCcgKyBlciArICcpJyk7XG4gICAgICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYW5kbGVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc1VuZGVmaW5lZChoYW5kbGVyKSlcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKGlzRnVuY3Rpb24oaGFuZGxlcikpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIC8vIGZhc3QgY2FzZXNcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIHNsb3dlclxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIGhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGhhbmRsZXIpKSB7XG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgbGlzdGVuZXJzID0gaGFuZGxlci5zbGljZSgpO1xuICAgIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIG07XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgaWYgKHRoaXMuX2V2ZW50cy5uZXdMaXN0ZW5lcilcbiAgICB0aGlzLmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgaXNGdW5jdGlvbihsaXN0ZW5lci5saXN0ZW5lcikgP1xuICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgZWxzZSBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICBlbHNlXG4gICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gW3RoaXMuX2V2ZW50c1t0eXBlXSwgbGlzdGVuZXJdO1xuXG4gIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pICYmICF0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkKSB7XG4gICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLl9tYXhMaXN0ZW5lcnMpKSB7XG4gICAgICBtID0gdGhpcy5fbWF4TGlzdGVuZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgaWYgKG0gJiYgbSA+IDAgJiYgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCA+IG0pIHtcbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQgPSB0cnVlO1xuICAgICAgY29uc29sZS5lcnJvcignKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgJyArXG4gICAgICAgICAgICAgICAgICAgICdsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuJyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUudHJhY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gbm90IHN1cHBvcnRlZCBpbiBJRSAxMFxuICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIHZhciBmaXJlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGcoKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBnKTtcblxuICAgIGlmICghZmlyZWQpIHtcbiAgICAgIGZpcmVkID0gdHJ1ZTtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgZy5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICB0aGlzLm9uKHR5cGUsIGcpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWRcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbGlzdCwgcG9zaXRpb24sIGxlbmd0aCwgaTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXR1cm4gdGhpcztcblxuICBsaXN0ID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuICBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgcG9zaXRpb24gPSAtMTtcblxuICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHxcbiAgICAgIChpc0Z1bmN0aW9uKGxpc3QubGlzdGVuZXIpICYmIGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG5cbiAgfSBlbHNlIGlmIChpc09iamVjdChsaXN0KSkge1xuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tID4gMDspIHtcbiAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fFxuICAgICAgICAgIChsaXN0W2ldLmxpc3RlbmVyICYmIGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5zcGxpY2UocG9zaXRpb24sIDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGtleSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgaWYgKCF0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIGVsc2UgaWYgKHRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICBmb3IgKGtleSBpbiB0aGlzLl9ldmVudHMpIHtcbiAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICB9XG4gICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzRnVuY3Rpb24obGlzdGVuZXJzKSkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgfSBlbHNlIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAvLyBMSUZPIG9yZGVyXG4gICAgd2hpbGUgKGxpc3RlbmVycy5sZW5ndGgpXG4gICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tsaXN0ZW5lcnMubGVuZ3RoIC0gMV0pO1xuICB9XG4gIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIHJldDtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXQgPSBbXTtcbiAgZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIHJldCA9IFt0aGlzLl9ldmVudHNbdHlwZV1dO1xuICBlbHNlXG4gICAgcmV0ID0gdGhpcy5fZXZlbnRzW3R5cGVdLnNsaWNlKCk7XG4gIHJldHVybiByZXQ7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIGlmICh0aGlzLl9ldmVudHMpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICAgIGlmIChpc0Z1bmN0aW9uKGV2bGlzdGVuZXIpKVxuICAgICAgcmV0dXJuIDE7XG4gICAgZWxzZSBpZiAoZXZsaXN0ZW5lcilcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgfVxuICByZXR1cm4gMDtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xufTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ251bWJlcic7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBcbiAqL1xuXG5mdW5jdGlvbiBtYWtlRW1wdHlGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gYXJnO1xuICB9O1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gYWNjZXB0cyBhbmQgZGlzY2FyZHMgaW5wdXRzOyBpdCBoYXMgbm8gc2lkZSBlZmZlY3RzLiBUaGlzIGlzXG4gKiBwcmltYXJpbHkgdXNlZnVsIGlkaW9tYXRpY2FsbHkgZm9yIG92ZXJyaWRhYmxlIGZ1bmN0aW9uIGVuZHBvaW50cyB3aGljaFxuICogYWx3YXlzIG5lZWQgdG8gYmUgY2FsbGFibGUsIHNpbmNlIEpTIGxhY2tzIGEgbnVsbC1jYWxsIGlkaW9tIGFsYSBDb2NvYS5cbiAqL1xudmFyIGVtcHR5RnVuY3Rpb24gPSBmdW5jdGlvbiBlbXB0eUZ1bmN0aW9uKCkge307XG5cbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnMgPSBtYWtlRW1wdHlGdW5jdGlvbjtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNGYWxzZSA9IG1ha2VFbXB0eUZ1bmN0aW9uKGZhbHNlKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNUcnVlID0gbWFrZUVtcHR5RnVuY3Rpb24odHJ1ZSk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbCA9IG1ha2VFbXB0eUZ1bmN0aW9uKG51bGwpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc1RoaXMgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzO1xufTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNBcmd1bWVudCA9IGZ1bmN0aW9uIChhcmcpIHtcbiAgcmV0dXJuIGFyZztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZW1wdHlGdW5jdGlvbjsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGVtcHR5T2JqZWN0ID0ge307XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIE9iamVjdC5mcmVlemUoZW1wdHlPYmplY3QpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVtcHR5T2JqZWN0OyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVzZSBpbnZhcmlhbnQoKSB0byBhc3NlcnQgc3RhdGUgd2hpY2ggeW91ciBwcm9ncmFtIGFzc3VtZXMgdG8gYmUgdHJ1ZS5cbiAqXG4gKiBQcm92aWRlIHNwcmludGYtc3R5bGUgZm9ybWF0IChvbmx5ICVzIGlzIHN1cHBvcnRlZCkgYW5kIGFyZ3VtZW50c1xuICogdG8gcHJvdmlkZSBpbmZvcm1hdGlvbiBhYm91dCB3aGF0IGJyb2tlIGFuZCB3aGF0IHlvdSB3ZXJlXG4gKiBleHBlY3RpbmcuXG4gKlxuICogVGhlIGludmFyaWFudCBtZXNzYWdlIHdpbGwgYmUgc3RyaXBwZWQgaW4gcHJvZHVjdGlvbiwgYnV0IHRoZSBpbnZhcmlhbnRcbiAqIHdpbGwgcmVtYWluIHRvIGVuc3VyZSBsb2dpYyBkb2VzIG5vdCBkaWZmZXIgaW4gcHJvZHVjdGlvbi5cbiAqL1xuXG5mdW5jdGlvbiBpbnZhcmlhbnQoY29uZGl0aW9uLCBmb3JtYXQsIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YXJpYW50IHJlcXVpcmVzIGFuIGVycm9yIG1lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHZhciBlcnJvcjtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKCdNaW5pZmllZCBleGNlcHRpb24gb2NjdXJyZWQ7IHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCAnICsgJ2ZvciB0aGUgZnVsbCBlcnJvciBtZXNzYWdlIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhcmdzID0gW2EsIGIsIGMsIGQsIGUsIGZdO1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgfSkpO1xuICAgICAgZXJyb3IubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICB9XG5cbiAgICBlcnJvci5mcmFtZXNUb1BvcCA9IDE7IC8vIHdlIGRvbid0IGNhcmUgYWJvdXQgaW52YXJpYW50J3Mgb3duIGZyYW1lXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEB0eXBlY2hlY2tzIHN0YXRpYy1vbmx5XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnLi9pbnZhcmlhbnQnKTtcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGFuIGVudW1lcmF0aW9uIHdpdGgga2V5cyBlcXVhbCB0byB0aGVpciB2YWx1ZS5cbiAqXG4gKiBGb3IgZXhhbXBsZTpcbiAqXG4gKiAgIHZhciBDT0xPUlMgPSBrZXlNaXJyb3Ioe2JsdWU6IG51bGwsIHJlZDogbnVsbH0pO1xuICogICB2YXIgbXlDb2xvciA9IENPTE9SUy5ibHVlO1xuICogICB2YXIgaXNDb2xvclZhbGlkID0gISFDT0xPUlNbbXlDb2xvcl07XG4gKlxuICogVGhlIGxhc3QgbGluZSBjb3VsZCBub3QgYmUgcGVyZm9ybWVkIGlmIHRoZSB2YWx1ZXMgb2YgdGhlIGdlbmVyYXRlZCBlbnVtIHdlcmVcbiAqIG5vdCBlcXVhbCB0byB0aGVpciBrZXlzLlxuICpcbiAqICAgSW5wdXQ6ICB7a2V5MTogdmFsMSwga2V5MjogdmFsMn1cbiAqICAgT3V0cHV0OiB7a2V5MToga2V5MSwga2V5Mjoga2V5Mn1cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtvYmplY3R9XG4gKi9cbnZhciBrZXlNaXJyb3IgPSBmdW5jdGlvbiBrZXlNaXJyb3Iob2JqKSB7XG4gIHZhciByZXQgPSB7fTtcbiAgdmFyIGtleTtcbiAgIShvYmogaW5zdGFuY2VvZiBPYmplY3QgJiYgIUFycmF5LmlzQXJyYXkob2JqKSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAna2V5TWlycm9yKC4uLik6IEFyZ3VtZW50IG11c3QgYmUgYW4gb2JqZWN0LicpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgaWYgKCFvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIHJldFtrZXldID0ga2V5O1xuICB9XG4gIHJldHVybiByZXQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGtleU1pcnJvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4vKipcbiAqIEFsbG93cyBleHRyYWN0aW9uIG9mIGEgbWluaWZpZWQga2V5LiBMZXQncyB0aGUgYnVpbGQgc3lzdGVtIG1pbmlmeSBrZXlzXG4gKiB3aXRob3V0IGxvc2luZyB0aGUgYWJpbGl0eSB0byBkeW5hbWljYWxseSB1c2Uga2V5IHN0cmluZ3MgYXMgdmFsdWVzXG4gKiB0aGVtc2VsdmVzLiBQYXNzIGluIGFuIG9iamVjdCB3aXRoIGEgc2luZ2xlIGtleS92YWwgcGFpciBhbmQgaXQgd2lsbCByZXR1cm5cbiAqIHlvdSB0aGUgc3RyaW5nIGtleSBvZiB0aGF0IHNpbmdsZSByZWNvcmQuIFN1cHBvc2UgeW91IHdhbnQgdG8gZ3JhYiB0aGVcbiAqIHZhbHVlIGZvciBhIGtleSAnY2xhc3NOYW1lJyBpbnNpZGUgb2YgYW4gb2JqZWN0LiBLZXkvdmFsIG1pbmlmaWNhdGlvbiBtYXlcbiAqIGhhdmUgYWxpYXNlZCB0aGF0IGtleSB0byBiZSAneGExMicuIGtleU9mKHtjbGFzc05hbWU6IG51bGx9KSB3aWxsIHJldHVyblxuICogJ3hhMTInIGluIHRoYXQgY2FzZS4gUmVzb2x2ZSBrZXlzIHlvdSB3YW50IHRvIHVzZSBvbmNlIGF0IHN0YXJ0dXAgdGltZSwgdGhlblxuICogcmV1c2UgdGhvc2UgcmVzb2x1dGlvbnMuXG4gKi9cbnZhciBrZXlPZiA9IGZ1bmN0aW9uIGtleU9mKG9uZUtleU9iaikge1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBvbmVLZXlPYmopIHtcbiAgICBpZiAoIW9uZUtleU9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgcmV0dXJuIGtleTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ga2V5T2Y7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGVtcHR5RnVuY3Rpb24gPSByZXF1aXJlKCcuL2VtcHR5RnVuY3Rpb24nKTtcblxuLyoqXG4gKiBTaW1pbGFyIHRvIGludmFyaWFudCBidXQgb25seSBsb2dzIGEgd2FybmluZyBpZiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXQuXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIGxvZyBpc3N1ZXMgaW4gZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzIGluIGNyaXRpY2FsXG4gKiBwYXRocy4gUmVtb3ZpbmcgdGhlIGxvZ2dpbmcgY29kZSBmb3IgcHJvZHVjdGlvbiBlbnZpcm9ubWVudHMgd2lsbCBrZWVwIHRoZVxuICogc2FtZSBsb2dpYyBhbmQgZm9sbG93IHRoZSBzYW1lIGNvZGUgcGF0aHMuXG4gKi9cblxudmFyIHdhcm5pbmcgPSBlbXB0eUZ1bmN0aW9uO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbiBwcmludFdhcm5pbmcoZm9ybWF0KSB7XG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICB9XG5cbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgICB9KTtcbiAgICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgICB9IGNhdGNoICh4KSB7fVxuICAgIH07XG5cbiAgICB3YXJuaW5nID0gZnVuY3Rpb24gd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCkge1xuICAgICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYHdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQsIC4uLmFyZ3MpYCByZXF1aXJlcyBhIHdhcm5pbmcgJyArICdtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChmb3JtYXQuaW5kZXhPZignRmFpbGVkIENvbXBvc2l0ZSBwcm9wVHlwZTogJykgPT09IDApIHtcbiAgICAgICAgcmV0dXJuOyAvLyBJZ25vcmUgQ29tcG9zaXRlQ29tcG9uZW50IHByb3B0eXBlIGNoZWNrLlxuICAgICAgfVxuXG4gICAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMiA+IDIgPyBfbGVuMiAtIDIgOiAwKSwgX2tleTIgPSAyOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgICAgYXJnc1tfa2V5MiAtIDJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaW50V2FybmluZy5hcHBseSh1bmRlZmluZWQsIFtmb3JtYXRdLmNvbmNhdChhcmdzKSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSkoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3YXJuaW5nOyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cy5EaXNwYXRjaGVyID0gcmVxdWlyZSgnLi9saWIvRGlzcGF0Y2hlcicpO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBEaXNwYXRjaGVyXG4gKiBcbiAqIEBwcmV2ZW50TXVuZ2VcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG5cbnZhciBfcHJlZml4ID0gJ0lEXyc7XG5cbi8qKlxuICogRGlzcGF0Y2hlciBpcyB1c2VkIHRvIGJyb2FkY2FzdCBwYXlsb2FkcyB0byByZWdpc3RlcmVkIGNhbGxiYWNrcy4gVGhpcyBpc1xuICogZGlmZmVyZW50IGZyb20gZ2VuZXJpYyBwdWItc3ViIHN5c3RlbXMgaW4gdHdvIHdheXM6XG4gKlxuICogICAxKSBDYWxsYmFja3MgYXJlIG5vdCBzdWJzY3JpYmVkIHRvIHBhcnRpY3VsYXIgZXZlbnRzLiBFdmVyeSBwYXlsb2FkIGlzXG4gKiAgICAgIGRpc3BhdGNoZWQgdG8gZXZlcnkgcmVnaXN0ZXJlZCBjYWxsYmFjay5cbiAqICAgMikgQ2FsbGJhY2tzIGNhbiBiZSBkZWZlcnJlZCBpbiB3aG9sZSBvciBwYXJ0IHVudGlsIG90aGVyIGNhbGxiYWNrcyBoYXZlXG4gKiAgICAgIGJlZW4gZXhlY3V0ZWQuXG4gKlxuICogRm9yIGV4YW1wbGUsIGNvbnNpZGVyIHRoaXMgaHlwb3RoZXRpY2FsIGZsaWdodCBkZXN0aW5hdGlvbiBmb3JtLCB3aGljaFxuICogc2VsZWN0cyBhIGRlZmF1bHQgY2l0eSB3aGVuIGEgY291bnRyeSBpcyBzZWxlY3RlZDpcbiAqXG4gKiAgIHZhciBmbGlnaHREaXNwYXRjaGVyID0gbmV3IERpc3BhdGNoZXIoKTtcbiAqXG4gKiAgIC8vIEtlZXBzIHRyYWNrIG9mIHdoaWNoIGNvdW50cnkgaXMgc2VsZWN0ZWRcbiAqICAgdmFyIENvdW50cnlTdG9yZSA9IHtjb3VudHJ5OiBudWxsfTtcbiAqXG4gKiAgIC8vIEtlZXBzIHRyYWNrIG9mIHdoaWNoIGNpdHkgaXMgc2VsZWN0ZWRcbiAqICAgdmFyIENpdHlTdG9yZSA9IHtjaXR5OiBudWxsfTtcbiAqXG4gKiAgIC8vIEtlZXBzIHRyYWNrIG9mIHRoZSBiYXNlIGZsaWdodCBwcmljZSBvZiB0aGUgc2VsZWN0ZWQgY2l0eVxuICogICB2YXIgRmxpZ2h0UHJpY2VTdG9yZSA9IHtwcmljZTogbnVsbH1cbiAqXG4gKiBXaGVuIGEgdXNlciBjaGFuZ2VzIHRoZSBzZWxlY3RlZCBjaXR5LCB3ZSBkaXNwYXRjaCB0aGUgcGF5bG9hZDpcbiAqXG4gKiAgIGZsaWdodERpc3BhdGNoZXIuZGlzcGF0Y2goe1xuICogICAgIGFjdGlvblR5cGU6ICdjaXR5LXVwZGF0ZScsXG4gKiAgICAgc2VsZWN0ZWRDaXR5OiAncGFyaXMnXG4gKiAgIH0pO1xuICpcbiAqIFRoaXMgcGF5bG9hZCBpcyBkaWdlc3RlZCBieSBgQ2l0eVN0b3JlYDpcbiAqXG4gKiAgIGZsaWdodERpc3BhdGNoZXIucmVnaXN0ZXIoZnVuY3Rpb24ocGF5bG9hZCkge1xuICogICAgIGlmIChwYXlsb2FkLmFjdGlvblR5cGUgPT09ICdjaXR5LXVwZGF0ZScpIHtcbiAqICAgICAgIENpdHlTdG9yZS5jaXR5ID0gcGF5bG9hZC5zZWxlY3RlZENpdHk7XG4gKiAgICAgfVxuICogICB9KTtcbiAqXG4gKiBXaGVuIHRoZSB1c2VyIHNlbGVjdHMgYSBjb3VudHJ5LCB3ZSBkaXNwYXRjaCB0aGUgcGF5bG9hZDpcbiAqXG4gKiAgIGZsaWdodERpc3BhdGNoZXIuZGlzcGF0Y2goe1xuICogICAgIGFjdGlvblR5cGU6ICdjb3VudHJ5LXVwZGF0ZScsXG4gKiAgICAgc2VsZWN0ZWRDb3VudHJ5OiAnYXVzdHJhbGlhJ1xuICogICB9KTtcbiAqXG4gKiBUaGlzIHBheWxvYWQgaXMgZGlnZXN0ZWQgYnkgYm90aCBzdG9yZXM6XG4gKlxuICogICBDb3VudHJ5U3RvcmUuZGlzcGF0Y2hUb2tlbiA9IGZsaWdodERpc3BhdGNoZXIucmVnaXN0ZXIoZnVuY3Rpb24ocGF5bG9hZCkge1xuICogICAgIGlmIChwYXlsb2FkLmFjdGlvblR5cGUgPT09ICdjb3VudHJ5LXVwZGF0ZScpIHtcbiAqICAgICAgIENvdW50cnlTdG9yZS5jb3VudHJ5ID0gcGF5bG9hZC5zZWxlY3RlZENvdW50cnk7XG4gKiAgICAgfVxuICogICB9KTtcbiAqXG4gKiBXaGVuIHRoZSBjYWxsYmFjayB0byB1cGRhdGUgYENvdW50cnlTdG9yZWAgaXMgcmVnaXN0ZXJlZCwgd2Ugc2F2ZSBhIHJlZmVyZW5jZVxuICogdG8gdGhlIHJldHVybmVkIHRva2VuLiBVc2luZyB0aGlzIHRva2VuIHdpdGggYHdhaXRGb3IoKWAsIHdlIGNhbiBndWFyYW50ZWVcbiAqIHRoYXQgYENvdW50cnlTdG9yZWAgaXMgdXBkYXRlZCBiZWZvcmUgdGhlIGNhbGxiYWNrIHRoYXQgdXBkYXRlcyBgQ2l0eVN0b3JlYFxuICogbmVlZHMgdG8gcXVlcnkgaXRzIGRhdGEuXG4gKlxuICogICBDaXR5U3RvcmUuZGlzcGF0Y2hUb2tlbiA9IGZsaWdodERpc3BhdGNoZXIucmVnaXN0ZXIoZnVuY3Rpb24ocGF5bG9hZCkge1xuICogICAgIGlmIChwYXlsb2FkLmFjdGlvblR5cGUgPT09ICdjb3VudHJ5LXVwZGF0ZScpIHtcbiAqICAgICAgIC8vIGBDb3VudHJ5U3RvcmUuY291bnRyeWAgbWF5IG5vdCBiZSB1cGRhdGVkLlxuICogICAgICAgZmxpZ2h0RGlzcGF0Y2hlci53YWl0Rm9yKFtDb3VudHJ5U3RvcmUuZGlzcGF0Y2hUb2tlbl0pO1xuICogICAgICAgLy8gYENvdW50cnlTdG9yZS5jb3VudHJ5YCBpcyBub3cgZ3VhcmFudGVlZCB0byBiZSB1cGRhdGVkLlxuICpcbiAqICAgICAgIC8vIFNlbGVjdCB0aGUgZGVmYXVsdCBjaXR5IGZvciB0aGUgbmV3IGNvdW50cnlcbiAqICAgICAgIENpdHlTdG9yZS5jaXR5ID0gZ2V0RGVmYXVsdENpdHlGb3JDb3VudHJ5KENvdW50cnlTdG9yZS5jb3VudHJ5KTtcbiAqICAgICB9XG4gKiAgIH0pO1xuICpcbiAqIFRoZSB1c2FnZSBvZiBgd2FpdEZvcigpYCBjYW4gYmUgY2hhaW5lZCwgZm9yIGV4YW1wbGU6XG4gKlxuICogICBGbGlnaHRQcmljZVN0b3JlLmRpc3BhdGNoVG9rZW4gPVxuICogICAgIGZsaWdodERpc3BhdGNoZXIucmVnaXN0ZXIoZnVuY3Rpb24ocGF5bG9hZCkge1xuICogICAgICAgc3dpdGNoIChwYXlsb2FkLmFjdGlvblR5cGUpIHtcbiAqICAgICAgICAgY2FzZSAnY291bnRyeS11cGRhdGUnOlxuICogICAgICAgICBjYXNlICdjaXR5LXVwZGF0ZSc6XG4gKiAgICAgICAgICAgZmxpZ2h0RGlzcGF0Y2hlci53YWl0Rm9yKFtDaXR5U3RvcmUuZGlzcGF0Y2hUb2tlbl0pO1xuICogICAgICAgICAgIEZsaWdodFByaWNlU3RvcmUucHJpY2UgPVxuICogICAgICAgICAgICAgZ2V0RmxpZ2h0UHJpY2VTdG9yZShDb3VudHJ5U3RvcmUuY291bnRyeSwgQ2l0eVN0b3JlLmNpdHkpO1xuICogICAgICAgICAgIGJyZWFrO1xuICogICAgIH1cbiAqICAgfSk7XG4gKlxuICogVGhlIGBjb3VudHJ5LXVwZGF0ZWAgcGF5bG9hZCB3aWxsIGJlIGd1YXJhbnRlZWQgdG8gaW52b2tlIHRoZSBzdG9yZXMnXG4gKiByZWdpc3RlcmVkIGNhbGxiYWNrcyBpbiBvcmRlcjogYENvdW50cnlTdG9yZWAsIGBDaXR5U3RvcmVgLCB0aGVuXG4gKiBgRmxpZ2h0UHJpY2VTdG9yZWAuXG4gKi9cblxudmFyIERpc3BhdGNoZXIgPSAoZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBEaXNwYXRjaGVyKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBEaXNwYXRjaGVyKTtcblxuICAgIHRoaXMuX2NhbGxiYWNrcyA9IHt9O1xuICAgIHRoaXMuX2lzRGlzcGF0Y2hpbmcgPSBmYWxzZTtcbiAgICB0aGlzLl9pc0hhbmRsZWQgPSB7fTtcbiAgICB0aGlzLl9pc1BlbmRpbmcgPSB7fTtcbiAgICB0aGlzLl9sYXN0SUQgPSAxO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhIGNhbGxiYWNrIHRvIGJlIGludm9rZWQgd2l0aCBldmVyeSBkaXNwYXRjaGVkIHBheWxvYWQuIFJldHVybnNcbiAgICogYSB0b2tlbiB0aGF0IGNhbiBiZSB1c2VkIHdpdGggYHdhaXRGb3IoKWAuXG4gICAqL1xuXG4gIERpc3BhdGNoZXIucHJvdG90eXBlLnJlZ2lzdGVyID0gZnVuY3Rpb24gcmVnaXN0ZXIoY2FsbGJhY2spIHtcbiAgICB2YXIgaWQgPSBfcHJlZml4ICsgdGhpcy5fbGFzdElEKys7XG4gICAgdGhpcy5fY2FsbGJhY2tzW2lkXSA9IGNhbGxiYWNrO1xuICAgIHJldHVybiBpZDtcbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGNhbGxiYWNrIGJhc2VkIG9uIGl0cyB0b2tlbi5cbiAgICovXG5cbiAgRGlzcGF0Y2hlci5wcm90b3R5cGUudW5yZWdpc3RlciA9IGZ1bmN0aW9uIHVucmVnaXN0ZXIoaWQpIHtcbiAgICAhdGhpcy5fY2FsbGJhY2tzW2lkXSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdEaXNwYXRjaGVyLnVucmVnaXN0ZXIoLi4uKTogYCVzYCBkb2VzIG5vdCBtYXAgdG8gYSByZWdpc3RlcmVkIGNhbGxiYWNrLicsIGlkKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG4gICAgZGVsZXRlIHRoaXMuX2NhbGxiYWNrc1tpZF07XG4gIH07XG5cbiAgLyoqXG4gICAqIFdhaXRzIGZvciB0aGUgY2FsbGJhY2tzIHNwZWNpZmllZCB0byBiZSBpbnZva2VkIGJlZm9yZSBjb250aW51aW5nIGV4ZWN1dGlvblxuICAgKiBvZiB0aGUgY3VycmVudCBjYWxsYmFjay4gVGhpcyBtZXRob2Qgc2hvdWxkIG9ubHkgYmUgdXNlZCBieSBhIGNhbGxiYWNrIGluXG4gICAqIHJlc3BvbnNlIHRvIGEgZGlzcGF0Y2hlZCBwYXlsb2FkLlxuICAgKi9cblxuICBEaXNwYXRjaGVyLnByb3RvdHlwZS53YWl0Rm9yID0gZnVuY3Rpb24gd2FpdEZvcihpZHMpIHtcbiAgICAhdGhpcy5faXNEaXNwYXRjaGluZyA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdEaXNwYXRjaGVyLndhaXRGb3IoLi4uKTogTXVzdCBiZSBpbnZva2VkIHdoaWxlIGRpc3BhdGNoaW5nLicpIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgaWRzLmxlbmd0aDsgaWkrKykge1xuICAgICAgdmFyIGlkID0gaWRzW2lpXTtcbiAgICAgIGlmICh0aGlzLl9pc1BlbmRpbmdbaWRdKSB7XG4gICAgICAgICF0aGlzLl9pc0hhbmRsZWRbaWRdID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0Rpc3BhdGNoZXIud2FpdEZvciguLi4pOiBDaXJjdWxhciBkZXBlbmRlbmN5IGRldGVjdGVkIHdoaWxlICcgKyAnd2FpdGluZyBmb3IgYCVzYC4nLCBpZCkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgICF0aGlzLl9jYWxsYmFja3NbaWRdID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0Rpc3BhdGNoZXIud2FpdEZvciguLi4pOiBgJXNgIGRvZXMgbm90IG1hcCB0byBhIHJlZ2lzdGVyZWQgY2FsbGJhY2suJywgaWQpIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuX2ludm9rZUNhbGxiYWNrKGlkKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIERpc3BhdGNoZXMgYSBwYXlsb2FkIHRvIGFsbCByZWdpc3RlcmVkIGNhbGxiYWNrcy5cbiAgICovXG5cbiAgRGlzcGF0Y2hlci5wcm90b3R5cGUuZGlzcGF0Y2ggPSBmdW5jdGlvbiBkaXNwYXRjaChwYXlsb2FkKSB7XG4gICAgISF0aGlzLl9pc0Rpc3BhdGNoaW5nID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0Rpc3BhdGNoLmRpc3BhdGNoKC4uLik6IENhbm5vdCBkaXNwYXRjaCBpbiB0aGUgbWlkZGxlIG9mIGEgZGlzcGF0Y2guJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuICAgIHRoaXMuX3N0YXJ0RGlzcGF0Y2hpbmcocGF5bG9hZCk7XG4gICAgdHJ5IHtcbiAgICAgIGZvciAodmFyIGlkIGluIHRoaXMuX2NhbGxiYWNrcykge1xuICAgICAgICBpZiAodGhpcy5faXNQZW5kaW5nW2lkXSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2ludm9rZUNhbGxiYWNrKGlkKTtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgdGhpcy5fc3RvcERpc3BhdGNoaW5nKCk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJcyB0aGlzIERpc3BhdGNoZXIgY3VycmVudGx5IGRpc3BhdGNoaW5nLlxuICAgKi9cblxuICBEaXNwYXRjaGVyLnByb3RvdHlwZS5pc0Rpc3BhdGNoaW5nID0gZnVuY3Rpb24gaXNEaXNwYXRjaGluZygpIHtcbiAgICByZXR1cm4gdGhpcy5faXNEaXNwYXRjaGluZztcbiAgfTtcblxuICAvKipcbiAgICogQ2FsbCB0aGUgY2FsbGJhY2sgc3RvcmVkIHdpdGggdGhlIGdpdmVuIGlkLiBBbHNvIGRvIHNvbWUgaW50ZXJuYWxcbiAgICogYm9va2tlZXBpbmcuXG4gICAqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cblxuICBEaXNwYXRjaGVyLnByb3RvdHlwZS5faW52b2tlQ2FsbGJhY2sgPSBmdW5jdGlvbiBfaW52b2tlQ2FsbGJhY2soaWQpIHtcbiAgICB0aGlzLl9pc1BlbmRpbmdbaWRdID0gdHJ1ZTtcbiAgICB0aGlzLl9jYWxsYmFja3NbaWRdKHRoaXMuX3BlbmRpbmdQYXlsb2FkKTtcbiAgICB0aGlzLl9pc0hhbmRsZWRbaWRdID0gdHJ1ZTtcbiAgfTtcblxuICAvKipcbiAgICogU2V0IHVwIGJvb2trZWVwaW5nIG5lZWRlZCB3aGVuIGRpc3BhdGNoaW5nLlxuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG5cbiAgRGlzcGF0Y2hlci5wcm90b3R5cGUuX3N0YXJ0RGlzcGF0Y2hpbmcgPSBmdW5jdGlvbiBfc3RhcnREaXNwYXRjaGluZyhwYXlsb2FkKSB7XG4gICAgZm9yICh2YXIgaWQgaW4gdGhpcy5fY2FsbGJhY2tzKSB7XG4gICAgICB0aGlzLl9pc1BlbmRpbmdbaWRdID0gZmFsc2U7XG4gICAgICB0aGlzLl9pc0hhbmRsZWRbaWRdID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuX3BlbmRpbmdQYXlsb2FkID0gcGF5bG9hZDtcbiAgICB0aGlzLl9pc0Rpc3BhdGNoaW5nID0gdHJ1ZTtcbiAgfTtcblxuICAvKipcbiAgICogQ2xlYXIgYm9va2tlZXBpbmcgdXNlZCBmb3IgZGlzcGF0Y2hpbmcuXG4gICAqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cblxuICBEaXNwYXRjaGVyLnByb3RvdHlwZS5fc3RvcERpc3BhdGNoaW5nID0gZnVuY3Rpb24gX3N0b3BEaXNwYXRjaGluZygpIHtcbiAgICBkZWxldGUgdGhpcy5fcGVuZGluZ1BheWxvYWQ7XG4gICAgdGhpcy5faXNEaXNwYXRjaGluZyA9IGZhbHNlO1xuICB9O1xuXG4gIHJldHVybiBEaXNwYXRjaGVyO1xufSkoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBEaXNwYXRjaGVyOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBpbnZhcmlhbnRcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxudmFyIGludmFyaWFudCA9IGZ1bmN0aW9uIChjb25kaXRpb24sIGZvcm1hdCwgYSwgYiwgYywgZCwgZSwgZikge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhcmlhbnQgcmVxdWlyZXMgYW4gZXJyb3IgbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdmFyIGVycm9yO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgKyAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ3MgPSBbYSwgYiwgYywgZCwgZSwgZl07XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoJ0ludmFyaWFudCBWaW9sYXRpb246ICcgKyBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBlcnJvci5mcmFtZXNUb1BvcCA9IDE7IC8vIHdlIGRvbid0IGNhcmUgYWJvdXQgaW52YXJpYW50J3Mgb3duIGZyYW1lXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaW52YXJpYW50OyIsIid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbmZ1bmN0aW9uIHNob3VsZFVzZU5hdGl2ZSgpIHtcblx0dHJ5IHtcblx0XHRpZiAoIU9iamVjdC5hc3NpZ24pIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBEZXRlY3QgYnVnZ3kgcHJvcGVydHkgZW51bWVyYXRpb24gb3JkZXIgaW4gb2xkZXIgVjggdmVyc2lvbnMuXG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00MTE4XG5cdFx0dmFyIHRlc3QxID0gbmV3IFN0cmluZygnYWJjJyk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cdFx0dGVzdDFbNV0gPSAnZGUnO1xuXHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MSlbMF0gPT09ICc1Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDIgPSB7fTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcblx0XHRcdHRlc3QyWydfJyArIFN0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaTtcblx0XHR9XG5cdFx0dmFyIG9yZGVyMiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QyKS5tYXAoZnVuY3Rpb24gKG4pIHtcblx0XHRcdHJldHVybiB0ZXN0MltuXTtcblx0XHR9KTtcblx0XHRpZiAob3JkZXIyLmpvaW4oJycpICE9PSAnMDEyMzQ1Njc4OScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QzID0ge307XG5cdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAobGV0dGVyKSB7XG5cdFx0XHR0ZXN0M1tsZXR0ZXJdID0gbGV0dGVyO1xuXHRcdH0pO1xuXHRcdGlmIChPYmplY3Qua2V5cyhPYmplY3QuYXNzaWduKHt9LCB0ZXN0MykpLmpvaW4oJycpICE9PVxuXHRcdFx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHQvLyBXZSBkb24ndCBleHBlY3QgYW55IG9mIHRoZSBhYm92ZSB0byB0aHJvdywgYnV0IGJldHRlciB0byBiZSBzYWZlLlxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNob3VsZFVzZU5hdGl2ZSgpID8gT2JqZWN0LmFzc2lnbiA6IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHR2YXIgZnJvbTtcblx0dmFyIHRvID0gdG9PYmplY3QodGFyZ2V0KTtcblx0dmFyIHN5bWJvbHM7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRmcm9tID0gT2JqZWN0KGFyZ3VtZW50c1tzXSk7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuXHRcdFx0XHR0b1trZXldID0gZnJvbVtrZXldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRzeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhmcm9tKTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3ltYm9scy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAocHJvcElzRW51bWVyYWJsZS5jYWxsKGZyb20sIHN5bWJvbHNbaV0pKSB7XG5cdFx0XHRcdFx0dG9bc3ltYm9sc1tpXV0gPSBmcm9tW3N5bWJvbHNbaV1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRvO1xufTtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgS2V5RXNjYXBlVXRpbHNcbiAqIFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBFc2NhcGUgYW5kIHdyYXAga2V5IHNvIGl0IGlzIHNhZmUgdG8gdXNlIGFzIGEgcmVhY3RpZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgdG8gYmUgZXNjYXBlZC5cbiAqIEByZXR1cm4ge3N0cmluZ30gdGhlIGVzY2FwZWQga2V5LlxuICovXG5cbmZ1bmN0aW9uIGVzY2FwZShrZXkpIHtcbiAgdmFyIGVzY2FwZVJlZ2V4ID0gL1s9Ol0vZztcbiAgdmFyIGVzY2FwZXJMb29rdXAgPSB7XG4gICAgJz0nOiAnPTAnLFxuICAgICc6JzogJz0yJ1xuICB9O1xuICB2YXIgZXNjYXBlZFN0cmluZyA9ICgnJyArIGtleSkucmVwbGFjZShlc2NhcGVSZWdleCwgZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgcmV0dXJuIGVzY2FwZXJMb29rdXBbbWF0Y2hdO1xuICB9KTtcblxuICByZXR1cm4gJyQnICsgZXNjYXBlZFN0cmluZztcbn1cblxuLyoqXG4gKiBVbmVzY2FwZSBhbmQgdW53cmFwIGtleSBmb3IgaHVtYW4tcmVhZGFibGUgZGlzcGxheVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgdG8gdW5lc2NhcGUuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSB1bmVzY2FwZWQga2V5LlxuICovXG5mdW5jdGlvbiB1bmVzY2FwZShrZXkpIHtcbiAgdmFyIHVuZXNjYXBlUmVnZXggPSAvKD0wfD0yKS9nO1xuICB2YXIgdW5lc2NhcGVyTG9va3VwID0ge1xuICAgICc9MCc6ICc9JyxcbiAgICAnPTInOiAnOidcbiAgfTtcbiAgdmFyIGtleVN1YnN0cmluZyA9IGtleVswXSA9PT0gJy4nICYmIGtleVsxXSA9PT0gJyQnID8ga2V5LnN1YnN0cmluZygyKSA6IGtleS5zdWJzdHJpbmcoMSk7XG5cbiAgcmV0dXJuICgnJyArIGtleVN1YnN0cmluZykucmVwbGFjZSh1bmVzY2FwZVJlZ2V4LCBmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICByZXR1cm4gdW5lc2NhcGVyTG9va3VwW21hdGNoXTtcbiAgfSk7XG59XG5cbnZhciBLZXlFc2NhcGVVdGlscyA9IHtcbiAgZXNjYXBlOiBlc2NhcGUsXG4gIHVuZXNjYXBlOiB1bmVzY2FwZVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBLZXlFc2NhcGVVdGlsczsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUG9vbGVkQ2xhc3NcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfcHJvZEludmFyaWFudCA9IHJlcXVpcmUoJy4vcmVhY3RQcm9kSW52YXJpYW50Jyk7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcblxuLyoqXG4gKiBTdGF0aWMgcG9vbGVycy4gU2V2ZXJhbCBjdXN0b20gdmVyc2lvbnMgZm9yIGVhY2ggcG90ZW50aWFsIG51bWJlciBvZlxuICogYXJndW1lbnRzLiBBIGNvbXBsZXRlbHkgZ2VuZXJpYyBwb29sZXIgaXMgZWFzeSB0byBpbXBsZW1lbnQsIGJ1dCB3b3VsZFxuICogcmVxdWlyZSBhY2Nlc3NpbmcgdGhlIGBhcmd1bWVudHNgIG9iamVjdC4gSW4gZWFjaCBvZiB0aGVzZSwgYHRoaXNgIHJlZmVycyB0b1xuICogdGhlIENsYXNzIGl0c2VsZiwgbm90IGFuIGluc3RhbmNlLiBJZiBhbnkgb3RoZXJzIGFyZSBuZWVkZWQsIHNpbXBseSBhZGQgdGhlbVxuICogaGVyZSwgb3IgaW4gdGhlaXIgb3duIGZpbGVzLlxuICovXG52YXIgb25lQXJndW1lbnRQb29sZXIgPSBmdW5jdGlvbiAoY29weUZpZWxkc0Zyb20pIHtcbiAgdmFyIEtsYXNzID0gdGhpcztcbiAgaWYgKEtsYXNzLmluc3RhbmNlUG9vbC5sZW5ndGgpIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBLbGFzcy5pbnN0YW5jZVBvb2wucG9wKCk7XG4gICAgS2xhc3MuY2FsbChpbnN0YW5jZSwgY29weUZpZWxkc0Zyb20pO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IEtsYXNzKGNvcHlGaWVsZHNGcm9tKTtcbiAgfVxufTtcblxudmFyIHR3b0FyZ3VtZW50UG9vbGVyID0gZnVuY3Rpb24gKGExLCBhMikge1xuICB2YXIgS2xhc3MgPSB0aGlzO1xuICBpZiAoS2xhc3MuaW5zdGFuY2VQb29sLmxlbmd0aCkge1xuICAgIHZhciBpbnN0YW5jZSA9IEtsYXNzLmluc3RhbmNlUG9vbC5wb3AoKTtcbiAgICBLbGFzcy5jYWxsKGluc3RhbmNlLCBhMSwgYTIpO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IEtsYXNzKGExLCBhMik7XG4gIH1cbn07XG5cbnZhciB0aHJlZUFyZ3VtZW50UG9vbGVyID0gZnVuY3Rpb24gKGExLCBhMiwgYTMpIHtcbiAgdmFyIEtsYXNzID0gdGhpcztcbiAgaWYgKEtsYXNzLmluc3RhbmNlUG9vbC5sZW5ndGgpIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBLbGFzcy5pbnN0YW5jZVBvb2wucG9wKCk7XG4gICAgS2xhc3MuY2FsbChpbnN0YW5jZSwgYTEsIGEyLCBhMyk7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgS2xhc3MoYTEsIGEyLCBhMyk7XG4gIH1cbn07XG5cbnZhciBmb3VyQXJndW1lbnRQb29sZXIgPSBmdW5jdGlvbiAoYTEsIGEyLCBhMywgYTQpIHtcbiAgdmFyIEtsYXNzID0gdGhpcztcbiAgaWYgKEtsYXNzLmluc3RhbmNlUG9vbC5sZW5ndGgpIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBLbGFzcy5pbnN0YW5jZVBvb2wucG9wKCk7XG4gICAgS2xhc3MuY2FsbChpbnN0YW5jZSwgYTEsIGEyLCBhMywgYTQpO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IEtsYXNzKGExLCBhMiwgYTMsIGE0KTtcbiAgfVxufTtcblxudmFyIGZpdmVBcmd1bWVudFBvb2xlciA9IGZ1bmN0aW9uIChhMSwgYTIsIGEzLCBhNCwgYTUpIHtcbiAgdmFyIEtsYXNzID0gdGhpcztcbiAgaWYgKEtsYXNzLmluc3RhbmNlUG9vbC5sZW5ndGgpIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBLbGFzcy5pbnN0YW5jZVBvb2wucG9wKCk7XG4gICAgS2xhc3MuY2FsbChpbnN0YW5jZSwgYTEsIGEyLCBhMywgYTQsIGE1KTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBLbGFzcyhhMSwgYTIsIGEzLCBhNCwgYTUpO1xuICB9XG59O1xuXG52YXIgc3RhbmRhcmRSZWxlYXNlciA9IGZ1bmN0aW9uIChpbnN0YW5jZSkge1xuICB2YXIgS2xhc3MgPSB0aGlzO1xuICAhKGluc3RhbmNlIGluc3RhbmNlb2YgS2xhc3MpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1RyeWluZyB0byByZWxlYXNlIGFuIGluc3RhbmNlIGludG8gYSBwb29sIG9mIGEgZGlmZmVyZW50IHR5cGUuJykgOiBfcHJvZEludmFyaWFudCgnMjUnKSA6IHZvaWQgMDtcbiAgaW5zdGFuY2UuZGVzdHJ1Y3RvcigpO1xuICBpZiAoS2xhc3MuaW5zdGFuY2VQb29sLmxlbmd0aCA8IEtsYXNzLnBvb2xTaXplKSB7XG4gICAgS2xhc3MuaW5zdGFuY2VQb29sLnB1c2goaW5zdGFuY2UpO1xuICB9XG59O1xuXG52YXIgREVGQVVMVF9QT09MX1NJWkUgPSAxMDtcbnZhciBERUZBVUxUX1BPT0xFUiA9IG9uZUFyZ3VtZW50UG9vbGVyO1xuXG4vKipcbiAqIEF1Z21lbnRzIGBDb3B5Q29uc3RydWN0b3JgIHRvIGJlIGEgcG9vbGFibGUgY2xhc3MsIGF1Z21lbnRpbmcgb25seSB0aGUgY2xhc3NcbiAqIGl0c2VsZiAoc3RhdGljYWxseSkgbm90IGFkZGluZyBhbnkgcHJvdG90eXBpY2FsIGZpZWxkcy4gQW55IENvcHlDb25zdHJ1Y3RvclxuICogeW91IGdpdmUgdGhpcyBtYXkgaGF2ZSBhIGBwb29sU2l6ZWAgcHJvcGVydHksIGFuZCB3aWxsIGxvb2sgZm9yIGFcbiAqIHByb3RvdHlwaWNhbCBgZGVzdHJ1Y3RvcmAgb24gaW5zdGFuY2VzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IENvcHlDb25zdHJ1Y3RvciBDb25zdHJ1Y3RvciB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlc2V0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcG9vbGVyIEN1c3RvbWl6YWJsZSBwb29sZXIuXG4gKi9cbnZhciBhZGRQb29saW5nVG8gPSBmdW5jdGlvbiAoQ29weUNvbnN0cnVjdG9yLCBwb29sZXIpIHtcbiAgdmFyIE5ld0tsYXNzID0gQ29weUNvbnN0cnVjdG9yO1xuICBOZXdLbGFzcy5pbnN0YW5jZVBvb2wgPSBbXTtcbiAgTmV3S2xhc3MuZ2V0UG9vbGVkID0gcG9vbGVyIHx8IERFRkFVTFRfUE9PTEVSO1xuICBpZiAoIU5ld0tsYXNzLnBvb2xTaXplKSB7XG4gICAgTmV3S2xhc3MucG9vbFNpemUgPSBERUZBVUxUX1BPT0xfU0laRTtcbiAgfVxuICBOZXdLbGFzcy5yZWxlYXNlID0gc3RhbmRhcmRSZWxlYXNlcjtcbiAgcmV0dXJuIE5ld0tsYXNzO1xufTtcblxudmFyIFBvb2xlZENsYXNzID0ge1xuICBhZGRQb29saW5nVG86IGFkZFBvb2xpbmdUbyxcbiAgb25lQXJndW1lbnRQb29sZXI6IG9uZUFyZ3VtZW50UG9vbGVyLFxuICB0d29Bcmd1bWVudFBvb2xlcjogdHdvQXJndW1lbnRQb29sZXIsXG4gIHRocmVlQXJndW1lbnRQb29sZXI6IHRocmVlQXJndW1lbnRQb29sZXIsXG4gIGZvdXJBcmd1bWVudFBvb2xlcjogZm91ckFyZ3VtZW50UG9vbGVyLFxuICBmaXZlQXJndW1lbnRQb29sZXI6IGZpdmVBcmd1bWVudFBvb2xlclxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBQb29sZWRDbGFzczsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgUmVhY3RDaGlsZHJlbiA9IHJlcXVpcmUoJy4vUmVhY3RDaGlsZHJlbicpO1xudmFyIFJlYWN0Q29tcG9uZW50ID0gcmVxdWlyZSgnLi9SZWFjdENvbXBvbmVudCcpO1xudmFyIFJlYWN0UHVyZUNvbXBvbmVudCA9IHJlcXVpcmUoJy4vUmVhY3RQdXJlQ29tcG9uZW50Jyk7XG52YXIgUmVhY3RDbGFzcyA9IHJlcXVpcmUoJy4vUmVhY3RDbGFzcycpO1xudmFyIFJlYWN0RE9NRmFjdG9yaWVzID0gcmVxdWlyZSgnLi9SZWFjdERPTUZhY3RvcmllcycpO1xudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG52YXIgUmVhY3RQcm9wVHlwZXMgPSByZXF1aXJlKCcuL1JlYWN0UHJvcFR5cGVzJyk7XG52YXIgUmVhY3RWZXJzaW9uID0gcmVxdWlyZSgnLi9SZWFjdFZlcnNpb24nKTtcblxudmFyIG9ubHlDaGlsZCA9IHJlcXVpcmUoJy4vb25seUNoaWxkJyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxudmFyIGNyZWF0ZUVsZW1lbnQgPSBSZWFjdEVsZW1lbnQuY3JlYXRlRWxlbWVudDtcbnZhciBjcmVhdGVGYWN0b3J5ID0gUmVhY3RFbGVtZW50LmNyZWF0ZUZhY3Rvcnk7XG52YXIgY2xvbmVFbGVtZW50ID0gUmVhY3RFbGVtZW50LmNsb25lRWxlbWVudDtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIFJlYWN0RWxlbWVudFZhbGlkYXRvciA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50VmFsaWRhdG9yJyk7XG4gIGNyZWF0ZUVsZW1lbnQgPSBSZWFjdEVsZW1lbnRWYWxpZGF0b3IuY3JlYXRlRWxlbWVudDtcbiAgY3JlYXRlRmFjdG9yeSA9IFJlYWN0RWxlbWVudFZhbGlkYXRvci5jcmVhdGVGYWN0b3J5O1xuICBjbG9uZUVsZW1lbnQgPSBSZWFjdEVsZW1lbnRWYWxpZGF0b3IuY2xvbmVFbGVtZW50O1xufVxuXG52YXIgX19zcHJlYWQgPSBfYXNzaWduO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgd2FybmVkID0gZmFsc2U7XG4gIF9fc3ByZWFkID0gZnVuY3Rpb24gKCkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKHdhcm5lZCwgJ1JlYWN0Ll9fc3ByZWFkIGlzIGRlcHJlY2F0ZWQgYW5kIHNob3VsZCBub3QgYmUgdXNlZC4gVXNlICcgKyAnT2JqZWN0LmFzc2lnbiBkaXJlY3RseSBvciBhbm90aGVyIGhlbHBlciBmdW5jdGlvbiB3aXRoIHNpbWlsYXIgJyArICdzZW1hbnRpY3MuIFlvdSBtYXkgYmUgc2VlaW5nIHRoaXMgd2FybmluZyBkdWUgdG8geW91ciBjb21waWxlci4gJyArICdTZWUgaHR0cHM6Ly9mYi5tZS9yZWFjdC1zcHJlYWQtZGVwcmVjYXRpb24gZm9yIG1vcmUgZGV0YWlscy4nKSA6IHZvaWQgMDtcbiAgICB3YXJuZWQgPSB0cnVlO1xuICAgIHJldHVybiBfYXNzaWduLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbnZhciBSZWFjdCA9IHtcblxuICAvLyBNb2Rlcm5cblxuICBDaGlsZHJlbjoge1xuICAgIG1hcDogUmVhY3RDaGlsZHJlbi5tYXAsXG4gICAgZm9yRWFjaDogUmVhY3RDaGlsZHJlbi5mb3JFYWNoLFxuICAgIGNvdW50OiBSZWFjdENoaWxkcmVuLmNvdW50LFxuICAgIHRvQXJyYXk6IFJlYWN0Q2hpbGRyZW4udG9BcnJheSxcbiAgICBvbmx5OiBvbmx5Q2hpbGRcbiAgfSxcblxuICBDb21wb25lbnQ6IFJlYWN0Q29tcG9uZW50LFxuICBQdXJlQ29tcG9uZW50OiBSZWFjdFB1cmVDb21wb25lbnQsXG5cbiAgY3JlYXRlRWxlbWVudDogY3JlYXRlRWxlbWVudCxcbiAgY2xvbmVFbGVtZW50OiBjbG9uZUVsZW1lbnQsXG4gIGlzVmFsaWRFbGVtZW50OiBSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQsXG5cbiAgLy8gQ2xhc3NpY1xuXG4gIFByb3BUeXBlczogUmVhY3RQcm9wVHlwZXMsXG4gIGNyZWF0ZUNsYXNzOiBSZWFjdENsYXNzLmNyZWF0ZUNsYXNzLFxuICBjcmVhdGVGYWN0b3J5OiBjcmVhdGVGYWN0b3J5LFxuICBjcmVhdGVNaXhpbjogZnVuY3Rpb24gKG1peGluKSB7XG4gICAgLy8gQ3VycmVudGx5IGEgbm9vcC4gV2lsbCBiZSB1c2VkIHRvIHZhbGlkYXRlIGFuZCB0cmFjZSBtaXhpbnMuXG4gICAgcmV0dXJuIG1peGluO1xuICB9LFxuXG4gIC8vIFRoaXMgbG9va3MgRE9NIHNwZWNpZmljIGJ1dCB0aGVzZSBhcmUgYWN0dWFsbHkgaXNvbW9ycGhpYyBoZWxwZXJzXG4gIC8vIHNpbmNlIHRoZXkgYXJlIGp1c3QgZ2VuZXJhdGluZyBET00gc3RyaW5ncy5cbiAgRE9NOiBSZWFjdERPTUZhY3RvcmllcyxcblxuICB2ZXJzaW9uOiBSZWFjdFZlcnNpb24sXG5cbiAgLy8gRGVwcmVjYXRlZCBob29rIGZvciBKU1ggc3ByZWFkLCBkb24ndCB1c2UgdGhpcyBmb3IgYW55dGhpbmcuXG4gIF9fc3ByZWFkOiBfX3NwcmVhZFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdDsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RDaGlsZHJlblxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFBvb2xlZENsYXNzID0gcmVxdWlyZSgnLi9Qb29sZWRDbGFzcycpO1xudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlGdW5jdGlvbicpO1xudmFyIHRyYXZlcnNlQWxsQ2hpbGRyZW4gPSByZXF1aXJlKCcuL3RyYXZlcnNlQWxsQ2hpbGRyZW4nKTtcblxudmFyIHR3b0FyZ3VtZW50UG9vbGVyID0gUG9vbGVkQ2xhc3MudHdvQXJndW1lbnRQb29sZXI7XG52YXIgZm91ckFyZ3VtZW50UG9vbGVyID0gUG9vbGVkQ2xhc3MuZm91ckFyZ3VtZW50UG9vbGVyO1xuXG52YXIgdXNlclByb3ZpZGVkS2V5RXNjYXBlUmVnZXggPSAvXFwvKy9nO1xuZnVuY3Rpb24gZXNjYXBlVXNlclByb3ZpZGVkS2V5KHRleHQpIHtcbiAgcmV0dXJuICgnJyArIHRleHQpLnJlcGxhY2UodXNlclByb3ZpZGVkS2V5RXNjYXBlUmVnZXgsICckJi8nKTtcbn1cblxuLyoqXG4gKiBQb29sZWRDbGFzcyByZXByZXNlbnRpbmcgdGhlIGJvb2trZWVwaW5nIGFzc29jaWF0ZWQgd2l0aCBwZXJmb3JtaW5nIGEgY2hpbGRcbiAqIHRyYXZlcnNhbC4gQWxsb3dzIGF2b2lkaW5nIGJpbmRpbmcgY2FsbGJhY2tzLlxuICpcbiAqIEBjb25zdHJ1Y3RvciBGb3JFYWNoQm9va0tlZXBpbmdcbiAqIEBwYXJhbSB7IWZ1bmN0aW9ufSBmb3JFYWNoRnVuY3Rpb24gRnVuY3Rpb24gdG8gcGVyZm9ybSB0cmF2ZXJzYWwgd2l0aC5cbiAqIEBwYXJhbSB7Pyp9IGZvckVhY2hDb250ZXh0IENvbnRleHQgdG8gcGVyZm9ybSBjb250ZXh0IHdpdGguXG4gKi9cbmZ1bmN0aW9uIEZvckVhY2hCb29rS2VlcGluZyhmb3JFYWNoRnVuY3Rpb24sIGZvckVhY2hDb250ZXh0KSB7XG4gIHRoaXMuZnVuYyA9IGZvckVhY2hGdW5jdGlvbjtcbiAgdGhpcy5jb250ZXh0ID0gZm9yRWFjaENvbnRleHQ7XG4gIHRoaXMuY291bnQgPSAwO1xufVxuRm9yRWFjaEJvb2tLZWVwaW5nLnByb3RvdHlwZS5kZXN0cnVjdG9yID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmZ1bmMgPSBudWxsO1xuICB0aGlzLmNvbnRleHQgPSBudWxsO1xuICB0aGlzLmNvdW50ID0gMDtcbn07XG5Qb29sZWRDbGFzcy5hZGRQb29saW5nVG8oRm9yRWFjaEJvb2tLZWVwaW5nLCB0d29Bcmd1bWVudFBvb2xlcik7XG5cbmZ1bmN0aW9uIGZvckVhY2hTaW5nbGVDaGlsZChib29rS2VlcGluZywgY2hpbGQsIG5hbWUpIHtcbiAgdmFyIGZ1bmMgPSBib29rS2VlcGluZy5mdW5jO1xuICB2YXIgY29udGV4dCA9IGJvb2tLZWVwaW5nLmNvbnRleHQ7XG5cbiAgZnVuYy5jYWxsKGNvbnRleHQsIGNoaWxkLCBib29rS2VlcGluZy5jb3VudCsrKTtcbn1cblxuLyoqXG4gKiBJdGVyYXRlcyB0aHJvdWdoIGNoaWxkcmVuIHRoYXQgYXJlIHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYC5cbiAqXG4gKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90b3AtbGV2ZWwtYXBpLmh0bWwjcmVhY3QuY2hpbGRyZW4uZm9yZWFjaFxuICpcbiAqIFRoZSBwcm92aWRlZCBmb3JFYWNoRnVuYyhjaGlsZCwgaW5kZXgpIHdpbGwgYmUgY2FsbGVkIGZvciBlYWNoXG4gKiBsZWFmIGNoaWxkLlxuICpcbiAqIEBwYXJhbSB7Pyp9IGNoaWxkcmVuIENoaWxkcmVuIHRyZWUgY29udGFpbmVyLlxuICogQHBhcmFtIHtmdW5jdGlvbigqLCBpbnQpfSBmb3JFYWNoRnVuY1xuICogQHBhcmFtIHsqfSBmb3JFYWNoQ29udGV4dCBDb250ZXh0IGZvciBmb3JFYWNoQ29udGV4dC5cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaENoaWxkcmVuKGNoaWxkcmVuLCBmb3JFYWNoRnVuYywgZm9yRWFjaENvbnRleHQpIHtcbiAgaWYgKGNoaWxkcmVuID09IG51bGwpIHtcbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cbiAgdmFyIHRyYXZlcnNlQ29udGV4dCA9IEZvckVhY2hCb29rS2VlcGluZy5nZXRQb29sZWQoZm9yRWFjaEZ1bmMsIGZvckVhY2hDb250ZXh0KTtcbiAgdHJhdmVyc2VBbGxDaGlsZHJlbihjaGlsZHJlbiwgZm9yRWFjaFNpbmdsZUNoaWxkLCB0cmF2ZXJzZUNvbnRleHQpO1xuICBGb3JFYWNoQm9va0tlZXBpbmcucmVsZWFzZSh0cmF2ZXJzZUNvbnRleHQpO1xufVxuXG4vKipcbiAqIFBvb2xlZENsYXNzIHJlcHJlc2VudGluZyB0aGUgYm9va2tlZXBpbmcgYXNzb2NpYXRlZCB3aXRoIHBlcmZvcm1pbmcgYSBjaGlsZFxuICogbWFwcGluZy4gQWxsb3dzIGF2b2lkaW5nIGJpbmRpbmcgY2FsbGJhY2tzLlxuICpcbiAqIEBjb25zdHJ1Y3RvciBNYXBCb29rS2VlcGluZ1xuICogQHBhcmFtIHshKn0gbWFwUmVzdWx0IE9iamVjdCBjb250YWluaW5nIHRoZSBvcmRlcmVkIG1hcCBvZiByZXN1bHRzLlxuICogQHBhcmFtIHshZnVuY3Rpb259IG1hcEZ1bmN0aW9uIEZ1bmN0aW9uIHRvIHBlcmZvcm0gbWFwcGluZyB3aXRoLlxuICogQHBhcmFtIHs/Kn0gbWFwQ29udGV4dCBDb250ZXh0IHRvIHBlcmZvcm0gbWFwcGluZyB3aXRoLlxuICovXG5mdW5jdGlvbiBNYXBCb29rS2VlcGluZyhtYXBSZXN1bHQsIGtleVByZWZpeCwgbWFwRnVuY3Rpb24sIG1hcENvbnRleHQpIHtcbiAgdGhpcy5yZXN1bHQgPSBtYXBSZXN1bHQ7XG4gIHRoaXMua2V5UHJlZml4ID0ga2V5UHJlZml4O1xuICB0aGlzLmZ1bmMgPSBtYXBGdW5jdGlvbjtcbiAgdGhpcy5jb250ZXh0ID0gbWFwQ29udGV4dDtcbiAgdGhpcy5jb3VudCA9IDA7XG59XG5NYXBCb29rS2VlcGluZy5wcm90b3R5cGUuZGVzdHJ1Y3RvciA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5yZXN1bHQgPSBudWxsO1xuICB0aGlzLmtleVByZWZpeCA9IG51bGw7XG4gIHRoaXMuZnVuYyA9IG51bGw7XG4gIHRoaXMuY29udGV4dCA9IG51bGw7XG4gIHRoaXMuY291bnQgPSAwO1xufTtcblBvb2xlZENsYXNzLmFkZFBvb2xpbmdUbyhNYXBCb29rS2VlcGluZywgZm91ckFyZ3VtZW50UG9vbGVyKTtcblxuZnVuY3Rpb24gbWFwU2luZ2xlQ2hpbGRJbnRvQ29udGV4dChib29rS2VlcGluZywgY2hpbGQsIGNoaWxkS2V5KSB7XG4gIHZhciByZXN1bHQgPSBib29rS2VlcGluZy5yZXN1bHQ7XG4gIHZhciBrZXlQcmVmaXggPSBib29rS2VlcGluZy5rZXlQcmVmaXg7XG4gIHZhciBmdW5jID0gYm9va0tlZXBpbmcuZnVuYztcbiAgdmFyIGNvbnRleHQgPSBib29rS2VlcGluZy5jb250ZXh0O1xuXG5cbiAgdmFyIG1hcHBlZENoaWxkID0gZnVuYy5jYWxsKGNvbnRleHQsIGNoaWxkLCBib29rS2VlcGluZy5jb3VudCsrKTtcbiAgaWYgKEFycmF5LmlzQXJyYXkobWFwcGVkQ2hpbGQpKSB7XG4gICAgbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbChtYXBwZWRDaGlsZCwgcmVzdWx0LCBjaGlsZEtleSwgZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc0FyZ3VtZW50KTtcbiAgfSBlbHNlIGlmIChtYXBwZWRDaGlsZCAhPSBudWxsKSB7XG4gICAgaWYgKFJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChtYXBwZWRDaGlsZCkpIHtcbiAgICAgIG1hcHBlZENoaWxkID0gUmVhY3RFbGVtZW50LmNsb25lQW5kUmVwbGFjZUtleShtYXBwZWRDaGlsZCxcbiAgICAgIC8vIEtlZXAgYm90aCB0aGUgKG1hcHBlZCkgYW5kIG9sZCBrZXlzIGlmIHRoZXkgZGlmZmVyLCBqdXN0IGFzXG4gICAgICAvLyB0cmF2ZXJzZUFsbENoaWxkcmVuIHVzZWQgdG8gZG8gZm9yIG9iamVjdHMgYXMgY2hpbGRyZW5cbiAgICAgIGtleVByZWZpeCArIChtYXBwZWRDaGlsZC5rZXkgJiYgKCFjaGlsZCB8fCBjaGlsZC5rZXkgIT09IG1hcHBlZENoaWxkLmtleSkgPyBlc2NhcGVVc2VyUHJvdmlkZWRLZXkobWFwcGVkQ2hpbGQua2V5KSArICcvJyA6ICcnKSArIGNoaWxkS2V5KTtcbiAgICB9XG4gICAgcmVzdWx0LnB1c2gobWFwcGVkQ2hpbGQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWwoY2hpbGRyZW4sIGFycmF5LCBwcmVmaXgsIGZ1bmMsIGNvbnRleHQpIHtcbiAgdmFyIGVzY2FwZWRQcmVmaXggPSAnJztcbiAgaWYgKHByZWZpeCAhPSBudWxsKSB7XG4gICAgZXNjYXBlZFByZWZpeCA9IGVzY2FwZVVzZXJQcm92aWRlZEtleShwcmVmaXgpICsgJy8nO1xuICB9XG4gIHZhciB0cmF2ZXJzZUNvbnRleHQgPSBNYXBCb29rS2VlcGluZy5nZXRQb29sZWQoYXJyYXksIGVzY2FwZWRQcmVmaXgsIGZ1bmMsIGNvbnRleHQpO1xuICB0cmF2ZXJzZUFsbENoaWxkcmVuKGNoaWxkcmVuLCBtYXBTaW5nbGVDaGlsZEludG9Db250ZXh0LCB0cmF2ZXJzZUNvbnRleHQpO1xuICBNYXBCb29rS2VlcGluZy5yZWxlYXNlKHRyYXZlcnNlQ29udGV4dCk7XG59XG5cbi8qKlxuICogTWFwcyBjaGlsZHJlbiB0aGF0IGFyZSB0eXBpY2FsbHkgc3BlY2lmaWVkIGFzIGBwcm9wcy5jaGlsZHJlbmAuXG4gKlxuICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvdG9wLWxldmVsLWFwaS5odG1sI3JlYWN0LmNoaWxkcmVuLm1hcFxuICpcbiAqIFRoZSBwcm92aWRlZCBtYXBGdW5jdGlvbihjaGlsZCwga2V5LCBpbmRleCkgd2lsbCBiZSBjYWxsZWQgZm9yIGVhY2hcbiAqIGxlYWYgY2hpbGQuXG4gKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBjb250YWluZXIuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKCosIGludCl9IGZ1bmMgVGhlIG1hcCBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBDb250ZXh0IGZvciBtYXBGdW5jdGlvbi5cbiAqIEByZXR1cm4ge29iamVjdH0gT2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9yZGVyZWQgbWFwIG9mIHJlc3VsdHMuXG4gKi9cbmZ1bmN0aW9uIG1hcENoaWxkcmVuKGNoaWxkcmVuLCBmdW5jLCBjb250ZXh0KSB7XG4gIGlmIChjaGlsZHJlbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbChjaGlsZHJlbiwgcmVzdWx0LCBudWxsLCBmdW5jLCBjb250ZXh0KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gZm9yRWFjaFNpbmdsZUNoaWxkRHVtbXkodHJhdmVyc2VDb250ZXh0LCBjaGlsZCwgbmFtZSkge1xuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiBDb3VudCB0aGUgbnVtYmVyIG9mIGNoaWxkcmVuIHRoYXQgYXJlIHR5cGljYWxseSBzcGVjaWZpZWQgYXNcbiAqIGBwcm9wcy5jaGlsZHJlbmAuXG4gKlxuICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvdG9wLWxldmVsLWFwaS5odG1sI3JlYWN0LmNoaWxkcmVuLmNvdW50XG4gKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBjb250YWluZXIuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgY2hpbGRyZW4uXG4gKi9cbmZ1bmN0aW9uIGNvdW50Q2hpbGRyZW4oY2hpbGRyZW4sIGNvbnRleHQpIHtcbiAgcmV0dXJuIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIGZvckVhY2hTaW5nbGVDaGlsZER1bW15LCBudWxsKTtcbn1cblxuLyoqXG4gKiBGbGF0dGVuIGEgY2hpbGRyZW4gb2JqZWN0ICh0eXBpY2FsbHkgc3BlY2lmaWVkIGFzIGBwcm9wcy5jaGlsZHJlbmApIGFuZFxuICogcmV0dXJuIGFuIGFycmF5IHdpdGggYXBwcm9wcmlhdGVseSByZS1rZXllZCBjaGlsZHJlbi5cbiAqXG4gKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90b3AtbGV2ZWwtYXBpLmh0bWwjcmVhY3QuY2hpbGRyZW4udG9hcnJheVxuICovXG5mdW5jdGlvbiB0b0FycmF5KGNoaWxkcmVuKSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbChjaGlsZHJlbiwgcmVzdWx0LCBudWxsLCBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zQXJndW1lbnQpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG52YXIgUmVhY3RDaGlsZHJlbiA9IHtcbiAgZm9yRWFjaDogZm9yRWFjaENoaWxkcmVuLFxuICBtYXA6IG1hcENoaWxkcmVuLFxuICBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsOiBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsLFxuICBjb3VudDogY291bnRDaGlsZHJlbixcbiAgdG9BcnJheTogdG9BcnJheVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdENoaWxkcmVuOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdENsYXNzXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3Byb2RJbnZhcmlhbnQgPSByZXF1aXJlKCcuL3JlYWN0UHJvZEludmFyaWFudCcpLFxuICAgIF9hc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBSZWFjdENvbXBvbmVudCA9IHJlcXVpcmUoJy4vUmVhY3RDb21wb25lbnQnKTtcbnZhciBSZWFjdEVsZW1lbnQgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudCcpO1xudmFyIFJlYWN0UHJvcFR5cGVMb2NhdGlvbnMgPSByZXF1aXJlKCcuL1JlYWN0UHJvcFR5cGVMb2NhdGlvbnMnKTtcbnZhciBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcyA9IHJlcXVpcmUoJy4vUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMnKTtcbnZhciBSZWFjdE5vb3BVcGRhdGVRdWV1ZSA9IHJlcXVpcmUoJy4vUmVhY3ROb29wVXBkYXRlUXVldWUnKTtcblxudmFyIGVtcHR5T2JqZWN0ID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlPYmplY3QnKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciBrZXlNaXJyb3IgPSByZXF1aXJlKCdmYmpzL2xpYi9rZXlNaXJyb3InKTtcbnZhciBrZXlPZiA9IHJlcXVpcmUoJ2ZianMvbGliL2tleU9mJyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxudmFyIE1JWElOU19LRVkgPSBrZXlPZih7IG1peGluczogbnVsbCB9KTtcblxuLyoqXG4gKiBQb2xpY2llcyB0aGF0IGRlc2NyaWJlIG1ldGhvZHMgaW4gYFJlYWN0Q2xhc3NJbnRlcmZhY2VgLlxuICovXG52YXIgU3BlY1BvbGljeSA9IGtleU1pcnJvcih7XG4gIC8qKlxuICAgKiBUaGVzZSBtZXRob2RzIG1heSBiZSBkZWZpbmVkIG9ubHkgb25jZSBieSB0aGUgY2xhc3Mgc3BlY2lmaWNhdGlvbiBvciBtaXhpbi5cbiAgICovXG4gIERFRklORV9PTkNFOiBudWxsLFxuICAvKipcbiAgICogVGhlc2UgbWV0aG9kcyBtYXkgYmUgZGVmaW5lZCBieSBib3RoIHRoZSBjbGFzcyBzcGVjaWZpY2F0aW9uIGFuZCBtaXhpbnMuXG4gICAqIFN1YnNlcXVlbnQgZGVmaW5pdGlvbnMgd2lsbCBiZSBjaGFpbmVkLiBUaGVzZSBtZXRob2RzIG11c3QgcmV0dXJuIHZvaWQuXG4gICAqL1xuICBERUZJTkVfTUFOWTogbnVsbCxcbiAgLyoqXG4gICAqIFRoZXNlIG1ldGhvZHMgYXJlIG92ZXJyaWRpbmcgdGhlIGJhc2UgY2xhc3MuXG4gICAqL1xuICBPVkVSUklERV9CQVNFOiBudWxsLFxuICAvKipcbiAgICogVGhlc2UgbWV0aG9kcyBhcmUgc2ltaWxhciB0byBERUZJTkVfTUFOWSwgZXhjZXB0IHdlIGFzc3VtZSB0aGV5IHJldHVyblxuICAgKiBvYmplY3RzLiBXZSB0cnkgdG8gbWVyZ2UgdGhlIGtleXMgb2YgdGhlIHJldHVybiB2YWx1ZXMgb2YgYWxsIHRoZSBtaXhlZCBpblxuICAgKiBmdW5jdGlvbnMuIElmIHRoZXJlIGlzIGEga2V5IGNvbmZsaWN0IHdlIHRocm93LlxuICAgKi9cbiAgREVGSU5FX01BTllfTUVSR0VEOiBudWxsXG59KTtcblxudmFyIGluamVjdGVkTWl4aW5zID0gW107XG5cbi8qKlxuICogQ29tcG9zaXRlIGNvbXBvbmVudHMgYXJlIGhpZ2hlci1sZXZlbCBjb21wb25lbnRzIHRoYXQgY29tcG9zZSBvdGhlciBjb21wb3NpdGVcbiAqIG9yIGhvc3QgY29tcG9uZW50cy5cbiAqXG4gKiBUbyBjcmVhdGUgYSBuZXcgdHlwZSBvZiBgUmVhY3RDbGFzc2AsIHBhc3MgYSBzcGVjaWZpY2F0aW9uIG9mXG4gKiB5b3VyIG5ldyBjbGFzcyB0byBgUmVhY3QuY3JlYXRlQ2xhc3NgLiBUaGUgb25seSByZXF1aXJlbWVudCBvZiB5b3VyIGNsYXNzXG4gKiBzcGVjaWZpY2F0aW9uIGlzIHRoYXQgeW91IGltcGxlbWVudCBhIGByZW5kZXJgIG1ldGhvZC5cbiAqXG4gKiAgIHZhciBNeUNvbXBvbmVudCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAqICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICogICAgICAgcmV0dXJuIDxkaXY+SGVsbG8gV29ybGQ8L2Rpdj47XG4gKiAgICAgfVxuICogICB9KTtcbiAqXG4gKiBUaGUgY2xhc3Mgc3BlY2lmaWNhdGlvbiBzdXBwb3J0cyBhIHNwZWNpZmljIHByb3RvY29sIG9mIG1ldGhvZHMgdGhhdCBoYXZlXG4gKiBzcGVjaWFsIG1lYW5pbmcgKGUuZy4gYHJlbmRlcmApLiBTZWUgYFJlYWN0Q2xhc3NJbnRlcmZhY2VgIGZvclxuICogbW9yZSB0aGUgY29tcHJlaGVuc2l2ZSBwcm90b2NvbC4gQW55IG90aGVyIHByb3BlcnRpZXMgYW5kIG1ldGhvZHMgaW4gdGhlXG4gKiBjbGFzcyBzcGVjaWZpY2F0aW9uIHdpbGwgYmUgYXZhaWxhYmxlIG9uIHRoZSBwcm90b3R5cGUuXG4gKlxuICogQGludGVyZmFjZSBSZWFjdENsYXNzSW50ZXJmYWNlXG4gKiBAaW50ZXJuYWxcbiAqL1xudmFyIFJlYWN0Q2xhc3NJbnRlcmZhY2UgPSB7XG5cbiAgLyoqXG4gICAqIEFuIGFycmF5IG9mIE1peGluIG9iamVjdHMgdG8gaW5jbHVkZSB3aGVuIGRlZmluaW5nIHlvdXIgY29tcG9uZW50LlxuICAgKlxuICAgKiBAdHlwZSB7YXJyYXl9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgbWl4aW5zOiBTcGVjUG9saWN5LkRFRklORV9NQU5ZLFxuXG4gIC8qKlxuICAgKiBBbiBvYmplY3QgY29udGFpbmluZyBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzIHRoYXQgc2hvdWxkIGJlIGRlZmluZWQgb25cbiAgICogdGhlIGNvbXBvbmVudCdzIGNvbnN0cnVjdG9yIGluc3RlYWQgb2YgaXRzIHByb3RvdHlwZSAoc3RhdGljIG1ldGhvZHMpLlxuICAgKlxuICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIHN0YXRpY3M6IFNwZWNQb2xpY3kuREVGSU5FX01BTlksXG5cbiAgLyoqXG4gICAqIERlZmluaXRpb24gb2YgcHJvcCB0eXBlcyBmb3IgdGhpcyBjb21wb25lbnQuXG4gICAqXG4gICAqIEB0eXBlIHtvYmplY3R9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgcHJvcFR5cGVzOiBTcGVjUG9saWN5LkRFRklORV9NQU5ZLFxuXG4gIC8qKlxuICAgKiBEZWZpbml0aW9uIG9mIGNvbnRleHQgdHlwZXMgZm9yIHRoaXMgY29tcG9uZW50LlxuICAgKlxuICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNvbnRleHRUeXBlczogU3BlY1BvbGljeS5ERUZJTkVfTUFOWSxcblxuICAvKipcbiAgICogRGVmaW5pdGlvbiBvZiBjb250ZXh0IHR5cGVzIHRoaXMgY29tcG9uZW50IHNldHMgZm9yIGl0cyBjaGlsZHJlbi5cbiAgICpcbiAgICogQHR5cGUge29iamVjdH1cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBjaGlsZENvbnRleHRUeXBlczogU3BlY1BvbGljeS5ERUZJTkVfTUFOWSxcblxuICAvLyA9PT09IERlZmluaXRpb24gbWV0aG9kcyA9PT09XG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIG1vdW50ZWQuIFZhbHVlcyBpbiB0aGUgbWFwcGluZyB3aWxsIGJlIHNldCBvblxuICAgKiBgdGhpcy5wcm9wc2AgaWYgdGhhdCBwcm9wIGlzIG5vdCBzcGVjaWZpZWQgKGkuZS4gdXNpbmcgYW4gYGluYCBjaGVjaykuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGlzIGludm9rZWQgYmVmb3JlIGBnZXRJbml0aWFsU3RhdGVgIGFuZCB0aGVyZWZvcmUgY2Fubm90IHJlbHlcbiAgICogb24gYHRoaXMuc3RhdGVgIG9yIHVzZSBgdGhpcy5zZXRTdGF0ZWAuXG4gICAqXG4gICAqIEByZXR1cm4ge29iamVjdH1cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBnZXREZWZhdWx0UHJvcHM6IFNwZWNQb2xpY3kuREVGSU5FX01BTllfTUVSR0VELFxuXG4gIC8qKlxuICAgKiBJbnZva2VkIG9uY2UgYmVmb3JlIHRoZSBjb21wb25lbnQgaXMgbW91bnRlZC4gVGhlIHJldHVybiB2YWx1ZSB3aWxsIGJlIHVzZWRcbiAgICogYXMgdGhlIGluaXRpYWwgdmFsdWUgb2YgYHRoaXMuc3RhdGVgLlxuICAgKlxuICAgKiAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAqICAgICByZXR1cm4ge1xuICAgKiAgICAgICBpc09uOiBmYWxzZSxcbiAgICogICAgICAgZm9vQmF6OiBuZXcgQmF6Rm9vKClcbiAgICogICAgIH1cbiAgICogICB9XG4gICAqXG4gICAqIEByZXR1cm4ge29iamVjdH1cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBnZXRJbml0aWFsU3RhdGU6IFNwZWNQb2xpY3kuREVGSU5FX01BTllfTUVSR0VELFxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgZ2V0Q2hpbGRDb250ZXh0OiBTcGVjUG9saWN5LkRFRklORV9NQU5ZX01FUkdFRCxcblxuICAvKipcbiAgICogVXNlcyBwcm9wcyBmcm9tIGB0aGlzLnByb3BzYCBhbmQgc3RhdGUgZnJvbSBgdGhpcy5zdGF0ZWAgdG8gcmVuZGVyIHRoZVxuICAgKiBzdHJ1Y3R1cmUgb2YgdGhlIGNvbXBvbmVudC5cbiAgICpcbiAgICogTm8gZ3VhcmFudGVlcyBhcmUgbWFkZSBhYm91dCB3aGVuIG9yIGhvdyBvZnRlbiB0aGlzIG1ldGhvZCBpcyBpbnZva2VkLCBzb1xuICAgKiBpdCBtdXN0IG5vdCBoYXZlIHNpZGUgZWZmZWN0cy5cbiAgICpcbiAgICogICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgKiAgICAgdmFyIG5hbWUgPSB0aGlzLnByb3BzLm5hbWU7XG4gICAqICAgICByZXR1cm4gPGRpdj5IZWxsbywge25hbWV9ITwvZGl2PjtcbiAgICogICB9XG4gICAqXG4gICAqIEByZXR1cm4ge1JlYWN0Q29tcG9uZW50fVxuICAgKiBAbm9zaWRlZWZmZWN0c1xuICAgKiBAcmVxdWlyZWRcbiAgICovXG4gIHJlbmRlcjogU3BlY1BvbGljeS5ERUZJTkVfT05DRSxcblxuICAvLyA9PT09IERlbGVnYXRlIG1ldGhvZHMgPT09PVxuXG4gIC8qKlxuICAgKiBJbnZva2VkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBpbml0aWFsbHkgY3JlYXRlZCBhbmQgYWJvdXQgdG8gYmUgbW91bnRlZC5cbiAgICogVGhpcyBtYXkgaGF2ZSBzaWRlIGVmZmVjdHMsIGJ1dCBhbnkgZXh0ZXJuYWwgc3Vic2NyaXB0aW9ucyBvciBkYXRhIGNyZWF0ZWRcbiAgICogYnkgdGhpcyBtZXRob2QgbXVzdCBiZSBjbGVhbmVkIHVwIGluIGBjb21wb25lbnRXaWxsVW5tb3VudGAuXG4gICAqXG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY29tcG9uZW50V2lsbE1vdW50OiBTcGVjUG9saWN5LkRFRklORV9NQU5ZLFxuXG4gIC8qKlxuICAgKiBJbnZva2VkIHdoZW4gdGhlIGNvbXBvbmVudCBoYXMgYmVlbiBtb3VudGVkIGFuZCBoYXMgYSBET00gcmVwcmVzZW50YXRpb24uXG4gICAqIEhvd2V2ZXIsIHRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IHRoZSBET00gbm9kZSBpcyBpbiB0aGUgZG9jdW1lbnQuXG4gICAqXG4gICAqIFVzZSB0aGlzIGFzIGFuIG9wcG9ydHVuaXR5IHRvIG9wZXJhdGUgb24gdGhlIERPTSB3aGVuIHRoZSBjb21wb25lbnQgaGFzXG4gICAqIGJlZW4gbW91bnRlZCAoaW5pdGlhbGl6ZWQgYW5kIHJlbmRlcmVkKSBmb3IgdGhlIGZpcnN0IHRpbWUuXG4gICAqXG4gICAqIEBwYXJhbSB7RE9NRWxlbWVudH0gcm9vdE5vZGUgRE9NIGVsZW1lbnQgcmVwcmVzZW50aW5nIHRoZSBjb21wb25lbnQuXG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY29tcG9uZW50RGlkTW91bnQ6IFNwZWNQb2xpY3kuREVGSU5FX01BTlksXG5cbiAgLyoqXG4gICAqIEludm9rZWQgYmVmb3JlIHRoZSBjb21wb25lbnQgcmVjZWl2ZXMgbmV3IHByb3BzLlxuICAgKlxuICAgKiBVc2UgdGhpcyBhcyBhbiBvcHBvcnR1bml0eSB0byByZWFjdCB0byBhIHByb3AgdHJhbnNpdGlvbiBieSB1cGRhdGluZyB0aGVcbiAgICogc3RhdGUgdXNpbmcgYHRoaXMuc2V0U3RhdGVgLiBDdXJyZW50IHByb3BzIGFyZSBhY2Nlc3NlZCB2aWEgYHRoaXMucHJvcHNgLlxuICAgKlxuICAgKiAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uKG5leHRQcm9wcywgbmV4dENvbnRleHQpIHtcbiAgICogICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgKiAgICAgICBsaWtlc0luY3JlYXNpbmc6IG5leHRQcm9wcy5saWtlQ291bnQgPiB0aGlzLnByb3BzLmxpa2VDb3VudFxuICAgKiAgICAgfSk7XG4gICAqICAgfVxuICAgKlxuICAgKiBOT1RFOiBUaGVyZSBpcyBubyBlcXVpdmFsZW50IGBjb21wb25lbnRXaWxsUmVjZWl2ZVN0YXRlYC4gQW4gaW5jb21pbmcgcHJvcFxuICAgKiB0cmFuc2l0aW9uIG1heSBjYXVzZSBhIHN0YXRlIGNoYW5nZSwgYnV0IHRoZSBvcHBvc2l0ZSBpcyBub3QgdHJ1ZS4gSWYgeW91XG4gICAqIG5lZWQgaXQsIHlvdSBhcmUgcHJvYmFibHkgbG9va2luZyBmb3IgYGNvbXBvbmVudFdpbGxVcGRhdGVgLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gbmV4dFByb3BzXG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogU3BlY1BvbGljeS5ERUZJTkVfTUFOWSxcblxuICAvKipcbiAgICogSW52b2tlZCB3aGlsZSBkZWNpZGluZyBpZiB0aGUgY29tcG9uZW50IHNob3VsZCBiZSB1cGRhdGVkIGFzIGEgcmVzdWx0IG9mXG4gICAqIHJlY2VpdmluZyBuZXcgcHJvcHMsIHN0YXRlIGFuZC9vciBjb250ZXh0LlxuICAgKlxuICAgKiBVc2UgdGhpcyBhcyBhbiBvcHBvcnR1bml0eSB0byBgcmV0dXJuIGZhbHNlYCB3aGVuIHlvdSdyZSBjZXJ0YWluIHRoYXQgdGhlXG4gICAqIHRyYW5zaXRpb24gdG8gdGhlIG5ldyBwcm9wcy9zdGF0ZS9jb250ZXh0IHdpbGwgbm90IHJlcXVpcmUgYSBjb21wb25lbnRcbiAgICogdXBkYXRlLlxuICAgKlxuICAgKiAgIHNob3VsZENvbXBvbmVudFVwZGF0ZTogZnVuY3Rpb24obmV4dFByb3BzLCBuZXh0U3RhdGUsIG5leHRDb250ZXh0KSB7XG4gICAqICAgICByZXR1cm4gIWVxdWFsKG5leHRQcm9wcywgdGhpcy5wcm9wcykgfHxcbiAgICogICAgICAgIWVxdWFsKG5leHRTdGF0ZSwgdGhpcy5zdGF0ZSkgfHxcbiAgICogICAgICAgIWVxdWFsKG5leHRDb250ZXh0LCB0aGlzLmNvbnRleHQpO1xuICAgKiAgIH1cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IG5leHRQcm9wc1xuICAgKiBAcGFyYW0gez9vYmplY3R9IG5leHRTdGF0ZVxuICAgKiBAcGFyYW0gez9vYmplY3R9IG5leHRDb250ZXh0XG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIGNvbXBvbmVudCBzaG91bGQgdXBkYXRlLlxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZTogU3BlY1BvbGljeS5ERUZJTkVfT05DRSxcblxuICAvKipcbiAgICogSW52b2tlZCB3aGVuIHRoZSBjb21wb25lbnQgaXMgYWJvdXQgdG8gdXBkYXRlIGR1ZSB0byBhIHRyYW5zaXRpb24gZnJvbVxuICAgKiBgdGhpcy5wcm9wc2AsIGB0aGlzLnN0YXRlYCBhbmQgYHRoaXMuY29udGV4dGAgdG8gYG5leHRQcm9wc2AsIGBuZXh0U3RhdGVgXG4gICAqIGFuZCBgbmV4dENvbnRleHRgLlxuICAgKlxuICAgKiBVc2UgdGhpcyBhcyBhbiBvcHBvcnR1bml0eSB0byBwZXJmb3JtIHByZXBhcmF0aW9uIGJlZm9yZSBhbiB1cGRhdGUgb2NjdXJzLlxuICAgKlxuICAgKiBOT1RFOiBZb3UgKipjYW5ub3QqKiB1c2UgYHRoaXMuc2V0U3RhdGUoKWAgaW4gdGhpcyBtZXRob2QuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBuZXh0UHJvcHNcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBuZXh0U3RhdGVcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBuZXh0Q29udGV4dFxuICAgKiBAcGFyYW0ge1JlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb259IHRyYW5zYWN0aW9uXG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY29tcG9uZW50V2lsbFVwZGF0ZTogU3BlY1BvbGljeS5ERUZJTkVfTUFOWSxcblxuICAvKipcbiAgICogSW52b2tlZCB3aGVuIHRoZSBjb21wb25lbnQncyBET00gcmVwcmVzZW50YXRpb24gaGFzIGJlZW4gdXBkYXRlZC5cbiAgICpcbiAgICogVXNlIHRoaXMgYXMgYW4gb3Bwb3J0dW5pdHkgdG8gb3BlcmF0ZSBvbiB0aGUgRE9NIHdoZW4gdGhlIGNvbXBvbmVudCBoYXNcbiAgICogYmVlbiB1cGRhdGVkLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gcHJldlByb3BzXG4gICAqIEBwYXJhbSB7P29iamVjdH0gcHJldlN0YXRlXG4gICAqIEBwYXJhbSB7P29iamVjdH0gcHJldkNvbnRleHRcbiAgICogQHBhcmFtIHtET01FbGVtZW50fSByb290Tm9kZSBET00gZWxlbWVudCByZXByZXNlbnRpbmcgdGhlIGNvbXBvbmVudC5cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBjb21wb25lbnREaWRVcGRhdGU6IFNwZWNQb2xpY3kuREVGSU5FX01BTlksXG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIGFib3V0IHRvIGJlIHJlbW92ZWQgZnJvbSBpdHMgcGFyZW50IGFuZCBoYXZlXG4gICAqIGl0cyBET00gcmVwcmVzZW50YXRpb24gZGVzdHJveWVkLlxuICAgKlxuICAgKiBVc2UgdGhpcyBhcyBhbiBvcHBvcnR1bml0eSB0byBkZWFsbG9jYXRlIGFueSBleHRlcm5hbCByZXNvdXJjZXMuXG4gICAqXG4gICAqIE5PVEU6IFRoZXJlIGlzIG5vIGBjb21wb25lbnREaWRVbm1vdW50YCBzaW5jZSB5b3VyIGNvbXBvbmVudCB3aWxsIGhhdmUgYmVlblxuICAgKiBkZXN0cm95ZWQgYnkgdGhhdCBwb2ludC5cbiAgICpcbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBjb21wb25lbnRXaWxsVW5tb3VudDogU3BlY1BvbGljeS5ERUZJTkVfTUFOWSxcblxuICAvLyA9PT09IEFkdmFuY2VkIG1ldGhvZHMgPT09PVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBjb21wb25lbnQncyBjdXJyZW50bHkgbW91bnRlZCBET00gcmVwcmVzZW50YXRpb24uXG4gICAqXG4gICAqIEJ5IGRlZmF1bHQsIHRoaXMgaW1wbGVtZW50cyBSZWFjdCdzIHJlbmRlcmluZyBhbmQgcmVjb25jaWxpYXRpb24gYWxnb3JpdGhtLlxuICAgKiBTb3BoaXN0aWNhdGVkIGNsaWVudHMgbWF5IHdpc2ggdG8gb3ZlcnJpZGUgdGhpcy5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9ufSB0cmFuc2FjdGlvblxuICAgKiBAaW50ZXJuYWxcbiAgICogQG92ZXJyaWRhYmxlXG4gICAqL1xuICB1cGRhdGVDb21wb25lbnQ6IFNwZWNQb2xpY3kuT1ZFUlJJREVfQkFTRVxuXG59O1xuXG4vKipcbiAqIE1hcHBpbmcgZnJvbSBjbGFzcyBzcGVjaWZpY2F0aW9uIGtleXMgdG8gc3BlY2lhbCBwcm9jZXNzaW5nIGZ1bmN0aW9ucy5cbiAqXG4gKiBBbHRob3VnaCB0aGVzZSBhcmUgZGVjbGFyZWQgbGlrZSBpbnN0YW5jZSBwcm9wZXJ0aWVzIGluIHRoZSBzcGVjaWZpY2F0aW9uXG4gKiB3aGVuIGRlZmluaW5nIGNsYXNzZXMgdXNpbmcgYFJlYWN0LmNyZWF0ZUNsYXNzYCwgdGhleSBhcmUgYWN0dWFsbHkgc3RhdGljXG4gKiBhbmQgYXJlIGFjY2Vzc2libGUgb24gdGhlIGNvbnN0cnVjdG9yIGluc3RlYWQgb2YgdGhlIHByb3RvdHlwZS4gRGVzcGl0ZVxuICogYmVpbmcgc3RhdGljLCB0aGV5IG11c3QgYmUgZGVmaW5lZCBvdXRzaWRlIG9mIHRoZSBcInN0YXRpY3NcIiBrZXkgdW5kZXJcbiAqIHdoaWNoIGFsbCBvdGhlciBzdGF0aWMgbWV0aG9kcyBhcmUgZGVmaW5lZC5cbiAqL1xudmFyIFJFU0VSVkVEX1NQRUNfS0VZUyA9IHtcbiAgZGlzcGxheU5hbWU6IGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgZGlzcGxheU5hbWUpIHtcbiAgICBDb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSA9IGRpc3BsYXlOYW1lO1xuICB9LFxuICBtaXhpbnM6IGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgbWl4aW5zKSB7XG4gICAgaWYgKG1peGlucykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtaXhpbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbWl4U3BlY0ludG9Db21wb25lbnQoQ29uc3RydWN0b3IsIG1peGluc1tpXSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBjaGlsZENvbnRleHRUeXBlczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBjaGlsZENvbnRleHRUeXBlcykge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YWxpZGF0ZVR5cGVEZWYoQ29uc3RydWN0b3IsIGNoaWxkQ29udGV4dFR5cGVzLCBSZWFjdFByb3BUeXBlTG9jYXRpb25zLmNoaWxkQ29udGV4dCk7XG4gICAgfVxuICAgIENvbnN0cnVjdG9yLmNoaWxkQ29udGV4dFR5cGVzID0gX2Fzc2lnbih7fSwgQ29uc3RydWN0b3IuY2hpbGRDb250ZXh0VHlwZXMsIGNoaWxkQ29udGV4dFR5cGVzKTtcbiAgfSxcbiAgY29udGV4dFR5cGVzOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIGNvbnRleHRUeXBlcykge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YWxpZGF0ZVR5cGVEZWYoQ29uc3RydWN0b3IsIGNvbnRleHRUeXBlcywgUmVhY3RQcm9wVHlwZUxvY2F0aW9ucy5jb250ZXh0KTtcbiAgICB9XG4gICAgQ29uc3RydWN0b3IuY29udGV4dFR5cGVzID0gX2Fzc2lnbih7fSwgQ29uc3RydWN0b3IuY29udGV4dFR5cGVzLCBjb250ZXh0VHlwZXMpO1xuICB9LFxuICAvKipcbiAgICogU3BlY2lhbCBjYXNlIGdldERlZmF1bHRQcm9wcyB3aGljaCBzaG91bGQgbW92ZSBpbnRvIHN0YXRpY3MgYnV0IHJlcXVpcmVzXG4gICAqIGF1dG9tYXRpYyBtZXJnaW5nLlxuICAgKi9cbiAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIGdldERlZmF1bHRQcm9wcykge1xuICAgIGlmIChDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMpIHtcbiAgICAgIENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcyA9IGNyZWF0ZU1lcmdlZFJlc3VsdEZ1bmN0aW9uKENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcywgZ2V0RGVmYXVsdFByb3BzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzID0gZ2V0RGVmYXVsdFByb3BzO1xuICAgIH1cbiAgfSxcbiAgcHJvcFR5cGVzOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3BUeXBlcykge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YWxpZGF0ZVR5cGVEZWYoQ29uc3RydWN0b3IsIHByb3BUeXBlcywgUmVhY3RQcm9wVHlwZUxvY2F0aW9ucy5wcm9wKTtcbiAgICB9XG4gICAgQ29uc3RydWN0b3IucHJvcFR5cGVzID0gX2Fzc2lnbih7fSwgQ29uc3RydWN0b3IucHJvcFR5cGVzLCBwcm9wVHlwZXMpO1xuICB9LFxuICBzdGF0aWNzOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHN0YXRpY3MpIHtcbiAgICBtaXhTdGF0aWNTcGVjSW50b0NvbXBvbmVudChDb25zdHJ1Y3Rvciwgc3RhdGljcyk7XG4gIH0sXG4gIGF1dG9iaW5kOiBmdW5jdGlvbiAoKSB7fSB9O1xuXG4vLyBub29wXG5mdW5jdGlvbiB2YWxpZGF0ZVR5cGVEZWYoQ29uc3RydWN0b3IsIHR5cGVEZWYsIGxvY2F0aW9uKSB7XG4gIGZvciAodmFyIHByb3BOYW1lIGluIHR5cGVEZWYpIHtcbiAgICBpZiAodHlwZURlZi5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcbiAgICAgIC8vIHVzZSBhIHdhcm5pbmcgaW5zdGVhZCBvZiBhbiBpbnZhcmlhbnQgc28gY29tcG9uZW50c1xuICAgICAgLy8gZG9uJ3Qgc2hvdyB1cCBpbiBwcm9kIGJ1dCBvbmx5IGluIF9fREVWX19cbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKHR5cGVvZiB0eXBlRGVmW3Byb3BOYW1lXSA9PT0gJ2Z1bmN0aW9uJywgJyVzOiAlcyB0eXBlIGAlc2AgaXMgaW52YWxpZDsgaXQgbXVzdCBiZSBhIGZ1bmN0aW9uLCB1c3VhbGx5IGZyb20gJyArICdSZWFjdC5Qcm9wVHlwZXMuJywgQ29uc3RydWN0b3IuZGlzcGxheU5hbWUgfHwgJ1JlYWN0Q2xhc3MnLCBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl0sIHByb3BOYW1lKSA6IHZvaWQgMDtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVNZXRob2RPdmVycmlkZShpc0FscmVhZHlEZWZpbmVkLCBuYW1lKSB7XG4gIHZhciBzcGVjUG9saWN5ID0gUmVhY3RDbGFzc0ludGVyZmFjZS5oYXNPd25Qcm9wZXJ0eShuYW1lKSA/IFJlYWN0Q2xhc3NJbnRlcmZhY2VbbmFtZV0gOiBudWxsO1xuXG4gIC8vIERpc2FsbG93IG92ZXJyaWRpbmcgb2YgYmFzZSBjbGFzcyBtZXRob2RzIHVubGVzcyBleHBsaWNpdGx5IGFsbG93ZWQuXG4gIGlmIChSZWFjdENsYXNzTWl4aW4uaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAhKHNwZWNQb2xpY3kgPT09IFNwZWNQb2xpY3kuT1ZFUlJJREVfQkFTRSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RDbGFzc0ludGVyZmFjZTogWW91IGFyZSBhdHRlbXB0aW5nIHRvIG92ZXJyaWRlIGAlc2AgZnJvbSB5b3VyIGNsYXNzIHNwZWNpZmljYXRpb24uIEVuc3VyZSB0aGF0IHlvdXIgbWV0aG9kIG5hbWVzIGRvIG5vdCBvdmVybGFwIHdpdGggUmVhY3QgbWV0aG9kcy4nLCBuYW1lKSA6IF9wcm9kSW52YXJpYW50KCc3MycsIG5hbWUpIDogdm9pZCAwO1xuICB9XG5cbiAgLy8gRGlzYWxsb3cgZGVmaW5pbmcgbWV0aG9kcyBtb3JlIHRoYW4gb25jZSB1bmxlc3MgZXhwbGljaXRseSBhbGxvd2VkLlxuICBpZiAoaXNBbHJlYWR5RGVmaW5lZCkge1xuICAgICEoc3BlY1BvbGljeSA9PT0gU3BlY1BvbGljeS5ERUZJTkVfTUFOWSB8fCBzcGVjUG9saWN5ID09PSBTcGVjUG9saWN5LkRFRklORV9NQU5ZX01FUkdFRCkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RDbGFzc0ludGVyZmFjZTogWW91IGFyZSBhdHRlbXB0aW5nIHRvIGRlZmluZSBgJXNgIG9uIHlvdXIgY29tcG9uZW50IG1vcmUgdGhhbiBvbmNlLiBUaGlzIGNvbmZsaWN0IG1heSBiZSBkdWUgdG8gYSBtaXhpbi4nLCBuYW1lKSA6IF9wcm9kSW52YXJpYW50KCc3NCcsIG5hbWUpIDogdm9pZCAwO1xuICB9XG59XG5cbi8qKlxuICogTWl4aW4gaGVscGVyIHdoaWNoIGhhbmRsZXMgcG9saWN5IHZhbGlkYXRpb24gYW5kIHJlc2VydmVkXG4gKiBzcGVjaWZpY2F0aW9uIGtleXMgd2hlbiBidWlsZGluZyBSZWFjdCBjbGFzc2VzLlxuICovXG5mdW5jdGlvbiBtaXhTcGVjSW50b0NvbXBvbmVudChDb25zdHJ1Y3Rvciwgc3BlYykge1xuICBpZiAoIXNwZWMpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIHR5cGVvZlNwZWMgPSB0eXBlb2Ygc3BlYztcbiAgICAgIHZhciBpc01peGluVmFsaWQgPSB0eXBlb2ZTcGVjID09PSAnb2JqZWN0JyAmJiBzcGVjICE9PSBudWxsO1xuXG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhpc01peGluVmFsaWQsICclczogWW91XFwncmUgYXR0ZW1wdGluZyB0byBpbmNsdWRlIGEgbWl4aW4gdGhhdCBpcyBlaXRoZXIgbnVsbCAnICsgJ29yIG5vdCBhbiBvYmplY3QuIENoZWNrIHRoZSBtaXhpbnMgaW5jbHVkZWQgYnkgdGhlIGNvbXBvbmVudCwgJyArICdhcyB3ZWxsIGFzIGFueSBtaXhpbnMgdGhleSBpbmNsdWRlIHRoZW1zZWx2ZXMuICcgKyAnRXhwZWN0ZWQgb2JqZWN0IGJ1dCBnb3QgJXMuJywgQ29uc3RydWN0b3IuZGlzcGxheU5hbWUgfHwgJ1JlYWN0Q2xhc3MnLCBzcGVjID09PSBudWxsID8gbnVsbCA6IHR5cGVvZlNwZWMpIDogdm9pZCAwO1xuICAgIH1cblxuICAgIHJldHVybjtcbiAgfVxuXG4gICEodHlwZW9mIHNwZWMgIT09ICdmdW5jdGlvbicpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0Q2xhc3M6IFlvdVxcJ3JlIGF0dGVtcHRpbmcgdG8gdXNlIGEgY29tcG9uZW50IGNsYXNzIG9yIGZ1bmN0aW9uIGFzIGEgbWl4aW4uIEluc3RlYWQsIGp1c3QgdXNlIGEgcmVndWxhciBvYmplY3QuJykgOiBfcHJvZEludmFyaWFudCgnNzUnKSA6IHZvaWQgMDtcbiAgISFSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQoc3BlYykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RDbGFzczogWW91XFwncmUgYXR0ZW1wdGluZyB0byB1c2UgYSBjb21wb25lbnQgYXMgYSBtaXhpbi4gSW5zdGVhZCwganVzdCB1c2UgYSByZWd1bGFyIG9iamVjdC4nKSA6IF9wcm9kSW52YXJpYW50KCc3NicpIDogdm9pZCAwO1xuXG4gIHZhciBwcm90byA9IENvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgdmFyIGF1dG9CaW5kUGFpcnMgPSBwcm90by5fX3JlYWN0QXV0b0JpbmRQYWlycztcblxuICAvLyBCeSBoYW5kbGluZyBtaXhpbnMgYmVmb3JlIGFueSBvdGhlciBwcm9wZXJ0aWVzLCB3ZSBlbnN1cmUgdGhlIHNhbWVcbiAgLy8gY2hhaW5pbmcgb3JkZXIgaXMgYXBwbGllZCB0byBtZXRob2RzIHdpdGggREVGSU5FX01BTlkgcG9saWN5LCB3aGV0aGVyXG4gIC8vIG1peGlucyBhcmUgbGlzdGVkIGJlZm9yZSBvciBhZnRlciB0aGVzZSBtZXRob2RzIGluIHRoZSBzcGVjLlxuICBpZiAoc3BlYy5oYXNPd25Qcm9wZXJ0eShNSVhJTlNfS0VZKSkge1xuICAgIFJFU0VSVkVEX1NQRUNfS0VZUy5taXhpbnMoQ29uc3RydWN0b3IsIHNwZWMubWl4aW5zKTtcbiAgfVxuXG4gIGZvciAodmFyIG5hbWUgaW4gc3BlYykge1xuICAgIGlmICghc3BlYy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKG5hbWUgPT09IE1JWElOU19LRVkpIHtcbiAgICAgIC8vIFdlIGhhdmUgYWxyZWFkeSBoYW5kbGVkIG1peGlucyBpbiBhIHNwZWNpYWwgY2FzZSBhYm92ZS5cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciBwcm9wZXJ0eSA9IHNwZWNbbmFtZV07XG4gICAgdmFyIGlzQWxyZWFkeURlZmluZWQgPSBwcm90by5oYXNPd25Qcm9wZXJ0eShuYW1lKTtcbiAgICB2YWxpZGF0ZU1ldGhvZE92ZXJyaWRlKGlzQWxyZWFkeURlZmluZWQsIG5hbWUpO1xuXG4gICAgaWYgKFJFU0VSVkVEX1NQRUNfS0VZUy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgUkVTRVJWRURfU1BFQ19LRVlTW25hbWVdKENvbnN0cnVjdG9yLCBwcm9wZXJ0eSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNldHVwIG1ldGhvZHMgb24gcHJvdG90eXBlOlxuICAgICAgLy8gVGhlIGZvbGxvd2luZyBtZW1iZXIgbWV0aG9kcyBzaG91bGQgbm90IGJlIGF1dG9tYXRpY2FsbHkgYm91bmQ6XG4gICAgICAvLyAxLiBFeHBlY3RlZCBSZWFjdENsYXNzIG1ldGhvZHMgKGluIHRoZSBcImludGVyZmFjZVwiKS5cbiAgICAgIC8vIDIuIE92ZXJyaWRkZW4gbWV0aG9kcyAodGhhdCB3ZXJlIG1peGVkIGluKS5cbiAgICAgIHZhciBpc1JlYWN0Q2xhc3NNZXRob2QgPSBSZWFjdENsYXNzSW50ZXJmYWNlLmhhc093blByb3BlcnR5KG5hbWUpO1xuICAgICAgdmFyIGlzRnVuY3Rpb24gPSB0eXBlb2YgcHJvcGVydHkgPT09ICdmdW5jdGlvbic7XG4gICAgICB2YXIgc2hvdWxkQXV0b0JpbmQgPSBpc0Z1bmN0aW9uICYmICFpc1JlYWN0Q2xhc3NNZXRob2QgJiYgIWlzQWxyZWFkeURlZmluZWQgJiYgc3BlYy5hdXRvYmluZCAhPT0gZmFsc2U7XG5cbiAgICAgIGlmIChzaG91bGRBdXRvQmluZCkge1xuICAgICAgICBhdXRvQmluZFBhaXJzLnB1c2gobmFtZSwgcHJvcGVydHkpO1xuICAgICAgICBwcm90b1tuYW1lXSA9IHByb3BlcnR5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGlzQWxyZWFkeURlZmluZWQpIHtcbiAgICAgICAgICB2YXIgc3BlY1BvbGljeSA9IFJlYWN0Q2xhc3NJbnRlcmZhY2VbbmFtZV07XG5cbiAgICAgICAgICAvLyBUaGVzZSBjYXNlcyBzaG91bGQgYWxyZWFkeSBiZSBjYXVnaHQgYnkgdmFsaWRhdGVNZXRob2RPdmVycmlkZS5cbiAgICAgICAgICAhKGlzUmVhY3RDbGFzc01ldGhvZCAmJiAoc3BlY1BvbGljeSA9PT0gU3BlY1BvbGljeS5ERUZJTkVfTUFOWV9NRVJHRUQgfHwgc3BlY1BvbGljeSA9PT0gU3BlY1BvbGljeS5ERUZJTkVfTUFOWSkpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0Q2xhc3M6IFVuZXhwZWN0ZWQgc3BlYyBwb2xpY3kgJXMgZm9yIGtleSAlcyB3aGVuIG1peGluZyBpbiBjb21wb25lbnQgc3BlY3MuJywgc3BlY1BvbGljeSwgbmFtZSkgOiBfcHJvZEludmFyaWFudCgnNzcnLCBzcGVjUG9saWN5LCBuYW1lKSA6IHZvaWQgMDtcblxuICAgICAgICAgIC8vIEZvciBtZXRob2RzIHdoaWNoIGFyZSBkZWZpbmVkIG1vcmUgdGhhbiBvbmNlLCBjYWxsIHRoZSBleGlzdGluZ1xuICAgICAgICAgIC8vIG1ldGhvZHMgYmVmb3JlIGNhbGxpbmcgdGhlIG5ldyBwcm9wZXJ0eSwgbWVyZ2luZyBpZiBhcHByb3ByaWF0ZS5cbiAgICAgICAgICBpZiAoc3BlY1BvbGljeSA9PT0gU3BlY1BvbGljeS5ERUZJTkVfTUFOWV9NRVJHRUQpIHtcbiAgICAgICAgICAgIHByb3RvW25hbWVdID0gY3JlYXRlTWVyZ2VkUmVzdWx0RnVuY3Rpb24ocHJvdG9bbmFtZV0sIHByb3BlcnR5KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNwZWNQb2xpY3kgPT09IFNwZWNQb2xpY3kuREVGSU5FX01BTlkpIHtcbiAgICAgICAgICAgIHByb3RvW25hbWVdID0gY3JlYXRlQ2hhaW5lZEZ1bmN0aW9uKHByb3RvW25hbWVdLCBwcm9wZXJ0eSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByb3RvW25hbWVdID0gcHJvcGVydHk7XG4gICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIC8vIEFkZCB2ZXJib3NlIGRpc3BsYXlOYW1lIHRvIHRoZSBmdW5jdGlvbiwgd2hpY2ggaGVscHMgd2hlbiBsb29raW5nXG4gICAgICAgICAgICAvLyBhdCBwcm9maWxpbmcgdG9vbHMuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHByb3BlcnR5ID09PSAnZnVuY3Rpb24nICYmIHNwZWMuZGlzcGxheU5hbWUpIHtcbiAgICAgICAgICAgICAgcHJvdG9bbmFtZV0uZGlzcGxheU5hbWUgPSBzcGVjLmRpc3BsYXlOYW1lICsgJ18nICsgbmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gbWl4U3RhdGljU3BlY0ludG9Db21wb25lbnQoQ29uc3RydWN0b3IsIHN0YXRpY3MpIHtcbiAgaWYgKCFzdGF0aWNzKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGZvciAodmFyIG5hbWUgaW4gc3RhdGljcykge1xuICAgIHZhciBwcm9wZXJ0eSA9IHN0YXRpY3NbbmFtZV07XG4gICAgaWYgKCFzdGF0aWNzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB2YXIgaXNSZXNlcnZlZCA9IG5hbWUgaW4gUkVTRVJWRURfU1BFQ19LRVlTO1xuICAgICEhaXNSZXNlcnZlZCA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdENsYXNzOiBZb3UgYXJlIGF0dGVtcHRpbmcgdG8gZGVmaW5lIGEgcmVzZXJ2ZWQgcHJvcGVydHksIGAlc2AsIHRoYXQgc2hvdWxkblxcJ3QgYmUgb24gdGhlIFwic3RhdGljc1wiIGtleS4gRGVmaW5lIGl0IGFzIGFuIGluc3RhbmNlIHByb3BlcnR5IGluc3RlYWQ7IGl0IHdpbGwgc3RpbGwgYmUgYWNjZXNzaWJsZSBvbiB0aGUgY29uc3RydWN0b3IuJywgbmFtZSkgOiBfcHJvZEludmFyaWFudCgnNzgnLCBuYW1lKSA6IHZvaWQgMDtcblxuICAgIHZhciBpc0luaGVyaXRlZCA9IG5hbWUgaW4gQ29uc3RydWN0b3I7XG4gICAgISFpc0luaGVyaXRlZCA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdENsYXNzOiBZb3UgYXJlIGF0dGVtcHRpbmcgdG8gZGVmaW5lIGAlc2Agb24geW91ciBjb21wb25lbnQgbW9yZSB0aGFuIG9uY2UuIFRoaXMgY29uZmxpY3QgbWF5IGJlIGR1ZSB0byBhIG1peGluLicsIG5hbWUpIDogX3Byb2RJbnZhcmlhbnQoJzc5JywgbmFtZSkgOiB2b2lkIDA7XG4gICAgQ29uc3RydWN0b3JbbmFtZV0gPSBwcm9wZXJ0eTtcbiAgfVxufVxuXG4vKipcbiAqIE1lcmdlIHR3byBvYmplY3RzLCBidXQgdGhyb3cgaWYgYm90aCBjb250YWluIHRoZSBzYW1lIGtleS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb25lIFRoZSBmaXJzdCBvYmplY3QsIHdoaWNoIGlzIG11dGF0ZWQuXG4gKiBAcGFyYW0ge29iamVjdH0gdHdvIFRoZSBzZWNvbmQgb2JqZWN0XG4gKiBAcmV0dXJuIHtvYmplY3R9IG9uZSBhZnRlciBpdCBoYXMgYmVlbiBtdXRhdGVkIHRvIGNvbnRhaW4gZXZlcnl0aGluZyBpbiB0d28uXG4gKi9cbmZ1bmN0aW9uIG1lcmdlSW50b1dpdGhOb0R1cGxpY2F0ZUtleXMob25lLCB0d28pIHtcbiAgIShvbmUgJiYgdHdvICYmIHR5cGVvZiBvbmUgPT09ICdvYmplY3QnICYmIHR5cGVvZiB0d28gPT09ICdvYmplY3QnKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdtZXJnZUludG9XaXRoTm9EdXBsaWNhdGVLZXlzKCk6IENhbm5vdCBtZXJnZSBub24tb2JqZWN0cy4nKSA6IF9wcm9kSW52YXJpYW50KCc4MCcpIDogdm9pZCAwO1xuXG4gIGZvciAodmFyIGtleSBpbiB0d28pIHtcbiAgICBpZiAodHdvLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICEob25lW2tleV0gPT09IHVuZGVmaW5lZCkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnbWVyZ2VJbnRvV2l0aE5vRHVwbGljYXRlS2V5cygpOiBUcmllZCB0byBtZXJnZSB0d28gb2JqZWN0cyB3aXRoIHRoZSBzYW1lIGtleTogYCVzYC4gVGhpcyBjb25mbGljdCBtYXkgYmUgZHVlIHRvIGEgbWl4aW47IGluIHBhcnRpY3VsYXIsIHRoaXMgbWF5IGJlIGNhdXNlZCBieSB0d28gZ2V0SW5pdGlhbFN0YXRlKCkgb3IgZ2V0RGVmYXVsdFByb3BzKCkgbWV0aG9kcyByZXR1cm5pbmcgb2JqZWN0cyB3aXRoIGNsYXNoaW5nIGtleXMuJywga2V5KSA6IF9wcm9kSW52YXJpYW50KCc4MScsIGtleSkgOiB2b2lkIDA7XG4gICAgICBvbmVba2V5XSA9IHR3b1trZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gb25lO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGludm9rZXMgdHdvIGZ1bmN0aW9ucyBhbmQgbWVyZ2VzIHRoZWlyIHJldHVybiB2YWx1ZXMuXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gb25lIEZ1bmN0aW9uIHRvIGludm9rZSBmaXJzdC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHR3byBGdW5jdGlvbiB0byBpbnZva2Ugc2Vjb25kLlxuICogQHJldHVybiB7ZnVuY3Rpb259IEZ1bmN0aW9uIHRoYXQgaW52b2tlcyB0aGUgdHdvIGFyZ3VtZW50IGZ1bmN0aW9ucy5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZU1lcmdlZFJlc3VsdEZ1bmN0aW9uKG9uZSwgdHdvKSB7XG4gIHJldHVybiBmdW5jdGlvbiBtZXJnZWRSZXN1bHQoKSB7XG4gICAgdmFyIGEgPSBvbmUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB2YXIgYiA9IHR3by5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmIChhID09IG51bGwpIHtcbiAgICAgIHJldHVybiBiO1xuICAgIH0gZWxzZSBpZiAoYiA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gYTtcbiAgICB9XG4gICAgdmFyIGMgPSB7fTtcbiAgICBtZXJnZUludG9XaXRoTm9EdXBsaWNhdGVLZXlzKGMsIGEpO1xuICAgIG1lcmdlSW50b1dpdGhOb0R1cGxpY2F0ZUtleXMoYywgYik7XG4gICAgcmV0dXJuIGM7XG4gIH07XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgaW52b2tlcyB0d28gZnVuY3Rpb25zIGFuZCBpZ25vcmVzIHRoZWlyIHJldHVybiB2YWxlcy5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBvbmUgRnVuY3Rpb24gdG8gaW52b2tlIGZpcnN0LlxuICogQHBhcmFtIHtmdW5jdGlvbn0gdHdvIEZ1bmN0aW9uIHRvIGludm9rZSBzZWNvbmQuXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn0gRnVuY3Rpb24gdGhhdCBpbnZva2VzIHRoZSB0d28gYXJndW1lbnQgZnVuY3Rpb25zLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY3JlYXRlQ2hhaW5lZEZ1bmN0aW9uKG9uZSwgdHdvKSB7XG4gIHJldHVybiBmdW5jdGlvbiBjaGFpbmVkRnVuY3Rpb24oKSB7XG4gICAgb25lLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdHdvLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbi8qKlxuICogQmluZHMgYSBtZXRob2QgdG8gdGhlIGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29tcG9uZW50IENvbXBvbmVudCB3aG9zZSBtZXRob2QgaXMgZ29pbmcgdG8gYmUgYm91bmQuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBtZXRob2QgTWV0aG9kIHRvIGJlIGJvdW5kLlxuICogQHJldHVybiB7ZnVuY3Rpb259IFRoZSBib3VuZCBtZXRob2QuXG4gKi9cbmZ1bmN0aW9uIGJpbmRBdXRvQmluZE1ldGhvZChjb21wb25lbnQsIG1ldGhvZCkge1xuICB2YXIgYm91bmRNZXRob2QgPSBtZXRob2QuYmluZChjb21wb25lbnQpO1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGJvdW5kTWV0aG9kLl9fcmVhY3RCb3VuZENvbnRleHQgPSBjb21wb25lbnQ7XG4gICAgYm91bmRNZXRob2QuX19yZWFjdEJvdW5kTWV0aG9kID0gbWV0aG9kO1xuICAgIGJvdW5kTWV0aG9kLl9fcmVhY3RCb3VuZEFyZ3VtZW50cyA9IG51bGw7XG4gICAgdmFyIGNvbXBvbmVudE5hbWUgPSBjb21wb25lbnQuY29uc3RydWN0b3IuZGlzcGxheU5hbWU7XG4gICAgdmFyIF9iaW5kID0gYm91bmRNZXRob2QuYmluZDtcbiAgICBib3VuZE1ldGhvZC5iaW5kID0gZnVuY3Rpb24gKG5ld1RoaXMpIHtcbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgLy8gVXNlciBpcyB0cnlpbmcgdG8gYmluZCgpIGFuIGF1dG9ib3VuZCBtZXRob2Q7IHdlIGVmZmVjdGl2ZWx5IHdpbGxcbiAgICAgIC8vIGlnbm9yZSB0aGUgdmFsdWUgb2YgXCJ0aGlzXCIgdGhhdCB0aGUgdXNlciBpcyB0cnlpbmcgdG8gdXNlLCBzb1xuICAgICAgLy8gbGV0J3Mgd2Fybi5cbiAgICAgIGlmIChuZXdUaGlzICE9PSBjb21wb25lbnQgJiYgbmV3VGhpcyAhPT0gbnVsbCkge1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ2JpbmQoKTogUmVhY3QgY29tcG9uZW50IG1ldGhvZHMgbWF5IG9ubHkgYmUgYm91bmQgdG8gdGhlICcgKyAnY29tcG9uZW50IGluc3RhbmNlLiBTZWUgJXMnLCBjb21wb25lbnROYW1lKSA6IHZvaWQgMDtcbiAgICAgIH0gZWxzZSBpZiAoIWFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnYmluZCgpOiBZb3UgYXJlIGJpbmRpbmcgYSBjb21wb25lbnQgbWV0aG9kIHRvIHRoZSBjb21wb25lbnQuICcgKyAnUmVhY3QgZG9lcyB0aGlzIGZvciB5b3UgYXV0b21hdGljYWxseSBpbiBhIGhpZ2gtcGVyZm9ybWFuY2UgJyArICd3YXksIHNvIHlvdSBjYW4gc2FmZWx5IHJlbW92ZSB0aGlzIGNhbGwuIFNlZSAlcycsIGNvbXBvbmVudE5hbWUpIDogdm9pZCAwO1xuICAgICAgICByZXR1cm4gYm91bmRNZXRob2Q7XG4gICAgICB9XG4gICAgICB2YXIgcmVib3VuZE1ldGhvZCA9IF9iaW5kLmFwcGx5KGJvdW5kTWV0aG9kLCBhcmd1bWVudHMpO1xuICAgICAgcmVib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRDb250ZXh0ID0gY29tcG9uZW50O1xuICAgICAgcmVib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRNZXRob2QgPSBtZXRob2Q7XG4gICAgICByZWJvdW5kTWV0aG9kLl9fcmVhY3RCb3VuZEFyZ3VtZW50cyA9IGFyZ3M7XG4gICAgICByZXR1cm4gcmVib3VuZE1ldGhvZDtcbiAgICB9O1xuICB9XG4gIHJldHVybiBib3VuZE1ldGhvZDtcbn1cblxuLyoqXG4gKiBCaW5kcyBhbGwgYXV0by1ib3VuZCBtZXRob2RzIGluIGEgY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb21wb25lbnQgQ29tcG9uZW50IHdob3NlIG1ldGhvZCBpcyBnb2luZyB0byBiZSBib3VuZC5cbiAqL1xuZnVuY3Rpb24gYmluZEF1dG9CaW5kTWV0aG9kcyhjb21wb25lbnQpIHtcbiAgdmFyIHBhaXJzID0gY29tcG9uZW50Ll9fcmVhY3RBdXRvQmluZFBhaXJzO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHBhaXJzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgdmFyIGF1dG9CaW5kS2V5ID0gcGFpcnNbaV07XG4gICAgdmFyIG1ldGhvZCA9IHBhaXJzW2kgKyAxXTtcbiAgICBjb21wb25lbnRbYXV0b0JpbmRLZXldID0gYmluZEF1dG9CaW5kTWV0aG9kKGNvbXBvbmVudCwgbWV0aG9kKTtcbiAgfVxufVxuXG4vKipcbiAqIEFkZCBtb3JlIHRvIHRoZSBSZWFjdENsYXNzIGJhc2UgY2xhc3MuIFRoZXNlIGFyZSBhbGwgbGVnYWN5IGZlYXR1cmVzIGFuZFxuICogdGhlcmVmb3JlIG5vdCBhbHJlYWR5IHBhcnQgb2YgdGhlIG1vZGVybiBSZWFjdENvbXBvbmVudC5cbiAqL1xudmFyIFJlYWN0Q2xhc3NNaXhpbiA9IHtcblxuICAvKipcbiAgICogVE9ETzogVGhpcyB3aWxsIGJlIGRlcHJlY2F0ZWQgYmVjYXVzZSBzdGF0ZSBzaG91bGQgYWx3YXlzIGtlZXAgYSBjb25zaXN0ZW50XG4gICAqIHR5cGUgc2lnbmF0dXJlIGFuZCB0aGUgb25seSB1c2UgY2FzZSBmb3IgdGhpcywgaXMgdG8gYXZvaWQgdGhhdC5cbiAgICovXG4gIHJlcGxhY2VTdGF0ZTogZnVuY3Rpb24gKG5ld1N0YXRlLCBjYWxsYmFjaykge1xuICAgIHRoaXMudXBkYXRlci5lbnF1ZXVlUmVwbGFjZVN0YXRlKHRoaXMsIG5ld1N0YXRlKTtcbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgIHRoaXMudXBkYXRlci5lbnF1ZXVlQ2FsbGJhY2sodGhpcywgY2FsbGJhY2ssICdyZXBsYWNlU3RhdGUnKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIENoZWNrcyB3aGV0aGVyIG9yIG5vdCB0aGlzIGNvbXBvc2l0ZSBjb21wb25lbnQgaXMgbW91bnRlZC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBtb3VudGVkLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqIEBwcm90ZWN0ZWRcbiAgICogQGZpbmFsXG4gICAqL1xuICBpc01vdW50ZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy51cGRhdGVyLmlzTW91bnRlZCh0aGlzKTtcbiAgfVxufTtcblxudmFyIFJlYWN0Q2xhc3NDb21wb25lbnQgPSBmdW5jdGlvbiAoKSB7fTtcbl9hc3NpZ24oUmVhY3RDbGFzc0NvbXBvbmVudC5wcm90b3R5cGUsIFJlYWN0Q29tcG9uZW50LnByb3RvdHlwZSwgUmVhY3RDbGFzc01peGluKTtcblxuLyoqXG4gKiBNb2R1bGUgZm9yIGNyZWF0aW5nIGNvbXBvc2l0ZSBjb21wb25lbnRzLlxuICpcbiAqIEBjbGFzcyBSZWFjdENsYXNzXG4gKi9cbnZhciBSZWFjdENsYXNzID0ge1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgY29tcG9zaXRlIGNvbXBvbmVudCBjbGFzcyBnaXZlbiBhIGNsYXNzIHNwZWNpZmljYXRpb24uXG4gICAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RvcC1sZXZlbC1hcGkuaHRtbCNyZWFjdC5jcmVhdGVjbGFzc1xuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gc3BlYyBDbGFzcyBzcGVjaWZpY2F0aW9uICh3aGljaCBtdXN0IGRlZmluZSBgcmVuZGVyYCkuXG4gICAqIEByZXR1cm4ge2Z1bmN0aW9ufSBDb21wb25lbnQgY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGNyZWF0ZUNsYXNzOiBmdW5jdGlvbiAoc3BlYykge1xuICAgIHZhciBDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChwcm9wcywgY29udGV4dCwgdXBkYXRlcikge1xuICAgICAgLy8gVGhpcyBjb25zdHJ1Y3RvciBnZXRzIG92ZXJyaWRkZW4gYnkgbW9ja3MuIFRoZSBhcmd1bWVudCBpcyB1c2VkXG4gICAgICAvLyBieSBtb2NrcyB0byBhc3NlcnQgb24gd2hhdCBnZXRzIG1vdW50ZWQuXG5cbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKHRoaXMgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvciwgJ1NvbWV0aGluZyBpcyBjYWxsaW5nIGEgUmVhY3QgY29tcG9uZW50IGRpcmVjdGx5LiBVc2UgYSBmYWN0b3J5IG9yICcgKyAnSlNYIGluc3RlYWQuIFNlZTogaHR0cHM6Ly9mYi5tZS9yZWFjdC1sZWdhY3lmYWN0b3J5JykgOiB2b2lkIDA7XG4gICAgICB9XG5cbiAgICAgIC8vIFdpcmUgdXAgYXV0by1iaW5kaW5nXG4gICAgICBpZiAodGhpcy5fX3JlYWN0QXV0b0JpbmRQYWlycy5sZW5ndGgpIHtcbiAgICAgICAgYmluZEF1dG9CaW5kTWV0aG9kcyh0aGlzKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgIHRoaXMucmVmcyA9IGVtcHR5T2JqZWN0O1xuICAgICAgdGhpcy51cGRhdGVyID0gdXBkYXRlciB8fCBSZWFjdE5vb3BVcGRhdGVRdWV1ZTtcblxuICAgICAgdGhpcy5zdGF0ZSA9IG51bGw7XG5cbiAgICAgIC8vIFJlYWN0Q2xhc3NlcyBkb2Vzbid0IGhhdmUgY29uc3RydWN0b3JzLiBJbnN0ZWFkLCB0aGV5IHVzZSB0aGVcbiAgICAgIC8vIGdldEluaXRpYWxTdGF0ZSBhbmQgY29tcG9uZW50V2lsbE1vdW50IG1ldGhvZHMgZm9yIGluaXRpYWxpemF0aW9uLlxuXG4gICAgICB2YXIgaW5pdGlhbFN0YXRlID0gdGhpcy5nZXRJbml0aWFsU3RhdGUgPyB0aGlzLmdldEluaXRpYWxTdGF0ZSgpIDogbnVsbDtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIC8vIFdlIGFsbG93IGF1dG8tbW9ja3MgdG8gcHJvY2VlZCBhcyBpZiB0aGV5J3JlIHJldHVybmluZyBudWxsLlxuICAgICAgICBpZiAoaW5pdGlhbFN0YXRlID09PSB1bmRlZmluZWQgJiYgdGhpcy5nZXRJbml0aWFsU3RhdGUuX2lzTW9ja0Z1bmN0aW9uKSB7XG4gICAgICAgICAgLy8gVGhpcyBpcyBwcm9iYWJseSBiYWQgcHJhY3RpY2UuIENvbnNpZGVyIHdhcm5pbmcgaGVyZSBhbmRcbiAgICAgICAgICAvLyBkZXByZWNhdGluZyB0aGlzIGNvbnZlbmllbmNlLlxuICAgICAgICAgIGluaXRpYWxTdGF0ZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgICEodHlwZW9mIGluaXRpYWxTdGF0ZSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkoaW5pdGlhbFN0YXRlKSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnJXMuZ2V0SW5pdGlhbFN0YXRlKCk6IG11c3QgcmV0dXJuIGFuIG9iamVjdCBvciBudWxsJywgQ29uc3RydWN0b3IuZGlzcGxheU5hbWUgfHwgJ1JlYWN0Q29tcG9zaXRlQ29tcG9uZW50JykgOiBfcHJvZEludmFyaWFudCgnODInLCBDb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSB8fCAnUmVhY3RDb21wb3NpdGVDb21wb25lbnQnKSA6IHZvaWQgMDtcblxuICAgICAgdGhpcy5zdGF0ZSA9IGluaXRpYWxTdGF0ZTtcbiAgICB9O1xuICAgIENvbnN0cnVjdG9yLnByb3RvdHlwZSA9IG5ldyBSZWFjdENsYXNzQ29tcG9uZW50KCk7XG4gICAgQ29uc3RydWN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ29uc3RydWN0b3I7XG4gICAgQ29uc3RydWN0b3IucHJvdG90eXBlLl9fcmVhY3RBdXRvQmluZFBhaXJzID0gW107XG5cbiAgICBpbmplY3RlZE1peGlucy5mb3JFYWNoKG1peFNwZWNJbnRvQ29tcG9uZW50LmJpbmQobnVsbCwgQ29uc3RydWN0b3IpKTtcblxuICAgIG1peFNwZWNJbnRvQ29tcG9uZW50KENvbnN0cnVjdG9yLCBzcGVjKTtcblxuICAgIC8vIEluaXRpYWxpemUgdGhlIGRlZmF1bHRQcm9wcyBwcm9wZXJ0eSBhZnRlciBhbGwgbWl4aW5zIGhhdmUgYmVlbiBtZXJnZWQuXG4gICAgaWYgKENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcykge1xuICAgICAgQ29uc3RydWN0b3IuZGVmYXVsdFByb3BzID0gQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzKCk7XG4gICAgfVxuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIC8vIFRoaXMgaXMgYSB0YWcgdG8gaW5kaWNhdGUgdGhhdCB0aGUgdXNlIG9mIHRoZXNlIG1ldGhvZCBuYW1lcyBpcyBvayxcbiAgICAgIC8vIHNpbmNlIGl0J3MgdXNlZCB3aXRoIGNyZWF0ZUNsYXNzLiBJZiBpdCdzIG5vdCwgdGhlbiBpdCdzIGxpa2VseSBhXG4gICAgICAvLyBtaXN0YWtlIHNvIHdlJ2xsIHdhcm4geW91IHRvIHVzZSB0aGUgc3RhdGljIHByb3BlcnR5LCBwcm9wZXJ0eVxuICAgICAgLy8gaW5pdGlhbGl6ZXIgb3IgY29uc3RydWN0b3IgcmVzcGVjdGl2ZWx5LlxuICAgICAgaWYgKENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcykge1xuICAgICAgICBDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMuaXNSZWFjdENsYXNzQXBwcm92ZWQgPSB7fTtcbiAgICAgIH1cbiAgICAgIGlmIChDb25zdHJ1Y3Rvci5wcm90b3R5cGUuZ2V0SW5pdGlhbFN0YXRlKSB7XG4gICAgICAgIENvbnN0cnVjdG9yLnByb3RvdHlwZS5nZXRJbml0aWFsU3RhdGUuaXNSZWFjdENsYXNzQXBwcm92ZWQgPSB7fTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAhQ29uc3RydWN0b3IucHJvdG90eXBlLnJlbmRlciA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdjcmVhdGVDbGFzcyguLi4pOiBDbGFzcyBzcGVjaWZpY2F0aW9uIG11c3QgaW1wbGVtZW50IGEgYHJlbmRlcmAgbWV0aG9kLicpIDogX3Byb2RJbnZhcmlhbnQoJzgzJykgOiB2b2lkIDA7XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoIUNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb21wb25lbnRTaG91bGRVcGRhdGUsICclcyBoYXMgYSBtZXRob2QgY2FsbGVkICcgKyAnY29tcG9uZW50U2hvdWxkVXBkYXRlKCkuIERpZCB5b3UgbWVhbiBzaG91bGRDb21wb25lbnRVcGRhdGUoKT8gJyArICdUaGUgbmFtZSBpcyBwaHJhc2VkIGFzIGEgcXVlc3Rpb24gYmVjYXVzZSB0aGUgZnVuY3Rpb24gaXMgJyArICdleHBlY3RlZCB0byByZXR1cm4gYSB2YWx1ZS4nLCBzcGVjLmRpc3BsYXlOYW1lIHx8ICdBIGNvbXBvbmVudCcpIDogdm9pZCAwO1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoIUNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb21wb25lbnRXaWxsUmVjaWV2ZVByb3BzLCAnJXMgaGFzIGEgbWV0aG9kIGNhbGxlZCAnICsgJ2NvbXBvbmVudFdpbGxSZWNpZXZlUHJvcHMoKS4gRGlkIHlvdSBtZWFuIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoKT8nLCBzcGVjLmRpc3BsYXlOYW1lIHx8ICdBIGNvbXBvbmVudCcpIDogdm9pZCAwO1xuICAgIH1cblxuICAgIC8vIFJlZHVjZSB0aW1lIHNwZW50IGRvaW5nIGxvb2t1cHMgYnkgc2V0dGluZyB0aGVzZSBvbiB0aGUgcHJvdG90eXBlLlxuICAgIGZvciAodmFyIG1ldGhvZE5hbWUgaW4gUmVhY3RDbGFzc0ludGVyZmFjZSkge1xuICAgICAgaWYgKCFDb25zdHJ1Y3Rvci5wcm90b3R5cGVbbWV0aG9kTmFtZV0pIHtcbiAgICAgICAgQ29uc3RydWN0b3IucHJvdG90eXBlW21ldGhvZE5hbWVdID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH0sXG5cbiAgaW5qZWN0aW9uOiB7XG4gICAgaW5qZWN0TWl4aW46IGZ1bmN0aW9uIChtaXhpbikge1xuICAgICAgaW5qZWN0ZWRNaXhpbnMucHVzaChtaXhpbik7XG4gICAgfVxuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RDbGFzczsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RDb21wb25lbnRcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfcHJvZEludmFyaWFudCA9IHJlcXVpcmUoJy4vcmVhY3RQcm9kSW52YXJpYW50Jyk7XG5cbnZhciBSZWFjdE5vb3BVcGRhdGVRdWV1ZSA9IHJlcXVpcmUoJy4vUmVhY3ROb29wVXBkYXRlUXVldWUnKTtcblxudmFyIGNhbkRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9jYW5EZWZpbmVQcm9wZXJ0eScpO1xudmFyIGVtcHR5T2JqZWN0ID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlPYmplY3QnKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG4vKipcbiAqIEJhc2UgY2xhc3MgaGVscGVycyBmb3IgdGhlIHVwZGF0aW5nIHN0YXRlIG9mIGEgY29tcG9uZW50LlxuICovXG5mdW5jdGlvbiBSZWFjdENvbXBvbmVudChwcm9wcywgY29udGV4dCwgdXBkYXRlcikge1xuICB0aGlzLnByb3BzID0gcHJvcHM7XG4gIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIHRoaXMucmVmcyA9IGVtcHR5T2JqZWN0O1xuICAvLyBXZSBpbml0aWFsaXplIHRoZSBkZWZhdWx0IHVwZGF0ZXIgYnV0IHRoZSByZWFsIG9uZSBnZXRzIGluamVjdGVkIGJ5IHRoZVxuICAvLyByZW5kZXJlci5cbiAgdGhpcy51cGRhdGVyID0gdXBkYXRlciB8fCBSZWFjdE5vb3BVcGRhdGVRdWV1ZTtcbn1cblxuUmVhY3RDb21wb25lbnQucHJvdG90eXBlLmlzUmVhY3RDb21wb25lbnQgPSB7fTtcblxuLyoqXG4gKiBTZXRzIGEgc3Vic2V0IG9mIHRoZSBzdGF0ZS4gQWx3YXlzIHVzZSB0aGlzIHRvIG11dGF0ZVxuICogc3RhdGUuIFlvdSBzaG91bGQgdHJlYXQgYHRoaXMuc3RhdGVgIGFzIGltbXV0YWJsZS5cbiAqXG4gKiBUaGVyZSBpcyBubyBndWFyYW50ZWUgdGhhdCBgdGhpcy5zdGF0ZWAgd2lsbCBiZSBpbW1lZGlhdGVseSB1cGRhdGVkLCBzb1xuICogYWNjZXNzaW5nIGB0aGlzLnN0YXRlYCBhZnRlciBjYWxsaW5nIHRoaXMgbWV0aG9kIG1heSByZXR1cm4gdGhlIG9sZCB2YWx1ZS5cbiAqXG4gKiBUaGVyZSBpcyBubyBndWFyYW50ZWUgdGhhdCBjYWxscyB0byBgc2V0U3RhdGVgIHdpbGwgcnVuIHN5bmNocm9ub3VzbHksXG4gKiBhcyB0aGV5IG1heSBldmVudHVhbGx5IGJlIGJhdGNoZWQgdG9nZXRoZXIuICBZb3UgY2FuIHByb3ZpZGUgYW4gb3B0aW9uYWxcbiAqIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBleGVjdXRlZCB3aGVuIHRoZSBjYWxsIHRvIHNldFN0YXRlIGlzIGFjdHVhbGx5XG4gKiBjb21wbGV0ZWQuXG4gKlxuICogV2hlbiBhIGZ1bmN0aW9uIGlzIHByb3ZpZGVkIHRvIHNldFN0YXRlLCBpdCB3aWxsIGJlIGNhbGxlZCBhdCBzb21lIHBvaW50IGluXG4gKiB0aGUgZnV0dXJlIChub3Qgc3luY2hyb25vdXNseSkuIEl0IHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlIHVwIHRvIGRhdGVcbiAqIGNvbXBvbmVudCBhcmd1bWVudHMgKHN0YXRlLCBwcm9wcywgY29udGV4dCkuIFRoZXNlIHZhbHVlcyBjYW4gYmUgZGlmZmVyZW50XG4gKiBmcm9tIHRoaXMuKiBiZWNhdXNlIHlvdXIgZnVuY3Rpb24gbWF5IGJlIGNhbGxlZCBhZnRlciByZWNlaXZlUHJvcHMgYnV0IGJlZm9yZVxuICogc2hvdWxkQ29tcG9uZW50VXBkYXRlLCBhbmQgdGhpcyBuZXcgc3RhdGUsIHByb3BzLCBhbmQgY29udGV4dCB3aWxsIG5vdCB5ZXQgYmVcbiAqIGFzc2lnbmVkIHRvIHRoaXMuXG4gKlxuICogQHBhcmFtIHtvYmplY3R8ZnVuY3Rpb259IHBhcnRpYWxTdGF0ZSBOZXh0IHBhcnRpYWwgc3RhdGUgb3IgZnVuY3Rpb24gdG9cbiAqICAgICAgICBwcm9kdWNlIG5leHQgcGFydGlhbCBzdGF0ZSB0byBiZSBtZXJnZWQgd2l0aCBjdXJyZW50IHN0YXRlLlxuICogQHBhcmFtIHs/ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxlZCBhZnRlciBzdGF0ZSBpcyB1cGRhdGVkLlxuICogQGZpbmFsXG4gKiBAcHJvdGVjdGVkXG4gKi9cblJlYWN0Q29tcG9uZW50LnByb3RvdHlwZS5zZXRTdGF0ZSA9IGZ1bmN0aW9uIChwYXJ0aWFsU3RhdGUsIGNhbGxiYWNrKSB7XG4gICEodHlwZW9mIHBhcnRpYWxTdGF0ZSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHBhcnRpYWxTdGF0ZSA9PT0gJ2Z1bmN0aW9uJyB8fCBwYXJ0aWFsU3RhdGUgPT0gbnVsbCkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnc2V0U3RhdGUoLi4uKTogdGFrZXMgYW4gb2JqZWN0IG9mIHN0YXRlIHZhcmlhYmxlcyB0byB1cGRhdGUgb3IgYSBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGFuIG9iamVjdCBvZiBzdGF0ZSB2YXJpYWJsZXMuJykgOiBfcHJvZEludmFyaWFudCgnODUnKSA6IHZvaWQgMDtcbiAgdGhpcy51cGRhdGVyLmVucXVldWVTZXRTdGF0ZSh0aGlzLCBwYXJ0aWFsU3RhdGUpO1xuICBpZiAoY2FsbGJhY2spIHtcbiAgICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZUNhbGxiYWNrKHRoaXMsIGNhbGxiYWNrLCAnc2V0U3RhdGUnKTtcbiAgfVxufTtcblxuLyoqXG4gKiBGb3JjZXMgYW4gdXBkYXRlLiBUaGlzIHNob3VsZCBvbmx5IGJlIGludm9rZWQgd2hlbiBpdCBpcyBrbm93biB3aXRoXG4gKiBjZXJ0YWludHkgdGhhdCB3ZSBhcmUgKipub3QqKiBpbiBhIERPTSB0cmFuc2FjdGlvbi5cbiAqXG4gKiBZb3UgbWF5IHdhbnQgdG8gY2FsbCB0aGlzIHdoZW4geW91IGtub3cgdGhhdCBzb21lIGRlZXBlciBhc3BlY3Qgb2YgdGhlXG4gKiBjb21wb25lbnQncyBzdGF0ZSBoYXMgY2hhbmdlZCBidXQgYHNldFN0YXRlYCB3YXMgbm90IGNhbGxlZC5cbiAqXG4gKiBUaGlzIHdpbGwgbm90IGludm9rZSBgc2hvdWxkQ29tcG9uZW50VXBkYXRlYCwgYnV0IGl0IHdpbGwgaW52b2tlXG4gKiBgY29tcG9uZW50V2lsbFVwZGF0ZWAgYW5kIGBjb21wb25lbnREaWRVcGRhdGVgLlxuICpcbiAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgdXBkYXRlIGlzIGNvbXBsZXRlLlxuICogQGZpbmFsXG4gKiBAcHJvdGVjdGVkXG4gKi9cblJlYWN0Q29tcG9uZW50LnByb3RvdHlwZS5mb3JjZVVwZGF0ZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZUZvcmNlVXBkYXRlKHRoaXMpO1xuICBpZiAoY2FsbGJhY2spIHtcbiAgICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZUNhbGxiYWNrKHRoaXMsIGNhbGxiYWNrLCAnZm9yY2VVcGRhdGUnKTtcbiAgfVxufTtcblxuLyoqXG4gKiBEZXByZWNhdGVkIEFQSXMuIFRoZXNlIEFQSXMgdXNlZCB0byBleGlzdCBvbiBjbGFzc2ljIFJlYWN0IGNsYXNzZXMgYnV0IHNpbmNlXG4gKiB3ZSB3b3VsZCBsaWtlIHRvIGRlcHJlY2F0ZSB0aGVtLCB3ZSdyZSBub3QgZ29pbmcgdG8gbW92ZSB0aGVtIG92ZXIgdG8gdGhpc1xuICogbW9kZXJuIGJhc2UgY2xhc3MuIEluc3RlYWQsIHdlIGRlZmluZSBhIGdldHRlciB0aGF0IHdhcm5zIGlmIGl0J3MgYWNjZXNzZWQuXG4gKi9cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBkZXByZWNhdGVkQVBJcyA9IHtcbiAgICBpc01vdW50ZWQ6IFsnaXNNb3VudGVkJywgJ0luc3RlYWQsIG1ha2Ugc3VyZSB0byBjbGVhbiB1cCBzdWJzY3JpcHRpb25zIGFuZCBwZW5kaW5nIHJlcXVlc3RzIGluICcgKyAnY29tcG9uZW50V2lsbFVubW91bnQgdG8gcHJldmVudCBtZW1vcnkgbGVha3MuJ10sXG4gICAgcmVwbGFjZVN0YXRlOiBbJ3JlcGxhY2VTdGF0ZScsICdSZWZhY3RvciB5b3VyIGNvZGUgdG8gdXNlIHNldFN0YXRlIGluc3RlYWQgKHNlZSAnICsgJ2h0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9pc3N1ZXMvMzIzNikuJ11cbiAgfTtcbiAgdmFyIGRlZmluZURlcHJlY2F0aW9uV2FybmluZyA9IGZ1bmN0aW9uIChtZXRob2ROYW1lLCBpbmZvKSB7XG4gICAgaWYgKGNhbkRlZmluZVByb3BlcnR5KSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVhY3RDb21wb25lbnQucHJvdG90eXBlLCBtZXRob2ROYW1lLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnJXMoLi4uKSBpcyBkZXByZWNhdGVkIGluIHBsYWluIEphdmFTY3JpcHQgUmVhY3QgY2xhc3Nlcy4gJXMnLCBpbmZvWzBdLCBpbmZvWzFdKSA6IHZvaWQgMDtcbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIGZvciAodmFyIGZuTmFtZSBpbiBkZXByZWNhdGVkQVBJcykge1xuICAgIGlmIChkZXByZWNhdGVkQVBJcy5oYXNPd25Qcm9wZXJ0eShmbk5hbWUpKSB7XG4gICAgICBkZWZpbmVEZXByZWNhdGlvbldhcm5pbmcoZm5OYW1lLCBkZXByZWNhdGVkQVBJc1tmbk5hbWVdKTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdENvbXBvbmVudDsiLCIvKipcbiAqIENvcHlyaWdodCAyMDE2LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RDb21wb25lbnRUcmVlSG9va1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9wcm9kSW52YXJpYW50ID0gcmVxdWlyZSgnLi9yZWFjdFByb2RJbnZhcmlhbnQnKTtcblxudmFyIFJlYWN0Q3VycmVudE93bmVyID0gcmVxdWlyZSgnLi9SZWFjdEN1cnJlbnRPd25lcicpO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxuZnVuY3Rpb24gaXNOYXRpdmUoZm4pIHtcbiAgLy8gQmFzZWQgb24gaXNOYXRpdmUoKSBmcm9tIExvZGFzaFxuICB2YXIgZnVuY1RvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuICB2YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICB2YXIgcmVJc05hdGl2ZSA9IFJlZ0V4cCgnXicgKyBmdW5jVG9TdHJpbmdcbiAgLy8gVGFrZSBhbiBleGFtcGxlIG5hdGl2ZSBmdW5jdGlvbiBzb3VyY2UgZm9yIGNvbXBhcmlzb25cbiAgLmNhbGwoaGFzT3duUHJvcGVydHkpXG4gIC8vIFN0cmlwIHJlZ2V4IGNoYXJhY3RlcnMgc28gd2UgY2FuIHVzZSBpdCBmb3IgcmVnZXhcbiAgLnJlcGxhY2UoL1tcXFxcXiQuKis/KClbXFxde318XS9nLCAnXFxcXCQmJylcbiAgLy8gUmVtb3ZlIGhhc093blByb3BlcnR5IGZyb20gdGhlIHRlbXBsYXRlIHRvIG1ha2UgaXQgZ2VuZXJpY1xuICAucmVwbGFjZSgvaGFzT3duUHJvcGVydHl8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCcpO1xuICB0cnkge1xuICAgIHZhciBzb3VyY2UgPSBmdW5jVG9TdHJpbmcuY2FsbChmbik7XG4gICAgcmV0dXJuIHJlSXNOYXRpdmUudGVzdChzb3VyY2UpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxudmFyIGNhblVzZUNvbGxlY3Rpb25zID1cbi8vIEFycmF5LmZyb21cbnR5cGVvZiBBcnJheS5mcm9tID09PSAnZnVuY3Rpb24nICYmXG4vLyBNYXBcbnR5cGVvZiBNYXAgPT09ICdmdW5jdGlvbicgJiYgaXNOYXRpdmUoTWFwKSAmJlxuLy8gTWFwLnByb3RvdHlwZS5rZXlzXG5NYXAucHJvdG90eXBlICE9IG51bGwgJiYgdHlwZW9mIE1hcC5wcm90b3R5cGUua2V5cyA9PT0gJ2Z1bmN0aW9uJyAmJiBpc05hdGl2ZShNYXAucHJvdG90eXBlLmtleXMpICYmXG4vLyBTZXRcbnR5cGVvZiBTZXQgPT09ICdmdW5jdGlvbicgJiYgaXNOYXRpdmUoU2V0KSAmJlxuLy8gU2V0LnByb3RvdHlwZS5rZXlzXG5TZXQucHJvdG90eXBlICE9IG51bGwgJiYgdHlwZW9mIFNldC5wcm90b3R5cGUua2V5cyA9PT0gJ2Z1bmN0aW9uJyAmJiBpc05hdGl2ZShTZXQucHJvdG90eXBlLmtleXMpO1xuXG52YXIgaXRlbU1hcDtcbnZhciByb290SURTZXQ7XG5cbnZhciBpdGVtQnlLZXk7XG52YXIgcm9vdEJ5S2V5O1xuXG5pZiAoY2FuVXNlQ29sbGVjdGlvbnMpIHtcbiAgaXRlbU1hcCA9IG5ldyBNYXAoKTtcbiAgcm9vdElEU2V0ID0gbmV3IFNldCgpO1xufSBlbHNlIHtcbiAgaXRlbUJ5S2V5ID0ge307XG4gIHJvb3RCeUtleSA9IHt9O1xufVxuXG52YXIgdW5tb3VudGVkSURzID0gW107XG5cbi8vIFVzZSBub24tbnVtZXJpYyBrZXlzIHRvIHByZXZlbnQgVjggcGVyZm9ybWFuY2UgaXNzdWVzOlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L3B1bGwvNzIzMlxuZnVuY3Rpb24gZ2V0S2V5RnJvbUlEKGlkKSB7XG4gIHJldHVybiAnLicgKyBpZDtcbn1cbmZ1bmN0aW9uIGdldElERnJvbUtleShrZXkpIHtcbiAgcmV0dXJuIHBhcnNlSW50KGtleS5zdWJzdHIoMSksIDEwKTtcbn1cblxuZnVuY3Rpb24gZ2V0KGlkKSB7XG4gIGlmIChjYW5Vc2VDb2xsZWN0aW9ucykge1xuICAgIHJldHVybiBpdGVtTWFwLmdldChpZCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGtleSA9IGdldEtleUZyb21JRChpZCk7XG4gICAgcmV0dXJuIGl0ZW1CeUtleVtrZXldO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZShpZCkge1xuICBpZiAoY2FuVXNlQ29sbGVjdGlvbnMpIHtcbiAgICBpdGVtTWFwWydkZWxldGUnXShpZCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGtleSA9IGdldEtleUZyb21JRChpZCk7XG4gICAgZGVsZXRlIGl0ZW1CeUtleVtrZXldO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZShpZCwgZWxlbWVudCwgcGFyZW50SUQpIHtcbiAgdmFyIGl0ZW0gPSB7XG4gICAgZWxlbWVudDogZWxlbWVudCxcbiAgICBwYXJlbnRJRDogcGFyZW50SUQsXG4gICAgdGV4dDogbnVsbCxcbiAgICBjaGlsZElEczogW10sXG4gICAgaXNNb3VudGVkOiBmYWxzZSxcbiAgICB1cGRhdGVDb3VudDogMFxuICB9O1xuXG4gIGlmIChjYW5Vc2VDb2xsZWN0aW9ucykge1xuICAgIGl0ZW1NYXAuc2V0KGlkLCBpdGVtKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIga2V5ID0gZ2V0S2V5RnJvbUlEKGlkKTtcbiAgICBpdGVtQnlLZXlba2V5XSA9IGl0ZW07XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkUm9vdChpZCkge1xuICBpZiAoY2FuVXNlQ29sbGVjdGlvbnMpIHtcbiAgICByb290SURTZXQuYWRkKGlkKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIga2V5ID0gZ2V0S2V5RnJvbUlEKGlkKTtcbiAgICByb290QnlLZXlba2V5XSA9IHRydWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlUm9vdChpZCkge1xuICBpZiAoY2FuVXNlQ29sbGVjdGlvbnMpIHtcbiAgICByb290SURTZXRbJ2RlbGV0ZSddKGlkKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIga2V5ID0gZ2V0S2V5RnJvbUlEKGlkKTtcbiAgICBkZWxldGUgcm9vdEJ5S2V5W2tleV07XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0UmVnaXN0ZXJlZElEcygpIHtcbiAgaWYgKGNhblVzZUNvbGxlY3Rpb25zKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oaXRlbU1hcC5rZXlzKCkpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhpdGVtQnlLZXkpLm1hcChnZXRJREZyb21LZXkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldFJvb3RJRHMoKSB7XG4gIGlmIChjYW5Vc2VDb2xsZWN0aW9ucykge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHJvb3RJRFNldC5rZXlzKCkpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhyb290QnlLZXkpLm1hcChnZXRJREZyb21LZXkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHB1cmdlRGVlcChpZCkge1xuICB2YXIgaXRlbSA9IGdldChpZCk7XG4gIGlmIChpdGVtKSB7XG4gICAgdmFyIGNoaWxkSURzID0gaXRlbS5jaGlsZElEcztcblxuICAgIHJlbW92ZShpZCk7XG4gICAgY2hpbGRJRHMuZm9yRWFjaChwdXJnZURlZXApO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRlc2NyaWJlQ29tcG9uZW50RnJhbWUobmFtZSwgc291cmNlLCBvd25lck5hbWUpIHtcbiAgcmV0dXJuICdcXG4gICAgaW4gJyArIG5hbWUgKyAoc291cmNlID8gJyAoYXQgJyArIHNvdXJjZS5maWxlTmFtZS5yZXBsYWNlKC9eLipbXFxcXFxcL10vLCAnJykgKyAnOicgKyBzb3VyY2UubGluZU51bWJlciArICcpJyA6IG93bmVyTmFtZSA/ICcgKGNyZWF0ZWQgYnkgJyArIG93bmVyTmFtZSArICcpJyA6ICcnKTtcbn1cblxuZnVuY3Rpb24gZ2V0RGlzcGxheU5hbWUoZWxlbWVudCkge1xuICBpZiAoZWxlbWVudCA9PSBudWxsKSB7XG4gICAgcmV0dXJuICcjZW1wdHknO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgZWxlbWVudCA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gJyN0ZXh0JztcbiAgfSBlbHNlIGlmICh0eXBlb2YgZWxlbWVudC50eXBlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBlbGVtZW50LnR5cGU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGVsZW1lbnQudHlwZS5kaXNwbGF5TmFtZSB8fCBlbGVtZW50LnR5cGUubmFtZSB8fCAnVW5rbm93bic7XG4gIH1cbn1cblxuZnVuY3Rpb24gZGVzY3JpYmVJRChpZCkge1xuICB2YXIgbmFtZSA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2suZ2V0RGlzcGxheU5hbWUoaWQpO1xuICB2YXIgZWxlbWVudCA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2suZ2V0RWxlbWVudChpZCk7XG4gIHZhciBvd25lcklEID0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRPd25lcklEKGlkKTtcbiAgdmFyIG93bmVyTmFtZTtcbiAgaWYgKG93bmVySUQpIHtcbiAgICBvd25lck5hbWUgPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldERpc3BsYXlOYW1lKG93bmVySUQpO1xuICB9XG4gIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGVsZW1lbnQsICdSZWFjdENvbXBvbmVudFRyZWVIb29rOiBNaXNzaW5nIFJlYWN0IGVsZW1lbnQgZm9yIGRlYnVnSUQgJXMgd2hlbiAnICsgJ2J1aWxkaW5nIHN0YWNrJywgaWQpIDogdm9pZCAwO1xuICByZXR1cm4gZGVzY3JpYmVDb21wb25lbnRGcmFtZShuYW1lLCBlbGVtZW50ICYmIGVsZW1lbnQuX3NvdXJjZSwgb3duZXJOYW1lKTtcbn1cblxudmFyIFJlYWN0Q29tcG9uZW50VHJlZUhvb2sgPSB7XG4gIG9uU2V0Q2hpbGRyZW46IGZ1bmN0aW9uIChpZCwgbmV4dENoaWxkSURzKSB7XG4gICAgdmFyIGl0ZW0gPSBnZXQoaWQpO1xuICAgIGl0ZW0uY2hpbGRJRHMgPSBuZXh0Q2hpbGRJRHM7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5leHRDaGlsZElEcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIG5leHRDaGlsZElEID0gbmV4dENoaWxkSURzW2ldO1xuICAgICAgdmFyIG5leHRDaGlsZCA9IGdldChuZXh0Q2hpbGRJRCk7XG4gICAgICAhbmV4dENoaWxkID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0V4cGVjdGVkIGhvb2sgZXZlbnRzIHRvIGZpcmUgZm9yIHRoZSBjaGlsZCBiZWZvcmUgaXRzIHBhcmVudCBpbmNsdWRlcyBpdCBpbiBvblNldENoaWxkcmVuKCkuJykgOiBfcHJvZEludmFyaWFudCgnMTQwJykgOiB2b2lkIDA7XG4gICAgICAhKG5leHRDaGlsZC5jaGlsZElEcyAhPSBudWxsIHx8IHR5cGVvZiBuZXh0Q2hpbGQuZWxlbWVudCAhPT0gJ29iamVjdCcgfHwgbmV4dENoaWxkLmVsZW1lbnQgPT0gbnVsbCkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnRXhwZWN0ZWQgb25TZXRDaGlsZHJlbigpIHRvIGZpcmUgZm9yIGEgY29udGFpbmVyIGNoaWxkIGJlZm9yZSBpdHMgcGFyZW50IGluY2x1ZGVzIGl0IGluIG9uU2V0Q2hpbGRyZW4oKS4nKSA6IF9wcm9kSW52YXJpYW50KCcxNDEnKSA6IHZvaWQgMDtcbiAgICAgICFuZXh0Q2hpbGQuaXNNb3VudGVkID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0V4cGVjdGVkIG9uTW91bnRDb21wb25lbnQoKSB0byBmaXJlIGZvciB0aGUgY2hpbGQgYmVmb3JlIGl0cyBwYXJlbnQgaW5jbHVkZXMgaXQgaW4gb25TZXRDaGlsZHJlbigpLicpIDogX3Byb2RJbnZhcmlhbnQoJzcxJykgOiB2b2lkIDA7XG4gICAgICBpZiAobmV4dENoaWxkLnBhcmVudElEID09IG51bGwpIHtcbiAgICAgICAgbmV4dENoaWxkLnBhcmVudElEID0gaWQ7XG4gICAgICAgIC8vIFRPRE86IFRoaXMgc2hvdWxkbid0IGJlIG5lY2Vzc2FyeSBidXQgbW91bnRpbmcgYSBuZXcgcm9vdCBkdXJpbmcgaW5cbiAgICAgICAgLy8gY29tcG9uZW50V2lsbE1vdW50IGN1cnJlbnRseSBjYXVzZXMgbm90LXlldC1tb3VudGVkIGNvbXBvbmVudHMgdG9cbiAgICAgICAgLy8gYmUgcHVyZ2VkIGZyb20gb3VyIHRyZWUgZGF0YSBzbyB0aGVpciBwYXJlbnQgSUQgaXMgbWlzc2luZy5cbiAgICAgIH1cbiAgICAgICEobmV4dENoaWxkLnBhcmVudElEID09PSBpZCkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnRXhwZWN0ZWQgb25CZWZvcmVNb3VudENvbXBvbmVudCgpIHBhcmVudCBhbmQgb25TZXRDaGlsZHJlbigpIHRvIGJlIGNvbnNpc3RlbnQgKCVzIGhhcyBwYXJlbnRzICVzIGFuZCAlcykuJywgbmV4dENoaWxkSUQsIG5leHRDaGlsZC5wYXJlbnRJRCwgaWQpIDogX3Byb2RJbnZhcmlhbnQoJzE0MicsIG5leHRDaGlsZElELCBuZXh0Q2hpbGQucGFyZW50SUQsIGlkKSA6IHZvaWQgMDtcbiAgICB9XG4gIH0sXG4gIG9uQmVmb3JlTW91bnRDb21wb25lbnQ6IGZ1bmN0aW9uIChpZCwgZWxlbWVudCwgcGFyZW50SUQpIHtcbiAgICBjcmVhdGUoaWQsIGVsZW1lbnQsIHBhcmVudElEKTtcbiAgfSxcbiAgb25CZWZvcmVVcGRhdGVDb21wb25lbnQ6IGZ1bmN0aW9uIChpZCwgZWxlbWVudCkge1xuICAgIHZhciBpdGVtID0gZ2V0KGlkKTtcbiAgICBpZiAoIWl0ZW0gfHwgIWl0ZW0uaXNNb3VudGVkKSB7XG4gICAgICAvLyBXZSBtYXkgZW5kIHVwIGhlcmUgYXMgYSByZXN1bHQgb2Ygc2V0U3RhdGUoKSBpbiBjb21wb25lbnRXaWxsVW5tb3VudCgpLlxuICAgICAgLy8gSW4gdGhpcyBjYXNlLCBpZ25vcmUgdGhlIGVsZW1lbnQuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGl0ZW0uZWxlbWVudCA9IGVsZW1lbnQ7XG4gIH0sXG4gIG9uTW91bnRDb21wb25lbnQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBpdGVtID0gZ2V0KGlkKTtcbiAgICBpdGVtLmlzTW91bnRlZCA9IHRydWU7XG4gICAgdmFyIGlzUm9vdCA9IGl0ZW0ucGFyZW50SUQgPT09IDA7XG4gICAgaWYgKGlzUm9vdCkge1xuICAgICAgYWRkUm9vdChpZCk7XG4gICAgfVxuICB9LFxuICBvblVwZGF0ZUNvbXBvbmVudDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGl0ZW0gPSBnZXQoaWQpO1xuICAgIGlmICghaXRlbSB8fCAhaXRlbS5pc01vdW50ZWQpIHtcbiAgICAgIC8vIFdlIG1heSBlbmQgdXAgaGVyZSBhcyBhIHJlc3VsdCBvZiBzZXRTdGF0ZSgpIGluIGNvbXBvbmVudFdpbGxVbm1vdW50KCkuXG4gICAgICAvLyBJbiB0aGlzIGNhc2UsIGlnbm9yZSB0aGUgZWxlbWVudC5cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaXRlbS51cGRhdGVDb3VudCsrO1xuICB9LFxuICBvblVubW91bnRDb21wb25lbnQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBpdGVtID0gZ2V0KGlkKTtcbiAgICBpZiAoaXRlbSkge1xuICAgICAgLy8gV2UgbmVlZCB0byBjaGVjayBpZiBpdCBleGlzdHMuXG4gICAgICAvLyBgaXRlbWAgbWlnaHQgbm90IGV4aXN0IGlmIGl0IGlzIGluc2lkZSBhbiBlcnJvciBib3VuZGFyeSwgYW5kIGEgc2libGluZ1xuICAgICAgLy8gZXJyb3IgYm91bmRhcnkgY2hpbGQgdGhyZXcgd2hpbGUgbW91bnRpbmcuIFRoZW4gdGhpcyBpbnN0YW5jZSBuZXZlclxuICAgICAgLy8gZ290IGEgY2hhbmNlIHRvIG1vdW50LCBidXQgaXQgc3RpbGwgZ2V0cyBhbiB1bm1vdW50aW5nIGV2ZW50IGR1cmluZ1xuICAgICAgLy8gdGhlIGVycm9yIGJvdW5kYXJ5IGNsZWFudXAuXG4gICAgICBpdGVtLmlzTW91bnRlZCA9IGZhbHNlO1xuICAgICAgdmFyIGlzUm9vdCA9IGl0ZW0ucGFyZW50SUQgPT09IDA7XG4gICAgICBpZiAoaXNSb290KSB7XG4gICAgICAgIHJlbW92ZVJvb3QoaWQpO1xuICAgICAgfVxuICAgIH1cbiAgICB1bm1vdW50ZWRJRHMucHVzaChpZCk7XG4gIH0sXG4gIHB1cmdlVW5tb3VudGVkQ29tcG9uZW50czogZnVuY3Rpb24gKCkge1xuICAgIGlmIChSZWFjdENvbXBvbmVudFRyZWVIb29rLl9wcmV2ZW50UHVyZ2luZykge1xuICAgICAgLy8gU2hvdWxkIG9ubHkgYmUgdXNlZCBmb3IgdGVzdGluZy5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHVubW91bnRlZElEcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkID0gdW5tb3VudGVkSURzW2ldO1xuICAgICAgcHVyZ2VEZWVwKGlkKTtcbiAgICB9XG4gICAgdW5tb3VudGVkSURzLmxlbmd0aCA9IDA7XG4gIH0sXG4gIGlzTW91bnRlZDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGl0ZW0gPSBnZXQoaWQpO1xuICAgIHJldHVybiBpdGVtID8gaXRlbS5pc01vdW50ZWQgOiBmYWxzZTtcbiAgfSxcbiAgZ2V0Q3VycmVudFN0YWNrQWRkZW5kdW06IGZ1bmN0aW9uICh0b3BFbGVtZW50KSB7XG4gICAgdmFyIGluZm8gPSAnJztcbiAgICBpZiAodG9wRWxlbWVudCkge1xuICAgICAgdmFyIHR5cGUgPSB0b3BFbGVtZW50LnR5cGU7XG4gICAgICB2YXIgbmFtZSA9IHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nID8gdHlwZS5kaXNwbGF5TmFtZSB8fCB0eXBlLm5hbWUgOiB0eXBlO1xuICAgICAgdmFyIG93bmVyID0gdG9wRWxlbWVudC5fb3duZXI7XG4gICAgICBpbmZvICs9IGRlc2NyaWJlQ29tcG9uZW50RnJhbWUobmFtZSB8fCAnVW5rbm93bicsIHRvcEVsZW1lbnQuX3NvdXJjZSwgb3duZXIgJiYgb3duZXIuZ2V0TmFtZSgpKTtcbiAgICB9XG5cbiAgICB2YXIgY3VycmVudE93bmVyID0gUmVhY3RDdXJyZW50T3duZXIuY3VycmVudDtcbiAgICB2YXIgaWQgPSBjdXJyZW50T3duZXIgJiYgY3VycmVudE93bmVyLl9kZWJ1Z0lEO1xuXG4gICAgaW5mbyArPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldFN0YWNrQWRkZW5kdW1CeUlEKGlkKTtcbiAgICByZXR1cm4gaW5mbztcbiAgfSxcbiAgZ2V0U3RhY2tBZGRlbmR1bUJ5SUQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBpbmZvID0gJyc7XG4gICAgd2hpbGUgKGlkKSB7XG4gICAgICBpbmZvICs9IGRlc2NyaWJlSUQoaWQpO1xuICAgICAgaWQgPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldFBhcmVudElEKGlkKTtcbiAgICB9XG4gICAgcmV0dXJuIGluZm87XG4gIH0sXG4gIGdldENoaWxkSURzOiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgaXRlbSA9IGdldChpZCk7XG4gICAgcmV0dXJuIGl0ZW0gPyBpdGVtLmNoaWxkSURzIDogW107XG4gIH0sXG4gIGdldERpc3BsYXlOYW1lOiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgZWxlbWVudCA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2suZ2V0RWxlbWVudChpZCk7XG4gICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGdldERpc3BsYXlOYW1lKGVsZW1lbnQpO1xuICB9LFxuICBnZXRFbGVtZW50OiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgaXRlbSA9IGdldChpZCk7XG4gICAgcmV0dXJuIGl0ZW0gPyBpdGVtLmVsZW1lbnQgOiBudWxsO1xuICB9LFxuICBnZXRPd25lcklEOiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgZWxlbWVudCA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2suZ2V0RWxlbWVudChpZCk7XG4gICAgaWYgKCFlbGVtZW50IHx8ICFlbGVtZW50Ll9vd25lcikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50Ll9vd25lci5fZGVidWdJRDtcbiAgfSxcbiAgZ2V0UGFyZW50SUQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBpdGVtID0gZ2V0KGlkKTtcbiAgICByZXR1cm4gaXRlbSA/IGl0ZW0ucGFyZW50SUQgOiBudWxsO1xuICB9LFxuICBnZXRTb3VyY2U6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBpdGVtID0gZ2V0KGlkKTtcbiAgICB2YXIgZWxlbWVudCA9IGl0ZW0gPyBpdGVtLmVsZW1lbnQgOiBudWxsO1xuICAgIHZhciBzb3VyY2UgPSBlbGVtZW50ICE9IG51bGwgPyBlbGVtZW50Ll9zb3VyY2UgOiBudWxsO1xuICAgIHJldHVybiBzb3VyY2U7XG4gIH0sXG4gIGdldFRleHQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBlbGVtZW50ID0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRFbGVtZW50KGlkKTtcbiAgICBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAnbnVtYmVyJykge1xuICAgICAgcmV0dXJuICcnICsgZWxlbWVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9LFxuICBnZXRVcGRhdGVDb3VudDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGl0ZW0gPSBnZXQoaWQpO1xuICAgIHJldHVybiBpdGVtID8gaXRlbS51cGRhdGVDb3VudCA6IDA7XG4gIH0sXG5cblxuICBnZXRSZWdpc3RlcmVkSURzOiBnZXRSZWdpc3RlcmVkSURzLFxuXG4gIGdldFJvb3RJRHM6IGdldFJvb3RJRHNcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RDb21wb25lbnRUcmVlSG9vazsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RDdXJyZW50T3duZXJcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogS2VlcHMgdHJhY2sgb2YgdGhlIGN1cnJlbnQgb3duZXIuXG4gKlxuICogVGhlIGN1cnJlbnQgb3duZXIgaXMgdGhlIGNvbXBvbmVudCB3aG8gc2hvdWxkIG93biBhbnkgY29tcG9uZW50cyB0aGF0IGFyZVxuICogY3VycmVudGx5IGJlaW5nIGNvbnN0cnVjdGVkLlxuICovXG5cbnZhciBSZWFjdEN1cnJlbnRPd25lciA9IHtcblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqIEB0eXBlIHtSZWFjdENvbXBvbmVudH1cbiAgICovXG4gIGN1cnJlbnQ6IG51bGxcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdEN1cnJlbnRPd25lcjsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RET01GYWN0b3JpZXNcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdEVsZW1lbnQgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudCcpO1xuXG4vKipcbiAqIENyZWF0ZSBhIGZhY3RvcnkgdGhhdCBjcmVhdGVzIEhUTUwgdGFnIGVsZW1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbnZhciBjcmVhdGVET01GYWN0b3J5ID0gUmVhY3RFbGVtZW50LmNyZWF0ZUZhY3Rvcnk7XG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgUmVhY3RFbGVtZW50VmFsaWRhdG9yID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnRWYWxpZGF0b3InKTtcbiAgY3JlYXRlRE9NRmFjdG9yeSA9IFJlYWN0RWxlbWVudFZhbGlkYXRvci5jcmVhdGVGYWN0b3J5O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXBwaW5nIGZyb20gc3VwcG9ydGVkIEhUTUwgdGFncyB0byBgUmVhY3RET01Db21wb25lbnRgIGNsYXNzZXMuXG4gKiBUaGlzIGlzIGFsc28gYWNjZXNzaWJsZSB2aWEgYFJlYWN0LkRPTWAuXG4gKlxuICogQHB1YmxpY1xuICovXG52YXIgUmVhY3RET01GYWN0b3JpZXMgPSB7XG4gIGE6IGNyZWF0ZURPTUZhY3RvcnkoJ2EnKSxcbiAgYWJicjogY3JlYXRlRE9NRmFjdG9yeSgnYWJicicpLFxuICBhZGRyZXNzOiBjcmVhdGVET01GYWN0b3J5KCdhZGRyZXNzJyksXG4gIGFyZWE6IGNyZWF0ZURPTUZhY3RvcnkoJ2FyZWEnKSxcbiAgYXJ0aWNsZTogY3JlYXRlRE9NRmFjdG9yeSgnYXJ0aWNsZScpLFxuICBhc2lkZTogY3JlYXRlRE9NRmFjdG9yeSgnYXNpZGUnKSxcbiAgYXVkaW86IGNyZWF0ZURPTUZhY3RvcnkoJ2F1ZGlvJyksXG4gIGI6IGNyZWF0ZURPTUZhY3RvcnkoJ2InKSxcbiAgYmFzZTogY3JlYXRlRE9NRmFjdG9yeSgnYmFzZScpLFxuICBiZGk6IGNyZWF0ZURPTUZhY3RvcnkoJ2JkaScpLFxuICBiZG86IGNyZWF0ZURPTUZhY3RvcnkoJ2JkbycpLFxuICBiaWc6IGNyZWF0ZURPTUZhY3RvcnkoJ2JpZycpLFxuICBibG9ja3F1b3RlOiBjcmVhdGVET01GYWN0b3J5KCdibG9ja3F1b3RlJyksXG4gIGJvZHk6IGNyZWF0ZURPTUZhY3RvcnkoJ2JvZHknKSxcbiAgYnI6IGNyZWF0ZURPTUZhY3RvcnkoJ2JyJyksXG4gIGJ1dHRvbjogY3JlYXRlRE9NRmFjdG9yeSgnYnV0dG9uJyksXG4gIGNhbnZhczogY3JlYXRlRE9NRmFjdG9yeSgnY2FudmFzJyksXG4gIGNhcHRpb246IGNyZWF0ZURPTUZhY3RvcnkoJ2NhcHRpb24nKSxcbiAgY2l0ZTogY3JlYXRlRE9NRmFjdG9yeSgnY2l0ZScpLFxuICBjb2RlOiBjcmVhdGVET01GYWN0b3J5KCdjb2RlJyksXG4gIGNvbDogY3JlYXRlRE9NRmFjdG9yeSgnY29sJyksXG4gIGNvbGdyb3VwOiBjcmVhdGVET01GYWN0b3J5KCdjb2xncm91cCcpLFxuICBkYXRhOiBjcmVhdGVET01GYWN0b3J5KCdkYXRhJyksXG4gIGRhdGFsaXN0OiBjcmVhdGVET01GYWN0b3J5KCdkYXRhbGlzdCcpLFxuICBkZDogY3JlYXRlRE9NRmFjdG9yeSgnZGQnKSxcbiAgZGVsOiBjcmVhdGVET01GYWN0b3J5KCdkZWwnKSxcbiAgZGV0YWlsczogY3JlYXRlRE9NRmFjdG9yeSgnZGV0YWlscycpLFxuICBkZm46IGNyZWF0ZURPTUZhY3RvcnkoJ2RmbicpLFxuICBkaWFsb2c6IGNyZWF0ZURPTUZhY3RvcnkoJ2RpYWxvZycpLFxuICBkaXY6IGNyZWF0ZURPTUZhY3RvcnkoJ2RpdicpLFxuICBkbDogY3JlYXRlRE9NRmFjdG9yeSgnZGwnKSxcbiAgZHQ6IGNyZWF0ZURPTUZhY3RvcnkoJ2R0JyksXG4gIGVtOiBjcmVhdGVET01GYWN0b3J5KCdlbScpLFxuICBlbWJlZDogY3JlYXRlRE9NRmFjdG9yeSgnZW1iZWQnKSxcbiAgZmllbGRzZXQ6IGNyZWF0ZURPTUZhY3RvcnkoJ2ZpZWxkc2V0JyksXG4gIGZpZ2NhcHRpb246IGNyZWF0ZURPTUZhY3RvcnkoJ2ZpZ2NhcHRpb24nKSxcbiAgZmlndXJlOiBjcmVhdGVET01GYWN0b3J5KCdmaWd1cmUnKSxcbiAgZm9vdGVyOiBjcmVhdGVET01GYWN0b3J5KCdmb290ZXInKSxcbiAgZm9ybTogY3JlYXRlRE9NRmFjdG9yeSgnZm9ybScpLFxuICBoMTogY3JlYXRlRE9NRmFjdG9yeSgnaDEnKSxcbiAgaDI6IGNyZWF0ZURPTUZhY3RvcnkoJ2gyJyksXG4gIGgzOiBjcmVhdGVET01GYWN0b3J5KCdoMycpLFxuICBoNDogY3JlYXRlRE9NRmFjdG9yeSgnaDQnKSxcbiAgaDU6IGNyZWF0ZURPTUZhY3RvcnkoJ2g1JyksXG4gIGg2OiBjcmVhdGVET01GYWN0b3J5KCdoNicpLFxuICBoZWFkOiBjcmVhdGVET01GYWN0b3J5KCdoZWFkJyksXG4gIGhlYWRlcjogY3JlYXRlRE9NRmFjdG9yeSgnaGVhZGVyJyksXG4gIGhncm91cDogY3JlYXRlRE9NRmFjdG9yeSgnaGdyb3VwJyksXG4gIGhyOiBjcmVhdGVET01GYWN0b3J5KCdocicpLFxuICBodG1sOiBjcmVhdGVET01GYWN0b3J5KCdodG1sJyksXG4gIGk6IGNyZWF0ZURPTUZhY3RvcnkoJ2knKSxcbiAgaWZyYW1lOiBjcmVhdGVET01GYWN0b3J5KCdpZnJhbWUnKSxcbiAgaW1nOiBjcmVhdGVET01GYWN0b3J5KCdpbWcnKSxcbiAgaW5wdXQ6IGNyZWF0ZURPTUZhY3RvcnkoJ2lucHV0JyksXG4gIGluczogY3JlYXRlRE9NRmFjdG9yeSgnaW5zJyksXG4gIGtiZDogY3JlYXRlRE9NRmFjdG9yeSgna2JkJyksXG4gIGtleWdlbjogY3JlYXRlRE9NRmFjdG9yeSgna2V5Z2VuJyksXG4gIGxhYmVsOiBjcmVhdGVET01GYWN0b3J5KCdsYWJlbCcpLFxuICBsZWdlbmQ6IGNyZWF0ZURPTUZhY3RvcnkoJ2xlZ2VuZCcpLFxuICBsaTogY3JlYXRlRE9NRmFjdG9yeSgnbGknKSxcbiAgbGluazogY3JlYXRlRE9NRmFjdG9yeSgnbGluaycpLFxuICBtYWluOiBjcmVhdGVET01GYWN0b3J5KCdtYWluJyksXG4gIG1hcDogY3JlYXRlRE9NRmFjdG9yeSgnbWFwJyksXG4gIG1hcms6IGNyZWF0ZURPTUZhY3RvcnkoJ21hcmsnKSxcbiAgbWVudTogY3JlYXRlRE9NRmFjdG9yeSgnbWVudScpLFxuICBtZW51aXRlbTogY3JlYXRlRE9NRmFjdG9yeSgnbWVudWl0ZW0nKSxcbiAgbWV0YTogY3JlYXRlRE9NRmFjdG9yeSgnbWV0YScpLFxuICBtZXRlcjogY3JlYXRlRE9NRmFjdG9yeSgnbWV0ZXInKSxcbiAgbmF2OiBjcmVhdGVET01GYWN0b3J5KCduYXYnKSxcbiAgbm9zY3JpcHQ6IGNyZWF0ZURPTUZhY3RvcnkoJ25vc2NyaXB0JyksXG4gIG9iamVjdDogY3JlYXRlRE9NRmFjdG9yeSgnb2JqZWN0JyksXG4gIG9sOiBjcmVhdGVET01GYWN0b3J5KCdvbCcpLFxuICBvcHRncm91cDogY3JlYXRlRE9NRmFjdG9yeSgnb3B0Z3JvdXAnKSxcbiAgb3B0aW9uOiBjcmVhdGVET01GYWN0b3J5KCdvcHRpb24nKSxcbiAgb3V0cHV0OiBjcmVhdGVET01GYWN0b3J5KCdvdXRwdXQnKSxcbiAgcDogY3JlYXRlRE9NRmFjdG9yeSgncCcpLFxuICBwYXJhbTogY3JlYXRlRE9NRmFjdG9yeSgncGFyYW0nKSxcbiAgcGljdHVyZTogY3JlYXRlRE9NRmFjdG9yeSgncGljdHVyZScpLFxuICBwcmU6IGNyZWF0ZURPTUZhY3RvcnkoJ3ByZScpLFxuICBwcm9ncmVzczogY3JlYXRlRE9NRmFjdG9yeSgncHJvZ3Jlc3MnKSxcbiAgcTogY3JlYXRlRE9NRmFjdG9yeSgncScpLFxuICBycDogY3JlYXRlRE9NRmFjdG9yeSgncnAnKSxcbiAgcnQ6IGNyZWF0ZURPTUZhY3RvcnkoJ3J0JyksXG4gIHJ1Ynk6IGNyZWF0ZURPTUZhY3RvcnkoJ3J1YnknKSxcbiAgczogY3JlYXRlRE9NRmFjdG9yeSgncycpLFxuICBzYW1wOiBjcmVhdGVET01GYWN0b3J5KCdzYW1wJyksXG4gIHNjcmlwdDogY3JlYXRlRE9NRmFjdG9yeSgnc2NyaXB0JyksXG4gIHNlY3Rpb246IGNyZWF0ZURPTUZhY3RvcnkoJ3NlY3Rpb24nKSxcbiAgc2VsZWN0OiBjcmVhdGVET01GYWN0b3J5KCdzZWxlY3QnKSxcbiAgc21hbGw6IGNyZWF0ZURPTUZhY3RvcnkoJ3NtYWxsJyksXG4gIHNvdXJjZTogY3JlYXRlRE9NRmFjdG9yeSgnc291cmNlJyksXG4gIHNwYW46IGNyZWF0ZURPTUZhY3RvcnkoJ3NwYW4nKSxcbiAgc3Ryb25nOiBjcmVhdGVET01GYWN0b3J5KCdzdHJvbmcnKSxcbiAgc3R5bGU6IGNyZWF0ZURPTUZhY3RvcnkoJ3N0eWxlJyksXG4gIHN1YjogY3JlYXRlRE9NRmFjdG9yeSgnc3ViJyksXG4gIHN1bW1hcnk6IGNyZWF0ZURPTUZhY3RvcnkoJ3N1bW1hcnknKSxcbiAgc3VwOiBjcmVhdGVET01GYWN0b3J5KCdzdXAnKSxcbiAgdGFibGU6IGNyZWF0ZURPTUZhY3RvcnkoJ3RhYmxlJyksXG4gIHRib2R5OiBjcmVhdGVET01GYWN0b3J5KCd0Ym9keScpLFxuICB0ZDogY3JlYXRlRE9NRmFjdG9yeSgndGQnKSxcbiAgdGV4dGFyZWE6IGNyZWF0ZURPTUZhY3RvcnkoJ3RleHRhcmVhJyksXG4gIHRmb290OiBjcmVhdGVET01GYWN0b3J5KCd0Zm9vdCcpLFxuICB0aDogY3JlYXRlRE9NRmFjdG9yeSgndGgnKSxcbiAgdGhlYWQ6IGNyZWF0ZURPTUZhY3RvcnkoJ3RoZWFkJyksXG4gIHRpbWU6IGNyZWF0ZURPTUZhY3RvcnkoJ3RpbWUnKSxcbiAgdGl0bGU6IGNyZWF0ZURPTUZhY3RvcnkoJ3RpdGxlJyksXG4gIHRyOiBjcmVhdGVET01GYWN0b3J5KCd0cicpLFxuICB0cmFjazogY3JlYXRlRE9NRmFjdG9yeSgndHJhY2snKSxcbiAgdTogY3JlYXRlRE9NRmFjdG9yeSgndScpLFxuICB1bDogY3JlYXRlRE9NRmFjdG9yeSgndWwnKSxcbiAgJ3Zhcic6IGNyZWF0ZURPTUZhY3RvcnkoJ3ZhcicpLFxuICB2aWRlbzogY3JlYXRlRE9NRmFjdG9yeSgndmlkZW8nKSxcbiAgd2JyOiBjcmVhdGVET01GYWN0b3J5KCd3YnInKSxcblxuICAvLyBTVkdcbiAgY2lyY2xlOiBjcmVhdGVET01GYWN0b3J5KCdjaXJjbGUnKSxcbiAgY2xpcFBhdGg6IGNyZWF0ZURPTUZhY3RvcnkoJ2NsaXBQYXRoJyksXG4gIGRlZnM6IGNyZWF0ZURPTUZhY3RvcnkoJ2RlZnMnKSxcbiAgZWxsaXBzZTogY3JlYXRlRE9NRmFjdG9yeSgnZWxsaXBzZScpLFxuICBnOiBjcmVhdGVET01GYWN0b3J5KCdnJyksXG4gIGltYWdlOiBjcmVhdGVET01GYWN0b3J5KCdpbWFnZScpLFxuICBsaW5lOiBjcmVhdGVET01GYWN0b3J5KCdsaW5lJyksXG4gIGxpbmVhckdyYWRpZW50OiBjcmVhdGVET01GYWN0b3J5KCdsaW5lYXJHcmFkaWVudCcpLFxuICBtYXNrOiBjcmVhdGVET01GYWN0b3J5KCdtYXNrJyksXG4gIHBhdGg6IGNyZWF0ZURPTUZhY3RvcnkoJ3BhdGgnKSxcbiAgcGF0dGVybjogY3JlYXRlRE9NRmFjdG9yeSgncGF0dGVybicpLFxuICBwb2x5Z29uOiBjcmVhdGVET01GYWN0b3J5KCdwb2x5Z29uJyksXG4gIHBvbHlsaW5lOiBjcmVhdGVET01GYWN0b3J5KCdwb2x5bGluZScpLFxuICByYWRpYWxHcmFkaWVudDogY3JlYXRlRE9NRmFjdG9yeSgncmFkaWFsR3JhZGllbnQnKSxcbiAgcmVjdDogY3JlYXRlRE9NRmFjdG9yeSgncmVjdCcpLFxuICBzdG9wOiBjcmVhdGVET01GYWN0b3J5KCdzdG9wJyksXG4gIHN2ZzogY3JlYXRlRE9NRmFjdG9yeSgnc3ZnJyksXG4gIHRleHQ6IGNyZWF0ZURPTUZhY3RvcnkoJ3RleHQnKSxcbiAgdHNwYW46IGNyZWF0ZURPTUZhY3RvcnkoJ3RzcGFuJylcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RET01GYWN0b3JpZXM7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0RWxlbWVudFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9hc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBSZWFjdEN1cnJlbnRPd25lciA9IHJlcXVpcmUoJy4vUmVhY3RDdXJyZW50T3duZXInKTtcblxudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG52YXIgY2FuRGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL2NhbkRlZmluZVByb3BlcnR5Jyk7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4vLyBUaGUgU3ltYm9sIHVzZWQgdG8gdGFnIHRoZSBSZWFjdEVsZW1lbnQgdHlwZS4gSWYgdGhlcmUgaXMgbm8gbmF0aXZlIFN5bWJvbFxuLy8gbm9yIHBvbHlmaWxsLCB0aGVuIGEgcGxhaW4gbnVtYmVyIGlzIHVzZWQgZm9yIHBlcmZvcm1hbmNlLlxudmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sWydmb3InXSAmJiBTeW1ib2xbJ2ZvciddKCdyZWFjdC5lbGVtZW50JykgfHwgMHhlYWM3O1xuXG52YXIgUkVTRVJWRURfUFJPUFMgPSB7XG4gIGtleTogdHJ1ZSxcbiAgcmVmOiB0cnVlLFxuICBfX3NlbGY6IHRydWUsXG4gIF9fc291cmNlOiB0cnVlXG59O1xuXG52YXIgc3BlY2lhbFByb3BLZXlXYXJuaW5nU2hvd24sIHNwZWNpYWxQcm9wUmVmV2FybmluZ1Nob3duO1xuXG5mdW5jdGlvbiBoYXNWYWxpZFJlZihjb25maWcpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsICdyZWYnKSkge1xuICAgICAgdmFyIGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY29uZmlnLCAncmVmJykuZ2V0O1xuICAgICAgaWYgKGdldHRlciAmJiBnZXR0ZXIuaXNSZWFjdFdhcm5pbmcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gY29uZmlnLnJlZiAhPT0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBoYXNWYWxpZEtleShjb25maWcpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsICdrZXknKSkge1xuICAgICAgdmFyIGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY29uZmlnLCAna2V5JykuZ2V0O1xuICAgICAgaWYgKGdldHRlciAmJiBnZXR0ZXIuaXNSZWFjdFdhcm5pbmcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gY29uZmlnLmtleSAhPT0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBkZWZpbmVLZXlQcm9wV2FybmluZ0dldHRlcihwcm9wcywgZGlzcGxheU5hbWUpIHtcbiAgdmFyIHdhcm5BYm91dEFjY2Vzc2luZ0tleSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXNwZWNpYWxQcm9wS2V5V2FybmluZ1Nob3duKSB7XG4gICAgICBzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93biA9IHRydWU7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJyVzOiBga2V5YCBpcyBub3QgYSBwcm9wLiBUcnlpbmcgdG8gYWNjZXNzIGl0IHdpbGwgcmVzdWx0ICcgKyAnaW4gYHVuZGVmaW5lZGAgYmVpbmcgcmV0dXJuZWQuIElmIHlvdSBuZWVkIHRvIGFjY2VzcyB0aGUgc2FtZSAnICsgJ3ZhbHVlIHdpdGhpbiB0aGUgY2hpbGQgY29tcG9uZW50LCB5b3Ugc2hvdWxkIHBhc3MgaXQgYXMgYSBkaWZmZXJlbnQgJyArICdwcm9wLiAoaHR0cHM6Ly9mYi5tZS9yZWFjdC1zcGVjaWFsLXByb3BzKScsIGRpc3BsYXlOYW1lKSA6IHZvaWQgMDtcbiAgICB9XG4gIH07XG4gIHdhcm5BYm91dEFjY2Vzc2luZ0tleS5pc1JlYWN0V2FybmluZyA9IHRydWU7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm9wcywgJ2tleScsIHtcbiAgICBnZXQ6IHdhcm5BYm91dEFjY2Vzc2luZ0tleSxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGRlZmluZVJlZlByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSkge1xuICB2YXIgd2FybkFib3V0QWNjZXNzaW5nUmVmID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghc3BlY2lhbFByb3BSZWZXYXJuaW5nU2hvd24pIHtcbiAgICAgIHNwZWNpYWxQcm9wUmVmV2FybmluZ1Nob3duID0gdHJ1ZTtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnJXM6IGByZWZgIGlzIG5vdCBhIHByb3AuIFRyeWluZyB0byBhY2Nlc3MgaXQgd2lsbCByZXN1bHQgJyArICdpbiBgdW5kZWZpbmVkYCBiZWluZyByZXR1cm5lZC4gSWYgeW91IG5lZWQgdG8gYWNjZXNzIHRoZSBzYW1lICcgKyAndmFsdWUgd2l0aGluIHRoZSBjaGlsZCBjb21wb25lbnQsIHlvdSBzaG91bGQgcGFzcyBpdCBhcyBhIGRpZmZlcmVudCAnICsgJ3Byb3AuIChodHRwczovL2ZiLm1lL3JlYWN0LXNwZWNpYWwtcHJvcHMpJywgZGlzcGxheU5hbWUpIDogdm9pZCAwO1xuICAgIH1cbiAgfTtcbiAgd2FybkFib3V0QWNjZXNzaW5nUmVmLmlzUmVhY3RXYXJuaW5nID0gdHJ1ZTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3BzLCAncmVmJywge1xuICAgIGdldDogd2FybkFib3V0QWNjZXNzaW5nUmVmLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbn1cblxuLyoqXG4gKiBGYWN0b3J5IG1ldGhvZCB0byBjcmVhdGUgYSBuZXcgUmVhY3QgZWxlbWVudC4gVGhpcyBubyBsb25nZXIgYWRoZXJlcyB0b1xuICogdGhlIGNsYXNzIHBhdHRlcm4sIHNvIGRvIG5vdCB1c2UgbmV3IHRvIGNhbGwgaXQuIEFsc28sIG5vIGluc3RhbmNlb2YgY2hlY2tcbiAqIHdpbGwgd29yay4gSW5zdGVhZCB0ZXN0ICQkdHlwZW9mIGZpZWxkIGFnYWluc3QgU3ltYm9sLmZvcigncmVhY3QuZWxlbWVudCcpIHRvIGNoZWNrXG4gKiBpZiBzb21ldGhpbmcgaXMgYSBSZWFjdCBFbGVtZW50LlxuICpcbiAqIEBwYXJhbSB7Kn0gdHlwZVxuICogQHBhcmFtIHsqfSBrZXlcbiAqIEBwYXJhbSB7c3RyaW5nfG9iamVjdH0gcmVmXG4gKiBAcGFyYW0geyp9IHNlbGYgQSAqdGVtcG9yYXJ5KiBoZWxwZXIgdG8gZGV0ZWN0IHBsYWNlcyB3aGVyZSBgdGhpc2AgaXNcbiAqIGRpZmZlcmVudCBmcm9tIHRoZSBgb3duZXJgIHdoZW4gUmVhY3QuY3JlYXRlRWxlbWVudCBpcyBjYWxsZWQsIHNvIHRoYXQgd2VcbiAqIGNhbiB3YXJuLiBXZSB3YW50IHRvIGdldCByaWQgb2Ygb3duZXIgYW5kIHJlcGxhY2Ugc3RyaW5nIGByZWZgcyB3aXRoIGFycm93XG4gKiBmdW5jdGlvbnMsIGFuZCBhcyBsb25nIGFzIGB0aGlzYCBhbmQgb3duZXIgYXJlIHRoZSBzYW1lLCB0aGVyZSB3aWxsIGJlIG5vXG4gKiBjaGFuZ2UgaW4gYmVoYXZpb3IuXG4gKiBAcGFyYW0geyp9IHNvdXJjZSBBbiBhbm5vdGF0aW9uIG9iamVjdCAoYWRkZWQgYnkgYSB0cmFuc3BpbGVyIG9yIG90aGVyd2lzZSlcbiAqIGluZGljYXRpbmcgZmlsZW5hbWUsIGxpbmUgbnVtYmVyLCBhbmQvb3Igb3RoZXIgaW5mb3JtYXRpb24uXG4gKiBAcGFyYW0geyp9IG93bmVyXG4gKiBAcGFyYW0geyp9IHByb3BzXG4gKiBAaW50ZXJuYWxcbiAqL1xudmFyIFJlYWN0RWxlbWVudCA9IGZ1bmN0aW9uICh0eXBlLCBrZXksIHJlZiwgc2VsZiwgc291cmNlLCBvd25lciwgcHJvcHMpIHtcbiAgdmFyIGVsZW1lbnQgPSB7XG4gICAgLy8gVGhpcyB0YWcgYWxsb3cgdXMgdG8gdW5pcXVlbHkgaWRlbnRpZnkgdGhpcyBhcyBhIFJlYWN0IEVsZW1lbnRcbiAgICAkJHR5cGVvZjogUkVBQ1RfRUxFTUVOVF9UWVBFLFxuXG4gICAgLy8gQnVpbHQtaW4gcHJvcGVydGllcyB0aGF0IGJlbG9uZyBvbiB0aGUgZWxlbWVudFxuICAgIHR5cGU6IHR5cGUsXG4gICAga2V5OiBrZXksXG4gICAgcmVmOiByZWYsXG4gICAgcHJvcHM6IHByb3BzLFxuXG4gICAgLy8gUmVjb3JkIHRoZSBjb21wb25lbnQgcmVzcG9uc2libGUgZm9yIGNyZWF0aW5nIHRoaXMgZWxlbWVudC5cbiAgICBfb3duZXI6IG93bmVyXG4gIH07XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAvLyBUaGUgdmFsaWRhdGlvbiBmbGFnIGlzIGN1cnJlbnRseSBtdXRhdGl2ZS4gV2UgcHV0IGl0IG9uXG4gICAgLy8gYW4gZXh0ZXJuYWwgYmFja2luZyBzdG9yZSBzbyB0aGF0IHdlIGNhbiBmcmVlemUgdGhlIHdob2xlIG9iamVjdC5cbiAgICAvLyBUaGlzIGNhbiBiZSByZXBsYWNlZCB3aXRoIGEgV2Vha01hcCBvbmNlIHRoZXkgYXJlIGltcGxlbWVudGVkIGluXG4gICAgLy8gY29tbW9ubHkgdXNlZCBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMuXG4gICAgZWxlbWVudC5fc3RvcmUgPSB7fTtcbiAgICB2YXIgc2hhZG93Q2hpbGRyZW4gPSBBcnJheS5pc0FycmF5KHByb3BzLmNoaWxkcmVuKSA/IHByb3BzLmNoaWxkcmVuLnNsaWNlKDApIDogcHJvcHMuY2hpbGRyZW47XG5cbiAgICAvLyBUbyBtYWtlIGNvbXBhcmluZyBSZWFjdEVsZW1lbnRzIGVhc2llciBmb3IgdGVzdGluZyBwdXJwb3Nlcywgd2UgbWFrZVxuICAgIC8vIHRoZSB2YWxpZGF0aW9uIGZsYWcgbm9uLWVudW1lcmFibGUgKHdoZXJlIHBvc3NpYmxlLCB3aGljaCBzaG91bGRcbiAgICAvLyBpbmNsdWRlIGV2ZXJ5IGVudmlyb25tZW50IHdlIHJ1biB0ZXN0cyBpbiksIHNvIHRoZSB0ZXN0IGZyYW1ld29ya1xuICAgIC8vIGlnbm9yZXMgaXQuXG4gICAgaWYgKGNhbkRlZmluZVByb3BlcnR5KSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxlbWVudC5fc3RvcmUsICd2YWxpZGF0ZWQnLCB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IGZhbHNlXG4gICAgICB9KTtcbiAgICAgIC8vIHNlbGYgYW5kIHNvdXJjZSBhcmUgREVWIG9ubHkgcHJvcGVydGllcy5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtZW50LCAnX3NlbGYnLCB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgIHZhbHVlOiBzZWxmXG4gICAgICB9KTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtZW50LCAnX3NoYWRvd0NoaWxkcmVuJywge1xuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICB2YWx1ZTogc2hhZG93Q2hpbGRyZW5cbiAgICAgIH0pO1xuICAgICAgLy8gVHdvIGVsZW1lbnRzIGNyZWF0ZWQgaW4gdHdvIGRpZmZlcmVudCBwbGFjZXMgc2hvdWxkIGJlIGNvbnNpZGVyZWRcbiAgICAgIC8vIGVxdWFsIGZvciB0ZXN0aW5nIHB1cnBvc2VzIGFuZCB0aGVyZWZvcmUgd2UgaGlkZSBpdCBmcm9tIGVudW1lcmF0aW9uLlxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsZW1lbnQsICdfc291cmNlJywge1xuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICB2YWx1ZTogc291cmNlXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudC5fc3RvcmUudmFsaWRhdGVkID0gZmFsc2U7XG4gICAgICBlbGVtZW50Ll9zZWxmID0gc2VsZjtcbiAgICAgIGVsZW1lbnQuX3NoYWRvd0NoaWxkcmVuID0gc2hhZG93Q2hpbGRyZW47XG4gICAgICBlbGVtZW50Ll9zb3VyY2UgPSBzb3VyY2U7XG4gICAgfVxuICAgIGlmIChPYmplY3QuZnJlZXplKSB7XG4gICAgICBPYmplY3QuZnJlZXplKGVsZW1lbnQucHJvcHMpO1xuICAgICAgT2JqZWN0LmZyZWV6ZShlbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZWxlbWVudDtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGFuZCByZXR1cm4gYSBuZXcgUmVhY3RFbGVtZW50IG9mIHRoZSBnaXZlbiB0eXBlLlxuICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvdG9wLWxldmVsLWFwaS5odG1sI3JlYWN0LmNyZWF0ZWVsZW1lbnRcbiAqL1xuUmVhY3RFbGVtZW50LmNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbiAodHlwZSwgY29uZmlnLCBjaGlsZHJlbikge1xuICB2YXIgcHJvcE5hbWU7XG5cbiAgLy8gUmVzZXJ2ZWQgbmFtZXMgYXJlIGV4dHJhY3RlZFxuICB2YXIgcHJvcHMgPSB7fTtcblxuICB2YXIga2V5ID0gbnVsbDtcbiAgdmFyIHJlZiA9IG51bGw7XG4gIHZhciBzZWxmID0gbnVsbDtcbiAgdmFyIHNvdXJjZSA9IG51bGw7XG5cbiAgaWYgKGNvbmZpZyAhPSBudWxsKSB7XG4gICAgaWYgKGhhc1ZhbGlkUmVmKGNvbmZpZykpIHtcbiAgICAgIHJlZiA9IGNvbmZpZy5yZWY7XG4gICAgfVxuICAgIGlmIChoYXNWYWxpZEtleShjb25maWcpKSB7XG4gICAgICBrZXkgPSAnJyArIGNvbmZpZy5rZXk7XG4gICAgfVxuXG4gICAgc2VsZiA9IGNvbmZpZy5fX3NlbGYgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBjb25maWcuX19zZWxmO1xuICAgIHNvdXJjZSA9IGNvbmZpZy5fX3NvdXJjZSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGNvbmZpZy5fX3NvdXJjZTtcbiAgICAvLyBSZW1haW5pbmcgcHJvcGVydGllcyBhcmUgYWRkZWQgdG8gYSBuZXcgcHJvcHMgb2JqZWN0XG4gICAgZm9yIChwcm9wTmFtZSBpbiBjb25maWcpIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbmZpZywgcHJvcE5hbWUpICYmICFSRVNFUlZFRF9QUk9QUy5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcbiAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gY29uZmlnW3Byb3BOYW1lXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBDaGlsZHJlbiBjYW4gYmUgbW9yZSB0aGFuIG9uZSBhcmd1bWVudCwgYW5kIHRob3NlIGFyZSB0cmFuc2ZlcnJlZCBvbnRvXG4gIC8vIHRoZSBuZXdseSBhbGxvY2F0ZWQgcHJvcHMgb2JqZWN0LlxuICB2YXIgY2hpbGRyZW5MZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoIC0gMjtcbiAgaWYgKGNoaWxkcmVuTGVuZ3RoID09PSAxKSB7XG4gICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgfSBlbHNlIGlmIChjaGlsZHJlbkxlbmd0aCA+IDEpIHtcbiAgICB2YXIgY2hpbGRBcnJheSA9IEFycmF5KGNoaWxkcmVuTGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuTGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoaWxkQXJyYXlbaV0gPSBhcmd1bWVudHNbaSArIDJdO1xuICAgIH1cbiAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkQXJyYXk7XG4gIH1cblxuICAvLyBSZXNvbHZlIGRlZmF1bHQgcHJvcHNcbiAgaWYgKHR5cGUgJiYgdHlwZS5kZWZhdWx0UHJvcHMpIHtcbiAgICB2YXIgZGVmYXVsdFByb3BzID0gdHlwZS5kZWZhdWx0UHJvcHM7XG4gICAgZm9yIChwcm9wTmFtZSBpbiBkZWZhdWx0UHJvcHMpIHtcbiAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBkZWZhdWx0UHJvcHNbcHJvcE5hbWVdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlmIChrZXkgfHwgcmVmKSB7XG4gICAgICBpZiAodHlwZW9mIHByb3BzLiQkdHlwZW9mID09PSAndW5kZWZpbmVkJyB8fCBwcm9wcy4kJHR5cGVvZiAhPT0gUkVBQ1RfRUxFTUVOVF9UWVBFKSB7XG4gICAgICAgIHZhciBkaXNwbGF5TmFtZSA9IHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nID8gdHlwZS5kaXNwbGF5TmFtZSB8fCB0eXBlLm5hbWUgfHwgJ1Vua25vd24nIDogdHlwZTtcbiAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgIGRlZmluZUtleVByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlZikge1xuICAgICAgICAgIGRlZmluZVJlZlByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIFJlYWN0RWxlbWVudCh0eXBlLCBrZXksIHJlZiwgc2VsZiwgc291cmNlLCBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50LCBwcm9wcyk7XG59O1xuXG4vKipcbiAqIFJldHVybiBhIGZ1bmN0aW9uIHRoYXQgcHJvZHVjZXMgUmVhY3RFbGVtZW50cyBvZiBhIGdpdmVuIHR5cGUuXG4gKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90b3AtbGV2ZWwtYXBpLmh0bWwjcmVhY3QuY3JlYXRlZmFjdG9yeVxuICovXG5SZWFjdEVsZW1lbnQuY3JlYXRlRmFjdG9yeSA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gIHZhciBmYWN0b3J5ID0gUmVhY3RFbGVtZW50LmNyZWF0ZUVsZW1lbnQuYmluZChudWxsLCB0eXBlKTtcbiAgLy8gRXhwb3NlIHRoZSB0eXBlIG9uIHRoZSBmYWN0b3J5IGFuZCB0aGUgcHJvdG90eXBlIHNvIHRoYXQgaXQgY2FuIGJlXG4gIC8vIGVhc2lseSBhY2Nlc3NlZCBvbiBlbGVtZW50cy4gRS5nLiBgPEZvbyAvPi50eXBlID09PSBGb29gLlxuICAvLyBUaGlzIHNob3VsZCBub3QgYmUgbmFtZWQgYGNvbnN0cnVjdG9yYCBzaW5jZSB0aGlzIG1heSBub3QgYmUgdGhlIGZ1bmN0aW9uXG4gIC8vIHRoYXQgY3JlYXRlZCB0aGUgZWxlbWVudCwgYW5kIGl0IG1heSBub3QgZXZlbiBiZSBhIGNvbnN0cnVjdG9yLlxuICAvLyBMZWdhY3kgaG9vayBUT0RPOiBXYXJuIGlmIHRoaXMgaXMgYWNjZXNzZWRcbiAgZmFjdG9yeS50eXBlID0gdHlwZTtcbiAgcmV0dXJuIGZhY3Rvcnk7XG59O1xuXG5SZWFjdEVsZW1lbnQuY2xvbmVBbmRSZXBsYWNlS2V5ID0gZnVuY3Rpb24gKG9sZEVsZW1lbnQsIG5ld0tleSkge1xuICB2YXIgbmV3RWxlbWVudCA9IFJlYWN0RWxlbWVudChvbGRFbGVtZW50LnR5cGUsIG5ld0tleSwgb2xkRWxlbWVudC5yZWYsIG9sZEVsZW1lbnQuX3NlbGYsIG9sZEVsZW1lbnQuX3NvdXJjZSwgb2xkRWxlbWVudC5fb3duZXIsIG9sZEVsZW1lbnQucHJvcHMpO1xuXG4gIHJldHVybiBuZXdFbGVtZW50O1xufTtcblxuLyoqXG4gKiBDbG9uZSBhbmQgcmV0dXJuIGEgbmV3IFJlYWN0RWxlbWVudCB1c2luZyBlbGVtZW50IGFzIHRoZSBzdGFydGluZyBwb2ludC5cbiAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RvcC1sZXZlbC1hcGkuaHRtbCNyZWFjdC5jbG9uZWVsZW1lbnRcbiAqL1xuUmVhY3RFbGVtZW50LmNsb25lRWxlbWVudCA9IGZ1bmN0aW9uIChlbGVtZW50LCBjb25maWcsIGNoaWxkcmVuKSB7XG4gIHZhciBwcm9wTmFtZTtcblxuICAvLyBPcmlnaW5hbCBwcm9wcyBhcmUgY29waWVkXG4gIHZhciBwcm9wcyA9IF9hc3NpZ24oe30sIGVsZW1lbnQucHJvcHMpO1xuXG4gIC8vIFJlc2VydmVkIG5hbWVzIGFyZSBleHRyYWN0ZWRcbiAgdmFyIGtleSA9IGVsZW1lbnQua2V5O1xuICB2YXIgcmVmID0gZWxlbWVudC5yZWY7XG4gIC8vIFNlbGYgaXMgcHJlc2VydmVkIHNpbmNlIHRoZSBvd25lciBpcyBwcmVzZXJ2ZWQuXG4gIHZhciBzZWxmID0gZWxlbWVudC5fc2VsZjtcbiAgLy8gU291cmNlIGlzIHByZXNlcnZlZCBzaW5jZSBjbG9uZUVsZW1lbnQgaXMgdW5saWtlbHkgdG8gYmUgdGFyZ2V0ZWQgYnkgYVxuICAvLyB0cmFuc3BpbGVyLCBhbmQgdGhlIG9yaWdpbmFsIHNvdXJjZSBpcyBwcm9iYWJseSBhIGJldHRlciBpbmRpY2F0b3Igb2YgdGhlXG4gIC8vIHRydWUgb3duZXIuXG4gIHZhciBzb3VyY2UgPSBlbGVtZW50Ll9zb3VyY2U7XG5cbiAgLy8gT3duZXIgd2lsbCBiZSBwcmVzZXJ2ZWQsIHVubGVzcyByZWYgaXMgb3ZlcnJpZGRlblxuICB2YXIgb3duZXIgPSBlbGVtZW50Ll9vd25lcjtcblxuICBpZiAoY29uZmlnICE9IG51bGwpIHtcbiAgICBpZiAoaGFzVmFsaWRSZWYoY29uZmlnKSkge1xuICAgICAgLy8gU2lsZW50bHkgc3RlYWwgdGhlIHJlZiBmcm9tIHRoZSBwYXJlbnQuXG4gICAgICByZWYgPSBjb25maWcucmVmO1xuICAgICAgb3duZXIgPSBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50O1xuICAgIH1cbiAgICBpZiAoaGFzVmFsaWRLZXkoY29uZmlnKSkge1xuICAgICAga2V5ID0gJycgKyBjb25maWcua2V5O1xuICAgIH1cblxuICAgIC8vIFJlbWFpbmluZyBwcm9wZXJ0aWVzIG92ZXJyaWRlIGV4aXN0aW5nIHByb3BzXG4gICAgdmFyIGRlZmF1bHRQcm9wcztcbiAgICBpZiAoZWxlbWVudC50eXBlICYmIGVsZW1lbnQudHlwZS5kZWZhdWx0UHJvcHMpIHtcbiAgICAgIGRlZmF1bHRQcm9wcyA9IGVsZW1lbnQudHlwZS5kZWZhdWx0UHJvcHM7XG4gICAgfVxuICAgIGZvciAocHJvcE5hbWUgaW4gY29uZmlnKSB7XG4gICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsIHByb3BOYW1lKSAmJiAhUkVTRVJWRURfUFJPUFMuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICAgIGlmIChjb25maWdbcHJvcE5hbWVdID09PSB1bmRlZmluZWQgJiYgZGVmYXVsdFByb3BzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAvLyBSZXNvbHZlIGRlZmF1bHQgcHJvcHNcbiAgICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBkZWZhdWx0UHJvcHNbcHJvcE5hbWVdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGNvbmZpZ1twcm9wTmFtZV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBDaGlsZHJlbiBjYW4gYmUgbW9yZSB0aGFuIG9uZSBhcmd1bWVudCwgYW5kIHRob3NlIGFyZSB0cmFuc2ZlcnJlZCBvbnRvXG4gIC8vIHRoZSBuZXdseSBhbGxvY2F0ZWQgcHJvcHMgb2JqZWN0LlxuICB2YXIgY2hpbGRyZW5MZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoIC0gMjtcbiAgaWYgKGNoaWxkcmVuTGVuZ3RoID09PSAxKSB7XG4gICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgfSBlbHNlIGlmIChjaGlsZHJlbkxlbmd0aCA+IDEpIHtcbiAgICB2YXIgY2hpbGRBcnJheSA9IEFycmF5KGNoaWxkcmVuTGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuTGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoaWxkQXJyYXlbaV0gPSBhcmd1bWVudHNbaSArIDJdO1xuICAgIH1cbiAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkQXJyYXk7XG4gIH1cblxuICByZXR1cm4gUmVhY3RFbGVtZW50KGVsZW1lbnQudHlwZSwga2V5LCByZWYsIHNlbGYsIHNvdXJjZSwgb3duZXIsIHByb3BzKTtcbn07XG5cbi8qKlxuICogVmVyaWZpZXMgdGhlIG9iamVjdCBpcyBhIFJlYWN0RWxlbWVudC5cbiAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RvcC1sZXZlbC1hcGkuaHRtbCNyZWFjdC5pc3ZhbGlkZWxlbWVudFxuICogQHBhcmFtIHs/b2JqZWN0fSBvYmplY3RcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgYG9iamVjdGAgaXMgYSB2YWxpZCBjb21wb25lbnQuXG4gKiBAZmluYWxcbiAqL1xuUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50ID0gZnVuY3Rpb24gKG9iamVjdCkge1xuICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0ICE9PSBudWxsICYmIG9iamVjdC4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xufTtcblxuUmVhY3RFbGVtZW50LlJFQUNUX0VMRU1FTlRfVFlQRSA9IFJFQUNUX0VMRU1FTlRfVFlQRTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdEVsZW1lbnQ7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0RWxlbWVudFZhbGlkYXRvclxuICovXG5cbi8qKlxuICogUmVhY3RFbGVtZW50VmFsaWRhdG9yIHByb3ZpZGVzIGEgd3JhcHBlciBhcm91bmQgYSBlbGVtZW50IGZhY3RvcnlcbiAqIHdoaWNoIHZhbGlkYXRlcyB0aGUgcHJvcHMgcGFzc2VkIHRvIHRoZSBlbGVtZW50LiBUaGlzIGlzIGludGVuZGVkIHRvIGJlXG4gKiB1c2VkIG9ubHkgaW4gREVWIGFuZCBjb3VsZCBiZSByZXBsYWNlZCBieSBhIHN0YXRpYyB0eXBlIGNoZWNrZXIgZm9yIGxhbmd1YWdlc1xuICogdGhhdCBzdXBwb3J0IGl0LlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0Q3VycmVudE93bmVyID0gcmVxdWlyZSgnLi9SZWFjdEN1cnJlbnRPd25lcicpO1xudmFyIFJlYWN0Q29tcG9uZW50VHJlZUhvb2sgPSByZXF1aXJlKCcuL1JlYWN0Q29tcG9uZW50VHJlZUhvb2snKTtcbnZhciBSZWFjdEVsZW1lbnQgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudCcpO1xudmFyIFJlYWN0UHJvcFR5cGVMb2NhdGlvbnMgPSByZXF1aXJlKCcuL1JlYWN0UHJvcFR5cGVMb2NhdGlvbnMnKTtcblxudmFyIGNoZWNrUmVhY3RUeXBlU3BlYyA9IHJlcXVpcmUoJy4vY2hlY2tSZWFjdFR5cGVTcGVjJyk7XG5cbnZhciBjYW5EZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vY2FuRGVmaW5lUHJvcGVydHknKTtcbnZhciBnZXRJdGVyYXRvckZuID0gcmVxdWlyZSgnLi9nZXRJdGVyYXRvckZuJyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxuZnVuY3Rpb24gZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKCkge1xuICBpZiAoUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCkge1xuICAgIHZhciBuYW1lID0gUmVhY3RDdXJyZW50T3duZXIuY3VycmVudC5nZXROYW1lKCk7XG4gICAgaWYgKG5hbWUpIHtcbiAgICAgIHJldHVybiAnIENoZWNrIHRoZSByZW5kZXIgbWV0aG9kIG9mIGAnICsgbmFtZSArICdgLic7XG4gICAgfVxuICB9XG4gIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBXYXJuIGlmIHRoZXJlJ3Mgbm8ga2V5IGV4cGxpY2l0bHkgc2V0IG9uIGR5bmFtaWMgYXJyYXlzIG9mIGNoaWxkcmVuIG9yXG4gKiBvYmplY3Qga2V5cyBhcmUgbm90IHZhbGlkLiBUaGlzIGFsbG93cyB1cyB0byBrZWVwIHRyYWNrIG9mIGNoaWxkcmVuIGJldHdlZW5cbiAqIHVwZGF0ZXMuXG4gKi9cbnZhciBvd25lckhhc0tleVVzZVdhcm5pbmcgPSB7fTtcblxuZnVuY3Rpb24gZ2V0Q3VycmVudENvbXBvbmVudEVycm9ySW5mbyhwYXJlbnRUeXBlKSB7XG4gIHZhciBpbmZvID0gZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKCk7XG5cbiAgaWYgKCFpbmZvKSB7XG4gICAgdmFyIHBhcmVudE5hbWUgPSB0eXBlb2YgcGFyZW50VHlwZSA9PT0gJ3N0cmluZycgPyBwYXJlbnRUeXBlIDogcGFyZW50VHlwZS5kaXNwbGF5TmFtZSB8fCBwYXJlbnRUeXBlLm5hbWU7XG4gICAgaWYgKHBhcmVudE5hbWUpIHtcbiAgICAgIGluZm8gPSAnIENoZWNrIHRoZSB0b3AtbGV2ZWwgcmVuZGVyIGNhbGwgdXNpbmcgPCcgKyBwYXJlbnROYW1lICsgJz4uJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGluZm87XG59XG5cbi8qKlxuICogV2FybiBpZiB0aGUgZWxlbWVudCBkb2Vzbid0IGhhdmUgYW4gZXhwbGljaXQga2V5IGFzc2lnbmVkIHRvIGl0LlxuICogVGhpcyBlbGVtZW50IGlzIGluIGFuIGFycmF5LiBUaGUgYXJyYXkgY291bGQgZ3JvdyBhbmQgc2hyaW5rIG9yIGJlXG4gKiByZW9yZGVyZWQuIEFsbCBjaGlsZHJlbiB0aGF0IGhhdmVuJ3QgYWxyZWFkeSBiZWVuIHZhbGlkYXRlZCBhcmUgcmVxdWlyZWQgdG9cbiAqIGhhdmUgYSBcImtleVwiIHByb3BlcnR5IGFzc2lnbmVkIHRvIGl0LiBFcnJvciBzdGF0dXNlcyBhcmUgY2FjaGVkIHNvIGEgd2FybmluZ1xuICogd2lsbCBvbmx5IGJlIHNob3duIG9uY2UuXG4gKlxuICogQGludGVybmFsXG4gKiBAcGFyYW0ge1JlYWN0RWxlbWVudH0gZWxlbWVudCBFbGVtZW50IHRoYXQgcmVxdWlyZXMgYSBrZXkuXG4gKiBAcGFyYW0geyp9IHBhcmVudFR5cGUgZWxlbWVudCdzIHBhcmVudCdzIHR5cGUuXG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlRXhwbGljaXRLZXkoZWxlbWVudCwgcGFyZW50VHlwZSkge1xuICBpZiAoIWVsZW1lbnQuX3N0b3JlIHx8IGVsZW1lbnQuX3N0b3JlLnZhbGlkYXRlZCB8fCBlbGVtZW50LmtleSAhPSBudWxsKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGVsZW1lbnQuX3N0b3JlLnZhbGlkYXRlZCA9IHRydWU7XG5cbiAgdmFyIG1lbW9pemVyID0gb3duZXJIYXNLZXlVc2VXYXJuaW5nLnVuaXF1ZUtleSB8fCAob3duZXJIYXNLZXlVc2VXYXJuaW5nLnVuaXF1ZUtleSA9IHt9KTtcblxuICB2YXIgY3VycmVudENvbXBvbmVudEVycm9ySW5mbyA9IGdldEN1cnJlbnRDb21wb25lbnRFcnJvckluZm8ocGFyZW50VHlwZSk7XG4gIGlmIChtZW1vaXplcltjdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvXSkge1xuICAgIHJldHVybjtcbiAgfVxuICBtZW1vaXplcltjdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvXSA9IHRydWU7XG5cbiAgLy8gVXN1YWxseSB0aGUgY3VycmVudCBvd25lciBpcyB0aGUgb2ZmZW5kZXIsIGJ1dCBpZiBpdCBhY2NlcHRzIGNoaWxkcmVuIGFzIGFcbiAgLy8gcHJvcGVydHksIGl0IG1heSBiZSB0aGUgY3JlYXRvciBvZiB0aGUgY2hpbGQgdGhhdCdzIHJlc3BvbnNpYmxlIGZvclxuICAvLyBhc3NpZ25pbmcgaXQgYSBrZXkuXG4gIHZhciBjaGlsZE93bmVyID0gJyc7XG4gIGlmIChlbGVtZW50ICYmIGVsZW1lbnQuX293bmVyICYmIGVsZW1lbnQuX293bmVyICE9PSBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50KSB7XG4gICAgLy8gR2l2ZSB0aGUgY29tcG9uZW50IHRoYXQgb3JpZ2luYWxseSBjcmVhdGVkIHRoaXMgY2hpbGQuXG4gICAgY2hpbGRPd25lciA9ICcgSXQgd2FzIHBhc3NlZCBhIGNoaWxkIGZyb20gJyArIGVsZW1lbnQuX293bmVyLmdldE5hbWUoKSArICcuJztcbiAgfVxuXG4gIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnRWFjaCBjaGlsZCBpbiBhbiBhcnJheSBvciBpdGVyYXRvciBzaG91bGQgaGF2ZSBhIHVuaXF1ZSBcImtleVwiIHByb3AuJyArICclcyVzIFNlZSBodHRwczovL2ZiLm1lL3JlYWN0LXdhcm5pbmcta2V5cyBmb3IgbW9yZSBpbmZvcm1hdGlvbi4lcycsIGN1cnJlbnRDb21wb25lbnRFcnJvckluZm8sIGNoaWxkT3duZXIsIFJlYWN0Q29tcG9uZW50VHJlZUhvb2suZ2V0Q3VycmVudFN0YWNrQWRkZW5kdW0oZWxlbWVudCkpIDogdm9pZCAwO1xufVxuXG4vKipcbiAqIEVuc3VyZSB0aGF0IGV2ZXJ5IGVsZW1lbnQgZWl0aGVyIGlzIHBhc3NlZCBpbiBhIHN0YXRpYyBsb2NhdGlvbiwgaW4gYW5cbiAqIGFycmF5IHdpdGggYW4gZXhwbGljaXQga2V5cyBwcm9wZXJ0eSBkZWZpbmVkLCBvciBpbiBhbiBvYmplY3QgbGl0ZXJhbFxuICogd2l0aCB2YWxpZCBrZXkgcHJvcGVydHkuXG4gKlxuICogQGludGVybmFsXG4gKiBAcGFyYW0ge1JlYWN0Tm9kZX0gbm9kZSBTdGF0aWNhbGx5IHBhc3NlZCBjaGlsZCBvZiBhbnkgdHlwZS5cbiAqIEBwYXJhbSB7Kn0gcGFyZW50VHlwZSBub2RlJ3MgcGFyZW50J3MgdHlwZS5cbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVDaGlsZEtleXMobm9kZSwgcGFyZW50VHlwZSkge1xuICBpZiAodHlwZW9mIG5vZGUgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChBcnJheS5pc0FycmF5KG5vZGUpKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY2hpbGQgPSBub2RlW2ldO1xuICAgICAgaWYgKFJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChjaGlsZCkpIHtcbiAgICAgICAgdmFsaWRhdGVFeHBsaWNpdEtleShjaGlsZCwgcGFyZW50VHlwZSk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKFJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChub2RlKSkge1xuICAgIC8vIFRoaXMgZWxlbWVudCB3YXMgcGFzc2VkIGluIGEgdmFsaWQgbG9jYXRpb24uXG4gICAgaWYgKG5vZGUuX3N0b3JlKSB7XG4gICAgICBub2RlLl9zdG9yZS52YWxpZGF0ZWQgPSB0cnVlO1xuICAgIH1cbiAgfSBlbHNlIGlmIChub2RlKSB7XG4gICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKG5vZGUpO1xuICAgIC8vIEVudHJ5IGl0ZXJhdG9ycyBwcm92aWRlIGltcGxpY2l0IGtleXMuXG4gICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICAgIGlmIChpdGVyYXRvckZuICE9PSBub2RlLmVudHJpZXMpIHtcbiAgICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKG5vZGUpO1xuICAgICAgICB2YXIgc3RlcDtcbiAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgIGlmIChSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQoc3RlcC52YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbGlkYXRlRXhwbGljaXRLZXkoc3RlcC52YWx1ZSwgcGFyZW50VHlwZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogR2l2ZW4gYW4gZWxlbWVudCwgdmFsaWRhdGUgdGhhdCBpdHMgcHJvcHMgZm9sbG93IHRoZSBwcm9wVHlwZXMgZGVmaW5pdGlvbixcbiAqIHByb3ZpZGVkIGJ5IHRoZSB0eXBlLlxuICpcbiAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlUHJvcFR5cGVzKGVsZW1lbnQpIHtcbiAgdmFyIGNvbXBvbmVudENsYXNzID0gZWxlbWVudC50eXBlO1xuICBpZiAodHlwZW9mIGNvbXBvbmVudENsYXNzICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBuYW1lID0gY29tcG9uZW50Q2xhc3MuZGlzcGxheU5hbWUgfHwgY29tcG9uZW50Q2xhc3MubmFtZTtcbiAgaWYgKGNvbXBvbmVudENsYXNzLnByb3BUeXBlcykge1xuICAgIGNoZWNrUmVhY3RUeXBlU3BlYyhjb21wb25lbnRDbGFzcy5wcm9wVHlwZXMsIGVsZW1lbnQucHJvcHMsIFJlYWN0UHJvcFR5cGVMb2NhdGlvbnMucHJvcCwgbmFtZSwgZWxlbWVudCwgbnVsbCk7XG4gIH1cbiAgaWYgKHR5cGVvZiBjb21wb25lbnRDbGFzcy5nZXREZWZhdWx0UHJvcHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhjb21wb25lbnRDbGFzcy5nZXREZWZhdWx0UHJvcHMuaXNSZWFjdENsYXNzQXBwcm92ZWQsICdnZXREZWZhdWx0UHJvcHMgaXMgb25seSB1c2VkIG9uIGNsYXNzaWMgUmVhY3QuY3JlYXRlQ2xhc3MgJyArICdkZWZpbml0aW9ucy4gVXNlIGEgc3RhdGljIHByb3BlcnR5IG5hbWVkIGBkZWZhdWx0UHJvcHNgIGluc3RlYWQuJykgOiB2b2lkIDA7XG4gIH1cbn1cblxudmFyIFJlYWN0RWxlbWVudFZhbGlkYXRvciA9IHtcblxuICBjcmVhdGVFbGVtZW50OiBmdW5jdGlvbiAodHlwZSwgcHJvcHMsIGNoaWxkcmVuKSB7XG4gICAgdmFyIHZhbGlkVHlwZSA9IHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJztcbiAgICAvLyBXZSB3YXJuIGluIHRoaXMgY2FzZSBidXQgZG9uJ3QgdGhyb3cuIFdlIGV4cGVjdCB0aGUgZWxlbWVudCBjcmVhdGlvbiB0b1xuICAgIC8vIHN1Y2NlZWQgYW5kIHRoZXJlIHdpbGwgbGlrZWx5IGJlIGVycm9ycyBpbiByZW5kZXIuXG4gICAgaWYgKCF2YWxpZFR5cGUpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnUmVhY3QuY3JlYXRlRWxlbWVudDogdHlwZSBzaG91bGQgbm90IGJlIG51bGwsIHVuZGVmaW5lZCwgYm9vbGVhbiwgb3IgJyArICdudW1iZXIuIEl0IHNob3VsZCBiZSBhIHN0cmluZyAoZm9yIERPTSBlbGVtZW50cykgb3IgYSBSZWFjdENsYXNzICcgKyAnKGZvciBjb21wb3NpdGUgY29tcG9uZW50cykuJXMnLCBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oKSkgOiB2b2lkIDA7XG4gICAgfVxuXG4gICAgdmFyIGVsZW1lbnQgPSBSZWFjdEVsZW1lbnQuY3JlYXRlRWxlbWVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgLy8gVGhlIHJlc3VsdCBjYW4gYmUgbnVsbGlzaCBpZiBhIG1vY2sgb3IgYSBjdXN0b20gZnVuY3Rpb24gaXMgdXNlZC5cbiAgICAvLyBUT0RPOiBEcm9wIHRoaXMgd2hlbiB0aGVzZSBhcmUgbm8gbG9uZ2VyIGFsbG93ZWQgYXMgdGhlIHR5cGUgYXJndW1lbnQuXG4gICAgaWYgKGVsZW1lbnQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLy8gU2tpcCBrZXkgd2FybmluZyBpZiB0aGUgdHlwZSBpc24ndCB2YWxpZCBzaW5jZSBvdXIga2V5IHZhbGlkYXRpb24gbG9naWNcbiAgICAvLyBkb2Vzbid0IGV4cGVjdCBhIG5vbi1zdHJpbmcvZnVuY3Rpb24gdHlwZSBhbmQgY2FuIHRocm93IGNvbmZ1c2luZyBlcnJvcnMuXG4gICAgLy8gV2UgZG9uJ3Qgd2FudCBleGNlcHRpb24gYmVoYXZpb3IgdG8gZGlmZmVyIGJldHdlZW4gZGV2IGFuZCBwcm9kLlxuICAgIC8vIChSZW5kZXJpbmcgd2lsbCB0aHJvdyB3aXRoIGEgaGVscGZ1bCBtZXNzYWdlIGFuZCBhcyBzb29uIGFzIHRoZSB0eXBlIGlzXG4gICAgLy8gZml4ZWQsIHRoZSBrZXkgd2FybmluZ3Mgd2lsbCBhcHBlYXIuKVxuICAgIGlmICh2YWxpZFR5cGUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAyOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhbGlkYXRlQ2hpbGRLZXlzKGFyZ3VtZW50c1tpXSwgdHlwZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFsaWRhdGVQcm9wVHlwZXMoZWxlbWVudCk7XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfSxcblxuICBjcmVhdGVGYWN0b3J5OiBmdW5jdGlvbiAodHlwZSkge1xuICAgIHZhciB2YWxpZGF0ZWRGYWN0b3J5ID0gUmVhY3RFbGVtZW50VmFsaWRhdG9yLmNyZWF0ZUVsZW1lbnQuYmluZChudWxsLCB0eXBlKTtcbiAgICAvLyBMZWdhY3kgaG9vayBUT0RPOiBXYXJuIGlmIHRoaXMgaXMgYWNjZXNzZWRcbiAgICB2YWxpZGF0ZWRGYWN0b3J5LnR5cGUgPSB0eXBlO1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGlmIChjYW5EZWZpbmVQcm9wZXJ0eSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodmFsaWRhdGVkRmFjdG9yeSwgJ3R5cGUnLCB7XG4gICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ0ZhY3RvcnkudHlwZSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdGhlIGNsYXNzIGRpcmVjdGx5ICcgKyAnYmVmb3JlIHBhc3NpbmcgaXQgdG8gY3JlYXRlRmFjdG9yeS4nKSA6IHZvaWQgMDtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAndHlwZScsIHtcbiAgICAgICAgICAgICAgdmFsdWU6IHR5cGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdmFsaWRhdGVkRmFjdG9yeTtcbiAgfSxcblxuICBjbG9uZUVsZW1lbnQ6IGZ1bmN0aW9uIChlbGVtZW50LCBwcm9wcywgY2hpbGRyZW4pIHtcbiAgICB2YXIgbmV3RWxlbWVudCA9IFJlYWN0RWxlbWVudC5jbG9uZUVsZW1lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBmb3IgKHZhciBpID0gMjsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFsaWRhdGVDaGlsZEtleXMoYXJndW1lbnRzW2ldLCBuZXdFbGVtZW50LnR5cGUpO1xuICAgIH1cbiAgICB2YWxpZGF0ZVByb3BUeXBlcyhuZXdFbGVtZW50KTtcbiAgICByZXR1cm4gbmV3RWxlbWVudDtcbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0RWxlbWVudFZhbGlkYXRvcjsiLCIvKipcbiAqIENvcHlyaWdodCAyMDE1LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3ROb29wVXBkYXRlUXVldWVcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG5mdW5jdGlvbiB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgY2FsbGVyTmFtZSkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHZhciBjb25zdHJ1Y3RvciA9IHB1YmxpY0luc3RhbmNlLmNvbnN0cnVjdG9yO1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnJXMoLi4uKTogQ2FuIG9ubHkgdXBkYXRlIGEgbW91bnRlZCBvciBtb3VudGluZyBjb21wb25lbnQuICcgKyAnVGhpcyB1c3VhbGx5IG1lYW5zIHlvdSBjYWxsZWQgJXMoKSBvbiBhbiB1bm1vdW50ZWQgY29tcG9uZW50LiAnICsgJ1RoaXMgaXMgYSBuby1vcC4gUGxlYXNlIGNoZWNrIHRoZSBjb2RlIGZvciB0aGUgJXMgY29tcG9uZW50LicsIGNhbGxlck5hbWUsIGNhbGxlck5hbWUsIGNvbnN0cnVjdG9yICYmIChjb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSB8fCBjb25zdHJ1Y3Rvci5uYW1lKSB8fCAnUmVhY3RDbGFzcycpIDogdm9pZCAwO1xuICB9XG59XG5cbi8qKlxuICogVGhpcyBpcyB0aGUgYWJzdHJhY3QgQVBJIGZvciBhbiB1cGRhdGUgcXVldWUuXG4gKi9cbnZhciBSZWFjdE5vb3BVcGRhdGVRdWV1ZSA9IHtcblxuICAvKipcbiAgICogQ2hlY2tzIHdoZXRoZXIgb3Igbm90IHRoaXMgY29tcG9zaXRlIGNvbXBvbmVudCBpcyBtb3VudGVkLlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB3ZSB3YW50IHRvIHRlc3QuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgbW91bnRlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKiBAcHJvdGVjdGVkXG4gICAqIEBmaW5hbFxuICAgKi9cbiAgaXNNb3VudGVkOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEVucXVldWUgYSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgZXhlY3V0ZWQgYWZ0ZXIgYWxsIHRoZSBwZW5kaW5nIHVwZGF0ZXNcbiAgICogaGF2ZSBwcm9jZXNzZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHRvIHVzZSBhcyBgdGhpc2AgY29udGV4dC5cbiAgICogQHBhcmFtIHs/ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxlZCBhZnRlciBzdGF0ZSBpcyB1cGRhdGVkLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWVDYWxsYmFjazogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlLCBjYWxsYmFjaykge30sXG5cbiAgLyoqXG4gICAqIEZvcmNlcyBhbiB1cGRhdGUuIFRoaXMgc2hvdWxkIG9ubHkgYmUgaW52b2tlZCB3aGVuIGl0IGlzIGtub3duIHdpdGhcbiAgICogY2VydGFpbnR5IHRoYXQgd2UgYXJlICoqbm90KiogaW4gYSBET00gdHJhbnNhY3Rpb24uXG4gICAqXG4gICAqIFlvdSBtYXkgd2FudCB0byBjYWxsIHRoaXMgd2hlbiB5b3Uga25vdyB0aGF0IHNvbWUgZGVlcGVyIGFzcGVjdCBvZiB0aGVcbiAgICogY29tcG9uZW50J3Mgc3RhdGUgaGFzIGNoYW5nZWQgYnV0IGBzZXRTdGF0ZWAgd2FzIG5vdCBjYWxsZWQuXG4gICAqXG4gICAqIFRoaXMgd2lsbCBub3QgaW52b2tlIGBzaG91bGRDb21wb25lbnRVcGRhdGVgLCBidXQgaXQgd2lsbCBpbnZva2VcbiAgICogYGNvbXBvbmVudFdpbGxVcGRhdGVgIGFuZCBgY29tcG9uZW50RGlkVXBkYXRlYC5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdGhhdCBzaG91bGQgcmVyZW5kZXIuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZUZvcmNlVXBkYXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UpIHtcbiAgICB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgJ2ZvcmNlVXBkYXRlJyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJlcGxhY2VzIGFsbCBvZiB0aGUgc3RhdGUuIEFsd2F5cyB1c2UgdGhpcyBvciBgc2V0U3RhdGVgIHRvIG11dGF0ZSBzdGF0ZS5cbiAgICogWW91IHNob3VsZCB0cmVhdCBgdGhpcy5zdGF0ZWAgYXMgaW1tdXRhYmxlLlxuICAgKlxuICAgKiBUaGVyZSBpcyBubyBndWFyYW50ZWUgdGhhdCBgdGhpcy5zdGF0ZWAgd2lsbCBiZSBpbW1lZGlhdGVseSB1cGRhdGVkLCBzb1xuICAgKiBhY2Nlc3NpbmcgYHRoaXMuc3RhdGVgIGFmdGVyIGNhbGxpbmcgdGhpcyBtZXRob2QgbWF5IHJldHVybiB0aGUgb2xkIHZhbHVlLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB0aGF0IHNob3VsZCByZXJlbmRlci5cbiAgICogQHBhcmFtIHtvYmplY3R9IGNvbXBsZXRlU3RhdGUgTmV4dCBzdGF0ZS5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBlbnF1ZXVlUmVwbGFjZVN0YXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UsIGNvbXBsZXRlU3RhdGUpIHtcbiAgICB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgJ3JlcGxhY2VTdGF0ZScpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBTZXRzIGEgc3Vic2V0IG9mIHRoZSBzdGF0ZS4gVGhpcyBvbmx5IGV4aXN0cyBiZWNhdXNlIF9wZW5kaW5nU3RhdGUgaXNcbiAgICogaW50ZXJuYWwuIFRoaXMgcHJvdmlkZXMgYSBtZXJnaW5nIHN0cmF0ZWd5IHRoYXQgaXMgbm90IGF2YWlsYWJsZSB0byBkZWVwXG4gICAqIHByb3BlcnRpZXMgd2hpY2ggaXMgY29uZnVzaW5nLiBUT0RPOiBFeHBvc2UgcGVuZGluZ1N0YXRlIG9yIGRvbid0IHVzZSBpdFxuICAgKiBkdXJpbmcgdGhlIG1lcmdlLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB0aGF0IHNob3VsZCByZXJlbmRlci5cbiAgICogQHBhcmFtIHtvYmplY3R9IHBhcnRpYWxTdGF0ZSBOZXh0IHBhcnRpYWwgc3RhdGUgdG8gYmUgbWVyZ2VkIHdpdGggc3RhdGUuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZVNldFN0YXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UsIHBhcnRpYWxTdGF0ZSkge1xuICAgIHdhcm5Ob29wKHB1YmxpY0luc3RhbmNlLCAnc2V0U3RhdGUnKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdE5vb3BVcGRhdGVRdWV1ZTsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcyA9IHt9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcyA9IHtcbiAgICBwcm9wOiAncHJvcCcsXG4gICAgY29udGV4dDogJ2NvbnRleHQnLFxuICAgIGNoaWxkQ29udGV4dDogJ2NoaWxkIGNvbnRleHQnXG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXM7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0UHJvcFR5cGVMb2NhdGlvbnNcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBrZXlNaXJyb3IgPSByZXF1aXJlKCdmYmpzL2xpYi9rZXlNaXJyb3InKTtcblxudmFyIFJlYWN0UHJvcFR5cGVMb2NhdGlvbnMgPSBrZXlNaXJyb3Ioe1xuICBwcm9wOiBudWxsLFxuICBjb250ZXh0OiBudWxsLFxuICBjaGlsZENvbnRleHQ6IG51bGxcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbnM7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0UHJvcFR5cGVzXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RFbGVtZW50ID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnQnKTtcbnZhciBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcyA9IHJlcXVpcmUoJy4vUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMnKTtcbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcblxudmFyIGVtcHR5RnVuY3Rpb24gPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eUZ1bmN0aW9uJyk7XG52YXIgZ2V0SXRlcmF0b3JGbiA9IHJlcXVpcmUoJy4vZ2V0SXRlcmF0b3JGbicpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbi8qKlxuICogQ29sbGVjdGlvbiBvZiBtZXRob2RzIHRoYXQgYWxsb3cgZGVjbGFyYXRpb24gYW5kIHZhbGlkYXRpb24gb2YgcHJvcHMgdGhhdCBhcmVcbiAqIHN1cHBsaWVkIHRvIFJlYWN0IGNvbXBvbmVudHMuIEV4YW1wbGUgdXNhZ2U6XG4gKlxuICogICB2YXIgUHJvcHMgPSByZXF1aXJlKCdSZWFjdFByb3BUeXBlcycpO1xuICogICB2YXIgTXlBcnRpY2xlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICogICAgIHByb3BUeXBlczoge1xuICogICAgICAgLy8gQW4gb3B0aW9uYWwgc3RyaW5nIHByb3AgbmFtZWQgXCJkZXNjcmlwdGlvblwiLlxuICogICAgICAgZGVzY3JpcHRpb246IFByb3BzLnN0cmluZyxcbiAqXG4gKiAgICAgICAvLyBBIHJlcXVpcmVkIGVudW0gcHJvcCBuYW1lZCBcImNhdGVnb3J5XCIuXG4gKiAgICAgICBjYXRlZ29yeTogUHJvcHMub25lT2YoWydOZXdzJywnUGhvdG9zJ10pLmlzUmVxdWlyZWQsXG4gKlxuICogICAgICAgLy8gQSBwcm9wIG5hbWVkIFwiZGlhbG9nXCIgdGhhdCByZXF1aXJlcyBhbiBpbnN0YW5jZSBvZiBEaWFsb2cuXG4gKiAgICAgICBkaWFsb2c6IFByb3BzLmluc3RhbmNlT2YoRGlhbG9nKS5pc1JlcXVpcmVkXG4gKiAgICAgfSxcbiAqICAgICByZW5kZXI6IGZ1bmN0aW9uKCkgeyAuLi4gfVxuICogICB9KTtcbiAqXG4gKiBBIG1vcmUgZm9ybWFsIHNwZWNpZmljYXRpb24gb2YgaG93IHRoZXNlIG1ldGhvZHMgYXJlIHVzZWQ6XG4gKlxuICogICB0eXBlIDo9IGFycmF5fGJvb2x8ZnVuY3xvYmplY3R8bnVtYmVyfHN0cmluZ3xvbmVPZihbLi4uXSl8aW5zdGFuY2VPZiguLi4pXG4gKiAgIGRlY2wgOj0gUmVhY3RQcm9wVHlwZXMue3R5cGV9KC5pc1JlcXVpcmVkKT9cbiAqXG4gKiBFYWNoIGFuZCBldmVyeSBkZWNsYXJhdGlvbiBwcm9kdWNlcyBhIGZ1bmN0aW9uIHdpdGggdGhlIHNhbWUgc2lnbmF0dXJlLiBUaGlzXG4gKiBhbGxvd3MgdGhlIGNyZWF0aW9uIG9mIGN1c3RvbSB2YWxpZGF0aW9uIGZ1bmN0aW9ucy4gRm9yIGV4YW1wbGU6XG4gKlxuICogIHZhciBNeUxpbmsgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gKiAgICBwcm9wVHlwZXM6IHtcbiAqICAgICAgLy8gQW4gb3B0aW9uYWwgc3RyaW5nIG9yIFVSSSBwcm9wIG5hbWVkIFwiaHJlZlwiLlxuICogICAgICBocmVmOiBmdW5jdGlvbihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUpIHtcbiAqICAgICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICogICAgICAgIGlmIChwcm9wVmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgcHJvcFZhbHVlICE9PSAnc3RyaW5nJyAmJlxuICogICAgICAgICAgICAhKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFVSSSkpIHtcbiAqICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoXG4gKiAgICAgICAgICAgICdFeHBlY3RlZCBhIHN0cmluZyBvciBhbiBVUkkgZm9yICcgKyBwcm9wTmFtZSArICcgaW4gJyArXG4gKiAgICAgICAgICAgIGNvbXBvbmVudE5hbWVcbiAqICAgICAgICAgICk7XG4gKiAgICAgICAgfVxuICogICAgICB9XG4gKiAgICB9LFxuICogICAgcmVuZGVyOiBmdW5jdGlvbigpIHsuLi59XG4gKiAgfSk7XG4gKlxuICogQGludGVybmFsXG4gKi9cblxudmFyIEFOT05ZTU9VUyA9ICc8PGFub255bW91cz4+JztcblxudmFyIFJlYWN0UHJvcFR5cGVzID0ge1xuICBhcnJheTogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2FycmF5JyksXG4gIGJvb2w6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdib29sZWFuJyksXG4gIGZ1bmM6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdmdW5jdGlvbicpLFxuICBudW1iZXI6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdudW1iZXInKSxcbiAgb2JqZWN0OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignb2JqZWN0JyksXG4gIHN0cmluZzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ3N0cmluZycpLFxuICBzeW1ib2w6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdzeW1ib2wnKSxcblxuICBhbnk6IGNyZWF0ZUFueVR5cGVDaGVja2VyKCksXG4gIGFycmF5T2Y6IGNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlcixcbiAgZWxlbWVudDogY3JlYXRlRWxlbWVudFR5cGVDaGVja2VyKCksXG4gIGluc3RhbmNlT2Y6IGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIsXG4gIG5vZGU6IGNyZWF0ZU5vZGVDaGVja2VyKCksXG4gIG9iamVjdE9mOiBjcmVhdGVPYmplY3RPZlR5cGVDaGVja2VyLFxuICBvbmVPZjogY3JlYXRlRW51bVR5cGVDaGVja2VyLFxuICBvbmVPZlR5cGU6IGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIsXG4gIHNoYXBlOiBjcmVhdGVTaGFwZVR5cGVDaGVja2VyXG59O1xuXG4vKipcbiAqIGlubGluZWQgT2JqZWN0LmlzIHBvbHlmaWxsIHRvIGF2b2lkIHJlcXVpcmluZyBjb25zdW1lcnMgc2hpcCB0aGVpciBvd25cbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9pc1xuICovXG4vKmVzbGludC1kaXNhYmxlIG5vLXNlbGYtY29tcGFyZSovXG5mdW5jdGlvbiBpcyh4LCB5KSB7XG4gIC8vIFNhbWVWYWx1ZSBhbGdvcml0aG1cbiAgaWYgKHggPT09IHkpIHtcbiAgICAvLyBTdGVwcyAxLTUsIDctMTBcbiAgICAvLyBTdGVwcyA2LmItNi5lOiArMCAhPSAtMFxuICAgIHJldHVybiB4ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geTtcbiAgfSBlbHNlIHtcbiAgICAvLyBTdGVwIDYuYTogTmFOID09IE5hTlxuICAgIHJldHVybiB4ICE9PSB4ICYmIHkgIT09IHk7XG4gIH1cbn1cbi8qZXNsaW50LWVuYWJsZSBuby1zZWxmLWNvbXBhcmUqL1xuXG4vKipcbiAqIFdlIHVzZSBhbiBFcnJvci1saWtlIG9iamVjdCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSBhcyBwZW9wbGUgbWF5IGNhbGxcbiAqIFByb3BUeXBlcyBkaXJlY3RseSBhbmQgaW5zcGVjdCB0aGVpciBvdXRwdXQuIEhvd2V2ZXIgd2UgZG9uJ3QgdXNlIHJlYWxcbiAqIEVycm9ycyBhbnltb3JlLiBXZSBkb24ndCBpbnNwZWN0IHRoZWlyIHN0YWNrIGFueXdheSwgYW5kIGNyZWF0aW5nIHRoZW1cbiAqIGlzIHByb2hpYml0aXZlbHkgZXhwZW5zaXZlIGlmIHRoZXkgYXJlIGNyZWF0ZWQgdG9vIG9mdGVuLCBzdWNoIGFzIHdoYXRcbiAqIGhhcHBlbnMgaW4gb25lT2ZUeXBlKCkgZm9yIGFueSB0eXBlIGJlZm9yZSB0aGUgb25lIHRoYXQgbWF0Y2hlZC5cbiAqL1xuZnVuY3Rpb24gUHJvcFR5cGVFcnJvcihtZXNzYWdlKSB7XG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gIHRoaXMuc3RhY2sgPSAnJztcbn1cbi8vIE1ha2UgYGluc3RhbmNlb2YgRXJyb3JgIHN0aWxsIHdvcmsgZm9yIHJldHVybmVkIGVycm9ycy5cblByb3BUeXBlRXJyb3IucHJvdG90eXBlID0gRXJyb3IucHJvdG90eXBlO1xuXG5mdW5jdGlvbiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHZhciBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZSA9IHt9O1xuICB9XG4gIGZ1bmN0aW9uIGNoZWNrVHlwZShpc1JlcXVpcmVkLCBwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgIGNvbXBvbmVudE5hbWUgPSBjb21wb25lbnROYW1lIHx8IEFOT05ZTU9VUztcbiAgICBwcm9wRnVsbE5hbWUgPSBwcm9wRnVsbE5hbWUgfHwgcHJvcE5hbWU7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGlmIChzZWNyZXQgIT09IFJlYWN0UHJvcFR5cGVzU2VjcmV0ICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgY2FjaGVLZXkgPSBjb21wb25lbnROYW1lICsgJzonICsgcHJvcE5hbWU7XG4gICAgICAgIGlmICghbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGVbY2FjaGVLZXldKSB7XG4gICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdZb3UgYXJlIG1hbnVhbGx5IGNhbGxpbmcgYSBSZWFjdC5Qcm9wVHlwZXMgdmFsaWRhdGlvbiAnICsgJ2Z1bmN0aW9uIGZvciB0aGUgYCVzYCBwcm9wIG9uIGAlc2AuIFRoaXMgaXMgZGVwcmVjYXRlZCAnICsgJ2FuZCB3aWxsIG5vdCB3b3JrIGluIHRoZSBuZXh0IG1ham9yIHZlcnNpb24uIFlvdSBtYXkgYmUgJyArICdzZWVpbmcgdGhpcyB3YXJuaW5nIGR1ZSB0byBhIHRoaXJkLXBhcnR5IFByb3BUeXBlcyBsaWJyYXJ5LiAnICsgJ1NlZSBodHRwczovL2ZiLm1lL3JlYWN0LXdhcm5pbmctZG9udC1jYWxsLXByb3B0eXBlcyBmb3IgZGV0YWlscy4nLCBwcm9wRnVsbE5hbWUsIGNvbXBvbmVudE5hbWUpIDogdm9pZCAwO1xuICAgICAgICAgIG1hbnVhbFByb3BUeXBlQ2FsbENhY2hlW2NhY2hlS2V5XSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PSBudWxsKSB7XG4gICAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgICAgaWYgKGlzUmVxdWlyZWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdSZXF1aXJlZCAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHdhcyBub3Qgc3BlY2lmaWVkIGluICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKTtcbiAgICB9XG4gIH1cblxuICB2YXIgY2hhaW5lZENoZWNrVHlwZSA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIGZhbHNlKTtcbiAgY2hhaW5lZENoZWNrVHlwZS5pc1JlcXVpcmVkID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgdHJ1ZSk7XG5cbiAgcmV0dXJuIGNoYWluZWRDaGVja1R5cGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKGV4cGVjdGVkVHlwZSkge1xuICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICBpZiAocHJvcFR5cGUgIT09IGV4cGVjdGVkVHlwZSkge1xuICAgICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICAgIC8vIGBwcm9wVmFsdWVgIGJlaW5nIGluc3RhbmNlIG9mLCBzYXksIGRhdGUvcmVnZXhwLCBwYXNzIHRoZSAnb2JqZWN0J1xuICAgICAgLy8gY2hlY2ssIGJ1dCB3ZSBjYW4gb2ZmZXIgYSBtb3JlIHByZWNpc2UgZXJyb3IgbWVzc2FnZSBoZXJlIHJhdGhlciB0aGFuXG4gICAgICAvLyAnb2YgdHlwZSBgb2JqZWN0YCcuXG4gICAgICB2YXIgcHJlY2lzZVR5cGUgPSBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpO1xuXG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJlY2lzZVR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2AnICsgZXhwZWN0ZWRUeXBlICsgJ2AuJykpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpIHtcbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnMobnVsbCkpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVBcnJheU9mVHlwZUNoZWNrZXIodHlwZUNoZWNrZXIpIHtcbiAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdQcm9wZXJ0eSBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIGNvbXBvbmVudCBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCBoYXMgaW52YWxpZCBQcm9wVHlwZSBub3RhdGlvbiBpbnNpZGUgYXJyYXlPZi4nKTtcbiAgICB9XG4gICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gYXJyYXkuJykpO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BWYWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBpLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJ1snICsgaSArICddJywgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSB7XG4gIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgaWYgKCFSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBzaW5nbGUgUmVhY3RFbGVtZW50LicpKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcihleHBlY3RlZENsYXNzKSB7XG4gIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgIGlmICghKHByb3BzW3Byb3BOYW1lXSBpbnN0YW5jZW9mIGV4cGVjdGVkQ2xhc3MpKSB7XG4gICAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgICAgdmFyIGV4cGVjdGVkQ2xhc3NOYW1lID0gZXhwZWN0ZWRDbGFzcy5uYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgIHZhciBhY3R1YWxDbGFzc05hbWUgPSBnZXRDbGFzc05hbWUocHJvcHNbcHJvcE5hbWVdKTtcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBhY3R1YWxDbGFzc05hbWUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2luc3RhbmNlIG9mIGAnICsgZXhwZWN0ZWRDbGFzc05hbWUgKyAnYC4nKSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUVudW1UeXBlQ2hlY2tlcihleHBlY3RlZFZhbHVlcykge1xuICBpZiAoIUFycmF5LmlzQXJyYXkoZXhwZWN0ZWRWYWx1ZXMpKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mLCBleHBlY3RlZCBhbiBpbnN0YW5jZSBvZiBhcnJheS4nKSA6IHZvaWQgMDtcbiAgICByZXR1cm4gZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGw7XG4gIH1cblxuICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXhwZWN0ZWRWYWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChpcyhwcm9wVmFsdWUsIGV4cGVjdGVkVmFsdWVzW2ldKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgIHZhciB2YWx1ZXNTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShleHBlY3RlZFZhbHVlcyk7XG4gICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdmFsdWUgYCcgKyBwcm9wVmFsdWUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgb25lIG9mICcgKyB2YWx1ZXNTdHJpbmcgKyAnLicpKTtcbiAgfVxuICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVPYmplY3RPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgIGlmICh0eXBlb2YgdHlwZUNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIG9iamVjdE9mLicpO1xuICAgIH1cbiAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhbiBvYmplY3QuJykpO1xuICAgIH1cbiAgICBmb3IgKHZhciBrZXkgaW4gcHJvcFZhbHVlKSB7XG4gICAgICBpZiAocHJvcFZhbHVlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVW5pb25UeXBlQ2hlY2tlcihhcnJheU9mVHlwZUNoZWNrZXJzKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShhcnJheU9mVHlwZUNoZWNrZXJzKSkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZlR5cGUsIGV4cGVjdGVkIGFuIGluc3RhbmNlIG9mIGFycmF5LicpIDogdm9pZCAwO1xuICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZlR5cGVDaGVja2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGNoZWNrZXIgPSBhcnJheU9mVHlwZUNoZWNrZXJzW2ldO1xuICAgICAgaWYgKGNoZWNrZXIocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBSZWFjdFByb3BUeXBlc1NlY3JldCkgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLicpKTtcbiAgfVxuICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVOb2RlQ2hlY2tlcigpIHtcbiAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgaWYgKCFpc05vZGUocHJvcHNbcHJvcE5hbWVdKSkge1xuICAgICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIFJlYWN0Tm9kZS4nKSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXIoc2hhcGVUeXBlcykge1xuICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgfVxuICAgIGZvciAodmFyIGtleSBpbiBzaGFwZVR5cGVzKSB7XG4gICAgICB2YXIgY2hlY2tlciA9IHNoYXBlVHlwZXNba2V5XTtcbiAgICAgIGlmICghY2hlY2tlcikge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHZhciBlcnJvciA9IGNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGlzTm9kZShwcm9wVmFsdWUpIHtcbiAgc3dpdGNoICh0eXBlb2YgcHJvcFZhbHVlKSB7XG4gICAgY2FzZSAnbnVtYmVyJzpcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIHJldHVybiAhcHJvcFZhbHVlO1xuICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBwcm9wVmFsdWUuZXZlcnkoaXNOb2RlKTtcbiAgICAgIH1cbiAgICAgIGlmIChwcm9wVmFsdWUgPT09IG51bGwgfHwgUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihwcm9wVmFsdWUpO1xuICAgICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKHByb3BWYWx1ZSk7XG4gICAgICAgIHZhciBzdGVwO1xuICAgICAgICBpZiAoaXRlcmF0b3JGbiAhPT0gcHJvcFZhbHVlLmVudHJpZXMpIHtcbiAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICBpZiAoIWlzTm9kZShzdGVwLnZhbHVlKSkge1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIEl0ZXJhdG9yIHdpbGwgcHJvdmlkZSBlbnRyeSBbayx2XSB0dXBsZXMgcmF0aGVyIHRoYW4gdmFsdWVzLlxuICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgIHZhciBlbnRyeSA9IHN0ZXAudmFsdWU7XG4gICAgICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgICAgaWYgKCFpc05vZGUoZW50cnlbMV0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkge1xuICAvLyBOYXRpdmUgU3ltYm9sLlxuICBpZiAocHJvcFR5cGUgPT09ICdzeW1ib2wnKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyAxOS40LjMuNSBTeW1ib2wucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddID09PSAnU3ltYm9sJ1xuICBpZiAocHJvcFZhbHVlWydAQHRvU3RyaW5nVGFnJ10gPT09ICdTeW1ib2wnKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBGYWxsYmFjayBmb3Igbm9uLXNwZWMgY29tcGxpYW50IFN5bWJvbHMgd2hpY2ggYXJlIHBvbHlmaWxsZWQuXG4gIGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHByb3BWYWx1ZSBpbnN0YW5jZW9mIFN5bWJvbCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBFcXVpdmFsZW50IG9mIGB0eXBlb2ZgIGJ1dCB3aXRoIHNwZWNpYWwgaGFuZGxpbmcgZm9yIGFycmF5IGFuZCByZWdleHAuXG5mdW5jdGlvbiBnZXRQcm9wVHlwZShwcm9wVmFsdWUpIHtcbiAgdmFyIHByb3BUeXBlID0gdHlwZW9mIHByb3BWYWx1ZTtcbiAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgIHJldHVybiAnYXJyYXknO1xuICB9XG4gIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAvLyBPbGQgd2Via2l0cyAoYXQgbGVhc3QgdW50aWwgQW5kcm9pZCA0LjApIHJldHVybiAnZnVuY3Rpb24nIHJhdGhlciB0aGFuXG4gICAgLy8gJ29iamVjdCcgZm9yIHR5cGVvZiBhIFJlZ0V4cC4gV2UnbGwgbm9ybWFsaXplIHRoaXMgaGVyZSBzbyB0aGF0IC9ibGEvXG4gICAgLy8gcGFzc2VzIFByb3BUeXBlcy5vYmplY3QuXG4gICAgcmV0dXJuICdvYmplY3QnO1xuICB9XG4gIGlmIChpc1N5bWJvbChwcm9wVHlwZSwgcHJvcFZhbHVlKSkge1xuICAgIHJldHVybiAnc3ltYm9sJztcbiAgfVxuICByZXR1cm4gcHJvcFR5cGU7XG59XG5cbi8vIFRoaXMgaGFuZGxlcyBtb3JlIHR5cGVzIHRoYW4gYGdldFByb3BUeXBlYC4gT25seSB1c2VkIGZvciBlcnJvciBtZXNzYWdlcy5cbi8vIFNlZSBgY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXJgLlxuZnVuY3Rpb24gZ2V0UHJlY2lzZVR5cGUocHJvcFZhbHVlKSB7XG4gIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gIGlmIChwcm9wVHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgcmV0dXJuICdkYXRlJztcbiAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgcmV0dXJuICdyZWdleHAnO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcHJvcFR5cGU7XG59XG5cbi8vIFJldHVybnMgY2xhc3MgbmFtZSBvZiB0aGUgb2JqZWN0LCBpZiBhbnkuXG5mdW5jdGlvbiBnZXRDbGFzc05hbWUocHJvcFZhbHVlKSB7XG4gIGlmICghcHJvcFZhbHVlLmNvbnN0cnVjdG9yIHx8ICFwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZSkge1xuICAgIHJldHVybiBBTk9OWU1PVVM7XG4gIH1cbiAgcmV0dXJuIHByb3BWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UHJvcFR5cGVzOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdFByb3BUeXBlc1NlY3JldFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gJ1NFQ1JFVF9ET19OT1RfUEFTU19USElTX09SX1lPVV9XSUxMX0JFX0ZJUkVEJztcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFByb3BUeXBlc1NlY3JldDsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RQdXJlQ29tcG9uZW50XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIFJlYWN0Q29tcG9uZW50ID0gcmVxdWlyZSgnLi9SZWFjdENvbXBvbmVudCcpO1xudmFyIFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlID0gcmVxdWlyZSgnLi9SZWFjdE5vb3BVcGRhdGVRdWV1ZScpO1xuXG52YXIgZW1wdHlPYmplY3QgPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eU9iamVjdCcpO1xuXG4vKipcbiAqIEJhc2UgY2xhc3MgaGVscGVycyBmb3IgdGhlIHVwZGF0aW5nIHN0YXRlIG9mIGEgY29tcG9uZW50LlxuICovXG5mdW5jdGlvbiBSZWFjdFB1cmVDb21wb25lbnQocHJvcHMsIGNvbnRleHQsIHVwZGF0ZXIpIHtcbiAgLy8gRHVwbGljYXRlZCBmcm9tIFJlYWN0Q29tcG9uZW50LlxuICB0aGlzLnByb3BzID0gcHJvcHM7XG4gIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIHRoaXMucmVmcyA9IGVtcHR5T2JqZWN0O1xuICAvLyBXZSBpbml0aWFsaXplIHRoZSBkZWZhdWx0IHVwZGF0ZXIgYnV0IHRoZSByZWFsIG9uZSBnZXRzIGluamVjdGVkIGJ5IHRoZVxuICAvLyByZW5kZXJlci5cbiAgdGhpcy51cGRhdGVyID0gdXBkYXRlciB8fCBSZWFjdE5vb3BVcGRhdGVRdWV1ZTtcbn1cblxuZnVuY3Rpb24gQ29tcG9uZW50RHVtbXkoKSB7fVxuQ29tcG9uZW50RHVtbXkucHJvdG90eXBlID0gUmVhY3RDb21wb25lbnQucHJvdG90eXBlO1xuUmVhY3RQdXJlQ29tcG9uZW50LnByb3RvdHlwZSA9IG5ldyBDb21wb25lbnREdW1teSgpO1xuUmVhY3RQdXJlQ29tcG9uZW50LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFJlYWN0UHVyZUNvbXBvbmVudDtcbi8vIEF2b2lkIGFuIGV4dHJhIHByb3RvdHlwZSBqdW1wIGZvciB0aGVzZSBtZXRob2RzLlxuX2Fzc2lnbihSZWFjdFB1cmVDb21wb25lbnQucHJvdG90eXBlLCBSZWFjdENvbXBvbmVudC5wcm90b3R5cGUpO1xuUmVhY3RQdXJlQ29tcG9uZW50LnByb3RvdHlwZS5pc1B1cmVSZWFjdENvbXBvbmVudCA9IHRydWU7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RQdXJlQ29tcG9uZW50OyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdFZlcnNpb25cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gJzE1LjMuMic7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIGNhbkRlZmluZVByb3BlcnR5XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgY2FuRGVmaW5lUHJvcGVydHkgPSBmYWxzZTtcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHRyeSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAneCcsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7fSB9KTtcbiAgICBjYW5EZWZpbmVQcm9wZXJ0eSA9IHRydWU7XG4gIH0gY2F0Y2ggKHgpIHtcbiAgICAvLyBJRSB3aWxsIGZhaWwgb24gZGVmaW5lUHJvcGVydHlcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNhbkRlZmluZVByb3BlcnR5OyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBjaGVja1JlYWN0VHlwZVNwZWNcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfcHJvZEludmFyaWFudCA9IHJlcXVpcmUoJy4vcmVhY3RQcm9kSW52YXJpYW50Jyk7XG5cbnZhciBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcyA9IHJlcXVpcmUoJy4vUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMnKTtcbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbnZhciBSZWFjdENvbXBvbmVudFRyZWVIb29rO1xuXG5pZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAndGVzdCcpIHtcbiAgLy8gVGVtcG9yYXJ5IGhhY2suXG4gIC8vIElubGluZSByZXF1aXJlcyBkb24ndCB3b3JrIHdlbGwgd2l0aCBKZXN0OlxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvaXNzdWVzLzcyNDBcbiAgLy8gUmVtb3ZlIHRoZSBpbmxpbmUgcmVxdWlyZXMgd2hlbiB3ZSBkb24ndCBuZWVkIHRoZW0gYW55bW9yZTpcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L3B1bGwvNzE3OFxuICBSZWFjdENvbXBvbmVudFRyZWVIb29rID0gcmVxdWlyZSgnLi9SZWFjdENvbXBvbmVudFRyZWVIb29rJyk7XG59XG5cbnZhciBsb2dnZWRUeXBlRmFpbHVyZXMgPSB7fTtcblxuLyoqXG4gKiBBc3NlcnQgdGhhdCB0aGUgdmFsdWVzIG1hdGNoIHdpdGggdGhlIHR5cGUgc3BlY3MuXG4gKiBFcnJvciBtZXNzYWdlcyBhcmUgbWVtb3JpemVkIGFuZCB3aWxsIG9ubHkgYmUgc2hvd24gb25jZS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdHlwZVNwZWNzIE1hcCBvZiBuYW1lIHRvIGEgUmVhY3RQcm9wVHlwZVxuICogQHBhcmFtIHtvYmplY3R9IHZhbHVlcyBSdW50aW1lIHZhbHVlcyB0aGF0IG5lZWQgdG8gYmUgdHlwZS1jaGVja2VkXG4gKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb24gZS5nLiBcInByb3BcIiwgXCJjb250ZXh0XCIsIFwiY2hpbGQgY29udGV4dFwiXG4gKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50TmFtZSBOYW1lIG9mIHRoZSBjb21wb25lbnQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICogQHBhcmFtIHs/b2JqZWN0fSBlbGVtZW50IFRoZSBSZWFjdCBlbGVtZW50IHRoYXQgaXMgYmVpbmcgdHlwZS1jaGVja2VkXG4gKiBAcGFyYW0gez9udW1iZXJ9IGRlYnVnSUQgVGhlIFJlYWN0IGNvbXBvbmVudCBpbnN0YW5jZSB0aGF0IGlzIGJlaW5nIHR5cGUtY2hlY2tlZFxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY2hlY2tSZWFjdFR5cGVTcGVjKHR5cGVTcGVjcywgdmFsdWVzLCBsb2NhdGlvbiwgY29tcG9uZW50TmFtZSwgZWxlbWVudCwgZGVidWdJRCkge1xuICBmb3IgKHZhciB0eXBlU3BlY05hbWUgaW4gdHlwZVNwZWNzKSB7XG4gICAgaWYgKHR5cGVTcGVjcy5oYXNPd25Qcm9wZXJ0eSh0eXBlU3BlY05hbWUpKSB7XG4gICAgICB2YXIgZXJyb3I7XG4gICAgICAvLyBQcm9wIHR5cGUgdmFsaWRhdGlvbiBtYXkgdGhyb3cuIEluIGNhc2UgdGhleSBkbywgd2UgZG9uJ3Qgd2FudCB0b1xuICAgICAgLy8gZmFpbCB0aGUgcmVuZGVyIHBoYXNlIHdoZXJlIGl0IGRpZG4ndCBmYWlsIGJlZm9yZS4gU28gd2UgbG9nIGl0LlxuICAgICAgLy8gQWZ0ZXIgdGhlc2UgaGF2ZSBiZWVuIGNsZWFuZWQgdXAsIHdlJ2xsIGxldCB0aGVtIHRocm93LlxuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyBpcyBpbnRlbnRpb25hbGx5IGFuIGludmFyaWFudCB0aGF0IGdldHMgY2F1Z2h0LiBJdCdzIHRoZSBzYW1lXG4gICAgICAgIC8vIGJlaGF2aW9yIGFzIHdpdGhvdXQgdGhpcyBzdGF0ZW1lbnQgZXhjZXB0IHdpdGggYSBiZXR0ZXIgbWVzc2FnZS5cbiAgICAgICAgISh0eXBlb2YgdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0gPT09ICdmdW5jdGlvbicpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJyVzOiAlcyB0eXBlIGAlc2AgaXMgaW52YWxpZDsgaXQgbXVzdCBiZSBhIGZ1bmN0aW9uLCB1c3VhbGx5IGZyb20gUmVhY3QuUHJvcFR5cGVzLicsIGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJywgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dLCB0eXBlU3BlY05hbWUpIDogX3Byb2RJbnZhcmlhbnQoJzg0JywgY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnLCBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl0sIHR5cGVTcGVjTmFtZSkgOiB2b2lkIDA7XG4gICAgICAgIGVycm9yID0gdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0odmFsdWVzLCB0eXBlU3BlY05hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBudWxsLCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICBlcnJvciA9IGV4O1xuICAgICAgfVxuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoIWVycm9yIHx8IGVycm9yIGluc3RhbmNlb2YgRXJyb3IsICclczogdHlwZSBzcGVjaWZpY2F0aW9uIG9mICVzIGAlc2AgaXMgaW52YWxpZDsgdGhlIHR5cGUgY2hlY2tlciAnICsgJ2Z1bmN0aW9uIG11c3QgcmV0dXJuIGBudWxsYCBvciBhbiBgRXJyb3JgIGJ1dCByZXR1cm5lZCBhICVzLiAnICsgJ1lvdSBtYXkgaGF2ZSBmb3Jnb3R0ZW4gdG8gcGFzcyBhbiBhcmd1bWVudCB0byB0aGUgdHlwZSBjaGVja2VyICcgKyAnY3JlYXRvciAoYXJyYXlPZiwgaW5zdGFuY2VPZiwgb2JqZWN0T2YsIG9uZU9mLCBvbmVPZlR5cGUsIGFuZCAnICsgJ3NoYXBlIGFsbCByZXF1aXJlIGFuIGFyZ3VtZW50KS4nLCBjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycsIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXSwgdHlwZVNwZWNOYW1lLCB0eXBlb2YgZXJyb3IpIDogdm9pZCAwO1xuICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgJiYgIShlcnJvci5tZXNzYWdlIGluIGxvZ2dlZFR5cGVGYWlsdXJlcykpIHtcbiAgICAgICAgLy8gT25seSBtb25pdG9yIHRoaXMgZmFpbHVyZSBvbmNlIGJlY2F1c2UgdGhlcmUgdGVuZHMgdG8gYmUgYSBsb3Qgb2YgdGhlXG4gICAgICAgIC8vIHNhbWUgZXJyb3IuXG4gICAgICAgIGxvZ2dlZFR5cGVGYWlsdXJlc1tlcnJvci5tZXNzYWdlXSA9IHRydWU7XG5cbiAgICAgICAgdmFyIGNvbXBvbmVudFN0YWNrSW5mbyA9ICcnO1xuXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgaWYgKCFSZWFjdENvbXBvbmVudFRyZWVIb29rKSB7XG4gICAgICAgICAgICBSZWFjdENvbXBvbmVudFRyZWVIb29rID0gcmVxdWlyZSgnLi9SZWFjdENvbXBvbmVudFRyZWVIb29rJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChkZWJ1Z0lEICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjb21wb25lbnRTdGFja0luZm8gPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldFN0YWNrQWRkZW5kdW1CeUlEKGRlYnVnSUQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY29tcG9uZW50U3RhY2tJbmZvID0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRDdXJyZW50U3RhY2tBZGRlbmR1bShlbGVtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ0ZhaWxlZCAlcyB0eXBlOiAlcyVzJywgbG9jYXRpb24sIGVycm9yLm1lc3NhZ2UsIGNvbXBvbmVudFN0YWNrSW5mbykgOiB2b2lkIDA7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2hlY2tSZWFjdFR5cGVTcGVjOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBnZXRJdGVyYXRvckZuXG4gKiBcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qIGdsb2JhbCBTeW1ib2wgKi9cblxudmFyIElURVJBVE9SX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLml0ZXJhdG9yO1xudmFyIEZBVVhfSVRFUkFUT1JfU1lNQk9MID0gJ0BAaXRlcmF0b3InOyAvLyBCZWZvcmUgU3ltYm9sIHNwZWMuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgaXRlcmF0b3IgbWV0aG9kIGZ1bmN0aW9uIGNvbnRhaW5lZCBvbiB0aGUgaXRlcmFibGUgb2JqZWN0LlxuICpcbiAqIEJlIHN1cmUgdG8gaW52b2tlIHRoZSBmdW5jdGlvbiB3aXRoIHRoZSBpdGVyYWJsZSBhcyBjb250ZXh0OlxuICpcbiAqICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4obXlJdGVyYWJsZSk7XG4gKiAgICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAqICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChteUl0ZXJhYmxlKTtcbiAqICAgICAgIC4uLlxuICogICAgIH1cbiAqXG4gKiBAcGFyYW0gez9vYmplY3R9IG1heWJlSXRlcmFibGVcbiAqIEByZXR1cm4gez9mdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gZ2V0SXRlcmF0b3JGbihtYXliZUl0ZXJhYmxlKSB7XG4gIHZhciBpdGVyYXRvckZuID0gbWF5YmVJdGVyYWJsZSAmJiAoSVRFUkFUT1JfU1lNQk9MICYmIG1heWJlSXRlcmFibGVbSVRFUkFUT1JfU1lNQk9MXSB8fCBtYXliZUl0ZXJhYmxlW0ZBVVhfSVRFUkFUT1JfU1lNQk9MXSk7XG4gIGlmICh0eXBlb2YgaXRlcmF0b3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBpdGVyYXRvckZuO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0SXRlcmF0b3JGbjsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgb25seUNoaWxkXG4gKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIF9wcm9kSW52YXJpYW50ID0gcmVxdWlyZSgnLi9yZWFjdFByb2RJbnZhcmlhbnQnKTtcblxudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBmaXJzdCBjaGlsZCBpbiBhIGNvbGxlY3Rpb24gb2YgY2hpbGRyZW4gYW5kIHZlcmlmaWVzIHRoYXQgdGhlcmVcbiAqIGlzIG9ubHkgb25lIGNoaWxkIGluIHRoZSBjb2xsZWN0aW9uLlxuICpcbiAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RvcC1sZXZlbC1hcGkuaHRtbCNyZWFjdC5jaGlsZHJlbi5vbmx5XG4gKlxuICogVGhlIGN1cnJlbnQgaW1wbGVtZW50YXRpb24gb2YgdGhpcyBmdW5jdGlvbiBhc3N1bWVzIHRoYXQgYSBzaW5nbGUgY2hpbGQgZ2V0c1xuICogcGFzc2VkIHdpdGhvdXQgYSB3cmFwcGVyLCBidXQgdGhlIHB1cnBvc2Ugb2YgdGhpcyBoZWxwZXIgZnVuY3Rpb24gaXMgdG9cbiAqIGFic3RyYWN0IGF3YXkgdGhlIHBhcnRpY3VsYXIgc3RydWN0dXJlIG9mIGNoaWxkcmVuLlxuICpcbiAqIEBwYXJhbSB7P29iamVjdH0gY2hpbGRyZW4gQ2hpbGQgY29sbGVjdGlvbiBzdHJ1Y3R1cmUuXG4gKiBAcmV0dXJuIHtSZWFjdEVsZW1lbnR9IFRoZSBmaXJzdCBhbmQgb25seSBgUmVhY3RFbGVtZW50YCBjb250YWluZWQgaW4gdGhlXG4gKiBzdHJ1Y3R1cmUuXG4gKi9cbmZ1bmN0aW9uIG9ubHlDaGlsZChjaGlsZHJlbikge1xuICAhUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KGNoaWxkcmVuKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdC5DaGlsZHJlbi5vbmx5IGV4cGVjdGVkIHRvIHJlY2VpdmUgYSBzaW5nbGUgUmVhY3QgZWxlbWVudCBjaGlsZC4nKSA6IF9wcm9kSW52YXJpYW50KCcxNDMnKSA6IHZvaWQgMDtcbiAgcmV0dXJuIGNoaWxkcmVuO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG9ubHlDaGlsZDsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIHJlYWN0UHJvZEludmFyaWFudFxuICogXG4gKi9cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBXQVJOSU5HOiBETyBOT1QgbWFudWFsbHkgcmVxdWlyZSB0aGlzIG1vZHVsZS5cbiAqIFRoaXMgaXMgYSByZXBsYWNlbWVudCBmb3IgYGludmFyaWFudCguLi4pYCB1c2VkIGJ5IHRoZSBlcnJvciBjb2RlIHN5c3RlbVxuICogYW5kIHdpbGwgX29ubHlfIGJlIHJlcXVpcmVkIGJ5IHRoZSBjb3JyZXNwb25kaW5nIGJhYmVsIHBhc3MuXG4gKiBJdCBhbHdheXMgdGhyb3dzLlxuICovXG5cbmZ1bmN0aW9uIHJlYWN0UHJvZEludmFyaWFudChjb2RlKSB7XG4gIHZhciBhcmdDb3VudCA9IGFyZ3VtZW50cy5sZW5ndGggLSAxO1xuXG4gIHZhciBtZXNzYWdlID0gJ01pbmlmaWVkIFJlYWN0IGVycm9yICMnICsgY29kZSArICc7IHZpc2l0ICcgKyAnaHR0cDovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL2Vycm9yLWRlY29kZXIuaHRtbD9pbnZhcmlhbnQ9JyArIGNvZGU7XG5cbiAgZm9yICh2YXIgYXJnSWR4ID0gMDsgYXJnSWR4IDwgYXJnQ291bnQ7IGFyZ0lkeCsrKSB7XG4gICAgbWVzc2FnZSArPSAnJmFyZ3NbXT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGFyZ3VtZW50c1thcmdJZHggKyAxXSk7XG4gIH1cblxuICBtZXNzYWdlICs9ICcgZm9yIHRoZSBmdWxsIG1lc3NhZ2Ugb3IgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50JyArICcgZm9yIGZ1bGwgZXJyb3JzIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuJztcblxuICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIGVycm9yLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCByZWFjdFByb2RJbnZhcmlhbnQncyBvd24gZnJhbWVcblxuICB0aHJvdyBlcnJvcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZWFjdFByb2RJbnZhcmlhbnQ7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIHRyYXZlcnNlQWxsQ2hpbGRyZW5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfcHJvZEludmFyaWFudCA9IHJlcXVpcmUoJy4vcmVhY3RQcm9kSW52YXJpYW50Jyk7XG5cbnZhciBSZWFjdEN1cnJlbnRPd25lciA9IHJlcXVpcmUoJy4vUmVhY3RDdXJyZW50T3duZXInKTtcbnZhciBSZWFjdEVsZW1lbnQgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudCcpO1xuXG52YXIgZ2V0SXRlcmF0b3JGbiA9IHJlcXVpcmUoJy4vZ2V0SXRlcmF0b3JGbicpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIEtleUVzY2FwZVV0aWxzID0gcmVxdWlyZSgnLi9LZXlFc2NhcGVVdGlscycpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbnZhciBTRVBBUkFUT1IgPSAnLic7XG52YXIgU1VCU0VQQVJBVE9SID0gJzonO1xuXG4vKipcbiAqIFRPRE86IFRlc3QgdGhhdCBhIHNpbmdsZSBjaGlsZCBhbmQgYW4gYXJyYXkgd2l0aCBvbmUgaXRlbSBoYXZlIHRoZSBzYW1lIGtleVxuICogcGF0dGVybi5cbiAqL1xuXG52YXIgZGlkV2FybkFib3V0TWFwcyA9IGZhbHNlO1xuXG4vKipcbiAqIEdlbmVyYXRlIGEga2V5IHN0cmluZyB0aGF0IGlkZW50aWZpZXMgYSBjb21wb25lbnQgd2l0aGluIGEgc2V0LlxuICpcbiAqIEBwYXJhbSB7Kn0gY29tcG9uZW50IEEgY29tcG9uZW50IHRoYXQgY291bGQgY29udGFpbiBhIG1hbnVhbCBrZXkuXG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXggSW5kZXggdGhhdCBpcyB1c2VkIGlmIGEgbWFudWFsIGtleSBpcyBub3QgcHJvdmlkZWQuXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldENvbXBvbmVudEtleShjb21wb25lbnQsIGluZGV4KSB7XG4gIC8vIERvIHNvbWUgdHlwZWNoZWNraW5nIGhlcmUgc2luY2Ugd2UgY2FsbCB0aGlzIGJsaW5kbHkuIFdlIHdhbnQgdG8gZW5zdXJlXG4gIC8vIHRoYXQgd2UgZG9uJ3QgYmxvY2sgcG90ZW50aWFsIGZ1dHVyZSBFUyBBUElzLlxuICBpZiAoY29tcG9uZW50ICYmIHR5cGVvZiBjb21wb25lbnQgPT09ICdvYmplY3QnICYmIGNvbXBvbmVudC5rZXkgIT0gbnVsbCkge1xuICAgIC8vIEV4cGxpY2l0IGtleVxuICAgIHJldHVybiBLZXlFc2NhcGVVdGlscy5lc2NhcGUoY29tcG9uZW50LmtleSk7XG4gIH1cbiAgLy8gSW1wbGljaXQga2V5IGRldGVybWluZWQgYnkgdGhlIGluZGV4IGluIHRoZSBzZXRcbiAgcmV0dXJuIGluZGV4LnRvU3RyaW5nKDM2KTtcbn1cblxuLyoqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAqIEBwYXJhbSB7IXN0cmluZ30gbmFtZVNvRmFyIE5hbWUgb2YgdGhlIGtleSBwYXRoIHNvIGZhci5cbiAqIEBwYXJhbSB7IWZ1bmN0aW9ufSBjYWxsYmFjayBDYWxsYmFjayB0byBpbnZva2Ugd2l0aCBlYWNoIGNoaWxkIGZvdW5kLlxuICogQHBhcmFtIHs/Kn0gdHJhdmVyc2VDb250ZXh0IFVzZWQgdG8gcGFzcyBpbmZvcm1hdGlvbiB0aHJvdWdob3V0IHRoZSB0cmF2ZXJzYWxcbiAqIHByb2Nlc3MuXG4gKiBAcmV0dXJuIHshbnVtYmVyfSBUaGUgbnVtYmVyIG9mIGNoaWxkcmVuIGluIHRoaXMgc3VidHJlZS5cbiAqL1xuZnVuY3Rpb24gdHJhdmVyc2VBbGxDaGlsZHJlbkltcGwoY2hpbGRyZW4sIG5hbWVTb0ZhciwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiBjaGlsZHJlbjtcblxuICBpZiAodHlwZSA9PT0gJ3VuZGVmaW5lZCcgfHwgdHlwZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgLy8gQWxsIG9mIHRoZSBhYm92ZSBhcmUgcGVyY2VpdmVkIGFzIG51bGwuXG4gICAgY2hpbGRyZW4gPSBudWxsO1xuICB9XG5cbiAgaWYgKGNoaWxkcmVuID09PSBudWxsIHx8IHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGUgPT09ICdudW1iZXInIHx8IFJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChjaGlsZHJlbikpIHtcbiAgICBjYWxsYmFjayh0cmF2ZXJzZUNvbnRleHQsIGNoaWxkcmVuLFxuICAgIC8vIElmIGl0J3MgdGhlIG9ubHkgY2hpbGQsIHRyZWF0IHRoZSBuYW1lIGFzIGlmIGl0IHdhcyB3cmFwcGVkIGluIGFuIGFycmF5XG4gICAgLy8gc28gdGhhdCBpdCdzIGNvbnNpc3RlbnQgaWYgdGhlIG51bWJlciBvZiBjaGlsZHJlbiBncm93cy5cbiAgICBuYW1lU29GYXIgPT09ICcnID8gU0VQQVJBVE9SICsgZ2V0Q29tcG9uZW50S2V5KGNoaWxkcmVuLCAwKSA6IG5hbWVTb0Zhcik7XG4gICAgcmV0dXJuIDE7XG4gIH1cblxuICB2YXIgY2hpbGQ7XG4gIHZhciBuZXh0TmFtZTtcbiAgdmFyIHN1YnRyZWVDb3VudCA9IDA7IC8vIENvdW50IG9mIGNoaWxkcmVuIGZvdW5kIGluIHRoZSBjdXJyZW50IHN1YnRyZWUuXG4gIHZhciBuZXh0TmFtZVByZWZpeCA9IG5hbWVTb0ZhciA9PT0gJycgPyBTRVBBUkFUT1IgOiBuYW1lU29GYXIgKyBTVUJTRVBBUkFUT1I7XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgY2hpbGQgPSBjaGlsZHJlbltpXTtcbiAgICAgIG5leHROYW1lID0gbmV4dE5hbWVQcmVmaXggKyBnZXRDb21wb25lbnRLZXkoY2hpbGQsIGkpO1xuICAgICAgc3VidHJlZUNvdW50ICs9IHRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsKGNoaWxkLCBuZXh0TmFtZSwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihjaGlsZHJlbik7XG4gICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChjaGlsZHJlbik7XG4gICAgICB2YXIgc3RlcDtcbiAgICAgIGlmIChpdGVyYXRvckZuICE9PSBjaGlsZHJlbi5lbnRyaWVzKSB7XG4gICAgICAgIHZhciBpaSA9IDA7XG4gICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICBjaGlsZCA9IHN0ZXAudmFsdWU7XG4gICAgICAgICAgbmV4dE5hbWUgPSBuZXh0TmFtZVByZWZpeCArIGdldENvbXBvbmVudEtleShjaGlsZCwgaWkrKyk7XG4gICAgICAgICAgc3VidHJlZUNvdW50ICs9IHRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsKGNoaWxkLCBuZXh0TmFtZSwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgdmFyIG1hcHNBc0NoaWxkcmVuQWRkZW5kdW0gPSAnJztcbiAgICAgICAgICBpZiAoUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCkge1xuICAgICAgICAgICAgdmFyIG1hcHNBc0NoaWxkcmVuT3duZXJOYW1lID0gUmVhY3RDdXJyZW50T3duZXIuY3VycmVudC5nZXROYW1lKCk7XG4gICAgICAgICAgICBpZiAobWFwc0FzQ2hpbGRyZW5Pd25lck5hbWUpIHtcbiAgICAgICAgICAgICAgbWFwc0FzQ2hpbGRyZW5BZGRlbmR1bSA9ICcgQ2hlY2sgdGhlIHJlbmRlciBtZXRob2Qgb2YgYCcgKyBtYXBzQXNDaGlsZHJlbk93bmVyTmFtZSArICdgLic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGRpZFdhcm5BYm91dE1hcHMsICdVc2luZyBNYXBzIGFzIGNoaWxkcmVuIGlzIG5vdCB5ZXQgZnVsbHkgc3VwcG9ydGVkLiBJdCBpcyBhbiAnICsgJ2V4cGVyaW1lbnRhbCBmZWF0dXJlIHRoYXQgbWlnaHQgYmUgcmVtb3ZlZC4gQ29udmVydCBpdCB0byBhICcgKyAnc2VxdWVuY2UgLyBpdGVyYWJsZSBvZiBrZXllZCBSZWFjdEVsZW1lbnRzIGluc3RlYWQuJXMnLCBtYXBzQXNDaGlsZHJlbkFkZGVuZHVtKSA6IHZvaWQgMDtcbiAgICAgICAgICBkaWRXYXJuQWJvdXRNYXBzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJdGVyYXRvciB3aWxsIHByb3ZpZGUgZW50cnkgW2ssdl0gdHVwbGVzIHJhdGhlciB0aGFuIHZhbHVlcy5cbiAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgIHZhciBlbnRyeSA9IHN0ZXAudmFsdWU7XG4gICAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICBjaGlsZCA9IGVudHJ5WzFdO1xuICAgICAgICAgICAgbmV4dE5hbWUgPSBuZXh0TmFtZVByZWZpeCArIEtleUVzY2FwZVV0aWxzLmVzY2FwZShlbnRyeVswXSkgKyBTVUJTRVBBUkFUT1IgKyBnZXRDb21wb25lbnRLZXkoY2hpbGQsIDApO1xuICAgICAgICAgICAgc3VidHJlZUNvdW50ICs9IHRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsKGNoaWxkLCBuZXh0TmFtZSwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgdmFyIGFkZGVuZHVtID0gJyc7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBhZGRlbmR1bSA9ICcgSWYgeW91IG1lYW50IHRvIHJlbmRlciBhIGNvbGxlY3Rpb24gb2YgY2hpbGRyZW4sIHVzZSBhbiBhcnJheSAnICsgJ2luc3RlYWQgb3Igd3JhcCB0aGUgb2JqZWN0IHVzaW5nIGNyZWF0ZUZyYWdtZW50KG9iamVjdCkgZnJvbSB0aGUgJyArICdSZWFjdCBhZGQtb25zLic7XG4gICAgICAgIGlmIChjaGlsZHJlbi5faXNSZWFjdEVsZW1lbnQpIHtcbiAgICAgICAgICBhZGRlbmR1bSA9ICcgSXQgbG9va3MgbGlrZSB5b3VcXCdyZSB1c2luZyBhbiBlbGVtZW50IGNyZWF0ZWQgYnkgYSBkaWZmZXJlbnQgJyArICd2ZXJzaW9uIG9mIFJlYWN0LiBNYWtlIHN1cmUgdG8gdXNlIG9ubHkgb25lIGNvcHkgb2YgUmVhY3QuJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCkge1xuICAgICAgICAgIHZhciBuYW1lID0gUmVhY3RDdXJyZW50T3duZXIuY3VycmVudC5nZXROYW1lKCk7XG4gICAgICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgICAgIGFkZGVuZHVtICs9ICcgQ2hlY2sgdGhlIHJlbmRlciBtZXRob2Qgb2YgYCcgKyBuYW1lICsgJ2AuJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBjaGlsZHJlblN0cmluZyA9IFN0cmluZyhjaGlsZHJlbik7XG4gICAgICAhZmFsc2UgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnT2JqZWN0cyBhcmUgbm90IHZhbGlkIGFzIGEgUmVhY3QgY2hpbGQgKGZvdW5kOiAlcykuJXMnLCBjaGlsZHJlblN0cmluZyA9PT0gJ1tvYmplY3QgT2JqZWN0XScgPyAnb2JqZWN0IHdpdGgga2V5cyB7JyArIE9iamVjdC5rZXlzKGNoaWxkcmVuKS5qb2luKCcsICcpICsgJ30nIDogY2hpbGRyZW5TdHJpbmcsIGFkZGVuZHVtKSA6IF9wcm9kSW52YXJpYW50KCczMScsIGNoaWxkcmVuU3RyaW5nID09PSAnW29iamVjdCBPYmplY3RdJyA/ICdvYmplY3Qgd2l0aCBrZXlzIHsnICsgT2JqZWN0LmtleXMoY2hpbGRyZW4pLmpvaW4oJywgJykgKyAnfScgOiBjaGlsZHJlblN0cmluZywgYWRkZW5kdW0pIDogdm9pZCAwO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzdWJ0cmVlQ291bnQ7XG59XG5cbi8qKlxuICogVHJhdmVyc2VzIGNoaWxkcmVuIHRoYXQgYXJlIHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYCwgYnV0XG4gKiBtaWdodCBhbHNvIGJlIHNwZWNpZmllZCB0aHJvdWdoIGF0dHJpYnV0ZXM6XG4gKlxuICogLSBgdHJhdmVyc2VBbGxDaGlsZHJlbih0aGlzLnByb3BzLmNoaWxkcmVuLCAuLi4pYFxuICogLSBgdHJhdmVyc2VBbGxDaGlsZHJlbih0aGlzLnByb3BzLmxlZnRQYW5lbENoaWxkcmVuLCAuLi4pYFxuICpcbiAqIFRoZSBgdHJhdmVyc2VDb250ZXh0YCBpcyBhbiBvcHRpb25hbCBhcmd1bWVudCB0aGF0IGlzIHBhc3NlZCB0aHJvdWdoIHRoZVxuICogZW50aXJlIHRyYXZlcnNhbC4gSXQgY2FuIGJlIHVzZWQgdG8gc3RvcmUgYWNjdW11bGF0aW9ucyBvciBhbnl0aGluZyBlbHNlIHRoYXRcbiAqIHRoZSBjYWxsYmFjayBtaWdodCBmaW5kIHJlbGV2YW50LlxuICpcbiAqIEBwYXJhbSB7Pyp9IGNoaWxkcmVuIENoaWxkcmVuIHRyZWUgb2JqZWN0LlxuICogQHBhcmFtIHshZnVuY3Rpb259IGNhbGxiYWNrIFRvIGludm9rZSB1cG9uIHRyYXZlcnNpbmcgZWFjaCBjaGlsZC5cbiAqIEBwYXJhbSB7Pyp9IHRyYXZlcnNlQ29udGV4dCBDb250ZXh0IGZvciB0cmF2ZXJzYWwuXG4gKiBAcmV0dXJuIHshbnVtYmVyfSBUaGUgbnVtYmVyIG9mIGNoaWxkcmVuIGluIHRoaXMgc3VidHJlZS5cbiAqL1xuZnVuY3Rpb24gdHJhdmVyc2VBbGxDaGlsZHJlbihjaGlsZHJlbiwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCkge1xuICBpZiAoY2hpbGRyZW4gPT0gbnVsbCkge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgcmV0dXJuIHRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsKGNoaWxkcmVuLCAnJywgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdHJhdmVyc2VBbGxDaGlsZHJlbjsiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvUmVhY3QnKTtcbiIsIi8qICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHJvb20uanNcblxuICAgIENvbnZlcnRzIGFsbCB0aGUgY29tcG9uZW50cyBpbiB0aGlzIGZpbGUgaW50byBKYXZhc2NyaXB0XG4gICAgQWxsIHRoZSAuanN4IGZpbGVzIGFyZSBnaXZlbiBpbiB2aWV3cyBkaXJlY3RvcnlcbiAgICBcbiAgICBCcm93c2VyaWZ5L1dhdGNoaWZ5IGFsbG93cyB0aGUgJ3JlcXVpcmUnIGZ1bmN0aW9uIHRvIGJlIHVzZWQgb24gdGhlIENsaWVudCBTaWRlLlxuICAgIFxuXHR3YXRjaGlmeSAuL3B1YmxpYy9icm93c2VyaWZ5L3Jvb20uanMgLW8gLi9wdWJsaWMvYnVuZGxlcy9yb29tQnVuZGxlLmpzIC10IFsgYmFiZWxpZnkgLS1wcmVzZXRzIFsgZXMyMDE1IHJlYWN0IF0gXSAtLWV4dGVuc2lvbj0uanN4IC12XG5cdGJyb3dzZXJpZnkgLi9wdWJsaWMvYnJvd3NlcmlmeS9yb29tLmpzIC1vIC4vcHVibGljL2J1bmRsZXMvcm9vbUJ1bmRsZS5qcyAtdCBbIGJhYmVsaWZ5IC0tcHJlc2V0cyBbIGVzMjAxNSByZWFjdCBdIF0gLS1leHRlbnNpb249LmpzeCAtdlxuXG4gICAgUHV0IHRoaXMgYXQgdGhlIGJvdHRvbSBvZiB0aGUgSFRNTCBmaWxlLiBBdCB0aGUgYmVnaW5uaW5nIG9mIGFsbCB0aGUgc2NyaXB0cyBpbiByb29tSW5kZXguanN4XG4gICAgPHNjcmlwdCBzcmM9XCIvYnVuZGxlcy9yb29tQnVuZGxlLmpzXCI+PC9zY3JpcHQ+XG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbnZhciBSb29tQ29tcG9uZW50ID0gcmVxdWlyZSgnLi8uLi8uLi92aWV3cy9Sb29tLmpzeCcpO1xuXG4vLyBSZWFkcyB0aGUgaHRtbCBvZiB0aGUgcm9vbS1wcm9wcyBzY3JpcHQsIHdoaWNoIHdhcyBpbmplY3RlZCBkYXRhIGZyb20gdGhlIHNlcnZlciBzaWRlXG52YXIgcHJvcFN0ciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vbS1wcm9wc1wiKS5pbm5lckhUTUw7XG5jb25zb2xlLmxvZyhcIlByb3BzIHNlbnQgZnJvbSBTZXJ2ZXIgaW4gU3RyaW5nIGZvcm1cIik7XG5jb25zb2xlLmxvZyhwcm9wU3RyKTtcbmxldCBwcm9wcyA9IEpTT04ucGFyc2UocHJvcFN0cik7XG5jb25zb2xlLmxvZyhcIlByb3BzIGNvbnZlcnRlZCBpbnRvIEpTT046XCIpO1xuY29uc29sZS5sb2cocHJvcHMpO1xuUmVhY3RET00ucmVuZGVyKDxSb29tQ29tcG9uZW50IHJvb209e3Byb3BzLnJvb219IHVzZXI9e3Byb3BzLnVzZXJ9IGV4cGxvcmU9e3Byb3BzLmV4cGxvcmV9IG15UGxheWxpc3RzPXtwcm9wcy5teVBsYXlsaXN0c30gLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb29tJykpOyAgXG4iLCIvKiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBDb3B5cmlnaHQgwqkgXG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyogID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgVklFVzogQ2hhdGJveC5qc3hcblxuICAgIFRoZSBjaGF0Ym94IHdpdGhpbiBlYWNoIHJvb20uXG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyogID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgQENvbXBvbmVudHM6ICAgIFVzZXJMaXN0RW50cnlcbiAgICAgICAgICAgICAgICAgICAgVXNlckxpc3RcbiAgICAgICAgICAgICAgICAgICAgQ2hhdEhlYWRlclxuICAgICAgICAgICAgICAgICAgICBDaGF0TWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICBDaGF0VXNlckFjdGl2aXR5TWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICBDaGF0RGlzcGxheVxuICAgICAgICAgICAgICAgICAgICBDaGF0SW5wdXRcbiAgICAgICAgICAgICAgICAgICAgR3Vlc3RVc2VyRm9ybVxuXG4gICAgQEV4cG9ydHM6ICAgICAgIENoYXRib3hcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIGdldEN1cnJlbnRUaW1lU3RhbXAgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGN1cnJlbnRUaW1lID0gbmV3IERhdGUoKTtcbiAgdmFyIGN1cnJlbnRUaW1lSG91ciA9IGN1cnJlbnRUaW1lLmdldEhvdXJzKCk7XG4gIHZhciBjdXJyZW50VGltZU1pbnV0ZSA9IGN1cnJlbnRUaW1lLmdldE1pbnV0ZXMoKTtcbiAgdmFyIGVpdGhlckFtT3JQbSA9IFwiYW1cIjtcblxuICBpZiAoY3VycmVudFRpbWVIb3VyID09IDApIHtcbiAgICBjdXJyZW50VGltZUhvdXIgPSAxMjtcbiAgfVxuICBlbHNlIGlmIChjdXJyZW50VGltZUhvdXIgPj0gMTIpIHtcbiAgICBlaXRoZXJBbU9yUG0gPSBcInBtXCI7XG4gICAgaWYgKGN1cnJlbnRUaW1lSG91ciA+IDEyKSB7XG4gICAgICBjdXJyZW50VGltZUhvdXIgLT0gMTI7XG4gICAgfVxuICB9XG4gIHJldHVybiBjdXJyZW50VGltZUhvdXIgKyBcIjpcIiArIGN1cnJlbnRUaW1lTWludXRlICsgZWl0aGVyQW1PclBtO1xufVxuXG52YXIgVXNlckxpc3RFbnRyeSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgb25saW5lOiB0aGlzLnByb3BzLm9ubGluZSxcbiAgICAgIG1vZGVyYXRvcjogdGhpcy5wcm9wcy5tb2RlcmF0b3IsXG4gICAgICBzeW5jaW5nOiB0aGlzLnByb3BzLnN5bmNpbmdcbiAgICB9XG4gIH0sXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIG5hbWUgPSB0aGlzLnByb3BzLnVzZXJOYW1lO1xuICAgIHZhciBvbmxpbmUgPSB0aGlzLnN0YXRlLm9ubGluZTtcbiAgICB2YXIgbW9kZXJhdG9yID0gdGhpcy5zdGF0ZS5tb2RlcmF0b3I7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGxpPlxuICAgICAgICAgIHtcbiAgICAgICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgICAgIGlmKG9ubGluZSkgcmV0dXJuIDxpIGNsYXNzTmFtZT1cImZhIGZhLWNpcmNsZSBzdGF0dXMgc3RhdHVzLW9ubGluZVwiPjwvaT5cbiAgICAgICAgICAgICAgZWxzZSByZXR1cm4gPGkgY2xhc3NOYW1lPVwiZmEgZmEtY2lyY2xlIHN0YXR1cyBzdGF0dXMtb2ZmbGluZVwiPjwvaT5cbiAgICAgICAgICAgIH0pKClcbiAgICAgICAgICB9XG4gICAgICAgICAgPGEgY2xhc3NOYW1lPVwidXNlci1uYW1lXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiPntuYW1lfTwvYT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInVzZXJzLWxpc3QtZWRpdFwiPjxhIGNsYXNzTmFtZT1cImljb24tYnRuXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiPjxpIGNsYXNzTmFtZT1cImZhIGZhLXN0YXIgZmEtZncgbW9kLXRvZ2dsZVwiPjwvaT48L2E+PGEgY2xhc3NOYW1lPVwiaWNvbi1idG5cIiBkYXRhLXRvZ2dsZT1cIm1vZGFsXCIgZGF0YS10YXJnZXQ9XCIja2ljay1jb25maXJtXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiPjxpIGNsYXNzTmFtZT1cImZhIGZhLXJlbW92ZSBmYS1md1wiPjwvaT48L2E+PC9kaXY+XG4gICAgICAgICAgey8qIDxkaXYgY2xhc3NOYW1lPVwidXNlcnMtbGlzdC1pY29uc1wiPjxpIGNsYXNzTmFtZT1cImZhIGZhLXJlZnJlc2ggZmEtc3BpbiBmYS1md1wiIGRhdGEtdG9nZ2xlPVwidG9vbHRpcFwiIHRpdGxlPVwiU3luY2luZ1wiPjwvaT48aSBjbGFzc05hbWU9XCJmYSBmYS1zdGFyIGZhLWZ3XCIgZGF0YS10b2dnbGU9XCJ0b29sdGlwXCIgdGl0bGU9XCJNb2RlcmF0b3JcIj48L2k+PC9kaXY+ICovfVxuICAgICAgICA8L2xpPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59KTtcblxudmFyIFVzZXJMaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuXG4gICAgLy8gdmFyIG9ubGluZVVzZXJzID0gW1xuICAgIC8vICAgXCJHZXJhcmQgTGl1XCIsXG4gICAgLy8gICBcIlJhbmR5IFRydW9uZ1wiLFxuICAgIC8vICAgXCJLZXZpbiBDaGlhb1wiLFxuICAgIC8vICAgXCJIYXJyaXNvbiBGb3JkXCJcbiAgICAvLyBdO1xuXG4gICAgLy8gdmFyIG9mZmxpbmVVc2VycyA9IFtcbiAgICAvLyAgIFwiTWlubmFsIEt1bm5hblwiLFxuICAgIC8vICAgXCJKYXNvbiBNYXJ5bmVcIixcbiAgICAvLyAgIFwiRXJpYyBEaWV1XCIsXG4gICAgLy8gICBcIktldmluIFRvblwiLFxuICAgIC8vICAgXCJLcmlzIEx1b25nXCIsXG4gICAgLy8gICBcIkZyYW5reSBOZ3V5ZW5cIixcbiAgICAvLyAgIFwiQWRyaWFuIE1hbmRlZVwiLFxuICAgIC8vICAgXCJKYXkgWWVlXCIsXG4gICAgLy8gICBcIkdlb3JnZSBIdWFuZ1wiLFxuICAgIC8vICAgXCJKZWxseSBLaWRcIixcbiAgICAvLyAgIFwiRmlubiBIdW1hblwiXG4gICAgLy8gXTtcblxuICAgIHZhciBvbmxpbmVVc2VyRW50cmllcyA9IFtdXG4gICAgdmFyIG9mZmxpbmVVc2VyRW50cmllcyA9IFtdXG5cbiAgICBmb3IgKHZhciBpIGluIHRoaXMucHJvcHMudXNlckxpc3QpIHtcbiAgICAgIG9ubGluZVVzZXJFbnRyaWVzLnB1c2goPFVzZXJMaXN0RW50cnkga2V5PXtpfSB1c2VyTmFtZT17dGhpcy5wcm9wcy51c2VyTGlzdFtpXX0gb25saW5lPXt0cnVlfS8+KVxuICAgIH1cblxuICAgIC8vIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLnN0YXRlLnVzZXJMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gICBvbmxpbmVVc2VyRW50cmllcy5wdXNoKDxVc2VyTGlzdEVudHJ5IGtleT17aX0gdXNlck5hbWU9e29ubGluZVVzZXJzW2ldfSBvbmxpbmU9e3RydWV9Lz4pXG4gICAgLy8gfVxuICAgIC8vIGZvcih2YXIgaSA9IDA7IGkgPCBvZmZsaW5lVXNlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAvLyAgIG9mZmxpbmVVc2VyRW50cmllcy5wdXNoKDxVc2VyTGlzdEVudHJ5IGtleT17aX0gdXNlck5hbWU9e29mZmxpbmVVc2Vyc1tpXX0gb25saW5lPXtmYWxzZX0vPilcbiAgICAvLyB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdiBpZD1cInVzZXJzLWxpc3QtY29udGFpbmVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ1c2Vycy1saXN0LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ1c2Vycy1saXN0LWhlYWRlciB1c2Vycy1vbmxpbmUtc2VjdGlvblwiPlxuICAgICAgICAgICAgICBNZW1iZXJzXG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tc20gYnRuLXNlY29uZGFyeSB1c2Vycy1saXN0LWVkaXQtYnRuXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtZ2VhclwiIGlkPVwidXNlcnMtbGlzdC1nZWFyLWljb25cIj48L2k+PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidXNlcnMtbGlzdC1zY3JvbGwtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJ1c2Vycy1saXN0XCI+XG4gICAgICAgICAgICAgICAge29ubGluZVVzZXJFbnRyaWVzfVxuICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwidXNlcnMtbGlzdCB1c2Vycy1saXN0LXNlY3Rpb24gdXNlcnMtb2ZmbGluZS1zZWN0aW9uXCI+XG4gICAgICAgICAgICAgICAge29mZmxpbmVVc2VyRW50cmllc31cbiAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ1c2Vycy1saXN0IHVzZXJzLWxpc3Qtc2VjdGlvbiB1c2Vycy1saXN0LWFkZFwiPjxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tc20gYnRuLXNlY29uZGFyeVwiIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXRhcmdldD1cIiNhZGQtdXNlclwiPjxpIGNsYXNzTmFtZT1cImZhIGZhLXBsdXMgZmEtZndcIj48L2k+QWRkIFBlb3BsZTwvYnV0dG9uPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufSk7XG5cbnZhciBDaGF0SGVhZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICB1c2VyTGlzdDoge31cbiAgICB9O1xuICB9LFxuXG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICBzb2NrZXQub24oXCJGcm9tIFNlcnZlcjogRWRpdCBVc2VyIGxpc3RcIiwgdGhpcy5lZGl0VXNlckxpc3QpO1xuICB9LFxuXG4gIGVkaXRVc2VyTGlzdDogZnVuY3Rpb24obmV3VXNlckxpc3QpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgdXNlckxpc3Q6IG5ld1VzZXJMaXN0IH0pO1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJvb21OYW1lID0gXCJcIjtcbiAgICBpZiAodGhpcy5wcm9wcy5yb29tICE9PSB1bmRlZmluZWQgJiYgdGhpcy5wcm9wcy5yb29tICE9PSBudWxsKSB7XG4gICAgICByb29tTmFtZSA9IHRoaXMucHJvcHMucm9vbS5uYW1lO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvb20taGVhZGVyXCI+XG4gICAgICAgIHsvKlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvb20tbmFtZSBvbmNsaWNrLWVkaXRcIj5cbiAgICAgICAgICBcbiAgICAgICAgICA8YSBjbGFzc05hbWU9XCJpY29uLWJ0bi1kYXJrXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiPjxpIGNsYXNzTmFtZT1cImZhIGZhLWVkaXRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+PC9hPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgKi99XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb29tLW5hbWVcIj5cbiAgICAgICAgICB7cm9vbU5hbWV9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidXNlcnMtYnRuXCI+XG4gICAgICAgICAge09iamVjdC5rZXlzKHRoaXMuc3RhdGUudXNlckxpc3QpLmxlbmd0aH1cbiAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS11c2VycyB1c2Vycy1idG4taWNvblwiPjwvaT5cbiAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1jaXJjbGUgc3RhdHVzIHN0YXR1cy1vbmxpbmVcIj48L2k+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxVc2VyTGlzdCB1c2VyTGlzdD17dGhpcy5zdGF0ZS51c2VyTGlzdH0gLz5cblxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59KTtcblxudmFyIENoYXRNZXNzYWdlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBvd25lcjogdGhpcy5wcm9wcy5vd25lcixcbiAgICAgIG1lc3NhZ2U6IHRoaXMucHJvcHMubWVzc2FnZSxcbiAgICAgIHVzZXJuYW1lOiB0aGlzLnByb3BzLnVzZXJuYW1lXG4gICAgfVxuICB9LFxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICQodGhpcy5tc2cpLnRvb2x0aXAoKTtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICB7XG4gICAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICAgIGlmKHRoaXMuc3RhdGUub3duZXIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoYXQtbXNnLXVzZXJcIj5cbiAgICAgICAgICAgICAgICAgIHsvKiBUT0RPOiB0aW1lc3RhbXAgbXVzdCBiZSBpbXBsZW1lbnRlZCBpbnRvIHRpdGxlICovfVxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtc2dcIiByZWY9eyhyZWYpID0+IHRoaXMubXNnID0gcmVmfSBkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIiBkYXRhLXBsYWNlbWVudD1cImxlZnRcIiB0aXRsZT1cIjQ6MjBwbVwiPnt0aGlzLnN0YXRlLm1lc3NhZ2V9PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoYXQtbXNnXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hbWVcIj57dGhpcy5zdGF0ZS51c2VybmFtZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgIHsvKiBUT0RPOiB0aW1lc3RhbXAgbXVzdCBiZSBpbXBsZW1lbnRlZCBpbnRvIHRpdGxlICovfVxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtc2dcIiByZWY9eyhyZWYpID0+IHRoaXMubXNnID0gcmVmfSBkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIiBkYXRhLXBsYWNlbWVudD1cInJpZ2h0XCIgdGl0bGU9e3RoaXMucHJvcHMudGltZVN0YW1wfT57dGhpcy5zdGF0ZS5tZXNzYWdlfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJwcm9maWxlLXBpY1wiIHNyYz1cImltYWdlcy9wcm9maWxlLXBpYy5wbmdcIi8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSgpXG4gICAgICAgIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG52YXIgQ2hhdFVzZXJBY3Rpdml0eU1lc3NhZ2UgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIHtcbiAgICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoKHRoaXMucHJvcHMuYWN0aXZpdHkpIHtcbiAgICAgICAgICAgICAgY2FzZSBcImpvaW5lZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImNoYXQtbm90aWZcIj57dGhpcy5wcm9wcy51c2VybmFtZX0gaGFzIGpvaW5lZCB0aGUgY2hhdC48L2Rpdj5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSBcImRpc2Nvbm5lY3RlZFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImNoYXQtbm90aWZcIj57dGhpcy5wcm9wcy51c2VybmFtZX0gaGFzIGxlZnQgdGhlIGNoYXQuPC9kaXY+XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgICkoKVxuICAgICAgICB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxudmFyIENoYXREaXNwbGF5ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBtZXNzYWdlczogW11cbiAgICB9XG4gIH0sXG4gIGF1dG9zY3JvbGw6IHRydWUsXG4gIHNjcm9sbFRvQm90dG9tOiBmdW5jdGlvbigpIHtcbiAgICAvLyB0aGlzLmNoYXQuc2Nyb2xsVG9wID0gdGhpcy5jaGF0LnNjcm9sbEhlaWdodDtcbiAgICAkLmdldFNjcmlwdChcImpzL2pxdWVyeS5tQ3VzdG9tU2Nyb2xsYmFyLmNvbmNhdC5taW4uanNcIiwgZnVuY3Rpb24oKXtcbiAgICAgICQoJy5jaGF0JykubUN1c3RvbVNjcm9sbGJhcignc2Nyb2xsVG8nLCdib3R0b20nLHtzY3JvbGxJbmVydGlhOjIwMH0pO1xuICAgIH0pO1xuICB9LFxuICB1c2VySGFzSm9pbmVkOiBmdW5jdGlvbih1c2VyKSB7XG4gICAgICB2YXIgbWVzc2FnZXMgPSB0aGlzLnN0YXRlLm1lc3NhZ2VzXG4gICAgICBtZXNzYWdlcy5wdXNoKDxDaGF0VXNlckFjdGl2aXR5TWVzc2FnZSBrZXk9e3RoaXMuc3RhdGUubWVzc2FnZXMubGVuZ3RofSB1c2VybmFtZT17dXNlci51c2VybmFtZX0gYWN0aXZpdHk9e1wiam9pbmVkXCJ9IC8+KVxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIG1lc3NhZ2VzOiBtZXNzYWdlc1xuICAgICAgfSk7XG4gIH0sXG4gIHVzZXJIYXNEaXNjb25uZWN0ZWQ6IGZ1bmN0aW9uKHVzZXIpIHtcbiAgICAgIHZhciBtZXNzYWdlcyA9IHRoaXMuc3RhdGUubWVzc2FnZXNcbiAgICAgIG1lc3NhZ2VzLnB1c2goPENoYXRVc2VyQWN0aXZpdHlNZXNzYWdlIGtleT17dGhpcy5zdGF0ZS5tZXNzYWdlcy5sZW5ndGh9IHVzZXJuYW1lPXt1c2VyLnVzZXJuYW1lfSBhY3Rpdml0eT17XCJkaXNjb25uZWN0ZWRcIn0gLz4pXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbWVzc2FnZXM6IG1lc3NhZ2VzXG4gICAgICB9KTtcbiAgfSxcbiAgbmV3TWVzc2FnZTogZnVuY3Rpb24obXNnKSB7XG4gICAgICB2YXIgaXNPd25lciA9IHRoaXMucHJvcHMudXNlcm5hbWUgPT09IG1zZy51c2VybmFtZTtcbiAgICAgIHZhciBtZXNzYWdlcyA9IHRoaXMuc3RhdGUubWVzc2FnZXNcbiAgICAgIHZhciBjdXJyZW50VGltZSA9IG5ldyBEYXRlKCk7XG4gICAgICB2YXIgY3VycmVudFRpbWVIb3VyID0gY3VycmVudFRpbWUuZ2V0SG91cnMoKTtcbiAgICAgIHZhciBjdXJyZW50VGltZU1pbnV0ZSA9IGN1cnJlbnRUaW1lLmdldE1pbnV0ZXMoKTtcbiAgICAgIHZhciBlaXRoZXJBbU9yUG0gPSBcImFtXCI7XG5cbiAgICAgIGlmIChjdXJyZW50VGltZUhvdXIgPT0gMCkge1xuICAgICAgICBjdXJyZW50VGltZUhvdXIgPSAxMjtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGN1cnJlbnRUaW1lSG91ciA+PSAxMikge1xuICAgICAgICBlaXRoZXJBbU9yUG0gPSBcInBtXCI7XG4gICAgICAgIGlmIChjdXJyZW50VGltZUhvdXIgPiAxMikge1xuICAgICAgICAgIGN1cnJlbnRUaW1lSG91ciAtPSAxMjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY3VycmVudFRpbWUgPSBjdXJyZW50VGltZUhvdXIgKyBcIjpcIiArIGN1cnJlbnRUaW1lTWludXRlICsgZWl0aGVyQW1PclBtO1xuXG4gICAgICBtZXNzYWdlcy5wdXNoKDxDaGF0TWVzc2FnZSBrZXk9e3RoaXMuc3RhdGUubWVzc2FnZXMubGVuZ3RofSB1c2VybmFtZT17bXNnLnVzZXJuYW1lfSBvd25lcj17aXNPd25lcn0gbWVzc2FnZT17bXNnLm1lc3NhZ2V9IHRpbWVTdGFtcD17Y3VycmVudFRpbWV9IC8+KVxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIG1lc3NhZ2VzOiBtZXNzYWdlc1xuICAgICAgfSk7XG4gIH0sXG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICBzb2NrZXQub24oXCJGcm9tIFNlcnZlcjogVXNlciBqb2luZWRcIiwgdGhpcy51c2VySGFzSm9pbmVkKTtcbiAgICBzb2NrZXQub24oJ0Zyb20gU2VydmVyOiBVc2VyIGRpc2Nvbm5lY3RlZCcsIHRoaXMudXNlckhhc0Rpc2Nvbm5lY3RlZCk7XG4gICAgc29ja2V0Lm9uKCdGcm9tIFNlcnZlcjogQ2hhdCBtZXNzYWdlJywgdGhpcy5uZXdNZXNzYWdlKTtcblxuICAgIHRoaXMuc2Nyb2xsVG9Cb3R0b20oKTtcbiAgfSxcbiAgY29tcG9uZW50V2lsbFVwZGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGlzQXRSZWNlbnRNZXNzYWdlcyA9IHRoaXMuY2hhdC5zY3JvbGxUb3AgPT0gKHRoaXMuY2hhdC5zY3JvbGxIZWlnaHQgLSB0aGlzLmNoYXQuY2xpZW50SGVpZ2h0KVxuICAgIGlmKGlzQXRSZWNlbnRNZXNzYWdlcykge1xuICAgICAgdGhpcy5hdXRvc2Nyb2xsID0gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmF1dG9zY3JvbGwgPSBmYWxzZTtcbiAgICB9XG4gIH0sXG4gIGNvbXBvbmVudERpZFVwZGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgaWYodGhpcy5hdXRvc2Nyb2xsKSB7XG4gICAgICB0aGlzLnNjcm9sbFRvQm90dG9tKCk7XG4gICAgfVxuICB9LFxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoYXRcIiByZWY9eyhyZWYpID0+IHRoaXMuY2hhdCA9IHJlZn0+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5tZXNzYWdlc1xuICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxudmFyIENoYXRJbnB1dCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbWVzc2FnZTogXCJcIlxuICAgIH1cbiAgfSxcbiAgaWZVc2VybmFtZUV4aXN0czogZnVuY3Rpb24oKSB7XG4gICAgaWYgKCF0aGlzLnByb3BzLnVzZXJuYW1lIHx8ICgwID09PSB0aGlzLnN0YXRlLnVzZXJuYW1lLmxlbmd0aCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIHVwZGF0ZU1lc3NhZ2U6IGZ1bmN0aW9uKGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG1lc3NhZ2U6IGUudGFyZ2V0LnZhbHVlXG4gICAgfSk7XG4gIH0sXG4gIGNsZWFyTWVzc2FnZTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBtZXNzYWdlOiBcIlwiXG4gICAgfSlcbiAgfSxcbiAgc2VuZE1lc3NhZ2U6IGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAvLyBUT0RPIERvIG1lc3NhZ2UgaW5wdXQgc3RyaW5nIGNoZWNrc1xuICAgIC8vIE5vIGVtcHR5IHN0cmluZywgbm8gd2hpdGUgc3BhY2VzLCBWYWxpZCBjaGFyYWN0ZXJzIGEteiwgQS1aLCAwLTlcbiAgICAvLyBDbGllbnQgZW1pdHMgdG8gc2VydmVyIHdpdGggQ2hhdCBNZXNzYWdlXG4gICAgc29ja2V0LmVtaXQoJ0Zyb20gQ2xpZW50OiBDaGF0IG1lc3NhZ2UnLCB0aGlzLnN0YXRlLm1lc3NhZ2UpO1xuICAgIHRoaXMuY2xlYXJNZXNzYWdlKCk7XG4gIH0sXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2hhdC1pbnB1dC1jb250YWluZXJcIj5cbiAgICAgICAgPGZvcm0gY2xhc3NOYW1lPVwiY2hhdC1pbnB1dFwiIGlkPSdjaGF0LWZvcm0nIGFjdGlvbj1cIlwiIG9uU3VibWl0PXt0aGlzLnNlbmRNZXNzYWdlfT5cbiAgICAgICAgICA8aW5wdXQgaWQ9XCJtXCIgdmFsdWU9e3RoaXMuc3RhdGUubWVzc2FnZX0gb25DaGFuZ2U9e3RoaXMudXBkYXRlTWVzc2FnZX0gYXV0b0NvbXBsZXRlPVwib2ZmXCIgdHlwZT1cInRleHRcIiBjbGFzc05hbWU9XCJjaGF0LXRleHRib3hcIiBuYW1lPVwiXCIgcGxhY2Vob2xkZXI9XCJUeXBlIGEgbWVzc2FnZS4uLlwiIC8+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG52YXIgR3Vlc3RVc2VyRm9ybSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXNlcm5hbWU6IFwiXCJcbiAgICB9XG4gIH0sXG4gIHVwZGF0ZVVzZXJuYW1lOiBmdW5jdGlvbihlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICB1c2VybmFtZTogZS50YXJnZXQudmFsdWVcbiAgICB9KTtcbiAgfSxcbiAgc3VibWl0VXNlcm5hbWU6IGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5wcm9wcy5zZXRVc2VybmFtZUNhbGxiYWNrKHRoaXMuc3RhdGUudXNlcm5hbWUpO1xuXG4gICAgLy8gVE9ETyBEbyB1c2VybmFtZSBpbnB1dCBzdHJpbmcgY2hlY2tzXG4gICAgLy8gTm8gZW1wdHkgc3RyaW5nLCBubyB3aGl0ZSBzcGFjZXMsIFZhbGlkIGNoYXJhY3RlcnMgYS16LCBBLVosIDAtOVxuICAgIC8vIENsaWVudCBlbWl0cyB0byBzZXJ2ZXIgd2l0aCBBZGQgdXNlclxuICAgIHNvY2tldC5lbWl0KCdGcm9tIENsaWVudDogQWRkIHVzZXInLCB0aGlzLnN0YXRlLnVzZXJuYW1lKTtcbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbCBmYWRlXCIgaWQ9XCJlbnRlci1uYW1lXCIgdGFiSW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIiBhcmlhLWxhYmVsbGVkYnk9XCJteU1vZGFsTGFiZWxcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1kaWFsb2cgbW9kYWwtc21cIiByb2xlPVwiZG9jdW1lbnRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtYm9keVwiPlxuICAgICAgICAgICAgICA8Zm9ybSBjbGFzc05hbWU9XCJzZWFyY2gtaW5wdXRcIiBpZD0ndXNlcm5hbWUtZm9ybScgYWN0aW9uPVwiXCIgb25TdWJtaXQ9e3RoaXMuc3VibWl0VXNlcm5hbWV9PlxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS51c2VybmFtZX0gb25DaGFuZ2U9e3RoaXMudXBkYXRlVXNlcm5hbWV9IGF1dG9Db21wbGV0ZT1cIm9mZlwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwiY2hhdC10ZXh0Ym94XCIgbmFtZT1cIlwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgWW91ciBOYW1lXCIgYXV0b0ZvY3VzPXt0cnVlfSAvPlxuICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn0pO1xuXG4vKiBDaGF0Ym94ICovXG52YXIgQ2hhdGJveCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5wcm9wcy51c2VyID09PSB1bmRlZmluZWQgfHwgdGhpcy5wcm9wcy51c2VyID09PSBudWxsKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB1c2VybmFtZTogXCJcIlxuICAgICAgfTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB1c2VybmFtZTogdGhpcy5wcm9wcy51c2VyLmxvY2FsLmZpcnN0TmFtZSArIFwiIFwiICsgdGhpcy5wcm9wcy51c2VyLmxvY2FsLmxhc3ROYW1lXG4gICAgICB9O1xuICAgIH1cbiAgfSxcbiAgc2V0VXNlcm5hbWU6IGZ1bmN0aW9uKHVzZXJuYW1lKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICB1c2VybmFtZTogdXNlcm5hbWVcbiAgICB9KTtcbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPENoYXRIZWFkZXIgcm9vbT17dGhpcy5wcm9wcy5yb29tfSAvPlxuICAgICAgICA8Q2hhdERpc3BsYXkgdXNlcm5hbWU9e3RoaXMuc3RhdGUudXNlcm5hbWV9IC8+XG4gICAgICAgIDxDaGF0SW5wdXQgdXNlcm5hbWU9e3RoaXMuc3RhdGUudXNlcm5hbWV9IC8+XG4gICAgICAgey8qIDxHdWVzdFVzZXJGb3JtIHNldFVzZXJuYW1lQ2FsbGJhY2s9e3RoaXMuc2V0VXNlcm5hbWV9IC8+ICovfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2hhdGJveDtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgTWVkaWFFbnRyeSA9IHJlcXVpcmUoJy4vTWVkaWFFbnRyeS5qc3gnKTtcblxudmFyIHBsYXlsaXN0QWN0aW9ucyA9IHJlcXVpcmUoJy4uL2ZsdXgvYWN0aW9ucy9hY3Rpb25zJyk7XG52YXIgcGxheWxpc3RTdG9yZSA9IHJlcXVpcmUoJy4uL2ZsdXgvc3RvcmVzL3N0b3JlJyk7XG5cbnZhciBTYXZlQ2FuY2VsQnV0dG9ucyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgc2F2ZVVwZGF0ZWRQbGF5bGlzdDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5wcm9wcy5vblNhdmVDbGljaygpO1xuICB9LFxuXG4gIGNhbmNlbFNhdmluZ1BsYXlsaXN0OiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnByb3BzLm9uQ2FuY2VsQ2xpY2soKTtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybihcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2F2ZS1jYW5jZWxcIj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgb25DbGljaz17dGhpcy5zYXZlVXBkYXRlZFBsYXlsaXN0fT5TYXZlPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tc2Vjb25kYXJ5XCIgb25DbGljaz17dGhpcy5jYW5jZWxTYXZpbmdQbGF5bGlzdH0+Q2FuY2VsPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxudmFyIFByaXZhdGVQdWJsaWNEcm9wZG93biA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAvLyBUT0RPOiBJZiB0aGUgcGxheWxpc3QgaXMgaW5pdGlhbGl6ZWQgYXMgcHJpdmF0ZSwgdGhlbiB0aGUgZHJvcGRvd24gZXhpc3RzXG4gICAgLy8gaWYgKCF0aGlzLnByb3BzLmlzUHVibGljKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByaXZhdGUtcHVibGljXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcm9wZG93blwiPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1zZWNvbmRhcnkgZHJvcGRvd24tdG9nZ2xlXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCI+XG4gICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWxvY2sgaWNvbi1wYWRkaW5nXCI+PC9pPlxuICAgICAgICAgICAgICBQcml2YXRlIFBsYXlsaXN0XG4gICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWFuZ2xlLWRvd24gZHJvcGRvd24tYXJyb3dcIj48L2k+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJkcm9wZG93bi1tZW51XCI+XG4gICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtbG9ja1wiPjwvaT5Qcml2YXRlIFBsYXlsaXN0PC9hPjwvbGk+XG4gICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtZ2xvYmVcIj48L2k+UHVibGljIFBsYXlsaXN0PC9hPjwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgLy8gfVxuXG4gICAgLy8gSWYgdGhlIHBsYXlsaXN0IGlzIGluaXRpYWxpemVkIGFzIHB1YmxpYywgaXQgd2lsbCBzdGF5IHB1YmxpY1xuICAgIC8vIGVsc2Uge1xuICAgIC8vICAgcmV0dXJuIChcbiAgICAvLyAgICAgPGRpdiBjbGFzc05hbWU9XCJwdWJsaWMtbm90ZVwiPjxpIGNsYXNzTmFtZT1cImZhIGZhLWdsb2JlIGljb24tcGFkZGluZ1wiPjwvaT5QdWJsaWMgUGxheWxpc3Q8L2Rpdj5cbiAgICAvLyAgICk7ICBcbiAgICAvLyB9XG4gIH1cbn0pO1xuXG52YXIgRGVsZXRlUGxheWxpc3RCdXR0b24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tdHJhc2ggdHJhc2gtcGxheWxpc3QtYnRuXCIgZGF0YS10b2dnbGU9XCJtb2RhbFwiIGRhdGEtdGFyZ2V0PVwiI3RyYXNoLWNvbmZpcm1cIj48aSBjbGFzc05hbWU9XCJmYSBmYS10cmFzaFwiPjwvaT48L2J1dHRvbj5cbiAgICApO1xuICB9XG59KTtcblxudmFyIFBsYXlsaXN0SGVhZGVyQnV0dG9uc1RvQ2hhbmdlU3RhdGVzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlY3Rpb25cIj5cbiAgICAgICAgPFNhdmVDYW5jZWxCdXR0b25zIG9uQ2FuY2VsQ2xpY2s9e3RoaXMucHJvcHMub25DYW5jZWxDbGlja30gb25TYXZlQ2xpY2s9e3RoaXMucHJvcHMub25TYXZlQ2xpY2t9IC8+XG4gICAgICAgIDxQcml2YXRlUHVibGljRHJvcGRvd24gaXNQdWJsaWM9e3RoaXMucHJvcHMuaXNQdWJsaWN9IC8+XG4gICAgICAgIDxEZWxldGVQbGF5bGlzdEJ1dHRvbiAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbnZhciBNb2RhbERlbGV0ZVBsYXlsaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAvLyBFdmVudCBoYW5kbGVyIGJ1dHRvbiBjbGlja1xuICBkZWxldGVQbGF5bGlzdDogZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coXCJEZWxldGluZyBQbGF5bGlzdFwiICsgdGhpcy5wcm9wcy5wbGF5bGlzdEtleSk7XG4gICAgJC5hamF4KHtcbiAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgdXJsOiBcIi9wbGF5bGlzdC9kZWxldGVcIixcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICBjYWNoZTogZmFsc2UsXG4gICAgICBkYXRhOiB7X2lkOiB0aGlzLnByb3BzLnBsYXlsaXN0S2V5fSxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIHBsYXlsaXN0QWN0aW9ucy5kZWxldGVQbGF5bGlzdChkYXRhLmRlbGV0ZWRQbGF5bGlzdCk7IFxuICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgZXJyb3I6IGZ1bmN0aW9uKHhociwgc3RhdHVzLCBlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVSUk9SOiBEZWxldGUgUGxheWxpc3QgZXJyb3JlZCBvdXRcIiwgc3RhdHVzLCBlcnIudG9TdHJpbmcoKSk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICB9KTtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsIGZhZGVcIiBpZD1cInRyYXNoLWNvbmZpcm1cIiB0YWJJbmRleD1cIi0xXCIgcm9sZT1cImRpYWxvZ1wiIGFyaWEtbGFiZWxsZWRieT1cIm15TW9kYWxMYWJlbFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWRpYWxvZyBtb2RhbC1zbVwiIHJvbGU9XCJkb2N1bWVudFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5XCI+XG4gICAgICAgICAgICAgIEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBwZXJtYW5lbnRseSBkZWxldGUgdGhpcyBwbGF5bGlzdD9cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1mb290ZXJcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXJlZFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgb25DbGljaz17dGhpcy5kZWxldGVQbGF5bGlzdH0+RGVsZXRlIFBsYXlsaXN0PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxudmFyIFBsYXlsaXN0RGVzY3JpcHRpb24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFiLXBhZ2UtaGVhZGVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFiLXBhZ2UtdGV4dC1jb250YWluZXJcIj5cbiAgICAgICAgICA8YSBjbGFzc05hbWU9XCJpY29uLWJ0blwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIj48ZGl2IGNsYXNzTmFtZT1cInRhYi1wYWdlLWJhY2stYnRuXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtbGcgZmEtY2hldnJvbi1jaXJjbGUtbGVmdFwiPjwvaT48L2Rpdj48L2E+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWItcGFnZS10aXRsZSBvbmNsaWNrLWVkaXRcIj5cbiAgICAgICAgICAgIHt0aGlzLnByb3BzLm5hbWV9XG4gICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJpY29uLWJ0bi1ibHVlXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiPjxpIGNsYXNzTmFtZT1cImZhIGZhLWVkaXRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+PC9hPlxuXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWItcGFnZS1jdXJhdG9yXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYXlsaXN0LXVzZXItaWNvblwiPjxpIGNsYXNzTmFtZT1cImZhIGZhLXVzZXIgZmEtZndcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+PC9kaXY+XG4gICAgICAgICAgICBZb3VyIFBsYXlsaXN0XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYi1wYWdlLXJpZ2h0LWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFiLXBhZ2UtaWNvbi1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGlsbFwiPnt0aGlzLnByb3BzLnNpemV9IEl0ZW1zPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbnZhciBTZWFyY2hQbGF5bGlzdEVudHJpZXNJblBsYXlsaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaC1jb250YWluZXJcIj5cbiAgICAgICAgPGZvcm0gY2xhc3NOYW1lPVwic2VhcmNoLWlucHV0XCI+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIlwiIHBsYWNlaG9sZGVyPVwiU2VhcmNoIGluIFBsYXlsaXN0Li4uXCIvPlxuICAgICAgICA8L2Zvcm0+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxuLy8gU1VCIENPTVBPTkVOVDogRWRpdFBsYXlsaXN0SGVhZGVyXG52YXIgRWRpdFBsYXlsaXN0SGVhZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybihcbiAgICAgIDxkaXY+XG4gICAgICAgIDxQbGF5bGlzdEhlYWRlckJ1dHRvbnNUb0NoYW5nZVN0YXRlcyBpc1B1YmxpYz17dGhpcy5wcm9wcy5pc1B1YmxpY30gb25DYW5jZWxDbGljaz17dGhpcy5wcm9wcy5vbkNhbmNlbENsaWNrfSBvblNhdmVDbGljaz17dGhpcy5wcm9wcy5vblNhdmVDbGlja30gLz5cbiAgICAgICAgPE1vZGFsRGVsZXRlUGxheWxpc3QgcGxheWxpc3RLZXk9e3RoaXMucHJvcHMucGxheWxpc3RLZXl9IC8+XG4gICAgICAgIDxQbGF5bGlzdERlc2NyaXB0aW9uIG5hbWU9e3RoaXMucHJvcHMubmFtZX0gc2l6ZT17dGhpcy5wcm9wcy5zaXplfSAvPlxuICAgICAgICA8U2VhcmNoUGxheWxpc3RFbnRyaWVzSW5QbGF5bGlzdCAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbi8vIE1BSU4gQ09NUE9ORU5UOiBVc2Vyc09wZW5lZFBsYXlsaXN0XG52YXIgVXNlcnNPcGVuZWRQbGF5bGlzdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgX2lkOiBwbGF5bGlzdFN0b3JlLmdldElkKCksXG4gICAgICBpbmRleDogcGxheWxpc3RTdG9yZS5nZXRJbmRleCgpLFxuICAgICAgZW50cmllczogcGxheWxpc3RTdG9yZS5nZXRFbnRyaWVzKClcbiAgICB9O1xuICB9LFxuXG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZyhcIkVESVQgUExBWUxJU1QgTU9VTlRJTkdcIik7XG4gICAgcGxheWxpc3RTdG9yZS5hZGRDaGFuZ2VMaXN0ZW5lcih0aGlzLm9uRGlzcGxheVBsYXlsaXN0KTtcbiAgfSxcblxuICBjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24oKSB7XG4gICAgcGxheWxpc3RTdG9yZS5yZW1vdmVDaGFuZ2VMaXN0ZW5lcih0aGlzLm9uRGlzcGxheVBsYXlsaXN0KTtcbiAgfSxcblxuICBvbkRpc3BsYXlQbGF5bGlzdDogZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coXCJDaGFuZ2luZyBkaXNwbGF5IHRvIHNlbGVjdGVkIHBsYXlsaXN0XCIpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMucHJvcHMubXlQbGF5bGlzdHNbcGxheWxpc3RTdG9yZS5nZXRJbmRleCgpXS5tZWRpYUVudHJpZXMpO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBcbiAgICAgIF9pZDogcGxheWxpc3RTdG9yZS5nZXRJZCgpLCBcbiAgICAgIGluZGV4OiBwbGF5bGlzdFN0b3JlLmdldEluZGV4KCksXG4gICAgICBlbnRyaWVzOiBwbGF5bGlzdFN0b3JlLmdldEVudHJpZXMoKVxuICAgIH0pO1xuICAgIC8vIHRoaXMuc2V0U3RhdGUoeyBpbmRleDogcGxheWxpc3RTdG9yZS5nZXRJbmRleCgpIH0pO1xuICAgIC8vIHRoaXMuc2V0U3RhdGUoeyBlbnRyaWVzOiBwbGF5bGlzdFN0b3JlLmdldEVudHJpZXMoKSB9KTtcbiAgfSxcblxuICBzYXZlQ2hhbmdlczogZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coXCJTYXZpbmcgUGxheWxpc3RcIik7XG4gICAgdmFyIHNhdmVkUGxheWxpc3QgPSBbXTtcbiAgICB2YXIgZWFjaFBsYXlsaXN0O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zdGF0ZS5lbnRyaWVzLmxlbmd0aDsgKytpKSB7XG4gICAgICBlYWNoUGxheWxpc3QgPSB0aGlzLnN0YXRlLmVudHJpZXNbaV07XG4gICAgICBpZiAoZWFjaFBsYXlsaXN0LmlmRGVsZXRlSW5kaWNhdG9yID09PSB1bmRlZmluZWQgfHwgZWFjaFBsYXlsaXN0LmlmRGVsZXRlSW5kaWNhdG9yID09PSBmYWxzZSkge1xuICAgICAgICBkZWxldGUgZWFjaFBsYXlsaXN0LmlmRGVsZXRlSW5kaWNhdG9yO1xuICAgICAgICBzYXZlZFBsYXlsaXN0LnB1c2goZWFjaFBsYXlsaXN0KTtcbiAgICAgIH1cbiAgICB9ICBcbiAgICAvLyBEb24ndCBtYWtlIGFuIGFqYXggcmVxdWVzdCB3aGVuIHRoaW5ncyBoYXZlbid0IGNoYW5nZWRcbiAgICBpZiAoc2F2ZWRQbGF5bGlzdC5sZW5ndGggPT0gdGhpcy5zdGF0ZS5lbnRyaWVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH0gIFxuXG4gICAgJC5hamF4KHtcbiAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgdXJsOiBcIi9wbGF5bGlzdC91cGRhdGVcIixcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICBjYWNoZTogZmFsc2UsXG4gICAgICBkYXRhOiB7X2lkOiB0aGlzLnByb3BzLm15UGxheWxpc3RzW3RoaXMuc3RhdGUuaW5kZXhdLl9pZCwgbWVkaWFFbnRyaWVzOiBKU09OLnN0cmluZ2lmeShzYXZlZFBsYXlsaXN0KX0sXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtlbnRyaWVzOiBkYXRhLnVwZGF0ZWRQbGF5bGlzdC5tZWRpYUVudHJpZXN9KTtcbiAgICAgICAgcGxheWxpc3RBY3Rpb25zLnVwZGF0ZVBsYXlsaXN0KGRhdGEudXBkYXRlZFBsYXlsaXN0KTtcblxuICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgZXJyb3I6IGZ1bmN0aW9uKHhociwgc3RhdHVzLCBlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVSUk9SOiBVcGRhdGUgUGxheWxpc3QgZXJyb3JlZCBvdXRcIiwgc3RhdHVzLCBlcnIudG9TdHJpbmcoKSk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICB9KTtcbiAgfSxcblxuICBjYW5jZWxDaGFuZ2VzOiBmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZyhcIkNhbmNlbGluZyBjaGFuZ2VzXCIpO1xuICAgIHZhciBzYXZlZFBsYXlsaXN0ID0gW107XG4gICAgdmFyIGVhY2hQbGF5bGlzdDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc3RhdGUuZW50cmllcy5sZW5ndGg7ICsraSkge1xuICAgICAgZWFjaFBsYXlsaXN0ID0gdGhpcy5zdGF0ZS5lbnRyaWVzW2ldOyAgICAgIFxuICAgICAgaWYgKGVhY2hQbGF5bGlzdC5pZkRlbGV0ZUluZGljYXRvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGRlbGV0ZSBlYWNoUGxheWxpc3QuaWZEZWxldGVJbmRpY2F0b3I7XG4gICAgICB9XG4gICAgICBzYXZlZFBsYXlsaXN0LnB1c2goZWFjaFBsYXlsaXN0KTtcbiAgICB9ICBcblxuICAgIHRoaXMuc2V0U3RhdGUoe2VudHJpZXMgOiBzYXZlZFBsYXlsaXN0fSwgZnVuY3Rpb24oKSB7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnN0YXRlLmVudHJpZXMpOyAgXG4gICAgfSk7XG4gIH0sXG5cbiAgZGVsZXRlTWVkaWFFbnRyeUluUGxheWxpc3Q6IGZ1bmN0aW9uKHBvc0luUGxheWxpc3QpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnN0YXRlLmVudHJpZXMpO1xuICAgIHZhciB1cGRhdGVkUGxheWxpc3QgPSB0aGlzLnN0YXRlLmVudHJpZXM7XG4gICAgaWYgKHVwZGF0ZWRQbGF5bGlzdFtwb3NJblBsYXlsaXN0XS5pZkRlbGV0ZUluZGljYXRvciA9PT0gdHJ1ZSlcbiAgICAgIHVwZGF0ZWRQbGF5bGlzdFtwb3NJblBsYXlsaXN0XS5pZkRlbGV0ZUluZGljYXRvciA9IGZhbHNlO1xuICAgIGVsc2Uge1xuICAgICAgdXBkYXRlZFBsYXlsaXN0W3Bvc0luUGxheWxpc3RdLmlmRGVsZXRlSW5kaWNhdG9yID0gdHJ1ZTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7ZW50cmllcyA6IHVwZGF0ZWRQbGF5bGlzdH0pO1xuXG4gICAgLy8gY29uc29sZS5sb2coXCJEZWxldGluZyBtZWRpYSBlbnRyeSBpbiBQbGF5bGlzdDogXCIgKyBwb3NJblBsYXlsaXN0KTtcbiAgICAvLyB2YXIgdXBkYXRlZEVudHJpZXMgPSB0aGlzLnN0YXRlLmVudHJpZXM7XG4gICAgLy8gdXBkYXRlZEVudHJpZXMuc3BsaWNlKHBvc0luUGxheWxpc3QsIDEpO1xuICAgIC8vIGlmIChwb3NJblBsYXlsaXN0ID4gLTEpIHtcbiAgICAvLyAgIHRoaXMuc2V0U3RhdGUoeyBlbnRyaWVzOiB1cGRhdGVkRW50cmllcyB9KTtcbiAgICAvLyB9XG5cbiAgICAvLyB0aGlzLnNldFN0YXRlKHtkZWxldGVkTGlzdCA6IHRoaXMuc3RhdGUuZGVsZXRlZExpc3QucHVzaChwb3NJblBsYXlsaXN0KX0pXG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgbWVkaWFFbnRyaWVzSW5QbGF5bGlzdCA9IFtdO1xuICAgIHZhciBwcm9wTmFtZSA9IFwiXCI7XG4gICAgdmFyIHByb3BTaXplID0gMDtcbiAgICB2YXIgcHJvcExpa2VzID0gXCJcIjtcbiAgICB2YXIgcHJvcElzUHVibGljID0gdHJ1ZTtcbiAgICB2YXIgcHJvcEtleSA9IFwiXCI7XG5cbiAgICAvLyBUT0RPOiBTaG91bGQgZml4IHRoaXMgaWYgc3RhdGVtZW50LCB3aGVuIGRlbGV0aW5nIHRoZSBkaXNwbGF5ZWQgcGxheWxpc3QsIHNob3VsZCByZWluaXRpYWxpemUgdGhlIHN0YXRlcyBhbGwgdG8gbnVsbFxuICAgIC8vIE5vdCBrZWVwIHRoZSBzdGF0ZSBhcyB0aGUgcHJldmlvdXMgZGVsZXRlZCBwbGF5bGlzdFxuICAgIGlmICh0aGlzLnN0YXRlLmluZGV4ICE9PSBudWxsICYmIHRoaXMucHJvcHMubXlQbGF5bGlzdHNbdGhpcy5zdGF0ZS5pbmRleF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFyIHNlbGVjdGVkUGxheWxpc3QgPSB0aGlzLnByb3BzLm15UGxheWxpc3RzW3RoaXMuc3RhdGUuaW5kZXhdO1xuXG4gICAgICAvLyB2YXIgbWVkaWFFbnRyaWVzID0gc2VsZWN0ZWRQbGF5bGlzdC5tZWRpYUVudHJpZXM7XG4gICAgICB2YXIgbWVkaWFFbnRyaWVzID0gdGhpcy5zdGF0ZS5lbnRyaWVzO1xuXG4gICAgICAvLyBZb3UgZG8gdGhpcyBiZWNhdXNlIHRoZSBhcnJheSBpdHNlbGYgaGFzIGFuIF9pZC4gVGhlIGFycmF5IHRlY2huaWNhbGx5IGlzbid0IGVtcHR5IHdoZW4gZW1wdHkuIChEb24ndCBrbm93IGlmIHRoaXMgY29uY2VwdCBhcHBsaWVzIHRvIGhlcmUgdGhvdWdoKVxuICAgICAgdmFyIG1lZGlhRW50cnkgPSBtZWRpYUVudHJpZXNbMF07XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWVkaWFFbnRyaWVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIG1lZGlhRW50cnkgPSBtZWRpYUVudHJpZXNbaV07XG4gICAgICAgIGlmIChtZWRpYUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgICAgdmFyIGRlbGV0ZUluZGljYXRvciA9IG1lZGlhRW50cnkuaWZEZWxldGVJbmRpY2F0b3IgPT09IHVuZGVmaW5lZCA/IGRlbGV0ZUluZGljYXRvciA9IGZhbHNlIDogZGVsZXRlSW5kaWNhdG9yID0gbWVkaWFFbnRyeS5pZkRlbGV0ZUluZGljYXRvcjsgXG4gICAgICAgICAgbWVkaWFFbnRyaWVzSW5QbGF5bGlzdC5wdXNoKFxuICAgICAgICAgICAgPE1lZGlhRW50cnkgXG4gICAgICAgICAgICAgIGtleT17XCJtZWRpYUVudHJ5XCIgKyBtZWRpYUVudHJ5Lm1lZGlhSWQgKyBpfVxuICAgICAgICAgICAgICBwb3M9e2l9IFxuICAgICAgICAgICAgICBtZWRpYUlkPXttZWRpYUVudHJ5Lm1lZGlhSWR9IFxuICAgICAgICAgICAgICBjYXRlZ29yeVR5cGU9eydQTEFZTElTVCd9XG4gICAgICAgICAgICAgIG1lZGlhVHlwZT17J1lPVVRVQkUnfVxuICAgICAgICAgICAgICB0aHVtYm5haWw9e21lZGlhRW50cnkudGh1bWJuYWlsfSBcbiAgICAgICAgICAgICAgdGl0bGU9e21lZGlhRW50cnkudGl0bGV9XG4gICAgICAgICAgICAgIGFydGlzdD17bWVkaWFFbnRyeS5hcnRpc3R9IFxuICAgICAgICAgICAgICBpZk1lZGlhQ2FyZEFkZGVkPXtmYWxzZX0gXG4gICAgICAgICAgICAgIHVzZXI9e3RoaXMucHJvcHMudXNlcn1cbiAgICAgICAgICAgICAgbXlQbGF5bGlzdHM9e3RoaXMucHJvcHMubXlQbGF5bGlzdHN9IFxuICAgICAgICAgICAgICBkZWxldGVFbnRyeT17dGhpcy5kZWxldGVNZWRpYUVudHJ5SW5QbGF5bGlzdH1cbiAgICAgICAgICAgICAgZGVsZXRlSW5kaWNhdG9yPXtkZWxldGVJbmRpY2F0b3J9IC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBwcm9wTmFtZSA9IHNlbGVjdGVkUGxheWxpc3QubmFtZTtcbiAgICAgIHByb3BTaXplID0gbWVkaWFFbnRyeSAhPT0gbnVsbCA/IHNlbGVjdGVkUGxheWxpc3QubWVkaWFFbnRyaWVzLmxlbmd0aCA6IDA7XG4gICAgICBwcm9wTGlrZXMgPSBzZWxlY3RlZFBsYXlsaXN0Lmxpa2VzO1xuICAgICAgcHJvcElzUHVibGljID0gc2VsZWN0ZWRQbGF5bGlzdC5pc1B1YmxpYztcbiAgICAgIHByb3BLZXkgPSBzZWxlY3RlZFBsYXlsaXN0Ll9pZDtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJlZGl0LXBsYXlsaXN0LWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxFZGl0UGxheWxpc3RIZWFkZXIgbmFtZT17cHJvcE5hbWV9IHNpemU9e3Byb3BTaXplfSBpc1B1YmxpYz17cHJvcElzUHVibGljfSBwbGF5bGlzdEtleT17cHJvcEtleX0gb25DYW5jZWxDbGljaz17dGhpcy5jYW5jZWxDaGFuZ2VzfSBvblNhdmVDbGljaz17dGhpcy5zYXZlQ2hhbmdlc30gLz5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICB7bWVkaWFFbnRyaWVzSW5QbGF5bGlzdH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBVc2Vyc09wZW5lZFBsYXlsaXN0OyIsIi8qICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIENvcHlyaWdodCDCqSBcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBWSUVXOiBFeHBsb3JlLmpzeFxuXG4gICAgU2hvd2Nhc2VzIGRpZmZlcmVudCBwdWJsaWMgcGxheWxpc3RzIHRoYXQgYXJlIGN1cnJlbnRseSB0cmVuZGluZ1xuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIENvbXBvbmVudHNcblxuICAgIEV4cGxvcmUgLSBUaGUgRXhwbG9yZSB0YWJcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIEV4cGxvcmUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXBhZGRpbmdcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYWNlaG9sZGVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYWNlaG9sZGVyLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtcm9ja2V0IHBsYWNlaG9sZGVyLWljb25cIj48L2k+PGJyLz5cbiAgICAgICAgICAgICAgPHNwYW4+VGhpcyBwYWdlIGlzIHN0aWxsIGJlaW5nIG1hZGU8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cInNlYXJjaC1pbnB1dFwiPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwiY2hhdC10ZXh0Ym94XCIgbmFtZT1cIlwiIHBsYWNlaG9sZGVyPVwiU2VhcmNoIFB1YmxpYyBQbGF5bGlzdHMuLi5cIi8+XG4gICAgICAgICAgPC9mb3JtPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgKi99XG5cbiAgICAgICAgey8qIFRPRE86IEV4cGxvcmUgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZXhwbG9yZS1jb250YWluZXJcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV4cGxvcmU7IiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIEZvb3RlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGZvb3RlciBjbGFzc05hbWU9XCJmb290ZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb290ZXItY29udGVudFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS03IGNvbC14cy01XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29weXJpZ2h0XCI+QXBwbGUgVGVhICZjb3B5OyAyMDE2PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTUgY29sLXhzLTdcIj5cbiAgICAgICAgICAgICAgPHA+PGI+QXBwbGUgVGVhPC9iPiBpcyBvbmUgb2YgbWFueSBleGNpdGluZyBwcm9qZWN0cyB3ZSdyZSB3b3JraW5nIG9uLiBJZiB5b3Ugd2FudCB0byBzdXBwb3J0IG91ciBkZXZlbG9wbWVudCBhbmQgaGVscCBrZWVwIEFwcGxlIFRlYSBzZXJ2ZXJzIHJ1bm5pbmcsIHlvdSBjYW4gc2VuZCB1cyBhIGRvbmF0aW9uLiBXZSdsbCBsb3ZlIHlvdSBmb3IgaXQuIDxpIGNsYXNzTmFtZT1cImZhIGZhLWhlYXJ0XCI+PC9pPjwvcD5cbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi10ZWFsLWhvdmVyXCI+RG9uYXRlPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Zvb3Rlcj5cbiAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBGb290ZXI7IiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuLyogVXNlciBQcm9maWxlIFBpY3R1cmUgSWNvbiAqL1xudmFyIEhlYWRlclByb2ZpbGVJY29uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8YSBjbGFzc05hbWU9XCJkcm9wZG93bi10b2dnbGVcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCIgYXJpYS1oYXNwb3B1cD1cInRydWVcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+XG4gICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJwcm9maWxlLXBpY1wiIHNyYz1cImltYWdlcy9wcm9maWxlLXBpYy5wbmdcIiAvPlxuICAgICAgICA8L2E+XG4gICAgICAgIDx1bCBjbGFzc05hbWU9XCJkcm9wZG93bi1tZW51IGRyb3Bkb3duLW1lbnUtcmlnaHRcIj5cbiAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiZHJvcGRvd24taGVhZGVyXCI+e3RoaXMucHJvcHMudXNlci5sb2NhbC5maXJzdE5hbWV9IHt0aGlzLnByb3BzLnVzZXIubG9jYWwubGFzdE5hbWV9ICh7dGhpcy5wcm9wcy51c2VyLmxvY2FsLmVtYWlsfSk8L2xpPlxuICAgICAgICAgIDxsaT48YSBocmVmPVwiL3VzZXJcIj5Qcm9maWxlPC9hPjwvbGk+XG4gICAgICAgICAgPGxpIHJvbGU9XCJzZXBhcmF0b3JcIiBjbGFzc05hbWU9XCJkaXZpZGVyXCI+PC9saT5cbiAgICAgICAgICA8bGk+PGEgaHJlZj1cIi9sb2dvdXRcIj5TaWduIE91dDwvYT48L2xpPlxuICAgICAgICA8L3VsPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbi8qIFNpZ24gVXAgYW5kIFNpZ24gSW4gQnV0dG9ucyAqL1xudmFyIFNpZ25VcFNpZ25JbkJ1dHRvbnMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLWJ0bi1ncm91cFwiPlxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBidG4tbWFyZ2luXCIgZGF0YS10b2dnbGU9XCJtb2RhbFwiIGRhdGEtdGFyZ2V0PVwiI3NpZ251cFwiPlxuICAgICAgICAgIFNpZ24gVXBcbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxTaWduVXBNb2RhbCAvPlxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tc2Vjb25kYXJ5IGJ0bi1tYXJnaW4gZHJvcGRvd24tdG9nZ2xlXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCI+XG4gICAgICAgICAgU2lnbiBJblxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPFNpZ25JbkRyb3Bkb3duIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxuLyogU2lnbiBVcCBNb2RhbCBQb3B1cCAqL1xudmFyIFNpZ25VcE1vZGFsID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAvLyBUT0RPOiBJbXBsZW1lbnQgb25TdWJtaXQgKENoZWNrIGlmIHZhbGlkIGlucHV0cyBpZiB2YWxpZCBlbWFpbClcbiAgb25TdWJtaXQ6IGZ1bmN0aW9uKGUpIHtcbiAgICBjb25zb2xlLmxvZyhcIlN1Ym1pdHRpbmcgc2lnbiB1cFwiKTtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsIGZhZGVcIiBpZD1cInNpZ251cFwiIHRhYkluZGV4PVwiLTFcIiByb2xlPVwiZGlhbG9nXCIgYXJpYS1sYWJlbGxlZGJ5PVwibXlNb2RhbExhYmVsXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZGlhbG9nIG1vZGFsLXNtXCIgcm9sZT1cImRvY3VtZW50XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1jb250ZW50XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWJvZHlcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3cgcm93LXNtXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMTIgY29sLXBhZGRpbmctc21cIj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1mYWNlYm9vayBidG4tZnVsbC13aWR0aFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWZhY2Vib29rIGljb24tcGFkZGluZyBpY29uLXBvc2l0aW9uLWxlZnRcIj48L2k+U2lnbiBJbiB3aXRoIEZhY2Vib29rXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0xMiBjb2wtcGFkZGluZy1zbVwiPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXR3aXR0ZXIgYnRuLWZ1bGwtd2lkdGhcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS10d2l0dGVyIGljb24tcGFkZGluZyBpY29uLXBvc2l0aW9uLWxlZnRcIj48L2k+U2lnbiBJbiB3aXRoIFR3aXR0ZXJcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTEyIGNvbC1wYWRkaW5nLXNtXCI+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tZ29vZ2xlIGJ0bi1mdWxsLXdpZHRoXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtZ29vZ2xlLXBsdXMgaWNvbi1wYWRkaW5nIGljb24tcG9zaXRpb24tbGVmdFwiPjwvaT5TaWduIGluIHdpdGggR29vZ2xlXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtYm9keSBzZWN0aW9uLWJvcmRlciBzaWdudXAtZm9ybS1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvci1kaXZpZGVyXCI+PHNwYW4+T1IgU0lHTiBVUDwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2gtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyA8Zm9ybSBjbGFzc05hbWU9XCJzZWFyY2gtaW5wdXRcIiBhY3Rpb249XCIvc2lnbnVwXCIgbWV0aG9kPVwicG9zdFwiPlxuICAgICAgICAgICAgICAgIC8vICAgPGRpdiBjbGFzc05hbWU9XCJyb3cgcm93LXNtXCI+XG4gICAgICAgICAgICAgICAgLy8gICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTYgY29sLXBhZGRpbmctc21cIj5cbiAgICAgICAgICAgICAgICAvLyAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIkZpcnN0IE5hbWVcIiBuYW1lPVwiZmlyc3ROYW1lXCIvPlxuICAgICAgICAgICAgICAgIC8vICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAvLyAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tNiBjb2wtcGFkZGluZy1zbVwiPlxuICAgICAgICAgICAgICAgIC8vICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiTGFzdCBOYW1lXCIgbmFtZT1cImxhc3ROYW1lXCIvPlxuICAgICAgICAgICAgICAgIC8vICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAvLyAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tMTIgY29sLXBhZGRpbmctc21cIj5cbiAgICAgICAgICAgICAgICAvLyAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIkVtYWlsXCIgbmFtZT1cImVtYWlsXCIvPlxuICAgICAgICAgICAgICAgIC8vICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAvLyAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tMTIgY29sLXBhZGRpbmctc21cIj5cbiAgICAgICAgICAgICAgICAvLyAgICAgICA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiIG5hbWU9XCJwYXNzd29yZFwiLz5cbiAgICAgICAgICAgICAgICAvLyAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgLy8gICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTEyIGNvbC1wYWRkaW5nLXNtXCI+XG4gICAgICAgICAgICAgICAgLy8gICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgYnRuLWZ1bGwtd2lkdGhcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIHR5cGU9XCJzdWJtaXRcIj5TaWduIFVwPC9idXR0b24+XG4gICAgICAgICAgICAgICAgLy8gICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIC8vICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgLy8gPC9mb3JtPlxuICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICA8Zm9ybSBjbGFzc05hbWU9XCJzZWFyY2gtaW5wdXQgc2VhcmNoLWlucHV0LXNtXCIgYWN0aW9uPVwiL3NpZ251cFwiIG1ldGhvZD1cInBvc3RcIiBvblN1Ym1pdD17dGhpcy5vblN1Ym1pdH0+IFxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwic2lnbi11cC1maXJzdC1uYW1lXCIgY2xhc3NOYW1lPVwiaW5wdXQtcGFkZGluZy1zbVwiIHBsYWNlaG9sZGVyPVwiRmlyc3QgTmFtZVwiIG5hbWU9XCJmaXJzdE5hbWVcIi8+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJzaWduLXVwLWxhc3QtbmFtZVwiIGNsYXNzTmFtZT1cImlucHV0LXBhZGRpbmctc21cIiBwbGFjZWhvbGRlcj1cIkxhc3QgTmFtZVwiIG5hbWU9XCJsYXN0TmFtZVwiLz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzc05hbWU9XCJpbnB1dC1wYWRkaW5nLXNtXCIgcGxhY2Vob2xkZXI9XCJFbWFpbFwiIG5hbWU9XCJlbWFpbFwiLz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgY2xhc3NOYW1lPVwiaW5wdXQtcGFkZGluZy1zbVwiIHBsYWNlaG9sZGVyPVwiUGFzc3dvcmRcIiBuYW1lPVwicGFzc3dvcmRcIi8+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgYnRuLWZ1bGwtd2lkdGhcIiB0eXBlPVwic3VibWl0XCI+U2lnbiBVcDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgIFxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG4vKiBTaWduIEluIERyb3Bkb3duICovXG52YXIgU2lnbkluRHJvcGRvd24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIC8vIFRPRE86IEltcGxlbWVudCBvblN1Ym1pdCAoQ2hlY2sgaWYgdmFsaWQgaW5wdXRzIGlmIHZhbGlkIGVtYWlsKVxuICBvblN1Ym1pdDogZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coXCJTdWJtaXR0aW5nIHNpZ24gdXBcIik7XG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPHVsIGNsYXNzTmFtZT1cImRyb3Bkb3duLW1lbnUgZHJvcGRvd24tbWVudS1yaWdodCBzaWduaW4tY29udGFpbmVyXCIgaWQ9XCJzaWduaW4tZm9ybVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNpZ25pbi1jb250ZW50XCI+XG4gICAgICAgICAgPGZvcm0gY2xhc3NOYW1lPVwic2VhcmNoLWlucHV0IHNlYXJjaC1pbnB1dC1zbVwiIGFjdGlvbj1cIi9zaWduaW5cIiBtZXRob2Q9XCJwb3N0XCIgb25TdWJtaXQ9e3RoaXMub25TdWJtaXR9PlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwiaW5wdXQtcGFkZGluZy1zbVwiIHBsYWNlaG9sZGVyPVwiRW1haWxcIiBuYW1lPVwiZW1haWxcIi8+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgY2xhc3NOYW1lPVwiaW5wdXQtcGFkZGluZy1zbVwiIHBsYWNlaG9sZGVyPVwiUGFzc3dvcmRcIiBuYW1lPVwicGFzc3dvcmRcIi8+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBidG4tZnVsbC13aWR0aFwiIHR5cGU9XCJzdWJtaXRcIj5TaWduIEluPC9idXR0b24+XG4gICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImZvcmdvdC1wdyBsaW5rLWdyZXktbGl0ZVwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIj5Gb3Jnb3QgcGFzc3dvcmQ/PC9hPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaWduaW4tY29udGVudCBzZWN0aW9uLWJvcmRlciBzaWduaW4taWNvbnMtY29udGFpbmVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvci1kaXZpZGVyXCI+PHNwYW4+T1IgU0lHTiBJTiBXSVRIPC9zcGFuPjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93IHJvdy14c1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNCBjb2wtcGFkZGluZy14c1wiPjxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1mYWNlYm9vayBidG4tZnVsbC13aWR0aFwiPjxpIGNsYXNzTmFtZT1cImZhIGZhLWZhY2Vib29rXCI+PC9pPjwvYnV0dG9uPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNCBjb2wtcGFkZGluZy14c1wiPjxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi10d2l0dGVyIGJ0bi1mdWxsLXdpZHRoXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtdHdpdHRlclwiPjwvaT48L2J1dHRvbj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTQgY29sLXBhZGRpbmcteHNcIj48YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tZ29vZ2xlIGJ0bi1mdWxsLXdpZHRoXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtZ29vZ2xlLXBsdXNcIj48L2k+PC9idXR0b24+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC91bD5cbiAgICApO1xuICB9XG59KTtcblxudmFyIEhlYWRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgaGVhZGVySWNvbnMgPSBbXTtcblxuICAgIC8vIFRPRE86IElmIHVzZXJzIGFyZSBsb2dnZWQgaW4sIHN3aXRjaCBpY29uc1xuICAgIC8vIGlmICh0aGlzLnByb3BzLnVzZXIgPT09IHVuZGVmaW5lZCB8fCB0aGlzLnByb3BzLnVzZXIgPT09IG51bGwpIHtcbiAgICBpZiAodGhpcy5wcm9wcy51c2VyICE9PSB1bmRlZmluZWQgJiYgdGhpcy5wcm9wcy51c2VyICE9PSBudWxsKSB7XG4gICAgICBoZWFkZXJJY29ucy5wdXNoKFxuICAgICAgICA8SGVhZGVyUHJvZmlsZUljb24ga2V5PXsnSGVhZGVyUHJvZmlsZUljb24nfSB1c2VyPXt0aGlzLnByb3BzLnVzZXJ9IC8+XG4gICAgICApO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGhlYWRlckljb25zLnB1c2goXG4gICAgICAgIDxTaWduVXBTaWduSW5CdXR0b25zIGtleT17J1NpZ25VcFNpZ25JbkJ1dHRvbnMnfSAvPlxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLWNvbnRlbnQtY29udGFpbmVyIHJvd1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTZcIj5cbiAgICAgICAgICAgIDxhIGhyZWY9XCIvXCI+PGltZyBjbGFzc05hbWU9XCJoZWFkZXItbG9nb1wiIHNyYz1cImltYWdlcy9sb2dvLnBuZ1wiLz48L2E+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tNiBoZWFkZXItc2VjdGlvblwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXItaWNvbi1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAge2hlYWRlckljb25zfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gSGVhZGVyOyIsIi8qICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIENvcHlyaWdodCDCqSBcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBNYWluLUNvbXBvbmVudCBNZWRpYUVudHJ5XG5cbiAgICBBIGNvbXBvbmVudCBmb3IgZWFjaCBpbmRpdmlkYWwgbWVkaWEgZW50cnkuIEVhY2ggbWVkaWEgZW50cnkgaGFzIGEgdGh1bWJuYWlsIGFuZCB0aXRsZS5cbiAgICBFYWNoIEVudHJ5IGhhcyBhIGNhdGVnb3J5IHR5cGUgdG8gc2VlIHdoZXJlIHRoZSBtZWRpYSBlbnRyeSB3b3VsZCBiZWxvbmcgYXMgd2VsbCBhcyBhXG4gICAgbWVkaWEgdHlwZSB3aGljaCBpcyBlaXRoZXIgWW91dHViZSwgU291bmRjbG91ZCwgb3IgVmltZW8uIEVhY2ggY29tcG9uZW50XG4gICAgZGV0ZXJtaW5lcyB0aGUgY2xhc3MgbmFtZSBmb3IgdGhlIGRpdnMgYnkgY2hlY2tpbmcgdGhlIGNhdGVnb3J5IHR5cGVzIGZyb20gdGhlIGdpdmVuIHByb3BlcnRpZXNcbiAgICBvZiB0aGUgcGFyZW50IGNvbXBvbmVudHMgKEVpdGhlciBmcm9tIFNlYXJjaCBvciBRdWV1ZSkuXG5cbiAgICBAQ29tcG9uZW50czogIFRodW1ibmFpbFxuICAgICAgICAgICAgICAgICAgVGl0bGVcbiAgICAgICAgICAgICAgICAgIER1cmF0aW9uXG4gICAgICAgICAgICAgICAgICBNZWRpYUVudHJ5XG5cbiAgICBARXhwb3J0czogICAgIE1lZGlhRW50cnlcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBNb2RhbENyZWF0ZVBsYXlsaXN0ID0gcmVxdWlyZSgnLi9Nb2RhbENyZWF0ZVBsYXlsaXN0LmpzeCcpO1xuXG4vLyBGbHV4IEFjdGlvbnNcbnZhciBwbGF5bGlzdEFjdGlvbnMgPSByZXF1aXJlKCcuLi9mbHV4L2FjdGlvbnMvYWN0aW9ucycpO1xuXG4vLyBUaHVtYm5haWwgb2YgdGhlIG1lZGlhXG52YXIgVGh1bWJuYWlsID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjYXRlZ29yeURpdk5hbWU7XG4gICAgdmFyIGNhdGVnb3J5Q2xhc3NOYW1lO1xuICAgIHN3aXRjaCh0aGlzLnByb3BzLmNhdGVnb3J5VHlwZSkge1xuICAgICAgY2FzZSBDQVRFR09SWU9GTUVESUEuUVVFVUU6XG4gICAgICAgIGNhdGVnb3J5Q2xhc3NOYW1lID0gJ21lZGlhLWltZyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBDQVRFR09SWU9GTUVESUEuUExBWUxJU1Q6XG4gICAgICAgIGNhdGVnb3J5Q2xhc3NOYW1lID0gJ21lZGlhLWltZyc7XG4gICAgICAgIGJyZWFrOyAgXG4gICAgICBjYXNlIENBVEVHT1JZT0ZNRURJQS5TRUFSQ0g6XG4gICAgICAgIGNhdGVnb3J5Q2xhc3NOYW1lID0gJ3NlYXJjaC1tZWRpYS1pbWcnO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIEVSUk9SLCBObyBDYXRlZ29yeSB0eXBlXG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8aW1nIGNsYXNzTmFtZT17Y2F0ZWdvcnlDbGFzc05hbWV9IHNyYz17dGhpcy5wcm9wcy50aHVtYm5haWx9IC8+XG4gICAgKTtcbiAgfVxufSk7XG5cbi8vIE1lZGlhJ3MgdGl0bGUgY29tcG9uZW50XG52YXIgVGl0bGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNhdGVnb3J5RGl2TmFtZTtcbiAgICB2YXIgY2F0ZWdvcnlDbGFzc05hbWU7XG4gICAgc3dpdGNoKHRoaXMucHJvcHMuY2F0ZWdvcnlUeXBlKSB7XG4gICAgICBjYXNlIENBVEVHT1JZT0ZNRURJQS5RVUVVRTpcbiAgICAgICAgY2F0ZWdvcnlDbGFzc05hbWUgPSAnbWVkaWEtdGl0bGUgZWxsaXBzZXMnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ0FURUdPUllPRk1FRElBLlBMQVlMSVNUOlxuICAgICAgICBjYXRlZ29yeUNsYXNzTmFtZSA9ICdtZWRpYS10aXRsZSBlbGxpcHNlcyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBDQVRFR09SWU9GTUVESUEuU0VBUkNIOlxuICAgICAgICBjYXRlZ29yeUNsYXNzTmFtZSA9ICdzZWFyY2gtbWVkaWEtdGl0bGUgZWxsaXBzZXMnO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIEVSUk9SLCBObyBDYXRlZ29yeSB0eXBlXG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2F0ZWdvcnlDbGFzc05hbWV9PlxuICAgICAgICB7dGhpcy5wcm9wcy50aXRsZX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG4vLyBNZWRpYSdzIGFydGlzdCBjb21wb25lbnRcbnZhciBBcnRpc3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNhdGVnb3J5RGl2TmFtZTtcbiAgICB2YXIgY2F0ZWdvcnlDbGFzc05hbWU7XG4gICAgc3dpdGNoKHRoaXMucHJvcHMuY2F0ZWdvcnlUeXBlKSB7XG4gICAgICBjYXNlIENBVEVHT1JZT0ZNRURJQS5RVUVVRTpcbiAgICAgICAgY2F0ZWdvcnlDbGFzc05hbWUgPSAnbWVkaWEtYXJ0aXN0IGVsbGlwc2VzJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIENBVEVHT1JZT0ZNRURJQS5QTEFZTElTVDpcbiAgICAgICAgY2F0ZWdvcnlDbGFzc05hbWUgPSAnbWVkaWEtYXJ0aXN0IGVsbGlwc2VzJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIENBVEVHT1JZT0ZNRURJQS5TRUFSQ0g6XG4gICAgICAgIGNhdGVnb3J5Q2xhc3NOYW1lID0gJ3NlYXJjaC1tZWRpYS1hcnRpc3QgZWxsaXBzZXMnO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIEVSUk9SLCBObyBDYXRlZ29yeSB0eXBlXG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2F0ZWdvcnlDbGFzc05hbWV9PlxuICAgICAgICB7dGhpcy5wcm9wcy5hcnRpc3R9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KVxuXG4vLyBNZWRpYSdzIHR5cGUgY29tcG9uZW50XG52YXIgVHlwZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY2F0ZWdvcnlDbGFzc05hbWU7XG4gICAgdmFyIG1lZGlhVHlwZUljb247XG4gICAgc3dpdGNoKHRoaXMucHJvcHMuY2F0ZWdvcnlUeXBlKSB7XG4gICAgICBjYXNlIENBVEVHT1JZT0ZNRURJQS5RVUVVRTpcbiAgICAgICAgY2F0ZWdvcnlDbGFzc05hbWUgPSAnbWVkaWEtdHlwZSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBDQVRFR09SWU9GTUVESUEuUExBWUxJU1Q6XG4gICAgICAgIGNhdGVnb3J5Q2xhc3NOYW1lID0gJ21lZGlhLXR5cGUnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ0FURUdPUllPRk1FRElBLlNFQVJDSDpcbiAgICAgICAgY2F0ZWdvcnlDbGFzc05hbWUgPSAnc2VhcmNoLW1lZGlhLXR5cGUnO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIEVSUk9SLCBObyBDYXRlZ29yeSB0eXBlXG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHN3aXRjaCh0aGlzLnByb3BzLnR5cGUpIHtcbiAgICAgIGNhc2UgTUVESUFUWVBFUy5ZT1VUVUJFOlxuICAgICAgICBtZWRpYVR5cGVJY29uID0gJ2ZhIGZhLXlvdXR1YmUtcGxheSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBNRURJQVRZUEVTLlNPVU5EQ0xPVUQ6XG4gICAgICAgIG1lZGlhVHlwZUljb24gPSAnZmEgZmEtc291bmRjbG91ZCc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBNRURJQVRZUEVTLlZJTUVPOlxuICAgICAgICBtZWRpYVR5cGVJY29uID0gJ2ZhIGZhLXZpbWVvJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBFUlJPUiwgTm8gbWVkaWEgdHlwZVxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4oXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2F0ZWdvcnlDbGFzc05hbWV9PjxpIGNsYXNzTmFtZT17bWVkaWFUeXBlSWNvbn0+PC9pPjwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG4vLyBUT0RPOiBUQkQgaWYgZHVyYXRpb25zIG5lZWQgdG8gYmUgaW1wbGVtZW50ZWQgb3Igbm90XG4vLyBNZWRpYSdzIER1cmF0aW9uIGNvbXBvbmVudFxudmFyIER1cmF0aW9uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nbWVkaWEtZHVyYXRpb24nPlxuICAgICAgICB7dGhpcy5wcm9wcy5kdXJhdGlvbn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG4vLyBFYWNoIGluZGl2aWR1YWwgcGxheWxpc3QgZW50cnkgaW4gdGhlIGRyb3Bkb3duIGxpc3RcbnZhciBQbGF5bGlzdEVudHJ5ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBhZGRUb1BsYXlsaXN0OiBmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZyhcIkFkZGluZyB0byBleGlzdGluZyBwbGF5bGlzdFwiKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnByb3BzLnBsYXlsaXN0Ll9pZCk7XG4gICAgY29uc29sZS5sb2codGhpcy5wcm9wcy5kYXRhKTtcbiAgICAkLmFqYXgoe1xuICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICB1cmw6IFwiL3BsYXlsaXN0L3B1c2gvbWVkaWFFbnRyeVwiLFxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIG1lZGlhRGF0YTogdGhpcy5wcm9wcy5kYXRhLFxuICAgICAgICAgIGlkOiB0aGlzLnByb3BzLnBsYXlsaXN0Ll9pZCxcbiAgICAgICAgICBmaXJzdEVudHJ5OiB0aGlzLnByb3BzLnBsYXlsaXN0Lm1lZGlhRW50cmllc1swXSAgXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlN1Y2Nlc3M6IFVwZGF0aW5nIHBsYXlsaXN0XCIpO1xuICAgICAgICBwbGF5bGlzdEFjdGlvbnMudXBkYXRlUGxheWxpc3QoZGF0YS51cGRhdGVkUGxheWxpc3QpO1xuICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgZXJyb3I6IGZ1bmN0aW9uKHhociwgc3RhdHVzLCBlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVSUk9SOiBBZGQgdG8gcGxheWxpc3QgZXJyb3JlZCBvdXRcIiwgc3RhdHVzLCBlcnIudG9TdHJpbmcoKSk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICB9KTtcblxuICAgIC8vIHNvY2tldC5lbWl0KCdGcm9tIENsaWVudDogQWRkIHRvIGV4aXN0aW5nIHBsYXlsaXN0Jywge1xuICAgIC8vICAgbWVkaWFEYXRhOiB0aGlzLnByb3BzLmRhdGEsXG4gICAgLy8gICBpZDogdGhpcy5wcm9wcy5wbGF5bGlzdC5faWQsXG4gICAgLy8gICBmaXJzdEVudHJ5OiB0aGlzLnByb3BzLnBsYXlsaXN0Lm1lZGlhRW50cmllc1swXVxuICAgIC8vIH0pO1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPGxpPjxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBvbkNsaWNrPXt0aGlzLmFkZFRvUGxheWxpc3R9Pnt0aGlzLnByb3BzLnBsYXlsaXN0Lm5hbWV9PC9hPjwvbGk+ICAgICAgXG4gICAgKVxuICB9XG59KTtcblxuLy8gRWFjaCBkcm9wZG93biBmb3IgZXZlcnkgbWVkaWEgZW50cnlcbnZhciBQbGF5bGlzdERyb3Bkb3duID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBhZGRUb05ld1BsYXlsaXN0OiBmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZyhcIkNyZWF0aW5nIG5ldyBwbGF5bGlzdCB3aXRoIG1lZGlhXCIpO1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHBsYXlsaXN0RW50cmllcyA9IFtdO1xuICAgIHZhciBtb2RhbElkID0gXCIjY3JlYXRlLXBsYXlsaXN0LVwiICsgdGhpcy5wcm9wcy5wb3M7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5teVBsYXlsaXN0cyAhPT0gdW5kZWZpbmVkICYmIHRoaXMucHJvcHMubXlQbGF5bGlzdHMgIT09IG51bGwpIHtcbiAgICAgIC8vIFNldHMgdGhlIHBsYXlsaXN0cyBpbiB0aGUgZHJvcGRvd25cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wcm9wcy5teVBsYXlsaXN0cy5sZW5ndGg7ICsraSkge1xuICAgICAgICBwbGF5bGlzdEVudHJpZXMucHVzaChcbiAgICAgICAgICA8UGxheWxpc3RFbnRyeSBrZXk9e2l9IGRhdGE9e3RoaXMucHJvcHMuZGF0YX0gcGxheWxpc3Q9e3RoaXMucHJvcHMubXlQbGF5bGlzdHNbaV19IC8+XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDx1bCBjbGFzc05hbWU9XCJkcm9wZG93bi1tZW51IGRyb3Bkb3duLW1lbnUtcmlnaHRcIj5cbiAgICAgICAgPGxpIGNsYXNzTmFtZT1cImRyb3Bkb3duLWhlYWRlclwiPkFkZCBUbzwvbGk+XG4gICAgICAgIHtwbGF5bGlzdEVudHJpZXN9XG4gICAgICAgIDxsaSByb2xlPVwic2VwYXJhdG9yXCIgY2xhc3NOYW1lPVwiZGl2aWRlclwiPjwvbGk+XG4gICAgICAgIDxsaT48YSBkYXRhLXRvZ2dsZT1cIm1vZGFsXCIgZGF0YS10YXJnZXQ9e21vZGFsSWR9IG9uQ2xpY2s9e3RoaXMuYWRkVG9OZXdQbGF5bGlzdH0+QWRkIHRvIE5ldyBQbGF5bGlzdDwvYT48L2xpPlxuICAgICAgPC91bD5cbiAgICApO1xuICB9XG59KTtcblxuLy8gTUFJTiBDT01QT05FTlQ6IEVhY2ggaW5kaXZpZHVhbCBtZWRpYSBlbnRyeSBpbiB0aGUgbGlzdFxudmFyIE1lZGlhRW50cnkgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIC8vIEVWRU5UIEhBTkRMRVI6IFdoZW4gdGhlIGFkZCB0byBxdWV1ZSBidXR0b24gaXMgY2xpY2tlZCwgYWRkcyB0aGUgbWVkaWEgdG8gdGhlIHF1ZXVlLlxuICBhZGRUb1F1ZXVlOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgbWVkaWFFbnRyeSA9IHtcbiAgICAgIG1lZGlhSWQ6IHRoaXMucHJvcHMubWVkaWFJZCxcbiAgICAgIG1lZGlhVHlwZTogdGhpcy5wcm9wcy5tZWRpYVR5cGUsXG4gICAgICB0aHVtYm5haWw6IHRoaXMucHJvcHMudGh1bWJuYWlsLFxuICAgICAgdGl0bGU6IHRoaXMucHJvcHMudGl0bGUsXG4gICAgICBhcnRpc3Q6IHRoaXMucHJvcHMuYXJ0aXN0LFxuICAgICAgaWZNZWRpYUNhcmRBZGRlZDogdHJ1ZVxuICAgIH1cbiAgICBzb2NrZXQuZW1pdCgnRnJvbSBDbGllbnQ6IFB1c2ggaW50byBxdWV1ZScsIG1lZGlhRW50cnkpO1xuICB9LFxuXG4gIC8vIEVWRU5UIEhBTkRMRVI6IFdoZW4gdGhlIHBsYXkgYnV0dG9uIGlzIGNsaWNrZWQsIHBsYXlzIHRoZSBtZWRpYSBlbnRyeSBvbnRvIHRoZSBtZWRpYSBwbGF5ZXJcbiAgcGxheU1lZGlhRW50cnk6IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLnByb3BzLmNhdGVnb3J5VHlwZSA9PSBDQVRFR09SWU9GTUVESUEuU0VBUkNIIHx8IHRoaXMucHJvcHMuY2F0ZWdvcnlUeXBlID09IENBVEVHT1JZT0ZNRURJQS5QTEFZTElTVCkge1xuICAgICAgdmFyIG1lZGlhRW50cnkgPSB7XG4gICAgICAgIG1lZGlhSWQ6IHRoaXMucHJvcHMubWVkaWFJZCxcbiAgICAgICAgbWVkaWFUeXBlOiB0aGlzLnByb3BzLm1lZGlhVHlwZSxcbiAgICAgICAgdGh1bWJuYWlsOiB0aGlzLnByb3BzLnRodW1ibmFpbCxcbiAgICAgICAgdGl0bGU6IHRoaXMucHJvcHMudGl0bGUsXG4gICAgICAgIGFydGlzdDogdGhpcy5wcm9wcy5hcnRpc3QsXG4gICAgICAgIGlmTWVkaWFDYXJkQWRkZWQ6IHRydWVcbiAgICAgIH1cbiAgICAgIHNvY2tldC5lbWl0KCdGcm9tIENsaWVudDogUGxheSBuZXcgbWVkaWEgZW50cnknLCBtZWRpYUVudHJ5KTsgIFxuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLnByb3BzLmNhdGVnb3J5VHlwZSA9PSBDQVRFR09SWU9GTUVESUEuUVVFVUUpIHtcbiAgICAgIHZhciBxdWV1ZUVudHJ5ID0ge1xuICAgICAgICBtZWRpYUlkOiB0aGlzLnByb3BzLm1lZGlhSWQsXG4gICAgICAgIG1lZGlhVHlwZTogdGhpcy5wcm9wcy5tZWRpYVR5cGUsXG4gICAgICAgIHRodW1ibmFpbDogdGhpcy5wcm9wcy50aHVtYm5haWwsXG4gICAgICAgIHRpdGxlOiB0aGlzLnByb3BzLnRpdGxlLFxuICAgICAgICBhcnRpc3Q6IHRoaXMucHJvcHMuYXJ0aXN0LFxuICAgICAgICBpZk1lZGlhQ2FyZEFkZGVkOiB0cnVlLFxuICAgICAgICBwb3NJblF1ZXVlOiB0aGlzLnByb3BzLnBvc1xuICAgICAgfVxuICAgICAgc29ja2V0LmVtaXQoJ0Zyb20gQ2xpZW50OiBQbGF5IG5ldyBtZWRpYSBlbnRyeSBmcm9tIHF1ZXVlJywgcXVldWVFbnRyeSk7ICAgXG4gICAgfVxuICB9LFxuXG4gIC8vIEVWRU5UIEhBTkRMRVI6IFdoZW4gdGhlIGRlbGV0ZSBidXR0b24gaXMgY2xpY2tlZCwgcmVtb3ZlcyB0aGUgbWVkaWEgZW50cnkgZnJvbSBxdWV1ZVxuICBkZWxldGVNZWRpYUVudHJ5OiBmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZyhcIkRlbGV0ZSBNZWRpYSBFbnRyeSBmcm9tIFF1ZXVlXCIpO1xuICAgIHZhciBtZWRpYUVudHJ5ID0ge1xuICAgICAgbWVkaWFJZDogdGhpcy5wcm9wcy5tZWRpYUlkLFxuICAgICAgbWVkaWFUeXBlOiB0aGlzLnByb3BzLm1lZGlhVHlwZSxcbiAgICAgIHRodW1ibmFpbDogdGhpcy5wcm9wcy50aHVtYm5haWwsXG4gICAgICB0aXRsZTogdGhpcy5wcm9wcy50aXRsZSxcbiAgICAgIGFydGlzdDogdGhpcy5wcm9wcy5hcnRpc3QsXG4gICAgICBpZk1lZGlhQ2FyZEFkZGVkOiB0cnVlLFxuICAgICAgcG9zSW5RdWV1ZTogdGhpcy5wcm9wcy5wb3NcbiAgICB9XG4gICAgc29ja2V0LmVtaXQoJ0Zyb20gQ2xpZW50OiBEZWxldGUgbWVkaWEgZW50cnkgZnJvbSBxdWV1ZScsIG1lZGlhRW50cnkpO1xuICB9LFxuXG4gIC8vIEVWRU5UIEhBTkRMRVI6IE1vdmVzIG1lZGlhIGVudHJ5IHRvIHRoZSBmcm9udCBvZiB0aGUgcXVldWUgYXMgYSBwbGF5IG5leHQgbWVkaWFcbiAgbW92ZVRvRnJvbnRPZlRoZVF1ZXVlOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgbWVkaWFFbnRyeSA9IHtcbiAgICAgIG1lZGlhSWQ6IHRoaXMucHJvcHMubWVkaWFJZCxcbiAgICAgIG1lZGlhVHlwZTogdGhpcy5wcm9wcy5tZWRpYVR5cGUsXG4gICAgICB0aHVtYm5haWw6IHRoaXMucHJvcHMudGh1bWJuYWlsLFxuICAgICAgdGl0bGU6IHRoaXMucHJvcHMudGl0bGUsXG4gICAgICBhcnRpc3Q6IHRoaXMucHJvcHMuYXJ0aXN0LFxuICAgICAgaWZNZWRpYUNhcmRBZGRlZDogdHJ1ZSxcbiAgICAgIHBvc0luUXVldWU6IHRoaXMucHJvcHMucG9zXG4gICAgfVxuICAgIHNvY2tldC5lbWl0KCdGcm9tIENsaWVudDogTW92ZSBtZWRpYSBlbnRyeSB0byBmcm9udCBvZiBxdWV1ZScsIG1lZGlhRW50cnkpO1xuICB9LFxuXG4gIC8vIEVWRU5UIEhBTkRMRVI6IERlbGV0ZXMgcGxheWxpc3QgZW50cnkgaW4gdGhlIG9wZW5lZCBlZGl0IHBsYXlsaXN0XG4gIGRlbGV0ZVBsYXlsaXN0RW50cnk6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMucHJvcHMuZGVsZXRlRW50cnkodGhpcy5wcm9wcy5wb3MpO1xuICB9LFxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIC8vIFRoaXMgbmVlZHMgdG8gYmUgcmV0b29sdGlwcGVkIGJlY2F1c2UgdGhlIG1lZGlhIGVudHJpZXMgYXJlIG5vdCByZW5kZXJlZCB3aGVuIHRoZSBzaXRlIGxvYWRzLlxuICAgICQodGhpcy5pY29uMSkudG9vbHRpcCgpO1xuICAgICQodGhpcy5pY29uMikudG9vbHRpcCgpO1xuICAgICQodGhpcy5pY29uMykudG9vbHRpcCgpO1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNhdGVnb3J5RGl2TmFtZTtcbiAgICB2YXIgY2F0ZWdvcnlDbGFzc05hbWU7XG5cbiAgICAvLyBSZW5kZXJzIHRoZSBNZWRpYSBlbnRyeSB0byB0aGUgY29ycmVjdCBjYXRlZ29yeS5cbiAgICBzd2l0Y2godGhpcy5wcm9wcy5jYXRlZ29yeVR5cGUpIHtcbiAgICAgIC8vIE1lZGlhIEVudHJ5IHRoYXQgaXMgaW4gdGhlIFF1ZXVlIGNvbXBvbmVudFxuICAgICAgY2FzZSBDQVRFR09SWU9GTUVESUEuUVVFVUU6XG4gICAgICAgIHZhciBxdWV1ZU1lZGlhRW50cnlJZCA9IFwiLXF1ZXVlLW1lZGlhLWVudHJ5LWlkXCI7XG4gICAgICAgIHZhciBxdWV1ZU1lZGlhQ2FyZENsYXNzTmFtZSA9IFwibWVkaWEtY2FyZCBncmFiYmFibGVcIjtcbiAgICAgICAgdmFyIGljb25DbGFzc05hbWUgPSBcImljb24tYnRuXCI7XG4gICAgICAgIHZhciBkZWxldGVCdXR0b24gPSBbXTtcblxuICAgICAgICAvLyBBZGRzIHRoZSBtZWRpYS1jYXJkLWFkZGVkIGNsYXNzIGlmIHRoZSBtZWRpYSBlbnRyeSB3YXMgYWRkZWQgaW5kaXZpZHVhbGx5XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmlmTWVkaWFDYXJkQWRkZWQgPT09IHRydWUpIHtcbiAgICAgICAgICBxdWV1ZU1lZGlhQ2FyZENsYXNzTmFtZSArPSBcIiBtZWRpYS1jYXJkLWFkZGVkXCI7XG4gICAgICAgICAgaWNvbkNsYXNzTmFtZSArPSBcIi1ibHVlLWxpdGVcIjtcbiAgICAgICAgICBkZWxldGVCdXR0b24ucHVzaCAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1lZGlhLWNhcmQtYWRkZWQtY29ybmVyLWNvbnRhaW5lclwiPjxkaXYgY2xhc3NOYW1lPVwibWVkaWEtY2FyZC1hZGRlZC1jb3JuZXJcIj48L2Rpdj48L2Rpdj5cbiAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwibWVkaWEtY2FyZC1hZGRlZC1wbHVzIGljb24tYnRuLXdoaXRlXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIG9uQ2xpY2s9e3RoaXMuZGVsZXRlTWVkaWFFbnRyeX0+KzwvYT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBpbiB0aGUgZnJvbnQgb2YgdGhlIHF1ZXVlLCByZW5kZXJzIGEgbWVkaWEgZW50cnkgdGhhdCB3b3VsZCBwbGF5IG5leHRcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucG9zID09PSBQTEFZTkVYVE1FRElBRU5UUllQT1MpIHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBpZD17dGhpcy5wcm9wcy5wb3MgKyBxdWV1ZU1lZGlhRW50cnlJZH0gY2xhc3NOYW1lPXtxdWV1ZU1lZGlhQ2FyZENsYXNzTmFtZX0+XG4gICAgICAgICAgICAgIHtkZWxldGVCdXR0b259XG4gICAgICAgICAgICAgIDxUaHVtYm5haWwgdGh1bWJuYWlsPXt0aGlzLnByb3BzLnRodW1ibmFpbH0gY2F0ZWdvcnlUeXBlPXt0aGlzLnByb3BzLmNhdGVnb3J5VHlwZX0gLz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZWRpYS1uZXh0XCI+UExBWUlORyBORVhUOjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm51bWJlclwiPnt0aGlzLnByb3BzLnBvcyArIDF9PC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZWRpYS10ZXh0LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxUaXRsZSB0aXRsZT17dGhpcy5wcm9wcy50aXRsZX0gY2F0ZWdvcnlUeXBlPXt0aGlzLnByb3BzLmNhdGVnb3J5VHlwZX0gLz5cbiAgICAgICAgICAgICAgICA8QXJ0aXN0IGFydGlzdD17dGhpcy5wcm9wcy5hcnRpc3R9IGNhdGVnb3J5VHlwZT17dGhpcy5wcm9wcy5jYXRlZ29yeVR5cGV9IC8+XG4gICAgICAgICAgICAgICAgPFR5cGUgdHlwZT17dGhpcy5wcm9wcy5tZWRpYVR5cGV9IGNhdGVnb3J5VHlwZT17dGhpcy5wcm9wcy5jYXRlZ29yeVR5cGV9IC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZWRpYS1pY29uLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZWRpYS1pY29uXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e2ljb25DbGFzc05hbWV9IGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBvbkNsaWNrPXt0aGlzLnBsYXlNZWRpYUVudHJ5fT48ZGl2IGNsYXNzTmFtZT1cIm1lZGlhLWljb25cIj48aSBjbGFzc05hbWU9XCJmYSBmYS1wbGF5XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPjwvZGl2PjwvYT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRXZlcnkgb3RoZXIgbWVkaWEgZW50cnkgaW4gdGhlIHF1ZXVlXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGRpdiBpZD17dGhpcy5wcm9wcy5wb3MgKyBxdWV1ZU1lZGlhRW50cnlJZH0gY2xhc3NOYW1lPXtxdWV1ZU1lZGlhQ2FyZENsYXNzTmFtZX0+XG4gICAgICAgICAgICB7ZGVsZXRlQnV0dG9ufVxuICAgICAgICAgICAgPFRodW1ibmFpbCB0aHVtYm5haWw9e3RoaXMucHJvcHMudGh1bWJuYWlsfSBjYXRlZ29yeVR5cGU9e3RoaXMucHJvcHMuY2F0ZWdvcnlUeXBlfSAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJudW1iZXJcIj57dGhpcy5wcm9wcy5wb3MgKyAxfTwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1lZGlhLXRleHQtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgIDxUaXRsZSB0aXRsZT17dGhpcy5wcm9wcy50aXRsZX0gY2F0ZWdvcnlUeXBlPXt0aGlzLnByb3BzLmNhdGVnb3J5VHlwZX0gLz5cbiAgICAgICAgICAgICAgPEFydGlzdCBhcnRpc3Q9e3RoaXMucHJvcHMuYXJ0aXN0fSBjYXRlZ29yeVR5cGU9e3RoaXMucHJvcHMuY2F0ZWdvcnlUeXBlfSAvPlxuICAgICAgICAgICAgICA8VHlwZSB0eXBlPXt0aGlzLnByb3BzLm1lZGlhVHlwZX0gY2F0ZWdvcnlUeXBlPXt0aGlzLnByb3BzLmNhdGVnb3J5VHlwZX0gLz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZWRpYS1pY29uLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVkaWEtaWNvblwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT17aWNvbkNsYXNzTmFtZX0gaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIG9uQ2xpY2s9e3RoaXMubW92ZVRvRnJvbnRPZlRoZVF1ZXVlfT48ZGl2IGNsYXNzTmFtZT1cIm1lZGlhLWljb25cIj48aSBjbGFzc05hbWU9XCJmYSBmYS1jaGV2cm9uLXVwXCIgZGF0YS10b2dnbGU9XCJ0b29sdGlwXCIgdGl0bGU9XCJNb3ZlIHRvIFRvcFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT48L2Rpdj48L2E+XG4gICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPXtpY29uQ2xhc3NOYW1lfSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgb25DbGljaz17dGhpcy5wbGF5TWVkaWFFbnRyeX0+PGRpdiBjbGFzc05hbWU9XCJtZWRpYS1pY29uXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtcGxheVwiIGRhdGEtdG9nZ2xlPVwidG9vbHRpcFwiIHRpdGxlPVwiUGxheSBOb3dcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+PC9kaXY+PC9hPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApOyBcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIC8vIE1lZGlhIEVudHJ5IHRoYXQgaXMgaW4gdGhlIHBsYXlsaXN0IGVudHJ5IGNvbXBvbmVudFxuICAgICAgY2FzZSBDQVRFR09SWU9GTUVESUEuUExBWUxJU1Q6XG4gICAgICAgIHZhciBkcm9wZG93biA9IFtdO1xuICAgICAgICB2YXIgbWVkaWFEYXRhID0ge1xuICAgICAgICAgIGFydGlzdDogdGhpcy5wcm9wcy5hcnRpc3QsXG4gICAgICAgICAgbWVkaWFJZDogdGhpcy5wcm9wcy5tZWRpYUlkLFxuICAgICAgICAgIG1lZGlhVHlwZTogdGhpcy5wcm9wcy5tZWRpYVR5cGUsXG4gICAgICAgICAgdGh1bWJuYWlsOiB0aGlzLnByb3BzLnRodW1ibmFpbCxcbiAgICAgICAgICB0aXRsZTogdGhpcy5wcm9wcy50aXRsZVxuICAgICAgICAgIC8vIFRPRE86IFRoZSBzZWFyY2ggZW50cnkgZG9lcyBub3QgaGF2ZSB0aGUgc2FtZSBkYiBfaWQuIE5lZWQgdG8gZmluZCBhIHdheSB0byBhZGQgbWVkaWEgZW50cmllcyB3aXRob3V0IGR1cGxpY2F0ZXNcbiAgICAgICAgICAvLyBfaWQ6IHRoaXMucHJvcHMuX2lkXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gSWYgYSB1c2VyIGlzIGxvZ2dlZCBpbiwgdGhlIGRyb3Bkb3duIGFwcGVhcnMgICAgICAgIFxuICAgICAgICBkcm9wZG93bi5wdXNoKFxuICAgICAgICAgIDxkaXYga2V5PXt0aGlzLnByb3BzLnBvc30gY2xhc3NOYW1lPVwibWVkaWEtaWNvblwiPlxuICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiaWNvbi1idG4tYmx1ZS1saXRlIGRyb3Bkb3duLXRvZ2dsZVwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIj48aSBjbGFzc05hbWU9XCJmYSBmYS1saXN0LXVsXCIgcmVmPXsocmVmKSA9PiB0aGlzLmljb24zID0gcmVmfSBkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIiB0aXRsZT1cIkFkZCB0byBQbGF5bGlzdFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT48L2E+XG4gICAgICAgICAgICA8UGxheWxpc3REcm9wZG93biBteVBsYXlsaXN0cz17dGhpcy5wcm9wcy5teVBsYXlsaXN0c30gZGF0YT17bWVkaWFEYXRhfSBwb3M9e3RoaXMucHJvcHMucG9zfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuXG4gICAgICAgIC8vIElmIHRoZSBwbGF5bGlzdCBpcyBhIGxpa2VkIG9uZVxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vd25lciA9PT0gZmFsc2UpIHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNiBjb2wtc20tMTIgY29sLXBhZGRpbmdcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGF5bGlzdC1tZWRpYS1jYXJkXCI+XG4gICAgICAgICAgICAgICAgPFRodW1ibmFpbCB0aHVtYm5haWw9e3RoaXMucHJvcHMudGh1bWJuYWlsfSBjYXRlZ29yeVR5cGU9e3RoaXMucHJvcHMuY2F0ZWdvcnlUeXBlfSAvPlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZWRpYS10ZXh0LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgPFRpdGxlIHRpdGxlPXt0aGlzLnByb3BzLnRpdGxlfSBjYXRlZ29yeVR5cGU9e3RoaXMucHJvcHMuY2F0ZWdvcnlUeXBlfSAvPlxuICAgICAgICAgICAgICAgICAgPEFydGlzdCBhcnRpc3Q9e3RoaXMucHJvcHMuYXJ0aXN0fSBjYXRlZ29yeVR5cGU9e3RoaXMucHJvcHMuY2F0ZWdvcnlUeXBlfSAvPlxuICAgICAgICAgICAgICAgICAgPFR5cGUgdHlwZT17dGhpcy5wcm9wcy5tZWRpYVR5cGV9IGNhdGVnb3J5VHlwZT17dGhpcy5wcm9wcy5jYXRlZ29yeVR5cGV9IC8+XG5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVkaWEtaWNvbi1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZWRpYS1pY29uXCI+PGEgY2xhc3NOYW1lPVwiaWNvbi1idG5cIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgb25DbGljaz17dGhpcy5hZGRUb1F1ZXVlfT48aSBjbGFzc05hbWU9XCJmYSBmYS1wbHVzXCIgcmVmPXsocmVmKSA9PiB0aGlzLmljb24xID0gcmVmfSBkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIiB0aXRsZT1cIkFkZCB0byBRdWV1ZVwiPjwvaT48L2E+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVkaWEtaWNvblwiPjxhIGNsYXNzTmFtZT1cImljb24tYnRuXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIG9uQ2xpY2s9e3RoaXMucGxheU1lZGlhRW50cnl9PjxpIGNsYXNzTmFtZT1cImZhIGZhLXBsYXlcIiByZWY9eyhyZWYpID0+IHRoaXMuaWNvbjIgPSByZWZ9IGRhdGEtdG9nZ2xlPVwidG9vbHRpcFwiIHRpdGxlPVwiUGxheSBOb3dcIj48L2k+PC9hPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7ZHJvcGRvd259XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxNb2RhbENyZWF0ZVBsYXlsaXN0IFxuICAgICAgICAgICAgICAgICAga2V5PXt0aGlzLnByb3BzLnBvc30gXG4gICAgICAgICAgICAgICAgICB1c2VyPXt0aGlzLnByb3BzLnVzZXJ9XG4gICAgICAgICAgICAgICAgICBkYXRhPXttZWRpYURhdGF9IFxuICAgICAgICAgICAgICAgICAgcG9zPXt0aGlzLnByb3BzLnBvc30gLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRlbGV0ZUluZGljYXRvckNsYXNzID0gXCIgXCI7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRlbGV0ZUluZGljYXRvciA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBkZWxldGVJbmRpY2F0b3JDbGFzcyA9IFwiIG1lZGlhLWNhcmQtYWRkZWQgXCI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiB0aGUgcGxheWxpc3Qgd2FzIG1hZGUgYnkgdGhlIGN1cnJlbnQgdXNlclxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImNvbC1tZC02IGNvbC1zbS0xMiBjb2wtcGFkZGluZyBlZGl0LXBsYXlsaXN0LWNhcmRcIn0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJwbGF5bGlzdC1tZWRpYS1jYXJkXCIgKyBkZWxldGVJbmRpY2F0b3JDbGFzcyArIFwiZ3JhYmJhYmxlXCJ9PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1lZGlhLWNhcmQtYWRkZWQtY29ybmVyLWNvbnRhaW5lclwiPjxkaXYgY2xhc3NOYW1lPVwibWVkaWEtY2FyZC1hZGRlZC1jb3JuZXJcIj48L2Rpdj48L2Rpdj5cbiAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwibWVkaWEtY2FyZC1hZGRlZC1wbHVzIGljb24tYnRuLXdoaXRlXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIG9uQ2xpY2s9e3RoaXMuZGVsZXRlUGxheWxpc3RFbnRyeX0+KzwvYT5cbiAgICAgICAgICAgICAgPFRodW1ibmFpbCB0aHVtYm5haWw9e3RoaXMucHJvcHMudGh1bWJuYWlsfSBjYXRlZ29yeVR5cGU9e3RoaXMucHJvcHMuY2F0ZWdvcnlUeXBlfSAvPlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVkaWEtdGV4dC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8VGl0bGUgdGl0bGU9e3RoaXMucHJvcHMudGl0bGV9IGNhdGVnb3J5VHlwZT17dGhpcy5wcm9wcy5jYXRlZ29yeVR5cGV9IC8+XG4gICAgICAgICAgICAgICAgPEFydGlzdCBhcnRpc3Q9e3RoaXMucHJvcHMuYXJ0aXN0fSBjYXRlZ29yeVR5cGU9e3RoaXMucHJvcHMuY2F0ZWdvcnlUeXBlfSAvPlxuICAgICAgICAgICAgICAgIDxUeXBlIHR5cGU9e3RoaXMucHJvcHMubWVkaWFUeXBlfSBjYXRlZ29yeVR5cGU9e3RoaXMucHJvcHMuY2F0ZWdvcnlUeXBlfSAvPlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZWRpYS1pY29uLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZWRpYS1pY29uXCI+PGEgY2xhc3NOYW1lPVwiaWNvbi1idG4tYmx1ZS1saXRlXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIG9uQ2xpY2s9e3RoaXMuYWRkVG9RdWV1ZX0+PGkgY2xhc3NOYW1lPVwiZmEgZmEtcGx1c1wiIHJlZj17KHJlZikgPT4gdGhpcy5pY29uMSA9IHJlZn0gZGF0YS10b2dnbGU9XCJ0b29sdGlwXCIgdGl0bGU9XCJBZGQgdG8gUXVldWVcIj48L2k+PC9hPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZWRpYS1pY29uXCI+PGEgY2xhc3NOYW1lPVwiaWNvbi1idG4tYmx1ZS1saXRlXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIG9uQ2xpY2s9e3RoaXMucGxheU1lZGlhRW50cnl9PjxpIGNsYXNzTmFtZT1cImZhIGZhLXBsYXlcIiByZWY9eyhyZWYpID0+IHRoaXMuaWNvbjIgPSByZWZ9IGRhdGEtdG9nZ2xlPVwidG9vbHRpcFwiIHRpdGxlPVwiUGxheSBOb3dcIj48L2k+PC9hPjwvZGl2PlxuICAgICAgICAgICAgICAgICAge2Ryb3Bkb3dufVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8TW9kYWxDcmVhdGVQbGF5bGlzdCBcbiAgICAgICAgICAgICAgICBrZXk9e3RoaXMucHJvcHMucG9zfSBcbiAgICAgICAgICAgICAgICB1c2VyPXt0aGlzLnByb3BzLnVzZXJ9XG4gICAgICAgICAgICAgICAgZGF0YT17bWVkaWFEYXRhfSBcbiAgICAgICAgICAgICAgICBwb3M9e3RoaXMucHJvcHMucG9zfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIC8vIE1lZGlhIEVudHJ5IGluIHRoZSBTZWFyY2ggY29tcG9uZW50LCBhbHNvIGhhcyBhIGJ1dHRvbiB0aGF0IGFkZHMgdGhlIG1lZGlhIGVudHJ5IGludG8gdGhlIHF1ZXVlXG4gICAgICBjYXNlIENBVEVHT1JZT0ZNRURJQS5TRUFSQ0g6XG4gICAgICAgIHZhciBkcm9wZG93biA9IFtdO1xuICAgICAgICB2YXIgc2VhcmNoTWVkaWFFbnRyeUlkID0gXCItc2VhcmNoLW1lZGlhLWVudHJ5LWlkXCI7XG4gICAgICAgIHZhciBtZWRpYURhdGEgPSB7XG4gICAgICAgICAgYXJ0aXN0OiB0aGlzLnByb3BzLmFydGlzdCxcbiAgICAgICAgICBtZWRpYUlkOiB0aGlzLnByb3BzLm1lZGlhSWQsXG4gICAgICAgICAgbWVkaWFUeXBlOiB0aGlzLnByb3BzLm1lZGlhVHlwZSxcbiAgICAgICAgICB0aHVtYm5haWw6IHRoaXMucHJvcHMudGh1bWJuYWlsLFxuICAgICAgICAgIHRpdGxlOiB0aGlzLnByb3BzLnRpdGxlXG4gICAgICAgICAgLy8gVE9ETzogVGhlIHNlYXJjaCBlbnRyeSBkb2VzIG5vdCBoYXZlIHRoZSBzYW1lIGRiIF9pZC4gTmVlZCB0byBmaW5kIGEgd2F5IHRvIGFkZCBtZWRpYSBlbnRyaWVzIHdpdGhvdXQgZHVwbGljYXRlc1xuICAgICAgICAgIC8vIF9pZDogdGhpcy5wcm9wcy5faWRcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBXaGVuIHRoZSB1c2VyIGlzIG5vdCBsb2dnZWQgaW4sIHRoZXJlIGlzIG5vIGRyb3Bkb3duXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnVzZXIgPT09IHVuZGVmaW5lZCB8fCB0aGlzLnByb3BzLnVzZXIgPT09IG51bGwpIHtcbiAgICAgICAgICBkcm9wZG93biA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIGEgdXNlciBpcyBsb2dnZWQgaW4sIHRoZSBkcm9wZG93biBhcHBlYXJzXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRyb3Bkb3duLnB1c2goXG4gICAgICAgICAgICA8ZGl2IGtleT17dGhpcy5wcm9wcy5wb3N9IGNsYXNzTmFtZT1cInNlYXJjaC1tZWRpYS1pY29uXCI+XG4gICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImljb24tYnRuIGRyb3Bkb3duLXRvZ2dsZVwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIj48aSBjbGFzc05hbWU9XCJmYSBmYS1saXN0LXVsXCIgcmVmPXsocmVmKSA9PiB0aGlzLmljb24zID0gcmVmfSBkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIiB0aXRsZT1cIkFkZCB0byBQbGF5bGlzdFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT48L2E+XG4gICAgICAgICAgICAgIDxQbGF5bGlzdERyb3Bkb3duIG15UGxheWxpc3RzPXt0aGlzLnByb3BzLm15UGxheWxpc3RzfSBkYXRhPXttZWRpYURhdGF9IHBvcz17dGhpcy5wcm9wcy5wb3N9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8ZGl2IGlkPXt0aGlzLnByb3BzLnBvcyArIHNlYXJjaE1lZGlhRW50cnlJZH0gY2xhc3NOYW1lPXtcInNlYXJjaC1jYXJkLXBhZGRpbmdcIn0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaC1tZWRpYS1jYXJkXCI+XG4gICAgICAgICAgICAgIDxUaHVtYm5haWwgdGh1bWJuYWlsPXt0aGlzLnByb3BzLnRodW1ibmFpbH0gY2F0ZWdvcnlUeXBlPXt0aGlzLnByb3BzLmNhdGVnb3J5VHlwZX0gLz5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaC1tZWRpYS10ZXh0LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxUaXRsZSB0aXRsZT17dGhpcy5wcm9wcy50aXRsZX0gY2F0ZWdvcnlUeXBlPXt0aGlzLnByb3BzLmNhdGVnb3J5VHlwZX0gLz5cbiAgICAgICAgICAgICAgICA8QXJ0aXN0IGFydGlzdD17dGhpcy5wcm9wcy5hcnRpc3R9IGNhdGVnb3J5VHlwZT17dGhpcy5wcm9wcy5jYXRlZ29yeVR5cGV9IC8+XG4gICAgICAgICAgICAgICAgPFR5cGUgdHlwZT17dGhpcy5wcm9wcy5tZWRpYVR5cGV9IGNhdGVnb3J5VHlwZT17dGhpcy5wcm9wcy5jYXRlZ29yeVR5cGV9IC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBUT0RPIG1ha2UgdG9vbHRpcHMgd29yayBhbmQgbWFrZSBkcm9wZG93biB3b3JrICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaC1tZWRpYS1pY29uLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoLW1lZGlhLWljb25cIj48YSBpZD17XCJtZWRpYS1lbnRyeS1idXR0b24tXCIgKyB0aGlzLnByb3BzLnBvc30gY2xhc3NOYW1lPVwiaWNvbi1idG5cIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgb25DbGljaz17dGhpcy5hZGRUb1F1ZXVlfT48aSBjbGFzc05hbWU9XCJmYSBmYS1wbHVzIGZhLWxnXCIgcmVmPXsocmVmKSA9PiB0aGlzLmljb24xID0gcmVmfSBkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIiB0aXRsZT1cIkFkZCB0byBRdWV1ZVwiPjwvaT48L2E+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2gtbWVkaWEtaWNvblwiPjxhIGNsYXNzTmFtZT1cImljb24tYnRuXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIG9uQ2xpY2s9e3RoaXMucGxheU1lZGlhRW50cnl9PjxpIGNsYXNzTmFtZT1cImZhIGZhLXBsYXlcIiByZWY9eyhyZWYpID0+IHRoaXMuaWNvbjIgPSByZWZ9IGRhdGEtdG9nZ2xlPVwidG9vbHRpcFwiIHRpdGxlPVwiUGxheSBOb3dcIj48L2k+PC9hPjwvZGl2PlxuICAgICAgICAgICAgICAgIHtkcm9wZG93bn1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPE1vZGFsQ3JlYXRlUGxheWxpc3QgXG4gICAgICAgICAgICAgIGtleT17dGhpcy5wcm9wcy5wb3N9IFxuICAgICAgICAgICAgICB1c2VyPXt0aGlzLnByb3BzLnVzZXJ9XG4gICAgICAgICAgICAgIGRhdGE9e21lZGlhRGF0YX0gXG4gICAgICAgICAgICAgIHBvcz17dGhpcy5wcm9wcy5wb3N9IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvLyBFUlJPUiwgTm8gQ2F0ZWdvcnkgdHlwZVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS5sb2coJ01lZGlhIENhdGVnb3J5IEVycm9yOiBOTyBUWVBFJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBNZWRpYUVudHJ5OyIsIi8qICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIENvcHlyaWdodCDCqSBcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBNZWRpYVBsYXllci5qc3hcblxuICAgIENvbXBvbmVudCBvZiB0aGUgbWVkaWEgcGxheWVyLiBDb250YWlucyB0aGUgc3RhdHVzIGJhciBhbmQgdGhlIG1lZGlhIHBsYXllclxuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIE1haW4gQ29tcG9uZW50IE1lZGlhUGxheWVyXG5cbiAgICBAQ29tcG9uZW50OiBcbiAgICAgIFN0YXR1c0JhciAtXG5cbiAgICAgIE1lZGlhUGxheWVyIC0gVGhlIGVudGlyZSBtZWRpYSBwbGF5ZXIgY29udGFpbmluZyBzdWJjb21wb25lbnRzIG9mIHRoZSBwbGF5LFxuICAgICAgICAgICAgICAgICAgICBwYXVzZSwgYW5kIHN0YXR1cyBiYXIuXG5cbiAgICBARXhwb3J0OiBNZWRpYVBsYXllclxuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFN0YXR1c0JhciA9IHJlcXVpcmUoJy4vU3RhdHVzQmFyLmpzeCcpO1xuXG5jb25zdCBNRURJQVBMQUNFSE9MREVSU1RBVEVTID0ge1xuICBBQ1RJVkU6ICdBQ1RJVkUnLFxuICBOT05FOiAnTk9ORScsXG4gIFJFQURZOiAnUkVBRFknLFxuICBMT0FESU5HOiAnTE9BRElORycsXG4gIFNZTkNJTkc6ICdTWU5DSU5HJ1xufTtcblxuLyogID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgRnVuY3Rpb24gaW5pdGlhbGl6ZVlvdXR1YmVJRnJhbWVcblxuICAgIFBsYXlzIHRoZSBtZWRpYSB3aXRoIHRoZSBnaXZlbiBtZWRpYSB0eXBlXG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbmZ1bmN0aW9uIHBsYXlNZWRpYUJ5TWVkaWFUeXBlKG1lZGlhRGF0YSkge1xuICBzd2l0Y2gobWVkaWFEYXRhLm1lZGlhVHlwZSkge1xuICAgIGNhc2UgTUVESUFUWVBFUy5ZT1VUVUJFOlxuICAgICAgeW91dHViZVBsYXlWaWRlbyhtZWRpYURhdGEpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBNRURJQVRZUEVTLlNPVU5EQ0xPVUQ6XG4gICAgICAvLyBUT0RPOiBQbGF5IFNvdW5kY2xvdWRcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgTUVESUFUWVBFUy5WSU1FTzpcbiAgICAgIC8vIFRPRE86IFBsYXkgVmltZW9cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgTUVESUFUWVBFUy5OT05FOlxuICAgICAgLy8gUmVtb3ZlIHRoZSBwbGF5ZXJzXG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgLy8gRVJST1JcbiAgICAgIGNvbnNvbGUubG9nKFwiRVJST1I6IE5vIG1lZGlhIHR5cGVcIik7XG4gICAgICBicmVhaztcbiAgfVxufVxuXG4vKiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBGdW5jdGlvbiBwYXVzZU1lZGlhQnlNZWRpYVR5cGVcblxuICAgIFBhdXNlcyB0aGUgbWVkaWEgd2l0aCB0aGUgZ2l2ZW4gbWVkaWEgdHlwZVxuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5mdW5jdGlvbiBwYXVzZU1lZGlhQnlNZWRpYVR5cGUobWVkaWFEYXRhKSB7XG4gIHN3aXRjaChtZWRpYURhdGEubWVkaWFUeXBlKSB7XG4gICAgY2FzZSBNRURJQVRZUEVTLllPVVRVQkU6XG4gICAgICB5b3V0dWJlUGF1c2VWaWRlbyhtZWRpYURhdGEpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBNRURJQVRZUEVTLlNPVU5EQ0xPVUQ6XG4gICAgICAvLyBUT0RPOiBQYXVzZSBTb3VuZGNsb3VkXG4gICAgICBicmVhaztcbiAgICBjYXNlIE1FRElBVFlQRVMuVklNRU86XG4gICAgICAvLyBUT0RPOiBQYXVzZSBWaW1lb1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBNRURJQVRZUEVTLk5PTkU6XG4gICAgICAvLyBSZW1vdmUgdGhlIHBsYXllcnNcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICAvLyBFUlJPUlxuICAgICAgY29uc29sZS5sb2coXCJFUlJPUjogTm8gbWVkaWEgdHlwZVwiKTsgICAgICBcbiAgICAgIGJyZWFrO1xuICB9XG59XG5cbi8qIFBsYWNlaG9sZGVyIGZvciB3aGVuIG5vIG1lZGlhIGlzIGxvYWRlZCAqL1xudmFyIFZpZGVvUGxhY2Vob2xkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxhY2Vob2xkZXIgcGxhY2Vob2xkZXItdmlkZW9cIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGFjZWhvbGRlci1jb250ZW50XCI+XG4gICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtbW9vbi1vIHBsYWNlaG9sZGVyLWljb25cIj48L2k+PGJyLz5cbiAgICAgICAgICA8c3Bhbj5Zb3UgZG9uJnJzcXVvO3QgaGF2ZSBhbnkgdmlkZW9zPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG4vKiBQbGFjZWhvbGRlciBmb3Igd2hlbiBtZWRpYSBpcyBsb2FkZWQgaW50byBxdWV1ZSBidXQgbm90IHBsYXllZCAqL1xudmFyIFZpZGVvUmVhZHkgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxhY2Vob2xkZXIgcGxhY2Vob2xkZXItdmlkZW9cIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGFjZWhvbGRlci1jb250ZW50XCI+XG4gICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtcGxheSBwbGFjZWhvbGRlci1pY29uXCI+PC9pPjxici8+XG4gICAgICAgICAgPHNwYW4+UGxheSB5b3VyIHF1ZXVlPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG4vKiBQbGFjZWhvbGRlciBmb3Igd2hlbiB2aWRlbyBpcyBsb2FkaW5nICovXG52YXIgVmlkZW9Mb2FkaW5nID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYWNlaG9sZGVyIHBsYWNlaG9sZGVyLXZpZGVvXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxhY2Vob2xkZXItY29udGVudFwiPlxuICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWNpcmNsZS1vLW5vdGNoIGZhLXNwaW4gcGxhY2Vob2xkZXItaWNvblwiPjwvaT48YnIvPlxuICAgICAgICAgIDxzcGFuPkxvYWRpbmc8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbi8qIFBsYWNlaG9sZGVyIGZvciB3aGVuIHZpZGVvIGlzIHN5bmNpbmcgKi9cbnZhciBWaWRlb1N5bmNpbmcgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxhY2Vob2xkZXIgcGxhY2Vob2xkZXItdmlkZW9cIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGFjZWhvbGRlci1jb250ZW50XCI+XG4gICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtcmVmcmVzaCBmYS1zcGluIHBsYWNlaG9sZGVyLWljb25cIj48L2k+PGJyLz5cbiAgICAgICAgICA8c3Bhbj5TeW5jaW5nPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG4vKiBNZWRpYSBwbGF5ZXIgKi9cbnZhciBNZWRpYVBsYXllciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbWVkaWFTdGF0ZTogJ05PTkUnLFxuICAgICAgbWVkaWFUeXBlOiAnTk9ORScsXG4gICAgICBsb2NhbFN0YXRlOiAnTk9ORSdcbiAgICB9O1xuICB9LFxuXG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICAvLyBTZXRzIHVwIGV2ZW50IGhhbmRsZXJzIGZvciB3aGVuIHNvY2tldCBzZW5kcyBmcm9tIHNlcnZlciB0byBjbGllbnRcbiAgICBzb2NrZXQub24oJ0Zyb20gU2VydmVyOiBJbml0aWFsaXplIG1lZGlhIHBsYXllcicsIHRoaXMuaW5pdGlhbGl6ZU1lZGlhKTtcbiAgICBzb2NrZXQub24oJ0Zyb20gU2VydmVyOiBTZW5kIG1lZGlhIHBsYXllciBzdGF0ZXMnLCB0aGlzLnNlbmRNZWRpYVBsYXllclN0YXRlcyk7XG4gICAgc29ja2V0Lm9uKCdGcm9tIFNlcnZlcjogR2V0IGVsYXBzZWQgdGltZSBmb3Igc3BlY2lmaWMgY2xpZW50JywgdGhpcy5nZXRFbGFwc2VkVGltZUZvclNwZWNpZmljQ2xpZW50KTtcbiAgICBzb2NrZXQub24oJ0Zyb20gU2VydmVyOiBMb2FkIG1lZGlhIGVudHJ5JywgdGhpcy5sb2FkTWVkaWEpO1xuICAgIHNvY2tldC5vbignRnJvbSBTZXJ2ZXI6IFBsYXkgbWVkaWEnLCB0aGlzLnBsYXlNZWRpYSk7XG4gICAgc29ja2V0Lm9uKCdGcm9tIFNlcnZlcjogUGF1c2UgbWVkaWEnLCB0aGlzLnBhdXNlTWVkaWEpO1xuICAgIHNvY2tldC5vbignRnJvbSBTZXJ2ZXI6IENoYW5nZSBtZWRpYSBwbGF5ZXIgdG8gbm9uZScsIHRoaXMuY2hhbmdlTWVkaWFQbGF5ZXJUb05vbmUpO1xuICB9LFxuXG4gIC8vIEVWRU5UIEhBTkRMRVI6IEluaXRpYWxpemVzIHRoZSBtZWRpYSB3aXRoIHdpdGggdGhlIGRhdGEgc2VudCBmcm9tIHRoZSBzZXJ2ZXJcbiAgaW5pdGlhbGl6ZU1lZGlhOiBmdW5jdGlvbihtZWRpYURhdGEpIHtcbiAgICBjb25zb2xlLmxvZyhcIkluaXRpYWxpemluZyBNZWRpYVwiKTtcblxuICAgIHRoaXMuc2V0U3RhdGUoe21lZGlhVHlwZTogbWVkaWFEYXRhLm1lZGlhVHlwZX0sIGZ1bmN0aW9uKCkge1xuICAgICAgaW5pdGlhbGl6ZVlvdXR1YmVJRnJhbWUobWVkaWFEYXRhKTtcbiAgICAgIFxuICAgICAgLy8gVE9ETzogSW5pdGlhbGl6ZSBTb3VuZGNsb3VkXG4gICAgICAvLyBpbml0aWFsaXplU291bmRjbG91ZFBsYXllcihtZWRpYURhdGEpOyAgXG5cbiAgICAgIC8vIFRPRE86IEluaXRpYWxpemUgVmltZW9cbiAgICAgIC8vIGluaXRpYWxpemVWaW1lb1BsYXllcihtZWRpYURhdGEpOyAgXG4gICAgfSk7XG4gIH0sXG5cbiAgLy8gRVZFTlQgSEFORExFUjogU2VuZHMgdGhlIHN0YXRlIG9mIHRoZSBtZWRpYSBwbGF5ZXJzXG4gIHNlbmRNZWRpYVBsYXllclN0YXRlczogZnVuY3Rpb24obWVkaWFEYXRhKSB7XG4gICAgY29uc29sZS5sb2coXCJzZW5kTWVkaWFQbGF5ZXJTdGF0ZVwiKTtcbiAgICB0aGlzLnNldFN0YXRlKHtsb2NhbFN0YXRlOiBNRURJQVBMQUNFSE9MREVSU1RBVEVTLkFDVElWRX0pO1xuICAgIHRoaXMuc2V0U3RhdGUoe21lZGlhU3RhdGU6IG1lZGlhRGF0YS5zdGF0ZX0sIGZ1bmN0aW9uKCkge1xuICAgICAgc3dpdGNoKHRoaXMuc3RhdGUubWVkaWFTdGF0ZSkge1xuICAgICAgICBjYXNlIE1FRElBUExBWUVSU1RBVEVTLlBMQVlJTkc6XG4gICAgICAgICAgcGxheU1lZGlhQnlNZWRpYVR5cGUobWVkaWFEYXRhKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBNRURJQVBMQVlFUlNUQVRFUy5QQVVTRUQ6XG4gICAgICAgICAgcGF1c2VNZWRpYUJ5TWVkaWFUeXBlKG1lZGlhRGF0YSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgTUVESUFQTEFZRVJTVEFURVMuTk9ORTpcbiAgICAgICAgICAvLyBFTVBUWVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIC8vIEVSUk9SXG4gICAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUjogTm8gbWVkaWEgc3RhdGVcIik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgLy8gRVZFTlQgSEFORExFUjogV2hlbiBhIGNsaWVudCByZXF1ZXN0cyB0aGUgdGltZSwgZ2V0cyBhbGwgdGhlIGVsYXBzZWQgdGltZXMgb2YgZXZlcnkgb3RoZXIgY2xpZW50IGFuZCBzZW5kcyBpdCBiYWNrIHRvIHRoZSBvcmlnaW5hbCBjbGllbnQuXG4gIGdldEVsYXBzZWRUaW1lRm9yU3BlY2lmaWNDbGllbnQ6IGZ1bmN0aW9uKGNsaWVudElkKSB7XG4gICAgdmFyIG1lZGlhQ3VycmVudFRpbWVFbGFwc2VkID0geW91dHViZUdldEN1cnJlbnRUaW1lKCk7XG5cbiAgICBzb2NrZXQuZW1pdCgnRnJvbSBDbGllbnQ6IFNlbmQgZWxhcHNlZCB0aW1lIHRvIHNwZWNpZmljIGNsaWVudCcsIHtcbiAgICAgIGNsaWVudElkOiBjbGllbnRJZCxcbiAgICAgIGNsaWVudEN1cnJlbnRUaW1lOiBtZWRpYUN1cnJlbnRUaW1lRWxhcHNlZCxcbiAgICB9KTtcbiAgfSxcblxuICAvLyBFVkVOVCBIQU5ETEVSOiBMb2FkcyB0aGUgc3BlY2lmaWVkIG1lZGlhIHBsYXllclxuICBsb2FkTWVkaWE6IGZ1bmN0aW9uKG1lZGlhRGF0YSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe21lZGlhVHlwZTogbWVkaWFEYXRhLm1lZGlhVHlwZX0sIGZ1bmN0aW9uKCkge1xuICAgICAgc3dpdGNoKHRoaXMuc3RhdGUubWVkaWFUeXBlKSB7XG4gICAgICAgIGNhc2UgTUVESUFUWVBFUy5ZT1VUVUJFOlxuICAgICAgICAgIHlvdXR1YmVMb2FkVmlkZW8obWVkaWFEYXRhKTtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtsb2NhbFN0YXRlOiBNRURJQVBMQUNFSE9MREVSU1RBVEVTLkFDVElWRX0pO1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiWW91dHViZSBQbGF5ZXIgc3VjY2Vzc2Z1bHkgbG9hZGVkOiBsb2FkTWVkaWE6XCIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIE1FRElBVFlQRVMuU09VTkRDTE9VRDpcbiAgICAgICAgICAvLyBUT0RPOiBMb2FkIFNvdW5kY2xvdWRcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBNRURJQVRZUEVTLlZJTUVPOlxuICAgICAgICAgIC8vIFRPRE86IExvYWQgVmltZW9cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBNRURJQVRZUEVTLk5PTkU6XG4gICAgICAgICAgLy8gVE9ETzogUmVtb3ZlIHRoZSBwbGF5ZXJzXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgLy8gRVJST1JcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SOiBObyBtZWRpYSB0eXBlXCIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIC8vIEVWRU5UIEhBTkRMRVI6IFBsYXlzIG1lZGlhIHdpdGggZ2l2ZW4gdHlwZVxuICBwbGF5TWVkaWE6IGZ1bmN0aW9uKG1lZGlhRGF0YSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe21lZGlhU3RhdGU6IE1FRElBUExBWUVSU1RBVEVTLlBMQVlJTkd9LCBmdW5jdGlvbigpIHtcbiAgICAgIHBsYXlNZWRpYUJ5TWVkaWFUeXBlKG1lZGlhRGF0YSk7XG4gICAgICBjb25zb2xlLmxvZygnTWVkaWEgaXMgTm93IFBsYXlpbmcnKTtcbiAgICB9KTtcbiAgfSxcblxuICAvLyBFVkVOVCBIQU5ETEVSOiBQYXVzZXMgbWVkaWEgd2l0aCBnaXZlbiB0eXBlXG4gIHBhdXNlTWVkaWE6IGZ1bmN0aW9uKG1lZGlhRGF0YSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe21lZGlhU3RhdGU6IE1FRElBUExBWUVSU1RBVEVTLlBBVVNFRH0sIGZ1bmN0aW9uKCkge1xuICAgICAgcGF1c2VNZWRpYUJ5TWVkaWFUeXBlKG1lZGlhRGF0YSk7XG4gICAgICBjb25zb2xlLmxvZygnTWVkaWEgaXMgTm93IFBhdXNlZCcpO1xuICAgIH0pO1xuICB9LFxuXG4gIC8vIEVWRU5UIEhBTkRMRVI6IFdoZW4gbWVkaWEgcGxheWVyIGhhcyBlbmRlZFxuICBjaGFuZ2VNZWRpYVBsYXllclRvTm9uZTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7bG9jYWxTdGF0ZTogTUVESUFQTEFDRUhPTERFUlNUQVRFUy5OT05FfSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7bWVkaWFTdGF0ZTogTUVESUFQTEFZRVJTVEFURVMuTk9ORX0sIGZ1bmN0aW9uKCkge1xuICAgICAgcmVzZXRZb3V0dWJlT2JqKCk7XG4gICAgICBjb25zb2xlLmxvZyhcIkVORElORzogTWVkaWEgcGxheWVyXCIpO1xuICAgIH0pO1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgLy8gTWVkaWEgcGxheWVyIGlzIGxvYWRlZCBvbnRvIHRoZSBtZWRpYS1wbGF5ZXIgZGl2XG4gICAgdmFyIHZpZGVvUGxhY2Vob2xkZXIgPSBbXTtcblxuICAgIC8vIERpc3BsYXlzIHJlc3BlY3RpdmUgcGxhY2Vob2xkZXIgSUYgdGhlIGxvY2FsIHN0YXRlIGlzIG5vdCAnYWN0aXZlJ1xuICAgIC8vIFRPRE86IENvbnNpZGVyIHVzaW5nIE1FRElBUExBWUVSU1RBVEVTIGluc3RlYWRcbiAgICBzd2l0Y2ggKHRoaXMuc3RhdGUubG9jYWxTdGF0ZSkge1xuICAgICAgY2FzZSBNRURJQVBMQUNFSE9MREVSU1RBVEVTLkFDVElWRTpcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIE1FRElBUExBQ0VIT0xERVJTVEFURVMuTk9ORTpcbiAgICAgICAgdmlkZW9QbGFjZWhvbGRlci5wdXNoKFxuICAgICAgICAgIDxWaWRlb1BsYWNlaG9sZGVyIGtleT17J1ZpZGVvUGxhY2Vob2xkZXInfSAvPlxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgTUVESUFQTEFDRUhPTERFUlNUQVRFUy5SRUFEWTpcbiAgICAgICAgdmlkZW9QbGFjZWhvbGRlci5wdXNoKFxuICAgICAgICAgIDxWaWRlb1JlYWR5IGtleT17J1ZpZGVvUmVhZHknfSAvPlxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgTUVESUFQTEFDRUhPTERFUlNUQVRFUy5MT0FESU5HOlxuICAgICAgICB2aWRlb1BsYWNlaG9sZGVyLnB1c2goXG4gICAgICAgICAgPFZpZGVvTG9hZGluZyBrZXk9eydWaWRlb0xvYWRpbmcnfSAvPlxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgTUVESUFQTEFDRUhPTERFUlNUQVRFUy5TWU5DSU5HOlxuICAgICAgICB2aWRlb1BsYWNlaG9sZGVyLnB1c2goXG4gICAgICAgICAgPFZpZGVvU3luY2luZyBrZXk9eydWaWRlb1N5bmNpbmcnfSAvPlxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIEVSUk9SXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRVJST1I6IE5vIE1FRElBUExBQ0VIT0xERVJTVEFURVMgZGVmaW5lZFwiKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYXllclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxheWVyLXZpZGVvLWVtYmVkXCI+XG4gICAgICAgICAgICB7dmlkZW9QbGFjZWhvbGRlcn1cbiAgICAgICAgICAgIDxkaXYgaWQ9J21lZGlhLXBsYXllcicgY2xhc3NOYW1lPSdqcy1wbHlyJyBkYXRhLXR5cGU9XCJ5b3V0dWJlXCI+PC9kaXY+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIC8vIFRPRE86IEdldCB0aGUgU3RhdHVzIGJhciB3b3JraW5nXG5cbiAgICAgICAgICAgICAgLy8gPGRpdiBpZD0nc3RhdHVzLWJhcic+XG4gICAgICAgICAgICAgIC8vICAgPFN0YXR1c0JhciAvPlxuICAgICAgICAgICAgICAvLyA8L2Rpdj5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBNZWRpYVBsYXllcjsiLCIvKiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBDb3B5cmlnaHQgwqkgXG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyogID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgVklFVzogTW9kYWxDcmVhdGVQbGF5bGlzdC5qc3hcblxuICAgIFRoZSBjb21wb25lbnQgZm9yIHdoZW4gdGhlIE1vZGFsIHBvcHMgdXAgZm9yIGNyZWF0aW5nIGEgbmV3IHBsYXlsaXN0XG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyogID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgQENvbXBvbmVudHM6ICAgIFRvZ2dsZUljb25cbiAgICAgICAgICAgICAgICAgICAgTW9kYWxDcmVhdGVQbGF5bGlzdFxuXG4gICAgQEV4cG9ydHM6ICAgICAgIE1vZGFsQ3JlYXRlUGxheWxpc3RcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxuLy8gRmx1eCBBY3Rpb25cbnZhciBwbGF5bGlzdEFjdGlvbnMgPSByZXF1aXJlKCcuLi9mbHV4L2FjdGlvbnMvYWN0aW9ucycpO1xuXG4vLyBUaGUgaWNvbiB3aGljaCB0ZWxscyB0aGUgdXNlciBpZiB0aGUgbmV3IHBsYXlsaXN0IHdvdWxkIGJlIGVpdGhlciBwdWJsaWMgb3IgcHJpdmF0ZVxudmFyIFRvZ2dsZUljb24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgLy8gVG9nZ2xlcyB0aGUgaWNvbiB0byB0aGUgZ2xvYmUgb3IgbG9jayBkZXBlbmRpbmcgb24gaWYgdGhlIG5ldyBwbGF5bGlzdCB3b3VsZCBiZSBwdWJsaWMgb3IgcHJpdmF0ZVxuICAgIHZhciB0b2dnbGVDbGFzcztcbiAgICBpZiAodGhpcy5wcm9wcy5pc1B1YmxpYyA9PT0gdHJ1ZSkge1xuICAgICAgdG9nZ2xlQ2xhc3MgPSBcImZhIGZhLWdsb2JlXCI7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdG9nZ2xlQ2xhc3MgPSBcImZhIGZhLWxvY2tcIjtcbiAgICB9IFxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9nZ2xlLXNsaWRlci1zZWN0aW9uXCI+XG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJzd2l0Y2hcIj5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJjcmVhdGUtcGxheWxpc3QtdG9nZ2xlXCIgb25DaGFuZ2U9e3RoaXMucHJvcHMub25DaGFuZ2V9IC8+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbGlkZXJcIj48L2Rpdj5cbiAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPGkgY2xhc3NOYW1lPXt0b2dnbGVDbGFzc30gaWQ9XCJjcmVhdGUtcGxheWxpc3QtdG9nZ2xlLWljb25cIj48L2k+XG4gICAgICA8L2Rpdj4gXG4gICAgKTtcbiAgfVxufSk7XG5cbi8vIE1BSU4gQ09NUE9ORU5UOiBDcmVhdGUgTmV3IFBsYXlsaXN0IE1vZGFsIFBvcHVwXG52YXIgTW9kYWxDcmVhdGVQbGF5bGlzdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcGxheWxpc3ROYW1lSW5wdXQ6IFwiXCIsXG4gICAgICBpc1B1YmxpYzogdHJ1ZVxuICAgIH1cbiAgfSxcblxuICBvbkNoYW5nZVBsYXlsaXN0TmFtZTogZnVuY3Rpb24oZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBwbGF5bGlzdE5hbWVJbnB1dDogZS50YXJnZXQudmFsdWUgfSk7XG4gIH0sXG5cbiAgb25DaGFuZ2VJc1B1YmxpYzogZnVuY3Rpb24oZSkge1xuICAgIC8vIFRoZSBwbGF5bGlzdCBpcyBwdWJsaWMgd2hlbiB0aGUgdGFyZ2V0IGlzIG5vdCBjaGVja2VkXG4gICAgY29uc29sZS5sb2codGhpcy5zdGF0ZS5pc1B1YmxpYyk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGlzUHVibGljOiAhZS50YXJnZXQuY2hlY2tlZCB9KTtcbiAgfSxcblxuICBvblN1Ym1pdDogZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfSxcblxuICBhZGRUb1BsYXlsaXN0OiBmdW5jdGlvbihlKSB7XG4gICAgY29uc29sZS5sb2coXCJNb2RhbDogQWRkIHRvIG5ldyBQbGF5bGlzdFwiKTtcbiAgICB2YXIgZGF0YTtcbiAgICBpZiAodGhpcy5wcm9wcy5kYXRhID09PSBudWxsIHx8IHRoaXMucHJvcHMuZGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBkYXRhID0ge1xuICAgICAgICBuYW1lOiB0aGlzLnN0YXRlLnBsYXlsaXN0TmFtZUlucHV0LFxuICAgICAgICBvd25lcjogdGhpcy5wcm9wcy51c2VyLmxvY2FsLmVtYWlsLFxuICAgICAgICBpc1B1YmxpYzogdGhpcy5zdGF0ZS5pc1B1YmxpYyxcbiAgICAgICAgbWVkaWFFbnRyeTogbnVsbFxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGRhdGEgPSB7XG4gICAgICAgIG5hbWU6IHRoaXMuc3RhdGUucGxheWxpc3ROYW1lSW5wdXQsXG4gICAgICAgIG93bmVyOiB0aGlzLnByb3BzLnVzZXIubG9jYWwuZW1haWwsXG4gICAgICAgIGlzUHVibGljOiB0aGlzLnN0YXRlLmlzUHVibGljLFxuICAgICAgICBtZWRpYUVudHJ5OiB7XG4gICAgICAgICAgYXJ0aXN0OiB0aGlzLnByb3BzLmRhdGEuYXJ0aXN0LFxuICAgICAgICAgIG1lZGlhSWQ6IHRoaXMucHJvcHMuZGF0YS5tZWRpYUlkLFxuICAgICAgICAgIG1lZGlhVHlwZTogdGhpcy5wcm9wcy5kYXRhLm1lZGlhVHlwZSxcbiAgICAgICAgICB0aHVtYm5haWw6IHRoaXMucHJvcHMuZGF0YS50aHVtYm5haWwsXG4gICAgICAgICAgdGl0bGU6IHRoaXMucHJvcHMuZGF0YS50aXRsZSxcbiAgICAgICAgICAvLyBUT0RPOiBUaGUgc2VhcmNoIGVudHJ5IGRvZXMgbm90IGhhdmUgdGhlIHNhbWUgZGIgX2lkLiBOZWVkIHRvIGZpbmQgYSB3YXkgdG8gYWRkIG1lZGlhIGVudHJpZXMgd2l0aG91dCBkdXBsaWNhdGVzXG4gICAgICAgICAgLy8gX2lkOiB0aGlzLnByb3BzLmRhdGEuX2lkXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IFxuXG4gICAgJC5hamF4KHtcbiAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgdXJsOiBcIi9wbGF5bGlzdC9jcmVhdGVcIixcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICBjYWNoZTogZmFsc2UsXG4gICAgICBkYXRhOiB7ZGF0YTogSlNPTi5zdHJpbmdpZnkoZGF0YSl9LFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24obmV3UGxheWxpc3QpIHtcbiAgICAgICAgY29uc29sZS5sb2cobmV3UGxheWxpc3QpO1xuICAgICAgICBwbGF5bGlzdEFjdGlvbnMuY3JlYXRlUGxheWxpc3QobmV3UGxheWxpc3QuY3JlYXRlZFBsYXlsaXN0KTsgXG4gICAgICB9LmJpbmQodGhpcyksXG4gICAgICBlcnJvcjogZnVuY3Rpb24oeGhyLCBzdGF0dXMsIGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRVJST1I6IENyZWF0ZSBQbGF5bGlzdCBlcnJvcmVkIG91dFwiLCBzdGF0dXMsIGVyci50b1N0cmluZygpKTtcbiAgICAgIH0uYmluZCh0aGlzKVxuICAgIH0pO1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIG1vZGFsSWQ7XG4gICAgdmFyIHRvZ2dsZUljb25HbG9iZU9yTG9jayA9IFtdO1xuXG4gICAgLy8gSWYgdGhlIG1vZGFsIGlzIGNsaWNrZWQgZnJvbSB0aGUgY3JlYXRlIG5ldyBwbGF5bGlzdCBidXR0b24gdW5kZXIgbXlQbGF5bGlzdFxuICAgIGlmICh0aGlzLnByb3BzLnBvcyA9PT0gbnVsbCB8fCB0aGlzLnByb3BzLnBvcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBtb2RhbElkID0gXCJjcmVhdGUtcGxheWxpc3RcIjtcbiAgICB9XG4gICAgLy8gV0hlbiB0aGUgbW9kYWwgaXMgY2xpY2tlZCBmcm9tIGEgbWVkaWEgZW50cnlcbiAgICBlbHNlIHtcbiAgICAgIG1vZGFsSWQgPSBcImNyZWF0ZS1wbGF5bGlzdC1cIiArIHRoaXMucHJvcHMucG9zOyAgXG4gICAgfVxuICAgIFxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsIGZhZGVcIiBpZD17bW9kYWxJZH0gdGFiSW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIiBhcmlhLWxhYmVsbGVkYnk9XCJteU1vZGFsTGFiZWxcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1kaWFsb2cgbW9kYWwtc21cIiByb2xlPVwiZG9jdW1lbnRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtaGVhZGVyXCI+XG4gICAgICAgICAgICAgIENyZWF0ZSBhIE5ldyBQbGF5bGlzdFxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWJvZHlcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2gtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgPGZvcm0gY2xhc3NOYW1lPVwic2VhcmNoLWlucHV0XCIgaWQ9XCJjcmVhdGUtcGxheWxpc3QtaW5wdXRcIiBvblN1Ym1pdD17dGhpcy5vblN1Ym1pdH0+XG4gICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwiaW5wdXQtcGFkZGluZ1wiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJQbGF5bGlzdCBOYW1lXCIgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2VQbGF5bGlzdE5hbWV9IC8+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWxhYmVsXCI+SXMgdGhpcyBhIHByaXZhdGUgcGxheWxpc3Q/PC9kaXY+XG4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgey8qIFRvZ2dsZSBJY29uIGNvbXBvbmVudCAqL30gXG4gICAgICAgICAgICAgICAgICA8VG9nZ2xlSWNvbiBpc1B1YmxpYz17dGhpcy5zdGF0ZS5pc1B1YmxpY30gb25DaGFuZ2U9e3RoaXMub25DaGFuZ2VJc1B1YmxpY30gLz5cbiAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWZvb3RlclwiPlxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXNlY29uZGFyeVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+Q2FuY2VsPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgb25DbGljaz17dGhpcy5hZGRUb1BsYXlsaXN0fT5DcmVhdGUgUGxheWxpc3Q8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG4vLyBSZXF1aXJlZCB0byBjYWxsIG1vZGFsIGZyb20gb3RoZXIgY29tcG9uZW50c1xubW9kdWxlLmV4cG9ydHMgPSBNb2RhbENyZWF0ZVBsYXlsaXN0OyIsIi8qICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIENvcHlyaWdodCDCqSBcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBWSUVXOiBNeVBsYXlsaXN0cy5qc3hcblxuICAgIENvbnRhaW5zIGFsbCBvZiB0aGUgY3VycmVudCB1c2VyJ3MgcHJpdmF0ZSBhbmQgcHVibGljIHBsYXlsaXN0cy4gQWxzbyBjb250YWlucyBcbiAgICBhbGwgdGhlIHBsYXlsaXN0cyB0aGF0IHRoZSB1c2VyIGxpa2VkLlxuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIEBDb21wb25lbnRzOiAgICBNeVBsYXlsaXN0UGxhY2Vob2xkZXJcbiAgICAgICAgICAgICAgICAgICAgU2VhcmNoTXlQbGF5bGlzdFxuICAgICAgICAgICAgICAgICAgICBNeVBsYXlsaXN0c1xuXG4gICAgQEV4cG9ydHM6ICAgICAgIE15UGxheWxpc3RzXG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgUGxheWxpc3RFbnRyeSA9IHJlcXVpcmUoJy4vUGxheWxpc3RFbnRyeS5qc3gnKTtcblxuLy8gUGxhY2Vob2xkZXIgaWYgdGhlcmUgYXJlIG5vIHBsYXlsaXN0cyBjcmVhdGVkIG9yIGxpa2VkXG52YXIgTXlQbGF5bGlzdFBsYWNlaG9sZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1wYWRkaW5nXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxhY2Vob2xkZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYWNlaG9sZGVyLWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWJvb2sgcGxhY2Vob2xkZXItaWNvblwiPjwvaT48YnIvPlxuICAgICAgICAgICAgPHNwYW4+WW91IGhhdmUgbm8gc2F2ZWQgcGxheWxpc3RzPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG4vLyBTZWFyY2ggQmFyIHRvIHNlYXJjaCBNeSBQbGF5bGlzdHNcbnZhciBTZWFyY2hNeVBsYXlsaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaC1jb250YWluZXJcIj5cbiAgICAgICAgPGZvcm0gY2xhc3NOYW1lPVwic2VhcmNoLWlucHV0XCI+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwiY2hhdC10ZXh0Ym94XCIgbmFtZT1cIlwiIHBsYWNlaG9sZGVyPVwiU2VhcmNoIFByaXZhdGUgUGxheWxpc3RzLi4uXCIvPlxuICAgICAgICA8L2Zvcm0+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxuLy8gQ3JlYXRlIE5ldyBQbGF5bGlzdCBCdXR0b25cbnZhciBOZXdQbGF5bGlzdEJ1dHRvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2gtY29udGFpbmVyIGJ0bi1hbGlnbi1yaWdodFwiPlxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXRhcmdldD1cIiNjcmVhdGUtcGxheWxpc3RcIj48aSBjbGFzc05hbWU9XCJmYSBmYS1wbHVzIGljb24tcGFkZGluZ1wiPjwvaT5DcmVhdGUgTmV3IFBsYXlsaXN0PC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxuLy8gTUFJTiBDT01QT05FTlQ6IE15IFBsYXlsaXN0IFRhYlxudmFyIE15UGxheWxpc3RzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBwbGF5bGlzdEVudHJpZXMgPSBbXTtcblxuICAgIC8vIElmIHRoZXJlIGFyZSBubyBwbGF5bGlzdHMsIHRoZSBwbGFjZWhvbGRlciBpcyBkaXNwbGF5ZWRcbiAgICBpZiAodGhpcy5wcm9wcy5teVBsYXlsaXN0cyA9PT0gdW5kZWZpbmVkIHx8IHRoaXMucHJvcHMubXlQbGF5bGlzdHMgPT09IG51bGwgfHwgdGhpcy5wcm9wcy5teVBsYXlsaXN0cy5sZW5ndGggPD0gMCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8TXlQbGF5bGlzdFBsYWNlaG9sZGVyIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGVyZSBhcmUgcGxheWxpc3RzLCBwdXNoZXMgZXZlcnkgcGxheWxpc3QgaW50byB0aGUgdGFiXG4gICAgZWxzZSB7XG4gICAgICAvLyBBZGRzIHRoZSBzZWFyY2ggYmFyIGZvciB0aGUgcGxheWxpc3RcbiAgICAgIHBsYXlsaXN0RW50cmllcy5wdXNoKFxuICAgICAgICA8U2VhcmNoTXlQbGF5bGlzdCBrZXk9eydTZWFyY2hNeVBsYXlsaXN0J30gLz5cbiAgICAgIClcblxuICAgICAgLy8gRXZlcnkgcGxheWxpc3QgZW50cnkgaW4gTXlQbGF5bGlzdFxuICAgICAgdmFyIHBsYXlsaXN0RW50cnk7XG4gICAgICB2YXIgcGxheWxpc3RUaHVtYm5haWw7XG4gICAgICB2YXIgcGxheWxpc3RTaXplO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnByb3BzLm15UGxheWxpc3RzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHBsYXlsaXN0RW50cnkgPSB0aGlzLnByb3BzLm15UGxheWxpc3RzW2ldO1xuICAgICAgICAvLyBJZiB0aGUgcGxheWxpc3QgZW50cnkgaGFzIG5vIG1lZGlhIGVudHJpZXNcbiAgICAgICAgLy8gVE9ETzogQWRkIGEgdGh1bWJuaWFsIHBsYWNlaG9sZGVyIGZvciBwbGF5bGlzdCBlbnRyaWVzIHRoYXQgaGF2ZSBubyBtZWRpYSBlbnRyaWVzXG4gICAgICAgIGlmIChwbGF5bGlzdEVudHJ5Lm1lZGlhRW50cmllc1swXSA9PT0gbnVsbCB8fCBwbGF5bGlzdEVudHJ5Lm1lZGlhRW50cmllc1swXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcGxheWxpc3RUaHVtYm5haWwgPSBcIlwiO1xuICAgICAgICAgIHBsYXlsaXN0U2l6ZSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhlcmUgYXJlIG1lZGlhIGVudHJpZXMgaW4gdGhlIHBsYXlsaXN0IGVudHJ5XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHBsYXlsaXN0VGh1bWJuYWlsID0gcGxheWxpc3RFbnRyeS5tZWRpYUVudHJpZXNbMF0udGh1bWJuYWlsO1xuICAgICAgICAgIHBsYXlsaXN0U2l6ZSA9IHBsYXlsaXN0RW50cnkubWVkaWFFbnRyaWVzLmxlbmd0aDsgIFxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBwbGF5bGlzdEVudHJpZXMucHVzaCAoXG4gICAgICAgICAgLy8gVE9ETzogb3duZXIsIGxpa2VkXG4gICAgICAgICAgPFBsYXlsaXN0RW50cnlcbiAgICAgICAgICAgIGtleT17cGxheWxpc3RFbnRyeS5faWR9XG4gICAgICAgICAgICBfaWQ9e3BsYXlsaXN0RW50cnkuX2lkfVxuICAgICAgICAgICAgcG9zPXtpfVxuICAgICAgICAgICAgb3duZXI9e3RydWV9XG4gICAgICAgICAgICB0aXRsZT17cGxheWxpc3RFbnRyeS5uYW1lfVxuICAgICAgICAgICAgdGh1bWJuYWlsPXtwbGF5bGlzdFRodW1ibmFpbH1cbiAgICAgICAgICAgIGN1cmF0b3I9e3BsYXlsaXN0RW50cnkub3duZXJ9XG4gICAgICAgICAgICBzaXplPXtwbGF5bGlzdFNpemV9XG4gICAgICAgICAgICB0eXBlPXtwbGF5bGlzdEVudHJ5LmlzUHVibGljfVxuICAgICAgICAgICAgbGlrZXM9e3BsYXlsaXN0RW50cnkubGlrZXN9XG4gICAgICAgICAgICBsaWtlZD17bnVsbH0gXG4gICAgICAgICAgICBtZWRpYUVudHJpZXM9e3BsYXlsaXN0RW50cnkubWVkaWFFbnRyaWVzfSBcbiAgICAgICAgICAgIGhvbWU9e3RoaXMucHJvcHMuaG9tZX0gLz5cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPE5ld1BsYXlsaXN0QnV0dG9uIC8+XG4gICAgICAgIHtwbGF5bGlzdEVudHJpZXN9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBNeVBsYXlsaXN0czsiLCIvKiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBDb3B5cmlnaHQgwqkgXG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyogID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgVklFVzogUGxheWxpc3RFbnRyeS5qc3hcblxuICAgIFRoZSBpbmRpdmlkdWFsIGVudHJ5IG9mIGEgcGxheWxpc3RcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBAQ29tcG9uZW50czogICAgUGxheWxpc3RJY29uXG4gICAgICAgICAgICAgICAgICAgIFBsYXlsaXN0RW50cnlcblxuICAgIEBFeHBvcnRzOiAgICAgICBQbGF5bGlzdEVudHJ5XG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBwbGF5bGlzdEFjdGlvbnMgPSByZXF1aXJlKCcuLi9mbHV4L2FjdGlvbnMvYWN0aW9ucycpO1xuXG4vLyBJY29uIGRpc3BsYXllZCBkZXBlbmRzIG9uIHdoZXRoZXIgcGxheWxpc3QgaXMgcHVibGljLCBwcml2YXRlLCBvciBub3Qgb3duZXJcbnZhciBQbGF5bGlzdEljb24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLnByb3BzLm93bmVyID09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYXlsaXN0LWljb25cIj5cbiAgICAgICAgICA8YSBjbGFzc05hbWU9XCJpY29uLWJ0biBsaWtlLWJ0blwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIj5cbiAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWhlYXJ0LW9cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMucHJvcHMub3duZXIgPT0gdHJ1ZSAmJiB0aGlzLnByb3BzLnR5cGUgPT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxheWxpc3QtaWNvblwiPlxuICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWxvY2tcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYXlsaXN0LWljb25cIj5cbiAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1nbG9iZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH07XG4gIH1cbn0pO1xuXG4vLyBNQUlOIENPTVBPTkVOVDogRWFjaCBpbmRpdmlkdWFsIHBsYXlsaXN0IGNhcmRcbnZhciBQbGF5bGlzdEVudHJ5ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIC8vIEVWRU5UIEhBTkRMRVI6IEFkZHMgdGhlIHBsYXlsaXN0IGludG8gdGhlIHF1ZXVlXG4gIHBsYXlQbGF5bGlzdDogZnVuY3Rpb24oKSB7XG4gICAgLy8gRG8gbm90IGFsbG93IHRoZSB1c2VyIHRvIGNsaWNrIG9uIHRoZSBwbGF5bGlzdFxuICAgIGlmICh0aGlzLnByb3BzLmhvbWUgPT09IHRydWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc29sZS5sb2coXCJQbGF5aW5nIHBsYXlsaXN0OiBcIiArIHRoaXMucHJvcHMudGl0bGUgKyBcIiBieSBcIiArIHRoaXMucHJvcHMuY3VyYXRvcik7XG4gICAgLy8gSWYgdGhlcmUgYXJlIG5vIG1lZGlhIGVudHJpZXMsIGRvIG5vdGhpbmdcbiAgICBpZiAodGhpcy5wcm9wcy5zaXplID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHNvY2tldC5lbWl0KCdGcm9tIENsaWVudDogVXBkYXRlIHF1ZXVlIHdpdGggbmV3IGxpc3QnLCB0aGlzLnByb3BzLm1lZGlhRW50cmllcyk7XG4gIH0sXG5cbiAgLy8gRVZFTlQgSEFORExFUjogT3BlbnMgdGhlIHBsYXlsaXN0J3MgcGFnZVxuICBnb1RvUGxheWxpc3RQYWdlOiBmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnByb3BzLm1lZGlhRW50cmllcyk7XG4gICAgY29uc29sZS5sb2coXCJHb2luZyB0byBwbGF5bGlzdCBwYWdlOiBcIiArIHRoaXMucHJvcHMudGl0bGUgKyBcIiBJbmRleDogXCIgKyB0aGlzLnByb3BzLnBvcyk7XG4gICAgcGxheWxpc3RBY3Rpb25zLmRpc3BsYXlQbGF5bGlzdCh0aGlzLnByb3BzLl9pZCwgdGhpcy5wcm9wcy5wb3MsIHRoaXMucHJvcHMubWVkaWFFbnRyaWVzKTsgXG5cbiAgICAvLyBUT0RPOiBJZiBjdXJyZW50bHkgbW9iaWxlLCBzaG93IHRoZSBtb2JpbGUgdGFiIGluc3RlYWRcbiAgICAvLyBPcGVuIHNlbGVjdGVkIHBsYXlsaXN0IG93bmVkIGJ5IGN1cnJlbnQgdXNlclxuICAgIGlmICh0aGlzLnByb3BzLm93bmVyKSB7XG4gICAgICAkKCcjdGFiLWVkaXQtcGxheWxpc3QnKS50YWIoJ3Nob3cnKTtcbiAgICB9XG4gICAgLy8gT3BlbiBzZWxlY3RlZCBsaWtlZCBwbGF5bGlzdFxuICAgIGVsc2Uge1xuICAgICAgJCgnI3RhYi12aWV3LXBsYXlsaXN0JykudGFiKCdzaG93Jyk7IFxuICAgIH0gICBcbiAgICAvLyBUT0RPOiBGb3IgdGhlIEJhY2sgYnV0dG9uICAgICAgXG4gICAgLy8gVGhlIGJhY2sgYnV0dG9uIHNob3VsZCBoYXZlIGEgc3RhY2sgbGlrZSBpbXBsZW1lbnRhdGlvbiwgZWFjaCBlbGVtZW50IGJlaW5nIHdoZXJlIHRoZSBwcmV2aW91cyB3YXMgZnJvbVxuICAgIC8vIHZhciBwbGF5bGlzdERhdGEgPSB7XG4gICAgLy8gICBwb3M6IHRoaXMucHJvcHMucG9zLFxuICAgIC8vICAgY2xpY2tlZEZyb206IFwiTVlQTEFZTElTVFwiXG4gICAgLy8gfVxuICAgIC8vIHBsYXlsaXN0QWN0aW9ucy5kaXNwbGF5UGxheWxpc3QocGxheWxpc3REYXRhKTtcbiAgfSxcblxuICAvLyBFVkVOVCBIQU5ETEVSOiBPcGVucyB0aGUgY3VyYXRvcidzIHBhZ2VcbiAgZ29Ub0N1cmF0b3JQYWdlOiBmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZyhcIkdvaW5nIHRvIGN1cmF0b3IgcGFnZTogXCIgKyB0aGlzLnByb3BzLmN1cmF0b3IpO1xuXG4gICAgLy8gVE9ETzogRm9yIHRoZSBCYWNrIGJ1dHRvblxuICAgIC8vIFRoZSBiYWNrIGJ1dHRvbiBzaG91bGQgaGF2ZSBhIHN0YWNrIGxpa2UgaW1wbGVtZW50YXRpb24sIGVhY2ggZWxlbWVudCBiZWluZyB3aGVyZSB0aGUgcHJldmlvdXMgd2FzIGZyb21cbiAgICAvLyB2YXIgY3VyYXRvckRhdGEgPSB7XG4gICAgLy8gICBwb3M6IHRoaXMucHJvcHMucG9zLFxuICAgIC8vICAgY2xpY2tlZEZyb206IFwiTVlQTEFZTElTVFwiXG4gICAgLy8gfVxuICAgIC8vIHBsYXlsaXN0QWN0aW9ucy5DdXJhdG9yKGN1cmF0b3JEYXRhKTtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIC8vIElmIG93bmVyLCBhcHBlbmQgdXNlci1wbGF5bGlzdCB0byBjbGFzc25hbWVcbiAgICB2YXIgcGxheWxpc3RDYXJkQ2xhc3NOYW1lID0gXCJwbGF5bGlzdC1jYXJkXCI7XG4gICAgaWYgKHRoaXMucHJvcHMub3duZXIgPT0gdHJ1ZSkge1xuICAgICAgcGxheWxpc3RDYXJkQ2xhc3NOYW1lICs9IFwiIHVzZXItcGxheWxpc3RcIjtcbiAgICB9O1xuXG4gICAgLy8gVE9ETzogVXBkYXRlIHBsYWNlaG9sZGVyIGZvciBlbXB0eSB0aHVtYm5haWxzXG4gICAgLy8gRm9yIGVtcHR5IFRodW1ibmFpbHNcbiAgICB2YXIgdGh1bWJuYWlsID0gdGhpcy5wcm9wcy50aHVtYm5haWw7XG4gICAgaWYgKHRodW1ibmFpbCA9PT0gXCJcIiB8fCB0aHVtYm5haWwgPT09IG51bGwgfHwgdGh1bWJuYWlsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRodW1ibmFpbCA9IFwiL2ltYWdlcy9tZWRpYS1pY29uLnBuZ1wiO1xuICAgIH1cblxuICAgIC8vIERvIG5vdCBhbGxvdyB0aGUgdXNlciB0byBjbGljayBvbiB0aGUgcGxheWxpc3RcbiAgICBpZiAodGhpcy5wcm9wcy5ob21lID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC0zIGNvbC1zbS00IGNvbC1wYWRkaW5nXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17cGxheWxpc3RDYXJkQ2xhc3NOYW1lfT5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGF5bGlzdC1pbWctY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJwbGF5bGlzdC1pbWdcIiBzcmM9e3RodW1ibmFpbH0gLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxheWxpc3QtdGV4dC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYXlsaXN0LXRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJwbGF5bGlzdC1saW5rIHBsYXlsaXN0LXRpdGxlLXRleHQgZWxsaXBzZXNcIiBkYXRhLXRvZ2dsZT1cInRhYlwiIGhyZWY9XCIjb3Blbi1wbGF5bGlzdFwiIG9uQ2xpY2s9e3RoaXMuZ29Ub1BsYXlsaXN0UGFnZX0+e3RoaXMucHJvcHMudGl0bGV9PC9hPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwaWxsXCIgZGF0YS10b2dnbGU9XCJ0b29sdGlwXCIgdGl0bGU9XCJJdGVtcyBpbiBQbGF5bGlzdFwiPnt0aGlzLnByb3BzLnNpemV9PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGF5bGlzdC1jdXJhdG9yXCI+PGEgY2xhc3NOYW1lPVwiY3VyYXRvci1saW5rXCIgZGF0YS10b2dnbGU9XCJ0YWJcIiBocmVmPVwiI2N1cmF0b3ItcGFnZVwiIG9uQ2xpY2s9e3RoaXMuZ29Ub0N1cmF0b3JQYWdlfT57dGhpcy5wcm9wcy5jdXJhdG9yfTwvYT48L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxheWxpc3QtaWNvbi1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8UGxheWxpc3RJY29uIG93bmVyPXt0aGlzLnByb3BzLm93bmVyfSB0eXBlPXt0aGlzLnByb3BzLnR5cGV9IGxpa2VkPXt0aGlzLnByb3BzLmxpa2VkfS8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtMyBjb2wtc20tNCBjb2wtcGFkZGluZ1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtwbGF5bGlzdENhcmRDbGFzc05hbWV9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGF5bGlzdC1pbWctY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgIDxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBvbkNsaWNrPXt0aGlzLnBsYXlQbGF5bGlzdH0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGF5bGlzdC1vdmVybGF5XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYXlsaXN0LW92ZXJsYXktY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYXlsaXN0LXBsYXktaWNvblwiPjxpIGNsYXNzTmFtZT1cImZhIGZhLXBsYXlcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIFBMQVkgQUxMXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICA8aW1nIGNsYXNzTmFtZT1cInBsYXlsaXN0LWltZ1wiIHNyYz17dGh1bWJuYWlsfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYXlsaXN0LXRleHQtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxheWxpc3QtdGl0bGVcIj5cbiAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJwbGF5bGlzdC1saW5rIHBsYXlsaXN0LXRpdGxlLXRleHQgZWxsaXBzZXNcIiBkYXRhLXRvZ2dsZT1cInRhYlwiIGhyZWY9XCIjb3Blbi1wbGF5bGlzdFwiIG9uQ2xpY2s9e3RoaXMuZ29Ub1BsYXlsaXN0UGFnZX0+e3RoaXMucHJvcHMudGl0bGV9PC9hPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGlsbFwiIGRhdGEtdG9nZ2xlPVwidG9vbHRpcFwiIHRpdGxlPVwiSXRlbXMgaW4gUGxheWxpc3RcIj57dGhpcy5wcm9wcy5zaXplfTwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGF5bGlzdC1jdXJhdG9yXCI+PGEgY2xhc3NOYW1lPVwiY3VyYXRvci1saW5rXCIgZGF0YS10b2dnbGU9XCJ0YWJcIiBocmVmPVwiI2N1cmF0b3ItcGFnZVwiIG9uQ2xpY2s9e3RoaXMuZ29Ub0N1cmF0b3JQYWdlfT57dGhpcy5wcm9wcy5jdXJhdG9yfTwvYT48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGF5bGlzdC1pY29uLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICA8UGxheWxpc3RJY29uIG93bmVyPXt0aGlzLnByb3BzLm93bmVyfSB0eXBlPXt0aGlzLnByb3BzLnR5cGV9IGxpa2VkPXt0aGlzLnByb3BzLmxpa2VkfS8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXlsaXN0RW50cnk7IiwiLyogID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgQ29weXJpZ2h0IMKpIFxuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIFBsYXlsaXN0VGFiLmpzeFxuXG4gICAgUGxheWxpc3QgVGFiLiBUaGlzIGNvbXBvbmVuZXQgaXMgdXNlZCB0byBkaXNwbGF5IHRoZSBNeSBQbGF5bGlzdCB0YWIuXG4gICAgVGhpcyBjb21wb25lbnQgd2lsbCBub3QgYXBwZWFyIGlmIHRoZXJlIGlzIG5vIHVzZXIgbG9nZ2VkIGluIGRvIHRvIGEgbm9uXG4gICAgbG9nZ2VkIGluIHVzZXIgbm90IGhhdmluZyBhbnkgcGxheWxpc3RzLiBPbmx5IHNob3dzIHRoZSB0YWIgaWYgdGhlIHVzZXIgaXMgbG9nZ2VkXG4gICAgaW5cbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBDb21wb25lbnRzXG5cbiAgICBQbGF5bGlzdFRhYiAtIEVudGlyZSBodG1sIGZvciB0aGUgSG9tZSBjb21wb25lbnQuXG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBQbGF5bGlzdFRhYiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAvLyBXaGVuIHRoZSB1c2VyIGlzIG5vdCBsb2dnZWQgaW4sIGRvIG5vdCBkaXNwbGF5IHRoZSBQbGF5bGlzdCB0YWJcbiAgICBpZiAodGhpcy5wcm9wcy51c2VyID09PSB1bmRlZmluZWQgfHwgdGhpcy5wcm9wcy51c2VyID09PSBudWxsICkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlcmUgaXMgYSB1c2VyIGxvZ2dlZCBpbiwgY2hvb3NlcyB0aGUgY29ycmVjdCB0YWIgdHlwZVxuICAgIHN3aXRjaCh0aGlzLnByb3BzLnR5cGUpIHtcbiAgICAgIGNhc2UgXCJNeVBsYXlsaXN0LW1vYmlsZVwiOlxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgIDxhIGRhdGEtdG9nZ2xlPVwidGFiXCIgaHJlZj1cIiNteXBsYXlsaXN0c1wiIGlkPVwibW9iaWxlLXRhYi1teXBsYXlsaXN0c1wiPlxuICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1ib29rIGljb24tcGFkZGluZ1wiPjwvaT5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWItdGV4dFwiPk15IFBsYXlsaXN0czwvZGl2PlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIk15UGxheWxpc3RcIjpcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8bGk+XG4gICAgICAgICAgICA8YSBkYXRhLXRvZ2dsZT1cInRhYlwiIGhyZWY9XCIjbXlwbGF5bGlzdHNcIiBpZD1cInRhYi1teXBsYXlsaXN0c1wiPlxuICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1ib29rIGljb24tcGFkZGluZ1wiPjwvaT5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWItdGV4dFwiPk15IFBsYXlsaXN0czwvZGl2PlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUGxheWxpc3RUYWI7IiwiLyogID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgQ29weXJpZ2h0IMKpIFxuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIE1haW4tQ29tcG9uZW50IFF1ZXVlXG5cbiAgICBUaGUgZW50aXJlIFF1ZXVlIGNvbXBvbmVudC4gQ29udGFpbnMgYSBsaXN0IG9mIG1lZGlhIGVudHJpZXMgdGhhdCBhcmUgaW4gdGhlIHF1ZXVlLlxuICAgIEFsc28gaGFzIHN1YiBjb21wb25lbnRzIG9mIHRoZSBxdWV1ZSdzIHRpdGxlLCBsZW5ndGgsIGFuZCBhZGRlZCBtZWRpYSBsZW5ndGhzLCB3aXRoIHRoZSBidXR0b25zXG4gICAgdGhhdCBjb250cm9scyB0aGUgZnVuY3Rpb25hbGl0aWVzIG9mIHNodWZmbGUgYW5kIGxpa2VzLlxuXG4gICAgQENvbXBvbmVudHM6ICBRdWV1ZVRpdGxlXG4gICAgICAgICAgICAgICAgICBQbGF5bGlzdExlbmd0aFxuICAgICAgICAgICAgICAgICAgQWRkZWRNZWRpYUxlbmd0aFxuICAgICAgICAgICAgICAgICAgU2h1ZmZsZUJ1dHRvblxuICAgICAgICAgICAgICAgICAgTGlrZUJ1dHRvblxuICAgICAgICAgICAgICAgICAgQ2xlYXJCdXR0b25cbiAgICAgICAgICAgICAgICAgIFF1ZXVlUGxhY2VIb2xkZXJcbiAgICAgICAgICAgICAgICAgIFF1ZXVlXG5cbiAgICBARXhwb3J0czogICAgIFF1ZXVlXG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgTWVkaWFFbnRyeSA9IHJlcXVpcmUoJy4vTWVkaWFFbnRyeS5qc3gnKTtcblxuLyogID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgRnVuY3Rpb24gcmVpbml0aWFsaXplRHJhZ2dhYmxlXG5cbiAgICBXaGVuZXZlciB0aGUgcXVldWUgaXMgY2hhbmdlZCBvciB1cGRhdGVkLCByZWluaXRpYWxpemVzIHRoZSBkcmFnZ2FibGUgaW4gb3JkZXJcbiAgICBmb3IgdGhlIGRyYWdnaW5nIHRvIHdvcmsgd2l0aCB0aGUgbmV3bHkgdXBkYXRlZCBsaXN0LiBUaGUgZGVzdHJveSBwYXJhbWV0ZXJcbiAgICByZXNldHMgdGhlIGVudGlyZSBkcmFnZ2FibGUgb2JqZWN0LiBBZnRlciB0aGUgZW50aXJlIHByb2Nlc3MgaXMgZmluaXNoZWQsIHRoZSBmdW5jdGlvbiBjYWxsYmFja1xuICAgIGlzIGNhbGxlZCwgd2hpY2ggaXMgdXN1YWxseSBhIGNhbGxiYWNrIHRvIHJlc2V0dGluZyB0aGUgZHJhZ2dhYmxlIHdpdGggdGhlIG5ldyBxdWV1ZS5cbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuZnVuY3Rpb24gcmVpbml0aWFsaXplRHJhZ2dhYmxlKGNhbGxiYWNrKSB7XG4gICQoJy5tZWRpYS1jYXJkJykuYXJyYW5nZWFibGUoJ2Rlc3Ryb3knKTtcbiAgY2FsbGJhY2soKTtcbn1cblxudmFyIFF1ZXVlVGl0bGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJxdWV1ZS10aXRsZVwiPnt0aGlzLnByb3BzLnF1ZXVlVGl0bGV9PC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbnZhciBQbGF5bGlzdExlbmd0aCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgcGxheVBpbGxDbGFzc05hbWUgPSBcInBpbGxcIjtcbiAgICBpZiAodGhpcy5wcm9wcy5wbGF5bGlzdExlbmd0aCA8PSAwKSB7XG4gICAgICBwbGF5UGlsbENsYXNzTmFtZSArPSBcIiBkaXNwbGF5LW5vbmVcIlxuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e3BsYXlQaWxsQ2xhc3NOYW1lfSBkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIiB0aXRsZT1cIkl0ZW1zIGluIFBsYXlsaXN0XCI+e3RoaXMucHJvcHMucGxheWxpc3RMZW5ndGh9PC9kaXY+XG4gICAgKVxuICB9XG59KTtcblxudmFyIEFkZGVkTWVkaWFMZW5ndGggPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFkZGVkUGlsbENsYXNzTmFtZSA9IFwicGlsbCBwaWxsLWJsdWVcIjtcbiAgICBpZiAodGhpcy5wcm9wcy5hZGRlZE1lZGlhTGVuZ3RoIDw9IDApIHtcbiAgICAgIGFkZGVkUGlsbENsYXNzTmFtZSArPSBcIiBkaXNwbGF5LW5vbmVcIlxuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2FkZGVkUGlsbENsYXNzTmFtZX0gZGF0YS10b2dnbGU9XCJ0b29sdGlwXCIgdGl0bGU9XCJJdGVtcyBBZGRlZFwiPit7dGhpcy5wcm9wcy5hZGRlZE1lZGlhTGVuZ3RofTwvZGl2PlxuICAgIClcbiAgfVxufSk7XG5cbnZhciBFZGl0QnV0dG9uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBhZGRUb1BsYXlsaXN0OiBmdW5jdGlvbigpIHtcblxuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicXVldWUtaWNvblwiPjxhIGNsYXNzTmFtZT1cImljb24tYnRuXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIG9uQ2xpY2s9e3RoaXMucHJvcHMub25DbGlja30+PGkgY2xhc3NOYW1lPVwiZmEgZmEtZWRpdFwiIGRhdGEtdG9nZ2xlPVwidG9vbHRpcFwiIHRpdGxlPVwiRWRpdFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT48L2E+PC9kaXY+ICBcbiAgICApO1xuICB9XG59KTtcblxudmFyIFNodWZmbGVCdXR0b24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicXVldWUtaWNvbiBzaGZsLWJ0blwiPjxhIGNsYXNzTmFtZT1cImljb24tYnRuXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiPjxpIGNsYXNzTmFtZT1cImZhIGZhLXJhbmRvbVwiIGRhdGEtdG9nZ2xlPVwidG9vbHRpcFwiIHRpdGxlPVwiU2h1ZmZsZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT48L2E+PC9kaXY+XG4gICAgKVxuICB9XG59KTtcblxudmFyIExpa2VCdXR0b24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJxdWV1ZS1pY29uIGxpa2UtYnRuXCI+PGEgY2xhc3NOYW1lPVwiaWNvbi1idG5cIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtaGVhcnQtb1wiIGRhdGEtdG9nZ2xlPVwidG9vbHRpcFwiIHRpdGxlPVwiTGlrZSBQbGF5bGlzdFwiIGFyaWEtaGNsYXNzZGVuPVwidHJ1ZVwiPjwvaT48L2E+PC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbnZhciBDbGVhckJ1dHRvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJxdWV1ZS1pY29uXCI+PGEgY2xhc3NOYW1lPVwiaWNvbi1idG5cIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgb25DbGljaz17dGhpcy5wcm9wcy5vbkNsaWNrfT48aSBjbGFzc05hbWU9XCJmYSBmYS1zcXVhcmUtb1wiIGRhdGEtdG9nZ2xlPVwidG9vbHRpcFwiIHRpdGxlPVwiQ2xlYXJcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+PC9hPjwvZGl2PiAgXG4gICAgKTtcbiAgfVxufSk7XG4gICBcbi8vIFRPRE86IE1heWJlIGltcGxlbWVudCBMb29wXG52YXIgTG9vcEJ1dHRvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cblxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59KTtcblxuLy8gUGxhY2Vob2xkZXIgZm9yIGFuIGVtcHR5IGxpc3Qgb2YgbWVkaWEgZW50cmllcyBpbiBxdWV1ZVxudmFyIFF1ZXVlUGxhY2VIb2xkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxhY2Vob2xkZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGFjZWhvbGRlci1jb250ZW50XCI+XG4gICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtc3F1YXJlLW8gcGxhY2Vob2xkZXItaWNvblwiPjwvaT48YnIvPlxuICAgICAgICAgIDxzcGFuPllvdXIgcXVldWUgaXMgZW1wdHk8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbi8vIE1BSU4gQ09NUE9ORU5UOiBUaGUgZW50aXJlIHF1ZXVlXG52YXIgUXVldWUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHF1ZXVlTGlzdDogW11cbiAgICB9O1xuICB9LFxuXG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICAvLyBFdmVudCBoYW5kbGVycyBzZW50IGZyb20gc2VydmVyIHdoZW4gbWVkaWFzIGFyZSBhZGRlZCB0byB0aGUgcXVldWVcbiAgICBzb2NrZXQub24oJ0Zyb20gU2VydmVyOiBJbml0aWFsaXplIFF1ZXVlJywgdGhpcy5pbml0aWFsaXplUXVldWUpO1xuICAgIHNvY2tldC5vbignRnJvbSBTZXJ2ZXI6IFB1c2ggaW50byBxdWV1ZScsIHRoaXMucHVzaEludG9RdWV1ZSk7XG4gICAgc29ja2V0Lm9uKCdGcm9tIFNlcnZlcjogVXBkYXRlIHF1ZXVlIHdpdGggbmV3IHF1ZXVlJywgdGhpcy51cGRhdGVRdWV1ZVdpdGhOZXdRdWV1ZSk7XG4gIH0sXG5cbiAgLy8gRVZFTlQgSEFORExFUjogSW5pdGlhbGl6ZXMgdGhlIHF1ZXVlIHdpdGggdGhlIHNlcnZlcidzIGN1cnJlbnQgcXVldWVcbiAgaW5pdGlhbGl6ZVF1ZXVlOiBmdW5jdGlvbihtZWRpYUVudHJpZXMpIHtcbiAgICB2YXIgcXVldWVMaXN0V2l0aE5ld01lZGlhRW50cnkgPSB0aGlzLnN0YXRlLnF1ZXVlTGlzdC5jb25jYXQobWVkaWFFbnRyaWVzKTtcbiAgICB0aGlzLnNldFN0YXRlKHtxdWV1ZUxpc3Q6IHF1ZXVlTGlzdFdpdGhOZXdNZWRpYUVudHJ5fSwgZnVuY3Rpb24oKSB7XG4gICAgICByZWluaXRpYWxpemVEcmFnZ2FibGUoZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRHJhZ2dhYmxlIHJlaW5pdGlhbGl6ZWQgd2l0aCBRdWV1ZSBjaGFuZ2VzIDogaW5pdGlhbGl6ZVF1ZXVlXCIpOyAgICAgICAgXG4gICAgICAgICQoJy5tZWRpYS1jYXJkJykuYXJyYW5nZWFibGUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuXG4gIC8vIEVWRU5UIEhBTkRMRVI6IFB1c2hlcyBhIG1lZGlhIGVudHJ5IGludG8gdGhlIHF1ZXVlXG4gIHB1c2hJbnRvUXVldWU6IGZ1bmN0aW9uKG1lZGlhRW50cnkpIHtcbiAgICB2YXIgcXVldWVMaXN0V2l0aE5ld01lZGlhRW50cnkgPSB0aGlzLnN0YXRlLnF1ZXVlTGlzdC5jb25jYXQobWVkaWFFbnRyeSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7cXVldWVMaXN0OiBxdWV1ZUxpc3RXaXRoTmV3TWVkaWFFbnRyeX0sIGZ1bmN0aW9uKCkge1xuICAgICAgcmVpbml0aWFsaXplRHJhZ2dhYmxlKGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkRyYWdnYWJsZSByZWluaXRpYWxpemVkIHdpdGggUXVldWUgY2hhbmdlcyA6IHB1c2hJbnRvUXVldWVcIik7XG4gICAgICAgICQoJy5tZWRpYS1jYXJkJykuYXJyYW5nZWFibGUoKTsgIFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG5cbiAgLy8gRVZFTlQgSEFORExFUjogVXBkYXRlcyB0aGUgcXVldWUgd2l0aCB0aGUgc2VydmVyJ3MgcXVldWVcbiAgdXBkYXRlUXVldWVXaXRoTmV3UXVldWU6IGZ1bmN0aW9uKG5ld1F1ZXVlTGlzdCkge1xuICAgIGNvbnNvbGUubG9nKG5ld1F1ZXVlTGlzdCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7cXVldWVMaXN0OiBuZXdRdWV1ZUxpc3R9LCBmdW5jdGlvbigpIHtcbiAgICAgIHJlaW5pdGlhbGl6ZURyYWdnYWJsZShmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJEcmFnZ2FibGUgcmVpbml0aWFsaXplZCB3aXRoIFF1ZXVlIGNoYW5nZXMgOiB1cGRhdGVRdWV1ZVdpdGhOZXdRdWV1ZVwiKTtcbiAgICAgICAgJCgnLm1lZGlhLWNhcmQnKS5hcnJhbmdlYWJsZSgpOyAgXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSxcblxuICAvLyBFVkVOVCBIQU5ETEVSOiBDbGVhcnMgdGhlIGVudGlyZSBxdWV1ZVxuICBjbGVhclF1ZXVlOiBmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZyhcIkNsZWFyaW5nIHRoZSBxdWV1ZVwiKTtcbiAgICBzb2NrZXQuZW1pdCgnRnJvbSBDbGllbnQ6IFVwZGF0ZSBxdWV1ZSB3aXRoIG5ldyBsaXN0JywgW10pO1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgLy8gUHJlcGFyZXMgZWFjaCBtZWRpYSBlbnRyeS4gV2hlbmV2ZXIgYSBtZWRpYSBpcyBhZGRlZCwgcG9wdWxhdGVzIHRoZSBxdWV1ZSBsaXN0IHdpdGggdGhlIG5ldyBtZWRpYSBlbnRyeVxuICAgIHZhciBxdWV1ZUVudHJpZXMgPSBbXTtcbiAgICB2YXIgcXVldWVFbnRyeTtcbiAgICB2YXIgcXVldWVNZWRpYUVudHJ5SWQgPSAncXVldWUtbWVkaWEtZW50cnktJztcbiAgICB2YXIgcGxheWxpc3RMZW5ndGggPSAwO1xuICAgIHZhciBhZGRlZE1lZGlhTGVuZ3RoID0gMDtcblxuICAgIC8vIEFkZGVkIElmIHN0YXRlbWVudCB0aGF0IHB1c2hlcyB0aGUgcGxhY2Vob2xkZXIgZGl2IGludG8gcXVldWVFbnRyaWVzIHdoZW5ldmVyIHF1ZXVlTGlzdCBpcyBlbXB0eVxuICAgIGlmICh0aGlzLnN0YXRlLnF1ZXVlTGlzdC5sZW5ndGggPD0gMCkge1xuICAgICAgcXVldWVFbnRyaWVzLnB1c2goXG4gICAgICAgIDxRdWV1ZVBsYWNlSG9sZGVyIGtleT17J1F1ZXVlUGxhY2VIb2xkZXInfSAvPlxuICAgICAgKVxuICAgIH1cblxuICAgIC8vIElmIHRoZXJlIGFyZSBtZWRpYSBlbnRyaWVzLCBwdXNoZXMgZXZlcnkgbWVkaWEgZW50cnkgdGhlIHF1ZXVlRW50cmllcyBpbnN0ZWFkXG4gICAgZWxzZSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc3RhdGUucXVldWVMaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHF1ZXVlRW50cnkgPSB0aGlzLnN0YXRlLnF1ZXVlTGlzdFtpXTtcblxuICAgICAgICBpZiAocXVldWVFbnRyeS5pZk1lZGlhQ2FyZEFkZGVkKSB7XG4gICAgICAgICAgKythZGRlZE1lZGlhTGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICsrcGxheWxpc3RMZW5ndGg7XG4gICAgICAgIH1cblxuICAgICAgICBxdWV1ZUVudHJpZXMucHVzaCAoXG4gICAgICAgICAgPE1lZGlhRW50cnkgXG4gICAgICAgICAgICAvLyBGT1IgUFJFVkVOVElORyBEVVBMSUNBVEVTXG4gICAgICAgICAgICAvLyBrZXk9e3F1ZXVlRW50cnkubWVkaWFJZH0gXG4gICAgICAgICAgICBrZXk9e3F1ZXVlRW50cnkubWVkaWFJZCArIGl9XG4gICAgICAgICAgICBwb3M9e2l9IFxuICAgICAgICAgICAgbWVkaWFJZD17cXVldWVFbnRyeS5tZWRpYUlkfSBcbiAgICAgICAgICAgIGNhdGVnb3J5VHlwZT17J1FVRVVFJ31cbiAgICAgICAgICAgIG1lZGlhVHlwZT17J1lPVVRVQkUnfVxuICAgICAgICAgICAgdGh1bWJuYWlsPXtxdWV1ZUVudHJ5LnRodW1ibmFpbH0gXG4gICAgICAgICAgICB0aXRsZT17cXVldWVFbnRyeS50aXRsZX1cbiAgICAgICAgICAgIGFydGlzdD17cXVldWVFbnRyeS5hcnRpc3R9IFxuICAgICAgICAgICAgaWZNZWRpYUNhcmRBZGRlZD17cXVldWVFbnRyeS5pZk1lZGlhQ2FyZEFkZGVkfSAvPlxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInF1ZXVlLWhlYWRlclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicXVldWUtdGl0bGUtY29udGFpbmVyXCI+XG4gICAgICAgICAgICB7LyogVE9ETzogQ2hhbmdlIHF1ZXVlIHRpdGxlcyBhbmQgcGlsbCBudW1iZXJzIGRlcGVuZGluZyBvbiB3aGF0IHdhcyBhZGRlZCAqL31cbiAgICAgICAgICAgIDxRdWV1ZVRpdGxlIHF1ZXVlVGl0bGU9e1wiUXVldWVcIn0gLz5cbiAgICAgICAgICAgIDxQbGF5bGlzdExlbmd0aCBwbGF5bGlzdExlbmd0aD17cGxheWxpc3RMZW5ndGh9IC8+XG4gICAgICAgICAgICA8QWRkZWRNZWRpYUxlbmd0aCBhZGRlZE1lZGlhTGVuZ3RoPXthZGRlZE1lZGlhTGVuZ3RofSAvPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJxdWV1ZS1pY29uLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPENsZWFyQnV0dG9uIG9uQ2xpY2s9e3RoaXMuY2xlYXJRdWV1ZX0gLz5cbiAgICAgICAgICAgIDxMaWtlQnV0dG9uIC8+XG4gICAgICAgICAgICA8U2h1ZmZsZUJ1dHRvbiAvPlxuICAgICAgICAgICAgPEVkaXRCdXR0b24gb25DbGljaz17dGhpcy5hZGRUb1BsYXlsaXN0fSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInF1ZXVlLWJvZHkgY29sLXBhZGRpbmdcIj5cbiAgICAgICAgICB7cXVldWVFbnRyaWVzfVxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8bmF2IGFyaWEtbGFiZWw9XCJwYWdlIG5hdmlnYXRpb25cIj5cbiAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwicGFnaW5hdGlvblwiPlxuICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImRpc2FibGVkXCI+PGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIGFyaWEtbGFiZWw9XCJQcmV2aW91c1wiPjxpIGNsYXNzTmFtZT1cImZhIGZhLWFuZ2xlLWxlZnRcIj48L2k+PC9hPjwvbGk+XG4gICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiYWN0aXZlXCI+PGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiPjE8L2E+PC9saT5cbiAgICAgICAgICAgIDxsaT48YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+MjwvYT48L2xpPlxuICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIj4zPC9hPjwvbGk+XG4gICAgICAgICAgICA8bGk+PGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIGFyaWEtbGFiZWw9XCJOZXh0XCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtYW5nbGUtcmlnaHRcIj48L2k+PC9hPjwvbGk+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9uYXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBRdWV1ZTsiLCIvKiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBDb3B5cmlnaHQgwqkgXG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyogID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgUm9vbS5qc3hcblxuICAgIEV2ZXJ5IHZpZXcgb2YgZWFjaCBpbmRpdmlkdWFsIHJvb20uXG4gICAgVGhlIHZpZXcgb2YgdGhlIGVudGlyZSBpbmRleCBwYWdlLiBNYWluIHdlYnBhZ2VcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBDb21wb25lbnRzXG5cbiAgICBSb29tIC0gRW50aXJlIGh0bWwgZm9yIHRoZSBSb29tIGNvbXBvbmVudC4gU1xuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG4vLyBTdWItY29tcG9uZW50cyBpbiBSb29tXG52YXIgSGVhZGVyID0gcmVxdWlyZSgnLi9IZWFkZXIuanN4Jyk7XG52YXIgTWVkaWFQbGF5ZXIgPSByZXF1aXJlKCcuL01lZGlhUGxheWVyLmpzeCcpO1xudmFyIENoYXRib3ggPSByZXF1aXJlKCcuL0NoYXRib3guanN4Jyk7XG52YXIgU3RhdHVzQmFyID0gcmVxdWlyZSgnLi9TdGF0dXNCYXIuanN4Jyk7XG52YXIgUXVldWUgPSByZXF1aXJlKCcuL1F1ZXVlLmpzeCcpO1xudmFyIEV4cGxvcmUgPSByZXF1aXJlKCcuL0V4cGxvcmUuanN4Jyk7XG52YXIgTXlQbGF5bGlzdHMgPSByZXF1aXJlKCcuL015UGxheWxpc3RzLmpzeCcpO1xudmFyIFBsYXlsaXN0VGFiID0gcmVxdWlyZSgnLi9QbGF5bGlzdFRhYi5qc3gnKTtcbnZhciBFZGl0T3BlbmVkUGxheWxpc3QgPSByZXF1aXJlKCcuL0VkaXRPcGVuZWRQbGF5bGlzdC5qc3gnKTtcbnZhciBWaWV3T3BlbmVkUGxheWxpc3QgPSByZXF1aXJlKCcuL1ZpZXdPcGVuZWRQbGF5bGlzdC5qc3gnKTtcbnZhciBNb2RhbENyZWF0ZVBsYXlsaXN0ID0gcmVxdWlyZSgnLi9Nb2RhbENyZWF0ZVBsYXlsaXN0LmpzeCcpO1xudmFyIFNlYXJjaCA9IHJlcXVpcmUoJy4vU2VhcmNoLmpzeCcpO1xudmFyIEZvb3RlciA9IHJlcXVpcmUoJy4vRm9vdGVyLmpzeCcpO1xuXG4vLyBGbHV4LCB1c2VkIHRvIGNoZWNrIGZvciBkZWxldGVkIHBsYXlsaXN0c1xudmFyIHBsYXlsaXN0U3RvcmUgPSByZXF1aXJlKCcuLi9mbHV4L3N0b3Jlcy9zdG9yZScpO1xuXG4vLyBNQUlOIENPTVBPTkVOVDogUm9vbVxudmFyIFJvb20gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMucHJvcHMubXlQbGF5bGlzdHMgID09PSB1bmRlZmluZWQgfHwgdGhpcy5wcm9wcy5teVBsYXlsaXN0cyA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbXlQbGF5bGlzdHM6IFtdXG4gICAgICB9O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG15UGxheWxpc3RzOiB0aGlzLnByb3BzLm15UGxheWxpc3RzXG4gICAgICB9OyAgXG4gICAgfVxuICB9LFxuXG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICAvLyBTZXRzIHVwIHRoZSBGbHV4IGV2ZW50IGxpc3RlbmVycyBmb3IgdGhlIHBsYXlsaXN0c1xuICAgIHBsYXlsaXN0U3RvcmUuYWRkRGVsZXRlUGxheWxpc3RMaXN0ZW5lcih0aGlzLm9uRGVsZXRlU3BlY2lmaWVkUGxheWxpc3QpO1xuICAgIHBsYXlsaXN0U3RvcmUuYWRkVXBkYXRlUGxheWxpc3RMaXN0ZW5lcih0aGlzLm9uVXBkYXRlU3BlY2lmaWVkUGxheWxpc3QpO1xuICAgIHBsYXlsaXN0U3RvcmUuYWRkQ3JlYXRlUGxheWxpc3RMaXN0ZW5lcih0aGlzLnVwZGF0ZUFsbFBsYXlsaXN0RW50cmllcyk7XG5cbiAgICAvLyBzb2NrZXQub24oJ0Zyb20gU2VydmVyOiBJbml0aWFsaXplIHJvb20gYnkgcGluZ2luZyBjbGllbnQgZmlyc3QnLCB0aGlzLmluaXRpYWxpemVSb29tSW5TZXJ2ZXJXaXRoRGF0YSk7XG4gICAgLy8gc29ja2V0Lm9uKFwiRnJvbSBTZXJ2ZXI6IFVwZGF0ZSBNeVBsYXlsaXN0IHdpdGggbmV3IHBsYXlsaXN0c1wiICwgdGhpcy51cGRhdGVBbGxQbGF5bGlzdEVudHJpZXMpO1xuICAgIHNvY2tldC5vbihcIkZyb20gU2VydmVyOiBVcGRhdGUgc2VsZWN0ZWQgcGxheWxpc3RcIiwgdGhpcy51cGRhdGVPbmVQbGF5bGlzdEVudHJ5KTtcbiAgICBcbiAgICBzb2NrZXQuZW1pdChcIkZyb20gQ2xpZW50OiBJbml0aWFsaXplIHJvb21cIiwge1xuICAgICAgdXNlcjogdGhpcy5wcm9wcy51c2VyLFxuICAgICAgcm9vbTogdGhpcy5wcm9wcy5yb29tXG4gICAgfSk7XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgIC8vIFVubW91bnRzIHRoZSBldmVudCBsaXN0ZW5lclxuICAgIHBsYXlsaXN0U3RvcmUucmVtb3ZlRGVsZXRlUGxheWxpc3RMaXN0ZW5lcih0aGlzLm9uRGVsZXRlU3BlY2lmaWVkUGxheWxpc3QpO1xuICAgIHBsYXlsaXN0U3RvcmUucmVtb3ZlVXBkYXRlUGxheWxpc3RMaXN0ZW5lcih0aGlzLm9uVXBkYXRlU3BlY2lmaWVkUGxheWxpc3QpO1xuICAgIHBsYXlsaXN0U3RvcmUucmVtb3ZlQ3JlYXRlUGxheWxpc3RMaXN0ZW5lcih0aGlzLnVwZGF0ZUFsbFBsYXlsaXN0RW50cmllcyk7XG4gIH0sXG5cbiAgLy8gRkxVWCBFVkVOVCBIQU5ETEVSOiBEZWxldGVzIGEgcGxheWxpc3QgZW50cnkgZnJvbSBteVBsYXlsaXN0XG4gIG9uRGVsZXRlU3BlY2lmaWVkUGxheWxpc3Q6IGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKFwiUm9vbS5qc3g6IG9uRGVsZXRlU3BlY2lmaWVkUGxheWxpc3RcIik7XG4gICAgdmFyIHBsYXlsaXN0ID0gcGxheWxpc3RTdG9yZS5nZXRQbGF5bGlzdERlbGV0ZWQoKTtcbiAgICBpZiAocGxheWxpc3QgPT09IG51bGwgfHwgcGxheWxpc3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFRPRE86IERvIHNlYXJjaCBpbiBhIGZhc3RlciB3YXlcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc3RhdGUubXlQbGF5bGlzdHMubGVuZ3RoOyArK2kpIHtcbiAgICAgIGlmICh0aGlzLnN0YXRlLm15UGxheWxpc3RzW2ldLl9pZCA9PT0gcGxheWxpc3QuX2lkKSB7XG4gICAgICAgIC8vIFNob3cgdGhlIHBsYXlsaXN0IHRhYlxuICAgICAgICAkKCcjdGFiLW15cGxheWxpc3RzJykudGFiKCdzaG93Jyk7XG5cbiAgICAgICAgdmFyIHBsYXlsaXN0c1dpdGhEZWxldGVkRW50cnkgPSB0aGlzLnN0YXRlLm15UGxheWxpc3RzO1xuICAgICAgICBwbGF5bGlzdHNXaXRoRGVsZXRlZEVudHJ5LnNwbGljZShpLCAxKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bXlQbGF5bGlzdHMgOiBwbGF5bGlzdHNXaXRoRGVsZXRlZEVudHJ5fSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgb25VcGRhdGVTcGVjaWZpZWRQbGF5bGlzdDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHBsYXlsaXN0ID0gcGxheWxpc3RTdG9yZS5nZXRVcGRhdGVkUGxheWxpc3QoKTtcbiAgICBpZiAocGxheWxpc3QgPT09IG51bGwgfHwgcGxheWxpc3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFRPRE86IERvIHNlYXJjaCBpbiBhIGZhc3RlciB3YXlcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc3RhdGUubXlQbGF5bGlzdHMubGVuZ3RoOyArK2kpIHtcbiAgICAgIGlmICh0aGlzLnN0YXRlLm15UGxheWxpc3RzW2ldLl9pZCA9PT0gcGxheWxpc3QuX2lkKSB7XG4gICAgICAgIHZhciBwbGF5bGlzdHNXaXRoVXBkYXRlZEVudHJ5ID0gdGhpcy5zdGF0ZS5teVBsYXlsaXN0cztcbiAgICAgICAgcGxheWxpc3RzV2l0aFVwZGF0ZWRFbnRyeVtpXSA9IHBsYXlsaXN0OyBcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bXlQbGF5bGlzdHMgOiBwbGF5bGlzdHNXaXRoVXBkYXRlZEVudHJ5fSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLy8gRVZFTlQgSEFORExFUjogSW5pdGlhbGl6ZSByb29tIGZvciBzZXJ2ZXJcbiAgaW5pdGlhbGl6ZVJvb21JblNlcnZlcldpdGhEYXRhOiBmdW5jdGlvbigpIHtcbiAgICBzb2NrZXQuZW1pdChcIkZyb20gQ2xpZW50OiBJbml0aWFsaXplIHJvb21cIiwge1xuICAgICAgdXNlcjogdGhpcy5wcm9wcy51c2VyLFxuICAgICAgcm9vbTogdGhpcy5wcm9wcy5yb29tXG4gICAgfSk7XG4gIH0sXG5cbiAgLy8gRVZFTlQgSEFORExFUjogVXBkYXRlIHRoZSBwbGF5bGlzdCBlbnRyeVxuICB1cGRhdGVBbGxQbGF5bGlzdEVudHJpZXM6IGZ1bmN0aW9uKG5ld1BsYXlsaXN0KSB7XG4gICAgY29uc29sZS5sb2coXCJVcGRhdGUgd2l0aCBuZXcgcGxheWxpc3QgZW50cnlcIilcbiAgICB2YXIgbmV3UGxheWxpc3QgPSBwbGF5bGlzdFN0b3JlLmdldENyZWF0ZWRQbGF5bGlzdCgpO1xuICAgIHZhciBwbGF5bGlzdHNXaXRoTmV3RW50cnkgPSB0aGlzLnN0YXRlLm15UGxheWxpc3RzLmNvbmNhdChuZXdQbGF5bGlzdCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7bXlQbGF5bGlzdHMgOiBwbGF5bGlzdHNXaXRoTmV3RW50cnl9KTsgXG4gIH0sXG5cbiAgLy8gRVZFTlQgSEFORExFUjogVXBkYXRlcyB0aGUgY2xpZW50J3MgcGxheWxpc3QgZW50cnkgd2hlbiBhIG1lZGlhIGlzIHB1c2hlZCBpblxuICB1cGRhdGVPbmVQbGF5bGlzdEVudHJ5OiBmdW5jdGlvbihuZXdQbGF5bGlzdCkge1xuICAgIC8vIFRPRE86IEZpbmQgYSBiZXR0ZXIgbWV0aG9kIGluc3RlYWQgb2YgdGhpcywgb3IgbWF5YmUgbm90XG4gICAgdmFyIHVwZGF0ZWRNeVBsYXlsaXN0cyA9IHRoaXMuc3RhdGUubXlQbGF5bGlzdHM7XG4gICAgdmFyIHBsYXlsaXN0RW50cnk7XG4gICAgLy8gSW5jcmVtZW50cyB0aHJvdWdoIGV2ZXJ5IHBsYXlsaXN0IGVudHJ5IHRvIGZpbmQgdGhlIGV4aXN0aW5nIHBsYXlsaXN0LlxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zdGF0ZS5teVBsYXlsaXN0cy5sZW5ndGg7ICsraSkge1xuICAgICAgcGxheWxpc3RFbnRyeSA9IHRoaXMuc3RhdGUubXlQbGF5bGlzdHNbaV07XG4gICAgICBpZiAocGxheWxpc3RFbnRyeS5faWQgPT09IG5ld1BsYXlsaXN0Ll9pZCkge1xuICAgICAgICB1cGRhdGVkTXlQbGF5bGlzdHNbaV0gPSBuZXdQbGF5bGlzdDtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bXlQbGF5bGlzdHMgOiB1cGRhdGVkTXlQbGF5bGlzdHN9KTsgICAgIFxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgXG4gICAgcmV0dXJuKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50LWNvbnRhaW5lclwiPlxuXG4gICAgICAgICAgey8qIFBhZ2UgT3ZlcmxheSAvLyB0byBmcmVlemUgc2NyZWVuIHdoZW4gbW9kYWwvcG9wdXAgaXMgYWN0aXZlICovfVxuICAgICAgICAgIDxkaXYgaWQ9XCJwYWdlLW92ZXJsYXlcIj48L2Rpdj5cblxuICAgICAgICAgIHsvKiBIZWFkZXIgKi99XG4gICAgICAgICAgPEhlYWRlciB1c2VyPXt0aGlzLnByb3BzLnVzZXJ9IC8+XG5cbiAgICAgICAgICB7LyogVmlkZW8gYW5kIENoYXQgQmFubmVyICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFubmVyLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYW5uZXItY29udGVudC1jb250YWluZXJcIj5cblxuICAgICAgICAgICAgICB7LyogVmlkZW8gKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmlkZW8tY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgPE1lZGlhUGxheWVyIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBNb2JpbGUgVGFiIE5hdmlnYXRpb24gLy8gcmVwbGFjZXMgcmVndWxhciB0YWJzIGluIG1vYmlsZSAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2JpbGUtdGFiYmVkLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJuYXYgbmF2LXRhYnMgbmF2LWNlbnRlcmVkXCI+XG4gICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiYWN0aXZlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxhIGRhdGEtdG9nZ2xlPVwidGFiXCIgaHJlZj1cIiNjaGF0XCIgaWQ9XCJtb2JpbGUtdGFiLWNoYXRcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1jb21tZW50cyBpY29uLXBhZGRpbmdcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWItdGV4dFwiPkNoYXQ8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgPGEgZGF0YS10b2dnbGU9XCJ0YWJcIiBocmVmPVwiI3F1ZXVlXCIgaWQ9XCJtb2JpbGUtdGFiLXF1ZXVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtbGlzdC11bCBpY29uLXBhZGRpbmdcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWItdGV4dFwiPlF1ZXVlPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgIDxhIGRhdGEtdG9nZ2xlPVwidGFiXCIgaHJlZj1cIiNleHBsb3JlXCIgaWQ9XCJtb2JpbGUtdGFiLWV4cGxvcmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1yb2NrZXQgaWNvbi1wYWRkaW5nXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFiLXRleHRcIj5FeHBsb3JlPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgIDwvbGk+XG5cbiAgICAgICAgICAgICAgICAgIDxQbGF5bGlzdFRhYiB0eXBlPXtcIk15UGxheWxpc3QtbW9iaWxlXCJ9IHVzZXI9e3RoaXMucHJvcHMudXNlcn0gLz5cblxuICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICA8YSBkYXRhLXRvZ2dsZT1cInRhYlwiIGhyZWY9XCIjc2VhcmNoXCIgY2xhc3NOYW1lPSdmb2N1cy1zZWFyY2gnIGlkPVwibW9iaWxlLXRhYi1zZWFyY2hcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1zZWFyY2ggaWNvbi1wYWRkaW5nXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFiLXRleHRcIj5TZWFyY2g8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIENoYXQgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoYXRib3gtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgPENoYXRib3ggcm9vbT17dGhpcy5wcm9wcy5yb29tfSB1c2VyPXt0aGlzLnByb3BzLnVzZXJ9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogTWFpbiBDb250YWluZXIgLy8gcXVldWUgYW5kIHRhYmJlZCBjb250YWluZXJzKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYWluLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cblxuICAgICAgICAgICAgICB7LyogUXVldWUgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTQgY29sLXNtLTUgcXVldWUtY29udGFpbmVyXCIgaWQ9XCJxdWV1ZVwiPlxuICAgICAgICAgICAgICAgIDxRdWV1ZSB1c2VyPXt0aGlzLnByb3BzLnVzZXJ9IC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBEZXNrdG9wIFRhYiBOYXZpZ2F0aW9uICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC04IGNvbC1zbS03IHRhYmJlZC1jb250YWluZXIgdGFiYmVkLWNvbnRhaW5lci1tb2JpbGUtY29sbGFwc2VcIj5cbiAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibmF2IG5hdi10YWJzIG5hdi10YWJzLW1vYmlsZS1jb2xsYXBzZVwiPlxuICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImFjdGl2ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8YSBkYXRhLXRvZ2dsZT1cInRhYlwiIGhyZWY9XCIjZXhwbG9yZVwiIGlkPVwidGFiLWV4cGxvcmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1yb2NrZXQgaWNvbi1wYWRkaW5nXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFiLXRleHRcIj5FeHBsb3JlPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIDxQbGF5bGlzdFRhYiB0eXBlPXtcIk15UGxheWxpc3RcIn0gdXNlcj17dGhpcy5wcm9wcy51c2VyfSAvPlxuXG4gICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgIDxhIGRhdGEtdG9nZ2xlPVwidGFiXCIgaHJlZj1cIiNzZWFyY2hcIiBjbGFzc05hbWU9J2ZvY3VzLXNlYXJjaCcgaWQ9XCJ0YWItc2VhcmNoXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtc2VhcmNoIGljb24tcGFkZGluZ1wiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYi10ZXh0XCI+U2VhcmNoPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgIDwvbGk+XG5cbiAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiaGlkZGVuXCIgZGF0YS10b2dnbGU9XCJ0YWJcIiBocmVmPVwiI2VkaXQtcGxheWxpc3RcIiBpZD1cInRhYi1lZGl0LXBsYXlsaXN0XCI+PC9hPlxuICAgICAgICAgICAgICAgICAgPC9saT5cblxuICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJoaWRkZW5cIiBkYXRhLXRvZ2dsZT1cInRhYlwiIGhyZWY9XCIjdmlldy1wbGF5bGlzdFwiIGlkPVwidGFiLXZpZXctcGxheWxpc3RcIj48L2E+XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPC91bD5cblxuICAgICAgICAgICAgICAgIHsvKiBEZXNrdG9wIFRhYmJlZCBDb250YWluZXJzICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFiLWNvbnRlbnRcIj5cblxuICAgICAgICAgICAgICAgICAgey8qIEV4cGxvcmUgKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiZXhwbG9yZVwiIGNsYXNzTmFtZT1cInRhYi1wYW5lIGZhZGUgaW4gYWN0aXZlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxFeHBsb3JlIGV4cGxvcmU9e3RoaXMucHJvcHMuZXhwbG9yZX0gLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICB7LyogTXkgUGxheWxpc3RzICovfVxuICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cIm15cGxheWxpc3RzXCIgY2xhc3NOYW1lPVwidGFiLXBhbmUgZmFkZVwiPlxuICAgICAgICAgICAgICAgICAgICA8TXlQbGF5bGlzdHMgbXlQbGF5bGlzdHM9e3RoaXMuc3RhdGUubXlQbGF5bGlzdHN9IC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgey8qIFNlYXJjaCAqL31cbiAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJzZWFyY2hcIiBjbGFzc05hbWU9XCJ0YWItcGFuZSBmYWRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxTZWFyY2ggdXNlcj17dGhpcy5wcm9wcy51c2VyfSBteVBsYXlsaXN0cz17dGhpcy5zdGF0ZS5teVBsYXlsaXN0c30gLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICB7LyogVXNlcidzIG9wZW5lZCBwbGF5bGlzdCAqL31cbiAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJlZGl0LXBsYXlsaXN0XCIgY2xhc3NOYW1lPVwidGFiLXBhbmUgZmFkZVwiPlxuICAgICAgICAgICAgICAgICAgICA8RWRpdE9wZW5lZFBsYXlsaXN0IG15UGxheWxpc3RzPXt0aGlzLnN0YXRlLm15UGxheWxpc3RzfSB1c2VyPXt0aGlzLnByb3BzLnVzZXJ9IC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgey8qIE9wZW5lZCBwbGF5bGlzdCAqL31cbiAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJ2aWV3LXBsYXlsaXN0XCIgY2xhc3NOYW1lPVwidGFiLXBhbmUgZmFkZVwiPlxuICAgICAgICAgICAgICAgICAgICA8Vmlld09wZW5lZFBsYXlsaXN0IG15UGxheWxpc3RzPXt0aGlzLnN0YXRlLm15UGxheWxpc3RzfSB1c2VyPXt0aGlzLnByb3BzLnVzZXJ9IC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgey8qIE1vZGFsIGZvciBjcmVhdGUgbmV3IHBsYXlsaXN0IGJ1dHRvbiwgdGhlcmUgaXMgbm8gbWVkaWEgZW50cnkgd2hlbiB0aGlzIGJ1dHRvbiBpcyBjbGlja2VkICovfVxuICAgICAgICAgICAgICAgICAgPE1vZGFsQ3JlYXRlUGxheWxpc3Qga2V5PXtcIm5ld1BsYXlsaXN0XCJ9IHVzZXI9e3RoaXMucHJvcHMudXNlcn0gZGF0YT17bnVsbH0gcG9zPXtudWxsfSAvPlxuXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBGb290ZXIgUHVzaCAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB1c2hcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIEZvb3RlciAqL31cbiAgICAgICAgPEZvb3RlciAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUm9vbTsiLCIvKiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBDb3B5cmlnaHQgwqkgXG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbiAgICBcbi8qICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIE1haW4tQ29tcG9uZW50IFNlYXJjaFxuXG4gICAgVGhlIGVudGlyZSBTZWFyY2ggY29tcG9uZW50LiBDb250YWlucyBhbiBJbnB1dCBiYXIgZm9yIFNlYXJjaCwgYXMgd2VsbCBhcyB0aGVcbiAgICBlbnRpcmUgbGlzdCBvZiBtZWRpYSBlbnRyaWVzLiBFYWNoIG1lZGlhIGVudHJ5IGNvbnRhaW5zIHRoZSB0aHVtYm5haWwsXG4gICAgdGl0bGUsIGFuZCBkdXJhdGlvbiBjb21wb25lbnRzXG5cbiAgICBAQ29tcG9uZW50czogIFNlYXJjaFBsYWNlSG9sZGVyXG4gICAgICAgICAgICAgICAgICBTZWFyY2hcblxuICAgIEBFeHBvcnRzOiAgICAgU2VhcmNoXG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG4vLyBNZWRpYSBFbnRyeSBjb21wb25lbnRcbnZhciBNZWRpYUVudHJ5ID0gcmVxdWlyZSgnLi9NZWRpYUVudHJ5LmpzeCcpO1xuXG4vLyBEZWZhdWx0IFBsYWNlaG9sZGVyIHdoZW4gcXVlcnkgaGFzIG5vIGVudHJ5XG52YXIgU2VhcmNoUGxhY2VIb2xkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtcGFkZGluZ1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYWNlaG9sZGVyIHBsYWNlaG9sZGVyLXNlYXJjaFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxhY2Vob2xkZXItY29udGVudFwiPlxuICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtc2VhcmNoIHBsYWNlaG9sZGVyLWljb25cIj48L2k+PGJyLz5cbiAgICAgICAgICAgIDxzcGFuPlR5cGUgdG8gc2VhcmNoPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG4vLyBQbGFjZWhvbGRlciBmb3IgYW4gZW1wdHkgbGlzdCBvZiBtZWRpYSBlbnRyaWVzIGluIHNlYXJjaFxudmFyIFNlYXJjaEVtcHR5ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybihcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXBhZGRpbmdcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwbGFjZWhvbGRlciBwbGFjZWhvbGRlci1zZWFyY2hcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYWNlaG9sZGVyLWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLXJlbW92ZSBwbGFjZWhvbGRlci1pY29uXCI+PC9pPjxici8+XG4gICAgICAgICAgICA8c3Bhbj5ObyBtYXRjaGluZyBzZWFyY2ggcmVzdWx0czwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxuLy8gU2VhcmNoaW5nIExvYWQgSWNvbiBmb3Igd2hlbiBzZWFyY2ggcmVzdWx0cyBhcmUgbG9hZGluZ1xudmFyIFNlYXJjaExvYWQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtcGFkZGluZ1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYWNlaG9sZGVyIHBsYWNlaG9sZGVyLXNlYXJjaFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGxhY2Vob2xkZXItY29udGVudFwiPlxuICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtY2lyY2xlLW8tbm90Y2ggZmEtc3BpbiBwbGFjZWhvbGRlci1pY29uXCI+PC9pPjxici8+XG4gICAgICAgICAgICA8c3Bhbj5TZWFyY2hpbmc8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbi8vIFNlYXJjaCBDb21wb25lbnRcbnZhciBTZWFyY2ggPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNlYXJjaFF1ZXJ5OiBcIlwiLFxuICAgICAganNvblJlc3BvbnNlOiB1bmRlZmluZWRcbiAgICB9O1xuICB9LFxuXG4gIHNlYXJjaE1lZGlhOiBmdW5jdGlvbihlKSB7XG4gICAgLy8gQ2xlYXJzIHRoZSB0aW1lciB0byBwcmV2ZW50IGFub3RoZXIgdW5uZWNlc3Nhcnkgc2VhcmNoTWVkaWEgZnJvbSBnZXRpbmcgY2FsbGVkXG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgICB2YXIgcXVlcnkgPSB0aGlzLnN0YXRlLnNlYXJjaFF1ZXJ5O1xuXG4gICAgLy8gYWZ0ZXIgc2VhcmNoTWVkaWEgaXMgcnVuLCBkaXNwbGF5IGxvYWRpbmcgaWNvbiBmaXJzdCB1bnRpbCBqc29uIGlzIGxvYWRlZFxuICAgIHRoaXMuc2V0U3RhdGUoe2pzb25SZXNwb25zZTogJ2xvYWRpbmcnfSk7XG5cbiAgICAvLyBEbyBub3Qgc2VhcmNoIGZvciBhbiBlbXB0eSBxdWVyeVxuICAgIGlmIChxdWVyeSA9PT0gJycgfHwgcXVlcnkgPT09IHVuZGVmaW5lZCB8fCBxdWVyeSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIENhbGxzIHRoZSBZb3V0dWJlIEFQSSBmb3IgU2VhcmNoaW5nIGEgbGlzdCB3aXRoIGEgZ2l2ZW4gcXVlcnlcbiAgICAvLyBUT0RPOiBNYWtlIEFQSUtleSBzZWNyZXRcbiAgICB2YXIgYXBpS2V5ID0gJ0FJemFTeURZOFdlWUNSV3FIRWRrU0xhUGZuMmhyWHBscHBJdDBhVSc7XG4gICAgZ2FwaS5jbGllbnQuc2V0QXBpS2V5KGFwaUtleSk7XG4gICAgZ2FwaS5jbGllbnQubG9hZCgneW91dHViZScsICd2MycsIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHJlcXVlc3QgPSBnYXBpLmNsaWVudC55b3V0dWJlLnNlYXJjaC5saXN0KHtcbiAgICAgICAgcTogcXVlcnksXG4gICAgICAgIHBhcnQ6ICdpZCwgc25pcHBldCcsXG4gICAgICAgIHR5cGU6ICd2aWRlbycsXG4gICAgICAgIG1heFJlc3VsdHM6IE1BWF9TRUFSQ0hfUkVTVUxUU1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFRoZSBiaW5kcyBhcmUgbmVlZGVkIChTdGlsbCBuZWVkIG1vcmUgb2YgYW4gZXhwbGFuYXRpb24gb24gdGhpcylcbiAgICAgIHJlcXVlc3QuZXhlY3V0ZShmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAvLyBUaGlzIGNhbGxiYWNrIHJldHVybnMgdGhlIHJlc3BvbnNlIGZyb20gdGhlIEFQSSwgZ2l2aW5nIGEgbGlzdCBvZiBhbGwgdGhlIHZpZGVvcyBmcm9tIHRoZSBzZWFyY2hRdWVyeVxuICAgICAgICAvLyBTZXRzIHRoZSBzdGF0ZSBqc29uUmVzcG9uc2UgdG8gdGhlIHJldHVybmVkIHJlc3BvbnNlIGZyb20gdGhlIEFQSVxuICAgICAgICBpZiAocmVzcG9uc2UuaXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2pzb25SZXNwb25zZTogcmVzcG9uc2V9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBSZXNldCBqc29uUmVzcG9uc2UgdG8gdW5kZWZpbmVkIGlmIG5vIG1hdGNoaW5nIHJlc3VsdHMgZm9yIHJlc3BlY3RpdmUgcGxhY2Vob2xkZXJcbiAgICAgICAgZWxzZSBpZiAocmVzcG9uc2UuaXRlbXMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtqc29uUmVzcG9uc2U6ICdlbXB0eSd9KTtcbiAgICAgICAgfVxuICAgICAgfS5iaW5kKHRoaXMpKVxuICAgIH0uYmluZCh0aGlzKSk7XG4gIH0sXG5cbiAgaGFuZGxlU3VibWl0OiBmdW5jdGlvbihlKSB7XG4gICAgLy8gUmVtb3ZlcyB0aGUgZm9ybSdzIGRlZmF1bHQncyBwcm9wZXJ0eSBvZiB1cmwgcmVkaXJlY3Rpb25cbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwodGhpcy5zZWFyY2hNZWRpYSwgMCk7XG4gIH0sXG5cbiAgaGFuZGxlQ2hhbmdlOiBmdW5jdGlvbihlKSB7XG4gICAgLy8gU2V0cyB0aGUgc3RhdGUgb2YganNvbiB0byBzZWFyY2hpbmcgKHdpbGwgYmUgb3ZlcnJpZGVuIHdpdGggc2VhcmNoTWVkaWEgaW4gMjAwbXMpXG4gICAgdGhpcy5zZXRTdGF0ZSh7anNvblJlc3BvbnNlOiAnbG9hZGluZyd9KTtcblxuICAgIC8vIFNldHMgdGhlIHN0YXRlIG9mIHRoZSBTZWFyY2ggUXVlcnlcbiAgICB0aGlzLnNldFN0YXRlKHtzZWFyY2hRdWVyeTogZS50YXJnZXQudmFsdWV9LCBmdW5jdGlvbigpIHtcbiAgICAgIC8vIFJlY2xlYXJzIHRoZSB0aW1lciB0byByZXN0YXJ0IGF0IDAgYWdhaW4gdW50aWwgMjAwIG1pbGxpc2Vjb25kcywgdGhlbiBzZWFyY2hNZWRpYSBnZXRzIGNhbGxlZFxuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCh0aGlzLnNlYXJjaE1lZGlhLCA1MDApO1xuICAgIH0pO1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgLy8gUHJlcGFyZXMgZWFjaCBtZWRpYSBlbnRyeS4gV2hlbmV2ZXIgYSBTdGF0ZSBjaGFuZ2VzLCBwb3B1bGF0ZXMgdGhlIHZhbHVlcyBpbiBlYWNoIE1lZGlhIEVudHJ5IGZyb20gdGhlIGpzb25SZXNwb25zZSBnaXZlbiBmcm9tIHRoZSBZb3V0dWJlQVBJXG4gICAgdmFyIHNlYXJjaEVudHJpZXMgPSBbXTtcbiAgICB2YXIganNvbiA9IHRoaXMuc3RhdGUuanNvblJlc3BvbnNlO1xuICAgIHZhciBxdWVyeSA9IHRoaXMuc3RhdGUuc2VhcmNoUXVlcnk7XG5cbiAgICAvLyBwdXNoZXMgcGxhY2Vob2xkZXIgZGl2IGludG8gc2VhcmNoRW50cmllcyBpZiBsaXN0IGlzIGVtcHR5XG4gICAgaWYgKHF1ZXJ5ID09PSAnJyB8fCBxdWVyeSA9PT0gdW5kZWZpbmVkIHx8IHF1ZXJ5ID09PSBudWxsKSB7XG4gICAgICBzZWFyY2hFbnRyaWVzLnB1c2goXG4gICAgICAgIDxTZWFyY2hQbGFjZUhvbGRlciBrZXk9eydTZWFyY2hQbGFjZUhvbGRlcid9IC8+XG4gICAgICApXG4gICAgfVxuXG4gICAgLy8gd2hlbmV2ZXIgdGhlcmUgaXMgYSBjaGFuZ2UgaW4gcXVlcnksIHB1c2ggbG9hZGluZyBpY29uXG4gICAgZWxzZSBpZiAoanNvbiA9PSAnbG9hZGluZycpIHtcbiAgICAgIHNlYXJjaEVudHJpZXMucHVzaChcbiAgICAgICAgPFNlYXJjaExvYWQga2V5PXsnU2VhcmNoTG9hZCd9IC8+XG4gICAgICApXG4gICAgfVxuXG4gICAgLy8gaWYgc2VhcmNoIHJldHVybnMgbm8gcmVzdWx0cywgcHVzaGVzIGVtcHR5IHNlYXJjaCBwbGFjZWhvbGRlclxuICAgIGVsc2UgaWYgKGpzb24gPT0gJ2VtcHR5Jykge1xuICAgICAgc2VhcmNoRW50cmllcy5wdXNoKFxuICAgICAgICA8U2VhcmNoRW1wdHkga2V5PXsnU2VhcmNoRW1wdHknfSAvPlxuICAgICAgKVxuICAgIH1cblxuICAgIC8vIGlmIGdlbmVyYXRlZCBsaXN0IGhhcyBlbGVtZW50cywgZGlzcGxheSB0aGVtXG4gICAgZWxzZSBpZiAoanNvbiAhPT0gXCJcIiAmJiBqc29uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHZhciBqc29uSXRlbTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBqc29uLml0ZW1zLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGpzb25JdGVtID0ganNvbi5pdGVtc1tpXTtcbiAgICAgICAgc2VhcmNoRW50cmllcy5wdXNoKFxuICAgICAgICAgIDxNZWRpYUVudHJ5IFxuICAgICAgICAgICAga2V5PXtqc29uSXRlbS5pZC52aWRlb0lkfSBcbiAgICAgICAgICAgIHBvcz17aX0gXG4gICAgICAgICAgICBtZWRpYUlkPXtqc29uSXRlbS5pZC52aWRlb0lkfSBcbiAgICAgICAgICAgIGNhdGVnb3J5VHlwZT17J1NFQVJDSCd9XG4gICAgICAgICAgICBtZWRpYVR5cGU9eydZT1VUVUJFJ31cbiAgICAgICAgICAgIHRodW1ibmFpbD17anNvbkl0ZW0uc25pcHBldC50aHVtYm5haWxzLm1lZGl1bS51cmx9IFxuICAgICAgICAgICAgdGl0bGU9e2pzb25JdGVtLnNuaXBwZXQudGl0bGV9XG4gICAgICAgICAgICBhcnRpc3Q9e2pzb25JdGVtLnNuaXBwZXQuY2hhbm5lbFRpdGxlfSBcbiAgICAgICAgICAgIGlmTWVkaWFDYXJkQWRkZWQ9e2ZhbHNlfSBcbiAgICAgICAgICAgIHVzZXI9e3RoaXMucHJvcHMudXNlcn1cbiAgICAgICAgICAgIG15UGxheWxpc3RzPXt0aGlzLnByb3BzLm15UGxheWxpc3RzfSAvPiBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2gtY29udGFpbmVyXCI+XG4gICAgICAgICAgPGZvcm0gaWQ9J3NlYXJjaC1mb3JtJyBjbGFzc05hbWU9XCJzZWFyY2gtaW5wdXQgc2VhcmNoLWlucHV0LWRyb3Bkb3duXCIgb25TdWJtaXQ9e3RoaXMuaGFuZGxlU3VibWl0fT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cImNoYXQtdGV4dGJveFwiIGlkPSdzZWFyY2gtbWVkaWEtaW5wdXQnIG5hbWU9XCJcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaCBZb3V0dWJlLi4uXCIgdHlwZT1cInRleHRcIiBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9IC8+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXAtYnRuXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0IGRyb3Bkb3duLXRvZ2dsZVwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPlxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEteW91dHViZS1wbGF5IGRyb3Bkb3duLWljb25cIj48L2k+XG4gICAgICAgICAgICAgICAgICBZb3V0dWJlXG4gICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1hbmdsZS1kb3duIGRyb3Bkb3duLWFycm93XCI+PC9pPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJkcm9wZG93bi1tZW51IGRyb3Bkb3duLW1lbnUtcmlnaHRcIj5cbiAgICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEteW91dHViZS1wbGF5XCI+PC9pPllvdXR1YmU8L2E+PC9saT5cbiAgICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtdmltZW9cIj48L2k+VmltZW88L2E+PC9saT5cbiAgICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtc291bmRjbG91ZFwiPjwvaT5Tb3VuZENsb3VkPC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiPjxpIGNsYXNzTmFtZT1cImZhIGZhLXNwb3RpZnlcIj48L2k+U3BvdGlmeTwvYT48L2xpPlxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9mb3JtPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc2VhcmNoLW1lZGlhLWNvbnRhaW5lcic+XG4gICAgICAgICAge3NlYXJjaEVudHJpZXN9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxuYXYgYXJpYS1sYWJlbD1cInBhZ2UgbmF2aWdhdGlvblwiPlxuICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJwYWdpbmF0aW9uXCI+XG4gICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiZGlzYWJsZWRcIj48YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgYXJpYS1sYWJlbD1cIlByZXZpb3VzXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtYW5nbGUtbGVmdFwiPjwvaT48L2E+PC9saT5cbiAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJhY3RpdmVcIj48YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+MTwvYT48L2xpPlxuICAgICAgICAgICAgPGxpPjxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIj4yPC9hPjwvbGk+XG4gICAgICAgICAgICA8bGk+PGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiPjM8L2E+PC9saT5cbiAgICAgICAgICAgIDxsaT48YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgYXJpYS1sYWJlbD1cIk5leHRcIj48aSBjbGFzc05hbWU9XCJmYSBmYS1hbmdsZS1yaWdodFwiPjwvaT48L2E+PC9saT5cbiAgICAgICAgICA8L3VsPlxuICAgICAgICA8L25hdj5cblxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gU2VhcmNoOyIsIi8qICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIENvcHlyaWdodCDCqSBcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBTdGF0dXNCYXIuanN4XG5cbiAgICBDb21wb25lbnQgb2YgdGhlIHN0YXR1cyBiYXIuXG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBQbGF5UGF1c2VCdXR0b24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPGRpdiBpZD0ncGxheS1wYXVzZS1idXR0b24nPlxuICAgICAgICA8YnV0dG9uPlBsYXk8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbj5QYXVzZTwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbnZhciBFbGFwc2VkVGltZUJhciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZWxhcHNlZFRpbWU6IDBcbiAgICB9O1xuICB9LFxuXG4gIG9uRWxhcHNlZFRpbWVCYXJDaGFuZ2U6IGZ1bmN0aW9uKCkge1xuICAgIC8vIFRPRE86IENoYW5nZSB0byBhbGwgbWVkaWEgdHlwZXNcbiAgICB0aGlzLnNldFN0YXRlKHtlbGFwc2VkVGltZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lZGlhLWVsYXBzZWQtdGltZS1zbGlkZXInKS52YWx1ZX0sIGZ1bmN0aW9uKCkge1xuICAgICAgb25FbGFwc2VkVGltZUJhckNoYW5nZSh0aGlzLnN0YXRlLmVsYXBzZWRUaW1lKTsgIFxuICAgIH0pO1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPGRpdj5cbiAgICAgICAgRWxhcHNlZFxuICAgICAgICA8aW5wdXQgaWQ9J21lZGlhLWVsYXBzZWQtdGltZS1zbGlkZXInIHR5cGU9J3JhbmdlJyBtaW49JzAnIG1heD0nMTAwJyB2YWx1ZT17dGhpcy5zdGF0ZS5lbGFwc2VkVGltZX0gc3RlcD0nMScgb25DaGFuZ2U9e3RoaXMub25FbGFwc2VkVGltZUJhckNoYW5nZX0vPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cbnZhciBWb2x1bWVTbGlkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZvbHVtZTogMTAwXG4gICAgfTtcbiAgfSxcblxuICBvblZvbHVtZUJhckNoYW5nZTogZnVuY3Rpb24oKSB7XG4gICAgLy8gVE9ETzogQ2hhbmdlIHRvIGFsbCBtZWRpYSB0eXBlc1xuICAgIHRoaXMuc2V0U3RhdGUoe3ZvbHVtZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lZGlhLXZvbHVtZS1zbGlkZXInKS52YWx1ZX0sIGZ1bmN0aW9uKCkge1xuICAgICAgeW91dHViZVZvbHVtZUNoYW5nZSh0aGlzLnN0YXRlLnZvbHVtZSk7XG4gICAgfSk7XG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuKFxuICAgICAgPGRpdj5cbiAgICAgICAgVm9sdW1lXG4gICAgICAgIDxpbnB1dCBpZD0nbWVkaWEtdm9sdW1lLXNsaWRlcicgdHlwZT0ncmFuZ2UnIG1pbj0nMCcgbWF4PScxMDAnIHZhbHVlPXt0aGlzLnN0YXRlLnZvbHVtZX0gc3RlcD0nMScgb25DaGFuZ2U9e3RoaXMub25Wb2x1bWVCYXJDaGFuZ2V9Lz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG52YXIgU3RhdHVzQmFyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPSdzdGF0dXMtYmFyJz5cbiAgICAgICAgU3RhdHVzQmFyXG4gICAgICAgIDxQbGF5UGF1c2VCdXR0b24gLz5cbiAgICAgICAgPEVsYXBzZWRUaW1lQmFyIC8+XG4gICAgICAgIDxWb2x1bWVTbGlkZXIgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0YXR1c0JhcjsiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgVmlld09wZW5lZFBsYXlsaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybihcbiAgICAgIDxkaXYgaWQ9XCJvcGVuLXBsYXlsaXN0XCIgY2xhc3NOYW1lPVwidGFiLXBhbmUgZmFkZVwiPlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3Blbi1wbGF5bGlzdC1jb250YWluZXJcIj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFiLXBhZ2UtaGVhZGVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYi1wYWdlLXRleHQtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImljb24tYnRuXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiPjxkaXYgY2xhc3NOYW1lPVwidGFiLXBhZ2UtYmFjay1idG5cIj48aSBjbGFzc05hbWU9XCJmYSBmYS1sZyBmYS1jaGV2cm9uLWNpcmNsZS1sZWZ0XCI+PC9pPjwvZGl2PjwvYT5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWItcGFnZS10aXRsZVwiPnt0aGlzLnByb3BzLm5hbWV9PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFiLXBhZ2UtY3VyYXRvclwiPlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImN1cmF0b3ItbGlua1wiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIj57dGhpcy5wcm9wcy5vd25lcn08L2E+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYi1wYWdlLXJpZ2h0LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYi1wYWdlLWljb24tY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwaWxsXCI+e3RoaXMucHJvcHMuc2l6ZX0gSXRlbXM8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGZvcm0gY2xhc3NOYW1lPVwic2VhcmNoLWlucHV0XCI+XG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaCBpbiBQbGF5bGlzdC4uLlwiLz5cbiAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFZpZXdPcGVuZWRQbGF5bGlzdDsiXX0=
