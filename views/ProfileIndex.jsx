/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    Profile.jsx

    Profile page displayed when you access your account settings in your profile.
    Divided into tabs: Account, My Rooms, My Playlist.
    ========================================================================== */

/*  =============================================================================
    Components

    Profile - Entire html for the Profile component.
    ========================================================================== */
var React = require('react');

// Components
var HtmlHead = require('./HtmlHead.jsx');
var Profile = require('./Profile.jsx');

// A utility function to safely escape JSON for embedding in a <script> tag
function safeStringify(obj) {
  if (obj === undefined) {
    return;
  }
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
}

// MAIN COMPONENT: Home
var ProfileIndex = React.createClass({
  render: function() {
    var json = safeStringify(this.props.profileData);
    var profileProps = <script id="profile-props" type="application/json" dangerouslySetInnerHTML={{__html: json}}></script>;

    return(
      <html lang="en">
        <HtmlHead />

        <body>
          <div id="profile">
            <Profile user={this.props.profileData.user} rooms={this.props.profileData.rooms} myPlaylists={this.props.profileData.myPlaylists} />
          </div>

          {/* Injected script data from MongoDB sent from the server */}
          {profileProps}

          <script src="/js/constantVariables.js"></script>
          <script src="/js/jquery.min.js"></script>
          <script src="/js/bootstrap.min.js"></script>
          <script src="/bundles/profileBundle.js"></script>

          <script src="/js/drag-arrange.js"></script>
          <script src="/js/jquery.mCustomScrollbar.concat.min.js"></script>
          <script src="/js/script.js"></script>

        </body>
      </html>
    );
  }
});

module.exports = ProfileIndex;