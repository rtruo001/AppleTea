var AppDispatcher = require('../dispatcher/AppDispatcher');
var constants = require('../constants');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';
var EVENT_DELETE_PLAYLIST = 'EVENT_DELETE_PLAYLIST';
var EVENT_UPDATE_PLAYLIST = 'EVENT_UPDATE_PLAYLIST';

var store = {
  _id: null,
	index: null,
  entries: null,
  playlistDeleted: null,
  updatedPlaylist: null
};

var displayIndex = function(_id, newPos, mediaEntries) {
  store._id = _id;
  store.index = newPos;
  store.entries = mediaEntries;
};

var deletePlaylist = function(playlist) {
  store.playlistDeleted = playlist;
};

var updatePlaylist = function(playlist) {
  store.updatedPlaylist = playlist;
};

var AppStore = objectAssign({}, EventEmitter.prototype, { 
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  addDeletePlaylistListener: function(callback) {
    this.on(EVENT_DELETE_PLAYLIST, callback);
  },
  addUpdatePlaylistListener: function(callback) {
    this.on(EVENT_UPDATE_PLAYLIST, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  removeDeletePlaylistListener: function(callback) {
    this.removeListener(EVENT_DELETE_PLAYLIST, callback);
  },
  removeUpdatePlaylistListener: function(callback) {
    this.removeListener(EVENT_UPDATE_PLAYLIST, callback);
  },

  getId: function() {
    return store._id;
  },
  getIndex: function() {
    return store.index;
  },
  getEntries: function() {
    return store.entries;
  },
  getPlaylistDeleted: function() {
    return store.playlistDeleted;
  },
  getUpdatedPlaylist: function() {
    return store.updatedPlaylist;
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.actionType) {
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
    default:
      console.log("Flux/store.js: NOT SUPPOSE TO BE HERE");
      console.log(action);
      return true;
  }
});

module.exports = AppStore;