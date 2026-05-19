import { useEffect, useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import {
  TextInput,
  PasswordInput,
  Button,
  Group,
  Box,
  Title,
  Text,
  Container,
  Stack,
} from '@mantine/core';

import { useNavigate } from '@tanstack/react-router';
import { useAuthSignUp } from '@cwt/hooks';
import { useAuthStore } from '@cwt/state/stores';

import { supabase } from '../../services/supabaseClient';
import DefaultLoader from '../../components/common/DefaultLoader';
import { siteContent } from '@cwt/content';

export const Route = createFileRoute('/_site/signup')({
  component: SignUpView,
});

function SignUpView() {
  // --- UI Hooks ---
  const navigate = useNavigate();

  // --- Logic Hooks ---
  const auth = useAuthSignUp(supabase);
  const user = useAuthStore((state) => state.user);

  // --- Local State ---
  const [loading, setLoading] = useState(true);

  // --- Handlers ---
  const handleSubmitClick = () => {
    if (auth.authError) {
      auth.clearError();
    }
  };

  // --- Effects ---
  useEffect(() => {
    if (user) {
      navigate({
        to: '/dashboard',
      });
    }
    setLoading(false);
  }, [user, navigate]);

  // --- Helper Components ---
  const VisibilityToggleIcon = ({ reveal }: { reveal: boolean }) =>
    reveal ? <IoEye size={16} /> : <IoEyeOff size={16} />;

  if (loading || user) {
    return <DefaultLoader />;
  }

  return (
    <Container py="xl">
      <Stack align="center" w="100%" gap={0}>
        <Title
          order={1}
          mb="md"
          fz={{ base: 'h3', md: 'h2' }}
          lh="xxs"
          ta="center"
          style={(theme) => ({
            letterSpacing: theme.other.letterSpacing.tight,
          })}
        >
          {siteContent().signupHeading}
        </Title>
        <Text fw={500} fz="md" c="dark.3" mt={-12} ta="center">
          {siteContent().signupSubtext}
        </Text>
      </Stack>
      <Box maw={400} mx="auto" mt="lg">
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
          <Group wrap="nowrap">
            <TextInput
              label="First Name"
              placeholder="Enter your first name"
              size="md"
              mb="md"
              error={auth.errors.firstName?.message}
              {...auth.register('firstName')}
              style={{ flexShrink: 1 }}
            />
            <TextInput
              label="Last Name"
              placeholder="Enter your last name"
              size="md"
              mb="md"
              style={{ flexShrink: 1 }}
              error={auth.errors.lastName?.message}
              {...auth.register('lastName')}
            />
          </Group>
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
          <Group mt="lg" justify="flex-end">
            <Button
              component={Link}
              to="/"
              type="button"
              size="md"
              variant="transparent"
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="filled"
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
          </Group>
        </form>
      </Box>
    </Container>
  );
}
