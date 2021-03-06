/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    Index.jsx

    Index JSX View
    The view of the entire index page. Main webpage, currently is a room only
    ========================================================================== */

/*  =============================================================================
    Components

    Index - Overall website
    ========================================================================== */
var React = require('react');

// Home
var Home = require('./Home.jsx');

// A utility function to safely escape JSON for embedding in a <script> tag
function safeStringify(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
}

// TODO: The scripts for the React librarys are through cdns, want to change this in order for them to be locally stored into our
// directories, do the same for jquery as well.
var Index = React.createClass({

  render: function () {
    var json = safeStringify(this.props.homeData);
    var homeProps = <script id="home-props" type="application/json" dangerouslySetInnerHTML={{__html: json}}></script>;

    return (
      <html lang="en">
        <head>
          <link href='https://fonts.googleapis.com/css?family=Nunito:300,400' rel='stylesheet' type='text/css'/>
          <link rel="stylesheet" href="css/style.css"/>
          <link rel="stylesheet" href="css/bootstrap.min.css"/>
          <link rel="stylesheet" href="css/plyr.css"/>
          <link rel="stylesheet" href="css/font-awesome.min.css"/>
          <link rel="stylesheet" href="css/toggle-slider.css" />
          <link rel="stylesheet" href="css/jquery.mCustomScrollbar.css" />

          <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.2.0/react.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.2.0/react-dom.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js"></script>
        </head>

        <body>
          {/* Entire home component */}
          <div id="home">
            <Home user={this.props.homeData.user} rooms={this.props.homeData.rooms} explore={this.props.homeData.explore} myPlaylists={this.props.homeData.myPlaylists} />
          </div> 

          {/* Injected script data from MongoDB sent from the server */}
          {homeProps}

          {/* <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script> */}
          {/* <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script> */}

          {/* Socket.io */} 
          <script src="../socket.io/socket.io.js"></script>

          {/* DEVELOPMENT 
              Need to comment this entire section when going into production
          */}
          <script src="/js/constantVariables.js"></script>
          <script src="/js/socket.js"></script>
          <script src="/js/jquery.min.js"></script>
          <script src="/js/bootstrap.min.js"></script>
          <script src="/bundles/homeBundle.js"></script>
          
          {/* PRODUCTION 
              Uncomment this line when going into production
          */} 
          {
          //<script src="/js/home.js"></script>
          }

          {/* Rangetouch to fix <input type="range"> on touch devices (see https://rangetouch.com) */} 
          <script src="https://cdn.rangetouch.com/0.0.9/rangetouch.js" async></script>

        </body>
      </html>
    );  
  }
});

module.exports = Index;