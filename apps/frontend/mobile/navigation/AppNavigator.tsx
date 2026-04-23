import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import OnboardingComplete from '../screens/OnboardingComplete';
import WorkoutScreen from '../screens/Workout';
import UserScreen from '../screens/UserScreen';

import { useAuthStore } from '@cwt/state/stores';

import { MainTabs } from './MainTabs';

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
          screen: MainTabs,
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
