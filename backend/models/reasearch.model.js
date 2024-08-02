const mongoose = require('mongoose');

const reasearchSchema = new  mongoose.Schema({
    name:String,
    affiliation:String,
    email:String,
    collabNature:String,
    type:String,
},{collection:'researches'});

const Research = mongoose.model('Research',reasearchSchema);
module.exports = Research;