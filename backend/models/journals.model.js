const mongoose = require('mongoose')

const journalSchema = new mongoose.Schema({
    year: String,
    description: String,
    doiLink: String,
},{ collection: 'journals'});

const Journal = mongoose.model('Journal', journalSchema)

module.exports = Journal;