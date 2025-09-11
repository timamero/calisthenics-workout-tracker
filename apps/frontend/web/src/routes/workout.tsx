import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Stack, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useStore } from '@cwt/state/store';
import { useAuthStore } from '@cwt/state/auth';

import ConfirmationOverlay from '../components/common/ConfirmationOverlay';
import AddExerciseOverlay from '../components/AddExerciseOverlay';
import Workout from '../components/Workout';
import WorkoutTitle from '../components/Workout/WorkoutTitle';
import { postWorkoutBuild } from '../services/workoutsService';

export const Route = createFileRoute('/workout')({
  component: WorkoutView,
});

function WorkoutView() {
  const navigate = useNavigate();
  const [saveOverlayOpened, saveOverlayHandler] = useDisclosure(false);
  const [cancelOverlayOpened, cancelOverlayHandler] = useDisclosure(false);
  const [addExerciseOverlayOpened, addExerciseOverlayHandler] =
    useDisclosure(false);

  const setWorkoutToSave = useStore((state) => state.setWorkoutToSave);
  const resetWorkout = useStore((state) => state.resetWorkout);
  const completeWorkout = useStore((state) => state.completeWorkout);
  // const workoutToSave = useStore((state) => state.workoutToSave);
  const supabaseSession = useAuthStore((state) => state.session);
  // console.log('Session:', supabaseSession);

  const onSaveWorkoutClick = async () => {
    setWorkoutToSave();
    const workoutToSave = useStore.getState().workoutToSave;
    // console.log('Session on save:', supabaseSession);
    if (!supabaseSession || !workoutToSave) {
      console.error('Session not found or workout data invalid');
      return;
    }
    // console.log('sending workout in post request', useStore.getState().workoutToSave);
    const body = JSON.stringify(workoutToSave);
    // console.log('body', body);
    const result = await postWorkoutBuild(supabaseSession.access_token, body);
    if (result) {
      completeWorkout();
      navigate({
        to: '/workoutDashboard',
      });
    }
  };

  const onCancelWorkoutClick = () => {
    navigate({
      to: '/workoutDashboard',
    });
    resetWorkout();
  };

  return (
    <Stack gap="xl">
      <WorkoutTitle />
      <Stack gap="xl" align="center">
        <Workout />
        <Stack justify="center">
          <Button
            variant="filled"
            color="orange.9"
            onClick={() => addExerciseOverlayHandler.open()}
          >
            Add Exercise
          </Button>
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
            Cancel Workout Building
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
        title="Cancel Workout Building"
        message="Confirm cancelling workout building. This will discard the current workout."
        confirmButtonLabel="Discard this workout"
        opened={cancelOverlayOpened}
        handler={cancelOverlayHandler}
        onConfirmationClick={onCancelWorkoutClick}
      />
    </Stack>
  );
}
