import { api } from "./axiosClient.js";
import * as nodes from '../ui/nodes.js';
import {
  addLoadingMoviesSkeleton,
  addLoadingCategoriesSkeleton,
  addLoadingMovieDetailSkeleton,
  removeLoadingSkeletonContainer
} from "../ui/skeleton.js";
import {
  createCategories,
  createMovies,
   createMovieDetail
} from "../ui/components.js";

let maxPage;
let page = 1;

async function getTrendingMoviesPreview() {
  addLoadingMoviesSkeleton(nodes.trendingMoviesPreviewList, 4);
  const { data } = await api(`/trending/movie/day`);
  const movies = data.results;

  nodes.trendingMoviesPreviewList.innerHTML = '';

  createMovies(movies, nodes.trendingMoviesPreviewList);
  removeLoadingSkeletonContainer(nodes.trendingMoviesPreviewList);
}

async function getCategoriesPreview() {
  addLoadingCategoriesSkeleton(nodes.categoriesPreviewList, 16);
  const { data } = await api(`/genre/movie/list`);
  const categories = data.genres;

  nodes.categoriesPreviewList.innerHTML = '';

  createCategories(categories, nodes.categoriesPreviewList);
  removeLoadingSkeletonContainer(nodes.categoriesPreviewList);
}

async function getMoviesByCategory(id, page = 1) {
  addLoadingMoviesSkeleton(nodes.genericSection, 4);

  const { data } = await api(`/discover/movie`, {
    params: {
      with_genres: id,
      page
    }
  });

  const movies = data.results;
  maxPage = data.total_pages;
  createMovies(movies, nodes.genericSection);
  removeLoadingSkeletonContainer(nodes.genericSection);
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
      createMovies(movies, nodes.genericSection);
    }
  }
}

async function getMoviesBySearch(query) {
  addLoadingMoviesSkeleton(nodes.genericSection, 4);

  const { data } = await api(`/search/movie`, {
    params: {
      query,
      page
    }
  });
  const movies = data.results;
  maxPage = data.total_pages;
  createMovies(movies, nodes.genericSection);
  removeLoadingSkeletonContainer(nodes.genericSection);
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
      createMovies(movies, nodes.genericSection);
    }
  }
}

async function getTrendingMovies() {
  addLoadingMoviesSkeleton(nodes.genericSection, 4);

  const { data } = await api(`/trending/movie/day`, {
    params: {
      page
    }
  });
  const movies = data.results;
  maxPage = data.total_pages;
  createMovies(movies, nodes.genericSection);
  removeLoadingSkeletonContainer(nodes.genericSection);
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
      createMovies(movies, nodes.genericSection);
    }
  }
}

async function getMovieById(id) {
  addLoadingMovieDetailSkeleton(nodes.movieDetails, 4);
  addLoadingCategoriesSkeleton(nodes.movieDetailCategoriesList, 4);
  addLoadingMoviesSkeleton(nodes.relatedMoviesContainer, 4);
  const { data: movie } = await api(`/movie/${id}`);

  createMovieDetail(movie, nodes.movieDetails);
  createCategories(movie.genres, nodes.movieDetailCategoriesList);
  getRelatedMoviesById(movie.id);
  nodes.relatedMoviesTitle.classList.remove('inactive');

  removeLoadingSkeletonContainer(nodes.movieDetails);
}

async function getRelatedMoviesById(id) {
  const { data } = await api(`/movie/${id}/similar`);
  const relatedMovies = data.results;

  nodes.relatedMoviesContainer.innerHTML = '';

  createMovies(relatedMovies, nodes.relatedMoviesContainer);
  removeLoadingSkeletonContainer(nodes.relatedMoviesContainer);
}

export {
  getTrendingMoviesPreview,
  getCategoriesPreview,
  getMoviesByCategory,
  getPaginatedMoviesByCategory,
  getMoviesBySearch,
  getPaginatedMoviesBySearch,
  getTrendingMovies,
  getPaginatedTrendingMovies,
  getMovieById,
  getRelatedMoviesById
};