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
  addSectionConfirmationContent,
  addSupersetConfirmationContent,
} from '@cwt/content';

import { WorkoutContext } from '../contexts/WorkoutContext';
import ConfirmationOverlay from '../components/common/ConfirmationOverlay';
import AddExerciseOverlay from '../components/AddExerciseOverlay';
import WorkoutData from '../components/Workout/WorkoutData';
import { WorkoutTitleContainer as WorkoutTitle } from '../components/Workout/WorkoutTitle';
import { postWorkoutBuild, postWorkoutLog } from '../services/workoutsService';

export const Route = createFileRoute('/workout')({
  component: WorkoutView,
});

function WorkoutView() {
  console.log('Workout page rendered');
  const navigate = useNavigate();

  const [saveOverlayOpened, saveOverlayHandler] = useDisclosure(false);
  const [cancelOverlayOpened, cancelOverlayHandler] = useDisclosure(false);
  const [addExerciseOverlayOpened, addExerciseOverlayHandler] =
    useDisclosure(false);
  const [addSectionOverlayOpened, addSectionOverlayHandler] =
    useDisclosure(false);
  const [addSupersetOverlayOpened, addSupersetOverlayHandler] =
    useDisclosure(false);
  const [deleteRootItemOverlayOpened, deleteRootItemOverlayHandler] =
    useDisclosure(false);
  const [deleteSetOverlayOpened, deleteSetOverlayHandler] =
    useDisclosure(false);

  const mode = useWorkoutDraftStore((state) => state.mode) as Mode;
  const exerciseIDToMod = useWorkoutDraftStore(
    (state) => state.exerciseIDToMod,
  );
  const sectionIDToMod = useWorkoutDraftStore((state) => state.sectionIDToMod);
  const supersetIDToMod = useWorkoutDraftStore(
    (state) => state.supersetIDToMod,
  );
  const supabaseSession = useAuthStore((state) => state.session);

  const startTimer = useWorkoutStopwatchStore((state) => state.start);
  const stopTimer = useWorkoutStopwatchStore((state) => state.stop);
  const resetTimer = useWorkoutStopwatchStore((state) => state.reset);
  const addSection = useWorkoutDraftStore((state) => state.addSection);
  const addSuperset = useWorkoutDraftStore((state) => state.addSuperset);
  const deleteItem = useWorkoutDraftStore((state) => state.removeRootItem);
  const deleteSet = useWorkoutDraftStore((state) => state.deleteSetUpdated);
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

  const onAddSectionClick = () => {
    addSection();
  };

  const onAddSupersetClick = () => {
    addSuperset(null);
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
    <WorkoutContext.Provider
      value={{
        addExerciseOverlayHandler: addExerciseOverlayHandler,
        deleteRootItemOverlayHandler: deleteRootItemOverlayHandler,
        deleteSetOverlayHandler: deleteSetOverlayHandler,
      }}
    >
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
              <Stack>
                <Button
                  variant="filled"
                  color="orange.9"
                  onClick={() => addExerciseOverlayHandler.open()}
                >
                  Add Exercise
                </Button>
                <Button
                  variant="filled"
                  color="orange.9"
                  onClick={() => addSectionOverlayHandler.open()}
                >
                  Add Section
                </Button>
                <Button
                  variant="filled"
                  color="orange.9"
                  onClick={() => addSupersetOverlayHandler.open()}
                >
                  Add Superset
                </Button>
              </Stack>
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
          title={addSectionConfirmationContent().title}
          message={addSectionConfirmationContent().message}
          confirmButtonLabel={
            addSectionConfirmationContent().confirmButtonLabel
          }
          opened={addSectionOverlayOpened}
          handler={addSectionOverlayHandler}
          onConfirmationClick={onAddSectionClick}
        />
        <ConfirmationOverlay
          title={addSupersetConfirmationContent().title}
          message={addSupersetConfirmationContent().message}
          confirmButtonLabel={
            addSupersetConfirmationContent().confirmButtonLabel
          }
          opened={addSupersetOverlayOpened}
          handler={addSupersetOverlayHandler}
          onConfirmationClick={onAddSupersetClick}
        />
        <ConfirmationOverlay
          title={`Delete ${exerciseIDToMod ? 'Exercise' : supersetIDToMod ? 'Superset' : 'Section'}`}
          message={`Delete ${exerciseIDToMod ? 'exercise' : supersetIDToMod ? 'superset' : 'section'} from this workout?`}
          confirmButtonLabel={`Delete ${exerciseIDToMod ? 'exercise' : supersetIDToMod ? 'superset' : 'section'}`}
          opened={deleteRootItemOverlayOpened}
          handler={deleteRootItemOverlayHandler}
          onConfirmationClick={() =>
            deleteItem(
              exerciseIDToMod
                ? exerciseIDToMod!
                : supersetIDToMod
                  ? supersetIDToMod!
                  : sectionIDToMod!,
            )
          }
        />
        <ConfirmationOverlay
          title="Delete Set"
          message="Delete set from this exercise?"
          confirmButtonLabel="Delete"
          opened={deleteSetOverlayOpened}
          handler={deleteSetOverlayHandler}
          onConfirmationClick={() => deleteSet()}
        />
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
    </WorkoutContext.Provider>
  );
}
