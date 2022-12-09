import axios from "axios";

const keyAPI = "3fd2be6f0c70a2a598f084ddfb75487c";
const mostPopularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${keyAPI}&language=ru-RU&page=`;
const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${keyAPI}&query=`;

export async function getMostPopular(page = 1) {
  try {
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
