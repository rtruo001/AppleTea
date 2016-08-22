/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    Home.jsx

    Home page displayed when logging in.
    Instant option to select room to join, or browse playlists.
    ========================================================================== */

/*  =============================================================================
    Components

    Home - Entire html for the Home component.
    ========================================================================== */
var React = require('react');

// Sub-components in Room
var Header = require('./Header');
var Explore = require('./Explore');
var MyPlaylists = require('./MyPlaylists');
var Footer = require('./Footer');

// MAIN COMPONENT: Home
var Home = React.createClass({
  render: function() {
    return(
      <div>
        <div className="content-container">

          {/* Page Overlay // to freeze screen when modal/popup is active */}
          <div id="page-overlay"></div>

          {/* Header */}
          <Header />


          {/* Footer Push */}
          <div className="push"></div>
        </div>

        {/* Footer */}
        <Footer />
        
      </div>
    );
  }
});

module.exports = Home;