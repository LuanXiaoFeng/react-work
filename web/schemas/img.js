const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    name: String,
    number: String,
    time: String,
    price: Number,
    page: Number,
    checked: Boolean,
    state: String,
    namekind: String,
    stock: Number,
    info: String,
    dz: String
});