/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    app.js

    The server side used in www. Sets up all the middleware and routes.
    ========================================================================== */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var assert = require('assert');

// Authentication
var passport = require('passport');
var session = require('express-session');
// var MongoDBStore = require('connect-mongodb-session')(session);

var LocalStrategy = require('passport-local').Strategy;

// USE THIS ERRORHANDLER
var errorHandler = require('errorhandler');

// Potentially used to render through the client side with the server side code.
// var browserify = require('browserify');
// var literalify = require('literalify');

// MongoDB
var mongoose = require('mongoose');
// var db = require('./bin/database');

// configuration ===============================================================
mongoose.connect('mongodb://localhost:27017/Appletea'); // connect to our database

var app = express();

// View, React
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// More middlware
// TODO: favicon needs to be updated
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Public files including css and javascripts
app.use('/css', express.static(__dirname + '/public/stylesheets'));
app.use('/js', express.static(__dirname + '/public/javascripts'));
app.use(express.static(path.join(__dirname, 'public')));

// Passport
// var store = new MongoDBStore({
//   uri: 'mongodb://localhost:27017/Appletea',
//   collection: 'Sessions'
// });

// // Catch errors
// store.on('error', function(error) {
//   assert.ifError(error);
//   assert.ok(false);
// });

// passport.use(new LocalStrategy(function(username, password, done) {
//   db.get().collection("Users").findOne({ "username" : username }, function (err, user) {
//     console.log(user);
//     if (err) { 
//       return done(err); 
//     }
//     if (!user || user.length <= 0) {
//       console.log("Incorrect username");
//       return done(null, false, { message: 'Incorrect username.' });
//     }
//     if (password != user.password) {
//       console.log("Incorrect password");
//       return done(null, false, { message: 'Incorrect password.' });
//     }
//     return done(null, user);
//   });
// }));

// passport.serializeUser(function(user, cb) {
//   console.log("Serializing");
//   cb(null, user.username);
// });

// passport.deserializeUser(function(username, cb) {
//   console.log("Deserializing");
//   db.get().collection("Users").findOne({"username" : username}, function (err, user) {
//     console.log(user);
//     if (err) { return cb(err); }
//     cb(null, user);
//   });
// });

// session secret
// app.use(session({ 
//   store: store,
//   secret: 'Secret',
//   resave: false,
//   saveUninitialized: false
// })); 

// Passport
require('./config/passport')(passport);

app.use(session({ 
  secret: 'Secret',
  resave: false,
  saveUninitialized: false
})); 
app.use(passport.initialize());
// persistent login sessions
app.use(passport.session()); 

// Routes
var routes = require('./routes/index');
// var users = require('./routes/users');
var login = require('./routes/login');
var signup = require('./routes/signup');
var logout = require('./routes/logout');

// Use the routers
app.use('/', routes);
// app.use('/users', users);
app.use('/login', login);
app.use('/signup', signup);
app.use('/logout', logout);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(errorHandler());

  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

console.log("App.js ending");

// module.exports = {
//   app: app,
//   db: db
// };

module.exports = {
  app: app
};

