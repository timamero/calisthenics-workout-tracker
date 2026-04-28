import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/Home';
import StartWorkoutScreen from '../screens/StartWorkoutScreen';
import LibraryScreen from '../screens/LibraryScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';

// App Navigator
export const MainTabs = createBottomTabNavigator({
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
        title: 'Workout',
      },
    },
    History: HistoryScreen,
    Settings: SettingsScreen,
  },
  initialRouteName: 'Home',
});
