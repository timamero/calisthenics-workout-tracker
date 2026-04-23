import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import OnboardingComplete from '../screens/OnboardingComplete';

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
export const AuthStack = createNativeStackNavigator({
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
