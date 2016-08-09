var React = require('react');

var Header = React.createClass({
  render: function() {
    return (
      <div className="header">
        <div className="header-content-container row">
          <div className="col-md-6">
            <img className="header-logo" src="images/logo.png" />
          </div>
          <div className="col-md-6 header-profile-btn">
            <a href="javascript:void(0)"><img className="profile-pic" src="images/profile-pic.png" /></a>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Header;