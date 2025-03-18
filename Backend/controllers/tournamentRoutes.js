const express = require("express");
const router = express.Router();
const Tournament = require("../models/Tournament");

router.post("/", async (req, res) => {
  try {
    const requiredFields = [
      "club_name",
      "tournament_type",
      "president_name",
      "president_email",
      
    ];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res
          .status(400)
          .json({ success: false, message: `${field} is required` });
      }
    }

    const tournamentData = {
      club_name: req.body.club_name,
      club_logo: req.body.club_logo || null,
      tournament_type: req.body.tournament_type,
      tournament_description: req.body.tournament_description || "",
      starting_date: req.body.starting_date || null,
      ending_date: req.body.ending_date || null,
      president_name: req.body.president_name,
      president_email: req.body.president_email,
     
    };

    const newTournament = new Tournament(tournamentData);
    await newTournament.save();

    res
      .status(201)
      .json({
        success: true,
        message: "Tournament created successfully",
        tournament: newTournament,
      });
  } catch (error) {
    console.error("Tournament creation error:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error creating tournament",
        error: error.message,
      });
  }
});

module.exports = router;
