// Converts all the components in this file into Javascript
// All the .jsx files are given in views directory
// Browserify allows require to be used on the Client Side

// Current Command to bundle all the components into bundle.js:
// browserify ./public/main.js -o ./public/bundle.js -t [ babelify --presets [ es2015 react ] ] --extension=.jsx

// Put this at the bottom of the HTML file. At the beginning of all the scripts
// <script src="/bundle.js"></script>

var MediaPlayerComponent = require('./../views/MediaPlayer.jsx');
var SearchComponent = require('./../views/Search.jsx');
var QueueComponent = require('./../views/Queue.jsx');

// var WebApp = require('./../views/index.jsx');
// ReactDOM.render(<WebApp />, document.getElementById('index'));

ReactDOM.render(<MediaPlayerComponent />, document.getElementById('media-player-status-bar'));
ReactDOM.render(<SearchComponent />, document.getElementById('search'));
ReactDOM.render(<QueueComponent />, document.getElementById('queue'));
