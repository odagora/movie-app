const BASE_URL = 'https://api.themoviedb.org/3';
const BASE_IMAGE_URL = (value) => `https://image.tmdb.org/t/p/w${value}`;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    'api_key': API_KEY,
  }
});

// Events
const moviesNodes = [
  trendingMoviesPreviewList,
  genericSection,
  relatedMoviesContainer
];

const categoriesNodes = [
  categoriesPreviewList,
];

moviesNodes.forEach(node => node.addEventListener('click', (event) => {
  if (event.target.nodeName === 'IMG') {
    const id = event.target.dataset.id;
    const title = event.target.dataset.title;

    location.hash = `#movie=${id}-${title}`;
  }
}));

categoriesNodes.forEach(node => node.addEventListener('click', (event) => {
  if (event.target.nodeName === 'H3') {
    const id = event.target.dataset.id;
    const name = event.target.dataset.name;

    location.hash = `#category=${id}-${name}`;
  }
}))

// Utils
function createMovies(movies, container) {
  container.innerHTML = '';
    const moviesList = []

    movies.forEach(movie => {
      const movieContainer = document.createElement('div');
      const movieImage = document.createElement('img');

      movieContainer.classList.add('movie-container');
      movieImage.classList.add('movie-img');
      movieImage.setAttribute('alt', movie.title);
      movieImage.setAttribute('src', `${BASE_IMAGE_URL(300)}${movie.poster_path}`);

      movieImage.setAttribute('data-id', movie.id);
      movieImage.setAttribute('data-title', movie.title);

      movieContainer.appendChild(movieImage);
      moviesList.push(movieContainer);
    })

    container.append(...moviesList)
}

function createCategories(categories, container) {
  container.innerHTML = '';
  const categoriesList = [];

  categories.forEach(category => {
    const categoryContainer = document.createElement('div');
    const categoryTitle = document.createElement('h3');
    const categoryTitleName = document.createTextNode(category.name);

    categoryContainer.classList.add('category-container');
    categoryTitle.classList.add('category-title');
    categoryTitle.setAttribute('id', `id${category.id}`)
    categoryTitle.setAttribute('data-id', category.id);
    categoryTitle.setAttribute('data-name', category.name);

    categoryTitle.appendChild(categoryTitleName);
    categoryContainer.appendChild(categoryTitle);
    categoriesList.push(categoryContainer);
  })
  container.append(...categoriesList)
}

function createMovieDetail(movie, container) {
  container.innerHTML = '';
  const title = document.createElement('h1');
  const score = document.createElement('span');
  const description = document.createElement('p');
  const movieUrl = `${BASE_IMAGE_URL(500)}${movie.poster_path}`

  title.classList.add('movieDetail-title');
  score.classList.add('movieDetail-score');
  description.classList.add('movieDetail-description');

  container.prepend(title, score, description)

  headerSection.style.background = `
    linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.35) 19.27%,
      rgba(0, 0, 0, 0) 29.17%
    ),
    url(${movieUrl})
  `;

  title.textContent = movie.title;
  score.textContent = movie.vote_average;
  description.textContent = movie.overview;
}

function createSearchMovies(movies, container) {
  container.innerHTML = '';
  const moviesList = [];

  movies.forEach(movie => {
    const movieContainer = document.createElement('div');
    const movieImage = document.createElement('img');

    movieContainer.classList.add('movie-container');
    movieImage.classList.add('movie-img');
    movieImage.setAttribute('alt', movie.title);
    movieImage.setAttribute('src', `${BASE_IMAGE_URL(500)}${movie.poster_path}`);
    movieImage.addEventListener('click', () => location.hash = `#movie=${movie.id}`);
    movieContainer.appendChild(movieImage);
    moviesList.push(movieContainer);
  })
}

// API calls
async function getTrendingMoviesPreview() {
    const { data } = await api(`/trending/movie/day`);
    const movies = data.results;

    createMovies(movies, trendingMoviesPreviewList);
}

async function getCategoriesPreview() {
  const { data } = await api(`/genre/movie/list`);
  const categories = data.genres;

  createCategories(categories, categoriesPreviewList);
}

async function getMoviesByCategory(id) {
  const { data } = await api(`/discover/movie`, {
    params: {
      with_genres: id,
    }
  });
  const movies = data.results;

  createMovies(movies, genericSection);
}

async function getMoviesBySearch(query) {
  const { data } = await api(`/search/movie`, {
    params: {
      query,
    }
  });
  const movies = data.results;

  createMovies(movies, genericSection);
}

async function getTrendingMovies() {
  const { data } = await api(`/trending/movie/day`);
  const movies = data.results;

  createMovies(movies, genericSection);
}

async function getMovieById(id) {
  const { data: movie } = await api(`/movie/${id}`);

  createMovieDetail(movie, movieDetails);
  createCategories(movie.genres, movieDetailCategoriesList);
  getRelatedMoviesById(movie.id);
}

async function getRelatedMoviesById(id) {
  const { data } = await api(`/movie/${id}/similar`);
  const relatedMovies = data.results;
  console.log(relatedMovies);

  createMovies(relatedMovies, relatedMoviesContainer);
}