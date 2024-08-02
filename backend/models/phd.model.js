const mongoose = require('mongoose');

const phdSchema = new mongoose.Schema({
    name:String,
    sclId:String,
    status:String,
    phdThesisContent:String,
    role:String,
    startyear:String,
    endingyear:String,
},{collection:'phdthesis'});

const PhdThesis = mongoose.model('PhdThesis',phdSchema);
module.exports = PhdThesis;