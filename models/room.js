/*
  name: 
  RoomOwner: String
  isPublic: Boolean
  users: [
    {
      "id": "<USER_ID>",
      "role": "OWNER",
      "username": "<STRING>"
    },
    {
      "id": "<USER_ID>",
      "role": "MODERATOR",
      "username": "<STRING>"
    },
    {
      "id": "<USER_ID>",
      "role": "NONE",
      "username": "<STRING>"
    }
  ]
  
  Potentially a list of all users for that private room, as well as whose moderators, admins, or room creators
*/

var mongoose = require('mongoose');

var roomSchema = mongoose.Schema(
  {
    name		  : String,
    owner 		: String,
    isPublic	: Boolean,
    inRoom    : Number,
    thumbnail : String
  }
);

// NOTE: Apparently the string doesn't detect any capital letters.
module.exports = mongoose.model('rooms', roomSchema);