/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    mediaPlayer.js

    Controls the media player
    ========================================================================== */
// Constants
var MEDIAPLAYER = require('../constants');

var socketMediaPlayer = function(io, socket) {

  socket.on('From Client: Initialize media player', function(data) {
    socket.RoomObj.setPlayerMediaType(data.mediaType);
    socket.RoomObj.setPlayerVideoId(data.mediaId);
    socket.RoomObj.setPlayerMediaTitle(data.title); 

    socket.emit('From Server: Initialize media player', socket.RoomObj.getRoomData(false));
  });
  
  socket.on('From Client: Send elapsed time to specific client', function(clientData) {
    socket.RoomObj.setPlayerMediaElapsedTime(clientData.clientCurrentTime);

    socket.to(clientData.clientId).emit('From Server: Initialize media player', socket.RoomObj.getRoomData(false));
  });

  socket.on('From Client: Get media player states', function(data) {
    socket.emit('From Server: Send media player states', socket.RoomObj.getRoomData(false));
  });

  // Sets the state to PLAYING and sends to clients to play media
  socket.on('From Client: Play media', function(IfAClientSendToServerYet) {
    // TODO: Should also send to chat that the media has played
    socket.RoomObj.setPlayerCurrentState(MEDIAPLAYER.STATES.PLAYING);
    socket.broadcast.to(socket.room).emit('From Server: Play media', socket.RoomObj.getRoomData(IfAClientSendToServerYet));
  });  

  // // Sets the state to PAUSED and sends to clients to pause media
  socket.on('From Client: Pause media', function(IfAClientSendToServerYet) {
    // TODO: Should also send to chat that the media has paused
    socket.RoomObj.setPlayerCurrentState(MEDIAPLAYER.STATES.PAUSED);
    socket.broadcast.to(socket.room).emit('From Server: Pause media', socket.RoomObj.getRoomData(IfAClientSendToServerYet));
  });

  socket.on('From Client: Play new media entry', function(mediaData) {
    socket.RoomObj.setPlayerMediaType(mediaData.mediaType);
    socket.RoomObj.setPlayerVideoId(mediaData.mediaId);
    socket.RoomObj.setPlayerMediaTitle(mediaData.title); 
    socket.RoomObj.setPlayerCurrentState(MEDIAPLAYER.STATES.PLAYING);
    socket.RoomObj.setPlayerMediaElapsedTime(0);
    socket.RoomObj.setRoomThumbnail(mediaData.thumbnail);

    io.to(socket.room).emit("From Server: Load media entry", socket.RoomObj.getRoomData(false));
  });

  socket.on('From Client: Media player has ended', function(IfAClientSendToServerYet) {
    if (socket.RoomObj.getQueue().length <= 0) {
      socket.RoomObj.setPlayerMediaType(MEDIAPLAYER.TYPES.NONE);
      socket.RoomObj.setPlayerVideoId(null);
      socket.RoomObj.setPlayerMediaTitle(null); 
      socket.RoomObj.setPlayerCurrentState(MEDIAPLAYER.STATES.NONE);
      socket.RoomObj.setPlayerMediaElapsedTime(0);
      socket.RoomObj.setRoomThumbnail(null);

      // TODO: Send to Clients to stop Media Player and change all states to NONE
      io.to(socket.room).emit('From Server: Change media player to none', 0);
      return;
    }
    var playNextMediaData = socket.RoomObj.getQueue()[0];
    socket.RoomObj.setPlayerMediaType(playNextMediaData.mediaType);
    socket.RoomObj.setPlayerVideoId(playNextMediaData.mediaId);
    socket.RoomObj.setPlayerMediaTitle(playNextMediaData.title); 
    socket.RoomObj.setPlayerCurrentState(MEDIAPLAYER.STATES.PLAYING);
    socket.RoomObj.setPlayerMediaElapsedTime(0);
    socket.RoomObj.setRoomThumbnail(playNextMediaData.thumbnail);
  
    // Update queueList by removing front entry
    socket.RoomObj.removeEntryFromQueue(0);

    // Updates every client's queue without the play next media entry
    io.to(socket.room).emit('From Server: Update queue with new queue', socket.RoomObj.getQueue());
    
    // Loads the play next media entry on the queue onto the Media Player
    io.to(socket.room).emit("From Server: Load media entry", socket.RoomObj.getRoomData(IfAClientSendToServerYet));  

    // TODO: Tell chat that new media entry has started
  });
};

module.exports = socketMediaPlayer;