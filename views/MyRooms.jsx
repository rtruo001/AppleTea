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

// Modal to create a new room
var ModalCreateRoom = React.createClass({
  render: function() {
    return (
      <div className="modal fade" id="create-room" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog modal-sm" role="document">
          <div className="modal-content">
            <div className="modal-header">
              Create a New Room
            </div>
            <div className="modal-body">
              <div className="search-container">
                <form className="search-input" id="create-room-input">
                  <input className="input-padding" type="text" placeholder="Room Name"/>
                  <div className="modal-label">Is this a private room?</div>
                  <div className="toggle-slider-section">
                    <label className="switch">
                      <input type="checkbox" id="create-room-toggle" checked />
                        <div className="slider"></div>
                    </label>
                    <i className="fa fa-lock" id="create-room-toggle-icon"></i>
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal">Create Room</button>
            </div>
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
          thumbnailExists={true}
          isLite={this.props.isLite} />
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
            thumbnailExists={true}
            isLite={this.props.isLite} />
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
            thumbnailExists={false}
            isLite={this.props.isLite} />
        );
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
        <ModalCreateRoom />
        </div>
      </div>
    );
  }
});

module.exports = MyRooms;