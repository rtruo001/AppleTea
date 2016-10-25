/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    MyRoom.jsx

    Section containing all of the RoomEntries
    ========================================================================== */

/*  =============================================================================
    @Components:    MyRoomsPlaceholder
                    MyRooms

    @Exports:       MyRooms
    ========================================================================== */
var React = require('react');
var RoomEntry = require('./RoomEntry.jsx');
var ModalCreateRoom = require('./ModalCreateRoom.jsx');

// Placeholder if user is not a part of any room
var MyRoomsPlaceholder = React.createClass({
  render: function() {
    return (
      <div className="col-padding">
        <div className="placeholder placeholder-rooms">
          <div className="placeholder-content">
            <i className="fa fa-home placeholder-icon"></i><br/>
            <span>You have no rooms</span>
          </div>
        </div>
      </div>
    );
  }
});

// MAIN COMPONENT: My Rooms Tab
var MyRooms = React.createClass({
  getInitialState: function() {
    return {
      rooms: this.props.rooms
    };
  },

  render: function() {
    var roomEntries = [];

    // Placeholder if there are no rooms
    if (this.state.rooms === undefined || this.state.rooms === null || this.state.rooms.length <= 0) {
      roomEntries.push(
        <MyRoomsPlaceholder key={'MyRoomsPlaceholder'} />
      )
    }

    // If there are rooms, pushes every room card
    else {
      var roomEntry;
      for (var i = 0; i < this.state.rooms.length; ++i) {
        roomEntry = this.state.rooms[i];

        roomEntries.push(
        <RoomEntry 
          key={i}
          owner={true}
          moderator={true}
          type={roomEntry.isPublic}
          name={roomEntry.name}
          inroom={roomEntry.inRoom}
          size={'35'}
          thumbnail={roomEntry.thumbnail} 
          isLite={this.props.isLite}
          linkHash={roomEntry._id} />
        )
      }
    }

    // If isLite prop is true, use primary button, else use dark button
    var buttonClassName = "btn";
    if (this.props.isLite == true) {
      buttonClassName += " btn-primary";
    }
    else {
      buttonClassName += " btn-dark";
    };

    return (
      <div>
        <div className="myrooms-container">
          <div className="rooms-section">
            <button className={buttonClassName} data-toggle="modal" data-target="#create-room"><i className="fa fa-plus icon-padding"></i>Create New Room</button>
          </div>

          <div className="row">
            {roomEntries}
          </div>

        <ModalCreateRoom user={this.props.user} />

        </div>
      </div>
    );
  }
});

module.exports = MyRooms;