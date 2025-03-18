import { useState } from "react";
import "./Clubteam.css";

export default function Clubteam() {
  const [team, setTeam] = useState({
    title: "Shaheen FC",
    name: "Team Name",
    logo: "teamlogo.png",
  });
  const [players, setPlayers] = useState([
    {
      id: 1,
      firstname: "Mark",
      lastname: "Otto",
      position: "@mdo",
      state: "active",
    },
    {
      id: 2,
      firstname: "Jacob",
      lastname: "Thornton",
      position: "@fat",
      state: "active",
    },
    {
      id: 3,
      firstname: "Larry",
      lastname: "Bird",
      position: "@twitter",
      state: "inactive",
    },
    {
      id: 4,
      firstname: "John",
      lastname: "Doe",
      position: "@john",
      state: "active",
    },
    {
      id: 5,
      firstname: "Paul",
      lastname: "Smith",
      position: "@paul",
      state: "active",
    },
  ]);

  return (
    <section className="club-container">
      <div className="clubinfo-container">
        <div className="clubinfo-icons">
          <img className="clubinfo-img" src="logo.png" alt="cover image" />
        </div>

        <div className="team">
          <div className="team-section">
            <div className="team_title_bar">
              <h1 className="team_title">{team.name}</h1>
            </div>
            <div className="w-full overflow-x-auto shadow-lg rounded-lg">
              <table className="w-full border-collapse bg-white">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      First Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Last Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      State
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {players.map((player) => (
                    <tr
                      key={player.id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {player.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {player.firstname}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {player.lastname}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {player.position}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {player.state}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
