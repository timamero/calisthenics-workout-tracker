import { createFileRoute } from '@tanstack/react-router';
import { Title, Button } from '@mantine/core';

import { signOut } from '@cwt/auth';
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

  return (
    <div>
      <Title>Settings</Title>
      <p>Name</p>
      <TextInputWithEdit
        initialValue={name ? name : ''}
        onSave={() => console.log('pressed save')}
      />
      <Button onClick={handleSignOut} size="md">
        Log Out
      </Button>
    </div>
  );
}
