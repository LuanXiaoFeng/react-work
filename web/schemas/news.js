const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    name: String,
    number: String,
    time: String,
    page: Number,
    checked: Boolean,
    state: String,
    newsinfo: String
});