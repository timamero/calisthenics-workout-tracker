import { createFileRoute } from '@tanstack/react-router';
import {
  TextInput,
  PasswordInput,
  Button,
  Group,
  Box,
  Title,
} from '@mantine/core';

export const Route = createFileRoute('/login')({
  component: LoginView,
});

function LoginView() {
  return (
    <Box maw={400} mx="auto" mt="xl">
      <Title order={2} mb="md">
        Log In
      </Title>
      <form>
        <TextInput
          label="Email"
          placeholder="Enter your email"
          size="md"
          mb="md"
        />
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          size="md"
          mb="md"
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
