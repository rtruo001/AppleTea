var React = require('react');

var Error = React.createClass({
  render: function() {
    return(
      <div>
        {this.props.message}
      </div>
    );
  }
});

module.exports = Error;