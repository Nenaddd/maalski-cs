import { useEffect, useState } from 'react';
import SinglePlayer from "./SinglePlayer";

const PlayerList = ({ allPlayers }) => {

    const [players, setPlayers] = useState(allPlayers);
    const [selectedFilter, setSelectedFilter] = useState(8);
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [playerInput, setPlayerInput] = useState("");
    const [teamA, setTeamA] = useState([]);
    const [teamB, setTeamB] = useState([]);

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

    const handlePlayerChange = (e) => {
        setPlayerInput(e.target.value);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            addPlayer();
        }
    }

    const handleAddPlayer = () => {
        addPlayer();
    }

    const addPlayer = () => {
        const foundPlayer = players.find(player => player.username.toLowerCase() === playerInput.toLowerCase());
        if (foundPlayer) {
            console.log(foundPlayer);
            const checkIfDuplicate = selectedPlayers.find(aPlayer => foundPlayer.id === aPlayer.id);
            console.log(checkIfDuplicate, "asd");
            if (checkIfDuplicate) {
                alert(`Player already added! ${checkIfDuplicate.username}`);
            } else {
                setSelectedPlayers([...selectedPlayers, foundPlayer]);
            }
        } else {
            alert(`Player not found! Double-check the username`);
        }
        setPlayerInput("");
    }

    const handleCreateTeams = () => {
        if (selectedPlayers.length % 2 !== 0) {
            alert('Make sure you have an even number of players!');
        } else {
            const sortedPlayers = selectedPlayers.sort((a, b) => b.kdScore - a.kdScore);
            const firstTeam = [];
            const secondTeam = [];
            sortedPlayers.forEach((player, index) => {
                if (index === 0 || index === 3 || index === 5 || index === 7 || index === 9 || index === 10 || index === 12 || index === 14) {
                    firstTeam.push(player);
                } else {
                    secondTeam.push(player);
                }
            });
            setSelectedPlayers([]);
            setTeamA(firstTeam);
            setTeamB(secondTeam);
        }

    }

    const handleClear = () => {
        setTeamA([]);
        setTeamB([]);
        setSelectedPlayers([]);
        setPlayerInput("");
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
            <div className="actions">
                <div className="buttons-actions">
                    <div class="input-group">
                        <input type="text" name="text-1542372332072" id="text-1542372332072" value={playerInput} placeholder="Player Name" className="form-control" onChange={handlePlayerChange} onKeyDown={handleKeyDown} />
                        <label for="text-1542372332072">Player Name</label>
                    </div>
                    <button onClick={handleAddPlayer}>Add Player</button>
                    <button className={`create-teams ${selectedPlayers.length > 1 && "show-button"}`} onClick={handleCreateTeams}>Create Teams!</button>
                    {teamA.length > 0 && <button onClick={handleClear}>Clear</button>}
                </div>
                <div>
                    <div className="selected-players">
                        {selectedPlayers.length > 0 && selectedPlayers.map((aPlayer, aIndex) => (
                            <div key={aPlayer.id} className="single-selected-player">
                                <div>{aIndex + 1}#</div>
                                <div className="name">{aPlayer.username}</div>
                            </div>
                        ))}
                    </div>

                    {teamA.length > 0 && <div className="teams-container">
                        <div>
                            <div><strong>Team A</strong></div>
                            {teamA.map((playerFromFirst, i) => (
                                <div key={i}>{playerFromFirst.username}</div>
                            ))}
                        </div>
                        <div className="vs"><strong>vs</strong></div>
                        <div>
                            <div><strong>Team B</strong></div>
                            {teamB.map((playerFromSecond, y) => (
                                <div key={y}>{playerFromSecond.username}</div>
                            ))}
                        </div>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default PlayerList;
