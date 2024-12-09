import { useCallback } from 'react';
import './App.css';
import { Movies } from './components/Movies.jsx';
import { useMovies } from './hooks/useMovies.js';
import { useQuery } from './hooks/useQuery.js';
import debounce from 'just-debounce-it';

function App() {
  const { query, setQuery, error } = useQuery();
  const { movies, getMovies, loading } = useMovies({ query });

  const debouncedMovies = useCallback(
    debounce(function (query) {
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

        {/* here with a ternary operator we are checking if the loading is active, if yes
        a span with the text: "loading movies..." will appear but if the loading is done
        then the Movies component will be displayed*/}
        {loading ? (
          <span className='loading-text'>Loading movies...</span>
        ) : (
          <Movies movies={movies}></Movies>
        )}
      </main>
    </div>
  );
}

export default App;
