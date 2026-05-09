import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import StartWorkoutScreen from '../screens/StartWorkoutScreen';
import LibraryScreen from '../screens/LibraryScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';

// App Navigator
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
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'About') {
          iconName = focused
            ? 'information-circle'
            : 'information-circle-outline';
        } else if (route.name === 'Library') {
          iconName = focused ? 'library' : 'library-outline';
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
      tabBarActiveTintColor: '#5f3dc4',
      tabBarInactiveTintColor: '#242424',
      tabBarStyle: { backgroundColor: '#f8f9fa' },
      tabBarLabelStyle: { fontFamily: 'ElmsSans-Regular' },
    };
  },

  screens: {
    Home: {
      screen: StartWorkoutScreen,
      options: {
        title: 'Workout',
      },
    },
    Library: {
      screen: LibraryScreen,
      options: {
        title: 'Exercise Library',
      },
    },
    History: HistoryScreen,
    Settings: SettingsScreen,
  },
  initialRouteName: 'Home',
});
