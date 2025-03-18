import "./Tournament-about-card.css";
export default function TournamentAboutCard() {
    const tournaments = [

        {
            name: "National Football League",
            game: "Football",
            startDate: "2024-10-20",
            endDate: "2024-11-10",
            prizeMoney: "15000",
            entryFee: null
        },

    ];


    return (
        <div className="tournament-card">

            {tournaments.map((tournament, index) => (
                <TournamentCardList key={index} tournament={tournament} />
            ))}
        </div>

    )
}


const TournamentCardList = ({ tournament }) => {
    return (
        <div className="tournament-card-main-container">
            <h3 className="tournament-card-title">Tournament Information</h3>
            <div className="tournament-card-container">
                <h3 className="tournament-name">{tournament.name} - {tournament.game}</h3>
                <div className="tournasament-card-items">
                    <div className="tournamensat-card-item">
                    <p className="tournament-card-i"> <strong>Start Date:</strong> {tournament.startDate}</p>
                    <p className="tournament-card-i"><strong>End Date:</strong> {tournament.endDate}</p>
                <div className="tournament-cardsdd-item">
                    <p className="tournament-card-i"><strong>Prize Money:</strong> ${tournament.prizeMoney}</p>
                    {tournament.entryFee ? (
                        <p className="tournament-card-i"><strong>Entry Fee:</strong> ${tournament.entryFee}</p>
                    ) : (
                        <p><strong>Entry Fee:</strong> Free</p>
                    )}
                </div>
                </div>
                </div>


            </div>
        </div>
    )
}