var express = require('express');
var router = express.Router();

// Playlist schema
var Playlist = require('../models/playlist');

/*  =============================================================================
    Function isLoggedIn

    Check to see if user is logged in
    ========================================================================== */
function isLoggedIn(req, res, next) {
  console.log('Middleware: isLoggedIn ===============================');

  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated()) {
    return next();
  }

  res.send({
    data: null,
    deletedPlaylist: null,
    updatedPlaylist: null
  });
}

/*  =============================================================================
    Function createPlaylistFromDB

    Create a new playlist that is empty
    ========================================================================== */
function createPlaylistFromDB(req, res, next) {
  console.log("MongoDB: Create selected Playlist");
  var newPlaylist = new Playlist();
  var data = JSON.parse(req.body.data);

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
    req.newPlaylist = newPlaylist;
    // socket.emit("From Server: Update MyPlaylist with new playlists", newPlaylist);
    return next();
  });
}

/*  =============================================================================
    Function deletePlaylistFromDB

    Deletes the given playlist from the database
    ========================================================================== */
function deletePlaylistFromDB(req, res, next) {
  console.log("MongoDB: Delete selected Playlist");
  Playlist.findByIdAndRemove(req.body._id, {}, function(err, obj) {
    if (err) {
      console.log('ERROR: deletePlaylistFromDB');
      req.deletedPlaylist = null;
      return next(err);
    }
    req.deletedPlaylist = obj;
    return next();
  });
}

/*  =============================================================================
    Function updatePlaylistFromDB

    Updates the given playlist
    ========================================================================== */
function updatePlaylistFromDB(req, res, next) {
  console.log("MongoDB: Update selected Playlist");
  console.log(JSON.parse(req.body.mediaEntries));
  // TODO: Add updated playlist name
  Playlist.findByIdAndUpdate(
    req.body._id, 
    {$set: {"mediaEntries": JSON.parse(req.body.mediaEntries)}},
    {new: true},
    function(err, updatedPlaylist) {
      if (err) {
        console.log('ERROR: updatePlaylistFromDB');
        req.updatedPlaylist = null;
        return next(err);
      }
      console.log(updatedPlaylist);
      req.updatedPlaylist = updatedPlaylist;
      return next();
    }
  );
}

/*  =============================================================================
    Function pushMediaIntoPlaylist

    Pushes a media entry into the given playlist from the database
    ========================================================================== */
function pushMediaIntoPlaylist(req, res, next) {
  console.log("===================================");
  console.log("Added media entry to an existing playlist");
  var data = JSON.parse(req.body.data);

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
        req.updatedPlaylist = updatedPlaylist;
        return next();
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
        req.updatedPlaylist = updatedPlaylist;
        return next();
      }
    );
  } 
}

/*  =============================================================================
    POST request

    Sends in the response that the playlist is created
    ========================================================================== */
router.post('/create', [isLoggedIn, createPlaylistFromDB], function(req, res) {
  res.send({
    data: "Creating playlist",
    createdPlaylist: req.newPlaylist
  });
});

/*  =============================================================================
    POST request

    Sends in the response that the playlist is deleted
    ========================================================================== */
router.post('/delete', [isLoggedIn, deletePlaylistFromDB], function(req, res) {
  res.send({
    data: "Deleting playlist " + req.body._id,
    deletedPlaylist: req.deletedPlaylist
  });
});

/*  =============================================================================
    POST request

    Sends in the response that the playlist is updated
    ========================================================================== */
router.post('/update', [isLoggedIn, updatePlaylistFromDB], function(req, res) {
  res.send({
    data: "Updating playlist " + req.body._id,
    updatedPlaylist: req.updatedPlaylist,
  });
});

/*  =============================================================================
    POST request

    Sends in the response that the playlist is updated
    ========================================================================== */
router.post('/push/mediaEntry', [isLoggedIn, pushMediaIntoPlaylist], function(req, res) {
  res.send({
    data: "Push into playlist " + req.body._id,
    updatedPlaylist: req.updatedPlaylist,
  });
});

module.exports = router;


