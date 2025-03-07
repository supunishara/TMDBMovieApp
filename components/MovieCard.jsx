import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import tmdbApi from '../services/tmdbApi';

const { width } = Dimensions.get('window');
const cardWidth = width / 2 - 24; // Two columns with padding

const MovieCard = ({ movie, isWatchlist = false, onRemove }) => {
  if (!movie) return null;
  
  return (
    <View style={styles.cardContainer}>
      <Link href={`/details/${movie.id}`} asChild>
        <TouchableOpacity style={styles.card}>
          <Image
            source={{ 
              uri: movie.poster_path 
                ? tmdbApi.getImageUrl(movie.poster_path)
                : 'https://dummyimage.com/500x750/cccccc/ffffff&text=No+Poster' 
            }}
            style={styles.poster}
            resizeMode="cover"
          />
          <View style={styles.infoContainer}>
            <Text style={styles.title} numberOfLines={2}>{movie.title}</Text>
            <Text style={styles.releaseDate}>
              {movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}
            </Text>
          </View>
        </TouchableOpacity>
      </Link>
      
      {isWatchlist && (
        <TouchableOpacity 
          style={styles.removeButton}
          onPress={() => onRemove(movie.id)}
        >
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: cardWidth,
    margin: 8,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  card: {
    width: '100%',
  },
  poster: {
    width: '100%',
    height: cardWidth * 1.5, // 3:2 aspect ratio
    borderRadius: 8,
  },
  infoContainer: {
    padding: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  releaseDate: {
    fontSize: 12,
    color: '#888',
  },
  removeButton: {
    backgroundColor: '#ff4757',
    padding: 8,
    alignItems: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MovieCard;