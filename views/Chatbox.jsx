var React = require('react');

/* Chatbox */
var Chatbox = React.createClass({
  render: function() {
    return (
      <div id="chat-box">
        <h1>Chatbox</h1>
        <ul id="chat-box-messages"></ul>

        <form id='chat-form' action="">
          <input id="m" autoComplete="off" />
          <button>Send</button>
        </form>

        <form id='username-form'>
          <input id="u" autoComplete="off" />
          <button>Send</button>
        </form>
      </div>
    );
  }
});

module.exports = Chatbox;