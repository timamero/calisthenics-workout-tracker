import { createFileRoute } from '@tanstack/react-router';
import {
  TextInput,
  PasswordInput,
  Button,
  Group,
  Box,
  Title,
} from '@mantine/core';
import { createUser } from '@cwt/auth/createUser';
import { supabase } from '../services/supabaseClient';

export const Route = createFileRoute('/signup')({
  component: SignUpView,
});

function SignUpView() {
  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    const email = (event.target as HTMLFormElement).email.value;
    const password = (event.target as HTMLFormElement).password.value;

    // Add error handling
    createUser(supabase, email, password);
  };
  return (
    <Box maw={400} mx="auto" mt="xl">
      <Title order={2} mb="md">
        Create A New Account
      </Title>
      <form onSubmit={handleSignUp}>
        <TextInput
          label="Email"
          placeholder="Enter your email"
          size="md"
          mb="md"
          name="email"
        />
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          size="md"
          mb="md"
          name="password"
        />
        <PasswordInput
          label="Confirm Password"
          placeholder="Enter your password"
          size="md"
          mb="md"
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
