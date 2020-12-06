import { useEffect, useState } from 'react';
import SinglePlayer from "./SinglePlayer";

const PlayerList = ({ allPlayers }) => {

    const [players, setPlayers] = useState(allPlayers);
    const [selectedFilter, setSelectedFilter] = useState(8);

    useEffect(() => {
        let clonedPlayers = [...players];
        clonedPlayers.forEach(player => {
            player.kdScore = calculateKdScore(player.kills, player.deaths);
            player.kdPerGame = getKdPerGame(player.kills, (player.wins + player.losses + player.draws));
        });
        clonedPlayers.sort((a, b) => b.kdScore - a.kdScore);
        setPlayers(clonedPlayers);
    }, []);

    const calculateKdScore = (k, d) => Math.round(((k / d) + Number.EPSILON) * 100) / 100 || 0;

    const getKdPerGame = (stats, numberOfGames) => Math.round((stats / numberOfGames)) || 0;

    const table = ['Rank', 'Player', 'Wins', 'Losses', 'Draws', 'Kills', 'Deaths', 'k/g', 'k/d'];

    const handleSortClick = (label, index) => {
        let clone = [...players];
        let sortBy = ""
        if (label === "k/d") {
            sortBy = "kdScore";
            clone.sort((a, b) => b.kdScore - a.kdScore);
        } else if (label === "k/g") {
            sortBy = "kdPerGame";
            clone.sort((a, b) => b.kdPerGame - a.kdPerGame);
        } else if (label === "Kills") {
            sortBy = "kdPerGame";
            clone.sort((a, b) => b.kills - a.kills);
        } else if (label === "Deaths") {
            sortBy = "deaths";
        } else if (label === "Wins") {
            sortBy = "wins";
        } else if (label === "Losses") {
            sortBy = "losses";
        } else if (label === "Draws") {
            sortBy = "draws";
        } else {
            console.log("Feature not implemented");
            return;
        }
        clone.sort((a, b) => b[sortBy] - a[sortBy]);
        setPlayers(clone);
        setSelectedFilter(index);
    }

    return (
        <div className="user-container">
            <div className="single-user">
                {table.map((label, index) => <div key={index} onClick={() => handleSortClick(label, index)} className={`${selectedFilter === index && "active"}`}>{label}</div>)}
            </div>
            <div className="row">
                {players.map((player, index) => (
                    <SinglePlayer username={player.username}
                        wins={player.wins}
                        losses={player.losses}
                        draws={player.draws}
                        kills={player.kills}
                        deaths={player.deaths}
                        kdPerGame={player.kdPerGame}
                        kdScore={player.kdScore}
                        index={index}
                        key={player.id}
                    />
                ))}
            </div>
        </div>
    )
}

export default PlayerList;
