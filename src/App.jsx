import './App.css';
import queryResults from './mocks/query-with-results.json';
import { Movies } from './components/Movies';
import { useQuery } from './hooks/useQuery';

function App() {
  const movies = queryResults.Search;
  const { query, setQuery, error } = useQuery();

  // here we process the array we get from the api, to not depend on
  // how the api give us the data, so here we return an array with
  // every item in the array being the same but with its properties
  // renamed
  const mappedMovies = movies?.map(function (movie) {
    return {
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    };
  });

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

        <Movies movies={mappedMovies}></Movies>
      </main>
    </div>
  );
}

export default App;
