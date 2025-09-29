import * as React from 'react';
import { View, BackHandler, ScrollView } from 'react-native';
import { useTheme, Button, SegmentedButtons } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import type {
  WorkoutBuildResponse,
  WorkoutLogResponse,
} from '@cwt/schema/workouts';
import {
  useWorkoutDraftStore,
  useWorkoutStopwatchStore,
  useAuthStore,
  useWorkoutLibraryStore,
} from '@cwt/state/stores';
import { useWorkoutSave } from '@cwt/hooks';
import { Mode } from '@cwt/schema/workouts';
import {
  saveWorkoutConfirmationContent,
  cancelWorkoutConfirmationContent,
} from '@cwt/content';

import { postWorkoutBuild, postWorkoutLog } from '../services/workoutsService';
import { WorkoutTitleContainer as WorkoutTitle } from '../components/Workout/WorkoutTitle/';
import WorkoutData from '../components/Workout/WorkoutData';
import { CustomTheme } from '../theme';
import ConfirmationDialog from '../components/common/ConfirmationDialog';
import AddExerciseOverlay from '../components/AddExerciseOverlay';

export default function WorkoutScreen() {
  const workoutDataScrollViewRef = React.useRef<ScrollView | null>(null);

  const theme = useTheme() as CustomTheme;
  const navigation = useNavigation<any>();

  const startTimer = useWorkoutStopwatchStore((state) => state.start);
  const stopTimer = useWorkoutStopwatchStore((state) => state.stop);
  const resetTimer = useWorkoutStopwatchStore((state) => state.reset);
  const mode = useWorkoutDraftStore((state) => state.mode) as Mode;
  const setMode = useWorkoutDraftStore((state) => state.setMode);
  const resetWorkout = useWorkoutDraftStore((state) => state.resetWorkout);
  const supabaseSession = useAuthStore((state) => state.session);
  const completeWorkout = useWorkoutLibraryStore(
    (state) => state.completeWorkout,
  );

  const { setWorkoutToSaveWithUser, setWorkoutToSaveWithUserAndDuration } =
    useWorkoutSave();

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
    resetTimer();
  };

  const handleSetMode = (modeValue: Mode) => {
    if (modeValue === 'log') {
      setMode('log');
      startTimer();
    } else if (modeValue === 'edit') {
      setMode('edit');
      stopTimer();
    }
  };

  const onSaveWorkoutPress = async () => {
    if (mode === 'build') {
      setWorkoutToSaveWithUser();
    } else {
      // mode is 'edit' or 'log'
      setWorkoutToSaveWithUserAndDuration();
    }
    const workoutToSave = useWorkoutDraftStore.getState().workoutToSave;
    if (!supabaseSession || !workoutToSave) {
      console.error('Session not found or workout data invalid');
      return;
    }

    const body = JSON.stringify(workoutToSave);
    let result: WorkoutBuildResponse | WorkoutLogResponse | null = null;

    if (mode === 'build') {
      result = await postWorkoutBuild(supabaseSession.access_token, body);
    } else {
      result = await postWorkoutLog(supabaseSession.access_token, body);
    }
    if (result) {
      completeWorkout(workoutToSave, mode!);
      resetWorkout();
      resetTimer();
    } else {
      // TODO: Save to state called unsavedBuilds
      resetWorkout();
      resetTimer();
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
      headerTitle: () => <WorkoutTitle />,
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
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {mode !== 'log' && (
          <Button
            icon="plus"
            mode="contained"
            theme={{
              colors: {
                primaryContainer: theme.colors.primary,
                onPrimaryContainer: theme.colors.light,
              },
            }}
            style={{
              margin: 16,
            }}
            onPress={() => setIsAddExerciseOverlayVisible(true)}
          >
            Add Exercise
          </Button>
        )}

        <View
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginInline: 16,
            marginBottom: 16,
          }}
        >
          <SegmentedButtons
            density="small"
            value={mode}
            onValueChange={(value: Mode) => handleSetMode(value)}
            theme={{ colors: { secondaryContainer: theme.colors.primary } }}
            buttons={[
              {
                value: 'edit',
                label: 'Edit',
                uncheckedColor: theme.colors.light,
              },
              {
                value: 'log',
                label: 'Log',
                uncheckedColor: theme.colors.light,
              },
            ]}
          />
          <Button
            icon="check"
            theme={{
              colors: {
                primaryContainer: theme.colors.background,
                onPrimaryContainer: theme.colors.light,
              },
            }}
            style={{
              borderWidth: 2,
              borderColor: theme.colors.primary,
            }}
            onPress={() => setIsSaveWorkoutDialogVisible(true)}
          >
            Complete Workout
          </Button>
        </View>
      </View>
      <AddExerciseOverlay
        isVisible={isAddExerciseOverlayVisible}
        handleHideModal={() => setIsAddExerciseOverlayVisible(false)}
        workoutDataScrollViewRef={workoutDataScrollViewRef}
      />
      <ConfirmationDialog
        title={saveWorkoutConfirmationContent(mode).title}
        message={saveWorkoutConfirmationContent(mode).message}
        confirmButtonLabel={
          saveWorkoutConfirmationContent(mode).confirmButtonLabel
        }
        isVisible={isSaveWorkoutDialogVisible}
        handleHideDialog={setIsSaveWorkoutDialogVisible}
        onConfirmationPress={onSaveWorkoutPress}
      />
      <ConfirmationDialog
        title={cancelWorkoutConfirmationContent(mode).title}
        message={cancelWorkoutConfirmationContent(mode).message}
        confirmButtonLabel={
          cancelWorkoutConfirmationContent(mode).confirmButtonLabel
        }
        isVisible={isCancelWorkoutDialogVisible}
        handleHideDialog={setIsCancelWorkoutDialogVisible}
        onConfirmationPress={onCancelWorkoutPress}
      />
    </View>
  );
}
