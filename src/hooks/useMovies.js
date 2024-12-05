import { useRef, useState } from 'react';
import { searchMovies } from '../services/movies';

export function useMovies({ query }) {
  const [movies, setMovies] = useState([]);
  // we use the useRef hook to save a value that will persist between renders
  // this value being the previous search of the user
  const previousSearch = useRef(query);

  const getMovies = async ({ query }) => {
    // when the previousSearch is equal to the new one, no search will be made
    if (previousSearch.current === query) {
      console.log('Search denied, equal current query than the previous one');
      return;
    }

    previousSearch.current = query;
    const newMovies = await searchMovies({ query });
    setMovies(newMovies);
  };

  return {
    movies,
    getMovies,
  };
}
