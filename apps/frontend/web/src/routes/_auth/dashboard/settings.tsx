import { createFileRoute } from '@tanstack/react-router';
import { Title, Button } from '@mantine/core';

import { signOut } from '@cwt/auth/signOut';

import { supabase } from '../../../services/supabaseClient';

import { TextInputWithEdit } from '../../../components/common/TextInputWithEdit';

export const Route = createFileRoute('/_auth/dashboard/settings')({
  component: SettingsView,
});

function SettingsView() {
  const handleSignOut = () => {
    signOut(supabase);
  };

  return (
    <div>
      <Title>Settings</Title>
      <p>Name</p>
      <TextInputWithEdit />
      <Button onClick={handleSignOut} size="md">
        Log Out
      </Button>
    </div>
  );
}
