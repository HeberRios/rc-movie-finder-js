const API_KEY = '4287ad07';

export async function searchMovies({ search }) {
  if (search === '') {
    return;
  }

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`
    );

    const data = response.json();

    const movies = data.Search;

    const mappedMovies = movies.map(function (movie) {
      return {
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster,
      };
    });

    return mappedMovies;
  } catch (error) {
    throw new Error('Error searching movies', error.message);
  }
}
