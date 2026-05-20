import { createFileRoute } from '@tanstack/react-router';
import { Title, Stack, Group, Text, Container } from '@mantine/core';

import { useWorkoutDraftStore } from '@cwt/state/stores';
import { startWorkoutContent } from '@cwt/content';

import LargeButton from '../../../components/common/LargeButton';

export const Route = createFileRoute('/_auth/dashboard/home')({
  component: AppView,
});

function AppView() {
  // Displaying workout logs and build disabled until v.0.1.0-alpha.1.1
  // const workoutLogs = useWorkoutLibraryStore(
  //   (state) => state.displayedWorkoutLogs,
  // );
  // const workoutBuilds = useWorkoutLibraryStore(
  //   (state) => state.displayedWorkoutBuilds,
  // );

  const initializeWorkout = useWorkoutDraftStore(
    (state) => state.initializeWorkout,
  );

  // Creating workout template disabled until v.0.1.0-alpha.1.1
  // const handleCreateWorkoutBuildClick = () => {
  //   initializeWorkout('build');
  // };
  const handleCreateWorkoutLogClick = () => {
    initializeWorkout('edit');
  };

  // const workoutBuildCards = workoutBuilds.map((wo, i) => {
  //   const workoutTitle = 'title' in wo ? wo.title : `Workout Template ${i + 1}`;
  //   const date = 'created_at' in wo ? wo.created_at : new Date();
  //   const dateString =
  //     typeof date === 'string' ? date : date.toLocaleDateString();
  //   return (
  //     <CardButton key={i}>
  //       <Title order={3} size="h5">
  //         {workoutTitle}
  //       </Title>
  //       <Text>{dateString}</Text>
  //     </CardButton>
  //   );
  // });

  // const workoutLogCards = workoutLogs.map((wo, i) => {
  //   const workoutTitle = wo.title ? wo.title : `Workout Log ${i + 1}`;
  //   const date = wo.date;
  //   return (
  //     <CardButton key={i}>
  //       <Title order={3} size="h5">
  //         {workoutTitle}
  //       </Title>
  //       <Text>{date}</Text>
  //     </CardButton>
  //   );
  // });

  return (
    <Container h="100%" py="xl">
      <Stack h="100%">
        <Stack gap={0} align="center">
          <Title
            order={1}
            size="h2"
            lh="xxs"
            lts="var(--mantine-letter-spacing-tight)"
          >
            {startWorkoutContent().welcomeHeadline}
          </Title>
          <Text size="xl">{startWorkoutContent().welcomeSubtext}</Text>
        </Stack>
        <Stack flex={1} gap="xl" justify="center">
          <Group
            w="100%"
            justify="center"
            style={{ transform: 'translateY(-100%)' }}
          >
            <LargeButton
              to="/workout"
              onButtonClick={handleCreateWorkoutLogClick}
            >
              <Text fz="h4" fw={700} ta="center" lh="xxs">
                {startWorkoutContent().createNewLogButton}
              </Text>
              <Text fz="sm" fw={400} ta="center" lh="xxs">
                {startWorkoutContent().createNewLogSublabel}
              </Text>
            </LargeButton>
            {/* <LargeButton
            to="/workout"
            onButtonClick={handleCreateWorkoutBuildClick}
          >
            <Text fw={700} ta="center">
              Create a Workout Template
            </Text>
          </LargeButton> */}
          </Group>
          {/* {workoutBuildCards && workoutBuildCards.length > 0 && (
          <Stack>
            <Text fw={700} size="xl">
              Start Workout From Template
            </Text>
            <ScrollArea w={400}>
              <Group wrap="nowrap">{workoutBuildCards}</Group>
            </ScrollArea>
          </Stack>
        )} */}

          {/* {workoutLogCards && workoutLogCards.length > 0 && (
          <Stack>
            <Text fw={700} size="xl">
              Start Workout From Recent Workout
            </Text>
            <ScrollArea w={400}>
              <Group wrap="nowrap">{workoutLogCards}</Group>
            </ScrollArea>
          </Stack>
        )} */}
        </Stack>
      </Stack>
    </Container>
  );
}
