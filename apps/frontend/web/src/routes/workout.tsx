// import { useContext } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Stack, Button, Switch } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import {
  useWorkoutDraftStore,
  useWorkoutLibraryStore,
  useWorkoutStopwatchStore,
  useAuthStore,
} from '@cwt/state/stores';
import { useWorkoutSave } from '@cwt/hooks';
import type {
  WorkoutBuildResponse,
  WorkoutLogResponse,
  Mode,
} from '@cwt/schema/workouts';
import {
  saveWorkoutConfirmationContent,
  cancelWorkoutConfirmationContent,
} from '@cwt/content';
import { WorkoutContextProvider } from '@cwt/context';

import ConfirmationOverlay from '../components/common/ConfirmationOverlay';
import WorkoutData from '../components/Workout/WorkoutData';
import { WorkoutTitleContainer as WorkoutTitle } from '../components/Workout/WorkoutTitle';
import { postWorkoutBuild, postWorkoutLog } from '../services/workoutsService';
import WorkoutOverlays from '../components/Workout/WorkoutOverlays';
import AddWorkoutItemButtons from '../components/Workout/AddWorkoutItemButtons';

export const Route = createFileRoute('/workout')({
  component: WorkoutView,
});

function WorkoutView() {
  const navigate = useNavigate();

  const [saveOverlayOpened, saveOverlayHandler] = useDisclosure(false);
  const [cancelOverlayOpened, cancelOverlayHandler] = useDisclosure(false);

  const mode = useWorkoutDraftStore((state) => state.mode) as Mode;
  const supabaseSession = useAuthStore((state) => state.session);
  const startTimer = useWorkoutStopwatchStore((state) => state.start);
  const stopTimer = useWorkoutStopwatchStore((state) => state.stop);
  const resetTimer = useWorkoutStopwatchStore((state) => state.reset);
  const setMode = useWorkoutDraftStore((state) => state.setMode);
  const resetWorkout = useWorkoutDraftStore((state) => state.resetWorkout);
  const completeWorkout = useWorkoutLibraryStore(
    (state) => state.completeWorkout,
  );

  const { setWorkoutToSaveWithUser, setWorkoutToSaveWithUserAndDuration } =
    useWorkoutSave();

  const onSaveWorkoutClick = async () => {
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
      console.error('Workout post request failed');
    }

    navigate({
      to: '/workoutDashboard',
    });
  };

  const onCancelWorkoutClick = () => {
    navigate({
      to: '/workoutDashboard',
    });
    resetWorkout();
    resetTimer();
  };

  const handleSetMode = () => {
    if (mode === 'edit') {
      setMode('log');
      startTimer();
    } else if (mode === 'log') {
      setMode('edit');
      stopTimer();
    }
  };

  return (
    <WorkoutContextProvider appType="web">
      <Stack gap="xl" align="center">
        {mode !== 'build' && (
          <Switch
            checked={mode === 'edit' ? true : false}
            onChange={() => handleSetMode()}
            label="Edit mode"
          />
        )}
        <WorkoutTitle />
        <Stack gap="xl" align="center">
          <WorkoutData />
          <Stack justify="center">
            {mode !== 'log' && <AddWorkoutItemButtons />}

            <Button
              variant="filled"
              color="orange"
              onClick={() => saveOverlayHandler.open()}
            >
              Save Workout
            </Button>
            <Button
              variant="subtle"
              color="gray"
              onClick={() => cancelOverlayHandler.open()}
            >
              {`Cancel Workout ${mode === 'build' ? 'Building' : 'Logging'}`}
            </Button>
          </Stack>
        </Stack>
        <WorkoutOverlays />
        <ConfirmationOverlay
          title={saveWorkoutConfirmationContent(mode).title}
          message={saveWorkoutConfirmationContent(mode).message}
          confirmButtonLabel={
            saveWorkoutConfirmationContent(mode).confirmButtonLabel
          }
          opened={saveOverlayOpened}
          handler={saveOverlayHandler}
          onConfirmationClick={onSaveWorkoutClick}
        />
        <ConfirmationOverlay
          title={cancelWorkoutConfirmationContent(mode).title}
          message={cancelWorkoutConfirmationContent(mode).message}
          confirmButtonLabel={
            cancelWorkoutConfirmationContent(mode).confirmButtonLabel
          }
          opened={cancelOverlayOpened}
          handler={cancelOverlayHandler}
          onConfirmationClick={onCancelWorkoutClick}
        />
      </Stack>
    </WorkoutContextProvider>
  );
}
