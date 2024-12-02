import './App.css';
import queryResults from './mocks/query-with-results.json';

function App() {
  const movies = queryResults.Search;

  return (
    <div className='page'>
      <header className='container'>
        <h1>Movie Finder App</h1>
        <form className='movies-form'>
          <input
            type='text'
            name='query'
            id='query'
            placeholder='Avengers, Parasite, Django ...'
            className='movie-query-input'
          />
          <button type='submit'>Search</button>
        </form>
      </header>

      <main className='container'>
        <h2>Results</h2>

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
      </main>
    </div>
  );
}

export default App;
