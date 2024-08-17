const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
    year: String, 
    name: String,
    organisation: String
},{ collection: 'memberships' });

const Membership = mongoose.model('Membership', membershipSchema);

module.exports = Membership;