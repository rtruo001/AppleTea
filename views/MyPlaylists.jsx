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

// Create New Playlist Modal Popup
var NewPlaylistModal = React.createClass({
  render: function() {
    return (
      <div className="modal fade" id="create-playlist" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog modal-sm" role="document">
          <div className="modal-content">
            <div className="modal-header">
              Create a New Playlist
            </div>
            <div className="modal-body">
              <div className="search-container">
                <form className="search-input" id="create-playlist-input">
                  <input className="input-padding" type="text" placeholder="Playlist Name"/>
                  <div className="modal-label">Is this a private playlist?</div>
                  <div className="toggle-slider-section">
                    <label className="switch">
                      <input type="checkbox" id="create-room-toggle" checked />
                      <div className="slider"></div>
                    </label>
                    <i className="fa fa-lock" id="create-room-toggle-icon"></i>
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal">Create Playlist</button>
            </div>
          </div>
        </div>
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
        <NewPlaylistButton />
        <NewPlaylistModal />
        {playlistEntries}
      </div>
    );
  }
});

module.exports = MyPlaylists;