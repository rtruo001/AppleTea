/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    Room.jsx

    Every view of each individual room.
    The view of the entire index page. Main webpage
    ========================================================================== */

/*  =============================================================================
    Components

    Room - Entire html for the Room component. S
    ========================================================================== */
var React = require('react');

// Sub-components in Room
var Header = require('./Header');
var MediaPlayer = require('./MediaPlayer');
var Chatbox = require('./Chatbox');
var StatusBar = require('./StatusBar');
var Queue = require('./Queue');
var Explore = require('./Explore');
var PrivatePlaylists = require('./PrivatePlaylists');
var Search = require('./Search');
var Footer = require('./Footer');

// MAIN COMPONENT: Room
var Room = React.createClass({
  render: function() {
    return(
      <div>
        <div className="content-container">
          <div id="page-overlay"></div>

          <Header />

        {/* Video and Chat Banner */}
          <div className="banner-container">
            <div className="vid-chat-container">

              <div className="video-container">
                <MediaPlayer />
              </div>

              <div className="chatbox-container">
               <Chatbox />
              </div>

            </div>
          </div>

          {/* Queue and Tabbed contents */}
          <div className="main-container">
            <div className="row">
              <div className="col-md-4 col-sm-6 queue-container" id="queue">
                <Queue />
              </div>

              <div className="col-md-8 col-sm-6 tabbed-container">
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
          </div>

          <div className="push"></div>
        </div>

        <Footer />
        
      </div>
    );
  }
});

module.exports = Room;