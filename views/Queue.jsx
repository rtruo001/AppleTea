/*  =============================================================================
    Copyright © 
    ========================================================================== */

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

function reinitializeDraggable(callback) {
  console.log("Starting destroy");
  $('.media-card').arrangeable('destroy');
  callback();
}

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

var ShuffleButton = React.createClass({
  render: function() {
    return (
      <div id='shuffle-button'>

      </div>
    )
  }
});

var LoopButton = React.createClass({
  render: function() {
    return (
      <div id='loop-button'>

      </div>
    )
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
    socket.on('From Server: Update queue with swaps', this.updateIndicesInQueue);
  },

  initializeQueue: function(mediaEntries) {
    var queueListWithNewMediaEntry = this.state.queueList.concat(mediaEntries);
    this.setState({queueList: queueListWithNewMediaEntry}, function() {
      reinitializeDraggable(function() {
        console.log("Arranging after destroying in Initialization");
        $('.media-card').arrangeable();
      });
    });
  },

  pushIntoQueue: function(mediaEntry) {
    if (this.state.queueList.length <= 0) {
      socket.emit('From Client: Initialize media player', mediaEntry);
    }
    var queueListWithNewMediaEntry = this.state.queueList.concat(mediaEntry);
    this.setState({queueList: queueListWithNewMediaEntry}, function() {
      reinitializeDraggable(function() {
        console.log("Arranging after destroying in Push into queue");
        $('.media-card').arrangeable();  
      });
    });
  },

  updateIndicesInQueue: function(newQueueList) {
    this.setState({queueList: newQueueList}, function() {
      console.log("Finished updating indices in queue");
    });
  },

  render: function() {
    // Prepares each media entry. Whenever a media is added, populates the queue list with the new media entry
    var queueEntries = [];
    var queueEntry;
    var queueMediaEntryId = 'queue-media-entry-';

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
          title={queueEntry.title}
          artist={queueEntry.artist} />
      );
    }

    return (
      <div>

        <div className="col-xs-4 queue-container">
          <div className="queue-header">
            <div className="queue-title-container">
              {/* TODO: Change queue titles and pill numbers depending on what was added */}
              <div className="queue-title">Chill Ass Music</div>
              <div className="pill">{this.state.queueList.length}</div>
              <div className="pill pill-blue">+{this.state.queueList.length}</div>
            </div>
            <div className="queue-icon-container">
              <div className="queue-icon"><a className="icon-btn" href="javascript:void"><i className="fa fa-square-o" aria-hidden="true"></i></a></div>
              <div className="queue-icon like-btn"><a className="icon-btn" href="javascript:void"><i className="fa fa-heart-o" aria-hclassden="true"></i></a></div>
              <div className="queue-icon shfl-btn"><a className="icon-btn" href="javascript:void"><i className="fa fa-random" aria-hidden="true"></i></a></div>
            </div>
          </div>

          <div className="queue-body col-md-12">
            {queueEntries}
          </div>
        </div>

      </div>
    );
  }
});

module.exports = Queue;