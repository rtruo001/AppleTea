/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    VIEW: Account.jsx

    View and sub components of the account information
    ========================================================================== */

/*  =============================================================================
    @Components     AccountProfilePicture
                    AccountDisplays
                    AccountInputChanges
                    
    @Exports        Account
    ========================================================================== */
var React = require('react');

var AccountProfilePicture = React.createClass({
  render: function() {
    return (
      <div className="col-sm-4 account-profile-pic">
        <a href="javascript:void(0)"><img className="profile-pic" src="images/profile-pic.png"/></a>
      </div>
    );
  }
});

var AccountDisplays = React.createClass({
  render: function() {
    return (
      <div className="col-xs-3 col-sm-2">
        <div className="col-xs-12 col-padding-sm">
          <div className="account-info-text">Name</div>
        </div>
        <div className="col-xs-12 col-padding-sm">
          <div className="account-info-text">Nickname</div>
        </div>
        <div className="col-xs-12 col-padding-sm">
          <div className="account-info-text">Email</div>
        </div>
        <div className="col-xs-12 col-padding-sm">
          <div className="account-info-text"></div>
        </div>
        <div className="col-xs-12 col-padding-sm">
          <div className="account-info-text">Password</div>
        </div>
        <div className="col-xs-12 col-padding-sm">
          <div className="account-info-text">Connect</div>
        </div>
      </div>
    );
  }
});

var AccountInputChanges = React.createClass({
  getInitialState: function() {
    return {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      nickname: this.props.nickname,
      email: this.props.email,
      ifDisabled: true
    };
  },

  // Event Input on changes
  handleChangeFirstName: function(e) {
    this.setState({ firstName: e.target.value }, function() {
      if (this.state.firstName === this.props.firstName && this.state.lastName === this.props.lastName && this.state.nickname === this.props.nickname && this.state.email === this.props.email) {
        this.setState({ ifDisabled: true });
      }
      else {
        this.setState({ ifDisabled: false });
      }
    });
  },

  handleChangeLastName: function(e) {
    this.setState({ lastName: e.target.value }, function() {
      if (this.state.firstName === this.props.firstName && this.state.lastName === this.props.lastName && this.state.nickname === this.props.nickname && this.state.email === this.props.email) {
        this.setState({ ifDisabled: true });
      }
      else {
        this.setState({ ifDisabled: false });
      }
    });
  },

  handleChangeNickname: function(e) {
    this.setState({ nickname: e.target.value }, function() {
      if (this.state.firstName === this.props.firstName && this.state.lastName === this.props.lastName && this.state.nickname === this.props.nickname && this.state.email === this.props.email) {
        this.setState({ ifDisabled: true });
      }
      else {
        this.setState({ ifDisabled: false });
      }
    });
  },

  handleChangeEmail: function(e) {
    this.setState({ email: e.target.value }, function() {
      if (this.state.firstName === this.props.firstName && this.state.lastName === this.props.lastName && this.state.nickname === this.props.nickname && this.state.email === this.props.email) {
        this.setState({ ifDisabled: true });
      }
      else {
        this.setState({ ifDisabled: false });
      }
    });
  },

  // Event Handler for when the form is submitted
  onSaveChanges: function(e) {
    // TODO: This
    return;
    if (this.state.ifDisabled === true) {
      return;
    }
    $.ajax({
      type: "POST",
      url: "/user/update",
      dataType: 'json',
      cache: false,
      data: {
        user: this.props.user.key,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        nickname: this.state.nickname,
        email: this.state.email
      },
      success: function(data) {
        console.log(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("ERROR: Update User errored out", status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    // Disables the button if there are no changes to the edit user inputs
    var disabledClass = "";
    if (this.state.ifDisabled) {
      disabledClass = " disabled";
    }

    return (
      <div className="col-xs-9 col-sm-6">
        <div className="row row-sm">
          <form className="search-input" id="account-input">
            <div className="col-xs-6 col-padding-sm">
              <input type="text" value={this.state.firstName} onChange={this.handleChangeFirstName} />
            </div>
            <div className="col-xs-6 col-padding-sm">
              <input type="text" value={this.state.lastName} onChange={this.handleChangeLastName} />
            </div>
            <div className="col-xs-12 col-padding-sm">
              <input type="text" value={this.state.nickname} onChange={this.handleChangeNickname} />
            </div>
            <div className="col-xs-12 col-padding-sm">
              <input type="text" value={this.state.email} onChange={this.handleChangeEmail} />
            </div>
            <div className="col-xs-12 col-padding-sm btn-align-right">
              <button type="button" className={"btn btn-form btn-primary" + disabledClass} data-dismiss="modal" onClick={this.onSaveChanges}>Save Changes</button>
            </div>
          </form>

          <div className="col-xs-12 col-padding-sm">
            <button type="button" className="btn btn-full-width btn-form btn-secondary" data-dismiss="modal">Change Password</button>
          </div>

          <div className="col-xs-12 col-padding-none">
            <div className="col-xs-4 col-padding-sm"><button className="btn btn-form btn-facebook btn-full-width btn-connected" data-dismiss="modal"><i className="fa fa-facebook icon-padding icon-position-left"></i>Connected</button></div>
            <div className="col-xs-4 col-padding-sm"><button className="btn btn-form btn-twitter btn-full-width" data-dismiss="modal"><i className="fa fa-twitter icon-padding icon-position-left"></i>Twitter</button></div>
            <div className="col-xs-4 col-padding-sm"><button className="btn btn-form btn-google btn-full-width" data-dismiss="modal"><i className="fa fa-google-plus icon-padding icon-position-left"></i>Google</button></div>
          </div>
        </div>
      </div>
    );
  }
});

// MAIN COMPONENT: Account Tab
var Account = React.createClass({
  render: function() {
    return (
      <div>
        <div className="account-container">
          <div className="row">
            <AccountProfilePicture />
            <div className="account-info-content">                  
              <AccountDisplays />
              <AccountInputChanges 
                firstName={this.props.user.local.firstName}
                lastName={this.props.user.local.lastName}
                nickname={this.props.user.nickname}
                email={this.props.user.local.email} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Account;