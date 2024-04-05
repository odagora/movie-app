let maxPage;
let page = 1;
let infiniteScroll;
const languageMap = {
  es: 'es-ES',
  fr: 'fr-FR',
}

window.addEventListener('DOMContentLoaded', navigation, false);
window.addEventListener('hashchange', navigation, false);
window.addEventListener('scroll', infiniteScroll, false);

searchFormBtn.addEventListener('click', () => {
  location.hash = `#search=${searchFormInput.value.trim()}`;
})

trendingBtn.addEventListener('click', () => {
  location.hash = '#trends';
})

arrowBtn.addEventListener('click', () => {
  document.domain !== '127.0.0.1' ? location.hash = '#home': history.back();
})

languageMenu.addEventListener('change', async () => {
  const lang = languageMap[languageMenu.value] || 'en-US';

  localStorage.setItem('language', lang);
  api.defaults.params['language'] = lang;

  await Promise.all([
    getTrendingMoviesPreview(),
    getCategoriesPreview(),
    getLikedMovies()
  ])
})

function removeInfiniteScroll() {
  if (infiniteScroll) {
    window.removeEventListener('scroll', infiniteScroll, { passive: false });
    infiniteScroll = undefined;
  }
}

function navigation() {
  removeInfiniteScroll();
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

function smoothScroll() {
  const currentScroll = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;

  if (currentScroll > 0) {
    window.requestAnimationFrame(smoothScroll);
    window.scrollTo (0, currentScroll - (currentScroll / 5));
  }
}

function scrollIsOnThreshold() {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  const scrollDiff = scrollHeight - (scrollTop + clientHeight)
  const scrollBottom = scrollDiff <= 15;

  if(scrollBottom) {
    page++;
  }

  return scrollBottom;
}

function homePage() {
  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.add('inactive');
  headerTitle.classList.remove('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');
  trendingPreviewSection.classList.remove('inactive');
  categoriesPreviewSection.classList.remove('inactive');
  genericSection.classList.add('inactive');
  movieDetailSection.classList.add('inactive');
  footerSection.classList.remove('inactive');
  likedMoviesSection.classList.remove('inactive');
  languageMenu.classList.remove('inactive');

  genericSection.innerHTML = '';
  searchFormInput.value = '';
  trendingMoviesPreviewList.innerHTML = '';
  categoriesPreviewList.innerHTML = '';

  languageMenu.value = localStorage.getItem('language').split('-')[0] || 'en-US';

  getTrendingMoviesPreview();
  getCategoriesPreview();
  getLikedMovies();
}

function categoriesPage() {
  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  headerTitle.classList.add('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive');
  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');
  likedMoviesSection.classList.add('inactive');
  languageMenu.classList.add('inactive');

  genericSection.innerHTML = '';
  headerCategoryTitle.innerHTML = '';

  const [_, categoryUrl] = location.hash.split('=');
  const [categoryId, categoryName] = categoryUrl.split('-');
  const categoryTitle = decodeURI(categoryName);

  headerCategoryTitle.textContent = categoryTitle.charAt(0).toUpperCase() + categoryTitle.slice(1);

  getMoviesByCategory(categoryId);

  infiniteScroll = getPaginatedMoviesByCategory(categoryId);
}

function movieDetailsPage() {
  console.log('Movie!!')

  headerSection.classList.add('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.add('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.add('inactive');
  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.add('inactive');
  movieDetailSection.classList.remove('inactive');
  footerSection.classList.add('inactive');
  likedMoviesSection.classList.add('inactive');
  relatedMoviesTitle.classList.add('inactive');
  languageMenu.classList.add('inactive');

  movieDetails.innerHTML = '';
  movieDetailCategoriesList.innerHTML = '';
  relatedMoviesContainer.innerHTML = '';

  const [_, movieId] = location.hash.split('=');
  getMovieById(movieId);
}

function trendsPage() {
  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.remove('inactive');
  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');
  likedMoviesSection.classList.add('inactive');
  languageMenu.classList.add('inactive');

  genericSection.innerHTML = '';
  headerCategoryTitle.textContent = 'Tendencias';
  getTrendingMovies();

  infiniteScroll = getPaginatedTrendingMovies();
}

function searchPage() {
  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');
  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');
  likedMoviesSection.classList.add('inactive');
  languageMenu.classList.add('inactive');

  genericSection.innerHTML = '';

  const [_, query] = location.hash.split('=');
  getMoviesBySearch(query);

  infiniteScroll = getPaginatedMoviesBySearch(query);
}

function error404() {
  console.log('Page not found');
}


