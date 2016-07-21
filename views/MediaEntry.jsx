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

// Thumbnail of the media
var Thumbnail = React.createClass({
  render: function() {
    return (
      <div clasName='media-thumbnail'>
        <img src={this.props.thumbnail}/>
      </div>
    );
  }
});

// Media's title component
var Title = React.createClass({
  render: function() {
    return (
      <div clasName='media-title'>
        {this.props.title}
      </div>
    );
  }
});

// Media's Duration component
var Duration = React.createClass({
  render: function() {
    return (
      <div clasName='media-duration'>
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
      title: this.props.title
    }
    socket.emit('From Client: Push into queue', mediaEntry);
  },

  render: function() {
    var categoryDivName;
    var categoryClassName;

    // TODO: Determine which media type
    // switch(this.props.mediaType) {

    // Renders the Media entry to the correct category.
    switch(this.props.categoryType) {
      // Queue
      case CATEGORYOFMEDIA.QUEUE:
        categoryDivName = 'queue-list-entry-';
        categoryClassName = 'queue-list-entry';
        return (
          <div id={categoryDivName + this.props.pos} className={categoryClassName}>
            <Thumbnail thumbnail={this.props.thumbnail} />
            <Title title={this.props.title} />
          </div>
        ); 
        break;

      // Search has a button that adds the media into the queue
      case CATEGORYOFMEDIA.SEARCH:
        categoryDivName = 'search-list-entry-';
        categoryClassName = 'search-list-entry';
        return (
          <div id={categoryDivName + this.props.pos} className={categoryClassName}>
            <Thumbnail thumbnail={this.props.thumbnail} />
            <Title title={this.props.title} />
            <button id={'media-entry-button-' + this.props.pos} className='media-entry-button' onClick={this.handleClick}>Add To Queue</button>
          </div>
        );
        break;

      default:
        console.log('Media Category Error:: NO TYPE');
        return;
        break;
    }
  }
});

module.exports = MediaEntry;