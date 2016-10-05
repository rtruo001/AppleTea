var AppDispatcher = require('../dispatcher/AppDispatcher');
var constants = require('../constants');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var store = {
	index: null,
  entries: null
};

var displayIndex = function(newPos, mediaEntries) {
  store.index = newPos;
  store.entries = mediaEntries;
}

var AppStore = objectAssign({}, EventEmitter.prototype, { 
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  getIndex: function() {
    return store.index;
  },
  getEntries: function() {
    return store.entries;
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.actionType) {
    case constants.EDITPLAYLIST:
      console.log("Action payload: EDITPLAYLISTS")
      displayIndex(action.index, action.entries);
      AppStore.emit(CHANGE_EVENT);
      break;
    default:
      console.log("NOT SUPPOSE TO BE HERE");
      return true;
  }
});

module.exports = AppStore;