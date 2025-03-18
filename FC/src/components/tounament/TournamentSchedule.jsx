import "./TournamentSchedule.css";


export default function TournamentSchedule() {
    const matchesSchedule = [
        { date: "2024-06-01", time: "10:00 AM", match: "Match 1", venue: "Stadium 1" },
        { date: "2024-06-02", time: "10:00 AM", match: "Match 2", venue: "Stadium 2" },
        { date: "2024-06-03", time: "10:00 AM", match: "Match 3", venue: "Stadium 3" },
        { date: "2024-06-04", time: "10:00 AM", match: "Match 4", venue: "Stadium 4" },
    ];
    return (
       <div className="PointTable-container">
        <div className="flex2">
        <h1 className="title">Schedule</h1>
        </div>
        <div className="TournamentSchedule">

            <table className="pointtable">
                <thead className='pointtable-head'>
                    <tr className="pointtable-heading">
                        <th >Date</th>
                        <th >Time</th>
                        <th >Match</th>
                        <th >Venue</th>
                    </tr>
                </thead>
                <tbody className="pointtable-body">

                    {matchesSchedule.map((match, index) => (
                        <tr key={index} className="pointtable-body-row">
                            <td className="pointtable-body-rowdata">{match.date}</td>
                            <td className="pointtable-body-rowdata">{match.time}</td>
                            <td className="pointtable-body-rowdata">{match.match}</td>
                            <td className="pointtable-body-rowdata">{match.venue}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
       </div>
    )
}