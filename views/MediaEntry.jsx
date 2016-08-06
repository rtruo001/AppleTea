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

// Thumbnail of the media
var Thumbnail = React.createClass({
  render: function() {
    var categoryDivName;
    var categoryClassName;
    switch(this.props.categoryType) {
      case CATEGORYOFMEDIA.QUEUE:
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
        categoryClassName = 'media-title';
        break;
      case CATEGORYOFMEDIA.SEARCH:
        categoryClassName = 'search-media-title';
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
        categoryClassName = 'media-artist';
        break;
      case CATEGORYOFMEDIA.SEARCH:
        categoryClassName = 'search-media-artist';
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
      case MEDIATYPES.QUEUE:
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

// MAIN COMPONENT: Each individual media entry in the list
var MediaEntry = React.createClass({
  // EVENT HANDLER: When the add to queue button is clicked, adds the media to the queue.
  addToQueue: function() {
    var mediaEntry = {
      videoId: this.props.videoId,
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
    var mediaEntry = {
      videoId: this.props.videoId,
      mediaType: this.props.mediaType,
      thumbnail: this.props.thumbnail,
      title: this.props.title,
      artist: this.props.artist,
      ifMediaCardAdded: true
    }
    socket.emit('From Client: Play new media entry', mediaEntry);
  },

  // EVENT HANDLER: When the delete button is clicked, removes the media entry from queue
  deleteMediaEntry: function() {
    console.log("Delete Media Entry from Queue");
    var mediaEntry = {
      videoId: this.props.videoId,
      mediaType: this.props.mediaType,
      thumbnail: this.props.thumbnail,
      title: this.props.title,
      artist: this.props.artist,
      ifMediaCardAdded: true,
      posInQueue: this.props.pos
    }
    socket.emit('From Client: Delete media entry from queue', mediaEntry);
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

        // Adds the media-card-added class if the media entry was added individually
        if (this.props.ifMediaCardAdded == true) {
          queueMediaCardClassName += " media-card-added";
        }

        // If in the front of the queue, renders a media entry that would play next
        if (this.props.pos === PLAYNEXTMEDIAENTRYPOS) {
          return (
            <div id={this.props.pos + queueMediaEntryId} className={queueMediaCardClassName}>
              <div className="media-card-added-corner"></div>
              <a className="media-card-added-plus icon-btn-white" href="javascript:void(0)" onClick={this.deleteMediaEntry}>+</a>
              <Thumbnail thumbnail={this.props.thumbnail} categoryType={this.props.categoryType} />
              <div className="media-next">PLAYING NEXT:</div>
              <div className="number">{this.props.pos + 1}</div>

              <div className="media-text-container">
                <Title title={this.props.title} categoryType={this.props.categoryType} />
                <Artist artist={this.props.artist} categoryType={this.props.categoryType} />
                <div className="media-icon-container">
                  <div className="media-icon"></div>
                  <a className="icon-btn-blue-lite" href="javascript:void(0)" onClick={this.playMediaEntry}><div className="media-icon"><i className="fa fa-play" aria-hidden="true"></i></div></a>
                </div>
              </div>
            </div>
          );
        }

        // Every other media entry in the queue
        return (
          <div id={this.props.pos + queueMediaEntryId} className={queueMediaCardClassName}>
            <div className="media-card-added-corner"></div>
            <a className="media-card-added-plus icon-btn-white" href="javascript:void(0)" onClick={this.deleteMediaEntry}>+</a>
            <Thumbnail thumbnail={this.props.thumbnail} categoryType={this.props.categoryType} />
            <div className="number">{this.props.pos + 1}</div>

            <div className="media-text-container">
              <Title title={this.props.title} categoryType={this.props.categoryType} />
              <Artist artist={this.props.artist} categoryType={this.props.categoryType} />
              <div className="media-icon-container">
                <div className="media-icon"></div>
                <a className="icon-btn-blue-lite" href="javascript:void(0)"><div className="media-icon"><i className="fa fa-chevron-up" aria-hidden="true"></i></div></a>
                <a className="icon-btn-blue-lite" href="javascript:void(0)" onClick={this.playMediaEntry}><div className="media-icon"><i className="fa fa-play" aria-hidden="true"></i></div></a>
              </div>
            </div>
          </div>
        ); 
        break;

      // Media Entry in the Search component, also has a button that adds the media entry into the queue
      case CATEGORYOFMEDIA.SEARCH:
        var searchMediaEntryId = "-search-media-entry-id";
        return (
          <div id={this.props.pos + searchMediaEntryId} className={"search-card-padding"}>
            <div className="search-media-card">
              <Thumbnail thumbnail={this.props.thumbnail} categoryType={this.props.categoryType} />

              <div className="search-media-text-container">
                <Title title={this.props.title} categoryType={this.props.categoryType} />
                <Artist artist={this.props.artist} categoryType={this.props.categoryType} />
                <Type type={this.props.mediaType} categoryType={this.props.categoryType} />
              </div>

              <div className="search-media-icon-container">
                <div className="search-media-icon"><a id={"media-entry-button-" + this.props.pos} className="icon-btn" href="javascript:void(0)" onClick={this.addToQueue}><i className="fa fa-plus fa-lg"></i></a></div>
                <div className="search-media-icon"><a className="icon-btn" href="javascript:void(0)" onClick={this.playMediaEntry}><i className="fa fa-play"></i></a></div>
                <div className="search-media-icon"><a className="icon-btn" href="javascript:void(0)"><i className="fa fa-list-ul"></i></a></div>
              </div>
            </div>
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