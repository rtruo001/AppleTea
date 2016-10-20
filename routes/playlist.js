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


