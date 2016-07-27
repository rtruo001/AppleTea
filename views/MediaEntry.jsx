/*  =============================================================================
    Main-Component MediaEntry

    A component for each individal media entry. Each medi aentry has a thumbnail and title.
    Each Entry has a category type to see where the media entry would belong as well as a
    media type which is either Youtube, Soundcloud, or Vimeo.

    @Components:  Thumbnail
                  Title
                  Duration
                  MediaEntry

    @Exports:     MediaEntry
    ========================================================================== */
var React = require('react');

const CATEGORYOFMEDIA = {
  QUEUE: 'QUEUE',
  SEARCH: 'SEARCH'
};

const PLAYNEXTMEDIAENTRYPOS = 0;

// <div class="media-card grabbable">
//   <img class="media-img" src="images/media-icon.png"/>
//   <div class="media-text">
//     <div class="media-title">Flume - Say It feat. Tove Lo</div>
//     <div class="media-artist">FlumeAUS</div>
//     <div class="media-icons"><a class="icon-btn-lite" href="javascript:void"><i class="fa fa-chevron-up" aria-hidden="true"></i></a></div>
//     <div class="media-icons"><a class="icon-btn-lite" href="javascript:void"><i class="fa fa-play" aria-hidden="true"></i></a></div>
//   </div>
// </div>

// <div class="search-card-padding">
//   <div class="search-media-card">
//     <img class="search-media-icon" src="images/media-icon.png">
//     <div class="search-media-text">
//       <div class="search-media-title">Flume - Say It feat. Tove Lo</div>
//       <div class="search-media-artist">FlumeAUS</div>
//     </div>
//   </div>
// </div>


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
        categoryClassName = 'search-media-icon';
        break;
      default:
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
        break;
    }

    return (
      <div className={categoryClassName}>
        {this.props.artist}
      </div>
    );
  }
})

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

// Each individual media entry in the list
var MediaEntry = React.createClass({
  handleClick: function() {
    var mediaEntry = {
      videoId: this.props.videoId,
      thumbnail: this.props.thumbnail,
      title: this.props.title,
      artist: this.props.artist
    }
    socket.emit('From Client: Push into queue', mediaEntry);
  },

  render: function() {
    var categoryDivName;
    var categoryClassName;

    // Renders the Media entry to the correct category.
    switch(this.props.categoryType) {
      // Queue
      case CATEGORYOFMEDIA.QUEUE:
        var queueMediaEntryId = "-queue-media-entry-id";

        // If in the front of the queue, renders a media entry that would play next
        if (this.props.pos === PLAYNEXTMEDIAENTRYPOS) {
          return (
            <div id={this.props.pos + queueMediaEntryId} className={"media-card grabbable"}>
              <Thumbnail thumbnail={this.props.thumbnail} categoryType={this.props.categoryType} />
              <div className="media-next">PLAYING NEXT:</div>
              <div className="media-text">
                <Title title={this.props.title} categoryType={this.props.categoryType} />
                <Artist artist={this.props.artist} categoryType={this.props.categoryType} />
                <div className="media-icons"><a className="icon-btn-lite" href="javascript:void"><i className="fa fa-chevron-up" aria-hidden="true"></i></a></div>
                <div className="media-icons"><a className="icon-btn-lite" href="javascript:void"><i className="fa fa-play" aria-hidden="true"></i></a></div>
              </div>
            </div>
          );
        }

        // Every other media entry in the queue
        return (
          <div id={this.props.pos + queueMediaEntryId} className={"media-card grabbable"}>
            <Thumbnail thumbnail={this.props.thumbnail} categoryType={this.props.categoryType} />
            <div className="media-text">
              <Title title={this.props.title} categoryType={this.props.categoryType} />
              <Artist artist={this.props.artist} categoryType={this.props.categoryType} />
              <div className="media-icons"><a className="icon-btn-lite" href="javascript:void"><i className="fa fa-chevron-up" aria-hidden="true"></i></a></div>
              <div className="media-icons"><a className="icon-btn-lite" href="javascript:void"><i className="fa fa-play" aria-hidden="true"></i></a></div>
            </div>
          </div>
        ); 
        break;

      // Search has a button that adds the media into the queue
      case CATEGORYOFMEDIA.SEARCH:
        var searchMediaEntryId = "-search-media-entry-id";
        return (
          <div id={this.props.pos + searchMediaEntryId} className={"search-card-padding"}>
            <div className="search-media-card">
              <Thumbnail thumbnail={this.props.thumbnail} categoryType={this.props.categoryType} />
              <div className="search-media-text">
                <Title title={this.props.title} categoryType={this.props.categoryType} />
                <Artist artist={this.props.artist} categoryType={this.props.categoryType} />
              </div>
              <button id={'media-entry-button-' + this.props.pos} className='media-entry-button' onClick={this.handleClick}>Add To Queue</button>
            </div>
          </div>
        );
        break;

      // ERROR, No Category type
      default:
        console.log('Media Category Error:: NO TYPE');
        return;
        break;
    }
  }
});

module.exports = MediaEntry;