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
  getInitialState: function() {
    if (this.props.myPlaylists  === undefined || this.props.myPlaylists === null) {
      return {
        allPlaylistEntries: []
      };
    }
    else {
      return {
        allPlaylistEntries: this.props.myPlaylists
      };  
    }
  },

  componentDidMount: function() {
    socket.on("From Server: Update MyPlaylist with new playlists" ,this.updateAllPlaylistEntries);
  },

  // EVENT HANDLER: Update the playlist entry
  updateAllPlaylistEntries: function(newPlaylist) {
    console.log("Update with new playlist entry")
    var playlistsWithNewEntry = this.state.allPlaylistEntries.concat(newPlaylist);
    this.setState({allPlaylistEntries : playlistsWithNewEntry}); 
  },

  render: function() {
    var playlistEntries = [];

    // If there are no playlists, the placeholder is displayed
    if (this.state.allPlaylistEntries === undefined || this.state.allPlaylistEntries === null || this.state.allPlaylistEntries.length <= 0) {
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
      for (var i = 0; i < this.state.allPlaylistEntries.length; ++i) {
        playlistEntry = this.state.allPlaylistEntries[i];
        playlistEntries.push (
          // TODO: owner, liked
          <PlaylistEntry
            key={playlistEntry._id}
            owner={true}
            title={playlistEntry.name}
            thumbnail={playlistEntry.mediaEntries[0].thumbnail}
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
        <NewPlaylistButton />
        {playlistEntries}
      </div>
    );
  }
});

module.exports = MyPlaylists;