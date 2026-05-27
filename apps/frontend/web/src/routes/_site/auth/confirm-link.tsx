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
import { useConfirmUser } from '@cwt/hooks';

import { supabase } from '../../../services/supabaseClient';
import { useDefaultSize } from '../../../hooks';

import DefaultLoader from '../../../components/common/DefaultLoader';

export const Route = createFileRoute('/_site/auth/confirm-link')({
  // beforeLoad: () => {
  //   const user = useAuthStore.getState().user;
  //   if (!user) {
  //     throw redirect({
  //       to: '/',
  //     });
  //   }
  // },
  component: ConfirmationView,
});

function ConfirmationView() {
  const [userEmail, setUserEmail] = useState<string>('');
  const [isConfirmationSent, setIsConfirmationSent] = useState<boolean>(false);

  const user = useAuthStore((state) => state.user);
  const defaultSize = useDefaultSize();
  const { status, setStatus, handleConfirmUser } = useConfirmUser(supabase);

  useEffect(() => {
    const asyncFunc = async () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const tokenHash = urlParams.get('token_hash');

      if (tokenHash && !user) {
        console.log('confirm-link || Token found:', tokenHash);
        console.log('confirm-link ||confirming user');
        await handleConfirmUser(tokenHash);
      }
      // if (!tokenHash && status !== 'confirmed') {
      //   setStatus('idle');
      // }
    };

    if (status === 'idle') {
      console.log('confirm-link || calling async function');
      asyncFunc();
    }
  }, [handleConfirmUser, user, setStatus]);

  console.log('confirm-link || status', status);
  console.log('confirm-link || user email', user?.email);

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
            Your account is now active. Click below to access your account.
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
              onClick={() => setIsConfirmationSent(true)}
            >
              Resend confirmation
            </Button>
            {isConfirmationSent && (
              <Text fw={500} fz={defaultSize} c="dark.3" mt={-12} ta="center">
                We've sent a confirmation link to {userEmail}. Click the link in
                that email to verify your account and get started.
              </Text>
            )}
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
