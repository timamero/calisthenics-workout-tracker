import { useState } from 'react';
import {
  Title,
  Text,
  Pagination,
  SimpleGrid,
  Stack,
  // Box,
  ScrollArea,
} from '@mantine/core';

import { useWorkoutLibraryStore } from '@cwt/state/stores';
import { formatDuration, chunk } from '@cwt/utils';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import { useWorkoutLogDetailContextWeb } from '@cwt/hooks';

import CardButton from '../components/common/CardButton';
import WorkoutLogDetailOverlay from './WorkoutLogDetailOverlay';
import type { WorkoutLogResponse } from '@cwt/schema/workouts';

export default function WorkoutLogPages() {
  const [activePage, setPage] = useState(1);

  const detailHandlers =
    useWorkoutLogDetailContextWeb().webOverlayHandlers?.handlers;
  const setDetailWorkout = useWorkoutLogDetailContextWeb().setWorkout;

  const logs = useWorkoutLibraryStore((state) => state.displayedWorkoutLogs);
  const setMode = useWorkoutDraftStore((state) => state.setMode);
  const setWorkoutData = useWorkoutDraftStore((state) => state.setWorkoutData);

  if (logs.length === 0) return null;

  const data = chunk(logs, 6);

  const handleWorkoutLogClick = (workoutLog: WorkoutLogResponse) => {
    if (setDetailWorkout && detailHandlers) {
      setDetailWorkout(workoutLog);
      setMode('read');
      setWorkoutData(workoutLog.workout_data.data);
      detailHandlers.open();
    }
  };

  const items = data[activePage - 1].map((wo, i) => {
    const workoutTitle = wo.title ? wo.title : `Workout Log ${i + 1}`;
    const date = new Date(wo.date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const duration = formatDuration(wo.duration!);
    return (
      <CardButton
        key={i}
        handleClick={() => handleWorkoutLogClick(wo as WorkoutLogResponse)}
      >
        <Title order={3} size="h5">
          {workoutTitle}
        </Title>
        <Text>{date}</Text>
        <Text>{wo.goal}</Text>
        <Text>{wo.description}</Text>
        <Text>{duration}</Text>
      </CardButton>
    );
  });
  return (
    <Stack justify="space-between" h="100%" flex={1}>
      <ScrollArea h="100%" bg="red.1">
        <SimpleGrid cols={{ base: 1, md: 2, xl: 3 }}>{items}</SimpleGrid>
      </ScrollArea>
      <Pagination
        flex={1}
        h="100%"
        total={data.length}
        value={activePage}
        onChange={setPage}
        mt="sm"
      />
      <WorkoutLogDetailOverlay />
    </Stack>
  );
}
