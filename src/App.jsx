import './App.css';
import { Movies } from './components/Movies.jsx';
import { useMovies } from './hooks/useMovies.js';
import { useQuery } from './hooks/useQuery.js';

function App() {
  const { query, setQuery, error } = useQuery();
  const { movies, getMovies } = useMovies({ query });

  function handleSubmit(e) {
    e.preventDefault();
    // here we use the query state value to search the movies, at the submit event
    getMovies({ query });
  }

  function handleQueryChange(e) {
    const newQuery = e.target.value;

    if (newQuery.startsWith(' ')) {
      return;
    }

    setQuery(newQuery);
    // here we pass the newQuery value to the getMovies function, this because if
    // we use the value of the query state we will get the previous value instead
    // of the current value
    getMovies({ query: newQuery });
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
