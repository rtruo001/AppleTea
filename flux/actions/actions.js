var AppDispatcher = require('../dispatcher/AppDispatcher');
var constants = require('../constants');

var EditPlaylistActions = {
  displayPlaylist: function(_id, index, mediaEntries) {
  	console.log("displaying playlist in actions");
    AppDispatcher.handleAction({
      actionType: constants.EDITPLAYLIST,
      _id: _id,
      index: index,
      entries: mediaEntries
    });
  }
};

module.exports = EditPlaylistActions;