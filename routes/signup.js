/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    ROUTE: signup.js

    For URL path: '/signup'
    ========================================================================== */
var express = require('express');
var router = express.Router();
var passport = require('passport');

/* POST For when the form is submitted. */
router.post('/',
  passport.authenticate('local-signup', { 
   	// Back redirects to the previous page that made the post
    successRedirect: 'back',
    failureRedirect: 'back'
  })
);

module.exports = router;
