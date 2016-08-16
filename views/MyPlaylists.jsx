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

    // TODO: If no playlists, return a placeholder
    if (false) {
      playlistEntries.push(
        <MyPlaylistPlaceholder key={'MyPlaylistPlaceholder'} />
      )
    }

    // If there are playlists, pushes every playlist
    else {
      playlistEntries.push(
        <SearchMyPlaylist key={'SearchMyPlaylist'} />
      )

      // DEMO PLAYLIST DATA
      playlistEntries.push (
        <PlaylistEntry 
          owner={true}
          title={'Saturday Morning Cartoons'}
          curator={'Gliu'}
          size={'27'}
          type={'private'}
          likes={'0'}
          liked={null} />
      );
      for (var i = 0; i < 2; ++i) {
        playlistEntries.push (
          <PlaylistEntry 
            owner={true}
            title={'Chill Music Videos'}
            curator={'Gliu'}
            size={'9'}
            type={'public'}
            likes={'10'}
            liked={null} />
        );
      }
      for (var i = 0; i < 5; ++i) {
        playlistEntries.push (
          <PlaylistEntry 
            owner={false}
            title={'Trippy Stuff'}
            curator={'MeSoRanz'}
            size={'103'}
            type={'public'}
            likes={'873'}
            liked={true} />
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