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
var ModalCreatePlaylist = require('./ModalCreatePlaylist.jsx');
var Footer = require('./Footer.jsx');

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
    socket.on("From Server: Update MyPlaylist with new playlists" , this.updateAllPlaylistEntries);
  },

  // EVENT HANDLER: Update the playlist entry
  updateAllPlaylistEntries: function(newPlaylist) {
    console.log("Update with new playlist entry")
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
                   <MyRooms rooms={this.props.rooms} />
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