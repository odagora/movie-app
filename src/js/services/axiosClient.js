
import { API_KEY } from "../../../secrets.js";

const BASE_URL = 'https://api.themoviedb.org/3';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    'api_key': API_KEY,
    'language': localStorage.getItem('language') || navigator.language || 'en-US'
  }
});

