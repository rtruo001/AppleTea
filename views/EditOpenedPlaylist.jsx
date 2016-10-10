var React = require('react');
var MediaEntry = require('./MediaEntry.jsx');

var playlistStore = require('../flux/stores/store');


var EditPlaylistHeader = React.createClass({
  render: function() {
    return(
      <div>

        <div className="section">
          <div className="save-cancel">
            <button type="button" className="btn btn-primary">Save</button>
            <button type="button" className="btn btn-secondary">Cancel</button>
          </div>
          <div className="private-public">
            <div className="dropdown">
              <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fa fa-lock icon-padding"></i>
                Private Playlist
                <i className="fa fa-angle-down dropdown-arrow"></i>
              </button>
              <ul className="dropdown-menu">
                <li><a href="javascript:void(0)"><i className="fa fa-lock"></i>Private Playlist</a></li>
                <li><a href="javascript:void(0)"><i className="fa fa-globe"></i>Public Playlist</a></li>
              </ul>
            </div>
          </div>
          {/*<div className="public-note"><i className="fa fa-globe icon-padding"></i>Public Playlist</div>*/}
          <button type="button" className="btn btn-trash trash-playlist-btn" data-toggle="modal" data-target="#trash-confirm"><i className="fa fa-trash"></i></button>
        </div>

        <div className="modal fade" id="trash-confirm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog modal-sm" role="document">
            <div className="modal-content">
              <div className="modal-body">
                Are you sure you want to permanently delete this playlist?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-red" data-dismiss="modal">Delete Playlist</button>
              </div>
            </div>
          </div>
        </div>

        <div className="tab-page-header">
          <div className="tab-page-text-container">
            <a className="icon-btn" href="javascript:void(0)"><div className="tab-page-back-btn"><i className="fa fa-lg fa-chevron-circle-left"></i></div></a>
            <div className="tab-page-title onclick-edit">
              {this.props.name}
              <a className="icon-btn-blue" href="javascript:void(0)"><i className="fa fa-edit" aria-hidden="true"></i></a>

            </div>
            <div className="tab-page-curator">
              <div className="playlist-user-icon"><i className="fa fa-user fa-fw" aria-hidden="true"></i></div>
              Your Playlist
            </div>
          </div>
          <div className="tab-page-right-container">
            <div className="tab-page-icon-container">
              <div className="pill">{this.props.size} Items</div>
            </div>
          </div>
        </div>

        <div className="search-container">
          <form className="search-input">
            <input type="text" name="" placeholder="Search in Playlist..."/>
          </form>
        </div>

      </div>
    );
  }
});

// MAIN COMPONENT: UsersOpenedPlaylist
var UsersOpenedPlaylist = React.createClass({
  getInitialState: function() {
    return {
      index: playlistStore.getIndex(),
      entries: null
    };
  },

  componentDidMount: function() {
    console.log("EDIT PLAYLIST MOUNTING");
    playlistStore.addChangeListener(this.onDisplayPlaylist);
  },

  componentWillUnmount: function(){
    playlistStore.removeChangeListener(this.onDisplayPlaylist);
  },

  onDisplayPlaylist: function() {
    console.log("Changing display to selected playlist");
    console.log(this.props.myPlaylists[playlistStore.getIndex()].mediaEntries);
    this.setState({ index: playlistStore.getIndex() });
    this.setState({ entries: playlistStore.getEntries() });
  },

  deleteMediaEntryInPlaylist: function(posInPlaylist) {
    console.log("Deleting media entry in Playlist: " + posInPlaylist);
    var updatedEntries = this.state.entries;
    updatedEntries.splice(posInPlaylist, 1);
    if (posInPlaylist > -1) {
      this.setState({ entries: updatedEntries });
    }
  },

  saveUpdatedPlaylist: function() {
    // TODO: Potential AJAX request
    // socket.emit("From Client: Save new playlist", playlistData);

    // Emit to Flux to update 
    // playlistStore.
  },

  render: function() {
    var mediaEntriesInPlaylist = [];
    var propName = "";
    var propSize = 0;
    var propLikes = "";

    if (this.state.index != null) {
      var selectedPlaylist = this.props.myPlaylists[this.state.index];

      // var mediaEntries = selectedPlaylist.mediaEntries;
      var mediaEntries = this.state.entries;
      var mediaEntry = mediaEntries[0];

      for (var i = 0; i < mediaEntries.length; ++i) {
        mediaEntry = mediaEntries[i];
        if (mediaEntry !== null) {
          mediaEntriesInPlaylist.push(
            <MediaEntry 
              key={"mediaEntry" + mediaEntry.mediaId + i}
              pos={i} 
              mediaId={mediaEntry.mediaId} 
              categoryType={'PLAYLIST'}
              mediaType={'YOUTUBE'}
              thumbnail={mediaEntry.thumbnail} 
              title={mediaEntry.title}
              artist={mediaEntry.artist} 
              ifMediaCardAdded={false} 
              user={this.props.user}
              myPlaylists={this.props.myPlaylists} 
              deleteEntry={this.deleteMediaEntryInPlaylist}
              savePlaylist={this.saveUpdatedPlaylist} />
          );
        }
      }

      propName = selectedPlaylist.name;
      propSize = mediaEntry !== null ? selectedPlaylist.mediaEntries.length : 0;
      propLikes = selectedPlaylist.likes;
    }


    return (
      <div>
        <div className="edit-playlist-container">
          <EditPlaylistHeader name={propName} size={propSize} />

          <div className="row">
            {mediaEntriesInPlaylist}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = UsersOpenedPlaylist;