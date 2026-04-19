import { createFileRoute } from '@tanstack/react-router';
import { Title, Stack, Group, ScrollArea, Text } from '@mantine/core';

import {
  useWorkoutDraftStore,
  useWorkoutLibraryStore,
} from '@cwt/state/stores';

import CardButton from '../../../components/common/CardButton';
import LargeButton from '../../../components/common/LargeButton';

export const Route = createFileRoute('/_auth/dashboard/home')({
  component: AppView,
});

function AppView() {
  const workoutLogs = useWorkoutLibraryStore(
    (state) => state.displayedWorkoutLogs,
  );
  const workoutBuilds = useWorkoutLibraryStore(
    (state) => state.displayedWorkoutBuilds,
  );

  const initializeWorkout = useWorkoutDraftStore(
    (state) => state.initializeWorkout,
  );

  const handleCreateWorkoutBuildClick = () => {
    initializeWorkout('build');
  };
  const handleCreateWorkoutLogClick = () => {
    initializeWorkout('edit');
  };

  const workoutBuildCards = workoutBuilds.map((wo, i) => {
    const workoutTitle = 'title' in wo ? wo.title : `Workout Template ${i + 1}`;
    const date = 'created_at' in wo ? wo.created_at : new Date();
    const dateString =
      typeof date === 'string' ? date : date.toLocaleDateString();
    return (
      <CardButton key={i}>
        <Title order={3} size="h5">
          {workoutTitle}
        </Title>
        <Text>{dateString}</Text>
      </CardButton>
    );
  });

  const workoutLogCards = workoutLogs.map((wo, i) => {
    const workoutTitle = wo.title ? wo.title : `Workout Log ${i + 1}`;
    const date = wo.date;
    return (
      <CardButton key={i}>
        <Title order={3} size="h5">
          {workoutTitle}
        </Title>
        <Text>{date}</Text>
      </CardButton>
    );
  });

  return (
    <Stack align="center" justify="flex-start">
      <Title order={1}>Welcome Back</Title>
      <Text size="xl">
        Progress isn't always a straight line. Just keep moving.
      </Text>
      <Stack gap="xl" mt={80}>
        <Title order={2} size="h2">
          Start Workout
        </Title>
        <Group w="100%">
          <LargeButton
            to="/workout"
            onButtonClick={handleCreateWorkoutLogClick}
          >
            <Text fw={700} ta="center">
              Start Blank Workout
            </Text>
          </LargeButton>
          <LargeButton
            to="/workout"
            onButtonClick={handleCreateWorkoutBuildClick}
          >
            <Text fw={700} ta="center">
              Create a Workout Template
            </Text>
          </LargeButton>
        </Group>
        {workoutBuildCards && workoutBuildCards.length > 0 && (
          <Stack>
            <Text fw={700} size="xl">
              Start Workout From Template
            </Text>
            <ScrollArea w={400}>
              <Group wrap="nowrap">{workoutBuildCards}</Group>
            </ScrollArea>
          </Stack>
        )}

        {workoutLogCards && workoutLogCards.length > 0 && (
          <Stack>
            <Text fw={700} size="xl">
              Start Workout From Recent Workout
            </Text>
            <ScrollArea w={400}>
              <Group wrap="nowrap">{workoutLogCards}</Group>
            </ScrollArea>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
