var React = require('react');

var Error = React.createClass({
  render: function() {
    return(
      <div>
        Error
        {this.props.message}
      </div>
    );
  }
});

module.exports = Error;