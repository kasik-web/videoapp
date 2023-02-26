import axios from "axios";
import * as lang from "../views/language";

const language = lang.getCurrentLang();
const keyAPI = "bad7f024e43bd5773100059ee65d269c";
const mostPopularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${keyAPI}&language=${language}-US&page=`;
const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${keyAPI}&query=`;
const movieDetailUrlFirst = `https://api.themoviedb.org/3/movie/`;
const movieDetailUrlEnd = `?api_key=${keyAPI}&language=${language}-US`;
const movieTrailerEnUrlFirst = `https://api.themoviedb.org/3/movie/`;
const movieTrailerEnUrlEnd = `/videos?api_key=${keyAPI}&language=en-US`;
const genresList = `https://api.themoviedb.org/3/genre/movie/list?api_key=${keyAPI}&language=${language}-US`;

export async function getMostPopular(page) {
  try {
    localStorage.setItem('page', page)
    const response = await axios.get(`${mostPopularUrl}${page}`);    
    return response.data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}

export async function getSearchResults(request, page = 1) {
  try {
    const response = await axios.get(`${searchUrl}${request}&page=${page}`);
    return response.data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}

export async function getMovieDetail(id) {
  try {
    const response = await axios.get(`${movieDetailUrlFirst}${id}${movieDetailUrlEnd}&append_to_response=videos,credits,recommendations`);   
    return response.data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}

export async function getMovieTrailerEn(id) {
  try {
    const response = await axios.get(`${movieTrailerEnUrlFirst}${id}${movieTrailerEnUrlEnd}`);   
    return response.data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}

export async function getGenresList() {
  try {
    const response = await axios.get(`${genresList}`);     
    return response.data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}

