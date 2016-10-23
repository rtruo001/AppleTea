var React = require('react');

var HtmlHead = React.createClass({
  render: function() {
    return (
      <head>
        <link href='https://fonts.googleapis.com/css?family=Nunito:300,400' rel='stylesheet' type='text/css'/>
        <link rel="stylesheet" href="/css/style.css"/>
        <link rel="stylesheet" href="/css/bootstrap.min.css"/>
        <link rel="stylesheet" href="/css/plyr.css"/>
        <link rel="stylesheet" href="/css/font-awesome.min.css"/>
        <link rel="stylesheet" href="/css/toggle-slider.css" />
        <link rel="stylesheet" href="/css/jquery.mCustomScrollbar.css" />

        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.2.0/react.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.2.0/react-dom.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js"></script>
      </head>
    );
  }
});

module.exports = HtmlHead;