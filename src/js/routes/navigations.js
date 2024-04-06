import * as nodes from "../ui/nodes.js";
import { getLikedMovies } from "../utils/likedData.js";
import {
  getTrendingMoviesPreview,
  getCategoriesPreview,
  getMoviesByCategory,
  getPaginatedMoviesByCategory,
  getMovieById,
  getTrendingMovies,
  getPaginatedTrendingMovies,
  getMoviesBySearch,
  getPaginatedMoviesBySearch
} from "../services/api.js";

import { removeInfiniteScroll, smoothScroll } from "../utils/smoothscroll.js";

let infiniteScroll;

function navigation() {
  removeInfiniteScroll(infiniteScroll);
  location.hash.startsWith('#trends') ? trendsPage() :
  location.hash.startsWith('#search') ? searchPage() :
  location.hash.startsWith('#movie') ? movieDetailsPage() :
  location.hash.startsWith('#category') ? categoriesPage() :
  homePage()

  smoothScroll();

  if (infiniteScroll) {
    window.addEventListener('scroll', infiniteScroll, { passive: false });
  }
}

function homePage() {
  nodes.headerSection.classList.remove('header-container--long');
  nodes.headerSection.style.background = '';
  nodes.arrowBtn.classList.add('inactive');
  nodes.headerTitle.classList.remove('inactive');
  nodes.headerCategoryTitle.classList.add('inactive');
  nodes.searchForm.classList.remove('inactive');
  nodes.trendingPreviewSection.classList.remove('inactive');
  nodes.categoriesPreviewSection.classList.remove('inactive');
  nodes.genericSection.classList.add('inactive');
  nodes.movieDetailSection.classList.add('inactive');
  nodes.footerSection.classList.remove('inactive');
  nodes.likedMoviesSection.classList.remove('inactive');
  nodes.languageMenu.classList.remove('inactive');

  nodes.genericSection.innerHTML = '';
  nodes.searchFormInput.value = '';
  nodes.trendingMoviesPreviewList.innerHTML = '';
  nodes.categoriesPreviewList.innerHTML = '';

  nodes.languageMenu.value = localStorage.getItem('language')?.split('-')[0] || 'en';

  getTrendingMoviesPreview();
  getCategoriesPreview();
  getLikedMovies();
}

function categoriesPage() {
  nodes.headerSection.classList.remove('header-container--long');
  nodes.headerSection.style.background = '';
  nodes.arrowBtn.classList.remove('inactive');
  nodes.headerTitle.classList.add('inactive');
  nodes.arrowBtn.classList.remove('header-arrow--white');
  nodes.headerCategoryTitle.classList.remove('inactive');
  nodes.searchForm.classList.add('inactive');
  nodes.trendingPreviewSection.classList.add('inactive');
  nodes.categoriesPreviewSection.classList.add('inactive');
  nodes.genericSection.classList.remove('inactive');
  nodes.movieDetailSection.classList.add('inactive');
  nodes.likedMoviesSection.classList.add('inactive');
  nodes.languageMenu.classList.add('inactive');

  nodes.genericSection.innerHTML = '';
  nodes.headerCategoryTitle.innerHTML = '';

  const [_, categoryUrl] = location.hash.split('=');
  const [categoryId, categoryName] = categoryUrl.split('-');
  const categoryTitle = decodeURI(categoryName);

  nodes.headerCategoryTitle.textContent = categoryTitle.charAt(0).toUpperCase() + categoryTitle.slice(1);

  getMoviesByCategory(categoryId);

  infiniteScroll = getPaginatedMoviesByCategory(categoryId);
}

function movieDetailsPage() {
  nodes.headerSection.classList.add('header-container--long');
  nodes.headerSection.style.background = '';
  nodes.arrowBtn.classList.remove('inactive');
  nodes.arrowBtn.classList.add('header-arrow--white');
  nodes.headerTitle.classList.add('inactive');
  nodes.headerCategoryTitle.classList.add('inactive');
  nodes.searchForm.classList.add('inactive');
  nodes.trendingPreviewSection.classList.add('inactive');
  nodes.categoriesPreviewSection.classList.add('inactive');
  nodes.genericSection.classList.add('inactive');
  nodes.movieDetailSection.classList.remove('inactive');
  nodes.footerSection.classList.add('inactive');
  nodes.likedMoviesSection.classList.add('inactive');
  nodes.relatedMoviesTitle.classList.add('inactive');
  nodes.languageMenu.classList.add('inactive');

  nodes.movieDetails.innerHTML = '';
  nodes.movieDetailCategoriesList.innerHTML = '';
  nodes.relatedMoviesContainer.innerHTML = '';

  const [_, movieId] = location.hash.split('=');
  getMovieById(movieId);
}

function trendsPage() {
  nodes.headerSection.classList.remove('header-container--long');
  nodes.headerSection.style.background = '';
  nodes.arrowBtn.classList.remove('inactive');
  nodes.arrowBtn.classList.remove('header-arrow--white');
  nodes.headerTitle.classList.add('inactive');
  nodes.headerCategoryTitle.classList.remove('inactive');
  nodes.searchForm.classList.remove('inactive');
  nodes.trendingPreviewSection.classList.add('inactive');
  nodes.categoriesPreviewSection.classList.add('inactive');
  nodes.genericSection.classList.remove('inactive');
  nodes.movieDetailSection.classList.add('inactive');
  nodes.likedMoviesSection.classList.add('inactive');
  nodes.languageMenu.classList.add('inactive');

  nodes.genericSection.innerHTML = '';
  nodes.headerCategoryTitle.textContent = 'Tendencias';
  getTrendingMovies();

  infiniteScroll = getPaginatedTrendingMovies();
}

function searchPage() {
  nodes.headerSection.classList.remove('header-container--long');
  nodes.headerSection.style.background = '';
  nodes.arrowBtn.classList.remove('inactive');
  nodes.arrowBtn.classList.remove('header-arrow--white');
  nodes.headerTitle.classList.add('inactive');
  nodes.headerCategoryTitle.classList.add('inactive');
  nodes.searchForm.classList.remove('inactive');
  nodes.trendingPreviewSection.classList.add('inactive');
  nodes.categoriesPreviewSection.classList.add('inactive');
  nodes.genericSection.classList.remove('inactive');
  nodes.movieDetailSection.classList.add('inactive');
  nodes.likedMoviesSection.classList.add('inactive');
  nodes.languageMenu.classList.add('inactive');

  nodes.genericSection.innerHTML = '';

  const [_, query] = location.hash.split('=');
  getMoviesBySearch(query);

  infiniteScroll = getPaginatedMoviesBySearch(query);
}

function error404() {
  console.log('Page not found');
}

export {
  homePage,
  navigation,
  infiniteScroll
}