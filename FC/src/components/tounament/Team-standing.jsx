import React, { useState } from 'react';
import './team-standing.css';

const footballData = [
  { team: "Team A", played: 10, won: 6, drawn: 2, lost: 2, points: 20 },
  { team: "Team B", played: 10, won: 5, drawn: 3, lost: 2, points: 18 },
  { team: "Team C", played: 10, won: 4, drawn: 4, lost: 2, points: 16 },
];

const cricketData = [
  { team: "Team X", played: 8, won: 6, lost: 2, points: 12, netRunRate: 1.25 },
  { team: "Team Y", played: 8, won: 5, lost: 3, points: 10, netRunRate: 0.95 },
  { team: "Team Z", played: 8, won: 4, lost: 4, points: 8, netRunRate: 0.85 },
];

const PointTable = () => {
  const [sport] = useState("football"); 

  return (
    <div className='PointTable-container'>
    
    <div className='flex2'><h1 className="title">Point Table</h1></div>
    <div className="point-table-container">
      {sport === "football" && (
        <div className="table football-table">
          
          <table className='pointtable'>
            <thead className='pointtable-head'>
              <tr className='pointtable-heading'>
                <th>Team</th>
                <th>Played</th>
                <th>Won</th>
                <th>Drawn</th>
                <th>Lost</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody className='pointtable-body'>
              {footballData.map((team, index) => (
                <tr key={index}className='pointtable-body-row'>
                  <td className='pointtable-body-rowdata'>{team.team}</td>
                  <td className='pointtable-body-rowdata'>{team.played}</td>
                  <td className='pointtable-body-rowdata'>{team.won}</td>
                  <td className='pointtable-body-rowdata'>{team.drawn}</td>
                  <td className='pointtable-body-rowdata'>{team.lost}</td>
                  <td className='pointtable-body-rowdata'>{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {sport === "cricket" && (
        <div className="table cricket-table">
          <h2>Cricket Points Table</h2>
          <table>
            <thead>
              <tr>
                <th>Team</th>
                <th>Played</th>
                <th>Won</th>
                <th>Lost</th>
                <th>Points</th>
                <th>Net Run Rate</th>
              </tr>
            </thead>
            <tbody>
              {cricketData.map((team, index) => (
                <tr key={index}>
                  <td>{team.team}</td>
                  <td>{team.played}</td>
                  <td>{team.won}</td>
                  <td>{team.lost}</td>
                  <td>{team.points}</td>
                  <td>{team.netRunRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
  );
};

export default PointTable;
