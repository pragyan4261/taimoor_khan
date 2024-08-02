const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    investigator:String,
    foreign_collaborator:String,
    project_Title: String,  
    funding_Agency:String,
    funds:String,
    status:String,	
},{ collection: 'projects'});

const Project = mongoose.model('Project', projectSchema)

module.exports = Project;