/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    CONFIG: passport.js

    Handles passport as an object that can be used throughout the project.
    Passport aids in authentication and authorization.

    Huge thanks to Chris Sevilleja.
    Tutorial: https://scotch.io/tutorials/easy-node-authentication-setup-and-local
    Reference code: https://github.com/scotch-io/easy-node-authentication/blob/master/config/passport.js
    ========================================================================== */
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var User = require('../models/user');

// expose this function to our app using module.exports
module.exports = function(passport) {

  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    console.log("Serializing");
    console.log(user.id);
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    console.log("Deserializing");
    console.log(id);
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with username
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },

  function(req, username, password, done) {
    // asynchronous
    // User.findOne wont fire unless data is sent back
    process.nextTick(function() {

      // find a user whose username is the same as the forms username
      // we are checking to see if the user trying to login already exists
      User.findOne({ 'local.email' :  username }, function(err, user) {
        // if there are any errors, return the error
        if (err)
          return done(err);

        // check to see if theres already a user with that username
        if (user) {
          // TODO: Error out with something
          return done(null, false);
        } 
        else {
          // if there is no user with that username
          // create the user
          var newUser = new User();

          // set the user's local credentials
          newUser.local.email = username;
          newUser.local.password = newUser.generateHash(password);
          newUser.local.firstName = req.body.firstName;
          newUser.local.lastName = req.body.lastName;
          newUser.nickname = req.body.firstName + " " + req.body.lastName;

          // save the user
          newUser.save(function(err) {
            if (err)
                throw err;
            return done(null, newUser);
          });
        }

      });    

    });
  }));

  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-login', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with username
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, username, password, done) { // callback with username and password from our form

    // find a user whose username is the same as the forms username
    // we are checking to see if the user trying to login already exists
    User.findOne({ 'local.email' :  username }, function(err, user) {
      // if there are any errors, return the error before anything else
      if (err)
        return done(err);

      // if no user is found, return the message
      if (!user)
        // TODO: Error out with something
        return done(null, false, function() { console.log("Error") }); // req.flash is the way to set flashdata using connect-flash

      // if the user is found but the password is wrong
      if (!user.validPassword(password))
        // TODO: Error out with something
        return done(null, false, function() { console.log("Error") }); // create the loginMessage and save it to session as flashdata

      // all is well, return successful user
      return done(null, user);
    });

  }));

};