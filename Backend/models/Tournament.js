
 const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
    club_name: { type: String, required: true },
   club_logo: { type: String },
    tournament_type: { type: String, required: true },
    tournament_description: { type: String },
    starting_date: { type: Date },
    ending_date: { type: Date },
    president_name: { type: String, required: true },
    president_email: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Tournament', tournamentSchema);