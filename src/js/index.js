import '@styles/app.css';
import * as nodes from "@ui/nodes.js";
import { changeLanguage } from "@utils/translations.js";
import { getLikedMovies } from "@utils/likedData.js";
import { navigation } from "@routes/navigations.js";
import { infiniteScroll } from "@routes/navigations.js";
import { getTrendingMoviesPreview, getCategoriesPreview } from "@services/api.js";

const moviesNodes = [
  nodes.trendingMoviesPreviewList,
  nodes.genericSection,
  nodes.relatedMoviesContainer
];

const categoriesNodes = [
  nodes.categoriesPreviewList,
];

window.addEventListener('DOMContentLoaded', navigation, false);
window.addEventListener('hashchange', navigation, false);
window.addEventListener('scroll', infiniteScroll, false);

nodes.searchFormBtn.addEventListener('click', () => {
  location.hash = `#search=${nodes.searchFormInput.value.trim()}`;
})

nodes.trendingBtn.addEventListener('click', () => {
  console.log('clicked');
  location.hash = '#trends';
})

nodes.arrowBtn.addEventListener('click', () => {
  document.domain !== '127.0.0.1' ? location.hash = '#home': history.back();
})

nodes.languageMenu.addEventListener('change', async () => {
  const selectedLanguage = nodes.languageMenu.value;
  changeLanguage(selectedLanguage);

  await Promise.all([
    getTrendingMoviesPreview(),
    getCategoriesPreview(),
    getLikedMovies()
  ])
})

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
