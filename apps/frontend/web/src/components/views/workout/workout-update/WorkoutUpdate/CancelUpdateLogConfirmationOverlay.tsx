import { useNavigate, linkOptions } from '@tanstack/react-router';

import {
  useWorkoutLogDetailContextWeb,
  useWorkoutContextWeb,
} from '@cwt/hooks';
import { useWorkoutDraftStore } from '@cwt/state/stores';

import ConfirmationOverlay from '../../../../common/feedback/ConfirmationOverlay';

export default function CancelUpdateLogConfirmationOverlay() {
  // --- State Management ---
  const setMode = useWorkoutDraftStore((state) => state.setMode);
  const resetWorkoutUpdate = useWorkoutDraftStore(
    (state) => state.resetWorkoutUpdate,
  );

  const historyLinkOptions = linkOptions({
    to: '/dashboard/history',
  });
  // --- Hooks ---
  const navigate = useNavigate();

  // --- Context ---
  const workoutOverlayHandlers = useWorkoutContextWeb().webOverlayHandlers;
  const workoutLogDetailOverlayHandlers =
    useWorkoutLogDetailContextWeb().webOverlayHandlers;

  // --- Error Handling ---
  if (!workoutOverlayHandlers) {
    console.error('Error: useWorkoutContextWeb().webOverlayHandlers is null.');
    return null;
  }
  if (!workoutLogDetailOverlayHandlers) {
    console.error(
      'Error: useWorkoutLogDetailContextWeb().webOverlayHandlers is null.',
    );
    return null;
  }

  // --- Variables ---
  const cancelUpdateLogOverlayOpened =
    workoutOverlayHandlers.cancelUpdateLogOverlayOpened;
  const cancelUpdateLogOverlayHandler =
    workoutOverlayHandlers.cancelUpdateLogOverlayHandler;
  const detailHandlers = workoutLogDetailOverlayHandlers.handlers;

  // --- Handlers ---
  const handleConfirmationClick = async () => {
    detailHandlers.open();
    setMode('read');
    navigate(historyLinkOptions);
    resetWorkoutUpdate();
  };

  return (
    <ConfirmationOverlay
      title="Discard changes?"
      message="You have unsaved changes. If you go back now, your edits will be lost."
      confirmButtonLabel="Discard changes"
      cancelButtonLabel="Keep editing"
      opened={cancelUpdateLogOverlayOpened}
      handler={cancelUpdateLogOverlayHandler}
      onConfirmationClick={() => handleConfirmationClick()}
    />
  );
}
