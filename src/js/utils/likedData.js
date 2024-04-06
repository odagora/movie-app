import { likedMoviesListArticle, likedMoviesSection } from "../ui/nodes.js";
import { createMovies } from "../ui/components.js";
import { homePage } from "../routes/navigations.js";

export function likedMovieList() {
  let movies;
  const item = localStorage.getItem('liked-movies');

  return item ? movies = JSON.parse(item) : movies = {};
}

export function likeMovie(movie) {
  const likedMovies = likedMovieList();

  likedMovies[movie.id] ? delete likedMovies[movie.id] : likedMovies[movie.id] = movie

  localStorage.setItem('liked-movies', JSON.stringify(likedMovies));

  if(location.hash === '') {
    homePage();
  }
}

export function getLikedMovies() {
  const likedMovies = likedMovieList();
  const moviesArray = Object.values(likedMovies);

  likedMoviesListArticle.innerHTML = '';

  !moviesArray.length && likedMoviesSection.classList.add('inactive');

  createMovies(moviesArray, likedMoviesListArticle);
}