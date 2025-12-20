import { useRef, useState, useEffect } from 'react';
import { View, ScrollView, BackHandler } from 'react-native';
import { useTheme, Button, SegmentedButtons } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import type {
  WorkoutBuildResponse,
  WorkoutLogResponse,
  Mode,
} from '@cwt/schema/workouts';
import {
  useWorkoutDraftStore,
  useWorkoutStopwatchStore,
  useAuthStore,
  useWorkoutLibraryStore,
} from '@cwt/state/stores';
import { useWorkoutSave } from '@cwt/hooks';
import {
  saveWorkoutConfirmationContent,
  cancelWorkoutConfirmationContent,
} from '@cwt/content';

import {
  postWorkoutBuild,
  postWorkoutLog,
} from '../../services/workoutsService';
import ConfirmationDialog from '../common/ConfirmationDialog';
import WorkoutData from './WorkoutData';
import WorkoutTitle from './WorkoutTitle';
import WorkoutOverlays from './WorkoutOverlays';
import AddWorkoutItemButtons from './AddWorkoutItemButtons';
import type { CustomTheme } from '../../theme';

export default function WorkoutDraft() {
  const scrollViewRef = useRef<ScrollView | null>(null);

  const theme = useTheme() as CustomTheme;
  const navigation = useNavigation<any>();

  const [isCancelWorkoutDialogVisible, setIsCancelWorkoutDialogVisible] =
    useState<boolean>(false);
  const [isSaveWorkoutDialogVisible, setIsSaveWorkoutDialogVisible] =
    useState<boolean>(false);

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

  const onCancelWorkoutPress = () => {
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

  useEffect(() => {
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
      headerTitle: () => null,
    });
  }, [navigation, theme.colors.grey]);

  useEffect(() => {
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
      <WorkoutTitle />
      <WorkoutData scrollViewRef={scrollViewRef} />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {mode !== 'log' && <AddWorkoutItemButtons />}

        <View
          style={
            mode === 'build'
              ? {
                  position: 'relative',
                  marginInline: 16,
                  marginBottom: 16,
                }
              : {
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginInline: 16,
                  marginBottom: 16,
                }
          }
        >
          {mode !== 'build' && (
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
          )}

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
      <WorkoutOverlays workoutDataScrollViewRef={scrollViewRef} />
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
