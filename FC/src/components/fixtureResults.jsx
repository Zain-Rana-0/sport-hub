
import react from 'react';
// import axios from 'axios';

export default function FixtureResults() {
    const [fixtures, setFixtures] = react.useState([]);
    const [loading, setLoading] = react.useState(true);
    
    // react.useEffect(() => {
    //     const fetchFixtures = async () => {
    //     try {
    //         const response = await axios.get("http://localhost:8000/fixtures");
    //         setFixtures(response.data);
    //     } catch (error) {
    //         console.error("Failed to fetch fixtures:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    //     };
    //     fetchFixtures();
    // }, []);
    
    return (
        <div className="fixtures-container">
        <h2 className="text-2xl font-bold mb-4">Fixtures & Results</h2>
        {loading ? (
            <p>Loading fixtures...</p>
        ) : (
            <table className="fixtures-table">
            <thead>
                <tr>
                <th>Date</th>
                <th>Home Team</th>
                <th>Score</th>
                <th>Away Team</th>
                </tr>
            </thead>
            <tbody>
                {fixtures.map((fixture) => (
                <tr key={fixture.id}>
                    <td>{fixture.date}</td>
                    <td>{fixture.homeTeam}</td>
                    <td>{fixture.score}</td>
                    <td>{fixture.awayTeam}</td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
        </div>
    );
    }