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

	newRoom(hash) {
		if (!this.ifRoomExist(hash)) {
			this.roomList[hash] = new RoomObj(hash);
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
}

/*  =============================================================================
    Helper functions
  
    Creates a Room Manager Object which would be used throughout the app
    ========================================================================== */
var roomsManager = null;

exports.initializeObj = function() {
	if (roomsManager === null) {
		roomsManager = new RoomsManager();
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

