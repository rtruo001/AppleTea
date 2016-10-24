/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    MODEL: user.js

    User schema for Mongoose.
    Bcrypts is used for encryption since passwords should NEVER be stored
    ========================================================================== */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  local: {
    email        : String,
    password     : String,
    firstName    : String,
    lastName     : String
    // username : String
    // profilePic
  },
  facebook: {
    id           : String,
    token        : String,
    email        : String,
    name         : String
  },
  twitter: {
    id           : String,
    token        : String,
    displayName  : String,
    username     : String
  },
  google: {
    id           : String,
    token        : String,
    email        : String,
    name         : String
  },
  nickname       : String
});

// Generates a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Checks to see if the password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

// NOTE: Apparently the string doesn't detect any caps.
module.exports = mongoose.model('users', userSchema);