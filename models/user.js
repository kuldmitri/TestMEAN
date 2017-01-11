var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = mongoose.model('User', {
  username: String,
  email: String,
  password: String
});

module.exports = User;