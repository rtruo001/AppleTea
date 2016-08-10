/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    Main-Component Queue

    The entire Queue component. Contains a list of media entries that are in the queue.
    Also has sub components of the queue's title, length, and added media lengths, with the buttons
    that controls the functionalities of shuffle and likes.

    @Components:  QueueTitle
                  PlaylistLength
                  AddedMediaLength
                  ShuffleButton
                  LikeButton
                  SquareButton
                  Queue

    @Exports:     Queue
    ========================================================================== */
var React = require('react');
var MediaEntry = require('./MediaEntry');

/*  =============================================================================
    Function reinitializeDraggable

    Whenever the queue is changed or updated, reinitializes the draggable in order
    for the dragging to work with the newly updated list. The destroy parameter
    resets the entire draggable object. After the entire process is finished, the function callback
    is called, which is usually a callback to resetting the draggable with the new queue.
    ========================================================================== */
function reinitializeDraggable(callback) {
  $('.media-card').arrangeable('destroy');
  callback();
}

var QueueTitle = React.createClass({
  render: function() {
    return(
      <div className="queue-title">{this.props.queueTitle}</div>
    );
  }
});

var PlaylistLength = React.createClass({
  render: function() {
    return (
      <div className="pill" data-toggle="tooltip" title="Items in Playlist">{this.props.playlistLength}</div>
    )
  }
});

var AddedMediaLength = React.createClass({
  render: function() {
    return (
      <div className="pill pill-blue" data-toggle="tooltip" title="Items Added">+{this.props.addedMediaLength}</div>
    )
  }
});

var EditButton = React.createClass({
  render: function() {
    return (
      <div className="queue-icon"><a className="icon-btn" href="javascript:void(0)"><i className="fa fa-edit" data-toggle="tooltip" title="Edit" aria-hidden="true"></i></a></div>  
    );
  }
});

var ShuffleButton = React.createClass({
  render: function() {
    return (
      <div className="queue-icon shfl-btn"><a className="icon-btn" href="javascript:void(0)"><i className="fa fa-random" data-toggle="tooltip" title="Shuffle" aria-hidden="true"></i></a></div>
    )
  }
});

var LikeButton = React.createClass({
  render: function() {
    return(
      <div className="queue-icon like-btn"><a className="icon-btn" href="javascript:void(0)"><i className="fa fa-heart-o" data-toggle="tooltip" title="Like Playlist" aria-hclassden="true"></i></a></div>
    );
  }
});

var SquareButton = React.createClass({
  render: function() {
    return (
      <div className="queue-icon"><a className="icon-btn" href="javascript:void(0)"><i className="fa fa-square-o" data-toggle="tooltip" title="Clear" aria-hidden="true"></i></a></div>  
    );
  }
});
   
// TODO: Maybe implement Loop
var LoopButton = React.createClass({
  render: function() {
    return (
      <div>

      </div>
    )
  }
});

// MAIN COMPONENT: The entire queue
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
    socket.on('From Server: Update queue with new queue', this.updateQueueWithNewQueue);
  },

  // EVENT HANDLER: Initializes the queue with the server's current queue
  initializeQueue: function(mediaEntries) {
    var queueListWithNewMediaEntry = this.state.queueList.concat(mediaEntries);
    this.setState({queueList: queueListWithNewMediaEntry}, function() {
      reinitializeDraggable(function() {
        console.log("Draggable reinitialized with Queue changes : initializeQueue");        
        $('.media-card').arrangeable();
      });
    });
  },

  // EVENT HANDLER: Pushes a media entry into the queue
  pushIntoQueue: function(mediaEntry) {
    var queueListWithNewMediaEntry = this.state.queueList.concat(mediaEntry);
    this.setState({queueList: queueListWithNewMediaEntry}, function() {
      reinitializeDraggable(function() {
        console.log("Draggable reinitialized with Queue changes : pushIntoQueue");
        $('.media-card').arrangeable();  
      });
    });
  },

  // EVENT HANDLER: Updates the queue with the server's queue
  updateQueueWithNewQueue: function(newQueueList) {
    this.setState({queueList: newQueueList}, function() {
      console.log("Finished updating queue");
    });
  },

  render: function() {
    // Prepares each media entry. Whenever a media is added, populates the queue list with the new media entry
    var queueEntries = [];
    var queueEntry;
    var queueMediaEntryId = 'queue-media-entry-';

    // Added If statement that pushes the placeholder div into queueEntries whenever queueList is empty
    if (this.state.queueList.length <= 0) {
      queueEntries.push(
        <div className="placeholder">
          <div className="placeholder-content">
            <i className="fa fa-square-o placeholder-icon"></i><br/>
            <span>Your queue is empty</span>
          </div>
        </div>
      )
    }

    /* TODO: When list is empty AFTER FINISHING A PLAYLIST, display this placeholder instead
      <div className="placeholder">
        <div className="placeholder-content">
          <i className="fa fa-child placeholder-icon"></i><br/>
          <span>You finished your playlist!</span>
        </div>
      </div>
    </div>
    */

    // If there are media entries, pushes every media entry the queueEntries instead
    else {
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
            artist={queueEntry.artist} 
            ifMediaCardAdded={queueEntry.ifMediaCardAdded} />
        );
      }
    }

    return (
      <div>
        <div className="queue-header">
          <div className="queue-title-container">
            {/* TODO: Change queue titles and pill numbers depending on what was added */}
            <QueueTitle queueTitle={"Chill Ass Music"} />
            <PlaylistLength playlistLength={this.state.queueList.length} />
            <AddedMediaLength addedMediaLength={this.state.queueList.length} />
          </div>

          <div className="queue-icon-container">
            <SquareButton />
            <LikeButton />
            <ShuffleButton />
            <EditButton />
          </div>
        </div>

        <div className="queue-body col-padding">
          {queueEntries}
        </div>

        <nav aria-label="page navigation">
          <ul className="pagination">
            <li className="disabled"><a href="javascript:void(0)" aria-label="Previous"><i className="fa fa-angle-left"></i></a></li>
            <li className="active"><a href="javascript:void(0)">1</a></li>
            <li><a href="javascript:void(0)">2</a></li>
            <li><a href="javascript:void(0)">3</a></li>
            <li><a href="javascript:void(0)" aria-label="Next"><i className="fa fa-angle-right"></i></a></li>
          </ul>
        </nav>
      </div>
    );
  }
});

module.exports = Queue;