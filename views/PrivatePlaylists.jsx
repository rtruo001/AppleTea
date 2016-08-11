var React = require('react');

var PrivatePlaylists = React.createClass({
  render: function() {
    return (
      <div>
        <div className="col-padding">
          <div className="placeholder">
            <div className="placeholder-content">
              <i className="fa fa-book placeholder-icon"></i><br/>
              <span>You have no saved playlists</span>
            </div>
          </div>
        </div>

        {/*
        <div className="search-container">
          <form className="search-input">
            <input type="text" className="chat-textbox" name="" placeholder="Search Private Playlists..."/>
          </form>
        </div>
        */}

        {/* TODO: Private playlists */}
        <div className="private-container"></div>
      </div>
    );
  }
});

module.exports = PrivatePlaylists;