const mongoose = require('mongoose');

const bTechSchema = new mongoose.Schema({
    startyear:String,
    endingyear:String,
    name:String,
    description:String,
    subdescription:String
},{collection:'btechthesis'});

const Btechthesis = mongoose.model('Btechthesis',bTechSchema);

module.exports = Btechthesis;