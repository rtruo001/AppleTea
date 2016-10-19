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
    deletedPlaylist: null
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
    POST request

    Sends in the response that the playlist is deleted
    ========================================================================== */
router.post('/delete', [isLoggedIn, deletePlaylistFromDB], function(req, res) {
  res.send({
    data: "Deleting playlist " + req.body._id,
    deletedPlaylist: req.deletedPlaylist
  });
});

module.exports = router;