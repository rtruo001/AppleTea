/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    CLASS: AllRooms.js

    The class for the Room Manager. Contains a list of all the existing rooms
    stored into a hash. Room Manager controls every room.
    ========================================================================== */
"use strict";

var RoomObj = require('./Room');
var RoomsDB = require('../../models/room');

/*  =============================================================================
    Class RoomManager
    ========================================================================== */
class RoomsManager {
	constructor() {
		this.roomList = {};
	}

	getRoom(hash) {
    if (!this.ifRoomExist(hash)) {
			// return error eventually
			console.log("Doesn't exist");
		}
		return this.roomList[hash];
	}

	newRoom(hash, roomName) {
    if (!this.ifRoomExist(hash)) {
			this.roomList[hash] = new RoomObj(hash, roomName);
		}
		else {
			// Room already created
			console.log("Room already created");
		}
	}

	ifRoomExist(hash) {
		if (this.roomList[hash] === undefined) {
			return false;
		}
		return true;
	}

	getNumOfRooms() {
		return this.roomList.length;
	}

  deleteRoom(roomId) {
    console.log("Room Manager deleting room");
    console.log(roomId);

    RoomsDB.remove({ _id: roomId }, function(err) {
      if (err) {
        console.log('ERROR: Removing room with url: ' + this.roomId);
      }
    });

    delete this.roomList[roomId];
  }
}

/*  =============================================================================
    Helper functions
  
    Creates a Room Manager Object which would be used throughout the app
    ========================================================================== */
var roomsManager = null;

exports.initializeObj = function() {
	if (roomsManager === null) {
		roomsManager = new RoomsManager();

    // Initializes ALL rooms
    RoomsDB.find({ 'isPublic' : true }, function(err, rooms) {
      if (err) {
        console.log('ERROR: Problem in RoomsManager constructor');
      }
      else if (rooms.length > 0 && rooms != null && rooms != undefined) {
        for (var i = 0; i < rooms.length; ++i) {
          roomsManager.newRoom(rooms[i]._id, rooms[i].name);
        }
      }
      else {
        console.log("AllRooms.js: No rooms");
      }
    });
	}
	else {
		console.log("RoomsManager already initialized");
	}
}

exports.getObj = function() {
	if (roomsManager === null) {
		// ERROR
		console.log("ERROR: Rooms manager is null")
	}
	return roomsManager;
}

