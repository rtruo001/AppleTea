/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    chat.js

    Handles the chat sockets
    ========================================================================== */
var Room = require('../../models/room');
var RoomManager = require('../classes/AllRooms').getObj();

var socketRoom = function(io, socket) {

  // When creating a new room
  socket.on("From Client: Create new room", function(data, callback) {
    console.log(data.roomName + " is getting created");

    // Creates a new playlist with either a media entry, or without
    var newRoom = new Room();

    newRoom.name = data.roomName;
    newRoom.owner = data.owner;
    // TODO: isPublic should be data.isPublic
    newRoom.isPublic = true;

    newRoom.save(function(err, room) {
      if (err) {
        throw err;
      }
      console.log("===================================");
      console.log("Added Room entry to Rooms");
      console.log(room);
      
      RoomManager.newRoom(room.id, room.name);

      callback(room.id);
    });

  });

};

module.exports = socketRoom;