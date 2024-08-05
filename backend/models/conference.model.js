const mongoose = require('mongoose')

const conferenceSchema = new mongoose.Schema({
    conferenceContent: String,
    subdescription: String,
   
},{ collection: 'conferences'});

const Conference = mongoose.model('Conference', conferenceSchema)

module.exports = Conference;