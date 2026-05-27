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
import { useNavigate, redirect } from '@tanstack/react-router';

import { siteContent } from '@cwt/content';
import { useAuthSignUp } from '@cwt/hooks';
import { useAuthStore } from '@cwt/state/stores';

import { supabase } from '../../../services/supabaseClient';
import { useDefaultSize } from '../../../hooks';

import DefaultLoader from '../../../components/common/DefaultLoader';

export const Route = createFileRoute('/_site/auth/signup')({
  beforeLoad: () => {
    const user = useAuthStore.getState().user;
    if (user && user.user_metadata.email_verified) {
      throw redirect({
        to: '/dashboard/home',
      });
    }
  },
  component: SignUpView,
});

function SignUpView() {
  // --- UI Hooks ---
  const navigate = useNavigate();

  // --- Logic Hooks ---
  const auth = useAuthSignUp(supabase);
  const user = useAuthStore((state) => state.user);
  console.log('signup || user', JSON.stringify(user));
  console.log(
    'signup || user.email_confirmed',
    user?.user_metadata.email_verified,
  );

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
      if (!user.user_metadata.email_veriified) {
        navigate({
          to: '/auth/success',
        });
      }
    }
    setLoading(false);
  }, [user, navigate]);

  // --- Helper Components ---
  const VisibilityToggleIcon = ({ reveal }: { reveal: boolean }) =>
    reveal ? <IoEye size={16} /> : <IoEyeOff size={16} />;

  const defaultSize = useDefaultSize();

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
        <Text fw={500} fz={defaultSize} c="dark.3" mt={-12} ta="center">
          {siteContent().signupSubtext}
        </Text>
      </Stack>
      <Box maw={400} mx="auto" mt="lg">
        <form onSubmit={auth.handleSubmit}>
          <TextInput
            label="Username"
            placeholder="Enter username"
            size={defaultSize}
            mb="md"
            withAsterisk
            error={auth.errors.username?.message}
            {...auth.register('username')}
          />
          <Group wrap="nowrap">
            <TextInput
              label="First Name"
              placeholder="Enter your first name"
              size={defaultSize}
              mb="md"
              error={auth.errors.firstName?.message}
              {...auth.register('firstName')}
              style={{ flexShrink: 1 }}
            />
            <TextInput
              label="Last Name"
              placeholder="Enter your last name"
              size={defaultSize}
              mb="md"
              style={{ flexShrink: 1 }}
              error={auth.errors.lastName?.message}
              {...auth.register('lastName')}
            />
          </Group>
          <TextInput
            label="Email"
            placeholder="Enter your email"
            size={defaultSize}
            mb="md"
            withAsterisk
            error={auth.errors.email?.message}
            {...auth.register('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            size={defaultSize}
            mb="md"
            withAsterisk
            visibilityToggleIcon={VisibilityToggleIcon}
            error={auth.errors.password?.message}
            {...auth.register('password')}
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Enter your password"
            size={defaultSize}
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
              size={defaultSize}
              variant="transparent"
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="filled"
              size={defaultSize}
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
