import { useEffect, useContext, useCallback } from 'react';
import { View, BackHandler } from 'react-native';
import { useTheme, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import WorkoutDraftContext from '../contexts/WorkoutDraftContext';
import { CustomTheme } from '../theme';
import AddExercise from '../components/AddExercise';

export default function AddExerciseScreen() {
  const theme = useTheme() as CustomTheme;
  const navigation = useNavigation<any>();

  const setIsAddWorkoutItemButtonsVisible =
    useContext(WorkoutDraftContext)?.setIsAddWorkoutItemButtonsVisible!;

  const handleBackPress = useCallback(() => {
    setIsAddWorkoutItemButtonsVisible(true);
    navigation.goBack();
  }, [setIsAddWorkoutItemButtonsVisible, navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          mode="text"
          onPress={() => handleBackPress()}
          style={{
            marginRight: 24,
          }}
          textColor={theme.colors.grey}
        >
          Cancel
        </Button>
      ),
      headerTitle: () => null,
    });
  }, [navigation, theme.colors.grey, handleBackPress]);

  useEffect(() => {
    const onBackPress = () => {
      handleBackPress();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );

    return () => backHandler.remove();
  }, [handleBackPress]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.background,
      }}
    >
      <AddExercise />
    </View>
  );
}
