var mongoose = require('mongoose');

var noteSchema = mongoose.Schema({
    title: String,
    description: String,
    slug: String,
    users: [User],
    transcriptionist: User,
    contents: String // dir and file name for document location
    date_created: Date,
    date_updated: Date,
    created_by: User,
    updated_by: User,
    active: Boolean,
});

userSchema.methods.getContents = function(){
    return this.contents;
};

var Note = mongoose.model('Note', noteSchema);

module.exports = Note;
