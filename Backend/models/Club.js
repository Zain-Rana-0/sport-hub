const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
    club_name: { type: String, required: true },
    club_logo: { type: String },
    club_type: { type: String, required: true },
    club_description: { type: String },
    founded_date: { type: Date },
    club_email: { type: String, required: true, unique: true },
    country: { type: String },
    city: { type: String },
    club_contact: { type: String },
    president_name: { type: String, required: true },
    president_email: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

module.exports = mongoose.model('Club', clubSchema);
