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

// TODO: The scripts for the React librarys are through cdns, want to change this in order for them to be locally stored into our
// directories, do the same for jquery as well.
var Index = React.createClass({
  render: function () {
    return (
      <html lang="en">
        <head>
          <link rel="stylesheet" href="/css/style.css"/>
          <link rel="stylesheet" href="/css/bootstrap.min.css"/>
          <link rel="stylesheet" href="/css/plyr.css"/>
          <link rel="stylesheet" href="/css/font-awesome.min.css"/>

          <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js"></script>
        </head>

        <body>

          <div className="header">
            <img className="header-logo" src="/images/logo.png"/>
          </div>

          <div className="banner-container">
            <div className="vid-chat-container">

              <div className="video-container">
                <div id="media-player-status-bar">
                  <MediaPlayer />
                </div>
                
              </div>

              <div className="chatbox-container">
               <Chatbox />
              </div>

            </div>
          </div>

          {/* Queue and tabbed contents */}
          <div className="main-container">

            <div id='queue'>
              <Queue />
            </div>

            <div className="col-md-8 tabbed-container">
              <ul className="nav nav-tabs">
                <li className="active"><a data-toggle="tab" href="#explore">Explore </a></li>
                <li><a data-toggle="tab" href="#myplaylists">Private Playlists</a></li>
                <li><a data-toggle="tab" href="#search">Search</a></li>
              </ul>

              <div className="tab-content">
                <div id="explore" className="tab-pane fade in active">
                  <Explore />
                </div>

                <div id="myplaylists" className="tab-pane fade">
                  <PrivatePlaylists />
                </div>

                <div id="search" className="tab-pane fade">
                  <Search />
                </div>
              </div>
            </div>
          </div>

          <script src="js/jquery.min.js"></script>
          <script src="js/bootstrap.min.js"></script>
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
          <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
          {/*<script src="js/bootstrap-slider.min.js"></script>*/}

          <script src="js/plyr.js"></script>

          {/* Rangetouch to fix <input type="range"> on touch devices (see https://rangetouch.com) */} 
          <script src="https://cdn.rangetouch.com/0.0.9/rangetouch.js" async></script>

          {/* Files to initialize constants */} 
          <script src="/js/constantVariables.js"></script>

          {/* Files to initialize objects */} 
          <script src="/js/objectInit.js"></script>

          {/* Socket.io */} 
          <script src="../socket.io/socket.io.js"></script>
          <script src="/js/socket.js"></script>
          
          {/* Browserify bundle */} 
          <script src="/bundle.js"></script>
          <script src="/js/chat.js"></script>
          <script src="/js/youtube.js"></script>

          {
          // <script src="/js/media.js"></script>
          }

          <script src="js/drag-arrange.js"></script>
          {/*<script src="js/drag-arrange.min.js"></script>*/}
          <script src="js/script.js"></script>

          {/* Youtube API */} 
          <script src="https://apis.google.com/js/client.js?onload=OnLoadCallback"></script>
          {/* <script src="https://apis.google.com/js/client.js?onload=googleApiClientReady"></script> */}

        </body>
      </html>
    );  
  }
});

module.exports = Index;