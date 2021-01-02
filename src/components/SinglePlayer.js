const SinglePlayer = ({ username, wins, losses, draws, kills, deaths, score, killsPerGame, index }) => (
    <div className="single-user">
        <div>{index + 1}#</div>
        <div>{username}</div>
        <div>{wins}</div>
        <div>{losses}</div>
        <div>{draws}</div>
        <div>{kills}</div>
        <div>{deaths}</div>
        <div>{killsPerGame}</div>
        <div>{score}</div>
    </div>)

export default SinglePlayer;
