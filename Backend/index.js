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
app.post("/api/createPlayer", createPlayer);
app.get("/api/getPlayerData", getPlayer);
app.post("/api/updatePlayer", updatePlayer);
app.get("/api/deletePlayer", deleteplayer);



ConnectionDB(
  process.env.MONGODB_URI
);

// Error handling middleware
app.use((err, req, res, next) => {
  // console.error(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong!" });
});

app.listen(port, () => console.log(`Server started at ${port}`));
