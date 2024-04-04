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

const intersectionObserverIsSupported = 'IntersectionObserver' in window

// Skeletons
function addLoadingMoviesSkeleton(container, quantity) {
  const elementsList = [];
  const movieContainer = document.createElement('div');
  const movieImage = document.createElement('img');

  movieContainer.classList.add('movie-container');
  movieImage.classList.add('movie-img', 'loading-skeleton');
  movieContainer.id = 'loading-screen';
  movieContainer.appendChild(movieImage);

  for (let i = 0; i < quantity; i++) {
    elementsList.push(movieContainer.cloneNode(true));
  }
  container.append(...elementsList);
}

function addLoadingCategoriesSkeleton(container, quantity) {
  const elementsList = [];
  const categoryContainer = document.createElement('div');
  const categoryTitle = document.createElement('h3');

  categoryContainer.classList.add('category-container');
  categoryTitle.classList.add('skeleton-text', 'loading-skeleton');
  categoryContainer.id = 'loading-screen';
  categoryContainer.appendChild(categoryTitle);

  for (let i = 0; i < quantity; i++) {
    elementsList.push(categoryContainer.cloneNode(true));
  }

  container.append(...elementsList);
}

function addLoadingMovieDetailSkeleton(container, quantity) {
  const elementsList = [];
  const textContainer = document.createElement('div');
  textContainer.classList.add('skeleton-desc', 'loading-skeleton');
  textContainer.id = 'loading-screen';

  for (let i = 0; i < quantity; i++) {
    elementsList.push(textContainer.cloneNode(true));
  }

  container.append(...elementsList)
}

function removeLoadingSkeletonContainer(container) {
  const nodeList = container.childNodes;
  const nodeArray = [...nodeList];
  nodeArray
    .slice()
    .reverse()
    .forEach(node => {
      if (node.id === 'loading-screen') {
        node.remove();
      }
    }
  )
}

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
  const moviesList = []

  movies.forEach(movie => {
    const movieContainer = document.createElement('div');
    const movieImage = document.createElement('img');
    const movieSrc = movie.poster_path ? `${BASE_IMAGE_URL(300)}${movie.poster_path}` : `https://via.placeholder.com/300x450/5c218a/ffffff?text=${movie.title}`;
    const likeButton = document.createElement('button');

    movieContainer.classList.add('movie-container');
    movieImage.classList.add('movie-img');
    movieImage.setAttribute('data-id', movie.id);
    movieImage.setAttribute('data-title', movie.title);
    likeButton.classList.add('movie-button', 'inactive');

    if (intersectionObserverIsSupported) {
      movieImage.setAttribute('data-src', movieSrc);
      movieImage.setAttribute('data-alt', movie.title);
    } else {
      if (movie.poster_path !== null) {
        movieImage.setAttribute('alt', movie.title);
        movieImage.setAttribute('src', movieSrc);
      }
    }

    likeButton.addEventListener('click', (event) => {
      event.stopPropagation();
      likeButton.classList.toggle('movie-button--liked');
      likeMovie(movie);
    });

    registerImage(movieImage);

    movieContainer.appendChild(movieImage);
    movieContainer.appendChild(likeButton);
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

function createButtonLoadMore(container) {
  const loadMoreButton = document.createElement('button');

  loadMoreButton.innerHTML = 'Cargar más';
  loadMoreButton.classList.add('button-load-more');
  container.appendChild(loadMoreButton);

  return loadMoreButton;
}

function likedMovieList() {
  let movies;
  const item = localStorage.getItem('liked-movies');

  return item ? movies = JSON.parse(item) : movies = {};
}

function likeMovie(movie) {
  const likedMovies = likedMovieList();

  likedMovies[movie.id] ? delete likedMovies[movie.id] : likedMovies[movie.id] = movie

  localStorage.setItem('liked-movies', JSON.stringify(likedMovies));
}

// API calls
async function getTrendingMoviesPreview() {
  addLoadingMoviesSkeleton(trendingMoviesPreviewList, 4);
  const { data } = await api(`/trending/movie/day`);
  const movies = data.results;

  trendingMoviesPreviewList.innerHTML = '';

  createMovies(movies, trendingMoviesPreviewList);
  removeLoadingSkeletonContainer(trendingMoviesPreviewList);
}

async function getCategoriesPreview() {
  addLoadingCategoriesSkeleton(categoriesPreviewList, 16);
  const { data } = await api(`/genre/movie/list`);
  const categories = data.genres;

  categoriesPreviewList.innerHTML = '';

  createCategories(categories, categoriesPreviewList);
  removeLoadingSkeletonContainer(categoriesPreviewList);
}

async function getMoviesByCategory(id, page = 1) {
  addLoadingMoviesSkeleton(genericSection, 4);

  const { data } = await api(`/discover/movie`, {
    params: {
      with_genres: id,
      page
    }
  });

  const movies = data.results;
  maxPage = data.total_pages;
  createMovies(movies, genericSection);
  removeLoadingSkeletonContainer(genericSection);
}

function getPaginatedMoviesByCategory(id) {
  return async function() {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
    const pageIsNotMax = page < maxPage;

    if (scrollIsBottom && pageIsNotMax) {
      page++;
      const { data } = await api(`/discover/movie`, {
        params: {
          with_genres: id,
          page
        }
      });
      const movies = data.results;
      createMovies(movies, genericSection);
    }
  }
}

async function getMoviesBySearch(query) {
  addLoadingMoviesSkeleton(genericSection, 4);

  const { data } = await api(`/search/movie`, {
    params: {
      query,
      page
    }
  });
  const movies = data.results;
  maxPage = data.total_pages;
  createMovies(movies, genericSection);
  removeLoadingSkeletonContainer(genericSection);
}

function getPaginatedMoviesBySearch(query) {
  return async function() {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    const scrollIsBottom = (scrollTop + clientHeight) >= scrollHeight - 15;
    const pageIsNotMax = page < maxPage;

    if (scrollIsBottom && pageIsNotMax) {
      page++;
      const { data } = await api(`/search/movie`, {
        params: {
          query,
          page
        }
      });
      const movies = data.results;
      createMovies(movies, genericSection);
    }
  }
}

async function getTrendingMovies() {
  addLoadingMoviesSkeleton(genericSection, 4);

  const { data } = await api(`/trending/movie/day`, {
    params: {
      page
    }
  });
  const movies = data.results;
  maxPage = data.total_pages;
  createMovies(movies, genericSection);
  removeLoadingSkeletonContainer(genericSection);
}

function getPaginatedTrendingMovies() {
  return async function() {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    const scrollIsBottom = (scrollTop + clientHeight) >= scrollHeight - 15;
    const pageIsNotMax = page < maxPage;

    if (scrollIsBottom && pageIsNotMax) {
      page++;
      const { data } = await api(`/trending/movie/day`, {
        params: {
          page
        }
      });
      const movies = data.results;
      createMovies(movies, genericSection);
    }
  }
}

async function getMovieById(id) {
  addLoadingMovieDetailSkeleton(movieDetails, 4);
  addLoadingCategoriesSkeleton(movieDetailCategoriesList, 4);
  addLoadingMoviesSkeleton(relatedMoviesContainer, 4);
  const { data: movie } = await api(`/movie/${id}`);

  createMovieDetail(movie, movieDetails);
  createCategories(movie.genres, movieDetailCategoriesList);
  getRelatedMoviesById(movie.id);

  removeLoadingSkeletonContainer(movieDetails);
}

async function getRelatedMoviesById(id) {
  const { data } = await api(`/movie/${id}/similar`);
  const relatedMovies = data.results;

  relatedMoviesContainer.innerHTML = '';

  createMovies(relatedMovies, relatedMoviesContainer);
  removeLoadingSkeletonContainer(relatedMoviesContainer);
}