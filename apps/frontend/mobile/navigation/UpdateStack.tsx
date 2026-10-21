import { createNativeStackNavigator } from '@react-navigation/native-stack';

import UpdateScreen from '../screens/UpdateScreen';
import AddExerciseScreen from '../screens/AddExerciseScreen';

const UpdateStack = createNativeStackNavigator({
  screens: {
    Update: {
      screen: UpdateScreen,
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

export default UpdateStack;
