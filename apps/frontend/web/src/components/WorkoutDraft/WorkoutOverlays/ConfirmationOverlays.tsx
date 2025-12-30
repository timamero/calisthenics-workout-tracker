import { useWorkoutDraftStore } from '@cwt/state/stores';
import { useWorkoutContextWeb } from '@cwt/hooks';
import {
  saveWorkoutConfirmationContent,
  // cancelWorkoutConfirmationContent,
} from '@cwt/content';
import type { Mode } from '@cwt/schema/workouts';

import ConfirmationOverlay from '../../common/ConfirmationOverlay';

export default function ConfirmationOverlays() {
  const mode = useWorkoutDraftStore((state) => state.mode) as Mode;

  const deleteRootItemOverlayOpened =
    useWorkoutContextWeb().webOverlayHandlers?.deleteRootItemOverlayOpened;
  const deleteRootItemOverlayHandler =
    useWorkoutContextWeb().webOverlayHandlers?.deleteRootItemOverlayHandler;
  const deleteNestedItemOverlayOpened =
    useWorkoutContextWeb().webOverlayHandlers?.deleteNestedItemOverlayOpened;
  const deleteNestedItemOverlayHandler =
    useWorkoutContextWeb().webOverlayHandlers?.deleteNestedItemOverlayHandler;
  const deleteSetInSupersetOverlayOpened =
    useWorkoutContextWeb().webOverlayHandlers?.deleteSetInSupersetOverlayOpened;
  const deleteSetInSupersetOverlayHandler =
    useWorkoutContextWeb().webOverlayHandlers
      ?.deleteSetInSupersetOverlayHandler;
  const deleteSetOverlayOpened =
    useWorkoutContextWeb().webOverlayHandlers?.deleteSetOverlayOpened;
  const deleteSetOverlayHandler =
    useWorkoutContextWeb().webOverlayHandlers?.deleteSetOverlayHandler;
  const saveOverlayOpened =
    useWorkoutContextWeb().webOverlayHandlers?.saveOverlayOpened;
  const saveOverlayHandler =
    useWorkoutContextWeb().webOverlayHandlers?.saveOverlayHandler;

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
      <ConfirmationOverlay
        title={saveWorkoutConfirmationContent(mode).title}
        message={saveWorkoutConfirmationContent(mode).message}
        confirmButtonLabel={
          saveWorkoutConfirmationContent(mode).confirmButtonLabel
        }
        opened={saveOverlayOpened!}
        handler={saveOverlayHandler!}
        onConfirmationClick={() => console.log('clicked saved')}
      />
    </>
  );
}
