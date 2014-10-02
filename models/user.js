var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    namefirst: String,
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

userSchema.methods.getNotes = function(){
    return this.notes; // select statement for all notes that have use in it
};

userSchema.methods.getRole = function(){
    return this.role;
};

module.exports = mongoose.model('User', userSchema);
