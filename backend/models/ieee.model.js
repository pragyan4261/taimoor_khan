const mongoose = require('mongoose');

const ieeeSchema = new mongoose.Schema({
        year:String,
        description:String,
        branch:String,
},{collection:'ieeeservices'});

const Ieee = mongoose.model('Ieee',ieeeSchema);
module.exports = Ieee;