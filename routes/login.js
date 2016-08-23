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

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('Login', { 
    titie: 'AppleTea'
  }); 
});

/* POST For when the form is submitted. */
router.post('/',
  passport.authenticate('local-login', { 
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

module.exports = router;
