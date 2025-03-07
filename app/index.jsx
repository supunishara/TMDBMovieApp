import React, { useEffect, useState, useCallback } from 'react';
import { 
  View, Text, StyleSheet, FlatList, TextInput, 
  TouchableOpacity, RefreshControl, Keyboard, StatusBar
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Stack } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { 
  fetchPopularMovies, 
  searchMovies, 
  clearSearchResults 
} from '../redux/slices/moviesSlice';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { colors } from '../constants/theme';

export default function HomeScreen() {
  const statusBarHeight = StatusBar.currentHeight || 0;
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  const { 
    popular: { results: popularMovies, page, totalPages, isLoading: isPopularLoading, error: popularError },
    search: { results: searchResults, page: searchPage, totalPages: searchTotalPages, isLoading: isSearchLoading, error: searchError } 
  } = useSelector(state => state.movies);
  
  // Initial data loading
  useEffect(() => {
    if (popularMovies.length === 0 && !isPopularLoading) {
      dispatch(fetchPopularMovies());
    }
  }, [dispatch, popularMovies.length, isPopularLoading]);
  
  // Search when text types and search button pressed
  const handleSearch = useCallback(() => {
    if (searchQuery.trim()) {
      dispatch(searchMovies({ query: searchQuery.trim(), page: 1 }));
      Keyboard.dismiss();
      setIsSearchActive(true);
    }
  }, [dispatch, searchQuery]);
  
  // Clear search and dispatch a new action
  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setIsSearchActive(false);
    dispatch(clearSearchResults());
    Keyboard.dismiss();
  }, [dispatch]);
  
  // Pull-to-refresh 
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (isSearchActive && searchQuery) {
      dispatch(searchMovies({ query: searchQuery, page: 1 }))
        .finally(() => setRefreshing(false));
    } else {
      dispatch(fetchPopularMovies(1))
        .finally(() => setRefreshing(false));
    }
  }, [dispatch, isSearchActive, searchQuery]);
  
  // Load more movies handler(FlatList Pagination)
  const loadMoreMovies = useCallback(() => {
    if (isSearchActive) {
      if (searchPage < searchTotalPages && !isSearchLoading) {
        dispatch(searchMovies({ query: searchQuery, page: searchPage + 1 }));
      }
    } else {
      if (page < totalPages && !isPopularLoading) {
        dispatch(fetchPopularMovies(page + 1));
      }
    }
  }, [dispatch, isSearchActive, page, totalPages, isPopularLoading, searchPage, searchTotalPages, isSearchLoading, searchQuery]);
  
  // Render movie item
  const renderMovieItem = ({ item }) => (
    <MovieCard movie={item} />
  );
  
  // Render footer with loading indicator
  const renderFooter = () => {
    if ((isPopularLoading && page > 1) || (isSearchLoading && searchPage > 1)) {
      return <LoadingSpinner size="small" />;
    }
    return null;
  };
  
  // Choose correct data source
  const movies = isSearchActive ? searchResults : popularMovies;
  const error = isSearchActive ? searchError : popularError;
  const isLoading = isSearchActive ? isSearchLoading : isPopularLoading;
  
  return (
     <View style={[styles.container, { marginTop: statusBarHeight }]}>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search movies..."
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />

        {/* If there is a search value, then show text clear button otherwise show search button */}
        {searchQuery ? (
          <TouchableOpacity style={styles.searchButton} onPress={clearSearch}>
            <FontAwesome name="times" size={16} color={colors.white} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <FontAwesome name="search" size={16} color={colors.white} />
          </TouchableOpacity>
        )}
      </View>
      
      {/* Title Display */}
      <View style={styles.titleContainer}>
        <Text style={styles.sectionTitle}>
          {isSearchActive ? 'Search Results' : 'Popular Movies'}
        </Text>
        {isSearchActive && (
          <TouchableOpacity onPress={clearSearch}>
            <Text style={styles.clearButton}>Back to Popular</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {/* Error State */}
      {error && (
        <ErrorMessage 
          message={error} 
          onRetry={isSearchActive ? 
            () => dispatch(searchMovies({ query: searchQuery, page: 1 })) : 
            () => dispatch(fetchPopularMovies(1))}
        />
      )}
      
      {/* Initial Loading State */}
      {isLoading && movies.length === 0 && !error && (
        <LoadingSpinner />
      )}
      
      {/* Movies List */}
      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.movieList}
        onEndReached={loadMoreMovies}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          !isLoading && !error ? (
            <Text style={styles.emptyText}>
              {isSearchActive ? 'No movies found.' : 'No movies available.'}
            </Text>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cultured,
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: colors.betsy,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.creamYellow,
  },
  searchButton: {
    width: 40,
    height: 40,
    backgroundColor: colors.tabBarActiveTintColor,
    borderRadius: 8,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearButton: {
    color: colors.tabBarActiveTintColor,
    fontWeight: '600',
  },
  movieList: {
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 48,
    fontSize: 16,
    color: colors.tabBarInactiveTintColor,
  },
});