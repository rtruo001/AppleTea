var React = require('react');
var MediaEntry = require('./MediaEntry.jsx');

var playlistActions = require('../flux/actions/actions');
var playlistStore = require('../flux/stores/store');

var SaveCancelButtons = React.createClass({
  saveUpdatedPlaylist: function() {
    this.props.onSaveClick();
  },

  cancelSavingPlaylist: function() {
    this.props.onCancelClick();
  },

  render: function() {
    return(
      <div className="save-cancel">
        <button type="button" className="btn btn-primary" onClick={this.saveUpdatedPlaylist}>Save</button>
        <button type="button" className="btn btn-secondary" onClick={this.cancelSavingPlaylist}>Cancel</button>
      </div>
    );
  }
});

var PrivatePublicDropdown = React.createClass({
  render: function() {
    // TODO: If the playlist is initialized as private, then the dropdown exists
    // if (!this.props.isPublic) {
      return (
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
      );
    // }

    // If the playlist is initialized as public, it will stay public
    // else {
    //   return (
    //     <div className="public-note"><i className="fa fa-globe icon-padding"></i>Public Playlist</div>
    //   );  
    // }
  }
});

var DeletePlaylistButton = React.createClass({
  render: function() {
    return (
      <button type="button" className="btn btn-trash trash-playlist-btn" data-toggle="modal" data-target="#trash-confirm"><i className="fa fa-trash"></i></button>
    );
  }
});

var PlaylistHeaderButtonsToChangeStates = React.createClass({
  render: function() {
    return (
      <div className="section">
        <SaveCancelButtons onCancelClick={this.props.onCancelClick} onSaveClick={this.props.onSaveClick} />
        <PrivatePublicDropdown isPublic={this.props.isPublic} />
        <DeletePlaylistButton />
      </div>
    );
  }
});

var ModalDeletePlaylist = React.createClass({
  // Event handler button click
  deletePlaylist: function() {
    console.log("Deleting Playlist" + this.props.playlistKey);
    $.ajax({
      type: "POST",
      url: "/playlist/delete",
      dataType: 'json',
      cache: false,
      data: {_id: this.props.playlistKey},
      success: function(data) {
        console.log(data);
        playlistActions.deletePlaylist(data.deletedPlaylist); 
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("ERROR: Delete Playlist errored out", status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    return (
      <div className="modal fade" id="trash-confirm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog modal-sm" role="document">
          <div className="modal-content">
            <div className="modal-body">
              Are you sure you want to permanently delete this playlist?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-red" data-dismiss="modal" onClick={this.deletePlaylist}>Delete Playlist</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var PlaylistDescription = React.createClass({
  render: function() {
    return (
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
    );
  }
});

var SearchPlaylistEntriesInPlaylist = React.createClass({
  render: function() {
    return (
      <div className="search-container">
        <form className="search-input">
          <input type="text" name="" placeholder="Search in Playlist..."/>
        </form>
      </div>
    );
  }
});

// SUB COMPONENT: EditPlaylistHeader
var EditPlaylistHeader = React.createClass({
  render: function() {
    return(
      <div>
        <PlaylistHeaderButtonsToChangeStates isPublic={this.props.isPublic} onCancelClick={this.props.onCancelClick} onSaveClick={this.props.onSaveClick} />
        <ModalDeletePlaylist playlistKey={this.props.playlistKey} />
        <PlaylistDescription name={this.props.name} size={this.props.size} />
        <SearchPlaylistEntriesInPlaylist />
      </div>
    );
  }
});

// MAIN COMPONENT: UsersOpenedPlaylist
var UsersOpenedPlaylist = React.createClass({
  getInitialState: function() {
    return {
      _id: playlistStore.getId(),
      index: playlistStore.getIndex(),
      entries: playlistStore.getEntries()
    };
  },

  componentDidMount: function() {
    console.log("EDIT PLAYLIST MOUNTING");
    playlistStore.addChangeListener(this.onDisplayPlaylist);
  },

  componentWillUnmount: function() {
    playlistStore.removeChangeListener(this.onDisplayPlaylist);
  },

  onDisplayPlaylist: function() {
    console.log("Changing display to selected playlist");
    console.log(this.props.myPlaylists[playlistStore.getIndex()].mediaEntries);
    this.setState({ 
      _id: playlistStore.getId(), 
      index: playlistStore.getIndex(),
      entries: playlistStore.getEntries()
    });
    // this.setState({ index: playlistStore.getIndex() });
    // this.setState({ entries: playlistStore.getEntries() });
  },

  saveChanges: function() {
    console.log("Saving Playlist");
    var savedPlaylist = [];
    var eachPlaylist;
    for (var i = 0; i < this.state.entries.length; ++i) {
      eachPlaylist = this.state.entries[i];
      if (eachPlaylist.ifDeleteIndicator === undefined || eachPlaylist.ifDeleteIndicator === false) {
        delete eachPlaylist.ifDeleteIndicator;
        savedPlaylist.push(eachPlaylist);
      }
    }  
    // Don't make an ajax request when things haven't changed
    if (savedPlaylist.length == this.state.entries.length) {
      return;
    }  

    $.ajax({
      type: "POST",
      url: "/playlist/update",
      dataType: 'json',
      cache: false,
      data: {_id: this.props.myPlaylists[this.state.index]._id, mediaEntries: JSON.stringify(savedPlaylist)},
      success: function(data) {
        console.log(data);
        this.setState({entries: data.updatedPlaylist.mediaEntries});
        playlistActions.updatePlaylist(data.updatedPlaylist);

      }.bind(this),
      error: function(xhr, status, err) {
        console.error("ERROR: Update Playlist errored out", status, err.toString());
      }.bind(this)
    });
  },

  cancelChanges: function() {
    console.log("Canceling changes");
    var savedPlaylist = [];
    var eachPlaylist;
    for (var i = 0; i < this.state.entries.length; ++i) {
      eachPlaylist = this.state.entries[i];      
      if (eachPlaylist.ifDeleteIndicator !== undefined) {
        delete eachPlaylist.ifDeleteIndicator;
      }
      savedPlaylist.push(eachPlaylist);
    }  

    this.setState({entries : savedPlaylist}, function() {
      console.log(this.state.entries);  
    });
  },

  deleteMediaEntryInPlaylist: function(posInPlaylist) {
    console.log(this.state.entries);
    var updatedPlaylist = this.state.entries;
    if (updatedPlaylist[posInPlaylist].ifDeleteIndicator === true)
      updatedPlaylist[posInPlaylist].ifDeleteIndicator = false;
    else {
      updatedPlaylist[posInPlaylist].ifDeleteIndicator = true;
    }
    this.setState({entries : updatedPlaylist});

    // console.log("Deleting media entry in Playlist: " + posInPlaylist);
    // var updatedEntries = this.state.entries;
    // updatedEntries.splice(posInPlaylist, 1);
    // if (posInPlaylist > -1) {
    //   this.setState({ entries: updatedEntries });
    // }

    // this.setState({deletedList : this.state.deletedList.push(posInPlaylist)})
  },

  render: function() {
    var mediaEntriesInPlaylist = [];
    var propName = "";
    var propSize = 0;
    var propLikes = "";
    var propIsPublic = true;
    var propKey = "";

    // TODO: Should fix this if statement, when deleting the displayed playlist, should reinitialize the states all to null
    // Not keep the state as the previous deleted playlist
    if (this.state.index !== null && this.props.myPlaylists[this.state.index] !== undefined) {
      var selectedPlaylist = this.props.myPlaylists[this.state.index];

      // var mediaEntries = selectedPlaylist.mediaEntries;
      var mediaEntries = this.state.entries;

      // You do this because the array itself has an _id. The array technically isn't empty when empty. (Don't know if this concept applies to here though)
      var mediaEntry = mediaEntries[0];

      for (var i = 0; i < mediaEntries.length; ++i) {
        mediaEntry = mediaEntries[i];
        if (mediaEntry !== null) {
          var deleteIndicator = mediaEntry.ifDeleteIndicator === undefined ? deleteIndicator = false : deleteIndicator = mediaEntry.ifDeleteIndicator; 
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
              deleteIndicator={deleteIndicator} />
          );
        }
      }

      propName = selectedPlaylist.name;
      propSize = mediaEntry !== null ? selectedPlaylist.mediaEntries.length : 0;
      propLikes = selectedPlaylist.likes;
      propIsPublic = selectedPlaylist.isPublic;
      propKey = selectedPlaylist._id;
    }

    return (
      <div>
        <div className="edit-playlist-container">
          <EditPlaylistHeader name={propName} size={propSize} isPublic={propIsPublic} playlistKey={propKey} onCancelClick={this.cancelChanges} onSaveClick={this.saveChanges} />

          <div className="row">
            {mediaEntriesInPlaylist}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = UsersOpenedPlaylist;