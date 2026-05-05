import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WorkoutScreen from '../screens/Workout';
import AddExerciseScreen from '../screens/AddExerciseScreen';

const WorkoutStack = createNativeStackNavigator({
  screens: {
    Workout: {
      screen: WorkoutScreen,
      options: {
        headerStyle: {
          backgroundColor: '#f1f3f5',
        },
        headerTitleStyle: {
          color: 'rgb(255 244 230)',
        },
        headerTintColor: '#242424',
      },
    },
    AddExercise: {
      screen: AddExerciseScreen,
      options: {
        headerStyle: {
          backgroundColor: '#f1f3f5',
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
