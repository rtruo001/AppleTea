/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    VIEW: MyPlaylists.jsx

    Contains all of the current user's private and public playlists. Also contains 
    all the playlists that the user liked.
    ========================================================================== */

/*  =============================================================================
    @Components:    MyPlaylistPlaceholder
                    SearchMyPlaylist
                    MyPlaylists

    @Exports:       MyPlaylists
    ========================================================================== */
var React = require('react');
var PlaylistEntry = require('./PlaylistEntry');

// Placeholder if there are no playlists created or liked
var MyPlaylistPlaceholder = React.createClass({
  render: function() {
    return (
      <div className="col-padding">
        <div className="placeholder">
          <div className="placeholder-content">
            <i className="fa fa-book placeholder-icon"></i><br/>
            <span>You have no saved playlists</span>
          </div>
        </div>
      </div>
    );
  }
});

// Search Bar to search My Playlists
var SearchMyPlaylist = React.createClass({
  render: function() {
    return (
      <div className="search-container">
        <form className="search-input">
          <input type="text" className="chat-textbox" name="" placeholder="Search Private Playlists..."/>
        </form>
      </div>
    );
  }
});

// MAIN COMPONENT: My Playlist Tab
var MyPlaylists = React.createClass({
  render: function() {
    var playlistEntries = [];
    console.log(this.props.myPlaylists);

    // If there are no playlists, the placeholder is displayed
    if (this.props.myPlaylists === undefined || this.props.myPlaylists === null || this.props.myPlaylists.length <= 0) {
      return (
        <div>
          <MyPlaylistPlaceholder />
        </div>
      );
    }

    // If there are playlists, pushes every playlist into the tab
    else {
      playlistEntries.push(
        <SearchMyPlaylist key={'SearchMyPlaylist'} />
      )

      var playlistEntry;
      for (var i = 0; i < this.props.myPlaylists.length; ++i) {
        playlistEntry = this.props.myPlaylists[i];
        playlistEntries.push (
          // TODO: owner, liked
          <PlaylistEntry
            key={playlistEntry._id}
            owner={true}
            title={playlistEntry.name}
            curator={playlistEntry.owner}
            size={playlistEntry.mediaEntries.length}
            type={playlistEntry.isPublic}
            likes={playlistEntry.likes}
            liked={null} 
            mediaEntries={playlistEntry.mediaEntries} />
        );
      }
    }

    return (
      <div>
        {playlistEntries}
      </div>
    );
  }
});

module.exports = MyPlaylists;