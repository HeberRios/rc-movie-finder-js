function MoviesList({ movies }) {
  return (
    <ul className='query-results-container'>
      {movies.length > 0 &&
        movies.map(function (movie) {
          return (
            <li className='movie' key={movie.imdbID}>
              <h3>{movie.Title}</h3>
              <span>
                <time dateTime={movie.Year}>{movie.Year}</time>
              </span>
              <img src={movie.Poster} alt={movie.Title} />
            </li>
          );
        })}
    </ul>
  );
}

function NoResults() {
  return <span>No results for the specified search</span>;
}

export function Movies({ movies }) {
  const hasResults = movies?.length > 0;

  return hasResults ? <MoviesList movies={movies} /> : <NoResults />;
}
