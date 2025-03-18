import { useState, useEffect } from "react";
import axios from "axios";
// import CLubachievement from "../components/clubdetail/Clubachievement";
// import Clubgallery from "../components/clubdetail/Clubgallery";
// import Clubteam from "../components/clubdetail/Clubteam";
import "../components/clubdetail/Clubteam.css";

export default function ClubDetail() {
    const [club, setClub] = useState({
        club_name: "",
        club_logo: null,
        club_type: "",
        club_description: "",
        founded_date: "",
        club_email: "",
        country: "",
        city: "",
        club_contact: "",
        president_name: "",
        president_email: ""
    });

    useEffect(() => {
        const fetchClubData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/clubs/details");
                setClub(response.data);
            } catch (error) {
                console.error("Error fetching club data:", error);
            }
        };

        fetchClubData();
    }, []);

    return (
        <>
            <main className="clubdetail_parent">
                <div className='clubtitle'>
                    <h1>{club.club_name}</h1>
                </div>

                <div className="club-info-container">
                    {club.club_logo && (
                        <div className="club-logo">
                            <img src="icon.png" alt="logo"  />
                        </div>
                    )}
                    
                    <div className="club-details">
                        <h2>Club Information</h2>
                        <p><strong>Type:</strong> {club.club_type}</p>
                        <p><strong>Description:</strong> {club.club_description}</p>
                        <p><strong>Founded:</strong> {new Date(club.founded_date).toLocaleDateString()}</p>
                        <p><strong>Location:</strong> {club.city}, {club.country}</p>
                        
                        <h3>Contact Information</h3>
                        <p><strong>Email:</strong> {club.club_email}</p>
                        <p><strong>Phone:</strong> {club.club_contact}</p>
                        
                        <h3>Club President</h3>
                        <p><strong>Name:</strong> {club.president_name}</p>
                        <p><strong>Email:</strong> {club.president_email}</p>
                    </div>
                </div>

                {/* <div className="adjust2">
                    <Clubteam />
                    <CLubachievement />
                </div>
                <Clubgallery /> */}
                </main>
        </>
    );
}