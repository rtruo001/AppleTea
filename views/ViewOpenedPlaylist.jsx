var React = require('react');

var ViewOpenedPlaylist = React.createClass({
  render: function() {
    return(
      <div id="open-playlist" className="tab-pane fade">

        <div className="open-playlist-container">

          <div className="tab-page-header">
            <div className="tab-page-text-container">
              <a className="icon-btn" href="javascript:void(0)"><div className="tab-page-back-btn"><i className="fa fa-lg fa-chevron-circle-left"></i></div></a>
              <div className="tab-page-title">{this.props.name}</div>
              <div className="tab-page-curator">
                <a className="curator-link" href="javascript:void(0)">{this.props.owner}</a>
              </div>
            </div>
            <div className="tab-page-right-container">
              <div className="tab-page-icon-container">
                <div className="pill">{this.props.size} Items</div>
              </div>
            </div>
          </div>

          <div className="search-container">
            <form className="search-input">
              <input type="text" name="" placeholder="Search in Playlist..."/>
            </form>
          </div>
        </div>

      </div>
    );
  }
});

module.exports = ViewOpenedPlaylist;