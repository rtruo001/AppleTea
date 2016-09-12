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
var MyPlaylists = require('./MyPlaylists');
var ModalCreatePlaylist = require('./ModalCreatePlaylist');
var Search = require('./Search');
var Footer = require('./Footer');

// MAIN COMPONENT: Room
var Room = React.createClass({
  getInitialState: function() {
    if (this.props.myPlaylists  === undefined || this.props.myPlaylists === null) {
      return {
        myPlaylists: []
      };
    }
    else {
      return {
        myPlaylists: this.props.myPlaylists
      };  
    }
  },

  componentDidMount: function() {
    socket.on("From Server: Update MyPlaylist with new playlists" , this.updateAllPlaylistEntries);
    socket.on("From Server: Update selected playlist", this.updateOnePlaylistEntry);

    socket.emit("From Client: Initialize room", this.props.roomId);
  },

  // EVENT HANDLER: Update the playlist entry
  updateAllPlaylistEntries: function(newPlaylist) {
    console.log("Update with new playlist entry")
    var playlistsWithNewEntry = this.state.myPlaylists.concat(newPlaylist);
    this.setState({myPlaylists : playlistsWithNewEntry}); 
  },

  // EVENT HANDLER: Updates the client's playlist entry when a media is pushed in
  updateOnePlaylistEntry: function(newPlaylist) {
    // TODO: Find a better method instead of this, or maybe not
    var updatedMyPlaylists = this.state.myPlaylists;
    var playlistEntry;
    // Increments through every playlist entry to find the existing playlist.
    for (var i = 0; i < this.state.myPlaylists.length; ++i) {
      playlistEntry = this.state.myPlaylists[i];
      if (playlistEntry._id === newPlaylist._id) {
        updatedMyPlaylists[i] = newPlaylist;
        this.setState({myPlaylists : updatedMyPlaylists});     
        return;
      }
    }
  },

  render: function() {
    return(
      <div>
        <div className="content-container">

          {/* Page Overlay // to freeze screen when modal/popup is active */}
          <div id="page-overlay"></div>

          {/* Header */}
          <Header user={this.props.user} />

          {/* Video and Chat Banner */}
          <div className="banner-container">
            <div className="banner-content-container">

              {/* Video */}
              <div className="video-container">
                <MediaPlayer />
              </div>

              {/* Mobile Tab Navigation // replaces regular tabs in mobile */}
              <div className="mobile-tabbed-container">
                <ul className="nav nav-tabs nav-centered">
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
              <div className="col-md-4 col-sm-5 queue-container" id="queue">
                <Queue user={this.props.user} />
              </div>

              {/* Desktop Tab Navigation */}
              <div className="col-md-8 col-sm-7 tabbed-container tabbed-container-mobile-collapse">
                <ul className="nav nav-tabs nav-tabs-mobile-collapse">
                  <li className="active">
                    <a data-toggle="tab" href="#explore" id="tab-explore">
                      <i className="fa fa-rocket icon-padding"></i>
                      <div className="tab-text">Explore</div>
                    </a>
                  </li>
                  <li>
                    <a data-toggle="tab" href="#myplaylists" id="tab-myplaylists">
                      <i className="fa fa-book icon-padding"></i>
                      <div className="tab-text">My Playlists</div>
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
                    <Explore explore={this.props.explore} />
                  </div>

                  {/* My Playlists */}
                  <div id="myplaylists" className="tab-pane fade">
                    <MyPlaylists myPlaylists={this.state.myPlaylists} />
                  </div>

                  {/* Search */}
                  <div id="search" className="tab-pane fade">
                    <Search user={this.props.user} myPlaylists={this.state.myPlaylists} />
                  </div>

                  {/* Modal for create new playlist button, there is no media entry when this button is clicked */}
                  <ModalCreatePlaylist key={"newPlaylist"} user={this.props.user} data={null} pos={null} />

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