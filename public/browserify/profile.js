/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    profile.js

    Converts all the components in this file into Javascript
    All the .jsx files are given in views directory
    ========================================================================== */
var ProfileComponent = require('./../../views/Profile.jsx');

// Reads the html of the home-props script, which was injected data from the server side
var propStr = document.getElementById("profile-props").innerHTML;
console.log("Props sent from Server in String form");
console.log(propStr);
let props = JSON.parse(propStr);
console.log("Props converted into JSON:");
console.log(props);
ReactDOM.render(<ProfileComponent user={props.user} rooms={props.rooms} myPlaylists={props.myPlaylists} />, document.getElementById('profile'));  