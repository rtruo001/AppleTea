/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    MediaPlayer.jsx

    Component of the media player.
    ========================================================================== */

var React = require('react');
var StatusBar = require('./StatusBar');
var MediaEntry = require('./MediaEntry');

// Current Client states of the media player
const MEDIAPLAYERSTATES = {
  NONE: 'NONE',
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED'
};

// Current Client states of the media type
const MEDIATYPES = {
  NONE: 'NONE',
  YOUTUBE: 'YOUTUBE',
  SOUNDCLOUD: 'SOUNDCLOUD',
  VIMEO: 'VIMEO'
};

/*  =============================================================================
    Function initializeYoutubeIFrame

    This function initializes and creates the <iframe> (and YouTube player). This
    goes into youtube.js and calls onYoutubeIframeAPIREADY after player finishes 
    initializing.
    ========================================================================== */
function initializeYoutubeIFrame() {
  // This code loads the Youtube IFrame Player API code asynchronously.
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

/*  =============================================================================
    Function initializeYoutubeIFrame

    Plays the media with the given media type
    ========================================================================== */
function playMediaByMediaType(mediaData) {
  switch(mediaData.mediaType) {
    case MEDIATYPES.YOUTUBE:
      youtubePlayVideo();
      // youtubeSeekTo(mediaData.elapsedTime);
      break;
    case MEDIATYPES.SOUNDCLOUD:
      // TODO: Play Soundcloud
      break;
    case MEDIATYPES.VIMEO:
      // TODO: Play Vimeo
      break;
    case MEDIATYPES.NONE:
      // Remove the players
      break;
    default:
      break;
  }
}

/*  =============================================================================
    Function pauseMediaByMediaType

    Pauses the media with the given media type
    ========================================================================== */
function pauseMediaByMediaType(mediaData) {
  switch(mediaData.mediaType) {
    case MEDIATYPES.YOUTUBE:
      youtubePauseVideo();
      break;
    case MEDIATYPES.SOUNDCLOUD:
      // TODO: Pause Soundcloud
      break;
    case MEDIATYPES.VIMEO:
      // TODO: Pause Vimeo
      break;
    case MEDIATYPES.NONE:
      // Remove the players
      break;
    default:
      break;
  }
}

/*  =============================================================================
    Main Component MediaPlayer

    @Component: 
      StatusBar -

      MediaPlayer - The entire media player containing subcomponents of the play,
                    pause, and status bar.

    @Export: MediaPlayer
    ========================================================================== */
/* Media player */
var MediaPlayer = React.createClass({
  getInitialState: function() {
    return {
      mediaState: MEDIAPLAYERSTATES.NONE,
      mediaType: MEDIATYPES.NONE
    };
  },

  componentDidMount: function() {
    // Sets up event handlers for when socket sends from server to client
    socket.on('From Server: Initialize media player', this.initializeMedia);
    socket.on('From Server: Send media player states', this.getMediaPlayerStates);
    socket.on('From Server: Get elapsed time', this.getElapsedTime);
    socket.on('From Server: Send elapsed time', this.sendElapsedTime);
    socket.on('From Server: Play media', this.playMedia);
    socket.on('From Server: Pause media', this.pauseMedia);

    // When a new client joins the room, initializes the player state depending on the current state
    socket.emit('From Client: Entering page, check initial media player state', 0);
  },

  initializeMedia: function(mediaData) {
    console.log("Initializing Media");
    mediaCurrentTimeElapsed = mediaData.elapsedTime;
    this.setState({mediaType: mediaData.mediaType}, function() {
      switch(this.state.mediaType) {
        case MEDIATYPES.YOUTUBE:
          initializeYoutubeIFrame();
          break;
        case MEDIATYPES.SOUNDCLOUD:
          break;
        case MEDIATYPES.VIMEO:
          break;
        case MEDIATYPES.NONE:
          // Remove the players
          break;
        default:
          // ERROR
          break;
      }
    });
  },

  getMediaPlayerStates: function(mediaData) {
    console.log("getMediaPlayerState");
    console.log(mediaData);
    this.setState({mediaState: mediaData.state}, function() {
      switch(this.state.mediaState) {
        case MEDIAPLAYERSTATES.PLAYING:
          playMediaByMediaType(mediaData);
          break;
        case MEDIAPLAYERSTATES.PAUSED:
          pauseMediaByMediaType(mediaData);
        case MEDIAPLAYERSTATES.NONE:
          break;
        default:
          // ERROR
          break;
      }
    });
  },

  getElapsedTime: function(data, callback) {
    console.log("Getting an elapsed time " + youtubeGetCurrentTime());
    mediaCurrentTimeElapsed = youtubeGetCurrentTime();
    
    callback(mediaCurrentTimeElapsed)
    // socket.emit('From Client: Send elapsed time', mediaCurrentTimeElapsed);
  },

  sendElapsedTime: function(serverTime) {
    console.log("Sending an elapsed time " + serverTime);
    mediaCurrentTimeElapsed = serverTime;
    socket.emit('From Client: Initialize media player with server data', 0);
  },

  playMedia: function(mediaData) {
    // this.setState({mediaState: MEDIAPLAYERSTATES.PLAYING}, function() {
    //   playMediaByMediaType(mediaData);
    // });
    playMediaByMediaType(mediaData);
  },

  pauseMedia: function(mediaData) {
    // this.setState({mediaState: MEDIAPLAYERSTATES.PAUSED}, function() {
    //   pauseMediaByMediaType(mediaData);
    // });
    pauseMediaByMediaType(mediaData);
  },

  render: function() {
    var mediaPlayer;

    return (
      <div>
        <div id='media-player'>
          {mediaPlayer}
        </div>
        <div id='status-bar'>
          <StatusBar />
        </div>
      </div>
    );
  }
});

module.exports = MediaPlayer;