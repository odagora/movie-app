window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

searchForm.addEventListener('click', () => {
  location.hash = '#search=';
})

trendingBtn.addEventListener('click', () => {
  location.hash = '#trends';
})

arrowBtn.addEventListener('click', () => {
  location.hash = '';
})

function navigator() {
  location.hash.startsWith('#trends') ? trendsPage() :
  location.hash.startsWith('#search') ? searchPage() :
  location.hash.startsWith('#movie') ? movieDetailsPage() :
  location.hash.startsWith('#category') ? categoriesPage() :
  homePage()

  smoothScroll();
}

function smoothScroll() {
  const currentScroll = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;

  if (currentScroll > 0) {
    window.requestAnimationFrame(smoothScroll);
    window.scrollTo (0, currentScroll - (currentScroll / 5));
  }
}

function homePage() {
  console.log('Home!!');

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

  getTrendingMoviesPreview();
  getCategoriesPreview();
}

function categoriesPage() {
  console.log('Categories!!')

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive');
  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  const [_, categoryUrl] = location.hash.split('=');
  const [categoryId, categoryName] = categoryUrl.split('-');
  headerCategoryTitle.textContent = decodeURI(categoryName);
  getMoviesByCategory(categoryId);
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
}

function trendsPage() {
  console.log('Trends!!')

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
}

function searchPage() {
  console.log('Search!!')

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
}

function error404() {
  console.log('Page not found');
}


