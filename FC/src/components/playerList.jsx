import React, { useEffect, useState } from "react";
import axios from "axios";

const PlayerList = ({ onEdit }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPlayers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/getPlayers");
      setPlayers(response.data);
    } catch (error) {
      console.error("Error fetching players:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this player?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/deletePlayer/${id}`);
      alert("Player deleted successfully!");
      fetchPlayers();
    } catch (error) {
      console.error("Error deleting player:", error);
      alert("Failed to delete player.");
    }
  };

  return (
    <div>
      <h2>Player List</h2>
      {loading ? <p>Loading players...</p> : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Jersey Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.id}>
                <td>{player.firstname} {player.lastname}</td>
                <td>{player.position}</td>
                <td>{player.jerseyNumber}</td>
                <td>
                  <button onClick={() => onEdit(player)}>Edit</button>
                  <button onClick={() => handleDelete(player.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PlayerList;
