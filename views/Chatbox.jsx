var React = require('react');

/* Chatbox */
var Chatbox = React.createClass({
  render: function() {
    return (
      <div>
        <div className="room-header">
          <div className="room-name onclick-edit">
            Vent Room
            <a className="icon-btn-dark" href="javascript:void(0)"><i className="fa fa-edit" aria-hidden="true"></i></a>
          </div>
          <div className="users-btn">
            4
            <i className="fa fa-users users-btn-icon"></i>
            <i className="fa fa-circle status status-online"></i>
          </div>

          <div id="users-list-container">
            <div className="users-list-container">
              <div className="users-list-header users-online-section">
                Members
                <button type="button" className="btn btn-sm btn-secondary users-list-edit-btn"><i className="fa fa-gear" id="users-list-gear-icon"></i></button>
              </div>
              <div className="users-list-scroll-container">
                <ul className="users-list">
                  <li>
                    <i className="fa fa-circle status status-online"></i><a className="user-name" href="javascript:void(0)">Gerard Liu</a>
                    <div className="users-list-edit"><a className="icon-btn" href="javascript:void(0)"><i className="fa fa-star fa-fw mod-toggle"></i></a><a className="icon-btn" data-toggle="modal" data-target="#kick-confirm" href="javascript:void(0)"><i className="fa fa-remove fa-fw"></i></a></div>
                    <div className="users-list-icons"><i className="fa fa-refresh fa-spin fa-fw" data-toggle="tooltip" title="Syncing"></i><i className="fa fa-star fa-fw" data-toggle="tooltip" title="Moderator"></i></div>
                  </li>
                  <li>
                    <i className="fa fa-circle status status-online"></i><a className="user-name" href="javascript:void(0)">Randy Truong</a>
                    <div className="users-list-edit"><a className="icon-btn" href="javascript:void(0)"><i className="fa fa-star fa-fw mod-toggle"></i></a><a className="icon-btn" data-toggle="modal" data-target="#kick-confirm" href="javascript:void(0)"><i className="fa fa-remove fa-fw"></i></a></div>
                    <div className="users-list-icons"><i className="fa fa-star fa-fw" data-toggle="tooltip" title="Moderator"></i></div>
                  </li>
                  <li>
                    <i className="fa fa-circle status status-online"></i><a className="user-name" href="javascript:void(0)">Kevin Chiao</a>
                    <div className="users-list-edit"><a className="icon-btn" href="javascript:void(0)"><i className="fa fa-star-o fa-fw mod-toggle"></i></a><a className="icon-btn" data-toggle="modal" data-target="#kick-confirm" href="javascript:void(0)"><i className="fa fa-remove fa-fw"></i></a></div>
                    <div className="users-list-icons"><i className="fa fa-refresh fa-spin fa-fw" data-toggle="tooltip" title="Syncing"></i></div>
                  </li>
                  <li>
                    <i className="fa fa-circle status status-online"></i><a className="user-name" href="javascript:void(0)">Harrison Ford</a>
                    <div className="users-list-edit"><a className="icon-btn" href="javascript:void(0)"><i className="fa fa-star-o fa-fw mod-toggle"></i></a><a className="icon-btn" data-toggle="modal" data-target="#kick-confirm" href="javascript:void(0)"><i className="fa fa-remove fa-fw"></i></a></div>
                    <div className="users-list-icons"></div>
                  </li>
                </ul>
                <ul className="users-list users-list-section users-offline-section">
                  <li>
                    <i className="fa fa-circle status status-offline"></i><a className="user-name offline" href="javascript:void(0)">Minnal Kunnan</a>
                    <div className="users-list-edit"><a className="icon-btn" href="javascript:void(0)"><i className="fa fa-star fa-fw mod-toggle"></i></a><a className="icon-btn" data-toggle="modal" data-target="#kick-confirm" href="javascript:void(0)"><i className="fa fa-remove fa-fw"></i></a></div>
                    <div className="users-list-icons"></div>
                  </li>
                  <li>
                    <i className="fa fa-circle status status-online"></i><a className="user-name offline" href="javascript:void(0)">Jason Maryne</a>
                    <div className="users-list-edit"><a className="icon-btn" href="javascript:void(0)"><i className="fa fa-star-o fa-fw mod-toggle"></i></a><a className="icon-btn" data-toggle="modal" data-target="#kick-confirm" href="javascript:void(0)"><i className="fa fa-remove fa-fw"></i></a></div>
                    <div className="users-list-icons"></div>
                  </li>
                  <li>
                    <i className="fa fa-circle status status-online"></i><a className="user-name offline" href="javascript:void(0)">Eric Dieu</a>
                    <div className="users-list-edit"><a className="icon-btn" href="javascript:void(0)"><i className="fa fa-star-o fa-fw mod-toggle"></i></a><a className="icon-btn" data-toggle="modal" data-target="#kick-confirm" href="javascript:void(0)"><i className="fa fa-remove fa-fw"></i></a></div>
                    <div className="users-list-icons"></div>
                  </li>
                  <li>
                    <i className="fa fa-circle status status-offline"></i><a className="user-name offline" href="javascript:void(0)">Kevin Ton</a>
                    <div className="users-list-edit"><a className="icon-btn" href="javascript:void(0)"><i className="fa fa-star-o fa-fw mod-toggle"></i></a><a className="icon-btn" data-toggle="modal" data-target="#kick-confirm" href="javascript:void(0)"><i className="fa fa-remove fa-fw"></i></a></div>
                    <div className="users-list-icons"></div>
                  </li>
                  <li>
                    <i className="fa fa-circle status status-offline"></i><a className="user-name offline" href="javascript:void(0)">Kris Luong</a>
                    <div className="users-list-edit"><a className="icon-btn" href="javascript:void(0)"><i className="fa fa-star-o fa-fw mod-toggle"></i></a><a className="icon-btn" data-toggle="modal" data-target="#kick-confirm" href="javascript:void(0)"><i className="fa fa-remove fa-fw"></i></a></div>
                    <div className="users-list-icons"></div>
                  </li>
                  <li>
                    <i className="fa fa-circle status status-offline"></i><a className="user-name offline" href="javascript:void(0)">Franky Nguyen</a>
                    <div className="users-list-edit"><a className="icon-btn" href="javascript:void(0)"><i className="fa fa-star-o fa-fw mod-toggle"></i></a><a className="icon-btn" data-toggle="modal" data-target="#kick-confirm" href="javascript:void(0)"><i className="fa fa-remove fa-fw"></i></a></div>
                    <div className="users-list-icons"></div>
                  </li>
                  <li>
                    <i className="fa fa-circle status status-online"></i><a className="user-name offline" href="javascript:void(0)">Adrian Mandee</a>
                    <div className="users-list-edit"><a className="icon-btn" href="javascript:void(0)"><i className="fa fa-star-o fa-fw mod-toggle"></i></a><a className="icon-btn" data-toggle="modal" data-target="#kick-confirm" href="javascript:void(0)"><i className="fa fa-remove fa-fw"></i></a></div>
                    <div className="users-list-icons"></div>
                  </li>
                  <li>
                    <i className="fa fa-circle status status-offline"></i><a className="user-name offline" href="javascript:void(0)">Jay Yee</a>
                    <div className="users-list-edit"><a className="icon-btn" href="javascript:void(0)"><i className="fa fa-star-o fa-fw mod-toggle"></i></a><a className="icon-btn" data-toggle="modal" data-target="#kick-confirm" href="javascript:void(0)"><i className="fa fa-remove fa-fw"></i></a></div>
                    <div className="users-list-icons"></div>
                  </li>
                  <li>
                    <i className="fa fa-circle status status-offline"></i><a className="user-name offline" href="javascript:void(0)">George Huang</a>
                    <div className="users-list-edit"><a className="icon-btn" href="javascript:void(0)"><i className="fa fa-star-o fa-fw mod-toggle"></i></a><a className="icon-btn" data-toggle="modal" data-target="#kick-confirm" href="javascript:void(0)"><i className="fa fa-remove fa-fw"></i></a></div>
                    <div className="users-list-icons"></div>
                  </li>
                  <li>
                    <i className="fa fa-circle status status-offline"></i><a className="user-name offline" href="javascript:void(0)">Jelly Kid</a>
                    <div className="users-list-edit"><a className="icon-btn" href="javascript:void(0)"><i className="fa fa-star-o fa-fw mod-toggle"></i></a><a className="icon-btn" data-toggle="modal" data-target="#kick-confirm" href="javascript:void(0)"><i className="fa fa-remove fa-fw"></i></a></div>
                    <div className="users-list-icons"></div>
                  </li>
                  <li>
                    <i className="fa fa-circle status status-offline"></i><a className="user-name offline" href="javascript:void(0)">Finn Human</a>
                    <div className="users-list-edit"><a className="icon-btn" href="javascript:void(0)"><i className="fa fa-star-o fa-fw mod-toggle"></i></a><a className="icon-btn" data-toggle="modal" data-target="#kick-confirm" href="javascript:void(0)"><i className="fa fa-remove fa-fw"></i></a></div>
                    <div className="users-list-icons"></div>
                  </li>
                </ul>
              </div>
              <div className="users-list users-list-section users-list-add"><button type="button" className="btn btn-sm btn-secondary" data-toggle="modal" data-target="#add-user"><i className="fa fa-plus fa-fw"></i>Add People</button></div>
            </div>
          </div>
          
        </div>

        <div className="chat">
        </div>

        <div className="chat-input-container">
          <form className="chat-input" id='chat-form' action="">
            <input id="m" autoComplete="off" type="text" className="chat-textbox" name="" placeholder="Type a message..." />
          </form>
        </div>

        <div className="modal fade" id="enter-name" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog modal-sm" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <form className="search-input" id='username-form' action="">
                  <input id="u" autoComplete="off" type="text" className="chat-textbox" name="" placeholder="Enter Your Name" />
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
});

module.exports = Chatbox;