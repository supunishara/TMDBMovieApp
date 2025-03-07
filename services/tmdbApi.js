import axios from 'axios';

const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
const IMAGE_BASE_URL = process.env.EXPO_PUBLIC_IMAGE_BASE_URL;

const tmdbApi = {
  // Fetch Popular Movie List
  getPopularMovies: async (page = 1) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/popular`, {
        params: {
          api_key: API_KEY,
          page,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
  },

 // Fetch Data For Details Page using movie Id
  getMovieDetails: async (movieId) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
        params: {
          api_key: API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching movie details for ID ${movieId}:`, error);
      throw error;
    }
  },

  // Search movies using typed text
  searchMovies: async (query, page = 1) => {
    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: {
          api_key: API_KEY,
          query,
          page,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  },

  //get movie poster Image
  getImageUrl: (path) => {
    if (!path) return null;
    return `${IMAGE_BASE_URL}${path}`;
  },
};

export default tmdbApi;