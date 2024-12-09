import { useCallback, useState } from 'react';
import './App.css';
import { Movies } from './components/Movies.jsx';
import { useMovies } from './hooks/useMovies.js';
import { useQuery } from './hooks/useQuery.js';
import debounce from 'just-debounce-it';

function App() {
  const [sort, setSort] = useState(false);
  const { query, setQuery, error } = useQuery();
  const { movies, getMovies, loading } = useMovies({ query, sort });

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

  function handleSort() {
    setSort(!sort);
  }

  return (
    <div className='page'>
      <header className='container'>
        <h1>Movie Finder App</h1>

        <form onSubmit={handleSubmit} className='movies-form'>
          <input
            style={{
              border: ' 2px solid transparent',
              borderColor: error ? 'red' : 'transparent',
            }}
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

        <div className='sort-container'>
          <p>Sort movies by date:</p>
          {/* we create a checkbox input to act as a switch for our sorting,
          when we check the input the sort value will change (handleSort function), 
          initially has a value of false but when we check the box will change 
          to true and vice versa */}
          <input
            type='checkbox'
            name='sort'
            id='sort'
            checked={sort}
            onChange={handleSort}
          />
        </div>

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
