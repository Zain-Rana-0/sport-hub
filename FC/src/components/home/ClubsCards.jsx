import { useEffect, useState } from 'react';
import "./ClubsCards.css";

const API_BASE_URL = 'http://localhost:8000';

export default function ClubsCard() {
    const [clubs, setClubs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClubs = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/clubs/`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                if (result.success && Array.isArray(result.data)) {
                    setClubs(result.data);
                } else {
                    throw new Error('Invalid data format received');
                }
            } catch (err) {
                setError(err.message);
                console.error('Error fetching clubs:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchClubs();
    }, []);

    if (error) return <div className="error-message">Error loading clubs: {error}</div>;
    if (loading) return <div className="loading-message">Loading clubs...</div>;

    return (
        <section className="clubSection">
            {clubs.map((club) => (
                <div key={club._id} className="card">
                    <div className="topSection">
                        <div className="icons">
                        <img src="icon.png"  height="60px" width="60px" alt='logo'/>
                        </div>
                        <div className="clubName">
                            <h1>{club.club_name}</h1>
                        </div>
                        <div className="clubLocation">
                            <p>{club.city}, {club.country}</p>
                        </div>
                        <div className="clubDescription">
                            <p>{club.club_description}</p>
                        </div>
                    </div>
                    <a href={`/ClubDetail/${club._id}`} className="cardButton">
                        More
                    </a>
                </div>
            ))}
        </section>
    );
}
