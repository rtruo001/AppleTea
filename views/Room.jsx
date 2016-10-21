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
var Header = require('./Header.jsx');
var MediaPlayer = require('./MediaPlayer.jsx');
var Chatbox = require('./Chatbox.jsx');
var StatusBar = require('./StatusBar.jsx');
var Queue = require('./Queue.jsx');
var Explore = require('./Explore.jsx');
var MyPlaylists = require('./MyPlaylists.jsx');
var PlaylistTab = require('./PlaylistTab.jsx');
var EditOpenedPlaylist = require('./EditOpenedPlaylist.jsx');
var ViewOpenedPlaylist = require('./ViewOpenedPlaylist.jsx');
var ModalCreatePlaylist = require('./ModalCreatePlaylist.jsx');
var Search = require('./Search.jsx');
var Footer = require('./Footer.jsx');

// Flux, used to check for deleted playlists
var playlistStore = require('../flux/stores/store');

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
    // Sets up the Flux event listeners for the playlists
    playlistStore.addDeletePlaylistListener(this.onDeleteSpecifiedPlaylist);
    playlistStore.addUpdatePlaylistListener(this.onUpdateSpecifiedPlaylist);

    // socket.on('From Server: Initialize room by pinging client first', this.initializeRoomInServerWithData);
    socket.on("From Server: Update MyPlaylist with new playlists" , this.updateAllPlaylistEntries);
    socket.on("From Server: Update selected playlist", this.updateOnePlaylistEntry);
    
    socket.emit("From Client: Initialize room", {
      user: this.props.user,
      room: this.props.room
    });
  },

  componentWillUnmount: function() {
    // Unmounts the event listener
    playlistStore.removeDeletePlaylistListener(this.onDeleteSpecifiedPlaylist);
    playlistStore.removeUpdatePlaylistListener(this.onUpdateSpecifiedPlaylist);
  },

  // FLUX EVENT HANDLER: Deletes a playlist entry from myPlaylist
  onDeleteSpecifiedPlaylist: function() {
    console.log("Room.jsx: onDeleteSpecifiedPlaylist");
    var playlist = playlistStore.getPlaylistDeleted();
    if (playlist === null || playlist === undefined) {
      return;
    }

    // TODO: Do search in a faster way
    for (var i = 0; i < this.state.myPlaylists.length; ++i) {
      if (this.state.myPlaylists[i]._id === playlist._id) {
        // Show the playlist tab
        $('#tab-myplaylists').tab('show');

        var playlistsWithDeletedEntry = this.state.myPlaylists;
        playlistsWithDeletedEntry.splice(i, 1);
        this.setState({myPlaylists : playlistsWithDeletedEntry});
        return;
      }
    }
  },

  onUpdateSpecifiedPlaylist: function() {
    var playlist = playlistStore.getUpdatedPlaylist();
    if (playlist === null || playlist === undefined) {
      return;
    }

    // TODO: Do search in a faster way
    for (var i = 0; i < this.state.myPlaylists.length; ++i) {
      if (this.state.myPlaylists[i]._id === playlist._id) {
        var playlistsWithUpdatedEntry = this.state.myPlaylists;
        playlistsWithUpdatedEntry[i] = playlist; 
        this.setState({myPlaylists : playlistsWithUpdatedEntry});
        return;
      }
    }
  },

  // EVENT HANDLER: Initialize room for server
  initializeRoomInServerWithData: function() {
    socket.emit("From Client: Initialize room", {
      user: this.props.user,
      room: this.props.room
    });
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

                  <PlaylistTab type={"MyPlaylist-mobile"} user={this.props.user} />

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
             <Chatbox room={this.props.room} user={this.props.user} />
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
                  
                  <PlaylistTab type={"MyPlaylist"} user={this.props.user} />

                  <li>
                    <a data-toggle="tab" href="#search" className='focus-search' id="tab-search">
                      <i className="fa fa-search icon-padding"></i>
                      <div className="tab-text">Search</div>
                    </a>
                  </li>

                  <li>
                    <a className="hidden" data-toggle="tab" href="#edit-playlist" id="tab-edit-playlist"></a>
                  </li>

                  <li>
                    <a className="hidden" data-toggle="tab" href="#view-playlist" id="tab-view-playlist"></a>
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

                  {/* User's opened playlist */}
                  <div id="edit-playlist" className="tab-pane fade">
                    <EditOpenedPlaylist myPlaylists={this.state.myPlaylists} />
                  </div>

                  {/* Opened playlist */}
                  <div id="view-playlist" className="tab-pane fade">
                    <ViewOpenedPlaylist myPlaylists={this.state.myPlaylists} />
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