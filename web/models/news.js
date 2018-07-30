const mongoose = require('mongoose');
const usersSchema = require('../schemas/news');

module.exports = mongoose.model('News', usersSchema);