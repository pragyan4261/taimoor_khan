const mongoose = require('mongoose')

const academicSchema = new mongoose.Schema({
    institute:String,
    designation:String,
    from: String,  
    to:String,
    duration:String,	
},{ collection: 'academics'});

const Academic = mongoose.model('Academic', academicSchema)

module.exports = Academic;