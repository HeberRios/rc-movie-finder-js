import { useRef, useState } from 'react';
import { searchMovies } from '../services/movies';

export function useMovies({ query }) {
  const [movies, setMovies] = useState([]);
  const previousSearch = useRef(query);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getMovies = async ({ query }) => {
    if (previousSearch.current === query) {
      console.log('Search denied, equal current query than the previous one');
      return;
    }

    try {
      // at the try block we set the loading to true, but when we get and set the new movies
      // we set it to false
      // loading started
      setLoading(true);
      setError(null);
      previousSearch.current = query;
      const newMovies = await searchMovies({ query });
      setMovies(newMovies);
      // loading ended
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  return {
    movies,
    getMovies,
    loading,
  };
}
