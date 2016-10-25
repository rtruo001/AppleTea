/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    ROUTE: logout.js

    For URL path: '/logout'
    ========================================================================== */
var express = require('express');
var router = express.Router();

var RoomManager = require('../config/classes/AllRooms').getObj();

// Schemas
var Playlist = require('../models/playlist');
var Room = require('../models/room');

/*  =============================================================================
    Function isLoggedIn

    The middleware called after loadExplore. Checks to see if a user is
    logged in or not.
    ========================================================================== */
function isLoggedIn(req, res, next) {
  console.log('Middleware: isLoggedIn ===============================');

  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated()) {
    return next();
  }

  res.render('error', {
    message: 'Not logged in'
  });
}

/*  =============================================================================
    Function loadMyRooms

    Loads all of the user's curated rooms
    ========================================================================== */
function loadMyRooms(req, res, next) {
  console.log('Middleware: loadMyRooms ===============================');
  // Finds all public playlists in the database
  // TODO: implement indexing
  Room.find({ 'owner' : req.user.local.email}, function(err, rooms) {
    if (err) {
      console.log('ERROR: Problem in loading rooms');
    }
    else if (rooms.length > 0 && rooms != null && rooms != undefined) {
      var room;
      req.rooms = rooms; 
      for (var i = 0; i < rooms.length; ++i) { 
        // NOTE: Need the property "inRoom" in the mongoose schema. Mongoose definitely doesn't allow
        // changes to the schema. Interesting.
        room = RoomManager.getRoom(rooms[i]._id);
        req.rooms[i].inRoom = room.getNumOfUsersInRoom();
        req.rooms[i].thumbnail = room.getRoomThumbnail();
      }
      console.log(req.rooms);
    }
    else {
      console.log(req.user.local.email + " has no Rooms");
    }
    return next();
  });
}

/*  =============================================================================
    Function loadMyPlaylists

    The middleware called after isLoggedIn. Loads all of the user's playlists
    into the My Playlist tab.
    ========================================================================== */
function loadMyPlaylists(req, res, next) {
  console.log('Middleware: loadMyPlaylists ===============================');
  if (req.user === undefined || req.user === null) {
    req.user = undefined;
    return next();
  }

  // Finds all public playlists in the database
  // TODO: implement indexing
  Playlist.find({ 'owner' : req.user.local.email}, function(err, playlists) {
    if (err) {
      console.log('ERROR: Problem in loading playlists for My Playlists');
    }
    else if (playlists.length > 0 && playlists != null && playlists != undefined) {
      console.log(playlists);
      req.myPlaylists = playlists; 
    }
    else {
      console.log("My Playlist: No playlists");
    }
    return next();
  });
}

// GET request, logs the current user out and redirects to the index
router.get('/', [isLoggedIn, loadMyRooms, loadMyPlaylists], function(req, res, next) {
  res.render('ProfileIndex.jsx', { 
    profileData: ({ 
      user: req.user,
      rooms: req.rooms,
      myPlaylists: req.myPlaylists
    })
  });
});

module.exports = router;