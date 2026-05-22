import { createFileRoute } from '@tanstack/react-router';
import { Title, Stack, Container } from '@mantine/core';

import { WorkoutLogDetailContextProvider } from '@cwt/context';

import WorkoutLogPages from '../../../components/WorkoutLogPages';

export const Route = createFileRoute('/_auth/dashboard/history')({
  component: HistoryView,
});

function HistoryView() {
  return (
    <WorkoutLogDetailContextProvider>
      <Container py="md">
        <Stack
          mih="100%"
          flex={1}
          display="flex"
          style={{ flexDirection: 'column' }}
        >
          <Title
            order={1}
            mb="md"
            fz={{ base: 'h3', md: 'h2' }}
            lh="xxs"
            ta="center"
            style={(theme) => ({
              letterSpacing: theme.other.letterSpacing.tight,
            })}
          >
            Past Workouts
          </Title>
          <WorkoutLogPages />
        </Stack>
      </Container>
    </WorkoutLogDetailContextProvider>
  );
}
