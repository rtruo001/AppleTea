/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    MODEL: playlist.js

    Playlist schema for Mongoose. Ensures the playlist data fits this schema.
    ========================================================================== */
var mongoose = require('mongoose');

var playlistSchema = mongoose.Schema(
  {
    name              : String,
    owner             : String,
    playlistId        : Number,
    isPublic          : Boolean,
    likes             : Number,
    mediaEntries: [{
      artist          : String,
      mediaId         : String,
      mediaType       : String,
      thumbnail       : String,
      title           : String
    }]
  }
);

// NOTE: Apparently the string doesn't detect any capital letters.
module.exports = mongoose.model('playlists', playlistSchema);

// Used as quick copy and paste for inserting data into database
/*
  {
    name: "CHILL1",
    owner: "MeSoRanz",
    playlistId: 1,
    isPublic: false,
    likes: 7,
    mediaEntries: [
      {
        mediaType: "Youtube",
        id: "DvZq-Zk5zEY"
      }
    ]
  }
  {
    name: "CHILL2",
    owner: "MeSoRanz",
    playlistId: 2,
    isPublic: true,
    likes: 57,
    mediaEntries: [
      {
        mediaType: "Youtube",
        id: "DvZq-Zk5zEY"
      },
      {
        mediaType: "Youtube",
        id: "DvZq-Zk5zEY"
      }
    ]
  }
*/