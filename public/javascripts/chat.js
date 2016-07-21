/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    chat.js

    Client side functions of the chat system.
    ========================================================================== */

/*  =============================================================================
    Variables
    
    userName - The name of the current Username.
    ========================================================================== */
var connected = false;
var username = "";

/*  =============================================================================
    Function: ifUsernameExists
    
    @param         none
    @return true   - When users exists
    @returns false - When users are empty or does not exist
    ========================================================================== */
function ifUsernameExists() {
  if (!username || 0 === username.length) {
    return false;
  }
  return true;
}

/*  =============================================================================
    Function: setUsername
    
    @param newUsername - Parameter to set the username
    
    @return true   - When users exists
    @return false  - When users are empty or does not exist
    ========================================================================== */
function setUsername(newUsername) {
  username = newUsername;
}

/*  =============================================================================
    Function: displayMessage
    
    @param    none
    @return   none
    ========================================================================== */
function displayMessage() {
  // If User Name does not exist, prompts a not logged in message
  if (!ifUsernameExists()) {
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
}

/*  =============================================================================
    Function: submitUsername
    
    @param    none
    @return   none
    ========================================================================== */
function submitUsername() {
  if (connected) {
    console.log("Already have username");
    return;
  }

  connected = true;
  inputSubmitted = $('#u').val()
  $('#user-submit-form').val('');
  setUsername(inputSubmitted);

  // TODO Do username input string checks
  // No empty string, no white spaces, Valid characters a-z, A-Z, 0-9
  // Client emits to server with Add user
  socket.emit('From Client: Add user', $('#u').val());
  $('#u').val('');
  $('.logged-out-message').remove()
}

/*  =============================================================================
    Website Event Handlers
    ========================================================================== */

// TODO Switch to using straight DOM/HTML or stay with jquery 
$('#chat-form').submit(function(e){
  e.preventDefault();
  $.ajax({
      success: displayMessage()
  });
});

$('#username-form').submit(function(e){
  e.preventDefault();
  $.ajax({
      success: submitUsername()
  });
});

/*  =============================================================================
    Server emits to Client Socket Event Handlers
    ========================================================================== */

// TODO Switch to using straight DOM/HTML or stay with jquery 

// Server emits that user is logged in
socket.on('From Server: Logged in', function(data){
  connected = true;
});

// When user has joined, sends the username and outputs it on the box
socket.on("From Server: User joined", function(user) {
  $('#chat-box-messages').append($('<div>').text(user.username + " has joined the chat."));
})

// When an actual user exits the page/chat
socket.on('From Server: User disconnected', function(user){
  $('#chat-box-messages').append($('<div>').text(user.username + " has left the chat."));
});

// Server emits Chat message 
socket.on('From Server: Chat message', function(msg){
  $('#chat-box-messages').append($('<ul>').text(msg.username));  
  $('#chat-box-messages').append($('<li>').text(msg.message));
});

