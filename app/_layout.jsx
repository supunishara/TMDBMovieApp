import React from 'react';
import { Stack, Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/store';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../constants/theme';

export default function Layout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar style="auto" />
        <Tabs screenOptions={{
          tabBarActiveTintColor: colors.tabBarActiveTintColor,
          tabBarInactiveTintColor: colors.tabBarInactiveTintColor,
          headerShown: false,
        }}>
          <Tabs.Screen 
            name="index" 
            options={{
              title: 'Home',
              tabBarIcon: ({ color }) => (
                <FontAwesome name="home" size={24} color={color} />
              ),
            }}
          />
          <Tabs.Screen 
            name="watchlist/index" 
            options={{
              title: 'Watchlist',
              tabBarIcon: ({ color }) => (
                <FontAwesome name="bookmark" size={24} color={color} />
              ),
            }}
          />
          <Tabs.Screen 
            name="details/[id]" 
            options={{
              href: null,
            }}
          />
        </Tabs>
      </PersistGate>
    </Provider>
  );
}