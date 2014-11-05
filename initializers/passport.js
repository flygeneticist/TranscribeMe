function init() {
  //===============PASSPORT=================
  var passport = require('passport'),
      LocalStrategy = require('passport-local'),
      TwitterStrategy = require('passport-twitter'),
      GoogleStrategy = require('passport-google'),
      FacebookStrategy = require('passport-facebook');

  // strategies
  var usernameAndPasswordStrategy = new LocalStrategy(
    { emailField: 'email', passwordField: 'password' }
  );

  // de/serialization of users
  var serializeUser = App.command('serializeUser'),
      deserializeUser = App.command('deserializeUser');

  passport.use(usernameAndPasswordStrategy);
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);

  App.app.use(passport.initialize());
  App.app.use(passport.session());
  
} 

module.exports = init


function serializeUser(){
  passport.serializeUser(function(user, done) {
    console.log("serializing " + user.username);
    done(null, user);
  });
};


// Setup deserialization of users
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
