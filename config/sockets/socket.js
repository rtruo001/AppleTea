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

  // Users
  var numUsersConnected = 0;

  var io = require('socket.io')(server);
  io.on('connection', function(socket) {
    console.log("IO connected");
    ++numUsersConnected;
    
    socket.on('From Client: Initialize room' , function(data) {
      socket.join(data.room.roomId);
      socket.room = data.room.roomId;

      // This line right here is SO AMAZING
      socket.RoomObj = RoomManager.getRoom(data.room.roomId);

      // If there is no user logged in, the socket's username is just User
      if (data.user === undefined || data.user === null) {
        socket.username = "User";
      }
      // If there is a user logged in, the user is the given username
      else {
        socket.username = data.user.local.firstName + " " + data.user.local.lastName;
      }
      // Sends out to the client that a user has joined
      io.to(socket.room).emit("From Server: User joined", {username: socket.username});

      // Increment total users in room
      socket.RoomObj.newUserHasJoinedRoom(socket.id, socket.username);

      // Sends out to the client that a user has joined
      io.to(socket.room).emit("From Server: Edit User list", socket.RoomObj.getUserList());

      // Initializes queue to the client that just joined
      socket.emit('From Server: Initialize Queue', socket.RoomObj.getQueue());

      // Initializes the chat user list
      socket.emit('From Server: Edit User list', socket.RoomObj.getUserList());

      // Initializes mediaplayer state
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

      // if the server currently is playing a media AND there are no users in the room
      else if (socket.RoomObj.getNumOfUsersInRoom() <= 1) {
        console.log("Joined an empty Room");
        socket.emit('From Server: Initialize media player', socket.RoomObj.getRoomData(false));
      }

      // Initializes the media player for the client if the server currently is playing a media
      else {
        console.log("Joined a nonempty room that is playing a media");
        console.log(socket.RoomObj.getNumOfUsersInRoom());
        socket.broadcast.to(socket.room).emit('From Server: Get elapsed time for specific client', socket.id);
      }
    });

    // Room
    require('./room')(io, socket);

    // Chat
    require('./chat')(io, socket);

    // Media player
    require('./mediaPlayer')(io, socket);

    // Queue
    require('./queue')(io, socket);  

    // Database
    require('./database')(io, socket);  

    // When a user exits chat room, send to client that user has left
    socket.on('disconnect', function() {
      if (socket.RoomObj === undefined) {
        console.log("Room Object hasn't been defined yet");
        return;
      }

      // Adjusts room's states
      --numUsersConnected;
      socket.RoomObj.userHasLeftRoom(socket.id);

      // Sends out to the client that a user has joined
      io.to(socket.room).emit("From Server: Edit User list", socket.RoomObj.getUserList());

      // TODO: Perhaps consider getting time of the last user when all users leave room.
      // if ()

      // If random nonuser is on webpage and sees the chat
      if (!socket.username || socket.username.length === 0) {
        console.log("A user disconnected");
        return;
      }
      
      // An actual user disconnects
      console.log(socket.username + " disconnected");
      socket.broadcast.to(socket.room).emit("From Server: User disconnected", {username: socket.username});

      socket.leave(socket.room);
    });
  });
}

module.exports = startSockets;