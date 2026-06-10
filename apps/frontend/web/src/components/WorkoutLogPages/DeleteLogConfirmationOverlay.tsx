import { useWorkoutContextWeb } from '@cwt/hooks';
// import {
//   useWorkoutDraftStore,
//   // useWorkoutLibraryStore,
//   // useWorkoutStopwatchStore,
//   // useAuthStore,
// } from '@cwt/state/stores';

import ConfirmationOverlay from '../common/ConfirmationOverlay';

export default function DeleteLogConfirmationOverlay() {
  const deleteLogOverlayOpened =
    useWorkoutContextWeb().webOverlayHandlers?.deleteLogOverlayOpened;
  const deleteLogOverlayHandler =
    useWorkoutContextWeb().webOverlayHandlers?.deleteLogOverlayHandler;

  return (
    <ConfirmationOverlay
      title="Delete Log"
      message="Are you sure you want to delete this log?"
      confirmButtonLabel="Delete"
      opened={deleteLogOverlayOpened!}
      handler={deleteLogOverlayHandler!}
      onConfirmationClick={() => console.log('confirm delete log')}
    />
  );
}
