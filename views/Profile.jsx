/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    Profile.jsx

    Profile page displayed when you access your account settings in your profile.
    Divided into tabs: Account, My Rooms, My Playlist.
    ========================================================================== */

/*  =============================================================================
    Components

    Profile - Entire html for the Profile component.
    ========================================================================== */
var React = require('react');

// Sub-components in Room
var Header = require('./Header.jsx');
var Account = require('./Account.jsx');
var MyRooms = require('./MyRooms.jsx');
var MyPlaylists = require('./MyPlaylists.jsx');
var ModalCreatePlaylist = require('./ModalCreatePlaylist.jsx');
var Footer = require('./Footer.jsx');

// MAIN COMPONENT: Home
var Profile = React.createClass({
  render: function() {
    return(
      <div>
        <div className="content-container">

          {/* Page Overlay // to freeze screen when modal/popup is active */}
          <div id="page-overlay"></div>

          {/* Header */}
          <Header user={this.props.user}/ >

          {/* Main Container */}
          <div className="main-container">
            <div className="row">

              {/* Playlist Tab Navigation */}
              <div className="col-sm-offset-1 col-sm-10 tabbed-container">
              
                <ul className="nav nav-tabs nav-centered">
                  <li className="active">
                    <a id="tab-account" data-toggle="tab" href="#account">
                      <i className="fa fa-user icon-padding"></i>Account
                    </a>
                  </li>
                  <li>
                    <a id="tab-myrooms" data-toggle="tab" href="#myrooms">
                      <i className="fa fa-home icon-padding"></i>My Rooms
                    </a>
                  </li>
                  <li>
                    <a id="tab-myplaylists" data-toggle="tab" href="#myplaylists">
                      <i className="fa fa-book icon-padding"></i>My Playlists
                    </a>
                  </li>
                </ul>

                <div className="tab-content">

                  {/* Account */}
                  <div id="account" className="tab-pane fade in active">
                    <Account user={this.props.user} />
                  </div>

                  {/* My Rooms */}
                  <div id="myrooms" className="tab-pane fade">
                    <MyRooms isLite={true} rooms={this.props.rooms} user={this.props.user} />
                  </div>

                  {/* My Playlists */}
                  <div id="myplaylists" className="tab-pane fade">
                    <MyPlaylists myPlaylists={this.props.myPlaylists} home={true} />
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

module.exports = Profile;