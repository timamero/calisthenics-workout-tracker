import { useContext } from 'react';

import { useWorkoutDraftStore } from '@cwt/state/stores';
import { WorkoutContext } from '@cwt/context';
import {
  addSupersetConfirmationContent,
  addSectionConfirmationContent,
} from '@cwt/content';

import ConfirmationDialog from '../../common/ConfirmationDialog';

export default function ConfirmationOverlays() {
  const isDeleteRootItemOverlayVisible =
    useContext(WorkoutContext)?.isDeleteRootItemOverlayVisible;
  const setIsDeleteRootItemOverlayVisible =
    useContext(WorkoutContext)?.setIsDeleteRootItemOverlayVisible;
  const isDeleteNestedItemOverlayVisible =
    useContext(WorkoutContext)?.isDeleteNestedItemOverlayVisible;
  const setIsDeleteNestedItemOverlayVisible =
    useContext(WorkoutContext)?.setIsDeleteNestedItemOverlayVisible;
  const isDeleteSetOverlayVisible =
    useContext(WorkoutContext)?.isDeleteSetOverlayVisible;
  const setIsDeleteSetOverlayVisible =
    useContext(WorkoutContext)?.setIsDeleteSetOverlayVisible;
  const isAddSectionOverlayVisible =
    useContext(WorkoutContext)?.isAddSectionOverlayVisible;
  const setIsAddSectionOverlayVisible =
    useContext(WorkoutContext)?.setIsAddSectionOverlayVisible;
  const isAddSupersetOverlayVisible =
    useContext(WorkoutContext)?.isAddSupersetOverlayVisible;
  const setIsAddSupersetOverlayVisible =
    useContext(WorkoutContext)?.setIsAddSupersetOverlayVisible;

  const exerciseIDToMod = useWorkoutDraftStore(
    (state) => state.exerciseIDToMod,
  );
  const sectionIDToMod = useWorkoutDraftStore((state) => state.sectionIDToMod);
  const supersetIDToMod = useWorkoutDraftStore(
    (state) => state.supersetIDToMod,
  );
  const addSection = useWorkoutDraftStore((state) => state.addSection);
  const addSuperset = useWorkoutDraftStore((state) => state.addSuperset);
  const deleteSet = useWorkoutDraftStore((state) => state.deleteSet);
  const removeRootItem = useWorkoutDraftStore((state) => state.removeRootItem);
  const removeNestedItem = useWorkoutDraftStore(
    (state) => state.removeNestedItem,
  );

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
        title={addSectionConfirmationContent().title}
        message={addSectionConfirmationContent().message}
        confirmButtonLabel={addSectionConfirmationContent().confirmButtonLabel}
        isVisible={isAddSectionOverlayVisible!}
        handleHideDialog={setIsAddSectionOverlayVisible!}
        onConfirmationPress={() => addSection()}
      />
      <ConfirmationDialog
        title={addSupersetConfirmationContent().title}
        message={addSupersetConfirmationContent().message}
        confirmButtonLabel={addSupersetConfirmationContent().confirmButtonLabel}
        isVisible={isAddSupersetOverlayVisible!}
        handleHideDialog={setIsAddSupersetOverlayVisible!}
        onConfirmationPress={() => addSuperset(sectionIDToMod)}
      />
    </>
  );
}
