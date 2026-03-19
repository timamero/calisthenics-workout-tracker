import { createFileRoute } from '@tanstack/react-router';
import {
  TextInput,
  PasswordInput,
  Button,
  Group,
  Box,
  Title,
} from '@mantine/core';

import { useAuthLogin } from '@cwt/hooks';

import { supabase } from '../services/supabaseClient';

export const Route = createFileRoute('/login')({
  component: LoginView,
});

function LoginView() {
  const auth = useAuthLogin(supabase);

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
          error={auth.errors?.email?.message}
          {...auth.register('email')}
        />
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          size="md"
          mb="md"
          error={auth.errors?.password?.message}
          {...auth.register('password')}
        />
        <Group mt="md" right="0">
          <Button type="submit" size="md">
            Log In
          </Button>
        </Group>
      </form>
    </Box>
  );
}
