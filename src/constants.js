export const API = {
    ALL_PLAYERS: 'https://run.mocky.io/v3/c7a2c4cf-56d8-44bc-9061-a0c56427675f'
}

export const METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
}

export const PROCESS_MSG = {
    LOADING: 'Loading...',
    STH_HAPPENED: 'Something bad happened'
}

export const table = [
    {
        label: 'Rank',
    },
    {
        label: 'Player',
    },
    {
        label: 'Wins',
        opt: "wins"
    },
    {
        label: 'Losses',
        opt: "losses"
    },
    {
        label: 'Draws',
        opt: "draws"
    },
    {
        label: 'Kills',
        opt: "kills"
    },
    {
        label: 'Deaths',
        opt: "deaths"
    },
    {
        label: 'k/g',
        opt: "killsPerGame"
    },
    {
        label: 'score',
        opt: "score"
    }
]