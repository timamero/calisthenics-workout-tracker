import { useEffect, useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Title,
  Text,
  Container,
  Stack,
  Button,
  TextInput,
} from '@mantine/core';

import { useAuthStore } from '@cwt/state/stores';
import { useConfirmUser, useResendConfirmation } from '@cwt/hooks';

import { supabase } from '../../../services/supabaseClient';
import { useDefaultSize } from '../../../hooks';

import DefaultLoader from '../../../components/common/DefaultLoader';

export const Route = createFileRoute('/_site/auth/confirm-link')({
  component: ConfirmationView,
});

function ConfirmationView() {
  const [userEmail, setUserEmail] = useState<string>('');

  const user = useAuthStore((state) => state.user);
  const { status: resendStatus, handleResendConfirmation } =
    useResendConfirmation(supabase);

  const defaultSize = useDefaultSize();
  const { status, setStatus, handleConfirmUser } = useConfirmUser(supabase);

  useEffect(() => {
    const asyncFunc = async () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const tokenHash = urlParams.get('token_hash');

      if (tokenHash && !user) {
        await handleConfirmUser(tokenHash);
      }
    };

    if (status === 'idle') {
      asyncFunc();
    }
  }, [handleConfirmUser, user, setStatus, status]);

  if (status === 'pending') {
    return <DefaultLoader />;
  }

  if (status === 'confirmed' && user) {
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
            Email confirmed
          </Title>
          <Text fw={500} fz={defaultSize} c="dark.3" mt={-12} ta="center">
            Your account is now active. Click below to access your account or
            log in to the mobile app.
          </Text>
          <Stack align="center" mt="lg">
            <Button
              component={Link}
              to="/dashboard/home"
              type="button"
              size={defaultSize}
              variant="filled"
            >
              Go to app
            </Button>
          </Stack>
        </Stack>
      </Container>
    );
  }

  if (status === 'error') {
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
            Link has expired
          </Title>
          <Text fw={500} fz={defaultSize} c="dark.3" mt={-12} ta="center">
            Confirmation links are only valid for 24 hours. Request a new one
            and we'll send it right away.
          </Text>
          <Stack align="center" mt="lg">
            <TextInput
              label="Email"
              value={userEmail}
              onChange={(event) => setUserEmail(event.currentTarget.value)}
            />
            <Button
              type="button"
              size={defaultSize}
              variant="filled"
              onClick={() => handleResendConfirmation(userEmail)}
            >
              Resend confirmation
            </Button>
            <Stack maw={480} mt="lg">
              {resendStatus === 'sent' && (
                <Text fw={500} fz={defaultSize} c="dark.3" mt={-12} ta="center">
                  We've sent a confirmation link to {userEmail}. Click the link
                  in that email to verify your account and get started.
                </Text>
              )}
              {resendStatus === 'error' && (
                <Text fw={500} fz={defaultSize} c="dark.3" mt={-12} ta="center">
                  Something went wrong. Check the email and try sending it
                  again.
                </Text>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    );
  }

  if (user && user.user_metadata.email_verified) {
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
            Already confirmed
          </Title>
          <Text fw={500} fz={defaultSize} c="dark.3" mt={-12} ta="center">
            This email address has already been confirmed.
          </Text>
          <Stack align="center" mt="lg">
            <Button
              component={Link}
              to="/dashboard/home"
              type="button"
              size={defaultSize}
              variant="filled"
            >
              Go to app
            </Button>
          </Stack>
        </Stack>
      </Container>
    );
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
          The message has expired
        </Title>
        <Stack align="center" mt="lg">
          <Button
            component={Link}
            to="/auth/login"
            type="button"
            size={defaultSize}
            variant="transparent"
          >
            Go to login
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
