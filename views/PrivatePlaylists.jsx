var React = require('react');

var PrivatePlaylists = React.createClass({
  render: function() {
    return (
      <div>
        <div className="search-container">
          <form className="search-input">
            <input type="text" className="chat-textbox" name="" placeholder="Search Private Playlists..."/>
          </form>
        </div>

        {/* TODO: Private playlists */}
        <div className="private-container"></div>
      </div>
    );
  }
});

module.exports = PrivatePlaylists;