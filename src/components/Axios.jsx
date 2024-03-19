import { useState, useEffect } from "react";
import axios from 'axios';

const axios = () => {
  const [games, setGames] = useState([])
  useEffect(() => {
    axios.get("https://api.igdb.com/v4/games")
        .then((res) => {
            setGames(res.data)
        })
        .then((data)=>{

        })
      }, [])
    }

return(
  <div>
    {games.map((game) => ()
    )

    }
  </div>
 
)