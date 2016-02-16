// require express
var express = require('express'),
    path = require('path'),
    passport = require('passport'),
    util = require('util'),
    FacebookStrategy = require('passport-facebook').Strategy,
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    logger = require('morgan'),
    session = require('express-session'),
    bodyParser = require("body-parser"),
    cookieParser = require("cookie-parser"),
    methodOverride = require('method-override');

var FACEBOOK_APP_ID = "651789438302199";
var FACEBOOK_APP_SECRET = "e8c1db2aa54683a2ba893b4442df4bf8";
var GOOGLE_CLIENT_ID = "587824968185-2s786d90fcua2nf1ljh64mjm87efedke.apps.googleusercontent.com";
var GOOGLE_CLIENT_SECRET = "vJm1wHXnsNADd8gH08QzFkAh";


// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Facebook profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Use the FacebookStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Facebook
//   profile), and invoke a callback with a user object.
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "https://mypad.herokuapp.com/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's Facebook profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Facebook account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "https://mydoodlepads.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's Google profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Google account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

// instantiate the app
var app = express();

// for regualr post requests
app.use(bodyParser.urlencoded({extended: true}));
// for post requests that want json back
app.use(bodyParser.json());

// set up a static file server that points to the "client" directory
app.use(express.static(path.join(__dirname, './client')));
app.set('views', path.join(__dirname, './client'));
app.set('view engine', 'ejs');
app.use(logger("combined"));
app.use(cookieParser());
app.use(methodOverride());
// app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true }));
// app.use(session({ secret: 'keyboard cat' }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

var http = require('http').Server(app);
var io = require('socket.io')(http);

// requrie mongoose.js from config
// Note - you must include the mongoose.js file in your server.js file 
// before you require the routes.js file, for example, here is part of our server.js file: 
require('./server/config/mongoose.js');

// route setter
var route_setter = require("./server/config/routes.js");
route_setter(app, passport);

require('./server/config/socketIo.js')(io);





http.listen(process.env.PORT || 8080, function(){
  console.log("chat with doodle pad on port 8888");
});

// var io = require('socket.io').listen(server);

// // Whenever a connection event happens (the connection event is built in) run the following code
// io.sockets.on('connection', function (socket) {
//   console.log("WE ARE USING SOCKETS!");
//   console.log(socket.id);
//   //all the socket code goes in here!
// })
//  

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/partials');
}