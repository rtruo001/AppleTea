var AppDispatcher = require('../dispatcher/AppDispatcher');
var constants = require('../constants');

var EditPlaylistActions = {
  displayPlaylist: function(_id, index, mediaEntries) {
    AppDispatcher.handleAction({
      actionType: constants.EDITPLAYLIST,
      _id: _id,
      index: index,
      entries: mediaEntries
    });
  },

  deletePlaylist: function(playlist) {
    AppDispatcher.handleAction({
      actionType: constants.DELETEPLAYLIST,
      playlistDeleted: playlist
    });
  },

  updatePlaylist: function(playlist) {
    AppDispatcher.handleAction({
      actionType: constants.UPDATEPLAYLIST,
      updatedPlaylist: playlist
    });
  },

  createPlaylist: function(playlist) {
    AppDispatcher.handleAction({
      actionType: constants.CREATEPLAYLIST,
      createdNewPlaylist: playlist
    });
  }
};

module.exports = EditPlaylistActions;