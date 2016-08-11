/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    youtube.js

    Client side functions of the Youtube player.
    ========================================================================== */

/*  =============================================================================
    Function initializeYoutubeObj

    Sets the youtubeObj variable with the given Youtube data
    ========================================================================== */
function initializeYoutubeObj(youtubeVideoData) {
  console.log('Initialized youtubeObj');
  youtubeObj.youtubeVideoId = youtubeVideoData.videoId;
  youtubeObj.youtubeStartTime = youtubeVideoData.elapsedTime;
  youtubeObj.youtubeElapsedTime = youtubeVideoData.elapsedTime;
  youtubeObj.youtubeCurrentState = youtubeVideoData.state;
  youtubeObj.youtubeIfAlreadySentFromOneClient = false;
  youtubeObj.youtubeIfInitialized = true;
}

/*  =============================================================================
    Function resetYoutubeObj

    Resets the youtubeObj variable to its initial state
    ========================================================================== */
function resetYoutubeObj() {
  youtubeObj.youtubeVideoId =  null;
  youtubeObj.youtubeStartTime =  null;
  youtubeObj.youtubeElapsedTime =  null;
  youtubeObj.youtubeCurrentState = MEDIAPLAYERSTATES.NONE;
  youtubeObj.youtubeIfAlreadySentFromOneClient =  false;
  youtubeObj.youtubeIfInitialized =  true;
  
  player.stopVideo();    
  $('#media-player').hide();
}

/*  =============================================================================
    Function initializeYoutubeIFrame (OLD VERSION)

    This function initializes and creates the <iframe> (and YouTube player). 
    onYoutubeIframeAPIREADY is automaticlly called after Iframe finishes initializing.
    ========================================================================== */
function initializeYoutubeIFrame(youtubeMediaData) {
  // If Youtube player is already initialized, do not reinitialize it
  if (youtubeObj.youtubeIfInitialized == true) {
    return;
  }
  initializeYoutubeObj(youtubeMediaData);
  
  // This code loads the Youtube IFrame Player API code asynchronously.
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

/*  =============================================================================
    Function onYouTubeIframeAPIReady

    This function creates an <iframe> (and YouTube player) after the API code
    downloads
    ========================================================================== */
function onYouTubeIframeAPIReady() {
  player = new YT.Player('media-player', {
    videoId: youtubeObj.youtubeVideoId,
    playerVars: {
      'start': youtubeObj.youtubeStartTime
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
  // Once player is initialized, if the current state from the server is NONE, then hide Youtube player
  if (youtubeObj.youtubeCurrentState == MEDIAPLAYERSTATES.NONE) {
    player.stopVideo();    
    $('#media-player').hide();
  }
  // If the Youtube video is currently playing from the server, then display the Youtube player with the video states.
  else {
    socket.emit("From Client: Get media player states", 0);  
  }
}

/*  =============================================================================
    Function onPlayerStateChange

    Sets the event handlers for Youtube
    The API calls this function when the player's state changes. 

    States:
      -Playing
      -Paused
      -Ended/None
    ========================================================================== */
function onPlayerStateChange(event) {
  // TODO: Potentially build states for CUE and BUFFERING

  // Tells Server current state is PLAYING
  if(event.data == YT.PlayerState.PLAYING) {
    youtubeObj.youtubeCurrentState = MEDIAPLAYERSTATES.PLAYING;
    if (youtubeObj.youtubeIfAlreadySentFromOneClient == false) {
      socket.emit('From Client: Play media', true);    
    }
    youtubeObj.youtubeIfAlreadySentFromOneClient = false;
  }

  // Tells Server current state is PAUSED
  if(event.data == YT.PlayerState.PAUSED) {
    youtubeObj.youtubeCurrentState = MEDIAPLAYERSTATES.PAUSED;
    if (youtubeObj.youtubeIfAlreadySentFromOneClient == false) {
      socket.emit('From Client: Pause media', true);
    }
    youtubeObj.youtubeIfAlreadySentFromOneClient = false;
  }

  // Tells Server that the Youtube video has ended
  if(event.data == YT.PlayerState.ENDED) {
    youtubeObj.youtubeCurrentState = MEDIAPLAYERSTATES.NONE;
    if (youtubeObj.youtubeIfAlreadySentFromOneClient == false) {
      socket.emit('From Client: Media player has ended', true);
    }
    youtubeObj.youtubeIfAlreadySentFromOneClient = false;
  }
}

/*  =============================================================================
    Functions that control the Youtube player

    Functions:
      -Load Video
      -Play
      -Pause
      -Stop
      -SeekTo
      -GetTime
      -VolumeChange
    ========================================================================== */
function youtubeLoadVideo(youtubeData) {
  console.log("Loading Youtube Video");
  if(player != null) {
    $('#media-player').show();
    youtubeObj.youtubeIfAlreadySentFromOneClient = youtubeData.ifAlreadySentFromClient;
    player.loadVideoById(youtubeData.videoId, 0, "large");
  }
}

function youtubePlayVideo(youtubeData) {
  if(player != null) {
    youtubeObj.youtubeIfAlreadySentFromOneClient = youtubeData.ifAlreadySentFromClient;
    player.playVideo();
    console.log("Play");
  }
}

function youtubePauseVideo(youtubeData) {
  if(player != null) {
    youtubeObj.youtubeIfAlreadySentFromOneClient = youtubeData.ifAlreadySentFromClient;
    player.pauseVideo();
    console.log("Pause");
  }
}

function youtubeStopVideo() {
  if(player != null) {
    player.stopVideo();
  }
}

function youtubeSeekTo(currentElapsedTime) {
  if (player != null) {
    player.seekTo(currentElapsedTime, true);
  }
}

function youtubeGetCurrentTime() {
  if (player != null) {
    return Math.round(player.getCurrentTime());
  }
  return 0;
}

function youtubeVolumeChange(newVolume) {
  if (player != null) {
    console.log('Volume: ' + newVolume);
    player.setVolume(newVolume);  
  }
}
