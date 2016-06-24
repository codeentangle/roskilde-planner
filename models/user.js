//  require packages
var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;

var UserSchema = new Schema({
    username:   {type: String, required: true, unique: true},
    password:   {type: String, required: true},
    createdAt:  {type: Date, default: Date.now},
    bands:      {type: Array, default: []}
});

module.exports = mongoose.model('User', UserSchema);
