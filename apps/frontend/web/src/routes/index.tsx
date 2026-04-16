import { createFileRoute, Link } from '@tanstack/react-router';
import { Title, Stack, Button, Text, Group } from '@mantine/core';

export const Route = createFileRoute('/')({
  component: HomeView,
});

function HomeView() {
  return (
    <Stack align="center" justify="center" h="100vh">
      <Stack align="center">
        <Title order={1} size={64}>
          Leverage
        </Title>
        <Text size="xl">
          Your Quick & Easy Path to Calisthenics Fitness. Track Your Progress
          Effortlessly.
        </Text>
      </Stack>

      <Stack mt={80}>
        <Title order={2}>Sign Up or Log In</Title>
        <Group align="flex-start" justify="center" mt={20}>
          <Button
            component={Link}
            to="/signup"
            variant="filled"
            size="md"
            radius="md"
            color="lime"
          >
            Sign Up
          </Button>
          <Button
            component={Link}
            to="/login"
            variant="outline"
            size="md"
            radius="md"
            color="lime"
          >
            Log In
          </Button>
        </Group>
      </Stack>
    </Stack>
  );
}
