/*  =============================================================================
    room.js

    Converts all the components in this file into Javascript
    All the .jsx files are given in views directory
    
    Browserify/Watchify allows the 'require' function to be used on the Client Side.
    
	watchify ./public/browserify/room.js -o ./public/bundles/roomBundle.js -t [ babelify --presets [ es2015 react ] ] --extension=.jsx -v
	browserify ./public/browserify/room.js -o ./public/bundles/roomBundle.js -t [ babelify --presets [ es2015 react ] ] --extension=.jsx -v

    Put this at the bottom of the HTML file. At the beginning of all the scripts in roomIndex.jsx
    <script src="/bundles/roomBundle.js"></script>
    ========================================================================== */
var RoomComponent = require('./../../views/Room.jsx');

// Reads the html of the room-props script, which was injected data from the server side
var propStr = document.getElementById("room-props").innerHTML;
console.log("Props sent from Server in String form");
console.log(propStr);
let props = JSON.parse(propStr);
console.log("Props converted into JSON:");
console.log(props);
ReactDOM.render(<RoomComponent roomId={props.roomId} user={props.user} explore={props.explore} myPlaylists={props.myPlaylists} />, document.getElementById('room'));  
