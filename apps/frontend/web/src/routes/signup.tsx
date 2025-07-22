import { createFileRoute } from '@tanstack/react-router';
import {
  TextInput,
  PasswordInput,
  Button,
  Group,
  Box,
  Title,
} from '@mantine/core';

export const Route = createFileRoute('/signup')({
  component: SignUpView,
});

function SignUpView() {
  return (
    <Box maw={400} mx="auto" mt="xl">
      <Title order={2} mb="md">
        Create A New Account
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
