const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
  
    position: {
      type: String,
      required: true,
      enum: ["forward", "midfielder", "defender", "goalkeeper"],
    },

    jerseyNumber: {
      type: Number,
    },
    nationality: {
      type: String,
    },
    weight: {
      type: Number,
    },
    height: {
      type: Number,
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    // status: {
    //   type: String,
    //   enum: ["active", "injured", "suspended"],
    //   default: "active",
    // },

  },
  {
    timestamps: true,
  }
);

const TeamPlayer = mongoose.model("Players", PlayerSchema);

module.exports = TeamPlayer;
