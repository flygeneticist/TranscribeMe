var express = require('express');
var router = express.Router();

/* GET Routes */

// Home Page
router.get('/', function (req, res) {
    res.render('index', { title: 'TranscribeMe - Home' });
});

// get all users
router.get('/userlist', function (res, req){
    var db = req.db;
    console.log(db);
    var collection = db.get('users');
    collection.find({},{},function (e, docs){
        res.render('users', { 'users': docs });
    });
});

// About Page
router.get('/about', function (req, res) {
    res.render('about', { title: 'TranscribeMe - About' });
});
// Contact Page
router.get('/contact', function (req, res) {
    res.render('contact', { title: 'TranscribeMe - Contact' });
}); 
// Schedule Page
router.get('/schedule', function (req, res) {
    res.render('schedule', { title: 'TranscribeMe - Schedule'});
});
// Notes Page
router.get('/notes', function (req, res) {
    res.render('notes', { title: 'TranscribeMe - Notes'});
});
// Login Page
router.get('/login', function (req, res) {
    res.render('login', { title: 'TranscribeMe - Login'});
});
// logs user out, deleting from the session, and returns to homepage
router.get('/logout', function (req, res) {
    res.redirect('/');
});


/* POST Routes */

// process login request
router.post('/login', function (req, res) {
    res.render('index')   
});

router.post('/local-reg', function (req, res) {
    res.render('index')   
});

module.exports = router;
