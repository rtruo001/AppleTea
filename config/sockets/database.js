/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    database.js

    Sockets used to control the database
    ========================================================================== */
var Playlist = require('../../models/playlist');

var socketDatabase = function(io, socket) {

  // Creates a new playlist with either a media entry, or without
  socket.on('From Client: Create new playlist with data', function(data) {
    var newPlaylist = new Playlist();

    newPlaylist.name = data.name;
    newPlaylist.owner = data.owner;
    newPlaylist.playlistId = 1;
    newPlaylist.isPublic = data.isPublic;
    newPlaylist.likes = 0;
    newPlaylist.mediaEntries = [data.mediaEntry];

    newPlaylist.save(function(err) {
      if (err) {
        throw err;
      }
      console.log("===================================");
      console.log("Added media entry to a new playlist");
      console.log(newPlaylist);
      socket.emit("From Server: Update MyPlaylist with new playlists", newPlaylist);
    });
  });

  // Updates an existing playlist
  socket.on('From Client: Add to existing playlist', function(data) {
    console.log("===================================");
    console.log("Added media entry to an existing playlist");

    // This first check is due to Mongoose not allowing an empty array to be stored into the db
    // There will automatically be an element with just the _id datatype
    // To counteract that, if there are no media entries, then the first element would be null
    // This first if statement checks to see if there are no media entries.
    if (data.firstEntry === undefined || data.firstEntry === null) {
      Playlist.findByIdAndUpdate(
        data.id,
        {$set: {"mediaEntries": [data.mediaData]}},
        {new: true},
        function(err, updatedPlaylist) {
          if (err) {
            throw err;
          }
          console.log(updatedPlaylist);
          socket.emit("From Server: Update selected playlist", updatedPlaylist);
        }
      );
    }
    // There exists a media entry, which then appends the media into the end of the list.
    else {
      Playlist.findByIdAndUpdate(
        data.id,
        // TODO: Currently need to fix duplicates because _id is not the same, causing the addToSet function to think there are no duplicates.
        // {$addToSet: {"mediaEntries": data.mediaData}},
        {$push: {"mediaEntries": data.mediaData}},
        {new: true},
        function(err, updatedPlaylist) {
          if (err) {
            throw err;
          }
          console.log(updatedPlaylist);
          socket.emit("From Server: Update selected playlist", updatedPlaylist);
        }
      );
    } 
  });

};

module.exports = socketDatabase;