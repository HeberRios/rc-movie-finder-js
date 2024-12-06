import { useRef, useState } from 'react';
import { searchMovies } from '../services/movies';

export function useMovies({ query }) {
  const [movies, setMovies] = useState([]);
  const previousSearch = useRef(query);

  const getMovies = async ({ query }) => {
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
