/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    ROUTE: index.js

    For URL path: '/'
    ========================================================================== */
var express = require('express');
var router = express.Router();

// Playlist Schema
var Playlist = require('../models/playlist');

/*  =============================================================================
    Function loadExplore

    The first middleware called when the index route is called. Loads the public
    playlists for the Explore tab. Uses the Mongoose playlist model.
    ========================================================================== */
function loadExplore(req, res, next) {
  console.log('Middleware: loadExplore');

  // Finds all public playlists in the database
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
  console.log('Middleware: isLoggedIn');

  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/login');
}

/* GET home page. */
router.get('/', [loadExplore, isLoggedIn], function(req, res, next) {
  console.log('Routing: /');
  console.log(req.user);
  console.log(req.explore);

  res.render('Index', { 
    title: 'AppleTea',
    data: req.user,
    explore: req.explore
  });
});

module.exports = router;
