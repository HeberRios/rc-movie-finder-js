import queryResults from '../mocks/query-with-results.json';

export function useMovies() {
  const movies = queryResults.Search;

  const mappedMovies = movies?.map(function (movie) {
    return {
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    };
  });

  return {
    movies: mappedMovies,
  };
}
