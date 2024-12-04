import './App.css';
import { Movies } from './components/Movies';
import { useMovies } from './hooks/useMovies';
import { useQuery } from './hooks/useQuery';

function App() {
  const { query, setQuery, error } = useQuery();
  const { movies } = useMovies();

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
