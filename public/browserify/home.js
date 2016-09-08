/*  =============================================================================
    Copyright © 
    ========================================================================== */

/*  =============================================================================
    home.js

    Converts all the components in this file into Javascript
    All the .jsx files are given in views directory
    
    Browserify/Watchify allows the 'require' function to be used on the Client Side.
    
	watchify ./public/browserify/home.js -o ./public/bundles/homeBundle.js -t [ babelify --presets [ es2015 react ] ] --extension=.jsx -v
	browserify ./public/browserify/home.js -o ./public/bundles/homeBundle.js -t [ babelify --presets [ es2015 react ] ] --extension=.jsx -v

    Put this at the bottom of the HTML file. At the beginning of all the scripts in index.jsx
    <script src="/bundles/homeBundle.js"></script>
    ========================================================================== */
var HomeComponent = require('./../../views/Home.jsx');

// Reads the html of the home-props script, which was injected data from the server side
var propStr = document.getElementById("home-props").innerHTML;
console.log("Props sent from Server in String form");
console.log(propStr);
let props = JSON.parse(propStr);
console.log("Props converted into JSON:");
console.log(props);
ReactDOM.render(<HomeComponent user={props.user} explore={props.explore} myPlaylists={props.myPlaylists} />, document.getElementById('home'));  
