import './App.css';

function App() {
  return (
    <div className='page'>
      <header>
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
    </div>
  );
}

export default App;
