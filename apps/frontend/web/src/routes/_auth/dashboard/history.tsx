import { createFileRoute } from '@tanstack/react-router';
import { Title, Stack } from '@mantine/core';

import { WorkoutLogDetailContextProvider } from '@cwt/context';

import WorkoutLogPages from '../../../components/WorkoutLogPages';

export const Route = createFileRoute('/_auth/dashboard/history')({
  component: HistoryView,
});

function HistoryView() {
  return (
    <WorkoutLogDetailContextProvider>
      <Stack
        // h="100%"
        // mah={1200}
        mih="100%"
        pb="lg"
        flex={1}
        display="flex"
        bg="grape.6"
        style={{ flexDirection: 'column' }}
      >
        <Title>Past Workouts</Title>
        <WorkoutLogPages />
      </Stack>
    </WorkoutLogDetailContextProvider>
  );
}
