var mongoose = require('mongoose');

// define the schema for our user model
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

// create the model for users and expose it to our app
// NOTE: Apparently the string doesn't detect any caps.
module.exports = mongoose.model('playlists', playlistSchema);

