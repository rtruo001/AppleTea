/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    StatusBar.jsx

    Component of the status bar.
    ========================================================================== */
var React = require('react');

var PlayPauseButton = React.createClass({
  render: function() {
    return(
      <div id='play-pause-button'>
        <button>Play</button>
        <button>Pause</button>
      </div>
    );
  }
});

var ElapsedTimeBar = React.createClass({
  getInitialState: function() {
    return {
      elapsedTime: 0
    };
  },

  onElapsedTimeBarChange: function() {
    // TODO: Change to all media types
    this.setState({elapsedTime: document.getElementById('media-elapsed-time-slider').value}, function() {
      onElapsedTimeBarChange(this.state.elapsedTime);  
    });
  },

  render: function() {
    return(
      <div>
        Elapsed
        <input id='media-elapsed-time-slider' type='range' min='0' max='100' value={this.state.elapsedTime} step='1' onChange={this.onElapsedTimeBarChange}/>
      </div>
    );
  }
});

var VolumeSlider = React.createClass({
  getInitialState: function() {
    return {
      volume: 100
    };
  },

  onVolumeBarChange: function() {
    // TODO: Change to all media types
    this.setState({volume: document.getElementById('media-volume-slider').value}, function() {
      youtubeVolumeChange(this.state.volume);
    });
  },

  render: function () {
    return(
      <div>
        Volume
        <input id='media-volume-slider' type='range' min='0' max='100' value={this.state.volume} step='1' onChange={this.onVolumeBarChange}/>
      </div>
    );
  }
});

var StatusBar = React.createClass({
  render: function() {
    return (
      <div id='status-bar'>
        StatusBar
        <PlayPauseButton />
        <ElapsedTimeBar />
        <VolumeSlider />
      </div>
    );
  }
});

module.exports = StatusBar;