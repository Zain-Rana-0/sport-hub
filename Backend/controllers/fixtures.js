
const express = require('express');
const router = express.Router();
const Fixture = require('../models/Fixture');

// Create a new fixture
const createFixture = async (req, res) => {
  try {
    const { awayTeam, homeTeam, date, score, type} = req.body;

    console.log("Request body:", req.body);
    
    if (!awayTeam || !homeTeam || !date || !score || !type) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const fixture = new Fixture({ awayTeam, homeTeam, date, score, type });
    const savedFixture = await fixture.save();
    
    res.status(201).json(savedFixture);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all fixtures with pagination, filtering, and sorting
const getFixtures = async (req, res) => {
    try {
        const { page = 1, limit = 10, team, date, sortBy = 'date', sortOrder = 'asc' } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);
    
        // Build filter object
        const filter = {};
        if (team) {
            filter.$or = [{ team1: team }, { team2: team }];
        }
        if (date) {
            filter.date = date;
        }
    
        // Build sort object
        const sort = {};
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    
        const fixtures = await Fixture.find(filter).skip(skip).limit(parseInt(limit)).sort(sort);
        const totalCount = await Fixture.countDocuments(filter);
    
        res.status(200).json({
            fixtures,
            totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: parseInt(page)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Update a fixture by ID
const updateFixture = async (req, res) => {
    try {
        const { id } = req.params;
        const { awayTeam, homeTeam, date, time, score ,type} = req.body;
    
        const updatedFixture = await Fixture.findByIdAndUpdate(id, { awayTeam,homeTeam,date,time,score,type }, { new: true });
    
        if (!updatedFixture) {
            return res.status(404).json({ error: 'Fixture not found' });
        }
    
        res.status(200).json(updatedFixture);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Delete a fixture by ID
const deleteFixture = async (req, res) => {
    try {
        const { id } = req.params;
    
        const deletedFixture = await Fixture.findByIdAndDelete(id);
    
        if (!deletedFixture) {
            return res.status(404).json({ error: 'Fixture not found' });
        }
    
        res.status(200).json({ message: 'Fixture deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Define routes

module.exports = {
    createFixture,
    getFixtures,
    updateFixture,
    deleteFixture,
}