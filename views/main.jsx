var React = require('react');
var ReactDOM = require('react-dom');
var Search = require('./Search');

console.log("HELLO")

module.exports = function(containerId) {
  console.log("MAIN");
  ReactDOM.render( <Search />, document.getElementById(containerId || 'search') );
};

