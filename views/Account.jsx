var React = require('react');

// MAIN COMPONENT: Account Tab
var Account = React.createClass({
  render: function() {
    return (
      <div>
        <div className="account-container">
          <div className="row">
            <div className="col-sm-4 account-profile-pic">
              <a href="javascript:void(0)"><img className="profile-pic" src="images/profile-pic.png"/></a>
            </div>
            <div className="account-info-content">                  
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
              <div className="col-xs-9 col-sm-6">
                <div className="row row-sm">
                  <form className="search-input" id="account-input">
                    <div className="col-xs-6 col-padding-sm">
                      <input type="text" value={this.props.user.local.firstName} />
                    </div>
                    <div className="col-xs-6 col-padding-sm">
                      <input type="text" value={this.props.user.local.lastName} />
                    </div>
                    <div className="col-xs-12 col-padding-sm">
                      <input type="text" value={this.props.user.nickname} />
                    </div>
                    <div className="col-xs-12 col-padding-sm">
                      <input type="text" value={this.props.user.local.email} />
                    </div>
                    <div className="col-xs-12 col-padding-sm btn-align-right">
                      <button type="button" className="btn btn-form btn-primary disabled" data-dismiss="modal">Save Changes</button>
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
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Account;