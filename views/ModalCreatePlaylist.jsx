var React = require('react');

// Create New Playlist Modal Popup
var ModalCreatePlaylist = React.createClass({
  render: function() {
    return (
      <div className="modal fade" id="create-playlist" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog modal-sm" role="document">
          <div className="modal-content">
            <div className="modal-header">
            
              {this.props.title}
          
              Create a New Playlist
            </div>
            <div className="modal-body">
              <div className="search-container">
                <form className="search-input" id="create-playlist-input">
                  <input className="input-padding" type="text" placeholder="Playlist Name"/>
                  <div className="modal-label">Is this a private playlist?</div>
                  <div className="toggle-slider-section">
                    <label className="switch">
                      <input type="checkbox" id="create-playlist-toggle" />
                      <div className="slider"></div>
                    </label>
                    <i className="fa fa-globe" id="create-playlist-toggle-icon"></i>
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal">Create Playlist</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
// Required to call modal from other components
module.exports = ModalCreatePlaylist;