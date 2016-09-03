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

var ChatMessage = React.createClass({
  getInitialState: function() {
    return {
      owner: this.props.owner,
      message: this.props.message,
      username: this.props.username
    }
  },

  componentDidMount() {
    $(this.msg).tooltip();
  },

  render: function() {
    return (
      <div>
        {
          (() => {
            if(this.state.owner) {
              return (
                <div className="chat-msg-user">
                  {/* TODO: timestamp must be implemented into title */}
                  <div className="msg" ref={(ref) => this.msg = ref} data-toggle="tooltip" data-placement="left" title="4:20pm">{this.state.message}</div>
                </div>
              );
            }
            else {
              return (
                <div className="chat-msg">
                  <div className="name">{this.state.username}</div>
                  {/* TODO: timestamp must be implemented into title */}
                  <div className="msg" ref={(ref) => this.msg = ref} data-toggle="tooltip" data-placement="right" title="4:20pm">{this.state.message}</div>
                  <img className="profile-pic" src="images/profile-pic.png"/>
                </div>
              )
            }
          })()
        }
      </div>
    );
  }
});

var ChatUserActivityMessage = React.createClass({
  render: function() {
    return (
      <div>
        {
          (() => {
            switch(this.props.activity) {
              case "joined":
                return <div className="chat-notif">{this.props.username} has joined the chat.</div>
                break;
              case "disconnected":
                return <div className="chat-notif">{this.props.username} has left the chat.</div>
                break;
            }
          }
          )()
        }
      </div>
    );
  }
});

var ChatDisplay = React.createClass({
  getInitialState: function() {
    return {
      messages: []
    }
  },
  autoscroll: true,
  scrollToBottom: function() {
    // this.chat.scrollTop = this.chat.scrollHeight;
    $.getScript("js/jquery.mCustomScrollbar.concat.min.js", function(){
      $('.chat').mCustomScrollbar('scrollTo','bottom',{scrollInertia:200});
    });
  },
  userHasJoined: function(user) {
      var messages = this.state.messages
      messages.push(<ChatUserActivityMessage username={user.username} activity={"joined"} />)
      this.setState({
        messages: messages
      });
  },
  userHasDisconnected: function(user) {
      var messages = this.state.messages
      messages.push(<ChatUserActivityMessage username={user.username} activity={"disconnected"} />)
      this.setState({
        messages: messages
      });
  },
  newMessage: function(msg) {
      var isOwner = this.props.username === msg.username;
      var messages = this.state.messages
      messages.push(<ChatMessage username={msg.username} owner={isOwner} message={msg.message} />)
      this.setState({
        messages: messages
      });
  },
  componentDidMount: function() {
    socket.on("From Server: User joined", this.userHasJoined);
    socket.on('From Server: User disconnected', this.userHasDisconnected);
    socket.on('From Server: Chat message', this.newMessage);

    this.scrollToBottom();
  },
  componentWillUpdate: function() {
    var isAtRecentMessages = this.chat.scrollTop == (this.chat.scrollHeight - this.chat.clientHeight)
    if(isAtRecentMessages) {
      this.autoscroll = true;
    }
    else {
      this.autoscroll = false;
    }
  },
  componentDidUpdate: function() {
    if(this.autoscroll) {
      this.scrollToBottom();
    }
  },
  render: function() {
    return (
      <div className="chat" ref={(ref) => this.chat = ref}>
        <div>
          {
            this.state.messages
          }
        </div>
      </div>
    );
  }
});

var ChatInput = React.createClass({
  getInitialState: function() {
    return {
      message: ""
    }
  },
  ifUsernameExists: function() {
    if (!this.props.username || (0 === this.state.username.length)) {
      return false;
    }
    return true;
  },
  updateMessage: function(e) {
    this.setState({
      message: e.target.value
    });
  },
  clearMessage: function() {
    this.setState({
      message: ""
    })
  },
  sendMessage: function(e) {
    e.preventDefault();

    // TODO Do message input string checks
    // No empty string, no white spaces, Valid characters a-z, A-Z, 0-9
    // Client emits to server with Chat Message
    socket.emit('From Client: Chat message', this.state.message);
    this.clearMessage();
  },
  render: function() {
    return (
      <div className="chat-input-container">
        <form className="chat-input" id='chat-form' action="" onSubmit={this.sendMessage}>
          <input id="m" value={this.state.message} onChange={this.updateMessage} autoComplete="off" type="text" className="chat-textbox" name="" placeholder="Type a message..." />
        </form>
      </div>
    );
  }
});

var GuestUserForm = React.createClass({
  getInitialState: function() {
    return {
      username: ""
    }
  },
  updateUsername: function(e) {
    this.setState({
      username: e.target.value
    });
  },
  submitUsername: function(e) {
    e.preventDefault();
    this.props.setUsernameCallback(this.state.username);

    // TODO Do username input string checks
    // No empty string, no white spaces, Valid characters a-z, A-Z, 0-9
    // Client emits to server with Add user
    socket.emit('From Client: Add user', this.state.username);
  },
  render: function() {
    return (
      <div className="modal fade" id="enter-name" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog modal-sm" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <form className="search-input" id='username-form' action="" onSubmit={this.submitUsername}>
                <input value={this.state.username} onChange={this.updateUsername} autoComplete="off" type="text" className="chat-textbox" name="" placeholder="Enter Your Name" autoFocus={true} />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

/* Chatbox */
var Chatbox = React.createClass({
  getInitialState: function() {
    return {
      username: ""
    }
  },
  setUsername: function(username) {
    this.setState({
      username: username
    });
  },
  render: function() {
    return (
      <div>
        <ChatHeader />
        <ChatDisplay username={this.state.username} />
        <ChatInput username={this.state.username} />
        <GuestUserForm setUsernameCallback={this.setUsername} />
      </div>
    );
  }
});

module.exports = Chatbox;
