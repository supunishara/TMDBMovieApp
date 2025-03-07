import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#032541',
  secondary: '#01b4e4',
  background: '#f5f5f5',
  text: '#333',
  white: '#fff',
  error: '#d63031',
  success: '#00b894',
  lightGray: '#e0e0e0',
  darkGray: '#777',
  tabBarActiveTintColor:'#0066ff',
  tabBarInactiveTintColor:'#888',
  cultured:'#f5f5f5',
  betsy:'#ddd',
  creamYellow:'#f9f9f9',
  cerebralGrey:"#ccc",
  watermelonRed:'#ff4757',
  stoneCold:'#555',
  goldYellow:'#FFD700',
  squant:'#666',
  goshawkGrey:'#444'
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48
};

export const fontSize = {
  small: 12,
  regular: 14,
  medium: 16,
  large: 18,
  xlarge: 20,
  xxlarge: 24
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: fontSize.xlarge,
    fontWeight: 'bold',
    color: colors.text,
  },
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  }
});