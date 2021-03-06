/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    VIEW: PlaylistEntry.jsx

    The individual entry of a playlist
    ========================================================================== */

/*  =============================================================================
    @Components:    PlaylistIcon
                    PlaylistEntry

    @Exports:       PlaylistEntry
    ========================================================================== */
var React = require('react');

var playlistActions = require('../flux/actions/actions');

// Icon displayed depends on whether playlist is public, private, or not owner
var PlaylistIcon = React.createClass({
  render: function () {
    if (this.props.owner == false) {
      return (
        <div className="playlist-icon">
          <a className="icon-btn like-btn" href="javascript:void(0)">
            <i className="fa fa-heart-o" aria-hidden="true"></i>
          </a>
        </div>
      );
    }
    else if (this.props.owner == true && this.props.type == false) {
      return (
        <div className="playlist-icon">
          <i className="fa fa-lock" aria-hidden="true"></i>
        </div>
      );
    }
    else {
      return (
        <div className="playlist-icon">
          <i className="fa fa-globe" aria-hidden="true"></i>
        </div>
      );
    };
  }
});

// MAIN COMPONENT: Each individual playlist card
var PlaylistEntry = React.createClass({

  // EVENT HANDLER: Adds the playlist into the queue
  playPlaylist: function() {
    // Do not allow the user to click on the playlist
    if (this.props.home === true) {
      return;
    }
    console.log("Playing playlist: " + this.props.title + " by " + this.props.curator);
    // If there are no media entries, do nothing
    if (this.props.size === 0) {
      return;
    }
    socket.emit('From Client: Update queue with new list', this.props.mediaEntries);
  },

  // EVENT HANDLER: Opens the playlist's page
  goToPlaylistPage: function() {
    console.log(this.props.mediaEntries);
    console.log("Going to playlist page: " + this.props.title + " Index: " + this.props.pos);
    playlistActions.displayPlaylist(this.props._id, this.props.pos, this.props.mediaEntries); 

    // TODO: If currently mobile, show the mobile tab instead
    // Open selected playlist owned by current user
    if (this.props.owner) {
      $('#tab-edit-playlist').tab('show');
    }
    // Open selected liked playlist
    else {
      $('#tab-view-playlist').tab('show'); 
    }   
    // TODO: For the Back button      
    // The back button should have a stack like implementation, each element being where the previous was from
    // var playlistData = {
    //   pos: this.props.pos,
    //   clickedFrom: "MYPLAYLIST"
    // }
    // playlistActions.displayPlaylist(playlistData);
  },

  // EVENT HANDLER: Opens the curator's page
  goToCuratorPage: function() {
    console.log("Going to curator page: " + this.props.curator);

    // TODO: For the Back button
    // The back button should have a stack like implementation, each element being where the previous was from
    // var curatorData = {
    //   pos: this.props.pos,
    //   clickedFrom: "MYPLAYLIST"
    // }
    // playlistActions.Curator(curatorData);
  },

  render: function() {
    // If owner, append user-playlist to classname
    var playlistCardClassName = "playlist-card";
    if (this.props.owner == true) {
      playlistCardClassName += " user-playlist";
    };

    // TODO: Update placeholder for empty thumbnails
    // For empty Thumbnails
    var thumbnail = this.props.thumbnail;
    if (thumbnail === "" || thumbnail === null || thumbnail === undefined) {
      thumbnail = "/images/media-icon.png";
    }

    // Do not allow the user to click on the playlist
    if (this.props.home === true) {
      return (
        <div className="col-md-3 col-sm-4 col-padding">
            <div className={playlistCardClassName}>
              <div className="playlist-img-container">
                <img className="playlist-img" src={thumbnail} />
              </div>
              <div className="playlist-text-container">
                <div className="playlist-title">
                  <a className="playlist-link playlist-title-text ellipses" data-toggle="tab" href="#open-playlist" onClick={this.goToPlaylistPage}>{this.props.title}</a>
                  <div className="pill" data-toggle="tooltip" title="Items in Playlist">{this.props.size}</div>
                </div>
                <div className="playlist-curator"><a className="curator-link" data-toggle="tab" href="#curator-page" onClick={this.goToCuratorPage}>{this.props.curator}</a></div>
              </div>
              <div className="playlist-icon-container">
                <PlaylistIcon owner={this.props.owner} type={this.props.type} liked={this.props.liked}/>
              </div>
            </div>
        </div>
      );
    }

    return (
      <div className="col-md-3 col-sm-4 col-padding">
          <div className={playlistCardClassName}>
            <div className="playlist-img-container">
              <a href="javascript:void(0)" onClick={this.playPlaylist}>
                <div className="playlist-overlay">
                  <div className="playlist-overlay-content">
                    <div className="playlist-play-icon"><i className="fa fa-play" aria-hidden="true"></i></div>
                    PLAY ALL
                  </div>
                </div>
              </a>
              <img className="playlist-img" src={thumbnail} />
            </div>
            <div className="playlist-text-container">
              <div className="playlist-title">
                <a className="playlist-link playlist-title-text ellipses" data-toggle="tab" href="#open-playlist" onClick={this.goToPlaylistPage}>{this.props.title}</a>
                <div className="pill" data-toggle="tooltip" title="Items in Playlist">{this.props.size}</div>
              </div>
              <div className="playlist-curator"><a className="curator-link" data-toggle="tab" href="#curator-page" onClick={this.goToCuratorPage}>{this.props.curator}</a></div>
            </div>
            <div className="playlist-icon-container">
              <PlaylistIcon owner={this.props.owner} type={this.props.type} liked={this.props.liked}/>
            </div>
          </div>
      </div>
    );
  }
});

module.exports = PlaylistEntry;