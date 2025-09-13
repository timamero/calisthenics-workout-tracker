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
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import { useAuthStore } from '@cwt/state/auth';
import { useAuthStore } from '@cwt/state/stores';

// App Navigator
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
      } else if (route.name === 'Library') {
        iconName = focused ? 'library' : 'library-outline';
      } else if (route.name === 'Workout') {
        iconName = focused ? 'fitness' : 'fitness-outline';
      } else if (route.name === 'History') {
        iconName = focused ? 'file-tray-full' : 'file-tray-outline';
      } else if (route.name === 'Settings') {
        iconName = focused ? 'settings' : 'settings-outline';
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
    Home: HomeScreen,
    Library: {
      screen: LibraryScreen,
      options: {
        title: 'Exercise Library',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontFamily: 'monospace',
        },
      },
    },
    Workout: StartWorkoutScreen,
    History: HistoryScreen,
    Settings: SettingsScreen,
  },
  initialRouteName: 'Home',
});

// Auth Stack Navigator
const AuthStack = createNativeStackNavigator({
  screens: {
    Landing: LandingScreen,
    Login: LoginScreen,
    Signup: SignupScreen,
    Onboarding: OnboardingScreen,
    OnboardingComplete: OnboardingComplete,
  },
  initialRouteName: 'Landing',
});

function useIsSignedIn() {
  const supabaseSession = useAuthStore((state) => state.session);
  if (supabaseSession) {
    console.log('User is signed in:');
    return true;
  }
  return false;
}
function useIsSignedOut() {
  const supabaseSession = useAuthStore((state) => state.session);
  if (supabaseSession) {
    console.log('User is signed out:');
    return false;
  }
  return true;
}

// Root Stack Navigator
const RootStack = createNativeStackNavigator({
  screens: {
    Auth: {
      if: useIsSignedOut,
      screen: AuthStack,
      options: { headerShown: false },
    },
    App: {
      if: useIsSignedIn,
      screen: MyTabs,
      options: { headerShown: false },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);
