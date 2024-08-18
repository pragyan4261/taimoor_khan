const mongoose = require('mongoose');

const patentSchema = new mongoose.Schema({
    // role: String,        
    patent: String, 
    doiLink: String        
}, { collection: 'patents' });

const Patent = mongoose.model('Patent', patentSchema);

module.exports = Patent;
