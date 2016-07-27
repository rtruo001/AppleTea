var React = require('react');

var Explore = React.createClass({
  render: function() {
    return (
      <div>
        <div className="search-container">
          <form className="search-input">
            <input type="text" className="chat-textbox" name="" placeholder="Search Public Playlists..."/>
          </form>
        </div>

        {/* TODO: Explore */}
        <div className="explore-container"></div>
      </div>
    );
  }
});

module.exports = Explore;