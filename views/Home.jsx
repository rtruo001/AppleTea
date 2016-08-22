/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    Home.jsx

    Home page displayed when logging in.
    Instant option to select room to join, or browse playlists.
    ========================================================================== */

/*  =============================================================================
    Components

    Home - Entire html for the Home component.
    ========================================================================== */
var React = require('react');

// Sub-components in Room
var Header = require('./Header');
var PublicRooms = require('./PublicRooms');
var MyRooms = require('./MyRooms');
var Explore = require('./Explore');
var MyPlaylists = require('./MyPlaylists');
var Footer = require('./Footer');

// MAIN COMPONENT: Home
var Home = React.createClass({
  render: function() {
    return(
      <div>
        <div className="content-container">

          {/* Page Overlay // to freeze screen when modal/popup is active */}
          <div id="page-overlay"></div>

          {/* Header */}
          <Header />

          {/* Rooms Banner */}
          <div className="banner-container">
            <div className="banner-content-container">

              {/* Banner Tabs */}
              <div className="col-sm-offset-1 col-sm-10 tabbed-container">
                <ul className="nav nav-tabs nav-centered nav-dark">
                  <li>
                    <a id="tab-publicrooms" data-toggle="tab" href="#publicrooms">
                      <i className="fa fa-globe icon-padding"></i>Public Rooms
                    </a>
                  </li>
                  <li className="active">
                    <a id="tab-myrooms" data-toggle="tab" href="#myrooms">
                      <i className="fa fa-home icon-padding"></i>My Rooms
                    </a>
                  </li>
                </ul>

                <div className="tab-content">

                  {/* Public Rooms */}
                  <div id="publicrooms" className="tab-pane fade">
                    <PublicRooms />
                  </div>

                  {/* My Rooms */}
                  <div id="myrooms" className="tab-pane fade in active">
                   <MyRooms />
                  </div>

                </div>
              </div>

            </div>
          </div>

          {/* Main Container */}
          <div className="main-container">
            <div className="row">

              {/* Message */}
              <div className="col-padding">
                <div className="placeholder placeholder-message">
                  <div className="placeholder-content">
                    <i className="fa fa-chevron-up placeholder-icon"></i><br/>
                    <span>You must enter a room to play a playlist</span>
                  </div>
                </div>
              </div>

              {/* Playlist Tab Navigation */}
              <div className="col-sm-offset-1 col-sm-10 tabbed-container">
              
                <ul className="nav nav-tabs nav-centered">
                  <li className="active">
                    <a id="tab-explore" data-toggle="tab" href="#explore">
                      <i className="fa fa-rocket icon-padding"></i>Explore
                    </a>
                  </li>
                  <li>
                    <a id="tab-myplaylists" data-toggle="tab" href="#myplaylists">
                      <i className="fa fa-book icon-padding"></i>My Playlists
                    </a>
                  </li>
                </ul>

                <div className="tab-content">

                  {/* Explore */}
                  <div id="explore" className="tab-pane fade in active">
                    <Explore />
                  </div>

                  {/* My Playlists */}
                  <div id="myplaylists" className="tab-pane fade">
                    <MyPlaylists />
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

module.exports = Home;