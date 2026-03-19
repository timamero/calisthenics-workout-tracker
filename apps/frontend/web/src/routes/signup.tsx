import { createFileRoute } from '@tanstack/react-router';
import {
  TextInput,
  PasswordInput,
  Button,
  Group,
  Box,
  Title,
} from '@mantine/core';
import { useAuthSignUp } from '@cwt/hooks';

import { supabase } from '../services/supabaseClient';

export const Route = createFileRoute('/signup')({
  component: SignUpView,
});

function SignUpView() {
  const auth = useAuthSignUp(supabase);

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
        <PasswordInput
          label="Confirm Password"
          placeholder="Enter your password"
          size="md"
          mb="md"
          error={auth.errors?.confirmPassword?.message}
          {...auth.register('confirmPassword')}
        />
        <Group mt="md" right="0">
          <Button type="submit" size="md">
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
