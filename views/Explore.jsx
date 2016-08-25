/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    VIEW: Explore.jsx

    Showcases different public playlists that are currently trending
    ========================================================================== */

/*  =============================================================================
    Components

    Explore - The Explore tab
    ========================================================================== */
var React = require('react');

var Explore = React.createClass({
  render: function() {
    return (
      <div>
        <div className="col-padding">
          <div className="placeholder">
            <div className="placeholder-content">
              <i className="fa fa-rocket placeholder-icon"></i><br/>
              <span>This page is still being made</span>
            </div>
          </div>
        </div>

        {/*
        <div className="search-container">
          <form className="search-input">
            <input type="text" className="chat-textbox" name="" placeholder="Search Public Playlists..."/>
          </form>
        </div>
        */}

        {/* TODO: Explore */}
        <div className="explore-container"></div>
      </div>
    );
  }
});

module.exports = Explore;