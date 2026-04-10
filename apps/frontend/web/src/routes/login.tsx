import { useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  TextInput,
  PasswordInput,
  Button,
  Group,
  Box,
  Title,
  Text,
} from '@mantine/core';
import { useNavigate } from '@tanstack/react-router';

import { useAuthLogin } from '@cwt/hooks';
import { useAuthStore } from '@cwt/state/stores';

import { supabase } from '../services/supabaseClient';

export const Route = createFileRoute('/login')({
  component: LoginView,
});

function LoginView() {
  const navigate = useNavigate();
  const auth = useAuthLogin(supabase);
  const user = useAuthStore((state) => state.user);

  const handleSubmitClick = () => {
    if (auth.authError) {
      auth.clearError();
    }
  };

  useEffect(() => {
    if (user && !auth.isLoading) {
      navigate({
        to: '/app',
      });
    }
  }, [user, navigate, auth.isLoading]);

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
