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
var LocalStrategy = require('passport-local').Strategy;

// USE THIS ERRORHANDLER
var errorHandler = require('errorhandler');

// Potentially used to render through the client side with the server side code.
// var browserify = require('browserify');
// var literalify = require('literalify');

// Initializes the Room Manager
require('./config/classes/AllRooms').initializeObj();

// MongoDB
var mongoose = require('mongoose');

// configuration ===============================================================
// RANDY's LOCAL MONGODB
// mongoose.connect('mongodb://localhost:27017/Appletea'); 
// Mlab Testing
mongoose.connect('mongodb://randy:123@ds019856.mlab.com:19856/appletea-db');

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

// Public files for room
app.use('/room/css', express.static(__dirname + '/public/stylesheets'));
app.use('/room/js', express.static(__dirname + '/public/javascripts'));
app.use('/room', express.static(path.join(__dirname, 'public')));


// Passport and session
require('./config/passport')(passport);
app.use(session({ 
  secret: 'Secret',
  resave: false,
  saveUninitialized: false
})); 
app.use(passport.initialize());
app.use(passport.session()); 

// Routes
var routes = require('./routes/index');
var room = require('./routes/room');
var signin = require('./routes/signin');
var signup = require('./routes/signup');
var logout = require('./routes/logout');

// Use the routers
app.use('/', routes);
app.use('/room', room);
app.use('/signin', signin);
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

