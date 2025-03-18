import Sponsor from "./Sponsor";
import TournamentAboutCard from "./Tournament-about-card";
import Tournamentsdetail from "./TournamentdDeatail";
import "./Tournament.css";
import { useState } from "react";



export default function Tournament() {
    const [titlename, setTitlename] = useState("Cricket Champions League 2024")
   
    return(
        <div>
        <h1 className="tournament-title" 
        type="text"
        value={titlename} 
        >{titlename}</h1>
        <TournamentAboutCard/>
        <Tournamentsdetail/>
        <Sponsor/>
    </div>
    )
}