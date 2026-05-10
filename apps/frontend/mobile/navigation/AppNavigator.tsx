import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import UserScreen from '../screens/UserScreen';
import WorkoutLogDetailScreen from '../screens/WorkoutLogDetailScreen';

import { useAuthStore } from '@cwt/state/stores';

import { MainTabs } from './MainTabs';
import { AuthStack } from './AuthStack';
import WorkoutStack from './WorkoutStack';

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
              backgroundColor: '#FAF9F6',
            },
            headerTitleStyle: {
              color: '#242424',
            },
            headerTintColor: '#242424',
          },
        },
        WorkoutStack: {
          screen: WorkoutStack,
          options: { headerShown: false },
        },
        WorkoutDetails: {
          screen: WorkoutLogDetailScreen,
          options: {
            presentation: 'modal',
            headerShown: false,
          },
        },
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);
