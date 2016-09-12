/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    chat.js

    Handles the chat sockets
    ========================================================================== */
var socketChat = function(io, socket) {

  // When client receives a user and sends to server, emits the message to client
  socket.on('From Client: Add user', function(user) {
    console.log(user + " has connected to Room: " + socket.room);

    // we store the username in the socket session for this client
    socket.username = user;
    io.to(socket.room).emit("From Server: User joined", {
      username: user
    });
  });

  // When a message is sent, sends the username and their message to the client
  socket.on('From Client: Chat message', function(msg){
    socket.RoomObj.print();
    console.log(socket.username + ": "  + msg);
    io.to(socket.room).emit('From Server: Chat message', {
      username: socket.username,
      message: msg
    });
  });

};

module.exports = socketChat;