import { useState } from 'react';
import { Title, Text, Pagination, SimpleGrid } from '@mantine/core';

import { useWorkoutLibraryStore } from '@cwt/state/stores';
import { formatDuration, chunk } from '@cwt/utils';

import CardButton from '../components/common/CardButton';

export default function WorkoutLogPages() {
  const [activePage, setPage] = useState(1);
  const logs = useWorkoutLibraryStore((state) => state.displayedWorkoutLogs);

  if (logs.length === 0) return null;

  const data = chunk(logs, 6);

  const items = data[activePage - 1].map((wo, i) => {
    const workoutTitle = wo.title ? wo.title : `Workout Log ${i + 1}`;
    const date = new Date(wo.date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const duration = formatDuration(wo.duration!);
    return (
      <CardButton key={i}>
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
    <>
      <SimpleGrid cols={{ base: 1, md: 2, xl: 3 }}>{items}</SimpleGrid>
      <Pagination
        total={data.length}
        value={activePage}
        onChange={setPage}
        mt="sm"
      />
    </>
  );
}
