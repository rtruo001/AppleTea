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
var Header = require('./Header.jsx');
var PublicRooms = require('./PublicRooms.jsx');
var MyRooms = require('./MyRooms.jsx');
var Explore = require('./Explore.jsx');
var MyPlaylists = require('./MyPlaylists.jsx');
var PlaylistTab = require('./PlaylistTab.jsx');
var EditOpenedPlaylist = require('./EditOpenedPlaylist.jsx');
var ViewOpenedPlaylist = require('./ViewOpenedPlaylist.jsx');
var ModalCreatePlaylist = require('./ModalCreatePlaylist.jsx');
var Footer = require('./Footer.jsx');

// Flux, used to check for deleted playlists
var playlistStore = require('../flux/stores/store');

// MAIN COMPONENT: Home
var Home = React.createClass({
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
    playlistStore.addCreatePlaylistListener(this.updateAllPlaylistEntries);

    socket.on("From Server: Update MyPlaylist with new playlists" , this.updateAllPlaylistEntries);
  },

  componentWillUnmount: function() {
    // Unmounts the event listener
    playlistStore.removeDeletePlaylistListener(this.onDeleteSpecifiedPlaylist);
    playlistStore.removeUpdatePlaylistListener(this.onUpdateSpecifiedPlaylist);
    playlistStore.removeCreatePlaylistListener(this.updateAllPlaylistEntries);
  },

  // FLUX EVENT HANDLER: Deletes a playlist entry from myPlaylist
  onDeleteSpecifiedPlaylist: function() {
    console.log("Room.jsx: onDeleteSpecifiedPlaylist");
    var playlist = playlistStore.getPlaylistDeleted();
    if (playlist === null || playlist === undefined) {
      return;
    }

    // TODO: Do search in a faster way (Probably would have the position of the playlist)
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

  // FLUX EVENT HANDLER: Updates a playlist entry from myPlaylist
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

  // FLUX EVENT HANDLER: Appends a new playlist onto myPlaylist
  updateAllPlaylistEntries: function(newPlaylist) {
    console.log("Update with new playlist entry")
    var newPlaylist = playlistStore.getCreatedPlaylist();
    var playlistsWithNewEntry = this.state.myPlaylists.concat(newPlaylist);
    this.setState({myPlaylists : playlistsWithNewEntry}); 
  },

  render: function() {
    return(
      <div>
        <div className="content-container">

          {/* Page Overlay // to freeze screen when modal/popup is active */}
          <div id="page-overlay"></div>

          {/* Header */}
          <Header user={this.props.user} />

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
                   <MyRooms rooms={this.props.rooms} user={this.props.user} />
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
                  
                  <PlaylistTab type={"MyPlaylist"} user={this.props.user} />

                  <li>
                    <a className="hidden" data-toggle="tab" href="#edit-playlist" id="tab-edit-playlist"></a>
                  </li>

                  <li>
                    <a className="hidden" data-toggle="tab" href="#view-playlist" id="tab-view-playlist"></a>
                  </li>
                </ul>

                <div className="tab-content">

                  {/* Explore */}
                  <div id="explore" className="tab-pane fade in active">
                    <Explore explore={this.props.explore} />
                  </div>

                  {/* My Playlists */}
                  <div id="myplaylists" className="tab-pane fade">
                    <MyPlaylists myPlaylists={this.state.myPlaylists} home={true} />
                  </div>

                  {/* User's opened playlist */}
                  <div id="edit-playlist" className="tab-pane fade">
                    <EditOpenedPlaylist myPlaylists={this.state.myPlaylists} user={this.props.user} />
                  </div>

                  {/* Opened playlist */}
                  <div id="view-playlist" className="tab-pane fade">
                    <ViewOpenedPlaylist myPlaylists={this.state.myPlaylists} user={this.props.user} />
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

module.exports = Home;