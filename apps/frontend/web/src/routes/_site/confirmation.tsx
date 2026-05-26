// import { useEffect } from 'react';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { Title, Text, Container, Stack } from '@mantine/core';

import { useAuthStore } from '@cwt/state/stores';

import { useDefaultSize } from '../../hooks';

export const Route = createFileRoute('/_site/confirmation')({
  beforeLoad: () => {
    const user = useAuthStore.getState().user;
    if (!user) {
      throw redirect({
        to: '/',
      });
    }
  },
  component: ConfirmationView,
});

function ConfirmationView() {
  // const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const defaultSize = useDefaultSize();

  console.log('confirmation || user', user);

  // useEffect(() => {
  //   if (!user) {
  //     navigate({
  //       to: '/',
  //     });
  //   }
  // }, [user, navigate]);

  if (user && !user.user_metadata.email_verified) {
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
            Check your inbox
          </Title>
          <Text fw={500} fz={defaultSize} c="dark.3" mt={-12} ta="center">
            We've sent a confirmation link to {user.email}. Click the link in
            that email to verify your account and get started.
          </Text>
        </Stack>
      </Container>
    );
  }

  return null;
}
