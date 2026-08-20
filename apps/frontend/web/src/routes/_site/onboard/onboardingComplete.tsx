import { createFileRoute } from '@tanstack/react-router';
import { Title, Stack, Button } from '@mantine/core';

const IS_PAGE_DISABLED = true;

export const Route = createFileRoute('/_site/onboard/onboardingComplete')({
  component: () => {
    if (IS_PAGE_DISABLED) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Under Maintenance</h2>
          <p>This page is temporarily unavailable. Please check back soon!</p>
        </div>
      );
    }

    return <RouteComponent />;
  },
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
