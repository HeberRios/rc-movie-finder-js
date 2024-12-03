import { useState, useEffect, useRef } from 'react';
import './App.css';
import queryResults from './mocks/query-with-results.json';

function App() {
  const movies = queryResults.Search;
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  // here we are using the useRef hook to save a value that will persist between renders
  const userFirstInput = useRef(true);

  useEffect(
    function () {
      // here we are checking if the user has modified the query input,
      // the userFirstInput will be true at the first render of the app but
      // if the query changes, will be changed to false and will start to validate
      // the entered value, so if the query value is equal to '' then the user has
      // not entered a value to search but if is not an empty string the user has
      // already entered a value to search so will be validated in the next if statements
      if (userFirstInput.current) {
        userFirstInput.current = query === '';
        console.log(userFirstInput.current);
        return;
      }

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

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleQueryChange(e) {
    const newQuery = e.target.value;

    if (newQuery.startsWith(' ')) {
      return;
    }

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
