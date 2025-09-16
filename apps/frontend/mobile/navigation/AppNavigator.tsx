import * as React from 'react';
import {
  createStaticNavigation,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
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

// import { useAuthStore } from '@cwt/state/auth';
import { useAuthStore } from '@cwt/state/stores';
import WorkoutScreen from '../screens/Workout';

// const WorkoutStack = createStackNavigator({
//   screenOptions: {
//     headerStyle: {
//       backgroundColor: 'rgb(20 20 20)', // 👈 header background
//     },
//     headerTitleStyle: {
//       color: 'rgb(255 244 230)',
//     },
//   },
//   screens: {
//     // WorkoutDashboard: {
//     //   screen: StartWorkoutScreen,
//     //   options: {
//     //     title: 'Create or Begin A Workout',
//     //   },
//     // },
//     Workout: WorkoutScreen,
//   },
//   initialRouteName: 'Workout',
// });

// App Navigator
const MyTabs = createBottomTabNavigator({
  screenOptions: ({ route }) => {
    // const routeName = getFocusedRouteNameFromRoute(route);
    // const hideBottomTabBar = routeName === 'Workout';

    return {
      headerStyle: {
        backgroundColor: 'rgb(20 20 20)', // 👈 header background
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

        // You can return any component that you like here!
        // @ts-ignore
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      // tabBarStyle: {
      //   backgroundColor: 'rgb(20 20 20)', // 👈 tab bar background
      // },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'rgb(255 244 230)',
      tabBarStyle: { backgroundColor: 'rgb(20 20 20)' },
      // tabBarStyle: hideBottomTabBar
      //   ? { display: 'none' }
      //   : { backgroundColor: 'rgb(20 20 20)' },
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
    // WorkoutDashboard: {
    //   screen: WorkoutStack,
    //   options: { headerShown: false },
    // },
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
  groups: {
    SignedOut: {
      if: useIsSignedOut,
      screens: { screen: AuthStack },
      options: { headerShown: false },
    },
    SignedIn: {
      if: useIsSignedIn,
      screens: {
        // App: {
        //   if: useIsSignedIn,
        //   screen: MyTabs,
        //   options: { headerShown: false },
        // },
        Home: {
          screen: MyTabs,
          options: { headerShown: false },
        },
        // WorkoutDashboard: {
        //   // if: useIsSignedIn,
        //   screen: WorkoutStack,
        //   options: { headerShown: false },
        // },
        Workout: WorkoutScreen,
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);
