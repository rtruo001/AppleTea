/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    socket.js

    Every event handler of the sockets
    ========================================================================== */
var startSockets = function(server) {

// TODO: Potentially separate this into more files, for example: The queue, chat, search, etc.

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

var Playlist = require("../models/playlist");

// Users
var numUsersConnected = 0;
var numUsersSignedInConnected = 0

// Media player
var playerMediaType = MEDIAPLAYERTYPES.NONE;
var playerMediaVideoID;
var playerMediaTitle;
var mediaCurrentState = MEDIAPLAYERSTATES.NONE;
var mediaElapsedTime = 0;

// Queue of media entries
var queueList = [];
// Used to see if there are duplicates in the Queue or not
var queueListHashSet = {};

var io = require('socket.io')(server);

io.on('connection', function(socket) {
  console.log("IO connected");
  ++numUsersConnected;

  /*  =============================================================================
      Client Initialization Data transfers
      ========================================================================== */
    // Sends the data to the Client for Client side rendering
    // socket.on("From Server: Receive MongoDB data", function(nothing, callback) {
    //   var roomData = {
    //     explore: configExploreDB.get(),
    //     myPlaylists: configMyPlaylistsDB.get() 
    //   }
    //   callback(roomData);    
    // });

  /*  =============================================================================
      Chat
      ========================================================================== */
  // When client receives a user and sends to server, emits the message to client
  socket.on('From Client: Add user', function(user) {
    console.log(user + " has connected");
    ++numUsersSignedInConnected;

    // we store the username in the socket session for this client
    socket.username = user;
    io.emit("From Server: User joined", {
      username: user
    });
  });

  // When a message is sent, sends the username and their message to the client
  socket.on('From Client: Chat message', function(msg){
    console.log(socket.username + ": "  + msg);
    io.emit('From Server: Chat message', {
      username: socket.username,
      message: msg
    });
  });

  /*  =============================================================================
      Media Player
      ========================================================================== */  
  socket.on('From Client: Entering page, check initial media player state', function() {
    // If the server currently isn't playing a media, then don't do anything for the new client
    if (playerMediaType == MEDIAPLAYERTYPES.NONE) {
      console.log("Currently nothing is playing from any clients");
      socket.emit('From Server: Initialize media player', {
        mediaType: playerMediaType,
        mediaId: null,
        title: null,
        state: mediaCurrentState,
        elapsedTime: 0,
        ifAlreadySentFromClient: false
      });
    }
    // Initializes the media player for the client if the server currently is playing a media
    else {
      socket.broadcast.emit('From Server: Get elapsed time for specific client', socket.id);
    }
  });

  socket.on('From Client: Initialize media player', function(data) {
    playerMediaType = data.mediaType;
    playerMediaVideoID = data.mediaId;
    playerMediaTitle = data.title;

    socket.emit('From Server: Initialize media player', {
      mediaType: playerMediaType,
      mediaId: playerMediaVideoID,
      title: playerMediaTitle,
      state: mediaCurrentState,
      elapsedTime: mediaElapsedTime,
      ifAlreadySentFromClient: false
    });
  });

  socket.on('From Client: Send elapsed time to specific client', function(clientData) {
    mediaElapsedTime = clientData.clientCurrentTime;
    io.to(clientData.clientId).emit('From Server: Initialize media player', {
      mediaType: playerMediaType,
      mediaId: playerMediaVideoID,
      title: playerMediaTitle,
      state: mediaCurrentState,
      elapsedTime: mediaElapsedTime,
      ifAlreadySentFromClient: false
    });
  });

  socket.on('From Client: Get media player states', function(data) {
    socket.emit('From Server: Send media player states', {
      mediaType: playerMediaType,
      mediaId: playerMediaVideoID,
      title: playerMediaTitle,
      state: mediaCurrentState,
      elapsedTime: mediaElapsedTime,
      ifAlreadySentFromClient: false
    });
  });

  // Sets the state to PLAYING and sends to clients to play media
  socket.on('From Client: Play media', function(IfAClientSendToServerYet) {
    // TODO: Should also send to chat that the media has played

    mediaCurrentState = MEDIAPLAYERSTATES.PLAYING;
    socket.broadcast.emit('From Server: Play media', {
      mediaType: playerMediaType,
      mediaId: playerMediaVideoID,
      title: playerMediaTitle,
      state: mediaCurrentState,
      elapsedTime: mediaElapsedTime,
      ifAlreadySentFromClient: IfAClientSendToServerYet
    });
  });  

  // Sets the state to PAUSED and sends to clients to pause media
  socket.on('From Client: Pause media', function(IfAClientSendToServerYet) {
    // TODO: Should also send to chat that the media has paused

    mediaCurrentState = MEDIAPLAYERSTATES.PAUSED
    socket.broadcast.emit('From Server: Pause media', {
      mediaType: playerMediaType,
      mediaId: playerMediaVideoID,
      title: playerMediaTitle,
      state: mediaCurrentState,
      elapsedTime: mediaElapsedTime,
      ifAlreadySentFromClient: IfAClientSendToServerYet
    });
  });

  socket.on('From Client: Play new media entry', function(mediaData) {
    playerMediaType = mediaData.mediaType;
    playerMediaVideoID = mediaData.mediaId;
    playerMediaTitle = mediaData.title;
    mediaCurrentState = MEDIAPLAYERSTATES.PLAYING;
    mediaElapsedTime = 0;

    io.emit("From Server: Load media entry", {
      mediaType: playerMediaType,
      mediaId: playerMediaVideoID,
      title: playerMediaTitle,
      state: mediaCurrentState,
      elapsedTime: mediaElapsedTime,
      ifAlreadySentFromClient: false
    });
  });

  socket.on('From Client: Media player has ended', function(IfAClientSendToServerYet) {
    if (queueList.length <= 0) {
      playerMediaType = MEDIAPLAYERSTATES.NONE;
      playerMediaVideoID = '';
      playerMediaTitle = '';
      mediaCurrentState = MEDIAPLAYERSTATES.NONE;
      mediaElapsedTime = 0;

      // TODO: Send to Clients to stop Media Player and change all states to NONE
      io.emit('From Server: Change media player to none', 0);

      return;
    }
    var playNextMediaData = queueList[0];
    playerMediaType = playNextMediaData.mediaType;
    playerMediaVideoID = playNextMediaData.mediaId;
    playerMediaTitle = playNextMediaData.title;
    mediaCurrentState = MEDIAPLAYERSTATES.PLAYING;
    mediaElapsedTime = 0;

    // Update queueList and queueListHashSet
    queueList.shift();
    // delete queueListHashSet[playerMediaVideoID];

    // Updates every client's queue without the play next media entry
    io.emit('From Server: Update queue with new queue', queueList);
    
    // Loads the play next media entry on the queue onto the Media Player
    io.emit("From Server: Load media entry", {
      mediaType: playerMediaType,
      mediaId: playerMediaVideoID,
      title: playerMediaTitle,
      state: mediaCurrentState,
      elapsedTime: mediaElapsedTime,
      ifAlreadySentFromClient: IfAClientSendToServerYet
    });  

    // TODO: Tell chat that new media entry has started
  });

  /*  =============================================================================
      Queue
      ========================================================================== */  
  // Initializes queue to the client that just joined
  socket.emit('From Server: Initialize Queue', queueList);

  socket.on('From Client: Push into queue', function(queueEntry) {
    // When add to queue button is pressed when there is nothing in the queue, doesn't add media to queue but instead plays it on the media player
    // if (queueList.length <= 0 && playerMediaType == MEDIAPLAYERTYPES.NONE) {
    //   console.log(queueEntry);
    //   playerMediaType = queueEntry.mediaType;
    //   playerMediaVideoID = queueEntry.mediaId;
    //   playerMediaTitle = queueEntry.title;
    //   mediaCurrentState = MEDIAPLAYERSTATES.PLAYING;
    //   mediaElapsedTime = 0;

    //   io.emit('From Server: Load media entry', queueEntry);
    //   return;
    // }

    // If there is a duplicate media, do not add to the queue list
    // if (queueListHashSet[queueEntry.mediaId]) {
    //   return;
    // }
    // // Adds media to the queue list
    // queueListHashSet[queueEntry.mediaId] = true;
    queueList = queueList.concat(queueEntry);

    // Sends to all clients to push media into queue
    io.emit('From Server: Push into queue', queueEntry);
  });

  socket.on("From (drag-arrange): Update queue with swaps", function(indices) {
    var newQueueList = [];
    var queueIdString;
    var queueIndexId;
    for (var i = 0; i < queueList.length; ++i) {
      queueIdString = indices[i];
      queueIndexId = parseInt(queueIdString[0]);
      newQueueList = newQueueList.concat(queueList[queueIndexId]);  
    }
    queueList = newQueueList;
    console.log(newQueueList);
    
    io.emit('From Server: Update queue with new queue', newQueueList);
  });

  socket.on('From Client: Play new media entry from queue', function(queueEntry) {
    playerMediaType = queueEntry.mediaType;
    playerMediaVideoID = queueEntry.mediaId;
    playerMediaTitle = queueEntry.title;
    mediaCurrentState = MEDIAPLAYERSTATES.PLAYING;
    mediaElapsedTime = 0;

    io.emit("From Server: Load media entry", {
      mediaType: playerMediaType,
      mediaId: playerMediaVideoID,
      title: playerMediaTitle,
      state: mediaCurrentState,
      elapsedTime: mediaElapsedTime,
      ifAlreadySentFromClient: false
    });

    // Deletes the queue entry after playing
    // delete queueListHashSet[queueEntry.mediaId];
    queueList.splice(queueEntry.posInQueue, 1);
    io.emit('From Server: Update queue with new queue', queueList);
  });   

  socket.on('From Client: Delete media entry from queue', function(queueEntry) {
    console.log('Deleting media entry from Queue: ' + queueEntry.posInQueue);
    // delete queueListHashSet[queueEntry.mediaId];
    queueList.splice(queueEntry.posInQueue, 1);
    io.emit('From Server: Update queue with new queue', queueList);
  });

  socket.on('From Client: Move media entry to front of queue', function(queueEntry) {
    console.log('Move media entry to top of Queue: ' + queueEntry.posInQueue);
    var mediaEntry = queueList[queueEntry.posInQueue];
    queueList.splice(queueEntry.posInQueue, 1);
    queueList.unshift(mediaEntry);
    io.emit('From Server: Update queue with new queue', queueList);
  });

  socket.on('From Client: Update queue with new list', function(newQueueList) {
    // Resets the list to check for duplicates for the queue
    // queueListHashSet = {};
    // for (var i = 0; i < newQueueList.length; ++i) {
    //   queueListHashSet[newQueueList[i].mediaId] = true;  
    // }

    console.log('Update to new queue');
    console.log(newQueueList);
    queueList = newQueueList;
    io.emit('From Server: Update queue with new queue', queueList);
  });

  socket.on('From Client: Add all queue entries to playlist', function(data) {
    var newPlaylist = new Playlist();

    newPlaylist.name = data.name;
    newPlaylist.owner = data.owner;
    newPlaylist.playlistId = 1;
    newPlaylist.isPublic = data.isPublic;
    newPlaylist.likes = 0;
    newPlaylist.mediaEntries = queueList;

    newPlaylist.save(function(err) {
      if (err) {
        throw err;
      }
      console.log("===================================");
      console.log("Added Queue to a new playlist");
      console.log(newPlaylist);
      socket.emit("From Server: Update MyPlaylist with new playlists", newPlaylist);
    });
  });

 /*  =============================================================================
      MongoDB requests
      ========================================================================== */

  // Creates a new playlist with either a media entry, or without
  socket.on('From Client: Create new playlist with data', function(data) {
    var newPlaylist = new Playlist();

    newPlaylist.name = data.name;
    newPlaylist.owner = data.owner;
    newPlaylist.playlistId = 1;
    newPlaylist.isPublic = data.isPublic;
    newPlaylist.likes = 0;
    newPlaylist.mediaEntries = [data.mediaEntry];

    newPlaylist.save(function(err) {
      if (err) {
        throw err;
      }
      console.log("===================================");
      console.log("Added media entry to a new playlist");
      console.log(newPlaylist);
      socket.emit("From Server: Update MyPlaylist with new playlists", newPlaylist);
    });
  });

  // Updates an existing playlist
  socket.on('From Client: Add to existing playlist', function(data) {
    console.log("===================================");
    console.log("Added media entry to an existing playlist");

    if (data.firstEntry === undefined || data.firstEntry === null) {
      Playlist.findByIdAndUpdate(
        data.id,
        {$set: {"mediaEntries": [data.mediaData]}},
        {new: true},
        function(err, updatedPlaylist) {
          if (err) {
            throw err;
          }
          console.log(updatedPlaylist);
          socket.emit("From Server: Update selected playlist", updatedPlaylist);
        }
      );
    }    
    else {
      Playlist.findByIdAndUpdate(
        data.id,
        // TODO: Currently need to fix duplicates because _id is not the same, causing the addToSet function to think there are no duplicates.
        // {$addToSet: {"mediaEntries": data.mediaData}},
        {$push: {"mediaEntries": data.mediaData}},
        {new: true},
        function(err, updatedPlaylist) {
          if (err) {
            throw err;
          }
          console.log(updatedPlaylist);
          socket.emit("From Server: Update selected playlist", updatedPlaylist);
        }
      );
    } 
    // newPlaylist.name = data.name;
    // newPlaylist.owner = data.owner;
    // newPlaylist.playlistId = 1;
    // newPlaylist.isPublic = data.isPublic;
    // newPlaylist.likes = 0;
    // newPlaylist.mediaEntries = data.mediaEntry;

    // newPlaylist.save(function(err) {
    //   if (err) {
    //     throw err;
    //   }
    //   console.log("===================================");
    //   console.log("Added media entry to an existing playlist");
    //   console.log(newPlaylist);
    //   socket.emit("From Server: Update MyPlaylist with new playlists", newPlaylist);
    // });
  });

  /*  =============================================================================
      When user disconnects
      ========================================================================== */

  // When a user exits chat room, send to client that user has left
  socket.on('disconnect', function() {
    --numUsersConnected;
    // --numUsersSignedInConnected;

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
  });
});
}

module.exports = startSockets;