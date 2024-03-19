
import axios from 'axios';

const API_KEY = '2e34e67511c14a3d880db20cf0570831';
const BASE_URL = 'https://api.rawg.io/api';

export const fetchGames = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/games?key=${API_KEY}`);
    console.log("res:",response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
};

export const fetchGameDetails = async (gameId) => {
  try {
    const response = await axios.get(`${BASE_URL}/games/${gameId}?key=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching game details:', error);
    throw error;
  }
};