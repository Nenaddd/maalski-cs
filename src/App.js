import { useEffect, useState } from 'react';
import './App.css';
// import {API, METHOD, PROCESS_MSG} from './constants';
// import useEndpoint from './hooks/userEndpoint';
import PlayerList from './components/PlayerList';
import data from './data.json';

const App = () => {
  const [playerList, setPlayerList] = useState([]);
  // use this approach once we have a real data
  // const playerList = useEndpoint({
  //   method: METHOD.GET,
  //   url: API.ALL_PLAYERS
  // });

  useEffect(() => {
    setPlayerList(data);
}, [playerList]);

  return (
    // <div className="container">
    //   {
    //     (playerList.pending && PROCESS_MSG.LOADING)
    //     || (playerList.error && PROCESS_MSG.STH_HAPPENED)
    //     || (playerList.complete && playerList.data && <PlayerList allPlayers={playerList.data} />)
    //         } 
    // </div>

<div className="container">
  {playerList.length > 0 && <PlayerList allPlayers={playerList} /> }
</div>
  );
}

export default App;
