import GradeIcon from "@mui/icons-material/Grade";
import PinDropIcon from "@mui/icons-material/PinDrop";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
// import { cards } from "./cardsdata";

import * as React from "react";
import { useState, useEffect } from "react";
import "./achievement.css";

export default function Clubachievement() {
  const [information, setClubInfo] = useState([]);
  const [matches, setMatches] = useState([
    { id: 1, played: 10, won: 10, lost: 10, draw: 10 },
  ]);
  const [tournaments, setTournaments] = useState([
    { id: 1, played: 10, won: 10, lost: 10 },
  ]);

  useEffect(() => {
    if (Array.isArray(cards)) {
      setClubInfo(cards);
    } else {
      console.error("Cards data is not an array");
    }
  }, []);

  return (
    <div className="clubinfo-achievement">
      <div className="about_details_parent">
        {information.map((info, index) => (
          <div key={info.id || index} className="about_details">
            <img
              className="clublogo"
              src={info?.profile_image || "default_logo.png"}
              alt="Club"
            />
            <h1 className="club-title">{info?.club_name || "Unknown Club"}</h1>
            <p className="info-desc">Founded: {info?.foundedyear || "N/A"}</p>
            <div className="zain">
              <div className="rana">
                <PinDropIcon />
                <p>{info?.location || "Location not available"}</p>
              </div>
              <div className="rana">
                <PermPhoneMsgIcon />
                <p>{info?.contact || "Contact not available"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="achievements_section">
        <h1 className="achievement-title">
          <GradeIcon className="gradeicon" />
          Achievements
          <GradeIcon className="gradeicon" />
        </h1>

        <div className="match_table_container">
          <div className="text-2xl font-bold text-gray-800 px-4">Matches</div>
          <div className="grid gap-8">
            <div className="w-full overflow-x-auto shadow-lg rounded-lg">
              <table className="w-full border-collapse bg-white">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Played
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Won
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Lost
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Draw
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {matches.map((match) => (
                    <tr
                      key={match.id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                        {match.played}
                      </td>
                      <td className="px-6 py-4 text-sm text-green-600">
                        {match.won}
                      </td>
                      <td className="px-6 py-4 text-sm text-red-600">
                        {match.lost}
                      </td>
                      <td className="px-6 py-4 text-sm text-yellow-600">
                        {match.draw}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 px-4">
                Tournaments
              </h2>
              <div className="w-full overflow-x-auto shadow-lg rounded-lg">
                <table className="w-full border-collapse bg-white">
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Played
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Won
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Lost
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {tournaments.map((tournament) => (
                      <tr
                        key={tournament.id}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                          {tournament.played}
                        </td>
                        <td className="px-6 py-4 text-sm text-green-600">
                          {tournament.won}
                        </td>
                        <td className="px-6 py-4 text-sm text-red-600">
                          {tournament.lost}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
