#Codename: AppleTea

**End Goal:**
Build a web and mobile application similar to how TogetherTube runs. Our idea expands upon TogetherTube by letting users save playlists. Users can also play playlists made by other users through the Explore tab. 

We were hoping in turning this application into a place where people can watch/listen to people’s playlists. A good analogy is a television, where each channel represents a playlist. Users can also generate their own channels by making private or public playlists. 




**Current Roles:**


**Randy -** Backend/Frontend

**Gerard -** UI & UX Design/Frontend

**Harrison -** Backend/Frontend





##ZenHub

ZenHub is used for tracking our TODOs, timeframes, and collaborations. It is just a Chrome extension that integrates with Github.

**ZenHub:** https://github.com/integrations/zenhub




















##How to contribute (Agile)

Our **master** branch is our main live/production branch.

Our **core** branch is our developing branch. We will be pulling from and making pull requests into the core branch. The core branch will continuously update accordingly to every pull request. Whenever we are ready for our portions of the code to go live, we push it to the master branch.

###Now for contributing:

First go to our boards in Zenhub. Either choose a TODO you want to work on or create another issue that is a TODO. Comment on what you are doing and the tasks needed to finish the TODOS. Label it accordingly and issue the TODO. Be sure to be specific.

Now on terminal go to your Appletea directory. Make sure to checkout into the **core** branch. Make sure this core branch is the most up to date version, verify by just calling

  `git pull origin core`

From here create a new branch called **appletea-(Issue number)**. The issue number is the same number issued on Zenhub for the TODO you have chosen.

After creating the new branch move over to the new branch. Work on your updates, making commits every now and to ensure saved versions of the branch. After finishing, make one last check and push to the **appletea-(Issue number)** branch.

Go on Github and issue a pull request with the base branch as **core** and the compare branch as your appletea branch.

From here on QA will review the pull request, either accepting or rejecting the request. After accepting the pull request, QA will close and delete the branch.

For example:

1. Chose Issue #24 in TODOs on Zenhub.
2. Go on terminal which is currently on **core** branch
3. Make sure that core is the most up to date version: 'git pull origin core'
4. 'git checkout -b appletea-24'
5. Work on the TODO, make continous updates and commits to this branch.
6. When finished, make a final commit and push to appletea-24 branch
7. Go on Github and make a pull request with the base branch as **core** and the compare branch as appletea-24
8. From here the pull request will be reviewd by QA. 
  - If the pull request satisfies the specifications, it will be accepted and pushed into the core branch.
  - If the pull request is not ready for the core push, it will be rejected and returned on github with comments on the code.
9. Repeat the process with other issues on Zenhub.













##How to Start Project

**Github:** https://github.com/rtruo001/AppleTea

Clone from Github:

  `git clone https://github.com/rtruo001/AppleTea.git`

Cd into the directory. Now install the node modules: (This will go through your package.json, installing your dependencies you saved in them.)

  `npm install`

You also have to install Browserify

  `sudo npm install browserify -g (I recommend doing global)`

After installing browserify, use this command in the root of your project to create your /public/bundle.js

  `browserify ./public/main.js -o ./public/bundle.js -t [ babelify --presets [ es2015 react ] ] --extension=.jsx`

You need to call the above command everytime a file in the views directory is changed.

After that, run the application:

  `npm start`

or

  `nodemon app`

Nodemon app will run the app without having the restart the server when something on the Client side is changed.

If Nodemon is not installed

  `npm install nodemon`

or 

  `sudo npm install nodemon -g (Global, I recommend just doing this)` 

Now go to the browser and put http://localhost:3000/ as the url

If you see a favicon.ico error, either add a favicon.ico image in the public directory or go to app.js and comment off the favicon line.


###MongoDB for local use

If mLab or your internet connection is not running correctly, you have to take out the mlab line and uncomment
```
mongoose.connect('mongodb://localhost:27017/Appletea');
```
Both of the line of code is in app.js

1. Download MongoDB from the website.
2. To run it, go to the directory where you downloaded MongoDB
3. Go to the bin folder
4. In terminal, do the command './mongod'

This starts up your localhost:27017 MongoDB instance. Everything now is stored through locally in the db folder in the MongoDB folder.

To use the Mongo terminal, in the same bin folder, do the command './mongo'





##File Paths
* bin (Executables)
  * www
* models (Mongoose schemas)
* node_modules (A LOT of files)
* config (Handles Server side code)
  * classes 
    * AllRooms.js
    * Room.js
  * sockets (All of the socket calls are stored here)
  * constants.js
  * passport.js
* public (Handles Client side code)
  * browserify
    * home.js
    * room.js
  * bundles
    * homeBundle.js
    * roomBundle.js
  * Images
  * Javascripts
  * Stylesheets
* routes (Controllers-like)
* views (All of the .jsx files)
* app.js
* package.json


###Summary of Directories

**Models:** Contains all Mongoose schemas files

**Node_modules:** Contains the downloaded dependencies that were installed through npm install. An analogy would be the Ruby Gems, or Java libraries.

**Config:** Contains a portion of the server side code

**Public:** Contains any assets that will be available to the public-facing part of the application such as images, JavaScript files and style sheets.

**Routes:** The routes for the application. Handles what pages to use depending on the URL and which HTTP requests to use.

**Views:** The view templates for the application. Currently use .jsx extensions for the views due to React. Other views we can use are HandleBars, Jade, or EJS. Views are pretty much the HTML of the code but with the .JSX syntax.

**app.js:** Usually the entry point of your application, but due to the express skeleton generator, the entry point is www. Handles all of the initializing of the website including the server.

**package.json:** The file which includes the dependency declarations for your application.


*NOTE: The next couple sections will go through each directory and files. All of the files also have comments on them to try to help through the process.


##Bin##
#### Files in here are executables, the command 'node www' would start the entire application
www- This is where the entire application starts. 

App.js and www both set up the Server with Node, Socket.IO, all the middleware, and the routing. Think of these files as the constructor/initializer for the entire application. 

Usually whenever www or app.js is updated, the server needs to be reopened. 

*Note: App.js will be described more in detail below.

























##Node_modules##

There are A LOT of modules. Node_modules is a directory that holds all of your dependencies. Think of a Java library/framework that you are importing, or a Ruby Gem.

Global modules allows npm to install the node right when the nodes are initialized. To install globally, you add -g. After installing globally, every node application will default have that node. For example, to install Nodemon globally for it to be used in every Node application, you do:

`sudo npm install nodemon -g`

If you want things local only to that project, you have to npm init to initialize the node modules, then do

`npm install nodemon`

*Note: You only use sudo when things are global or require permissions
But here are some ones that I have globally.

**Express -** Overall Node framework

**Gulp -** Allows code to be automated (Like automating minify css/javascript files whenever it we update a change to the file.)

**Nodemon -** Allows user to not continuously reopen the Server whenever something changes on the Client side.

**Browserify -** Allows the Client side to use “require” in its code.

**Watchify -** Automates Browserify










##Public##
Every public file including the JavaScripts, images, and CSS of the files.

The CSS needs to eventually be minified as well as the bundle.js.

###browserify - home.js and room.js

```
var SearchComponent = require('./../views/Search.jsx');
ReactDOM.render(<SearchComponent />, document.getElementById('search'));
```

Browserify takes the code above, and converts it into the bundles which is in JavaScript for use in the Client side. The above code is in JSX syntax which renders the Search component.

###bundle - homeBundle.js and roomBundle.js

The bundles contains all of the JavaScript that was converted through using Browserify and Babelify. Put this at the top of your Scripts in your HTML:

`<script src="/homeBundle.js"></script>` or `<script src="/roomBundle.js"></script>`

You have just done client-side rendering!

###Static Files###
For handling Static files:

https://expressjs.com/en/starter/static-files.html 

Static files are used to handle any CSS or public JavaScripts. Can also handle a static HTML page as well. By doing this, we have an easier control of the paths of our directories. Currently in app.js:

```
// Public files including css and javascripts
app.use('/css', express.static(__dirname + '/public/stylesheets'));
app.use('/js', express.static(__dirname + '/public/javascripts'));
app.use(express.static(path.join(__dirname, 'public')));
```

**Examples:**
Now we can do things like this in our HTML: 

`<link rel="stylesheet" href="/css/style.css"/>`

Or 

`<script src="/js/media.js"></script>`

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











##Views - React framework
React uses JSX as syntax for the views. In the end, the .jsx files are converted into Javascript which would render the HTML. There are two ways to render the Javascript, through either Server side rendering or Client Side rendering. Doing both makes an isomorphic application, which is code that can run on the server and client.

###Server-Side Rendering

First have the app.js contain this: 

```
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
```

This sets the view engine to be React. (Just like using EJS, Jade, or Handlebars)

Server side rendering (SSR) is rendering through the server. Do this by rendering through the Routes which goes through the views directory. The HTML is built from the JSX files which then is rendered to the screen. Doing this is great as everything is loaded onto the screen right when the website starts. The problem in doing this is that all of the event handlers will not trigger as no components are mounted. To fix this, we have to render through the client side as well.

###Client-Side Rendering

To render via the Client, React already has tutorials on doing this method. To do this, we would create a JavaScript file in public/javascript and add the \<script\> file to the HTML. We build the components and then use the ReactDom Class to render it into our specified div. 

Doing this method however will create two files that have the same exact code, one where it renders on the Server side using the Views, the other is in the Javascript which would render on the client side. This makes things more annoying to work as we have to edit both files for it to work the way we want it to.

###Browserify###

In order to make things easier for the user, we can do the server side rendering using the views method, and also add the conversion of the server side code onto the Client side by using Browserify. Browserify reads all of your .JSX files and converts them into JavaScript which is all bundled into bundle.js. We put this bundle as a script onto the HTML and that now renders all of the DOM on the Client side. There are several ways to do the Browserify method. The way it is currently done is through the terminal by calling the command: 

*IMPORTANT TO KNOW:

```
watchify ./public/browserify/home.js -o ./public/bundles/homeBundle.js -t [ babelify --presets [ es2015 react ] ] --extension=.jsx -v
or
browserify ./public/browserify/home.js -o ./public/bundles/homeBundle.js -t [ babelify --presets [ es2015 react ] ] --extension=.jsx -v

and

watchify ./public/browserify/room.js -o ./public/bundles/roomBundle.js -t [ babelify --presets [ es2015 react ] ] --extension=.jsx -v
or
browserify ./public/browserify/room.js -o ./public/bundles/roomBundle.js -t [ babelify --presets [ es2015 react ] ] --extension=.jsx -v
```

Whenever a .JSX file is updated, call this command to convert the .JSX code into JavaScript through the bundles which is a \<script\> at the bottom of the HTML.

Currently want to research different ways and the proper way to use Browserify. The babelify command used to be called Reactify, but what it does is it converts .jsx files into JavaScript (I think).

**References:**

This is a GREAT blog on why/how we do server side rendering and client side rendering: 
* http://www.crmarsh.com/react-ssr/ 

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




##package.json
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


##Chat System / Video Syncing - Socket.io
All code is currently in config/sockets, the socket code starts in socket.js.

Socket.io is used for Real time updates, updating all clients instantly. The Chat system and Video Syncing uses Socket.io
```
PSEUDOCODE
var port = 3000;

// Does whatever is in app.js and returns the app as a module
var app = require('../app');
var http = require('http');
var server = http.createServer(app);

var io = require('socket.io')(server);
io.on('connection', function(socket) {
  // Event handlers
  Room sockets

  Chat sockets

  MediaPlayer sockets

  Queue Sockets

  Database Sockets
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
 
var usersArray = [];
function onSomeEvent () {
  socket.emit('From Client: Add user', “newUserName”);
}

socket.on("From Server: User joined", function(user) {
    usersArray.push(user);
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

**However** in our current case, the variable is called in /public/javascripts/socket.js. This file is placed at the top of the scripts section in the HTML.

**Reference:**
Very useful docs from these links

* http://socket.io/get-started/chat/ 
* http://socket.io/docs/ 
* https://github.com/socketio/socket.io/tree/master/examples/chat 

Youtube API

* https://developers.google.com/youtube/iframe_api_reference 





##Browserify/Watchify
Browserify allows you to use require(‘fileName’) on the Client side. Making access to file paths much easier. Read the Views section on why Browserify is needed.

Whenever an .JSX file is updated, call this command which would convert the .JSX files into bundle.js which can be used as a \<script\> on the bottom of your HTML. Currently used by calling the command:

```
watchify ./public/browserify/home.js -o ./public/bundles/homeBundle.js -t [ babelify --presets [ es2015 react ] ] --extension=.jsx -v
or
browserify ./public/browserify/home.js -o ./public/bundles/homeBundle.js -t [ babelify --presets [ es2015 react ] ] --extension=.jsx -v

and

watchify ./public/browserify/room.js -o ./public/bundles/roomBundle.js -t [ babelify --presets [ es2015 react ] ] --extension=.jsx -v
or
browserify ./public/browserify/room.js -o ./public/bundles/roomBundle.js -t [ babelify --presets [ es2015 react ] ] --extension=.jsx -v
```

The babelify command used to be called Reactify, but was updated. Babelify converts .jsx files into JavaScript. 

Currently want to research on perhaps better methods such as either continue doing it via terminal, finding better commands or arguments for the commands or doing through the code on the server by using require(‘browserify’).

**Reference:**
* https://github.com/babel/babelify 
* http://browserify.org/ 


##Gulp
Want to use Gulp to automate things eventually so that whenever something is changed in our application, browserify and minifying our applications would automatically be handled. These things would make for faster and easier handling of our code.

Currently not researched or used yet

##Testing
Currently have not implemented any unit testing. Currently want to look into Mocha/Chai for a testing framework for node.

##Things not discussed yet (Ask me)
- XSS attacks (dangerouslySetInnerHTML)

  **Reference:**
  - * https://en.wikipedia.org/wiki/Cross-site_scripting
  - * https://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet

- Script injections for Client-side rendering

  **Reference:**
  - * http://www.crmarsh.com/react-ssr/ 
- MongoDB
- Rooms and RoomManager
- Potential usage of Flux/Redux (For Modals)
- Passport (Authentication/Authorization)

  **Reference:**
  - * https://scotch.io/tutorials/easy-node-authentication-setup-and-local

- Routing (Routes and Controllers)

  **Reference:**
  - * https://scotch.io/tutorials/learn-to-use-the-new-router-in-expressjs-4


