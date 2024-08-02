const mongoose = require('mongoose')

const administrativeSchema = new mongoose.Schema({
    institute:String,
    designation:String,
    from: String,  
    to:String,
    duration:String,	
},{ collection: 'administratives'});

const Administrative = mongoose.model('Administrative', administrativeSchema)

module.exports = Administrative;