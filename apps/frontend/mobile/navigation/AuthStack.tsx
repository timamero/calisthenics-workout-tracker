import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import OnboardingComplete from '../screens/OnboardingComplete';

const authScreenOptions = {
  title: '',
  headerStyle: {
    backgroundColor: '#f8f9fa',
  },
  headerTitleStyle: {
    color: '#242424',
    fontFamily: 'ElmsSans-ExtraBold',
  },
  headerTintColor: '#242424',
};

export const AuthStack = createNativeStackNavigator({
  screens: {
    Landing: {
      screen: LandingScreen,
      options: { headerShown: false },
    },
    Login: {
      screen: LoginScreen,
      options: { ...authScreenOptions, title: 'Log In' },
    },
    Signup: {
      screen: SignupScreen,
      options: { ...authScreenOptions, title: 'Sign Up' },
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
