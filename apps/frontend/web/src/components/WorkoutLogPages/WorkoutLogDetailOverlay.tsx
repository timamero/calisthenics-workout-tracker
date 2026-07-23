import { Modal, Stack, Group, Button, Title } from '@mantine/core';

import { formatDuration } from '@cwt/utils';
import type { WorkoutLogResponse } from '@cwt/schema/workouts';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import {
  useWorkoutLogDetailContextWeb,
  useWorkoutContextWeb,
} from '@cwt/hooks';

import WorkoutData from '../Workout/WorkoutData';
import WorkoutMetadataItem from './WorkoutMetadataItem';
import WorkoutLogDetailMenu from './WorkoutLogDetailMenu';
import DeleteLogConfirmationOverlay from './DeleteLogConfirmationOverlay';

/**
 * WorkoutLogDetailOverlay component displays detailed information about a
 * specific workout log in a modal overlay. It provides options to update
 * or delete the workout log and shows relevant metadata such as date,
 * description, goal, and duration.
 *
 * The component uses various hooks to access the workout log context,
 * authentication state, and navigation. It also includes error handling to
 * ensure that all necessary data is available before rendering the overlay.
 *
 * @component
 * @example
 * return (
 *   <WorkoutLogDetailOverlay />
 * )
 * @returns {JSX.Element | null} The WorkoutLogDetailOverlay component
 * or null if required data is missing.
 */
export default function WorkoutLogDetailOverlay() {
  // --- State Management ---
  const setDetailWorkout = useWorkoutLogDetailContextWeb().setWorkout;
  const resetWorkout = useWorkoutDraftStore((state) => state.resetWorkout);
  const workoutLogDetail = useWorkoutLogDetailContextWeb()
    .workout as WorkoutLogResponse;

  // --- Context ---
  const detailHandlers =
    useWorkoutLogDetailContextWeb().webOverlayHandlers?.handlers;
  const detailOpened =
    useWorkoutLogDetailContextWeb().webOverlayHandlers?.opened;
  const deleteLogOverlayHandler =
    useWorkoutContextWeb().webOverlayHandlers?.deleteLogOverlayHandler;

  // --- Error Handling ---
  if (!workoutLogDetail) return null;

  // --- Variables ---
  const duration = formatDuration(workoutLogDetail.duration!);
  const date = new Date(workoutLogDetail.date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // --- Handlers ---
  const handleCloseModal = () => {
    if (detailHandlers && setDetailWorkout) {
      detailHandlers.close();
      setDetailWorkout(null);
      resetWorkout();
    }
  };

  return (
    <Modal
      opened={detailOpened || false}
      onClose={handleCloseModal}
      size="xl"
      withCloseButton={false}
    >
      <Stack align="stretch" w="100%">
        <Stack mb="lg">
          <Group justify="space-between">
            <Button variant="outline" color="dark" onClick={handleCloseModal}>
              Back to Workouts
            </Button>
            <WorkoutLogDetailMenu
              handleUpdateClick={() => console.log('clicked update')}
              handleDeleteClick={() => deleteLogOverlayHandler?.open()}
            />
          </Group>
          <Group justify="flex-start" mt="sm">
            <Title
              order={2}
              fz={{ base: 'h3', md: 'h2' }}
              fw={800}
              lh="xss"
              lts="var(--mantine-letter-spacing-tight)"
            >
              {workoutLogDetail?.title}
            </Title>
          </Group>
          <Stack gap="md" justify="flex-start">
            <WorkoutMetadataItem label="Date" data={date} />
            {workoutLogDetail?.description && (
              <WorkoutMetadataItem
                label="Description"
                data={workoutLogDetail.description}
              />
            )}
            {workoutLogDetail?.goal && (
              <WorkoutMetadataItem
                label="Workout Goal"
                data={workoutLogDetail.goal.toLocaleUpperCase()}
              />
            )}
            {duration && (
              <WorkoutMetadataItem
                label="Duration (HH:MM:SS)"
                data={duration}
              />
            )}
          </Stack>

          <WorkoutData />
        </Stack>
      </Stack>
      <DeleteLogConfirmationOverlay />
    </Modal>
  );
}
