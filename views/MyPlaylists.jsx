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

// Create New Playlist Button
var NewPlaylistButton = React.createClass({
  render: function() {
    return (
      <div className="search-container btn-align-right">
        <button className="btn btn-primary" data-toggle="modal" data-target="#create-playlist"><i className="fa fa-plus icon-padding"></i>Create New Playlist</button>
      </div>
    );
  }
});

// MAIN COMPONENT: My Playlist Tab
var MyPlaylists = React.createClass({
  render: function() {
    var playlistEntries = [];

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
      // Adds the search bar for the playlist
      playlistEntries.push(
        <SearchMyPlaylist key={'SearchMyPlaylist'} />
      )

      // Every playlist entry in MyPlaylist
      var playlistEntry;
      var playlistThumbnail;
      var playlistSize;
      for (var i = 0; i < this.props.myPlaylists.length; ++i) {
        playlistEntry = this.props.myPlaylists[i];
        // If the playlist entry has no media entries
        // TODO: Add a thumbnial placeholder for playlist entries that have no media entries
        if (playlistEntry.mediaEntries[0] === null || playlistEntry.mediaEntries[0] === undefined) {
          playlistThumbnail = "";
          playlistSize = 0;
        }
        // there are media entries in the playlist entry
        else {
          playlistThumbnail = playlistEntry.mediaEntries[0].thumbnail;
          playlistSize = playlistEntry.mediaEntries.length;  
        }
        
        playlistEntries.push (
          // TODO: owner, liked
          <PlaylistEntry
            key={playlistEntry._id}
            pos={i}
            owner={true}
            title={playlistEntry.name}
            thumbnail={playlistThumbnail}
            curator={playlistEntry.owner}
            size={playlistSize}
            type={playlistEntry.isPublic}
            likes={playlistEntry.likes}
            liked={null} 
            mediaEntries={playlistEntry.mediaEntries} 
            home={this.props.home} />
        );
      }
    }

    return (
      <div>
        <NewPlaylistButton />
        {playlistEntries}
      </div>
    );
  }
});

module.exports = MyPlaylists;