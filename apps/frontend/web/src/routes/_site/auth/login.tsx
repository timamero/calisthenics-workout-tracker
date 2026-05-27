import { useEffect, useState } from 'react';
import {
  createFileRoute,
  Link,
  useNavigate,
  redirect,
} from '@tanstack/react-router';
import {
  TextInput,
  PasswordInput,
  Button,
  Group,
  Box,
  Title,
  Text,
  Stack,
  Container,
  Loader,
} from '@mantine/core';

import { siteContent } from '@cwt/content';
import { useAuthLogin, useResendConfirmation } from '@cwt/hooks';
import { useAuthStore } from '@cwt/state/stores';

import { supabase } from '../../../services/supabaseClient';
import { useDefaultSize } from '../../../hooks';

import DefaultLoader from '../../../components/common/DefaultLoader';

export const Route = createFileRoute('/_site/auth/login')({
  beforeLoad: () => {
    const user = useAuthStore.getState().user;
    if (user && user.user_metadata.email_verified) {
      throw redirect({
        to: '/dashboard/home',
      });
    }
  },
  component: LoginView,
});

function LoginView() {
  // --- UI Hooks ---
  const navigate = useNavigate();

  // --- Logic Hooks ---
  const auth = useAuthLogin(supabase);
  const user = useAuthStore((state) => state.user);
  console.log('login || user', user);
  const { status, setStatus, handleResendConfirmation } =
    useResendConfirmation(supabase);

  // --- Local State ---
  const [loading, setLoading] = useState(true);

  // --- Handlers ---
  const handleSubmitClick = () => {
    if (auth.authError) {
      auth.clearError();
    }
    setStatus('idle');
  };

  const handleResendClick = () => {
    handleResendConfirmation(
      (document.getElementById('emailInput') as HTMLInputElement)?.value,
    );
    auth.clearError();
  };

  // --- Effects ---
  useEffect(() => {
    if (user && user.user_metadata.email_verified) {
      navigate({
        to: '/dashboard/home',
      });
    }
    setLoading(false);
  }, [user, navigate]);

  // --- Helper Components ---
  const defaultSize = useDefaultSize();

  if (loading || user) {
    return <DefaultLoader />;
  }
  console.log('login email', { ...auth.register('email') });
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
          {siteContent().loginHeading}
        </Title>
        <Text fw={500} fz={{ defaultSize }} c="dark.3" mt={-12} ta="center">
          {siteContent().loginSubtext}
        </Text>
      </Stack>
      <Box maw={400} mx="auto" mt="lg">
        <form onSubmit={auth.handleSubmit}>
          <TextInput
            id="emailInput"
            label="Email"
            placeholder="Enter your email"
            size={defaultSize}
            mb="md"
            error={auth.errors.email?.message}
            {...auth.register('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            size={defaultSize}
            mb="md"
            error={auth.errors.password?.message}
            {...auth.register('password')}
          />
          <Group justify="space-between">
            {auth.authError && <Text c="red">{auth.authError}</Text>}
            {auth.authError &&
              auth.authError ===
                'Please confirm your email before logging in.' && (
                <Button
                  type="button"
                  size={defaultSize}
                  variant="outline"
                  onClick={() => handleResendClick()}
                >
                  Resend confirmation link
                </Button>
              )}
            {status === 'pending' && <Loader />}
            {status === 'sent' && (
              <Text>
                We've sent a confirmation link to{' '}
                {
                  (document.getElementById('emailInput') as HTMLInputElement)
                    ?.value
                }
                . Click the link in that email to verify your account and get
                started.
              </Text>
            )}
          </Group>
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
                auth.authError ===
                  'Please confirm your email before logging in.'
                  ? true
                  : false
              }
            >
              Log In
            </Button>
          </Group>
        </form>
      </Box>
    </Container>
  );
}
