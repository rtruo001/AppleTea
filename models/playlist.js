/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    MODEL: playlist.js

    Playlist schema for Mongoose. Ensures the playlist data fits this schema.
    ========================================================================== */
var mongoose = require('mongoose');

var playlistSchema = mongoose.Schema({
  playlist: {
    name              : String,
    owner             : String,
    playlistId        : Number,
    isPublic          : Boolean,
    likes             : Number,
    mediaEntries: [{
      type            : String,
      id              : String
    }]
  }
});

// NOTE: Apparently the string doesn't detect any capital letters.
module.exports = mongoose.model('playlists', playlistSchema);