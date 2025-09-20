import * as React from 'react';
import { View, BackHandler, ScrollView } from 'react-native';
import { useTheme, Button, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import {
  useWorkoutDraftStore,
  useAuthStore,
  useWorkoutLibraryStore,
} from '@cwt/state/stores';
import { useWorkoutSave } from '@cwt/hooks';

import { postWorkoutBuild } from '../services/workoutsService';
import WorkoutTitleContainer from '../components/WorkoutData/WorkoutTitleContainer';
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

  const mode = useWorkoutDraftStore((state) => state.mode);
  const resetWorkout = useWorkoutDraftStore((state) => state.resetWorkout);
  const supabaseSession = useAuthStore((state) => state.session);
  const completeWorkout = useWorkoutLibraryStore(
    (state) => state.completeWorkout,
  );

  const { setWorkoutToSaveWithUser } = useWorkoutSave();

  const [isCancelWorkoutDialogVisible, setIsCancelWorkoutDialogVisible] =
    React.useState<boolean>(false);
  const [isAddExerciseOverlayVisible, setIsAddExerciseOverlayVisible] =
    React.useState<boolean>(false);
  const [isSaveWorkoutDialogVisible, setIsSaveWorkoutDialogVisible] =
    React.useState<boolean>(false);

  const onCancelWorkoutPress = () => {
    setIsCancelWorkoutDialogVisible(false);
    navigation.navigate('App', { screen: 'WorkoutDashboard' });
    resetWorkout();
  };

  const onSaveWorkoutPress = async () => {
    setWorkoutToSaveWithUser();
    const workoutToSave = useWorkoutDraftStore.getState().workoutToSave;
    if (!supabaseSession || !workoutToSave) {
      console.error('Session not found or workout data invalid');
      return;
    }

    console.log('workoutToSave: ', workoutToSave);
    const body = JSON.stringify(workoutToSave);
    const result = await postWorkoutBuild(supabaseSession.access_token, body);
    if (result) {
      completeWorkout(workoutToSave, mode!);
      resetWorkout();
    } else {
      // TODO: Save to state called unsavedBuilds
      resetWorkout();
      console.error('Workout build post request failed');
    }

    setIsSaveWorkoutDialogVisible(false);
    navigation.navigate('App', { screen: 'WorkoutDashboard' });
  };

  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          mode="text"
          onPress={() => setIsCancelWorkoutDialogVisible(true)}
          style={{
            marginRight: 24,
          }}
          textColor={theme.colors.grey}
        >
          Cancel
        </Button>
      ),
      headerTitle: () => <WorkoutTitleContainer />,
    });
  }, [navigation, theme.colors.grey]);

  React.useEffect(() => {
    const onBackPress = () => {
      setIsCancelWorkoutDialogVisible(true);

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
        <FAB
          icon="check"
          mode="elevated"
          label="Complete Workout"
          theme={{
            colors: {
              primaryContainer: theme.colors.background,
              onPrimaryContainer: theme.colors.light,
            },
          }}
          style={{
            position: 'absolute',
            margin: 16,
            left: 0,
            bottom: 0,
            borderWidth: 2,
            borderColor: theme.colors.primary,
          }}
          onPress={() => setIsSaveWorkoutDialogVisible(true)}
        />
      </View>
      <AddExerciseOverlay
        isVisible={isAddExerciseOverlayVisible}
        handleHideModal={() => setIsAddExerciseOverlayVisible(false)}
        workoutDataScrollViewRef={workoutDataScrollViewRef}
      />
      <ConfirmationDialog
        title="Save Workout Template"
        message="Complete workout building and save this template."
        confirmButtonLabel="Save Workout Template"
        isVisible={isSaveWorkoutDialogVisible}
        handleHideDialog={setIsSaveWorkoutDialogVisible}
        onConfirmationPress={onSaveWorkoutPress}
      />
      <ConfirmationDialog
        title="Cancel Workout Building"
        message="Confirm cancelling workout building. This will discard the current workout."
        confirmButtonLabel="Discard this workout"
        isVisible={isCancelWorkoutDialogVisible}
        handleHideDialog={setIsCancelWorkoutDialogVisible}
        onConfirmationPress={onCancelWorkoutPress}
      />
    </View>
  );
}
