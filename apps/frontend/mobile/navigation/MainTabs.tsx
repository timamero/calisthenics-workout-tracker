import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image } from 'react-native';
import { Icon } from 'react-native-paper';

import StartWorkoutScreen from '../screens/StartWorkoutScreen';
import LibraryScreen from '../screens/LibraryScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';

import { Text } from '../customText';

export const MainTabs = createBottomTabNavigator({
  screenOptions: ({ route }) => {
    return {
      headerStyle: {
        backgroundColor: '#f8f9fa',
      },
      headerTitleStyle: {
        color: '#242424',
        fontFamily: 'ElmsSans-ExtraBold',
      },
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home-variant' : 'home-variant-outline';
        } else if (route.name === 'Library') {
          iconName = focused ? 'database' : 'database-outline';
        } else if (route.name === 'History') {
          iconName = focused ? 'chart-box' : 'chart-box-outline';
        } else if (route.name === 'Settings') {
          iconName = focused ? 'cog' : 'cog-outline';
        } else {
          iconName = 'close-thick';
        }

        return <Icon source={iconName} color={color} size={size} />;
      },
      tabBarActiveTintColor: '#a9e34b', // lime.4
      tabBarInactiveTintColor: '#242424',
      tabBarStyle: { backgroundColor: '#f8f9fa' },
      tabBarLabelStyle: { fontFamily: 'ElmsSans-Regular', color: '#242424' },
    };
  },

  screens: {
    Home: {
      screen: StartWorkoutScreen,
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
              style={{ width: 36, height: 36 }}
              source={require('../assets/logo-240x240.png')}
            />
            <Text variant="headlineSmall">Home</Text>
          </View>
        ),
      },
    },
    Library: {
      screen: LibraryScreen,
      options: {
        title: 'Exercises',
      },
    },
    History: {
      screen: HistoryScreen,
      options: {
        title: 'Logs',
      },
    },
    Settings: SettingsScreen,
  },
  initialRouteName: 'Home',
});
