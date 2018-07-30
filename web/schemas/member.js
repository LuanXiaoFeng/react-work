const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    name: String,
    number: String,
    time: String,
    phonenum: Number,
    page: Number,
    checked: Boolean,
    state: String,
    namekind: String,
    stock: Number,
    email: String,
    dz: String,
    sx: String
});