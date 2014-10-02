'use strict';

/*
 * Express Dependencies
 */
var express = require('express');
var app = express();    
var port = 3000;

// Using Handlebars for templating
var exphbs = require('express3-handlebars');
var hbs;

// For gzip compression
app.use(express.compress());


// Custom modules from the lib folder
var credentials = require('./lib/credentials.js');


// Pull in required database models
var User = require('./models/user.js');
var Note = require('./models/note.js');


// authentication package
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

passport.use(new localStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
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
app.use(function(req, res, next){
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});


/*
 * GET Routes
 */
// Index Page
app.get('/', function(req, res, next) {
    res.render('index');
});
// About Page
app.get('/about', function(req, res, next) {
    res.render('about', {
        pageTestScript: '/qa/about-tests.js'
    });
});
// Contact Page
app.get('/contact', function(req, res, next) {
    res.render('contact', {
        pageTestScript: '/qa/contact-tests.js'
    });
}); 
// Schedule Page
app.get('/schedule', function(req, res, next) {
    res.render('schedule', {
        pageTestScript: '/qa/schedule-tests.js'
    });
});
// Notes Page
app.get('/notes', function(req, res, next) {
    res.render('notes', {
        pageTestScript: '/qa/notes-tests.js'
    });
});
// Login Page
app.get('/login', function(req, res, next) {
    res.render('login', {
        pageTestScript: '/qa/login-tests.js'
    });
});

/*
 * POST Routes
 */
// process login request
app.post('/login',
    passport.authenticate('local', {    successRedirect: '/',
                                        failureRedirect: '/login',
                                        failureFlash: true })
);
// process contact form submission
app.post('/contact', function(req, res){
    // post form info to the db / email admin
    res.render('index');
});


// custom 404 page
app.use(function(req, res, next){
    res.status(404);
    res.render('404');
});
// custom 505 page
app.use(function(req, res, next){
    res.status(500);
    res.render('500');
});


// Start up the server / logging errors to output
app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);
console.log('http://localhost:'+port);