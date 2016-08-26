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

// Home and Room component
var Home = require('./Home');
var Room = require('./Room');

// TODO: The scripts for the React librarys are through cdns, want to change this in order for them to be locally stored into our
// directories, do the same for jquery as well.
var Index = React.createClass({

// function createMarkup() { return {__html: 'First &middot; Second'}; };
// <div dangerouslySetInnerHTML={createMarkup()} />

  render: function () {
    // IMPORTANT TODO
    // TODO: Convert the json to safeStringify
    // TODO is needed to prevent XSS attacks
    // The props are read from main.js
    var json = this.props.propsStr;
    var roomProps = <script id="room-props" type="application/json" dangerouslySetInnerHTML={{__html: json}}></script>;

    return (
      <html lang="en">
        <head>
          <link href='https://fonts.googleapis.com/css?family=Nunito:300,400' rel='stylesheet' type='text/css'/>
          <link rel="stylesheet" href="/css/style.css"/>
          <link rel="stylesheet" href="/css/bootstrap.min.css"/>
          <link rel="stylesheet" href="/css/plyr.css"/>
          <link rel="stylesheet" href="/css/font-awesome.min.css"/>
          <link rel="stylesheet" href="css/toggle-slider.css" />

          <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.2.0/react.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.2.0/react-dom.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js"></script>
        </head>

        <body>

          {/* Room Page */}
          <div id="room">
            <Room title={this.props.title} user={this.props.user} explore={this.props.explore} myPlaylists={this.props.myPlaylists} />
          </div>

          {/* Testing for Home
          <div>
            <Home />
          </div> */}

          {/* Injected script data from MongoDB sent from the server */}
          {roomProps}

          {/* Files to initialize constants */} 
          <script src="/js/constantVariables.js"></script>

          {/* Files to initialize objects */} 
          <script src="/js/objectInit.js"></script>

          {/* Socket.io */} 
          <script src="../socket.io/socket.io.js"></script>
          <script src="/js/socket.js"></script>

          {/* Browserify bundle */} 
          <script src="/bundle.js"></script>

          <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
          <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
          <script src="js/jquery.min.js"></script>
          <script src="js/bootstrap.min.js"></script>

          {/* Rangetouch to fix <input type="range"> on touch devices (see https://rangetouch.com) */} 
          <script src="https://cdn.rangetouch.com/0.0.9/rangetouch.js" async></script>
          
          <script src="/js/chat.js"></script>
          <script src="/js/youtube.js"></script>

          {/* Need to minifiy drag-arrange file */}
          <script src="js/drag-arrange.js"></script>
          {/*<script src="js/drag-arrange.min.js"></script>*/}

          {/* Handles some front end implementations */}
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