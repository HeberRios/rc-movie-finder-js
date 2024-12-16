import { useMemo, useRef, useState } from 'react';
import { searchMovies } from '../services/movies';

export function useMovies({ query, sort }) {
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
      setLoading(true);
      setError(null);
      previousSearch.current = query;
      const newMovies = await searchMovies({ query });
      setMovies(newMovies);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  const sortedMovies = useMemo(
    function () {
      return sort
        ? movies?.toSorted(function (a, b) {
            if (a.year < b.year) {
              return -1;
            } else if (a.year > b.year) {
              return 1;
            } else {
              return 0;
            }
          })
        : movies;
    },
    [sort, movies]
  );

  return {
    movies: sortedMovies,
    getMovies,
    loading,
  };
}
