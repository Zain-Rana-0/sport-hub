import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { 
  Box, 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
  Paper
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DeletePlayer() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch all players when component mounts
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/players");
      setPlayers(response.data);
    } catch (error) {
      toast.error("Failed to fetch players");
      console.error("Error fetching players:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayerChange = (event) => {
    setSelectedPlayer(event.target.value);
  };

  const handleOpenDialog = () => {
    if (!selectedPlayer) {
      toast.warning("Please select a player first");
      return;
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeletePlayer = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/players/${selectedPlayer}`);
      toast.success("Player deleted successfully");
      setSelectedPlayer("");
      fetchPlayers(); // Refresh player list
    } catch (error) {
      toast.error("Failed to delete player");
      console.error("Error deleting player:", error);
    } finally {
      setLoading(false);
      setOpenDialog(false);
    }
  };

  const selectedPlayerData = players.find(player => player.id === selectedPlayer);

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Delete Player
      </Typography>
      
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <FormControl fullWidth margin="normal">
            <InputLabel id="player-select-label">Select Player</InputLabel>
            <Select
              labelId="player-select-label"
              id="player-select"
              value={selectedPlayer}
              label="Select Player"
              onChange={handlePlayerChange}
            >
              {players.map((player) => (
                <MenuItem key={player.id} value={player.id}>
                  {player.name} - {player.position}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedPlayer && (
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant="subtitle1">
                Selected Player: {selectedPlayerData?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Position: {selectedPlayerData?.position}
              </Typography>
            </Box>
          )}

          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleOpenDialog}
            disabled={!selectedPlayer}
            sx={{ mt: 2 }}
          >
            Delete Player
          </Button>

          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete {selectedPlayerData?.name}? This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button 
                onClick={handleDeletePlayer} 
                color="error" 
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <DeleteIcon />}
              >
                {loading ? "Deleting..." : "Delete"}
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Paper>
  );
}