import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IconButton, Button } from 'react-native-paper';

import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import OnboardingComplete from '../screens/OnboardingComplete';
import { Image, View } from 'react-native';
import { Text } from '../customText';

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

// Auth Stack Navigator
export const AuthStack = createNativeStackNavigator({
  screens: {
    Landing: {
      screen: LandingScreen,
      options: {
        headerTitle: () => (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Image
              style={{ width: 32, height: 32 }}
              source={require('../assets/logo-240x240.png')}
            />
            <Text variant="headlineSmall">Torque</Text>
          </View>
        ),
      },
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
