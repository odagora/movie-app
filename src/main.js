const BASE_URL = 'https://api.themoviedb.org/3';
const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w300';

async function getTrendingMoviesPreview() {
    const res = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
    const data = await res.json();
    const movies = data.results;

    const movieTrendingPreviewContainer = document.querySelector('.trendingPreview-movieList')
    const moviesList = []
    movies.forEach(movie => {
      const movieContainer = document.createElement('div');
      const movieImage = document.createElement('img');

      movieContainer.classList.add('movie-container');
      movieImage.classList.add('movie-img');
      movieImage.setAttribute('alt', movie.title);
      movieImage.setAttribute('src', `${BASE_IMAGE_URL}/${movie.poster_path}`);
      movieContainer.appendChild(movieImage);
      moviesList.push(movieContainer);
    })

    movieTrendingPreviewContainer.append(...moviesList)
}

async function getCategoriesPreview() {
  const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  const data = await res.json();
  const categories = data.genres;

  const categoriesPreviewContainer = document.querySelector('.categoriesPreview-list');
  const categoriesList = [];
  categories.forEach(category => {
    const categoryContainer = document.createElement('div');
    const categoryTitle = document.createElement('h3');
    const categoryTitleName = document.createTextNode(category.name);

    categoryContainer.classList.add('category-container');
    categoryTitle.classList.add('category-title');
    categoryTitle.setAttribute('id', `id${category.id}`)
    categoryTitle.appendChild(categoryTitleName);
    categoryContainer.appendChild(categoryTitle);
    categoriesList.push(categoryContainer);
  })
  categoriesPreviewContainer.append(...categoriesList)
}

getTrendingMoviesPreview();
getCategoriesPreview();