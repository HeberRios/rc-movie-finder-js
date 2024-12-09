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

  const sortedMovies = useMemo(
    // we implement the useMemo hook to save the value of sort between renders and not
    // calculate it again and again in every render, the dependencies are sort and movies
    // so when any of those change this calculation will occur again, and also depending on the
    // sort value (true or false) will sort or not sort the movies
    function () {
      return sort
        ? // here we add the optional chaining to prevent the app to crash
          // with a movies undefined value
          movies?.toSorted(function (a, b) {
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
