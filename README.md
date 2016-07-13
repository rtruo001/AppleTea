#Codename: AppleTea

**End Goal:**
Build a web and mobile application similar to how TogetherTube runs. Our idea expands upon TogetherTube by letting users save playlists. Users can also play playlists made by other users through the Explore tab. 

We were hoping in turning this application into a place where people can watch/listen to people’s playlists. A good analogy is a television, where each channel represents a playlist. Users can also generate their own channels by making private or public playlists. 

**Features**
Sync different medias at the same time

* Medias
  * Youtube
  * Soundcloud
  * Vimeo

* Chatroom

* Saving playlists

* Searching playlists

* Searching medias

**Current Roles:**


Randy - Backend/Frontend

Gerard - Design

Harrison - Backend/Frontend












##TODOs: (Ranked in Priority)

**NOT STARTED -** Generate a Database of users

**NOT STARTED -** Generate a Database for user’s playlists

**IN PROGRESS -** Build the Queue, currently need to update media whenever the media finishes playing, and updates the queue of medias.

**IN PROGRESS -** Refine the Search

**NOT STARTED -** Build the Explore Tab

**NOT STARTED -** Merge the UI with the Backend

**IN PROGRESS -** Rehaul Socket.io (Video Sync and Chat), potentially use other client to server side connections for quick media syncs as well as a scalable and responsive chat system

**NOT STARTED -** Convert chat.js and media.js into their React counterparts (Maybe)

**NOT STARTED -** Add functions for Soundcloud

**NOT STARTED -** Add functions for Vimeo


###Optional###

**NOT STARTED -** Use Gulp for automating javascript/css into minify, and automate other things like testing too maybe. Also use Gulp for automating browserify whenever the file changes, makes things easier.

**NOT STARTED -** Use Mocha/Chai or any unit testing

**NOT STARTED -** Research Browserify to do it properly or efficiently. Either by having it called the code or having a different command through the terminal.

*Also throughout the code, There are ( // TODO: ), those need to be worked on as well.




##Current Stack:##

Express

React

Bootstrap

Jquery

Github



































##How to Start Project:##

**Github:** https://github.com/rtruo001/AppleTea

Clone from Github:

  `git clone https://github.com/rtruo001/AppleTea.git`

Cd into the directory. Now install the node modules: (This will go through your package.json, installing your dependencies you saved in them.)

  `npm install`

To install React. You can also add the --save to also make it a permanent dependency to the project into the package.json. However, there’s some people saying that this is a bad idea to do this for React due to React not updating their versions.

`npm install express-react-views react react-dom`

*Note: For future projects, I might or might not include the React side as dependencies, we’ll see. But if they are not included in the package.json, call the command above.

After that, run the application:

  `npm start`
or
  `nodemon app`

Nodemon app will run the app without having the restart the server when something on the Client side is changed.

If Nodemon is not installed

  `npm install nodemon`

or 

`npm install nodemon -g (Global)`

Now go to the browser and put http://localhost:3000/ as the url




##File Paths##
* bin
  * www
* node_modules (A LOT of files)
* public
  * Images
  * Javascripts
  * Stylesheets
  * bundle.js
  * main.js
* routes
* index.js
* views (All of the .jsx files)
* app.js
* package.json


**Summary of Directories**

**Node_modules:** Contains the downloaded dependencies that were installed through npm install. An analogy would be the Ruby Gems, or Java libraries.

**Public:** Contains any assets that will be available to the public-facing part of the application such as images, JavaScript files and style sheets.

**Routes:** The routes for the application. Handles what pages to use depending on the URL and which HTTP requests to use.

**Views:** The view templates for the application. Currently use .jsx extensions for the views due to React. Other views we can use are HandleBars, Jade, or EJS. Views are pretty much the HTML of the code but with the .JSX syntax.

**app.js:** Usually the entry point of your application, but due to the express skeleton generator, the entry point is www. Handles all of the initializing of the website including the server.

**package.json:** The file which includes the dependency declarations for your application.


*NOTE: The next couple sections will go through each directory and files. All of the files also have comments on them to try to help through the process.


##Bin##
www- This is where the entire application starts. I accidentally used the Express skeleton generator (Which generates a new NodeJS application with files and folders already in place). For some reason, Express’s generator separated the server listener into www and the rest into app.js.

App.js is usually the entry point. However www calls app.js in it’s file anyway. This is just added modularity for some reason that the express generator created. Usually everything can be done in just app.js. 

ANYWAY, app.js and www both set up the Server with Node, Socket.IO, all the middleware, and the routing. Think of these files as the constructor/initializer for the entire application. 

Usually whenever www or app.js is updated, the server needs to be reopened. 

*Note: App.js will be described more in detail below.

























##Node_modules##

There are A LOT of modules. Node_modules is a directory that holds all of your dependencies. Think of a Java library/framework that you are importing, or a Ruby Gem. 
Global modules allows npm to install the node right when the nodes are initialized. To install globally, you add -g. After installing globally, every node application will default have that node. For example, to install Nodemon globally for it to be used in every Node application, you do:

`npm install nodemon -g`

But this won’t always work as globally installing things might require permissions. Since using the -g requires permission, I have to be root admin to do this so I use sudo.

`sudo npm install nodemon -g`

If you want things local only to that project, you have to npm init to initialize the node modules, then do

`npm install nodemon`

*Note: You only use sudo when things are global or require permissions
But here are some ones that I have globally.

**Express -** Overall Node framework

**Gulp -** Allows code to be automated (Like automating minify css/javascript files whenever it we update a change to the file.)

**Nodemon -** Allows user to not continuously reopen the Server whenever something changes on the Client side.

**Browserify -** Allows the Client side to use “require” in its code.










##Public##
Every public file including the JavaScripts, images, and CSS of the files.

The CSS needs to eventually be minified as well as the bundle.js.

So what is bundle and main? First look into the Views section on rendering via server and client. Then read the Browserify section in Views. This would explain why main.js and bundle.js are used for. 

This command is to convert the .JSX files in main.js into JavaScript and bundles all of the code into bundle.js which you can use as a script in your HTML.
  
`browserify ./public/main.js -o ./public/bundle.js -t [ babelify --presets [ es2015 react ] ] --extension=.jsx`

This command takes in main.js, converts the files into JavaScript, and outputs them into bundle.js.

####main.js:####

`
var SearchComponent = require('./../views/Search.jsx');
ReactDOM.render(<SearchComponent />, document.getElementById('search'));
`

Browserify takes the code above, and converts it into the bundle.js which is in JavaScript for use in the Client side. The above code is in JSX syntax which renders the Search component.

####Bundle.js####

Bundle.js contains all of the JavaScript that was converted through using Browserify and Babelify. Put this at the top of your Scripts in your HTML:

`<script src="/bundle.js"></script>`

You have just done client-side rendering!

####Static Files####
For handling Static files:

https://expressjs.com/en/starter/static-files.html 

Static files are used to handle any CSS or public JavaScripts. Can also handle a static HTML page as well. By doing this, we have an easier control of the paths of our directories. Currently in app.js:

```
// Public files including css and javascripts

app.use('/css/stylesheets', express.static(__dirname + '/public/stylesheets'));

app.use('/javascripts', express.static(__dirname + '/public/javascripts'));

app.use(express.static(path.join(__dirname, 'public')));
```

**Examples:**
Now we can do things like this in our HTML: 

`<link rel="stylesheet" href="/css/stylesheets/style.css"/>`

Or 

`<script src="/javascripts/media.js"></script>`

And for the last line, public directory would be used when ‘/’ is called:

`<script src="/bundle.js"></script>`
























##Routes##
Routes are how Express handles routing to different URI’s through different HTTP requests. What’s great about the whole routing system is that we can send a response through the a HTTP request that may return or render a page by passing in data. This given data can be read from a database or caches right when the server starts. This data would be sent through a JSON object. React can get these objects by the typical {this.props.whateverNameIs}.

The example below starts at app.js which calls the use function. Use is a way to handle middleware by connecting the URI path. In the below example, the 1st parameter is the given URI link, in this case it is the index ‘/’. The 2nd parameter would return the middleware used to handle ‘/’. In this case, it returns the route.js from the directory routes. 

Route.js renders a react component from the React.jsx file by also passing in the data (Which would be title). Then returning the middleware to the app.

Finally in React.jsx, the component renders the data, then is returned to route.js.

**app.js**

```
// Use the routers
app.use('/', require('./routes/route);
```

**route.js**

```
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('React’, { 
      title: 'AppleTea'
  });
});
module.exports = router;
```

**React.jsx**

```
var Component = React.createClass({
  Render: function() {
    return (
      <div> {this.props.title} </div>
    );
  } 
});
module.exports = Component;
```

**References:**
* https://expressjs.com/en/starter/basic-routing.html
* https://expressjs.com/en/guide/routing.html











##Views - React framework ##
React uses JSX as syntax for the views. In the end, the .jsx files are converted into Javascript which would render the HTML. There are two ways to render the Javascript, through either Server side rendering or Client Side rendering. Doing both makes an isomorphic application, which is code that can run on the server and client.

####Server-Side Rendering####

First have the app.js contain this: 

```
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
```

This sets the view engine to be React. (Just like using EJS, Jade, or Handlebars)

Server side rendering (SSR) is rendering through the server. Do this by rendering through the Routes which goes through the views directory. The HTML is built from the JSX files which then is rendered to the screen. Doing this is great as everything is loaded onto the screen right when the website starts. The problem in doing this is that all of the event handlers will not trigger as no components are mounted. To fix this, we have to render through the client side as well.

####Client-Side Rendering####

To render via the Client, React already has tutorials on doing this method. To do this, we would create a JavaScript file in public/javascript and add the \<script\> file to the HTML. We build the components and then use the ReactDom class to render it into our specified div. 

Doing this method however will create two files that have the same exact code, one where it renders on the Server side using the Views, the other is in the Javascript which would render on the client side. This makes things more annoying to work as we have to edit both files for it to work the way we want it to.

####Browserify####

In order to make things easier for the user, we can do the server side rendering using the views method, and also add the conversion of the server side code onto the Client side by using Browserify. Browserify reads all of your .JSX files and converts them into JavaScript which is all bundled into bundle.js. We put this bundle as a script onto the HTML and that now renders all of the DOM on the Client side. There are several ways to do the Browserify method. The way it is currently done is through the terminal by calling the command: 

*IMPORTANT TO KNOW:

`browserify ./public/main.js -o ./public/bundle.js -t [ babelify --presets [ es2015 react ] ] --extension=.jsx`

Whenever a .JSX file is updated, call this command to convert the .JSX code into JavaScript through the bundle.js which is a \<script\> at the bottom of the HTML.

Currently want to research different ways and the proper way to use Browserify. The babelify command used to be called Reactify, but what it does is it converts .jsx files into JavaScript (I think).

**References: **
This is a GREAT blog on why/how we do server side rendering and client side rendering: http://www.crmarsh.com/react-ssr/ 
What I used to start on making an isomorphic app, used the examples/dynamic to help clarify more things:
* https://github.com/reactjs/express-react-views 
* https://github.com/mhart/react-server-example 






##App.js##
The following code snippet is just some pseudo code of how app.js is formatted. You can just look at app.js to see where and how everything is placed. This code is returned to ./bin/www
```
// Variables
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

// View, React
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// Middleware
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Static or public files including css and javascripts
app.use('/css/stylesheets', express.static(__dirname + '/public/stylesheets'));
app.use('/javascripts', express.static(__dirname + '/public/javascripts'));
app.use(express.static(path.join(__dirname, 'public')));

// Use the routers
app.use('/', require('./routes/index');

At the end, app.js usually handles errors with wrong URLs or other bugs.

// The app is returned to www
module.exports = app;
```




##package.json##
One thing to know about package.json is that under the “scripts” object, the command ‘node’ is called which starts the entire project. This script can be used to do other things as well to initialize things such as using browserify commands. This script is called when the ‘nodemon app’ or ‘npm start’ is called. 

Below is an example package.json containing different dependencies and their versions. Whenever npm install is called, these dependencies are immediately installed as well.

```
{
  "name": "AppleTea",
  "version": "0.0.0",
  "private": true,
  "scripts": {        ←----------- Script Object
    "start": "node ./bin/www"
  },
  "dependencies": {
    "body-parser": "~1.13.2",
    "cookie-parser": "~1.3.5",
    "debug": "~2.2.0",
    "express": "~4.13.4",
    "express-react-views": "^0.10.2",
    "morgan": "~1.6.1",
    "react": "^15.2.0",
    "react-dom": "^15.2.0",
    "serve-favicon": "~2.3.0",
    "socket.io": "^1.4.6"
  },
  "devDependencies": {
    "babelify": "^7.3.0"
  }
}
```


##Chat System - Socket.io##
The chat system starts off with using Socket.io. I was trying to find a server side framework to do chatting easily and to try to scale it as good as I could. If there are better methods in doing this, please try it out! 

First lets start off with Socket.io. The code below is how Socket.io should start. Server needs to listen after setting up Socket.io.

This portion of the code is currently in ./bin/www
```
var port = 3000;

// Does whatever is in app.js and returns the app as a module
var app = require('../app');
var http = require('http');
var server = http.createServer(app);

// Socket.io portion, the code needs be between the listen and the creating the server. I 
// tried to make it more module by adding a socket.js and returning the module for it, but // it didn’t work.
var io = require('socket.io')(server);
io.on('connection', function(socket) {
  // Event handlers
});
server.listen(port);
```

In the event handlers for the above. The socket receive signals from the client side explaining what to do for the server. The Server then can either do something to update the server, or emit a message back to the client in order for the client to do something.




For example in the Event handlers comment above, this code will take its place (PSEUDOCODE):

```
socket.on('From Client: Add user', function(user) {
    ++numUsersConnected;

    socket.username = user;
    io.emit("From Server: User joined", {
      username: user
    });
  });

And on the Client side in chat.js:
 
  var allDifferentUsers = [];
  function onSomeEvent () {
  socket.emit('From Client: Add user', “newUserName”);
}
socket.on("From Server: User joined", function(user) {
    allDifferentUsers.push(user);
}
```

Whenever the Client side emits a ‘From Client: Add user’ message, the server receives it with the given data and does something with it. It can then send a message to the client for the client to do something. 

**In this example:**

1. The client tells the server a user logged in.
2. The server updates the count of users, and sends a message to EVERY client that a user has joined
3. The client side pushes the user into the list of users.

Using this same concept, a chat system can be built. Whenever a user sends a message, the message gets sent to the server. The message gets processed in the server and then is returned to every client connected to the server. Every client processes the message and displays it onto the screen. All of it is in chat.js

Things to consider: I am thinking of changing the entire chat system into React. It currently uses Jquery and javascript to handle all of the displaying and etc. 



*NOTE: Put this following line onto the top of your Client side code in order for the socket to work:

`var socket = io();`

 Also add in the bottom of the html.

`<script src="../socket.io/socket.io.js"></script>`

**Reference: **
Very useful docs from these links

* http://socket.io/get-started/chat/ 
* http://socket.io/docs/ 
* https://github.com/socketio/socket.io/tree/master/examples/chat 




##Video Syncing - Socket.io##
To reiterate on how to use Socket.io

####Client:####

Send from client to server by using socket.emit("Whatever name is", data)
Receive by using socket.on(“Whatever name is”, function(data))

####Server:####

io.emit() sends from server to all clients, socket.broadcast.emit() sends to all clients as well

On client side, have a global variable at the beginning.

`var socket = io();`

This socket variable would be used to handle the socket ons and emits.

Include this in the bottom of the html

`<script src="../socket.io/socket.io.js"></script>`

####Video Syncing####

For the video syncing, I used the same concept for the chat system. The code would be in ./bin/www for the server side and in media.js for the client side. When the user plays or pauses the video, an event will trigger on the client side, sending a message to the server that the video has either been played or paused. This will then send a message to all Clients signaling that the video has changed states. 

This is also done the same with seekTo. When the Youtube video’s time is changed, the new time is sent to the server and then back to all the clients. The clients reads and all syncs up to the new time.

This process needs to be REFINED with either another framework, or continuous changes to the system. Some things to note, the server’s elapsed time currently is set to client that emits the message last. Have to think of concurrency problems and overall video syncing system.

**Reference:**
Start here for Youtube API/Iframe
* https://developers.google.com/youtube/iframe_api_reference 





####Browserify####
Browserify allows you to use require(‘fileName’) on the Client side. Making access to file paths much easier. Read the Views section on why Browserify is needed.

Whenever an .JSX file is updated, call this command which would convert the .JSX files into bundle.js which can be used as a <script> on the bottom of your HTML. Currently used by calling the command:

`browserify ./public/main.js -o ./public/bundle.js -t [ babelify --presets [ es2015 react ] ] --extension=.jsx`

The babelify command used to be called Reactify, but was updated. Babelify converts .jsx files into JavaScript. 

Currently want to research on perhaps better methods such as either continue doing it via terminal, finding better commands or arguments for the commands or doing through the code on the server by using require(‘browserify’).

**Reference:**
* https://github.com/babel/babelify 
* http://browserify.org/ 


##Gulp##
Want to use Gulp to automate things eventually so that whenever something is changed in our application, browserify and minifying our applications would automatically be handled. These things would make for faster and easier handling of our code.

Currently not researched or used yet

##Testing##
Currently have not implemented any unit testing. Currently want to look into Mocha/Chai for a testing framework for node.


