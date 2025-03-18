import { useState } from "react";
import "./TournamentsCards.css";

export default function TournamentsCard() {
  const [tournament, setTournament] = useState({
    name: "Tournament Name",
    image: "/logo.png",
    date: "Date",
    location: "Location",
  });

  const Tournament = {
    name: "Tournament Name",
    image: "/logo.png",
    date: "Date",
    location: "Location",
  };
  
  return (
    <article className="tournament-card">
      <div className="tournament-card__wrapper">
        <div className="tournament-card__container">
          <div className="tournament-card__image-wrapper">
            <img
              className="tournament-card__image"
              src={tournament.image}
              alt={tournament.name}
            />
          </div>
          
          <div className="tournament-card__content">
            <h2 className="tournament-card__title">{tournament.name}</h2>

            <div className="tournament-card__info">
              <div className="tournament-card__info-item">
                <img 
                  className="tournament-card__icon" 
                  src="date.png" 
                  alt="date" 
                />
                <p className="tournament-card__text">{tournament.date}</p>
              </div>
              <div className="tournament-card__info-item">
                <img
                  className="tournament-card__icon"
                  src="location.png"
                  alt="location"
                />
                <p className="tournament-card__text">{tournament.location}</p>
              </div>
            </div>
          </div>
          
          <button className="tournament-card__button">Register now</button>
        </div>
      </div>
    </article>
  );
}