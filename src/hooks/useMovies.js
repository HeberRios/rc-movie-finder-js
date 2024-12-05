import { useState } from 'react';
import { searchMovies } from '../services/movies';

export function useMovies({ query }) {
  const [movies, setMovies] = useState([]);

  const getMovies = async ({ query }) => {
    // we remove the function to map the movies that we get from the API,
    // to have that logic not in the custom hook but in the movies.js service
    // this because the hook we are building do not need to process the movies
    // just obtain them from the searchMovies function and then set the new state for
    // the movies variable
    const newMovies = await searchMovies({ query });
    setMovies(newMovies);
  };

  return {
    movies,
    getMovies,
  };
}
