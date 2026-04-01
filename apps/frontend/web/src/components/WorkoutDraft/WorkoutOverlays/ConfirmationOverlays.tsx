import { useNavigate } from '@tanstack/react-router';
import {
  useWorkoutDraftStore,
  useWorkoutLibraryStore,
  useWorkoutStopwatchStore,
  useAuthStore,
} from '@cwt/state/stores';
import { useWorkoutContextWeb, useWorkoutSave } from '@cwt/hooks';
import {
  saveWorkoutConfirmationContent,
  cancelWorkoutConfirmationContent,
} from '@cwt/content';
import type {
  Mode,
  WorkoutBuildResponse,
  WorkoutLogResponse,
} from '@cwt/schema/workouts';

import {
  postWorkoutBuild,
  postWorkoutLog,
} from '../../../services/workoutsService';
import ConfirmationOverlay from '../../common/ConfirmationOverlay';

export default function ConfirmationOverlays() {
  // --- States
  const mode = useWorkoutDraftStore((state) => state.mode) as Mode;

  const deleteRootItemOverlayOpened =
    useWorkoutContextWeb().webOverlayHandlers?.deleteRootItemOverlayOpened;
  const deleteNestedItemOverlayOpened =
    useWorkoutContextWeb().webOverlayHandlers?.deleteNestedItemOverlayOpened;
  const deleteSetInSupersetOverlayOpened =
    useWorkoutContextWeb().webOverlayHandlers?.deleteSetInSupersetOverlayOpened;
  const deleteSetOverlayOpened =
    useWorkoutContextWeb().webOverlayHandlers?.deleteSetOverlayOpened;
  const saveOverlayOpened =
    useWorkoutContextWeb().webOverlayHandlers?.saveOverlayOpened;
  const cancelOverlayOpened =
    useWorkoutContextWeb().webOverlayHandlers?.cancelOverlayOpened;

  const supabaseSession = useAuthStore((state) => state.session);

  const exerciseIDToMod = useWorkoutDraftStore(
    (state) => state.exerciseIDToMod,
  );
  const sectionIDToMod = useWorkoutDraftStore((state) => state.sectionIDToMod);
  const supersetIDToMod = useWorkoutDraftStore(
    (state) => state.supersetIDToMod,
  );
  // --- end States

  // --- Actions
  const deleteSet = useWorkoutDraftStore((state) => state.deleteSet);
  const deleteSetInSuperset = useWorkoutDraftStore(
    (state) => state.deleteSetInSuperset,
  );
  const removeRootItem = useWorkoutDraftStore((state) => state.removeRootItem);
  const removeNestedItem = useWorkoutDraftStore(
    (state) => state.removeNestedItem,
  );
  const resetWorkout = useWorkoutDraftStore((state) => state.resetWorkout);
  const completeWorkout = useWorkoutLibraryStore(
    (state) => state.completeWorkout,
  );
  const resetTimer = useWorkoutStopwatchStore((state) => state.reset);
  // --- end Actions

  // --- Hooks
  const navigate = useNavigate();
  // --- end Hooks

  // --- Custom hooks
  const { setWorkoutToSaveWithUser, setWorkoutToSaveWithUserAndDuration } =
    useWorkoutSave();
  // --- end Custom hooks

  // --- Handlers
  const deleteRootItemOverlayHandler =
    useWorkoutContextWeb().webOverlayHandlers?.deleteRootItemOverlayHandler;
  const deleteNestedItemOverlayHandler =
    useWorkoutContextWeb().webOverlayHandlers?.deleteNestedItemOverlayHandler;
  const deleteSetInSupersetOverlayHandler =
    useWorkoutContextWeb().webOverlayHandlers
      ?.deleteSetInSupersetOverlayHandler;
  const deleteSetOverlayHandler =
    useWorkoutContextWeb().webOverlayHandlers?.deleteSetOverlayHandler;
  const saveOverlayHandler =
    useWorkoutContextWeb().webOverlayHandlers?.saveOverlayHandler;
  const cancelOverlayHandler =
    useWorkoutContextWeb().webOverlayHandlers?.cancelOverlayHandler;

  const handleSaveWorkoutClick = async () => {
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

  const handleCancelWorkoutClick = () => {
    navigate({
      to: '/workoutDashboard',
    });
    resetWorkout();
    resetTimer();
  };
  // --- end Handlers

  return (
    <>
      <ConfirmationOverlay
        title={`Delete ${exerciseIDToMod ? 'Exercise' : supersetIDToMod ? 'Superset' : 'Section'}`}
        message={`Delete ${exerciseIDToMod ? 'exercise' : supersetIDToMod ? 'superset' : 'section'} from this workout?`}
        confirmButtonLabel={`Delete ${exerciseIDToMod ? 'exercise' : supersetIDToMod ? 'superset' : 'section'}`}
        opened={deleteRootItemOverlayOpened!}
        handler={deleteRootItemOverlayHandler!}
        onConfirmationClick={() =>
          removeRootItem(
            exerciseIDToMod
              ? exerciseIDToMod!
              : supersetIDToMod
                ? supersetIDToMod!
                : sectionIDToMod!,
          )
        }
      />
      <ConfirmationOverlay
        title={`Delete ${exerciseIDToMod ? 'Exercise' : supersetIDToMod ? 'Superset' : 'Section'}`}
        message={`Delete ${exerciseIDToMod ? 'exercise' : supersetIDToMod ? 'superset' : 'section'} from this workout?`}
        confirmButtonLabel={`Delete ${exerciseIDToMod ? 'exercise' : supersetIDToMod ? 'superset' : 'section'}`}
        opened={deleteNestedItemOverlayOpened!}
        handler={deleteNestedItemOverlayHandler!}
        onConfirmationClick={() => removeNestedItem()}
      />
      <ConfirmationOverlay
        title="Delete sets"
        message="Delete set from each exercise in the superset?"
        confirmButtonLabel="Delete"
        opened={deleteSetInSupersetOverlayOpened!}
        handler={deleteSetInSupersetOverlayHandler!}
        onConfirmationClick={() => deleteSetInSuperset()}
      />
      <ConfirmationOverlay
        title="Delete set"
        message="Delete set from this exercise?"
        confirmButtonLabel="Delete"
        opened={deleteSetOverlayOpened!}
        handler={deleteSetOverlayHandler!}
        onConfirmationClick={() => deleteSet()}
      />
      <ConfirmationOverlay
        title={saveWorkoutConfirmationContent(mode).title}
        message={saveWorkoutConfirmationContent(mode).message}
        confirmButtonLabel={
          saveWorkoutConfirmationContent(mode).confirmButtonLabel
        }
        opened={saveOverlayOpened!}
        handler={saveOverlayHandler!}
        onConfirmationClick={handleSaveWorkoutClick}
      />
      <ConfirmationOverlay
        title={cancelWorkoutConfirmationContent(mode).title}
        message={cancelWorkoutConfirmationContent(mode).message}
        confirmButtonLabel={
          cancelWorkoutConfirmationContent(mode).confirmButtonLabel
        }
        opened={cancelOverlayOpened!}
        handler={cancelOverlayHandler!}
        onConfirmationClick={handleCancelWorkoutClick}
      />
    </>
  );
}
