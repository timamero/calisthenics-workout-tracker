import { useContext } from 'react';
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
import { useWorkoutContextMobile, useWorkoutSave } from '@cwt/hooks';
import {
  saveWorkoutConfirmationContent,
  cancelWorkoutConfirmationContent,
} from '@cwt/content';

import WorkoutDraftContext from '../../../contexts/WorkoutDraftContext';
import {
  postWorkoutBuild,
  postWorkoutLog,
} from '../../../services/workoutsService';
import ConfirmationDialog from '../../common/ConfirmationDialog';

export default function ConfirmationOverlays() {
  const isDeleteRootItemOverlayVisible =
    useWorkoutContextMobile().mobileOverlayHandlers
      .isDeleteRootItemOverlayVisible;
  const setIsDeleteRootItemOverlayVisible =
    useWorkoutContextMobile().mobileOverlayHandlers
      .setIsDeleteRootItemOverlayVisible;
  const isDeleteNestedItemOverlayVisible =
    useWorkoutContextMobile().mobileOverlayHandlers
      .isDeleteNestedItemOverlayVisible;
  const setIsDeleteNestedItemOverlayVisible =
    useWorkoutContextMobile().mobileOverlayHandlers
      .setIsDeleteNestedItemOverlayVisible;
  const isDeleteSetOverlayVisible =
    useWorkoutContextMobile().mobileOverlayHandlers.isDeleteSetOverlayVisible;
  const setIsDeleteSetOverlayVisible =
    useWorkoutContextMobile().mobileOverlayHandlers
      .setIsDeleteSetOverlayVisible;
  const isDeleteSetInSupersetOverlayVisible =
    useWorkoutContextMobile().mobileOverlayHandlers
      .isDeleteSetInSupersetOverlayVisible;
  const setIsDeleteSetInSupersetOverlayVisible =
    useWorkoutContextMobile().mobileOverlayHandlers
      .setIsDeleteSetInSupersetOverlayVisible;

  const exerciseIDToMod = useWorkoutDraftStore(
    (state) => state.exerciseIDToMod,
  );
  const sectionIDToMod = useWorkoutDraftStore((state) => state.sectionIDToMod);
  const supersetIDToMod = useWorkoutDraftStore(
    (state) => state.supersetIDToMod,
  );

  const deleteSet = useWorkoutDraftStore((state) => state.deleteSet);
  const deleteSetInSuperset = useWorkoutDraftStore(
    (state) => state.deleteSetInSuperset,
  );
  const removeRootItem = useWorkoutDraftStore((state) => state.removeRootItem);
  const removeNestedItem = useWorkoutDraftStore(
    (state) => state.removeNestedItem,
  );

  // Save and Cancel handlers
  const mode = useWorkoutDraftStore((state) => state.mode) as Mode;
  const resetWorkout = useWorkoutDraftStore((state) => state.resetWorkout);
  const supabaseSession = useAuthStore((state) => state.session);
  const completeWorkout = useWorkoutLibraryStore(
    (state) => state.completeWorkout,
  );
  const resetTimer = useWorkoutStopwatchStore((state) => state.reset);

  const isSaveWorkoutDialogVisible =
    useWorkoutContextMobile().mobileOverlayHandlers.isSaveWorkoutDialogVisible;
  const setIsSaveWorkoutDialogVisible =
    useWorkoutContextMobile().mobileOverlayHandlers
      .setIsSaveWorkoutDialogVisible;
  const isCancelWorkoutDialogVisible =
    useWorkoutContextMobile().mobileOverlayHandlers
      .isCancelWorkoutDialogVisible;
  const setIsCancelWorkoutDialogVisible =
    useWorkoutContextMobile().mobileOverlayHandlers
      .setIsCancelWorkoutDialogVisible;

  const { setWorkoutToSaveWithUser, setWorkoutToSaveWithUserAndDuration } =
    useWorkoutSave();

  const setIsAddWorkoutItemButtonsVisible =
    useContext(WorkoutDraftContext)?.setIsAddWorkoutItemButtonsVisible!;

  const navigation = useNavigation<any>();

  const onCancelWorkoutPress = () => {
    navigation.navigate('App', { screen: 'WorkoutDashboard' });
    setIsAddWorkoutItemButtonsVisible(false);
    resetWorkout();
    resetTimer();
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
      console.error('Workout post request failed');
    }

    setIsAddWorkoutItemButtonsVisible(false);
    setIsSaveWorkoutDialogVisible!(false);
    navigation.navigate('App', { screen: 'WorkoutDashboard' });
  };

  return (
    <>
      <ConfirmationDialog
        title={`Delete ${exerciseIDToMod ? 'Exercise' : supersetIDToMod ? 'Superset' : 'Section'}`}
        message={`Delete ${exerciseIDToMod ? 'exercise' : supersetIDToMod ? 'superset' : 'section'} from this workout?`}
        confirmButtonLabel={`Delete ${exerciseIDToMod ? 'exercise' : supersetIDToMod ? 'superset' : 'section'}`}
        isVisible={isDeleteRootItemOverlayVisible!}
        handleHideDialog={setIsDeleteRootItemOverlayVisible!}
        onConfirmationPress={() =>
          removeRootItem(
            exerciseIDToMod
              ? exerciseIDToMod!
              : supersetIDToMod
                ? supersetIDToMod!
                : sectionIDToMod!,
          )
        }
      />
      <ConfirmationDialog
        title={`Delete ${exerciseIDToMod ? 'Exercise' : supersetIDToMod ? 'Superset' : 'Section'}`}
        message={`Delete ${exerciseIDToMod ? 'exercise' : supersetIDToMod ? 'superset' : 'section'} from this workout?`}
        confirmButtonLabel={`Delete ${exerciseIDToMod ? 'exercise' : supersetIDToMod ? 'superset' : 'section'}`}
        isVisible={isDeleteNestedItemOverlayVisible!}
        handleHideDialog={setIsDeleteNestedItemOverlayVisible!}
        onConfirmationPress={() => removeNestedItem()}
      />
      <ConfirmationDialog
        title="Delete set"
        message="Delete set from this exercise?"
        confirmButtonLabel="Delete"
        isVisible={isDeleteSetOverlayVisible!}
        handleHideDialog={setIsDeleteSetOverlayVisible!}
        onConfirmationPress={() => deleteSet()}
      />
      <ConfirmationDialog
        title="Delete sets"
        message="Delete set from each exercise in the superset?"
        confirmButtonLabel="Delete"
        isVisible={isDeleteSetInSupersetOverlayVisible!}
        handleHideDialog={setIsDeleteSetInSupersetOverlayVisible!}
        onConfirmationPress={() => deleteSetInSuperset()}
      />
      <ConfirmationDialog
        title={saveWorkoutConfirmationContent(mode).title}
        message={saveWorkoutConfirmationContent(mode).message}
        confirmButtonLabel={
          saveWorkoutConfirmationContent(mode).confirmButtonLabel
        }
        isVisible={isSaveWorkoutDialogVisible!}
        handleHideDialog={setIsSaveWorkoutDialogVisible!}
        onConfirmationPress={onSaveWorkoutPress}
      />
      <ConfirmationDialog
        title={cancelWorkoutConfirmationContent(mode).title}
        message={cancelWorkoutConfirmationContent(mode).message}
        confirmButtonLabel={
          cancelWorkoutConfirmationContent(mode).confirmButtonLabel
        }
        isVisible={isCancelWorkoutDialogVisible!}
        handleHideDialog={setIsCancelWorkoutDialogVisible!}
        onConfirmationPress={onCancelWorkoutPress}
      />
    </>
  );
}
