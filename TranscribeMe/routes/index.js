var express = require('express');
var router = express.Router();

/*
 * GET Routes
 */

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
// About Page
router.get('/about', function (req, res) {
    res.render('about', {
        pageTestScript: '/qa/about-tests.js'
    });
});
// Contact Page
router.get('/contact', function (req, res) {
    res.render('contact', {
        pageTestScript: '/qa/contact-tests.js'
    });
}); 
// Schedule Page
router.get('/schedule', function (req, res, next) {
    function callback (err, events) {
        if (err) {
            return next(err);
        }
        res.render('schedule', {
            pageTestScript  : '/qa/schedule-tests.js',
            userEvents      : events,
        });
    }

    Event.find({}).select('startDate description note').exec(callback);
});
// Notes Page
router.get('/notes', function (req, res, next) {
    function callback (err, events) {
        if (err) {
            return next(err);
        }
        res.render('notes', {
            pageTestScript  : '/qa/notes-tests.js',
            moment          : moment,
            userEvents      : events,
            eventCount      : events.length
        });
    }

    Event.find({}).select('startDate description note').exec(callback);
});
// Login Page
router.get('/login', function (req, res, next) {
    res.render('login', {
        pageTestScript: '/qa/login-tests.js'
    });
});
// logs user out, deleting from the session, and returns to homepage
router.get('/logout', function (req, res) {
    var name = req.user.username;
    console.log("LOGGING OUT " + req.user.username)
    req.logout();
    res.redirect('/');
    req.session.notice = "You have successfully been logged out " + name + "!";
});


/*
 * POST Routes
 */

// process login request
router.post('/login',
    passport.authenticate('local-login', {    
        successRedirect: '/',
        failureRedirect: '/login'
    })
);
// process registration request
router.post('/local-reg', 
    passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/login'
    })
); 

module.exports = router;
