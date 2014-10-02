var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    id: Number,
    namefirst: String,
    nameLast: String,
    slug: String,
    role: Number,
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

var User = mongoose.model('User', userSchema);

module.exports = User;
