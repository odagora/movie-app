import { likedMovieList, likeMovie } from "@utils/likedData.js";
import { registerImage } from "@utils/lazyloading.js";
import { headerSection } from "@ui/nodes.js";

const BASE_IMAGE_URL = (value) => `https://image.tmdb.org/t/p/w${value}`;

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

    const intersectionObserverIsSupported = 'IntersectionObserver' in window

    if (intersectionObserverIsSupported) {
      movieImage.setAttribute('data-src', movieSrc);
      movieImage.setAttribute('data-alt', movie.title);
    } else {
      if (movie.poster_path !== null) {
        movieImage.setAttribute('alt', movie.title);
        movieImage.setAttribute('src', movieSrc);
      }
    }

    likedMovieList()[movie.id] && likeButton.classList.toggle('movie-button--liked');

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

export {
  createMovies,
  createCategories,
  createMovieDetail,
  createSearchMovies,
  createButtonLoadMore
}