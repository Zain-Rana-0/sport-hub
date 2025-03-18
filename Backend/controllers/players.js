const express = require("express");
const router = express.Router();
const TeamPlayer = require("../models/TeamPlayer");

const createPlayer = async (req, res) => {
  try {
    // Validate required fields
    
    const { firstname, lastname, jerseyNumber,
       position,dateOfBirth,email,phone,
      weight, height } = req.body;
    if (!firstname || !lastname ){
      return res
        .status(400)
        .json({ error: "fistname and lastname are required" });
    }

    const playerData = {
      firstname,
      lastname,
      jerseyNumber,
      position,
      weight,
      dateOfBirth,
      email,
      phone,
      height,
    };

    const player = new TeamPlayer(playerData);
    const savedPlayer = await player.save();
    res.status(201).json(savedPlayer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all players with pagination, filtering, and sorting
const getPlayer = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      teamId,
      position,
      sortBy = "lastName",
      sortOrder = "asc",
    } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build filter object
    const filter = {};
    if (teamId) filter.teamId = teamId;
    if (position) filter.position = position;

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    // Execute query with pagination
    const players = await TeamPlayer.find(filter)
      .populate("teamId")
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination metadata
    const totalPlayers = await TeamPlayer.countDocuments(filter);

    res.status(200).json({
      players,
      pagination: {
        total: totalPlayers,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalPlayers / parseInt(limit)),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update player
const updatePlayer = async (req, res) => {
  try {
    // Check if the player exists first
    const existingPlayer = await TeamPlayer.findById(req.params.id);
    if (!existingPlayer) {
      return res.status(404).json({ error: "Player not found" });
    }

    const player = await TeamPlayer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(player);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete player
const deleteplayer = async (req, res) => {
  try {
    const player = await TeamPlayer.findByIdAndDelete(req.params.id);
    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }
    res.status(200).json({ message: "Player deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createPlayer, getPlayer, updatePlayer, deleteplayer };
