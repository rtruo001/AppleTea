/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    CLASS: Room.js

    The class for a Room. Each room has their own properties for the state of the
    media player and queue.
    ========================================================================== */
"use strict";

var MEDIAPLAYER = require('../constants')

/*  =============================================================================
    Class Room
    ========================================================================== */
class Room {
	constructor(roomName) {
		// Users
		this.numUsersConnected = 0;
		this.numSignedInUsersConnected = 0;

		// Media player
		this.playerMediaType = MEDIAPLAYER.TYPES.NONE;
		this.playerMediaVideoId = null;
		this.playerMediaTitle = null;
		this.playerMediaCurrentState = MEDIAPLAYER.STATES.NONE;
		this.playerMediaElapsedTime = 0;

		// Queue of media entries
		this.queueList = [];
		// Used to see if there are duplicates in the Queue or not
		this.queueListHashSet = {};

		this.roomName = roomName;
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