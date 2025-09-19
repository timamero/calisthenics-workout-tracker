import * as React from 'react';
import { View, BackHandler, ScrollView } from 'react-native';
import { useTheme, Button, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { useWorkoutDraftStore } from '@cwt/state/stores';

import WorkoutData from '../components/WorkoutData/';
import { CustomTheme } from '../theme';
import ConfirmationDialog from '../components/common/ConfirmationDialog';
import AddExerciseOverlay from '../components/AddExerciseOverlay';

export default function WorkoutScreen() {
  const workoutDataScrollViewRef = React.useRef<ScrollView | null>(null);

  const theme = useTheme() as CustomTheme;
  const navigation = useNavigation<any>();

  const workoutData = useWorkoutDraftStore((state) => state.workoutData); // DELETE THIS LINE LATER
  console.log('workout - workoutData: ', JSON.stringify(workoutData)); // DELETE THIS LINE LATER

  const resetWorkout = useWorkoutDraftStore((state) => state.resetWorkout);

  const [isCancelWorktoutDialogVisible, setIsCancelWorktoutDialogVisible] =
    React.useState<boolean>(false);
  const [isAddExerciseOverlayVisible, setIsAddExerciseOverlayVisible] =
    React.useState<boolean>(false);

  const onCancelWorkoutPress = () => {
    setIsCancelWorktoutDialogVisible(false);
    navigation.navigate('App', { screen: 'WorkoutDashboard' });
    resetWorkout();
  };

  React.useEffect(() => {
    navigation.setOptions({
      title: 'Workout Title Here',
      headerLeft: () => (
        <Button
          mode="text"
          onPress={() => setIsCancelWorktoutDialogVisible(true)}
          style={{
            marginRight: 24,
          }}
          textColor={theme.colors.grey}
        >
          Cancel
        </Button>
      ),
    });
  }, [navigation, theme.colors.grey]);

  React.useEffect(() => {
    const onBackPress = () => {
      setIsCancelWorktoutDialogVisible(true);

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <WorkoutData scrollViewRef={workoutDataScrollViewRef} />
      <View style={{ flex: 1 }}>
        <FAB
          icon="plus"
          mode="elevated"
          label="Add Exercise"
          theme={{
            colors: {
              primaryContainer: theme.colors.primary,
              onPrimaryContainer: theme.colors.light,
            },
          }}
          style={{
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 0,
          }}
          onPress={() => setIsAddExerciseOverlayVisible(true)}
        />
      </View>
      <AddExerciseOverlay
        isVisible={isAddExerciseOverlayVisible}
        handleHideModal={() => setIsAddExerciseOverlayVisible(false)}
        workoutDataScrollViewRef={workoutDataScrollViewRef}
      />
      <ConfirmationDialog
        title="Cancel Workout Building"
        message="Confirm cancelling workout building. This will discard the current workout."
        confirmButtonLabel="Discard this workout"
        isVisible={isCancelWorktoutDialogVisible}
        handleHideDialog={setIsCancelWorktoutDialogVisible}
        onConfirmationPress={onCancelWorkoutPress}
      />
    </View>
  );
}
