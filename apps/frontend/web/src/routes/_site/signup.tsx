import { useEffect, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { IoEye, IoEyeOff } from 'react-icons/io5';
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
import { useAuthSignUp } from '@cwt/hooks';
import { useAuthStore } from '@cwt/state/stores';

import { supabase } from '../../services/supabaseClient';

export const Route = createFileRoute('/_site/signup')({
  component: SignUpView,
});

function SignUpView() {
  const navigate = useNavigate();
  const auth = useAuthSignUp(supabase);
  const user = useAuthStore((state) => state.user);

  const [loading, setLoading] = useState(true);

  const handleSubmitClick = () => {
    if (auth.authError) {
      auth.clearError();
    }
  };

  const VisibilityToggleIcon = ({ reveal }: { reveal: boolean }) =>
    reveal ? <IoEye size={16} /> : <IoEyeOff size={16} />;

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
        Create A New Account
      </Title>
      <form onSubmit={auth.handleSubmit}>
        <TextInput
          label="Username"
          placeholder="Enter username"
          size="md"
          mb="md"
          withAsterisk
          error={auth.errors.username?.message}
          {...auth.register('username')}
        />
        <TextInput
          label="First Name"
          placeholder="Enter your first name"
          size="md"
          mb="md"
          error={auth.errors.firstName?.message}
          {...auth.register('firstName')}
        />
        <TextInput
          label="Last Name"
          placeholder="Enter your last name"
          size="md"
          mb="md"
          error={auth.errors.lastName?.message}
          {...auth.register('lastName')}
        />
        <TextInput
          label="Email"
          placeholder="Enter your email"
          size="md"
          mb="md"
          withAsterisk
          error={auth.errors.email?.message}
          {...auth.register('email')}
        />
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          size="md"
          mb="md"
          withAsterisk
          visibilityToggleIcon={VisibilityToggleIcon}
          error={auth.errors.password?.message}
          {...auth.register('password')}
        />
        <PasswordInput
          label="Confirm Password"
          placeholder="Enter your password"
          size="md"
          mb="md"
          withAsterisk
          error={auth.errors.confirmPassword?.message}
          visibilityToggleIcon={VisibilityToggleIcon}
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
