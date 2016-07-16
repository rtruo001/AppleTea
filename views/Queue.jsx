/*  =============================================================================
    Main-Component Queue

    The entire Queue component. Contains a list of media entries that are in the queue.
    Also has a top of the Queue list.

    @Components:  TopOfQueueList
                  Queue

    @Exports:     Queue
    ========================================================================== */
var React = require('react');
// Media Entry component
var MediaEntry = require('./MediaEntry');

// Top of the queue component
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

// Queue Component
var Queue = React.createClass({
  getInitialState: function() {
    return {
      queueList: []
    };
  },

  componentDidMount: function() {
    // Event handlers sent from server when medias are added to the queue
    socket.on('From Server: Initialize Queue', this.initializeQueue);
    socket.on('From Server: Push into queue', this.pushIntoQueue);
  },

  initializeQueue: function(mediaEntries) {
    var queueListWithNewMediaEntry = this.state.queueList.concat(mediaEntries);
    this.setState({queueList: queueListWithNewMediaEntry});
  },

  pushIntoQueue: function(mediaEntry) {
    var queueListWithNewMediaEntry = this.state.queueList.concat(mediaEntry);
    this.setState({queueList: queueListWithNewMediaEntry});
  },

  render: function() {
    // Prepares each media entry. Whenever a media is added, populates the queue list with the new media entry
    var queueEntries = [];
    var queueEntry;
    for (var i = 0; i < this.state.queueList.length; ++i) {
      queueEntry = this.state.queueList[i];
      queueEntries.push (
        <MediaEntry 
          key={queueEntry.videoId} 
          pos={i} 
          videoId={queueEntry.videoId} 
          categoryType={'QUEUE'}
          mediaType={'YOUTUBE'}
          thumbnail={queueEntry.thumbnail} 
          title={queueEntry.title} />
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