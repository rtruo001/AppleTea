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

          {/* Page Overlay // to freeze screen when modal/popup is active */}
          <div id="page-overlay"></div>

          {/* Header */}
          <Header />

          {/* Video and Chat Banner */}
          <div className="banner-container">
            <div className="vid-chat-container">

              {/* Video */}
              <div className="video-container">
                <MediaPlayer />
              </div>

              {/* Mobile Tab Navigation // replaces regular tabs in mobile */}
              <div className="mobile-tabbed-container">
                <ul className="nav nav-tabs">
                  <li className="active">
                    <a data-toggle="tab" href="#chat" id="mobile-tab-chat">
                      <i className="fa fa-comments icon-padding"></i>
                      <div className="tab-text">Chat</div>
                    </a>
                  </li>
                  <li>
                    <a data-toggle="tab" href="#queue" id="mobile-tab-queue">
                      <i className="fa fa-list-ul icon-padding"></i>
                      <div className="tab-text">Queue</div>
                    </a>
                  </li>
                  <li>
                    <a data-toggle="tab" href="#explore" id="mobile-tab-explore">
                      <i className="fa fa-rocket icon-padding"></i>
                      <div className="tab-text">Explore</div>
                    </a>
                  </li>
                  <li>
                    <a data-toggle="tab" href="#myplaylists" id="mobile-tab-myplaylists">
                      <i className="fa fa-book icon-padding"></i>
                      <div className="tab-text">My Playlists</div>
                    </a>
                  </li>
                  <li>
                    <a data-toggle="tab" href="#search" className='focus-search' id="mobile-tab-search">
                      <i className="fa fa-search icon-padding"></i>
                      <div className="tab-text">Search</div>
                    </a>
                  </li>
                </ul>
              </div>

            {/* Chat */}
              <div className="chatbox-container">
               <Chatbox />
              </div>

            </div>
          </div>

          {/* Main Container // queue and tabbed containers*/}
          <div className="main-container">
            <div className="row">

              {/* Queue */}
              <div className="col-md-4 col-sm-6 queue-container" id="queue">
                <Queue />
              </div>

              {/* Desktop Tab Navigation */}
              <div className="col-md-8 col-sm-6 tabbed-container">
                <ul className="nav nav-tabs">
                  <li className="active">
                    <a data-toggle="tab" href="#explore" id="tab-explore">
                      <i className="fa fa-rocket icon-padding"></i>
                      <div className="tab-text">Explore</div>
                    </a>
                  </li>
                  <li>
                    <a data-toggle="tab" href="#myplaylists" id="tab-myplaylists">
                      <i className="fa fa-book icon-padding"></i>
                      <div className="tab-text">Private Playlists</div>
                    </a>
                  </li>
                  <li>
                    <a data-toggle="tab" href="#search" className='focus-search' id="tab-search">
                      <i className="fa fa-search icon-padding"></i>
                      <div className="tab-text">Search</div>
                    </a>
                  </li>
                </ul>

                {/* Desktop Tabbed Containers */}
                <div className="tab-content">

                  {/* Explore */}
                  <div id="explore" className="tab-pane fade in active">
                    <Explore />
                  </div>

                  {/* My Playlists */}
                  <div id="myplaylists" className="tab-pane fade">
                    <PrivatePlaylists />
                  </div>

                  {/* Search */}
                  <div id="search" className="tab-pane fade">
                    <Search />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Footer Push */}
          <div className="push"></div>
        </div>

        {/* Footer */}
        <Footer />
        
      </div>
    );
  }
});

module.exports = Room;