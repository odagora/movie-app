const $ = (id) => document.querySelector(id);
const $$ = (id) => document.querySelectorAll(id);

//Sections
const headerSection = $("#header");
const trendingPreviewSection = $("#trendingPreview");
const categoriesPreviewSection = $("#categoriesPreview");
const genericSection = $("#genericList");
const movieDetailSection = $("#movieDetail");
const footerSection = $("#footer");

// Lists & Containers
const searchForm = $("#searchForm");
const trendingMoviesPreviewList = $(".trendingPreview-movieList");
const categoriesPreviewList = $(".categoriesPreview-list");
const movieDetailCategoriesList = $(".categories-list");
const relatedMoviesContainer = $(".relatedMovies-scrollContainer");
const movieDetails = $(".movie-details");

// Elements
const headerTitle = $(".header-title");
const arrowBtn = $(".header-arrow");
const headerCategoryTitle = $(".header-title--categoryView");

const searchFormInput = $("#searchForm input");
const searchFormBtn = $("#searchBtn");

const trendingBtn = $(".trendingPreview-btn");

const movieDetailTitle = $(".movieDetail-title");
const movieDetailDescription = $(".movieDetail-description");
const movieDetailScore = $(".movieDetail-score");
const relatedMoviesTitle = $(".relatedMovies-title");