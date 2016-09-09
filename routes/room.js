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

require('../bin/AllRooms').initializeObj();
var RoomsManager = require('../bin/AllRooms').getObj();

function checkifValidRoom(req, res, next) {
  if (RoomsManager.ifRoomExist(req.params.roomId)) {
    next();
  }
  else {
    res.render('error', {
      message: 'Room does not exist'
    });
  }
}

/*  =============================================================================
    Function loadExplore

    The first middleware called when the index route is called. Loads the public
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

    The second middleware called after loadExplore. Checks to see if a user is
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

    The third middleware called after isLoggedIn. Loads all of the user's playlists
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
    GET request

    Renders the index page with the given data from mongoose
    ========================================================================== */
router.get('/:roomId', [checkifValidRoom, loadExplore, isLoggedIn, loadMyPlaylists], function(req, res, next) {
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
  
  // IMPORTANT TODO
  // TODO prevents XSS attacks
  // TODO: Remove stringify and instead do safestringify in index.jsx
  res.render('RoomIndex', { 
    user: userData,
    explore: req.explore,
    myPlaylists: req.myPlaylists,
    propsStr: JSON.stringify({ 
      user: userData,
      explore: req.explore,
      myPlaylists: req.myPlaylists
    })
  });
});

module.exports = router;
