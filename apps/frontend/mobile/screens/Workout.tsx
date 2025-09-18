import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, Button, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { useWorkoutDraftStore } from '@cwt/state/stores';

import Workout from '../components/Workout/Workout';
import { CustomTheme } from '../theme';
import ConfirmationDialog from '../components/common/ConfirmationDialog';
import AddExerciseOverlay from '../components/AddExerciseOverlay';

export default function WorkoutScreen() {
  const theme = useTheme() as CustomTheme;
  const navigation = useNavigation<any>();

  const workoutData = useWorkoutDraftStore((state) => state.workoutData); // DELETE THIS LINE LATER
  console.log('workout - workoutData: ', workoutData); // DELETE THIS LINE LATER

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
        >
          Cancel
        </Button>
      ),
    });
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <Workout />
      <View style={{ flex: 1 }}>
        <FAB
          icon="plus"
          label="Add Exercise"
          style={styles.fab}
          onPress={() => setIsAddExerciseOverlayVisible(true)}
        />
      </View>
      <AddExerciseOverlay
        isVisible={isAddExerciseOverlayVisible}
        handleHideModal={() => setIsAddExerciseOverlayVisible(false)}
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

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
