/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    index.jsx

    Index JSX View
    The view of the entire index page. Main webpage
    ========================================================================== */

/*  =============================================================================
    Components

    Index - Overall website
    ========================================================================== */
var React = require('react');
var ReactDOM = require('react-dom');

/* Media player */
var MediaPlayer = React.createClass({
  render: function() {
    return (
      <div id="media-player">

      </div>
    );
  }
});

/* Chatbox */
var Chatbox = React.createClass({
  render: function() {
    return (
      <div id="chat-box">
        <h1>Chatbox</h1>
        <ul id="chat-box-messages"></ul>

        <form id='chat-form' action="">
          <input id="m" autoComplete="off" />
          <button>Send</button>
        </form>

        <form id='username-form'>
          <input id="u" autoComplete="off" />
          <button>Send</button>
        </form>
      </div>
    );
  }
});

var StatusBar = React.createClass({
  render: function() {
    return (
      <div id='status-bar'>
        StatusBar
      </div>
    );
  }
});

var Queue = React.createClass({
  render: function() {
    return (
      <div id='queue'>
        Queue
      </div>
    );
  }
});

var Explore = React.createClass({
  render: function() {
    return (
      <div id='explore'>
        Explore
      </div>
    );
  }
});

var PrivatePlaylists = React.createClass({
  render: function() {
    return (
      <div id='private-playlists'>
        PrivatePlaylists
      </div>
    );
  }
});

var Search = React.createClass({
  render: function() {
    return (
      <div id='search'>
        Search
      </div>
    );
  }
});

var Index = React.createClass({
  render: function () {
    return (
      <html>
        <head>
          <link rel="stylesheet" href="/css/stylesheets/style.css"/>
          <link rel="stylesheet" href="/css/stylesheets/index.css"/>
        </head>

        <body>
          {this.props.title}
          <MediaPlayer />
          <Chatbox />
          <StatusBar />
          <Queue />
          <Explore />
          <PrivatePlaylists />
          <Search />

          <script src="http://code.jquery.com/jquery-1.11.1.js"></script>
          <script src="../socket.io/socket.io.js"></script>
          <script src="/javascripts/chat.js"></script>
          <script src="/javascripts/media.js"></script>
        </body>
      </html>
    );  
  }
});

module.exports = Index;