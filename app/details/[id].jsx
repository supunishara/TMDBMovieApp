import React, { useEffect } from 'react';
import { 
  View, Text, Image, StyleSheet, ScrollView, 
  TouchableOpacity, Dimensions, Alert, StatusBar
} from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import { fetchMovieDetails, clearMovieDetails } from '../../redux/slices/moviesSlice';
import { addToWatchlist, removeFromWatchlist } from '../../redux/slices/watchlistSlice';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import tmdbApi from '../../services/tmdbApi';
import { formatDate } from '../../utils/formatDate';
import { colors } from '../../constants/theme';

const { width } = Dimensions.get('window');

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams();
  const movieId = parseInt(id);
  const dispatch = useDispatch();
  const router = useRouter();
  const statusBarHeight = StatusBar.currentHeight || 0;
  
  const { current: movie, isLoading, error } = useSelector(state => state.movies.details);
  const watchlistMovies = useSelector(state => state.watchlist.movies);
  const isInWatchlist = watchlistMovies.some(item => item.id === movieId);
  
  // Fetch movie details on component mount
  useEffect(() => {
    if (movieId) {
      dispatch(fetchMovieDetails(movieId));
    }
    
    // Clean up on unmount
    return () => {
      dispatch(clearMovieDetails());
    };
  }, [dispatch, movieId]);
  
  // Handle add/remove from watchlist
  const handleWatchlist = () => {
    if (isInWatchlist) {
      Alert.alert(
        'Remove from Watchlist',
        'Are you sure you want to remove this movie from your watchlist?',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Remove', 
            style: 'destructive',
            onPress: () => dispatch(removeFromWatchlist(movieId))
          }
        ]
      );
    } else {
      if (movie) {
        // Add the essential movie info to watchlist
        const movieForWatchlist = {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          release_date: movie.release_date
        };
        dispatch(addToWatchlist(movieForWatchlist));
        Alert.alert('Success', 'Movie added to your watchlist');
      }
    }
  };
  
  return (
    <View style={[styles.container, { marginTop: statusBarHeight }]}>
      
      {isLoading && <LoadingSpinner />}
      
      {error && (
        <ErrorMessage 
          message={error} 
          onRetry={() => dispatch(fetchMovieDetails(movieId))}
        />
      )}
      
      {movie && !isLoading && !error && (
        <ScrollView contentContainerStyle={styles.scrollContent}>

        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <FontAwesome name="arrow-left" size={18} color={colors.tabBarActiveTintColor} />
            </TouchableOpacity>

          {/* Backdrop Image */}
          {movie.backdrop_path && (
            <Image
              source={{ uri: tmdbApi.getImageUrl(movie.backdrop_path) }}
              style={styles.backdropImage}
              resizeMode="cover"
            />
          )}
          
           {/* If unable to get poster image, then show a default image */}
          <View style={styles.contentContainer}>
            {/* Poster and Basic Info */}
            <View style={styles.headerContainer}>
              <Image
                source={{ 
                  uri: movie.poster_path 
                    ? tmdbApi.getImageUrl(movie.poster_path)
                    : 'https://dummyimage.com/500x750/cccccc/ffffff&text=No+Poster'
                }}
                style={styles.posterImage}
                resizeMode="cover"
              />
              
              <View style={styles.infoContainer}>
                <Text style={styles.title}>{movie.title}</Text>
                
                {movie.release_date && (
                  <Text style={styles.releaseDate}>
                    Released: {formatDate(movie.release_date)}
                  </Text>
                )}
                
                {movie.vote_average > 0 && (
                  <View style={styles.ratingContainer}>
                    <FontAwesome name="star" size={16} color={colors.goldYellow} />
                    <Text style={styles.rating}>
                      {movie.vote_average.toFixed(1)}/10
                    </Text>
                  </View>
                )}
                
                {/* Watchlist Button */}
                <TouchableOpacity 
                  style={[
                    styles.watchlistButton,
                    isInWatchlist ? styles.watchlistButtonRemove : styles.watchlistButtonAdd
                  ]}
                  onPress={handleWatchlist}
                >
                  <FontAwesome 
                    name={isInWatchlist ? "bookmark" : "bookmark-o"} 
                    size={16} 
                    color="white" 
                    style={styles.watchlistIcon}
                  />
                  <Text style={styles.watchlistText}>
                    {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Overview Section */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Overview</Text>
              <Text style={styles.overview}>
                {movie.overview || 'No overview available.'}
              </Text>
            </View>
            
            {/* Additional Details */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Details</Text>
              
              <View style={styles.detailsGrid}>
                {movie.genres && movie.genres.length > 0 && (
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Genres</Text>
                    <Text style={styles.detailValue}>
                      {movie.genres.map(genre => genre.name).join(', ')}
                    </Text>
                  </View>
                )}
                
                {movie.runtime > 0 && (
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Runtime</Text>
                    <Text style={styles.detailValue}>{movie.runtime} minutes</Text>
                  </View>
                )}
                
                {movie.budget > 0 && (
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Budget</Text>
                    <Text style={styles.detailValue}>
                      ${movie.budget.toLocaleString()}
                    </Text>
                  </View>
                )}
                
                {movie.revenue > 0 && (
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Revenue</Text>
                    <Text style={styles.detailValue}>
                      ${movie.revenue.toLocaleString()}
                    </Text>
                  </View>
                )}
                
                {movie.status && (
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Status</Text>
                    <Text style={styles.detailValue}>{movie.status}</Text>
                  </View>
                )}
                
                {movie.original_language && (
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Language</Text>
                    <Text style={styles.detailValue}>
                      {movie.original_language.toUpperCase()}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
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
  backButton: {
    padding: 8,
  },
  scrollContent: {
    flexGrow: 1,
  },
  backdropImage: {
    width: '100%',
    height: 200,
    backgroundColor: colors.betsy,
  },
  contentContainer: {
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  posterImage: {
    width: width * 0.3,
    height: width * 0.45,
    borderRadius: 8,
    backgroundColor: colors.betsy,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  releaseDate: {
    fontSize: 14,
    color: colors.squant,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: 'bold',
  },
  watchlistButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  watchlistButtonAdd: {
    backgroundColor: colors.tabBarActiveTintColor,
  },
  watchlistButtonRemove: {
    backgroundColor: colors.watermelonRed,
  },
  watchlistIcon: {
    marginRight: 6,
  },
  watchlistText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 12,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: colors.text,
  },
  overview: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.goshawkGrey,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  detailItem: {
    width: '50%',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 12,
    color: colors.tabBarInactiveTintColor,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
});