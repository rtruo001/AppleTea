var React = require('react');

var Signup = React.createClass({
  render: function() {
    return(
      <div id="signup">
        <form action="/signup" method="post">
          <div>
            <label>Username:</label>
            <input type="text" name="username"/>
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password"/>
          </div>
          <div>
            <input type="submit" value="Sign up"/>
          </div>
        </form>
        {this.props.message}
      </div>
    );
  }
});

module.exports = Signup;