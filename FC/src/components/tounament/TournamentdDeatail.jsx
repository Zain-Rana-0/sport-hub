import "./Tournament.css";
import PointTable from "./Team-standing";
import TeamCard from "./Team-participating";
import TournamentSchedule from "./TournamentSchedule";
import "./Tournamentdetail.css";
import { useState } from "react";

export default function Tournamentsdetail()
{
const [activeTab, setActiveTab] = useState(1)
    return(
        <div className="toggletabs">
            <div className="toggletabs-button">
                <button className={` togglebutton ${activeTab === 1 ? "active " : ""}`} onClick={() => setActiveTab(1)}>Teams</button>
                <button className={` togglebutton ${activeTab === 2 ? "active " : ""}`} onClick={() => setActiveTab(2)}>Schedule</button>
                <button className={` togglebutton ${activeTab === 3 ? "active " : ""}`} onClick={() => setActiveTab(3)}>Point Table</button>
            </div>
            <div className="toggletabs-portion">
            {activeTab === 1 && <TeamCard />}
            {activeTab === 2 && <TournamentSchedule />}
            {activeTab === 3 && <PointTable />}
            </div>

        </div>
    )
}