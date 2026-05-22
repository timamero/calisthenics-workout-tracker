import { useState } from 'react';
import { Title, Pagination, Stack, ScrollArea, Badge } from '@mantine/core';

import { useWorkoutLibraryStore } from '@cwt/state/stores';
import { chunk, formatDuration } from '@cwt/utils';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import { useWorkoutLogDetailContextWeb } from '@cwt/hooks';
import type { WorkoutLogResponse } from '@cwt/schema/workouts';

import CardButton from '../../components/common/CardButton';
import WorkoutLogDetailOverlay from './WorkoutLogDetailOverlay';
import WorkoutMetadataItem from './WorkoutMetadataItem';

export default function WorkoutLogPages() {
  const [activePage, setPage] = useState(1);

  const detailHandlers =
    useWorkoutLogDetailContextWeb().webOverlayHandlers?.handlers;
  const setDetailWorkout = useWorkoutLogDetailContextWeb().setWorkout;

  const logs = useWorkoutLibraryStore((state) => state.displayedWorkoutLogs);
  const setMode = useWorkoutDraftStore((state) => state.setMode);
  const setWorkoutData = useWorkoutDraftStore((state) => state.setWorkoutData);

  if (logs.length === 0) return null;

  const chunkSize = logs.length >= 15 ? 15 : logs.length;

  const data = chunk(logs, chunkSize);

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
        <Stack>
          <Badge size="xl" variant="outline-lime" radius="sm" tt="capitalize">
            {date}
          </Badge>
          <Title lh="xxl" order={2} size="h4">
            {workoutTitle}
          </Title>
          {wo.description && (
            <WorkoutMetadataItem label="Description" data={wo.description} />
          )}
          {wo.goal && (
            <WorkoutMetadataItem
              label="Workout Goal"
              data={wo.goal.toUpperCase()}
            />
          )}
          <WorkoutMetadataItem label="Duration (HH:MM:SS)" data={duration} />
        </Stack>
      </CardButton>
    );
  });
  return (
    <Stack justify="stretch" flex={1} h="100%">
      <ScrollArea.Autosize mah="min-content" h="100%" flex={1}>
        <Stack py="sm">{items}</Stack>
      </ScrollArea.Autosize>
      <Pagination
        flex={0}
        h="100%"
        total={data.length}
        value={activePage}
        onChange={setPage}
        mt="sm"
        color="lime.2"
      />
      <WorkoutLogDetailOverlay />
    </Stack>
  );
}
