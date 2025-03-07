import { createSlice } from '@reduxjs/toolkit';

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: {
    movies: [],
  },
  reducers: {
    addToWatchlist: (state, action) => {
      // Check if movie is already in watchlist
      const exists = state.movies.some(movie => movie.id === action.payload.id);
      
      if (!exists) {
        state.movies.push(action.payload);
      }
    },
    removeFromWatchlist: (state, action) => {
      state.movies = state.movies.filter(movie => movie.id !== action.payload);
    },
    clearWatchlist: (state) => {
      state.movies = [];
    },
  },
});

export const { addToWatchlist, removeFromWatchlist, clearWatchlist } = watchlistSlice.actions;

export default watchlistSlice.reducer;