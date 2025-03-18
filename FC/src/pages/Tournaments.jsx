import TournamentsCard from "../components/home/TournamentsCards";
import "../components/AllCSS/Tournaments.css";


export default function Tournaments() {
  const showTournaments = () => {
    return (
      
        <div className="tournamentpage">
          <TournamentsCard />
          <TournamentsCard />
          <TournamentsCard />
          <TournamentsCard />
          <TournamentsCard />
          <TournamentsCard />
          <TournamentsCard />
          <TournamentsCard />
        </div>
      
    );
  };
  return (
    <>
      <main className="Tournament_main_container">{showTournaments()}</main>
    </>
  );
}
