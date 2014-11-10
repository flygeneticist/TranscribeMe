var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user.js');

var eventSchema = mongoose.Schema({
    type            : String,
    description     : String,
    startDate       : Date,
    startTime       : String,
    endTime         : String,
    repeat          : Boolean,
    repeatOn        : [String],
    repeatUntil     : Date, 
    transcriptionist: { type: Schema.Types.ObjectId, ref: 'User'},
    attendees       : [{ type: Schema.Types.ObjectId, ref: 'User'}],
    note            : String,
    created_on      : Date,
    updated_on      : Date,
    created_by      : { type: Schema.Types.ObjectId, ref: 'User'},
    updated_by      : { type: Schema.Types.ObjectId, ref: 'User'},
    emailed_on      : Date,
    pending         : Boolean
});

module.exports = mongoose.model('Event', eventSchema);
