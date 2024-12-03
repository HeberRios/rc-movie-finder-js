import { useState, useEffect } from 'react';
import './App.css';
import queryResults from './mocks/query-with-results.json';

function App() {
  const movies = queryResults.Search;
  // we use the useState hook to save the query state
  const [query, setQuery] = useState('');
  // also the error state for the form validation
  const [error, setError] = useState(null);

  // here we use the useEffect to have a react controlled way of validate the form
  // so when de dependency changes (query), this code will be executed
  useEffect(
    function () {
      if (query === '') {
        setError('Please enter a movie title to search!');
        return;
      }

      const queryStart = query.slice(0, 1);
      if (!isNaN(parseFloat(queryStart))) {
        setError('The movie search cannot start with a number');
        return;
      }

      if (query.length < 3) {
        setError('The movie search cannot less than 3 characters');
        return;
      }

      setError(null);
    },
    [query]
  );

  // here we prevent the default behavior of the form submit
  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleQueryChange(e) {
    const newQuery = e.target.value;

    // here if the user enter a blank space in the input, it will be ignored
    if (newQuery.startsWith(' ')) {
      return;
    }

    // if the input is not a blank space, we set the new query value
    setQuery(newQuery);
  }

  return (
    <div className='page'>
      <header className='container'>
        <h1>Movie Finder App</h1>

        <form onSubmit={handleSubmit} className='movies-form'>
          <input
            onChange={handleQueryChange}
            type='text'
            name='query'
            id='query'
            // here we use the value attribute defined as the query value to
            // directly have a relationship between the current input value and
            // the query state (value)
            value={query}
            placeholder='Avengers, Parasite, Django ...'
            className='movie-query-input'
          />

          <button className='submit-btn' type='submit'>
            Search
          </button>
        </form>

        {/* here we use conditional rendering to show or not show the span 
        with the error message depending on the error value */}
        {error && <span className='input-error-msg'>{error}</span>}
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
