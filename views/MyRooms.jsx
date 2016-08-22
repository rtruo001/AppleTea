var React = require('react');
var RoomEntry = require('./RoomEntry');

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
  render: function() {

    var roomEntries = [];

    // TODO: If no rooms, return a placeholder
    if (false) {
      roomEntries.push(
        <MyRoomsPlaceholder key={'MyRoomsPlaceholder'} />
      )
    }

    // If there are rooms, pushes every room card
    else {

      // DEMO ROOMS DATA
      roomEntries.push (
        <RoomEntry 
          owner={true}
          moderator={true}
          type={'private'}
          name={'The Vent Room'}
          inroom={'27'}
          size={'35'}
          thumbnailExists={true} />
      );
      for (var i = 0; i < 6; ++i) {
        roomEntries.push (
          <RoomEntry 
            owner={false}
            moderator={true}
            type={'private'}
            name={'Apple Tea Work Room'}
            inroom={'2'}
            size={'4'}
            thumbnailExists={true} />
        );
      }
      for (var i = 0; i < 1; ++i) {
        roomEntries.push (
          <RoomEntry 
            owner={false}
            moderator={false}
            type={'public'}
            name={'This Room Has a Pretty Long Name'}
            inroom={'0'}
            size={'2034'}
            thumbnailExists={false} />
        );
      }
    }

    return (
      <div>
        <div className="myrooms-container">
          <div className="rooms-section">
            <button className="btn btn-dark" data-toggle="modal" data-target="#create-room"><i className="fa fa-plus icon-padding"></i>Create New Room</button>
          </div>
          <div className="row">
            {roomEntries}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = MyRooms;