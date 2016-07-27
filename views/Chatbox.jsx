var React = require('react');

/* Chatbox */
var Chatbox = React.createClass({
  render: function() {
    return (
      <div>
        <div className="room-header">
          <div>Vent Room</div>
        </div>

        <div className="chat">
          <div className="chat-msg-user">

          </div>
          <div className="chat-msg-user">

          </div>
          <div className="chat-msg-user">

          </div>
          <div className="chat-msg">

          </div>
        </div>

        <div className="chat-type">
          <form className="chat-input" id='chat-form' action="">
            <input id="m" autoComplete="off" type="text" className="chat-textbox" name="" placeholder="Type a message..." />
          </form>

          <form className="chat-input" id='username-form' action="">
            <input id="u" autoComplete="off" type="text" className="chat-textbox" name="" placeholder="Type a message..." />
          </form>
          
        </div>
      </div>
    );
  }
});

module.exports = Chatbox;