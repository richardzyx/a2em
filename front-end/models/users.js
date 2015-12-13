/**
 * Created by nicolassempere on 11/5/15.
 */


var mongoose = require('mongoose');

var authSchema = mongoose.Schema({
    username : String,
    password : String
});

module.exports = mongoose.model('User', authSchema);
