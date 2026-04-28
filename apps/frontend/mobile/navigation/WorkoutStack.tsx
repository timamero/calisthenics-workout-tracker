import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WorkoutScreen from '../screens/Workout';
import AddExerciseScreen from '../screens/AddExerciseScreen';

const WorkoutStack = createNativeStackNavigator({
  screens: {
    Workout: {
      screen: WorkoutScreen,
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
    AddExercise: {
      screen: AddExerciseScreen,
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
  },
});

export default WorkoutStack;
