/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    ROUTE: room.js

    For URL path: '/room'
    ========================================================================== */
var express = require('express');
var router = express.Router();

var React = require('react');

// Playlist Schema
var Playlist = require('../models/playlist');
var Room = require('../models/room');

var RoomsManager = require('../config/classes/AllRooms').getObj();

/*  =============================================================================
    Function checkIfValidRoom

    The first middleware called when the index route is called. Checks if the url's
    room exists, if it does goes to to it, if it does not errors out
    ========================================================================== */
function checkIfValidRoom(req, res, next) {
  if (RoomsManager.ifRoomExist(req.params.roomId)) {
    next();
  }
  // TODO: Error page or error out
  else {
    res.render('error', {
      message: 'Room does not exist'
    });
  }
}

/*  =============================================================================
    Function loadExplore

    The second middleware called when the index route is called. Loads the public
    playlists for the Explore tab. Uses the Mongoose playlist model.
    ========================================================================== */
function loadExplore(req, res, next) {
  console.log('Middleware: loadExplore ==============================');

  // Finds all public playlists in the database
  // TODO: implement indexing
  Playlist.find({ 'isPublic' : true }, function(err, playlists) {
    if (err) {
      console.log('ERROR: Problem in loading playlists for the Explore');
    }
    else if (playlists.length > 0 && playlists != null && playlists != undefined) {
      console.log(playlists);
      req.explore = playlists; 
    }
    else {
      console.log("Explore: No public playlists");
    }
    return next();
  });
}

/*  =============================================================================
    Function isLoggedIn

    The third middleware called after loadExplore. Checks to see if a user is
    logged in or not.
    ========================================================================== */
function isLoggedIn(req, res, next) {
  console.log('Middleware: isLoggedIn ===============================');

  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  return next();
  // res.redirect('/login');
}

/*  =============================================================================
    Function loadMyPlaylists

    The 4th middleware called after isLoggedIn. Loads all of the user's playlists
    into the My Playlist tab.
    ========================================================================== */
function loadMyPlaylists(req, res, next) {
  console.log('Middleware: loadMyPlaylists ==========================');

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

/*  =============================================================================
    Function createNewRoom

    Creates a new room with a given id
    ========================================================================== */
function createNewRoom(req, res, next) {
  ("Middleware: createNewRoom ===================================");
  if (req.body.roomName === undefined || req.body.roomName === null) {
    throw "Undefined room name";
  }
  var newRoom = new Room();

  newRoom.name = req.body.roomName;
  newRoom.owner = req.body.owner;
  // TODO: isPublic should be data.isPublic
  newRoom.isPublic = true;

  newRoom.save(function(err, room) {
    if (err) {
      throw err;
    }
    console.log("===================================");
    console.log("Added Room entry to Rooms");
    console.log(room);
    
    RoomsManager.newRoom(room.id, room.name);
    req.roomId = room.id;
    return next();
  });
}

/*  =============================================================================
    POST request

    Sends the roomId back to the client to load the URL
    ========================================================================== */
router.post('/create', [createNewRoom], function(req, res, next) {
  res.send({
    roomId: req.roomId
  });
});

/*  =============================================================================
    GET request

    Renders the index page with the given data from mongoose
    ========================================================================== */
router.get('/:roomId', [checkIfValidRoom, loadExplore, isLoggedIn, loadMyPlaylists], function(req, res, next) {
  console.log('Routing: /room');
  console.log('USER ==========================================');
  console.log(req.user);
  console.log('EXPLORE =======================================');
  console.log(req.explore);
  console.log('MY PLAYLIST ===================================');
  console.log(req.myPlaylists);
  console.log('===============================================');

  var userData = req.user;
  if (userData !== undefined && userData !== null) {
    console.log("hide password");
    userData.local.password = undefined;  
    console.log(req.user);
  }

  var roomData = {roomId: req.params.roomId};
  roomData.name = RoomsManager.getRoom(req.params.roomId).getRoomName();
  
  res.render('RoomIndex', { 
    roomData: ({ 
      room: roomData,
      user: userData,
      explore: req.explore,
      myPlaylists: req.myPlaylists
    })
  });
});

module.exports = router;
