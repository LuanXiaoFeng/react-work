const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    name: String,
    number: String,
    time: String,
    sx: String,
    page: Number,
    checked: Boolean,
    state: String,
    namekind: String,
    email: String,
    phonenum: Number
});