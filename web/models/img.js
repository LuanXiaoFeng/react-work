
const mongoose = require('mongoose');
const usersSchema = require('../schemas/img');

module.exports = mongoose.model('Img', usersSchema);