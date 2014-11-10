var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = mongoose.Schema({
    name: String,
    email: String,
    message: String,
    created_on: Date,
    email_on: Date,
    pending: Boolean
});

module.exports = mongoose.model('Message', messageSchema);
