var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    nameFirst: String,
    nameLast: String,
    role: Number,
    password: String,
    email: String,
    phone: String,
    street1: String,
    street2: String,
    city: String,
    state: String,
    zip: Number,
    date_created: Date,
    date_updated: Date,
    active: Boolean,
});

module.exports = mongoose.model('User', userSchema);
