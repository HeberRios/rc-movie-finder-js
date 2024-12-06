import { useCallback } from 'react';
import './App.css';
import { Movies } from './components/Movies.jsx';
import { useMovies } from './hooks/useMovies.js';
import { useQuery } from './hooks/useQuery.js';
import debounce from 'just-debounce-it';

function App() {
  const { query, setQuery, error } = useQuery();
  const { movies, getMovies } = useMovies({ query });

  // we use the same function expression as the documentation of just-debounce-it
  // but also we use useCallback to only generate the function one time and no generate
  // a new debounce EVERY render of the App component
  const debouncedMovies = useCallback(
    // this query parameter will be provided when the debouncedMovies is called
    // as is the only argument that we will pass, the newQuery (at the call) will be
    // our query parameter and will be used in the getMovies argument as an object with
    // the query property
    debounce(function (query) { // <-- this query parameter
      getMovies({ query });
    }, 350),
    []
  );

  function handleSubmit(e) {
    e.preventDefault();
    getMovies({ query });
  }

  function handleQueryChange(e) {
    const newQuery = e.target.value;

    if (newQuery.startsWith(' ')) {
      return;
    }

    setQuery(newQuery);
    debouncedMovies(newQuery);
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
