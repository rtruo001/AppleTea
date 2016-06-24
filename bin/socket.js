/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    socket.js

    Client side functions of the chat system.
    ========================================================================== */

/*  =============================================================================
    Variables
    ========================================================================== */
var startSockets = function() {

/*  =============================================================================
     Creates the Chat Room and Media sync by using Socket.io.

    ========================================================================== */
// TODO: Trying to make another file for just socket usages from the server
// require('./socket')();

//Constant media states
const playerStates = {
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED'
};

//Variables for users
var numUsersConnected = 0;
var numUsersSignedInConnected = 0

//Variables for Media player
var ifMediaIsInitialized = false;
var mediaCurrentState = playerStates.PAUSED;
var mediaElapsedTime = 0;

var io = require('socket.io')(server);

io.on('connection', function(socket) {
  console.log("IO connected");
  ++numUsersConnected;

  /*  =============================================================================
      Chat
      ========================================================================== */

  // When client receives a user and sends to server, emits the message to client
  socket.on('From Client: Add user', function(user) {
    console.log(user + " has connected");
    ++numUsersSignedInConnected;

    socket.username = user;
    io.emit("From Server: User joined", {
      username: user
    });
  });

  // When a message is sent, sends the username and their message to the client
  socket.on('From Client: Chat message', function(msg){
    console.log(socket.username + ": "  + msg);
    io.emit('From Server: Chat message', {
      username: socket.username,
      message: msg
    });
  });

  /*  =============================================================================
      Youtube Video
      ========================================================================== */

  // Sets the variables for the server
  socket.on("From Client: Get media states",function(data) {
    socket.emit("From Server: Send media states", {
      initialized: ifMediaIsInitialized,
      state: mediaCurrentState,
      elapsedTime: mediaElapsedTime
    });
  });

  // Sends to all clients to get the elapsed time, prepares to save a random time for server
  socket.on("From Client: Get elapsed time", function(data) {
    io.emit("From Server: Get elapsed time", 1);
  });

  // Saves the last client's elapsed time into the server
  socket.on("From Client: Send elapsed time", function(time) {
    // When the time is 0, does not set the overall mediaElapsedTime to 0
    // Does this because every client is going to send in the time, and the 
    if (time == 0) {
      return;
    }
    mediaElapsedTime = time;
  });

  // When the media is first played, sets this to true
  socket.on('From Client: Initialized media', function(data) {
    ifMediaIsInitialized = true;
  });

  // Sets the state to PLAYING and sends to client to play media
  socket.on('From Client: Play media', function(data) {
    mediaCurrentState = playerStates.PLAYING;
    io.emit('From Server: Play media', 0);
  });  

  // Sets the state to PAUSED and sends to client to pause media
  socket.on('From Client: Pause media', function(data) {
    mediaCurrentState = playerStates.PAUSED
    io.emit('From Server: Pause media', 0);
  });

  // Resets the variables of the media
  socket.on('From Client: Reset media states', function(data) {
    ifMediaIsInitialized = false;
    mediaCurrentState = playerStates.PAUSED;
    mediaElapsedTime = 0;
  });

  // When a user exits chat room, send to client that user has left
  socket.on('disconnect', function() {
    --numUsersConnected;
    // --numUsersSignedInConnected;

    // If random nonuser is on webpage and sees the chat
    if (!socket.username || socket.username.length === 0) {
      console.log("A user disconnected");
      return;
    }
    
    // An actual user disconnects
    console.log(socket.username + " disconnected");
    io.emit("From Server: User disconnected", {
      username: socket.username
    });
  });
});

}

module.exports = startSockets;