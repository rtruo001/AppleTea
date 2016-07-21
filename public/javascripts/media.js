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

var currentTimeElapsed = 0;
// The length in seconds
var mediaDuration = 0;
var mediaInitialized = false;
var mediaCurrentState = STATES.PAUSED;

// This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Youtube player
var player;

// TODO
function reinitializeMedia() {

}

/*  =============================================================================
    Function onYouTubeIframeAPIReady

    This function creates an <iframe> (and YouTube player) after the API code
    downloads
    ========================================================================== */
function onYouTubeIframeAPIReady() {
  player = new YT.Player('media-player', {
    height: '390',
    width: '640',
    videoId: 'Mc83aholIJ0',
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
  initializeStatusBar();
  initializeVideo(function() {
    socket.emit("From Client: Get media states", 1);  
  });
}

// Part of the onPlayerReady, used as a callback in order to get the elapsed time 
// and to get the media state with the elapsed time. Done in this manner because
// of async calls
function initializeVideo(callback) {
  socket.emit("From Client: Get elapsed time", 1);
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
  // When Youtube video is initialized from someone clicking play for the first time
  if(event.data == YT.PlayerState.BUFFERING && !mediaInitialized) {
    socket.emit('From Client: Initialized media', true);
    // socket.emit('From Client: Play media', currentTimeElapsed);
  }

  // One of the Client's Youtube video started buffering
  else if (event.data == YT.PlayerState.BUFFERING && mediaInitialized) {
    socket.emit('From Client: Get media states', currentTimeElapsed); 
  }

  // Tells Server current state is PLAYING
  if(event.data == YT.PlayerState.PLAYING) {
    socket.emit('From Client: Play media', 0);
  }

  // Tells Server current state is PAUSED
  if(event.data == YT.PlayerState.PAUSED) {
    socket.emit('From Client: Pause media', 0);
  }
}

// TODO
function currentMediaEnds() {
  reInitializeMedia();
}

/*  =============================================================================
    Functions to control the Youtube video.
    
    function stopVideo()
    function pauseVideo()
    function playVideo()
    ========================================================================== */
function stopVideo() {
  if(player != null) {
    player.stopVideo();
  }
}

function pauseVideo() {
  if(player != null) {
    mediaCurrentState = STATES.PAUSED;
    player.pauseVideo();
  }
}

function playVideo() {
  if(player != null) {
    mediaCurrentState = STATES.PLAYING;
    player.playVideo();
    console.log("Play");
  }
}

/*  =============================================================================
    Functions syncMedia
    
    Syncs up the current client media with the server's information. Depending on
    state of the player, plays or pauses the media at the current elapsed time.
    ========================================================================== */
function syncMedia(data) {
  mediaInitialized = data.initialized;
  currentTimeElapsed = data.elapsedTime;
  mediaCurrentState = data.state;
  syncTime();
}

/*  =============================================================================
    Functions syncTime
    
    Syncs the current play time of the media through the client given the currentTimeElapsed
    which was sent from the server.
    ========================================================================== */
function syncTime(callback) {
  if (mediaCurrentState == STATES.PAUSED) {
    player.pauseVideo();
    pauseVideo();
    console.log("PAUSED");
  }
  player.seekTo(currentTimeElapsed, true);
}

function mediaSeekTo() {
  player.seekTo(currentTimeElapsed, true);
}

function initializeStatusBar() {
  mediaDuration = player.getDuration();
  document.getElementById("slider").min = "0";
  document.getElementById("slider").max = mediaDuration;
}

function onStatusBarChange(newTime) {
  console.log(newTime);
  currentTimeElapsed = newTime;
  socket.emit("From Client: Prepares seek to", newTime);
}

function onVolumeChange(newVolume) {
  player.setVolume(newVolume);
}

// TODO: consider other options in detecting event handler
$('#slider').on('input', function () {
    onStatusBarChange(document.getElementById("slider").value);
});

$('#volume-slider').on('input', function () {
    onVolumeChange(document.getElementById("volume-slider").value);
});


/*  =============================================================================
    Server emits to Client Socket Event Handlers
    ========================================================================== */

// Receives the current media state and syncs the Client media player
socket.on("From Server: Send media states", function(data) {
  syncMedia(data)
});

// When server requests elapsed time, sends the elapsed time to the server
socket.on("From Server: Get elapsed time", function(data) {
  currentTimeElapsed = player.getCurrentTime();
  socket.emit("From Client: Send elapsed time", currentTimeElapsed);
});

socket.on("From Server: Seek to new time", function(newTime) {
  currentTimeElapsed = newTime;
  syncTime();
});

// Plays the player
socket.on('From Server: Play media', function(data) {
  playVideo();
});

// Pauses the player
socket.on('From Server: Pause media', function(data) {
  pauseVideo();
});
