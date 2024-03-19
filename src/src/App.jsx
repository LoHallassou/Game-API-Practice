import React, { useEffect, useState } from 'react';
import { fetchGames } from '../components/Axios';

const GameList = () => {
    const [games, setGames] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedGame, setSelectedGame] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await fetchGames();
          console.log("data:",data);
          // setGames(data.results);
          const gameResults = data.results;
          setData(gameResults);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    const handleSearch = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/games?search=${searchTerm}&key=${API_KEY}`);
        const data = await response.json();
        //setGames(data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error searching games:', error);
        setLoading(false);
      }
    };
  
    const handleGameSelect = async (id) => {
      try {
        const gameDetails = await fetchGameDetails(id);
        setSelectedGame(gameDetails);
      } catch (error) {
        console.error('Error fetching game details:', error);
      }
    };
  
    const handleChange = (event) => {
      setSearchTerm(event.target.value);
      console.log(event.target.value);
    };
  
    return (
      <div>
        <h1>Game List</h1>
        <input type="text" value={searchTerm} onChange={handleChange} placeholder="Search for a game" />
        <button onClick={handleSearch}>Search</button>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {data ? (
            <ul>
            {data.map((game) => (
              <li key={game.id}>{game.name}</li>
            ))}
          </ul>
          ) : (
           <div>No games</div>
           )}
            <ul>
              {games.map((game) => (
                <li key={game.id} onClick={() => handleGameSelect(game.id)}>{game.name}</li>
              ))}
            </ul>
            {selectedGame && (
              <div>
                <h2>{selectedGame.name}</h2>
                <p>Genres: {selectedGame.genres.map(genre => genre.name).join(', ')}</p>
              </div>
           
            )}
          </div>
           
          
        )}

      </div>
    );
  };
  
  export default GameList;