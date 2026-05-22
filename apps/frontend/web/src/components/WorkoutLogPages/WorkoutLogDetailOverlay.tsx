// import { useContext } from 'react';
import { Modal, Stack, Text, Group, Button, Title } from '@mantine/core';

// import { WorkoutLogDetailContext } from '@cwt/context';
import { formatDuration } from '@cwt/utils';
import type { WorkoutLogResponse } from '@cwt/schema/workouts';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import { useWorkoutLogDetailContextWeb } from '@cwt/hooks';

import WorkoutData from '../Workout/WorkoutData';

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
      <Group justify="center">
        <Stack mb="lg" maw={580}>
          <Group justify="flex-end">
            <Button variant="outline" color="dark" onClick={handleCloseModal}>
              Back to Workouts
            </Button>
          </Group>
          <Group justify="flex-start" mt="sm">
            <Title order={2} size="h2">
              {workoutLogDetail?.title}
            </Title>
          </Group>
          <Stack gap="md" justify="flex-start">
            <Stack gap="xs">
              <Text tt="uppercase" size="xs" c="gray.7">
                Date
              </Text>
              <Text size="md">{date}</Text>
            </Stack>
            {workoutLogDetail?.description && (
              <Stack gap="xs">
                <Text tt="uppercase" size="xs" c="gray.7">
                  Description
                </Text>
                <Text size="md">{workoutLogDetail?.description}</Text>
              </Stack>
            )}
            {workoutLogDetail?.goal && (
              <Stack gap="xs">
                <Text tt="uppercase" size="xs" c="gray.7">
                  Goal
                </Text>
                <Text size="md">{workoutLogDetail?.goal}</Text>
              </Stack>
            )}
            {duration && (
              <Stack gap="xs">
                <Text tt="uppercase" size="xs" c="gray.7">
                  Duration
                </Text>
                <Text size="md">{duration}</Text>
              </Stack>
            )}
          </Stack>

          <WorkoutData />
        </Stack>
      </Group>
    </Modal>
  );
}
