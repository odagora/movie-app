//Sections
const headerSection = document.querySelector("#header");
const trendingPreviewSection = document.querySelector("#trendingPreview");
const categoriesPreviewSection = document.querySelector("#categoriesPreview");
const genericSection = document.querySelector("#genericList");
const movieDetailSection = document.querySelector("#movieDetail");
const footerSection = document.querySelector("#footer");
const likedMoviesSection = document.querySelector("#likedMovies");
const likedMoviesListArticle = document.querySelector(".liked-movieList");

// Lists & Containers
const searchForm = document.querySelector("#searchForm");
const trendingMoviesPreviewList = document.querySelector(".trendingPreview-movieList");
const categoriesPreviewList = document.querySelector(".categoriesPreview-list");
const movieDetailCategoriesList = document.querySelector(".categories-list");
const relatedMoviesContainer = document.querySelector(".relatedMovies-scrollContainer");
const movieDetails = document.querySelector(".movie-details");

// Elements
const headerTitle = document.querySelector(".header-title");
const arrowBtn = document.querySelector(".header-arrow");
const headerCategoryTitle = document.querySelector(".header-title--categoryView");

const searchFormInput = document.querySelector("#searchForm input");
const searchFormBtn = document.querySelector("#searchBtn");

const trendingBtn = document.querySelector(".trendingPreview-btn");

const movieDetailTitle = document.querySelector(".movieDetail-title");
const movieDetailDescription = document.querySelector(".movieDetail-description");
const movieDetailScore = document.querySelector(".movieDetail-score");
const relatedMoviesTitle = document.querySelector(".relatedMovies-title");
const languageMenu = document.querySelector('#language');

export {
  headerSection,
  trendingPreviewSection,
  categoriesPreviewSection,
  genericSection,
  movieDetailSection,
  footerSection,
  likedMoviesSection,
  likedMoviesListArticle,
  searchForm,
  trendingMoviesPreviewList,
  categoriesPreviewList,
  movieDetailCategoriesList,
  relatedMoviesContainer,
  movieDetails,
  headerTitle,
  arrowBtn,
  headerCategoryTitle,
  searchFormInput,
  searchFormBtn,
  trendingBtn,
  movieDetailTitle,
  movieDetailDescription,
  movieDetailScore,
  relatedMoviesTitle,
  languageMenu
}