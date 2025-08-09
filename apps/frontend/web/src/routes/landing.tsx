import { createFileRoute } from '@tanstack/react-router';
import { Title, Button, Stack } from '@mantine/core';

export const Route = createFileRoute('/landing')({
  component: LandingView,
});

function LandingView() {
  return (
    <div>
      <Title>Sign Up or Log In</Title>
      <Stack align="flex-start" justify="center" mt={40}>
        <Button variant="filled" size="md" radius="md">
          Sign Up
        </Button>
        <Button variant="outline" size="md" radius="md">
          Log In
        </Button>
      </Stack>
    </div>
  );
}
