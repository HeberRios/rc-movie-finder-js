import { useState, useEffect, useRef } from 'react';
import './App.css';
import queryResults from './mocks/query-with-results.json';
import { Movies } from './components/Movies';

function App() {
  const movies = queryResults.Search;
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const userFirstInput = useRef(true);

  useEffect(
    function () {
      if (userFirstInput.current) {
        userFirstInput.current = query === '';
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

        <Movies movies={movies}></Movies>
      </main>
    </div>
  );
}

export default App;
