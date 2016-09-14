/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    CLASS: Room.js

    The class for a Room. Each room has their own properties for the state of the
    media player and queue.
    ========================================================================== */
"use strict";

var MEDIAPLAYER = require('../constants');
var HOURINSECONDS = require('../constants').HOUR;
var RoomManager = require('./AllRooms');

/*  =============================================================================
    Class Room
    ========================================================================== */
class Room {
	constructor(roomId, roomName) {
  	// Users
  	this.numUsersConnected = 0;
  	this.numSignedInUsersConnected = 0;
    this.userList = {};

  	// Media player
  	this.playerMediaType = MEDIAPLAYER.TYPES.NONE;
  	this.playerMediaVideoId = null;
  	this.playerMediaTitle = null;
  	this.playerMediaCurrentState = MEDIAPLAYER.STATES.NONE;
  	this.playerMediaElapsedTime = 0;

  	// Queue of media entries
  	this.queueList = [];

    // Room
  	this.roomName = roomName;
    this.roomThumbnail = null;
    this.roomId = roomId;

    this.timeoutTimer = null;
	}

  /*
    Room
  */

  getRoomName() {
    return this.roomName;
  }

  getRoomThumbnail() {
    return this.roomThumbnail;
  }  

  getRoomURL() {
    return this.roomId;
  }

  setRoomName(name) {
    this.roomName = name;
  }

  setRoomThumbnail(thumbnail) {
    this.roomThumbnail = thumbnail;
  }

	/*
		Media Player
	*/

	// GETTERS
	getPlayerMediaType() {
		return this.playerMediaType;
	} 

	getPlayerVideoId() {
		return this.playerMediaVideoId;
	} 

	getPlayerMediaTitle() {
		return this.playerMediaTitle;
	} 

	getPlayerCurrentState() {
		return this.playerMediaCurrentState;
	} 

	getPlayerMediaElapsedTime() {
		return this.playerMediaElapsedTime;
	}

	getRoomData(IfAClientSendToServerYet) {
		return	{
			mediaType: this.playerMediaType,
      mediaId: this.playerMediaVideoId,
      title: this.playerMediaTitle,
      state: this.playerMediaCurrentState,
      elapsedTime: this.playerMediaElapsedTime,
			ifAlreadySentFromClient: IfAClientSendToServerYet
		}
	}

	// SETTERS
	setPlayerMediaType(mediaType) {
		this.playerMediaType = mediaType;
	} 

	setPlayerVideoId(videoId) {
		this.playerMediaVideoId = videoId;
	} 

	setPlayerMediaTitle(mediaTitle) {
		this.playerMediaTitle = mediaTitle;
	} 

	setPlayerCurrentState(playerCurrentState) {
		this.playerMediaCurrentState = playerCurrentState;
	} 

	setPlayerMediaElapsedTime(elapsedTime) {
		this.playerMediaElapsedTime = elapsedTime;
	} 

	/*
		Queue
	*/

	// Getters
	getQueue() {
		return this.queueList;
	}

	// Setters
	setQueue(newQueue) {
		this.queueList = newQueue;
	} 

	pushIntoQueue(queueEntry) {
		this.queueList = this.queueList.concat(queueEntry);
	}

	updateQueueWithSwaps(indices) {
    var newQueueList = [];
    var queueIdString;
    var queueIndexId;
    for (var i = 0; i < this.queueList.length; ++i) {
      queueIdString = indices[i];
      queueIndexId = parseInt(queueIdString[0]);
      newQueueList = newQueueList.concat(this.queueList[queueIndexId]);  
    }
    this.queueList = newQueueList;
    console.log(this.queueList);
    console.log("UPDATE IN ROOM");
	}

	removeEntryFromQueue(posInQueue) {
		this.queueList.splice(posInQueue, 1);
	}

	moveEntryToFrontOfQueue(posInQueue) {
		var mediaEntry = this.queueList[posInQueue];
    this.queueList.splice(posInQueue, 1);
    this.queueList.unshift(mediaEntry);
	}

  /*
    User
  */

  newUserHasJoinedRoom(id, username) {
    this.numUsersConnected = this.numUsersConnected + 1;
    this.userList[id] = username;

    if (this.timeoutTimer !== null) {
      console.log("Cleared timer timeout");
      clearTimeout(this.timeoutTimer);
      this.timeoutTimer = null;
    }
  }

  userHasLeftRoom(id) {
    this.numUsersConnected = this.numUsersConnected - 1; 
    delete this.userList[id];

    if (this.numUsersConnected <= 0) {
      console.log("Setting timer");
      this.numUsersConnected = 0;
      // After 60 minutes, the room is removed
      this.timeoutTimer = setTimeout(() => {this.deleteRoom()}, HOURINSECONDS);
    }
  }

  getNumOfUsersInRoom() {
    return this.numUsersConnected;
  }

  getUserList() {
    return this.userList;  
  }
    
  deleteRoom() {
    clearTimeout(this.timeoutTimer);
    this.timeoutTimer = null;
    RoomManager.getObj().deleteRoom(this.roomId);
  }

	print() {
		console.log("===============Printing all private variables of Room===============");
		console.log(this.roomName);
		console.log(this.numUsersConnected);
		console.log(this.numSignedInUsersConnected);
		console.log(this.playerMediaType);
		console.log(this.playerMediaVideoId);
		console.log(this.playerMediaTitle);
		console.log(this.playerMediaCurrentState);
		console.log(this.playerMediaElapsedTime);
	}
}

module.exports = Room;