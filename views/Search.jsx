/*  =============================================================================
    Main-Component Search

    The entire Search component. Contains an Input bar for Search, as well as the
    entire list of media entries. Each media entry contains the thumbnail,
    title, and duration components

    @Components:  Thumbnail
                  Title
                  Duration
                  MediaEntry
                  Search

    @Exports:     Search
    ========================================================================== */
var React = require('react');

// Thumbnail of the media
var Thumbnail = React.createClass({
  render: function() {
    return (
      <div clasName='media-thumbnail'>
        <img src={this.props.thumbnail}/>
      </div>
    );
  }
});

// Media's title component
var Title = React.createClass({
  render: function() {
    return (
      <div clasName='media-title'>
        {this.props.title}
      </div>
    );
  }
});

// Media's Duration component
var Duration = React.createClass({
  render: function() {
    return (
      <div clasName='media-duration'>
        {this.props.duration}
      </div>
    );
  }
});

// Each individual media entry in the list
var MediaEntry = React.createClass({
  handleClick: function() {
    // TODO: Think of other ways to do this.

    global.mediaClickedAddToQueue({
      videoId: this.props.videoId,
      thumbnail: this.props.thumbnail,
      title: this.props.title
    });
  },

  render: function() {
    return (
      <div id={'media-list-entry-' + this.props.pos} className='media-list-entry'>
        <Thumbnail thumbnail={this.props.thumbnail} />
        <Title title={this.props.title} />
        <button id={'media-entry-button-' + this.props.pos} className='media-entry-button' onClick={this.handleClick}>Add To Queue</button>
      </div>
    );
  }
});

/*  =============================================================================
    Main-Component Search

    The entire Search component. Contains an Input bar for Search, as well as the
    entire list of media entries. Each media entry contains the thumbnail,
    title, and duration components
    
    @States:      searchQuery
                  jsonResponse

    @Components:  Thumbnail
                  Title
                  Duration
    ========================================================================== */
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
        type: 'video'
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
    var mediaEntries = [];
    var json = this.state.jsonResponse;
    if (json !== "" && json !== undefined) {
      var jsonItem;
      for (var i = 0; i < json.items.length; ++i) {
        jsonItem = json.items[i];
        mediaEntries.push(
          <MediaEntry 
            key={jsonItem.id.videoId} 
            pos={i} 
            videoId={jsonItem.id.videoId} 
            thumbnail={jsonItem.snippet.thumbnails.default.url} 
            title={jsonItem.snippet.title} /> 
        );
      }
    }

    return (
      <div>
        Search: 
        <form id='search-form' onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange} />
        </form>
        <div id='search-container'>
          {this.state.searchQuery}
          {mediaEntries}
        </div>
      </div>
    );
  }
});

module.exports = Search;