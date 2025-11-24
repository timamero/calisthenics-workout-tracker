import { useContext } from 'react';

import { useWorkoutDraftStore } from '@cwt/state/stores';
import { WorkoutContext } from '@cwt/context';
import {
  addSectionConfirmationContent,
  addSupersetConfirmationContent,
} from '@cwt/content';

import ConfirmationOverlay from '../../common/ConfirmationOverlay';

export default function ConfirmationOverlays() {
  const deleteRootItemOverlayOpened =
    useContext(WorkoutContext)?.deleteRootItemOverlayOpened;
  const deleteRootItemOverlayHandler =
    useContext(WorkoutContext)?.deleteRootItemOverlayHandler;
  const deleteNestedItemOverlayOpened =
    useContext(WorkoutContext)?.deleteNestedItemOverlayOpened;
  const deleteNestedItemOverlayHandler =
    useContext(WorkoutContext)?.deleteNestedItemOverlayHandler;
  const deleteSetOverlayOpened =
    useContext(WorkoutContext)?.deleteSetOverlayOpened;
  const deleteSetInSupersetOverlayOpened =
    useContext(WorkoutContext)?.deleteSetInSupersetOverlayOpened;
  const deleteSetInSupersetOverlayHandler =
    useContext(WorkoutContext)?.deleteSetInSupersetOverlayHandler;
  const deleteSetOverlayHandler =
    useContext(WorkoutContext)?.deleteSetOverlayHandler;
  const addSectionOverlayOpened =
    useContext(WorkoutContext)?.addSectionOverlayOpened;
  const addSectionOverlayHandler =
    useContext(WorkoutContext)?.addSectionOverlayHandler;
  const addSupersetOverlayOpened =
    useContext(WorkoutContext)?.addSupersetOverlayOpened;
  const addSupersetOverlayHandler =
    useContext(WorkoutContext)?.addSupersetOverlayHandler;

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
  const deleteSetInSuperset = useWorkoutDraftStore(
    (state) => state.deleteSetInSuperset,
  );
  const removeRootItem = useWorkoutDraftStore((state) => state.removeRootItem);
  const removeNestedItem = useWorkoutDraftStore(
    (state) => state.removeNestedItem,
  );

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
      {/* TODO: Create confirmation overlay for deleting sets in superset */}
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
        title={addSectionConfirmationContent().title}
        message={addSectionConfirmationContent().message}
        confirmButtonLabel={addSectionConfirmationContent().confirmButtonLabel}
        opened={addSectionOverlayOpened!}
        handler={addSectionOverlayHandler!}
        onConfirmationClick={addSection}
      />
      <ConfirmationOverlay
        title={addSupersetConfirmationContent().title}
        message={addSupersetConfirmationContent().message}
        confirmButtonLabel={addSupersetConfirmationContent().confirmButtonLabel}
        opened={addSupersetOverlayOpened!}
        handler={addSupersetOverlayHandler!}
        onConfirmationClick={() => addSuperset(sectionIDToMod)}
      />
    </>
  );
}
