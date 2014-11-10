var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noteSchema = mongoose.Schema({
    title: String,
    contents: String, // dir and file name for document location
    date_created: Date,
    active: Boolean,
});

noteSchema.methods.getContents = function(){
    return this.contents;
};

module.exports = mongoose.model('Note', noteSchema);
