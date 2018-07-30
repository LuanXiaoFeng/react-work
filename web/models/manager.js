
const mongoose = require('mongoose');
const usersSchema = require('../schemas/manager');

module.exports = mongoose.model('Manager', usersSchema);