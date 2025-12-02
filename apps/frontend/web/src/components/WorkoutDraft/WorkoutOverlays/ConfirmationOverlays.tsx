import { useContext } from 'react';

import { useWorkoutDraftStore } from '@cwt/state/stores';
import { WorkoutContext } from '@cwt/context';

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
    </>
  );
}
