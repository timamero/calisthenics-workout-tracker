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
import { useAuthSignUp } from '@cwt/hooks';
import { useAuthStore } from '@cwt/state/stores';

import { supabase } from '../services/supabaseClient';

export const Route = createFileRoute('/signup')({
  component: SignUpView,
});

function SignUpView() {
  const navigate = useNavigate();
  const auth = useAuthSignUp(supabase);
  const user = useAuthStore((state) => state.user);

  const handleSubmitClick = () => {
    if (auth.authError) {
      auth.clearError();
    }
  };

  useEffect(() => {
    if (user) {
      navigate({
        to: '/',
      });
    }
  }, [user, navigate]);

  return (
    <Box maw={400} mx="auto" mt="xl">
      <Title order={2} mb="md">
        Create A New Account
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
        <PasswordInput
          label="Confirm Password"
          placeholder="Enter your password"
          size="md"
          mb="md"
          error={auth.errors.confirmPassword?.message}
          {...auth.register('confirmPassword')}
        />
        {auth.authError && <Text c="red">{auth.authError}</Text>}
        <Group mt="md" right="0">
          <Button
            type="submit"
            size="md"
            onClick={handleSubmitClick}
            disabled={
              auth.isLoading ||
              auth.errors.email ||
              auth.errors.password ||
              auth.errors.confirmPassword
                ? true
                : false
            }
          >
            Sign Up
          </Button>
          <Button type="button" size="md" variant="subtle">
            Back
          </Button>
        </Group>
      </form>
    </Box>
  );
}
