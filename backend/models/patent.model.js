const mongoose = require('mongoose');

const patentSchema = new mongoose.Schema({
    // role: String,        
    description: String, 
    doiLink: String        
}, { collection: 'patents' });

const Patent = mongoose.model('Patent', patentSchema);

module.exports = Patent;
