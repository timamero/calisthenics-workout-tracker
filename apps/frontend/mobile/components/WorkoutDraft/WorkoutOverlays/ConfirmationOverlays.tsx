import { useWorkoutDraftStore } from '@cwt/state/stores';
import { useWorkoutContextMobile } from '@cwt/hooks';

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
      {/* <ConfirmationDialog
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
      /> */}
    </>
  );
}
