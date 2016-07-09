var React = require('react');

var TopOfQueueList = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.currentTop}
        Top of Queue
      </div>
    );
  }
});

// Thumbnail of the media
var Thumbnail = React.createClass({
  render: function() {
    return (
      <div clasName='queue-thumbnail'>
        <img src={this.props.thumbnail}/>
      </div>
    );
  }
});

// Media's title component
var Title = React.createClass({
  render: function() {
    return (
      <div clasName='queue-title'>
        {this.props.title}
      </div>
    );
  }
});

// Media's Duration component
var Duration = React.createClass({
  render: function() {
    return (
      <div clasName='queue-duration'>
        {this.props.duration}
      </div>
    );
  }
});

// Each individual media entry in the list
var QueueEntries = React.createClass({
  render: function() {
    return (
      <div id={'queue-list-entry-' + this.props.pos} className='queue-list-entry'>
        <Thumbnail thumbnail={this.props.thumbnail} />
        <Title title={this.props.title} />
      </div>
    );
  }
});

var Queue = React.createClass({
  getInitialState: function() {
    return {
      queueList: []
    };
  },
  componentDidMount: function() {
    // TODO: Think of other ways to do this.
    global.mediaClickedAddToQueue = (mediaEntry) => {
      var queueListWithNewMediaEntry = this.state.queueList.concat(mediaEntry);
      this.setState({queueList: queueListWithNewMediaEntry});
    }
  },
  render: function() {
    var queueEntries = [];
    var queueEntry;
    for (var i = 0; i < this.state.queueList.length; ++i) {
      queueEntry = this.state.queueList[i];
      queueEntries.push (
        <QueueEntries key={queueEntry.videoId} pos={i} videoId={queueEntry.videoId} thumbnail={queueEntry.thumbnail} title={queueEntry.title} />
      );
    }

    return (
      <div>
        <TopOfQueueList currentTop={"Halsey"} />
        {queueEntries}
      </div>
    );
  }
});

module.exports = Queue;