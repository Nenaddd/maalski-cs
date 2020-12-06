const SinglePlayer = ({ username, wins, losses, draws, kills, deaths, kdScore, kdPerGame, index }) => {
    return (<div className="single-user">
        <div>{index + 1}#</div>
        <div>{username}</div>
        <div>{wins}</div>
        <div>{losses}</div>
        <div>{draws}</div>
        <div>{kills}</div>
        <div>{deaths}</div>
        <div>{kdPerGame}</div>
        <div>{kdScore}</div>
    </div>)
}

export default SinglePlayer;
