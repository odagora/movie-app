const BASE_URL = 'https://api.themoviedb.org/3';
const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w300';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    'api_key': API_KEY,
  }
});

async function getTrendingMoviesPreview() {
    const { data } = await api(`/trending/movie/day`);
    const movies = data.results;

    trendingMoviesPreviewList.innerHTML = '';
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

    trendingMoviesPreviewList.append(...moviesList)
}

async function getCategoriesPreview() {
  const { data } = await api(`/genre/movie/list`);
  const categories = data.genres;

  categoriesPreviewList.innerHTML = '';
  const categoriesList = [];
  categories.forEach(category => {
    const categoryContainer = document.createElement('div');
    const categoryTitle = document.createElement('h3');
    const categoryTitleName = document.createTextNode(category.name);

    categoryContainer.classList.add('category-container');
    categoryTitle.classList.add('category-title');
    categoryTitle.setAttribute('id', `id${category.id}`)
    categoryTitle.addEventListener('click', () => location.hash = `#category=${category.id}-${category.name}`)
    categoryTitle.appendChild(categoryTitleName);
    categoryContainer.appendChild(categoryTitle);
    categoriesList.push(categoryContainer);
  })
  categoriesPreviewList.append(...categoriesList)
}

async function getMoviesByCategory(id) {
  const { data } = await api(`/discover/movie`, {
    params: {
      with_genres: id,
    }
  });
  const movies = data.results;

  genericSection.innerHTML = '';

  const moviesList = [];
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
  genericSection.append(...moviesList)
}
