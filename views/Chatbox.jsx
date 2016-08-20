var React = require('react');

var UserListEntry = React.createClass({
  getInitialState: function() {
    return {
      online: this.props.online,
      moderator: this.props.moderator,
      syncing: this.props.syncing
    }
  },
  render: function() {
    var name = this.props.userName;
    var online = this.state.online;
    var moderator = this.state.moderator;

    return (
      <div>
        <li>
          {
            (() => {
              if(online) return <i className="fa fa-circle status status-online"></i>
              else return <i className="fa fa-circle status status-offline"></i>
            })()
          }
          <a className="user-name" href="javascript:void(0)">{name}</a>
          <div className="users-list-edit"><a className="icon-btn" href="javascript:void(0)"><i className="fa fa-star fa-fw mod-toggle"></i></a><a className="icon-btn" data-toggle="modal" data-target="#kick-confirm" href="javascript:void(0)"><i className="fa fa-remove fa-fw"></i></a></div>
          <div className="users-list-icons"><i className="fa fa-refresh fa-spin fa-fw" data-toggle="tooltip" title="Syncing"></i><i className="fa fa-star fa-fw" data-toggle="tooltip" title="Moderator"></i></div>
        </li>
      </div>
    )
  }
});

var UserList = React.createClass({
  render: function() {

    var onlineUsers = [
      "Gerard Liu",
      "Randy Truong",
      "Kevin Chiao",
      "Harrison Ford"
    ];

    var offlineUsers = [
      "Minnal Kunnan",
      "Jason Maryne",
      "Eric Dieu",
      "Kevin Ton",
      "Kris Luong",
      "Franky Nguyen",
      "Adrian Mandee",
      "Jay Yee",
      "George Huang",
      "Jelly Kid",
      "Finn Human"
    ];

    var onlineUserEntries = []
    var offlineUserEntries = []

    for(var i = 0; i < onlineUsers.length; i++) {
      onlineUserEntries.push(<UserListEntry userName={onlineUsers[i]} online={true}/>)
    }
    for(var i = 0; i < offlineUsers.length; i++) {
      offlineUserEntries.push(<UserListEntry userName={offlineUsers[i]} online={false}/>)
    }

    return (
      <div>
        <div id="users-list-container">
          <div className="users-list-container">
            <div className="users-list-header users-online-section">
              Members
              <button type="button" className="btn btn-sm btn-secondary users-list-edit-btn"><i className="fa fa-gear" id="users-list-gear-icon"></i></button>
            </div>
            <div className="users-list-scroll-container">
              <ul className="users-list">
                {onlineUserEntries}
              </ul>
              <ul className="users-list users-list-section users-offline-section">
                {offlineUserEntries}
              </ul>
            </div>
            <div className="users-list users-list-section users-list-add"><button type="button" className="btn btn-sm btn-secondary" data-toggle="modal" data-target="#add-user"><i className="fa fa-plus fa-fw"></i>Add People</button></div>
          </div>
        </div>
      </div>
    )
  }
});

var ChatHeader = React.createClass({
  render: function() {
    return (
      <div className="room-header">
        <div className="room-name onclick-edit">
          Vent Room
          <a className="icon-btn-dark" href="javascript:void(0)"><i className="fa fa-edit" aria-hidden="true"></i></a>
        </div>
        <div className="users-btn">
          4
          <i className="fa fa-users users-btn-icon"></i>
          <i className="fa fa-circle status status-online"></i>
        </div>

        <UserList/>

      </div>
    )
  }
});

var ChatDisplay = React.createClass({
  userHasJoinedListener: function() {
    // When user has joined, sends the username and outputs it on the box
    socket.on("From Server: User joined", function(user) {
      $('.chat').append('<div class="chat-notif">' + user.username + " has joined the chat." + '</div>');
    })
  },
  userHasDisconnectedListener: function() {
    // When an actual user exits the page/chat
    socket.on('From Server: User disconnected', function(user){
      $('.chat').append('<div class="chat-notif">' + user.username + " has left the chat." + '</div>');
    });
  },
  newMessageListener: function() {
    // Server emits Chat message
    socket.on('From Server: Chat message', function(msg){
      if (username === msg.username) {
        $('.chat').append(
          '<div class="chat-msg-user">' +
            '<div class="msg">' + msg.message + '</div>'
        );
      }
      else {
        $('.chat').append(
          '<div class="chat-msg">' +
            '<div class="name">' + msg.username + '</div>' +
            '<div class="msg">' + msg.message + '</div>' +
            '<img class="profile-pic" src="images/profile-pic.png"/>'
        );
      }
    });
  },
  setupListeners: function() {
    this.userHasJoinedListener()
    this.userHasDisconnectedListener()
    this.newMessageListener()
  },
  componentDidMount: function() {
    this.setupListeners()
  },
  render: function() {
    return (
      <div className="chat"></div>
    );
  }
});

var ChatInput = React.createClass({
  ifUsernameExists: function() {
    if (!username || 0 === username.length) {
      return false;
    }
    return true;
  },
  sendMessage: function(e) {
    console.log(e)
    e.preventDefault();
    if (!this.ifUsernameExists()) {
      if ($('.logged-out-message').length <= 0) {
        $('#chat-box').append($('<div class="logged-out-message">').text("Please login"));
      }
      return;
    }

    // TODO Do message input string checks
    // No empty string, no white spaces, Valid characters a-z, A-Z, 0-9
    // Client emits to server with Chat Message
    socket.emit('From Client: Chat message', $('#m').val());
    $('#m').val('');
  },
  render: function() {
    return (
      <div className="chat-input-container">
        <form className="chat-input" id='chat-form' action="" onSubmit={this.sendMessage}>
          <input id="m" autoComplete="off" type="text" className="chat-textbox" name="" placeholder="Type a message..." />
        </form>
      </div>
    );
  }
});

/* Chatbox */
var Chatbox = React.createClass({
  render: function() {
    return (
      <div>
        <ChatHeader/>
        <ChatDisplay/>
        <ChatInput/>


        <div className="modal fade" id="enter-name" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog modal-sm" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <form className="search-input" id='username-form' action="">
                  <input id="u" autoComplete="off" type="text" className="chat-textbox" name="" placeholder="Enter Your Name" />
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
});

module.exports = Chatbox;
