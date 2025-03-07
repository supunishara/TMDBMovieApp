import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tmdbApi from '../../services/tmdbApi';

// Fetch Popular All Movie List
export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopular',
  async (page = 1, { rejectWithValue }) => {
    try {
      const data = await tmdbApi.getPopularMovies(page);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch Data For Details Page by passing movie Id
export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchDetails',
  async (movieId, { rejectWithValue }) => {
    try {
      const data = await tmdbApi.getMovieDetails(movieId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch Movie Data typed on a Search Bar 
export const searchMovies = createAsyncThunk(
  'movies/search',
  async ({ query, page = 1 }, { rejectWithValue }) => {
    try {
      const data = await tmdbApi.searchMovies(query, page);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    popular: {
      results: [],
      page: 1,
      totalPages: 0,
      isLoading: false,
      error: null,
    },
    details: {
      current: null,
      isLoading: false,
      error: null,
    },
    search: {
      results: [],
      query: '',
      page: 1,
      totalPages: 0,
      isLoading: false,
      error: null,
    },
  },
  reducers: {
    clearMovieDetails: (state) => {
      state.details.current = null;
      state.details.error = null;
    },
    clearSearchResults: (state) => {
      state.search.results = [];
      state.search.query = '';
      state.search.page = 1;
      state.search.totalPages = 0;
      state.search.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle popular movies fetching
      .addCase(fetchPopularMovies.pending, (state) => {
        state.popular.isLoading = true;
        state.popular.error = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.popular.isLoading = false;
        state.popular.results = 
          action.meta.arg > 1 
            ? [...state.popular.results, ...action.payload.results] 
            : action.payload.results;
        state.popular.page = action.payload.page;
        state.popular.totalPages = action.payload.total_pages;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.popular.isLoading = false;
        state.popular.error = action.payload || 'Failed to fetch popular movies';
      })
      
      // Handle movie details fetching
      .addCase(fetchMovieDetails.pending, (state) => {
        state.details.isLoading = true;
        state.details.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.details.isLoading = false;
        state.details.current = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.details.isLoading = false;
        state.details.error = action.payload || 'Failed to fetch movie details';
      })
      
      // Handle movie search
      .addCase(searchMovies.pending, (state) => {
        state.search.isLoading = true;
        state.search.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.search.isLoading = false;
        state.search.results = 
          action.meta.arg.page > 1 
            ? [...state.search.results, ...action.payload.results] 
            : action.payload.results;
        state.search.query = action.meta.arg.query;
        state.search.page = action.payload.page;
        state.search.totalPages = action.payload.total_pages;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.search.isLoading = false;
        state.search.error = action.payload || 'Failed to search movies';
      });
  },
});

export const { clearMovieDetails, clearSearchResults } = moviesSlice.actions;

export default moviesSlice.reducer;