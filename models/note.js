var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user.js');

var noteSchema = mongoose.Schema({
    title: String,
    description: String,
    slug: String,
    users: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    contents: String, // dir and file name for document location
    date_created: Date,
    date_updated: Date,
    created_by: { type: Schema.Types.ObjectId, ref: 'User'},
    updated_by: { type: Schema.Types.ObjectId, ref: 'User'},
    active: Boolean,
});

noteSchema.methods.getContents = function(){
    return this.contents;
};

module.exports = mongoose.model('Note', noteSchema);
