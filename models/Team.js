//Andy Sandefer
var mongoose = require('mongoose');

var TeamSchema = new mongoose.Schema({
    name: String,
    last_modified_date: { type: Date, default: Date.now },
    state_code: String
});

module.exports = mongoose.model('Team', TeamSchema);