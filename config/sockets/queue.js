/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    queue.js

    Controls the queue
    ========================================================================== */
var MEDIAPLAYER = require('../constants');

var socketQueue = function(io, socket) {

  socket.on('From Client: Push into queue', function(queueEntry) {
    socket.RoomObj.pushIntoQueue(queueEntry);

    // Sends to all clients to push media into queue
    io.to(socket.room).emit('From Server: Push into queue', queueEntry);
  });

  socket.on("From (drag-arrange): Update queue with swaps", function(indices) {
    console.log(indices);
    socket.RoomObj.updateQueueWithSwaps(indices);
    console.log("UPDATE IN QUEUE");
    io.to(socket.room).emit('From Server: Update queue with new queue', socket.RoomObj.getQueue());
  });

  socket.on('From Client: Play new media entry from queue', function(queueEntry) {
    socket.RoomObj.setPlayerMediaType(queueEntry.mediaType);
    socket.RoomObj.setPlayerVideoId(queueEntry.mediaId);
    socket.RoomObj.setPlayerMediaTitle(queueEntry.title); 
    socket.RoomObj.setPlayerCurrentState(MEDIAPLAYER.STATES.PLAYING);
    socket.RoomObj.setPlayerMediaElapsedTime(0);
    socket.RoomObj.setRoomThumbnail(queueEntry.thumbnail);
    socket.RoomObj.removeEntryFromQueue(queueEntry.posInQueue);
    
    io.to(socket.room).emit("From Server: Load media entry", socket.RoomObj.getRoomData(false));
    io.to(socket.room).emit('From Server: Update queue with new queue', socket.RoomObj.getQueue());
  });   

  socket.on('From Client: Delete media entry from queue', function(queueEntry) {
    console.log('Deleting media entry from Queue: ' + queueEntry.posInQueue);
    socket.RoomObj.removeEntryFromQueue(queueEntry.posInQueue);
    io.to(socket.room).emit('From Server: Update queue with new queue', socket.RoomObj.getQueue());
  });

  socket.on('From Client: Move media entry to front of queue', function(queueEntry) {
    console.log('Move media entry to top of Queue: ' + queueEntry.posInQueue);
    socket.RoomObj.moveEntryToFrontOfQueue(queueEntry.posInQueue);
    io.to(socket.room).emit('From Server: Update queue with new queue', socket.RoomObj.getQueue());
  });

  socket.on('From Client: Update queue with new list', function(newQueueList) {
    console.log('Update to new queue');
    console.log(newQueueList);
    socket.RoomObj.setQueue(newQueueList);
    io.to(socket.room).emit('From Server: Update queue with new queue', socket.RoomObj.getQueue());
  });

};

module.exports = socketQueue;