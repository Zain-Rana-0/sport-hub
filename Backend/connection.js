const mongoose = require("mongoose");

async function ConnectionDB(url) {
  try {
    await mongoose.connect(url);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed");
  }
}

module.exports = { ConnectionDB };
