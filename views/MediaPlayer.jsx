/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    MediaPlayer.jsx

    Component of the media player. Contains the status bar and the media player
    ========================================================================== */

/*  =============================================================================
    Main Component MediaPlayer

    @Component: 
      StatusBar -

      MediaPlayer - The entire media player containing subcomponents of the play,
                    pause, and status bar.

    @Export: MediaPlayer
    ========================================================================== */
var React = require('react');
var StatusBar = require('./StatusBar');

/*  =============================================================================
    Function initializeYoutubeIFrame

    Plays the media with the given media type
    ========================================================================== */
function playMediaByMediaType(mediaData) {
  switch(mediaData.mediaType) {
    case MEDIATYPES.YOUTUBE:
      youtubePlayVideo(mediaData);
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
      // ERROR
      console.log("ERROR: No media type");
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
      youtubePauseVideo(mediaData);
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
      // ERROR
      console.log("ERROR: No media type");      
      break;
  }
}

/* Placeholder for when no media is loaded */
var VideoPlaceholder = React.createClass({
  render: function() {
    return (
      <div className="placeholder placeholder-video">
        <div className="placeholder-content">
          <i className="fa fa-moon-o placeholder-icon"></i><br/>
          <span>You don't have any videos</span>
        </div>
      </div>
    );
  }
});

/* Placeholder for when no media is loaded */
var VideoReady = React.createClass({
  render: function() {
    return (
      <div className="placeholder placeholder-video">
        <div className="placeholder-content">
          <i className="fa fa-play placeholder-icon"></i><br/>
          <span>Play your queue</span>
        </div>
      </div>
    );
  }
});

/* Placeholder for when video is loading */
var VideoLoading = React.createClass({
  render: function() {
    return (
      <div className="placeholder placeholder-video">
        <div className="placeholder-content">
          <i className="fa fa-circle-o-notch fa-spin placeholder-icon"></i><br/>
          <span>Loading</span>
        </div>
      </div>
    );
  }
});

/* Placeholder for when video is syncing */
var VideoSyncing = React.createClass({
  render: function() {
    return (
      <div className="placeholder placeholder-video">
        <div className="placeholder-content">
          <i className="fa fa-refresh fa-spin placeholder-icon"></i><br/>
          <span>Syncing</span>
        </div>
      </div>
    );
  }
});

/* Media player */
var MediaPlayer = React.createClass({
  getInitialState: function() {
    return {
      mediaState: 'NONE',
      mediaType: 'NONE'
    };
  },

  componentDidMount: function() {
    // Sets up event handlers for when socket sends from server to client
    socket.on('From Server: Initialize media player', this.initializeMedia);
    socket.on('From Server: Send media player states', this.sendMediaPlayerStates);
    socket.on('From Server: Get elapsed time for specific client', this.getElapsedTimeForSpecificClient);
    socket.on('From Server: Load media entry', this.loadMedia);
    socket.on('From Server: Play media', this.playMedia);
    socket.on('From Server: Pause media', this.pauseMedia);
    socket.on('From Server: Change media player to none', this.changeMediaPlayerToNone);

    // When a new client joins the room, initializes the player state depending on the current state
    socket.emit('From Client: Entering page, check initial media player state', 0);
  },

  // EVENT HANDLER: Initializes the media with with the data sent from the server
  initializeMedia: function(mediaData) {
    console.log("Initializing Media");
    
    this.setState({mediaType: mediaData.mediaType}, function() {
      initializeYoutubeIFrame(mediaData);  
      
      // TODO: Initialize Soundcloud
      // initializeSoundcloudPlayer(mediaData);  

      // TODO: Initialize Vimeo
      // initializeVimeoPlayer(mediaData);  
    });
  },

  // EVENT HANDLER: Sends the state of the media players
  sendMediaPlayerStates: function(mediaData) {
    console.log("sendMediaPlayerState");
    this.setState({mediaState: mediaData.state}, function() {
      switch(this.state.mediaState) {
        case MEDIAPLAYERSTATES.PLAYING:
          playMediaByMediaType(mediaData);
          break;
        case MEDIAPLAYERSTATES.PAUSED:
          pauseMediaByMediaType(mediaData);
          break;
        case MEDIAPLAYERSTATES.NONE:
          // EMPTY
          break;
        default:
          // ERROR
          console.log("ERROR: No media state");
          break;
      }
    });
  },

  // EVENT HANDLER: When a client requests the time, gets all the elapsed times of every other client and sends it back to the original client.
  getElapsedTimeForSpecificClient: function(clientId) {
    var mediaCurrentTimeElapsed = youtubeGetCurrentTime();

    socket.emit('From Client: Send elapsed time to specific client', {
      clientId: clientId,
      clientCurrentTime: mediaCurrentTimeElapsed,
    });
  },

  // EVENT HANDLER: Loads the specified media player
  loadMedia: function(mediaData) {
    this.setState({mediaType: mediaData.mediaType}, function() {
      switch(this.state.mediaType) {
        case MEDIATYPES.YOUTUBE:
          youtubeLoadVideo(mediaData);
          console.log("Loaded Youtube Media: loadMEdia");
          break;
        case MEDIATYPES.SOUNDCLOUD:
          // TODO: Load Soundcloud
          break;
        case MEDIATYPES.VIMEO:
          // TODO: Load Vimeo
          break;
        case MEDIATYPES.NONE:
          // TODO: Remove the players
          break;
        default:
          // ERROR
          console.log("ERROR: No media type");
          break;
      }
    });
  },

  // EVENT HANDLER: Plays media with given type
  playMedia: function(mediaData) {
    this.setState({mediaState: MEDIAPLAYERSTATES.PLAYING}, function() {
      playMediaByMediaType(mediaData);
    });
  },

  // EVENT HANDLER: Pauses media with given type
  pauseMedia: function(mediaData) {
    this.setState({mediaState: MEDIAPLAYERSTATES.PAUSED}, function() {
      pauseMediaByMediaType(mediaData);
    });
  },

  // EVENT HANDLER: When media player has ended
  changeMediaPlayerToNone: function() {
    console.log("ENDING: Media player");
    this.setState({mediaState: MEDIAPLAYERSTATES.NONE}, function() {
      resetYoutubeObj();
    })
  },

  render: function() {
    // Media player is loaded onto the media-player div
    var videoPlaceholder = [];

    if() {
      videoPlaceholder.push(
        <VideoPlaceholder />
      );
    };

    else if() {
      videoPlaceholder.push(
        <VideoReady />
      );
    };

    else if() {
      videoPlaceholder.push(
        <VideoLoading />
      );
    };

    else if() {
      videoPlaceholder.push(
        <VideoSyncing />
      );
    };

    return (
      <div>
        <div className="player">
          <div className="player-video-embed">
            {videoPlaceholder}
            <div id='media-player' className='js-plyr' data-type="youtube"></div>
            {
              // TODO: Get the Status bar working

              // <div id='status-bar'>
              //   <StatusBar />
              // </div>
            }
          </div>
        </div>
      </div>
    );
  }
});

module.exports = MediaPlayer;