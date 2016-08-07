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
          <link rel="stylesheet" href="css/style.css"/>
          <link rel="stylesheet" href="css/bootstrap.min.css"/>
          <link rel="stylesheet" href="css/bootstrap-slider.css"/>
          <link rel="stylesheet" href="css/plyr.css">
          <link rel="stylesheet" href="css/font-awesome.min.css">

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

          <script src="js/script.js"></script>
          <script src="js/jquery.min.js"></script>
          <script src="js/bootstrap.min.js"></script>
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
          <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
          <script src="js/drag-arrange.min.js"></script>
          <script src="js/bootstrap-slider.min.js"></script>
          <script src="js/script.js"></script>
          <script src="js/plyr.js"></script>
          <script>plyr.setup();</script>
          <!-- Rangetouch to fix <input type="range"> on touch devices (see https://rangetouch.com) -->
          <script src="https://cdn.rangetouch.com/0.0.9/rangetouch.js" async></script>
          <!-- Sharing libary (https://shr.one) -->
          <script src="https://cdn.shr.one/0.1.9/shr.js"></script>
          <script>if(window.shr) { window.shr.setup({ count: { classname: 'btn__count' } }); }</script>

          <script src="../socket.io/socket.io.js"></script>
          <script src="/js/socket.js"></script>
          
          <script src="/bundle.js"></script>
          <script src="/js/chat.js"></script>
          <script src="/js/media.js"></script>
          <script src="https://apis.google.com/js/client.js?onload=OnLoadCallback"></script>
        </body>
      </html>
    );  
  }
});

module.exports = Index;