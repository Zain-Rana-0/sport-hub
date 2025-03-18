import React, { useEffect, useState } from "react";
import axios from "axios";
import "./tournamentcards.css";

export default function TournamentCards() {
  const [tournament, setTournament] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/tournament")
      .then((response) => {
        setTournament(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  if (loading) {
    return <div>Loading tournaments...</div>;
  }

  return (
    <div className="tournament-cards">
      {tournament.map((item) => (
        <div key={item._id} className="tournament-card">
          <h3>{item.name}</h3>
          <p>Date: {new Date(item.date).toLocaleDateString()}</p>
          <p>Location: {item.location}</p>
          <p>Entry Fee: ${item.entryFee}</p>
          <p>Prize Pool: ${item.prizePool}</p>
          <button className="register-btn">Register Now</button>
        </div>
      ))}
    </div>
  );
}
