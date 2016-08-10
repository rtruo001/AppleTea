/*  =============================================================================
    Copyright © 
    ========================================================================== */
    
/*  =============================================================================
    Main-Component Search

    The entire Search component. Contains an Input bar for Search, as well as the
    entire list of media entries. Each media entry contains the thumbnail,
    title, and duration components

    @Components:  Search

    @Exports:     Search
    ========================================================================== */
var React = require('react');
// Media Entry component
var MediaEntry = require('./MediaEntry');

// Search Component
var Search = React.createClass({
  getInitialState: function() {
    return {
      searchQuery: "",
      jsonResponse: undefined
    };
  },

  searchMedia: function(e) {
    // Clears the timer to prevent another unnecessary searchMedia from geting called
    clearInterval(this.interval);
    var query = this.state.searchQuery;
    
    // Calls the Youtube API for Searching a list with a given query
    // TODO: Make APIKey secret
    var apiKey = 'AIzaSyDY8WeYCRWqHEdkSLaPfn2hrXplppIt0aU';
    gapi.client.setApiKey(apiKey);
    gapi.client.load('youtube', 'v3', function() {
      var request = gapi.client.youtube.search.list({
        q: query,
        part: 'id, snippet',
        type: 'video',
        maxResults: MAX_SEARCH_RESULTS
      });

      // The binds are needed (Still need more of an explanation on this)
      request.execute(function(response) {
        // This callback returns the response from the API, giving a list of all the videos from the searchQuery
        // Sets the state jsonResponse to the returned response from the API
        if (response.items.length > 0) {
          this.setState({jsonResponse: response});
        }
      }.bind(this))
    }.bind(this));
  },

  handleSubmit: function(e) {
    // Removes the form's default's property of url redirection
    e.preventDefault();
    clearInterval(this.interval);
    this.interval = setInterval(this.searchMedia, 0);
  },

  handleChange: function(e) {
    // Sets the state of the Search Query
    this.setState({searchQuery: e.target.value});

    // Reclears the timer to restart at 0 again until 200 milliseconds, then searchMedia gets called
    clearInterval(this.interval);
    this.interval = setInterval(this.searchMedia, 200);
  },

  render: function() {
    // Prepares each media entry. Whenever a State changes, populates the values in each Media Entry from the jsonResponse given from the YoutubeAPI
    var searchEntries = [];
    var json = this.state.jsonResponse;

    // pushes placeholder div into searchEntries if list is empty
    if (json == "" || json == undefined) {
      searchEntries.push(
        <div className="col-padding">
          <div className="placeholder placeholder-search">
            <div className="placeholder-content">
              <i className="fa fa-search placeholder-icon"></i><br/>
              <span>No matching search results</span>
            </div>
          </div>
        </div>
      )
    }

    // if generated list has elements, display them
    else if (json !== "" && json !== undefined) {
      var jsonItem;
      for (var i = 0; i < json.items.length; ++i) {
        jsonItem = json.items[i];
        searchEntries.push(
          <MediaEntry 
            key={jsonItem.id.videoId} 
            pos={i} 
            videoId={jsonItem.id.videoId} 
            categoryType={'SEARCH'}
            mediaType={'YOUTUBE'}
            thumbnail={jsonItem.snippet.thumbnails.default.url} 
            title={jsonItem.snippet.title}
            artist={jsonItem.snippet.channelTitle} 
            ifMediaCardAdded={false} /> 
        );
      }
    }

    return (
      <div>
        <div className="search-container">
          <form id='search-form' className="search-input search-input-dropdown" onSubmit={this.handleSubmit}>
            <div className="input-group">
              <input className="chat-textbox" name="" placeholder="Search Youtube..." type="text" onChange={this.handleChange} />
              <div className="input-group-btn">
                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="fa fa-youtube-play dropdown-icon"></i>
                  Youtube
                  <i className="fa fa-angle-down dropdown-arrow"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-right">
                  <li><a href="javascript:void(0)"><i className="fa fa-youtube-play"></i>Youtube</a></li>
                  <li><a href="javascript:void(0)"><i className="fa fa-vimeo"></i>Vimeo</a></li>
                  <li><a href="javascript:void(0)"><i className="fa fa-soundcloud"></i>SoundCloud</a></li>
                  <li><a href="javascript:void(0)"><i className="fa fa-spotify"></i>Spotify</a></li>
                </ul>
              </div>
            </div>
          </form>
        </div>

        <div className='search-media-container'>
          {searchEntries}
        </div>

        <nav aria-label="page navigation">
          <ul className="pagination">
            <li className="disabled"><a href="javascript:void(0)" aria-label="Previous"><i className="fa fa-angle-left"></i></a></li>
            <li className="active"><a href="javascript:void(0)">1</a></li>
            <li><a href="javascript:void(0)">2</a></li>
            <li><a href="javascript:void(0)">3</a></li>
            <li><a href="javascript:void(0)" aria-label="Next"><i className="fa fa-angle-right"></i></a></li>
          </ul>
        </nav>

      </div>
    );
  }
});

module.exports = Search;