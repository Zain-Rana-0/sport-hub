import ClubsCard from "../components/home/ClubsCards"


export default function Clubs () {

    const showClubs = () => {
        return (
            <div>
                <ClubsCard />
            </div>
        )
    }
    return (
        <>
            <main className="Club_main_container">
                <h1 className="tittle">Clubs</h1>
                {showClubs()}
            </main>
        </>
    )
}