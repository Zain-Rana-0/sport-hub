require('dotenv').config();
const express = require("express");
const { registration, login, getUser } = require("./controllers/user");
const { ConnectionDB } = require("./connection");
const cors = require("cors");
const clubRoutes = require("./routes/clubRegistration");
const tournamentRoutes = require("./controllers/tournamentRoutes");
const { createPlayer, getPlayer,
    updatePlayer, deleteplayer 
  } = require("./controllers/players");
const path = require("path");
const { createFixture,
    getFixtures,
    updateFixture,
    deleteFixture} = require('./controllers/fixtures');

const app = express();
app.use(cors());
const port = 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/clubs", clubRoutes);
app.use("/api/tournament", tournamentRoutes);
app.post("/register", registration);
app.post("/login", login);
app.post("/getUser", getUser);
// app.post("/api/createPlayer", createPlayer);
// app.get("/api/getPlayerData", getPlayer);
// app.post("/api/updatePlayer", updatePlayer);
// app.get("/api/deletePlayer", deleteplayer);
app.post("/api/fixtures", createFixture);
app.get("/api/fixtures", getFixtures);
app.put("/api/fixtures/:id", updateFixture);
app.delete("/api/fixtures/:id", deleteFixture);

// MongoDB Connection with better error handling
const MONGODB_URI = process.env.MONGODB_URI;
// console.log("MongoDB URI:", MONGODB_URI);
if (!MONGODB_URI) {
  console.error("Error: MONGODB_URI is not defined in environment variables");
  process.exit(1); // Exit with error
} 

try {
  ConnectionDB(MONGODB_URI);
  // console.log("Attempting to connect to MongoDB...");
} catch (error) {
  console.error("Failed to connect to MongoDB:", error);
  process.exit(1);
}


// Error handling middleware
app.use((err, req, res, next) => {
  // console.error(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong!" });
});

app.listen(port, () => console.log(`Server started at ${port}`));
