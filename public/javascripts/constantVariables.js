/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    constantVariables.js

    Initializes constants used throughout the project
    ========================================================================== */

// Current Client player states
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

// Client category of media entries
const CATEGORYOFMEDIA = {
  QUEUE: 'QUEUE',
  SEARCH: 'SEARCH'
};

// Media player's max volume
const VOLUME_MAX = 100;

// Position in the Queue for the media entry that would play next
const PLAYNEXTMEDIAENTRYPOS = 0;

const MAX_SEARCH_RESULTS = 10;