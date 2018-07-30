
const mongoose = require('mongoose');
const usersSchema = require('../schemas/weibo');

module.exports = mongoose.model('Weibo', usersSchema);