/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    index.jsx

    Index JSX View
    The view of the entire index page. Main webpage
    ========================================================================== */

/*  =============================================================================
    Components

    Index - Overall website
    ========================================================================== */
var React = require('react');
var ReactDOM = require('react-dom');

var Index = React.createClass({
  render: function () {
    return (
      <html>
        <head>
          <link rel="stylesheet" href="/css/stylesheets/style.css"/>
          <link rel="stylesheet" href="/css/stylesheets/index.css"/>
        </head>

        <body>
          {this.props.title}
          {/* Media Player */} 
          <div id="media-player">

          </div>

          {/* Chatbox */} 
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

          <script src="http://code.jquery.com/jquery-1.11.1.js"></script>
          <script src="../socket.io/socket.io.js"></script>
          <script src="/javascripts/chat.js"></script>
        </body>
      </html>
    );  
  }
});

module.exports = Index;