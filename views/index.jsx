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
var ReactDOMServer = require('react-dom/server');

var MediaPlayer = require('./MediaPlayer');
var Chatbox = require('./Chatbox');
var StatusBar = require('./StatusBar');
var Queue = require('./Queue');
var Explore = require('./Explore');
var PrivatePlaylists = require('./PrivatePlaylists');
var Search = require('./Search');

// var searchHTML = ReactDOMServer.renderToString(<SearchComponent />);

// TODO: The scripts for the React librarys are through cdns, want to change this in order for them to be locally stored into our
// directories, do the same for jquery as well.
var Index = React.createClass({
  render: function () {
    return (
      <html lang="en">
        <head>
          <link rel="stylesheet" href="/css/stylesheets/style.css"/>
          <link rel="stylesheet" href="/css/stylesheets/index.css"/>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js"></script>
        </head>

        <body>
          <div id='index'>
            {this.props.title}
            <MediaPlayer />
            <Chatbox />
            <StatusBar />
            <div id='queue'>
              <Queue />
            </div>
            <Explore />
            <PrivatePlaylists />
            <div id='search'>
              <Search />
            </div>
          </div>

          <script src="http://code.jquery.com/jquery-1.11.1.js"></script>
          <script src="/bundle.js"></script>
          <script src="../socket.io/socket.io.js"></script>
          <script src="/javascripts/chat.js"></script>
          <script src="/javascripts/media.js"></script>
          <script src="https://apis.google.com/js/client.js?onload=OnLoadCallback"></script>
        </body>
      </html>
    );  
  }
});

module.exports = Index;