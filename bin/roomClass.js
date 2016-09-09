"use strict";

//Constant media states
const MEDIAPLAYERSTATES = {
  NONE: 'NONE',
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED'
};

const MEDIAPLAYERTYPES = {
	NONE: 'NONE',
  YOUTUBE: 'YOUTUBE',
  SOUNDCLOUD: 'SOUNDCLOUD',
  VIMEO: 'VIMEO'
};

class Room {
	constructor(roomName) {
		// Users
		this.numUsersConnected = 0;
		this.numSignedInUsersConnected = 0;

		// Media player
		this.playerMediaType = MEDIAPLAYERTYPES.NONE;
		this.playerMediaVideoId = null;
		this.playerMediaTitle = null;
		this.playerMediaCurrentState = MEDIAPLAYERSTATES.NONE;
		this.playerMediaElapsedTime = 0;

		// Queue of media entries
		this.queueList = [];
		// Used to see if there are duplicates in the Queue or not
		this.queueListHashSet = {};

		this.roomName = roomName;
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