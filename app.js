'use strict';

/*
 * Express Dependencies
 */
var express = require('express');
var app = express();    
var port = 3000;

// mongodb setup and models imported
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test/');
var User = require('./models/user.js');
var Note = require('./models/note.js');
var Message = require('./models/message.js');

// Using Handlebars for templating
var exphbs = require('express3-handlebars');
var hbs;

// setup bodyParser which will this will let us get the data from a POST
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For gzip compression
app.use(express.compress());

// authentication package and strategies
var passport = require('passport');
var localStrategy = require('passport-local');
var twitterStrategy = require('passport-twitter');
var goolgeStrategy = require('passport-google');
var facebookStrategy = require('passport-facebook');

passport.use(new localStrategy(
  function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
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
    res.render('notes', {
        pageTestScript: '/qa/notes-tests.js'
    });
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