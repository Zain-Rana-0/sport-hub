import React from 'react';
import './Team-participating.css';
import  './Team-standing.css';


const TeamCard = () => {
    
const teamData = [
    {
        teamName: "The Eagles",
        teamLogo: "./date.png",
    },
    {
        teamName: "The Eagles",
        teamLogo: "./date.png",
    },
    {
        teamName: "The Eagles",
        teamLogo: "./date.png",
    },
    {
        teamName: "The Eagles",
        teamLogo: "./date.png",
    },
    {
        teamName: "The Eagles",
        teamLogo: "./date.png",
    },
     {
        teamName: "The Eagles",
        teamLogo: "./date.png",
    },

]
    return (
        <div className="teamcardcontainer">
            <div className='adjust'>
            <div className='flex2'>
                <h1 className="title">Teams</h1>
            </div>
            <div className='teamsparticipating-card'>

            {teamData.map((team, index) => (
                <div key={index} className="Teamscard">
                    <div className="card-header">
                        <img src={team.teamLogo} alt="Team Logo" className="team-logo" />
                        <h2>{team.teamName}</h2>
                    </div>
                    <button className='Teamscard-button'>More</button>
                </div>
            ))}
            </div>
            </div>
        </div>
    );
};


export default TeamCard;
