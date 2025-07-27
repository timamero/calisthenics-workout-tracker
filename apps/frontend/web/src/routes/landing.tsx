import { useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Title, Button, Stack } from '@mantine/core';

import { useAuthStore } from '@cwt/state/auth';
import { getProtectedData } from '@cwt/api/protectedData';

export const Route = createFileRoute('/landing')({
  component: LandingView,
});

function LandingView() {
  const session = useAuthStore((state) => state.session);
  useEffect(() => {
    console.log(
      'Fetching data from protected route in landing (expecting no data)...',
    );
    const baseUrl = 'http://127.0.0.1:8000';

    const asyncFetchProtectedData = async () => {
      if (session) {
        console.log('token: ', session.access_token);
        await getProtectedData(baseUrl, session.access_token);
      } else {
        console.log('No protected data to fetch on landing page.');
      }
    };
    asyncFetchProtectedData();
  }, [session]);
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
