import React from 'react';
import { 
  View, Text, StyleSheet, FlatList, StatusBar,
  TouchableOpacity, Alert 
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Stack } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { removeFromWatchlist, clearWatchlist } from '../../redux/slices/watchlistSlice';
import MovieCard from '../../components/MovieCard';
import { colors } from '../../constants/theme';
// import { useRefreshOnFocus } from '../../hooks/useRefreshOnFocus';

export default function WatchlistScreen() {
  const statusBarHeight = StatusBar.currentHeight || 0;
  const dispatch = useDispatch();
  const { movies } = useSelector(state => state.watchlist);
  
  // Refresh watchlist when screen comes into focus
  // useRefreshOnFocus(() => {
    
  // });
  
  // dispatch action when its needed to remove a movie
  const handleRemoveMovie = (movieId) => {
    dispatch(removeFromWatchlist(movieId));
  };
  
  // Render movie item
  const renderMovieItem = ({ item }) => (
    <MovieCard 
      movie={item} 
      isWatchlist={true}
      onRemove={handleRemoveMovie}
    />
  );
  
  return (
     <View style={[styles.container, { marginTop: statusBarHeight }]}>
      
      {movies.length > 0 ? (
        <FlatList
          data={movies}
          renderItem={renderMovieItem}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.movieList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <FontAwesome name="bookmark-o" size={64} color={colors.cerebralGrey}/>
          <Text style={styles.emptyText}>Your watchlist is empty</Text>
          <Text style={styles.emptySubtext}>
            Movies you add to your watchlist will appear here
          </Text>
        </View>
      )}
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
  clearButton: {
    marginRight: 16,
  },
  clearButtonText: {
    color: colors.watermelonRed,
    fontWeight: '600',
  },
  movieList: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.stoneCold,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.tabBarInactiveTintColor,
    textAlign: 'center',
    marginTop: 8,
  },
});