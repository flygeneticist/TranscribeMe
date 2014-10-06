'use strict';

/*
 * Express Dependencies
 */
var express = require('express');
var app = express();    
var port = 3000;

// mongoDB setup
var mongoose =  require('mongoose');
var config =    require('./lib/config.js');
mongoose.connect(config.db);
// models imported
var User =      require('./models/user.js');
var Note =      require('./models/note.js');
var Message =   require('./models/message.js');
var Event =     require('./models/event.js');

// Using Handlebars for templating
var exphbs = require('express3-handlebars');
var hbs;

// setup bodyParser which will this will let us get the data from a POST
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For gzip compression
app.use(express.compress());


//===============PASSPORT=================
// pulling in required packages and modules
var passport = require('passport');
var localStrategy = require('passport-local');
var twitterStrategy = require('passport-twitter');
var goolgeStrategy = require('passport-google');
var facebookStrategy = require('passport-facebook');

// Setup serialization of users to only use part of the object
passport.serializeUser(function(user, done) {
  console.log("serializing " + user.username);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log("deserializing " + obj);
  done(null, obj);
});

// Passport Strategy used to login existing users
passport.use('local-login', new localStrategy(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
  function(req, username, password, done) {
    funct.localAuth(username, password)
    .then(function (user) {
      if (user) {
        console.log("LOGGED IN AS: " + user.username);
        req.session.success = 'You are successfully logged in ' + user.username + '!';
        done(null, user);
      }
      if (!user) {
        console.log("COULD NOT LOG IN");
        req.session.error = 'Could not log user in. Please try again.'; //inform user could not log them in
        done(null, user);
      }
    })
    .fail(function (err){
      console.log(err.body);
    });
  }
));

// Passport Strategy used to register and signup new users
passport.use('local-signup', new localStrategy(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
  function(req, username, password, done) {
    funct.localReg(username, password)
    .then(function (user) {
      if (user) {
        console.log("REGISTERED: " + user.username);
        req.session.success = 'You are successfully registered and logged in ' + user.username + '!';
        done(null, user);
      }
      if (!user) {
        console.log("COULD NOT REGISTER");
        req.session.error = 'That username is already in use, please try a different one.'; //inform user could not log them in
        done(null, user);
      }
    })
    .fail(function (err){
      console.log(err.body);
    });
  }
));


/*
 * Config for Production and Development
 */
if (process.env.NODE_ENV === 'production') {
    // Set the default layout and locate layouts and partials
    app.engine('handlebars', exphbs({
        defaultLayout: 'main',
        layoutsDir: 'dist/views/layouts/',
        partialsDir: 'dist/views/partials/'
    }));

    // Locate the views
    app.set('views', __dirname + '/dist/views');
    
    // Locate the assets
    app.use(express.static(__dirname + '/dist/assets'));

} else {
    app.engine('handlebars', exphbs({
        // Default Layout and locate layouts and partials
        defaultLayout: 'main',
        layoutsDir: 'views/layouts/',
        partialsDir: 'views/partials/'
    }));

    // Locate the views
    app.set('views', __dirname + '/views');
    
    // Locate the assets
    app.use(express.static(__dirname + '/assets'));
}

// Set Handlebars
app.set('view engine', 'handlebars');


/*
 * Middle-ware   
 */
// check if the test cases should be triggered
app.use(function (req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});

// route middleware to ensure user is authenticated.
/*function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  req.session.error = 'Please sign in!';
  res.redirect('/login');
}*/


/*
 * GET Routes
 */

// Index Page
app.get('/', function (req, res, next) {
    res.render('index', {user: req.user});
});
// About Page
app.get('/about', function (req, res, next) {
    res.render('about', {
        pageTestScript: '/qa/about-tests.js'
    });
});
// Contact Page
app.get('/contact', function (req, res, next) {
    res.render('contact', {
        pageTestScript: '/qa/contact-tests.js'
    });
}); 
// Schedule Page
app.get('/schedule', function (req, res, next) {
    res.render('schedule', {
        pageTestScript: '/qa/schedule-tests.js'
    });
});
// Notes Page
app.get('/notes', function (req, res, next) {
    function callback (err, events) {
        if (err) {
            return next(err);
        }
        res.render('notes', {
            pageTestScript  : '/qa/notes-tests.js',
            userEvents      : events,
            eventCount      : events.length
        });
    }

    Event.find({}).select('startDate description note').exec(callback);
});
// Login Page
app.get('/login', function (req, res, next) {
    res.render('login', {
        pageTestScript: '/qa/login-tests.js'
    });
});
// logs user out, deleting from the session, and returns to homepage
app.get('/logout', function (req, res) {
    var name = req.user.username;
    console.log("LOGGIN OUT " + req.user.username)
    req.logout();
    res.redirect('/');
    req.session.notice = "You have successfully been logged out " + name + "!";
});
// dev setup of new user and two events upon startup for testing purposes
app.get('/dbset', function (req, res) {
    // new user
    var u1 = new User({
        nameFirst: "Kevin",
        nameLast: "Keller",
        role: 4,
        password: "Test1234",
        email: "test@test.com",
        date_created: Date.now(),
        date_updated: Date.now(),
        active: true,
    });
    u1.save(function (err, u1) {
        if (err) { console.error(err); }
    });

    var u = User.distinct("_id", {"nameFirst": "Kevin"});

    // new event #1
    var e1 = new Event({
        type            : 'Course',
        description     : 'Intro to Biology 101',
        startDate       : Date.parse('10/14/2014'),
        startTime       : '12:00 PM',
        endTime         : '1:00 PM',
        repeat          : false,
        repeatOn        : ["M","W","F"],
        repeatUntil     : Date.parse('12/30/2014'), 
        attendees       : [],
        note            : "http://notestore.com/",
        created_on      : Date.now(),
        updated_on      : Date.now(),
    });
    e1.save(function (err, e1) {
        if (err) { console.error(err); }
    });
    // new event #2
    var e2 = new Event({
        type            : 'Course',
        description     : 'Intro to Biology 101 - Lab',
        startDate       : Date.parse('10/15/2014'),
        startTime       : '5:00 PM',
        endtime         : '9:00 PM',
        repeat          : true,
        repeatOn        : ["T"],
        repeatUntil     : Date.parse('12/30/2014'), 
        attendees       : [],
        note            : "http://notestore.com/",
        created_on      : Date.now(),
        updated_on      : Date.now(),
    });
    e2.save(function (err, e2) {
        if (err) { console.error(err); }
    });

    res.send("DATABASE HAS BEEN SUCCESSFULLY SEEDED! :)");
});
    

/*
 * POST Routes
 */

// process login request
app.post('/login',
    passport.authenticate('local-login', {    
        successRedirect: '/',
        failureRedirect: '/login'
    })
);
// process registration request
app.post('/local-reg', 
    passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/login'
    })
); 
// process contact form submission
app.post('/contact', function (req, res, next) {
    // create new message instance
    var message = new Message({
            name        : req.body.name,
            email       : req.body.email,
            message     : req.body.message,
            created_on  : Date.now(),
            pending     : true,
        });
    // save the message and check for errors
    message.save(function(err) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Message created!' });
    });
    // send the user back to the home page
    res.redirect('/');
});

// custom 404 page
app.use(function (req, res) {
    res.status(404);
    res.render('404');
});
// custom 505 page
app.use(function (req, res) {
    res.status(500);
    res.render('500');
});


// Start up the server / logging errors to output
app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);
console.log('http://localhost:'+port);