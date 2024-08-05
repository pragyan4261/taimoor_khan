const mongoose = require('mongoose');

const mTechSchema = new mongoose.Schema({
    mtechThesisContent:String,
    academicYear:String,
    depertment:String,
    institute:String,
    role:String,
},{collection:'mtechthesis'});

const MTechThesis = mongoose.model('MTechThesis',mTechSchema);
module.exports = MTechThesis;