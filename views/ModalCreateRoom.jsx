/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    VIEW: ModalCreateRoom.jsx

    The component for when the Modal pops up for creating a new room
    ========================================================================== */

/*  =============================================================================
    @Components:    ToggleIcon
                    ModalCreateRoom

    @Exports:       ModalCreateRoom
    ========================================================================== */
var React = require('react');

// The icon which tells the user if the new room would be either public or private
var ToggleIcon = React.createClass({
  render: function() {
    // Toggles the icon to the globe or lock depending on if the new room would be public or private
    var toggleClass;
    if (this.props.isPublic === true) {
      toggleClass = "fa fa-globe";
    }
    else {
      toggleClass = "fa fa-lock";
    } 

    return (
      <div className="toggle-slider-section">
        <label className="switch">
          <input type="checkbox" id="create-room-toggle" onChange={this.props.onChange} />
            <div className="slider"></div>
        </label>
	    <i className={toggleClass} id="create-room-toggle-icon"></i>
      </div>
    );
  }
});

// Modal to create a new room
var ModalCreateRoom = React.createClass({
  getInitialState: function() {
    return {
      roomNameInput: "",
      isPublic: true
    }
  },

  onChangeRoomName: function(e) {
    this.setState({ roomNameInput: e.target.value });
  },

  onChangeIsPublic: function(e) {
    // The playlist is public when the target is not checked
    console.log(this.state.isPublic);
    this.setState({ isPublic: !e.target.checked });
  },

  onSubmit: function(e) {
    e.preventDefault();
  },

  addToRooms: function(e) {
    // Check room input
    if (this.state.roomNameInput === "") {
      // TODO: Display error message
      return;
    }

    // TODO: Implement added user
    socket.emit("From Client: Create new room", {roomName: this.state.roomNameInput, owner: "A USER"}, function(roomId){
      window.location = "/room/" + roomId;
    });
  },
  
  render: function() {
    return (
      <div className="modal fade" id="create-room" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog modal-sm" role="document">
          <div className="modal-content">
            <div className="modal-header">
              Create a New Room
            </div>
            <div className="modal-body">
              <div className="search-container">
                <form className="search-input" id="create-room-input" onSubmit={this.onSubmit}>
                  <input className="input-padding" type="text" placeholder="Room Name" onChange={this.onChangeRoomName} />
                  <div className="modal-label">Is this a private room?</div>

                  {/* Toggle Icon component */} 
                  <ToggleIcon isPublic={this.state.isPublic} onChange={this.onChangeIsPublic} />
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.addToRooms} >Create Room</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ModalCreateRoom;