import * as React from 'react';
import { createStaticNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
import WorkoutScreen from '../screens/Workout';
import UserScreen from '../screens/UserScreen';

import { useAuthStore } from '@cwt/state/stores';

// App Navigator
const MyTabs = createBottomTabNavigator({
  screenOptions: ({ route }) => {
    return {
      headerStyle: {
        backgroundColor: 'rgb(20 20 20)',
      },
      headerTitleStyle: {
        color: 'rgb(255 244 230)',
      },
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
        } else if (route.name === 'WorkoutDashboard') {
          iconName = focused ? 'fitness' : 'fitness-outline';
        } else if (route.name === 'History') {
          iconName = focused ? 'file-tray-full' : 'file-tray-outline';
        } else if (route.name === 'Settings') {
          iconName = focused ? 'settings' : 'settings-outline';
        } else {
          iconName = 'brush';
        }

        // @ts-ignore
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'rgb(255 244 230)',
      tabBarStyle: { backgroundColor: 'rgb(20 20 20)' },
    };
  },

  screens: {
    Home: HomeScreen,
    Library: {
      screen: LibraryScreen,
      options: {
        title: 'Exercise Library',
      },
    },
    WorkoutDashboard: {
      screen: StartWorkoutScreen,
      options: {
        title: 'Create or Begin A Workout',
      },
    },
    History: HistoryScreen,
    Settings: SettingsScreen,
  },
  initialRouteName: 'Home',
});

const authScreenOptions = {
  title: '',
  headerStyle: {
    backgroundColor: 'rgb(20 20 20)',
  },
  headerTitleStyle: {
    color: 'rgb(255 244 230)',
  },
  headerTintColor: 'white',
};

// Auth Stack Navigator
const AuthStack = createNativeStackNavigator({
  screens: {
    Landing: {
      screen: LandingScreen,
      options: { headerShown: false },
    },
    Login: {
      screen: LoginScreen,
      options: authScreenOptions,
    },
    Signup: {
      screen: SignupScreen,
      options: authScreenOptions,
    },
    Onboarding: {
      screen: OnboardingScreen,
      options: authScreenOptions,
    },
    OnboardingComplete: {
      screen: OnboardingComplete,
      options: authScreenOptions,
    },
  },
  initialRouteName: 'Landing',
});

function useIsSignedIn() {
  const supabaseSession = useAuthStore((state) => state.session);
  if (supabaseSession) {
    console.log('AppNavigator: User is signed in:');
    return true;
  }
  return false;
}
function useIsSignedOut() {
  const supabaseSession = useAuthStore((state) => state.session);
  if (supabaseSession) {
    console.log('AppNavigator: User is signed out:');
    return false;
  }
  return true;
}

// Root Stack Navigator
const RootStack = createNativeStackNavigator({
  groups: {
    SignedOut: {
      if: useIsSignedOut,
      screens: {
        AuthStack: {
          screen: AuthStack,
          options: { headerShown: false },
        },
      },
    },
    SignedIn: {
      if: useIsSignedIn,
      screens: {
        App: {
          screen: MyTabs,
          options: { headerShown: false },
        },
        Profile: {
          screen: UserScreen,
          options: {
            headerStyle: {
              backgroundColor: 'rgb(20 20 20)',
            },
            headerTitleStyle: {
              color: 'rgb(255 244 230)',
            },
            headerTintColor: 'white',
          },
        },
        Workout: {
          screen: WorkoutScreen,
          options: {
            headerStyle: {
              backgroundColor: 'rgb(20 20 20)', // 👈 header background
            },
            headerTitleStyle: {
              color: 'rgb(255 244 230)',
            },
            headerTintColor: 'white',
          },
        },
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);
