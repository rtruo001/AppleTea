var React = require('react');

var PublicRooms = React.createClass({
  render: function() {
    return (
      <div>
        <div className="search-container">
          <form className="search-input search-input-dark">
            <input type="text" placeholder="Search Public Rooms..."/>
          </form>
        </div>

      {/* Temp Placeholder */}
      <div className="row">
        <div className="col-padding">
          <div className="placeholder placeholder-rooms">
            <div className="placeholder-content">
              <i className="fa fa-globe placeholder-icon"></i><br/>
              <span>This page is still being created</span>
            </div>
          </div>
        </div>
      </div>

      {/* TODO: Public Rooms */}
        <div className="publicrooms-container">
          <div className="row">
          </div>
        </div>

      </div>
    );
  }
});

module.exports = PublicRooms;