const mongoose = require('mongoose');

const invitedSchema = new mongoose.Schema({
    year:String,
    description:String,
},{collection: 'invitedtalk'});

const InvitedTalk = mongoose.model('InvitedTalk',invitedSchema);

module.exports = InvitedTalk;