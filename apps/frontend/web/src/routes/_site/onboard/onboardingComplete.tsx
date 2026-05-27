import { createFileRoute } from '@tanstack/react-router';
import { Title, Stack, Button } from '@mantine/core';

export const Route = createFileRoute('/_site/onboard/onboardingComplete')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Title>Welcome User!</Title>
      <p>Congratulations! Your profile is set up. </p>
      <Stack align="flex-start" justify="center" mt={40}>
        <Button variant="filled" size="md" radius="md">
          Go to Dashboard
        </Button>
      </Stack>
    </div>
  );
}
