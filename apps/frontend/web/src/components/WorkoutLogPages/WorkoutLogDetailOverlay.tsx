import { Modal, Stack, Group, Button, Title } from '@mantine/core';

import { formatDuration } from '@cwt/utils';
import type { WorkoutLogResponse } from '@cwt/schema/workouts';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import { useWorkoutLogDetailContextWeb } from '@cwt/hooks';

import WorkoutData from '../Workout/WorkoutData';
import WorkoutMetadataItem from './WorkoutMetadataItem';
import WorkoutLogDetailMenu from './WorkoutLogDetailMenu';

export default function WorkoutLogDetailOverlay() {
  const workoutLogDetail = useWorkoutLogDetailContextWeb()
    .workout as WorkoutLogResponse;
  const detailHandlers =
    useWorkoutLogDetailContextWeb().webOverlayHandlers?.handlers;
  const detailOpened =
    useWorkoutLogDetailContextWeb().webOverlayHandlers?.opened;
  const setDetailWorkout = useWorkoutLogDetailContextWeb().setWorkout;

  const resetWorkout = useWorkoutDraftStore((state) => state.resetWorkout);

  if (!workoutLogDetail) return null;

  const duration = formatDuration(workoutLogDetail.duration!);
  const date = new Date(workoutLogDetail.date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

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
              handleDeleteClick={() => console.log('clicked delete')}
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
    </Modal>
  );
}
