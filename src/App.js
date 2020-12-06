import './App.css';
import {API, METHOD, PROCESS_MSG} from './constants';
import useEndpoint from './hooks/userEndpoint';
import PlayerList from './components/PlayerList';

const App = () => {

  const playerList = useEndpoint({
    method: METHOD.GET,
    url: API.ALL_PLAYERS
  });

  return (
    <div className="container">
      {
        (playerList.pending && PROCESS_MSG.LOADING)
        || (playerList.error && PROCESS_MSG.STH_HAPPENED)
        || (playerList.complete && playerList.data && <PlayerList allPlayers={playerList.data} />)
            } 
    </div>
  );
}

export default App;
