/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    objectInit.js

    Initializes objects used throughout the project
    ========================================================================== */

// TODO: Eventually want to change it more into a singleton with OOP properties
var youtubeObj = {
  youtubeVideoId: null,
  youtubeStartTime: null,
  youtubeElapsedTime: null,
  youtubeCurrentState: MEDIAPLAYERSTATES.NONE,
  youtubeIfAlreadySentFromOneClient: false,
  youtubeIfInitialized: false
};

// TODO: Move player into youtubeObj and change it to youtubePlayer
var player = null;

// TODO: Soundcloud Object

// TODO: Vimeo Object

