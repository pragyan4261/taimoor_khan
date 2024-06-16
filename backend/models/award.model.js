const mongoose = require('mongoose')

const Award = new mongoose.Schema({
    year: String,
    name: String,
    organisation: String
},{ collection: 'awards'});

const model = mongoose.model('AwardData', Award)

module.exports = model