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
    successRedirect: '/',
    failureRedirect: '/'
  })
);

module.exports = router;
