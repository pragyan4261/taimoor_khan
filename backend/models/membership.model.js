// Membership model
const mongoose = require('mongoose');

const Membership = new mongoose.Schema({
    year: String,
    name: String,
    organisation: String
},{ collection: 'memberships' });

const MembershipModel = mongoose.model('MembershipData', Membership);

module.exports = MembershipModel;