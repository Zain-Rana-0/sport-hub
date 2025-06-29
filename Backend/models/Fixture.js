const mongoose = require('mongoose');

const fixtureSchema = new mongoose.Schema({
  homeTeam: {
    type: String,
    required: true
  },
  awayTeam: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },

  score: {
    type: String,
    required: true
    },

  type: {
    type: String,
    required: true
  }
}, {

  timestamps: true
});

const Fixture = mongoose.model('Fixture', fixtureSchema);

module.exports = Fixture;
