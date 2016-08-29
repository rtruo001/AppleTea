/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    ROUTE: login.js

    For URL path: '/login'
    ========================================================================== */
var express = require('express');
var router = express.Router();
var passport = require('passport');

/* POST For when the form is submitted. */
router.post('/',
  passport.authenticate('local-login', { 
    successRedirect: '/',
    failureRedirect: '/'
  })
);

module.exports = router;
