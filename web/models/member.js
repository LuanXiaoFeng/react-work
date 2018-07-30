
const mongoose = require('mongoose');
const usersSchema = require('../schemas/member');

module.exports = mongoose.model('Member', usersSchema);