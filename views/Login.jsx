var React = require('react');

var Login = React.createClass({
  render: function() {
    return(
      <div id="login">
        <form action="/login" method="post">
          <div>
            <label>Username:</label>
            <input type="text" name="username"/>
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password"/>
          </div>
          <div>
            <input type="submit" value="Log In"/>
          </div>
        </form>
        {this.props.message}
      </div>
    );
  }
});

module.exports = Login;