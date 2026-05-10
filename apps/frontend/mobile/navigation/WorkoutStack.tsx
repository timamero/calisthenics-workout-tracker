import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WorkoutScreen from '../screens/Workout';
import AddExerciseScreen from '../screens/AddExerciseScreen';

const WorkoutStack = createNativeStackNavigator({
  screens: {
    Workout: {
      screen: WorkoutScreen,
      options: {
        headerStyle: {
          backgroundColor: '#f8f9fa',
        },
        headerTitleStyle: {
          color: '#242424',
          fontFamily: 'ElmsSans-Regular',
        },
        headerTintColor: '#242424',
      },
    },
    AddExercise: {
      screen: AddExerciseScreen,
      options: { headerShown: false },
    },
  },
});

export default WorkoutStack;
