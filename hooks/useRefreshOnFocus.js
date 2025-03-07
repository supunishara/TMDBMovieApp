import { useEffect } from 'react';
import { useFocusEffect } from 'expo-router';

// Hook for refreshing data when screen comes into focus
export const useRefreshOnFocus = (refreshFunction) => {
  useFocusEffect(() => {
    refreshFunction();
  });
};