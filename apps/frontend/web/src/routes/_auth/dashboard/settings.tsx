import { createFileRoute } from '@tanstack/react-router';
import { Stack, Title, Button, Text } from '@mantine/core';

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
    <Stack align="center" gap="lg">
      <Title>Settings</Title>
      <Stack align="center" gap="xs" bg="gray.0" bdrs="xs" p="lg" w="100%">
        <Text fw="bold">Name</Text>
        <TextInputWithEdit
          initialValue={name ? name : ''}
          onSave={handleOnSave}
        />
      </Stack>
      <Button color="red" onClick={handleSignOut} size="md">
        Log Out
      </Button>
    </Stack>
  );
}
