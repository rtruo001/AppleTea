/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    VIEW: ModalCreatePlaylist.jsx

    The component for when the Modal pops up for creating a new playlist
    ========================================================================== */

/*  =============================================================================
    @Components:    ToggleIcon
                    ModalCreatePlaylist

    @Exports:       ModalCreatePlaylist
    ========================================================================== */
var React = require('react');

// The icon which tells the user if the new playlist would be either public or private
var ToggleIcon = React.createClass({
  render: function() {
    // Toggles the icon to the globe or lock depending on if the new playlist would be public or private
    var toggleClass;
    if (this.props.isPublic === true) {
      toggleClass = "fa fa-globe";
    }
    else {
      toggleClass = "fa fa-lock";
    } 

    return (
      <div className="toggle-slider-section">
        <label className="switch">
          <input type="checkbox" id="create-playlist-toggle" onChange={this.props.onChange} />
          <div className="slider"></div>
        </label>
        <i className={toggleClass} id="create-playlist-toggle-icon"></i>
      </div> 
    );
  }
});

// MAIN COMPONENT: Create New Playlist Modal Popup
var ModalCreatePlaylist = React.createClass({
  getInitialState: function() {
    return {
      playlistNameInput: "",
      isPublic: true
    }
  },

  onChangePlaylistName: function(e) {
    this.setState({ playlistNameInput: e.target.value });
  },

  onChangeIsPublic: function(e) {
    // The playlist is public when the target is not checked
    console.log(this.state.isPublic);
    this.setState({ isPublic: !e.target.checked });
  },

  onSubmit: function(e) {
    e.preventDefault();
  },

  addToPlaylist: function(e) {
    console.log("Modal: Add to new Playlist");
    var data;
    if (this.props.data === null || this.props.data === undefined) {
      data = {
        name: this.state.playlistNameInput,
        owner: this.props.user.local.email,
        isPublic: this.state.isPublic,
        mediaEntry: null
      }
    }
    else {
      data = {
        name: this.state.playlistNameInput,
        owner: this.props.user.local.email,
        isPublic: this.state.isPublic,
        mediaEntry: {
          artist: this.props.data.artist,
          mediaId: this.props.data.mediaId,
          mediaType: this.props.data.mediaType,
          thumbnail: this.props.data.thumbnail,
          title: this.props.data.title,
          // TODO: The search entry does not have the same db _id. Need to find a way to add media entries without duplicates
          // _id: this.props.data._id
        }
      }
    } 
    socket.emit('From Client: Create new playlist with data', data);
  },

  render: function() {
    var modalId;
    var toggleIconGlobeOrLock = [];

    // If the modal is clicked from the create new playlist button under myPlaylist
    if (this.props.pos === null || this.props.pos === undefined) {
      modalId = "create-playlist";
    }
    // WHen the modal is clicked from a media entry
    else {
      modalId = "create-playlist-" + this.props.pos;  
    }
    
    return (
      <div className="modal fade" id={modalId} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog modal-sm" role="document">
          <div className="modal-content">
            <div className="modal-header">
              Create a New Playlist
            </div>
            <div className="modal-body">
              <div className="search-container">
                <form className="search-input" id="create-playlist-input" onSubmit={this.onSubmit}>
                  <input className="input-padding" type="text" placeholder="Playlist Name" onChange={this.onChangePlaylistName} />
                  <div className="modal-label">Is this a private playlist?</div>
                 
                  {/* Toggle Icon component */} 
                  <ToggleIcon isPublic={this.state.isPublic} onChange={this.onChangeIsPublic} />
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.addToPlaylist}>Create Playlist</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

// Required to call modal from other components
module.exports = ModalCreatePlaylist;