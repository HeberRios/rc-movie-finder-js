function MoviesList({ movies }) {
  return (
    <ul className='query-results-container'>
      {movies.length > 0 &&
        movies.map(function (movie) {
          return (
            <li className='movie' key={movie.id}>
              <h3>{movie.title}</h3>
              <span>
                <time dateTime={movie.year}>{movie.year}</time>
              </span>
              <img src={movie.poster} alt={movie.title} />
            </li>
          );
        })}
    </ul>
  );
}

function NoResults() {
  return (
    <span className='no-results'>No results for the specified search</span>
  );
}

export function Movies({ movies }) {
  const hasResults = movies?.length > 0;

  return hasResults ? <MoviesList movies={movies} /> : <NoResults />;
}
