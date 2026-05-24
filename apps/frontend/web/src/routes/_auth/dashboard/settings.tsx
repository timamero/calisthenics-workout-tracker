import { createFileRoute } from '@tanstack/react-router';
import { Stack, Title, Button, Text, Container } from '@mantine/core';

import { signOut, updateUserName } from '@cwt/auth';
import { useUser } from '@cwt/hooks';

import { supabase } from '../../../services/supabaseClient';

import { TextInputWithEdit } from '../../../components/common/TextInputWithEdit';

export const Route = createFileRoute('/_auth/dashboard/settings')({
  component: SettingsView,
});

function SettingsView() {
  const name = useUser().name;

  const handleSignOut = () => {
    signOut(supabase);
  };

  const handleOnSave = (text: string) => {
    updateUserName(supabase, text);
  };

  return (
    <Container h="100%" py="xl">
      <Stack align="center" gap="lg">
        <Title
          order={1}
          size="h2"
          lh="xxs"
          lts="var(--mantine-letter-spacing-tight)"
        >
          Settings
        </Title>
        <Stack
          align="center"
          gap="xs"
          bg="elevation.3"
          bdrs="lg"
          p="lg"
          w="100%"
        >
          <Title lh="xxl" order={2} size="h4">
            User Settings
          </Title>
          <Text fw="bold">Name</Text>
          <TextInputWithEdit
            initialValue={name ? name : ''}
            variant="body"
            onSave={handleOnSave}
          />
        </Stack>
        <Button color="red" onClick={handleSignOut} size="md">
          Log Out
        </Button>
      </Stack>
    </Container>
  );
}
