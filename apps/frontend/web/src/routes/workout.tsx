import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Stack, Button, Switch } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import {
  useWorkoutDraftStore,
  useWorkoutLibraryStore,
  useAuthStore,
} from '@cwt/state/stores';
import { useWorkoutSave } from '@cwt/hooks';
import type {
  WorkoutBuildResponse,
  WorkoutLogResponse,
} from '@cwt/schema/workouts';

import ConfirmationOverlay from '../components/common/ConfirmationOverlay';
import AddExerciseOverlay from '../components/AddExerciseOverlay';
import WorkoutData from '../components/Workout/WorkoutData';
import { WorkoutTitleContainer as WorkoutTitle } from '../components/Workout/WorkoutTitle';
import { postWorkoutBuild, postWorkoutLog } from '../services/workoutsService';

export const Route = createFileRoute('/workout')({
  component: WorkoutView,
});

function WorkoutView() {
  const navigate = useNavigate();

  const [saveOverlayOpened, saveOverlayHandler] = useDisclosure(false);
  const [cancelOverlayOpened, cancelOverlayHandler] = useDisclosure(false);
  const [addExerciseOverlayOpened, addExerciseOverlayHandler] =
    useDisclosure(false);

  const mode = useWorkoutDraftStore((state) => state.mode);
  console.log('Workout page - mode = ', mode);
  const supabaseSession = useAuthStore((state) => state.session);

  const setMode = useWorkoutDraftStore((state) => state.setMode);
  const resetWorkout = useWorkoutDraftStore((state) => state.resetWorkout);
  const completeWorkout = useWorkoutLibraryStore(
    (state) => state.completeWorkout,
  );

  const { setWorkoutToSaveWithUser } = useWorkoutSave();

  const onSaveWorkoutClick = async () => {
    setWorkoutToSaveWithUser();
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
    } else {
      // TODO: Save to state called unsavedBuilds
      resetWorkout();
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
  };

  const handleSetMode = () => {
    if (mode === 'edit') {
      setMode('log');
    } else if (mode === 'log') {
      setMode('edit');
    }
  };

  return (
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
          {mode !== 'log' && (
            <Button
              variant="filled"
              color="orange.9"
              onClick={() => addExerciseOverlayHandler.open()}
            >
              Add Exercise
            </Button>
          )}

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
      <AddExerciseOverlay
        opened={addExerciseOverlayOpened}
        handler={addExerciseOverlayHandler}
      />
      <ConfirmationOverlay
        title="Save Workout Template"
        message="Complete workout building and save this template."
        confirmButtonLabel="Save Workout Template"
        opened={saveOverlayOpened}
        handler={saveOverlayHandler}
        onConfirmationClick={onSaveWorkoutClick}
      />
      <ConfirmationOverlay
        title={`Cancel Workout ${mode === 'build' ? 'Building' : 'Logging'}`}
        message={`Confirm cancelling workout ${mode === 'build' ? 'building' : 'logging'}. This will discard the current workout.`}
        confirmButtonLabel="Discard this workout"
        opened={cancelOverlayOpened}
        handler={cancelOverlayHandler}
        onConfirmationClick={onCancelWorkoutClick}
      />
    </Stack>
  );
}
