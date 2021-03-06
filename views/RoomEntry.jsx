/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    VIEW: RoomEntry.jsx

    The individual entry of a room
    ========================================================================== */

/*  =============================================================================
    @Components:    RoomUsersPill
                    RoomThumbnail

    @Exports:       RoomEntry
    ========================================================================== */
var React = require('react');

// Online Users Pill, icon displayed dependent on how many users in room
var RoomUsersPill = React.createClass({
  render: function () {
    if (this.props.inroom <= 0 || this.props.inroom == null) {
      return (
        <div className="room-pill">
          <div className="room-users">
            0
            <i className="fa fa-users users-btn-icon"></i>
            <i className="fa fa-circle status"></i>
          </div>
        </div>
      );
    }
    else if (this.props.inroom <= 2) {
      return (
        <div className="room-pill">
          <div className="room-users">
            {this.props.inroom}
            <i className="fa fa-user users-btn-icon"></i>
            <i className="fa fa-circle status"></i>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="room-pill">
          <div className="room-users">
            {this.props.inroom}
            <i className="fa fa-users users-btn-icon"></i>
            <i className="fa fa-circle status"></i>
          </div>
        </div>
      );
    };
  }
});

// Room Thumbnail 
var RoomThumbnail = React.createClass({
  render: function () {
    if (this.props.thumbnail !== null) {
      return (
        <div>
          <img className="room-img" src={this.props.thumbnail}/>
        </div>
      );
    }
    else {
      return (
        <div></div>
      );
    }
  }
});

// MAIN COMPONENT: Each individual playlist card
var RoomEntry = React.createClass({
  render: function() {

    var roomCardClassName = "room-card";

    // If room is not playing anything, append room-card-empty to classname
    if (this.props.thumbnail === null) {
      roomCardClassName += " room-card-empty";
    };

    var roomhref = "/room/" + this.props.linkHash;

    // If passed the prop of isLite, generate card with lite theme instead of dark
    if (this.props.isLite == true) {
      roomCardClassName += " room-card-lite";
    };

    return (
      <div className="col-sm-3 col-padding">
        {/* TODO: must link to the specific room */}
        <a href={roomhref}>
          <div className={roomCardClassName}>
            <div className="room-overlay"><div className="room-overlay-fill"></div></div>
            <RoomThumbnail thumbnail={this.props.thumbnail} />
            <div className="room-text-container">
              <div className="room-title ellipses">{this.props.name}</div>
              <RoomUsersPill inroom={this.props.inroom} />
            </div>
          </div>
        </a>
      </div>
    );
  }
});

module.exports = RoomEntry;