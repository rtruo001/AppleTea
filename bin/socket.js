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
  console.log("Starting sockets");
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(socket) {
  console.log("IO connected");

  // When client receives a user and sends to server, emits the message to client
  socket.on('From Client: Add user', function(user) {
    console.log("User connected");
    socket.username = user;
    io.emit("From Server: User joined", {
      username: user
    });
  });

  // When a user exits chat room, send to client that user has left
  socket.on('disconnect', function(){
    // If random nonuser is on webpage and sees the chat
    if (!socket.username || socket.username.length === 0) {
      return;
    }
    console.log("User disconnected");
    io.emit("From Server: User disconnected", {
      username: socket.username
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
});
}

module.exports = startSockets;