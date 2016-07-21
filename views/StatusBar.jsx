var React = require('react');

var StatusBar = React.createClass({
  render: function() {
    return (
      <div id='status-bar'>
        StatusBar
        <button>Play</button>
        <button>Pause</button>
        <input id='slider' type='range' min='0' max='100' value='0' step='1' onChange={this.onStatusBarChange}/>
        <input id='volume-slider' type='range' min='0' max='100' value='100' step='1'/>

        <button>Shuffle</button>
        <button>Loop</button>
      </div>
    );
  }
});

module.exports = StatusBar;