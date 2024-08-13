const mongoose = require('mongoose');

const editorialActivitySchema = new mongoose.Schema({
    role: String,       
    journalName: String, 
    url: String        
}, { collection: 'editorial_activities' });

const EditorialActivity = mongoose.model('EditorialActivity', editorialActivitySchema);

module.exports = EditorialActivity;
