/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    Main-Component MediaEntry

    A component for each individal media entry. Each media entry has a thumbnail and title.
    Each Entry has a category type to see where the media entry would belong as well as a
    media type which is either Youtube, Soundcloud, or Vimeo. Each component
    determines the class name for the divs by checking the category types from the given properties
    of the parent components (Either from Search or Queue).

    @Components:  Thumbnail
                  Title
                  Duration
                  MediaEntry

    @Exports:     MediaEntry
    ========================================================================== */
var React = require('react');
var ModalCreatePlaylist = require('./ModalCreatePlaylist');

var playlistStore = require('../flux/stores/store');

// Thumbnail of the media
var Thumbnail = React.createClass({
  render: function() {
    var categoryDivName;
    var categoryClassName;
    switch(this.props.categoryType) {
      case CATEGORYOFMEDIA.QUEUE:
        categoryClassName = 'media-img';
        break;
      case CATEGORYOFMEDIA.PLAYLIST:
        categoryClassName = 'media-img';
        break;  
      case CATEGORYOFMEDIA.SEARCH:
        categoryClassName = 'search-media-img';
        break;
      default:
        // ERROR, No Category type
        break;
    }

    return (
      <img className={categoryClassName} src={this.props.thumbnail} />
    );
  }
});

// Media's title component
var Title = React.createClass({
  render: function() {
    var categoryDivName;
    var categoryClassName;
    switch(this.props.categoryType) {
      case CATEGORYOFMEDIA.QUEUE:
        categoryClassName = 'media-title ellipses';
        break;
      case CATEGORYOFMEDIA.PLAYLIST:
        categoryClassName = 'media-title ellipses';
        break;
      case CATEGORYOFMEDIA.SEARCH:
        categoryClassName = 'search-media-title ellipses';
        break;
      default:
        // ERROR, No Category type
        break;
    }

    return (
      <div className={categoryClassName}>
        {this.props.title}
      </div>
    );
  }
});

// Media's artist component
var Artist = React.createClass({
  render: function() {
    var categoryDivName;
    var categoryClassName;
    switch(this.props.categoryType) {
      case CATEGORYOFMEDIA.QUEUE:
        categoryClassName = 'media-artist ellipses';
        break;
      case CATEGORYOFMEDIA.PLAYLIST:
        categoryClassName = 'media-artist ellipses';
        break;
      case CATEGORYOFMEDIA.SEARCH:
        categoryClassName = 'search-media-artist ellipses';
        break;
      default:
        // ERROR, No Category type
        break;
    }

    return (
      <div className={categoryClassName}>
        {this.props.artist}
      </div>
    );
  }
})

// Media's type component
var Type = React.createClass({
  render: function() {
    var categoryClassName;
    var mediaTypeIcon;
    switch(this.props.categoryType) {
      case CATEGORYOFMEDIA.QUEUE:
        categoryClassName = 'media-type';
        break;
      case CATEGORYOFMEDIA.PLAYLIST:
        categoryClassName = 'media-type';
        break;
      case CATEGORYOFMEDIA.SEARCH:
        categoryClassName = 'search-media-type';
        break;
      default:
        // ERROR, No Category type
        break;
    }

    switch(this.props.type) {
      case MEDIATYPES.YOUTUBE:
        mediaTypeIcon = 'fa fa-youtube-play';
        break;
      case MEDIATYPES.SOUNDCLOUD:
        mediaTypeIcon = 'fa fa-soundcloud';
        break;
      case MEDIATYPES.VIMEO:
        mediaTypeIcon = 'fa fa-vimeo';
        break;
      default:
        // ERROR, No media type
        break;
    }

    return(
      <div className={categoryClassName}><i className={mediaTypeIcon}></i></div>
    );
  }
});

// TODO: TBD if durations need to be implemented or not
// Media's Duration component
var Duration = React.createClass({
  render: function() {
    return (
      <div className='media-duration'>
        {this.props.duration}
      </div>
    );
  }
});

// Each individual playlist entry in the dropdown list
var PlaylistEntry = React.createClass({
  addToPlaylist: function() {
    console.log("Adding to existing playlist");
    console.log(this.props.playlist._id);
    console.log(this.props.data);
    socket.emit('From Client: Add to existing playlist', {
      mediaData: this.props.data,
      id: this.props.playlist._id,
      firstEntry: this.props.playlist.mediaEntries[0]
    });
  },

  render: function() {
    return(
      <li><a href="javascript:void(0)" onClick={this.addToPlaylist}>{this.props.playlist.name}</a></li>      
    )
  }
});

// Each dropdown for every media entry
var PlaylistDropdown = React.createClass({
  addToNewPlaylist: function() {
    console.log("Creating new playlist with media");
  },

  render: function() {
    var playlistEntries = [];
    var modalId = "#create-playlist-" + this.props.pos;

    if (this.props.myPlaylists !== undefined && this.props.myPlaylists !== null) {
      // Sets the playlists in the dropdown
      for (var i = 0; i < this.props.myPlaylists.length; ++i) {
        playlistEntries.push(
          <PlaylistEntry key={i} data={this.props.data} playlist={this.props.myPlaylists[i]} />
        );
      }
    }

    return (
      <ul className="dropdown-menu dropdown-menu-right">
        <li className="dropdown-header">Add To</li>
        {playlistEntries}
        <li role="separator" className="divider"></li>
        <li><a data-toggle="modal" data-target={modalId} onClick={this.addToNewPlaylist}>Add to New Playlist</a></li>
      </ul>
    );
  }
});

// MAIN COMPONENT: Each individual media entry in the list
var MediaEntry = React.createClass({
  // EVENT HANDLER: When the add to queue button is clicked, adds the media to the queue.
  addToQueue: function() {
    var mediaEntry = {
      mediaId: this.props.mediaId,
      mediaType: this.props.mediaType,
      thumbnail: this.props.thumbnail,
      title: this.props.title,
      artist: this.props.artist,
      ifMediaCardAdded: true
    }
    socket.emit('From Client: Push into queue', mediaEntry);
  },

  // EVENT HANDLER: When the play button is clicked, plays the media entry onto the media player
  playMediaEntry: function() {
    if (this.props.categoryType == CATEGORYOFMEDIA.SEARCH || this.props.categoryType == CATEGORYOFMEDIA.PLAYLIST) {
      var mediaEntry = {
        mediaId: this.props.mediaId,
        mediaType: this.props.mediaType,
        thumbnail: this.props.thumbnail,
        title: this.props.title,
        artist: this.props.artist,
        ifMediaCardAdded: true
      }
      socket.emit('From Client: Play new media entry', mediaEntry);  
    }
    else if (this.props.categoryType == CATEGORYOFMEDIA.QUEUE) {
      var queueEntry = {
        mediaId: this.props.mediaId,
        mediaType: this.props.mediaType,
        thumbnail: this.props.thumbnail,
        title: this.props.title,
        artist: this.props.artist,
        ifMediaCardAdded: true,
        posInQueue: this.props.pos
      }
      socket.emit('From Client: Play new media entry from queue', queueEntry);   
    }
  },

  // EVENT HANDLER: When the delete button is clicked, removes the media entry from queue
  deleteMediaEntry: function() {
    console.log("Delete Media Entry from Queue");
    var mediaEntry = {
      mediaId: this.props.mediaId,
      mediaType: this.props.mediaType,
      thumbnail: this.props.thumbnail,
      title: this.props.title,
      artist: this.props.artist,
      ifMediaCardAdded: true,
      posInQueue: this.props.pos
    }
    socket.emit('From Client: Delete media entry from queue', mediaEntry);
  },

  // EVENT HANDLER: Moves media entry to the front of the queue as a play next media
  moveToFrontOfTheQueue: function() {
    var mediaEntry = {
      mediaId: this.props.mediaId,
      mediaType: this.props.mediaType,
      thumbnail: this.props.thumbnail,
      title: this.props.title,
      artist: this.props.artist,
      ifMediaCardAdded: true,
      posInQueue: this.props.pos
    }
    socket.emit('From Client: Move media entry to front of queue', mediaEntry);
  },

  // EVENT HANDLER: Deletes playlist entry in the opened edit playlist
  deletePlaylistEntry: function() {
    this.props.deleteEntry(this.props.pos);
  },

  componentDidMount() {
    $(this.icon1).tooltip();
    $(this.icon2).tooltip();
    $(this.icon3).tooltip();
  },

  render: function() {
    var categoryDivName;
    var categoryClassName;

    // Renders the Media entry to the correct category.
    switch(this.props.categoryType) {
      // Media Entry that is in the Queue component
      case CATEGORYOFMEDIA.QUEUE:
        var queueMediaEntryId = "-queue-media-entry-id";
        var queueMediaCardClassName = "media-card grabbable";
        var iconClassName = "icon-btn";
        var deleteButton = [];

        // Adds the media-card-added class if the media entry was added individually
        if (this.props.ifMediaCardAdded == true) {
          queueMediaCardClassName += " media-card-added";
          iconClassName += "-blue-lite";
          deleteButton.push (
            <div>
              <div className="media-card-added-corner-container"><div className="media-card-added-corner"></div></div>
              <a className="media-card-added-plus icon-btn-white" href="javascript:void(0)" onClick={this.deleteMediaEntry}>+</a>
            </div>
          );
        }

        // If in the front of the queue, renders a media entry that would play next
        if (this.props.pos === PLAYNEXTMEDIAENTRYPOS) {
          return (
            <div id={this.props.pos + queueMediaEntryId} className={queueMediaCardClassName}>
              {deleteButton}
              <Thumbnail thumbnail={this.props.thumbnail} categoryType={this.props.categoryType} />
              <div className="media-next">PLAYING NEXT:</div>
              <div className="number">{this.props.pos + 1}</div>

              <div className="media-text-container">
                <Title title={this.props.title} categoryType={this.props.categoryType} />
                <Artist artist={this.props.artist} categoryType={this.props.categoryType} />
                <Type type={this.props.mediaType} categoryType={this.props.categoryType} />
                <div className="media-icon-container">
                  <div className="media-icon"></div>
                  <a className={iconClassName} href="javascript:void(0)" onClick={this.playMediaEntry}><div className="media-icon"><i className="fa fa-play" aria-hidden="true"></i></div></a>
                </div>
              </div>
            </div>
          );
        }

        // Every other media entry in the queue
        return (
          <div id={this.props.pos + queueMediaEntryId} className={queueMediaCardClassName}>
            {deleteButton}
            <Thumbnail thumbnail={this.props.thumbnail} categoryType={this.props.categoryType} />
            <div className="number">{this.props.pos + 1}</div>

            <div className="media-text-container">
              <Title title={this.props.title} categoryType={this.props.categoryType} />
              <Artist artist={this.props.artist} categoryType={this.props.categoryType} />
              <Type type={this.props.mediaType} categoryType={this.props.categoryType} />
              <div className="media-icon-container">
                <div className="media-icon"></div>
                <a className={iconClassName} href="javascript:void(0)" onClick={this.moveToFrontOfTheQueue}><div className="media-icon"><i className="fa fa-chevron-up" data-toggle="tooltip" title="Move to Top" aria-hidden="true"></i></div></a>
                <a className={iconClassName} href="javascript:void(0)" onClick={this.playMediaEntry}><div className="media-icon"><i className="fa fa-play" data-toggle="tooltip" title="Play Now" aria-hidden="true"></i></div></a>
              </div>
            </div>
          </div>
        ); 
        break;

      // Media Entry that is in the playlist entry component
      case CATEGORYOFMEDIA.PLAYLIST:
        var dropdown = [];
        var mediaData = {
          artist: this.props.artist,
          mediaId: this.props.mediaId,
          mediaType: this.props.mediaType,
          thumbnail: this.props.thumbnail,
          title: this.props.title
          // TODO: The search entry does not have the same db _id. Need to find a way to add media entries without duplicates
          // _id: this.props._id
        };

        // If a user is logged in, the dropdown appears        
        dropdown.push(
          <div key={this.props.pos} className="media-icon">
            <a className="icon-btn-blue-lite dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="javascript:void(0)"><i className="fa fa-list-ul" ref={(ref) => this.icon3 = ref} data-toggle="tooltip" title="Add to Playlist" aria-hidden="true"></i></a>
            <PlaylistDropdown myPlaylists={this.props.myPlaylists} data={mediaData} pos={this.props.pos} />
          </div>
        );

        // If the playlist is a liked one
        if (this.props.owner === false) {
          return (
            <div className="col-md-6 col-sm-12 col-padding">
              <div className="playlist-media-card">
                <Thumbnail thumbnail={this.props.thumbnail} categoryType={this.props.categoryType} />

                <div className="media-text-container">
                  <Title title={this.props.title} categoryType={this.props.categoryType} />
                  <Artist artist={this.props.artist} categoryType={this.props.categoryType} />
                  <Type type={this.props.mediaType} categoryType={this.props.categoryType} />

                  <div className="media-icon-container">
                    <div className="media-icon"><a className="icon-btn" href="javascript:void(0)" onClick={this.addToQueue}><i className="fa fa-plus" ref={(ref) => this.icon1 = ref} data-toggle="tooltip" title="Add to Queue"></i></a></div>
                    <div className="media-icon"><a className="icon-btn" href="javascript:void(0)" onClick={this.playMediaEntry}><i className="fa fa-play" ref={(ref) => this.icon2 = ref} data-toggle="tooltip" title="Play Now"></i></a></div>
                    {dropdown}
                  </div>
                </div>

                <ModalCreatePlaylist 
                  key={this.props.pos} 
                  user={this.props.user}
                  data={mediaData} 
                  pos={this.props.pos} />
              </div>
            </div>
          );
        }

        // If the playlist was made by the current user
        return (
          <div className="col-md-6 col-sm-12 col-padding edit-playlist-card">
            <div className="playlist-media-card media-card-added grabbable">
              <div className="media-card-added-corner-container"><div className="media-card-added-corner"></div></div>
              <a className="media-card-added-plus icon-btn-white" href="javascript:void(0)" onClick={this.deletePlaylistEntry}>+</a>
              <Thumbnail thumbnail={this.props.thumbnail} categoryType={this.props.categoryType} />

              <div className="media-text-container">
                <Title title={this.props.title} categoryType={this.props.categoryType} />
                <Artist artist={this.props.artist} categoryType={this.props.categoryType} />
                <Type type={this.props.mediaType} categoryType={this.props.categoryType} />

                <div className="media-icon-container">
                  <div className="media-icon"><a className="icon-btn-blue-lite" href="javascript:void(0)" onClick={this.addToQueue}><i className="fa fa-plus" ref={(ref) => this.icon1 = ref} data-toggle="tooltip" title="Add to Queue"></i></a></div>
                  <div className="media-icon"><a className="icon-btn-blue-lite" href="javascript:void(0)" onClick={this.playMediaEntry}><i className="fa fa-play" ref={(ref) => this.icon2 = ref} data-toggle="tooltip" title="Play Now"></i></a></div>
                  {dropdown}
                </div>
              </div>

              <ModalCreatePlaylist 
                key={this.props.pos} 
                user={this.props.user}
                data={mediaData} 
                pos={this.props.pos} />
            </div>
          </div>
        );

        break;

      // Media Entry in the Search component, also has a button that adds the media entry into the queue
      case CATEGORYOFMEDIA.SEARCH:
        var dropdown = [];
        var searchMediaEntryId = "-search-media-entry-id";
        var mediaData = {
          artist: this.props.artist,
          mediaId: this.props.mediaId,
          mediaType: this.props.mediaType,
          thumbnail: this.props.thumbnail,
          title: this.props.title
          // TODO: The search entry does not have the same db _id. Need to find a way to add media entries without duplicates
          // _id: this.props._id
        };

        // When the user is not logged in, there is no dropdown
        if (this.props.user === undefined || this.props.user === null) {
          dropdown = [];
        }
        // If a user is logged in, the dropdown appears
        else {
          dropdown.push(
            <div key={this.props.pos} className="search-media-icon">
              <a className="icon-btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="javascript:void(0)"><i className="fa fa-list-ul" ref={(ref) => this.icon3 = ref} data-toggle="tooltip" title="Add to Playlist" aria-hidden="true"></i></a>
              <PlaylistDropdown myPlaylists={this.props.myPlaylists} data={mediaData} pos={this.props.pos} />
            </div>
          );
        }

        return (
          <div id={this.props.pos + searchMediaEntryId} className={"search-card-padding"}>
            <div className="search-media-card">
              <Thumbnail thumbnail={this.props.thumbnail} categoryType={this.props.categoryType} />

              <div className="search-media-text-container">
                <Title title={this.props.title} categoryType={this.props.categoryType} />
                <Artist artist={this.props.artist} categoryType={this.props.categoryType} />
                <Type type={this.props.mediaType} categoryType={this.props.categoryType} />
              </div>

              {/* TODO make tooltips work and make dropdown work */}
              <div className="search-media-icon-container">
                <div className="search-media-icon"><a id={"media-entry-button-" + this.props.pos} className="icon-btn" href="javascript:void(0)" onClick={this.addToQueue}><i className="fa fa-plus fa-lg" ref={(ref) => this.icon1 = ref} data-toggle="tooltip" title="Add to Queue"></i></a></div>
                <div className="search-media-icon"><a className="icon-btn" href="javascript:void(0)" onClick={this.playMediaEntry}><i className="fa fa-play" ref={(ref) => this.icon2 = ref} data-toggle="tooltip" title="Play Now"></i></a></div>
                {dropdown}
              </div>
            </div>

            <ModalCreatePlaylist 
              key={this.props.pos} 
              user={this.props.user}
              data={mediaData} 
              pos={this.props.pos} />
          </div>
        );
        break;

      // ERROR, No Category type
      default:
        console.log('Media Category Error: NO TYPE');
        return;
        break;
    }
  }
});

module.exports = MediaEntry;