var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user.js');
var Note = require('./note.js');

var eventSchema = mongoose.Schema({
    type            : String,
    description     : String,
    startDate       : Date,
    startTime       : String,
    endtime         : String,
    repeat          : Boolean,
    repeatUntil     : Date, 
    transcriptionist: { type: Schema.Types.ObjectId, ref: 'User'},
    attendees       : [{ type: Schema.Types.ObjectId, ref: 'User'}],
    note            : { type: Schema.Types.ObjectId, ref: 'Note'},
    created_on      : Date,
    updated_on      : Date,
    created_by      : { type: Schema.Types.ObjectId, ref: 'User'},
    updated_by      : { type: Schema.Types.ObjectId, ref: 'User'},
    emailed_on      : Date,
    pending         : Boolean
});

module.exports = mongoose.model('Event', eventSchema);
