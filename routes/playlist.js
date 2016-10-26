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

    Deletes the given playlist from the database
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

  // Playlist.findByIdAndUpdate(
  //   data.id,
  //   {$set: {"mediaEntries": [data.mediaData]}},
  //   {new: true},
  //   function(err, updatedPlaylist) {
  //     if (err) {
  //       throw err;
  //     }
  //     console.log(updatedPlaylist);
  //     socket.emit("From Server: Update selected playlist", updatedPlaylist);
  //   }
  // );


  // Tank.findByIdAndUpdate(id, { $set: { size: 'large' }}, { new: true }, function (err, tank) {
  //   if (err) return handleError(err);
  //   res.send(tank);
  // });
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

module.exports = router;


