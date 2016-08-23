/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    ROUTE: logout.js

    For URL path: '/logout'
    ========================================================================== */
var express = require('express');
var router = express.Router();

// GET request, logs the current user out and redirects to the index
router.get('/', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;