const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
    title: String,  
    date: String,   
    membershipId: String,  
    organization: String,  
    location: String,      
}, { collection: 'professional_memberships' });

const ProfessionalMembership = mongoose.model('ProfessionalMembership', membershipSchema);

module.exports = ProfessionalMembership;
