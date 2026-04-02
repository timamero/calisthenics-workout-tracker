import { createFileRoute } from '@tanstack/react-router';
import {
  TextInput,
  PasswordInput,
  Button,
  Group,
  Box,
  Title,
} from '@mantine/core';
import { signIn } from '@cwt/auth/signIn';
import { supabase } from '../services/supabaseClient';

export const Route = createFileRoute('/login')({
  component: LoginView,
});

function LoginView() {
  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    const email = (event.target as HTMLFormElement).email.value;
    const password = (event.target as HTMLFormElement).password.value;

    // Add error handling
    await signIn(supabase, email, password);
  };

  return (
    <Box maw={400} mx="auto" mt="xl">
      <Title order={2} mb="md">
        Log In
      </Title>
      <form onSubmit={handleSignIn}>
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
        <Group mt="md" right="0">
          <Button type="submit" size="md">
            Log In
          </Button>
        </Group>
      </form>
    </Box>
  );
}
