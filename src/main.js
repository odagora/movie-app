const BASE_URL = 'https://api.themoviedb.org/3';
const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w300';

async function getTrendingMoviesPreview() {
    const res = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
    const data = await res.json();
    const movies = data.results;

    const movieTrendingPreviewContainer = document.querySelector('.trendingPreview-movieList')
    const moviesList = []
    movies.forEach(movie => {
      const movieContainer = document.createElement('div');
      const movieImage = document.createElement('img');

      movieContainer.classList.add('movie-container');
      movieImage.classList.add('movie-img');
      movieImage.setAttribute('alt', movie.title);
      movieImage.setAttribute('src', `${BASE_IMAGE_URL}/${movie.poster_path}`);
      movieContainer.appendChild(movieImage);
      moviesList.push(movieContainer);
    })

    movieTrendingPreviewContainer.append(...moviesList)
}

getTrendingMoviesPreview();