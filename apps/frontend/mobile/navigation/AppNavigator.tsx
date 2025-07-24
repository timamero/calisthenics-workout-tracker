import * as React from 'react';
import { createStaticNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/Home';
import StartWorkoutScreen from '../screens/StartWorkoutScreen';
import LibraryScreen from '../screens/LibraryScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import OnboardingComplete from '../screens/OnboardingComplete';

const MyTabs = createBottomTabNavigator({
  screenOptions: ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === 'Home') {
        iconName = focused ? 'home' : 'home-outline';
      } else if (route.name === 'About') {
        iconName = focused
          ? 'information-circle'
          : 'information-circle-outline';
      } else {
        iconName = 'brush';
      }

      // You can return any component that you like here!
      // @ts-ignore
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: 'tomato',
    tabBarInactiveTintColor: 'gray',
  }),
  screens: {
    // Home: HomeScreen,
    Home: OnboardingComplete,
    Library: LibraryScreen,
    Workout: StartWorkoutScreen,
    History: HistoryScreen,
    Settings: SettingsScreen,
  },
});

export const Navigation = createStaticNavigation(MyTabs);
