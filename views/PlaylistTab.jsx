/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    PlaylistTab.jsx

    Playlist Tab. This componenet is used to display the My Playlist tab.
    This component will not appear if there is no user logged in do to a non
    logged in user not having any playlists. Only shows the tab if the user is logged
    in
    ========================================================================== */

/*  =============================================================================
    Components

    PlaylistTab - Entire html for the Home component.
    ========================================================================== */
var React = require('react');

var PlaylistTab = React.createClass({
  render: function() {
    // When the user is not logged in, do not display the Playlist tab
    if (this.props.user === undefined || this.props.user === null ) {
      return null;
    }

    // If there is a user logged in, chooses the correct tab type
    switch(this.props.type) {
      case "MyPlaylist-mobile":
        return (
          <li>
            <a data-toggle="tab" href="#myplaylists" id="mobile-tab-myplaylists">
              <i className="fa fa-book icon-padding"></i>
              <div className="tab-text">My Playlists</div>
            </a>
          </li>
        );
        break;
      case "MyPlaylist":
        return (
          <li>
            <a data-toggle="tab" href="#myplaylists" id="tab-myplaylists">
              <i className="fa fa-book icon-padding"></i>
              <div className="tab-text">My Playlists</div>
            </a>
          </li>
        );
        break;
      default:
        return;
    }
  }
});

module.exports = PlaylistTab;