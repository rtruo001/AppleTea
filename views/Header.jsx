var React = require('react');

/* User Profile Picture Icon */
var HeaderProfileIcon = React.createClass({
  render: function() {
    return (
      <div>
        <a href="javascript:void(0)">
          <img className="profile-pic" src="images/profile-pic.png" />
        </a>
      </div>
    );
  }
});

/* Sign Up and Sign In Buttons */
var SignUpSignInButtons = React.createClass({
  render: function() {
    return (
        <div className="header-btn-group">
          <button className="btn btn-primary btn-margin" data-toggle="modal" data-target="#signup">
            Sign Up
          </button>
          <SignUpModal />
          <button className="btn btn-secondary btn-margin dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Sign In
          </button>
          <SignInDropdown />
        </div>
    );
  }
});

/* Sign Up Modal Popup */
var SignUpModal = React.createClass({
  // TODO: Implement onSubmit (Check if valid inputs if valid email)
  onSubmit: function(e) {
    console.log("Submitting sign up");
  },

  render: function() {
    return (
      <div className="modal fade" id="signup" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog modal-sm" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="row row-sm">
                <div className="col-xs-12 col-padding-sm">
                  <button className="btn btn-facebook btn-full-width" data-dismiss="modal">
                    <i className="fa fa-facebook icon-padding icon-position-left"></i>Sign In with Facebook
                  </button>
                </div>
                <div className="col-xs-12 col-padding-sm">
                  <button className="btn btn-twitter btn-full-width" data-dismiss="modal">
                    <i className="fa fa-twitter icon-padding icon-position-left"></i>Sign In with Twitter
                  </button>
                </div>
                <div className="col-xs-12 col-padding-sm">
                  <button className="btn btn-google btn-full-width" data-dismiss="modal">
                    <i className="fa fa-google-plus icon-padding icon-position-left"></i>Sign in with Google
                  </button>
                </div>
              </div>
            </div>
            <div className="modal-body section-border signup-form-container">
              <div className="or-divider"><span>OR SIGN UP</span></div>
              <div className="search-container">
              {
                // <form className="search-input" action="/signup" method="post">
                //   <div className="row row-sm">
                //     <div className="col-sm-6 col-padding-sm">
                //       <input type="text" placeholder="First Name" name="firstName"/>
                //     </div>
                //     <div className="col-sm-6 col-padding-sm">
                //       <input type="text" placeholder="Last Name" name="lastName"/>
                //     </div>
                //     <div className="col-sm-12 col-padding-sm">
                //       <input type="text" placeholder="Email" name="email"/>
                //     </div>
                //     <div className="col-sm-12 col-padding-sm">
                //       <input type="password" placeholder="Password" name="password"/>
                //     </div>
                //     <div className="col-sm-12 col-padding-sm">
                //       <button className="btn btn-primary btn-full-width" data-dismiss="modal" type="submit">Sign Up</button>
                //     </div>
                //   </div>
                // </form>
              }
        
              <form className="search-input search-input-sm" action="/signup" method="post" onSubmit={this.onSubmit}> 
                <input type="text" id="sign-up-first-name" className="input-padding-sm" placeholder="First Name" name="firstName"/>
                <input type="text" id="sign-up-last-name" className="input-padding-sm" placeholder="Last Name" name="lastName"/>
                <input type="text" className="input-padding-sm" placeholder="Email" name="email"/>
                <input type="password" className="input-padding-sm" placeholder="Password" name="password"/>
                <button className="btn btn-primary btn-full-width" type="submit">Sign Up</button>
              </form>
        
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

/* Sign In Dropdown */
var SignInDropdown = React.createClass({
  // TODO: Implement onSubmit (Check if valid inputs if valid email)
  onSubmit: function() {
    console.log("Submitting sign up");
  },

  render: function() {
    return (
      <ul className="dropdown-menu dropdown-menu-right signin-container" id="signin-form">
        <div className="signin-content">
          <form className="search-input search-input-sm" action="/signin" method="post" onSubmit={this.onSubmit}>
            <input type="text" className="input-padding-sm" placeholder="Email" name="email"/>
            <input type="password" className="input-padding-sm" placeholder="Password" name="password"/>
            <button className="btn btn-primary btn-full-width" type="submit">Sign In</button>
          </form>
          <a className="forgot-pw link-grey-lite" href="javascript:void(0)">Forgot password?</a>
        </div>
        <div className="signin-content section-border signin-icons-container">
          <div className="or-divider"><span>OR SIGN IN WITH</span></div>
          <div className="row row-xs">
            <div className="col-xs-4 col-padding-xs"><button className="btn btn-facebook btn-full-width"><i className="fa fa-facebook"></i></button></div>
            <div className="col-xs-4 col-padding-xs"><button className="btn btn-twitter btn-full-width"><i className="fa fa-twitter"></i></button></div>
            <div className="col-xs-4 col-padding-xs"><button className="btn btn-google btn-full-width"><i className="fa fa-google-plus"></i></button></div>
          </div>
        </div>
      </ul>
    );
  }
});

var Header = React.createClass({
  render: function() {
    var headerIcons = [];

    // TODO: If users are logged in, switch icons
    // if (this.props.user === undefined || this.props.user === null) {
    if (this.props.user !== undefined && this.props.user !== null) {
      headerIcons.push(
        <HeaderProfileIcon key={'HeaderProfileIcon'} />
      );
    }
    else {
      headerIcons.push(
        <SignUpSignInButtons key={'SignUpSignInButtons'} />
      );
    };

    return (
      <div className="header">
        <div className="header-content-container row">
          <div className="col-sm-6">
            <img className="header-logo" src="images/logo.png" />
          </div>
          <div className="col-sm-6 header-section">
            <div className="header-icon-container">
              {headerIcons}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Header;