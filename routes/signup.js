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

/* GET signup page. */
router.get('/', function(req, res, next) {
  res.render('Signup', { 
    message: 'signupMessage'
  });
});

/* POST For when the form is submitted. */
router.post('/',
  passport.authenticate('local-signup', { 
    successRedirect: '/',
    failureRedirect: '/signup'
  })
);

module.exports = router;
