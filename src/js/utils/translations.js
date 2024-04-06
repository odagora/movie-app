import { api } from "../services/axiosClient.js";

const languageMap = {
  es: 'es-ES',
  fr: 'fr-FR',
}

const translations = {
  es: {
    'Movie App':'Aplicación de películas',
    'Trends': 'Tendencias',
    'Categories': 'Categorías',
    'See more': 'Ver más',
    'Favorite movies': 'Películas favoritas',
    'Search for a movie': 'Buscar una película',
    'Related movies': 'Películas relacionadas',
    'Made by Daniel González': 'Hecho por Daniel González'
  },
  fr: {
    'Movie App': 'Application de films',
    'Trends': 'Tendances',
    'Categories': 'Categories',
    'See more': 'Voir plus',
    'Favorite movies': 'Films favoris',
    'Search for a movie': 'Rechercher un film',
    'Related movies': 'Films liés',
    'Made by Daniel González': 'Creé par Daniel González'
  }
};

export function changeLanguage(language) {
  const lang = languageMap[language] || 'en-US';
  const elementsToTranslate = document.querySelectorAll('[data-translate]');

  localStorage.setItem('language', lang);
  api.defaults.params['language'] = lang;

  elementsToTranslate.forEach(element => {
    const key = element.dataset.translate;
    const translation = translations[language] && translations[language][key]

    if (element.tagName === 'INPUT' && element.type === 'text') {
      element.placeholder = translation || key;
    }
    else {
      element.textContent = translation || key;
    }
  })
}