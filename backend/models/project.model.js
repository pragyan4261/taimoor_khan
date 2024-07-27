const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    investigator:String,
    foreign_collaborator:String,
    project_Title:{
        type:String,
        require: [true,"Project title is required"]
    },    
    funding_Agency:String,
    funds:String,	
},{ collection: 'projects'});

const Project = mongoose.model('Project', projectSchema)

module.exports = Project;