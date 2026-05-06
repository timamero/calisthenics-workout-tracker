import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WorkoutScreen from '../screens/Workout';
import AddExerciseScreen from '../screens/AddExerciseScreen';

const WorkoutStack = createNativeStackNavigator({
  screens: {
    Workout: {
      screen: WorkoutScreen,
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
    AddExercise: {
      screen: AddExerciseScreen,
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
  },
});

export default WorkoutStack;
