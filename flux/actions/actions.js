var AppDispatcher = require('../dispatcher/AppDispatcher');
var constants = require('../constants');

var EditPlaylistActions = {
  displayPlaylist: function(index, mediaEntries) {
  	console.log("displaying playlist in actions");
    AppDispatcher.handleAction({
      actionType: constants.EDITPLAYLIST,
      index: index,
      entries: mediaEntries
    });
  }
};

module.exports = EditPlaylistActions;