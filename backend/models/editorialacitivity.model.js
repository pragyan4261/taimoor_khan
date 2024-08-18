const mongoose = require('mongoose');

const editorialActivitySchema = new mongoose.Schema({
    year: String,       
    description: String, 
    doiLink: String        
}, { collection: 'editorials' });

const EditorialActivity = mongoose.model('EditorialActivity', editorialActivitySchema);

module.exports = EditorialActivity;