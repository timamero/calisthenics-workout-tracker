import { useEffect, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  TextInput,
  PasswordInput,
  Button,
  Group,
  Box,
  Title,
  Text,
  Stack,
  Loader,
} from '@mantine/core';
import { useNavigate } from '@tanstack/react-router';

import { useAuthLogin } from '@cwt/hooks';
import { useAuthStore } from '@cwt/state/stores';

import { supabase } from '../../services/supabaseClient';

export const Route = createFileRoute('/_site/login')({
  component: LoginView,
});

function LoginView() {
  const navigate = useNavigate();
  const auth = useAuthLogin(supabase);
  const user = useAuthStore((state) => state.user);

  const [loading, setLoading] = useState(true);

  const handleSubmitClick = () => {
    if (auth.authError) {
      auth.clearError();
    }
  };

  useEffect(() => {
    if (user) {
      navigate({
        to: '/dashboard',
      });
    }
    setLoading(false);
  }, [user, navigate]);

  if (loading || user) {
    return (
      <Stack align="center" justify="center" h="100vh">
        <Stack align="center">
          <Title order={1} size={32}>
            Thank you for waiting!
          </Title>
          <Text size="xl">Checking your credentials.</Text>
        </Stack>

        <Stack mt={40}>
          <Loader color="lime" />;
        </Stack>
      </Stack>
    );
  }

  return (
    <Box maw={400} mx="auto" mt="xl">
      <Title order={2} mb="md">
        Log In
      </Title>
      <form onSubmit={auth.handleSubmit}>
        <TextInput
          label="Email"
          placeholder="Enter your email"
          size="md"
          mb="md"
          error={auth.errors.email?.message}
          {...auth.register('email')}
        />
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          size="md"
          mb="md"
          error={auth.errors.password?.message}
          {...auth.register('password')}
        />
        {auth.authError && <Text c="red">{auth.authError}</Text>}
        <Group mt="md" right="0">
          <Button
            type="submit"
            size="md"
            onClick={handleSubmitClick}
            disabled={
              auth.isLoading || auth.errors.email || auth.errors.password
                ? true
                : false
            }
          >
            Log In
          </Button>
        </Group>
      </form>
    </Box>
  );
}
