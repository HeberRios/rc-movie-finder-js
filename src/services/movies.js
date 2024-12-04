const API_KEY = '4287ad07';

export async function searchMovies({ search }) {
  //  first we check if the search is empty, if it is we do not try to fetch the data
  if (search === '') {
    return;
  }

  try {
    // here we have our endpoint to get the movies, we use the api key and search parameters
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`
    );

    const data = response.json();

    // as we already know the movies array is the .Search property
    const movies = data.Search;

    // after we get the data we need to transform it to our convenience
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
    // in case there is a problem in the fetch we throw an error
    throw new Error('Error searching movies', error.message);
  }
}
