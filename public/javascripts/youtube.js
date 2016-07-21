/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    media.js

    Client side functions of the media system.
    ========================================================================== */

// Current Client states of the Youtube video
const STATES = {
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED'
};

const VOLUME_MAX = 100;

var mediaDuration = 0;
var mediaInitialized = false;
var mediaCurrentState = STATES.PAUSED;
var mediaCurrentTimeElapsed = 0;

var player = null

/*  =============================================================================
    Function onYouTubeIframeAPIReady

    This function creates an <iframe> (and YouTube player) after the API code
    downloads
    ========================================================================== */
function onYouTubeIframeAPIReady() {
  console.log('Finish Initializing');

  player = new YT.Player('media-player', {
    height: '390',
    width: '640',
    videoId: 'Mc83aholIJ0',
    playerVars: {
      'start': mediaCurrentTimeElapsed
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

/*  =============================================================================
    Function onPlayerReady

    When the Youtube Player finished loading, this function is called.
    Sets the state of the current client Youtube video by receiving information from
    the server. 

    For example, if the server returns that the Youtube video is already being played,
    returns information for the current client Youtube video to play at the elapsed time.
    ========================================================================== */
function onPlayerReady(event) {
  // initializeVideo(function() {
    socket.emit("From Client: Get media player states", 0);  
  // });
}

// Part of the onPlayerReady, used as a callback in order to get the elapsed time 
// and to get the media state with the elapsed time. Done in this manner because
// of async calls
function initializeVideo(callback) {
  socket.emit("From Client: Get elapsed time", 0);
  callback();
}

/*  =============================================================================
    Functions onPlayerStateChange

    Sets the event handlers for Youtube
    The API calls this function when the player's state changes. 

    States:
      =Buffering before Youtube started playing
      =Buffering when client Youtube already started playing
      =Cued, still trying to figure this one out
      -Playing
      -Paused
    ========================================================================== */
function onPlayerStateChange(event) {
  // // When Youtube video is initialized from someone clicking play for the first time
  // if(event.data == YT.PlayerState.BUFFERING && !mediaInitialized) {
  //   socket.emit('From Client: Initialized media', true);
  //   // socket.emit('From Client: Play media', currentTimeElapsed);
  // }

  // // One of the Client's Youtube video started buffering
  // else if (event.data == YT.PlayerState.BUFFERING && mediaInitialized) {
  //   socket.emit('From Client: Get media states', currentTimeElapsed); 
  // }

  // Tells Server current state is PLAYING
  if(event.data == YT.PlayerState.PLAYING) {
    socket.emit('From Client: Play media', 0);
  }

  // Tells Server current state is PAUSED
  if(event.data == YT.PlayerState.PAUSED) {
    socket.emit('From Client: Pause media', 0);
  }
}

function stopVideo() {
  if(player != null) {
    player.stopVideo();
  }
}

function youtubePauseVideo() {
  if(player != null) {
    player.pauseVideo();
    console.log("Pause");
  }
}

function youtubePlayVideo() {
  if(player != null) {
    player.playVideo();
    console.log("Play");
  }
}

function youtubeSeekTo(currentElapsedTime) {
  if (player != null) {
    player.seekTo(currentElapsedTime, true);
  }
}

function youtubeGetCurrentTime() {
  if (player != null) {
    return player.getCurrentTime();
  }
  return 0;
}

function onElapsedTimeBarChange(newTime) {
  if (player != null) {
    console.log('Time: ' + newTime);
    socket.emit("From Client: Prepares seek to", newTime);
  }
}

function youtubeVolumeChange(newVolume) {
  if (player != null) {
    console.log('Volume: ' + newVolume);
    player.setVolume(newVolume);  
  }
}
