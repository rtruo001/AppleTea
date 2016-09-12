/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    socket.js

    Every event handler of the sockets
    ========================================================================== */
var RoomManager = require('../classes/AllRooms').getObj();

// Exports the entire function to www
var startSockets = function(server) {

  // Constants
  var MEDIAPLAYER = require('../constants');
  // Mongoose Schema
  var Playlist = require("../../models/playlist");

  RoomManager.newRoom('Randy');
  RoomManager.newRoom('Gerard');
  RoomManager.newRoom('Harrison');

  // Users
  var numUsersConnected = 0;

  var io = require('socket.io')(server);
  io.on('connection', function(socket) {
    console.log("IO connected");
    ++numUsersConnected;
    
    socket.on('From Client: Initialize room' , function(roomId) {
      socket.join(roomId);
      socket.room = roomId;

      // This line right here is SO AMAZING
      socket.RoomObj = RoomManager.getRoom(roomId);

      // Initializes queue to the client that just joined
      socket.emit('From Server: Initialize Queue', socket.RoomObj.getQueue());

      if (socket.RoomObj.getPlayerMediaType() == MEDIAPLAYER.TYPES.NONE) {
        console.log("Currently nothing is playing from any clients");
        socket.emit('From Server: Initialize media player', {
          mediaType: MEDIAPLAYER.TYPES.NONE,
          mediaId: null,
          title: null,
          state: MEDIAPLAYER.STATES.NONE,
          elapsedTime: 0,
          ifAlreadySentFromClient: false
        });
      }
      // Initializes the media player for the client if the server currently is playing a media
      else {
        socket.broadcast.to(socket.room).emit('From Server: Get elapsed time for specific client', socket.id);
      }
    });

    // Chat
    require('./chat.js')(io, socket);

    // Media player
    require('./mediaPlayer.js')(io, socket);

    // Queue
    require('./queue.js')(io, socket);  

    // Database
    require('./database.js')(io, socket);  

    // When a user exits chat room, send to client that user has left
    socket.on('disconnect', function() {
      --numUsersConnected;

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

      socket.leave(socket.room);
    });
  });
}

module.exports = startSockets;