const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    name: String,
    number: String,
    time: String,
    price: Number,
    yhprice: Number,
    jyprice: Number,
    checked: Boolean,
    state: String,
    namekind: String,
    stock: Number
});